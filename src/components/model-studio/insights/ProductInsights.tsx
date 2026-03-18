import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ShoppingBag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { productInsightsData } from "@/data/modelStudioMockData";

const { topProducts, crossSellMatrix, categoryBreakdown, aiSummary } = productInsightsData;

export const ProductInsights = () => {
  const catData = categoryBreakdown.map(c => ({ name: c.category, score: Math.round(c.avgScore * 100), customers: c.customers }));

  return (
    <div className="space-y-8">
      {/* Top Product Cards */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-primary" /> Top Product Propensities
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
          {topProducts.map(p => (
            <Card key={p.product} className="min-w-[230px] flex-shrink-0 hover:shadow-md transition-all duration-200">
              <CardContent className="p-5 space-y-3">
                <h4 className="text-sm font-semibold text-foreground">{p.product}</h4>
                <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">Propensity Score</span>
                      <span className="text-[11px] font-bold text-primary">{(p.propensityScore * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={p.propensityScore * 100} className="h-1.5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Potential Buyers</span>
                    <span className="text-[11px] font-semibold">{p.potentialBuyers.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Avg Score */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Average Propensity by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={catData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} domain={[0, 100]} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Bar dataKey="score" fill="hsl(262, 83%, 58%)" radius={[6, 6, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cross-Sell Matrix */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Cross-Sell Affinity Matrix</CardTitle>
          <p className="text-[11px] text-muted-foreground">Products frequently purchased together — higher affinity = stronger pairing</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">Source Product</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">Recommended Pair</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5 text-right">Affinity Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crossSellMatrix.map(r => (
                  <TableRow key={r.source} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="text-sm font-medium">{r.source}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.target}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={r.affinity} className="h-1.5 w-16" />
                        <span className="text-xs font-mono font-medium">{r.affinity}%</span>
                      </div>
                    </TableCell>
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
