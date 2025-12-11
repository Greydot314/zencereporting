import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, TrendingUp, Gift, Users, ChevronRight, Store, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Notification {
  id: number;
  type: "alert" | "insight" | "reward" | "segment";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  programName: string;
  region: string;
  customersAffected?: number;
  revenueImpact?: string;
  storeId?: string;
  details: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "alert",
    title: "High-velocity Redemption",
    message: "47 redemptions in 2 hours detected",
    timestamp: "5m ago",
    read: false,
    programName: "Levi's Loyalty Club",
    region: "West Region",
    storeId: "Store #405",
    customersAffected: 47,
    revenueImpact: "₹2.3L",
    details: "Multiple redemptions flagged from 3 unique IP addresses for SKU #5592 (Ladies Handbag). Pattern suggests coordinated abuse. Recommended action: Freeze SKU pending manual review.",
  },
  {
    id: 2,
    type: "insight",
    title: "Gold Tier Latency Increase",
    message: "Average purchase gap increased to 21 days",
    timestamp: "1h ago",
    read: false,
    programName: "Max Fashion Rewards",
    region: "North Region",
    customersAffected: 1250,
    revenueImpact: "₹8.5L",
    details: "Gold tier members showing decreased engagement. Recency score dropped 15% compared to last month. Consider targeted win-back campaign with bonus points incentive.",
  },
  {
    id: 3,
    type: "reward",
    title: "Points Expiry Reminder",
    message: "₹4.2Cr points expiring in 7 days",
    timestamp: "2h ago",
    read: true,
    programName: "Shoppers Stop First Citizen",
    region: "All Regions",
    customersAffected: 8500,
    revenueImpact: "₹4.2Cr",
    details: "8,500 customers have points expiring within 7 days. Historical data shows 35% redemption rate when notified. Recommend SMS + Push notification campaign.",
  },
  {
    id: 4,
    type: "segment",
    title: "New High-Value Segment",
    message: "342 customers qualified for Platinum",
    timestamp: "4h ago",
    read: true,
    programName: "Levi's Loyalty Club",
    region: "South Region",
    customersAffected: 342,
    revenueImpact: "₹12.8L potential",
    details: "342 Gold members have crossed the Platinum qualification threshold. Average CLTV: ₹37,400. Recommend immediate tier upgrade notification with exclusive benefits preview.",
  },
];

const typeConfig = {
  alert: { icon: AlertTriangle, color: "text-[hsl(var(--atlas-warning))]", bg: "bg-[hsl(var(--atlas-warning))]/10" },
  insight: { icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
  reward: { icon: Gift, color: "text-[hsl(var(--atlas-success))]", bg: "bg-[hsl(var(--atlas-success))]/10" },
  segment: { icon: Users, color: "text-accent-foreground", bg: "bg-accent/50" },
};

export const NotificationPanel = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setDialogOpen(true);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary-foreground rounded-full ring-2 ring-primary flex items-center justify-center text-[8px] font-bold text-primary" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-3 border-b border-border">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Notifications</h4>
              <Badge variant="secondary" className="text-[10px]">{unreadCount} new</Badge>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;
              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full p-3 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left border-b border-border/50 last:border-0 ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className={`p-2 rounded-lg ${config.bg} shrink-0`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{notification.title}</p>
                      {!notification.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              );
            })}
          </div>
          <div className="p-2 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View All Notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedNotification && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${typeConfig[selectedNotification.type].bg}`}>
                    {(() => {
                      const Icon = typeConfig[selectedNotification.type].icon;
                      return <Icon className={`h-5 w-5 ${typeConfig[selectedNotification.type].color}`} />;
                    })()}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      {selectedNotification.timestamp}
                    </p>
                    <DialogTitle className="text-lg">{selectedNotification.title}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Program & Region */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Store className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Program</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedNotification.programName}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Region</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedNotification.region}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedNotification.customersAffected && (
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Customers</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {selectedNotification.customersAffected.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {selectedNotification.revenueImpact && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[10px] uppercase tracking-wider text-primary">Revenue Impact</span>
                      </div>
                      <p className="text-sm font-medium text-primary">{selectedNotification.revenueImpact}</p>
                    </div>
                  )}
                </div>

                {/* Store ID if available */}
                {selectedNotification.storeId && (
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Store ID</span>
                    <p className="text-sm font-medium text-foreground">{selectedNotification.storeId}</p>
                  </div>
                )}

                {/* Details */}
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Details</p>
                  <p className="text-sm text-foreground leading-relaxed">{selectedNotification.details}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">Take Action</Button>
                  <Button size="sm" variant="outline" className="flex-1">Mark as Read</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
