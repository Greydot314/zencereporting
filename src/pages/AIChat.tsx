import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, ArrowLeft, Zap, TrendingUp, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InlineChart } from "@/components/chat/InlineChart";
import { DataTable } from "@/components/chat/DataTable";
import { CodeBlock } from "@/components/chat/CodeBlock";
import { InsightCard } from "@/components/chat/InsightCard";
import { StreamingText } from "@/components/chat/StreamingText";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
  chartData?: any;
  tableData?: any;
  code?: string;
  insight?: any;
  isStreaming?: boolean;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateStreaming = (fullMessage: Message) => {
    const words = fullMessage.content.split(" ");
    let currentContent = "";
    let wordIndex = 0;

    // Add initial streaming message
    setMessages(prev => [...prev, { ...fullMessage, content: "", isStreaming: true }]);

    const streamInterval = setInterval(() => {
      if (wordIndex < words.length) {
        currentContent += (wordIndex > 0 ? " " : "") + words[wordIndex];
        wordIndex++;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = { 
            ...newMessages[lastIndex], 
            content: currentContent,
            isStreaming: wordIndex < words.length
          };
          return newMessages;
        });
      } else {
        clearInterval(streamInterval);
        // Add charts/insights after text completes
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = { 
            ...fullMessage, 
            content: fullMessage.content,
            isStreaming: false 
          };
          return newMessages;
        });
        setIsLoading(false);
      }
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const query = input.toLowerCase();
      let aiMessage: Message = { role: "assistant", content: "" };

      if (query.includes("revenue") || query.includes("sales")) {
        aiMessage = {
          role: "assistant",
          content: "I've analyzed your revenue data and found some interesting patterns.\n\nRevenue dropped by **6.2%** yesterday compared to the weekly average. Here's what's contributing to this decline:\n\n• **Tier 2 stores** are down 12% - this is the biggest factor\n• **Saree category** sales decreased by 8%\n• **Payment gateway issues** affected 3.4% of checkout attempts\n\nLet me show you the detailed breakdown below.",
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
            title: "Store Tier Performance",
            columns: ["Tier", "Revenue", "Change"],
            data: [
              { Tier: "Tier 1", Revenue: "₹25,400", Change: "-2.1%" },
              { Tier: "Tier 2", Revenue: "₹12,100", Change: "-12.4%" },
              { Tier: "Tier 3", Revenue: "₹6,500", Change: "+1.2%" },
            ],
          },
          insight: {
            summary: "The revenue decline is primarily driven by Tier 2 store performance and payment gateway stability issues during peak hours. Addressing gateway reliability could recover approximately 4% of the lost revenue.",
            confidence: "high" as const,
            trend: "down" as const,
            recommendations: [
              "Review payment gateway logs for error patterns",
              "Implement automatic failover to backup gateway",
              "Check Saree inventory levels at Tier 2 stores",
            ],
          },
        };
      } else if (query.includes("fraud")) {
        aiMessage = {
          role: "assistant",
          content: "I've detected a significant increase in fraudulent activity this week.\n\nFraud attempts are up **18%** compared to last week. Here's the breakdown by type:\n\n• **Account takeover** attempts increased by 24%\n• **Payment fraud** up by 15%\n• **Promo code abuse** increased by 12%\n\nThis spike correlates with your recent promotional campaign launch.",
          chartData: {
            type: "bar",
            title: "Fraud Incidents by Type",
            data: [
              { name: "Takeover", value: 45 },
              { name: "Payment", value: 32 },
              { name: "Promo", value: 28 },
              { name: "Identity", value: 19 },
            ],
          },
          insight: {
            summary: "The fraud spike correlates strongly with the promotional campaign that started 3 days ago. Implementing additional verification for high-value orders and promotional redemptions is recommended.",
            confidence: "high" as const,
            trend: "up" as const,
            recommendations: [
              "Enable two-factor authentication for orders over ₹5,000",
              "Implement velocity checks on promo code usage",
              "Review and update IP blocking rules",
            ],
          },
        };
      } else if (query.includes("customer") || query.includes("sentiment")) {
        aiMessage = {
          role: "assistant",
          content: "Here's your customer sentiment analysis.\n\nOverall sentiment score is **4.2/5** with some areas needing attention:\n\n• **Product quality** feedback is excellent at 4.6/5\n• **Delivery experience** dropped to 3.8/5 this week\n• **Customer support** maintaining steady at 4.1/5",
          insight: {
            summary: "Delivery experience is the main pain point. 23% of negative reviews mention late deliveries or damaged packaging. Consider reviewing logistics partner performance.",
            confidence: "medium" as const,
            trend: "stable" as const,
            recommendations: [
              "Audit logistics partner SLAs",
              "Implement better packaging for fragile items",
              "Add proactive delivery status updates",
            ],
          },
        };
      } else {
        aiMessage = {
          role: "assistant",
          content: "I can help you analyze your business data across multiple modules including **Atlas** (store analytics), **Clickrev** (revenue optimization), **Behavioural Analytics** (customer insights), and **Fraud Detection**.\n\nTry asking me about:\n• Revenue trends and store performance\n• Fraud patterns and prevention\n• Customer sentiment and behavior\n• Category and product analysis\n\nWhat would you like to explore?",
        };
      }

      simulateStreaming(aiMessage);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickActions = [
    { label: "Revenue Analysis", icon: TrendingUp, query: "Why did revenue drop yesterday?" },
    { label: "Fraud Patterns", icon: Shield, query: "Show me recent fraud patterns" },
    { label: "Customer Sentiment", icon: Users, query: "Analyze customer sentiment" },
    { label: "Store Performance", icon: Zap, query: "Compare store performance" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Minimal Header */}
      <header className="flex items-center justify-between px-4 h-14 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Zence AI</h1>
              <p className="text-[10px] text-muted-foreground">Business Intelligence</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-secondary/30">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">How can I help you today?</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Ask me anything about your business data, from revenue analysis to fraud detection.
              </p>
              
              {/* Quick Action Chips */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(action.query)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all text-sm text-foreground group"
                  >
                    <action.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className="animate-fade-in">
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-md bg-primary text-primary-foreground shadow-sm">
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-3 min-w-0">
                        <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-card border border-border shadow-sm">
                          <StreamingText 
                            text={msg.content} 
                            isStreaming={msg.isStreaming}
                            className="text-sm text-foreground leading-relaxed"
                          />
                        </div>
                        {!msg.isStreaming && (
                          <>
                            {msg.chartData && <InlineChart {...msg.chartData} />}
                            {msg.tableData && <DataTable {...msg.tableData} />}
                            {msg.code && <CodeBlock code={msg.code} />}
                            {msg.insight && <InsightCard {...msg.insight} />}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Analyzing your data...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your business data..."
              className="pr-14 min-h-[52px] max-h-[150px] resize-none text-sm bg-secondary/50 border-border focus:border-primary rounded-xl placeholder:text-muted-foreground"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2 h-9 w-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
