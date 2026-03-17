import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { catalogModels, comparisonFields } from "@/data/modelStudioMockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface CompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: Set<string>;
}

const keyMap: Record<string, string> = {
  rfm: 'rfm', kmeans: 'kmeans', churn: 'churn', clv: 'clv',
  'product-propensity': 'product', 'demo-behavioral': 'hybrid',
  'custom-sql': 'sql', 'auto-segment': 'auto',
};

const interpretabilityColor: Record<string, string> = {
  High: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Medium-High': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Low: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export const CompareModal = ({ open, onOpenChange, selectedIds }: CompareModalProps) => {
  const selected = catalogModels.filter(m => selectedIds.has(m.id));

  const getFieldValue = (modelId: string, field: any) => {
    const key = keyMap[modelId] || 'auto';
    return field[key] || '—';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-3">
          <DialogTitle className="text-base">Compare Models</DialogTitle>
          <p className="text-xs text-muted-foreground">Side-by-side comparison of {selected.length} models</p>
        </DialogHeader>
        <div className="overflow-x-auto px-6 pb-6">
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[160px] text-[11px] font-semibold uppercase tracking-wider py-3">Criteria</TableHead>
                  {selected.map(m => (
                    <TableHead key={m.id} className="min-w-[150px] text-[11px] font-semibold py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-foreground">{m.name}</span>
                        <Badge variant="outline" className="text-[9px] w-fit">{m.type}</Badge>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFields.map((row, idx) => (
                  <TableRow key={row.field} className={cn("hover:bg-muted/20 transition-colors", idx % 2 === 0 && "bg-muted/10")}>
                    <TableCell className="text-xs font-medium text-muted-foreground py-3">{row.field}</TableCell>
                    {selected.map(m => {
                      const val = getFieldValue(m.id, row);
                      const isInterpretability = row.field === 'Interpretability' || row.field === 'Accuracy Profile';
                      return (
                        <TableCell key={m.id} className="text-xs py-3">
                          {isInterpretability ? (
                            <Badge variant="outline" className={cn("text-[10px]", interpretabilityColor[val] || "")}>{val}</Badge>
                          ) : val}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
