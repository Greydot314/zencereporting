import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { catalogModels, comparisonFields } from "@/data/modelStudioMockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: Set<string>;
}

export const CompareModal = ({ open, onOpenChange, selectedIds }: CompareModalProps) => {
  const selected = catalogModels.filter(m => selectedIds.has(m.id));

  const getFieldValue = (modelId: string, field: any) => {
    const key = modelId === 'rfm' ? 'rfm' : modelId === 'kmeans' ? 'kmeans' : modelId === 'churn' ? 'churn' : modelId === 'clv' ? 'clv' : modelId === 'product-propensity' ? 'product' : modelId === 'demo-behavioral' ? 'hybrid' : modelId === 'custom-sql' ? 'sql' : 'auto';
    return field[key] || '—';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Compare Models</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[160px] text-xs font-semibold">Criteria</TableHead>
                {selected.map(m => (
                  <TableHead key={m.id} className="min-w-[140px] text-xs font-semibold">{m.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFields.map(row => (
                <TableRow key={row.field}>
                  <TableCell className="text-xs font-medium text-muted-foreground">{row.field}</TableCell>
                  {selected.map(m => (
                    <TableCell key={m.id} className="text-xs">{getFieldValue(m.id, row)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
