import prisma from "@/lib/prisma";
import getSessionUser from "@/lib/auth-helper";
import { redirect, notFound } from "next/navigation";
import { ReportView } from "@/components/dashboard/ReportView";
import { MarketDataType } from "@/lib/schemas";

// Mock reports dictionary matching sandbox dashboard card IDs
const mockReportsDict: Record<string, any> = {
  "mock-report-saas": {
    id: "mock-report-saas",
    title: "SaaS Pricing Optimizer",
    ideaDescription: "An AI-powered tool that tracks competitor SaaS pricing, churn rates, and suggests dynamic optimization tiers.",
    industry: "SaaS",
    targetAudience: "B2B SaaS companies, Product managers",
    validationScore: 87,
    status: "READY",
    marketData: {
      validationScore: 87,
      tamSamSom: {
        tam: 4200000000,
        sam: 850000000,
        som: 64000000,
        description: "The global B2B SaaS pricing optimization market is estimated at a TAM of $4.2B. SAM is estimated at $850M based on accessible mid-market operators, and SOM is targeted at $64M assuming 7.5% conversion of the target audience.",
      },
      competitors: [
        {
          name: "PriceIntelligently",
          strengths: ["Strong industry brand", "Deep advisory support team"],
          weaknesses: ["Manual consulting required", "High cost starting tier"],
          gaps: ["No self-service automated dashboard tracking"],
        },
      ],
      swot: {
        strengths: ["Automated dynamic pricing updates", "Low subscription barriers"],
        weaknesses: ["API integration complexity", "Dependent on public pricing transparency"],
        opportunities: ["Integration with billing giants like Stripe/Paddle", "Self-service validation templates"],
        threats: ["Platform lock-in by subscription billing providers", "Rapid feature copy by search giants"],
      },
      risks: [
        {
          risk: "High API connection churn due to billing platform changes",
          impact: "Medium",
          mitigation: "Standardize webhook listening patterns and build robust error handling logs.",
        },
      ],
      pricing: {
        model: "Subscription tier model",
        tiers: [
          { name: "Starter", price: "Free", features: ["1 report/mo", "Basic TAM info"] },
          { name: "Pro Plus", price: "$29/mo", features: ["Unlimited scans", "Dynamic Stripe webhooks", "PDF reports"] },
        ],
        rationale: "Aligns costs directly to user scale metrics, making entry friction-free.",
      },
      forecast: [
        { year: 1, revenue: 120000, userCount: 410 },
        { year: 2, revenue: 540000, userCount: 1800 },
        { year: 3, revenue: 1950000, userCount: 6500 },
      ],
      personas: [
        {
          name: "Product Officer Pam",
          role: "SaaS Product VP",
          painPoints: ["Lacks pricing benchmark metrics", "Struggles with dynamic billing changes"],
          values: ["Automated suggestions", "Stripe API sync"],
        },
      ],
      roadmap: [
        {
          feature: "Dynamic pricing logic",
          priority: "P0",
          complexity: "Medium",
          description: "Algorithmic analysis tracking churn volatility vs price increase points.",
        },
      ],
      gtm: [
        { phase: "Product Hunt launch", timing: "Month 1", strategy: ["Launch on Product Hunt", "Publish case study blogs"] },
      ],
    },
  },
  "mock-report-marketplace": {
    id: "mock-report-marketplace",
    title: "BiteSize Local Food Market",
    ideaDescription: "A hyper-local marketplace connecting micro-bakeries and home chefs directly with apartment building residents.",
    industry: "Marketplace",
    targetAudience: "Home bakers, local foodies, suburban communities",
    validationScore: 68,
    status: "READY",
    marketData: {
      validationScore: 68,
      tamSamSom: {
        tam: 1800000000,
        sam: 320000000,
        som: 24000000,
        description: "Hyperlocal baking marketplace size matches food delivery sub-sectors at a TAM of $1.8B. SAM is estimated at $320M, and SOM at $24M representing early metropolitan density target points.",
      },
      competitors: [
        {
          name: "UberEats / DoorDash",
          strengths: ["Massive driver network", "Huge user acquisition budgets"],
          weaknesses: ["High commission margins (30%)", "No support for unlicensed micro-bakeries"],
          gaps: ["No community trust structures for home-cooked meals"],
        },
      ],
      swot: {
        strengths: ["Low cost local delivery fees", "Hyper-targeted urban density"],
        weaknesses: ["Regulatory food safety compliance", "Driver onboarding liquidity"],
        opportunities: ["Co-branding with residential building management", "Loyalty subscription tiers"],
        threats: ["Local health department audits", "Driver supply shortages"],
      },
      risks: [
        {
          risk: "Food safety liability",
          impact: "High",
          mitigation: "Require home chefs to display local kitchen food safety certificates on product lists.",
        },
      ],
      pricing: {
        model: "Transactional Take-Rate",
        tiers: [
          { name: "Basic Chef", price: "12% take rate", features: ["Storefront profile", "Local map indexing"] },
          { name: "Premium Chef", price: "18% take rate", features: ["Boosted listings", "Custom batch orders"] },
        ],
        rationale: "Aligns revenue directly with baker sales volume to lower onboarding resistance.",
      },
      forecast: [
        { year: 1, revenue: 64000, userCount: 220 },
        { year: 2, revenue: 210000, userCount: 780 },
        { year: 3, revenue: 840000, userCount: 3100 },
      ],
      personas: [
        {
          name: "Baker Bob",
          role: "Micro-bakery home operator",
          painPoints: ["Lacks logistics system", "High entry fee on major delivery apps"],
          values: ["Low commission fees", "Hyperlocal urban orders"],
        },
      ],
      roadmap: [
        {
          feature: "Hyperlocal map batching",
          priority: "P0",
          complexity: "Low",
          description: "Batch orders from the same apartment complex to optimize delivery.",
        },
      ],
      gtm: [
        { phase: "Community launch", timing: "Month 1", strategy: ["Deliver free pastries to building managers", "Launch localized Facebook ads"] },
      ],
    },
  },
  "mock-report-fintech": {
    id: "mock-report-fintech",
    title: "PaySplit Rent Splitter",
    ideaDescription: "A fintech app that splits landlord monthly payments dynamically among roommates based on room size and utilities usage.",
    industry: "Fintech",
    targetAudience: "College students, co-living spaces, young professionals",
    validationScore: 92,
    status: "READY",
    marketData: {
      validationScore: 92,
      tamSamSom: {
        tam: 5800000000,
        sam: 1200000000,
        som: 96000000,
        description: "The roommate co-living transaction volume matches apartment rental indices at a TAM of $5.8B. SAM is estimated at $1.2B, and SOM is targeted at $96M assuming 8% conversion of target student demographics.",
      },
      competitors: [
        {
          name: "Splitwise",
          strengths: ["High user footprint", "Very simple ledger entry"],
          weaknesses: ["No direct bank account transactions", "Relies on manual debt settlement"],
          gaps: ["No direct integration with landlord rent collection platforms"],
        },
      ],
      swot: {
        strengths: ["Direct bank splitting via Plaid", "Dynamic utility expense scanners"],
        weaknesses: ["High transaction fee percentages on cards", "User bank connection security hesitation"],
        opportunities: ["White-label partnerships with landlord platforms", "Automated credit score reporting"],
        threats: ["Security data breach vulnerabilities", "Competitors introducing direct bank split payouts"],
      },
      risks: [
        {
          risk: "Late payments by single roommates delaying full rent collection",
          impact: "High",
          mitigation: "Implement automated buffer accounts and notify landlord with individual split statuses.",
        },
      ],
      pricing: {
        model: "Transactional flat fee per bill split",
        tiers: [
          { name: "Free split ledger", price: "Free", features: ["Split ledger tracking", "Manual entry"] },
          { name: "Direct PaySplit Pro", price: "$1.99/split", features: ["Plaid bank automation", "Autopay landlord integration", "Credit score reporting"] },
        ],
        rationale: "Low transactional pricing aligns with roommate budget sensitivity while generating significant transaction volume.",
      },
      forecast: [
        { year: 1, revenue: 180000, userCount: 1400 },
        { year: 2, revenue: 890000, userCount: 7200 },
        { year: 3, revenue: 3400000, userCount: 29000 },
      ],
      personas: [
        {
          name: "Roommate Ryan",
          role: "Co-living graduate student",
          painPoints: ["Chasing roommates for rent split money", "Landlord only accepts a single check"],
          values: ["Automated Plaid splits", "Autopay split confirmation"],
        },
      ],
      roadmap: [
        {
          feature: "Plaid dynamic splitting link",
          priority: "P0",
          complexity: "High",
          description: "Connect multiple bank accounts using Plaid API to push direct ACH splits.",
        },
      ],
      gtm: [
        { phase: "Campus flyers & student outreach", timing: "Month 1", strategy: ["Distribute flyers at university housing blocks", "Partner with campus housing boards"] },
      ],
    },
  },
};

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportDetailPage({ params }: ReportPageProps) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { id } = await params;

  // Intercept mock reports
  if (mockReportsDict[id]) {
    const mockReport = mockReportsDict[id];
    return (
      <ReportView
        reportId={mockReport.id}
        title={mockReport.title}
        ideaDescription={mockReport.ideaDescription}
        industry={mockReport.industry}
        targetAudience={mockReport.targetAudience}
        validationScore={mockReport.validationScore}
        marketData={mockReport.marketData as MarketDataType}
      />
    );
  }

  let report = null;
  try {
    report = await prisma.report.findUnique({
      where: { id },
      include: {
        workspace: {
          include: {
            members: true,
          },
        },
      },
    });
  } catch (e) {
    console.warn("DB query failed, report details cannot be fetched:", e);
  }

  if (!report) {
    notFound();
  }

  // Access control check
  const isMember = report.workspace.members.some((m) => m.userId === user.id);
  if (!isMember && user.id !== "mock-user-123") {
    redirect("/dashboard");
  }

  if (report.status !== "READY") {
    // If not ready, redirect back to new report page or dashboard to display generating status
    redirect("/dashboard");
  }

  const rawMarketData = report.marketData;
  let marketData: MarketDataType;
  try {
    marketData = (typeof rawMarketData === "string" ? JSON.parse(rawMarketData) : rawMarketData) as MarketDataType;
  } catch {
    // If JSON parsing fails, provide an empty fallback so the page doesn't crash
    marketData = {} as MarketDataType;
  }

  return (
    <ReportView
      reportId={report.id}
      title={report.title}
      ideaDescription={report.ideaDescription}
      industry={report.industry}
      targetAudience={report.targetAudience}
      validationScore={report.validationScore || 0}
      marketData={marketData}
    />
  );
}
