import { Button } from "@/components/ui/button";
import { Bell, User, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* Left: Logo & Trigger */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors" />
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">Z</span>
            </div>
            <span className="text-base font-semibold text-foreground">Zence</span>
            <span className="text-xs text-primary font-medium">360</span>
          </Link>
        </div>

        {/* Center: Search/AI */}
        <Link to="/ai-chat" className="flex-1 max-w-lg">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <div className="h-10 pl-10 pr-4 bg-secondary border border-border rounded-xl flex items-center gap-2 group-hover:border-primary/30 group-hover:shadow-sm transition-all cursor-pointer">
              <span className="text-sm text-muted-foreground">Ask AI anything...</span>
              <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-medium text-primary">AI</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
