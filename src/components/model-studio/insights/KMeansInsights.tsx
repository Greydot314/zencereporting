import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, Cell, Legend, LineChart, Line } from "recharts";
import { kmeansInsightsData } from "@/data/modelStudioMockData";

const { clusters, silhouetteScores, pca, aiSummary } = kmeansInsightsData;

export const KMeansInsights = () => {
  const barData = clusters.map(c => ({ name: c.name, pct: c.pct, count: c.count }));
  const clusterColors = Object.fromEntries(clusters.map(c => [c.name, c.color]));

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {clusters.map(c => (
          <div key={c.id} className="rounded-xl border border-border bg-card p-3 text-center space-y-1">
            <div className="w-3 h-3 rounded-full mx-auto" style={{ background: c.color }} />
            <p className="text-[11px] font-medium text-muted-foreground truncate">{c.name}</p>
            <p className="text-xl font-bold text-foreground">{c.pct}%</p>
            <p className="text-[10px] text-muted-foreground">{c.count.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Cluster Distribution */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Cluster Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} layout="vertical" margin={{ left: 120 }}>
              <XAxis type="number" domain={[0, 30]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 500 }} width={115} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={24}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={clusterColors[entry.name] || 'hsl(220,14%,70%)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cluster Deep-Dive */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Cluster Profiles</h3>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
          {clusters.map(c => (
            <Card key={c.id} className="min-w-[230px] flex-shrink-0 transition-all duration-200 hover:shadow-md" style={{ borderColor: `${c.color}33` }}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                  <h4 className="text-sm font-semibold text-foreground">{c.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{c.count.toLocaleString()} customers <span className="text-foreground font-semibold">({c.pct}%)</span></p>
                <div className="space-y-2">
                  {[
                    { label: 'Avg Spend', value: `₹${c.avgSpend.toLocaleString()}`, pct: Math.min(100, c.avgSpend / 92) },
                    { label: 'Avg Frequency', value: `${c.avgFreq}/yr`, pct: Math.min(100, c.avgFreq * 7) },
                    { label: 'Avg Recency', value: `${c.avgRecency} days`, pct: Math.min(100, c.avgRecency / 1.8) },
                  ].map(m => (
                    <div key={m.label} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{m.label}</span>
                        <span className="text-[11px] font-semibold">{m.value}</span>
                      </div>
                      <Progress value={m.pct} className="h-1" />
                    </div>
                  ))}
                </div>
                <Badge variant="outline" className="text-[10px]">Top: {c.topCategory}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Silhouette Score */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Optimal K — Silhouette Analysis</CardTitle>
          <p className="text-[11px] text-muted-foreground">Higher score = better defined clusters. K=6 is optimal.</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={silhouetteScores} margin={{ top: 10, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis dataKey="k" tick={{ fontSize: 11 }} label={{ value: 'Number of Clusters (K)', position: 'bottom', fontSize: 11, offset: -2 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} domain={[0.3, 0.8]} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="hsl(221, 83%, 53%)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(221, 83%, 53%)' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* PCA Scatter */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">PCA — Cluster Visualization</CardTitle>
          <p className="text-[11px] text-muted-foreground">2D projection of customer features colored by cluster assignment</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 25, left: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis type="number" dataKey="x" name="PC1" tick={{ fontSize: 10 }} label={{ value: 'Principal Component 1', position: 'bottom', fontSize: 11, offset: 10 }} axisLine={false} />
              <YAxis type="number" dataKey="y" name="PC2" tick={{ fontSize: 10 }} label={{ value: 'PC 2', angle: -90, position: 'insideLeft', fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 11 }} />
              <Legend verticalAlign="top" height={35} iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              {clusters.map(c => (
                <Scatter key={c.name} name={c.name} data={pca.filter(d => d.cluster === c.name)} fill={c.color} opacity={0.7} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
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
