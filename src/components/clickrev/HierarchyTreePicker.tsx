import { useMemo, useState } from "react";
import { ChevronRight, ChevronDown, Search, X } from "lucide-react";
import { HIERARCHY, HierarchyNode } from "@/data/clickrevMockData";

interface Props {
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}

const collectIds = (node: HierarchyNode): string[] => {
  const ids = [node.id];
  node.children?.forEach((c) => ids.push(...collectIds(c)));
  return ids;
};

const typeColor: Record<HierarchyNode["type"], string> = {
  region: "text-[#5B3FBF] font-bold",
  rm: "text-[#2A66C8] font-semibold",
  dsm: "text-[#1F8A4C] font-medium",
  asm: "text-[#1F1F2E]",
  store: "text-[#6B6B7B]",
};

const typeBadge: Record<HierarchyNode["type"], string> = {
  region: "Region",
  rm: "RM",
  dsm: "DSM",
  asm: "ASM",
  store: "Store",
};

const TreeRow = ({
  node,
  depth,
  selected,
  expanded,
  onToggleExpand,
  onSelect,
  query,
}: {
  node: HierarchyNode;
  depth: number;
  selected: Set<string>;
  expanded: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect: (node: HierarchyNode, checked: boolean) => void;
  query: string;
}) => {
  const isExpanded = expanded.has(node.id) || (query.length > 0);
  const hasChildren = !!node.children?.length;
  const isSelected = selected.has(node.id);
  // partial: any descendant selected but not self
  const descendantIds = collectIds(node).slice(1);
  const someDescSelected = descendantIds.some((id) => selected.has(id));
  const partial = !isSelected && someDescSelected;

  const matches = query === "" || node.label.toLowerCase().includes(query.toLowerCase());
  const childMatches = node.children?.some((c) =>
    JSON.stringify(c).toLowerCase().includes(query.toLowerCase()),
  );
  if (query && !matches && !childMatches) return null;

  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-1 px-1 hover:bg-[#F4F4F7] rounded cursor-pointer"
        style={{ paddingLeft: depth * 14 + 4 }}
      >
        {hasChildren ? (
          <button onClick={() => onToggleExpand(node.id)} className="text-[#6B6B7B] flex-shrink-0">
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-3.5" />
        )}
        <input
          type="checkbox"
          checked={isSelected}
          ref={(el) => {
            if (el) el.indeterminate = partial;
          }}
          onChange={(e) => onSelect(node, e.target.checked)}
          className="h-3.5 w-3.5 accent-[#5B3FBF]"
        />
        <span className={`text-xs ${typeColor[node.type]}`}>{node.label}</span>
        <span className="ml-auto text-[10px] text-[#9999A8] uppercase tracking-wider">{typeBadge[node.type]}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              selected={selected}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              query={query}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const HierarchyTreePicker = ({ selected, onChange }: Props) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["east", "north1"]));
  const [query, setQuery] = useState("");

  const onToggleExpand = (id: string) => {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpanded(next);
  };

  const onSelect = (node: HierarchyNode, checked: boolean) => {
    const ids = collectIds(node);
    const next = new Set(selected);
    if (checked) ids.forEach((id) => next.add(id));
    else ids.forEach((id) => next.delete(id));
    onChange(next);
  };

  const selectedLabels = useMemo(() => {
    const labels: { id: string; label: string; type: string }[] = [];
    const walk = (nodes: HierarchyNode[]) => {
      nodes.forEach((n) => {
        if (selected.has(n.id)) labels.push({ id: n.id, label: n.label, type: n.type });
        if (n.children) walk(n.children);
      });
    };
    walk(HIERARCHY);
    return labels;
  }, [selected]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 bg-[#F4F4F7] border border-[#E5E5EC] rounded px-2 py-1.5">
        <Search className="h-3.5 w-3.5 text-[#9999A8]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Region / RM / DSM / ASM / Store"
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-[#9999A8]"
        />
      </div>

      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
          {selectedLabels.slice(0, 12).map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1 bg-[#EFEAFB] text-[#5B3FBF] text-[10px] px-2 py-0.5 rounded-full"
            >
              {s.label}
              <button onClick={() => {
                const next = new Set(selected);
                next.delete(s.id);
                onChange(next);
              }}>
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
          {selectedLabels.length > 12 && (
            <span className="text-[10px] text-[#6B6B7B] self-center">+{selectedLabels.length - 12} more</span>
          )}
        </div>
      )}

      <div className="max-h-72 overflow-y-auto border border-[#E5E5EC] rounded p-1 bg-white">
        {HIERARCHY.map((root) => (
          <TreeRow
            key={root.id}
            node={root}
            depth={0}
            selected={selected}
            expanded={expanded}
            onToggleExpand={onToggleExpand}
            onSelect={onSelect}
            query={query}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-[#6B6B7B]">{selectedLabels.length} selected</span>
        <button
          onClick={() => onChange(new Set())}
          className="text-[10px] text-[#5B3FBF] hover:underline"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};
