import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FollowUpSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const FollowUpSuggestions = ({
  suggestions,
  onSelect,
}: FollowUpSuggestionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(suggestion)}
          className="h-auto py-2 px-3 text-xs font-normal rounded-full border-border hover:border-primary/40 hover:bg-primary/5 group transition-all"
        >
          <span>{suggestion}</span>
          <ArrowRight className="ml-1.5 h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
        </Button>
      ))}
    </div>
  );
};
