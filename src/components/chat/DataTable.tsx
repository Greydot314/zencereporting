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
    <Card className="overflow-hidden glass border-border/50">
      {title && (
        <div className="px-4 py-3 border-b border-border/50">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30 border-border/50">
              {columns.map((col) => (
                <TableHead key={col} className="text-xs font-semibold text-muted-foreground py-3">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-secondary/20 border-border/50">
                {columns.map((col) => (
                  <TableCell key={col} className="text-sm py-3 text-foreground">
                    {typeof row[col] === 'string' && row[col].includes('%') ? (
                      <span className={row[col].startsWith('-') ? 'text-destructive' : row[col].startsWith('+') ? 'text-emerald-400' : ''}>
                        {row[col]}
                      </span>
                    ) : (
                      row[col]
                    )}
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
