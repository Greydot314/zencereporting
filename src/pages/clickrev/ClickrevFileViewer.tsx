import { useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, Share2, Download, X, FileSpreadsheet } from "lucide-react";

const ClickrevFileViewer = () => {
  const navigate = useNavigate();
  const { fileName } = useParams();
  const [params] = useSearchParams();
  const folder = params.get("folder") ?? "MBR";
  const decoded = decodeURIComponent(fileName ?? "Report");
  const displayName = decoded.replace(/\.[^.]+$/, "");

  return (
    <div className="p-6 bg-[#F4F4F7] min-h-full text-[#1F1F2E]">
      <div className="space-y-6">
        {/* Title bar */}
        <div className="bg-white rounded-md shadow-sm border border-[#E5E5EC] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="h-8 w-8 rounded-md bg-[#EFEAFB] flex items-center justify-center text-[#5B3FBF] hover:bg-[#E0D4F7]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h1 className="text-base font-bold">{folder}</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-[#9999A8]">
          <Link to="/clickrev" className="hover:text-[#5B3FBF]">Dashboard</Link>
          <span className="mx-2">›</span>
          <Link to={`/clickrev/folder/${encodeURIComponent(folder)}`} className="hover:text-[#5B3FBF]">{folder}</Link>
        </div>

        {/* Viewer toolbar */}
        <div className="flex items-center justify-between border-b border-[#E5E5EC] pb-3">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1.5 text-sm text-[#5B3FBF] font-medium hover:underline">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-1.5 text-sm text-[#5B3FBF] font-medium hover:underline">
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
          <div className="flex-1 text-center text-sm font-semibold text-[#5B3FBF]">{displayName}</div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#1F1F2E] hover:text-[#5B3FBF]"
          >
            CLOSE
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Document body */}
        <div className="bg-white rounded-md border border-[#E5E5EC] min-h-[70vh] p-8">
          <div className="max-w-3xl mx-auto">
            {/* Cover */}
            <div className="bg-[#FBE6DA] rounded-md p-12 flex flex-col items-center text-center shadow-sm">
              <div className="bg-white rounded-md px-10 py-6 shadow-sm">
                <div className="bg-[#C8262D] text-white font-bold tracking-wide text-2xl rounded-sm px-6 py-2 inline-block">
                  SENCO
                </div>
                <div className="text-[10px] text-[#C8262D] tracking-[0.25em] mt-1">GOLD &amp; DIAMONDS</div>
              </div>
              <div className="mt-6 text-[#5B3FBF] font-semibold text-xl tracking-wide">easyrewardz</div>
              <div className="mt-6 bg-white rounded-md border border-[#E5E5EC] px-4 py-1.5 text-xs font-semibold text-[#1F1F2E]">
                Monthly Business Reviews — {displayName.split("_").pop() ?? "Feb'26"}
              </div>
            </div>

            {/* Mock content sheet */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="border border-[#E5E5EC] rounded-md p-4">
                <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FileSpreadsheet className="h-4 w-4 text-[#1F8A4C]" />
                  Members Acquired
                </div>
                <div className="text-2xl font-bold text-[#1F1F2E]">1,28,491</div>
                <div className="text-xs text-[#1F8A4C] mt-1">+8.4% vs last month</div>
              </div>
              <div className="border border-[#E5E5EC] rounded-md p-4">
                <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FileSpreadsheet className="h-4 w-4 text-[#1F8A4C]" />
                  Repeat Rate
                </div>
                <div className="text-2xl font-bold text-[#1F1F2E]">42.7%</div>
                <div className="text-xs text-[#D63A3A] mt-1">-1.2% vs last month</div>
              </div>
              <div className="border border-[#E5E5EC] rounded-md p-4">
                <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FileSpreadsheet className="h-4 w-4 text-[#1F8A4C]" />
                  Identified Sales
                </div>
                <div className="text-2xl font-bold text-[#1F1F2E]">₹ 248.6 Cr</div>
                <div className="text-xs text-[#1F8A4C] mt-1">+11.2% vs last month</div>
              </div>
              <div className="border border-[#E5E5EC] rounded-md p-4">
                <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                  <FileSpreadsheet className="h-4 w-4 text-[#1F8A4C]" />
                  Active Members
                </div>
                <div className="text-2xl font-bold text-[#1F1F2E]">9.42 L</div>
                <div className="text-xs text-[#1F8A4C] mt-1">+3.1% vs last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickrevFileViewer;
