import { useState } from "react";
import { Calendar, Play, SlidersHorizontal, ChevronDown, Info, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OliverDialogRouter } from "@/components/atlas/OliverDialogRouter";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const totalCustomersTrend = [
  { m: "Jun", v: 60 },
  { m: "Jul", v: 64 },
  { m: "Aug", v: 70 },
  { m: "Sep", v: 66 },
  { m: "Oct", v: 72 },
  { m: "Nov", v: 68 },
  { m: "Dec", v: 75 },
  { m: "Jan", v: 73 },
  { m: "Feb", v: 76 },
];

const salesByMonth = [
  { m: "May'25", loyalty: 60, non: 20 },
  { m: "Jun", loyalty: 70, non: 25 },
  { m: "Jul", loyalty: 150, non: 28 },
  { m: "Aug", loyalty: 65, non: 18 },
  { m: "Sep", loyalty: 85, non: 22 },
  { m: "Oct", loyalty: 90, non: 24 },
  { m: "Nov", loyalty: 110, non: 28 },
  { m: "Dec", loyalty: 95, non: 22 },
];

interface KpiSmallProps {
  label: string;
  value: string;
  sub?: string;
  link?: string;
  onOliver: () => void;
  hideOliver?: boolean;
}

const KpiSmall = ({ label, value, sub, link, onOliver, hideOliver }: KpiSmallProps) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
      <span>{label}</span>
      <Info className="h-3 w-3 text-muted-foreground/60" />
    </div>
    <div className="text-[22px] font-semibold text-foreground leading-tight">{value} {sub && <span className="text-xs font-normal text-muted-foreground">{sub}</span>}</div>
    {link ? (
      <a className="text-[11px] text-[#5B3FBF] underline underline-offset-2 hover:text-[#4a32a3]" href="#">{link}</a>
    ) : (
      <div className="text-[11px] text-muted-foreground italic">No data</div>
    )}
    {!hideOliver && (
      <button
        onClick={onOliver}
        className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E5E0F5] bg-white hover:bg-[#F4F0FF] text-[11px] font-medium text-foreground transition-colors"
      >
        <Sparkles className="h-3 w-3 text-[#5B3FBF]" />
        Oliver Ai
      </button>
    )}
  </div>
);

const AtlasPrimeDashboard = () => {
  const [openKpi, setOpenKpi] = useState<string | null>(null);
  const open = (k: string) => setOpenKpi(k);

  return (
    <main className="flex-1 overflow-auto bg-[#F4F4F7] pt-16">
      <div className="p-6 space-y-4">
        {/* Top filter bar */}
        <div className="bg-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 border border-border/60">
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm bg-white hover:bg-muted/30">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              May 22 2025 - May 22 2026 (1 year and 1 day)
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm bg-white hover:bg-muted/30">
              <Play className="h-4 w-4 text-muted-foreground" />
              Real Time
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm bg-white hover:bg-muted/30">
              Filter Store Tag
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border text-sm bg-white hover:bg-muted/30">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              More Filter
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* KPI Section */}
        <div className="grid grid-cols-12 gap-4">
          {/* Total Customers featured card */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-xl p-5 border border-border/60 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">Total Customers</div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">75.43 Lac</span>
                  <span className="text-xs text-muted-foreground">YTD <span className="font-semibold text-foreground">0</span></span>
                </div>
              </div>
            </div>
            <div className="flex-1 -mx-2 mt-2 min-h-[140px]">
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={totalCustomersTrend}>
                  <defs>
                    <linearGradient id="customersArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B6FE8" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#8B6FE8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#8B6FE8" fill="url(#customersArea)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 pt-4 border-t border-border/60">
              <div>
                <div className="text-xs text-muted-foreground">Total Transacted Customer</div>
                <div className="text-2xl font-bold mt-1">24.72 Lac</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">YTD <span className="font-semibold text-foreground">0</span></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Redeemed Customer</div>
                <div className="text-2xl font-bold mt-1">1.14 Lac</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">YTD <span className="font-semibold text-foreground">0</span></div>
              </div>
            </div>
          </div>

          {/* Right KPI grid */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-5 border border-border/60">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
              <KpiSmall label="Total Sales" value="0 (100.0%)" sub="INR" link="See last 6 weeks data" onOliver={() => open("Total Sales")} />
              <KpiSmall label="Engaged Customer" value="0" link="See last 6 weeks data" onOliver={() => open("Engaged Customer")} />
              <KpiSmall label="Total Bills" value="0 (100.0%)" link="See last 6 weeks data" onOliver={() => open("Total Bills")} />
              <KpiSmall label="Points Issued" value="0 Pts" link="See last 6 weeks data" onOliver={() => open("Points Issued")} />

              <KpiSmall label="Repeat Sales %" value="0 %" link="See last 6 weeks data" onOliver={() => open("Repeat Sales %")} />
              <KpiSmall label="Visit Per Customer" value="0" onOliver={() => open("Visit Per Customer")} hideOliver />
              <KpiSmall label="Total Quantity" value="0" link="See last 6 weeks data" onOliver={() => open("Total Quantity")} />
              <KpiSmall label="Points Redeemed" value="0 Pts" link="See last 6 weeks data" onOliver={() => open("Points Redeemed")} />
            </div>
          </div>
        </div>

        {/* Chart panel */}
        <div className="bg-white rounded-xl p-5 border border-border/60">
          <Tabs defaultValue="sales">
            <TabsList className="bg-transparent p-0 h-auto gap-1 border-b border-border/60 rounded-none w-full justify-start">
              {["Sales", "Customers", "ATV", "Pt Issued vs Redeemed", "Repeat Sales", "UPT", "Visits/Customers", "Bills", "Quantity"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t.toLowerCase().replace(/\s|\//g, "-").replace(/--/g, "-")}
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#5B3FBF] data-[state=active]:border-b-2 data-[state=active]:border-[#5B3FBF] data-[state=active]:shadow-none data-[state=active]:font-semibold rounded-none px-4 py-2.5 text-sm text-muted-foreground"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="sales" className="mt-5">
              <div className="flex items-center justify-end gap-2 mb-3">
                <button className="p-1.5 rounded-md hover:bg-muted/40"><Info className="h-4 w-4 text-muted-foreground" /></button>
                <button
                  onClick={() => open("Total Sales")}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E5E0F5] bg-white hover:bg-[#F4F0FF] text-[11px] font-medium text-foreground"
                >
                  <Sparkles className="h-3 w-3 text-[#5B3FBF]" />
                  Oliver Ai
                </button>
                <button className="p-1.5 rounded-md hover:bg-muted/40"><FileText className="h-4 w-4 text-muted-foreground" /></button>
              </div>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={salesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: "Sales", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="loyalty" stackId="a" fill="#EC4899" name="Loyalty Sale" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="non" stackId="a" fill="#C4B5FD" name="Non Loyalty Sale" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            {["customers", "atv", "pt-issued-vs-redeemed", "repeat-sales", "upt", "visits-customers", "bills", "quantity"].map((v) => (
              <TabsContent key={v} value={v} className="mt-5">
                <div className="h-[340px] flex items-center justify-center text-sm text-muted-foreground">
                  No data available for this view.
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <OliverInsightDialog
        open={!!openKpi}
        onOpenChange={(o) => !o && setOpenKpi(null)}
        kpi={openKpi ?? ""}
      />
    </main>
  );
};

export default AtlasPrimeDashboard;
