import { Message } from "@/types/aiChat";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { RFMDashboard } from "./RFMDashboard";
import { CampaignInsights } from "./CampaignInsights";
import { DashboardCarousel } from "./DashboardCarousel";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderContent = () => {
    if (message.contentType === "rfm" && message.rfmData) {
      return <RFMDashboard data={message.rfmData} />;
    }
    
    if (message.contentType === "campaign" && message.campaignData) {
      return <CampaignInsights data={message.campaignData} />;
    }
    
    if (message.contentType === "dashboard" && message.dashboardData) {
      return <DashboardCarousel data={message.dashboardData} />;
    }
    
    // Default text content
    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {message.content}
      </p>
    );
  };

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-secondary"
            : "bg-gradient-to-br from-primary to-accent"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-secondary/50 border border-border rounded-bl-md"
          )}
        >
          {renderContent()}
        </div>
        
        <span className="text-[10px] text-muted-foreground px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};
