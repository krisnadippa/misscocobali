import React from "react";

export default function IngredientsSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-white font-sans px-6 sm:px-10 lg:px-12 border-t border-black/5 overflow-hidden py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 relative flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200/80 bg-white/90 shadow-sm text-xs font-bold tracking-wider text-[#0a3321] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />
              <span>PICKED BY NATURE</span>
            </div>
            <div className="relative w-full flex items-center justify-center group rounded-3xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1W05b143Udw2MQyiGSJuglxLRR6m0cV8rrhUm-ITqbGZoC4aI2_RS41GN_xFLRLl0xk1f7uuLOlI-mYbbD_XfFjNWSTBhOpH4XTU0KA3cFBiUu3ACXnSXsq-UNOFwhkReObn0Li3gl9OEYWPou1KgzrIdGnKcR49hi8hOKh97uxRIrZwaQEzYO4b1sD8WJYGWyi0PzkKkuJzGHS5HKHApVu7pKqZqnc7_5oXPGWrsI7tQ"
                alt="Hand holding Zesto Kiwi Pop and Lime Rush cans"
                className="w-full max-w-md h-auto object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative">
              <h2 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl text-[#0a3321] uppercase tracking-tight leading-[0.98]">
                FRESH STARTS WITH
                <br />
                FRESH INGREDIENTS.
              </h2>
              <span
                className="font-script absolute left-[100px] sm:left-[170px] lg:left-[190px] bottom-[-16px] sm:bottom-[-20px] text-4xl sm:text-5xl lg:text-6xl text-[#82c91e] font-bold select-none pointer-events-none whitespace-nowrap"
                style={{ transform: "rotate(-3deg)" }}
              >
                Made With Real Fruit
              </span>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium mt-6">
              The best flavors don&apos;t come from complicated formulas—they come
              from nature. Every can of ZESTO is inspired by real fruits, crisp
              botanicals, and bright citrus notes that deliver a refreshingly
              authentic taste from the very first sip. Because when the
              ingredients feel fresh, every moment does too.
            </p>
            <div className="mt-6">
              <a
                href="#flavors"
                className="bg-[#ccff00] hover:bg-[#b4e000] text-[#0a3321] font-bold text-xs sm:text-sm tracking-wider uppercase pl-7 pr-3 py-3 rounded-full inline-flex items-center gap-4 shadow-sm hover:scale-105 transition-all group"
              >
                <span className="font-extrabold">FIND YOUR FLAVOR</span>
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0a3321] shadow-sm group-hover:translate-x-0.5 transition-transform font-bold text-base">
                  →
                </span>
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-lg mt-8">
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=400&q=80"
                  alt="Kiwi and ice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-white uppercase drop-shadow-md backdrop-blur-[2px] bg-white/20 border border-white/40 px-3 py-1 rounded-full">
                    NATURAL
                  </span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80"
                  alt="Citrus slices"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-white uppercase drop-shadow-md backdrop-blur-[2px] bg-white/20 border border-white/40 px-3 py-1 rounded-full">
                    BOTANICAL
                  </span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80"
                  alt="Fresh melon and kiwi fruit slices"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-white uppercase drop-shadow-md backdrop-blur-[2px] bg-white/20 border border-white/40 px-3 py-1 rounded-full">
                    FRESH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
