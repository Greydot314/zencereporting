import { useState } from "react";
import { Search, SlidersHorizontal, Star, GitCompare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { catalogModels, type CatalogModel } from "@/data/modelStudioMockData";
import { CompareModal } from "./CompareModal";

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
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search models..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px]">
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
          <SelectTrigger className="w-[170px]">
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
        {filtered.map(model => (
          <Card
            key={model.id}
            className="group relative hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-border/60 hover:border-primary/30"
          >
            {/* Selection checkbox on hover */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Checkbox
                checked={selected.has(model.id)}
                onCheckedChange={() => toggleSelect(model.id)}
              />
            </div>
            {selected.has(model.id) && (
              <div className="absolute top-3 right-3">
                <Checkbox checked onCheckedChange={() => toggleSelect(model.id)} />
              </div>
            )}

            {model.recommended && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1 text-[10px]">
                  <Star className="h-3 w-3 fill-amber-500" /> Recommended
                </Badge>
              </div>
            )}

            <CardContent className="p-5 pt-10 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground text-base">{model.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{model.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className={typeBadgeColor[model.type] + ' text-[10px]'}>{model.type}</Badge>
                {model.inputData.map(d => (
                  <Badge key={d} variant="outline" className="text-[10px] text-muted-foreground">{d}</Badge>
                ))}
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground/70">Output:</span> {model.output}
              </div>

              <div className="flex gap-2 pt-1">
                <Button size="sm" className="flex-1 text-xs h-8" onClick={() => onConfigureModel(model)}>
                  Configure & Run
                </Button>
                <Button size="sm" variant="ghost" className="text-xs h-8" onClick={() => onViewSampleOutput(model)}>
                  View Sample Output
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CompareModal
        open={showCompare}
        onOpenChange={setShowCompare}
        selectedIds={selected}
      />
    </div>
  );
};
