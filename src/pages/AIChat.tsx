import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThreadList } from "@/components/chat/ThreadList";
import { InlineChart } from "@/components/chat/InlineChart";
import { DataTable } from "@/components/chat/DataTable";
import { CodeBlock } from "@/components/chat/CodeBlock";
import { InsightCard } from "@/components/chat/InsightCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  chartData?: any;
  tableData?: any;
  code?: string;
  insight?: any;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState("thread-1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock threads data
  const threads = [
    {
      id: "thread-1",
      title: "Revenue Analysis",
      preview: "Why did revenue drop yesterday?",
      timestamp: "2 hours ago",
      category: "today" as const,
    },
    {
      id: "thread-2",
      title: "Fraud Detection",
      preview: "Show fraud patterns this week",
      timestamp: "5 hours ago",
      category: "today" as const,
    },
    {
      id: "thread-3",
      title: "Customer Sentiment",
      preview: "Analyze review sentiment",
      timestamp: "Yesterday at 3:45 PM",
      category: "yesterday" as const,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with rich content
    setTimeout(() => {
      const query = input.toLowerCase();
      let aiMessage: Message = {
        role: "assistant",
        content: "",
      };

      // Revenue-related query
      if (query.includes("revenue") || query.includes("sales")) {
        aiMessage = {
          role: "assistant",
          content: "Revenue dropped by **6.2%** yesterday compared to the previous day. The primary contributing factors include:\n\n1. **Tier 2 stores** experienced a 12% decline\n2. **Saree category** saw reduced transactions (-8%)\n3. **Payment gateway issues** affected 3.4% of checkouts",
          chartData: {
            type: "line",
            title: "Daily Revenue Trend (Last 7 Days)",
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
            title: "Store-wise Revenue Breakdown",
            columns: ["Store Tier", "Revenue (₹)", "Change (%)", "Transactions"],
            data: [
              { "Store Tier": "Tier 1", "Revenue (₹)": "₹25,400", "Change (%)": "-2.1%", "Transactions": "1,240" },
              { "Store Tier": "Tier 2", "Revenue (₹)": "₹12,100", "Change (%)": "-12.4%", "Transactions": "580" },
              { "Store Tier": "Tier 3", "Revenue (₹)": "₹6,500", "Change (%)": "+1.2%", "Transactions": "320" },
            ],
          },
          code: `SELECT 
  store_tier,
  SUM(revenue) as total_revenue,
  COUNT(transaction_id) as transaction_count,
  (SUM(revenue) - LAG(SUM(revenue)) OVER (ORDER BY date)) / 
    LAG(SUM(revenue)) OVER (ORDER BY date) * 100 as percent_change
FROM transactions
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY store_tier, date
ORDER BY date DESC;`,
          insight: {
            summary: "The revenue decline is primarily driven by Tier 2 stores experiencing technical payment issues during peak hours (2-4 PM). Immediate action on payment gateway stability could recover ~4% of lost revenue.",
            confidence: "high" as const,
            trend: "down" as const,
            recommendations: [
              "Investigate payment gateway logs for Tier 2 stores",
              "Implement fallback payment options",
              "Monitor Saree category inventory levels",
              "Launch targeted promotions for affected categories",
            ],
            relatedModule: "Atlas",
          },
        };
      }
      // Fraud-related query
      else if (query.includes("fraud")) {
        aiMessage = {
          role: "assistant",
          content: "Fraud detection analysis shows a **18% increase** in suspicious activities this week. Key patterns identified:\n\n1. **Account takeover attempts** increased by 24%\n2. **Multiple failed payment attempts** from same IPs\n3. **Unusual geographic patterns** in Tier 3 cities",
          chartData: {
            type: "bar",
            title: "Fraud Incidents by Type",
            data: [
              { name: "Account Takeover", value: 45 },
              { name: "Payment Fraud", value: 32 },
              { name: "Promo Abuse", value: 28 },
              { name: "Identity Theft", value: 19 },
            ],
          },
          insight: {
            summary: "The spike in fraud attempts correlates with a recent promotional campaign. Implementing stricter verification for high-value transactions could mitigate risk.",
            confidence: "high" as const,
            trend: "up" as const,
            recommendations: [
              "Enable two-factor authentication for high-value orders",
              "Implement velocity checks on payment attempts",
              "Review IP blocking rules",
            ],
            relatedModule: "Fraud",
          },
        };
      }
      // Default response
      else {
        aiMessage = {
          role: "assistant",
          content: "I can help you analyze your business data across various modules including Atlas, Clickrev, Behavioural Analytics, and Fraud Detection. What specific insights are you looking for?",
        };
      }

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const contextualSuggestions = [
    "Why did revenue drop yesterday?",
    "Show fraud patterns this week",
    "Analyze customer sentiment",
    "Compare store performance",
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Thread Sidebar */}
      <ThreadList
        threads={threads}
        activeThreadId={activeThreadId}
        onThreadSelect={setActiveThreadId}
        onNewThread={() => {
          setMessages([]);
          setActiveThreadId(`thread-${Date.now()}`);
        }}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border/50 bg-card/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Analytics Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Powered by Zence 360 Intelligence Engine
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Start a conversation with AI
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Ask questions about revenue, fraud, customer behavior, or any business metric
                </p>

                <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {contextualSuggestions.map((suggestion, i) => (
                    <Card
                      key={i}
                      className="p-4 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all group hover:scale-[1.02]"
                      onClick={() => setInput(suggestion)}
                    >
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {suggestion}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, i) => (
                  <div key={i}>
                    {message.role === "user" ? (
                      <div className="flex gap-3 justify-end">
                        <Card className="max-w-[70%] p-4 bg-primary text-primary-foreground">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </Card>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-xs font-semibold text-secondary-foreground">
                            You
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div className="max-w-[80%]">
                          {/* Text Content */}
                          <Card className="p-4 bg-card">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </Card>

                          {/* Chart */}
                          {message.chartData && (
                            <InlineChart
                              type={message.chartData.type}
                              data={message.chartData.data}
                              title={message.chartData.title}
                            />
                          )}

                          {/* Table */}
                          {message.tableData && (
                            <DataTable
                              title={message.tableData.title}
                              columns={message.tableData.columns}
                              data={message.tableData.data}
                            />
                          )}

                          {/* Code Block */}
                          {message.code && <CodeBlock code={message.code} />}

                          {/* Insight Card */}
                          {message.insight && (
                            <InsightCard
                              summary={message.insight.summary}
                              confidence={message.insight.confidence}
                              trend={message.insight.trend}
                              recommendations={message.insight.recommendations}
                              relatedModule={message.insight.relatedModule}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Analyzing data...
                        </span>
                      </div>
                    </Card>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 bg-card/80 backdrop-blur-xl p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {/* Contextual Suggestions */}
            {messages.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {["Drill deeper", "Compare with last week", "Show by category", "Export data"].map(
                  (suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  )
                )}
              </div>
            )}

            {/* Input Field */}
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your business data... (Enter to send, Shift+Enter for new line)"
                className="pr-24 min-h-[60px] max-h-[200px] resize-none"
                disabled={isLoading}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={isLoading}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="h-8 w-8"
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are generated based on your business data and include interactive
              visualizations
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AIChat;
