import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

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
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
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
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-accent/30 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">AI Insight</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Revenue is 6% below target. Tier 2 stores showing consistent decline. 
                  <Link to="/ai-chat" className="text-primary hover:underline ml-1">Analyze →</Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Revenue Trend</CardTitle>
                <span className="text-xs text-muted-foreground">Last 7 days</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(220, 10%, 46%)', fontSize: 11 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(220, 10%, 46%)', fontSize: 11 }}
                      tickFormatter={(v) => `₹${v/1000}K`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)', 
                        border: '1px solid hsl(220, 13%, 91%)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: number) => [`₹${(value/1000).toFixed(1)}K`, 'Revenue']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(199, 89%, 48%)" 
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Recent Alerts</CardTitle>
                <Link to="/ai-insights" className="text-xs text-primary hover:underline">View all</Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <AlertCircle className={`h-4 w-4 flex-shrink-0 ${
                    alert.severity === 'error' ? 'text-destructive' : 
                    alert.severity === 'warning' ? 'text-amber-500' : 'text-primary'
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Category Performance</CardTitle>
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
                      tick={{ fill: 'hsl(220, 10%, 46%)', fontSize: 11 }}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(0, 0%, 100%)', 
                        border: '1px solid hsl(220, 13%, 91%)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Share']}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(199, 89%, 48%)" 
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Performance Summary</CardTitle>
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
    <Card className="hover:shadow-card-hover transition-shadow">
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs ${
              isAlert ? 'text-amber-500' : positive ? 'text-emerald-600' : 'text-destructive'
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
                  className={`w-1.5 rounded-full ${positive ? 'bg-emerald-500/60' : 'bg-destructive/60'}`}
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
        status === 'success' ? 'text-emerald-600' : 
        status === 'warning' ? 'text-amber-500' : 'text-destructive'
      }`}>{value}</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all ${
          status === 'success' ? 'bg-emerald-500' : 
          status === 'warning' ? 'bg-amber-500' : 'bg-destructive'
        }`}
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default Dashboard;
