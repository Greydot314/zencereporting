import { Button } from "@/components/ui/button";
import { Bell, User, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-card">
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* Left: Logo & Trigger */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground" />
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">Z</span>
            </div>
            <span className="text-base font-semibold text-foreground">Zence</span>
            <span className="text-xs text-muted-foreground">360</span>
          </Link>
        </div>

        {/* Center: Search/AI */}
        <Link to="/ai-chat" className="flex-1 max-w-lg">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <div className="h-9 pl-9 pr-4 bg-secondary/50 border border-border rounded-lg flex items-center gap-2 group-hover:border-primary/30 group-hover:bg-secondary transition-all cursor-pointer">
              <span className="text-sm text-muted-foreground">Ask AI anything...</span>
              <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
            </div>
          </div>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
