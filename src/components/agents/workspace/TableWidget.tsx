interface TableWidgetProps {
  title: string;
  data: {
    columns: string[];
    rows: string[][];
  };
}

export const TableWidget = ({ title, data }: TableWidgetProps) => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h4>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50">
              {data.columns.map((col, i) => (
                <th key={i} className="px-3 py-2 text-left font-medium text-muted-foreground">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2 text-foreground">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
