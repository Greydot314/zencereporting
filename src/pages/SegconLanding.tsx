import { useState } from "react";
import {
  Users, Layers, Target, PieChart, TrendingUp, ArrowRight,
  CheckCircle2, BarChart3, Sparkles, Filter, UserCheck, Send,
  ChevronRight, Globe, Zap, Shield, Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SegconLanding = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleRequestAccess = () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email");
      return;
    }
    setRequestSent(true);
    toast.success("Access request submitted successfully! Our team will contact you within 24 hours.");
  };

  const features = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "RFM Segmentation",
      description: "Automatically classify customers by Recency, Frequency, and Monetary value with AI-driven thresholds that adapt to your business patterns."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Micro-Segment Discovery",
      description: "Uncover hidden customer clusters using behavioral signals, purchase patterns, and engagement data beyond traditional demographics."
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Segment Health Scoring",
      description: "Real-time health scores for each segment tracking growth, churn risk, revenue contribution, and engagement velocity."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Migration Tracking",
      description: "Visualize customer movement between segments over time. Identify upgrade and downgrade trends before they impact revenue."
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: "Dynamic Rule Engine",
      description: "Create complex segmentation rules using 50+ attributes. Combine behavioral, transactional, and demographic filters with AND/OR logic."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Recommendations",
      description: "Get intelligent campaign suggestions for each segment. AI analyzes historical performance to recommend the best engagement strategies."
    },
  ];

  const metrics = [
    { value: "50+", label: "Segmentation Attributes" },
    { value: "12x", label: "Faster Targeting" },
    { value: "34%", label: "Higher Campaign ROI" },
    { value: "Real-time", label: "Segment Updates" },
  ];

  const useCases = [
    {
      title: "Loyalty Tier Optimization",
      description: "Identify customers on the cusp of tier upgrades and trigger personalized nudges to accelerate their journey.",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      title: "Churn Prevention Cohorts",
      description: "Build segments of at-risk customers based on declining engagement patterns and deploy targeted retention campaigns.",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: "High-Value Customer Insights",
      description: "Deep-dive into your top 10% customers to understand what drives their loyalty and replicate success across segments.",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      title: "Campaign Audience Builder",
      description: "Export precision-targeted audiences to your marketing tools. Sync segments in real-time with your CRM and ESP.",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  return (
    <main className="flex-1 overflow-auto">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-subtle opacity-60" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary px-4 py-1.5 text-sm">
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            Advanced Module
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Segcon — Intelligent Customer{" "}
            <span className="gradient-text">Segmentation Engine</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Move beyond static demographics. Segcon uses AI-powered behavioral analysis to create 
            dynamic, actionable customer segments that evolve with your business in real-time.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" })}>
              Request Access <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <Card key={i} className="text-center surface-hover">
                <CardContent className="pt-6 pb-4">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{m.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-12 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Core Capabilities</h2>
            <p className="text-muted-foreground">Everything you need to understand and act on your customer segments</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Card key={i} className="surface-hover group">
                <CardHeader className="pb-3">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/15 transition-colors">
                    {f.icon}
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Use Cases</h2>
            <p className="text-muted-foreground">How leading loyalty programs leverage Segcon</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((uc, i) => (
              <Card key={i} className="surface-hover">
                <CardContent className="flex gap-4 pt-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    {uc.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{uc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — Infographic */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How Segcon Works</h2>
            <p className="text-muted-foreground">From raw data to actionable segments in three steps</p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {[
                {
                  step: "01",
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Ingest & Analyze",
                  desc: "Connect your loyalty data sources. Segcon automatically processes transactions, engagement events, and profile data.",
                  details: ["CRM & POS integration", "Real-time event streaming", "Auto data cleansing"],
                },
                {
                  step: "02",
                  icon: <Layers className="h-6 w-6" />,
                  title: "Segment & Score",
                  desc: "AI creates dynamic segments using RFM analysis, behavioral clustering, and custom rules. Each segment gets a health score.",
                  details: ["50+ attribute engine", "ML-powered clustering", "Health score per segment"],
                },
                {
                  step: "03",
                  icon: <Sparkles className="h-6 w-6" />,
                  title: "Act & Optimize",
                  desc: "Export audiences, trigger campaigns, and track segment migration. Continuous AI recommendations optimize your strategy.",
                  details: ["1-click audience export", "Campaign auto-triggers", "AI strategy suggestions"],
                },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div className="relative z-10 h-14 w-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  {/* Step number */}
                  <span className="text-xs font-bold text-primary/50 tracking-widest mb-1">STEP {s.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  {/* Detail chips */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {s.details.map((d, j) => (
                      <span key={j} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/8 text-primary/70 border border-primary/10">
                        {d}
                      </span>
                    ))}
                  </div>
                  {/* Arrow between steps (mobile) */}
                  {i < 2 && (
                    <ChevronRight className="md:hidden h-5 w-5 text-primary/30 mt-4 rotate-90" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request Access Form */}
      <section id="request-form" className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Request Module Activation</CardTitle>
              <CardDescription>
                Submit your request and our team will get back to you within 24 hours to set up Segcon for your organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requestSent ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-[hsl(var(--atlas-success))] mx-auto" />
                  <h3 className="font-semibold text-foreground">Request Submitted!</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your request and contact you at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Work Email *</label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Additional Notes</label>
                    <Textarea
                      placeholder="Tell us about your segmentation needs..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button className="w-full gap-2" size="lg" onClick={handleRequestAccess}>
                    <Send className="h-4 w-4" /> Submit Request
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default SegconLanding;
