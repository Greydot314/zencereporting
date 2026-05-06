import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, ChevronRight, Brain, RotateCcw, TrendingUp, UserPlus, ShoppingBasket } from "lucide-react";
import { businessModels, type BusinessModel } from "@/data/businessModelsMockData";

const icons: Record<string, React.ElementType> = {
  Propensity: Brain,
  Winback: RotateCcw,
  Forecasting: TrendingUp,
  'New-to-Repeat': UserPlus,
  'Basket Analysis': ShoppingBasket,
};

const accents: Record<string, string> = {
  Propensity: 'text-blue-600 bg-blue-500/10',
  Winback: 'text-orange-600 bg-orange-500/10',
  Forecasting: 'text-violet-600 bg-violet-500/10',
  'New-to-Repeat': 'text-emerald-600 bg-emerald-500/10',
  'Basket Analysis': 'text-pink-600 bg-pink-500/10',
};

interface Props {
  onSelect: (model: BusinessModel) => void;
}

export const BusinessModelCatalog = ({ onSelect }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {businessModels.map(m => {
        const Icon = icons[m.category] || Brain;
        const accent = accents[m.category];
        return (
          <Card
            key={m.id}
            onClick={() => onSelect(m)}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-border/60 hover:border-primary/30"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${accent} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[15px] leading-tight">{m.name}</h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{m.useCase}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {m.techniques.map(t => (
                  <Badge key={t} variant="outline" className="text-[10px] bg-muted/40">{t}</Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <Badge className={`text-[10px] gap-1 ${m.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-muted text-muted-foreground'}`}>
                  <Activity className="h-3 w-3" /> {m.status}
                </Badge>
                <span className="text-[11px] text-muted-foreground">Last run {m.lastRun}</span>
              </div>

              <Button size="sm" className="w-full text-xs h-9" onClick={(e) => { e.stopPropagation(); onSelect(m); }}>
                View Details
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
