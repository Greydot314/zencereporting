import { useState } from "react";
import { ArrowLeft, Sparkles, Megaphone, Download, Play, Activity, Database, Zap, Target, BarChart3, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
  LineChart, Line, Area, AreaChart, PieChart, Pie, Legend,
} from "recharts";
import {
  type BusinessModel, propensityScores, propensityDistribution, winbackScores, winbackBuckets,
  bbForecast, n2rOutputs, n2rConversion, basketRules, modelComparison,
} from "@/data/businessModelsMockData";

interface Props {
  model: BusinessModel;
  onBack: () => void;
}

export const BusinessModelDetail = ({ model, onBack }: Props) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9 mt-0.5 rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold text-foreground">{model.name}</h2>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] gap-1">
                <Activity className="h-3 w-3" /> {model.status}
              </Badge>
              {model.accuracy != null && (
                <Badge variant="outline" className="text-[10px]">Accuracy {model.accuracy}%</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{model.useCase} • Last run {model.lastRun}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {model.techniques.map(t => (
                <Badge key={t} variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">{t}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1.5"><Download className="h-3.5 w-3.5" />Export Results</Button>
          <Button size="sm" className="text-xs gap-1.5"><Target className="h-3.5 w-3.5" />Create Segment</Button>
          <Button size="sm" variant="outline" className="text-xs gap-1.5"><Megaphone className="h-3.5 w-3.5" />Trigger Campaign</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="output">Output</TabsTrigger>
          <TabsTrigger value="explain">Explainability</TabsTrigger>
          <TabsTrigger value="simulate">Simulation</TabsTrigger>
          {model.id === 'propensity' && <TabsTrigger value="compare">Compare Models</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">What problem it solves</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{model.problem}</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">When to use it</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{model.whenToUse}</p></CardContent>
            </Card>
          </div>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02]">
            <CardContent className="p-5 flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">AI Summary</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {model.id === 'propensity' && '12,810 customers (10%) are scored 81+ — these represent the highest-ROI cohort for the upcoming campaign. The next-best 22,180 in the 61–80 band respond well to a small voucher.'}
                  {model.id === 'winback' && '14,820 lapsed customers show a high chance to return — concentrated in the 60–120 day inactivity window with strong past response rates. Estimated reactivation revenue ₹1.84 Cr.'}
                  {model.id === 'bb-projection' && 'FY 2026–27 projected at ₹64.4 Cr (+11.2% YoY). Peak in Dec 26 driven by seasonality. Confidence interval narrows post Q2 as recent actuals stabilize trend.'}
                  {model.id === 'n2r' && 'New customers acquired through Organic and Referral channels show 2.3x repeat probability vs Paid Social. Discount-heavy first orders (>20%) sharply reduce repeat likelihood.'}
                  {model.id === 'basket' && 'Smart Home Hub → Smart Bulb Pack has the strongest association (lift 5.3). Beauty cross-sells dominate the top of the rules table — recommend bundling these in the next merchandising cycle.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="input" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Database className="h-4 w-4" />Input Data Schema</CardTitle>
              <p className="text-[11px] text-muted-foreground">Sample columns the model consumes. All values illustrative.</p>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="text-[11px] uppercase tracking-wider">Column</TableHead>
                      <TableHead className="text-[11px] uppercase tracking-wider">Type</TableHead>
                      <TableHead className="text-[11px] uppercase tracking-wider">Example</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {model.inputColumns.map(c => (
                      <TableRow key={c.name}>
                        <TableCell className="font-mono text-xs">{c.name}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[10px]">{c.type}</Badge></TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">{c.example}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Zap className="h-4 w-4" />Engineered Features</CardTitle>
              <p className="text-[11px] text-muted-foreground">Derived signals fed into the model after preprocessing.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {model.features.map(f => (
                  <div key={f.name} className="rounded-lg border p-3 bg-muted/20">
                    <p className="text-sm font-semibold">{f.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{f.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="output" className="mt-4 space-y-4">
          <OutputView model={model} />
        </TabsContent>

        <TabsContent value="explain" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Top factors influencing prediction</CardTitle>
              <p className="text-[11px] text-muted-foreground">Mock SHAP-style feature importance.</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={Math.max(220, model.featureImportance.length * 36)}>
                <BarChart data={model.featureImportance} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis type="number" domain={[0, 0.5]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="feature" width={170} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                  <Bar dataKey="importance" radius={[0, 6, 6, 0]} fill="hsl(var(--primary))" barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulate" className="mt-4">
          <SimulationView model={model} />
        </TabsContent>

        {model.id === 'propensity' && (
          <TabsContent value="compare" className="mt-4">
            <CompareView />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

/* ─────────── Output Views ─────────── */

const OutputView = ({ model }: { model: BusinessModel }) => {
  if (model.id === 'propensity') {
    return (
      <>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Score Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={propensityDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {propensityDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <ScoreTable rows={propensityScores.map(r => ({ ...r, scoreLabel: `${r.score}% likely to purchase` }))} extraCol="Next Best Offer" extraKey="nextBest" />
      </>
    );
  }
  if (model.id === 'winback') {
    return (
      <>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Return Likelihood Buckets</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={winbackBuckets} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                    {winbackBuckets.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Estimated Reactivation Revenue</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[240px] gap-2">
              <p className="text-4xl font-bold text-primary">₹1.84 Cr</p>
              <p className="text-xs text-muted-foreground">across 14,820 high-likelihood lapsed customers</p>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 mt-2">Recommended push window: next 14 days</Badge>
            </CardContent>
          </Card>
        </div>
        <ScoreTable rows={winbackScores.map(r => ({ ...r, scoreLabel: r.label }))} extraCol="Expected Value" extraKey="expectedValue" />
      </>
    );
  }
  if (model.id === 'bb-projection') {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Sales Projection — FY 2026–27 (₹ Cr)</CardTitle>
          <p className="text-[11px] text-muted-foreground">SARIMAX forecast with 80% confidence band.</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={bbForecast}>
              <defs>
                <linearGradient id="bbBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit=" Cr" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="upper" stroke="none" fill="url(#bbBand)" name="Upper" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="hsl(var(--background))" name="Lower" />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
              <Line type="monotone" dataKey="forecast" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }
  if (model.id === 'n2r') {
    return (
      <>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Cumulative Repeat Conversion %</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={n2rConversion}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="%" />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                <Line type="monotone" dataKey="repeat" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <ScoreTable rows={n2rOutputs.map(r => ({ ...r, scoreLabel: r.label }))} extraCol="First Order" extraKey="firstOrder" />
      </>
    );
  }
  if (model.id === 'basket') {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Top Association Rules</CardTitle>
          <p className="text-[11px] text-muted-foreground">"People who buy X also buy Y" — sorted by lift.</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="text-[11px] uppercase tracking-wider">If they buy</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wider">They also buy</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wider text-right">Support</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wider text-right">Confidence</TableHead>
                  <TableHead className="text-[11px] uppercase tracking-wider text-right">Lift</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {basketRules.map((r, i) => (
                  <TableRow key={i} className="hover:bg-muted/20">
                    <TableCell className="text-sm font-medium">{r.antecedent}</TableCell>
                    <TableCell className="text-sm text-primary">{r.consequent}</TableCell>
                    <TableCell className="text-right text-xs font-mono">{(r.support * 100).toFixed(1)}%</TableCell>
                    <TableCell className="text-right text-xs font-mono">{(r.confidence * 100).toFixed(0)}%</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono text-[11px] bg-primary/5 text-primary border-primary/20">
                        {r.lift.toFixed(1)}x
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
  return null;
};

const ScoreTable = ({ rows, extraCol, extraKey }: { rows: any[]; extraCol: string; extraKey: string }) => (
  <Card>
    <CardHeader className="pb-2"><CardTitle className="text-sm">Sample Customer-Level Output</CardTitle></CardHeader>
    <CardContent>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-[11px] uppercase tracking-wider">Customer</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider">Score</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider">Prediction</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider">{extraCol}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell className="text-sm">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">{r.id}</p>
                </TableCell>
                <TableCell className="w-44">
                  <div className="flex items-center gap-2">
                    <Progress value={r.score} className="h-1.5 flex-1" />
                    <span className="text-xs font-mono font-semibold w-8 text-right">{r.score}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs">{r.scoreLabel}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r[extraKey]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

/* ─────────── Simulation ─────────── */

const SimulationView = ({ model }: { model: BusinessModel }) => {
  const [frequency, setFrequency] = useState([5]);
  const [recency, setRecency] = useState([30]);
  const [basket, setBasket] = useState([1500]);
  const [channel, setChannel] = useState('Online');

  // Simple deterministic mock formula
  const score = Math.max(2, Math.min(98, Math.round(
    20 + frequency[0] * 5 + (60 - Math.min(60, recency[0])) * 0.6 + (basket[0] / 100) + (channel === 'Online' ? 5 : 0)
  )));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2"><Play className="h-4 w-4" />Simulation Mode</CardTitle>
        <p className="text-[11px] text-muted-foreground">Adjust the inputs to see how the predicted score changes.</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <SimSlider label="Purchase Frequency (per month)" value={frequency[0]} min={0} max={20} suffix=" txns" onChange={(v) => setFrequency([v])} />
            <SimSlider label="Days Since Last Purchase" value={recency[0]} min={0} max={180} suffix=" days" onChange={(v) => setRecency([v])} />
            <SimSlider label="Avg Basket Size" value={basket[0]} min={200} max={8000} suffix=" ₹" onChange={(v) => setBasket([v])} />
            <div className="space-y-1.5">
              <p className="text-xs font-medium">Preferred Channel</p>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-accent/5 p-6 flex flex-col items-center justify-center">
            <p className="text-xs font-medium text-muted-foreground mb-2">Predicted Score</p>
            <p className="text-6xl font-bold text-primary tabular-nums">{score}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {score >= 75 ? 'Very High intent' : score >= 50 ? 'Medium intent' : score >= 25 ? 'Low intent' : 'Very Low intent'}
            </p>
            <Progress value={score} className="h-2 w-full mt-4" />
            <p className="text-[11px] text-muted-foreground mt-4 text-center">
              Try increasing purchase frequency or shortening recency — the score will rise.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SimSlider = ({ label, value, min, max, suffix, onChange }: any) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium">{label}</p>
      <span className="text-xs font-mono font-semibold">{value}{suffix}</span>
    </div>
    <Slider value={[value]} min={min} max={max} step={1} onValueChange={(v) => onChange(v[0])} />
  </div>
);

/* ─────────── Compare ─────────── */

const CompareView = () => {
  const [enabled, setEnabled] = useState(true);
  const a = modelComparison.XGBoost;
  const b = modelComparison['Random Forest'];

  const data = [
    { metric: 'Accuracy', XGBoost: a.accuracy, RandomForest: b.accuracy },
    { metric: 'Precision', XGBoost: a.precision, RandomForest: b.precision },
    { metric: 'Recall', XGBoost: a.recall, RandomForest: b.recall },
    { metric: 'F1', XGBoost: a.f1, RandomForest: b.f1 },
    { metric: 'AUC', XGBoost: a.auc * 100, RandomForest: b.auc * 100 },
  ];

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm flex items-center gap-2"><GitCompare className="h-4 w-4" />XGBoost vs Random Forest</CardTitle>
          <p className="text-[11px] text-muted-foreground">Side-by-side metrics on the same training set.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Show comparison</span>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
      </CardHeader>
      {enabled && (
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <MetricCard title="XGBoost" data={a} accent="hsl(var(--primary))" winner />
            <MetricCard title="Random Forest" data={b} accent="hsl(220, 14%, 60%)" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="XGBoost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="RandomForest" fill="hsl(220, 14%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 rounded-lg border bg-muted/20 p-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Output difference: </span>
            On 10,000 sample customers, XGBoost flagged 1,240 high-intent buyers vs Random Forest's 1,098.
            Overlap was 942 customers — XGBoost surfaced 298 unique high-value prospects missed by RF.
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const MetricCard = ({ title, data, accent, winner }: any) => (
  <div className="rounded-xl border p-4 relative" style={{ borderColor: winner ? accent : undefined }}>
    {winner && <Badge className="absolute -top-2 right-3 bg-primary text-primary-foreground text-[10px]">Best</Badge>}
    <div className="flex items-center gap-2 mb-3">
      <div className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
      <h4 className="text-sm font-semibold">{title}</h4>
    </div>
    <div className="grid grid-cols-2 gap-3 text-xs">
      <Metric label="Accuracy" value={`${data.accuracy}%`} />
      <Metric label="AUC" value={data.auc.toFixed(2)} />
      <Metric label="F1 Score" value={`${data.f1}%`} />
      <Metric label="Train Time" value={data.trainTime} />
    </div>
  </div>
);

const Metric = ({ label, value }: any) => (
  <div>
    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
    <p className="text-sm font-bold tabular-nums mt-0.5">{value}</p>
  </div>
);
