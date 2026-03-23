import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BarChart3, ChevronDown, Search, X, SplitSquareVertical,
  Table as TableIcon, BarChart, AlertTriangle,
  UserRound, Smartphone, Globe, Mail, ShoppingCart, Tag, Layers, Grid3X3
} from "lucide-react";

// ── Breakdown attributes ──
interface BreakdownAttribute {
  id: string;
  name: string;
  group: "user" | "event";
  highCardinality?: boolean;
}

const breakdownAttributes: BreakdownAttribute[] = [
  { id: "country", name: "Country", group: "user" },
  { id: "city", name: "City", group: "user", highCardinality: true },
  { id: "gender", name: "Gender", group: "user" },
  { id: "age_range", name: "Age Range", group: "user" },
  { id: "loyalty_tier", name: "Loyalty Tier", group: "user" },
  { id: "device_type", name: "Device Type", group: "user" },
  { id: "operating_system", name: "Operating System", group: "user" },
  { id: "channel_preference", name: "Channel Preference", group: "user" },
  { id: "preferred_category", name: "Preferred Category", group: "event" },
  { id: "last_purchase_month", name: "Last Purchase Month", group: "event" },
  { id: "campaign_source", name: "Campaign Source", group: "event" },
  { id: "page_viewed", name: "Page Viewed", group: "event", highCardinality: true },
];

const attributeIcons: Record<string, React.ReactNode> = {
  country: <Globe className="h-3.5 w-3.5" />,
  city: <Globe className="h-3.5 w-3.5" />,
  gender: <UserRound className="h-3.5 w-3.5" />,
  age_range: <UserRound className="h-3.5 w-3.5" />,
  loyalty_tier: <Tag className="h-3.5 w-3.5" />,
  device_type: <Smartphone className="h-3.5 w-3.5" />,
  operating_system: <Smartphone className="h-3.5 w-3.5" />,
  channel_preference: <Mail className="h-3.5 w-3.5" />,
  preferred_category: <ShoppingCart className="h-3.5 w-3.5" />,
  last_purchase_month: <BarChart3 className="h-3.5 w-3.5" />,
  campaign_source: <Layers className="h-3.5 w-3.5" />,
  page_viewed: <Layers className="h-3.5 w-3.5" />,
};

// ── Mock breakdown results ──
const mockResults: Record<string, { label: string; users: number; pct: number }[]> = {
  country: [
    { label: "India", users: 45200, pct: 36.2 },
    { label: "United States", users: 28400, pct: 22.7 },
    { label: "United Kingdom", users: 15800, pct: 12.6 },
    { label: "UAE", users: 12300, pct: 9.8 },
    { label: "Singapore", users: 8900, pct: 7.1 },
    { label: "Others", users: 14400, pct: 11.6 },
  ],
  gender: [
    { label: "Male", users: 58200, pct: 46.6 },
    { label: "Female", users: 54800, pct: 43.8 },
    { label: "Non-binary", users: 7400, pct: 5.9 },
    { label: "Prefer not to say", users: 4600, pct: 3.7 },
  ],
  device_type: [
    { label: "Mobile", users: 72400, pct: 57.9 },
    { label: "Desktop", users: 38200, pct: 30.6 },
    { label: "Tablet", users: 14400, pct: 11.5 },
  ],
  age_range: [
    { label: "18-24", users: 22100, pct: 17.7 },
    { label: "25-34", users: 38600, pct: 30.9 },
    { label: "35-44", users: 28900, pct: 23.1 },
    { label: "45-54", users: 19800, pct: 15.8 },
    { label: "55-64", users: 10200, pct: 8.2 },
    { label: "65+", users: 5400, pct: 4.3 },
  ],
  loyalty_tier: [
    { label: "Platinum", users: 8400, pct: 6.7 },
    { label: "Gold", users: 24600, pct: 19.7 },
    { label: "Silver", users: 38200, pct: 30.6 },
    { label: "Bronze", users: 42100, pct: 33.7 },
    { label: "None", users: 11700, pct: 9.3 },
  ],
  operating_system: [
    { label: "iOS", users: 42300, pct: 33.8 },
    { label: "Android", users: 48600, pct: 38.9 },
    { label: "Windows", users: 22100, pct: 17.7 },
    { label: "macOS", users: 9800, pct: 7.8 },
    { label: "Linux", users: 2200, pct: 1.8 },
  ],
  channel_preference: [
    { label: "Email", users: 38200, pct: 30.6 },
    { label: "Push", users: 32400, pct: 25.9 },
    { label: "SMS", users: 24100, pct: 19.3 },
    { label: "WhatsApp", users: 18600, pct: 14.9 },
    { label: "In-App", users: 11700, pct: 9.3 },
  ],
  preferred_category: [
    { label: "Electronics", users: 32400, pct: 25.9 },
    { label: "Fashion", users: 28600, pct: 22.9 },
    { label: "Home & Living", users: 22100, pct: 17.7 },
    { label: "Beauty", users: 18400, pct: 14.7 },
    { label: "Sports", users: 12800, pct: 10.2 },
    { label: "Grocery", users: 10700, pct: 8.6 },
  ],
};

// ── Cross-tab mock data ──
const crossTabData: Record<string, Record<string, Record<string, number>>> = {
  "country|device_type": {
    "India": { "Mobile": 28400, "Desktop": 10200, "Tablet": 6600 },
    "United States": { "Mobile": 14800, "Desktop": 9600, "Tablet": 4000 },
    "United Kingdom": { "Mobile": 8200, "Desktop": 5100, "Tablet": 2500 },
    "UAE": { "Mobile": 7800, "Desktop": 3200, "Tablet": 1300 },
    "Singapore": { "Mobile": 5400, "Desktop": 2400, "Tablet": 1100 },
  },
  "country|gender": {
    "India": { "Male": 22100, "Female": 19800, "Non-binary": 2200, "Prefer not to say": 1100 },
    "United States": { "Male": 13200, "Female": 12800, "Non-binary": 1600, "Prefer not to say": 800 },
    "United Kingdom": { "Male": 7200, "Female": 7100, "Non-binary": 1000, "Prefer not to say": 500 },
    "UAE": { "Male": 7400, "Female": 4200, "Non-binary": 400, "Prefer not to say": 300 },
  },
  "gender|device_type": {
    "Male": { "Mobile": 33600, "Desktop": 17200, "Tablet": 7400 },
    "Female": { "Mobile": 32200, "Desktop": 15800, "Tablet": 6800 },
    "Non-binary": { "Mobile": 4200, "Desktop": 2200, "Tablet": 1000 },
    "Prefer not to say": { "Mobile": 2400, "Desktop": 1400, "Tablet": 800 },
  },
  "loyalty_tier|device_type": {
    "Platinum": { "Mobile": 4200, "Desktop": 3000, "Tablet": 1200 },
    "Gold": { "Mobile": 13800, "Desktop": 7600, "Tablet": 3200 },
    "Silver": { "Mobile": 22400, "Desktop": 10800, "Tablet": 5000 },
    "Bronze": { "Mobile": 24800, "Desktop": 12200, "Tablet": 5100 },
    "None": { "Mobile": 7200, "Desktop": 3200, "Tablet": 1300 },
  },
};

const getCrossTabKey = (a: string, b: string): string | null => {
  if (crossTabData[`${a}|${b}`]) return `${a}|${b}`;
  if (crossTabData[`${b}|${a}`]) return `${b}|${a}`;
  return null;
};

const generateFallbackCrossTab = (id1: string, id2: string) => {
  const rows = getResultsData(id1).slice(0, 5);
  const cols = getResultsData(id2).slice(0, 4);
  const data: Record<string, Record<string, number>> = {};
  rows.forEach(r => {
    data[r.label] = {};
    cols.forEach(c => {
      data[r.label][c.label] = Math.round(r.users * (c.pct / 100) * (0.7 + Math.random() * 0.6));
    });
  });
  return data;
};

const getResultsData = (id: string) => mockResults[id] || [
  { label: "Group A", users: 42000, pct: 33.6 },
  { label: "Group B", users: 38000, pct: 30.4 },
  { label: "Group C", users: 28000, pct: 22.4 },
  { label: "Others", users: 17000, pct: 13.6 },
];

const MAX_SELECTIONS = 2;

const BreakdownSection = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showTop, setShowTop] = useState("10");
  const [sortBy, setSortBy] = useState("highest");
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleAttribute = (id: string) => {
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(s => s !== id));
    } else if (selected.length < MAX_SELECTIONS) {
      setSelected(prev => [...prev, id]);
    }
  };

  const removeAttribute = (id: string) => {
    setSelected(prev => prev.filter(s => s !== id));
  };

  const hasHighCardinality = selected.some(id => breakdownAttributes.find(a => a.id === id)?.highCardinality);

  const filteredAttrs = breakdownAttributes.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );
  const userAttrs = filteredAttrs.filter(a => a.group === "user");
  const eventAttrs = filteredAttrs.filter(a => a.group === "event");

  const sortResults = (data: { label: string; users: number; pct: number }[]) => {
    const sorted = [...data];
    const topN = parseInt(showTop);
    switch (sortBy) {
      case "lowest": sorted.sort((a, b) => a.users - b.users); break;
      case "alphabetical": sorted.sort((a, b) => a.label.localeCompare(b.label)); break;
      default: sorted.sort((a, b) => b.users - a.users);
    }
    return sorted.slice(0, topN);
  };

  return (
    <div className="space-y-3">
      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Header */}
      <div className="flex items-center gap-2">
        <SplitSquareVertical className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Breakdown</h2>
        <span className="text-xs text-muted-foreground">Split results by selected attributes</span>
      </div>

      {/* Multi-select dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center flex-wrap gap-1.5 min-h-[36px] px-3 py-1.5 rounded-md border border-input bg-background cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selected.length === 0 && (
            <span className="text-xs text-muted-foreground">Select attributes</span>
          )}
          {selected.map(id => {
            const attr = breakdownAttributes.find(a => a.id === id);
            if (!attr) return null;
            return (
              <Badge key={id} variant="secondary" className="text-[11px] h-6 gap-1 pl-1.5 pr-1 font-medium">
                <span className="text-muted-foreground [&>svg]:h-3 [&>svg]:w-3">{attributeIcons[id]}</span>
                {attr.name}
                <button
                  className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                  onClick={(e) => { e.stopPropagation(); removeAttribute(id); }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-auto flex-shrink-0" />
        </div>

        {/* Dropdown panel */}
        {dropdownOpen && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-lg border border-border bg-popover shadow-lg overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search attributes…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-xs bg-background"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <ScrollArea className="max-h-[260px]">
              <div className="p-1.5">
                {/* User Attributes */}
                {userAttrs.length > 0 && (
                  <div className="mb-1">
                    <p className="px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">User Attributes</p>
                    {userAttrs.map(attr => {
                      const isSelected = selected.includes(attr.id);
                      const isDisabled = !isSelected && selected.length >= MAX_SELECTIONS;
                      return (
                        <Tooltip key={attr.id}>
                          <TooltipTrigger asChild>
                            <button
                              className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-left transition-colors ${
                                isSelected ? "bg-primary/10" : isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"
                              }`}
                              onClick={(e) => { e.stopPropagation(); if (!isDisabled) toggleAttribute(attr.id); }}
                              disabled={isDisabled}
                            >
                              <Checkbox checked={isSelected} className="h-3.5 w-3.5" tabIndex={-1} />
                              <span className="text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5">{attributeIcons[attr.id]}</span>
                              <span className="text-xs font-medium text-foreground flex-1">{attr.name}</span>
                              <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-border">User</Badge>
                            </button>
                          </TooltipTrigger>
                          {isDisabled && (
                            <TooltipContent side="right" className="text-xs">Maximum {MAX_SELECTIONS} breakdowns allowed</TooltipContent>
                          )}
                        </Tooltip>
                      );
                    })}
                  </div>
                )}

                {/* Event Attributes */}
                {eventAttrs.length > 0 && (
                  <div>
                    <p className="px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Event Attributes</p>
                    {eventAttrs.map(attr => {
                      const isSelected = selected.includes(attr.id);
                      const isDisabled = !isSelected && selected.length >= MAX_SELECTIONS;
                      return (
                        <Tooltip key={attr.id}>
                          <TooltipTrigger asChild>
                            <button
                              className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-left transition-colors ${
                                isSelected ? "bg-primary/10" : isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"
                              }`}
                              onClick={(e) => { e.stopPropagation(); if (!isDisabled) toggleAttribute(attr.id); }}
                              disabled={isDisabled}
                            >
                              <Checkbox checked={isSelected} className="h-3.5 w-3.5" tabIndex={-1} />
                              <span className="text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5">{attributeIcons[attr.id]}</span>
                              <span className="text-xs font-medium text-foreground flex-1">{attr.name}</span>
                              <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-border">Event</Badge>
                            </button>
                          </TooltipTrigger>
                          {isDisabled && (
                            <TooltipContent side="right" className="text-xs">Maximum {MAX_SELECTIONS} breakdowns allowed</TooltipContent>
                          )}
                        </Tooltip>
                      );
                    })}
                  </div>
                )}

                {filteredAttrs.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">No attributes match</p>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* High cardinality warning */}
      {hasHighCardinality && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 border border-border">
          <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <p className="text-[11px] text-muted-foreground">High cardinality attributes may reduce readability</p>
        </div>
      )}

      {/* Secondary controls */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3">
          <Select value={showTop} onValueChange={setShowTop}>
            <SelectTrigger className="h-7 w-[110px] text-[11px]">
              <SelectValue placeholder="Show Top" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Show Top 5</SelectItem>
              <SelectItem value="10">Show Top 10</SelectItem>
              <SelectItem value="20">Show Top 20</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-7 w-[140px] text-[11px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highest">Highest Users</SelectItem>
              <SelectItem value="lowest">Lowest Users</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-0.5 bg-muted rounded-md border border-border p-0.5">
            <button
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${viewMode === "table" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setViewMode("table")}
            >
              <TableIcon className="h-3.5 w-3.5" />
            </button>
            <button
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${viewMode === "chart" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setViewMode("chart")}
            >
              <BarChart className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {selected.length > 0 && (
        <div className="space-y-4">
          {selected.map(attrId => {
            const attr = breakdownAttributes.find(a => a.id === attrId);
            if (!attr) return null;
            const results = sortResults(getResults(attrId));
            const maxUsers = Math.max(...results.map(r => r.users));

            return (
              <Card key={attrId} className="border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center gap-2">
                    <span className="text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5">{attributeIcons[attrId]}</span>
                    <span className="text-xs font-semibold text-foreground">{attr.name}</span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5 ml-auto">{results.length} groups</Badge>
                  </div>

                  {viewMode === "table" ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="px-4 py-2.5 text-left font-medium text-muted-foreground w-[40%]">Group</th>
                            <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Users</th>
                            <th className="px-4 py-2.5 text-right font-medium text-muted-foreground w-[80px]">%</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((row, i) => (
                            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-2.5 font-medium text-foreground">
                                <Tooltip>
                                  <TooltipTrigger className="truncate max-w-[200px] block text-left">{row.label}</TooltipTrigger>
                                  <TooltipContent>{row.label}</TooltipContent>
                                </Tooltip>
                              </td>
                              <td className="px-4 py-2.5 text-right font-medium text-foreground tabular-nums">{row.users.toLocaleString()}</td>
                              <td className="px-4 py-2.5 text-right text-muted-foreground tabular-nums">{row.pct}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-4 space-y-2">
                      {results.map((row, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Tooltip>
                            <TooltipTrigger className="text-xs font-medium text-foreground w-[120px] truncate text-left">{row.label}</TooltipTrigger>
                            <TooltipContent>{row.label}</TooltipContent>
                          </Tooltip>
                          <div className="flex-1 h-5 bg-muted rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-primary/70 rounded-sm transition-all duration-300"
                              style={{ width: `${(row.users / maxUsers) * 100}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-muted-foreground tabular-nums w-[60px] text-right">{row.pct}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {selected.length === 0 && (
        <div className="border border-dashed border-border rounded-lg py-6 text-center text-muted-foreground">
          <SplitSquareVertical className="h-6 w-6 mx-auto mb-2 opacity-20" />
          <p className="text-xs">Select up to {MAX_SELECTIONS} attributes to break down your segment results.</p>
        </div>
      )}
    </div>
  );
};

export default BreakdownSection;
