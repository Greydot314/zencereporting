import { Button } from "@/components/ui/button";
import { Settings, Bell, User, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="h-full flex items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Zence
            </span>
            <span className="text-xs font-medium text-muted-foreground">360</span>
          </Link>
        </div>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search modules, insights, KPIs..."
              className="pl-9 bg-accent/30 border-border/50 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/ai-insights">
            <Button variant="ghost" size="sm" className="gap-2 bg-gradient-to-r from-purple-500/10 to-primary/10 hover:from-purple-500/20 hover:to-primary/20 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">AI Assistant</span>
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-xs border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            INR
          </div>
        </div>
      </div>
    </header>
  );
};
