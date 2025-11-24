import { Button } from "@/components/ui/button";
import { Settings, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const isModulePage = location.pathname.startsWith("/module/");
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Zence
          </span>
          <span className="text-sm font-medium text-muted-foreground">360</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isModulePage && (
            <Link to="/ai-insights">
              <Button variant="outline" className="gap-2">
                <Sparkles className="w-4 h-4" />
                AI Insights
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            INR
          </div>
        </div>
      </div>
    </header>
  );
};
