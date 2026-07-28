"use client";

import { useState } from "react";
import { GitCompare, Check, AlertCircle } from "lucide-react";

// Mock reports data matching our dashboard profiles for immediate sandbox compare testing!
const reportsDataset = [
  {
    id: "mock-report-saas",
    title: "SaaS Pricing Optimizer",
    industry: "SaaS",
    score: 87,
    tam: "$4.2B",
    pricing: "Subscription SaaS",
    competitor: "PriceIntelligently",
    risk: "API webhook connection changes",
  },
  {
    id: "mock-report-marketplace",
    title: "BiteSize Local Food Market",
    industry: "Marketplace",
    score: 68,
    tam: "$1.8B",
    pricing: "12% take-rate commissions",
    competitor: "UberEats / DoorDash",
    risk: "Food safety regulatory compliance",
  },
  {
    id: "mock-report-fintech",
    title: "PaySplit Rent Splitter",
    industry: "Fintech",
    score: 92,
    tam: "$5.8B",
    pricing: "$1.99 per rent transaction",
    competitor: "Splitwise ledger entry",
    risk: "Late payment roommate buffers",
  },
];

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["mock-report-saas", "mock-report-fintech"]);

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(prev => prev.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const comparedReports = reportsDataset.filter(r => selectedIds.includes(r.id));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-navy-900">
          Compare Startup Concepts
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Select up to 3 validation reports to compare target markets, pricing, and risk factors side by side.
        </p>
      </div>

      {/* Select panel */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          Select Reports (Select 2 to 3)
        </h3>
        <div className="flex flex-wrap gap-4">
          {reportsDataset.map((report) => {
            const isSelected = selectedIds.includes(report.id);
            return (
              <button
                key={report.id}
                onClick={() => handleToggle(report.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-navy-950 text-white border-navy-950 shadow-md shadow-navy-950/10"
                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                  isSelected ? "bg-gold-500 border-gold-500 text-navy-900" : "border-gray-200 bg-white"
                }`}>
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                </div>
                <span>{report.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6 min-w-[200px]">Parameter</th>
                {comparedReports.map((report) => (
                  <th key={report.id} className="py-4 px-6 min-w-[250px] font-display text-sm font-extrabold text-navy-900">
                    {report.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-500">
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-bold text-navy-900">Industry Vertical</td>
                {comparedReports.map((report) => (
                  <td key={report.id} className="py-4 px-6 font-semibold text-purple-600">
                    {report.industry}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-bold text-navy-900">Validation Score</td>
                {comparedReports.map((report) => {
                  const score = report.score;
                  return (
                    <td key={report.id} className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${
                        score >= 80 ? "bg-success/5 border-success/20 text-success" : "bg-warning/5 border-warning/20 text-warning"
                      }`}>
                        {score}/100
                      </span>
                    </td>
                  );
                })}
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-bold text-navy-900">Market Size (TAM)</td>
                {comparedReports.map((report) => (
                  <td key={report.id} className="py-4 px-6 font-bold text-navy-900">
                    {report.tam}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-bold text-navy-900">Pricing Model</td>
                {comparedReports.map((report) => (
                  <td key={report.id} className="py-4 px-6">
                    {report.pricing}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-bold text-navy-900">Top Competitor</td>
                {comparedReports.map((report) => (
                  <td key={report.id} className="py-4 px-6">
                    {report.competitor}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-4 px-6 font-bold text-navy-900">Key Startup Risk</td>
                {comparedReports.map((report) => (
                  <td key={report.id} className="py-4 px-6 text-danger font-semibold">
                    {report.risk}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
