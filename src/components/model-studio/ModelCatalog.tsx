import { useState } from "react";
import { Search, SlidersHorizontal, Star, GitCompare, Layers, Brain, BarChart3, TrendingUp, ShoppingCart, Users, Code2, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { catalogModels, type CatalogModel } from "@/data/modelStudioMockData";
import { CompareModal } from "./CompareModal";

const modelIcons: Record<string, React.ElementType> = {
  rfm: Layers,
  kmeans: Brain,
  churn: BarChart3,
  clv: TrendingUp,
  'product-propensity': ShoppingCart,
  'demo-behavioral': Users,
  'custom-sql': Code2,
  'auto-segment': Wand2,
};

const modelAccents: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  rfm: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', icon: 'text-emerald-600 bg-emerald-500/10', glow: 'group-hover:shadow-emerald-500/10' },
  kmeans: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: 'text-blue-600 bg-blue-500/10', glow: 'group-hover:shadow-blue-500/10' },
  churn: { bg: 'bg-orange-500/5', border: 'border-orange-500/20', icon: 'text-orange-600 bg-orange-500/10', glow: 'group-hover:shadow-orange-500/10' },
  clv: { bg: 'bg-violet-500/5', border: 'border-violet-500/20', icon: 'text-violet-600 bg-violet-500/10', glow: 'group-hover:shadow-violet-500/10' },
  'product-propensity': { bg: 'bg-pink-500/5', border: 'border-pink-500/20', icon: 'text-pink-600 bg-pink-500/10', glow: 'group-hover:shadow-pink-500/10' },
  'demo-behavioral': { bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', icon: 'text-cyan-600 bg-cyan-500/10', glow: 'group-hover:shadow-cyan-500/10' },
  'custom-sql': { bg: 'bg-amber-500/5', border: 'border-amber-500/20', icon: 'text-amber-600 bg-amber-500/10', glow: 'group-hover:shadow-amber-500/10' },
  'auto-segment': { bg: 'bg-primary/5', border: 'border-primary/20', icon: 'text-primary bg-primary/10', glow: 'group-hover:shadow-primary/10' },
};

const typeBadgeColor: Record<string, string> = {
  'AI-Powered': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Rule-Based': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  'Hybrid': 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  'Custom': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
};

interface ModelCatalogProps {
  onConfigureModel: (model: CatalogModel) => void;
  onViewSampleOutput: (model: CatalogModel) => void;
}

export const ModelCatalog = ({ onConfigureModel, onViewSampleOutput }: ModelCatalogProps) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [inputFilter, setInputFilter] = useState("All");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  const filtered = catalogModels.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || m.type === typeFilter;
    const matchesInput = inputFilter === "All" || m.inputData.some(d => d.includes(inputFilter));
    return matchesSearch && matchesType && matchesInput;
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border bg-muted/30">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search models..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-background" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px] bg-background">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Model Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="AI-Powered">AI-Powered</SelectItem>
            <SelectItem value="Rule-Based">Rule-Based</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        <Select value={inputFilter} onValueChange={setInputFilter}>
          <SelectTrigger className="w-[170px] bg-background">
            <SelectValue placeholder="Input Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Data Types</SelectItem>
            <SelectItem value="Transactional">Transactional</SelectItem>
            <SelectItem value="Behavioral">Behavioral</SelectItem>
            <SelectItem value="Demographic">Demographic</SelectItem>
          </SelectContent>
        </Select>

        {selected.size >= 2 && (
          <Button variant="outline" onClick={() => setShowCompare(true)} className="ml-auto gap-2">
            <GitCompare className="h-4 w-4" />
            Compare ({selected.size})
          </Button>
        )}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(model => {
          const Icon = modelIcons[model.id] || Brain;
          const accent = modelAccents[model.id] || modelAccents['auto-segment'];
          const isSelected = selected.has(model.id);

          return (
            <Card
              key={model.id}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${accent.glow} ${isSelected ? 'ring-2 ring-primary/40' : 'hover:-translate-y-1'} ${model.recommended ? 'border-primary/30' : 'border-border/60 hover:border-primary/20'}`}
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full ${model.recommended ? 'bg-gradient-to-r from-primary via-accent to-primary' : accent.bg}`} />

              {/* Selection checkbox */}
              <div className={`absolute top-4 right-4 z-10 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleSelect(model.id)}
                  className="bg-background"
                />
              </div>

              {model.recommended && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border-amber-500/30 gap-1 text-[10px] font-semibold">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Recommended
                  </Badge>
                </div>
              )}

              <CardContent className="p-5 pt-5 space-y-4">
                {/* Icon + Title */}
                <div className="flex items-start gap-3 mt-2">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${accent.icon} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-[15px] leading-tight">{model.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{model.description}</p>
                  </div>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className={typeBadgeColor[model.type] + ' text-[10px] font-medium'}>{model.type}</Badge>
                  {model.inputData.map(d => (
                    <Badge key={d} variant="outline" className="text-[10px] text-muted-foreground bg-muted/40">{d}</Badge>
                  ))}
                </div>

                {/* Output */}
                <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
                  <span className="font-medium text-foreground/80">Output:</span> {model.output}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 text-xs h-9 font-medium shadow-sm" onClick={() => onConfigureModel(model)}>
                    Configure & Run
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-9 font-medium" onClick={() => onViewSampleOutput(model)}>
                    Sample Output
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CompareModal
        open={showCompare}
        onOpenChange={setShowCompare}
        selectedIds={selected}
      />
    </div>
  );
};
