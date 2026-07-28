import Link from "next/link";
import prisma from "@/lib/prisma";
import getSessionUser from "@/lib/auth-helper";
import RecentReportsGrid from "@/components/dashboard/RecentReportsGrid";
import { ArrowRight, Plus, Star } from "lucide-react";

export default async function StarredPage() {
  const user = await getSessionUser();
  if (!user) {
    return null;
  }

  let reports: any[] = [];
  try {
    reports = await prisma.report.findMany({
      where: {
        isStarred: true,
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
    console.warn("Failed to fetch starred reports from DB:", e);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2">
            <Star className="h-6 w-6 text-[#FFC72C] fill-[#FFC72C]" />
            Starred Ideas
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Browse and manage your starred startup ideas and validations.
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

      {/* Reports Grid */}
      <div>
        {reports.length > 0 ? (
          <RecentReportsGrid initialReports={reports} onlyStarred={true} />
        ) : (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 bg-white/5">
            <p className="text-sm text-gray-400">
              No starred startup ideas yet. Star your favorite validation reports from the dashboard to show them here!
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#FFC72C] hover:underline"
            >
              Go to Dashboard
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
