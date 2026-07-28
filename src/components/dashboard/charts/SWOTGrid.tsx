"use client";

import { AlertTriangle, Lightbulb, Shield, ShieldAlert } from "lucide-react";

interface SWOTGridProps {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  eli5Mode?: boolean;
}

export function SWOTGrid({ strengths, weaknesses, opportunities, threats, eli5Mode = false }: SWOTGridProps) {
  const categories = [
    {
      title: eli5Mode ? "Your Superpowers (Strengths)" : "Strengths",
      items: strengths,
      icon: Shield,
      bg: "bg-success/5 border-success/15",
      text: "text-success",
      iconBg: "bg-success/10",
    },
    {
      title: eli5Mode ? "Your Weak Spots (Weaknesses)" : "Weaknesses",
      items: weaknesses,
      icon: AlertTriangle,
      bg: "bg-danger/5 border-danger/15",
      text: "text-danger",
      iconBg: "bg-danger/10",
    },
    {
      title: eli5Mode ? "Things to Gain (Opportunities)" : "Opportunities",
      items: opportunities,
      icon: Lightbulb,
      bg: "bg-purple-500/5 border-purple-500/15",
      text: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      title: eli5Mode ? "Watch Out For (Threats)" : "Threats",
      items: threats,
      icon: ShieldAlert,
      bg: "bg-warning/5 border-warning/15",
      text: "text-warning",
      iconBg: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.title}
          className={`border border-border-default rounded-2xl p-6 ${cat.bg} flex flex-col`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${cat.iconBg} ${cat.text}`}>
              <cat.icon className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-display font-bold text-text-primary text-base">
              {cat.title}
            </h4>
          </div>

          <ul className="space-y-2.5 flex-1">
            {cat.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${cat.text} bg-current`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default SWOTGrid;
