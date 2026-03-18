import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Sparkles, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LineChart, Line } from "recharts";
import { churnInsightsData } from "@/data/modelStudioMockData";

const { riskBuckets, featureImportance, monthlyTrend, topRiskCustomers, aiSummary } = churnInsightsData;

export const ChurnInsights = () => {
  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {riskBuckets.map(b => (
          <div key={b.range} className="rounded-xl border border-border bg-card p-3 text-center space-y-1">
            <div className="w-3 h-3 rounded-full mx-auto" style={{ background: b.color }} />
            <p className="text-[11px] font-medium text-muted-foreground">{b.label} ({b.range})</p>
            <p className="text-xl font-bold text-foreground">{b.pct}%</p>
            <p className="text-[10px] text-muted-foreground">{b.count.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Risk Distribution Histogram */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Churn Risk Distribution</CardTitle>
          <p className="text-[11px] text-muted-foreground">Customer count by risk score bucket</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={riskBuckets} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Risk Score Range', position: 'bottom', fontSize: 11, offset: -2 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={48}>
                {riskBuckets.map((b, i) => <Cell key={i} fill={b.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feature Importance */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Feature Importance</CardTitle>
          <p className="text-[11px] text-muted-foreground">Top predictors of churn — higher = more influence</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={featureImportance} layout="vertical" margin={{ left: 160 }}>
              <XAxis type="number" domain={[0, 0.35]} tickFormatter={v => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="feature" tick={{ fontSize: 11 }} width={155} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Bar dataKey="importance" fill="hsl(0, 84%, 60%)" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Churn Trend */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Monthly Churn Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrend} margin={{ top: 10, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[2, 7]} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Line type="monotone" dataKey="churnRate" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Risk Customers */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <CardTitle className="text-sm font-semibold">Highest Risk Customers</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">Customer</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5 text-center">Risk Score</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">Last Purchase</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5 text-right">LTV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRiskCustomers.map(c => (
                  <TableRow key={c.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{c.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-[11px] font-mono font-bold">
                        {c.score}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{c.lastPurchase}</TableCell>
                    <TableCell className="text-right text-xs font-semibold">{c.ltv}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
