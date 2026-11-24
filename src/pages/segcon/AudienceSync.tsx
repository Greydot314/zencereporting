import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  CalendarClock,
  Check,
  CircleAlert,
  CircleCheck,
  Clock3,
  Facebook,
  Globe2,
  Link2,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Provider = "meta" | "google";
type SyncStatus = "Active" | "Paused" | "Needs attention" | "Completed";
type Frequency = "One-time" | "Daily" | "Weekly";
type AudienceAction = "create" | "add" | "remove";

interface Connector {
  provider: Provider;
  connected: boolean;
  accountName: string;
  accountId: string;
  verifiedAt: string;
}

interface SyncedAudience {
  id: number;
  segmentName: string;
  memberCount: string;
  provider: Provider;
  audienceName: string;
  action: AudienceAction;
  frequency: Frequency;
  lastSync: string;
  nextSync: string;
  status: SyncStatus;
  removeOnExit: boolean;
  identifiers: string[];
}

const segmentOptions = [
  { name: "Lapsed_Digital_Q1", members: "4,520" },
  { name: "Champions — Loyalty Tier", members: "8,932" },
  { name: "Winback_60_Days", members: "12,480" },
  { name: "New_23_Daily_Custom", members: "132" },
];

const providerNames: Record<Provider, string> = { meta: "Meta", google: "Google Ads" };
const providerAudienceOptions: Record<Provider, string[]> = {
  meta: ["Lapsed buyers — Meta", "Loyal members — Meta"],
  google: ["Dormant buyers — Customer Match", "VIP customers — Customer Match"],
};

const initialConnectors: Connector[] = [
  { provider: "meta", connected: true, accountName: "Zence Retail · Ad account", accountId: "•••• 8340", verifiedAt: "Today, 09:18 AM" },
  { provider: "google", connected: false, accountName: "", accountId: "", verifiedAt: "Not connected" },
];

const initialAudiences: SyncedAudience[] = [
  { id: 1, segmentName: "Lapsed_Digital_Q1", memberCount: "4,520", provider: "meta", audienceName: "Lapsed buyers — Mar'26", action: "create", frequency: "Daily", lastSync: "Today, 10:42 AM", nextSync: "Tomorrow, 09:00 AM", status: "Active", removeOnExit: true, identifiers: ["Email", "Mobile"] },
  { id: 2, segmentName: "Champions — Loyalty Tier", memberCount: "8,932", provider: "meta", audienceName: "High-value customers", action: "add", frequency: "Weekly", lastSync: "23 Nov, 09:00 AM", nextSync: "30 Nov, 09:00 AM", status: "Active", removeOnExit: false, identifiers: ["Email"] },
  { id: 3, segmentName: "Winback_60_Days", memberCount: "12,480", provider: "google", audienceName: "Dormant buyers — Customer Match", action: "add", frequency: "Daily", lastSync: "Yesterday, 04:18 PM", nextSync: "Reconnect to continue", status: "Needs attention", removeOnExit: true, identifiers: ["Email", "Mobile"] },
];

const actionLabels: Record<AudienceAction, string> = {
  create: "Create audience",
  add: "Add members",
  remove: "Remove members",
};

const statusClasses: Record<SyncStatus, string> = {
  Active: "border-primary/20 bg-primary/10 text-primary",
  Paused: "border-border bg-muted text-muted-foreground",
  "Needs attention": "border-destructive/20 bg-destructive/10 text-destructive",
  Completed: "border-[hsl(var(--atlas-success)/0.2)] bg-[hsl(var(--atlas-success)/0.1)] text-[hsl(var(--atlas-success))]",
};

function ProviderMark({ provider }: { provider: Provider }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground">
      {provider === "meta" ? <Facebook className="h-5 w-5" aria-hidden="true" /> : <span className="text-lg font-semibold">G</span>}
    </span>
  );
}

function SyncStatusBadge({ status }: { status: SyncStatus }) {
  const Icon = status === "Active" ? CircleCheck : status === "Needs attention" ? CircleAlert : status === "Completed" ? Check : Clock3;
  return (
    <Badge variant="outline" className={`gap-1.5 whitespace-nowrap font-medium ${statusClasses[status]}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status}
    </Badge>
  );
}

const AudienceSync = () => {
  const [connectors, setConnectors] = useState(initialConnectors);
  const [audiences, setAudiences] = useState(initialAudiences);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SyncedAudience | null>(null);
  const [selectedSegment, setSelectedSegment] = useState(segmentOptions[0].name);
  const [selectedProvider, setSelectedProvider] = useState<Provider>("meta");
  const [audienceAction, setAudienceAction] = useState<AudienceAction>("create");
  const [audienceName, setAudienceName] = useState("");
  const [existingAudience, setExistingAudience] = useState(providerAudienceOptions.meta[0]);
  const [frequency, setFrequency] = useState<Frequency>("Daily");
  const [syncTime, setSyncTime] = useState("09:00");
  const [syncDay, setSyncDay] = useState("Monday");
  const [removeOnExit, setRemoveOnExit] = useState(true);
  const [includeEmail, setIncludeEmail] = useState(true);
  const [includeMobile, setIncludeMobile] = useState(true);

  const connectedProviders = connectors.filter((connector) => connector.connected);
  const activeCount = audiences.filter((audience) => audience.status === "Active").length;
  const filteredAudiences = useMemo(() => audiences.filter((audience) => {
    const matchesSearch = `${audience.segmentName} ${audience.audienceName} ${providerNames[audience.provider]}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || audience.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  }), [audiences, search, statusFilter]);

  const selectedSegmentData = segmentOptions.find((segment) => segment.name === selectedSegment) ?? segmentOptions[0];

  const openCreateDialog = () => {
    const firstConnected = connectors.find((connector) => connector.connected);
    if (!firstConnected) {
      toast.error("Connect an ad account before creating an audience sync.");
      return;
    }
    setSelectedProvider(firstConnected.provider);
    setExistingAudience(providerAudienceOptions[firstConnected.provider][0]);
    setAudienceAction("create");
    setAudienceName("");
    setFrequency("Daily");
    setIsCreateOpen(true);
  };

  const handleConnect = (provider: Provider) => {
    setConnectors((current) => current.map((connector) => connector.provider === provider
      ? { ...connector, connected: true, accountName: provider === "meta" ? "Zence Retail · Ad account" : "Zence Retail · Ads account", accountId: provider === "meta" ? "•••• 8340" : "•••• 2176", verifiedAt: "Just now" }
      : connector));
    setAudiences((current) => current.map((audience) => audience.provider === provider && audience.status === "Needs attention"
      ? { ...audience, status: "Active", nextSync: "Tomorrow, 09:00 AM" }
      : audience));
    toast.success(`${providerNames[provider]} connected in the demo workspace.`);
  };

  const handleDisconnect = (provider: Provider) => {
    setConnectors((current) => current.map((connector) => connector.provider === provider
      ? { ...connector, connected: false, accountName: "", accountId: "", verifiedAt: "Not connected" }
      : connector));
    setAudiences((current) => current.map((audience) => audience.provider === provider && audience.status === "Active"
      ? { ...audience, status: "Needs attention", nextSync: "Reconnect to continue" }
      : audience));
    toast(`${providerNames[provider]} disconnected. Existing syncs need attention.`);
  };

  const handleCreateSync = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!includeEmail && !includeMobile) {
      toast.error("Choose at least one audience identifier.");
      return;
    }
    if (!connectors.find((connector) => connector.provider === selectedProvider)?.connected) {
      toast.error(`Connect ${providerNames[selectedProvider]} before creating this sync.`);
      return;
    }

    const nextAudienceName = audienceAction === "create" ? audienceName.trim() : existingAudience;
    if (!nextAudienceName) {
      toast.error("Enter a name for the new ad audience.");
      return;
    }

    const scheduleLabel = frequency === "Weekly" ? `${syncDay}, ${syncTime}` : `${frequency === "Daily" ? "Daily" : "One-time"}${frequency === "Daily" ? `, ${syncTime}` : ""}`;
    const newAudience: SyncedAudience = {
      id: Date.now(),
      segmentName: selectedSegment,
      memberCount: selectedSegmentData.members,
      provider: selectedProvider,
      audienceName: nextAudienceName,
      action: audienceAction,
      frequency,
      lastSync: frequency === "One-time" ? "Just now" : "Queued",
      nextSync: frequency === "One-time" ? "—" : scheduleLabel,
      status: frequency === "One-time" ? "Completed" : "Active",
      removeOnExit: frequency !== "One-time" && removeOnExit,
      identifiers: [includeEmail ? "Email" : "", includeMobile ? "Mobile" : ""].filter(Boolean),
    };
    setAudiences((current) => [newAudience, ...current]);
    setIsCreateOpen(false);
    toast.success(`${providerNames[selectedProvider]} audience sync ${frequency === "One-time" ? "started" : "scheduled"}.`);
  };

  const handleSyncNow = (audience: SyncedAudience) => {
    if (!connectors.find((connector) => connector.provider === audience.provider)?.connected) {
      toast.error(`Reconnect ${providerNames[audience.provider]} to sync this audience.`);
      return;
    }
    setAudiences((current) => current.map((item) => item.id === audience.id
      ? { ...item, status: "Active", lastSync: "Just now", nextSync: item.frequency === "One-time" ? "—" : "Tomorrow, 09:00 AM" }
      : item));
    toast.success(`${audience.segmentName} synced to ${providerNames[audience.provider]}.`);
  };

  const togglePaused = (audience: SyncedAudience) => {
    setAudiences((current) => current.map((item) => item.id === audience.id
      ? { ...item, status: item.status === "Paused" ? "Active" : "Paused" }
      : item));
    toast.success(audience.status === "Paused" ? "Audience sync resumed." : "Audience sync paused.");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setAudiences((current) => current.filter((audience) => audience.id !== deleteTarget.id));
    toast.success(`Sync for ${deleteTarget.segmentName} removed.`);
    setDeleteTarget(null);
  };

  const updateProviderSelection = (provider: Provider) => {
    setSelectedProvider(provider);
    setExistingAudience(providerAudienceOptions[provider][0]);
  };

  const renderActions = (audience: SyncedAudience) => (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label={`Sync ${audience.segmentName} now`}
        title="Sync now"
        onClick={() => handleSyncNow(audience)}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`More actions for ${audience.segmentName}`}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {audience.status === "Paused" ? (
            <DropdownMenuItem className="gap-2" onSelect={() => togglePaused(audience)}><Play className="h-4 w-4" /> Resume sync</DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="gap-2" onSelect={() => togglePaused(audience)}><Pause className="h-4 w-4" /> Pause sync</DropdownMenuItem>
          )}
          <DropdownMenuItem className="gap-2" onSelect={() => handleSyncNow(audience)}><RefreshCw className="h-4 w-4" /> Sync now</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onSelect={() => setDeleteTarget(audience)}><Trash2 className="h-4 w-4" /> Remove sync</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-[1400px] space-y-7 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Segcon</span><ArrowRight className="h-3.5 w-3.5" /><span className="text-foreground">Audience Sync</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">Audience Sync</h1>
              <Badge variant="outline" className="font-normal text-muted-foreground">Demo workspace</Badge>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground">Connect ad accounts and keep Segcon audiences aligned with the people you want to reach.</p>
          </div>
          <Button className="gap-2 self-start sm:self-auto" onClick={openCreateDialog} disabled={connectedProviders.length === 0}>
            <Plus className="h-4 w-4" /> New audience sync
          </Button>
        </header>

        <section aria-label="Audience sync overview" className="grid grid-cols-1 divide-y border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-3 py-4 sm:px-5 sm:first:pl-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary"><RefreshCw className="h-4 w-4" /></span>
            <div><p className="text-xl font-semibold leading-none">{activeCount}</p><p className="mt-1.5 text-xs text-muted-foreground">Active syncs</p></div>
          </div>
          <div className="flex items-center gap-3 py-4 sm:px-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground"><Link2 className="h-4 w-4" /></span>
            <div><p className="text-xl font-semibold leading-none">{connectedProviders.length} <span className="text-sm font-normal text-muted-foreground">of 2</span></p><p className="mt-1.5 text-xs text-muted-foreground">Connected destinations</p></div>
          </div>
          <div className="flex items-center gap-3 py-4 sm:px-5 sm:last:pr-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground"><CalendarClock className="h-4 w-4" /></span>
            <div><p className="text-sm font-medium leading-none">Tomorrow, 09:00 AM</p><p className="mt-1.5 text-xs text-muted-foreground">Next scheduled sync</p></div>
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="destinations-heading">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="destinations-heading" className="text-base font-semibold">Destinations</h2>
              <p className="mt-1 text-sm text-muted-foreground">Connect an account before creating a sync for that platform.</p>
            </div>
            <p className="text-xs text-muted-foreground">Connection actions are simulated in this demo.</p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {connectors.map((connector) => (
              <article key={connector.provider} className="flex flex-col gap-4 border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex min-w-0 items-start gap-3">
                  <ProviderMark provider={connector.provider} />
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{providerNames[connector.provider]}</h3>
                      {connector.connected ? (
                        <Badge variant="outline" className="gap-1 border-[hsl(var(--atlas-success)/0.2)] bg-[hsl(var(--atlas-success)/0.1)] text-[hsl(var(--atlas-success))]"><CircleCheck className="h-3 w-3" /> Connected</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Not connected</Badge>
                      )}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{connector.connected ? `${connector.accountName} · ${connector.accountId}` : "Connect an ad account to send Segcon audiences."}</p>
                    <p className="text-xs text-muted-foreground">{connector.connected ? `Last verified ${connector.verifiedAt}` : "No audience data can be sent until connected."}</p>
                  </div>
                </div>
                {connector.connected ? (
                  <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleConnect(connector.provider)}><RefreshCw className="h-3.5 w-3.5" /> Reconnect</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => handleDisconnect(connector.provider)}>Disconnect</Button>
                  </div>
                ) : (
                  <Button size="sm" className="gap-2 self-start sm:self-auto" onClick={() => handleConnect(connector.provider)}><Link2 className="h-4 w-4" /> Connect account</Button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4" aria-labelledby="synced-audiences-heading">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="synced-audiences-heading" className="text-base font-semibold">Synced audiences</h2>
                <Badge variant="secondary" className="font-normal">{audiences.length}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Manage which Segcon segments are sent, and how often they stay current.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input aria-label="Search synced audiences" placeholder="Search segments" value={search} onChange={(event) => setSearch(event.target.value)} className="h-9 pl-9" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger aria-label="Filter by sync status" className="h-9 w-full sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="needs attention">Needs attention</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredAudiences.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-border px-5 py-12 text-center">
              <Users className="mb-3 h-8 w-8 text-muted-foreground" />
              <h3 className="font-medium">No synced audiences found</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Try another search or create a sync from one of your Segcon segments.</p>
              <Button variant="outline" className="mt-4 gap-2" onClick={openCreateDialog} disabled={connectedProviders.length === 0}><Plus className="h-4 w-4" /> New audience sync</Button>
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden border border-border lg:block">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="min-w-[210px]">Segcon segment</TableHead>
                      <TableHead className="min-w-[200px]">Ad audience</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Last sync</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAudiences.map((audience) => (
                      <TableRow key={audience.id}>
                        <TableCell>
                          <p className="font-medium text-foreground">{audience.segmentName}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{audience.memberCount} segment members</p>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{audience.audienceName}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{actionLabels[audience.action]}{audience.removeOnExit ? " · Remove on exit" : ""}</p>
                        </TableCell>
                        <TableCell><span className="inline-flex items-center gap-2"><ProviderMark provider={audience.provider} /><span>{providerNames[audience.provider]}</span></span></TableCell>
                        <TableCell>
                          <p>{audience.frequency}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{audience.nextSync}</p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{audience.lastSync}</TableCell>
                        <TableCell><SyncStatusBadge status={audience.status} /></TableCell>
                        <TableCell>{renderActions(audience)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="space-y-3 lg:hidden">
                {filteredAudiences.map((audience) => (
                  <article key={audience.id} className="space-y-4 border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="break-words font-medium">{audience.segmentName}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{audience.memberCount} segment members</p>
                      </div>
                      <div className="shrink-0">{renderActions(audience)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
                      <div className="min-w-0"><p className="text-xs text-muted-foreground">Ad audience</p><p className="mt-1 break-words font-medium">{audience.audienceName}</p></div>
                      <div><p className="text-xs text-muted-foreground">Destination</p><p className="mt-1 flex items-center gap-2"><span>{providerNames[audience.provider]}</span></p></div>
                      <div><p className="text-xs text-muted-foreground">Frequency</p><p className="mt-1">{audience.frequency}</p><p className="text-xs text-muted-foreground">{audience.nextSync}</p></div>
                      <div><p className="text-xs text-muted-foreground">Last sync</p><p className="mt-1">{audience.lastSync}</p></div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                      <SyncStatusBadge status={audience.status} />
                      <span className="text-xs text-muted-foreground">{actionLabels[audience.action]}{audience.removeOnExit ? " · Remove on exit" : ""}</span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <div className="flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Demo only: accounts and sync actions are simulated; no customer data is sent. In production, selected identifiers such as email or mobile should be hashed before delivery to an ad platform.</p>
        </div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto p-0">
          <form onSubmit={handleCreateSync}>
            <DialogHeader className="border-b border-border px-5 py-5 text-left sm:px-6">
              <DialogTitle>Create audience sync</DialogTitle>
              <DialogDescription>Choose a Segcon segment, destination, and update schedule.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 px-5 py-5 sm:px-6">
              <section className="space-y-3" aria-labelledby="source-heading">
                <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">1</span><h3 id="source-heading" className="text-sm font-semibold">Choose a segment</h3></div>
                <div className="pl-8">
                  <Label htmlFor="segment-select">Segcon segment</Label>
                  <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                    <SelectTrigger id="segment-select" className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>{segmentOptions.map((segment) => <SelectItem key={segment.name} value={segment.name}>{segment.name} · {segment.members} members</SelectItem>)}</SelectContent>
                  </Select>
                  <p className="mt-2 text-xs text-muted-foreground">{selectedSegmentData.members} members currently qualify. Counts are illustrative.</p>
                </div>
              </section>

              <section className="space-y-3" aria-labelledby="destination-heading">
                <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">2</span><h3 id="destination-heading" className="text-sm font-semibold">Choose a destination</h3></div>
                <div className="space-y-3 pl-8">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {(["meta", "google"] as Provider[]).map((provider) => {
                      const connector = connectors.find((item) => item.provider === provider);
                      const isConnected = connector?.connected ?? false;
                      return (
                        <button
                          key={provider}
                          type="button"
                          disabled={!isConnected}
                          onClick={() => updateProviderSelection(provider)}
                          className={`flex min-w-0 items-center gap-3 border p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${selectedProvider === provider ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
                        >
                          <ProviderMark provider={provider} />
                          <span className="min-w-0 flex-1"><span className="block font-medium">{providerNames[provider]}</span><span className="block truncate text-xs text-muted-foreground">{isConnected ? connector?.accountName : "Connect first"}</span></span>
                          {selectedProvider === provider && <Check className="h-4 w-4 shrink-0 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                  {connectors.some((connector) => !connector.connected) && <p className="text-xs text-muted-foreground">Google Ads is unavailable until its account is connected above.</p>}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="audience-action">Audience action</Label>
                      <Select value={audienceAction} onValueChange={(value) => setAudienceAction(value as AudienceAction)}>
                        <SelectTrigger id="audience-action" className="mt-2"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="create">Create new audience</SelectItem>
                          <SelectItem value="add">Add members to existing</SelectItem>
                          <SelectItem value="remove">Remove members from existing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="audience-name">{audienceAction === "create" ? "New audience name" : "Existing ad audience"}</Label>
                      {audienceAction === "create" ? (
                        <Input id="audience-name" className="mt-2" placeholder="e.g. Lapsed buyers · Q2" value={audienceName} onChange={(event) => setAudienceName(event.target.value)} required />
                      ) : (
                        <Select value={existingAudience} onValueChange={setExistingAudience}>
                          <SelectTrigger id="audience-name" className="mt-2"><SelectValue /></SelectTrigger>
                          <SelectContent>{providerAudienceOptions[selectedProvider].map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3" aria-labelledby="schedule-heading">
                <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">3</span><h3 id="schedule-heading" className="text-sm font-semibold">Set sync frequency</h3></div>
                <div className="space-y-3 pl-8">
                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
                    <div>
                      <Label htmlFor="frequency-select">Frequency</Label>
                      <Select value={frequency} onValueChange={(value) => setFrequency(value as Frequency)}>
                        <SelectTrigger id="frequency-select" className="mt-2"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="One-time">One-time</SelectItem>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {frequency !== "One-time" && (
                      <div>
                        <Label htmlFor="sync-time">Run time</Label>
                        <Input id="sync-time" type="time" className="mt-2" value={syncTime} onChange={(event) => setSyncTime(event.target.value)} />
                      </div>
                    )}
                  </div>
                  {frequency === "Weekly" && (
                    <div>
                      <Label htmlFor="sync-day">Run on</Label>
                      <Select value={syncDay} onValueChange={setSyncDay}>
                        <SelectTrigger id="sync-day" className="mt-2"><SelectValue /></SelectTrigger>
                        <SelectContent>{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => <SelectItem key={day} value={day}>{day}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}
                  {frequency !== "One-time" && audienceAction !== "remove" && (
                    <div className="flex items-start justify-between gap-4 border border-border p-3">
                      <div className="flex gap-2.5">
                        <ArrowDownToLine className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div><Label htmlFor="remove-on-exit" className="cursor-pointer">Remove people when they leave this segment</Label><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Keeps the ad audience aligned as membership changes.</p></div>
                      </div>
                      <Switch id="remove-on-exit" checked={removeOnExit} onCheckedChange={setRemoveOnExit} aria-label="Remove members when they leave this segment" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Identifiers to match</Label>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      <label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={includeEmail} onCheckedChange={(checked) => setIncludeEmail(checked === true)} /> <span className="flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5 text-muted-foreground" /> Email</span></label>
                      <label className="flex cursor-pointer items-center gap-2 text-sm"><Checkbox checked={includeMobile} onCheckedChange={(checked) => setIncludeMobile(checked === true)} /> <span className="flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5 text-muted-foreground" /> Mobile</span></label>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex items-start gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Only selected identifiers are included. In a live integration, email and mobile values should be hashed before delivery. This demo sends no data.</p>
              </div>
            </div>
            <DialogFooter className="border-t border-border px-5 py-4 sm:px-6">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button type="submit" className="gap-2"><Plus className="h-4 w-4" /> {frequency === "One-time" ? "Start sync" : "Schedule sync"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md">
          <DialogHeader className="text-left">
            <DialogTitle>Remove audience sync?</DialogTitle>
            <DialogDescription>“{deleteTarget?.segmentName}” will no longer update its ad audience. The audience already in the ad account will remain there.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Keep sync</Button>
            <Button variant="destructive" onClick={confirmDelete}>Remove sync</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AudienceSync;