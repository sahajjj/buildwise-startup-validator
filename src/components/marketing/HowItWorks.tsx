"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Search, FileCheck, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Type your idea in plain English",
    subtitle: "Simple and fast",
    description:
      "Tell us what you want to build, who it's for, and how you think you will make money. No business plans or templates required.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "We search the web for answers",
    subtitle: "Real-time research",
    description:
      "We check active websites, look up similar businesses, find what they charge, and see how many people are searching for your idea.",
    icon: Search,
  },
  {
    number: "03",
    title: "Get a clear roadmap report",
    subtitle: "Your actionable checklist",
    description:
      "Get a simple checklist of what you need to build first, a list of similar businesses to watch out for, and tips on how to find your first customers.",
    icon: FileCheck,
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Track active text segment
      steps.forEach((_, idx) => {
        ScrollTrigger.create({
          trigger: `.step-text-block-${idx}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="bg-[#0B0B0B] py-48 sm:py-56 border-b border-white/8 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F6F2EB] font-display tracking-tight">
            How BuildWise Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#7A746C] leading-relaxed font-medium">
            A simple 3-step pipeline from raw idea to institutional validation.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Steps */}
          <div className="space-y-32 sm:space-y-40">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  className={`step-text-block-${idx} flex gap-6 transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-12 w-12 rounded-full border flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-[#C66A3D] border-[#C66A3D] text-[#F6F2EB]"
                          : "bg-white/5 border-white/10 text-[#7A746C]"
                      }`}
                    >
                      {step.number}
                    </div>
                    {idx !== steps.length - 1 && (
                      <div className="w-0.5 h-36 bg-gradient-to-b from-white/10 to-transparent mt-4" />
                    )}
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-[#C66A3D] tracking-wide uppercase">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F6F2EB] mt-1.5 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A746C] leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Mock Visual — no sticky/pin, just always visible */}
          <div className="hidden lg:flex items-start">
            <div className="w-full border border-white/8 rounded-[20px] bg-[#171717] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[400px]"
              style={{ position: "sticky", top: "20vh" }}
            >
              
              {/* Screen Mock 1: Prompt Input (Active Step 0) */}
              {activeStep === 0 && (
                <div className="space-y-4 animate-fade-in" key="mock-0">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] text-[#7A746C] uppercase tracking-wider font-semibold">
                      New Idea Input
                    </span>
                    <span className="text-[9px] text-[#C66A3D] font-semibold bg-[#C66A3D]/10 px-2 py-0.5 rounded">
                      Step 1
                    </span>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#050505] p-4 min-h-[160px] flex flex-col justify-between font-mono text-xs">
                    <p className="text-[#7C9A6D]">
                      &gt; Enter your idea details:
                    </p>
                    <div className="text-[#F6F2EB] leading-relaxed pl-2 pt-2 border-l border-white/10">
                      "I want to launch a local logistics service that maps coffee distribution across boutique roasters. Customers get fresh custom roasts delivered within 2 hours of roasting."
                    </div>
                    <div className="flex justify-end pt-2">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">
                        Ready to process...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Screen Mock 2: Scanners (Active Step 1) */}
              {activeStep === 1 && (
                <div className="space-y-4 animate-fade-in" key="mock-1">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] text-[#7A746C] uppercase tracking-wider font-semibold">
                      Idea Scanner
                    </span>
                    <span className="text-[9px] text-[#C66A3D] font-semibold bg-[#C66A3D]/10 px-2 py-0.5 rounded">
                      Step 2
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-[#050505] border border-white/5 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#7C9A6D]" />
                        <span className="text-xs font-bold text-[#F6F2EB]">Market Size Scan</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#C66A3D]">$1.4B segment</span>
                    </div>
                    <div className="rounded-xl bg-[#050505] border border-white/5 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#C66A3D]" />
                        <span className="text-xs font-bold text-[#F6F2EB]">Competitor Match</span>
                      </div>
                      <span className="text-xs font-bold text-[#7A746C]">3 Similar Found</span>
                    </div>
                    <div className="rounded-xl bg-[#050505] border border-white/5 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                        <span className="text-xs font-bold text-[#F6F2EB]">Price Scanning</span>
                      </div>
                      <span className="text-xs font-bold text-[#7C9A6D]">Complete</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Screen Mock 3: Done/Report (Active Step 2) */}
              {activeStep === 2 && (
                <div className="space-y-4 animate-fade-in" key="mock-2">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] text-[#7A746C] uppercase tracking-wider font-semibold">
                      Your Checklist
                    </span>
                    <span className="text-[9px] text-[#7C9A6D] font-semibold bg-[#7C9A6D]/10 px-2 py-0.5 rounded">
                      Step 3
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#050505] border border-white/5 p-5 flex flex-col items-center text-center">
                    <CheckCircle2 className="h-10 w-10 text-[#7C9A6D] mb-3" />
                    <h4 className="text-sm font-bold text-[#F6F2EB]">Roadmap Report Ready</h4>
                    <p className="text-[10px] text-[#7A746C] mt-1 max-w-xs">
                      Checklist, competitor scans, and business canvas ready.
                    </p>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-4">
                      <div className="bg-[#7C9A6D] h-full rounded-full w-full" />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
