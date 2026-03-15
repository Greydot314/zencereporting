import { useState } from "react";
import { X, Check, ChevronRight, ChevronLeft } from "lucide-react";
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

const previewData = [
  { custId: 'CUST-001', txnDate: '2025-02-15', amount: '₹2,450', category: 'Electronics' },
  { custId: 'CUST-002', txnDate: '2025-02-14', amount: '₹890', category: 'Fashion' },
  { custId: 'CUST-003', txnDate: '2025-02-12', amount: '₹5,200', category: 'Home' },
  { custId: 'CUST-004', txnDate: '2025-02-10', amount: '₹1,100', category: 'Electronics' },
  { custId: 'CUST-005', txnDate: '2025-02-08', amount: '₹3,750', category: 'Fashion' },
];

export const ConfigDrawer = ({ model, open, onClose }: ConfigDrawerProps) => {
  const [step, setStep] = useState(0);

  // Step 1 state
  const [dataSource, setDataSource] = useState("atlantis");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date(2025, 0, 1));
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date(2025, 2, 31));
  const [activeOnly, setActiveOnly] = useState(true);

  // Step 2 state
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

  // Step 3 state
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

  const tierColors = ['hsl(var(--primary))', 'hsl(221 83% 63%)', 'hsl(221 83% 73%)', 'hsl(220 14% 70%)', 'hsl(220 14% 80%)', 'hsl(220 14% 86%)', 'hsl(220 14% 92%)'];

  const handleRun = () => {
    onClose();
    toast("RFM Segmentation is running... View Progress →", {
      duration: 3000,
      action: { label: "View", onClick: () => {} },
    });
    setTimeout(() => {
      toast.success("RFM Segmentation completed successfully!", { duration: 4000 });
    }, 3000);
  };

  if (!open || !model) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/40 transition-opacity" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl bg-background border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{model.name}</h2>
            <p className="text-xs text-muted-foreground">Configure and run this model</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/30">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors",
                i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={cn("text-xs font-medium hidden sm:inline", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {step === 0 && (
            <>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Select Data Source</h3>
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atlantis">Atlantis Retail DB</SelectItem>
                    <SelectItem value="ch-a">ClickHouse - Brand A</SelectItem>
                    <SelectItem value="ch-b">ClickHouse - Brand B</SelectItem>
                    <SelectItem value="csv">Upload CSV</SelectItem>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal text-xs h-9", !dateFrom && "text-muted-foreground")}>
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
                    <Label className="text-xs">To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal text-xs h-9", !dateTo && "text-muted-foreground")}>
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

                <div className="flex items-center gap-2">
                  <Checkbox checked={activeOnly} onCheckedChange={(v) => setActiveOnly(!!v)} />
                  <Label className="text-xs">Include only active customers (last 12 months)</Label>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Map Your Fields</h3>
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Data Preview</h3>
                  <Badge variant="outline" className="text-[10px]">Sample: 1,24,560 customers detected</Badge>
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
                          <TableCell className="text-[11px] py-1.5">{r.custId}</TableCell>
                          <TableCell className="text-[11px] py-1.5">{r.txnDate}</TableCell>
                          <TableCell className="text-[11px] py-1.5">{r.amount}</TableCell>
                          <TableCell className="text-[11px] py-1.5">{r.category}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Recency</h3>
                  <Label className="text-xs text-muted-foreground">Inactivity threshold (days)</Label>
                  <Input type="number" value={inactivityDays} onChange={e => setInactivityDays(+e.target.value)} className="w-32 mt-1 h-8 text-xs" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Frequency</h3>
                  <Label className="text-xs text-muted-foreground">Minimum transaction count: {minTxnCount[0]}</Label>
                  <Slider value={minTxnCount} onValueChange={setMinTxnCount} min={1} max={20} step={1} className="mt-2" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Monetary</h3>
                  <Label className="text-xs text-muted-foreground">Min transaction value (₹)</Label>
                  <Input type="number" value={minTxnValue} onChange={e => setMinTxnValue(+e.target.value)} className="w-32 mt-1 h-8 text-xs" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Scoring Method</h3>
                  <div className="flex gap-3">
                    {(['equal', 'custom'] as const).map(m => (
                      <button key={m} onClick={() => setScoringMethod(m)} className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                        scoringMethod === m ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:bg-muted"
                      )}>
                        {m === 'equal' ? 'Equal Weights' : 'Custom Weights'}
                      </button>
                    ))}
                  </div>
                  {scoringMethod === 'custom' && (
                    <div className="mt-3 space-y-2">
                      {[{ label: 'R Weight', val: rWeight, set: setRWeight }, { label: 'F Weight', val: fWeight, set: setFWeight }, { label: 'M Weight', val: mWeight, set: setMWeight }].map(w => (
                        <div key={w.label} className="flex items-center gap-3">
                          <Label className="text-xs w-16">{w.label}</Label>
                          <Slider value={w.val} onValueChange={w.set} min={0} max={100} step={1} className="flex-1" />
                          <span className="text-xs font-mono w-8 text-right">{w.val[0]}%</span>
                        </div>
                      ))}
                      <p className="text-[10px] text-muted-foreground">Total: {rWeight[0] + fWeight[0] + mWeight[0]}% (should be 100%)</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Number of Tiers</h3>
                  <div className="flex gap-2">
                    {[3, 5, 7].map(n => (
                      <button key={n} onClick={() => setTierCount(n)} className={cn(
                        "px-4 py-1.5 rounded-md text-xs font-medium border transition-colors",
                        tierCount === n ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:bg-muted"
                      )}>
                        {n} tiers
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground">Segment Naming</h3>
                    <Switch checked={customNames} onCheckedChange={setCustomNames} />
                    <span className="text-xs text-muted-foreground">{customNames ? 'Custom' : 'Default'}</span>
                  </div>
                  {customNames && (
                    <div className="space-y-1.5">
                      {tierNames.slice(0, tierCount).map((name, i) => (
                        <Input key={i} value={name} onChange={e => { const n = [...tierNames]; n[i] = e.target.value; setTierNames(n); }} className="h-8 text-xs" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Live preview */}
              <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground">Estimated Distribution Preview</h4>
                <div className="flex h-8 rounded-md overflow-hidden">
                  {tierDistributions[tierCount]?.map((pct, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center text-[10px] font-semibold text-primary-foreground transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: tierColors[i] }}
                    >
                      {pct}%
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tierDistributions[tierCount]?.map((pct, i) => (
                    <span key={i} className="text-[10px] text-muted-foreground">
                      <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: tierColors[i] }} />
                      Tier {i + 1}: {pct}%
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Segment Output Destination</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs"><Checkbox checked={saveToLibrary} onCheckedChange={v => setSaveToLibrary(!!v)} />Save to Segment Library</label>
                    <label className="flex items-center gap-2 text-xs"><Checkbox checked={exportCsv} onCheckedChange={v => setExportCsv(!!v)} />Export to CSV</label>
                    <label className="flex items-center gap-2 text-xs"><Checkbox checked={pushCampaign} onCheckedChange={v => setPushCampaign(!!v)} />Push to Campaign Tool</label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Segment Labels in Output</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between"><span className="text-xs">Include score column</span><Switch checked={includeScore} onCheckedChange={setIncludeScore} /></div>
                    <div className="flex items-center justify-between"><span className="text-xs">Include tier name</span><Switch checked={includeTierName} onCheckedChange={setIncludeTierName} /></div>
                    <div className="flex items-center justify-between"><span className="text-xs">Include customer count</span><Switch checked={includeCount} onCheckedChange={setIncludeCount} /></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Run Schedule</h3>
                  <div className="flex gap-3">
                    {(['now', 'recurring'] as const).map(m => (
                      <button key={m} onClick={() => setRunSchedule(m)} className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium border transition-colors",
                        runSchedule === m ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:bg-muted"
                      )}>
                        {m === 'now' ? 'Run Once Now' : 'Schedule Recurring'}
                      </button>
                    ))}
                  </div>
                  {runSchedule === 'recurring' && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Frequency</Label>
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
                        <Label className="text-xs">Time</Label>
                        <Input type="time" defaultValue="00:00" className="h-8 text-xs mt-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Notification</h3>
                  <div className="flex items-center gap-2">
                    <Switch checked={notifyMe} onCheckedChange={setNotifyMe} />
                    <span className="text-xs">Notify me when run completes</span>
                  </div>
                  {notifyMe && (
                    <Input placeholder="email@company.com" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} className="mt-2 h-8 text-xs" />
                  )}
                </div>
              </div>
            </>
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
              <Button size="sm" onClick={handleRun} className="gap-1.5 px-6">
                Run Model
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
