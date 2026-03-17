import { useState } from "react";
import { X, Check, ChevronRight, ChevronLeft, Layers, Brain, BarChart3, TrendingUp, ShoppingCart, Users, Code2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { CatalogModel } from "@/data/modelStudioMockData";
import { toast } from "sonner";

interface ConfigDrawerProps {
  model: CatalogModel | null;
  open: boolean;
  onClose: () => void;
}

const steps = ["Data Setup", "Model Parameters", "Output & Schedule"];

const modelIcons: Record<string, React.ElementType> = {
  rfm: Layers, kmeans: Brain, churn: BarChart3, clv: TrendingUp,
  'product-propensity': ShoppingCart, 'demo-behavioral': Users,
  'custom-sql': Code2, 'auto-segment': Wand2,
};

const previewData = [
  { custId: 'CUST-001', txnDate: '2025-02-15', amount: '₹2,450', category: 'Electronics' },
  { custId: 'CUST-002', txnDate: '2025-02-14', amount: '₹890', category: 'Fashion' },
  { custId: 'CUST-003', txnDate: '2025-02-12', amount: '₹5,200', category: 'Home' },
  { custId: 'CUST-004', txnDate: '2025-02-10', amount: '₹1,100', category: 'Electronics' },
  { custId: 'CUST-005', txnDate: '2025-02-08', amount: '₹3,750', category: 'Fashion' },
];

export const ConfigDrawer = ({ model, open, onClose }: ConfigDrawerProps) => {
  const [step, setStep] = useState(0);

  // Step 1
  const [dataSource, setDataSource] = useState("atlantis");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(2025, 0, 1));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date(2025, 2, 31));
  const [activeOnly, setActiveOnly] = useState(true);

  // RFM params
  const [inactivityDays, setInactivityDays] = useState(90);
  const [minTxnCount, setMinTxnCount] = useState([3]);
  const [minTxnValue, setMinTxnValue] = useState(100);
  const [scoringMethod, setScoringMethod] = useState<'equal' | 'custom'>('equal');
  const [rWeight, setRWeight] = useState([33]);
  const [fWeight, setFWeight] = useState([34]);
  const [mWeight, setMWeight] = useState([33]);
  const [tierCount, setTierCount] = useState(5);
  const [customNames, setCustomNames] = useState(false);
  const [tierNames, setTierNames] = useState(['Champions', 'Loyal Customers', 'At-Risk', 'Hibernating', 'Lost']);

  // K-Means params
  const [clusterCount, setClusterCount] = useState([5]);
  const [maxIterations, setMaxIterations] = useState([100]);
  const [distanceMetric, setDistanceMetric] = useState('euclidean');
  const [features, setFeatures] = useState({ recency: true, frequency: true, monetary: true, tenure: false, avgBasket: true });

  // Churn params
  const [churnWindow, setChurnWindow] = useState([30]);
  const [riskThreshold, setRiskThreshold] = useState([70]);
  const [churnFeatures, setChurnFeatures] = useState({ purchaseFreq: true, daysInactive: true, supportTickets: true, emailEngagement: false, appUsage: true });

  // CLV params
  const [forecastHorizon, setForecastHorizon] = useState('12');
  const [discountRate, setDiscountRate] = useState([10]);
  const [clvModel, setClvModel] = useState('bgnbd');

  // Product Propensity params
  const [topN, setTopN] = useState([5]);
  const [lookbackDays, setLookbackDays] = useState([180]);
  const [excludePurchased, setExcludePurchased] = useState(true);

  // Hybrid params
  const [personaCount, setPersonaCount] = useState([6]);
  const [demoFields, setDemoFields] = useState({ age: true, gender: true, location: true, income: false });
  const [behaviorFields, setBehaviorFields] = useState({ browseHistory: true, purchasePattern: true, channelPref: true });

  // Custom SQL params
  const [sqlQuery, setSqlQuery] = useState("SELECT customer_id, SUM(amount) as total_spend,\n  COUNT(*) as txn_count\nFROM transactions\nWHERE txn_date >= '2024-01-01'\nGROUP BY customer_id");
  const [aiScoring, setAiScoring] = useState('cluster');

  // Auto-Segment params
  const [autoMaxSegments, setAutoMaxSegments] = useState([10]);
  const [autoOptimize, setAutoOptimize] = useState('silhouette');
  const [autoIncludeDemo, setAutoIncludeDemo] = useState(true);
  const [autoIncludeBehavioral, setAutoIncludeBehavioral] = useState(true);

  // Step 3
  const [saveToLibrary, setSaveToLibrary] = useState(true);
  const [exportCsv, setExportCsv] = useState(false);
  const [pushCampaign, setPushCampaign] = useState(false);
  const [includeScore, setIncludeScore] = useState(true);
  const [includeTierName, setIncludeTierName] = useState(true);
  const [includeCount, setIncludeCount] = useState(false);
  const [runSchedule, setRunSchedule] = useState<'now' | 'recurring'>('now');
  const [frequency, setFrequency] = useState('weekly');
  const [notifyMe, setNotifyMe] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');

  const tierDistributions: Record<number, number[]> = {
    3: [35, 40, 25],
    5: [12, 28, 22, 24, 14],
    7: [8, 15, 18, 20, 16, 13, 10],
  };

  const tierColors = [
    'hsl(var(--primary))', 'hsl(221 83% 63%)', 'hsl(142 76% 36%)',
    'hsl(38 92% 50%)', 'hsl(0 84% 60%)', 'hsl(262 83% 58%)', 'hsl(220 14% 70%)'
  ];

  const handleRun = () => {
    onClose();
    toast(`${model?.name} is running... View Progress →`, {
      duration: 3000,
      action: { label: "View", onClick: () => {} },
    });
    setTimeout(() => {
      toast.success(`${model?.name} completed successfully!`, { duration: 4000 });
    }, 3000);
  };

  if (!open || !model) return null;

  const Icon = modelIcons[model.id] || Brain;

  const renderStep2 = () => {
    switch (model.id) {
      case 'rfm':
        return (
          <div className="space-y-5">
            <ParamSection title="Recency" description="Define customer inactivity threshold">
              <div className="flex items-center gap-3">
                <Input type="number" value={inactivityDays} onChange={e => setInactivityDays(+e.target.value)} className="w-28 h-9 text-sm" />
                <span className="text-xs text-muted-foreground">days of inactivity</span>
              </div>
            </ParamSection>

            <ParamSection title="Frequency" description="Minimum transactions to qualify">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Min transactions</span>
                  <Badge variant="outline" className="text-xs font-mono">{minTxnCount[0]}</Badge>
                </div>
                <Slider value={minTxnCount} onValueChange={setMinTxnCount} min={1} max={20} step={1} />
              </div>
            </ParamSection>

            <ParamSection title="Monetary" description="Minimum transaction value filter">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">₹</span>
                <Input type="number" value={minTxnValue} onChange={e => setMinTxnValue(+e.target.value)} className="w-28 h-9 text-sm" />
              </div>
            </ParamSection>

            <ParamSection title="Scoring Method" description="How R, F, M dimensions are weighted">
              <ToggleButtons value={scoringMethod} onChange={setScoringMethod as any}
                options={[{ value: 'equal', label: 'Equal Weights' }, { value: 'custom', label: 'Custom Weights' }]} />
              {scoringMethod === 'custom' && (
                <div className="mt-4 space-y-3 p-3 rounded-lg bg-muted/30 border border-border">
                  {[{ label: 'Recency', val: rWeight, set: setRWeight, color: 'bg-blue-500' },
                    { label: 'Frequency', val: fWeight, set: setFWeight, color: 'bg-emerald-500' },
                    { label: 'Monetary', val: mWeight, set: setMWeight, color: 'bg-violet-500' }].map(w => (
                    <div key={w.label} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">{w.label}</span>
                        <span className="text-xs font-mono text-muted-foreground">{w.val[0]}%</span>
                      </div>
                      <Slider value={w.val} onValueChange={w.set} min={0} max={100} step={1} />
                    </div>
                  ))}
                  <div className={cn("text-[11px] font-medium", rWeight[0] + fWeight[0] + mWeight[0] === 100 ? "text-emerald-600" : "text-destructive")}>
                    Total: {rWeight[0] + fWeight[0] + mWeight[0]}% {rWeight[0] + fWeight[0] + mWeight[0] === 100 ? '✓' : '(must equal 100%)'}
                  </div>
                </div>
              )}
            </ParamSection>

            <ParamSection title="Number of Tiers" description="How many customer segments to create">
              <ToggleButtons value={String(tierCount)} onChange={(v) => setTierCount(Number(v))}
                options={[{ value: '3', label: '3 tiers' }, { value: '5', label: '5 tiers' }, { value: '7', label: '7 tiers' }]} />
            </ParamSection>

            <ParamSection title="Segment Naming" description="Customize output segment names">
              <div className="flex items-center gap-3 mb-2">
                <Switch checked={customNames} onCheckedChange={setCustomNames} />
                <span className="text-xs text-muted-foreground">{customNames ? 'Custom names' : 'Default names'}</span>
              </div>
              {customNames && (
                <div className="space-y-2">
                  {tierNames.slice(0, tierCount).map((name, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: tierColors[i] }} />
                      <Input value={name} onChange={e => { const n = [...tierNames]; n[i] = e.target.value; setTierNames(n); }} className="h-8 text-xs" />
                    </div>
                  ))}
                </div>
              )}
            </ParamSection>

            <LivePreview tierDistributions={tierDistributions} tierCount={tierCount} tierColors={tierColors} tierNames={tierNames} customNames={customNames} />
          </div>
        );

      case 'kmeans':
        return (
          <div className="space-y-5">
            <ParamSection title="Number of Clusters (K)" description="How many groups to discover in your data">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Clusters</span>
                  <Badge variant="outline" className="text-xs font-mono">{clusterCount[0]}</Badge>
                </div>
                <Slider value={clusterCount} onValueChange={setClusterCount} min={2} max={15} step={1} />
              </div>
            </ParamSection>

            <ParamSection title="Feature Selection" description="Choose which customer attributes to cluster on">
              <div className="space-y-2.5">
                {[{ key: 'recency', label: 'Recency (days since last purchase)' },
                  { key: 'frequency', label: 'Transaction Frequency' },
                  { key: 'monetary', label: 'Total Monetary Value' },
                  { key: 'tenure', label: 'Customer Tenure (months)' },
                  { key: 'avgBasket', label: 'Average Basket Size' }].map(f => (
                  <label key={f.key} className="flex items-center gap-2.5 text-xs cursor-pointer hover:bg-muted/30 rounded-md p-1.5 -mx-1.5 transition-colors">
                    <Checkbox checked={features[f.key as keyof typeof features]} onCheckedChange={v => setFeatures(p => ({ ...p, [f.key]: !!v }))} />
                    {f.label}
                  </label>
                ))}
              </div>
            </ParamSection>

            <ParamSection title="Distance Metric" description="Algorithm for measuring similarity between customers">
              <ToggleButtons value={distanceMetric} onChange={setDistanceMetric}
                options={[{ value: 'euclidean', label: 'Euclidean' }, { value: 'manhattan', label: 'Manhattan' }, { value: 'cosine', label: 'Cosine' }]} />
            </ParamSection>

            <ParamSection title="Max Iterations" description="Maximum convergence iterations">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Iterations</span>
                  <Badge variant="outline" className="text-xs font-mono">{maxIterations[0]}</Badge>
                </div>
                <Slider value={maxIterations} onValueChange={setMaxIterations} min={10} max={500} step={10} />
              </div>
            </ParamSection>

            <ClusterPreview count={clusterCount[0]} />
          </div>
        );

      case 'churn':
        return (
          <div className="space-y-5">
            <ParamSection title="Churn Definition Window" description="Days of inactivity to classify as churned">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Days</span>
                  <Badge variant="outline" className="text-xs font-mono">{churnWindow[0]} days</Badge>
                </div>
                <Slider value={churnWindow} onValueChange={setChurnWindow} min={7} max={90} step={1} />
              </div>
            </ParamSection>

            <ParamSection title="Risk Score Threshold" description="Score above which customers are flagged as at-risk">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Threshold</span>
                  <Badge variant="outline" className={cn("text-xs font-mono", riskThreshold[0] >= 70 ? "text-destructive" : "text-amber-600")}>{riskThreshold[0]}/100</Badge>
                </div>
                <Slider value={riskThreshold} onValueChange={setRiskThreshold} min={10} max={95} step={5} />
              </div>
            </ParamSection>

            <ParamSection title="Predictive Features" description="Behavioral signals used for churn prediction">
              <div className="space-y-2.5">
                {[{ key: 'purchaseFreq', label: 'Purchase Frequency Decline' },
                  { key: 'daysInactive', label: 'Days Since Last Activity' },
                  { key: 'supportTickets', label: 'Support Ticket Volume' },
                  { key: 'emailEngagement', label: 'Email Open/Click Rate' },
                  { key: 'appUsage', label: 'App/Website Visit Frequency' }].map(f => (
                  <label key={f.key} className="flex items-center gap-2.5 text-xs cursor-pointer hover:bg-muted/30 rounded-md p-1.5 -mx-1.5 transition-colors">
                    <Checkbox checked={churnFeatures[f.key as keyof typeof churnFeatures]} onCheckedChange={v => setChurnFeatures(p => ({ ...p, [f.key]: !!v }))} />
                    {f.label}
                  </label>
                ))}
              </div>
            </ParamSection>

            <ChurnPreview threshold={riskThreshold[0]} />
          </div>
        );

      case 'clv':
        return (
          <div className="space-y-5">
            <ParamSection title="Forecast Horizon" description="How far into the future to predict customer value">
              <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
                <SelectTrigger className="w-48 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                </SelectContent>
              </Select>
            </ParamSection>

            <ParamSection title="Prediction Model" description="Statistical model for CLV estimation">
              <ToggleButtons value={clvModel} onChange={setClvModel}
                options={[{ value: 'bgnbd', label: 'BG/NBD' }, { value: 'pareto', label: 'Pareto/NBD' }, { value: 'gamma', label: 'Gamma-Gamma' }]} />
            </ParamSection>

            <ParamSection title="Discount Rate" description="Annual discount rate for present value calculation">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Rate</span>
                  <Badge variant="outline" className="text-xs font-mono">{discountRate[0]}%</Badge>
                </div>
                <Slider value={discountRate} onValueChange={setDiscountRate} min={0} max={30} step={1} />
              </div>
            </ParamSection>

            <CLVPreview horizon={forecastHorizon} />
          </div>
        );

      case 'product-propensity':
        return (
          <div className="space-y-5">
            <ParamSection title="Top-N Products" description="Number of product recommendations per customer">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Products</span>
                  <Badge variant="outline" className="text-xs font-mono">Top {topN[0]}</Badge>
                </div>
                <Slider value={topN} onValueChange={setTopN} min={1} max={20} step={1} />
              </div>
            </ParamSection>

            <ParamSection title="Lookback Period" description="Historical data window for pattern detection">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Days</span>
                  <Badge variant="outline" className="text-xs font-mono">{lookbackDays[0]} days</Badge>
                </div>
                <Slider value={lookbackDays} onValueChange={setLookbackDays} min={30} max={365} step={30} />
              </div>
            </ParamSection>

            <ParamSection title="Filtering Options" description="Control recommendation behavior">
              <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                <Checkbox checked={excludePurchased} onCheckedChange={v => setExcludePurchased(!!v)} />
                Exclude previously purchased products
              </label>
            </ParamSection>
          </div>
        );

      case 'demo-behavioral':
        return (
          <div className="space-y-5">
            <ParamSection title="Number of Personas" description="Target number of customer personas to generate">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Personas</span>
                  <Badge variant="outline" className="text-xs font-mono">{personaCount[0]}</Badge>
                </div>
                <Slider value={personaCount} onValueChange={setPersonaCount} min={3} max={12} step={1} />
              </div>
            </ParamSection>

            <ParamSection title="Demographic Fields" description="Which demographic attributes to include">
              <div className="space-y-2.5">
                {[{ key: 'age', label: 'Age Group' }, { key: 'gender', label: 'Gender' },
                  { key: 'location', label: 'Location / City Tier' }, { key: 'income', label: 'Income Band' }].map(f => (
                  <label key={f.key} className="flex items-center gap-2.5 text-xs cursor-pointer hover:bg-muted/30 rounded-md p-1.5 -mx-1.5 transition-colors">
                    <Checkbox checked={demoFields[f.key as keyof typeof demoFields]} onCheckedChange={v => setDemoFields(p => ({ ...p, [f.key]: !!v }))} />
                    {f.label}
                  </label>
                ))}
              </div>
            </ParamSection>

            <ParamSection title="Behavioral Signals" description="Which behavioral data to analyze">
              <div className="space-y-2.5">
                {[{ key: 'browseHistory', label: 'Browse / Search History' },
                  { key: 'purchasePattern', label: 'Purchase Patterns' },
                  { key: 'channelPref', label: 'Channel Preferences' }].map(f => (
                  <label key={f.key} className="flex items-center gap-2.5 text-xs cursor-pointer hover:bg-muted/30 rounded-md p-1.5 -mx-1.5 transition-colors">
                    <Checkbox checked={behaviorFields[f.key as keyof typeof behaviorFields]} onCheckedChange={v => setBehaviorFields(p => ({ ...p, [f.key]: !!v }))} />
                    {f.label}
                  </label>
                ))}
              </div>
            </ParamSection>

            <PersonaPreview count={personaCount[0]} />
          </div>
        );

      case 'custom-sql':
        return (
          <div className="space-y-5">
            <ParamSection title="Base SQL Query" description="Define your customer base using SQL">
              <Textarea
                value={sqlQuery}
                onChange={e => setSqlQuery(e.target.value)}
                className="font-mono text-xs h-32 resize-none bg-muted/30"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Query must return a customer_id column. Additional columns will be used as features.</p>
            </ParamSection>

            <ParamSection title="AI Scoring Layer" description="Choose how AI processes your SQL output">
              <ToggleButtons value={aiScoring} onChange={setAiScoring}
                options={[
                  { value: 'cluster', label: 'Auto-Cluster' },
                  { value: 'score', label: 'Risk Score' },
                  { value: 'rank', label: 'Rank & Tier' },
                ]} />
            </ParamSection>
          </div>
        );

      case 'auto-segment':
        return (
          <div className="space-y-5">
            <ParamSection title="Maximum Segments" description="Upper bound on auto-detected segment count">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Max segments</span>
                  <Badge variant="outline" className="text-xs font-mono">{autoMaxSegments[0]}</Badge>
                </div>
                <Slider value={autoMaxSegments} onValueChange={setAutoMaxSegments} min={3} max={20} step={1} />
              </div>
            </ParamSection>

            <ParamSection title="Optimization Metric" description="How the AI evaluates segment quality">
              <ToggleButtons value={autoOptimize} onChange={setAutoOptimize}
                options={[
                  { value: 'silhouette', label: 'Silhouette Score' },
                  { value: 'calinski', label: 'Calinski-Harabasz' },
                  { value: 'davies', label: 'Davies-Bouldin' },
                ]} />
            </ParamSection>

            <ParamSection title="Data Sources to Include" description="Which data types the AI should analyze">
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                  <Checkbox checked disabled /> Transactional Data (required)
                </label>
                <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                  <Checkbox checked={autoIncludeBehavioral} onCheckedChange={v => setAutoIncludeBehavioral(!!v)} />
                  Behavioral Data
                </label>
                <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                  <Checkbox checked={autoIncludeDemo} onCheckedChange={v => setAutoIncludeDemo(!!v)} />
                  Demographic Data
                </label>
              </div>
            </ParamSection>

            <div className="p-4 rounded-xl border border-primary/20 bg-primary/[0.03]">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">AI will automatically determine</span>
              </div>
              <ul className="text-[11px] text-muted-foreground space-y-1 ml-6 list-disc">
                <li>Best model type (K-Means, DBSCAN, or hierarchical)</li>
                <li>Optimal number of segments (up to {autoMaxSegments[0]})</li>
                <li>Feature importance and weighting</li>
                <li>Segment naming based on attribute patterns</li>
              </ul>
            </div>
          </div>
        );

      default:
        return <p className="text-sm text-muted-foreground">Configuration not available for this model.</p>;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl bg-background border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-background to-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
              <Icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">{model.name}</h2>
              <p className="text-[11px] text-muted-foreground">Configure and run this model</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8"><X className="h-4 w-4" /></Button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 px-6 py-3 border-b border-border bg-muted/20">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-0 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all duration-300",
                  i < step ? "bg-emerald-500 text-white shadow-sm" : i === step ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" : "bg-muted text-muted-foreground"
                )}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={cn("text-xs font-medium hidden sm:inline", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-px flex-1 mx-2 transition-colors", i < step ? "bg-emerald-500" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 0 && (
            <div className="space-y-6">
              <ParamSection title="Select Data Source" description="Choose where to pull customer data from">
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atlantis">Atlantis Retail DB</SelectItem>
                    <SelectItem value="ch-a">ClickHouse - Brand A</SelectItem>
                    <SelectItem value="ch-b">ClickHouse - Brand B</SelectItem>
                    <SelectItem value="csv">Upload CSV</SelectItem>
                  </SelectContent>
                </Select>
              </ParamSection>

              <ParamSection title="Training Data Period" description="Date range for historical data">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[11px] text-muted-foreground">From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal text-xs h-9 mt-1", !dateFrom && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                          {dateFrom ? format(dateFrom, "PP") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground">To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal text-xs h-9 mt-1", !dateTo && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                          {dateTo ? format(dateTo, "PP") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={dateTo} onSelect={setDateTo} className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </ParamSection>

              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <Checkbox checked={activeOnly} onCheckedChange={(v) => setActiveOnly(!!v)} />
                Include only active customers (last 12 months)
              </label>

              <ParamSection title="Map Your Fields" description="Match your data columns to expected inputs">
                <div className="space-y-2.5">
                  {['Customer ID', 'Transaction Date', 'Transaction Amount', 'Product Category (optional)'].map(field => (
                    <div key={field} className="grid grid-cols-[1fr_1fr] gap-3 items-center">
                      <Label className="text-xs text-muted-foreground">{field}</Label>
                      <Select defaultValue={field.toLowerCase().replace(/\s+/g, '_').replace('_(optional)', '')}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer_id">customer_id</SelectItem>
                          <SelectItem value="transaction_date">transaction_date</SelectItem>
                          <SelectItem value="transaction_amount">transaction_amount</SelectItem>
                          <SelectItem value="product_category">product_category</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </ParamSection>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-foreground">Data Preview</h4>
                  <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">1,24,560 customers detected</Badge>
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="text-[10px] py-2">Customer ID</TableHead>
                        <TableHead className="text-[10px] py-2">Txn Date</TableHead>
                        <TableHead className="text-[10px] py-2">Amount</TableHead>
                        <TableHead className="text-[10px] py-2">Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map(r => (
                        <TableRow key={r.custId}>
                          <TableCell className="text-[11px] py-1.5 font-mono">{r.custId}</TableCell>
                          <TableCell className="text-[11px] py-1.5">{r.txnDate}</TableCell>
                          <TableCell className="text-[11px] py-1.5">{r.amount}</TableCell>
                          <TableCell className="text-[11px] py-1.5">{r.category}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {step === 1 && renderStep2()}

          {step === 2 && (
            <div className="space-y-5">
              <ParamSection title="Segment Output Destination" description="Where to save the model results">
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer"><Checkbox checked={saveToLibrary} onCheckedChange={v => setSaveToLibrary(!!v)} />Save to Segment Library</label>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer"><Checkbox checked={exportCsv} onCheckedChange={v => setExportCsv(!!v)} />Export to CSV</label>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer"><Checkbox checked={pushCampaign} onCheckedChange={v => setPushCampaign(!!v)} />Push to Campaign Tool</label>
                </div>
              </ParamSection>

              <ParamSection title="Segment Labels in Output" description="What columns to include in the output">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between"><span className="text-xs">Include score column</span><Switch checked={includeScore} onCheckedChange={setIncludeScore} /></div>
                  <div className="flex items-center justify-between"><span className="text-xs">Include tier name</span><Switch checked={includeTierName} onCheckedChange={setIncludeTierName} /></div>
                  <div className="flex items-center justify-between"><span className="text-xs">Include customer count</span><Switch checked={includeCount} onCheckedChange={setIncludeCount} /></div>
                </div>
              </ParamSection>

              <ParamSection title="Run Schedule" description="When to execute this model">
                <ToggleButtons value={runSchedule} onChange={setRunSchedule as any}
                  options={[{ value: 'now', label: 'Run Once Now' }, { value: 'recurring', label: 'Schedule Recurring' }]} />
                {runSchedule === 'recurring' && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[11px] text-muted-foreground">Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger className="h-8 text-xs mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[11px] text-muted-foreground">Time</Label>
                      <Input type="time" defaultValue="00:00" className="h-8 text-xs mt-1" />
                    </div>
                  </div>
                )}
              </ParamSection>

              <ParamSection title="Notification" description="Get alerted when the run completes">
                <div className="flex items-center gap-2">
                  <Switch checked={notifyMe} onCheckedChange={setNotifyMe} />
                  <span className="text-xs">Notify me when run completes</span>
                </div>
                {notifyMe && (
                  <Input placeholder="email@company.com" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} className="mt-2 h-8 text-xs" />
                )}
              </ParamSection>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
          <Button variant="ghost" size="sm" onClick={() => step > 0 ? setStep(step - 1) : onClose()} className="gap-1.5">
            <ChevronLeft className="h-3.5 w-3.5" />
            {step > 0 ? 'Back' : 'Cancel'}
          </Button>
          <div className="flex gap-2">
            {step === 2 && <Button variant="outline" size="sm">Save as Draft</Button>}
            {step < 2 ? (
              <Button size="sm" onClick={() => setStep(step + 1)} className="gap-1.5">
                Next: {steps[step + 1]} <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button size="sm" onClick={handleRun} className="gap-1.5 px-6 shadow-md shadow-primary/20">
                Run Model
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// --- Reusable sub-components ---

const ParamSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-2.5">
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-[11px] text-muted-foreground">{description}</p>
    </div>
    {children}
  </div>
);

const ToggleButtons = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
  <div className="flex gap-2 flex-wrap">
    {options.map(o => (
      <button key={o.value} onClick={() => onChange(o.value)} className={cn(
        "px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
        value === o.value
          ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
          : "bg-background text-muted-foreground border-border hover:bg-muted hover:border-muted-foreground/20"
      )}>
        {o.label}
      </button>
    ))}
  </div>
);

const LivePreview = ({ tierDistributions, tierCount, tierColors, tierNames, customNames }: any) => (
  <div className="p-4 rounded-xl border border-primary/15 bg-primary/[0.02] space-y-3">
    <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      Live Distribution Preview
    </h4>
    <div className="flex h-10 rounded-lg overflow-hidden shadow-inner">
      {tierDistributions[tierCount]?.map((pct: number, i: number) => (
        <div key={i} className="flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: tierColors[i] }}>
          {pct}%
        </div>
      ))}
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {tierDistributions[tierCount]?.map((pct: number, i: number) => (
        <span key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: tierColors[i] }} />
          {customNames ? tierNames[i] : `Tier ${i + 1}`}: {pct}%
        </span>
      ))}
    </div>
  </div>
);

const ClusterPreview = ({ count }: { count: number }) => {
  const sizes = Array.from({ length: count }, (_, i) => Math.round(100 / count + (Math.random() * 10 - 5)));
  const total = sizes.reduce((a, b) => a + b, 0);
  const normalized = sizes.map(s => Math.round(s / total * 100));
  const colors = ['hsl(221 83% 53%)', 'hsl(142 76% 36%)', 'hsl(38 92% 50%)', 'hsl(0 84% 60%)', 'hsl(262 83% 58%)',
    'hsl(190 80% 45%)', 'hsl(330 70% 55%)', 'hsl(160 60% 40%)', 'hsl(45 90% 50%)', 'hsl(280 70% 55%)',
    'hsl(200 70% 50%)', 'hsl(350 60% 50%)', 'hsl(120 50% 45%)', 'hsl(60 80% 45%)', 'hsl(300 60% 50%)'];

  return (
    <div className="p-4 rounded-xl border border-blue-500/15 bg-blue-500/[0.02] space-y-3">
      <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        Cluster Preview ({count} clusters)
      </h4>
      <div className="flex gap-1.5 h-8">
        {normalized.slice(0, count).map((pct, i) => (
          <div key={i} className="rounded-md flex items-center justify-center text-[9px] font-bold text-white transition-all duration-500"
            style={{ flex: pct, backgroundColor: colors[i % colors.length] }}>
            C{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChurnPreview = ({ threshold }: { threshold: number }) => {
  const safe = 100 - threshold;
  return (
    <div className="p-4 rounded-xl border border-orange-500/15 bg-orange-500/[0.02] space-y-3">
      <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        Risk Distribution Preview
      </h4>
      <div className="flex h-8 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center text-[10px] font-bold text-white bg-emerald-500 transition-all" style={{ width: `${safe * 0.4}%` }}>Safe</div>
        <div className="flex items-center justify-center text-[10px] font-bold text-white bg-amber-500 transition-all" style={{ width: `${safe * 0.6}%` }}>Monitor</div>
        <div className="flex items-center justify-center text-[10px] font-bold text-white bg-destructive transition-all" style={{ width: `${threshold}%` }}>At-Risk</div>
      </div>
      <p className="text-[11px] text-muted-foreground">Customers scoring above <span className="font-semibold text-destructive">{threshold}</span> will be flagged</p>
    </div>
  );
};

const CLVPreview = ({ horizon }: { horizon: string }) => (
  <div className="p-4 rounded-xl border border-violet-500/15 bg-violet-500/[0.02] space-y-3">
    <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
      Value Tier Preview ({horizon}mo forecast)
    </h4>
    <div className="flex h-8 rounded-lg overflow-hidden">
      <div className="flex items-center justify-center text-[10px] font-bold text-white bg-violet-600 transition-all" style={{ width: '15%' }}>High</div>
      <div className="flex items-center justify-center text-[10px] font-bold text-white bg-violet-400 transition-all" style={{ width: '30%' }}>Medium</div>
      <div className="flex items-center justify-center text-[10px] font-bold text-white bg-violet-300 transition-all" style={{ width: '35%' }}>Low</div>
      <div className="flex items-center justify-center text-[10px] font-bold text-foreground/50 bg-muted transition-all" style={{ width: '20%' }}>Dormant</div>
    </div>
  </div>
);

const PersonaPreview = ({ count }: { count: number }) => {
  const personas = ['Weekend Splurger', 'Loyal Minimalist', 'Deal Hunter', 'Brand Loyalist', 'Impulse Buyer',
    'Research Enthusiast', 'Seasonal Shopper', 'Premium Seeker', 'Value Maximizer', 'Trend Follower', 'Gifter', 'Explorer'];
  const emojis = ['🛍️', '💎', '🏷️', '❤️', '⚡', '🔍', '🌸', '👑', '💰', '📈', '🎁', '🌍'];

  return (
    <div className="p-4 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.02] space-y-3">
      <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        Persona Preview ({count} personas)
      </h4>
      <div className="flex flex-wrap gap-2">
        {personas.slice(0, count).map((p, i) => (
          <Badge key={i} variant="outline" className="text-[11px] gap-1 bg-background">
            {emojis[i]} {p}
          </Badge>
        ))}
      </div>
    </div>
  );
};
