"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionOffsets = {
  up: "translateY(40px)",
  down: "translateY(-40px)",
  left: "translateX(40px)",
  right: "translateX(-40px)",
};

export function FadeInView({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : directionOffsets[direction],
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.4, 0.25, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* Stagger container for child animations */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={`${className} ${isVisible ? "stagger-visible" : ""}`}>
      {children}
    </div>
  );
}

/* Stagger item */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} stagger-item`}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.5s cubic-bezier(0.25, 0.4, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
    >
      {children}
    </div>
  );
}
