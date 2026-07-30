import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Activity, Plus, Trash2, Search, Globe, Smartphone, Zap, X,
  SlidersHorizontal, CalendarRange, Info, ArrowRight, Repeat,
  AlertTriangle, Upload, Tag, Replace,
} from "lucide-react";
import {
  behavioralEvents, eventGroups, eventTags, sourceMeta, availabilityLabel, timeWindowPresets,
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

const sourceCls: Record<string, string> = {
  system: "bg-slate-100 text-slate-600 border-slate-200",
  standard: "bg-blue-50 text-blue-700 border-blue-200",
  custom: "bg-amber-50 text-amber-700 border-amber-200",
};

const availKey = (e: BehavioralEvent): Platform =>
  e.availability.web && e.availability.app ? "both" : e.availability.web ? "web" : "app";

/** Is the event tracked on the platform scope currently selected? */
const isTracked = (e: BehavioralEvent, p: Platform) =>
  p === "both" ? e.availability.web || e.availability.app : p === "web" ? e.availability.web : e.availability.app;

/** Fully covers the selected scope (i.e. no partial-coverage caveat) */
const fullyCovers = (e: BehavioralEvent, p: Platform) =>
  p === "both" ? e.availability.web && e.availability.app : isTracked(e, p);

const opsForType = (t: EventProperty["type"]) =>
  t === "number" ? numberOperators : t === "boolean" ? booleanOperators : stringOperators;

/** Import-your-own event list */
const ImportEventsDialog = ({ onImport }: { onImport: (events: BehavioralEvent[]) => void }) => {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState("");
  const [group, setGroup] = useState("Conversion");
  const [scope, setScope] = useState<Platform>("both");

  const parsed = useMemo(
    () =>
      raw
        .split(/[\n,]/)
        .map((l) => l.trim())
        .filter(Boolean),
    [raw]
  );

  const doImport = () => {
    const events: BehavioralEvent[] = parsed.map((name) => ({
      id: `custom_${name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${uid()}`,
      name,
      platform: scope as BehavioralEvent["platform"],
      group,
      description: "Imported from your event list",
      availability: { web: scope !== "app", app: scope !== "web" },
      source: "custom",
      tags: ["custom event", scope === "web" ? "web-only" : scope === "app" ? "app-only" : "cross-platform"],
      properties: [],
    }));
    onImport(events);
    setRaw("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1.5 text-[11px]">
          <Upload className="h-3 w-3" /> Import event list
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">Populate your event list</DialogTitle>
          <DialogDescription className="text-xs">
            Paste event names from your Web / App SDK (one per line or comma separated). They become
            selectable <span className="font-medium">Custom</span> events, tagged with the platform they are tracked on.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={6}
            placeholder={"Wallet Recharged\nStore Locator Opened\nSubscription Paused"}
            className="text-xs font-mono"
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[11px]">Event group</Label>
              <Select value={group} onValueChange={setGroup}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {eventGroups.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-[11px]">Tracked on</Label>
              <Select value={scope} onValueChange={(v: Platform) => setScope(v)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">Web + App</SelectItem>
                  <SelectItem value="web">Web only</SelectItem>
                  <SelectItem value="app">App only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {parsed.length} event{parsed.length === 1 ? "" : "s"} detected
          </p>
        </div>

        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" disabled={!parsed.length} onClick={doImport}>
            Add {parsed.length || ""} event{parsed.length === 1 ? "" : "s"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/** Event picker popover, grouped by funnel stage, with tag filtering */
const EventPicker = ({
  platform,
  events,
  onSelect,
  trigger,
}: {
  platform: Platform;
  events: BehavioralEvent[];
  onSelect: (e: BehavioralEvent) => void;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [hideUntracked, setHideUntracked] = useState(true);

  const activeTags = useMemo(() => {
    const used = new Set<string>();
    events.forEach((e) => e.tags.forEach((t) => used.add(t)));
    return eventTags.filter((t) => used.has(t)).slice(0, 10);
  }, [events]);

  const list = useMemo(
    () =>
      events.filter(
        (e) =>
          (!hideUntracked || isTracked(e, platform)) &&
          (!tag || e.tags.includes(tag)) &&
          (e.name.toLowerCase().includes(q.toLowerCase()) || e.tags.some((t) => t.includes(q.toLowerCase())))
      ),
    [events, platform, q, tag, hideUntracked]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="start" sideOffset={4}>
        <div className="p-2 border-b border-border space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events or tags…" className="h-8 pl-8 text-xs bg-background" autoFocus />
          </div>
          <div className="flex flex-wrap gap-1">
            {activeTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(tag === t ? null : t)}
                className={`px-1.5 py-0.5 rounded text-[10px] border transition-colors ${
                  tag === t ? "bg-primary text-primary-foreground border-primary" : "bg-muted/60 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1.5 text-[10px] text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={!hideUntracked} onChange={() => setHideUntracked((v) => !v)} className="h-3 w-3 accent-primary" />
            Show events not tracked on {platformMeta[platform].label}
          </label>
        </div>
        <ScrollArea className="h-[320px]">
          <div className="p-1.5">
            {eventGroups.map((g) => {
              const items = list.filter((e) => e.group === g);
              if (!items.length) return null;
              return (
                <div key={g} className="mb-2">
                  <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{g}</p>
                  {items.map((e) => {
                    const k = availKey(e);
                    const tracked = isTracked(e, platform);
                    return (
                      <button
                        key={e.id}
                        className="w-full flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-primary/10 text-left group transition-colors"
                        onClick={() => { onSelect(e); setOpen(false); setQ(""); }}
                      >
                        <span className={`mt-0.5 h-5 w-5 rounded flex items-center justify-center border ${platformMeta[k].cls}`}>
                          {platformMeta[k].icon}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-foreground leading-tight">{e.name}</span>
                            {!tracked && <span className="text-[9px] text-amber-600 font-medium">not on {platformMeta[platform].label}</span>}
                          </span>
                          <span className="block text-[10px] text-muted-foreground truncate">{e.description}</span>
                          <span className="flex flex-wrap gap-1 mt-1">
                            <span className={`px-1 rounded border text-[9px] ${sourceCls[e.source]}`}>{sourceMeta[e.source].label}</span>
                            <span className="px-1 rounded border border-border bg-muted/50 text-[9px] text-muted-foreground">{availabilityLabel(e.availability)}</span>
                            {e.tags.slice(0, 2).map((t) => (
                              <span key={t} className="px-1 rounded bg-muted text-[9px] text-muted-foreground">#{t}</span>
                            ))}
                          </span>
                        </span>
                        <Plus className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1" />
                      </button>
                    );
                  })}
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
  const [customEvents, setCustomEvents] = useState<BehavioralEvent[]>([]);
  const catalog = useMemo(() => [...behavioralEvents, ...customEvents], [customEvents]);
  const eventById = (id: string) => catalog.find((e) => e.id === id);

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

  const swapToEquivalent = (c: EventCondition, eqId: string) => {
    const eq = eventById(eqId);
    if (!eq) return;
    update(c.id, { eventId: eq.id, propFilters: [] });
  };

  const untrackedCount = conditions.filter((c) => {
    const ev = eventById(c.eventId);
    return ev && !fullyCovers(ev, platform);
  }).length;

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
              <TooltipContent className="max-w-[280px] text-xs">
                Target users by what they did (or didn't do). Events are tagged by where they are tracked —
                app-only events like <span className="font-medium">App Installed</span> have no web counterpart,
                so we suggest the closest web equivalent.
              </TooltipContent>
            </Tooltip>
            <span className="text-[11px] text-muted-foreground ml-1">
              {conditions.length} {conditions.length === 1 ? "event condition" : "event conditions"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <ImportEventsDialog onImport={(evs) => setCustomEvents((prev) => [...prev, ...evs])} />

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

        {/* Platform coverage note */}
        {untrackedCount > 0 && (
          <div className="flex items-start gap-2 px-4 py-2 bg-amber-50 border-b border-amber-200 text-[11px] text-amber-800">
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>
              {untrackedCount} condition{untrackedCount > 1 ? "s use events" : " uses an event"} that {untrackedCount > 1 ? "are" : "is"} not
              tracked across the full <span className="font-semibold">{platformMeta[platform].label}</span> scope — those users will only be
              matched where the event exists. Swap to the suggested equivalent for full coverage.
            </span>
          </div>
        )}

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
                events={catalog}
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
            const k = availKey(ev);
            const meta = platformMeta[k];
            const covered = fullyCovers(ev, platform);
            const eq = ev.equivalent ? eventById(ev.equivalent.eventId) : undefined;
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
                  <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-muted/30 border-b border-border">
                    <span className={`h-5 w-5 rounded flex items-center justify-center border ${meta.cls}`}>{meta.icon}</span>
                    <span className="text-xs font-semibold text-foreground">{ev.name}</span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">{ev.group}</Badge>
                    <Badge variant="outline" className={`text-[9px] h-4 px-1.5 ${meta.cls}`}>{availabilityLabel(ev.availability)}</Badge>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className={`text-[9px] h-4 px-1.5 cursor-help ${sourceCls[ev.source]}`}>
                          {sourceMeta[ev.source].label}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[240px] text-xs">{sourceMeta[ev.source].hint}</TooltipContent>
                    </Tooltip>
                    <span className="hidden sm:flex items-center gap-1 text-[9px] text-muted-foreground">
                      <Tag className="h-2.5 w-2.5" />
                      {ev.tags.slice(0, 3).join(" · ")}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto text-muted-foreground hover:text-destructive" onClick={() => remove(c.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Platform mismatch callout */}
                  {!covered && (
                    <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-amber-50/70 border-b border-amber-200 text-[11px] text-amber-800">
                      <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>
                        <span className="font-semibold">{ev.name}</span> is tracked on{" "}
                        {availabilityLabel(ev.availability)} only.
                        {ev.equivalent ? ` ${ev.equivalent.note}` : " No equivalent exists on the other platform."}
                      </span>
                      {eq && (
                        <Button
                          variant="outline" size="sm"
                          className="h-6 gap-1 text-[10px] ml-auto border-amber-300 bg-white hover:bg-amber-100"
                          onClick={() => swapToEquivalent(c, eq.id)}
                        >
                          <Replace className="h-3 w-3" /> Use “{eq.name}”
                        </Button>
                      )}
                    </div>
                  )}

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

                    {ev.properties.length > 0 ? (
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-[11px] text-primary hover:text-primary" onClick={() => addProp(c)}>
                        <SlidersHorizontal className="h-3 w-3" /> Add event property filter
                      </Button>
                    ) : (
                      <p className="text-[10px] text-muted-foreground">
                        No properties mapped for this event yet — share the property schema to enable attribute filters.
                      </p>
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
                events={catalog}
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
