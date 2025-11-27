import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, Plus, MessageSquare, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { InlineChart } from "@/components/chat/InlineChart";
import { DataTable } from "@/components/chat/DataTable";
import { CodeBlock } from "@/components/chat/CodeBlock";
import { InsightCard } from "@/components/chat/InsightCard";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
  chartData?: any;
  tableData?: any;
  code?: string;
  insight?: any;
}

interface Thread {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeThreadId, setActiveThreadId] = useState("thread-1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const threads: Thread[] = [
    { id: "thread-1", title: "Revenue Analysis", preview: "Why did revenue drop?", timestamp: "2h ago" },
    { id: "thread-2", title: "Fraud Detection", preview: "Show fraud patterns", timestamp: "5h ago" },
    { id: "thread-3", title: "Customer Insights", preview: "Analyze sentiment", timestamp: "Yesterday" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const query = input.toLowerCase();
      let aiMessage: Message = { role: "assistant", content: "" };

      if (query.includes("revenue") || query.includes("sales")) {
        aiMessage = {
          role: "assistant",
          content: "Revenue dropped by **6.2%** yesterday. Key factors:\n\n• Tier 2 stores: -12%\n• Saree category: -8%\n• Payment issues: affected 3.4% of checkouts",
          chartData: {
            type: "line",
            title: "Daily Revenue (Last 7 Days)",
            data: [
              { name: "Mon", value: 45000 },
              { name: "Tue", value: 52000 },
              { name: "Wed", value: 48000 },
              { name: "Thu", value: 51000 },
              { name: "Fri", value: 49000 },
              { name: "Sat", value: 47000 },
              { name: "Sun", value: 44000 },
            ],
          },
          tableData: {
            title: "Store Breakdown",
            columns: ["Tier", "Revenue", "Change"],
            data: [
              { Tier: "Tier 1", Revenue: "₹25,400", Change: "-2.1%" },
              { Tier: "Tier 2", Revenue: "₹12,100", Change: "-12.4%" },
              { Tier: "Tier 3", Revenue: "₹6,500", Change: "+1.2%" },
            ],
          },
          insight: {
            summary: "Revenue decline driven by Tier 2 payment issues during peak hours. Fixing gateway stability could recover ~4% of lost revenue.",
            confidence: "high" as const,
            trend: "down" as const,
            recommendations: [
              "Check payment gateway logs",
              "Implement fallback options",
              "Monitor Saree inventory",
            ],
          },
        };
      } else if (query.includes("fraud")) {
        aiMessage = {
          role: "assistant",
          content: "Fraud increased **18%** this week.\n\n• Account takeover: +24%\n• Payment fraud: +15%\n• Promo abuse: +12%",
          chartData: {
            type: "bar",
            title: "Fraud by Type",
            data: [
              { name: "Takeover", value: 45 },
              { name: "Payment", value: 32 },
              { name: "Promo", value: 28 },
              { name: "Identity", value: 19 },
            ],
          },
          insight: {
            summary: "Spike correlates with promotional campaign. Enable 2FA for high-value orders.",
            confidence: "high" as const,
            trend: "up" as const,
            recommendations: [
              "Enable two-factor auth",
              "Implement velocity checks",
              "Review IP blocking rules",
            ],
          },
        };
      } else {
        aiMessage = {
          role: "assistant",
          content: "I can analyze your business data across Atlas, Clickrev, Behavioural Analytics, and Fraud Detection. What would you like to explore?",
        };
      }

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestions = [
    "Why did revenue drop?",
    "Show fraud patterns",
    "Analyze customer sentiment",
    "Compare store performance",
  ];

  return (
    <div className="flex h-screen bg-background pt-14">
      {/* Sidebar */}
      <div className={cn(
        "border-r border-border bg-card flex-shrink-0 transition-all duration-200",
        sidebarOpen ? "w-64" : "w-0 overflow-hidden"
      )}>
        <div className="p-4 space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 text-sm"
            onClick={() => {
              setMessages([]);
              setActiveThreadId(`thread-${Date.now()}`);
            }}
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground px-2 py-1">Recent</p>
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  activeThreadId === thread.id 
                    ? "bg-accent text-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{thread.title}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5 ml-5">{thread.timestamp}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-12 border-b border-border flex items-center px-4 gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI Assistant</span>
          </div>
          <Link to="/" className="ml-auto">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-lg font-medium text-foreground mb-1">How can I help you today?</h2>
                <p className="text-sm text-muted-foreground mb-8">Ask about revenue, fraud, customers, or any metric</p>
                
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {suggestions.map((s, i) => (
                    <Card
                      key={i}
                      className="p-3 cursor-pointer hover:bg-accent hover:border-primary/30 transition-all text-left"
                      onClick={() => setInput(s)}
                    >
                      <p className="text-sm text-foreground">{s}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i}>
                    {msg.role === "user" ? (
                      <div className="flex justify-end">
                        <Card className="max-w-[70%] p-3 bg-primary text-primary-foreground">
                          <p className="text-sm">{msg.content}</p>
                        </Card>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-3 min-w-0">
                          <Card className="p-3 bg-card">
                            <p className="text-sm text-foreground whitespace-pre-wrap">{msg.content}</p>
                          </Card>
                          {msg.chartData && <InlineChart {...msg.chartData} />}
                          {msg.tableData && <DataTable {...msg.tableData} />}
                          {msg.code && <CodeBlock code={msg.code} />}
                          {msg.insight && <InsightCard {...msg.insight} />}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <Card className="p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Analyzing...</span>
                      </div>
                    </Card>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your business data..."
                className="pr-12 min-h-[48px] max-h-[120px] resize-none text-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 bottom-2 h-8 w-8"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AIChat;
