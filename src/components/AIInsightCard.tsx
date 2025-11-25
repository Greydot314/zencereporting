import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AIInsightCardProps {
  title: string;
  description: string;
  trend: "up" | "down" | "stable";
  modulePath?: string;
  compact?: boolean;
}

export const AIInsightCard = ({ title, description, trend, modulePath, compact = false }: AIInsightCardProps) => {
  if (compact && modulePath) {
    return (
      <Link to={modulePath}>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          View Details
          <ExternalLink className="h-3 w-3" />
        </Button>
      </Link>
    );
  }

  return null;
};
