import { Check, Loader2 } from "lucide-react";
import { SearchStep, DataSource } from "@/types/aiChat";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SearchingIndicatorProps {
  steps: SearchStep[];
  dataSources: DataSource[];
}

export const SearchingIndicator = ({
  steps,
  dataSources,
}: SearchingIndicatorProps) => {
  return (
    <div className="animate-fade-in space-y-4 p-4 bg-secondary/30 rounded-xl border border-border">
      {/* Searching header */}
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span className="text-sm font-medium text-foreground">Searching...</span>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 text-sm transition-all duration-300",
              step.status === "completed" && "text-foreground",
              step.status === "active" && "text-primary",
              step.status === "pending" && "text-muted-foreground"
            )}
          >
            {/* Status icon */}
            <div className="w-5 h-5 flex items-center justify-center">
              {step.status === "completed" ? (
                <div className="w-5 h-5 rounded-full bg-chart-3 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              ) : step.status === "active" ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30" />
              )}
            </div>
            
            {/* Label */}
            <span className={cn(
              step.status === "active" && "font-medium"
            )}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Data sources */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
        {dataSources.map((source, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="text-[10px] font-normal"
          >
            <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", source.color)} />
            {source.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
