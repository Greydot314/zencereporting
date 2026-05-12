import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  Plus,
  Minus,
  FileSpreadsheet,
  FileText,
  Presentation,
  FileType,
  FolderPlus,
  Calendar,
} from "lucide-react";

const FolderIcon = () => (
  <svg viewBox="0 0 64 56" className="w-16 h-14">
    <path d="M2 10 C2 6, 5 4, 9 4 H22 L28 10 H55 C59 10, 62 13, 62 17 V46 C62 50, 59 53, 55 53 H9 C5 53, 2 50, 2 46 Z" fill="#F5C84B" />
    <path d="M2 18 C2 14, 5 12, 9 12 H55 C59 12, 62 15, 62 19 V46 C62 50, 59 53, 55 53 H9 C5 53, 2 50, 2 46 Z" fill="#F5C84B" fillOpacity="0.95" />
  </svg>
);

const ExcelIcon = () => (
  <svg viewBox="0 0 56 64" className="w-14 h-16">
    <rect x="4" y="4" width="48" height="56" rx="3" fill="#FFFFFF" stroke="#D9D9E3" />
    <rect x="4" y="4" width="48" height="14" rx="3" fill="#1F8A4C" />
    <text x="28" y="14" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">XLSX</text>
    <g fill="#1F8A4C">
      <rect x="10" y="24" width="12" height="6" />
      <rect x="24" y="24" width="10" height="6" />
      <rect x="36" y="24" width="10" height="6" />
      <rect x="10" y="32" width="12" height="6" fillOpacity="0.6" />
      <rect x="24" y="32" width="10" height="6" fillOpacity="0.6" />
      <rect x="36" y="32" width="10" height="6" fillOpacity="0.6" />
      <rect x="10" y="40" width="12" height="6" fillOpacity="0.4" />
      <rect x="24" y="40" width="10" height="6" fillOpacity="0.4" />
      <rect x="36" y="40" width="10" height="6" fillOpacity="0.4" />
    </g>
  </svg>
);

const TxtIcon = () => (
  <svg viewBox="0 0 56 64" className="w-14 h-16">
    <path d="M8 4 H38 L52 18 V58 C52 60.2, 50.2 62, 48 62 H8 C5.8 62, 4 60.2, 4 58 V8 C4 5.8, 5.8 4, 8 4 Z" fill="#FFFFFF" stroke="#D9D9E3" />
    <path d="M38 4 V18 H52" fill="none" stroke="#D9D9E3" />
    <line x1="12" y1="30" x2="44" y2="30" stroke="#9999A8" strokeWidth="1.2" />
    <line x1="12" y1="36" x2="44" y2="36" stroke="#9999A8" strokeWidth="1.2" />
    <line x1="12" y1="42" x2="38" y2="42" stroke="#9999A8" strokeWidth="1.2" />
    <line x1="12" y1="48" x2="44" y2="48" stroke="#9999A8" strokeWidth="1.2" />
  </svg>
);

const subfolders = [
  { name: "MBR_SencoGold_Apr'26", date: "05/06/2026" },
  { name: "MBR_SencoGold_Dec'25", date: "01/09/2026" },
  { name: "MBR_SencoGold_Feb'26", date: "03/06/2026" },
  { name: "MBR_SencoGold_Jan'26", date: "02/06/2026" },
  { name: "MBR_SencoGold_Mar'26", date: "04/06/2026" },
  { name: "MBR_SencoGold_Nov'25", date: "12/17/2025" },
];

const files = [
  { name: "SencoGold_Apr'26 MBR.xlsx", date: "05/06/2026", type: "excel" as const },
  { name: "SencoGold_Dec'25 MBR.xlsx", date: "01/06/2026", type: "excel" as const },
  { name: "SencoGold_Feb'26 MBR.xlsx", date: "03/05/2026", type: "excel" as const },
  { name: "SencoGold_Jan'26 MBR.xlsx", date: "02/06/2026", type: "excel" as const },
  { name: "SencoGold_Mar'26 MBR.xlsx", date: "04/06/2026", type: "excel" as const },
  { name: "file.txt", date: "09/18/2024", type: "txt" as const },
];

const ClickrevFolder = () => {
  const navigate = useNavigate();
  const { folderName } = useParams();
  const decoded = decodeURIComponent(folderName ?? "Folder");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const menuItems = [
    { icon: <FolderPlus className="h-4 w-4 text-[#F5C84B]" />, label: "Create New Folder" },
    { icon: <FileText className="h-4 w-4 text-[#5B3FBF]" />, label: "File Upload" },
    { icon: <FileSpreadsheet className="h-4 w-4 text-[#1F8A4C]" />, label: "Excel Upload" },
    { icon: <Presentation className="h-4 w-4 text-[#D2492C]" />, label: "Power Point Upload" },
    { icon: <FileType className="h-4 w-4 text-[#D63A3A]" />, label: "PDF Upload" },
    { divider: true as const },
    { icon: <Calendar className="h-4 w-4 text-[#5B3FBF]" />, label: "Schedule Report" },
  ];

  return (
    <div className="p-6 bg-[#F4F4F7] min-h-full text-[#1F1F2E]">
      <div className="space-y-6">
        {/* Title card */}
        <div className="bg-white rounded-md shadow-sm border border-[#E5E5EC] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/clickrev")}
              className="h-8 w-8 rounded-md bg-[#EFEAFB] flex items-center justify-center text-[#5B3FBF] hover:bg-[#E0D4F7]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h1 className="text-base font-bold">{decoded}</h1>
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="h-6 w-6 rounded-full bg-[#5B3FBF] hover:bg-[#4A33A0] text-white flex items-center justify-center"
              >
                {menuOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </button>
              {menuOpen && (
                <div className="absolute left-0 top-8 w-60 bg-white rounded-md shadow-lg border border-[#E5E5EC] py-2 z-30">
                  {menuItems.map((item, i) =>
                    "divider" in item ? (
                      <div key={i} className="h-px bg-[#E5E5EC] my-1.5" />
                    ) : (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#F4F4F7] text-left"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-[#9999A8]">
          <Link to="/clickrev" className="hover:text-[#5B3FBF]">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-[#5B3FBF] font-medium">{decoded}</span>
        </div>

        {/* Subfolder grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4">
          {subfolders.map((f) => (
            <button
              key={f.name}
              className="flex flex-col items-center gap-1.5 group"
            >
              <FolderIcon />
              <span className="text-xs text-[#1F1F2E] group-hover:text-[#5B3FBF] truncate max-w-[140px]">
                {f.name}
              </span>
              <span className="text-[10px] text-[#9999A8]">{f.date}</span>
            </button>
          ))}
        </div>

        {/* File grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4">
          {files.map((f) => (
            <button
              key={f.name}
              onClick={() => navigate(`/clickrev/file/${encodeURIComponent(f.name)}`)}
              className="flex flex-col items-center gap-1.5 group"
            >
              {f.type === "excel" ? <ExcelIcon /> : <TxtIcon />}
              <span className="text-xs text-[#1F1F2E] group-hover:text-[#5B3FBF] truncate max-w-[140px]">
                {f.name}
              </span>
              <span className="text-[10px] text-[#9999A8]">{f.date}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClickrevFolder;
