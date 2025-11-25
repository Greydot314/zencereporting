import { Settings, FileText, TrendingUp, Shield, Lightbulb, Bell, UserCheck, Users, Home, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

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

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "AI Insights", url: "/ai-insights", icon: Sparkles },
];

const moduleItems = [
  { title: "Atlas Prime", url: "/module/atlas-prime", icon: Settings, badge: "PRIME" },
  { title: "Atlas Neo", url: "/module/atlas-neo", icon: Settings, badge: "NEO", disabled: true },
  { title: "Clickrev", url: "/module/clickrev", icon: FileText },
  { title: "Segcon", url: "/module/segcon", icon: TrendingUp },
  { title: "KPI Alerts", url: "/module/kpi-alerts", icon: Bell },
  { title: "Behavioural Analytics", url: "/module/behavioural-analytics", icon: UserCheck },
  { title: "Insights", url: "/module/insights", icon: Lightbulb },
  { title: "Fraud", url: "/module/fraud", icon: Shield },
  { title: "Loyalty Extension", url: "/module/loyalty-extension", icon: Users, disabled: true },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-16">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "justify-center" : ""}>
            {open ? "Navigation" : "Nav"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-accent/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "justify-center" : ""}>
            {open ? "Modules" : "Mod"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {moduleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} disabled={item.disabled}>
                    <NavLink
                      to={item.url}
                      className={`hover:bg-accent/50 transition-colors relative ${
                        item.disabled ? "opacity-50 pointer-events-none" : ""
                      }`}
                      activeClassName="bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                    >
                      <item.icon className="h-4 w-4" />
                      {open && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.badge && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                              item.badge === 'PRIME' 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-secondary/20 text-secondary-foreground'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </span>
                      )}
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
