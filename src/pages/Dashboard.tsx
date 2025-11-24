import { Settings, FileText, TrendingUp, Shield, Lightbulb, Bell, UserCheck, Users, Sparkles, TrendingUp as TrendingIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { ModuleCard } from "@/components/ModuleCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        {/* Brand-Level AI Insights Section */}
        <div className="mb-8">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 card-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">AI Insights Pulse</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Get intelligent summaries and insights across your entire brand
                    </CardDescription>
                  </div>
                </div>
                <Link to="/ai-insights">
                  <Button className="gap-2">
                    View All Insights
                    <TrendingIcon className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-foreground">Revenue</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">₹12.4L</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> from yesterday
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground">Store Visits</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">2,847</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-red-600">-3.1%</span> from yesterday
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold text-foreground">Fraud Alerts</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">3 Active</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-orange-600">+14%</span> this week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">My Applications</h2>
          <p className="text-muted-foreground mt-1">Select an application to view detailed analytics and insights</p>
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
