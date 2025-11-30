import { ArrowUpRight, ArrowDownRight, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const revenueData = [
  { day: "Mon", value: 42000 },
  { day: "Tue", value: 48000 },
  { day: "Wed", value: 45000 },
  { day: "Thu", value: 52000 },
  { day: "Fri", value: 49000 },
  { day: "Sat", value: 44000 },
  { day: "Sun", value: 41000 },
];

const categoryData = [
  { name: "Sarees", value: 34 },
  { name: "Blouses", value: 22 },
  { name: "Traditional", value: 17 },
  { name: "Designer", value: 15 },
  { name: "Other", value: 12 },
];

const alerts = [
  { id: 1, title: "Revenue below target", module: "Atlas", severity: "warning" },
  { id: 2, title: "Fraud spike detected", module: "Fraud", severity: "error" },
  { id: 3, title: "New segment identified", module: "Segcon", severity: "info" },
];

const Dashboard = () => {
  const chartColor = "hsl(199, 89%, 55%)";
  const mutedColor = "hsl(215, 20%, 45%)";

  return (
    <main className="flex-1 p-6 pt-20 overflow-auto bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Good afternoon</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Here's your business overview</p>
          </div>
          <Link to="/ai-chat">
            <Button size="sm" className="gap-2 gradient-primary hover:opacity-90 ai-glow">
              <Sparkles className="h-3.5 w-3.5" />
              Ask AI
            </Button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            label="Revenue Today"
            value="₹12.4L"
            change="+8.2%"
            positive={true}
            sparkData={[40, 45, 42, 48, 52, 49, 55]}
          />
          <MetricCard 
            label="Store Visits"
            value="2,847"
            change="-3.1%"
            positive={false}
            sparkData={[50, 48, 45, 47, 44, 42, 40]}
          />
          <MetricCard 
            label="Conversion"
            value="3.4%"
            change="+0.2%"
            positive={true}
            sparkData={[30, 32, 31, 33, 34, 33, 35]}
          />
          <MetricCard 
            label="Active Alerts"
            value="7"
            change="+2"
            positive={false}
            isAlert
          />
        </div>

        {/* AI Insight Banner */}
        <Card className="glass border-primary/20 ai-glow">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl gradient-primary flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary">AI Insight</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Revenue is 6% below target. Tier 2 stores showing consistent decline. 
                  <Link to="/ai-chat" className="text-primary hover:underline ml-1 font-medium">Analyze →</Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 glass border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-foreground">Revenue Trend</CardTitle>
                <span className="text-xs text-muted-foreground">Last 7 days</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: mutedColor, fontSize: 11 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: mutedColor, fontSize: 11 }}
                      tickFormatter={(v) => `₹${v/1000}K`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(222, 47%, 10%)', 
                        border: '1px solid hsl(222, 47%, 20%)',
                        borderRadius: '8px',
                        color: 'hsl(210, 40%, 98%)'
                      }}
                      formatter={(value: number) => [`₹${(value/1000).toFixed(1)}K`, 'Revenue']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={chartColor} 
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      style={{ filter: 'drop-shadow(0 0 8px hsl(199, 89%, 55%, 0.3))' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-foreground">Recent Alerts</CardTitle>
                <Link to="/ai-insights" className="text-xs text-primary hover:underline">View all</Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer border border-border/30"
                >
                  <AlertCircle className={`h-4 w-4 flex-shrink-0 ${
                    alert.severity === 'error' ? 'text-destructive' : 
                    alert.severity === 'warning' ? 'text-amber-400' : 'text-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.module}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-foreground">Category Performance</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: mutedColor, fontSize: 11 }}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(222, 47%, 10%)', 
                        border: '1px solid hsl(222, 47%, 20%)',
                        borderRadius: '8px',
                        color: 'hsl(210, 40%, 98%)'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                    <Bar 
                      dataKey="value" 
                      fill={chartColor} 
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                      style={{ filter: 'drop-shadow(0 0 8px hsl(199, 89%, 55%, 0.3))' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-foreground">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <StatRow label="Business Health" value="Good" status="success" percent={78} />
              <StatRow label="Customer Satisfaction" value="4.2★" status="success" percent={84} />
              <StatRow label="Fraud Risk" value="Medium" status="warning" percent={45} />
              <StatRow label="Inventory" value="Optimal" status="success" percent={92} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

// Metric Card Component
const MetricCard = ({ 
  label, 
  value, 
  change, 
  positive, 
  sparkData,
  isAlert 
}: { 
  label: string; 
  value: string; 
  change: string; 
  positive: boolean;
  sparkData?: number[];
  isAlert?: boolean;
}) => {
  const minVal = sparkData ? Math.min(...sparkData) : 0;
  const maxVal = sparkData ? Math.max(...sparkData) : 100;
  
  return (
    <Card className="glass border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs ${
              isAlert ? 'text-amber-400' : positive ? 'text-emerald-400' : 'text-destructive'
            }`}>
              {!isAlert && (positive ? 
                <ArrowUpRight className="h-3 w-3" /> : 
                <ArrowDownRight className="h-3 w-3" />
              )}
              <span>{change}</span>
            </div>
          </div>
          {sparkData && (
            <div className="flex items-end gap-0.5 h-8">
              {sparkData.map((val, i) => (
                <div 
                  key={i}
                  className={`w-1.5 rounded-full ${positive ? 'bg-emerald-400/60' : 'bg-destructive/60'}`}
                  style={{ height: `${((val - minVal) / (maxVal - minVal)) * 100}%`, minHeight: '4px' }}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Stat Row Component
const StatRow = ({ 
  label, 
  value, 
  status, 
  percent 
}: { 
  label: string; 
  value: string; 
  status: 'success' | 'warning' | 'error';
  percent: number;
}) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-xs font-medium ${
        status === 'success' ? 'text-emerald-400' : 
        status === 'warning' ? 'text-amber-400' : 'text-destructive'
      }`}>{value}</span>
    </div>
    <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all ${
          status === 'success' ? 'bg-emerald-400' : 
          status === 'warning' ? 'bg-amber-400' : 'bg-destructive'
        }`}
        style={{ 
          width: `${percent}%`,
          boxShadow: status === 'success' ? '0 0 8px hsl(160, 84%, 55%, 0.5)' : 
                     status === 'warning' ? '0 0 8px hsl(38, 92%, 60%, 0.5)' : 
                     '0 0 8px hsl(0, 84%, 60%, 0.5)'
        }}
      />
    </div>
  </div>
);

export default Dashboard;
