import { Settings, FileText, TrendingUp, Shield, Lightbulb, Bell, UserCheck, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { ModuleCard } from "@/components/ModuleCard";

const modules = [
  {
    name: "Atlas Prime",
    description: "Provides the complete analysis of the brand's performance with detailed metrics and insights.",
    icon: Settings,
    path: "/module/atlas-prime",
    badge: "PRIME",
  },
  {
    name: "Atlas Neo",
    description: "Provides the complete analysis of the brand's performance with next-generation features.",
    icon: Settings,
    path: "/module/atlas-neo",
    badge: "NEO",
    isDisabled: true,
  },
  {
    name: "Clickrev",
    description: "Allows the users to generate reports and reviews by analyzing customer feedback and ratings.",
    icon: FileText,
    path: "/module/clickrev",
  },
  {
    name: "DNAD",
    description: "We are coming to you sooner than you think.",
    icon: Lightbulb,
    path: "/module/dnad",
    isDisabled: true,
  },
  {
    name: "Segcon",
    description: "Provides simple and visually attractive user experience to the users with segmentation capabilities.",
    icon: TrendingUp,
    path: "/module/segcon",
  },
  {
    name: "KPI Alerts",
    description: "Helps the users to schedule alerts of the brand's performance based on key performance indicators.",
    icon: Bell,
    path: "/module/kpi-alerts",
  },
  {
    name: "Behavioural Analytics",
    description: "Track customer behaviour across your website and app including funnel analysis and user journey mapping.",
    icon: UserCheck,
    path: "/module/behavioural-analytics",
  },
  {
    name: "Insights",
    description: "Gives the insights about the brand's customer segments to understand patterns and trends.",
    icon: Lightbulb,
    path: "/module/insights",
  },
  {
    name: "Fraud",
    description: "We help the brand to identify the fraud customers and provide risk scoring and anomaly detection.",
    icon: Shield,
    path: "/module/fraud",
  },
  {
    name: "Loyalty Extension",
    description: "One line about Atlas that gives a good idea about.",
    icon: Users,
    path: "/module/loyalty-extension",
    isDisabled: true,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-6 py-8">
        <HeroBanner />
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">My Applications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.name} {...module} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
