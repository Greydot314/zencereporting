import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, ArrowUp, ArrowDown } from "lucide-react";
import { availableSegments } from "@/data/segmentGroupsMockData";
import { toast } from "sonner";

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SelectedSegment {
  id: number;
  name: string;
}

export const CreateGroupModal = ({ open, onOpenChange }: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState("");
  const [selected, setSelected] = useState<SelectedSegment[]>([]);
  const [search, setSearch] = useState("");

  const filteredAvailable = useMemo(() => {
    const selectedIds = new Set(selected.map(s => s.id));
    return availableSegments
      .filter(s => !selectedIds.has(s.id))
      .filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  }, [selected, search]);

  const addSegment = (seg: { id: number; name: string }) => {
    setSelected(prev => [...prev, { id: seg.id, name: seg.name }]);
    setSearch("");
  };

  const removeSegment = (id: number) => {
    setSelected(prev => prev.filter(s => s.id !== id));
  };

  const moveSegment = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= selected.length) return;
    const copy = [...selected];
    [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
    setSelected(copy);
  };

  const handleSave = () => {
    if (!groupName.trim() || selected.length < 2) {
      toast.error("Enter a group name and add at least 2 segments.");
      return;
    }
    toast.success(`Group "${groupName}" saved.`);
    resetAndClose();
  };

  const resetAndClose = () => {
    setGroupName("");
    setSelected([]);
    setSearch("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Segment Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Group Name</label>
            <Input placeholder="e.g. Q2 Win-Back Campaign" value={groupName} onChange={e => setGroupName(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Add Segments</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search segments…" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {search && filteredAvailable.length > 0 && (
              <div className="border border-border rounded-md bg-popover max-h-40 overflow-y-auto">
                {filteredAvailable.map(seg => (
                  <button key={seg.id} className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors text-foreground" onClick={() => addSegment(seg)}>
                    {seg.name}
                  </button>
                ))}
              </div>
            )}
            {search && filteredAvailable.length === 0 && (
              <p className="text-xs text-muted-foreground px-1">No matching segments found.</p>
            )}
          </div>

          {selected.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Priority Order</label>
              <div className="space-y-1">
                {selected.map((seg, i) => (
                  <div key={seg.id} className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card">
                    <Badge variant="outline" className="text-[10px] font-bold w-7 h-5 flex items-center justify-center flex-shrink-0 px-0">
                      P{i + 1}
                    </Badge>
                    <span className="text-sm text-foreground flex-1 truncate">{seg.name}</span>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-6 w-6" disabled={i === 0} onClick={() => moveSegment(i, -1)}>
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" disabled={i === selected.length - 1} onClick={() => moveSegment(i, 1)}>
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeSegment(seg.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={resetAndClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};