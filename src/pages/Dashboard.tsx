import { Settings, FileText, TrendingUp, Shield, Lightbulb, Bell, UserCheck, Users, ArrowUpRight, ArrowDownRight, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const modules = [
  {
    name: "Atlas Prime",
    path: "/module/atlas-prime",
    icon: Settings,
    badge: "PRIME",
    status: "active",
    kpi: { label: "Revenue", value: "₹12.4L", trend: "+8.2%", positive: true },
  },
  {
    name: "Atlas Neo",
    path: "/module/atlas-neo",
    icon: Settings,
    badge: "NEO",
    status: "coming",
    kpi: { label: "Soon", value: "Q2 2024", trend: "", positive: true },
  },
  {
    name: "Clickrev",
    path: "/module/clickrev",
    icon: FileText,
    status: "active",
    kpi: { label: "Rating", value: "4.2⭐", trend: "+0.3", positive: true },
  },
  {
    name: "Segcon",
    path: "/module/segcon",
    icon: TrendingUp,
    status: "active",
    kpi: { label: "Segments", value: "24", trend: "+3", positive: true },
  },
  {
    name: "KPI Alerts",
    path: "/module/kpi-alerts",
    icon: Bell,
    status: "active",
    kpi: { label: "Alerts", value: "7", trend: "+2", positive: false },
  },
  {
    name: "Behavioural",
    path: "/module/behavioural-analytics",
    icon: UserCheck,
    status: "active",
    kpi: { label: "Conversion", value: "3.4%", trend: "-0.2%", positive: false },
  },
  {
    name: "Insights",
    path: "/module/insights",
    icon: Lightbulb,
    status: "active",
    kpi: { label: "New", value: "12", trend: "+5", positive: true },
  },
  {
    name: "Fraud",
    path: "/module/fraud",
    icon: Shield,
    status: "active",
    kpi: { label: "Risk Score", value: "High", trend: "+14%", positive: false },
  },
  {
    name: "Loyalty",
    path: "/module/loyalty-extension",
    icon: Users,
    status: "coming",
    kpi: { label: "Soon", value: "Q3 2024", trend: "", positive: true },
  },
];

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 overflow-auto">
      {/* AI Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background border-primary/20 hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-1">Business Health</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">Good</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    +2.1%
                  </Badge>
                </div>
              </div>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">
              Revenue up 8.2% • Visits stable • 3 moderate alerts detected
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <h3 className="font-semibold text-xs text-muted-foreground mb-2">Yesterday</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground">Revenue</span>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">+8.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground">Visits</span>
                <div className="flex items-center gap-1">
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                  <span className="text-xs font-semibold text-red-600">-3.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-border/50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <h3 className="font-semibold text-xs text-muted-foreground mb-2">Last 7 Days</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground">Avg Revenue</span>
                <span className="text-xs font-semibold text-foreground">₹11.8L</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground">Anomalies</span>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-500">4</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Module Launcher */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Modules</h2>
            <p className="text-xs text-muted-foreground">Quick access to all analytics modules</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {modules.map((module) => {
            const Icon = module.icon;
            const isDisabled = module.status === "coming";

            const content = (
              <Card
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:-translate-y-1 hover:border-primary/30"
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  {module.badge && (
                    <Badge
                      className={`absolute top-2 right-2 text-[9px] px-1.5 py-0.5 ${
                        module.badge === "PRIME"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-secondary/20 text-secondary-foreground border-secondary/30"
                      }`}
                    >
                      {module.badge}
                    </Badge>
                  )}

                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-sm text-center text-foreground truncate">
                      {module.name}
                    </h3>

                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground">{module.kpi.label}</p>
                      <div className="flex items-center justify-center gap-1 mt-0.5">
                        <span className="text-xs font-bold text-foreground">{module.kpi.value}</span>
                        {module.kpi.trend && (
                          <span
                            className={`text-[10px] font-semibold ${
                              module.kpi.positive ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {module.kpi.trend}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );

            return isDisabled ? (
              <div key={module.name}>{content}</div>
            ) : (
              <Link key={module.name} to={module.path}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Live Tiles */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Live Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Card className="bg-gradient-to-br from-green-500/10 to-background border-green-500/20">
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground mb-1">Revenue Today</p>
              <p className="text-lg font-bold text-foreground">₹12.4L</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+8.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-background border-blue-500/20">
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground mb-1">Transactions</p>
              <p className="text-lg font-bold text-foreground">2,847</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="h-3 w-3 text-red-600" />
                <span className="text-xs text-red-600">-3.1%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-background border-yellow-500/20">
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground mb-1">New Reviews</p>
              <p className="text-lg font-bold text-foreground">47</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+12</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-background border-red-500/20">
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground mb-1">Fraud Alerts</p>
              <p className="text-lg font-bold text-foreground">3</p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-orange-500" />
                <span className="text-xs text-orange-500">Active</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-background border-purple-500/20">
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground mb-1">Behaviour</p>
              <p className="text-lg font-bold text-foreground">3.4%</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="h-3 w-3 text-red-600" />
                <span className="text-xs text-red-600">-0.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20">
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground mb-1">Segments</p>
              <p className="text-lg font-bold text-foreground">24</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
