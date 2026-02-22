import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import Dashboard from "./pages/Dashboard";
import AIInsights from "./pages/AIInsights";
import AIChat from "./pages/AIChat";
import Predictions from "./pages/Predictions";
import ModuleDetail from "./pages/ModuleDetail";
import AtlasLanding from "./pages/AtlasLanding";
import SearchPage from "./pages/SearchPage";
import SegconLanding from "./pages/SegconLanding";
import FraudLanding from "./pages/FraudLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page without sidebar */}
          <Route path="/landing" element={<AtlasLanding />} />
          
          {/* Main app with sidebar layout */}
          <Route
            path="/*"
            element={
              <SidebarProvider>
                <div className="min-h-screen flex w-full bg-background">
                  <AppSidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/ai-insights" element={<AIInsights />} />
                      <Route path="/ai-chat" element={<AIChat />} />
                      <Route path="/predictions" element={<Predictions />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/module/:moduleId" element={<ModuleDetail />} />
                      <Route path="/module-info/segcon" element={<SegconLanding />} />
                      <Route path="/module-info/fraud" element={<FraudLanding />} />
                      <Route path="/settings" element={<Dashboard />} />
                      <Route path="/help" element={<Dashboard />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
              </SidebarProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
