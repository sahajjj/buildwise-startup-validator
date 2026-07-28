"use client";

import { useState } from "react";
import { Layout, Check, Layers, HelpCircle, ArrowRight } from "lucide-react";

// Seed BMC content for sandbox demonstration
const saasCanvas = {
  partners: ["Stripe Billing", "Cloud Compute Providers", "Accelerator Networks"],
  activities: ["Aggregating pricing schemas", "Refining validation logic models", "User acquisition"],
  resources: ["Google Gemini APIs", "Local developer talent", "Seed venture capital buffers"],
  propositions: ["Validate startup ideas in 10 minutes", "Generate investor-ready PDF market data", "Get dynamic pricing benchmark estimates"],
  relationships: ["Self-service sign-ups", "AI co-founder direct feedback chats", "Community templates reviews"],
  channels: ["Product Hunt pre-launches", "Startup SEO blogs", "Venture capital advisor networks"],
  segments: ["Solo founders", "Venture capital analysts", "Incubator cohort managers"],
  costs: ["Google Gemini API calls", "Vercel hosting compute databases", "Marketing newsletter sponsorships"],
  revenues: ["$29/mo Founder Pro subscriptions", "Enterprise customized team workspace seats"],
};

export default function CanvasesPage() {
  const [activeType, setActiveType] = useState<"bmc" | "lean">("bmc");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-navy-900">
            Startup Model Canvas Planner
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Map out key business pillars using either Business Model Canvas or Lean Canvas schemas.
          </p>
        </div>

        {/* Switcher */}
        <div className="flex bg-navy-900/5 p-1 rounded-full border border-navy-900/5">
          <button
            onClick={() => setActiveType("bmc")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeType === "bmc" ? "bg-navy-950 text-white shadow-sm" : "text-gray-500 hover:text-navy-900"
            }`}
          >
            Business Model
          </button>
          <button
            onClick={() => setActiveType("lean")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeType === "lean" ? "bg-navy-950 text-white shadow-sm" : "text-gray-500 hover:text-navy-900"
            }`}
          >
            Lean Canvas
          </button>
        </div>
      </div>

      {/* Grid Canvas representation */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-hidden space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-bold text-navy-900">
              {activeType === "bmc" ? "Standard Business Model Canvas" : "Startup Lean Canvas"}
            </span>
          </div>
          <span className="text-xs text-gray-400 font-medium">Idea: SaaS Pricing Optimizer</span>
        </div>

        {/* 3 Tier Grid layout */}
        {activeType === "bmc" ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Column 1: Key Partners */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-lavender-50/20 md:row-span-2">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Key Partners</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                {saasCanvas.partners.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Key Activities & Resources */}
            <div className="space-y-4 md:col-span-1">
              <div className="border border-gray-100 rounded-2xl p-5 bg-white">
                <h4 className="text-xs font-bold text-navy-900 mb-3">Key Activities</h4>
                <ul className="space-y-2 text-xs text-gray-500">
                  {saasCanvas.activities.map((a, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-100 rounded-2xl p-5 bg-white">
                <h4 className="text-xs font-bold text-navy-900 mb-3">Key Resources</h4>
                <ul className="space-y-2 text-xs text-gray-500">
                  {saasCanvas.resources.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Value Propositions */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-lavender-50/20 md:row-span-2">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Value Propositions</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                {saasCanvas.propositions.map((pr, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 mt-1.5" />
                    <span className="font-semibold text-navy-900">{pr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Relationships & Channels */}
            <div className="space-y-4 md:col-span-1">
              <div className="border border-gray-100 rounded-2xl p-5 bg-white">
                <h4 className="text-xs font-bold text-navy-900 mb-3">Customer Relationships</h4>
                <ul className="space-y-2 text-xs text-gray-500">
                  {saasCanvas.relationships.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-gray-100 rounded-2xl p-5 bg-white">
                <h4 className="text-xs font-bold text-navy-900 mb-3">Channels</h4>
                <ul className="space-y-2 text-xs text-gray-500">
                  {saasCanvas.channels.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 5: Customer Segments */}
            <div className="border border-gray-100 rounded-2xl p-5 bg-lavender-50/20 md:row-span-2">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Customer Segments</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                {saasCanvas.segments.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Row 2 Footer: Costs & Revenues */}
            <div className="md:col-span-2.5 border border-gray-100 rounded-2xl p-5 bg-white md:col-span-2">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Cost Structure</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                {saasCanvas.costs.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger shrink-0 mt-1.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2.5 border border-gray-100 rounded-2xl p-5 bg-white md:col-span-3">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Revenue Streams</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                {saasCanvas.revenues.map((rev, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0 mt-1.5" />
                    <span>{rev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* Lean Canvas alternate layout */
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="border border-gray-100 rounded-2xl p-5 bg-lavender-50/20">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Problem</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Incumbents charge excessive consulting fees for dynamic pricing. Founders lack database benchmarks.</p>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5 bg-white">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Solution</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Instant AI-generated market validation reports detailing SWOT, TAM and prioritization lists.</p>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5 bg-lavender-50/20">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Unique Value Prop</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold text-navy-900">Investor-ready startup research generated before your coffee gets cold.</p>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5 bg-white">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Unfair Advantage</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Deep context-aware Google Gemini models trained directly on premium business case studies.</p>
            </div>
            <div className="border border-gray-100 rounded-2xl p-5 bg-lavender-50/20">
              <h4 className="text-xs font-bold text-navy-900 mb-3">Customer Segments</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Early-stage product officers, accelerator programs, and solo indie founders.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
