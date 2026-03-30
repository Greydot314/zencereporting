import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Zap, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, Legend } from "recharts";
import { autoSegmentInsightsData } from "@/data/modelStudioMockData";

const { segments, modelMetrics, featureContributions, segmentRadar, aiSummary } = autoSegmentInsightsData;

const segColors = [
  'hsl(221, 83%, 53%)', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)',
  'hsl(280, 67%, 55%)', 'hsl(0, 84%, 60%)', 'hsl(190, 80%, 45%)',
  'hsl(340, 75%, 55%)',
];

export const AutoSegmentInsights = () => {
  const treemapData = segments.map((s, i) => ({
    name: s.name,
    size: s.count,
    pct: s.pct,
    fill: segColors[i % segColors.length],
  }));

  return (
    <div className="space-y-8">
      {/* Model Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {modelMetrics.map(m => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-4 text-center space-y-1">
            <p className="text-[11px] font-medium text-muted-foreground">{m.label}</p>
            <p className="text-xl font-bold text-foreground">{m.value}</p>
            {m.change && (
              <p className={`text-[10px] font-medium ${m.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {m.change} vs last run
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Auto-Detection Banner */}
      <Card className="border-amber-500/20 bg-amber-500/5 shadow-sm">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 shrink-0 mt-0.5">
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Auto-Detection Summary</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The AI engine analyzed <span className="font-semibold text-foreground">47 features</span> across transactional, behavioral, and demographic data. 
              It automatically selected <span className="font-semibold text-foreground">7 optimal segments</span> using silhouette analysis and elbow method. 
              Feature selection reduced dimensionality by <span className="font-semibold text-foreground">68%</span> while retaining 94% of variance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Treemap + Segment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Segment Size Map</CardTitle>
            <p className="text-[11px] text-muted-foreground">Area proportional to segment size</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <Treemap
                data={treemapData}
                dataKey="size"
                nameKey="name"
                aspectRatio={4 / 3}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                content={({ x, y, width, height, name, pct, fill }: any) => {
                  if (width < 40 || height < 30) return null;
                  return (
                    <g>
                      <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} opacity={0.85} />
                      <text x={x + width / 2} y={y + height / 2 - 6} textAnchor="middle" fill="white" fontSize={11} fontWeight={600}>{name}</text>
                      <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="white" fontSize={10} opacity={0.8}>{pct}%</text>
                    </g>
                  );
                }}
              />
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Segment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={segments} layout="vertical" margin={{ left: 120 }}>
                <XAxis type="number" domain={[0, 25]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 500 }} width={115} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} barSize={22}>
                  {segments.map((_, i) => (
                    <Cell key={i} fill={segColors[i % segColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feature Contributions */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Auto-Selected Feature Contributions
          </CardTitle>
          <p className="text-[11px] text-muted-foreground">Top features automatically identified by the AI engine</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {featureContributions.map(f => (
              <div key={f.feature} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{f.feature}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0">{f.type}</Badge>
                    <span className="text-xs font-mono text-muted-foreground">{f.importance}%</span>
                  </div>
                </div>
                <Progress value={f.importance} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Segment Behavioral Profiles</CardTitle>
          <p className="text-[11px] text-muted-foreground">Normalized scores across key dimensions</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={segmentRadar}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fontSize: 9 }} domain={[0, 100]} />
              {segments.slice(0, 4).map((s, i) => (
                <Radar key={s.name} name={s.name} dataKey={s.name} stroke={segColors[i]} fill={segColors[i]} fillOpacity={0.1} strokeWidth={2} />
              ))}
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Segment Cards */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Auto-Detected Segments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {segments.map((seg, i) => (
            <Card key={seg.name} className="border border-border hover:border-primary/30 transition-all">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: segColors[i % segColors.length] }} />
                  <h4 className="text-sm font-semibold text-foreground">{seg.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{seg.count.toLocaleString()} customers ({seg.pct}%)</p>
                <div className="space-y-1.5">
                  {seg.topTraits.map(t => (
                    <div key={t} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="text-[10px] text-muted-foreground">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-muted-foreground">Confidence</span>
                  <span className="text-xs font-semibold">{seg.confidence}%</span>
                </div>
                <Progress value={seg.confidence} className="h-1" />
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
