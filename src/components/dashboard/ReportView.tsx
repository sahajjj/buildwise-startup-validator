"use client";

import { useState } from "react";

import { MarketDataType } from "@/lib/schemas";
import { TAMChart } from "./charts/TAMChart";
import { RevenueChart } from "./charts/RevenueChart";
import { SWOTGrid } from "./charts/SWOTGrid";
import { ChatPanel } from "./ChatPanel";
import {
  FileDown,
  TrendingUp,
  MessageSquare,
  Users,
  Route,
  Zap,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface ReportViewProps {
  reportId: string;
  title: string;
  ideaDescription: string;
  industry: string;
  targetAudience: string;
  validationScore: number;
  marketData: MarketDataType;
}

export function ReportView({
  reportId,
  title,
  ideaDescription,
  industry,
  targetAudience,
  validationScore,
  marketData,
}: ReportViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [chatOpen, setChatOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [eli5Mode, setEli5Mode] = useState(true); // Defaults to true for friendly onboarding experience

  const tabs = [
    { id: "overview", label: eli5Mode ? "✨ Quick Summary" : "Overview", icon: Zap },
    { id: "competitors", label: eli5Mode ? "Other Businesses" : "Competitors", icon: Users },
    { id: "swot", label: eli5Mode ? "Good vs. Bad" : "SWOT & Risks", icon: AlertTriangle },
    { id: "pricing", label: eli5Mode ? "Money & Forecasts" : "Pricing & Forecast", icon: DollarSign },
    { id: "roadmap", label: eli5Mode ? "What to Build First" : "MVP & Personas", icon: Route },
    { id: "gtm", label: eli5Mode ? "Finding Customers" : "Go-To-Market", icon: TrendingUp },
  ];

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/pdf`, { method: "POST" });
      if (!res.ok) throw new Error("Export failed");
      const data = await res.json();
      if (data.pdfUrl) {
        window.open(data.pdfUrl, "_blank");
      } else {
        alert("PDF generated! Download link would show here in production.");
      }
    } catch (e) {
      console.error(e);
      alert("PDF generation is currently in developer sandbox mock mode.");
    } finally {
      setExporting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#15803D] bg-[#15803D]/5 border-[#15803D]/15";
    if (score >= 60) return "text-[#B45309] bg-[#B45309]/5 border-[#B45309]/15";
    return "text-[#B91C1C] bg-[#B91C1C]/5 border-[#B91C1C]/15";
  };
 
  return (
    <div className="flex h-[calc(100vh-64px)] relative overflow-hidden text-text-primary">
      {/* Left: Report Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 space-y-6 bg-surface-canvas">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-default pb-5 shrink-0 bg-surface-raised -mx-6 -mt-6 p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#00D28A]/10 border border-[#00D28A]/20 text-[10px] font-bold text-[#00D28A] uppercase tracking-wider">
                {industry}
              </span>
              <span className="text-xs text-text-tertiary">Created recently</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-text-primary mt-2">
              {title}
            </h1>
          </div>
 
          <div className="flex items-center gap-3">
            {/* Plain English Switch */}
            <div className="flex items-center gap-2 bg-surface-sunken border border-border-default rounded-full px-3 py-1.5 mr-1">
              <span className={`text-[10px] font-extrabold tracking-wide uppercase transition-colors duration-200 ${eli5Mode ? "text-[#00D28A]" : "text-gray-400"}`}>
                ✨ Plain English
              </span>
              <button
                type="button"
                onClick={() => setEli5Mode(!eli5Mode)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${eli5Mode ? "bg-[#00D28A]" : "bg-white/10"}`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${eli5Mode ? "translate-x-4" : "translate-x-0"}`}
                />
              </button>
            </div>

            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-border-default text-text-secondary hover:text-[#F6F2EB] hover:border-border-strong rounded-full transition-colors bg-surface-sunken focus-ring cursor-pointer"
            >
              <FileDown className="h-4 w-4" />
              {exporting ? "Exporting..." : "Export PDF"}
            </button>
 
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#FF6F61] text-white hover:bg-[#FF8A80] rounded-full transition-colors focus-ring cursor-pointer shadow-sm"
            >
              <MessageSquare className="h-4 w-4" />
              AI Co-Founder
            </button>
          </div>
        </div>
 
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border focus-ring cursor-pointer ${
                  isActive
                    ? "bg-[#00D28A] text-white border-[#00D28A] shadow-sm"
                    : "bg-surface-raised text-text-secondary border-border-default hover:text-text-primary hover:border-border-strong"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
 
        {/* Tab Content Display */}
        <div className="flex-1 bg-surface-raised border border-border-default rounded-2xl p-6 sm:p-8 shadow-lg">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Executive Verdict Block */}
              <div className={`border rounded-2xl p-6 relative overflow-hidden bg-gradient-to-r ${
                (marketData.simpleSummary?.verdict || (validationScore >= 80 ? "Go" : validationScore >= 60 ? "Caution" : "Pivot")) === "Go"
                  ? "from-emerald-950/20 to-emerald-900/5 border-emerald-800/40 text-emerald-300"
                  : (marketData.simpleSummary?.verdict || (validationScore >= 80 ? "Go" : validationScore >= 60 ? "Caution" : "Pivot")) === "Caution"
                  ? "from-amber-950/20 to-amber-900/5 border-amber-800/40 text-amber-300"
                  : "from-red-950/20 to-red-900/5 border-red-800/40 text-red-300"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        (marketData.simpleSummary?.verdict || (validationScore >= 80 ? "Go" : validationScore >= 60 ? "Caution" : "Pivot")) === "Go"
                          ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                          : (marketData.simpleSummary?.verdict || (validationScore >= 80 ? "Go" : validationScore >= 60 ? "Caution" : "Pivot")) === "Caution"
                          ? "bg-amber-950/40 border-amber-800 text-amber-400"
                          : "bg-red-950/40 border-red-800 text-red-400"
                      }`}>
                        {(marketData.simpleSummary?.verdict || (validationScore >= 80 ? "Go" : validationScore >= 60 ? "Caution" : "Pivot")) === "Go"
                          ? "🟢 Actionable Recommendation: GO"
                          : (marketData.simpleSummary?.verdict || (validationScore >= 80 ? "Go" : validationScore >= 60 ? "Caution" : "Pivot")) === "Caution"
                          ? "🟡 Actionable Recommendation: CAUTION / PIVOT"
                          : "🔴 Actionable Recommendation: PIVOT / HIGH RISK"}
                      </span>
                      <span className="text-xs font-semibold opacity-70">Executive Verdict</span>
                    </div>
                    <p className="text-sm font-semibold mt-1">
                      {marketData.simpleSummary?.verdictReason || 
                        (validationScore >= 80 
                          ? "This idea has high potential. Market size, competitor gaps, and monetization readiness indicate a strong product-market fit."
                          : validationScore >= 60 
                          ? "This idea has good fundamentals but competitive pressures or smaller accessibility rates suggest you pivot or narrow down your niche."
                          : "This segment is highly competitive or hard to reach. Consider tweaking your core value proposition before building.")
                      }
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold opacity-60">Validation Score</span>
                      <div className="text-3xl font-extrabold font-display leading-none mt-1">
                        {validationScore}
                      </div>
                    </div>
                  </div>
                </div>

                {eli5Mode && (
                  <div className="mt-4 pt-4 border-t border-current/10 space-y-4">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wide opacity-80">🧸 The "Explain Like I'm 5" Story</h4>
                      <p className="text-xs mt-1 leading-relaxed opacity-90">
                        {marketData.simpleSummary?.eli5Explanation || 
                          "This startup is like a handy helper that makes it easy for people to solve a daily headache. Since many people share this exact same problem, they will be happy to pay you to solve it for them."
                        }
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wide opacity-80">🗺️ Your First 3 Simple Steps</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 text-xs">
                        {(marketData.simpleSummary?.topThreeSteps || [
                          "Talk to 5 potential customers about their biggest struggles.",
                          "Draw a simple picture or sketch of how your product works.",
                          "Show your sketch to users to see if they'd pay for it."
                        ]).map((step, idx) => (
                          <li key={idx} className="bg-black/20 border border-current/10 rounded-xl p-3 flex gap-2">
                            <span className="font-extrabold text-sm opacity-60 leading-none">{idx + 1}</span>
                            <span className="leading-tight font-medium opacity-90">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Gauge Chart */}
                <div className={`border rounded-2xl p-6 text-center ${getScoreColor(validationScore)}`}>
                  <div className="text-xs font-bold uppercase tracking-wider">{eli5Mode ? "Niche Viability" : "Validation Score"}</div>
                  <div className="text-5xl font-extrabold font-display my-3">{validationScore}</div>
                  <div className="text-[10px] opacity-75 max-w-[160px] mx-auto leading-normal">
                    {eli5Mode 
                      ? "A score closer to 100 means it is simpler to build and easier to find paying customers." 
                      : "This score rates product market fit, competitive gaps, and GTM viability."}
                  </div>
                </div>
 
                {/* TAM/SAM/SOM stats */}
                <div className="col-span-2 border border-border-default rounded-2xl p-6 space-y-4">
                  <h3 className="font-display font-bold text-text-primary text-sm">
                    {eli5Mode ? "How big is the customer pool?" : "Market Volume Breakdown"}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: eli5Mode ? "Total Market" : "TAM", value: marketData.tamSamSom.tam, desc: eli5Mode ? "If everyone bought it" : "Total Addressable" },
                      { label: eli5Mode ? "Accessible Niche" : "SAM", value: marketData.tamSamSom.sam, desc: eli5Mode ? "Who you can reach" : "Serviceable Addressable" },
                      { label: eli5Mode ? "Early Target" : "SOM", value: marketData.tamSamSom.som, desc: eli5Mode ? "Who you want to win first" : "Serviceable Obtainable" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{m.label}</div>
                        <div className="text-lg font-bold text-text-primary mt-0.5">
                          ${(m.value / 1000000).toLocaleString()}M
                        </div>
                        <div className="text-[9px] text-text-tertiary leading-none">{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
 
              {/* Market size chart */}
              <div className="border border-border-default rounded-2xl p-6">
                <h3 className="font-display font-bold text-text-primary text-sm mb-4">
                  {eli5Mode ? "Visualized Customer Pools" : "TAM / SAM / SOM Ratios"}
                </h3>
                <TAMChart
                  tam={marketData.tamSamSom.tam}
                  sam={marketData.tamSamSom.sam}
                  som={marketData.tamSamSom.som}
                  eli5Mode={eli5Mode}
                />
              </div>
 
              {/* Description */}
              <div className="bg-[#00D28A]/5 border border-[#00D28A]/10 rounded-2xl p-6">
                <h3 className="font-display font-bold text-[#00D28A] text-sm mb-2">
                  {eli5Mode ? "Market Breakdown (Simple Terms)" : "Market Analysis"}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {marketData.tamSamSom.description}
                </p>
              </div>
            </div>
          )}
 
          {activeTab === "competitors" && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-text-primary text-base mb-4">
                {eli5Mode ? "Other players doing similar things" : "Competitor Landscape"}
              </h3>
 
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-border-default text-gray-400 font-bold uppercase tracking-wider">
                      <th className="py-3 pr-4">{eli5Mode ? "Business" : "Competitor"}</th>
                      <th className="py-3 px-4">{eli5Mode ? "What they do well" : "Key Strengths"}</th>
                      <th className="py-3 px-4">{eli5Mode ? "Where they fall short" : "Key Weaknesses"}</th>
                      <th className="py-3 pl-4">{eli5Mode ? "Opportunities for you" : "Market Gaps"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-default text-text-secondary">
                    {marketData.competitors.map((comp) => (
                      <tr key={comp.name} className="hover:bg-white/5">
                        <td className="py-4 pr-4 font-bold text-text-primary">{comp.name}</td>
                        <td className="py-4 px-4">
                          <ul className="list-disc pl-4 space-y-1">
                            {comp.strengths.slice(0, 2).map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </td>
                        <td className="py-4 px-4">
                          <ul className="list-disc pl-4 space-y-1">
                            {comp.weaknesses.slice(0, 2).map((w, i) => <li key={i}>{w}</li>)}
                          </ul>
                        </td>
                        <td className="py-4 pl-4 text-[#00D28A] font-semibold">
                          <ul className="list-disc pl-4 space-y-1">
                            {comp.gaps.slice(0, 2).map((g, i) => <li key={i}>{g}</li>)}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
 
          {activeTab === "swot" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-display font-bold text-text-primary text-base mb-4">
                  {eli5Mode ? "Your Superpowers and Pitfalls" : "SWOT Analysis"}
                </h3>
                <SWOTGrid
                  strengths={marketData.swot.strengths}
                  weaknesses={marketData.swot.weaknesses}
                  opportunities={marketData.swot.opportunities}
                  threats={marketData.swot.threats}
                  eli5Mode={eli5Mode}
                />
              </div>
 
              <div>
                <h3 className="font-display font-bold text-text-primary text-base mb-4">Risks & Mitigations</h3>
                <div className="space-y-4">
                  {marketData.risks.map((r, i) => (
                    <div key={i} className="border border-border-default rounded-2xl p-5 flex items-start gap-4 bg-surface-sunken">
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        r.impact === "High" ? "bg-[#B91C1C]/10 text-[#B91C1C]" : r.impact === "Medium" ? "bg-[#B45309]/10 text-[#B45309]" : "bg-[#15803D]/10 text-[#15803D]"
                      }`}>
                        {r.impact} Impact
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-text-primary">{r.risk}</h4>
                        <p className="text-[11px] text-text-secondary mt-1.5 leading-normal">
                          <strong>Mitigation:</strong> {r.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
 
          {activeTab === "pricing" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Rationale */}
                <div className="border border-border-default rounded-2xl p-6 bg-[#00D28A]/5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {eli5Mode ? "How You Make Money" : "Pricing Model"}
                    </h4>
                    <div className="text-base font-bold text-[#00D28A] mt-2">{marketData.pricing.model}</div>
                    <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                      {marketData.pricing.rationale}
                    </p>
                  </div>
                </div>
 
                {/* Pricing Tiers */}
                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {marketData.pricing.tiers.map((tier) => (
                    <div key={tier.name} className="border border-border-default rounded-2xl p-6 bg-surface-sunken flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{tier.name}</span>
                        <div className="text-xl font-extrabold text-text-primary mt-2">{tier.price}</div>
                        <ul className="mt-4 space-y-2">
                          {tier.features.map((f, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-text-secondary">
                              <span className="w-1 h-1 rounded-full bg-[#00D28A]" />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Revenue projections chart */}
              <div className="border border-border-default rounded-2xl p-6">
                <h3 className="font-display font-bold text-text-primary text-sm mb-4">
                  {eli5Mode ? "3-Year Sales Guess" : "3-Year Growth Forecast"}
                </h3>
                <RevenueChart data={marketData.forecast} />
              </div>
            </div>
          )}
 
          {activeTab === "roadmap" && (
            <div className="space-y-8">
              {/* Personas */}
              <div>
                <h3 className="font-display font-bold text-text-primary text-base mb-4">
                  {eli5Mode ? "Your Ideal Customers" : "Target Personas"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketData.personas.map((pers) => (
                    <div key={pers.name} className="border border-border-default rounded-2xl p-6 bg-surface-sunken flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-9 w-9 rounded-full bg-[#020806] text-white flex items-center justify-center font-bold text-sm">
                            {pers.name[0]}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-text-primary">{pers.name}</h4>
                            <span className="text-[10px] text-text-tertiary font-bold uppercase">{pers.role}</span>
                          </div>
                        </div>
 
                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] font-bold text-[#B91C1C] uppercase tracking-wider">
                              {eli5Mode ? "Their Biggest Headache" : "Pain Points"}
                            </span>
                            <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-text-secondary">
                              {pers.painPoints.map((p, idx) => <li key={idx}>{p}</li>)}
                            </ul>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider">
                              {eli5Mode ? "What They Care About Most" : "Values Most"}
                            </span>
                            <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-text-secondary">
                              {pers.values.map((v, idx) => <li key={idx}>{v}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Prioritized Feature List */}
              <div>
                <h3 className="font-display font-bold text-text-primary text-base mb-4">
                  {eli5Mode ? "What to Build First (MVP Checklist)" : "MVP Prioritization Roadmap"}
                </h3>
                <div className="space-y-4">
                  {marketData.roadmap.map((feat) => (
                    <div key={feat.feature} className="border border-border-default rounded-2xl p-5 flex items-start justify-between gap-4 bg-surface-sunken">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            feat.priority === "P0" ? "bg-[#B91C1C]/10 text-[#B91C1C]" : feat.priority === "P1" ? "bg-[#B45309]/10 text-[#B45309]" : "bg-gray-150 text-text-tertiary"
                          }`}>
                            {eli5Mode 
                              ? (feat.priority === "P0" ? "Must Build First" : feat.priority === "P1" ? "Build Next" : "Future Idea")
                              : `${feat.priority} Feature`}
                          </span>
                          <span className="text-[10px] text-text-tertiary font-bold">
                            {eli5Mode ? "Complexity: " : "Dev Complexity: "}{feat.complexity}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-text-primary mt-2">{feat.feature}</h4>
                        <p className="text-[11px] text-text-secondary mt-1">{feat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
 
          {activeTab === "gtm" && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-text-primary text-base mb-6">
                {eli5Mode ? "How to Get Your First Customers" : "Go-To-Market Timeline"}
              </h3>
 
              <div className="relative border-l-2 border-[#00D28A]/10 pl-6 ml-4 space-y-8">
                {marketData.gtm.map((phase, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle dot on line */}
                    <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-[#00D28A] bg-surface-canvas" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text-primary">{phase.phase}</h4>
                        <span className="text-[10px] text-[#00D28A] font-bold bg-[#00D28A]/10 px-2 py-0.5 rounded">
                          {phase.timing}
                        </span>
                      </div>
                      <ul className="list-disc pl-4 mt-3 space-y-1.5 text-xs text-text-secondary">
                        {phase.strategy.map((s, idx2) => (
                          <li key={idx2} className="leading-relaxed">{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
 
      {/* Right Sidebar: AI Co-Founder Chat Panel */}
      {/* Chat Panel with CSS transition */}
      <div
        className={`border-l border-border-default bg-surface-raised flex flex-col shrink-0 z-10 transition-all duration-300 ease-out overflow-hidden ${
          chatOpen ? "w-[380px] opacity-100" : "w-0 opacity-0"
        }`}
      >
        {chatOpen && <ChatPanel reportId={reportId} title={title} />}
      </div>
    </div>
  );
}
export default ReportView;
