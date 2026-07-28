"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";

const testimonials = [
  {
    quote:
      "I was going to spend three months building a delivery app, but the BuildWise report showed me that the neighborhood was already crowded with competitors. Saved me thousands of dollars and months of wasted work.",
    author: "Elena Rostova",
    role: "Founder, QuickBites",
  },
  {
    quote:
      "The competitor map found three active software tools I had never heard of. I shifted my focus to a gap they were ignoring and got my first ten customers in two weeks.",
    author: "Marcus Aurelius",
    role: "Solo Creator, MailRadar",
  },
  {
    quote:
      "I ran three different product ideas through BuildWise in one afternoon. The second one had great search traffic and low competition. It's now making $4,000/month.",
    author: "Dave Jenkins",
    role: "Indie Maker",
  },
];

export function CaseStudies() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver-based entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[#0B0B0B] py-48 sm:py-56 border-b border-white/8 relative z-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          ref={headingRef}
          className="text-center mb-16 text-3xl sm:text-5xl font-extrabold font-display leading-tight text-[#F6F2EB] tracking-tight"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          What other people are saying
        </h2>

        <div
          ref={carouselRef}
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          <div className="overflow-hidden rounded-[20px] bg-[#171717] border border-white/8 p-8 sm:p-14 min-h-[300px] flex items-center shadow-2xl relative">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col justify-between absolute inset-0 p-8 sm:p-14"
                style={{
                  opacity: current === idx ? 1 : 0,
                  transform: current === idx ? "translateX(0)" : "translateX(20px)",
                  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                  pointerEvents: current === idx ? "auto" : "none",
                }}
              >
                <blockquote className="text-sm sm:text-base md:text-lg leading-relaxed text-[#F6F2EB] italic font-bold font-display">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                  <div>
                    <cite className="not-italic text-sm font-bold text-[#C66A3D] font-display block">
                      {testimonial.author}
                    </cite>
                    <span className="text-[10px] text-[#7A746C] uppercase font-mono tracking-wider font-bold">
                      {testimonial.role}
                    </span>
                  </div>

                  <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#7A746C]">
                    <MessageSquareCode className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="h-10 w-10 rounded-full border border-white/8 bg-[#171717] shadow-lg flex items-center justify-center text-[#F6F2EB]/70 hover:text-[#F6F2EB] hover:border-white/16 transition-all focus-ring cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="flex gap-1.5 px-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrent(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    current === idx ? "w-6 bg-[#C66A3D]" : "w-1.5 bg-white/10 hover:bg-white/25"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="h-10 w-10 rounded-full border border-white/8 bg-[#171717] shadow-lg flex items-center justify-center text-[#F6F2EB]/70 hover:text-[#F6F2EB] hover:border-white/16 transition-all focus-ring cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
