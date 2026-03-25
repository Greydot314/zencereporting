import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GroupSegment, SEGMENT_COLORS } from "@/data/segmentGroupsMockData";

interface CoverageBarProps {
  segments: GroupSegment[];
  height?: number;
}

export const CoverageBar = ({ segments, height = 6 }: CoverageBarProps) => {
  const total = segments.reduce((s, seg) => s + seg.netCount, 0);
  if (total === 0) return null;

  return (
    <div className="flex rounded-full overflow-hidden" style={{ height }}>
      {segments.map((seg, i) => {
        const pct = (seg.netCount / total) * 100;
        return (
          <Tooltip key={seg.id}>
            <TooltipTrigger asChild>
              <div
                className="transition-opacity hover:opacity-80"
                style={{
                  width: `${pct}%`,
                  backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                  minWidth: pct > 0 ? 4 : 0,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">{seg.name}</p>
              <p className="text-xs text-muted-foreground">{seg.netCount.toLocaleString()} ({pct.toFixed(1)}%)</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
