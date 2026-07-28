"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ImageZoomSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image zoom timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
        }
      });

      tl.fromTo(imageRef.current,
        { scale: 1 },
        { scale: 1.15, ease: "none", duration: 1 }
      )
      .fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.6 },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[180vh] bg-[#0B0B0B] overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Full-bleed image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={imageRef}
            src="/minimal_product_render.png"
            alt="Handcrafted product architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B0B0B]/70 backdrop-blur-[2px]" />
        </div>

        {/* Text overlay */}
        <div 
          ref={textRef}
          className="relative z-10 text-center max-w-4xl px-6 sm:px-8 flex flex-col items-center"
        >
          <span className="text-[10px] text-[#C66A3D] uppercase tracking-[0.3em] font-bold mb-6">
            Handcrafted Precision
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display leading-[1.05] text-[#F6F2EB] tracking-tight uppercase max-w-3xl">
            Built for founders who care about details
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#7A746C] max-w-xl leading-relaxed font-medium">
            Every pipeline calculation, layout ratio, and data metric is structured with strict alignment and minimal, clean proportions.
          </p>
        </div>

      </div>
    </section>
  );
}
