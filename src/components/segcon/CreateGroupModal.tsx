import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, X, ChevronRight, ArrowLeft } from "lucide-react";
import { availableSegments, SEGMENT_COLORS } from "@/data/segmentGroupsMockData";
import { CoverageBar } from "./CoverageBar";

interface SelectedSegment {
  id: number;
  name: string;
  rawCount: number;
}

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const computeWaterfall = (segments: SelectedSegment[]) => {
  // Simulate waterfall: each subsequent segment loses ~15-25% overlap with prior ones
  return segments.map((seg, i) => {
    const overlapRate = i === 0 ? 0 : Math.min(0.15 + i * 0.05, 0.35);
    const overlapRemoved = Math.round(seg.rawCount * overlapRate);
    return {
      ...seg,
      overlapRemoved,
      netCount: seg.rawCount - overlapRemoved,
    };
  });
};

export const CreateGroupModal = ({ open, onOpenChange }: CreateGroupModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [groupName, setGroupName] = useState("");
  const [mode, setMode] = useState<"waterfall" | "overlapping">("waterfall");
  const [selected, setSelected] = useState<SelectedSegment[]>([]);

  const waterfallResult = useMemo(() => computeWaterfall(selected), [selected]);
  const totalUnique = waterfallResult.reduce((s, seg) => s + seg.netCount, 0);
  const maxNet = Math.max(...waterfallResult.map(s => s.netCount), 1);

  const addSegment = (seg: { id: number; name: string; rawCount: number }) => {
    if (!selected.find(s => s.id === seg.id)) {
      setSelected([...selected, seg]);
    }
  };

  const removeSegment = (id: number) => {
    setSelected(selected.filter(s => s.id !== id));
  };

  const moveSegment = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= selected.length) return;
    const copy = [...selected];
    [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
    setSelected(copy);
  };

  const reset = () => {
    setStep(1);
    setGroupName("");
    setMode("waterfall");
    setSelected([]);
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const unusedSegments = availableSegments.filter(a => !selected.find(s => s.id === a.id));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Create Segment Group</DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">Step 1 of 2 — Configure</p>
            </DialogHeader>

            <div className="space-y-5 mt-4">
              {/* Group Name */}
              <div>
                <label className="text-sm font-medium text-foreground">Group Name</label>
                <Input
                  placeholder="e.g. Win-Back Q2 Campaign"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              {/* Mode */}
              <div>
                <label className="text-sm font-medium text-foreground">Resolution Mode</label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  <button
                    className={`p-3 rounded-lg border text-left transition-colors ${mode === "waterfall" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                    onClick={() => setMode("waterfall")}
                  >
                    <p className="text-sm font-medium text-foreground">Mutually Exclusive (Waterfall)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Higher priority segments exclude customers from lower ones</p>
                  </button>
                  <button
                    className={`p-3 rounded-lg border text-left transition-colors ${mode === "overlapping" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                    onClick={() => setMode("overlapping")}
                  >
                    <p className="text-sm font-medium text-foreground">Overlapping</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Customers can appear in multiple segments</p>
                  </button>
                </div>
              </div>

              {/* Selected segments */}
              <div>
                <label className="text-sm font-medium text-foreground">Segments ({selected.length})</label>
                {selected.length > 0 ? (
                  <div className="mt-1.5 space-y-1.5">
                    {waterfallResult.map((seg, i) => (
                      <div key={seg.id} className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card">
                        <Badge variant="outline" className="text-[10px] font-bold w-7 h-5 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length], color: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}>
                          P{i + 1}
                        </Badge>
                        <span className="text-sm font-medium text-foreground flex-1 truncate">{seg.name}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">{seg.rawCount.toLocaleString()}</span>
                        {mode === "waterfall" && (
                          <>
                            {seg.overlapRemoved > 0 && (
                              <span className="text-[10px] text-destructive tabular-nums">-{seg.overlapRemoved.toLocaleString()}</span>
                            )}
                            <span className="text-xs font-semibold text-foreground tabular-nums w-14 text-right">{seg.netCount.toLocaleString()}</span>
                          </>
                        )}
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSegment(i, -1)} disabled={i === 0}>
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveSegment(i, 1)} disabled={i === selected.length - 1}>
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeSegment(seg.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1.5">No segments added yet. Click below to add.</p>
                )}
              </div>

              {/* Available segments */}
              {unusedSegments.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Available Segments</label>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {unusedSegments.map(seg => (
                      <button
                        key={seg.id}
                        onClick={() => addSegment(seg)}
                        className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        {seg.name} · {seg.rawCount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => handleClose(false)}>Cancel</Button>
              <Button onClick={() => setStep(2)} disabled={!groupName.trim() || selected.length < 2} className="gap-1.5">
                Preview waterfall <ChevronRight className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{groupName}</DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">Step 2 of 2 — Preview Waterfall · {selected.length} segments</p>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Coverage bar */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Coverage Distribution</p>
                <CoverageBar segments={waterfallResult} height={8} />
                <div className="flex flex-wrap gap-3 mt-1">
                  {waterfallResult.map((seg, i) => (
                    <div key={seg.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} />
                      {seg.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Waterfall rows */}
              <div className="space-y-1">
                {waterfallResult.map((seg, i) => {
                  const fillPct = (seg.netCount / maxNet) * 100;
                  const overlapPct = seg.rawCount > 0 ? ((seg.overlapRemoved / seg.rawCount) * 100).toFixed(1) : "0";
                  const priorityLabels = waterfallResult.slice(0, i).map((_, j) => `P${j + 1}`);

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
                        <Badge variant="outline" className="text-[10px] font-bold w-8 h-6 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length], color: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}>
                          P{i + 1}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{seg.name}</p>
                          <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${fillPct}%`, backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} />
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

                <div className="flex items-center justify-between p-3 mt-2 rounded-lg bg-muted/50 border border-border">
                  <span className="text-sm font-semibold text-foreground">Total Unique Customers</span>
                  <span className="text-lg font-bold text-primary tabular-nums">{totalUnique.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <div className="flex-1" />
              <Button variant="secondary" onClick={() => handleClose(false)}>Save as Draft</Button>
              <Button onClick={() => handleClose(false)}>Create Group</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
