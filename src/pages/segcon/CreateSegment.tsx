import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Plus, Trash2, Users, ChevronDown, ChevronRight, Calendar as CalendarIcon, Hash, Type, ToggleLeft,
  Loader2, Save, ArrowLeft, Filter, X, UserRound, BarChart3, Wallet, RefreshCw,
  Search, Layers, GripVertical, Smartphone, Activity,
  Target, Zap, ShieldX, Clock, GitBranch, Megaphone, ShoppingBag, UserCheck, Timer
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BreakdownSection from "@/components/segcon/BreakdownSection";

// ── Category Config with colors ──
const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  demographics: { icon: <UserRound className="h-4 w-4" />, color: "text-blue-700", bg: "bg-blue-100 border-blue-200", label: "Demographics" },
  behavioral: { icon: <BarChart3 className="h-4 w-4" />, color: "text-violet-700", bg: "bg-violet-100 border-violet-200", label: "Behavioral" },
  transactional: { icon: <Wallet className="h-4 w-4" />, color: "text-emerald-700", bg: "bg-emerald-100 border-emerald-200", label: "Transactional" },
  lifecycle: { icon: <RefreshCw className="h-4 w-4" />, color: "text-amber-700", bg: "bg-amber-100 border-amber-200", label: "Lifecycle" },
  events: { icon: <Zap className="h-4 w-4" />, color: "text-rose-700", bg: "bg-rose-100 border-rose-200", label: "Events" },
  devices: { icon: <Smartphone className="h-4 w-4" />, color: "text-cyan-700", bg: "bg-cyan-100 border-cyan-200", label: "Devices" },
  campaign: { icon: <Megaphone className="h-4 w-4" />, color: "text-orange-700", bg: "bg-orange-100 border-orange-200", label: "Campaign" },
  product: { icon: <ShoppingBag className="h-4 w-4" />, color: "text-pink-700", bg: "bg-pink-100 border-pink-200", label: "Product" },
  member: { icon: <UserCheck className="h-4 w-4" />, color: "text-indigo-700", bg: "bg-indigo-100 border-indigo-200", label: "Member" },
  time: { icon: <Timer className="h-4 w-4" />, color: "text-teal-700", bg: "bg-teal-100 border-teal-200", label: "Time" },
};

// ── 3-Level Tag Hierarchy ──
interface TagAttribute {
  id: string;
  name: string;
  definition: string;
  filterType: "dropdown" | "date" | "date_range" | "number_range" | "text" | "boolean" | "date_dropdown" | "campaign_date_only" | "campaign_frequency" | "value_date_range" | "slider_range";
  options?: string[];
  sliderMin?: number;
  sliderMax?: number;
  sliderUnit?: string;
}

interface TagSubCategory {
  id: string;
  name: string;
  attributes: TagAttribute[];
}

interface TagCategory {
  id: string;
  name: string;
  subCategories: TagSubCategory[];
}

const tagHierarchy: TagCategory[] = [
  {
    id: "demographics", name: "Demographics",
    subCategories: [
      {
        id: "personal", name: "Personal Info",
        attributes: [
          { id: "age_range", name: "Age Range", definition: "Customer's age bracket", filterType: "dropdown", options: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"] },
          { id: "gender", name: "Gender", definition: "Customer's gender identity", filterType: "dropdown", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
          { id: "city", name: "City", definition: "City of residence", filterType: "text" },
          { id: "country", name: "Country", definition: "Country of residence", filterType: "dropdown", options: ["India", "USA", "UK", "UAE", "Singapore", "Australia"] },
        ]
      },
      {
        id: "account", name: "Account Details",
        attributes: [
          { id: "signup_date", name: "Signup Date", definition: "Date the customer created their account", filterType: "date" },
          { id: "account_age", name: "Account Age", definition: "Days since account creation", filterType: "number_range" },
          { id: "is_verified", name: "Is Verified", definition: "Whether the account email/phone is verified", filterType: "boolean" },
        ]
      }
    ]
  },
  {
    id: "behavioral", name: "Behavioral",
    subCategories: [
      {
        id: "purchase", name: "Purchase Behavior",
        attributes: [
          { id: "total_orders", name: "Total Orders", definition: "Lifetime order count", filterType: "number_range" },
          { id: "last_purchase", name: "Last Purchase Date", definition: "Date of most recent purchase", filterType: "date_range" },
          { id: "avg_order_value", name: "Avg Order Value", definition: "Mean value across all orders", filterType: "number_range" },
          { id: "preferred_category", name: "Preferred Category", definition: "Most purchased product category", filterType: "dropdown", options: ["Electronics", "Fashion", "Home & Living", "Beauty", "Sports", "Grocery"] },
        ]
      },
      {
        id: "engagement", name: "Engagement",
        attributes: [
          { id: "last_active", name: "Last Active", definition: "Last app/web session date", filterType: "date" },
          { id: "session_count_30d", name: "Sessions (30d)", definition: "Number of sessions in last 30 days", filterType: "number_range" },
          { id: "email_open_rate", name: "Email Open Rate %", definition: "Percentage of emails opened", filterType: "number_range" },
          { id: "channel_preference", name: "Channel Preference", definition: "Preferred communication channel", filterType: "dropdown", options: ["Email", "SMS", "Push", "WhatsApp", "In-App"] },
        ]
      }
    ]
  },
  {
    id: "transactional", name: "Transactional",
    subCategories: [
      {
        id: "revenue", name: "Revenue Metrics",
        attributes: [
          { id: "lifetime_value", name: "Lifetime Value", definition: "Total revenue generated by customer", filterType: "number_range" },
          { id: "clv_tier", name: "CLV Tier", definition: "Predicted customer lifetime value tier", filterType: "dropdown", options: ["High", "Medium", "Low"] },
          { id: "last_txn_amount", name: "Last Txn Amount", definition: "Value of the most recent transaction", filterType: "number_range" },
        ]
      },
      {
        id: "loyalty", name: "Loyalty & Rewards",
        attributes: [
          { id: "loyalty_tier", name: "Loyalty Tier", definition: "Current loyalty program tier", filterType: "dropdown", options: ["Platinum", "Gold", "Silver", "Bronze", "None"] },
          { id: "points_balance", name: "Points Balance", definition: "Current reward points", filterType: "number_range" },
          { id: "reward_redeemed_in", name: "Reward Redeemed In", definition: "Date range when last reward was redeemed", filterType: "date_dropdown", options: ["Last 7 days", "Last 30 days", "Last 90 days", "Last 6 months", "Last 1 year"] },
        ]
      }
    ]
  },
  {
    id: "lifecycle", name: "Lifecycle",
    subCategories: [
      {
        id: "stage", name: "Stage & Status",
        attributes: [
          { id: "lifecycle_stage", name: "Lifecycle Stage", definition: "Current lifecycle classification", filterType: "dropdown", options: ["New", "Growing", "Stable", "Declining", "Lapsed"] },
          { id: "churn_risk", name: "Churn Risk Score", definition: "ML-predicted churn probability (0-100)", filterType: "number_range" },
          { id: "rfm_segment", name: "RFM Segment", definition: "Recency-Frequency-Monetary segment", filterType: "dropdown", options: ["Champions", "Loyal", "Potential Loyalists", "At Risk", "Hibernating", "Lost"] },
          { id: "days_since_last_activity", name: "Days Since Last Activity", definition: "Inactivity period in days", filterType: "number_range" },
        ]
      }
    ]
  },
  {
    id: "events", name: "Events",
    subCategories: [
      {
        id: "user_events", name: "User Events",
        attributes: [
          { id: "added_to_cart", name: "Added To Cart", definition: "User added item to shopping cart", filterType: "date_dropdown", options: ["Last 7 days", "Last 30 days", "Last 90 days"] },
          { id: "completed_purchase", name: "Completed Purchase", definition: "User completed a purchase", filterType: "date_dropdown", options: ["Last 7 days", "Last 30 days", "Last 90 days"] },
          { id: "app_opened", name: "App Opened", definition: "User opened the application", filterType: "date_dropdown", options: ["Last 7 days", "Last 30 days", "Last 90 days"] },
          { id: "page_viewed", name: "Page Viewed", definition: "User viewed a specific page", filterType: "text" },
        ]
      }
    ]
  },
  {
    id: "devices", name: "Devices",
    subCategories: [
      {
        id: "device_info", name: "Device Info",
        attributes: [
          { id: "device_type", name: "Device Type", definition: "Type of device used", filterType: "dropdown", options: ["Mobile", "Desktop", "Tablet"] },
          { id: "operating_system", name: "Operating System", definition: "Device operating system", filterType: "dropdown", options: ["iOS", "Android", "Windows", "macOS", "Linux"] },
          { id: "num_devices", name: "No. of Devices", definition: "Number of devices used", filterType: "number_range" },
        ]
      }
    ]
  },
  {
    id: "campaign", name: "Campaign",
    subCategories: [
      {
        id: "campaign_response", name: "Campaign Response",
        attributes: [
          { id: "sms_responder", name: "SMS Campaign Responder", definition: "Users who responded to an SMS campaign within a date range", filterType: "campaign_date_only" },
          { id: "email_responder", name: "Email Campaign Responder", definition: "Users who responded to an email campaign within a date range", filterType: "campaign_date_only" },
          { id: "push_responder", name: "Push Campaign Responder", definition: "Users who responded to a push notification campaign", filterType: "campaign_date_only" },
        ]
      },
      {
        id: "campaign_activity", name: "Campaign Activity",
        attributes: [
          { id: "campaign_sent", name: "Campaign Sent", definition: "Number of campaigns sent to user in a date range", filterType: "campaign_frequency", sliderMin: 1, sliderMax: 1000, sliderUnit: "Frequency" },
          { id: "campaign_opened", name: "Campaign Opened", definition: "Number of campaigns opened by user in a date range", filterType: "campaign_frequency", sliderMin: 1, sliderMax: 500, sliderUnit: "Frequency" },
          { id: "campaign_clicked", name: "Campaign Clicked", definition: "Number of campaign links clicked by user in a date range", filterType: "campaign_frequency", sliderMin: 1, sliderMax: 200, sliderUnit: "Frequency" },
        ]
      }
    ]
  },
  {
    id: "product", name: "Product",
    subCategories: [
      {
        id: "product_recency", name: "Product Recency",
        attributes: [
          { id: "brand_name", name: "BrandName", definition: "Brand of the product purchased or interacted with by the customer", filterType: "value_date_range", options: ["ALFA", "BETA", "GAMMA", "DELTA", "OMEGA", "SIGMA", "ZETA"] },
          { id: "category_name", name: "CategoryName", definition: "Product category purchased or interacted with by the customer", filterType: "value_date_range", options: ["Electronics", "Fashion", "Home & Living", "Beauty", "Sports", "Grocery", "Automotive"] },
          { id: "product_name", name: "ProductName", definition: "Specific product name purchased or interacted with by the customer", filterType: "value_date_range", options: ["Product A", "Product B", "Product C", "Product D", "Product E"] },
        ]
      },
      {
        id: "product_metrics", name: "Product Metrics",
        attributes: [
          { id: "product_qty", name: "Quantity Purchased", definition: "Total quantity of a product purchased by the customer", filterType: "number_range" },
          { id: "product_revenue", name: "Product Revenue", definition: "Total revenue from product purchases by the customer", filterType: "number_range" },
        ]
      }
    ]
  },
  {
    id: "member", name: "Member",
    subCategories: [
      {
        id: "channel_info", name: "Channel",
        attributes: [
          { id: "transacted_channel", name: "Transacted Channel", definition: "Channel through which the member transacted (Online, Offline, etc.)", filterType: "dropdown", options: ["Online", "Offline", "Mobile App", "In-Store", "Call Center"] },
          { id: "registration_channel", name: "Registration Channel", definition: "Channel through which the member registered", filterType: "dropdown", options: ["Website", "Mobile App", "In-Store", "Referral", "Social Media"] },
          { id: "preferred_channel", name: "Preferred Channel", definition: "Member's preferred communication channel", filterType: "dropdown", options: ["Email", "SMS", "Push", "WhatsApp", "In-App"] },
        ]
      },
      {
        id: "member_status", name: "Status",
        attributes: [
          { id: "member_tier", name: "Member Tier", definition: "Current membership tier of the customer", filterType: "dropdown", options: ["Platinum", "Gold", "Silver", "Bronze", "Basic"] },
          { id: "member_status", name: "Member Status", definition: "Active or inactive membership status", filterType: "dropdown", options: ["Active", "Inactive", "Suspended", "Expired"] },
        ]
      }
    ]
  },
  {
    id: "time", name: "Time",
    subCategories: [
      {
        id: "time_metrics", name: "Time Metrics",
        attributes: [
          { id: "latency", name: "Latency", definition: "Number of days since last customer activity or transaction", filterType: "slider_range", sliderMin: 1, sliderMax: 366, sliderUnit: "Days" },
          { id: "recency", name: "Recency", definition: "Number of days since last purchase by the customer", filterType: "slider_range", sliderMin: 1, sliderMax: 366, sliderUnit: "Days" },
          { id: "tenure", name: "Tenure", definition: "Number of months since customer first joined the program", filterType: "slider_range", sliderMin: 1, sliderMax: 120, sliderUnit: "Months" },
        ]
      }
    ]
  },
];
// ── Types ──
type ConditionType = "AND" | "OR" | "AND NOT";

interface FilterRule {
  id: string;
  attributeId: string;
  attributeName: string;
  categoryId: string;
  categoryName: string;
  filterType: TagAttribute["filterType"];
  operator: string;
  value: string;
  valueTo?: string;
  options?: string[];
  dateFrom?: string;
  dateTo?: string;
  sliderMin?: number;
  sliderMax?: number;
  sliderUnit?: string;
}

interface RuleGroup {
  id: string;
  intraCondition: ConditionType;
  rules: FilterRule[];
}

interface ExclusionFilter {
  id: string;
  type: "alert" | "broadcast";
  campaignName: string;
  dateFrom: string;
  dateTo: string;
}

const operatorsByType: Record<string, string[]> = {
  dropdown: ["is", "is not", "is any of"],
  date: ["is", "is before", "is after", "is in last"],
  date_range: ["is between", "is in last", "is before", "is after"],
  number_range: ["equals", "greater than", "less than", "between"],
  text: ["contains", "equals", "starts with", "ends with"],
  boolean: ["is"],
  date_dropdown: ["is", "is in"],
  campaign_date_only: ["Between"],
  campaign_frequency: ["Between"],
  value_date_range: ["Equals with Range", "Contain with Range", "Equals"],
  slider_range: ["Between"],
};

let idCounter = 0;
const nextId = (prefix: string) => `${prefix}_${++idCounter}`;

const conditionColors: Record<ConditionType, { pill: string; line: string }> = {
  "AND": { pill: "bg-slate-800 text-white", line: "border-slate-400" },
  "OR": { pill: "bg-teal-500 text-white", line: "border-teal-400" },
  "AND NOT": { pill: "bg-red-500 text-white", line: "border-red-400" },
};

// ── Attribute Picker Dropdown Component ──
const AttributePickerDropdown = ({
  groupId,
  onSelect,
}: {
  groupId: string;
  onSelect: (attr: TagAttribute, cat: TagCategory) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubCats, setExpandedSubCats] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };
  const toggleSubCat = (id: string) => {
    setExpandedSubCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const filteredHierarchy = searchQuery.trim()
    ? tagHierarchy.map(cat => ({
        ...cat,
        subCategories: cat.subCategories.map(sub => ({
          ...sub,
          attributes: sub.attributes.filter(attr =>
            attr.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        })).filter(sub => sub.attributes.length > 0),
      })).filter(cat => cat.subCategories.length > 0)
    : tagHierarchy;

  const filterTypeIcon = (type: TagAttribute["filterType"]) => {
    switch (type) {
      case "dropdown": case "date_dropdown": case "value_date_range": return <Filter className="h-3 w-3" />;
      case "date": case "date_range": case "campaign_date_only": return <CalendarIcon className="h-3 w-3" />;
      case "number_range": case "campaign_frequency": return <Hash className="h-3 w-3" />;
      case "text": return <Type className="h-3 w-3" />;
      case "boolean": return <ToggleLeft className="h-3 w-3" />;
      case "slider_range": return <Timer className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 text-[11px] h-7">
          <Plus className="h-3 w-3" /> Add Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0" align="start" sideOffset={4}>
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search attributes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 text-xs bg-background"
              autoFocus
            />
          </div>
        </div>
        <ScrollArea className="h-[360px]">
          <div className="p-1.5 space-y-0.5">
            {filteredHierarchy.map(cat => {
              const config = categoryConfig[cat.id];
              return (
                <Collapsible key={cat.id} open={expandedCategories.includes(cat.id) || !!searchQuery.trim()}>
                  <CollapsibleTrigger
                    className="flex items-center gap-2 w-full px-2.5 py-2 rounded-md hover:bg-muted text-left text-sm font-medium text-foreground transition-colors"
                    onClick={() => toggleCategory(cat.id)}
                  >
                    <span className={`h-6 w-6 rounded-md flex items-center justify-center border ${config?.bg || "bg-muted"} ${config?.color || ""}`}>
                      {config?.icon || <Filter className="h-3.5 w-3.5" />}
                    </span>
                    <span className="flex-1 text-xs font-semibold">{cat.name}</span>
                    <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{cat.subCategories.reduce((s, sub) => s + sub.attributes.length, 0)}</Badge>
                    {expandedCategories.includes(cat.id) || searchQuery.trim()
                      ? <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      : <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    }
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-5 space-y-0.5">
                    {cat.subCategories.map(sub => (
                      <Collapsible key={sub.id} open={expandedSubCats.includes(sub.id) || !!searchQuery.trim()}>
                        <CollapsibleTrigger
                          className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded-md hover:bg-muted text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                          onClick={() => toggleSubCat(sub.id)}
                        >
                          <span className="flex-1">{sub.name}</span>
                          {expandedSubCats.includes(sub.id) || searchQuery.trim()
                            ? <ChevronDown className="h-3 w-3" />
                            : <ChevronRight className="h-3 w-3" />
                          }
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-2 space-y-0.5">
                          {sub.attributes.map(attr => (
                            <button
                              key={attr.id}
                              className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-primary/10 text-left group transition-colors"
                              onClick={() => {
                                onSelect(attr, cat);
                                setOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              <span className="text-muted-foreground">{filterTypeIcon(attr.filterType)}</span>
                              <span className="text-xs font-medium text-foreground leading-tight">{attr.name}</span>
                              <Plus className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-auto" />
                            </button>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
            {filteredHierarchy.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">No attributes match</p>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

// ── Mind Map Component ──
const SegmentMindMap = ({ groups, interGroupConditions }: { groups: RuleGroup[]; interGroupConditions: ConditionType[] }) => {
  if (groups.length === 0) return null;

  return (
    <div className="flex items-center justify-center overflow-x-auto py-4">
      <div className="flex items-center gap-0 min-w-max">
        {/* Root node */}
        <div className="flex flex-col items-center">
          <div className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-sm">
            Segment
          </div>
        </div>

        {/* Connector line from root */}
        <div className="w-6 h-px bg-border" />

        {/* Groups */}
        <div className="flex flex-col gap-3">
          {groups.map((group, gIdx) => (
            <div key={group.id} className="flex items-center gap-0">
              {/* Inter-group condition label */}
              {gIdx > 0 && (
                <div className="flex flex-col items-center mr-0">
                  <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${conditionColors[interGroupConditions[gIdx - 1]]?.pill || "bg-muted text-muted-foreground"}`}>
                    {interGroupConditions[gIdx - 1] || "AND"}
                  </div>
                </div>
              )}
              {gIdx === 0 && <div className="w-0" />}

              {/* Connector */}
              <div className="w-4 h-px bg-border" />

              {/* Group node */}
              <div className="flex items-center gap-0">
                <div className="px-2.5 py-1 rounded-lg border border-border bg-card text-[10px] font-semibold text-foreground shadow-sm whitespace-nowrap">
                  Group {gIdx + 1}
                </div>

                {/* Connector to rules */}
                <div className="w-3 h-px bg-border" />

                {/* Rules branch */}
                <div className="flex flex-col gap-1">
                  {group.rules.map((rule, rIdx) => {
                    const catConfig = categoryConfig[rule.categoryId];
                    return (
                      <div key={rule.id} className="flex items-center gap-0">
                        {rIdx > 0 && (
                          <div className={`px-1.5 py-0 rounded text-[8px] font-bold mr-0 ${conditionColors[group.intraCondition].pill}`}>
                            {group.intraCondition}
                          </div>
                        )}
                        {rIdx === 0 && <div className="w-0" />}
                        <div className="w-2 h-px bg-border" />
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] whitespace-nowrap ${catConfig?.bg || "bg-muted border-border"} ${catConfig?.color || "text-foreground"}`}>
                          {catConfig?.icon && <span className="[&>svg]:h-2.5 [&>svg]:w-2.5">{catConfig.icon}</span>}
                          <span className="font-medium">{rule.attributeName}</span>
                          <span className="text-muted-foreground">{rule.operator}</span>
                          <span className="font-semibold">{rule.value || "…"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreateSegment = () => {
  const navigate = useNavigate();
  const [segmentName, setSegmentName] = useState("");
  const [rankEnabled, setRankEnabled] = useState(false);
  const [rankValue, setRankValue] = useState("");
  const [rankLimit, setRankLimit] = useState("");

  const [groups, setGroups] = useState<RuleGroup[]>([]);
  const [interGroupConditions, setInterGroupConditions] = useState<ConditionType[]>([]);

  // Exclusion filters
  const [exclusionFilters, setExclusionFilters] = useState<ExclusionFilter[]>([]);

  // Expiry date
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();

  const [isCountLoading, setIsCountLoading] = useState(false);
  const [estimatedCount, setEstimatedCount] = useState<number | null>(null);
  const [filterVersion, setFilterVersion] = useState(0);

  const totalRules = groups.reduce((sum, g) => sum + g.rules.length, 0);

  const isGroupComplete = (group: RuleGroup) => {
    return group.rules.length > 0 && group.rules.every(r => {
      if (r.filterType === "slider_range" || r.filterType === "campaign_frequency") return true;
      if (r.filterType === "campaign_date_only") return (r.dateFrom || "").trim() !== "" && (r.dateTo || "").trim() !== "";
      return r.value.trim() !== "";
    });
  };

  const canAddNewGroup = groups.length === 0 || groups.every(g => isGroupComplete(g));

  const addGroup = () => {
    if (!canAddNewGroup) return;
    const newGroup: RuleGroup = { id: nextId("grp"), intraCondition: "OR", rules: [] };
    if (groups.length > 0) {
      setInterGroupConditions(prev => [...prev, "AND"]);
    }
    setGroups(prev => [...prev, newGroup]);
  };

  const removeGroup = (groupId: string) => {
    const idx = groups.findIndex(g => g.id === groupId);
    if (idx === -1) return;
    setGroups(prev => prev.filter(g => g.id !== groupId));
    setInterGroupConditions(prev => {
      const next = [...prev];
      if (idx === 0 && next.length > 0) next.splice(0, 1);
      else if (idx > 0) next.splice(idx - 1, 1);
      return next;
    });
    setEstimatedCount(null);
    setFilterVersion(v => v + 1);
  };

  const addRuleToGroup = (groupId: string, attr: TagAttribute, cat: TagCategory) => {
    const newRule: FilterRule = {
      id: nextId("rule"),
      attributeId: attr.id,
      attributeName: attr.name,
      categoryId: cat.id,
      categoryName: cat.name,
      filterType: attr.filterType,
      operator: operatorsByType[attr.filterType]?.[0] || "is",
      value: attr.sliderMin !== undefined ? String(attr.sliderMin) : "",
      valueTo: attr.sliderMax !== undefined ? String(attr.sliderMax) : undefined,
      options: attr.options,
      sliderMin: attr.sliderMin,
      sliderMax: attr.sliderMax,
      sliderUnit: attr.sliderUnit,
    };
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, rules: [...g.rules, newRule] } : g));
    setEstimatedCount(null);
    setFilterVersion(v => v + 1);
  };

  const updateRule = (groupId: string, ruleId: string, updates: Partial<FilterRule>) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, rules: g.rules.map(r => r.id === ruleId ? { ...r, ...updates } : r) } : g));
    setEstimatedCount(null);
    setFilterVersion(v => v + 1);
  };

  const removeRule = (groupId: string, ruleId: string) => {
    setGroups(prev => {
      const updated = prev.map(g => g.id === groupId ? { ...g, rules: g.rules.filter(r => r.id !== ruleId) } : g);
      return updated.filter(g => g.rules.length > 0);
    });
    setInterGroupConditions(prev => {
      const remainingGroups = groups.map(g => g.id === groupId ? { ...g, rules: g.rules.filter(r => r.id !== ruleId) } : g).filter(g => g.rules.length > 0);
      return prev.slice(0, Math.max(0, remainingGroups.length - 1));
    });
    setEstimatedCount(null);
    setFilterVersion(v => v + 1);
  };

  const updateGroupCondition = (groupId: string, condition: ConditionType) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, intraCondition: condition } : g));
  };

  const updateInterGroupCondition = (index: number, condition: ConditionType) => {
    setInterGroupConditions(prev => prev.map((c, i) => i === index ? condition : c));
  };

  // Exclusion filter handlers
  const addExclusionFilter = () => {
    setExclusionFilters(prev => [...prev, {
      id: nextId("excl"),
      type: "broadcast",
      campaignName: "",
      dateFrom: "",
      dateTo: "",
    }]);
  };

  const updateExclusionFilter = (id: string, updates: Partial<ExclusionFilter>) => {
    setExclusionFilters(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeExclusionFilter = (id: string) => {
    setExclusionFilters(prev => prev.filter(f => f.id !== id));
  };

  const fetchRealtimeCount = useCallback(() => {
    if (totalRules === 0) return;
    setIsCountLoading(true);
    setTimeout(() => {
      const base = 151250;
      const variation = Math.floor(Math.random() * 80000) - 40000;
      setEstimatedCount(Math.max(1200, base + variation - totalRules * 12000));
      setIsCountLoading(false);
    }, 1500);
  }, [totalRules]);

  const _filterTypeIcon = (type: TagAttribute["filterType"]) => {
    switch (type) {
      case "dropdown": case "date_dropdown": case "value_date_range": return <Filter className="h-3.5 w-3.5" />;
      case "date": case "date_range": case "campaign_date_only": return <CalendarIcon className="h-3.5 w-3.5" />;
      case "number_range": case "campaign_frequency": return <Hash className="h-3.5 w-3.5" />;
      case "text": return <Type className="h-3.5 w-3.5" />;
      case "boolean": return <ToggleLeft className="h-3.5 w-3.5" />;
      case "slider_range": return <Timer className="h-3.5 w-3.5" />;
      default: return null;
    }
  };

  // ── Natural Language Summary ──
  const buildSummary = () => {
    if (groups.length === 0 || totalRules === 0) return null;

    const groupSummaries = groups.map(group => {
      const ruleParts = group.rules.map(r => {
        const val = r.value || "…";
        const valTo = r.valueTo ? ` to ${r.valueTo}` : "";
        return `${r.attributeName} ${r.operator} ${val}${valTo}`;
      });
      if (ruleParts.length === 1) return ruleParts[0];
      return `(${ruleParts.join(` ${group.intraCondition} `)})`;
    });

    let result = groupSummaries.reduce((acc, part, i) => {
      if (i === 0) return part;
      return `${acc} ${interGroupConditions[i - 1] || "AND"} ${part}`;
    }, "");

    if (exclusionFilters.length > 0) {
      const exclParts = exclusionFilters
        .filter(f => f.campaignName.trim())
        .map(f => `${f.type === "alert" ? "Alert" : "Broadcast"} "${f.campaignName}" (${f.dateFrom || "…"} → ${f.dateTo || "…"})`);
      if (exclParts.length > 0) {
        result += ` EXCLUDING ${exclParts.join(", ")}`;
      }
    }

    return result;
  };

  const renderFilterInput = (groupId: string, rule: FilterRule) => {
    const sliderMin = rule.sliderMin ?? 1;
    const sliderMax = rule.sliderMax ?? 100;
    const sliderUnit = rule.sliderUnit ?? "";

    const dateRangeRow = (
      <div className="space-y-1 mt-2 w-full">
        <p className="text-[10px] text-primary font-medium">Select Date range</p>
        <div className="flex items-center gap-1.5">
          <Input type="date" value={rule.dateFrom || ""} onChange={(e) => updateRule(groupId, rule.id, { dateFrom: e.target.value })} className="h-8 text-xs w-[140px] bg-background" />
          <span className="text-[10px] text-muted-foreground font-medium">–</span>
          <Input type="date" value={rule.dateTo || ""} onChange={(e) => updateRule(groupId, rule.id, { dateTo: e.target.value })} className="h-8 text-xs w-[140px] bg-background" />
          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        </div>
      </div>
    );

    const sliderBlock = (
      <div className="space-y-2 mt-2 w-full">
        <p className="text-[10px] text-primary font-medium">Select {sliderUnit}</p>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{sliderUnit} ({rule.value || sliderMin})</span>
          <span>{sliderUnit} ({rule.valueTo || sliderMax})</span>
        </div>
        <Slider
          min={sliderMin}
          max={sliderMax}
          step={1}
          value={[Number(rule.value) || sliderMin, Number(rule.valueTo) || sliderMax]}
          onValueChange={([min, max]) => updateRule(groupId, rule.id, { value: String(min), valueTo: String(max) })}
          className="w-full"
        />
        <div className="flex items-center gap-3 mt-1">
          <p className="text-[10px] text-muted-foreground text-center w-full">Or Manually</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <p className="text-[10px] text-primary font-medium">Min.</p>
            <Input type="number" value={rule.value || String(sliderMin)} onChange={(e) => updateRule(groupId, rule.id, { value: e.target.value })} className="h-8 text-xs w-[80px] bg-background" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] text-primary font-medium">Max.</p>
            <Input type="number" value={rule.valueTo || String(sliderMax)} onChange={(e) => updateRule(groupId, rule.id, { valueTo: e.target.value })} className="h-8 text-xs w-[120px] bg-background" />
          </div>
        </div>
      </div>
    );

    switch (rule.filterType) {
      case "dropdown":
      case "date_dropdown":
        return (
          <Select value={rule.value} onValueChange={(v) => updateRule(groupId, rule.id, { value: v })}>
            <SelectTrigger className="h-8 text-xs min-w-[150px] bg-background">
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              {rule.options?.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "date":
        return <Input type="date" value={rule.value} onChange={(e) => updateRule(groupId, rule.id, { value: e.target.value })} className="h-8 text-xs min-w-[150px] bg-background" />;
      case "date_range":
        return (
          <div className="flex items-center gap-1.5">
            <Input type="date" value={rule.value} onChange={(e) => updateRule(groupId, rule.id, { value: e.target.value })} className="h-8 text-xs w-[130px] bg-background" />
            <span className="text-[10px] text-muted-foreground font-medium">to</span>
            <Input type="date" value={rule.valueTo || ""} onChange={(e) => updateRule(groupId, rule.id, { valueTo: e.target.value })} className="h-8 text-xs w-[130px] bg-background" />
          </div>
        );
      case "number_range":
        if (rule.operator === "between") {
          return (
            <div className="flex items-center gap-1.5">
              <Input type="number" placeholder="Min" value={rule.value} onChange={(e) => updateRule(groupId, rule.id, { value: e.target.value })} className="h-8 text-xs w-[90px] bg-background" />
              <span className="text-[10px] text-muted-foreground font-medium">to</span>
              <Input type="number" placeholder="Max" value={rule.valueTo || ""} onChange={(e) => updateRule(groupId, rule.id, { valueTo: e.target.value })} className="h-8 text-xs w-[90px] bg-background" />
            </div>
          );
        }
        return <Input type="number" placeholder="Value" value={rule.value} onChange={(e) => updateRule(groupId, rule.id, { value: e.target.value })} className="h-8 text-xs min-w-[120px] bg-background" />;
      case "text":
        return <Input placeholder="Enter value" value={rule.value} onChange={(e) => updateRule(groupId, rule.id, { value: e.target.value })} className="h-8 text-xs min-w-[150px] bg-background" />;
      case "boolean":
        return (
          <Select value={rule.value || "true"} onValueChange={(v) => updateRule(groupId, rule.id, { value: v })}>
            <SelectTrigger className="h-8 text-xs w-[90px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );

      // ── Campaign: date range only (e.g. SMS Campaign Responder) ──
      case "campaign_date_only":
        return dateRangeRow;

      // ── Campaign: frequency slider + date range (e.g. Campaign Sent) ──
      case "campaign_frequency":
        return (
          <div className="w-full max-w-sm">
            {sliderBlock}
            {dateRangeRow}
          </div>
        );

      // ── Product: value dropdown + date range (e.g. Product Recency : BrandName) ──
      case "value_date_range":
        return (
          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 flex-wrap">
              {rule.operator === "Equals with Range" ? (
                <Select value={rule.value} onValueChange={(v) => updateRule(groupId, rule.id, { value: v })}>
                  <SelectTrigger className="h-8 text-xs min-w-[140px] bg-background">
                    <SelectValue placeholder="Select value" />
                  </SelectTrigger>
                  <SelectContent>
                    {rule.options?.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : rule.operator === "Contain with Range" ? (
                <div className="flex items-center gap-2">
                  <Input placeholder="Enter value" value={rule.value} onChange={(e) => updateRule(groupId, rule.id, { value: e.target.value })} className="h-8 text-xs w-[140px] bg-background" />
                  <span className="text-[10px] text-muted-foreground font-medium">Or</span>
                  <Select value={rule.valueTo || ""} onValueChange={(v) => updateRule(groupId, rule.id, { valueTo: v })}>
                    <SelectTrigger className="h-8 text-xs min-w-[130px] bg-background">
                      <SelectValue placeholder="Select Options" />
                    </SelectTrigger>
                    <SelectContent>
                      {rule.options?.map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <Select value={rule.value} onValueChange={(v) => updateRule(groupId, rule.id, { value: v })}>
                  <SelectTrigger className="h-8 text-xs min-w-[140px] bg-background">
                    <SelectValue placeholder="Select value" />
                  </SelectTrigger>
                  <SelectContent>
                    {rule.options?.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            {(rule.operator === "Equals with Range" || rule.operator === "Contain with Range") && dateRangeRow}
          </div>
        );

      // ── Time: slider with min/max (e.g. Latency) ──
      case "slider_range":
        return (
          <div className="w-full max-w-sm">
            {sliderBlock}
          </div>
        );

      default:
        return null;
    }
  };

  const summary = buildSummary();

  return (
    <main className="flex-1 overflow-auto flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-background">
        <Button variant="ghost" size="icon" onClick={() => navigate("/module/segcon/segments")} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Create Segment</h1>
          <p className="text-xs text-muted-foreground">Build complex audience segments visually</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={fetchRealtimeCount} disabled={totalRules === 0 || isCountLoading}>
              {isCountLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Users className="h-3.5 w-3.5" />}
              {isCountLoading ? "Counting…" : estimatedCount !== null ? `${estimatedCount.toLocaleString()} users` : "Check Count"}
            </Button>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Save className="h-3.5 w-3.5" /> Save Draft
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs" disabled={!segmentName || totalRules === 0}>
            Create Segment
          </Button>
        </div>
      </div>

      {/* ── Full-Width Builder ── */}
      <div className="flex-1 overflow-auto bg-background">
        <div className="p-6 space-y-5">
          {/* Segment Info - Name + Expiry (above the grid) */}
          <div className="flex items-end gap-4 max-w-xl">
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="seg-name" className="text-xs font-medium">Segment Name *</Label>
              <Input id="seg-name" placeholder="e.g. High-Value Churning Users" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} className="h-9" />
            </div>
            <div className="space-y-1.5 w-[200px] flex-shrink-0">
              <Label className="text-xs font-medium">Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("h-9 w-full justify-start text-left font-normal text-xs", !expiryDate && "text-muted-foreground")}
                  >
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    {expiryDate ? format(expiryDate, "PP") : "No expiry"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={setExpiryDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* Filter Top N Customer Toggle */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Switch checked={rankEnabled} onCheckedChange={(checked) => {
                setRankEnabled(checked);
                if (!checked) { setRankValue(""); setRankLimit(""); }
              }} />
              <Label className="text-xs font-medium cursor-pointer">Filter Top N Customer</Label>
            </div>
            {rankEnabled && (
              <div className="flex items-end gap-4 max-w-xl">
                <div className="space-y-1.5 flex-1">
                  <Label className="text-xs font-medium">Rank Value *</Label>
                  <Select value={rankValue} onValueChange={setRankValue}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="Rank Value*" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Available Points", "Total Spends", "Total Transaction", "Total Visits", "Average Spend Per Visits", "Recency", "Latency", "Percentage"].map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 w-[200px] flex-shrink-0">
                  <Label className="text-xs font-medium">Rank Limit</Label>
                  <Input
                    type="number"
                    placeholder="Rank Limit"
                    value={rankLimit}
                    onChange={(e) => setRankLimit(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Two-Column Layout: Builder + Side Panel ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5 items-start">
            {/* LEFT: Rules Builder Canvas */}
            <div className="space-y-5">
              {/* ── Rules Builder Canvas ── */}
              <div className="space-y-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-foreground">Criteria</h2>
                    <span className="text-xs text-muted-foreground ml-1">
                      {groups.length} {groups.length === 1 ? "rule group" : "rule groups"} · {totalRules} {totalRules === 1 ? "filter" : "filters"}
                    </span>
                  </div>
                </div>

                {groups.length === 0 && (
                  <div className="border-2 border-dashed border-border rounded-xl py-16 text-center text-muted-foreground">
                    <Layers className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">No criteria defined</p>
                    <p className="text-xs mt-1 mb-4 max-w-xs mx-auto">Add a group and use the dropdown to pick attributes. Connect groups with AND / OR / AND NOT.</p>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={addGroup}>
                      <Plus className="h-3.5 w-3.5" /> Add First Rule Group
                    </Button>
                  </div>
                )}

                {groups.map((group, groupIdx) => (
                  <div key={group.id}>
                    {/* ── Inter-Group Connector ── */}
                    {groupIdx > 0 && (
                      <div className="flex items-center py-2 relative">
                        <div className={`absolute left-4 top-0 bottom-0 w-0 border-l-2 border-dashed ${conditionColors[interGroupConditions[groupIdx - 1]].line}`} />
                        <div className="flex-1 flex items-center justify-center">
                          <div className="flex-1 h-px bg-border" />
                          <div className="mx-3 flex gap-1">
                            {(["AND", "AND NOT"] as ConditionType[]).map(c => (
                              <button
                                key={c}
                                onClick={() => updateInterGroupCondition(groupIdx - 1, c)}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                                  interGroupConditions[groupIdx - 1] === c
                                    ? conditionColors[c].pill
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                          <div className="flex-1 h-px bg-border" />
                        </div>
                      </div>
                    )}

                    {/* ── Group Card ── */}
                    <div className="relative">
                      <div className="absolute left-0 top-2 bottom-2 w-2 flex flex-col">
                        <div className="w-full h-3 border-l-2 border-t-2 border-slate-300 rounded-tl-md" />
                        <div className="w-full flex-1 border-l-2 border-slate-300" />
                        <div className="w-full h-3 border-l-2 border-b-2 border-slate-300 rounded-bl-md" />
                      </div>

                      <div className="ml-5 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                        {/* Group Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-3.5 w-3.5 text-muted-foreground/50" />
                            <span className="text-xs font-bold text-foreground">Rule Group {groupIdx + 1}</span>
                            <span className="text-[10px] text-muted-foreground">({group.rules.length} {group.rules.length === 1 ? "filter" : "filters"})</span>
                            {!isGroupComplete(group) && group.rules.length > 0 && (
                              <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-destructive/50 text-destructive">Incomplete</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {group.rules.length > 1 && (
                              <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5">
                                OR
                              </Badge>
                            )}
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeGroup(group.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Rules */}
                        <div className="p-3 space-y-0">
                          {group.rules.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground">
                              <p className="text-xs">Use the "Add Filter" button below to pick an attribute.</p>
                            </div>
                          )}

                          {group.rules.map((rule, ruleIdx) => {
                            const catConfig = categoryConfig[rule.categoryId];
                            return (
                              <div key={rule.id}>
                                {ruleIdx > 0 && (
                                  <div className="flex items-center justify-center py-1">
                                    <div className="flex-1 border-t border-dashed border-border" />
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold mx-2 ${conditionColors[group.intraCondition].pill}`}>
                                      {group.intraCondition}
                                    </span>
                                    <div className="flex-1 border-t border-dashed border-border" />
                                  </div>
                                )}

                                <div className="relative group/rule rounded-lg border border-border bg-background hover:border-primary/30 transition-colors p-3">
                                  <Badge className={`absolute -top-2.5 right-3 text-[10px] font-semibold px-2 py-0 border ${catConfig?.bg || "bg-muted"} ${catConfig?.color || "text-foreground"}`}>
                                    {catConfig?.label || rule.categoryName}
                                  </Badge>

                                  <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">{rule.categoryName} &gt; {rule.attributeName}</p>

                                  <div className="flex items-center gap-2 flex-wrap">
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                      <span className={`h-7 w-7 rounded-md flex items-center justify-center border ${catConfig?.bg || "bg-muted"} ${catConfig?.color || ""}`}>
                                        {catConfig?.icon || <Filter className="h-3.5 w-3.5" />}
                                      </span>
                                      <span className="text-sm font-semibold text-foreground">{rule.attributeName}</span>
                                    </div>

                                    <Select value={rule.operator} onValueChange={(v) => updateRule(group.id, rule.id, { operator: v, value: "", valueTo: "" })}>
                                      <SelectTrigger className="h-8 w-auto min-w-[120px] text-xs bg-muted/50 border-border">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {operatorsByType[rule.filterType]?.map(op => (
                                          <SelectItem key={op} value={op}>{op}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>

                                    {renderFilterInput(group.id, rule)}

                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover/rule:opacity-100 transition-opacity text-muted-foreground hover:text-destructive flex-shrink-0 ml-auto"
                                      onClick={() => removeRule(group.id, rule.id)}
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          <div className="pt-2">
                            <AttributePickerDropdown
                              groupId={group.id}
                              onSelect={(attr, cat) => addRuleToGroup(group.id, attr, cat)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Group - only bottom button */}
                {groups.length > 0 && (
                  <div className="pt-3 ml-5">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8" onClick={addGroup} disabled={!canAddNewGroup}
                      title={!canAddNewGroup ? "Complete all existing rule groups before adding a new one" : ""}>
                      <Plus className="h-3.5 w-3.5" /> Add Rule Group
                    </Button>
                  </div>
                )}
              </div>

              {/* ── Campaign Exclusion Filters ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldX className="h-4 w-4 text-destructive" />
                    <h2 className="text-sm font-semibold text-foreground">Exclusion Filters</h2>
                    <span className="text-xs text-muted-foreground">Exclude users targeted by campaigns</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7" onClick={addExclusionFilter}>
                    <Plus className="h-3 w-3" /> Add Exclusion
                  </Button>
                </div>

                {exclusionFilters.length === 0 && (
                  <div className="border border-dashed border-border rounded-lg py-6 text-center text-muted-foreground">
                    <ShieldX className="h-6 w-6 mx-auto mb-2 opacity-20" />
                    <p className="text-xs">No exclusion filters. Optionally exclude users already targeted by Alert or Broadcast campaigns.</p>
                  </div>
                )}

                {exclusionFilters.map((filter) => (
                  <div key={filter.id} className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <ShieldX className="h-4 w-4 text-destructive" />
                        <span className="text-xs font-semibold text-foreground">Exclude users of</span>
                      </div>

                      <Select value={filter.type} onValueChange={(v) => updateExclusionFilter(filter.id, { type: v as "alert" | "broadcast" })}>
                        <SelectTrigger className="h-8 w-[120px] text-xs bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alert">Alert</SelectItem>
                          <SelectItem value="broadcast">Broadcast</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Campaign name"
                        value={filter.campaignName}
                        onChange={(e) => updateExclusionFilter(filter.id, { campaignName: e.target.value })}
                        className="h-8 text-xs w-[180px] bg-background"
                      />

                      <span className="text-xs text-muted-foreground font-medium">targeted between</span>

                      <Input
                        type="date"
                        value={filter.dateFrom}
                        onChange={(e) => updateExclusionFilter(filter.id, { dateFrom: e.target.value })}
                        className="h-8 text-xs w-[140px] bg-background"
                      />
                      <span className="text-[10px] text-muted-foreground">→</span>
                      <Input
                        type="date"
                        value={filter.dateTo}
                        onChange={(e) => updateExclusionFilter(filter.id, { dateTo: e.target.value })}
                        className="h-8 text-xs w-[140px] bg-background"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive flex-shrink-0 ml-auto"
                        onClick={() => removeExclusionFilter(filter.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Breakdown Section ── */}
              <BreakdownSection filterVersion={filterVersion} />
            </div>

            {/* RIGHT: Side Panel - Summary, Mind Map, Count */}
            <div className="space-y-4 xl:pt-10">
              {/* ── Natural Language Summary ── */}
              {summary && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-start gap-2.5">
                      <Activity className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1">Query Summary</p>
                        <p className="text-xs text-foreground font-mono leading-relaxed break-words">{summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ── Mind Map ── */}
              {totalRules > 0 && (
                <Card className="border-border">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className="h-4 w-4 text-primary" />
                      <p className="text-[10px] font-semibold text-primary uppercase tracking-wide">Segment Mind Map</p>
                    </div>
                    <ScrollArea className="max-h-[400px]">
                      <SegmentMindMap groups={groups} interGroupConditions={interGroupConditions} />
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}

              {/* ── Estimated Size ── */}
              {estimatedCount !== null && !isCountLoading && (
                <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-800">
                  <CardContent className="flex items-center gap-4 py-3 px-4">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{estimatedCount.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">customers matched</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Empty state for side panel */}
              {!summary && totalRules === 0 && estimatedCount === null && (
                <Card className="border-dashed border-border">
                  <CardContent className="py-8 text-center text-muted-foreground">
                    <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    <p className="text-xs font-medium">Summary & Mind Map</p>
                    <p className="text-[10px] mt-1">Add rules to see your segment logic visualized here.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateSegment;
