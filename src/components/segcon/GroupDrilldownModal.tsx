import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Layers, Calendar } from "lucide-react";
import { SegmentGroup, SEGMENT_COLORS } from "@/data/segmentGroupsMockData";
import { CoverageBar } from "./CoverageBar";

interface GroupDrilldownModalProps {
  group: SegmentGroup | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GroupDrilldownModal = ({ group, open, onOpenChange }: GroupDrilldownModalProps) => {
  if (!group) return null;

  const totalUnique = group.segments.reduce((s, seg) => s + seg.netCount, 0);
  const maxNet = Math.max(...group.segments.map(s => s.netCount));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 flex-wrap">
            <DialogTitle className="text-lg">{group.name}</DialogTitle>
            <Badge variant={group.status === "Active" ? "default" : "secondary"} className="text-[10px]">
              {group.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> {group.segments.length} segments</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {totalUnique.toLocaleString()} unique</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {group.createdDate}</span>
          </div>
        </DialogHeader>

        {/* Coverage bar */}
        <div className="space-y-2 mt-4">
          <p className="text-xs font-medium text-muted-foreground">Coverage Distribution</p>
          <CoverageBar segments={group.segments} height={8} />
          <div className="flex flex-wrap gap-3 mt-1.5">
            {group.segments.map((seg, i) => (
              <div key={seg.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} />
                {seg.name}
              </div>
            ))}
          </div>
        </div>

        {/* Waterfall resolution */}
        <div className="mt-6 space-y-1">
          <p className="text-sm font-semibold text-foreground mb-3">Waterfall Resolution</p>
          {group.segments.map((seg, i) => {
            const fillPct = maxNet > 0 ? (seg.netCount / maxNet) * 100 : 0;
            const overlapPct = seg.rawCount > 0 ? ((seg.overlapRemoved / seg.rawCount) * 100).toFixed(1) : "0";
            const priorityLabels = group.segments.slice(0, i).map((_, j) => `P${j + 1}`);

            return (
              <div key={seg.id}>
                {/* Connector */}
                {i > 0 && (
                  <div className="flex items-center gap-2 py-1.5 pl-5">
                    <div className="w-px h-5 bg-border" />
                    <span className="text-[10px] text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded">
                      NOT IN {priorityLabels.join(", ")}
                    </span>
                  </div>
                )}

                {/* Segment row */}
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
                  <Badge variant="outline" className="text-[10px] font-bold w-8 h-6 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length], color: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}>
                    P{i + 1}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{seg.name}</p>
                    <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${fillPct}%`, backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 space-y-0.5">
                    <p className="text-xs text-muted-foreground">Raw: {seg.rawCount.toLocaleString()}</p>
                    {seg.overlapRemoved > 0 && (
                      <p className="text-[10px] text-destructive">-{seg.overlapRemoved.toLocaleString()} ({overlapPct}%)</p>
                    )}
                    <p className="text-sm font-bold text-foreground tabular-nums">{seg.netCount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          <div className="flex items-center justify-between p-3 mt-2 rounded-lg bg-muted/50 border border-border">
            <span className="text-sm font-semibold text-foreground">Total Unique Customers</span>
            <span className="text-lg font-bold text-primary tabular-nums">{totalUnique.toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
