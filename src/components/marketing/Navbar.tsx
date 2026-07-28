"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Process", href: "#how-it-works" },
    { label: "Case Studies", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-6">
        <motion.nav
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0,
            y: scrolled ? 0 : -20,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto max-w-7xl transition-all duration-700 ${
            scrolled 
              ? "bg-[#0B0B0B]/45 border border-white/5 backdrop-blur-[18px] pointer-events-auto" 
              : "bg-transparent border border-transparent pointer-events-none"
          }`}
          style={{ borderRadius: "1.25rem" }}
        >
          <div className="px-6 sm:px-8">
            <div className="flex h-14 sm:h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 shrink-0 focus-ring rounded-lg pointer-events-auto">
                <span className="text-sm font-black font-display tracking-[0.2em] uppercase text-[#F6F2EB]">
                  BuildWise
                </span>
              </Link>
  
              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#F6F2EB]/60 hover:text-[#F6F2EB] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              
              {/* Desktop CTA */}
              <div className="hidden lg:block pointer-events-auto">
                <Link 
                  href="/sign-up" 
                  className="bg-[#F6F2EB] text-[#0B0B0B] hover:bg-[#F6F2EB]/95 h-9 px-5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all focus-ring inline-flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
 
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#F6F2EB]/70 hover:text-[#F6F2EB] transition-colors focus-ring rounded-lg pointer-events-auto cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>
 
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
 
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-[#171717] p-8 lg:hidden overflow-y-auto border-l border-white/5"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setMobileOpen(false)} className="p-2 text-[#F6F2EB]/50 hover:text-[#F6F2EB] focus-ring rounded-lg cursor-pointer" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-xs font-bold uppercase tracking-widest text-[#F6F2EB]/75 hover:text-[#F6F2EB] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-6 border-t border-white/5">
                <Link 
                  href="/sign-up" 
                  className="w-full justify-center bg-[#F6F2EB] text-[#0B0B0B] hover:bg-[#F6F2EB]/95 h-10 px-5 rounded-full font-bold text-xs uppercase tracking-widest transition-all focus-ring inline-flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
