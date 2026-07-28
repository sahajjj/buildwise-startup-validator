"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, AlertCircle, Database, Check } from "lucide-react";

const steps = [
  { id: 1, name: "Core Concept", desc: "Define your startup title and industry" },
  { id: 2, name: "The Pitch", desc: "Describe the idea and target audience" },
  { id: 3, name: "Refinements", desc: "Add known competitors or parameters" },
];

const industries = ["SaaS", "E-commerce", "Marketplace", "Fintech", "Consumer App", "Other"];

export default function NewReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("SaaS");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [knownCompetitors, setKnownCompetitors] = useState("");
  const [targetRegion, setTargetRegion] = useState("Global");
  
  const regions = ["Global", "India", "USA", "Europe", "Southeast Asia"];
  
  // Generation & polling state
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("Initializing analyzer...");
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Poll report status
  useEffect(() => {
    if (!generatedId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/reports/${generatedId}`);
        if (!res.ok) throw new Error("Failed to pull status");
        const data = await res.json();

        if (data.status === "READY") {
          setProgress(100);
          setProgressStatus("Finalizing report...");
          clearInterval(interval);
          setTimeout(() => {
            window.location.href = `/reports/${generatedId}`;
          }, 1000);
        } else if (data.status === "FAILED") {
          setError("AI generation failed. Please refine your inputs and try again.");
          setLoading(false);
          clearInterval(interval);
        } else {
          // GENERATING state - validationScore holds the progress percentage
          const currentProgress = data.validationScore || 10;
          setProgress(currentProgress);
          
          if (currentProgress < 30) {
            setProgressStatus("Analyzing market sizes & calculating TAM/SAM/SOM ratios...");
          } else if (currentProgress < 60) {
            setProgressStatus("Scanning competitor landscape & mapping strengths...");
          } else {
            setProgressStatus("Formulating monetization tiers & prioritizing MVP features...");
          }
        }
      } catch (err) {
        console.error("Error polling report:", err);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [generatedId]);

  const handleNext = () => {
    setError(null);
    if (currentStep === 1 && !title.trim()) {
      setError("Please enter a startup concept name.");
      return;
    }
    if (currentStep === 2 && (!ideaDescription.trim() || !targetAudience.trim())) {
      setError("Please describe your idea and target audience.");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !ideaDescription || !industry || !targetAudience) {
      setError("Please fill out all required fields before generating.");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(5);
    setProgressStatus("Bootstrapping validation engine...");

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          ideaDescription,
          industry,
          targetAudience,
          knownCompetitors,
          targetRegion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start generation");
      }

      const data = await response.json();
      setGeneratedId(data.id);
    } catch (err: any) {
      console.error(err);
      setError("Could not submit idea. Verify server connection.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-white tracking-tight">
          Create New Startup Report
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Provide your startup details and our AI co-founder will research the market.
        </p>
      </div>
 
      <div className="dark-glass-card p-8 border border-white/5 shadow-2xl">
        {loading ? (
          /* Progressive Loading Screen */
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative mb-8">
              <div className="h-20 w-20 rounded-full border-4 border-white/5 flex items-center justify-center">
                <Database className="h-8 w-8 text-[#FF6F61] animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[#FF6F61] animate-spin" />
            </div>
 
            <h3 className="text-xl font-bold text-white font-display">
              Validating Idea: &ldquo;{title}&rdquo;
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-md">
              {progressStatus}
            </p>
 
            {/* Progress bar wrapper */}
            <div className="w-full max-w-md mt-8">
              <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2">
                <span>Validation Pipeline</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00D28A] to-[#FF6F61] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Multi-step Form Content */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep === s.id
                        ? "bg-[#00D28A] text-white border border-[#FF6F61]/40 shadow-lg"
                        : currentStep > s.id
                        ? "bg-[#FF6F61]/10 text-[#FF6F61] border border-[#FF6F61]/20"
                        : "bg-white/5 text-gray-500 border border-white/5"
                    }`}
                  >
                    {currentStep > s.id ? <Check className="h-4 w-4" /> : s.id}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-white leading-none">{s.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{s.desc}</div>
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className="hidden sm:block w-8 h-0.5 bg-white/5 mx-2" />
                  )}
                </div>
              ))}
            </div>
 
            {error && (
              <div className="p-4 rounded-xl bg-danger/5 border border-danger/20 text-danger text-sm flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
 
            {/* Stepper Panels */}
            <div className="min-h-[220px]">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Startup Concept Name</label>
                    <input
                      type="text"
                      placeholder="e.g. FreshBite dynamic bakeries"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00D28A]/30 focus:border-[#00D28A]/50 transition-all text-sm text-white placeholder:text-gray-500"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Primary Industry Vertical</label>
                    <select
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00D28A]/30 focus:border-[#00D28A]/50 transition-all text-sm text-white"
                    >
                      {industries.map(ind => (
                        <option key={ind} value={ind} className="bg-[#0B0B10] text-white">
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Target Region / Market</label>
                    <select
                      value={targetRegion}
                      onChange={e => setTargetRegion(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00D28A]/30 focus:border-[#00D28A]/50 transition-all text-sm text-white"
                    >
                      {regions.map(reg => (
                        <option key={reg} value={reg} className="bg-[#0B0B10] text-white">
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
 
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Describe Your Startup Idea</label>
                    <textarea
                      placeholder="Describe what product or service you want to build, what core features it has, and what makes it unique..."
                      rows={5}
                      value={ideaDescription}
                      onChange={e => setIdeaDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00D28A]/30 focus:border-[#00D28A]/50 transition-all text-sm text-white resize-none leading-relaxed placeholder:text-gray-500"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Target Customer / Target Audience</label>
                    <input
                      type="text"
                      placeholder="e.g. Small local bakeries, apartment complex residents, working professionals"
                      value={targetAudience}
                      onChange={e => setTargetAudience(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00D28A]/30 focus:border-[#00D28A]/50 transition-all text-sm text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              )}
 
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300">Known Competitors (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. UberEats, local delivery networks (comma separated)"
                      value={knownCompetitors}
                      onChange={e => setKnownCompetitors(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00D28A]/30 focus:border-[#00D28A]/50 transition-all text-sm text-white placeholder:text-gray-500"
                    />
                    <p className="text-[10px] text-gray-500 leading-normal">
                      Provide names of current competitors you already know about so our validation calculations can target their strengths directly.
                    </p>
                  </div>
                </div>
              )}
            </div>
 
            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 h-10 flex items-center justify-center text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors border border-white/10 cursor-pointer"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
 
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={{ backgroundColor: '#FFC72C', color: '#0F0F14', cursor: 'pointer', border: 'none', borderRadius: '9999px', padding: '0 24px', height: '40px', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ backgroundColor: '#FFC72C', color: '#0F0F14', cursor: 'pointer', border: 'none', borderRadius: '9999px', padding: '0 24px', height: '40px', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Generate Business Report
                  <Sparkles className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
