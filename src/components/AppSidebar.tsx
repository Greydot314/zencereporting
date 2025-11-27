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
  SidebarMenuSub,
  SidebarMenuSubItem,
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

const modules = [
  { title: "Atlas Prime", url: "/module/atlas-prime", icon: Gauge, badge: "PRIME" },
  { title: "Atlas Neo", url: "/module/atlas-neo", icon: Gauge, badge: "NEW" },
  { title: "Clickrev", url: "/module/clickrev", icon: FileBarChart },
  { title: "Segcon", url: "/module/segcon", icon: TrendingUp },
  { title: "KPI Alerts", url: "/module/kpi-alerts", icon: Bell },
  { title: "Behavioural", url: "/module/behavioural-analytics", icon: UserCheck },
  { title: "Insights", url: "/module/insights", icon: Lightbulb },
  { title: "Fraud", url: "/module/fraud", icon: Shield },
  { title: "Loyalty", url: "/module/loyalty-extension", icon: Users },
];

const otherItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const [modulesOpen, setModulesOpen] = useState(true);

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
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
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      activeClassName="bg-accent text-foreground"
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
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          activeClassName="bg-accent text-foreground"
                        >
                          <module.icon className="h-4 w-4 flex-shrink-0" />
                          {open && (
                            <div className="flex items-center justify-between flex-1">
                              <span className="truncate">{module.title}</span>
                              {module.badge && (
                                <span className={cn(
                                  "text-[9px] px-1.5 py-0.5 rounded font-medium",
                                  module.badge === "PRIME" ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"
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
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      activeClassName="bg-accent text-foreground"
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
