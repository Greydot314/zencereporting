import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { clvInsightsData } from "@/data/modelStudioMockData";

const { tiers, clvDistribution, migrationMatrix, aiSummary } = clvInsightsData;

export const CLVInsights = () => {
  const tierBarData = tiers.map(t => ({ name: t.name, pct: t.pct }));

  return (
    <div className="space-y-8">
      {/* Tier KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tiers.map(t => (
          <div key={t.name} className="rounded-xl border border-border bg-card p-4 text-center space-y-1.5">
            <span className="text-2xl">{t.emoji}</span>
            <p className="text-[11px] font-medium text-muted-foreground">{t.name}</p>
            <p className="text-xl font-bold text-foreground">{t.pct}%</p>
            <p className="text-[10px] text-muted-foreground">{t.count.toLocaleString()} customers</p>
            <p className="text-xs font-semibold" style={{ color: t.color }}>Avg CLV: ₹{t.avgCLV.toLocaleString()}</p>
            <Badge variant="outline" className="text-[10px]">{t.predictedRevenue} predicted</Badge>
          </div>
        ))}
      </div>

      {/* Tier Distribution */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Value Tier Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tierBarData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]} barSize={56}>
                {tierBarData.map((_, i) => <Cell key={i} fill={tiers[i].color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* CLV Histogram */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">CLV Distribution Histogram</CardTitle>
          <p className="text-[11px] text-muted-foreground">Number of customers by predicted lifetime value range</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={clvDistribution} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="range" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Bar dataKey="count" fill="hsl(262, 83%, 58%)" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Migration Matrix */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Tier Migration Forecast</CardTitle>
          <p className="text-[11px] text-muted-foreground">Predicted tier movement over the next 6 months</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">From Tier</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">To Tier</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">Direction</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5 text-right">Probability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {migrationMatrix.map((m, i) => {
                  const tierOrder = ['Bronze', 'Silver', 'Gold', 'Platinum'];
                  const isUpward = tierOrder.indexOf(m.to) > tierOrder.indexOf(m.from);
                  return (
                    <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="text-sm font-medium">{m.from}</TableCell>
                      <TableCell className="text-sm font-medium">{m.to}</TableCell>
                      <TableCell>
                        {isUpward ? (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] gap-1">
                            <TrendingUp className="h-3 w-3" /> Upgrade
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] gap-1">
                            <TrendingDown className="h-3 w-3" /> Downgrade
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={m.probability} className="h-1.5 w-16" />
                          <span className="text-xs font-mono font-medium">{m.probability}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
