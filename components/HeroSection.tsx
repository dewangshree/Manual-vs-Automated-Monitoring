"use client";

export default function HeroSection() {
  const metrics = [
    { value: "5", label: "Frameworks" },
    { value: "6", label: "Industry Domains" },
    { value: "24/7", label: "Automated" },
    { value: "94%", label: "SLA Met Avg." },
  ];

  return (
    <section className="relative overflow-hidden pt-16 pb-12">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 orb" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-700">
              Tool 02 — Free Calculator
            </span>
          </div>

          {/* Heading */}
          <h1 className="display-heading mx-auto max-w-3xl text-4xl text-[#1A1523] sm:text-5xl lg:text-6xl">
            Manual Rounds vs {" "}
            <span className="italic text-[#6B21E8]">Automated</span>
            <br />
           Monitoring
          </h1>

          {/* Sub */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
            Most ops teams don&apos;t realise how much manual round labour costs vs what
            automated monitoring would. Calculate your true exposure in 30 seconds.
          </p>

          {/* Metric Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {metrics.map((m) => (
              <div key={m.label} className="metric-badge">
                <span className="font-bold text-[#6B21E8]">{m.value}</span>
                <span className="text-gray-500">{m.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#calculator"
              className="flex items-center gap-2 rounded-full bg-[#6B21E8] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-[#5B18CC] hover:shadow-lg active:scale-95"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="1" y="1" width="13" height="13" rx="3" stroke="white" strokeWidth="1.4" />
                <path d="M4 5h7M4 7.5h7M4 10h4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Calculate My ROI
            </a>
           
          </div>
        </div>
      </div>
    </section>
  );
}
