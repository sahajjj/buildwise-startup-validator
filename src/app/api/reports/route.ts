import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getSessionUser from "@/lib/auth-helper";
import { runReportGenerationPipeline } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, ideaDescription, industry, targetAudience, knownCompetitors, targetRegion } = body;

    if (!title || !ideaDescription || !industry || !targetAudience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Auto-provision a workspace if not found to ensure smooth execution
    let workspace = await prisma.workspace.findFirst({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (!workspace) {
      // Auto-create workspace
      workspace = await prisma.workspace.create({
        data: {
          name: `${user.name || "My"}'s Workspace`,
          ownerId: user.id,
          members: {
            create: {
              userId: user.id,
              role: "OWNER",
            },
          },
        },
      });
    }

    // Create Report in database in GENERATING state
    const report = await prisma.report.create({
      data: {
        workspaceId: workspace.id,
        title,
        ideaDescription,
        industry,
        targetAudience,
        status: "GENERATING",
        validationScore: 0, // Used to store progress percentage initially
      },
    });

    // Run AI pipeline synchronously so serverless functions (e.g. Vercel) do not freeze/terminate execution prematurely
    await runReportGenerationPipeline(
      report.id,
      title,
      ideaDescription,
      industry,
      targetAudience,
      knownCompetitors || "",
      targetRegion || "Global"
    );

    return NextResponse.json({ id: report.id });
  } catch (error) {
    console.error("API create report failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
