"use client";

import React, { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="relative z-50 bg-zesto-lime text-black py-2 px-4 flex items-center justify-between text-[11px] md:text-xs font-bold tracking-wider uppercase border-b border-black/10 select-none"
      data-purpose="announcement-banner"
    >
      <div className="flex-1 text-center font-extrabold tracking-widest pl-6">
        FOR PICNICS, ROAD TRIPS, BEACH DAYS &amp; EVERYTHING IN BETWEEN.
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
        className="text-black/80 hover:text-black hover:rotate-90 transition-transform duration-200 p-0.5 focus:outline-none cursor-pointer"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x w-3.5 h-3.5 stroke-[2.5]"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}
