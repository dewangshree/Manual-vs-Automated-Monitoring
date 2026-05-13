from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(title="Cold Room ROI Calculator API")

@app.get("/")
def home():
    return {"message": "Backend running"}



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


class CalculatorInput(BaseModel):
    cold_rooms: int = Field(10, gt=0, description="Number of cold rooms")
    rounds_per_day: int = Field(3, gt=0, description="Manual rounds per day")
    minutes_per_round: int = Field(20, gt=0, description="Minutes spent per round")
    hourly_cost: float = Field(25.0, gt=0, description="Staff hourly cost in $")
    excursion_rate: float = Field(4.0, ge=0, le=100, description="Temperature excursion rate (%)")
    excursion_cost: float = Field(5000.0, ge=0, description="Average cost per excursion in $")
    automated_monthly_fee: float = Field(800.0, ge=0, description="Monthly fee for automated system in $")
    setup_cost: float = Field(2000.0, ge=0, description="One-time setup cost in $")


class CalculatorResult(BaseModel):
    annual_hours: float
    annual_labour_cost: float
    annual_excursions: float
    annual_excursion_exposure: float
    total_manual_cost: float
    automated_annual: float
    annual_savings: float
    break_even_months: float | None
    roi_percent: int
    # Formatted strings for display
    fmt_labour: str
    fmt_excursion: str
    fmt_manual_total: str
    fmt_automated: str
    fmt_savings: str


def _fmt(n: float) -> str:
    if n >= 1_000_000:
        return f"${n / 1_000_000:.1f}M"
    if n >= 1000:
        return f"${n / 1000:.1f}k"
    return f"${round(n):,}"


@app.post("/calculate", response_model=CalculatorResult)
def calculate(data: CalculatorInput) -> CalculatorResult:
    working_days = 365

    annual_hours = (
        data.cold_rooms * data.rounds_per_day * data.minutes_per_round * working_days
    ) / 60
    annual_labour_cost = annual_hours * data.hourly_cost

    annual_excursions = data.cold_rooms * (data.excursion_rate / 100) * 365
    annual_excursion_exposure = annual_excursions * data.excursion_cost

    total_manual_cost = annual_labour_cost + annual_excursion_exposure

    automated_annual = data.automated_monthly_fee * 12 + data.setup_cost
    annual_savings = total_manual_cost - automated_annual

    break_even: float | None = None
    if annual_savings > 0 and total_manual_cost > 0:
        break_even = round(automated_annual / (total_manual_cost / 12), 1)

    roi = max(0, round((annual_savings / automated_annual) * 100)) if automated_annual > 0 else 0

    return CalculatorResult(
        annual_hours=round(annual_hours, 1),
        annual_labour_cost=round(annual_labour_cost, 2),
        annual_excursions=round(annual_excursions, 1),
        annual_excursion_exposure=round(annual_excursion_exposure, 2),
        total_manual_cost=round(total_manual_cost, 2),
        automated_annual=round(automated_annual, 2),
        annual_savings=round(annual_savings, 2),
        break_even_months=break_even,
        roi_percent=roi,
        fmt_labour=_fmt(annual_labour_cost),
        fmt_excursion=_fmt(annual_excursion_exposure),
        fmt_manual_total=_fmt(total_manual_cost),
        fmt_automated=_fmt(automated_annual),
        fmt_savings=_fmt(annual_savings),
    )