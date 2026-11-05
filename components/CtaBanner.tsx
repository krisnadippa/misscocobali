import React from "react";

export default function CtaBanner() {
  return (
    <section
      id="community"
      className="relative w-full overflow-hidden font-sans flex items-center justify-between px-6 sm:px-12 lg:px-16 select-none py-24 min-h-[540px]"
    >
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLtRId06F0aAIjJO4JY-Q8sM2emQ5iof1wQTJilbFdk2eJ5k8jKTVRh_kcJ7mKin4g5dVgnGp6bOtRuki1RWIdMgQG5KFZDfPdPi2UoGMCHuxTFKKUDW9ycTv7MQrY_g0nMwAErABSaKr8wg2DHTG7HndfqO-V6H1UaK51Oe3cfFLrQ9uatNYdCHx4zuni22R5X3fLgEyfD2id1L7AFEqEyFGqA9q2Fa118kfijtm"
          alt="Fresh chilled can of Zesto Kiwi Pop sparkling soda with fresh water droplets by swimming pool"
          className="w-full h-full object-cover object-center filter brightness-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      </div>
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div className="flex flex-col max-w-xl">
          <div className="relative mb-6">
            <h2 className="font-condensed font-black text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[0.92] drop-shadow-lg">
              READY TO TASTE THE
              <br />
              FRESHNESS?
            </h2>
            <span
              className="font-script absolute left-[140px] sm:left-[210px] bottom-[-22px] sm:bottom-[-26px] text-5xl sm:text-6xl lg:text-7xl text-[#ccff00] drop-shadow-md font-bold pointer-events-none -rotate-6 tracking-wide whitespace-nowrap z-20"
              style={{ transform: "rotate(-7deg)" }}
            >
              You&apos;re Next!
            </span>
          </div>
          <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed max-w-md drop-shadow pt-2">
            Every refreshing sip starts with ingredients inspired by nature.
            Now it&apos;s time to discover the flavor that fits your mood.
          </p>
        </div>
        <div className="md:self-end self-end pr-0 mb-0 translate-x-4 translate-y-8 sm:translate-x-8 sm:translate-y-10">
          <a
            href="#flavors"
            aria-label="Explore your flavor"
            className="group relative inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#b4e000] text-black font-condensed font-black text-sm tracking-wider uppercase pl-3 pr-6 py-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg shadow-md group-hover:-translate-y-0.5 group-hover:rotate-45 transition-transform">
              ↑
            </span>
            <span className="tracking-widest font-extrabold">
              EXPLORE YOUR FLAVOR
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
