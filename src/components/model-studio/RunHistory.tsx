import { useState } from "react";
import { Search, Loader2, CheckCircle2, XCircle, AlertTriangle, Eye, Play, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { runHistory } from "@/data/modelStudioMockData";

interface RunHistoryProps {
  onViewReport: () => void;
}

export const RunHistory = ({ onViewReport }: RunHistoryProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const filtered = runHistory.filter(r => {
    const matchSearch = r.modelName.toLowerCase().includes(search.toLowerCase()) || r.runId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search runs..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Running">Running</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <CalendarIcon className="h-3.5 w-3.5" />
              {dateFrom ? format(dateFrom, "MMM d") : "From"} — {dateTo ? format(dateTo, "MMM d") : "To"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3 flex gap-3" align="start">
            <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} className="pointer-events-auto" />
            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} className="pointer-events-auto" />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-xs">Run ID</TableHead>
              <TableHead className="text-xs">Model Name</TableHead>
              <TableHead className="text-xs">Triggered By</TableHead>
              <TableHead className="text-xs">Started At</TableHead>
              <TableHead className="text-xs">Duration</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs text-center">Segments</TableHead>
              <TableHead className="text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(r => (
              <TableRow key={r.runId} className="hover:bg-muted/20 transition-colors">
                <TableCell className="text-xs font-mono text-muted-foreground">{r.runId}</TableCell>
                <TableCell className="text-sm font-medium">{r.modelName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px] bg-muted">{r.triggeredBy.avatar}</AvatarFallback></Avatar>
                    <span className="text-xs">{r.triggeredBy.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.startedAt}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.duration}</TableCell>
                <TableCell>
                  {r.status === 'Completed' && <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] gap-1"><CheckCircle2 className="h-3 w-3" />Completed</Badge>}
                  {r.status === 'Running' && <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px] gap-1"><Loader2 className="h-3 w-3 animate-spin" />Running</Badge>}
                  {r.status === 'Failed' && (
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] gap-1"><XCircle className="h-3 w-3" />Failed</Badge>
                      {r.errorLog && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="text-[10px] text-destructive underline hover:no-underline flex items-center gap-0.5">
                              <AlertTriangle className="h-3 w-3" />View Error
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 text-xs p-3">
                            <p className="font-semibold text-destructive mb-1">Error Log</p>
                            <p className="text-muted-foreground">{r.errorLog}</p>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-xs text-center">{r.segmentsOutput || '—'}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    {r.status === 'Completed' && <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={onViewReport}><Eye className="h-3 w-3" />View Report</Button>}
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Play className="h-3 w-3" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
