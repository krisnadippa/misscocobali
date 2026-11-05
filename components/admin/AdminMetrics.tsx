import React from "react";

export default function AdminMetrics() {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      data-purpose="kpi-metrics-row"
    >
      {/* Metric Card 1: Total earning (Highlighted Primary Card) */}
      <div className="bg-zesto-forest text-white rounded-2xl p-5 shadow-elevated relative overflow-hidden flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-zesto-mint/80 uppercase tracking-wider">
            Total earning
          </span>
          <div className="p-2 rounded-xl bg-white/10 text-zesto-lime">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <rect height="14" rx="2" width="20" x="2" y="5" />
              <line
                stroke="#0a3321"
                strokeWidth="2"
                x1="2"
                x2="22"
                y1="10"
                y2="10"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Rp 228.000.500
          </h2>
        </div>
      </div>

      {/* Metric Card 2: Total spending */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-zesto-gray-200/80 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-zesto-gray-500 uppercase tracking-wider">
            Total spending
          </span>
          <div className="p-2 rounded-xl bg-zesto-mint text-zesto-forest">
            <svg
              className="w-4 h-4 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-black text-zesto-forest tracking-tight">
            Rp 48.960.000
          </h2>
        </div>
      </div>

      {/* Metric Card 3: Lead conversation */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-zesto-gray-200/80 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-zesto-gray-500 uppercase tracking-wider">
            Lead conversation
          </span>
          <div className="p-2 rounded-xl bg-zesto-mint text-zesto-forest">
            <svg
              className="w-4 h-4 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-black text-zesto-forest tracking-tight">
            78.93%
          </h2>
        </div>
      </div>

      {/* Metric Card 4: Goal this month */}
      <div className="bg-white rounded-2xl p-5 shadow-card border border-zesto-gray-200/80 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold text-zesto-gray-500 uppercase tracking-wider">
            Goal this month
          </span>
          <div className="p-2 rounded-xl bg-zesto-mint text-zesto-forest">
            <svg
              className="w-4 h-4 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
            >
              <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <circle cx="12" cy="15" fill="currentColor" r="2" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-black text-zesto-forest tracking-tight">
            Rp 320.000.000
          </h2>
        </div>
      </div>
    </section>
  );
}

