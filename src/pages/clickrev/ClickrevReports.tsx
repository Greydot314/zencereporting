import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronDown,
  SlidersHorizontal,
  Calendar as CalIcon,
  Download,
  X,
} from "lucide-react";
import {
  REPORT_TYPES,
  TIME_PERIODS,
  DIMENSIONS,
  ASM_REPORT_DATA,
  AsmRow,
} from "@/data/clickrevMockData";
import { HierarchyTreePicker } from "@/components/clickrev/HierarchyTreePicker";

const STORES = ["All Stores", "Boring Rd Patna", "MG Rd Bangalore", "CP Delhi", "Linking Rd Mumbai"];

const NoReportEmpty = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <svg viewBox="0 0 96 96" className="w-24 h-24 mb-4">
      <circle cx="48" cy="48" r="36" fill="none" stroke="#5B3FBF" strokeWidth="3" />
      <path d="M30 38 H66 M30 50 H66 M30 62 H56" stroke="#5B3FBF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="74" cy="74" r="11" fill="#5B3FBF" />
      <path d="M70 70 L78 78 M78 70 L70 78" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <h3 className="text-lg font-bold mb-1">You have not selected any report</h3>
    <p className="text-sm text-[#6B6B7B]">Please select a report after applying filter to view the report</p>
  </div>
);

const Dropdown = ({
  label,
  value,
  onChange,
  options,
  width = "w-56",
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  options: string[];
  width?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return (
    <div ref={ref} className={`relative ${width}`}>
      <label className="absolute -top-2 left-3 px-1 bg-[#F4F4F7] text-[10px] text-[#6B6B7B]">{label}</label>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-white border border-[#C9C9D4] rounded-md px-3 py-2.5 text-sm text-left flex items-center justify-between hover:border-[#5B3FBF]"
      >
        <span className={value ? "text-[#1F1F2E]" : "text-[#9999A8]"}>{value || `Select ${label}`}</span>
        <ChevronDown className={`h-4 w-4 text-[#6B6B7B] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E5EC] rounded-md shadow-lg max-h-72 overflow-y-auto z-20 py-1">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#F4F4F7] cursor-pointer">
              <input
                type="radio"
                checked={value === opt}
                onChange={() => {
                  onChange?.(opt);
                  setOpen(false);
                }}
                className="accent-[#5B3FBF]"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const formatNum = (n: number) => n.toLocaleString("en-IN");

const groupByRegion = (rows: AsmRow[]) => {
  const map = new Map<string, AsmRow[]>();
  rows.forEach((r) => {
    const arr = map.get(r.region) || [];
    arr.push(r);
    map.set(r.region, arr);
  });
  return Array.from(map.entries());
};

const downloadCSV = (rows: AsmRow[]) => {
  const header = [
    "Region", "ASM", "RM", "DSM", "Store",
    "YTD 2024-25 New", "YTD 2024-25 Untagged", "YTD 2024-25 Miss Opp%",
    "YTD 2025-26 New", "YTD 2025-26 Untagged", "YTD 2025-26 Miss Opp%",
    "Growth over Last",
  ];
  const lines = [header.join(",")];
  rows.forEach((r) => {
    lines.push([
      r.region, `"${r.asm}"`, `"${r.rm}"`, `"${r.dsm}"`, r.store,
      r.newPrev, r.untaggedPrev, `${r.missOppPrev}%`,
      r.newCurr, r.untaggedCurr, `${r.missOppCurr}%`,
      `${r.growth}%`,
    ].join(","));
  });
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `asm_report_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const ClickrevReports = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState("");
  const [store, setStore] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [timePeriod, setTimePeriod] = useState<string>("Monthly");
  const [dimension, setDimension] = useState<string>("Store");
  const [hierarchy, setHierarchy] = useState<Set<string>>(new Set());
  const [applied, setApplied] = useState(false);

  const moreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setShowMore(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filteredRows = useMemo(() => {
    if (!applied) return [];
    return ASM_REPORT_DATA;
  }, [applied]);

  const grouped = useMemo(() => groupByRegion(filteredRows), [filteredRows]);

  const canApply = report !== "";

  return (
    <div className="space-y-6">
      {/* Title card */}
      <div className="bg-white rounded-md shadow-sm border border-[#E5E5EC] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/clickrev")}
            className="h-8 w-8 rounded-md bg-[#EFEAFB] flex items-center justify-center text-[#5B3FBF] hover:bg-[#E0D5F8]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h1 className="text-base font-bold">Reports</h1>
        </div>
        {applied && filteredRows.length > 0 && (
          <button
            onClick={() => downloadCSV(filteredRows)}
            className="flex items-center gap-1.5 text-[#5B3FBF] border border-[#5B3FBF] rounded-md px-4 py-1.5 text-sm font-medium hover:bg-[#EFEAFB]"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-4">
        <Dropdown label="Report" value={report} onChange={setReport} options={REPORT_TYPES} width="w-60" />
        <Dropdown label="Filter by Stores" value={store} onChange={setStore} options={STORES} width="w-60" />

        <div className="relative w-72">
          <label className="absolute -top-2 left-3 px-1 bg-[#F4F4F7] text-[10px] text-[#6B6B7B]">Filter by Date Range</label>
          <button className="w-full bg-white border border-[#C9C9D4] rounded-md px-3 py-2.5 text-sm text-left flex items-center gap-2 hover:border-[#5B3FBF]">
            <CalIcon className="h-3.5 w-3.5 text-[#6B6B7B]" />
            <span>March 28 2026 - April 27 2026 (1 month)</span>
          </button>
        </div>

        <div ref={moreRef} className="relative">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="flex items-center gap-2 bg-white border border-[#C9C9D4] rounded-md px-3 py-2.5 text-sm hover:border-[#5B3FBF]"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#6B6B7B]" />
            <span>More Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
            {hierarchy.size > 0 && (
              <span className="bg-[#5B3FBF] text-white text-[10px] rounded-full px-1.5 py-0.5">{hierarchy.size}</span>
            )}
          </button>

          {showMore && (
            <div className="absolute top-full right-0 mt-1 w-[420px] bg-white border border-[#E5E5EC] rounded-md shadow-xl z-20 p-4 space-y-4">
              {/* Time Period */}
              <div>
                <h4 className="text-xs font-bold mb-2 bg-[#EFEAFB] -mx-4 -mt-4 px-4 py-2 rounded-t-md flex items-center justify-between">
                  Time Period <ChevronDown className="h-3 w-3" />
                </h4>
                <div className="flex flex-col gap-1.5">
                  {TIME_PERIODS.map((tp) => (
                    <label key={tp} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="tp"
                        checked={timePeriod === tp}
                        onChange={() => setTimePeriod(tp)}
                        className="accent-[#5B3FBF]"
                      />
                      {tp}
                    </label>
                  ))}
                </div>
              </div>

              {/* Dimension */}
              <div>
                <h4 className="text-xs font-bold mb-2 bg-[#EFEAFB] -mx-4 px-4 py-2 flex items-center justify-between">
                  Dimension <ChevronDown className="h-3 w-3" />
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {DIMENSIONS.map((d) => (
                    <label key={d} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="dim"
                        checked={dimension === d}
                        onChange={() => setDimension(d)}
                        className="accent-[#5B3FBF]"
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>

              {/* Hierarchy */}
              <div>
                <h4 className="text-xs font-bold mb-2 bg-[#EFEAFB] -mx-4 px-4 py-2 flex items-center justify-between">
                  User Hierarchy (RM / DSM / ASM / Store) <ChevronDown className="h-3 w-3" />
                </h4>
                <HierarchyTreePicker selected={hierarchy} onChange={setHierarchy} />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E5EC]">
                <button
                  onClick={() => {
                    setHierarchy(new Set());
                    setTimePeriod("Monthly");
                    setDimension("Store");
                  }}
                  className="text-xs text-[#6B6B7B] px-3 py-1.5 hover:underline"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMore(false)}
                  className="text-xs bg-[#5B3FBF] text-white px-4 py-1.5 rounded hover:bg-[#4A33A0]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          disabled={!canApply}
          onClick={() => setApplied(true)}
          className={`px-8 py-2.5 rounded-md text-sm font-medium ml-auto ${
            canApply
              ? "bg-[#5B3FBF] text-white hover:bg-[#4A33A0]"
              : "bg-[#D8D2EE] text-white cursor-not-allowed"
          }`}
        >
          Apply
        </button>
      </div>

      {/* Active filter chips */}
      {applied && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#6B6B7B]">Active:</span>
          {report && <Chip label={`Report: ${report}`} onRemove={() => { setReport(""); setApplied(false); }} />}
          {store && <Chip label={`Store: ${store}`} onRemove={() => setStore("")} />}
          <Chip label={`Period: ${timePeriod}`} />
          <Chip label={`Dimension: ${dimension}`} />
          {hierarchy.size > 0 && <Chip label={`Hierarchy: ${hierarchy.size} selected`} onRemove={() => setHierarchy(new Set())} />}
        </div>
      )}

      {/* Output */}
      {!applied || filteredRows.length === 0 ? (
        <NoReportEmpty />
      ) : (
        <PivotTable grouped={grouped} report={report} />
      )}
    </div>
  );
};

const Chip = ({ label, onRemove }: { label: string; onRemove?: () => void }) => (
  <span className="inline-flex items-center gap-1 bg-white border border-[#E5E5EC] rounded-full px-2.5 py-1 text-[#1F1F2E]">
    {label}
    {onRemove && (
      <button onClick={onRemove} className="text-[#9999A8] hover:text-[#5B3FBF]">
        <X className="h-3 w-3" />
      </button>
    )}
  </span>
);

const PivotTable = ({ grouped, report }: { grouped: [string, AsmRow[]][]; report: string }) => {
  // Totals
  const allRows = grouped.flatMap(([, rs]) => rs);
  const totals = allRows.reduce(
    (acc, r) => {
      acc.newPrev += r.newPrev;
      acc.untaggedPrev += r.untaggedPrev;
      acc.newCurr += r.newCurr;
      acc.untaggedCurr += r.untaggedCurr;
      return acc;
    },
    { newPrev: 0, untaggedPrev: 0, newCurr: 0, untaggedCurr: 0 },
  );
  const overallMissPrev = ((totals.untaggedPrev / totals.newPrev) * 100).toFixed(1);
  const overallMissCurr = ((totals.untaggedCurr / totals.newCurr) * 100).toFixed(2);
  const overallGrowth = (((totals.newCurr - totals.newPrev) / totals.newPrev) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-md border border-[#E5E5EC] overflow-hidden">
      <div className="px-5 py-3 border-b border-[#E5E5EC] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">{report}</h3>
          <p className="text-[11px] text-[#6B6B7B] mt-0.5">
            ASM-wise New Customer Acquisition · Region grouped · YTD comparison
          </p>
        </div>
        <span className="text-[10px] text-[#6B6B7B]">{allRows.length} rows</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#F4F4F7]">
              <th rowSpan={2} className="text-left px-3 py-2 border border-[#E5E5EC] font-bold">Region</th>
              <th rowSpan={2} className="text-left px-3 py-2 border border-[#E5E5EC] font-bold">ASM</th>
              <th colSpan={3} className="text-center px-3 py-2 border border-[#E5E5EC] font-bold bg-[#EFEAFB]">YTD 2024-25</th>
              <th colSpan={3} className="text-center px-3 py-2 border border-[#E5E5EC] font-bold bg-[#EFEAFB]">YTD 2025-26</th>
              <th rowSpan={2} className="text-center px-3 py-2 border border-[#E5E5EC] font-bold">Growth over Last</th>
            </tr>
            <tr className="bg-[#F4F4F7]">
              <th className="text-right px-3 py-1.5 border border-[#E5E5EC] font-medium">New</th>
              <th className="text-right px-3 py-1.5 border border-[#E5E5EC] font-medium">Untagged</th>
              <th className="text-right px-3 py-1.5 border border-[#E5E5EC] font-medium">Miss Opp%</th>
              <th className="text-right px-3 py-1.5 border border-[#E5E5EC] font-medium">New</th>
              <th className="text-right px-3 py-1.5 border border-[#E5E5EC] font-medium">Untagged</th>
              <th className="text-right px-3 py-1.5 border border-[#E5E5EC] font-medium">Miss Opp%</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map(([region, rows]) => (
              rows.map((r, idx) => (
                <tr key={r.asm} className="hover:bg-[#FAFAFC]">
                  {idx === 0 && (
                    <td
                      rowSpan={rows.length}
                      className="px-3 py-2 border border-[#E5E5EC] font-bold text-[#5B3FBF] align-middle bg-[#FCFAFF]"
                    >
                      {region}
                    </td>
                  )}
                  <td className="px-3 py-2 border border-[#E5E5EC]">{r.asm}</td>
                  <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(r.newPrev)}</td>
                  <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(r.untaggedPrev)}</td>
                  <td className={`px-3 py-2 border border-[#E5E5EC] text-right tabular-nums ${r.missOppPrev >= 10 ? "text-[#D63A3A]" : ""}`}>
                    {r.missOppPrev}%
                  </td>
                  <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(r.newCurr)}</td>
                  <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(r.untaggedCurr)}</td>
                  <td className={`px-3 py-2 border border-[#E5E5EC] text-right tabular-nums font-medium ${r.missOppCurr >= 10 ? "text-[#D63A3A]" : r.missOppCurr >= 7 ? "text-[#D2492C]" : ""}`}>
                    {r.missOppCurr}%
                  </td>
                  <td className={`px-3 py-2 border border-[#E5E5EC] text-right tabular-nums font-bold ${r.growth >= 5 ? "text-[#D63A3A]" : r.growth >= 3 ? "text-[#D2492C]" : "text-[#1F8A4C]"}`}>
                    {r.growth}%
                  </td>
                </tr>
              ))
            ))}
            {/* Grand Total */}
            <tr className="bg-[#EFEAFB] font-bold">
              <td colSpan={2} className="px-3 py-2 border border-[#E5E5EC]">Grand Total</td>
              <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(totals.newPrev)}</td>
              <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(totals.untaggedPrev)}</td>
              <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{overallMissPrev}%</td>
              <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(totals.newCurr)}</td>
              <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums">{formatNum(totals.untaggedCurr)}</td>
              <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums text-[#D63A3A]">{overallMissCurr}%</td>
              <td className="px-3 py-2 border border-[#E5E5EC] text-right tabular-nums text-[#D63A3A]">{overallGrowth}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="px-5 py-2 border-t border-[#E5E5EC] bg-[#FAFAFC] text-[10px] text-[#6B6B7B] flex items-center justify-between">
        <span>
          Color rules: Growth ≥5% red · ≥3% amber · &lt;3% green. Miss Opp% ≥10% red · ≥7% amber.
        </span>
        <span>Last refreshed: 27 Apr 2026, 10:42 AM</span>
      </div>
    </div>
  );
};

export default ClickrevReports;
