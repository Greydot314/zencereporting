import { cn } from "@/lib/utils";

interface SkeletonChartProps {
  className?: string;
  type?: "bar" | "line" | "area" | "pie";
}

export const SkeletonChart = ({ className, type = "bar" }: SkeletonChartProps) => {
  if (type === "pie") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  if (type === "line" || type === "area") {
    return (
      <div className={cn("flex items-end gap-1 h-32", className)}>
        <svg className="w-full h-full" viewBox="0 0 200 80">
          <path
            d="M0,60 Q20,40 40,50 T80,30 T120,45 T160,25 T200,35"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="3"
            className="animate-pulse"
          />
          <path
            d="M0,60 Q20,40 40,50 T80,30 T120,45 T160,25 T200,35 L200,80 L0,80 Z"
            fill="hsl(var(--muted))"
            className="animate-pulse opacity-30"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn("flex items-end gap-2 h-32", className)}>
      {[40, 65, 45, 80, 55, 70, 50].map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-muted rounded-t animate-pulse"
          style={{
            height: `${height}%`,
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};
