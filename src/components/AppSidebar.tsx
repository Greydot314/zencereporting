import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Sparkles, 
  Settings, 
  HelpCircle,
  ChevronRight,
  Gauge,
  FileBarChart,
  TrendingUp,
  Bell,
  UserCheck,
  Lightbulb,
  Shield,
  Users,
  LineChart,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Database,
  Workflow,
  Store,
  Gift,
  Megaphone
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SubMenuItem {
  title: string;
  url: string;
  badge?: string;
}

interface ModuleItem {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string;
  aiStatus: string;
  subItems?: SubMenuItem[];
}

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI Insights", url: "/ai-insights", icon: Sparkles },
  { title: "Predictions", url: "/predictions", icon: LineChart },
];

// Modules with AI status indicators and sub-items
const modules: ModuleItem[] = [
  { 
    title: "Atlas Prime", 
    url: "/module/atlas-prime", 
    icon: Gauge, 
    badge: "PRIME", 
    aiStatus: "warning",
    subItems: [
      { title: "Customer Segments", url: "/module/atlas-prime/segments", badge: "BETA" },
      { title: "Cohort Analysis", url: "/module/atlas-prime/cohort" },
      { title: "LTV Analysis", url: "/module/atlas-prime/ltv" },
      { title: "Repeat Purchase Rate", url: "/module/atlas-prime/repeat-purchase" },
      { title: "RFM Dashboard", url: "/module/atlas-prime/rfm" },
    ]
  },
  { 
    title: "Atlas Neo", 
    url: "/module/atlas-neo", 
    icon: Gauge, 
    badge: "NEW", 
    aiStatus: "normal",
    subItems: [
      { title: "Real-time Analytics", url: "/module/atlas-neo/realtime" },
      { title: "Predictive Insights", url: "/module/atlas-neo/predictive" },
      { title: "AI Recommendations", url: "/module/atlas-neo/recommendations" },
    ]
  },
  { 
    title: "Clickrev", 
    url: "/module/clickrev", 
    icon: FileBarChart, 
    aiStatus: "normal",
    subItems: [
      { title: "Campaign Performance", url: "/module/clickrev/campaigns" },
      { title: "Revenue Attribution", url: "/module/clickrev/attribution" },
      { title: "Click Analytics", url: "/module/clickrev/clicks" },
    ]
  },
  { 
    title: "Segcon", 
    url: "/module/segcon", 
    icon: TrendingUp, 
    aiStatus: "normal",
    subItems: [
      { title: "Home", url: "/module/segcon" },
      { title: "Segment", url: "/module/segcon/segments" },
      { title: "Import", url: "/module/segcon/import" },
      { title: "Look-a-Like", url: "/module/segcon/lookalike" },
      { title: "Archive", url: "/module/segcon/archive" },
      { title: "Split Segment", url: "/module/segcon/split" },
      { title: "Glossary", url: "/module/segcon/glossary" },
    ]
  },
  { 
    title: "KPI Alerts", 
    url: "/module/kpi-alerts", 
    icon: Bell, 
    aiStatus: "warning",
    subItems: [
      { title: "Alert Dashboard", url: "/module/kpi-alerts/dashboard" },
      { title: "Alert Rules", url: "/module/kpi-alerts/rules" },
      { title: "Notifications", url: "/module/kpi-alerts/notifications" },
    ]
  },
  { 
    title: "Behavioural", 
    url: "/module/behavioural-analytics", 
    icon: UserCheck, 
    aiStatus: "normal",
    subItems: [
      { title: "User Journeys", url: "/module/behavioural-analytics/journeys" },
      { title: "Event Tracking", url: "/module/behavioural-analytics/events" },
      { title: "Heatmaps", url: "/module/behavioural-analytics/heatmaps" },
    ]
  },
  { 
    title: "Insights", 
    url: "/module/insights", 
    icon: Lightbulb, 
    aiStatus: "normal",
    subItems: [
      { title: "AI Insights", url: "/module/insights/ai" },
      { title: "Trend Analysis", url: "/module/insights/trends" },
      { title: "Reports", url: "/module/insights/reports" },
    ]
  },
  { 
    title: "Fraud", 
    url: "/module/fraud", 
    icon: Shield, 
    aiStatus: "critical",
    subItems: [
      { title: "Fraud Detection", url: "/module/fraud/detection" },
      { title: "Risk Scoring", url: "/module/fraud/risk" },
      { title: "Alerts", url: "/module/fraud/alerts" },
    ]
  },
  { 
    title: "Loyalty", 
    url: "/module/loyalty-extension", 
    icon: Users, 
    aiStatus: "normal",
    subItems: [
      { title: "Points Management", url: "/module/loyalty-extension/points" },
      { title: "Rewards Catalog", url: "/module/loyalty-extension/rewards" },
      { title: "Tier Management", url: "/module/loyalty-extension/tiers" },
    ]
  },
];

const otherItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive';
      case 'warning': return 'bg-amber-400';
      default: return 'bg-emerald-400';
    }
  };

  const isModuleActive = (module: ModuleItem) => {
    if (location.pathname === module.url) return true;
    if (module.subItems?.some(sub => location.pathname === sub.url)) return true;
    return false;
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">
      <SidebarContent className="pt-16 bg-background">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors [&>svg]:text-muted-foreground [&>svg]:hover:text-foreground"
                      activeClassName="bg-sidebar-accent text-primary font-semibold border border-primary/20 [&>svg]:text-primary"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0 transition-colors" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Divider */}
        <div className="px-3 my-2">
          <div className="h-px bg-border" />
        </div>

        {/* Modules */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem 
                  key={module.title}
                  onMouseEnter={() => setHoveredModule(module.title)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  {module.subItems && module.subItems.length > 0 ? (
                    <Popover 
                      open={hoveredModule === module.title} 
                      onOpenChange={() => {}}
                    >
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition-colors group",
                            isModuleActive(module) 
                              ? "bg-sidebar-accent text-primary font-semibold border border-primary/20" 
                              : "text-muted-foreground font-normal hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <div className="relative">
                            <module.icon className={cn(
                              "h-5 w-5 flex-shrink-0 transition-colors",
                              isModuleActive(module) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                            <span className={cn(
                              "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-background",
                              getStatusColor(module.aiStatus),
                              module.aiStatus === 'critical' && "animate-pulse"
                            )} />
                          </div>
                          {open && (
                            <>
                              <span className="flex-1 text-left truncate">{module.title}</span>
                              <ChevronRight className={cn(
                                "h-4 w-4 transition-all opacity-0 group-hover:opacity-100",
                                hoveredModule === module.title && "rotate-90 opacity-100"
                              )} />
                            </>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent 
                        side="right" 
                        align="start" 
                        sideOffset={8}
                        className="w-64 p-2 bg-background border border-border shadow-lg animate-fade-in"
                        onMouseEnter={() => setHoveredModule(module.title)}
                        onMouseLeave={() => setHoveredModule(null)}
                      >
                        <div className="space-y-1">
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {module.title}
                          </div>
                          {module.subItems.map((subItem) => (
                            <NavLink
                              key={subItem.url}
                              to={subItem.url}
                              className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-normal"
                              activeClassName="text-primary font-semibold bg-sidebar-accent"
                              onClick={() => setHoveredModule(null)}
                            >
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-primary/10 text-primary">
                                  {subItem.badge}
                                </span>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <SidebarMenuButton asChild tooltip={module.title}>
                      <NavLink
                        to={module.url}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors [&>div>svg]:text-muted-foreground [&>div>svg]:hover:text-foreground"
                        activeClassName="bg-sidebar-accent text-primary font-semibold border border-primary/20 [&>div>svg]:text-primary"
                      >
                        <div className="relative">
                          <module.icon className="h-5 w-5 flex-shrink-0 transition-colors" />
                          <span className={cn(
                            "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-background",
                            getStatusColor(module.aiStatus),
                            module.aiStatus === 'critical' && "animate-pulse"
                          )} />
                        </div>
                        {open && <span>{module.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Divider */}
        <div className="px-3 my-2">
          <div className="h-px bg-border" />
        </div>

        {/* Other */}
        <SidebarGroup className="mb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors [&>svg]:text-muted-foreground [&>svg]:hover:text-foreground"
                      activeClassName="bg-sidebar-accent text-primary font-semibold border border-primary/20 [&>svg]:text-primary"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0 transition-colors" />
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
