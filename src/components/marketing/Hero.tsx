"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Cpu, Activity } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const initialScrollRef = useRef<HTMLDivElement>(null);

  // Mockup Animatable Refs
  const uxBarRef = useRef<HTMLDivElement>(null);
  const retentionBarRef = useRef<HTMLDivElement>(null);
  const scoreCircleRef = useRef<SVGCircleElement>(null);
  const scoreTextRef = useRef<HTMLSpanElement>(null);
  
  const mockupRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  // Dynamic Scan Simulation States
  const [scanStatus, setScanStatus] = useState("Initializing pipeline...");
  const [aiStatus, setAiStatus] = useState("Scanning...");
  const [tamStatus, setTamStatus] = useState("Pending...");
  const scanIntervals = useRef<any[]>([]);
  const isSimulating = useRef(false);

  const startScanSimulation = () => {
    scanIntervals.current.forEach(clearTimeout);
    scanIntervals.current = [];

    setScanStatus("Initializing pipeline...");
    setAiStatus("Scanning...");
    setTamStatus("Pending...");

    const t1 = setTimeout(() => {
      setScanStatus("Scanning competitor UX indexes...");
      setAiStatus("Radar Connected");
    }, 1200);

    const t2 = setTimeout(() => {
      setScanStatus("Calculating TAM SAM SOM ratios...");
      setTamStatus("Processing...");
    }, 2400);

    const t3 = setTimeout(() => {
      setScanStatus("Scans completed successfully.");
      setTamStatus("Done");
    }, 3800);

    scanIntervals.current.push(t1, t2, t3);
  };

  const resetScanSimulation = () => {
    scanIntervals.current.forEach(clearTimeout);
    scanIntervals.current = [];
    setScanStatus("Initializing pipeline...");
    setAiStatus("Scanning...");
    setTamStatus("Pending...");
  };

  // Hover 3D Tilt handlers & Dynamic Trigger on Enter
  const handleMouseEnter = () => {
    if (!isSimulating.current) {
      isSimulating.current = true;
      startScanSimulation();

      gsap.to(uxBarRef.current, {
        width: "55%",
        duration: 1.8,
        ease: "power2.inOut"
      });
      gsap.to(retentionBarRef.current, {
        width: "90%",
        duration: 1.8,
        ease: "power2.inOut",
        delay: 0.3
      });

      gsap.to(scoreCircleRef.current, {
        strokeDashoffset: 4.27,
        duration: 2.2,
        ease: "power2.out",
        delay: 0.5
      });

      const scoreObj = { val: 0 };
      gsap.to(scoreObj, {
        val: 98,
        duration: 2.2,
        ease: "power2.out",
        delay: 0.5,
        onUpdate: () => {
          if (scoreTextRef.current) {
            scoreTextRef.current.innerText = `${Math.round(scoreObj.val)}%`;
          }
        }
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = mockupRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom CSS variables for shine position
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);

    // Scale up slightly and tilt inside perspective space (increased max tilt to 14 degrees)
    const rotateX = -(y - rect.height / 2) / (rect.height / 2) * 14;
    const rotateY = (x - rect.width / 2) / (rect.width / 2) * 14;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      boxShadow: "0 30px 60px -15px rgba(198, 106, 61, 0.25)",
      transformPerspective: 1200,
      ease: "power1.out",
      duration: 0.3
    });

    if (shineRef.current) {
      shineRef.current.style.opacity = "1";
    }

    // Parallax sub-elements shift inside card
    const items = card.querySelectorAll(".parallax-item");
    items.forEach((item: any) => {
      const depth = Number(item.getAttribute("data-depth") || 0.1);
      gsap.to(item, {
        x: (x - rect.width / 2) * depth,
        y: (y - rect.height / 2) * depth,
        ease: "power1.out",
        duration: 0.3
      });
    });
  };

  const handleMouseLeave = () => {
    isSimulating.current = false;
    resetScanSimulation();

    const card = mockupRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        ease: "power2.out",
        duration: 0.5
      });
    }

    if (shineRef.current) {
      shineRef.current.style.opacity = "0";
    }

    // Reset parallax items
    if (card) {
      const items = card.querySelectorAll(".parallax-item");
      items.forEach((item: any) => {
        gsap.to(item, {
          x: 0,
          y: 0,
          ease: "power2.out",
          duration: 0.5
        });
      });
    }

    gsap.to([uxBarRef.current, retentionBarRef.current], {
      width: "0%",
      duration: 0.5
    });
    gsap.to(scoreCircleRef.current, {
      strokeDashoffset: 213.6,
      duration: 0.5
    });
    if (scoreTextRef.current) {
      scoreTextRef.current.innerText = "0%";
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(titleRef.current, { filter: "blur(0px)", scale: 1 });
      gsap.set(initialScrollRef.current, { opacity: 1, y: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 120 });
      gsap.set([leftCardRef.current, rightCardRef.current, centerCardRef.current], { opacity: 0 });

      // Live mock components initial states
      gsap.set(uxBarRef.current, { width: "0%" });
      gsap.set(retentionBarRef.current, { width: "0%" });
      gsap.set(scoreCircleRef.current, { strokeDashoffset: 213.6 });

      // Cinematic transition timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%", // length of scroll trigger animation
          scrub: 1,
          pin: pinRef.current,
        }
      });

      tl.to(titleRef.current, {
        y: "-30vh",
        scale: 1.08,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.2,
        ease: "power2.inOut"
      }, 0)
      .to(initialScrollRef.current, {
        y: "40px",
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0)
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out"
      }, 0.2);

      // Scroll triggered activation for bottom stats
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top -15%",
        onEnter: () => {
          gsap.to([leftCardRef.current, rightCardRef.current, centerCardRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to([leftCardRef.current, rightCardRef.current, centerCardRef.current], {
            opacity: 0,
            duration: 0.5
          });
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      scanIntervals.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0B0B0B] text-[#F6F2EB]">
      {/* Sticky Viewport container for animation */}
      <div ref={pinRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Massive Centered Title */}
        <h1 
          ref={titleRef} 
          className="absolute text-[12vw] font-extrabold tracking-tighter leading-none text-[#F6F2EB] uppercase text-center select-none z-10 w-full px-4"
        >
          BuildWise
        </h1>

        {/* Initial Pinned Scroll Indicator */}
        <div 
          ref={initialScrollRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-15 flex flex-col items-center gap-2 pointer-events-none select-none"
        >
          <style>{`
            @keyframes scroll-dot-initial {
              0% { transform: translateY(0); opacity: 0; }
              30% { opacity: 1; }
              100% { transform: translateY(10px); opacity: 0; }
            }
            .animate-scroll-dot-initial {
              animation: scroll-dot-initial 1.6s infinite ease-in-out;
            }
          `}</style>
          <div className="w-[18px] h-[28px] rounded-full border border-white/20 flex justify-center p-1 bg-black/40 backdrop-blur-sm shadow-lg">
            <div className="w-[3px] h-[5px] rounded-full bg-[#00D28A] animate-scroll-dot-initial" />
          </div>
          <span className="text-[9px] font-extrabold text-[#7A746C] uppercase tracking-[0.25em] leading-none">Scroll to Explore</span>
        </div>

        {/* Content wrapper that lifts up */}
        <div 
          ref={contentRef} 
          className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6 lg:px-8 mt-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            {/* Left Column: Premium Headline */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C66A3D] mb-4">
                01 / INTEL
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F6F2EB] mb-6 leading-[1.1] max-w-xl font-display">
                See if your <br />
                business idea <br />
                will work.
              </h2>
              <p className="text-sm leading-relaxed text-[#7A746C] max-w-lg mb-8 font-medium">
                Tell us what you want to build. We will search the web, analyze potential competitors, check what people charge, and give you a simple, honest report on your idea's chance of success.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/sign-up" 
                  className="bg-[#C66A3D] text-[#F6F2EB] hover:bg-[#B55B2E] h-11 px-6 rounded-full font-bold text-xs tracking-wider transition-all focus-ring inline-flex items-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button 
                  onClick={() => {
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-glass-urbi hover:shadow-sm"
                >
                  <span>See How it Works</span>
                  <div className="btn-icon">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Mockup */}
            <div className="lg:col-span-6 w-full hidden sm:block">
              <div 
                ref={mockupRef}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full rounded-[20px] bg-[#171717] border border-white/8 p-6 shadow-xl flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
              >
                {/* Shine reflection overlay */}
                <div 
                  ref={shineRef}
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 mix-blend-overlay z-30"
                  style={{
                    background: "radial-gradient(circle 240px at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.18), transparent 80%)"
                  }}
                />

                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-400" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] text-[#7A746C] uppercase tracking-widest font-mono font-bold flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-[#7A746C]" />
                    BuildWise.io
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#F6F2EB]">Validating SaaS Idea</h3>
                    <p className="text-[10px] text-[#7A746C] mt-0.5">{scanStatus}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div 
                      className="parallax-item rounded-xl bg-[#050505] border border-white/5 p-4 relative overflow-hidden"
                      data-depth="0.05"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xs font-bold text-[#F6F2EB]">Competitor Scans</h4>
                          <p className="text-[8px] text-[#7A746C] mt-0.5">Visualizing gap categories</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="w-full flex flex-col gap-2 items-center">
                          <span className="text-[8px] text-[#7A746C] font-semibold">UX Index</span>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div ref={uxBarRef} className="bg-[#EF4444] h-full rounded-full w-0" />
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-2 items-center">
                          <span className="text-[8px] text-[#7A746C] font-semibold">Retention</span>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div ref={retentionBarRef} className="bg-[#7C9A6D] h-full rounded-full w-0" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="parallax-item grid grid-cols-2 gap-4" data-depth="0.03">
                      <div className="rounded-xl bg-[#050505] border border-white/5 p-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#C66A3D]/10 flex items-center justify-center">
                          <Cpu className="h-4.5 w-4.5 text-[#C66A3D]" />
                        </div>
                        <div>
                          <span className="block text-[8px] text-[#7A746C] font-bold uppercase tracking-wider">AI Processing</span>
                          <span className="text-[10px] font-bold text-[#F6F2EB]">{aiStatus}</span>
                        </div>
                      </div>
                      <div className="rounded-xl bg-[#050505] border border-white/5 p-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#7C9A6D]/10 flex items-center justify-center">
                          <Cpu className="h-4.5 w-4.5 text-[#7C9A6D]" />
                        </div>
                        <div>
                          <span className="block text-[8px] text-[#7A746C] font-bold uppercase tracking-wider">TAM SAM SOM</span>
                          <span className="text-[10px] font-bold text-[#F6F2EB]">{tamStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="parallax-item col-span-1 rounded-xl bg-[#050505] border border-white/5 p-4 flex flex-col justify-between"
                    data-depth="0.08"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#F6F2EB]">Score</h4>
                      <p className="text-[10px] text-[#7A746C] mt-0.5">Viability Index.</p>
                    </div>
                    <div className="my-3 flex justify-center relative">
                      <div className="w-20 h-20 flex items-center justify-center relative">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="4"
                            fill="transparent"
                          />
                          <circle
                            ref={scoreCircleRef}
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="#C66A3D"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={213.6}
                            strokeDashoffset={213.6}
                          />
                        </svg>
                        <span ref={scoreTextRef} className="absolute text-lg font-extrabold text-[#F6F2EB] tracking-tighter">0%</span>
                      </div>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-white/5 text-[9px] text-[#7A746C]">
                      <div className="flex justify-between">
                        <span>Demand</span>
                        <span className="font-bold text-[#7C9A6D]">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Barriers</span>
                        <span className="font-bold text-[#EF4444]">Low</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Bottom Floating Stats */}
      <div className="absolute inset-x-0 bottom-6 pointer-events-none hidden md:block z-20">
        <div className="max-w-[1400px] mx-auto px-6 relative h-28 flex items-center justify-between">
          <div ref={leftCardRef} className="absolute left-6 w-64 bg-[#171717]/95 border border-white/5 rounded-2xl p-4 shadow-xl flex items-center gap-3 text-[#F6F2EB]">
            <div className="text-2xl font-black text-[#F6F2EB] font-display">12,000+</div>
            <div className="text-[10px] font-bold text-[#7A746C] uppercase tracking-wider leading-snug">validation runs</div>
          </div>
          <div ref={rightCardRef} className="absolute right-6 w-64 bg-[#171717]/95 border border-white/5 rounded-2xl p-4 shadow-xl flex items-center gap-3 text-[#F6F2EB]">
            <div className="text-2xl font-black text-[#F6F2EB] font-display">40+</div>
            <div className="text-[10px] font-bold text-[#7A746C] uppercase tracking-wider leading-snug">industries scanned</div>
          </div>
          <div className="mx-auto flex flex-col items-center gap-3">
            {/* Animating Scroll Indicator */}
            <div className="flex flex-col items-center gap-1.5 pointer-events-auto select-none">
              <style>{`
                @keyframes scroll-dot {
                  0% { transform: translateY(0); opacity: 0; }
                  30% { opacity: 1; }
                  100% { transform: translateY(10px); opacity: 0; }
                }
                .animate-scroll-dot {
                  animation: scroll-dot 1.6s infinite ease-in-out;
                }
              `}</style>
              <div className="w-[16px] h-[26px] rounded-full border border-white/20 flex justify-center p-1 bg-surface-sunken/40">
                <div className="w-[3px] h-[5px] rounded-full bg-[#00D28A] animate-scroll-dot" />
              </div>
              <span className="text-[8px] font-extrabold text-[#7A746C] uppercase tracking-[0.2em] leading-none">Scroll to Explore</span>
            </div>

            <div ref={centerCardRef} className="bg-[#171717]/95 border border-white/5 rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3 text-[#F6F2EB]">
              <div className="text-2xl font-black text-[#F6F2EB] font-display">6m</div>
              <div className="text-[10px] font-bold text-[#7A746C] uppercase tracking-wider leading-tight">average wait time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
