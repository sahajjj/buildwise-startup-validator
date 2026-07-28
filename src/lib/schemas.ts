import { z } from "zod";

export const TamSamSomSchema = z.object({
  tam: z.number().describe("Total Addressable Market in USD"),
  sam: z.number().describe("Serviceable Addressable Market in USD"),
  som: z.number().describe("Serviceable Obtainable Market in USD"),
  description: z.string().describe("Brief analysis explaining the TAM/SAM/SOM breakdown and calculations"),
});

export const CompetitorSchema = z.object({
  name: z.string().describe("Name of the competitor"),
  strengths: z.array(z.string()).describe("List of competitor strengths"),
  weaknesses: z.array(z.string()).describe("List of competitor weaknesses"),
  gaps: z.array(z.string()).describe("Gaps in their product/service that BuildWise startup can exploit"),
});

export const SwotSchema = z.object({
  strengths: z.array(z.string()).describe("Key strengths of the startup idea"),
  weaknesses: z.array(z.string()).describe("Potential internal weaknesses"),
  opportunities: z.array(z.string()).describe("Market opportunities to capitalize on"),
  threats: z.array(z.string()).describe("External threats or obstacles"),
});

export const RiskSchema = z.object({
  risk: z.string().describe("Short title/description of the risk factor"),
  impact: z.enum(["High", "Medium", "Low"]).describe("Severity level"),
  mitigation: z.string().describe("Strategic action plan to mitigate this risk"),
});

export const PricingTierSchema = z.object({
  name: z.string().describe("Name of the pricing tier (e.g. Starter, Pro)"),
  price: z.string().describe("Price value and billing frequency (e.g. $29/mo, Free)"),
  features: z.array(z.string()).describe("Key features included in this tier"),
});

export const PricingSchema = z.object({
  model: z.string().describe("Overall recommended pricing model (e.g., Subscription SaaS, Transactional Fee)"),
  tiers: z.array(PricingTierSchema).describe("Specific pricing tier recommendations"),
  rationale: z.string().describe("Detailed business justification for the pricing model and tiers"),
});

export const ForecastYearSchema = z.object({
  year: z.number().describe("Year index (e.g., 1, 2, 3)"),
  revenue: z.number().describe("Projected revenue in USD"),
  userCount: z.number().describe("Projected customer count or active users"),
});

export const PersonaSchema = z.object({
  name: z.string().describe("Fictional customer persona name (e.g. Tech-Savvy Tina)"),
  role: z.string().describe("Professional role or customer profile description"),
  painPoints: z.array(z.string()).describe("Customer pain points addressed by this idea"),
  values: z.array(z.string()).describe("What this customer values most in a solution"),
});

export const RoadmapFeatureSchema = z.object({
  feature: z.string().describe("Short name/description of the feature"),
  priority: z.enum(["P0", "P1", "P2"]).describe("Implementation priority: P0 (Essential MVP), P1 (Post-launch), P2 (Expansion/Backlog)"),
  complexity: z.string().describe("Development complexity estimate (e.g., Low, Medium, High)"),
  description: z.string().describe("Detailed functional description of the feature"),
});

export const GtmPhaseSchema = z.object({
  phase: z.string().describe("Launch stage/milestone name (e.g., Alpha Launch, Scale)"),
  timing: z.string().describe("Timeline estimate (e.g., Months 1-3)"),
  strategy: z.array(z.string()).describe("Actionable GTM strategies to execute during this phase"),
});

export const SimpleSummarySchema = z.object({
  verdict: z.enum(["Go", "Caution", "Pivot"]).describe("One-word verdict based on validation score"),
  verdictReason: z.string().describe("Short 1-2 sentence explanation of the verdict"),
  eli5Explanation: z.string().describe("Simple plain-English explanation of the startup validity"),
  topThreeSteps: z.array(z.string()).describe("The 3 absolute first action items for the founder"),
});

export const MarketDataSchema = z.object({
  validationScore: z.number().min(0).max(100).describe("Overall startup validation score out of 100"),
  tamSamSom: TamSamSomSchema,
  competitors: z.array(CompetitorSchema),
  swot: SwotSchema,
  risks: z.array(RiskSchema),
  pricing: PricingSchema,
  forecast: z.array(ForecastYearSchema),
  personas: z.array(PersonaSchema),
  roadmap: z.array(RoadmapFeatureSchema),
  gtm: z.array(GtmPhaseSchema),
  simpleSummary: SimpleSummarySchema.optional(),
});

export type MarketDataType = z.infer<typeof MarketDataSchema>;

