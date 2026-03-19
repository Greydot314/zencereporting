import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Users, ShoppingBag, Clock, MapPin } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
  PieChart, Pie, Legend,
} from "recharts";
import { hybridPersonaInsightsData } from "@/data/modelStudioMockData";

const { personas, demographics, behavioralPatterns, channelPreferences, aiSummary } = hybridPersonaInsightsData;

const personaColors = [
  "hsl(221, 83%, 53%)",
  "hsl(262, 83%, 58%)",
  "hsl(142, 76%, 36%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
];

const personaBg = [
  "bg-blue-500/5 border-blue-500/20",
  "bg-violet-500/5 border-violet-500/20",
  "bg-emerald-500/5 border-emerald-500/20",
  "bg-amber-500/5 border-amber-500/20",
  "bg-red-500/5 border-red-500/20",
];

export const HybridPersonaInsights = () => {
  return (
    <div className="space-y-8">
      {/* Persona Cards */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Identified Personas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((p, i) => (
            <Card key={p.name} className={`transition-all duration-200 ${personaBg[i % personaBg.length]}`}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{p.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{p.tagline}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-medium">{p.pct}%</Badge>
                </div>

                <p className="text-xs text-muted-foreground">
                  {p.count.toLocaleString()} customers
                </p>

                <div className="space-y-2">
                  {[
                    { label: "Avg Age", value: `${p.avgAge} yrs`, pct: (p.avgAge / 60) * 100 },
                    { label: "Avg Spend", value: `₹${p.avgSpend.toLocaleString()}/mo`, pct: Math.min(100, p.avgSpend / 150) },
                    { label: "Engagement", value: `${p.engagementScore}/10`, pct: p.engagementScore * 10 },
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

                <div className="flex flex-wrap gap-1 pt-1">
                  {p.topTraits.map(t => (
                    <Badge key={t} variant="secondary" className="text-[9px] px-1.5 py-0">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Demographic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" /> Age Distribution by Persona
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={demographics.ageGroups} margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                {personas.slice(0, 4).map((p, i) => (
                  <Bar key={p.name} dataKey={p.name} stackId="a" fill={personaColors[i]} radius={i === 3 ? [4, 4, 0, 0] : undefined} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" /> Geographic Split
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={demographics.regions} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={2} label={({ name, value }) => `${name}: ${value}%`}>
                  {demographics.regions.map((_, i) => (
                    <Cell key={i} fill={personaColors[i % personaColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Behavioral Pattern Radar */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" /> Behavioral Patterns by Persona
          </CardTitle>
          <p className="text-[11px] text-muted-foreground">Normalized scores across key behavioral dimensions</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={behavioralPatterns}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 9 }} />
              {personas.slice(0, 4).map((p, i) => (
                <Radar key={p.name} name={p.name} dataKey={p.name} stroke={personaColors[i]} fill={personaColors[i]} fillOpacity={0.1} strokeWidth={2} />
              ))}
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Preferences */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" /> Channel Preferences
          </CardTitle>
          <p className="text-[11px] text-muted-foreground">Preferred engagement channel by persona</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={channelPreferences} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="channel" tick={{ fontSize: 12, fontWeight: 500 }} width={75} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              {personas.slice(0, 4).map((p, i) => (
                <Bar key={p.name} dataKey={p.name} stackId="a" fill={personaColors[i]} />
              ))}
            </BarChart>
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
