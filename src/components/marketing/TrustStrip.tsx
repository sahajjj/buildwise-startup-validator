"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = ["TechCrunch", "Y Combinator", "Product Hunt", "Stripe", "Notion", "TechCrunch", "Y Combinator", "Product Hunt", "Stripe", "Notion"];

export function TrustStrip() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Loop scroll ticker animation
      const width = tickerRef.current?.scrollWidth || 0;
      gsap.to(tickerRef.current, {
        x: -width / 2,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, tickerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#0B0B0B] py-12 border-b border-white/8 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[9px] font-bold text-[#7A746C] uppercase tracking-[0.25em] mb-6">
          TRUSTED BY ELITE STARTUP BUILDERS & TEAMS
        </p>
        
        {/* Ticker Container */}
        <div className="relative w-full overflow-hidden mask-fade-edges">
          <div ref={tickerRef} className="flex items-center gap-16 w-max whitespace-nowrap select-none">
            {logos.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-lg sm:text-xl font-black tracking-tight text-[#F6F2EB]/15 hover:text-[#F6F2EB]/35 transition-colors duration-200"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
        }
      `}</style>
    </section>
  );
}
