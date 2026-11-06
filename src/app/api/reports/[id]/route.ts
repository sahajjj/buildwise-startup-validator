import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getSessionUser from "@/lib/auth-helper";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        workspace: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Access control check: User must be a member of the workspace
    const isMember = report.workspace.members.some((m) => m.userId === user.id);
    if (!isMember && !user.id.startsWith("mock-") && user.id !== "mock-user-123") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("API get report failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Sandbox mock reports should not be deleted from DB
    if (id.startsWith("mock-report-")) {
      return NextResponse.json({ success: true, message: "Mock report deleted from sandbox session" });
    }

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        workspace: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Access control check: User must be a member of the workspace
    const isMember = report.workspace.members.some((m) => m.userId === user.id);
    if (!isMember && !user.id.startsWith("mock-") && user.id !== "mock-user-123") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete related chat messages first to satisfy foreign keys
    await prisma.chatMessage.deleteMany({
      where: { reportId: id },
    });

    // Delete the report
    await prisma.report.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API delete report failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
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
    const { isStarred } = body;

    if (typeof isStarred !== "boolean") {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Sandbox mock reports update simulation
    if (id.startsWith("mock-report-")) {
      return NextResponse.json({ success: true, isStarred });
    }

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        workspace: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Access control check
    const isMember = report.workspace.members.some((m) => m.userId === user.id);
    if (!isMember && user.id !== "mock-user-123") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedReport = await prisma.report.update({
      where: { id },
      data: { isStarred },
    });

    return NextResponse.json({ success: true, isStarred: updatedReport.isStarred });
  } catch (error) {
    console.error("API patch report failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
