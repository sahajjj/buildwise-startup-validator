"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Plus, Trash2, Star } from "lucide-react";

interface ReportItem {
  id: string;
  title: string;
  ideaDescription: string;
  industry: string;
  targetAudience: string;
  validationScore: number;
  isStarred?: boolean;
  createdAt: string | Date;
}

interface RecentReportsGridProps {
  initialReports: ReportItem[];
  onlyStarred?: boolean;
}

export default function RecentReportsGrid({ initialReports, onlyStarred = false }: RecentReportsGridProps) {
  const [reports, setReports] = useState<ReportItem[]>(initialReports);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this validation report? This will delete all associated chat history and calculations.")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setReports(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete report. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStar = async (e: React.MouseEvent, id: string, currentStarred: boolean) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistically update UI state
    if (onlyStarred && currentStarred) {
      setReports(prev => prev.filter(r => r.id !== id));
    } else {
      setReports(prev => prev.map(r => r.id === id ? { ...r, isStarred: !currentStarred } : r));
    }

    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isStarred: !currentStarred }),
      });
      if (!res.ok) throw new Error("Failed to toggle star");
    } catch (err) {
      console.error(err);
      // Revert state if the API fails
      if (onlyStarred && currentStarred) {
        // Find the original report item to put it back
        const revertedReport = initialReports.find(r => r.id === id);
        if (revertedReport) {
          setReports(prev => [...prev, revertedReport].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
      } else {
        setReports(prev => prev.map(r => r.id === id ? { ...r, isStarred: currentStarred } : r));
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => {
        const score = report.validationScore || 0;
        const scoreColor =
          score >= 80
            ? "text-[#4ade80] border-[#4ade80]/20 bg-[#4ade80]/5"
            : score >= 60
            ? "text-[#fbbf24] border-[#fbbf24]/20 bg-[#fbbf24]/5"
            : "text-[#f87171] border-[#f87171]/20 bg-[#f87171]/5";

        return (
          <Link
            key={report.id}
            href={`/reports/${report.id}`}
            className="dark-glass-card p-6 flex flex-col justify-between group focus-ring cursor-pointer hover:border-purple-500/40 relative"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  {report.industry}
                </span>
                
                <div className="flex items-center gap-2">
                  <div className={`px-2.5 py-1 rounded-full border text-[10px] font-extrabold ${scoreColor}`}>
                    {score} Score
                  </div>
                  <button
                    onClick={(e) => handleStar(e, report.id, !!report.isStarred)}
                    className={`p-1.5 rounded-lg border transition-colors focus-ring cursor-pointer ${
                      report.isStarred
                        ? "text-[#FFC72C] fill-[#FFC72C] border-[#FFC72C]/30 bg-[#FFC72C]/5 hover:text-yellow-500 hover:fill-yellow-500"
                        : "text-gray-400 hover:text-yellow-400 hover:fill-yellow-400/20 border-white/10 hover:border-yellow-500/30 bg-white/5"
                    }`}
                    title={report.isStarred ? "Unstar Report" : "Star Report"}
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, report.id)}
                    disabled={deletingId === report.id}
                    className="p-1.5 rounded-lg border border-white/10 hover:border-red-500/40 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 transition-colors focus-ring cursor-pointer disabled:opacity-50"
                    title="Delete Report"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-display font-bold text-base text-white group-hover:text-[#FFC72C] transition-colors line-clamp-1">
                {report.title}
              </h4>
              <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                {report.ideaDescription}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {new Date(report.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <span className="flex items-center gap-1 font-bold text-gray-300 group-hover:text-[#FFC72C] transition-colors">
                View Report
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        );
      })}

      {/* New Report CTA Card */}
      <Link
        href="/reports/new"
        className="border-2 border-dashed border-white/10 hover:border-purple-500/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-all bg-white/5 hover:bg-white/10 group min-h-[220px] focus-ring"
      >
        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
          <Plus className="h-5 w-5" />
        </div>
        <div>
          <h5 className="font-display font-bold text-white text-sm sm:text-base">Validate a new idea</h5>
          <p className="text-xs text-gray-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
            Submit details and generate an investor-ready business report in minutes.
          </p>
        </div>
      </Link>
    </div>
  );
}
