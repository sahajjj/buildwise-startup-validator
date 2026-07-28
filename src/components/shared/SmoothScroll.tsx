"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Disable smooth scroll virtualization on dashboard and app routes
    const isAppRoute = 
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/reports") ||
      pathname.startsWith("/chat") ||
      pathname.startsWith("/settings") ||
      pathname.startsWith("/compare") ||
      pathname.startsWith("/pitch-deck");

    if (isAppRoute) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return <>{children}</>;
}
