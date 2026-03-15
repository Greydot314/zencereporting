import { ArrowLeft, Download, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, ZAxis, Cell, Legend } from "recharts";
import { rfmInsightsData } from "@/data/modelStudioMockData";

const segColors: Record<string, string> = {
  Champions: 'hsl(221, 83%, 53%)',
  Loyal: 'hsl(221, 83%, 63%)',
  'At-Risk': 'hsl(38, 92%, 50%)',
  Hibernating: 'hsl(220, 14%, 70%)',
  Lost: 'hsl(0, 84%, 60%)',
};

interface ModelInsightsProps {
  onBack: () => void;
}

export const ModelInsights = ({ onBack }: ModelInsightsProps) => {
  const { segments, overlapData, scatterData } = rfmInsightsData;

  const barData = segments.map(s => ({ name: s.name, pct: s.pct, count: s.count.toLocaleString() }));

  return (
    <div className="space-y-6">
      {/* Top Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">RFM Segmentation — Brand A Q1 2025</h2>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-muted-foreground">Run: Mar 12, 2025</span>
              <span className="text-xs text-muted-foreground">Source: Atlantis Retail DB</span>
              <span className="text-xs text-muted-foreground">1,24,560 customers</span>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] gap-1">
                <CheckCircle2 className="h-3 w-3" /> Completed
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Download className="h-3.5 w-3.5" />Export</Button>
      </div>

      {/* Section 1: Segment Overview */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Segment Overview</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" domain={[0, 35]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={segColors[entry.name] || 'hsl(220, 14%, 70%)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section 2: Segment Deep-Dive */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Segment Deep-Dive</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {segments.map(seg => (
            <Card key={seg.name} className="min-w-[220px] flex-shrink-0 border-border/60">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{seg.emoji}</span>
                  <h4 className="text-sm font-semibold">{seg.name}</h4>
                </div>
                <div className="text-xs text-muted-foreground">
                  {seg.count.toLocaleString()} customers ({seg.pct}%)
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div><p className="text-muted-foreground">Recency</p><p className="font-semibold">{seg.avgRecency}d</p></div>
                  <div><p className="text-muted-foreground">Frequency</p><p className="font-semibold">{seg.avgFrequency}/yr</p></div>
                  <div><p className="text-muted-foreground">Monetary</p><p className="font-semibold">₹{seg.avgMonetary.toLocaleString()}</p></div>
                </div>
                <Badge variant="outline" className="text-[10px]">{seg.action}</Badge>
                <Button size="sm" variant="outline" className="w-full text-xs h-7 mt-1">Create Campaign</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 3: Scatter Plot */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">RFM Score Distribution</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" dataKey="recency" name="Recency (days)" tick={{ fontSize: 10 }} label={{ value: 'Recency (days)', position: 'bottom', fontSize: 11 }} />
              <YAxis type="number" dataKey="frequency" name="Frequency" tick={{ fontSize: 10 }} label={{ value: 'Frequency', angle: -90, position: 'insideLeft', fontSize: 11 }} />
              <ZAxis type="number" dataKey="monetary" range={[20, 200]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend verticalAlign="top" height={30} iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              {Object.keys(segColors).map(seg => (
                <Scatter key={seg} name={seg} data={scatterData.filter(d => d.segment === seg)} fill={segColors[seg]} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section 4: Overlap */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Overlap with Existing Segments</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-xs">AI Segment</TableHead>
                <TableHead className="text-xs">Closest Rule-Based Segment</TableHead>
                <TableHead className="text-xs text-center">Overlap %</TableHead>
                <TableHead className="text-xs text-right">New Customers Found</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overlapData.map(r => (
                <TableRow key={r.aiSegment}>
                  <TableCell className="text-sm font-medium">{r.aiSegment}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r.ruleSegment}</TableCell>
                  <TableCell className="text-xs text-center">{r.overlap}%</TableCell>
                  <TableCell className="text-xs text-right font-medium">{r.newFound.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Section 5: AI Narrative */}
      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">AI Summary</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Champions represent only 12% of your base but contribute an estimated 41% of revenue. 
            The At-Risk segment has grown 8% compared to last quarter — consider triggering a win-back 
            campaign targeting customers with 60–90 day inactivity. Hibernating customers show seasonal 
            patterns with spikes in November.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
