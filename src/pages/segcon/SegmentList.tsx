import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Archive, MoreVertical, RefreshCw, Download, Globe, ChevronDown, Smartphone, Mail, Users, BarChart3 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SegmentKpiAnalysis from "@/components/segcon/SegmentKpiAnalysis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Segment {
  id: number;
  name: string;
  type: string;
  createdBy: string;
  customers: { total: number; mobile: number; email: number } | null;
  expiryDate: string;
  lastRefresh: string | null;
  active: boolean;
}

const mockSegments: Segment[] = [
  { id: 147, name: "Testsegment_v2", type: "TagBased", createdBy: "Ashutosh", customers: null, expiryDate: "27-03-2026", lastRefresh: null, active: false },
  { id: 146, name: "New_23_Daily_Google", type: "Google", createdBy: "Shubham.Hiwale", customers: { total: 132, mobile: 98, email: 132 }, expiryDate: "25-03-2026", lastRefresh: "23-02-2026 13:09:47", active: true },
  { id: 145, name: "New_23_Daily_Meta", type: "Meta", createdBy: "Shubham.Hiwale", customers: { total: 132, mobile: 98, email: 132 }, expiryDate: "25-03-2026", lastRefresh: "23-02-2026 13:09:47", active: true },
  { id: 144, name: "New_23_Daily_Custom", type: "Custom", createdBy: "Shubham.Hiwale", customers: { total: 132, mobile: 112, email: 95 }, expiryDate: "25-03-2026", lastRefresh: "23-02-2026 13:09:47", active: true },
  { id: 143, name: "My_200_29_Custom", type: "Custom", createdBy: "Shubham.Hiwale", customers: null, expiryDate: "22-03-2026", lastRefresh: "20-02-2026 18:27:33", active: true },
  { id: 142, name: "New_Test_Base", type: "Custom", createdBy: "Shubham.Hiwale", customers: null, expiryDate: "22-03-2026", lastRefresh: "20-02-2026 18:25:41", active: true },
  { id: 141, name: "Without_Condition", type: "Custom", createdBy: "Shubham.Hiwale", customers: null, expiryDate: "22-03-2026", lastRefresh: "20-02-2026 18:21:43", active: true },
  { id: 140, name: "New_Test_Profile", type: "Custom", createdBy: "Shubham.Hiwale", customers: { total: 132, mobile: 120, email: 88 }, expiryDate: "22-03-2026", lastRefresh: "20-02-2026 19:02:12", active: true },
  { id: 139, name: "Text_Test_Segment", type: "Custom", createdBy: "Shubham.Hiwale", customers: null, expiryDate: "22-03-2026", lastRefresh: "20-02-2026 18:22:54", active: true },
  { id: 138, name: "Lapsed_Digital_Q1", type: "RFM", createdBy: "Ashutosh", customers: { total: 4520, mobile: 3800, email: 2100 }, expiryDate: "30-06-2026", lastRefresh: "01-03-2026 09:15:00", active: true },
];

const SegmentList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("creation");
  const [filterType, setFilterType] = useState("all");

  const filtered = mockSegments.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || s.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Segment</h1>
          <Button className="gap-2" onClick={() => navigate("/module/segcon/segments/create")}>
            <Plus className="h-4 w-4" /> Create New Segment
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Segments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="All Segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segment ({mockSegments.length})</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="Meta">Meta</SelectItem>
              <SelectItem value="TagBased">TagBased</SelectItem>
              <SelectItem value="RFM">RFM</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="gap-1.5 h-9">
            <Archive className="h-4 w-4" /> Archive
          </Button>

          <div className="ml-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[190px] h-9">
                <SelectValue placeholder="Sort by Creation Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creation">Sort by Creation Date</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="customers">Sort by Customers</SelectItem>
                <SelectItem value="lastRefresh">Sort by Last Refresh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-12 text-center">
                  <input type="checkbox" className="rounded border-border" />
                </TableHead>
                <TableHead className="text-xs font-semibold">Segment Name</TableHead>
                <TableHead className="text-xs font-semibold">Type</TableHead>
                <TableHead className="text-xs font-semibold">Created By</TableHead>
                <TableHead className="text-xs font-semibold text-center">Customers</TableHead>
                <TableHead className="text-xs font-semibold">Expiry Date</TableHead>
                <TableHead className="text-xs font-semibold">Last Refresh</TableHead>
                <TableHead className="text-xs font-semibold text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((seg) => (
                <TableRow key={seg.id} className="hover:bg-muted/20">
                  <TableCell className="text-center">
                    <input type="checkbox" className="rounded border-border" />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm text-foreground">{seg.name}</p>
                      <p className="text-[11px] text-muted-foreground">Segment ID- {seg.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-normal">{seg.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-primary font-medium">{seg.createdBy}</span>
                  </TableCell>
                  <TableCell>
                    {seg.customers ? (
                      <div className="flex items-center justify-center gap-3">
                        <Tooltip>
                          <TooltipTrigger className="flex items-center gap-1 text-sm">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-medium">{seg.customers.total.toLocaleString()}</span>
                          </TooltipTrigger>
                          <TooltipContent>Total customers</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Smartphone className="h-3 w-3" />
                            {seg.customers.mobile.toLocaleString()}
                          </TooltipTrigger>
                          <TooltipContent>Mobile reachable</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {seg.customers.email.toLocaleString()}
                          </TooltipTrigger>
                          <TooltipContent>Email reachable</TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground text-center block">–</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">{seg.expiryDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{seg.lastRefresh || "–"}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Switch checked={seg.active} />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Segment</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" /> Download Segment
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Globe className="h-4 w-4" /> Add to Meta
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Globe className="h-4 w-4" /> Add to Google
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default SegmentList;
