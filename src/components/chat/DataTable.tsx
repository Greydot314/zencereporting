import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DataTableProps {
  title?: string;
  columns: string[];
  data: Record<string, any>[];
  showTrends?: boolean;
}

export const DataTable = ({ title, columns, data, showTrends = false }: DataTableProps) => {
  const getTrendIcon = (value: any) => {
    if (typeof value !== "number") return null;
    if (value > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (value < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <Card className="p-4 bg-accent/20 border-primary/20 my-3 overflow-hidden">
      {title && (
        <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              {columns.map((col) => (
                <TableHead key={col} className="text-xs font-semibold text-foreground">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} className="border-border/30">
                {columns.map((col) => (
                  <TableCell key={col} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span>{row[col]}</span>
                      {showTrends && getTrendIcon(row[col])}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
