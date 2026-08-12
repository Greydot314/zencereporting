import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Link2, Building2, Layers, CheckCircle2,
} from "lucide-react";
import {
  catalogEvents, eventGroups, eventsFor, counterpartOf,
  type CatalogEvent, type CatalogProperty, type Platform,
} from "@/data/eventCatalog";

type Performed = "did" | "did_not";
type Joiner = "AND" | "OR";
type ScopeFilter = "all" | "standard" | "brand";

interface PropFilter {
  id: string;
  propertyId: string;
  operator: string;
  value: string;
  valueTo?: string;
}

export interface EventCondition {
  id: string;
  /** platform-qualified catalog id, e.g. app_add_to_cart */
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

const stringOperators = ["equals", "not equals", "contains", "does not contain", "starts with"];
const numberOperators = ["equals", "greater than", "less than", "between"];
const timeWindowPresets = [
  "Last 7 days", "Last 14 days", "Last 30 days", "Last 60 days",
  "Last 90 days", "Last 6 months", "This month", "Lifetime", "Custom range",
];

const platformMeta: Record<Platform, { icon: JSX.Element; label: string; cls: string; source: string }> = {
  web: { icon: <Globe className="h-3 w-3" />, label: "Web", cls: "bg-sky-100 text-sky-700 border-sky-200", source: "Web SDK · websiteid 9" },
  app: { icon: <Smartphone className="h-3 w-3" />, label: "App", cls: "bg-violet-100 text-violet-700 border-violet-200", source: "App SDK · websiteid 4" },
};

const scopeMeta: Record<CatalogEvent["scope"], { label: string; cls: string; hint: string }> = {
  standard: {
    label: "Standard",
    cls: "bg-blue-50 text-blue-700 border-blue-200",
    hint: "Mapped to the platform taxonomy — behaves the same for every client, so it can power templates, models and cross-platform reporting.",
  },
  brand: {
    label: "Brand event",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    hint: "Specific to this brand's implementation. Usable in segments exactly like a standard event, but it is not part of the shared taxonomy — map it if you want it in templates and cross-platform logic.",
  },
};

const opsForType = (t: CatalogProperty["type"]) => (t === "number" ? numberOperators : stringOperators);

/* ────────────────────────── Brand event mapping ────────────────────────── */

const canonicalOptions = Array.from(
  new Map(
    catalogEvents.filter((e) => e.canonicalId).map((e) => [e.canonicalId!, e.canonicalName!])
  ).entries()
);

const MappingDialog = ({
  mappings,
  onMap,
}: {
  mappings: Record<string, string>;
  onMap: (eventId: string, canonicalId: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("web");
  const [q, setQ] = useState("");

  const list = eventsFor(platform).filter(
    (e) => e.scope === "brand" && (e.name.toLowerCase().includes(q.toLowerCase()) || e.code.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1.5 text-[11px]">
          <Link2 className="h-3 w-3" /> Brand event mapping
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-base">Brand event mapping</DialogTitle>
          <DialogDescription className="text-xs">
            Web and App ship their own event codes. Brand-specific events (Crown Redeem, DineIn Mode, Call Rider…)
            stay usable as-is — mapping one to a standard concept simply lets it drive templates, models and
            web↔app equivalence.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
            {(["web", "app"] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  platform === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {platformMeta[p].icon} {platformMeta[p].label}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand events…" className="h-8 pl-8 text-xs" />
          </div>
        </div>

        <ScrollArea className="h-[340px] -mx-2 px-2">
          <div className="space-y-1">
            {list.map((e) => (
              <div key={e.id} className="flex items-center gap-2 rounded-md border border-border bg-muted/20 px-2.5 py-1.5">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate">{e.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground truncate">{e.code} · {e.properties.length} fields</p>
                </div>
                <Select value={mappings[e.id] ?? "unmapped"} onValueChange={(v) => onMap(e.id, v)}>
                  <SelectTrigger className="h-7 w-[190px] text-[11px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unmapped">Keep brand-specific</SelectItem>
                    {canonicalOptions.map(([id, name]) => (
                      <SelectItem key={id} value={id}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {mappings[e.id] && mappings[e.id] !== "unmapped" && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                )}
              </div>
            ))}
            {!list.length && <p className="text-xs text-muted-foreground text-center py-10">No brand events match</p>}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button size="sm" onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/* ────────────────────────── Event picker ────────────────────────── */

const EventPicker = ({
  platform,
  setPlatform,
  onSelect,
  trigger,
}: {
  platform: Platform;
  setPlatform: (p: Platform) => void;
  onSelect: (e: CatalogEvent) => void;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<ScopeFilter>("all");

  const events = useMemo(() => eventsFor(platform), [platform]);
  const counts = useMemo(
    () => ({
      all: events.length,
      standard: events.filter((e) => e.scope === "standard").length,
      brand: events.filter((e) => e.scope === "brand").length,
    }),
    [events]
  );

  const list = useMemo(
    () =>
      events.filter(
        (e) =>
          (scope === "all" || e.scope === scope) &&
          (e.name.toLowerCase().includes(q.toLowerCase()) || e.code.toLowerCase().includes(q.toLowerCase()))
      ),
    [events, q, scope]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[420px] p-0" align="start" sideOffset={4}>
        {/* Platform tabs — web and app catalogs are separate, never merged */}
        <div className="grid grid-cols-2 border-b border-border">
          {(["web", "app"] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium transition-colors ${
                platform === p
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              {platformMeta[p].icon} {platformMeta[p].label} events
              <span className="text-[10px] opacity-70">({eventsFor(p).length})</span>
            </button>
          ))}
        </div>

        <div className="p-2 border-b border-border space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search event name or code…" className="h-8 pl-8 text-xs bg-background" autoFocus />
          </div>
          <div className="flex gap-1">
            {(["all", "standard", "brand"] as ScopeFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`px-2 py-0.5 rounded text-[10px] border capitalize transition-colors ${
                  scope === s ? "bg-primary text-primary-foreground border-primary" : "bg-muted/60 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {s === "brand" ? "Brand-specific" : s} ({counts[s]})
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Source: {platformMeta[platform].source}
          </p>
        </div>

        <ScrollArea className="h-[330px]">
          <div className="p-1.5">
            {eventGroups.map((g) => {
              const items = list.filter((e) => e.group === g);
              if (!items.length) return null;
              return (
                <div key={g} className="mb-2">
                  <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{g}</p>
                  {items.map((e) => {
                    const twin = counterpartOf(e);
                    return (
                      <button
                        key={e.id}
                        className="w-full flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-primary/10 text-left group transition-colors"
                        onClick={() => { onSelect(e); setOpen(false); setQ(""); }}
                      >
                        <span className={`mt-0.5 h-5 w-5 rounded flex items-center justify-center border ${platformMeta[e.platform].cls}`}>
                          {platformMeta[e.platform].icon}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-foreground leading-tight block truncate">{e.name}</span>
                          <span className="block text-[10px] font-mono text-muted-foreground truncate">{e.code}</span>
                          <span className="flex flex-wrap gap-1 mt-1">
                            <span className={`px-1 rounded border text-[9px] ${scopeMeta[e.scope].cls}`}>{scopeMeta[e.scope].label}</span>
                            <span className="px-1 rounded border border-border bg-muted/50 text-[9px] text-muted-foreground">
                              {e.properties.length} field{e.properties.length === 1 ? "" : "s"}
                            </span>
                            {twin && (
                              <span className="px-1 rounded border border-emerald-200 bg-emerald-50 text-[9px] text-emerald-700 flex items-center gap-0.5">
                                <Link2 className="h-2.5 w-2.5" /> {platformMeta[twin.platform].label}: {twin.code}
                              </span>
                            )}
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

/* ────────────────────────── Builder ────────────────────────── */

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
  platform: Platform | "both";
  setPlatform: (p: Platform) => void;
  joiner: Joiner;
  setJoiner: (j: Joiner) => void;
  sequenced: boolean;
  setSequenced: (v: boolean) => void;
}) => {
  const activePlatform: Platform = platform === "app" ? "app" : "web";
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const eventById = (id: string) => catalogEvents.find((e) => e.id === id);

  const addCondition = (e: CatalogEvent) =>
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

  const usedPlatforms = useMemo(() => {
    const s = new Set<Platform>();
    conditions.forEach((c) => { const e = eventById(c.eventId); if (e) s.add(e.platform); });
    return Array.from(s);
  }, [conditions]);

  const brandCount = conditions.filter((c) => eventById(c.eventId)?.scope === "brand").length;

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
              <TooltipTrigger asChild><Info className="h-3 w-3 text-muted-foreground cursor-help" /></TooltipTrigger>
              <TooltipContent className="max-w-[300px] text-xs">
                Web and App keep separate event catalogs, because each platform ships its own event codes,
                names and payload fields. Events shared across both are linked by a mapped standard concept.
              </TooltipContent>
            </Tooltip>
            <span className="text-[11px] text-muted-foreground ml-1">
              {conditions.length} {conditions.length === 1 ? "condition" : "conditions"}
              {usedPlatforms.length === 2 && " · web + app"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <MappingDialog mappings={mappings} onMap={(id, canonical) => setMappings((m) => ({ ...m, [id]: canonical }))} />

            {/* Catalog selector — Web and App are separate catalogs, not a merged scope */}
            <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
              {(["web", "app"] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    activePlatform === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {platformMeta[p].icon}
                  {platformMeta[p].label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <Repeat className="h-3.5 w-3.5 text-muted-foreground" />
              <Label className="text-[11px] font-medium cursor-pointer">In sequence</Label>
              <Switch checked={sequenced} onCheckedChange={setSequenced} />
            </div>
          </div>
        </div>

        {/* Catalog summary strip */}
        <div className="flex flex-wrap items-center gap-4 px-4 py-2 border-b border-border bg-background/60 text-[11px] text-muted-foreground">
          {(["web", "app"] as Platform[]).map((p) => {
            const evs = eventsFor(p);
            return (
              <span key={p} className="flex items-center gap-1.5">
                <span className={`h-4 w-4 rounded flex items-center justify-center border ${platformMeta[p].cls}`}>{platformMeta[p].icon}</span>
                <span className="text-foreground font-medium">{platformMeta[p].label}</span>
                <span>{evs.length} events</span>
                <span className="text-blue-600">{evs.filter((e) => e.scope === "standard").length} standard</span>
                <span className="text-amber-600">{evs.filter((e) => e.scope === "brand").length} brand</span>
              </span>
            );
          })}
          <span className="ml-auto flex items-center gap-1.5">
            <Layers className="h-3 w-3" /> Cross-platform conditions combine with {sequenced ? "THEN" : joiner}
          </span>
        </div>

        {brandCount > 0 && (
          <div className="flex items-start gap-2 px-4 py-2 bg-amber-50 border-b border-amber-200 text-[11px] text-amber-800">
            <Building2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>
              {brandCount} brand-specific event{brandCount > 1 ? "s are" : " is"} used. These run only for this brand's
              {" "}{platformMeta[activePlatform].label} implementation and are excluded from cross-platform templates
              until mapped in <span className="font-semibold">Brand event mapping</span>.
            </span>
          </div>
        )}

        <div className="p-4 space-y-0">
          {conditions.length === 0 && (
            <div className="border-2 border-dashed border-border rounded-xl py-10 text-center text-muted-foreground">
              <Zap className="h-8 w-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm font-medium">No behavioural conditions</p>
              <p className="text-xs mt-1 mb-4 max-w-sm mx-auto">
                Pick from the <span className="font-medium">Web</span> or <span className="font-medium">App</span> catalog —
                standard events like <span className="font-mono">add_to_cart</span> or brand events like{" "}
                <span className="font-mono">crown_redeem</span>.
              </p>
              <EventPicker
                platform={activePlatform}
                setPlatform={setPlatform}
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
            const twin = counterpartOf(ev);
            const mappedTo = mappings[ev.id] && mappings[ev.id] !== "unmapped"
              ? canonicalOptions.find(([id]) => id === mappings[ev.id])?.[1]
              : null;
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
                                ? j === "AND" ? "bg-blue-500 text-white" : "bg-teal-500 text-white"
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
                    <span className="text-[10px] font-mono text-muted-foreground">{ev.code}</span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">{ev.group}</Badge>
                    <Badge variant="outline" className={`text-[9px] h-4 px-1.5 ${meta.cls}`}>{meta.label}</Badge>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className={`text-[9px] h-4 px-1.5 cursor-help ${scopeMeta[ev.scope].cls}`}>
                          {scopeMeta[ev.scope].label}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[260px] text-xs">{scopeMeta[ev.scope].hint}</TooltipContent>
                    </Tooltip>
                    {mappedTo && (
                      <Badge variant="outline" className="text-[9px] h-4 px-1.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                        mapped → {mappedTo}
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto text-muted-foreground hover:text-destructive" onClick={() => remove(c.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Cross-platform equivalence */}
                  {twin ? (
                    <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-emerald-50/60 border-b border-emerald-200 text-[11px] text-emerald-800">
                      <Link2 className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>
                        Same behaviour is tracked on {platformMeta[twin.platform].label} as{" "}
                        <span className="font-mono font-semibold">{twin.code}</span> ({twin.name}).
                      </span>
                      {!conditions.some((x) => x.eventId === twin.id) && (
                        <Button
                          variant="outline" size="sm"
                          className="h-6 gap-1 text-[10px] ml-auto border-emerald-300 bg-background hover:bg-emerald-100"
                          onClick={() => addCondition(twin)}
                        >
                          <Plus className="h-3 w-3" /> Add {platformMeta[twin.platform].label} condition
                        </Button>
                      )}
                    </div>
                  ) : ev.scope === "brand" ? (
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50/70 border-b border-amber-200 text-[11px] text-amber-800">
                      <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>
                        Brand-specific to {meta.label} — no equivalent event exists on the other platform.
                        Add a separate {meta.label === "Web" ? "App" : "Web"} condition if that journey is tracked there.
                      </span>
                    </div>
                  ) : null}

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

                    {/* Event property filters — fields come from the event payload schema */}
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
                                <SelectTrigger className="h-7 text-[11px] w-[170px] bg-background"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {ev.properties.map((x) => (
                                    <SelectItem key={x.id} value={x.id}>
                                      {x.name} <span className="text-muted-foreground">· {x.type}</span>
                                    </SelectItem>
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
                        <span className="text-muted-foreground font-normal">({ev.properties.length} fields in payload)</span>
                      </Button>
                    ) : (
                      <p className="text-[10px] text-muted-foreground">
                        No payload fields captured for <span className="font-mono">{ev.code}</span> on {meta.label} — only frequency and time window can be used.
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
                platform={activePlatform}
                setPlatform={setPlatform}
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
