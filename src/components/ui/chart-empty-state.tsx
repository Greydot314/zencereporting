import { cn } from "@/lib/utils";

interface ChartEmptyStateProps {
  className?: string;
  title?: string;
  description?: string;
  variant?: "bar" | "line" | "pie" | "table" | "general";
}

const BarDoodle = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="opacity-60">
    <rect x="10" y="50" width="14" height="30" rx="3" className="fill-muted-foreground/20" />
    <rect x="30" y="30" width="14" height="50" rx="3" className="fill-muted-foreground/15" />
    <rect x="50" y="40" width="14" height="40" rx="3" className="fill-muted-foreground/20" />
    <rect x="70" y="20" width="14" height="60" rx="3" className="fill-muted-foreground/15" />
    <rect x="90" y="45" width="14" height="35" rx="3" className="fill-muted-foreground/20" />
    {/* Doodle squiggle on top */}
    <path d="M8 18 Q20 5 35 15 T60 10 T85 18 T110 12" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 3" fill="none" strokeLinecap="round" className="opacity-40" />
    {/* Little star */}
    <circle cx="60" cy="10" r="2" className="fill-primary/30" />
    <circle cx="85" cy="18" r="1.5" className="fill-primary/20" />
  </svg>
);

const LineDoodle = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="opacity-60">
    {/* Grid dots */}
    {[20, 40, 60, 80, 100].map(x => 
      [25, 45, 65].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1" className="fill-muted-foreground/15" />
      ))
    )}
    {/* Wavy doodle line */}
    <path d="M10 60 Q25 50 35 55 T55 35 T75 45 T95 25 T115 30" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeDasharray="6 4" fill="none" strokeLinecap="round" className="opacity-35" />
    {/* Data point circles */}
    <circle cx="35" cy="55" r="3" className="fill-primary/20 stroke-primary/30" strokeWidth="1" />
    <circle cx="75" cy="45" r="3" className="fill-primary/20 stroke-primary/30" strokeWidth="1" />
    <circle cx="115" cy="30" r="3" className="fill-primary/20 stroke-primary/30" strokeWidth="1" />
  </svg>
);

const PieDoodle = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="opacity-60">
    <circle cx="45" cy="45" r="30" className="stroke-muted-foreground/20" strokeWidth="2" strokeDasharray="5 5" fill="none" />
    <path d="M45 15 A30 30 0 0 1 72.98 30 L45 45 Z" className="fill-primary/15" />
    <path d="M72.98 30 A30 30 0 0 1 60 72.98 L45 45 Z" className="fill-muted-foreground/10" />
    <circle cx="45" cy="45" r="3" className="fill-primary/25" />
  </svg>
);

const TableDoodle = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="opacity-60">
    {[15, 35, 55].map(y => (
      <g key={y}>
        <rect x="10" y={y} width="100" height="12" rx="3" className="fill-muted-foreground/8" />
        <rect x="14" y={y + 3} width="25" height="6" rx="2" className="fill-muted-foreground/15" />
        <rect x="45" y={y + 3} width="18" height="6" rx="2" className="fill-muted-foreground/12" />
        <rect x="70" y={y + 3} width="30" height="6" rx="2" className="fill-muted-foreground/10" />
      </g>
    ))}
    {/* Decorative question mark */}
    <text x="60" y="10" textAnchor="middle" className="fill-primary/30" fontSize="10" fontWeight="bold">?</text>
  </svg>
);

const GeneralDoodle = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" className="opacity-60">
    {/* Empty clipboard doodle */}
    <rect x="30" y="10" width="60" height="70" rx="6" className="stroke-muted-foreground/25" strokeWidth="2" fill="none" />
    <rect x="45" y="5" width="30" height="12" rx="4" className="fill-muted-foreground/15 stroke-muted-foreground/25" strokeWidth="1.5" />
    {/* Doodle lines representing missing content */}
    <rect x="40" y="30" width="40" height="4" rx="2" className="fill-muted-foreground/12" />
    <rect x="40" y="40" width="30" height="4" rx="2" className="fill-muted-foreground/10" />
    <rect x="40" y="50" width="35" height="4" rx="2" className="fill-muted-foreground/8" />
    {/* Little sparkle */}
    <circle cx="85" cy="15" r="2" className="fill-primary/25" />
    <circle cx="25" cy="70" r="1.5" className="fill-primary/20" />
  </svg>
);

const doodleMap = {
  bar: BarDoodle,
  line: LineDoodle,
  pie: PieDoodle,
  table: TableDoodle,
  general: GeneralDoodle,
};

export const ChartEmptyState = ({
  className,
  title = "No data available",
  description = "Data will appear here once it's ready",
  variant = "general",
}: ChartEmptyStateProps) => {
  const Doodle = doodleMap[variant];

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-8 px-4 rounded-xl border border-dashed border-border/60 bg-muted/10",
      className
    )}>
      <Doodle />
      <p className="mt-3 text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-xs text-muted-foreground/70 mt-1 text-center max-w-[220px]">{description}</p>
    </div>
  );
};
