"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const word = "SPARKLING";

  useEffect(() => {
    // Kunci scroll saat loading
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
          document.body.style.overflow = "";
        },
      });

      // 1. Initial State
      gsap.set(lettersRef.current, {
        y: "115%",
        opacity: 0,
        rotateX: -45,
        filter: "blur(8px)",
      });
      gsap.set(badgeRef.current, { y: 20, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });

      // 2. Animate Badge & Progress line
      tl.to(badgeRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        // 3. Stagger Perhuruf "SPARKLING" menulis/muncul
        .to(
          lettersRef.current,
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.08,
            ease: "back.out(1.4)",
          },
          "-=1.1"
        )
        // Glow pulse
        .to(
          lettersRef.current,
          {
            textShadow: "0 0 35px rgba(199,248,0,0.8)",
            duration: 0.4,
            stagger: 0.04,
            yoyo: true,
            repeat: 1,
          },
          "-=0.2"
        )
        // 4. Zoom out / morph transition and slide up reveal
        .to(lettersRef.current, {
          letterSpacing: "0.08em",
          duration: 0.6,
          ease: "power2.inOut",
        })
        .to(
          [badgeRef.current, lineRef.current, counterRef.current],
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.2"
        )
        .to(
          lettersRef.current,
          {
            y: "-120%",
            opacity: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: "power3.in",
          },
          "-=0.1"
        )
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0a3321] text-white flex flex-col justify-between items-center select-none overflow-hidden px-4 py-8 sm:py-12"
      style={{ willChange: "transform" }}
    >
      {/* Top brand header */}
      <div
        ref={badgeRef}
        className="flex items-center gap-2 pt-2 tracking-widest text-xs font-black uppercase text-[#C7F800]"
      >
        <span className="w-2 h-2 rounded-full bg-[#C7F800] animate-ping" />
        <span>ZESTÓ BALI • REFRESHING PURITY</span>
      </div>

      {/* Center Hero-matched SPARKLING typography per huruf */}
      <div className="w-full flex flex-col items-center justify-center my-auto overflow-hidden">
        <div
          className="overflow-hidden flex justify-center items-center py-2 sm:py-4"
          style={{ perspective: "1000px" }}
        >
          <h1
            className="font-condensed font-black tracking-tighter uppercase leading-none text-center flex justify-center text-[#C7F800]"
            style={{
              fontSize: "clamp(3.5rem, 16vw, 15rem)",
              lineHeight: 0.85,
            }}
          >
            {word.split("").map((letter, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  lettersRef.current[idx] = el;
                }}
                className="inline-block transform-gpu"
                style={{ willChange: "transform, opacity" }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Progress line */}
        <div className="w-48 sm:w-80 h-[2px] bg-white/10 mt-6 sm:mt-10 rounded-full overflow-hidden">
          <div
            ref={lineRef}
            className="w-full h-full bg-[#C7F800] origin-left"
          />
        </div>
      </div>

      {/* Bottom status */}
      <div className="flex items-center justify-between w-full max-w-sm text-[11px] font-mono uppercase text-white/50 tracking-wider">
        <span>COLD-CHAIN VERIFIED</span>
        <span ref={counterRef} className="text-[#C7F800] font-bold">
          100% BALI NATURAL
        </span>
      </div>
    </div>
  );
}

