import { ChatPanel } from "@/components/dashboard/ChatPanel";

export default function GeneralChatPage() {
  return (
    <div className="h-[calc(100vh-64px)] bg-white">
      <ChatPanel reportId="general-sandbox" title="General Startup Advisor" />
    </div>
  );
}
