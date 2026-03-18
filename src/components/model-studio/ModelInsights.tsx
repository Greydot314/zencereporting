import { ArrowLeft, Download, CheckCircle2, Sparkles, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, ZAxis, Cell, Legend } from "recharts";
import { rfmInsightsData, modelNameToInsightType, kmeansInsightsData, churnInsightsData, clvInsightsData, productInsightsData } from "@/data/modelStudioMockData";
import type { ModelInsightType } from "@/data/modelStudioMockData";
import { KMeansInsights } from "./insights/KMeansInsights";
import { ChurnInsights } from "./insights/ChurnInsights";
import { CLVInsights } from "./insights/CLVInsights";
import { ProductInsights } from "./insights/ProductInsights";

const segColors: Record<string, string> = {
  Champions: 'hsl(221, 83%, 53%)',
  Loyal: 'hsl(142, 76%, 36%)',
  'At-Risk': 'hsl(38, 92%, 50%)',
  Hibernating: 'hsl(220, 14%, 60%)',
  Lost: 'hsl(0, 84%, 60%)',
};

const segBg: Record<string, string> = {
  Champions: 'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40',
  Loyal: 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40',
  'At-Risk': 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40',
  Hibernating: 'bg-gray-500/5 border-gray-500/20 hover:border-gray-500/40',
  Lost: 'bg-red-500/5 border-red-500/20 hover:border-red-500/40',
};

interface ModelInsightsProps {
  onBack: () => void;
  modelName?: string;
}

const insightMeta: Record<ModelInsightType, { title: string; date: string; source: string; customers: string }> = {
  rfm: { title: 'RFM Segmentation — Brand A Q1 2025', date: 'Mar 12, 2025', source: 'Atlantis Retail DB', customers: '1,24,560' },
  kmeans: { title: kmeansInsightsData.meta.name, date: kmeansInsightsData.meta.runDate, source: kmeansInsightsData.meta.dataSource, customers: kmeansInsightsData.meta.customers },
  churn: { title: churnInsightsData.meta.name, date: churnInsightsData.meta.runDate, source: churnInsightsData.meta.dataSource, customers: churnInsightsData.meta.customers },
  clv: { title: clvInsightsData.meta.name, date: clvInsightsData.meta.runDate, source: clvInsightsData.meta.dataSource, customers: clvInsightsData.meta.customers },
  product: { title: productInsightsData.meta.name, date: productInsightsData.meta.runDate, source: productInsightsData.meta.dataSource, customers: productInsightsData.meta.customers },
};

export const ModelInsights = ({ onBack, modelName }: ModelInsightsProps) => {
  const insightType: ModelInsightType = (modelName && modelNameToInsightType[modelName]) || 'rfm';
  const meta = insightMeta[insightType];

  return (
    <div className="space-y-8">
      {/* Top Summary */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9 mt-0.5 rounded-xl"><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{meta.title}</h2>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">{meta.date}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{meta.source}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs font-medium text-foreground">{meta.customers} customers</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] gap-1 font-medium">
                <CheckCircle2 className="h-3 w-3" /> Completed
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs shadow-sm"><Download className="h-3.5 w-3.5" />Export</Button>
      </div>

      {/* Model-specific content */}
      {insightType === 'kmeans' && <KMeansInsights />}
      {insightType === 'churn' && <ChurnInsights />}
      {insightType === 'clv' && <CLVInsights />}
      {insightType === 'product' && <ProductInsights />}
      {insightType === 'rfm' && <RFMInsightsContent />}
    </div>
  );
};

/** RFM-specific content extracted from the original monolith */
const RFMInsightsContent = () => {
  const { segments, overlapData, scatterData } = rfmInsightsData;
  const barData = segments.map(s => ({ name: s.name, pct: s.pct, count: s.count.toLocaleString() }));

  return (
    <>
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {segments.map(seg => (
          <div key={seg.name} className="rounded-xl border border-border bg-card p-3 text-center space-y-1">
            <span className="text-lg">{seg.emoji}</span>
            <p className="text-[11px] font-medium text-muted-foreground">{seg.name}</p>
            <p className="text-xl font-bold text-foreground">{seg.pct}%</p>
            <p className="text-[10px] text-muted-foreground">{seg.count.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Segment Overview Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Segment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} layout="vertical" margin={{ left: 90 }}>
              <XAxis type="number" domain={[0, 35]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 500 }} width={85} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={28}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={segColors[entry.name] || 'hsl(220, 14%, 70%)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Deep-Dive Cards */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Segment Deep-Dive</h3>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
          {segments.map(seg => (
            <Card key={seg.name} className={`min-w-[240px] flex-shrink-0 transition-all duration-200 ${segBg[seg.name]}`}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{seg.emoji}</span>
                    <h4 className="text-sm font-semibold text-foreground">{seg.name}</h4>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-medium">{seg.action}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {seg.count.toLocaleString()} customers <span className="text-foreground font-semibold">({seg.pct}%)</span>
                </p>
                <div className="space-y-2">
                  {[{ label: 'Avg Recency', value: `${seg.avgRecency} days`, pct: Math.min(100, seg.avgRecency / 2.4) },
                    { label: 'Avg Frequency', value: `${seg.avgFrequency}/yr`, pct: Math.min(100, seg.avgFrequency * 5.5) },
                    { label: 'Avg Monetary', value: `₹${seg.avgMonetary.toLocaleString()}`, pct: Math.min(100, seg.avgMonetary / 125) }].map(m => (
                    <div key={m.label} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{m.label}</span>
                        <span className="text-[11px] font-semibold">{m.value}</span>
                      </div>
                      <Progress value={m.pct} className="h-1" />
                    </div>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs h-8 mt-1 gap-1.5">
                  <Megaphone className="h-3 w-3" />Create Campaign
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Scatter Plot */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">RFM Score Distribution</CardTitle>
          <p className="text-[11px] text-muted-foreground">Recency vs Frequency, sized by Monetary value</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 25, left: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis type="number" dataKey="recency" name="Recency (days)" tick={{ fontSize: 10 }}
                label={{ value: 'Recency (days)', position: 'bottom', fontSize: 11, offset: 10 }} axisLine={false} />
              <YAxis type="number" dataKey="frequency" name="Frequency" tick={{ fontSize: 10 }}
                label={{ value: 'Frequency', angle: -90, position: 'insideLeft', fontSize: 11 }} axisLine={false} />
              <ZAxis type="number" dataKey="monetary" range={[30, 250]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 11 }} />
              <Legend verticalAlign="top" height={35} iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              {Object.keys(segColors).map(seg => (
                <Scatter key={seg} name={seg} data={scatterData.filter(d => d.segment === seg)} fill={segColors[seg]} opacity={0.75} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Overlap Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Overlap with Existing Segments</CardTitle>
          <p className="text-[11px] text-muted-foreground">How AI segments map to your current rule-based segments</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">AI Segment</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5">Rule-Based Match</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5 text-center">Overlap</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider py-2.5 text-right">New Customers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overlapData.map(r => (
                  <TableRow key={r.aiSegment} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="text-sm font-medium py-3">{r.aiSegment}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.ruleSegment}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Progress value={r.overlap} className="h-1.5 w-16" />
                        <span className="text-xs font-mono font-medium">{r.overlap}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="text-[11px] font-mono bg-emerald-500/5 text-emerald-600 border-emerald-500/20">
                        +{r.newFound.toLocaleString()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* AI Narrative */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">AI Summary</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Champions represent only <span className="font-semibold text-foreground">12%</span> of your base but contribute an estimated <span className="font-semibold text-foreground">41% of revenue</span>. 
            The At-Risk segment has grown <span className="font-semibold text-amber-600">8% compared to last quarter</span> — consider triggering a win-back 
            campaign targeting customers with 60–90 day inactivity. Hibernating customers show seasonal 
            patterns with spikes in November.
          </p>
        </CardContent>
      </Card>
    </>
  );
};
