"use client";

import { useState } from "react";
import { Presentation, Sparkles, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";

// Mock generated slide deck outline
const slides = [
  {
    number: 1,
    title: "Title Slide",
    headline: "BuildWise — Validate Ideas in Minutes",
    bulletPoints: [
      "Subhead: AI Co-Founder researching markets, competitors, and pricing instantly",
      "Presenter: Alex Co-founder",
      "Contact: founder@buildwise.ai",
    ],
  },
  {
    number: 2,
    title: "The Problem",
    headline: "Startup validation takes months and costs thousands",
    bulletPoints: [
      "Founders waste $10k+ building products without market validation",
      "Traditional consulting is slow and too expensive for pre-seed budgets",
      "Spreadsheets lack real-time competitor tracking benchmarks",
    ],
  },
  {
    number: 3,
    title: "The Solution",
    headline: "Automated instant validation intelligence reports",
    bulletPoints: [
      "Describe concept in a single sentence to trigger full analysis scans",
      "Real-time TAM/SAM/SOM calculators mapping target segments",
      "AI co-founder chat assistant to iterate pricing models interactively",
    ],
  },
  {
    number: 4,
    title: "Market Size (TAM)",
    headline: "Targeting a $4.2B global SaaS optimization market",
    bulletPoints: [
      "TAM: $4.2B global B2B SaaS pricing optimization indices",
      "SAM: $850M mid-market operators seeking growth models",
      "SOM: $64M assuming 7.5% penetration of early target audience",
    ],
  },
  {
    number: 5,
    title: "Business Model",
    headline: "High margin subscription SaaS model",
    bulletPoints: [
      "Free Tier: 1 validation scan/mo to drive viral loops",
      "Pro Plan: $29/mo offering unlimited scans, PDF exports, and co-founder chat",
      "Enterprise: Workspace seat billing for accelerators and venture capital analyst cohorts",
    ],
  },
];

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const slide = slides[currentSlide];
    const textToCopy = `Slide ${slide.number}: ${slide.title}\nHeadline: ${slide.headline}\nBullet Points:\n${slide.bulletPoints.map(p => `- ${p}`).join("\n")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-navy-900">
            AI Pitch Deck Generator
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Auto-generate presentation slide outlines and copy based on your validation reports.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border border-gray-200 text-gray-600 hover:text-navy-900 hover:border-navy-900 rounded-full transition-colors bg-white shadow-sm"
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied Outline" : "Copy Slide Text"}
        </button>
      </div>

      {/* Main Slide Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Slide Selector List */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-2 h-fit">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-2">
            Slide Index
          </h3>
          {slides.map((slide, idx) => (
            <button
              key={slide.number}
              onClick={() => setCurrentSlide(idx)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                currentSlide === idx
                  ? "bg-navy-950 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span>{slide.number}. {slide.title}</span>
              <Presentation className="h-4 w-4 opacity-40" />
            </button>
          ))}
        </div>

        {/* Right: Slide Presentation Canvas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Virtual Slide Screen */}
          <div className="aspect-[16/9] w-full rounded-3xl bg-navy-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-navy-950/15">
            {/* Background design */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-500 blur-3xl" />
            </div>

            {/* Slide Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">
                {slides[currentSlide].title}
              </span>
              <span className="text-xs text-white/40">Slide {slides[currentSlide].number} / {slides.length}</span>
            </div>

            {/* Slide Body */}
            <div className="flex-1 flex flex-col justify-center my-6 relative z-10">
              <h2 className="text-xl sm:text-2xl font-extrabold font-display leading-tight text-white mb-6">
                {slides[currentSlide].headline}
              </h2>
              <ul className="space-y-3">
                {slides[currentSlide].bulletPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/70">
                    <span className="h-2 w-2 rounded-full bg-gold-500 shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Footer */}
            <div className="text-[10px] text-white/30 border-t border-white/5 pt-4 flex justify-between relative z-10">
              <span>BuildWise Pitch Outline</span>
              <span>Confidential & Proprietary</span>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-navy-900 hover:border-navy-900 disabled:opacity-30 disabled:pointer-events-none transition-colors bg-white shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-xs text-gray-500 font-semibold">
              Slide {currentSlide + 1} of {slides.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-navy-900 hover:border-navy-900 disabled:opacity-30 disabled:pointer-events-none transition-colors bg-white shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
