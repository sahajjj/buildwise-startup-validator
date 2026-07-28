"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Users, Route, Megaphone, ArrowUpRight, CheckSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CapabilitiesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Card 1: Interactive TAM Slider state
  const [targetCustomers, setTargetCustomers] = useState(50000);
  const [aov, setAov] = useState(99);

  // Card 3: Interactive Roadmap checkbox states (starts unchecked for scroll animation)
  const [checkedList, setCheckedList] = useState([false, false, false, false]);

  // Card 2: Venn Nodes Refs
  const leftVennRef = useRef<HTMLDivElement>(null);
  const rightVennRef = useRef<HTMLDivElement>(null);

  const tamValue = targetCustomers * aov;
  const progressPercent = Math.round((checkedList.filter(Boolean).length / checkedList.length) * 100);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states via GSAP on mount to avoid layout bugs
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(".bento-card", { opacity: 0, y: 40 });

      // Venn nodes initial states separated
      gsap.set(leftVennRef.current, { x: -32, opacity: 0 });
      gsap.set(rightVennRef.current, { x: 32, opacity: 0 });

      gsap.to(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const items = gridRef.current?.querySelectorAll(".bento-card");
      if (items) {
        gsap.to(items, {
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // Venn circles converge animation on scroll
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(leftVennRef.current, { x: -16, opacity: 0.4, duration: 1.2, ease: "power2.out" });
          gsap.to(rightVennRef.current, { x: 16, opacity: 0.4, duration: 1.2, ease: "power2.out" });
        },
        onLeaveBack: () => {
          gsap.to(leftVennRef.current, { x: -32, opacity: 0, duration: 0.5 });
          gsap.to(rightVennRef.current, { x: 32, opacity: 0, duration: 0.5 });
        }
      });

      // Roadmap checklists auto-fill step stagger on scroll
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 75%",
        onEnter: () => {
          setTimeout(() => setCheckedList([true, false, false, false]), 400);
          setTimeout(() => setCheckedList([true, true, false, false]), 900);
        },
        onLeaveBack: () => {
          setCheckedList([false, false, false, false]);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleCheck = (idx: number) => {
    const nextList = [...checkedList];
    nextList[idx] = !nextList[idx];
    setCheckedList(nextList);
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="bg-[#0B0B0B] py-48 sm:py-56 border-b border-white/8 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs font-semibold text-[#7A746C] mb-6">
            <span>Features</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-[#F6F2EB] tracking-tight">
            What BuildWise figures out for you
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#7A746C] max-w-2xl mx-auto">
            A clear breakdown of the most important things you need to know before starting a project.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Market Validation (Interactive TAM Slider) - Col Span 2 */}
          <div
            className="bento-card col-span-1 md:col-span-2 rounded-[20px] border border-white/8 bg-[#171717] p-6 sm:p-8 flex flex-col justify-between hover:border-white/16 transition-all duration-300 group hover:shadow-2xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C66A3D]/10 text-[#C66A3D]">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-[#7A746C] uppercase tracking-widest font-mono font-bold">
                  Estimator
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F6F2EB] mb-2">
                Estimate your potential market
              </h3>
              <p className="text-xs sm:text-sm text-[#7A746C] leading-relaxed mb-8 max-w-md">
                Slide the numbers to see how much money you could make if you capture a share of the market.
              </p>

              {/* Sliders Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#050505] border border-white/5 rounded-2xl p-5 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-[#F6F2EB]/80">
                    <span>Target Customers</span>
                    <span className="text-[#C66A3D] font-mono">{targetCustomers.toLocaleString("en-US")}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="5000"
                    value={targetCustomers}
                    onChange={(e) => setTargetCustomers(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C66A3D]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-[#F6F2EB]/80">
                    <span>Annual Purchase Value</span>
                    <span className="text-[#C66A3D] font-mono">${aov}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="10"
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C66A3D]"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Output */}
            <div className="border-t border-white/5 pt-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-[#7A746C] tracking-wider font-bold">Estimated Market Value</span>
                <div className="text-2xl font-black text-[#F6F2EB] font-mono mt-0.5">
                  ${tamValue.toLocaleString("en-US")}
                </div>
              </div>
              <div className="h-10 w-10 rounded-full border border-white/8 flex items-center justify-center text-[#F6F2EB] group-hover:bg-[#C66A3D] group-hover:border-[#C66A3D] transition-all cursor-pointer">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Competitor Radar - Col Span 1 */}
          <div
            className="bento-card col-span-1 rounded-[20px] border border-white/8 bg-[#171717] p-6 sm:p-8 flex flex-col justify-between hover:border-white/16 transition-all duration-300 group hover:shadow-2xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-[#7A746C] uppercase tracking-widest font-mono font-bold">
                  Competitors
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F6F2EB] mb-2">
                Find who else is doing it
              </h3>
              <p className="text-xs sm:text-sm text-[#7A746C] leading-relaxed mb-6">
                See what similar businesses exist and find gaps where they aren't serving customers well.
              </p>

              {/* Visual Venn / Nodes mockup */}
              <div className="relative h-28 border border-white/5 rounded-2xl bg-[#050505] overflow-hidden flex items-center justify-center">
                <div ref={leftVennRef} className="absolute w-20 h-20 rounded-full border border-white/5 bg-[#171717]" />
                <div ref={rightVennRef} className="absolute w-20 h-20 rounded-full border border-white/5 bg-[#171717]" />
                <div className="absolute w-12 h-12 rounded-full border border-[#C66A3D]/40 bg-[#C66A3D]/10 flex items-center justify-center z-10">
                  <span className="text-[9px] font-bold text-[#C66A3D]">You</span>
                </div>
                <span className="absolute top-2 left-3 text-[8px] text-[#7A746C] uppercase tracking-widest font-bold">
                  Competitor Gaps
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 flex items-center justify-between">
              <span className="text-xs font-bold text-[#7A746C]">24 Competitors Found</span>
              <div className="h-10 w-10 rounded-full border border-white/8 flex items-center justify-center text-[#F6F2EB] group-hover:bg-[#C66A3D] group-hover:border-[#C66A3D] transition-all cursor-pointer">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Card 3: MVP Timeline & Checklist - Col Span 1 */}
          <div
            className="bento-card col-span-1 rounded-[20px] border border-white/8 bg-[#171717] p-6 sm:p-8 flex flex-col justify-between hover:border-white/16 transition-all duration-300 group hover:shadow-2xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C66A3D]/10 text-[#C66A3D]">
                  <Route className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-[#7A746C] uppercase tracking-widest font-mono font-bold">
                  Checklist
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F6F2EB] mb-2">
                Step-by-step checklist
              </h3>
              <p className="text-xs sm:text-sm text-[#7A746C] leading-relaxed mb-6">
                A simple list of what you need to build first to launch your project.
              </p>

              {/* Interactive checklist mockup */}
              <div className="space-y-2 bg-[#050505] border border-white/5 rounded-2xl p-4">
                {["Database Abstraction", "SaaS Core Auth", "Analytics API Connect", "Stripe Checkout Setup"].map((label, idx) => (
                  <div
                    key={label}
                    onClick={() => toggleCheck(idx)}
                    className="flex items-center gap-3 cursor-pointer select-none group/item"
                  >
                    <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-all duration-200 ${
                      checkedList[idx] ? "bg-[#7C9A6D] border-[#7C9A6D] text-[#0B0B0B]" : "border-white/10 text-transparent"
                    }`}>
                      <CheckSquare className="h-3 w-3" />
                    </div>
                    <span className="text-[10px] font-bold text-[#F6F2EB]/80 transition-colors group-hover/item:text-[#F6F2EB]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 flex items-center justify-between">
              <div>
                <span className="text-[8px] uppercase tracking-wider text-[#7A746C] font-bold block">MVP Core Progress</span>
                <span className="text-xs font-extrabold text-[#F6F2EB]">{progressPercent}% Completed</span>
              </div>
              <div className="h-10 w-10 rounded-full border border-white/8 flex items-center justify-center text-[#F6F2EB] group-hover:bg-[#C66A3D] group-hover:border-[#C66A3D] transition-all cursor-pointer">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Card 4: Go-to-Market Strategy - Col Span 2 */}
          <div
            className="bento-card col-span-1 md:col-span-2 rounded-[20px] border border-white/8 bg-[#171717] p-6 sm:p-8 flex flex-col justify-between hover:border-white/16 transition-all duration-300 group hover:shadow-2xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C66A3D]/10 text-[#C66A3D]">
                  <Megaphone className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-[#7A746C] uppercase tracking-widest font-mono font-bold">
                  GTM Plan
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#F6F2EB] mb-2">
                How to get customers
              </h3>
              <p className="text-xs sm:text-sm text-[#7A746C] leading-relaxed mb-8 max-w-md">
                Simple advice on where to find your first users, whether through Google, ads, or word of mouth.
              </p>

              {/* Grid graphic mockup */}
              <div className="grid grid-cols-3 gap-3 bg-[#050505] border border-white/5 rounded-2xl p-4">
                <div className="text-center p-3 rounded-xl bg-[#171717] border border-white/8 shadow-sm">
                  <span className="block text-[8px] text-[#7A746C] font-bold uppercase">SEO Velocity</span>
                  <span className="text-xs font-bold text-[#F6F2EB] mt-1 block">High</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#171717] border border-white/8 shadow-sm">
                  <span className="block text-[8px] text-[#C66A3D] font-bold uppercase">Direct Ads</span>
                  <span className="text-xs font-bold text-[#C66A3D] mt-1 block">Ready</span>
                </div>
                <div className="text-center p-3 rounded-xl bg-[#171717] border border-white/8 shadow-sm">
                  <span className="block text-[8px] text-[#7C9A6D] font-bold uppercase">Viral Index</span>
                  <span className="text-xs font-bold text-[#7C9A6D] mt-1 block">1.4x</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 flex items-center justify-between">
              <span className="text-xs font-bold text-[#7A746C]">Integrated Acquisition Plan</span>
              <div className="h-10 w-10 rounded-full border border-white/8 flex items-center justify-center text-[#F6F2EB] group-hover:bg-[#C66A3D] group-hover:border-[#C66A3D] transition-all cursor-pointer">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
