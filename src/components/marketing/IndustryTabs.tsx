"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Building, Landmark, ShoppingBag, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: "saas",
    name: "Apps & Software",
    icon: Layers,
    title: "Software & Subscription Services",
    body: "Analyze server costs, user signup patterns, active competitor sets, and pricing packages. We show you exactly what similar software tools charge and how they get users.",
    metrics: [
      { label: "Pricing Models", value: "SaaS standard" },
      { label: "Usual Wait Times", value: "3-5 mins" },
      { label: "Acquisition Index", value: "Checked" },
    ],
  },
  {
    id: "commerce",
    name: "Online Stores",
    icon: ShoppingBag,
    title: "E-Commerce & Digital Products",
    body: "We review product pricing structures, supplier logistics, shipping fee averages, and average margins in your product category to check if your store can be profitable.",
    metrics: [
      { label: "Margin Averages", value: "Calculated" },
      { label: "Ad Cost Averages", value: "Estimated" },
      { label: "Supplier Difficulty", value: "Indexed" },
    ],
  },
  {
    id: "local",
    name: "Local Businesses",
    icon: Building,
    title: "Physical Stores & Services",
    body: "Scans nearby neighborhoods for target competitors, evaluates foot traffic patterns, maps supplier networks, and outlines estimated startup setup costs for physical storefronts.",
    metrics: [
      { label: "Radius Checked", value: "10 miles" },
      { label: "Foot Traffic Indicator", value: "Ready" },
      { label: "Competition Density", value: "Analyzed" },
    ],
  },
  {
    id: "fintech",
    name: "Finance Tools",
    icon: Landmark,
    title: "Financial Apps & Security Services",
    body: "Reviews regulatory requirements, active compliance frameworks, processing fee breakdowns, and transaction flow dynamics to help map financial products.",
    metrics: [
      { label: "Regulation Scan", value: "Completed" },
      { label: "API Provider Costs", value: "Listed" },
      { label: "Risk Category", value: "Low-Medium" },
    ],
  },
];

export function IndustryTabs() {
  const [active, setActive] = useState("saas");
  const activeIndustry = industries.find((i) => i.id === active)!;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 30 });

      gsap.to(
        headingRef.current,
        {
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % industries.length;
      document.getElementById(`tab-trigger-${industries[nextIndex].id}`)?.focus();
      setActive(industries[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + industries.length) % industries.length;
      document.getElementById(`tab-trigger-${industries[prevIndex].id}`)?.focus();
      setActive(industries[prevIndex].id);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B0B0B] py-48 sm:py-56 border-b border-white/8 relative z-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-[#F6F2EB] tracking-tight">
            Works for any business type
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#7A746C] max-w-2xl mx-auto font-medium">
            Whether you are starting an online store, a subscription app, a local business, or a financial tool, we adjust our checks to fit.
          </p>
        </div>

        {/* Triggers */}
        <div role="tablist" aria-label="Industries" className="flex flex-wrap justify-center gap-2.5 mb-14">
          {industries.map((industry, index) => (
            <button
              id={`tab-trigger-${industry.id}`}
              role="tab"
              aria-selected={active === industry.id}
              aria-controls={`tab-panel-${industry.id}`}
              tabIndex={active === industry.id ? 0 : -1}
              key={industry.id}
              onClick={() => setActive(industry.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 border focus-ring cursor-pointer ${
                active === industry.id
                  ? "bg-[#C66A3D] border-[#C66A3D] text-[#F6F2EB] shadow-lg"
                  : "bg-white/5 border-white/10 text-[#7A746C] hover:text-[#F6F2EB]"
              }`}
            >
              <industry.icon className="h-4 w-4" />
              <span>{industry.name}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Panel Content */}
        <div
          id={`tab-panel-${activeIndustry.id}`}
          role="tabpanel"
          aria-labelledby={`tab-trigger-${activeIndustry.id}`}
          className="max-w-4xl mx-auto rounded-[20px] bg-[#171717] border border-white/8 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Main Info */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-[10px] font-bold text-[#7A746C]">
                <Sparkles className="h-3 w-3 text-[#C66A3D]" />
                <span>Industry Mode</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F6F2EB] font-display">
                {activeIndustry.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#7A746C] leading-relaxed font-medium">
                {activeIndustry.body}
              </p>
            </div>

            {/* Side Metrics Card */}
            <div className="md:col-span-5 bg-[#050505] border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] text-[#7A746C] uppercase tracking-widest font-mono font-bold block mb-2">
                What we analyze:
              </span>
              <div className="space-y-3">
                {activeIndustry.metrics.map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center text-xs">
                    <span className="text-[#F6F2EB]/80 font-bold">{metric.label}</span>
                    <span className="font-mono text-[#C66A3D] font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
