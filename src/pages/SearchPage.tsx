import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Message, SearchStep, ContentType } from "@/types/aiChat";
import {
  mockRFMData,
  mockCampaignData,
  mockDashboardData,
  dataSources,
  defaultFollowUpSuggestions,
  rfmFollowUpSuggestions,
  campaignFollowUpSuggestions,
  dashboardFollowUpSuggestions,
} from "@/data/aiChatMockData";
import { ChatMessage } from "@/components/ai-chat/ChatMessage";
import { ChatInput } from "@/components/ai-chat/ChatInput";
import { TypingIndicator } from "@/components/ai-chat/TypingIndicator";
import { FollowUpSuggestions } from "@/components/ai-chat/FollowUpSuggestions";
import { SearchingIndicator } from "@/components/ai-chat/SearchingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

const initialSearchSteps: SearchStep[] = [
  { id: "1", label: "Understanding your query...", status: "pending" },
  { id: "2", label: "Querying databases...", status: "pending" },
  { id: "3", label: "Analyzing results...", status: "pending" },
  { id: "4", label: "Generating insights...", status: "pending" },
];

const detectContentType = (query: string): ContentType => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("rfm") || lowerQuery.includes("customer segmentation") || lowerQuery.includes("segments")) {
    return "rfm";
  }
  
  if (lowerQuery.includes("campaign") || lowerQuery.includes("performance") || lowerQuery.includes("channel") || lowerQuery.includes("roas")) {
    return "campaign";
  }
  
  if (lowerQuery.includes("dashboard") || lowerQuery.includes("kpi") || lowerQuery.includes("metrics")) {
    return "dashboard";
  }
  
  return "text";
};

const getFollowUpSuggestions = (contentType: ContentType): string[] => {
  switch (contentType) {
    case "rfm":
      return rfmFollowUpSuggestions;
    case "campaign":
      return campaignFollowUpSuggestions;
    case "dashboard":
      return dashboardFollowUpSuggestions;
    default:
      return defaultFollowUpSuggestions;
  }
};

const generateResponse = (query: string, contentType: ContentType): Partial<Message> => {
  switch (contentType) {
    case "rfm":
      return {
        content: "Here's your RFM segmentation analysis based on the last 90 days of customer data:",
        contentType: "rfm",
        rfmData: mockRFMData,
        followUpSuggestions: rfmFollowUpSuggestions,
      };
    case "campaign":
      return {
        content: "Here's the campaign performance breakdown across all channels:",
        contentType: "campaign",
        campaignData: mockCampaignData,
        followUpSuggestions: campaignFollowUpSuggestions,
      };
    case "dashboard":
      return {
        content: "Here are your key performance indicators for this month:",
        contentType: "dashboard",
        dashboardData: mockDashboardData,
        followUpSuggestions: dashboardFollowUpSuggestions,
      };
    default:
      return {
        content: `I've analyzed your query about "${query}". Based on the available data, here are some insights:\n\n• Customer engagement has increased 12% this quarter\n• The loyalty program shows strong ROI with 3.8x returns\n• VIP segment represents 8% of customers but 32% of revenue\n\nWould you like me to dive deeper into any of these areas?`,
        contentType: "text",
        followUpSuggestions: defaultFollowUpSuggestions,
      };
  }
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchSteps, setSearchSteps] = useState<SearchStep[]>(initialSearchSteps);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(defaultFollowUpSuggestions);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasProcessedInitial = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSearching, isTyping]);

  // Process initial query from URL
  useEffect(() => {
    if (initialQuery && !hasProcessedInitial.current) {
      hasProcessedInitial.current = true;
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const animateSearchSteps = async () => {
    const delays = [400, 600, 500, 500];
    
    for (let i = 0; i < initialSearchSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, delays[i]));
      
      setSearchSteps((prev) =>
        prev.map((step, index) => ({
          ...step,
          status: index < i ? "completed" : index === i ? "active" : "pending",
        }))
      );
    }
    
    // Complete the last step
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSearchSteps((prev) =>
      prev.map((step) => ({ ...step, status: "completed" }))
    );
  };

  const handleSend = async (query: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Start searching animation
    setIsSearching(true);
    setSearchSteps(initialSearchSteps.map((s) => ({ ...s, status: "pending" })));
    
    // Animate through search steps
    await animateSearchSteps();
    
    // Hide searching, show typing
    setIsSearching(false);
    setIsTyping(true);
    
    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Generate response based on query
    const contentType = detectContentType(query);
    const responseData = generateResponse(query, contentType);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseData.content || "",
      timestamp: new Date().toISOString(),
      ...responseData,
    };
    
    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
    setCurrentSuggestions(responseData.followUpSuggestions || defaultFollowUpSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <main className="flex-1 flex flex-col pt-16 h-screen overflow-hidden bg-background">
      {/* Chat Container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {/* Welcome message if no messages */}
            {messages.length === 0 && !isSearching && (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Hi, I'm Oliver
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your AI Marketing Assistant. Ask me about customer segments, campaign performance, or any loyalty metrics.
                </p>
              </div>
            )}

            {/* Messages */}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Searching Indicator */}
            {isSearching && (
              <SearchingIndicator steps={searchSteps} dataSources={dataSources} />
            )}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            {/* Follow-up Suggestions */}
            {messages.length > 0 && !isSearching && !isTyping && (
              <div className="pl-11">
                <FollowUpSuggestions
                  suggestions={currentSuggestions}
                  onSelect={handleSuggestionClick}
                />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-background">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSend={handleSend}
              disabled={isSearching || isTyping}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
