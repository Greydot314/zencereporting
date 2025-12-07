import { useState } from "react";
import { 
  LayoutDashboard, 
  Sparkles, 
  Settings, 
  HelpCircle,
  ChevronDown,
  Gauge,
  FileBarChart,
  TrendingUp,
  Bell,
  UserCheck,
  Lightbulb,
  Shield,
  Users
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mainItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "AI Insights", url: "/ai-insights", icon: Sparkles },
];

// Modules with AI status indicators
const modules = [
  { title: "Atlas Prime", url: "/module/atlas-prime", icon: Gauge, badge: "PRIME", aiStatus: "warning" },
  { title: "Atlas Neo", url: "/module/atlas-neo", icon: Gauge, badge: "NEW", aiStatus: "normal" },
  { title: "Clickrev", url: "/module/clickrev", icon: FileBarChart, aiStatus: "normal" },
  { title: "Segcon", url: "/module/segcon", icon: TrendingUp, aiStatus: "normal" },
  { title: "KPI Alerts", url: "/module/kpi-alerts", icon: Bell, aiStatus: "warning" },
  { title: "Behavioural", url: "/module/behavioural-analytics", icon: UserCheck, aiStatus: "normal" },
  { title: "Insights", url: "/module/insights", icon: Lightbulb, aiStatus: "normal" },
  { title: "Fraud", url: "/module/fraud", icon: Shield, aiStatus: "critical" },
  { title: "Loyalty", url: "/module/loyalty-extension", icon: Users, aiStatus: "normal" },
];

const otherItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const [modulesOpen, setModulesOpen] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive';
      case 'warning': return 'bg-amber-400';
      default: return 'bg-emerald-400';
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarContent className="pt-16">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs font-medium text-muted-foreground", !open && "justify-center")}>
            {open ? "Navigation" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary border border-primary/20"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Modules with Collapsible */}
        <SidebarGroup>
          <Collapsible open={modulesOpen} onOpenChange={setModulesOpen}>
            <CollapsibleTrigger className={cn(
              "flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors",
              !open && "justify-center"
            )}>
              {open ? (
                <>
                  <span>Modules</span>
                  <ChevronDown className={cn(
                    "h-3 w-3 transition-transform",
                    modulesOpen && "rotate-180"
                  )} />
                </>
              ) : (
                <span className="text-[10px]">M</span>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {modules.map((module) => (
                    <SidebarMenuItem key={module.title}>
                      <SidebarMenuButton asChild tooltip={module.title}>
                        <NavLink
                          to={module.url}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                          activeClassName="bg-primary/10 text-primary border border-primary/20"
                        >
                          <div className="relative">
                            <module.icon className="h-4 w-4 flex-shrink-0" />
                            {/* AI Status Indicator */}
                            <span className={cn(
                              "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-sidebar",
                              getStatusColor(module.aiStatus),
                              module.aiStatus === 'critical' && "animate-pulse"
                            )} />
                          </div>
                          {open && (
                            <div className="flex items-center justify-between flex-1">
                              <span className="truncate">{module.title}</span>
                              {module.badge && (
                                <span className={cn(
                                  "text-[9px] px-1.5 py-0.5 rounded-full font-semibold",
                                  module.badge === "PRIME" ? "bg-primary/20 text-primary" : "bg-emerald-400/20 text-emerald-400"
                                )}>
                                  {module.badge}
                                </span>
                              )}
                            </div>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Other */}
        <SidebarGroup className="mt-auto mb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary border border-primary/20"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
