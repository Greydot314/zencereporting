import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Plus,
  Minus,
  Folder,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileType,
  Calendar,
  AlertTriangle,
  Search,
  FolderPlus,
  Upload,
} from "lucide-react";

const folders = [
  { name: "Schedule Reports", color: "#F5C84B" },
  { name: "CampaignReport", color: "#F5C84B" },
  { name: "MBR", color: "#F5C84B" },
  { name: "MonthlyReport", color: "#F5C84B" },
  { name: "WeeklyReport", color: "#F5C84B" },
];

const filterTabs = [
  { key: "all", label: "All", icon: <Folder className="h-4 w-4 text-[#F5C84B]" />, color: "text-[#5B3FBF]" },
  { key: "word", label: "Word", icon: <FileText className="h-4 w-4 text-[#2A66C8]" />, color: "" },
  { key: "excel", label: "Excel", icon: <FileSpreadsheet className="h-4 w-4 text-[#1F8A4C]" />, color: "" },
  { key: "ppt", label: "Power Point", icon: <Presentation className="h-4 w-4 text-[#D2492C]" />, color: "" },
  { key: "pdf", label: "PDF", icon: <FileType className="h-4 w-4 text-[#D63A3A]" />, color: "" },
];

const FolderIcon = () => (
  <svg viewBox="0 0 64 56" className="w-16 h-14">
    <path d="M2 10 C2 6, 5 4, 9 4 H22 L28 10 H55 C59 10, 62 13, 62 17 V46 C62 50, 59 53, 55 53 H9 C5 53, 2 50, 2 46 Z" fill="#F5C84B" />
    <rect x="10" y="14" width="40" height="22" rx="2" fill="#FFFFFF" stroke="#D9D9E3" strokeWidth="0.6" />
    <line x1="14" y1="20" x2="46" y2="20" stroke="#C9C9D4" strokeWidth="0.8" />
    <line x1="14" y1="25" x2="40" y2="25" stroke="#C9C9D4" strokeWidth="0.8" />
    <line x1="14" y1="30" x2="44" y2="30" stroke="#C9C9D4" strokeWidth="0.8" />
    <path d="M2 18 C2 14, 5 12, 9 12 H55 C59 12, 62 15, 62 19 V46 C62 50, 59 53, 55 53 H9 C5 53, 2 50, 2 46 Z" fill="#F5C84B" fillOpacity="0.85" />
  </svg>
);

const ReportExtracts = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
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
    { icon: <FileText className="h-4 w-4 text-[#2A66C8]" />, label: "Word Upload" },
    { icon: <FileSpreadsheet className="h-4 w-4 text-[#1F8A4C]" />, label: "Excel Upload" },
    { icon: <Presentation className="h-4 w-4 text-[#D2492C]" />, label: "Power Point Upload" },
    { icon: <FileType className="h-4 w-4 text-[#D63A3A]" />, label: "PDF Upload" },
    { divider: true },
    { icon: <Calendar className="h-4 w-4 text-[#5B3FBF]" />, label: "Schedule Report" },
  ];

  return (
    <div className="p-6 bg-[#F4F4F7] min-h-full text-[#1F1F2E]">
    <div className="space-y-6">
      {/* Title card */}
      <div className="bg-white rounded-md shadow-sm border border-[#E5E5EC] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 relative">
          <button className="h-8 w-8 rounded-md bg-[#EFEAFB] flex items-center justify-center text-[#5B3FBF]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h1 className="text-base font-bold">Report Extracts</h1>
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="h-6 w-6 rounded-full bg-[#5B3FBF] hover:bg-[#4A33A0] text-white flex items-center justify-center transition-colors"
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
        <button
          onClick={() => navigate("/clickrev/reports")}
          className="text-[#5B3FBF] border border-[#5B3FBF] rounded-md px-5 py-1.5 text-sm font-medium hover:bg-[#EFEAFB]"
        >
          Reports
        </button>
      </div>

      {/* For you */}
      <div>
        <h2 className="text-sm font-bold mb-4">For you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {folders.map((f) => (
            <button
              key={f.name}
              onClick={() => navigate(`/clickrev/folder/${encodeURIComponent(f.name)}`)}
              className="flex flex-col items-center gap-2 group"
            >
              <FolderIcon />
              <span className="text-xs text-[#1F1F2E] group-hover:text-[#5B3FBF]">{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-5">
            <h2 className="text-sm font-bold">Recent</h2>
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 text-xs ${
                  activeTab === tab.key ? "text-[#5B3FBF] font-semibold" : "text-[#1F1F2E]"
                }`}
              >
                {tab.icon}
                <span className={activeTab === tab.key ? "underline underline-offset-4" : ""}>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E5E5EC] rounded-md px-3 py-1.5 w-72">
            <Search className="h-4 w-4 text-[#9999A8]" />
            <input
              placeholder="Filter by name"
              className="flex-1 text-xs bg-transparent outline-none placeholder:text-[#9999A8]"
            />
          </div>
        </div>

        <div className="bg-white rounded-md border border-[#E5E5EC] overflow-hidden">
          <div className="grid grid-cols-4 bg-[#EFEAFB] px-5 py-2.5 text-xs font-bold">
            <div>Name</div>
            <div>Modified</div>
            <div>Modified by</div>
            <div>Activity</div>
          </div>
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-[#1F1F2E]">
            <AlertTriangle className="h-10 w-10 text-[#9999A8]" strokeWidth={1.5} />
            <span className="text-sm font-bold">No table data to display</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportExtracts;
