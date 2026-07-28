import Link from "next/link";
import prisma from "@/lib/prisma";
import getSessionUser from "@/lib/auth-helper";
import RecentReportsGrid from "@/components/dashboard/RecentReportsGrid";
import { Plus, BarChart3, Clock, ArrowRight, TrendingUp } from "lucide-react";

// Mock reports fallback for a ready-to-test sandbox experience
const mockReports = [
  {
    id: "mock-report-saas",
    title: "SaaS Pricing Optimizer",
    ideaDescription: "An AI-powered tool that tracks competitor SaaS pricing, churn rates, and suggests dynamic optimization tiers.",
    industry: "SaaS",
    targetAudience: "B2B SaaS companies, Product managers",
    validationScore: 87,
    status: "READY",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "mock-report-marketplace",
    title: "BiteSize Local Food Market",
    ideaDescription: "A hyper-local marketplace connecting micro-bakeries and home chefs directly with apartment building residents.",
    industry: "Marketplace",
    targetAudience: "Home bakers, local foodies, suburban communities",
    validationScore: 68,
    status: "READY",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "mock-report-fintech",
    title: "PaySplit Rent Splitter",
    ideaDescription: "A fintech app that splits landlord monthly payments dynamically among roommates based on room size and utilities usage.",
    industry: "Fintech",
    targetAudience: "College students, co-living spaces, young professionals",
    validationScore: 92,
    status: "READY",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
  },
];

export default async function DashboardPage() {
  const user = await getSessionUser();
 
  let reports: any[] = [];
  if (user) {
    try {
      reports = await prisma.report.findMany({
        where: {
          workspace: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.warn("Failed to fetch reports from DB, falling back to seed sandbox reports:", e);
    }
  }
 
  const activeReports = reports.length > 0 ? reports : mockReports;
 
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "Founder"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Analyze, iterate, and share your startup validations.
          </p>
        </div>
 
        <Link 
          href="/reports/new" 
          className="flex items-center gap-2 bg-[#4F46E5] text-white hover:bg-[#3C35B8] h-10 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all focus-ring shadow-lg"
        >
          New Validation Report
          <Plus className="h-4 w-4 text-white" />
        </Link>
      </div>
 
      {/* Overview Stats strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Ideas Validated", value: activeReports.length, desc: "Cumulative reports" },
          { label: "Top Score", value: `${Math.max(...activeReports.map(r => r.validationScore || 0))}/100`, desc: "Highest validation" },
          { label: "Target Industries", value: Array.from(new Set(activeReports.map(r => r.industry))).length, desc: "Unique markets mapped" },
        ].map((stat, idx) => (
          <div key={idx} className="dark-glass-card p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
              <div className="text-2xl font-black text-white mt-1">{stat.value}</div>
              <span className="text-[10px] text-gray-500 mt-1 block">{stat.desc}</span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#FFC72C]/10 flex items-center justify-center text-[#FFC72C]">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>
 
      {/* Reports Grid */}
      <div>
        <h3 className="font-display font-bold text-base sm:text-lg text-white mb-5">
          Recent Validation Reports
        </h3>
 
        <RecentReportsGrid initialReports={activeReports} />
      </div>
    </div>
  );
}
