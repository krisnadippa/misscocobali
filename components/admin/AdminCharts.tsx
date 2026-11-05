import React from "react";

export default function AdminCharts() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 gap-5"
      data-purpose="charts-section"
    >
      {/* Left: Overall sales (Bar Chart Representation) */}
      <div
        className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80 flex flex-col justify-between"
        data-purpose="overall-sales-card"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2">
          <div>
            <p className="text-xs font-bold text-zesto-gray-500 uppercase tracking-wide">
              Overall sales
            </p>
            <h3 className="text-2xl font-black text-zesto-forest mt-0.5">
              Rp 808.420.000
            </h3>
          </div>
          {/* Date Filter Pill Button */}
          <button
            type="button"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-zesto-gray-600 bg-zesto-mint px-3 py-1.5 rounded-xl border border-zesto-gray-200/70 hover:bg-zesto-gray-200 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Sept 07 - Sept 12</span>
            <svg
              className="w-3.5 h-3.5 text-zesto-forest stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
            >
              <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </button>
        </div>

        {/* Custom Vector Bar Chart Graphic */}
        <div className="pt-6 pb-2">
          <div className="flex items-end justify-between h-56 relative w-full px-2 sm:px-6">
            {/* Y-Axis Labels */}
            <div className="absolute -left-2 top-0 bottom-6 flex flex-col justify-between text-[11px] font-semibold text-zesto-gray-400 select-none">
              <span>100Jt</span>
              <span>75Jt</span>
              <span>50Jt</span>
              <span>25Jt</span>
              <span>0</span>
            </div>

            {/* Bar 1: Sept 07 */}
            <div className="flex-1 flex flex-col items-center ml-8 group">
              <div
                className="w-10 sm:w-14 bg-zesto-gray-100 rounded-t-xl transition-all duration-300 group-hover:bg-zesto-mint"
                style={{ height: "38px" }}
              />
              <span className="text-[11px] font-medium text-zesto-gray-400 mt-3">
                Sept 07
              </span>
            </div>

            {/* Bar 2: Sept 08 */}
            <div className="flex-1 flex flex-col items-center group">
              <div
                className="w-10 sm:w-14 bg-zesto-gray-100 rounded-t-xl transition-all duration-300 group-hover:bg-zesto-mint"
                style={{ height: "104px" }}
              />
              <span className="text-[11px] font-medium text-zesto-gray-400 mt-3">
                Sept 08
              </span>
            </div>

            {/* Bar 3: Sept 09 */}
            <div className="flex-1 flex flex-col items-center group">
              <div
                className="w-10 sm:w-14 bg-zesto-gray-100 rounded-t-xl transition-all duration-300 group-hover:bg-zesto-mint"
                style={{ height: "86px" }}
              />
              <span className="text-[11px] font-medium text-zesto-gray-400 mt-3">
                Sept 09
              </span>
            </div>

            {/* Bar 4: Sept 10 (Highlighted Primary Active Bar) */}
            <div className="flex-1 flex flex-col items-center relative z-10 group">
              {/* Floating Tooltip matching reference snapshot */}
              <div className="absolute -top-7 transform -translate-y-1 bg-white text-zesto-forest text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-elevated border border-zesto-gray-200 flex items-center space-x-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-zesto-lime inline-block" />
                <span>
                  Direct:{" "}
                  <span className="text-zesto-forest font-black">
                    Rp 76.034.000
                  </span>
                </span>
              </div>
              {/* Highlight Bar */}
              <div
                className="w-10 sm:w-14 bg-zesto-forest rounded-t-xl shadow-lg ring-2 ring-zesto-lime/50 transition-all duration-300 hover:brightness-110"
                style={{ height: "165px" }}
              />
              <span className="text-[11px] font-bold text-zesto-forest mt-3">
                Sept 10
              </span>
            </div>

            {/* Bar 5: Sept 11 */}
            <div className="flex-1 flex flex-col items-center group">
              <div
                className="w-10 sm:w-14 bg-zesto-gray-100 rounded-t-xl transition-all duration-300 group-hover:bg-zesto-mint"
                style={{ height: "130px" }}
              />
              <span className="text-[11px] font-medium text-zesto-gray-400 mt-3">
                Sept 11
              </span>
            </div>

            {/* Bar 6: Sept 12 */}
            <div className="flex-1 flex flex-col items-center group">
              <div
                className="w-10 sm:w-14 bg-zesto-gray-100 rounded-t-xl transition-all duration-300 group-hover:bg-zesto-mint"
                style={{ height: "94px" }}
              />
              <span className="text-[11px] font-medium text-zesto-gray-400 mt-3">
                Sept 12
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Total earning (Donut Chart Representation) */}
      <div
        className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80 flex flex-col justify-between"
        data-purpose="donut-chart-card"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zesto-forest">Total earning</h3>
          <button
            type="button"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zesto-gray-600 bg-white border border-zesto-gray-200 px-2.5 py-1 rounded-lg hover:bg-zesto-mint transition-colors cursor-pointer"
          >
            <span>Month</span>
            <svg
              className="w-3.5 h-3.5 text-zesto-gray-500 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Circular Donut Graphic with Relative Percent Badges */}
        <div className="relative flex items-center justify-center my-4 py-2">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Ring */}
            <circle
              cx="80"
              cy="80"
              fill="transparent"
              r="60"
              stroke="#f0f4f1"
              strokeWidth="20"
            />
            {/* Segment 1: Forest Green (58%) */}
            <circle
              className="donut-segment-1"
              cx="80"
              cy="80"
              fill="transparent"
              r="60"
              stroke="#0a3321"
              strokeLinecap="butt"
              strokeWidth="20"
            />
            {/* Segment 2: Vibrant Lime (24%) */}
            <circle
              className="donut-segment-2"
              cx="80"
              cy="80"
              fill="transparent"
              r="60"
              stroke="#b5e800"
              strokeLinecap="butt"
              strokeWidth="20"
            />
            {/* Segment 3: Soft Mint / Sage (6%) */}
            <circle
              className="donut-segment-3"
              cx="80"
              cy="80"
              fill="transparent"
              r="60"
              stroke="#94a397"
              strokeLinecap="butt"
              strokeWidth="20"
            />
          </svg>

          {/* Center Metric */}
          <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-2xl font-black text-zesto-forest leading-tight">
              88%
            </span>
            <span className="text-[11px] font-medium text-zesto-gray-500">
              Earnings
            </span>
          </div>

          {/* Legend Badge: Retail / Storefront (58%) */}
          <div className="absolute -top-1 right-2 bg-white px-2.5 py-1 rounded-xl shadow-md border border-zesto-gray-100 flex items-center space-x-1.5 text-left text-[11px]">
            <span className="w-2 h-2 rounded-full bg-zesto-forest inline-block" />
            <div>
              <span className="font-bold text-zesto-forest">58%</span>
              <span className="block text-[10px] text-zesto-gray-500">
                Retail
              </span>
            </div>
          </div>

          {/* Legend Badge: Wholesale / Distributor (24%) */}
          <div className="absolute bottom-2 left-2 bg-white px-2.5 py-1 rounded-xl shadow-md border border-zesto-gray-100 flex items-center space-x-1.5 text-left text-[11px]">
            <span className="w-2 h-2 rounded-full bg-zesto-lime inline-block" />
            <div>
              <span className="font-bold text-zesto-forest">24%</span>
              <span className="block text-[10px] text-zesto-gray-500">
                Wholesale
              </span>
            </div>
          </div>

          {/* Legend Badge: Subscriptions (6%) */}
          <div className="absolute -bottom-2 right-4 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-zesto-gray-100 flex items-center space-x-1.5 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-zesto-gray-400 inline-block" />
            <span className="font-bold text-zesto-forest">6%</span>
            <span className="text-zesto-gray-500">Direct</span>
          </div>
        </div>

        {/* Donut Card Footnote */}
        <p className="text-[11px] text-center text-zesto-gray-500 leading-relaxed px-4">
          <strong className="text-zesto-forest font-semibold">
            88% more earnings
          </strong>{" "}
          than last month, keep watching to optimize batch fulfillment.
        </p>
      </div>
    </section>
  );
}

