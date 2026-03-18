import { useState } from "react";
import { Search, Plus, Play, Pencil, Eye, Trash2, Loader2, Clock, CheckCircle2, XCircle, FileText, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { myModels } from "@/data/modelStudioMockData";

const statusConfig: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  Completed: { icon: CheckCircle2, className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', label: 'Completed' },
  Running: { icon: Loader2, className: 'bg-blue-500/10 text-blue-600 border-blue-500/20', label: 'Running' },
  Scheduled: { icon: Clock, className: 'bg-amber-500/10 text-amber-600 border-amber-500/20', label: 'Scheduled' },
  Failed: { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Failed' },
  Draft: { icon: FileText, className: 'bg-muted text-muted-foreground border-border', label: 'Draft' },
};

interface MyModelsProps {
  onViewResults: (modelName?: string) => void;
  onNewModel: () => void;
}

export const MyModels = ({ onViewResults, onNewModel }: MyModelsProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = myModels.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.baseModel.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" className="gap-1.5 shadow-sm" onClick={onNewModel}><Plus className="h-3.5 w-3.5" />New Model</Button>
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search models..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            {Object.keys(statusConfig).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-b border-border">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">Model Name</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">Base Model</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">Data Source</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">Last Run</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">Status</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3 text-center">Segments</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(m => {
              const sc = statusConfig[m.status];
              const StatusIcon = sc.icon;
              return (
                <TableRow key={m.id} className="hover:bg-muted/30 transition-colors group">
                  <TableCell className="text-sm font-medium py-3.5">{m.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.baseModel}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.dataSource}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.lastRun}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(sc.className, 'text-[10px] gap-1 font-medium')}>
                      <StatusIcon className={cn("h-3 w-3", m.status === 'Running' && "animate-spin")} />
                      {sc.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {m.segmentsGenerated ? (
                      <Badge variant="outline" className="text-[11px] font-mono bg-muted/40">{m.segmentsGenerated}</Badge>
                    ) : <span className="text-xs text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2 text-xs"><Play className="h-3.5 w-3.5" />Run Again</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs"><Pencil className="h-3.5 w-3.5" />Edit Config</DropdownMenuItem>
                          {m.status === 'Completed' && (
                            <DropdownMenuItem className="gap-2 text-xs" onClick={() => onViewResults(m.name)}><Eye className="h-3.5 w-3.5" />View Results</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-xs text-destructive"><Trash2 className="h-3.5 w-3.5" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
