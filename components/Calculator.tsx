"use client";

import { useState, useMemo } from "react";

/* ── Types ── */
interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}

interface ResultCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

/* ── Sub-components (unchanged) ── */
function SliderInput({ label, value, min, max, step, unit, onChange }: SliderInputProps) {
  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500">{label}</label>
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-14 bg-transparent text-right text-sm font-semibold text-gray-800 outline-none"
          />
          <span className="text-xs text-gray-400">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #6B21E8 0%, #6B21E8 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
        }}
      />
      <div className="mt-0.5 flex justify-between text-[10px] text-gray-300">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub, accent }: ResultCardProps) {
  return (
    <div
      className={`card-hover rounded-2xl border p-4 ${
        accent
          ? "border-purple-200 bg-purple-600 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <p className={`text-xs font-medium ${accent ? "text-purple-200" : "text-gray-400"}`}>
        {label}
      </p>
      <p className={`mt-1 text-2xl font-bold tracking-tight ${accent ? "text-white" : "text-gray-900"}`}>
        {value}
      </p>
      {sub && (
        <p className={`mt-0.5 text-xs ${accent ? "text-purple-200" : "text-gray-400"}`}>{sub}</p>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span className="h-0.5 w-4 rounded-full bg-[#6B21E8]" />
      <span className="text-xs font-bold uppercase tracking-widest text-[#6B21E8]">{children}</span>
    </div>
  );
}

/* ── Helpers ── */
const fmt = (n: number): string =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(1)}k`
    : `$${Math.round(n).toLocaleString()}`;

/* ── Main Calculator ── */
export default function Calculator() {
  // Inputs
  const [coldRooms,            setColdRooms]            = useState(10);
  const [roundsPerDay,         setRoundsPerDay]         = useState(3);
  const [minutesPerRound,      setMinutesPerRound]      = useState(20);
  const [hourlyCost,           setHourlyCost]           = useState(25);
  const [excursionRate,        setExcursionRate]        = useState(4);
  const [excursionCost,        setExcursionCost]        = useState(5000);
  const [automatedMonthlyFee,  setAutomatedMonthlyFee]  = useState(800);
  const [setupCost,            setSetupCost]            = useState(2000);

  /* ── Calculations (pure frontend, instant on every slider change) ── */
  const results = useMemo(() => {
    // Core formulas
    const annualHours          = (coldRooms * roundsPerDay * minutesPerRound * 365) / 60;
    const labourCost           = annualHours * hourlyCost;
    const annualExcursions     = coldRooms * (excursionRate / 100) * 365;
    const excursionExposure    = annualExcursions * excursionCost;
    const manualTotal          = labourCost + excursionExposure;
    const automatedTotal       = automatedMonthlyFee * 12 + setupCost;
    const savings              = manualTotal - automatedTotal;
    const savingsPositive      = savings > 0;

    const breakEven = savingsPositive
      ? (automatedTotal / (manualTotal / 12)).toFixed(1)
      : "N/A";

    const roi = savingsPositive && automatedTotal > 0
      ? Math.round((savings / automatedTotal) * 100)
      : 0;

    return {
      annualHours:    Math.round(annualHours).toLocaleString(),
      labourCost:     fmt(labourCost),
      annualExcursions: annualExcursions.toFixed(1),
      excursionExposure: fmt(excursionExposure),
      manualTotal:    fmt(manualTotal),
      automatedTotal: fmt(automatedTotal),
      savings:        fmt(Math.abs(savings)),
      savingsPositive,
      breakEven,
      roi,
    };
  }, [coldRooms, roundsPerDay, minutesPerRound, hourlyCost, excursionRate, excursionCost, automatedMonthlyFee, setupCost]);

  const verdict = results.savingsPositive
    ? `Automating saves you ~${results.savings}/yr with ${results.roi}% ROI. Break-even in ${results.breakEven} months.`
    : "Adjust your inputs — your manual costs may be lower than average. Automated monitoring still reduces risk significantly.";

  return (
    <section id="calculator" className="pb-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section header */}
        <div className="mb-10 flex items-center gap-3">
          <span className="h-0.5 w-6 rounded-full bg-[#6B21E8]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B21E8]">Tool 02</span>
          <span className="text-xs text-gray-400">Manual Round vs Automated Monitoring Comparison</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── Column 1: Manual Rounds Inputs ── */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <SectionLabel>Manual Rounds</SectionLabel>
            <h3 className="mb-6 text-lg font-bold text-gray-900">Your current setup</h3>
            <div className="space-y-6">
              <SliderInput label="Number of cold rooms / assets" value={coldRooms}       min={1}   max={100}   step={1}   unit=" rooms" onChange={setColdRooms} />
              <SliderInput label="Rounds per day"                value={roundsPerDay}    min={1}   max={12}    step={1}   unit="×/day"  onChange={setRoundsPerDay} />
              <SliderInput label="Time per round"               value={minutesPerRound} min={5}   max={120}   step={5}   unit=" min"   onChange={setMinutesPerRound} />
              <SliderInput label="Hourly labour cost"           value={hourlyCost}      min={10}  max={80}    step={1}   unit=" $/hr"  onChange={setHourlyCost} />
              <SliderInput label="Missed excursion rate"        value={excursionRate}   min={0}   max={20}    step={0.5} unit="%"      onChange={setExcursionRate} />
              <SliderInput label="Cost per missed excursion"    value={excursionCost}   min={500} max={50000} step={500} unit=" $"     onChange={setExcursionCost} />
            </div>
          </div>

          {/* ── Column 2: Automated Inputs ── */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <SectionLabel>Automated Monitoring</SectionLabel>
            <h3 className="mb-6 text-lg font-bold text-gray-900">Starlly platform costs</h3>
            <div className="space-y-6">
              <SliderInput label="Monthly platform fee" value={automatedMonthlyFee} min={200} max={5000}  step={100} unit=" $/mo" onChange={setAutomatedMonthlyFee} />
              <SliderInput label="One-time setup cost"  value={setupCost}          min={0}   max={20000} step={500} unit=" $"    onChange={setSetupCost} />
            </div>

            {/* Manual round summary */}
            <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Manual Round Summary
              </p>
              <div className="space-y-2">
                {[
                  { label: "Annual hours spent",  val: `${results.annualHours} hrs` },
                  { label: "Annual labour cost",  val: results.labourCost },
                  { label: "Excursions/year",     val: results.annualExcursions },
                  { label: "Excursion exposure",  val: results.excursionExposure },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{row.label}</span>
                    <span className="text-sm font-bold text-gray-900">{row.val}</span>
                  </div>
                ))}
                <div className="mt-2 border-t border-gray-200 pt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">Total manual cost/yr</span>
                  <span className="text-sm font-bold text-red-500">{results.manualTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Column 3: Results ── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm flex-1">
              <SectionLabel>Output</SectionLabel>
              <h3 className="mb-5 text-lg font-bold text-gray-900">Your savings snapshot</h3>
              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="Total manual cost/yr"
                  value={results.manualTotal}
                  sub="Labour + excursions"
                />
                <ResultCard
                  label="Automated cost/yr"
                  value={results.automatedTotal}
                  sub="Platform + setup"
                />
                <ResultCard
                  label={results.savingsPositive ? "Annual savings" : "Annual gap"}
                  value={results.savings}
                  sub={results.savingsPositive ? "By switching now" : "Vs manual rounds"}
                  accent={results.savingsPositive}
                />
                <ResultCard
                  label="Estimated ROI"
                  value={`${results.roi}%`}
                  sub="Year 1"
                />
              </div>

              {/* Break-even */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-purple-50 px-4 py-3">
                <span className="text-xs font-medium text-purple-700">Break-even point</span>
                <span className="text-sm font-bold text-purple-800">{results.breakEven} months</span>
              </div>
            </div>

            {/* Verdict card */}
            <div
              className={`rounded-3xl p-6 ${
                results.savingsPositive
                  ? "bg-[#1A1523] text-white"
                  : "border border-gray-200 bg-white text-gray-800"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    results.savingsPositive ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {results.savingsPositive ? "✓" : "→"}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  results.savingsPositive ? "text-purple-300" : "text-gray-400"
                }`}>
                  Recommendation
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${
                results.savingsPositive ? "text-gray-300" : "text-gray-600"
              }`}>
                {verdict}
              </p>
              <a
                href="#"
                className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold transition-all hover:gap-2.5 ${
                  results.savingsPositive
                    ? "bg-[#6B21E8] text-white hover:bg-purple-500"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                See how Starlly replaces manual rounds
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M8 3.5L11 6.5 8 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}