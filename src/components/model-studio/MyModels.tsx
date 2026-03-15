import { useState } from "react";
import { Search, Plus, Play, Pencil, Eye, Trash2, Loader2, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { myModels } from "@/data/modelStudioMockData";

const statusConfig: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  Completed: { icon: CheckCircle2, className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', label: 'Completed ✓' },
  Running: { icon: Loader2, className: 'bg-blue-500/10 text-blue-600 border-blue-500/20 animate-pulse', label: 'Running ⟳' },
  Scheduled: { icon: Clock, className: 'bg-amber-500/10 text-amber-600 border-amber-500/20', label: 'Scheduled 🕐' },
  Failed: { icon: XCircle, className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Failed ✗' },
  Draft: { icon: FileText, className: 'bg-muted text-muted-foreground border-border', label: 'Draft' },
};

interface MyModelsProps {
  onViewResults: () => void;
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
        <Button size="sm" className="gap-1.5" onClick={onNewModel}><Plus className="h-3.5 w-3.5" />New Model</Button>
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

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-xs">Model Name</TableHead>
              <TableHead className="text-xs">Base Model</TableHead>
              <TableHead className="text-xs">Data Source</TableHead>
              <TableHead className="text-xs">Last Run</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs text-center">Segments</TableHead>
              <TableHead className="text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(m => {
              const sc = statusConfig[m.status];
              return (
                <TableRow key={m.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="text-sm font-medium">{m.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.baseModel}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.dataSource}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{m.lastRun}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(sc.className, 'text-[10px] gap-1')}>
                      {m.status === 'Running' && <Loader2 className="h-3 w-3 animate-spin" />}
                      {sc.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-center">{m.segmentsGenerated || '—'}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Play className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                      {m.status === 'Completed' && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onViewResults}><Eye className="h-3 w-3" /></Button>}
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
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

import { cn } from "@/lib/utils";
