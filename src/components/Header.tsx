import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Search, Sparkles, TrendingUp, Users, AlertTriangle, BarChart3, ArrowRight, LogOut, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NotificationPanel } from "@/components/NotificationPanel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useToast } from "@/hooks/use-toast";
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
];

export const Header = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { isListening, isSupported, toggleListening } = useVoiceRecognition({
    onResult: (transcript) => {
      setQuery(transcript);
      inputRef.current?.focus();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Voice Recognition Error",
        description: error,
      });
    },
  });

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
  };

  const showSuggestions = isFocused && filteredSuggestions.length > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-primary">
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* Left: Logo & Trigger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors" />
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-foreground flex items-center justify-center">
              <span className="text-primary font-bold text-xs">Z</span>
            </div>
            <span className="text-base font-semibold text-primary-foreground">Zence</span>
            <span className="text-xs text-primary-foreground/80 font-medium">360</span>
          </Link>
        </div>

        {/* Center: AI Search with Suggestions */}
        <div ref={containerRef} className="flex-1 max-w-2xl relative">
          <div
            className={cn(
              "relative flex items-center rounded-xl border-2 transition-all duration-200",
              isFocused
                ? "border-primary-foreground/40 bg-primary-foreground/15"
                : "border-primary-foreground/20 bg-primary-foreground/10 hover:border-primary-foreground/30 hover:bg-primary-foreground/15"
            )}
          >
            <div className="flex items-center gap-2 pl-4">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Zence AI anything about your loyalty data..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="flex-1 h-12 px-3 text-sm bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
            />
            {isSupported && (
              <button
                onClick={toggleListening}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  isListening
                    ? "bg-destructive/20 text-destructive animate-pulse"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
                title={isListening ? "Stop listening" : "Voice search"}
                type="button"
              >
                <Mic className="h-4 w-4" />
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 mr-2 rounded-lg bg-primary-foreground text-primary text-sm font-medium hover:bg-primary-foreground/90 transition-colors">
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

        {/* Right: Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <NotificationPanel />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <User className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="p-2 border-b border-border mb-2">
                <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Loyalty Program Manager</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};