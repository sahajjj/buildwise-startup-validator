import { MarketDataType } from "@/lib/schemas";

export interface Report {
  id: string;
  workspaceId: string;
  title: string;
  ideaDescription: string;
  industry: string;
  targetAudience: string;
  status: "GENERATING" | "READY" | "FAILED";
  validationScore: number | null;
  marketData: MarketDataType | null;
  pdfUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  reportId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}
