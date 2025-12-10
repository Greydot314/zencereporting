import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, TrendingUp, Users, AlertTriangle, BarChart3, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Suggestion {
  id: string;
  text: string;
  category: string;
  icon: React.ElementType;
}

const allSuggestions: Suggestion[] = [
  { id: "1", text: "Show Gold tier churn risk analysis", category: "Churn", icon: Users },
  { id: "2", text: "Revenue breakdown by segment", category: "Revenue", icon: TrendingUp },
  { id: "3", text: "Fraud alerts this week", category: "Fraud", icon: AlertTriangle },
  { id: "4", text: "Top performing campaigns", category: "Campaigns", icon: BarChart3 },
  { id: "5", text: "Points liability forecast", category: "Loyalty", icon: Sparkles },
  { id: "6", text: "Customer lifetime value trends", category: "Analytics", icon: TrendingUp },
  { id: "7", text: "Redemption rate by region", category: "Loyalty", icon: BarChart3 },
  { id: "8", text: "Silver to Gold conversion opportunities", category: "Tier", icon: Users },
  { id: "9", text: "Suspicious transaction patterns", category: "Fraud", icon: AlertTriangle },
  { id: "10", text: "Campaign ROI analysis", category: "Campaigns", icon: BarChart3 },
];

export const AISearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions.filter(
        (s) =>
          s.text.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));
    } else if (isFocused) {
      setFilteredSuggestions(allSuggestions.slice(0, 5));
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.text);
    setIsFocused(false);
    // Here you would trigger the AI search
  };

  const showSuggestions = isFocused && filteredSuggestions.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div
        className={cn(
          "relative flex items-center rounded-xl border-2 bg-background transition-all duration-200",
          isFocused
            ? "border-primary shadow-lg shadow-primary/10"
            : "border-border hover:border-primary/50"
        )}
      >
        <div className="flex items-center gap-2 pl-4">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask Zence AI anything about your loyalty data..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="h-14 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
        />
        <button
          className="flex items-center gap-2 px-4 py-2 mr-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="p-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-3 py-2 font-medium">
              {query ? "Suggestions" : "Popular Queries"}
            </p>
            {filteredSuggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors text-left group"
                >
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{suggestion.text}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {suggestion.category}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
          <div className="border-t border-border px-4 py-2.5 bg-secondary/30">
            <p className="text-[10px] text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-mono text-[10px]">Enter</kbd> to search or select a suggestion
            </p>
          </div>
        </div>
      )}
    </div>
  );
};