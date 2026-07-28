import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getSessionUser from "@/lib/auth-helper";
import { generateAIContent } from "@/lib/gemini";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Missing message payload" }, { status: 400 });
    }

    let report;
    if (id === "general-sandbox") {
      report = {
        title: "General Startup Idea",
        ideaDescription: "A startup concept that is being validated and analyzed.",
        industry: "General Tech",
        targetAudience: "Early adopters",
      };
    } else {
      const dbReport = await prisma.report.findUnique({
        where: { id },
        include: {
          workspace: {
            include: {
              members: true,
            },
          },
        },
      });

      if (!dbReport) {
        return NextResponse.json({ error: "Report not found" }, { status: 404 });
      }

      // Access control check
      const isMember = dbReport.workspace.members.some((m) => m.userId === user.id);
      if (!isMember && user.id !== "mock-user-123") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      report = dbReport;

      // Save user message to database
      try {
        await prisma.chatMessage.create({
          data: {
            reportId: id,
            role: "user",
            content: message,
          },
        });
      } catch (err) {
        console.warn("Failed to save user chat message:", err);
      }
    }

    let reply = "";

    const hasAI = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;
    if (!hasAI) {
      // Mock assistant fallback responses based on keywords
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes("pricing") || lowerMsg.includes("tier")) {
        reply = `Analyzing the pricing structure for "${report.title}". I recommend introducing a mid-tier 'Growth Plan' at $49/mo targeting early-stage startups that bridge the gap between Starter and Enterprise. This would capture high-intent founders who need advanced analytics without enterprise budgets.`;
      } else if (lowerMsg.includes("competitor") || lowerMsg.includes("gap")) {
        reply = `Reviewing competitors for "${report.title}". Our main advantage lies in speed-to-market. By providing self-service API integrations, we address the primary weakness of incumbents like 'Incumbent Alpha' who require manual sales onboarding.`;
      } else {
        reply = `That is an excellent perspective. Regarding "${report.title}", optimizing our features around user retention should be our primary P0 priority. This matches the target audience's demand for faster startup workflows. Let me know if you would like me to adjust the roadmap!`;
      }
    } else {
      const prompt = `
        You are a highly analytical startup co-founder and advisor.
        Here is the startup idea context:
        Title: ${report.title}
        Description: ${report.ideaDescription}
        Industry: ${report.industry}
        Target Audience: ${report.targetAudience}

        The user asks: "${message}"
        Respond as a helpful, expert co-founder in a concise, professional, and conversational tone.
      `;

      reply = await generateAIContent(prompt, false, "llama-3.1-8b-instant");
    }

    // Save assistant reply to database
    if (id !== "general-sandbox") {
      try {
        await prisma.chatMessage.create({
          data: {
            reportId: id,
            role: "assistant",
            content: reply,
          },
        });
      } catch (err) {
        console.warn("Failed to save assistant chat message:", err);
      }
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("API report chat failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
