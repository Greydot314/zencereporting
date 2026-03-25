import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, Activity, Plus, ArrowRight } from "lucide-react";
import { mockSegmentGroups } from "@/data/segmentGroupsMockData";
import { GroupDrilldownModal } from "@/components/segcon/GroupDrilldownModal";
import { CreateGroupModal } from "@/components/segcon/CreateGroupModal";
import type { SegmentGroup } from "@/data/segmentGroupsMockData";

const SegmentGroups = () => {
  const [filter, setFilter] = useState<"All" | "Active" | "Draft">("All");
  const [selectedGroup, setSelectedGroup] = useState<SegmentGroup | null>(null);
  const [drilldownOpen, setDrilldownOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() =>
    filter === "All" ? mockSegmentGroups : mockSegmentGroups.filter(g => g.status === filter),
    [filter]
  );

  const stats = useMemo(() => {
    const active = mockSegmentGroups.filter(g => g.status === "Active").length;
    const totalSegs = mockSegmentGroups.reduce((s, g) => s + g.segments.length, 0);
    return { total: mockSegmentGroups.length, active, totalSegs };
  }, []);

  const statCards = [
    { label: "Total Groups", value: stats.total, icon: Layers },
    { label: "Active Groups", value: stats.active, icon: Activity },
    { label: "Total Segments", value: stats.totalSegs, icon: Layers },
  ];

  const openDrilldown = (group: SegmentGroup) => {
    setSelectedGroup(group);
    setDrilldownOpen(true);
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Segment Groups</h1>
          <Button className="gap-2" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> Create Group
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {statCards.map(s => (
            <Card key={s.label}>
              <CardContent className="pt-5 pb-4">
                <s.icon className="h-4 w-4 text-muted-foreground mb-2" />
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(["All", "Active", "Draft"] as const).map(f => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f}
            </Button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(group => (
            <Card
              key={group.id}
              className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary/20"
              onClick={() => openDrilldown(group)}
            >
              <CardContent className="pt-5 pb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground truncate">{group.name}</h3>
                  <Badge variant={group.status === "Active" ? "default" : "secondary"} className="text-[10px] flex-shrink-0">
                    {group.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Created {group.createdDate}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> {group.segments.length} segments</span>
                  <span>Waterfall · Mutually exclusive</span>
                </div>

                {/* Priority list */}
                <div className="space-y-1">
                  {group.segments.map((seg, i) => (
                    <div key={seg.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px] font-bold w-7 h-5 flex items-center justify-center flex-shrink-0 px-0">
                        P{i + 1}
                      </Badge>
                      <span className="truncate">{seg.name}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  Click to view details <ArrowRight className="h-3 w-3" />
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Create card */}
          <Card className="cursor-pointer border-dashed hover:border-primary/30 transition-colors" onClick={() => setCreateOpen(true)}>
            <CardContent className="pt-5 pb-4 flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
              <Plus className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Create new segment group</p>
            </CardContent>
          </Card>
        </div>

        <GroupDrilldownModal group={selectedGroup} open={drilldownOpen} onOpenChange={setDrilldownOpen} />
        <CreateGroupModal open={createOpen} onOpenChange={setCreateOpen} />
      </div>
    </main>
  );
};

export default SegmentGroups;
