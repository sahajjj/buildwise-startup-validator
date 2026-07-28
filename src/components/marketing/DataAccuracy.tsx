"use client";

import { useEffect, useRef } from "react";
import { Check, Database, Brain, RefreshCw, MessageSquareText, Zap, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const checklistItems = [
  { icon: Globe, text: "Real-time web search" },
  { icon: Database, text: "Current business scans" },
  { icon: RefreshCw, text: "Up-to-date prices" },
  { icon: MessageSquareText, text: "Double-checked answers" },
];

export function DataAccuracy() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states via GSAP on mount
      gsap.set(leftRef.current, { opacity: 0, x: -40 });
      gsap.set(".accuracy-item", { opacity: 0, x: 40 });

      gsap.to(leftRef.current, {
        scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      const items = rightRef.current?.querySelectorAll(".accuracy-item");
      if (items) {
        gsap.to(items, {
          scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B0B0B] py-48 sm:py-56 overflow-hidden border-b border-white/8 relative z-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Custom SVG Data Pipeline Visualizer */}
          <div ref={leftRef} className="w-full max-w-md mx-auto relative">
            <div className="relative w-full aspect-square border border-white/8 rounded-[20px] bg-[#171717] p-6 shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Data Flow Visualization Panel */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <span className="text-[10px] uppercase font-bold text-[#7A746C] tracking-wider font-mono">
                  LIVE DATA PIPELINE
                </span>
                <span className="h-2 w-2 rounded-full bg-[#7C9A6D] animate-pulse" />
              </div>

              {/* Core Nodes */}
              <div className="flex-1 flex items-center justify-between relative px-2">
                {/* SVG Pipeline Links - Clean static and animated flowing paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  {/* Background static tracks */}
                  <path d="M 40,50 L 160,110" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                  <path d="M 40,110 L 160,110" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                  <path d="M 40,170 L 160,110" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                  
                  {/* Flowing animated lines */}
                  <path d="M 40,50 L 160,110" stroke="#C66A3D" strokeWidth="2" strokeDasharray="4, 12" className="flowing-line" fill="none" />
                  <path d="M 40,110 L 160,110" stroke="#C66A3D" strokeWidth="2" strokeDasharray="4, 12" className="flowing-line" fill="none" />
                  <path d="M 40,170 L 160,110" stroke="#7C9A6D" strokeWidth="2" strokeDasharray="4, 12" className="flowing-line" fill="none" />
                </svg>

                {/* Left node columns */}
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="h-10 w-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center shadow-sm">
                    <Globe className="h-5 w-5 text-[#C66A3D]" />
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center shadow-sm">
                    <Database className="h-5 w-5 text-[#C66A3D]" />
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center shadow-sm">
                    <Zap className="h-5 w-5 text-[#7C9A6D]" />
                  </div>
                </div>

                {/* Central CPU Core Node */}
                <div className="relative z-10 mr-4">
                  <div className="h-16 w-16 rounded-2xl bg-[#050505] border border-white/10 flex items-center justify-center shadow-xl relative">
                    <Brain className="h-8 w-8 text-[#C66A3D]" />
                  </div>
                </div>
              </div>

              {/* Status Info bar */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-[#7A746C] font-mono">
                <span>Ingest: 1,420 kb/s</span>
                <span>CPU: 12%</span>
              </div>

            </div>
          </div>

          {/* Right: Content + Checklist Column */}
          <div ref={rightRef} className="max-w-xl">
            <div className="accuracy-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs font-semibold text-[#7A746C] mb-6">
              How we get our data
            </div>
            <h2 className="accuracy-item text-3xl sm:text-5xl font-extrabold font-display leading-tight text-[#F6F2EB] tracking-tight">
              Always fresh, always real
            </h2>
            <p className="accuracy-item mt-5 text-sm sm:text-base text-[#7A746C] leading-relaxed font-medium">
              We don't guess or use outdated business templates. Every time you submit an idea, we look at the web as it is today to get the most accurate, real answers.
            </p>

            <div className="mt-8 space-y-4">
              {checklistItems.map((item) => (
                <div
                  key={item.text}
                  className="accuracy-item flex items-center gap-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C9A6D]/10">
                    <Check className="h-4 w-4 text-[#7C9A6D]" />
                  </div>
                  <span className="text-[#F6F2EB]/80 text-xs sm:text-sm font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
