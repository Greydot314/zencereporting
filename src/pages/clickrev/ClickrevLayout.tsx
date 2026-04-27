import { Outlet } from "react-router-dom";
import { Settings, LogOut, ChevronDown } from "lucide-react";

const ClickrevLayout = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F7] text-[#1F1F2E] font-sans">
      {/* Purple top bar */}
      <header className="h-14 bg-[#5B3FBF] flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-baseline gap-1 text-white">
          <span className="text-xl font-semibold tracking-tight">zence</span>
          <span className="text-xl">»</span>
          <span className="text-sm opacity-80">|</span>
          <span className="text-base font-medium">360</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-sm rounded-md px-3 py-1.5 border border-white/20">
            <span>Clickrev</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 text-white text-sm hover:bg-white/10 rounded-md px-2 py-1.5">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <div className="flex items-center gap-2 text-white text-sm">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 via-white to-green-500 border border-white/30" />
            <span>INR</span>
          </div>
          <button className="text-white/90 hover:text-white">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ClickrevLayout;
