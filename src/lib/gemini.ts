import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "./prisma";
import { MarketDataSchema, MarketDataType } from "./schemas";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Mock structured report builder for sandbox dev fallback
function generateMockReport(title: string, desc: string, industry: string, audience: string, targetRegion: string = "Global"): MarketDataType {
  const isIndia = targetRegion.toLowerCase() === "india";
  return {
    validationScore: 85,
    simpleSummary: {
      verdict: "Go",
      verdictReason: `Excellent initial alignment for "${title}". Strong target market fit in the ${industry} sector with clear access to ${audience} in ${targetRegion}.`,
      eli5Explanation: `Think of this idea like a super-smart helper that solves a big headache for people. Lots of people are willing to pay a little bit of money for this helper because it saves them a lot of time and makes their lives easier.`,
      topThreeSteps: [
        `Talk to 5 potential customers from ${audience} in ${targetRegion} to hear about their biggest headaches.`,
        `Build a simple website or prototype showing exactly how "${title}" works.`,
        "Offer a free trial or test service to your first 3 users to get their feedback."
      ]
    },
    tamSamSom: {
      tam: isIndia ? 150000000 : 1200000000,
      sam: isIndia ? 30000000 : 240000000,
      som: isIndia ? 2500000 : 18000000,
      description: isIndia 
        ? `For a startup operating in the ${industry} sector in India, we calculate a TAM of $150M based on the local target user base of ${audience}. SAM is estimated at $30M based on accessible metro-city demographics, and SOM is projected at $2.5M representing a target 8.3% market share in year 3.`
        : `For a startup operating in the ${industry} sector, we calculate a TAM of $1.2B based on the global target user base of ${audience}. SAM is estimated at $240M based on accessible region demographics, and SOM is projected at $18M representing a target 7.5% market share in year 3.`,
    },
    competitors: isIndia ? [
      {
        name: "Jio / Tata Digital",
        strengths: ["Massive capital backing", "Huge existing user base", "Distribution networks across India"],
        weaknesses: ["Cluttered user interfaces", "Slow feature updates", "Bureaucratic support"],
        gaps: ["No automated niche recommendation tools", "Poor developer APIs"],
      },
      {
        name: "Local Indian Competitor",
        strengths: ["Agile local team", "Local UPI payment integrations", "Low cost"],
        weaknesses: ["Limited marketing reach", "High engineering churn"],
        gaps: ["Lacks advanced dynamic forecasting dashboards"],
      }
    ] : [
      {
        name: "Incumbent Alpha",
        strengths: ["Strong brand awareness", "Extensive enterprise feature list", "Robust balance sheet"],
        weaknesses: ["Outdated user interface", "High pricing barriers", "Slow product delivery updates"],
        gaps: ["No automated recommendation engines", "Poor mobile UX", "No self-service onboarding flow"],
      },
      {
        name: "Beta competitor",
        strengths: ["Modern design", "Excellent mobile app", "Low pricing tiers for startups"],
        weaknesses: ["Limited integrations", "Weak security compliance", "High customer churn"],
        gaps: ["No direct customer feedback logs", "Lacks complex forecasting utilities"],
      },
    ],
    swot: {
      strengths: ["AI co-founder speed of iteration", "Zero-friction onboarding", "Clean analytics visualization dashboards"],
      weaknesses: ["Dependence on third-party AI APIs", "Lack of established brand trust initially", "Lean customer success teams"],
      opportunities: ["Unserved early-stage founders seeking low-cost validation", "Partnerships with startup accelerators", "Direct export capabilities to investor-facing PDFs"],
      threats: ["Rapid feature replication by dominant search engines", "Varying startup failure rate volatility", "Fluctuations in cloud compute API costs"],
    },
    risks: [
      {
        risk: "Low conversion rates from free reports to paid tier",
        impact: "High",
        mitigation: "Implement progressive paywalls (e.g. limit chat follow-ups or PDF exports to paid plans).",
      },
      {
        risk: "AI hallucinations in financial forecasts",
        impact: "Medium",
        mitigation: "Include transparent validation notes showing formulas and standard industry benchmarks.",
      },
    ],
    pricing: {
      model: isIndia ? "SaaS Subscription (INR adjusted)" : "Subscription SaaS + Usage-based Reports",
      tiers: [
        {
          name: "Starter",
          price: "Free",
          features: ["1 validation report/mo", "Basic TAM calculations", "Community forums access"],
        },
        {
          name: "Founder Pro",
          price: isIndia ? "₹1,999/mo" : "$29/mo",
          features: ["Unlimited validation reports", "Detailed GTM & feature prioritizations", "AI co-founder chat integration", "Investor-ready PDF exports"],
        },
      ],
      rationale: isIndia 
        ? "Localized pricing in INR reduces conversion friction for Indian pre-seed and bootstrapped founders."
        : "Subscription pricing lowers the barrier to entry for early-stage founders while creating stable, recurring SaaS metrics.",
    },
    forecast: [
      { year: 1, revenue: isIndia ? 600000 : 84000, userCount: 300 },
      { year: 2, revenue: isIndia ? 2400000 : 320000, userCount: 1100 },
      { year: 3, revenue: isIndia ? 9600000 : 1200000, userCount: 4200 },
    ],
    personas: [
      {
        name: isIndia ? "Entrepreneurial Amit" : "Entrepreneurial Eric",
        role: isIndia ? "Solo SaaS Founder from Bangalore" : "First-time solo founder",
        painPoints: ["Limited budget for market research consultants", "Overwhelmed by financial modeling sheets", "Struggles to identify competitors"],
        values: ["Speed to insight", "Simple, actionable GTM roadmaps", "Exportable pitch deck copy outlines"],
      },
    ],
    roadmap: [
      {
        feature: "AI Generator UI Form",
        priority: "P0",
        complexity: "Low",
        description: "Simple multi-step input form for idea descriptions and target audience details.",
      },
      {
        feature: "Interactive Recharts Visualizer",
        priority: "P0",
        complexity: "Medium",
        description: "Visual charts representing TAM/SAM/SOM ratios and projected revenues.",
      },
      {
        feature: "Teammate workspace sharing",
        priority: "P1",
        complexity: "High",
        description: "Invite editors or viewers to workspace dashboards.",
      },
    ],
    gtm: [
      {
        phase: "Beta Release",
        timing: "Month 1",
        strategy: ["Post in targeted startup forums (Reddit, IndieHackers)", "Onboard beta users via Product Hunt pre-launch page"],
      },
      {
        phase: "Growth",
        timing: "Months 2-6",
        strategy: ["Co-marketing with startup accelerators", "SEO blogs targeting standard validation queries"],
      },
    ],
  };
}

// Unified content generator helper that dynamically routes between Groq and Gemini based on key presence.
export async function generateAIContent(
  prompt: string, 
  isJson: boolean = false,
  modelName: string = "llama-3.3-70b-versatile"
): Promise<string> {
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (groqKey) {
    console.log(`Using Groq API model ${modelName} for content generation...`);
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [{ role: "user", content: prompt }],
        response_format: isJson ? { type: "json_object" } : undefined,
        temperature: 0.3
      })
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Groq API returned error status ${res.status}: ${errText}`);
    }
    const data = await res.json();
    return data.choices[0].message.content;
  }

  if (geminiKey && genAI) {
    console.log("Using Gemini API for content generation...");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: isJson ? { responseMimeType: "application/json" } : undefined,
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  throw new Error("No AI providers configured. Please set GROQ_API_KEY or GEMINI_API_KEY.");
}

export async function runReportGenerationPipeline(
  reportId: string,
  title: string,
  ideaDescription: string,
  industry: string,
  targetAudience: string,
  knownCompetitors: string = "",
  targetRegion: string = "Global"
) {
  try {
    console.log(`Starting report generation pipeline for ID: ${reportId}`);

    const hasAI = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;
    if (!hasAI) {
      console.log("No Groq or Gemini API key detected. Simulating progressive pipeline generation with seed fallback.");
      
      // Simulate progress saves so user UI shows active loading state transitions!
      await new Promise(r => setTimeout(r, 1000));
      await updateReportProgress(reportId, 15); // Step 1
      
      await new Promise(r => setTimeout(r, 1000));
      await updateReportProgress(reportId, 40); // Step 3
      
      await new Promise(r => setTimeout(r, 1000));
      await updateReportProgress(reportId, 75); // Step 6

      await new Promise(r => setTimeout(r, 1000));
      
      const mockResult = generateMockReport(title, ideaDescription, industry, targetAudience, targetRegion);
      
      await prisma.report.update({
        where: { id: reportId },
        data: {
          status: "READY",
          validationScore: mockResult.validationScore,
          marketData: mockResult as any,
        },
      });
      return;
    }

    // Call the single, combined AI generation prompt
    console.log("Querying AI engine for unified startup validation market data...");
    await updateReportProgress(reportId, 30);

    const prompt = `
      You are a critical, realistic, and highly analytical startup advisor and market research analyst.
      Analyze this startup idea for the target market/region: ${targetRegion}.
      
      STRICT EVALUATION INSTRUCTIONS:
      - Be extremely critical when calculating the "validationScore". Do NOT give generic high scores. If the startup idea has low barriers to entry (e.g. a standard web development agency, a basic cleaning service, dropshipping, simple content blogs, or crowded local businesses), rate it as a CAUTION or PIVOT and give it a lower validation score (e.g. 35 to 60) highlighting high competitive density and lack of defensibility.
      - Calculate realistic, mathematically sound TAM, SAM, and SOM values based on the target audience size and industry averages. Do NOT output placeholder round numbers like 1,000,000,000 (1 Billion), 200,000,000, or 50,000,000. For instance, if it is a local web dev agency, size the market realistically based on regional SMB populations and average project fees (e.g. TAM might be $15M instead of $1B). Explain your sizing calculations clearly in the description.
      - Make all details (competitors, SWOT points, pricing tiers, and GTM strategy) highly tailored to the specific business description. Never use generic filler text or repeating boilerplate phrases.
      
      CRITICAL INSTRUCTION: If Target Region is "India", ensure you:
      - Size the TAM, SAM, and SOM values specifically for the Indian market, incorporating Indian user demographics, internet penetration, and local market size.
      - Research and list competitors active in India (e.g. Swiggy, Paytm, Zerodha, Tata, Jio, Zoho, or local indie players).
      - Design the mock pricing structure in INR (Indian Rupees ₹) or adjust subscription tiers to reflect Indian purchasing power parity (PPP).
      - Draft the GTM (Go-To-Market) timeline and target personas using Indian contexts, cities (e.g. Bangalore, Mumbai, Delhi), and cultural markers.
      
      Title: ${title}
      Description: ${ideaDescription}
      Industry: ${industry}
      Target Audience: ${targetAudience}
      Known Competitors: ${knownCompetitors}
      Target Region: ${targetRegion}

      Generate a comprehensive business validation report.
      Output a JSON object matching this structure EXACTLY:
      {
        "validationScore": number (0 to 100 representing overall startup validation score),
        "simpleSummary": {
          "verdict": "Go" | "Caution" | "Pivot",
          "verdictReason": "string (Short 1-2 sentence explanation of the verdict)",
          "eli5Explanation": "string (Simple, friendly, plain-English explanation of why this idea works or doesn't, using analogies a child would understand. Avoid business jargon entirely)",
          "topThreeSteps": ["string", "string", "string"] (The 3 absolute first simple, real-world action items the founder should do first)
        },
        "tamSamSom": {
          "tam": number (Total Addressable Market in USD),
          "sam": number (Serviceable Addressable Market in USD),
          "som": number (Serviceable Obtainable Market in USD),
          "description": "string (Brief analysis explaining the TAM/SAM/SOM breakdown and calculations)"
        },
        "swot": {
          "strengths": ["string"],
          "weaknesses": ["string"],
          "opportunities": ["string"],
          "threats": ["string"]
        },
        "competitors": [
          {
            "name": "string",
            "strengths": ["string"],
            "weaknesses": ["string"],
            "gaps": ["string"]
          },
          {
            "name": "string",
            "strengths": ["string"],
            "weaknesses": ["string"],
            "gaps": ["string"]
          }
        ],
        "risks": [
          {
            "risk": "string (Short title of the risk factor)",
            "impact": "High" | "Medium" | "Low",
            "mitigation": "string (Strategic action plan to mitigate this risk)"
          },
          {
            "risk": "string",
            "impact": "High" | "Medium" | "Low",
            "mitigation": "string"
          }
        ],
        "pricing": {
          "model": "string (e.g. Subscription SaaS, Transactional Fee)",
          "tiers": [
            {
              "name": "string (e.g. Starter)",
              "price": "string (e.g. Free or $29/mo)",
              "features": ["string"]
            },
            {
              "name": "string (e.g. Pro)",
              "price": "string",
              "features": ["string"]
            }
          ],
          "rationale": "string (Detailed business justification for the pricing model and tiers)"
        },
        "forecast": [
          { "year": 1, "revenue": number, "userCount": number },
          { "year": 2, "revenue": number, "userCount": number },
          { "year": 3, "revenue": number, "userCount": number }
        ],
        "personas": [
          {
            "name": "string (Fictional customer persona name)",
            "role": "string (Professional role or customer profile description)",
            "painPoints": ["string"],
            "values": ["string"]
          }
        ],
        "roadmap": [
          {
            "feature": "string (Short feature name)",
            "priority": "P0" | "P1" | "P2",
            "complexity": "Low" | "Medium" | "High",
            "description": "string (Functional description)"
          },
          {
            "feature": "string",
            "priority": "P0" | "P1" | "P2",
            "complexity": "Low" | "Medium" | "High",
            "description": "string"
          },
          {
            "feature": "string",
            "priority": "P0" | "P1" | "P2",
            "complexity": "Low" | "Medium" | "High",
            "description": "string"
          }
        ],
        "gtm": [
          {
            "phase": "string (e.g. Beta Release)",
            "timing": "string (e.g. Month 1)",
            "strategy": ["string"]
          },
          {
            "phase": "string (e.g. Scale)",
            "timing": "string (e.g. Months 2-6)",
            "strategy": ["string"]
          }
        ]
      }
    `;

    await updateReportProgress(reportId, 60);
    const aiText = await generateAIContent(prompt, true, "llama-3.1-8b-instant");
    console.log("--- RAW AI RESPONSE ---", aiText);
    await updateReportProgress(reportId, 90);

    const fullMarketData = JSON.parse(aiText);
    const validatedData = MarketDataSchema.parse(fullMarketData);

    await prisma.report.update({
      where: { id: reportId },
      data: {
        status: "READY",
        validationScore: validatedData.validationScore,
        marketData: validatedData as any,
      },
    });

    console.log(`Report ${reportId} successfully generated and verified!`);
  } catch (error) {
    console.error(`Pipeline generation failed for report ${reportId}:`, error);
    try {
      await prisma.report.update({
        where: { id: reportId },
        data: { status: "FAILED" },
      });
    } catch (e) {
      console.error("Failed to write FAILED state to DB:", e);
    }
  }
}

async function updateReportProgress(reportId: string, scoreProgress: number) {
  try {
    // We reuse validationScore dynamically to store raw percentage progress (0-100) during GENERATING status
    await prisma.report.update({
      where: { id: reportId },
      data: { validationScore: scoreProgress },
    });
  } catch (e) {
    console.error("Failed to update progress score:", e);
  }
}
