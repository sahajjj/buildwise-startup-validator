"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Cpu } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const displayEmail = email.trim() || "founder@buildwise.ai";
    const derivedName = displayEmail.split("@")[0].split(/[._-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Founder";
    document.cookie = `sandbox_user_name=${encodeURIComponent(derivedName)}; path=/; max-age=31536000`;
    document.cookie = `sandbox_user_email=${encodeURIComponent(displayEmail)}; path=/; max-age=31536000`;

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 200);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#0B0B10] text-white overflow-hidden">
      {/* Left Panel: Branding & Slogans */}
      <div className="w-full md:w-1/2 relative flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#06050B] overflow-hidden border-r border-white/5">
        {/* Animated Mesh Gradients behind */}
        <div className="absolute inset-0 pointer-events-none opacity-30 blur-3xl">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 animate-float-slow" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 animate-float-medium" />
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] bg-center pointer-events-none" />

        {/* Top Header Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-black font-display tracking-tight text-white">
              Build<span className="text-[#FFC72C]">Wise</span>
            </span>
          </Link>
        </div>

        {/* Main Pitch */}
        <div className="relative z-10 my-auto max-w-md space-y-6 pt-12 md:pt-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC72C]/10 border border-[#FFC72C]/20 text-[10px] font-bold text-[#FFC72C] uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            AI Co-founder Platform
          </span>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight text-white">
            The platform where founders validate startup ideas in minutes.
          </h1>
          
          <p className="text-sm text-gray-400 leading-relaxed">
            Get instant market research, custom TAM/SAM/SOM calculations, competitor analyses, and Go-To-Market playbooks before building.
          </p>

          {/* Value cards */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="h-8 w-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Calculated Market Metrics</div>
                <div className="text-[10px] text-gray-400">Accurate sizing ratios for presentations.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="h-8 w-8 rounded-xl bg-gold-500/10 flex items-center justify-center text-[#FFC72C]">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">24/7 AI Feedback Chat</div>
                <div className="text-[10px] text-gray-400">Brainstorm and iterate ideas interactively.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[10px] text-gray-500 pt-8 md:pt-0">
          Copyright © 2026 BuildWise, Inc. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Content Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 sm:p-12 md:p-16 text-[#0F0F14] relative">
        <div className="w-full max-w-md space-y-8">
          {isClerkConfigured ? (
            <div className="flex justify-center">
              <SignIn
                appearance={{
                  elements: {
                    card: "shadow-none border-0 bg-transparent p-0 w-full",
                    headerTitle: "text-navy-900 font-display font-bold text-2xl",
                    headerSubtitle: "text-gray-500 text-sm",
                    socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50 rounded-xl h-11",
                    formButtonPrimary: "bg-[#4F46E5] hover:bg-[#3C35B8] text-white font-semibold rounded-full h-11",
                    footerActionLink: "text-purple-600 hover:text-purple-500 font-semibold",
                    formFieldInput: "rounded-xl border-gray-200 focus:border-[#4F46E5] focus:ring-[#4F46E5]",
                  },
                }}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F0F14] tracking-tight">
                  Welcome back!
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                  Sign in to your sandbox account to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleMockLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all text-sm text-[#0F0F14]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="pass" className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                      Password
                    </label>
                    <span className="text-[10px] font-semibold text-gray-400 hover:text-[#4F46E5] cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <input
                    id="pass"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all text-sm text-[#0F0F14]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4F46E5] text-white hover:bg-[#3C35B8] h-12 rounded-full font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus-ring"
                  >
                    {loading ? (
                      <span>Signing In...</span>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Instructions box */}
              <div className="bg-[#4F46E5]/5 border border-[#4F46E5]/10 rounded-2xl p-4 text-[11px] text-gray-500 leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 text-[#4F46E5] font-bold">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Developer Sandbox active</span>
                </div>
                <p>We bypassed real auth database connections. You can type any mock email and password to instantly enter the platform.</p>
              </div>

              {/* Footer navigation */}
              <div className="text-center text-xs text-gray-500 pt-2">
                Don't have an account?{" "}
                <Link href="/sign-up" className="font-semibold text-[#4F46E5] hover:text-[#3C35B8]">
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
