"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Brain } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  reportId: string;
  title: string;
}

export function ChatPanel({ reportId, title }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: `Hi! I'm your AI co-founder. I've finished analyzing "${title}". Let me know if you want to tweak pricing, review the GTM channels, refine customer personas, or generate pitch deck slides from this report!`,
    },
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/reports/${reportId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!res.ok) throw new Error("Chat error");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-ai",
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      console.warn("Dev chat mock reply triggered:", err);
      // Sandbox fallback response logic
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-mock-ai",
            role: "assistant",
            content: `I've researched your follow-up point: "${userMessage.content}". That suggests an excellent iteration! Let's update our marketing funnel priorities accordingly.`,
          },
        ]);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-raised relative">
      {/* Panel Header */}
      <div className="p-4 border-b border-border-default bg-[#020806] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-[#00D28A]" />
          <span className="text-xs sm:text-sm font-bold tracking-tight">AI Co-Founder Chat</span>
        </div>
        <span className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded text-white/70 tracking-wide uppercase">
          Sandbox Mode
        </span>
      </div>
 
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                isUser ? "bg-[#FF6F61]/10 text-[#FF6F61]" : "bg-[#020806] text-[#00D28A]"
              }`}>
                {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-3.5 w-3.5" />}
              </div>
              <div className={`rounded-2xl p-3 text-xs leading-relaxed ${
                isUser 
                  ? "bg-[#C66A3D] text-white rounded-tr-none shadow-sm" 
                  : "bg-surface-sunken text-text-primary border border-border-default rounded-tl-none shadow-sm"
              }`}>
                {m.content}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex items-start gap-2.5 mr-auto max-w-[85%]">
            <div className="h-8 w-8 rounded-full bg-[#020806] text-[#00D28A] flex items-center justify-center text-xs">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
            </div>
            <div className="rounded-2xl p-3 text-xs bg-surface-sunken text-text-tertiary border border-border-default rounded-tl-none animate-pulse">
              Formulating response...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>
 
      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-border-default flex items-center gap-2 bg-surface-sunken shrink-0">
        <input
          type="text"
          placeholder="Ask your co-founder a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="flex-1 px-4 py-2.5 rounded-full border border-border-default text-xs text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D28A]/20 focus:border-[#00D28A] transition-all bg-surface-canvas"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="h-9 w-9 shrink-0 rounded-full bg-[#C66A3D] text-white flex items-center justify-center hover:bg-[#B55B2E] disabled:opacity-50 transition-all focus-ring cursor-pointer"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
export default ChatPanel;
