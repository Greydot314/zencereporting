import { Message } from "@/types/aiChat";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { RFMDashboard } from "./RFMDashboard";
import { CampaignInsights } from "./CampaignInsights";
import { DashboardCarousel } from "./DashboardCarousel";
import { ForecastInsights } from "./ForecastInsights";
import { ChurnInsights } from "./ChurnInsights";
import { WhatIfInsights } from "./WhatIfInsights";
import { CLVInsights } from "./CLVInsights";
import { FraudInsights } from "./FraudInsights";

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
    if (message.contentType === "forecast" && message.forecastData) {
      return <ForecastInsights data={message.forecastData} query={message.content} />;
    }
    
    if (message.contentType === "churn" && message.churnData) {
      return <ChurnInsights data={message.churnData} query={message.content} />;
    }
    
    if (message.contentType === "whatif" && message.whatIfData) {
      return <WhatIfInsights data={message.whatIfData} query={message.content} />;
    }
    
    if (message.contentType === "clv" && message.clvData) {
      return <CLVInsights data={message.clvData} query={message.content} />;
    }
    
    if (message.contentType === "fraud" && message.fraudData) {
      return <FraudInsights data={message.fraudData} query={message.content} />;
    }
    
    if (message.contentType === "rfm" && message.rfmData) {
      return <RFMDashboard data={message.rfmData} query={message.content} />;
    }
    
    if (message.contentType === "campaign" && message.campaignData) {
      return <CampaignInsights data={message.campaignData} query={message.content} />;
    }
    
    if (message.contentType === "dashboard" && message.dashboardData) {
      return <DashboardCarousel data={message.dashboardData} query={message.content} />;
    }
    
    // Default text content
    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {message.content}
      </p>
    );
  };

  // User message - compact bubble style
  if (isUser) {
    return (
      <div className="flex gap-3 flex-row-reverse animate-fade-in">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-secondary">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div className="rounded-2xl px-4 py-3 bg-primary text-primary-foreground rounded-br-md max-w-md">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <span className="text-[10px] text-muted-foreground px-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  // Assistant message - full width open layout
  return (
    <div className="flex gap-4 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </div>

      {/* Content - Full width, no card container */}
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Oliver</span>
          <span className="text-[10px] text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        {/* Render visualization or text directly */}
        <div className="w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
