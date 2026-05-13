"use client";

import { useState } from "react";

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-[#F5F3EE]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
           {/* <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6B21E8] shadow-sm transition-transform group-hover:scale-105"> 
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" fill="white" fillOpacity="0.9" />
              <path d="M7 4L10 5.75V9.25L7 11L4 9.25V5.75L7 4Z" fill="white" />
            </svg>
          </div> */}
          <span className="text-lg font-bold tracking-tight text-[#B05AD9]">Starlly</span>
        </a>

        {/* Center Nav */}
        <div className="hidden items-center gap-1 md:flex">
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Tools
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute left-0 mt-1 w-52 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
                {[
                  { label: "ROI Calculator", tag: "Free" },
                  { label: "Manual Round Audit", tag: "Free" },
                  { label: "SLA Exposure Checker", tag: "Beta" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href="#calculator"
                    onClick={() => setToolsOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span>{item.label}</span>
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                      {item.tag}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {[].map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="rounded-full bg-[#6B21E8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#5B18CC] hover:shadow-md active:scale-95"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}
