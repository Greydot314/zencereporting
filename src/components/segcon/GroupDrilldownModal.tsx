import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Layers, Calendar, Info } from "lucide-react";
import type { SegmentGroup } from "@/data/segmentGroupsMockData";

interface GroupDrilldownModalProps {
  group: SegmentGroup | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GroupDrilldownModal = ({ group, open, onOpenChange }: GroupDrilldownModalProps) => {
  if (!group) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 flex-wrap">
            <DialogTitle className="text-lg">{group.name}</DialogTitle>
            <Badge variant={group.status === "Active" ? "default" : "secondary"} className="text-[10px]">
              {group.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> {group.segments.length} segments</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {group.createdDate}</span>
          </div>
        </DialogHeader>

        {/* Priority list with connectors */}
        <div className="mt-6 space-y-0">
          <p className="text-sm font-semibold text-foreground mb-3">Priority Order</p>
          {group.segments.map((seg, i) => {
            const priorityLabels = group.segments.slice(0, i).map((_, j) => `P${j + 1}`);
            return (
              <div key={seg.id}>
                {i > 0 && (
                  <div className="flex items-center gap-2 py-1.5 pl-5">
                    <div className="w-px h-5 bg-border" />
                    <span className="text-[10px] text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded">
                      NOT IN {priorityLabels.join(", ")}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
                  <Badge variant="outline" className="text-[10px] font-bold w-8 h-6 flex items-center justify-center flex-shrink-0 px-0">
                    P{i + 1}
                  </Badge>
                  <p className="text-sm font-medium text-foreground truncate">{seg.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info note */}
        <div className="mt-6 flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border">
          <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Waterfall exclusion runs at campaign execution time. Actual reach per segment will be available in campaign reports.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
