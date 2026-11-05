"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-white text-slate-800 font-sans pt-16 sm:pt-20 overflow-hidden border-t border-black/5"
    >
      <div className="px-6 sm:px-10 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-16">
          <div className="relative select-none">
            <h2 className="font-condensed font-black text-5xl sm:text-6xl lg:text-7xl text-[#0a3321] uppercase tracking-tight leading-none">
              SPARK YOUR DAY.
            </h2>
            <span
              className="font-script absolute left-[120px] sm:left-[170px] lg:left-[190px] -bottom-3 sm:-bottom-4 text-4xl sm:text-5xl lg:text-6xl text-[#b5e800] font-bold pointer-events-none whitespace-nowrap drop-shadow-sm"
              style={{ transform: "rotate(-4deg)" }}
            >
              Get in Touch!
            </span>
          </div>
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="bg-[#ccff00] text-black font-condensed font-bold text-sm px-6 py-2.5 rounded-full shadow-sm text-center">
                ✓ THANK YOU FOR SUBSCRIBING!
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-full p-1.5 shadow-sm max-w-md w-full hover:border-gray-300 transition-colors"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  className="bg-transparent px-5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none flex-1 font-medium border-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="bg-[#ccff00] hover:bg-[#b4e000] text-black font-condensed font-bold text-xs uppercase tracking-wider pl-4 pr-1 py-1 rounded-full flex items-center gap-2.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span className="font-extrabold">SUBSCRIBE</span>
                  <span className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-sm shadow-sm">
                    →
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12 pb-16 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h3 className="font-condensed font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">
                NAVIGATION
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#0a3321]">
                <li>
                  <a
                    href="#flavors"
                    className="hover:text-[#82c91e] transition-colors flex items-center gap-1"
                  >
                    Flavors <span className="text-xs text-slate-400">⌄</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-[#82c91e] transition-colors flex items-center gap-1"
                  >
                    Stories <span className="text-xs text-slate-400">⌄</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#community"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-condensed font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">
                EXPLORE
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#0a3321]">
                <li>
                  <a
                    href="#flavors"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Shop Drinks
                  </a>
                </li>
                <li>
                  <a
                    href="#flavors"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Find Your Flavor
                  </a>
                </li>
                <li>
                  <a
                    href="#community"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Good Mood Club
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Journal
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-condensed font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">
                SOCIAL MEDIA
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm font-semibold text-[#0a3321]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Whatsapp
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#82c91e] transition-colors"
                  >
                    Youtube
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-condensed font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">
                  HELP &amp; COMPLAINTS
                </h3>
                <a
                  href="mailto:support@zesto.com"
                  className="text-base sm:text-lg font-bold text-[#0a3321] underline underline-offset-4 hover:text-[#82c91e] transition-colors block"
                >
                  support@zesto.com
                </a>
              </div>
              <div className="self-end mt-8 lg:mt-0">
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="w-10 h-10 rounded-full border border-gray-300 text-slate-700 hover:text-black hover:border-black flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                >
                  <span className="text-base font-bold">↑</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 zesto, All rights reserved</p>
          <div className="flex items-center gap-6 font-medium">
            <span className="cursor-pointer hover:text-black">
              Terms &amp; Condition
            </span>
            <span className="cursor-pointer hover:text-black">
              Privacy Policy
            </span>
            <a href="/admin" className="cursor-pointer hover:text-black font-semibold text-emerald-800">
              Admin Portal
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden select-none pointer-events-none pt-12 sm:pt-16 lg:pt-20 mt-6 sm:mt-8 -mb-4 sm:-mb-6">
        <div className="relative w-full flex justify-center items-end">
          <span
            className="font-script absolute left-1/2 -translate-x-1/2 top-4 sm:top-8 lg:top-10 text-6xl sm:text-7xl lg:text-8xl text-[#ccff00] font-bold z-10 whitespace-nowrap drop-shadow-sm"
            style={{ transform: "translate(-50%, 0px) rotate(-6deg)" }}
          >
            Try Zesto!
          </span>
          <h1
            className="font-condensed font-black text-[#0a3321] uppercase tracking-tighter text-center leading-none w-full select-none"
            style={{
              fontSize: "clamp(5rem, 20.8vw, 24rem)",
              letterSpacing: "-0.035em",
              transform: "scaleY(1.35) translateY(4%)",
              transformOrigin: "center bottom",
              lineHeight: 0.85,
            }}
          >
            NATURALLY
          </h1>
        </div>
      </div>
    </footer>
  );
}
