import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  title?: string;
  columns: string[];
  data: Record<string, any>[];
}

export const DataTable = ({ title, columns, data }: DataTableProps) => {
  return (
    <Card className="mt-3 overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              {columns.map((col) => (
                <TableHead key={col} className="text-xs font-medium text-muted-foreground py-2">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-accent/50">
                {columns.map((col) => (
                  <TableCell key={col} className="text-sm py-2">
                    {row[col]}
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
