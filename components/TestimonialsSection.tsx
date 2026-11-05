import React from "react";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#fbfbe6] font-sans py-20 lg:py-24 px-6 sm:px-10 lg:px-12 border-t border-black/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200/80 bg-white/80 w-fit text-[11px] font-bold tracking-wider text-[#0a3321] uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
              <span>TESTIMONIALS</span>
            </div>
            <div className="relative mt-2">
              <h2 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl text-[#0a3321] uppercase tracking-tight leading-[0.92]">
                FRESH REVIEWS FROM
                <br />
                FRESH PEOPLE
              </h2>
              <span
                className="font-script absolute left-[260px] sm:left-[360px] bottom-[-16px] sm:bottom-[-20px] text-4xl sm:text-5xl lg:text-6xl text-[#ccff00] drop-shadow-sm font-bold select-none pointer-events-none whitespace-nowrap"
                style={{ transform: "rotate(-3deg)" }}
              >
                Naturally Vibrant
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end md:self-auto mb-2">
            <button
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-gray-200 bg-white text-slate-600 hover:text-black hover:border-black flex items-center justify-center transition-colors active:scale-95 shadow-sm cursor-pointer"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>
            <button
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border-2 border-[#ccff00] bg-white text-black hover:bg-[#ccff00] flex items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Emma Rodriguez */}
          <div className="bg-white rounded-[26px] p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-black/5">
            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-1iwbLO-UPJV9i9uNM8rCO6aBeyS_ixeNrkg9a8nKnVOR8t_nD5u7_L85mwM6FZFGnkzFsbOQJ4VAekhGuy7cniYiv3INtXMFuwLoRgEOiAe-JYd5-IAWLyJXTN0NSZ6RBW6h6ZJvfyEFtubEGR0FK-2cg9KREGivXSmKjXGND_vUEQ0FNW8vvb-s4zfy_2_hZbN8Oz-yCyeQFF8vl9-Vp1muXhb2JFubTk_Hs_F0"
                alt="Young man kayaking with a sparkling drink"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="px-2 pt-4 flex-1 flex flex-col justify-between">
              <div className="mb-6">
                <div className="text-[#82c91e] text-3xl font-black leading-none mb-2 font-serif select-none">
                  “
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  Every sip feels incredibly fresh, light, and perfect for sunny afternoons with friends.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Emma Rodriguez"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-condensed font-black text-xs uppercase tracking-tight text-[#0a3321] leading-tight">
                      EMMA RODRIGUEZ
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400">
                      Graphic Designer
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200/80 bg-gray-50/60 text-[11px] font-bold text-slate-700">
                  <span className="text-[#e69b00]">★</span>
                  <span>5 / 5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Daniel Kim */}
          <div className="bg-white rounded-[26px] p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-black/5">
            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Wj3uwWtEUI4VEnAKS0ETpOcfY22UFkH4C2Jry9BOrK01GHXF_6qkz7KjvDA8sXXzD6Zm5iwdQGg2z8M2JCkxruostD_UCDg1__HXcu0LYkYImI4sI5Y3bdXOzxTKxEgB7hPYgObQwqRa-0BU-Vyfd7TyWyGcfW2-d1yDFgWdWkEjHwU8FFARad6lBmp28dDcJMmq9d3432PaffkbW89XJIu36eIIQ-eXNnPWsaMu"
                alt="Friends playing beach volleyball with sparkling drinks"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="px-2 pt-4 flex-1 flex flex-col justify-between">
              <div className="mb-6">
                <div className="text-[#82c91e] text-3xl font-black leading-none mb-2 font-serif select-none">
                  “
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  Bright flavors, crisp bubbles, and zero boredom. Exactly what refreshing should taste.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Daniel Kim"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-condensed font-black text-xs uppercase tracking-tight text-[#0a3321] leading-tight">
                      DANIEL KIM
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400">
                      Content Creator
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200/80 bg-gray-50/60 text-[11px] font-bold text-slate-700">
                  <span className="text-[#e69b00]">★</span>
                  <span>5 / 5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Ethan Walker */}
          <div className="bg-white rounded-[26px] p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-black/5">
            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9JFUg_sY4UUZEuDqI8XlDBMUOb8hTTk3o77qEFYzoOi4F3_LWvrWNB2HjVy-mpwUWBq7Z-eo9RtDkYa75l26I2IfBUn_py9Z-YOGTVwmWTMiDNQD4YaRLw1v7GiknBWEYzb43BquXTmkRJgfgbMH0KWmtjMvQn6l39AhqNGTYtjD7cCh74LajeE04_BwiGNKj0HR2nANmp6O62OxDacsj8RBgZ6HgVm-igePzpOmn"
                alt="Can of melon sparkling soda floating in turquoise water"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="px-2 pt-4 flex-1 flex flex-col justify-between">
              <div className="mb-6">
                <div className="text-[#82c91e] text-3xl font-black leading-none mb-2 font-serif select-none">
                  “
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  Fresh ingredients and bubble that instantly make every moment feel brighter.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt="Ethan Walker"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="font-condensed font-black text-xs uppercase tracking-tight text-[#0a3321] leading-tight">
                      ETHAN WALKER
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400">
                      Photographer
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200/80 bg-gray-50/60 text-[11px] font-bold text-slate-700">
                  <span className="text-[#e69b00]">★</span>
                  <span>5 / 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
