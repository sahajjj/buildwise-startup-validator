"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      gsap.to(
        contentRef.current,
        {
          scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#0B0B0B] py-48 sm:py-56 border-b border-white/8 relative z-10"
    >
      <div ref={contentRef} className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Stack */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-[#F6F2EB] tracking-tight">
            Ready to test your idea?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#7A746C] font-medium">
            Submit your details below. We will send you a free, simple starter roadmap checklist for your idea.
          </p>
        </div>

        {/* Form panel */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto p-2.5 rounded-[20px] bg-[#171717] border border-white/8 shadow-2xl"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-[#050505] border border-white/5 text-sm text-[#F6F2EB] placeholder-[#7A746C] focus:outline-none focus:border-[#C66A3D] transition-all font-semibold"
            />
            <button
              type="submit"
              className="bg-[#C66A3D] text-[#F6F2EB] hover:bg-[#B55B2E] h-11 px-5 rounded-xl font-bold text-xs transition-all focus-ring inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              Get Free Checklist
              <ArrowRight className="h-4 w-4 text-[#F6F2EB]" />
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto rounded-[20px] bg-[#171717] border border-white/8 p-8 text-center shadow-2xl">
            <div className="h-12 w-12 rounded-full bg-[#7C9A6D]/10 flex items-center justify-center text-[#7C9A6D] mx-auto mb-4 border border-[#7C9A6D]/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F6F2EB] mb-2">Checklist Request Sent!</h3>
            <p className="text-xs text-[#7A746C] leading-relaxed max-w-xs mx-auto font-medium">
              We have received your email. We are processing a basic starter checklist and will email you details shortly.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
