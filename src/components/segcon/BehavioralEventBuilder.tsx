import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Activity, Plus, Trash2, Search, Globe, Smartphone, Zap, X,
  SlidersHorizontal, CalendarRange, Info, ArrowRight, Repeat,
} from "lucide-react";
import {
  behavioralEvents, eventGroups, timeWindowPresets,
  stringOperators, numberOperators, booleanOperators,
  type BehavioralEvent, type EventProperty,
} from "@/data/behavioralEventsMockData";

type Platform = "both" | "web" | "app";
type Performed = "did" | "did_not";
type Joiner = "AND" | "OR";

interface PropFilter {
  id: string;
  propertyId: string;
  operator: string;
  value: string;
  valueTo?: string;
}

export interface EventCondition {
  id: string;
  eventId: string;
  performed: Performed;
  freqOperator: string;
  freqValue: string;
  freqValueTo?: string;
  window: string;
  from?: string;
  to?: string;
  propFilters: PropFilter[];
}

const uid = () => Math.random().toString(36).slice(2, 9);

const platformMeta: Record<string, { icon: JSX.Element; label: string; cls: string }> = {
  web: { icon: <Globe className="h-3 w-3" />, label: "Web", cls: "bg-sky-100 text-sky-700 border-sky-200" },
  app: { icon: <Smartphone className="h-3 w-3" />, label: "App", cls: "bg-violet-100 text-violet-700 border-violet-200" },
  both: { icon: <Zap className="h-3 w-3" />, label: "Web + App", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
};

const opsForType = (t: EventProperty["type"]) =>
  t === "number" ? numberOperators : t === "boolean" ? booleanOperators : stringOperators;

/** Event picker popover, grouped by funnel stage */
const EventPicker = ({
  platform,
  onSelect,
  trigger,
}: {
  platform: Platform;
  onSelect: (e: BehavioralEvent) => void;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      behavioralEvents.filter(
        (e) =>
          (platform === "both" || e.platform === platform || e.platform === "both") &&
          e.name.toLowerCase().includes(q.toLowerCase())
      ),
    [platform, q]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[340px] p-0" align="start" sideOffset={4}>
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events…" className="h-8 pl-8 text-xs bg-background" autoFocus />
          </div>
        </div>
        <ScrollArea className="h-[320px]">
          <div className="p-1.5">
            {eventGroups.map((g) => {
              const items = list.filter((e) => e.group === g);
              if (!items.length) return null;
              return (
                <div key={g} className="mb-2">
                  <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{g}</p>
                  {items.map((e) => (
                    <button
                      key={e.id}
                      className="w-full flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-primary/10 text-left group transition-colors"
                      onClick={() => { onSelect(e); setOpen(false); setQ(""); }}
                    >
                      <span className={`mt-0.5 h-5 w-5 rounded flex items-center justify-center border ${platformMeta[e.platform].cls}`}>
                        {platformMeta[e.platform].icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-xs font-medium text-foreground leading-tight">{e.name}</span>
                        <span className="block text-[10px] text-muted-foreground truncate">{e.description}</span>
                      </span>
                      <Plus className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1" />
                    </button>
                  ))}
                </div>
              );
            })}
            {list.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No events match</p>}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

const BehavioralEventBuilder = ({
  conditions,
  setConditions,
  platform,
  setPlatform,
  joiner,
  setJoiner,
  sequenced,
  setSequenced,
}: {
  conditions: EventCondition[];
  setConditions: (c: EventCondition[]) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
  joiner: Joiner;
  setJoiner: (j: Joiner) => void;
  sequenced: boolean;
  setSequenced: (v: boolean) => void;
}) => {
  const eventById = (id: string) => behavioralEvents.find((e) => e.id === id);

  const addCondition = (e: BehavioralEvent) =>
    setConditions([
      ...conditions,
      {
        id: uid(),
        eventId: e.id,
        performed: "did",
        freqOperator: "at least",
        freqValue: "1",
        window: "Last 30 days",
        propFilters: [],
      },
    ]);

  const update = (id: string, patch: Partial<EventCondition>) =>
    setConditions(conditions.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const remove = (id: string) => setConditions(conditions.filter((c) => c.id !== id));

  const addProp = (c: EventCondition) => {
    const ev = eventById(c.eventId);
    const first = ev?.properties[0];
    if (!first) return;
    update(c.id, {
      propFilters: [...c.propFilters, { id: uid(), propertyId: first.id, operator: opsForType(first.type)[0], value: "" }],
    });
  };

  const updateProp = (c: EventCondition, pid: string, patch: Partial<PropFilter>) =>
    update(c.id, { propFilters: c.propFilters.map((p) => (p.id === pid ? { ...p, ...patch } : p)) });

  const removeProp = (c: EventCondition, pid: string) =>
    update(c.id, { propFilters: c.propFilters.filter((p) => p.id !== pid) });

  return (
    <TooltipProvider delayDuration={200}>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border bg-muted/40">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center">
              <Activity className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">Behavioural Events</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[260px] text-xs">
                Target users by what they did (or didn't do) on web and app — event, frequency, time window and event properties.
              </TooltipContent>
            </Tooltip>
            <span className="text-[11px] text-muted-foreground ml-1">
              {conditions.length} {conditions.length === 1 ? "event condition" : "event conditions"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Platform toggle */}
            <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
              {(["both", "web", "app"] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    platform === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {platformMeta[p].icon}
                  {platformMeta[p].label}
                </button>
              ))}
            </div>

            {/* Sequence mode */}
            <div className="flex items-center gap-1.5">
              <Repeat className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[11px] font-medium cursor-pointer">In sequence</Label>
              <Switch checked={sequenced} onCheckedChange={setSequenced} />
            </div>
          </div>
        </div>

        <div className="p-4 space-y-0">
          {conditions.length === 0 && (
            <div className="border-2 border-dashed border-border rounded-xl py-10 text-center text-muted-foreground">
              <Zap className="h-8 w-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm font-medium">No behavioural conditions</p>
              <p className="text-xs mt-1 mb-4 max-w-sm mx-auto">
                Pick web / app events like <span className="font-medium">Product Viewed</span> or{" "}
                <span className="font-medium">Checkout Started</span>, then set how often and in what period.
              </p>
              <EventPicker
                platform={platform}
                onSelect={addCondition}
                trigger={
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Plus className="h-3.5 w-3.5" /> Add Event Condition
                  </Button>
                }
              />
            </div>
          )}

          {conditions.map((c, idx) => {
            const ev = eventById(c.eventId);
            if (!ev) return null;
            const meta = platformMeta[ev.platform];
            return (
              <div key={c.id}>
                {idx > 0 && (
                  <div className="flex items-center py-2">
                    <div className="flex-1 h-px bg-border" />
                    {sequenced ? (
                      <span className="mx-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                        THEN <ArrowRight className="h-3 w-3" />
                      </span>
                    ) : (
                      <div className="mx-3 flex gap-1">
                        {(["AND", "OR"] as Joiner[]).map((j) => (
                          <button
                            key={j}
                            onClick={() => setJoiner(j)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                              joiner === j
                                ? j === "AND"
                                  ? "bg-blue-500 text-white"
                                  : "bg-teal-500 text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {j}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}

                <div className="rounded-lg border border-border bg-background overflow-hidden">
                  {/* Condition head */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 border-b border-border">
                    <span className={`h-5 w-5 rounded flex items-center justify-center border ${meta.cls}`}>{meta.icon}</span>
                    <span className="text-xs font-semibold text-foreground">{ev.name}</span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">{ev.group}</Badge>
                    <Badge variant="outline" className={`text-[9px] h-4 px-1.5 ${meta.cls}`}>{meta.label}</Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto text-muted-foreground hover:text-destructive" onClick={() => remove(c.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Condition body */}
                  <div className="p-3 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Select value={c.performed} onValueChange={(v: Performed) => update(c.id, { performed: v })}>
                        <SelectTrigger className="h-8 text-xs w-[130px] bg-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="did">Performed</SelectItem>
                          <SelectItem value="did_not">Did not perform</SelectItem>
                        </SelectContent>
                      </Select>

                      {c.performed === "did" && (
                        <>
                          <Select value={c.freqOperator} onValueChange={(v) => update(c.id, { freqOperator: v })}>
                            <SelectTrigger className="h-8 text-xs w-[110px] bg-background"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {["at least", "at most", "exactly", "between"].map((o) => (
                                <SelectItem key={o} value={o}>{o}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="number" min={1} value={c.freqValue}
                            onChange={(e) => update(c.id, { freqValue: e.target.value })}
                            className="h-8 text-xs w-[70px] bg-background"
                          />
                          {c.freqOperator === "between" && (
                            <>
                              <span className="text-[10px] text-muted-foreground font-medium">and</span>
                              <Input
                                type="number" value={c.freqValueTo || ""}
                                onChange={(e) => update(c.id, { freqValueTo: e.target.value })}
                                className="h-8 text-xs w-[70px] bg-background"
                              />
                            </>
                          )}
                          <span className="text-[11px] text-muted-foreground">times</span>
                        </>
                      )}

                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <CalendarRange className="h-3.5 w-3.5" /> in
                      </span>
                      <Select value={c.window} onValueChange={(v) => update(c.id, { window: v })}>
                        <SelectTrigger className="h-8 text-xs w-[145px] bg-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {timeWindowPresets.map((w) => (
                            <SelectItem key={w} value={w}>{w}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {c.window === "Custom range" && (
                        <div className="flex items-center gap-1.5">
                          <Input type="date" value={c.from || ""} onChange={(e) => update(c.id, { from: e.target.value })} className="h-8 text-xs w-[130px] bg-background" />
                          <span className="text-[10px] text-muted-foreground">to</span>
                          <Input type="date" value={c.to || ""} onChange={(e) => update(c.id, { to: e.target.value })} className="h-8 text-xs w-[130px] bg-background" />
                        </div>
                      )}
                    </div>

                    {/* Event property filters */}
                    {c.propFilters.length > 0 && (
                      <div className="space-y-2 pl-3 border-l-2 border-dashed border-border">
                        {c.propFilters.map((p) => {
                          const prop = ev.properties.find((x) => x.id === p.propertyId);
                          const type = prop?.type || "string";
                          return (
                            <div key={p.id} className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-10">where</span>
                              <Select
                                value={p.propertyId}
                                onValueChange={(v) => {
                                  const np = ev.properties.find((x) => x.id === v);
                                  updateProp(c, p.id, { propertyId: v, operator: opsForType(np?.type || "string")[0], value: "" });
                                }}
                              >
                                <SelectTrigger className="h-7 text-[11px] w-[150px] bg-background"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {ev.properties.map((x) => (
                                    <SelectItem key={x.id} value={x.id}>{x.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={p.operator} onValueChange={(v) => updateProp(c, p.id, { operator: v })}>
                                <SelectTrigger className="h-7 text-[11px] w-[130px] bg-background"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {opsForType(type).map((o) => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {type !== "boolean" && (
                                prop?.options ? (
                                  <Select value={p.value} onValueChange={(v) => updateProp(c, p.id, { value: v })}>
                                    <SelectTrigger className="h-7 text-[11px] w-[150px] bg-background"><SelectValue placeholder="Select value" /></SelectTrigger>
                                    <SelectContent>
                                      {prop.options.map((o) => (
                                        <SelectItem key={o} value={o}>{o}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <Input
                                      type={type === "number" ? "number" : "text"}
                                      placeholder="Value" value={p.value}
                                      onChange={(e) => updateProp(c, p.id, { value: e.target.value })}
                                      className="h-7 text-[11px] w-[130px] bg-background"
                                    />
                                    {p.operator === "between" && (
                                      <>
                                        <span className="text-[10px] text-muted-foreground">to</span>
                                        <Input type="number" value={p.valueTo || ""} onChange={(e) => updateProp(c, p.id, { valueTo: e.target.value })} className="h-7 text-[11px] w-[100px] bg-background" />
                                      </>
                                    )}
                                  </div>
                                )
                              )}
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeProp(c, p.id)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {ev.properties.length > 0 && (
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-[11px] text-primary hover:text-primary" onClick={() => addProp(c)}>
                        <SlidersHorizontal className="h-3 w-3" /> Add event property filter
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {conditions.length > 0 && (
            <div className="pt-3">
              <EventPicker
                platform={platform}
                onSelect={addCondition}
                trigger={
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                    <Plus className="h-3.5 w-3.5" /> Add Event Condition
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BehavioralEventBuilder;
