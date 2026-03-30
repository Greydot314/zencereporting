import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Code2, Database } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from "recharts";
import { customSQLInsightsData } from "@/data/modelStudioMockData";

const { segments, queryStats, featureImportance, segmentTrend, aiSummary } = customSQLInsightsData;

const segColors = [
  'hsl(221, 83%, 53%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)',
  'hsl(280, 67%, 55%)', 'hsl(0, 84%, 60%)', 'hsl(190, 80%, 45%)',
];

export const CustomSQLInsights = () => {
  const pieData = segments.map((s, i) => ({ name: s.name, value: s.pct, color: segColors[i % segColors.length] }));

  return (
    <div className="space-y-8">
      {/* Query Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {queryStats.map(stat => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
            <p className="text-[11px] font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* SQL Query Preview */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Code2 className="h-4 w-4 text-muted-foreground" />
            SQL Query Used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/50 border border-border p-4 font-mono text-xs text-muted-foreground leading-relaxed overflow-x-auto">
            <pre>{`SELECT customer_id,
  CASE 
    WHEN total_spend > 50000 AND visit_freq > 12 THEN 'Power Buyers'
    WHEN last_txn_days < 30 AND avg_basket > 2000 THEN 'Active Enthusiasts'
    WHEN category_diversity > 5 THEN 'Cross-Category Explorers'
    WHEN promo_response_rate > 0.6 THEN 'Deal Seekers'
    WHEN last_txn_days > 180 THEN 'Lapsed Customers'
    ELSE 'Casual Browsers'
  END AS segment,
  -- AI layer enriches with propensity scores
  ai_enrich(customer_id, 'upgrade_propensity') AS upgrade_score
FROM customer_360
WHERE active_flag = 1;`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Segment Distribution + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Segment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={segments} layout="vertical" margin={{ left: 110 }}>
                <XAxis type="number" domain={[0, 35]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 500 }} width={105} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={24}>
                  {segments.map((_, i) => (
                    <Cell key={i} fill={segColors[i % segColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={95} innerRadius={55} dataKey="value" nameKey="name" paddingAngle={2}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Feature Importance */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            AI-Enhanced Feature Importance
          </CardTitle>
          <p className="text-[11px] text-muted-foreground">How much each feature contributed to the AI enrichment layer</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {featureImportance.map(f => (
              <div key={f.feature} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{f.feature}</span>
                  <span className="text-xs font-mono text-muted-foreground">{f.importance}%</span>
                </div>
                <Progress value={f.importance} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Segment Trend */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Segment Size Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={segmentTrend} margin={{ top: 10, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              {segments.map((s, i) => (
                <Line key={s.name} type="monotone" dataKey={s.name} stroke={segColors[i % segColors.length]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Segment Cards */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Segment Deep-Dive</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map((seg, i) => (
            <Card key={seg.name} className="border border-border hover:border-primary/30 transition-all">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: segColors[i % segColors.length] }} />
                  <h4 className="text-sm font-semibold text-foreground">{seg.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{seg.count.toLocaleString()} customers ({seg.pct}%)</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Avg Spend</span>
                    <span className="font-semibold">₹{seg.avgSpend.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Upgrade Score</span>
                    <span className="font-semibold">{seg.upgradeScore}%</span>
                  </div>
                  <Progress value={seg.upgradeScore} className="h-1" />
                </div>
                <Badge variant="outline" className="text-[10px]">{seg.action}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">AI Summary</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{aiSummary}</p>
        </CardContent>
      </Card>
    </div>
  );
};
