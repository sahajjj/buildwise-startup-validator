"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function IntroStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 30 });

      gsap.to(
        textRef.current,
        {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0B0B0B] py-48 sm:py-56 border-b border-white/8 relative overflow-hidden"
    >
      {/* Decorative technical lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Subtle structural brackets */}
        <div className="inline-block relative px-8 py-6 border-l border-r border-white/8 rounded-2xl bg-[#171717]/10 backdrop-blur-3xl">
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/12" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/12" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/12" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/12" />

          <p
            ref={textRef}
            className="text-xl sm:text-2xl md:text-3xl font-bold font-display leading-relaxed text-[#F6F2EB] tracking-tight max-w-4xl"
          >
            BuildWise empowers{" "}
            <span className="text-[#C66A3D] font-extrabold">
              founders, investors, and accelerators
            </span>{" "}
            with instant AI-powered market intelligence, enabling smarter decisions
            and faster launches.
          </p>
        </div>
      </div>
    </section>
  );
}
