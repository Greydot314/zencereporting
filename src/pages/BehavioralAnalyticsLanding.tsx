import { useState } from "react";
import {
  MousePointerClick, Search, Eye, ShoppingCart, ArrowRight, CheckCircle2,
  Send, BarChart3, Activity, Layers, Waypoints, Fingerprint,
  TrendingUp, Filter, Globe, Plug
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const BehavioralAnalyticsLanding = () => {
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
      icon: <MousePointerClick className="h-6 w-6" />,
      title: "Click & Interaction Tracking",
      description: "Capture every click, scroll, hover, and tap across your e-commerce portal. Heatmaps and session replays reveal exactly how users engage with your site."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Search Behavior Analysis",
      description: "Track what users search for, search-to-purchase funnels, zero-result queries, and search refinement patterns to optimize product discovery."
    },
    {
      icon: <Waypoints className="h-6 w-6" />,
      title: "User Journey Mapping",
      description: "Visualize complete user journeys from landing to checkout. Identify drop-off points, loop patterns, and the most effective conversion paths."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Event Pattern Recognition",
      description: "ML-powered pattern detection across user events — browsing sequences, cart behavior, wishlist actions — to predict intent and next actions."
    },
    {
      icon: <Fingerprint className="h-6 w-6" />,
      title: "User Cohort Analysis",
      description: "Automatically segment users by behavioral patterns — power browsers, cart abandoners, deal hunters, loyal returners — with dynamic cohort updates."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Conversion Funnel Analytics",
      description: "Track micro and macro conversions across every funnel stage. A/B test impact analysis and attribution modeling for campaign optimization."
    },
  ];

  const metrics = [
    { value: "50+", label: "Events Tracked" },
    { value: "Real-time", label: "Data Processing" },
    { value: "360°", label: "User View" },
    { value: "3 min", label: "Integration Time" },
  ];

  const useCases = [
    {
      title: "Search Optimization",
      description: "Analyze search queries, filters used, and result clicks to improve product discovery. Identify gaps where users search but don't find what they need.",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Cart Abandonment Insights",
      description: "Understand exactly why users abandon carts — price comparison behavior, shipping page drop-offs, payment friction — with event-level detail.",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Content & Category Performance",
      description: "Track which categories, products, and content get the most engagement. Heatmaps show where users focus attention and what gets ignored.",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      title: "Cross-Device Behavior Stitching",
      description: "Unify user behavior across mobile, desktop, and tablet. See the complete journey even when users switch devices mid-session.",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  return (
    <main className="flex-1 overflow-auto">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--atlas-primary))]/5 to-accent/5 opacity-60" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[hsl(var(--atlas-primary))]/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="border-[hsl(var(--atlas-primary))]/30 text-[hsl(var(--atlas-primary))] px-4 py-1.5 text-sm">
            <Activity className="h-3.5 w-3.5 mr-1.5" />
            Analytics Module
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Behavioral Analytics — Deep{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--atlas-primary))] to-accent bg-clip-text text-transparent">User Behavior Insights</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect your e-commerce portal and unlock deep insights into user search behavior, browsing patterns, 
            event tracking, and conversion funnels. Understand what your customers do — and why.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2 bg-[hsl(var(--atlas-primary))] hover:bg-[hsl(var(--atlas-primary))]/90 text-white" onClick={() => document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" })}>
              Request Access <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Integration Banner */}
      <section className="px-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <Card className="border-[hsl(var(--atlas-primary))]/20 bg-[hsl(var(--atlas-primary))]/5">
            <CardContent className="flex flex-col md:flex-row items-center gap-4 py-5">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--atlas-primary))]/10 flex items-center justify-center text-[hsl(var(--atlas-primary))] shrink-0">
                <Plug className="h-5 w-5" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-foreground text-sm">E-Commerce Portal Integration Required</h3>
                <p className="text-sm text-muted-foreground">Connect your e-commerce website via a lightweight JavaScript snippet or API integration to start capturing behavioral data.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <Card key={i} className="text-center surface-hover">
                <CardContent className="pt-6 pb-4">
                  <div className="text-2xl lg:text-3xl font-bold text-[hsl(var(--atlas-primary))]">{m.value}</div>
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
            <p className="text-muted-foreground">End-to-end behavioral intelligence for your e-commerce platform</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Card key={i} className="surface-hover group">
                <CardHeader className="pb-3">
                  <div className="h-11 w-11 rounded-lg bg-[hsl(var(--atlas-primary))]/10 flex items-center justify-center text-[hsl(var(--atlas-primary))] mb-3 group-hover:bg-[hsl(var(--atlas-primary))]/15 transition-colors">
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
            <p className="text-muted-foreground">Actionable insights from every user interaction</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((uc, i) => (
              <Card key={i} className="surface-hover">
                <CardContent className="flex gap-4 pt-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-foreground shrink-0">
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
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground">From portal integration to actionable behavioral insights</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-[hsl(var(--atlas-primary))]/20 via-[hsl(var(--atlas-primary))]/40 to-[hsl(var(--atlas-primary))]/20" />
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {[
                {
                  step: "01",
                  icon: <Plug className="h-6 w-6" />,
                  title: "Connect Your Portal",
                  desc: "Integrate your e-commerce website with a lightweight JS snippet or server-side API. Start capturing events within minutes — no heavy SDK required.",
                  details: ["JS snippet or API", "3-min setup", "Zero performance hit"],
                },
                {
                  step: "02",
                  icon: <Layers className="h-6 w-6" />,
                  title: "Capture & Enrich",
                  desc: "Automatically track clicks, searches, page views, cart actions, and custom events. Data is enriched with session context, device info, and user identity.",
                  details: ["50+ event types", "Auto-enrichment", "Identity stitching"],
                },
                {
                  step: "03",
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Analyze & Act",
                  desc: "Visual dashboards with journey maps, funnels, heatmaps, and cohort analysis. AI surfaces patterns and recommends optimizations automatically.",
                  details: ["Journey visualization", "AI recommendations", "Export & integrate"],
                },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className="relative z-10 h-14 w-14 rounded-full bg-[hsl(var(--atlas-primary))]/10 border-2 border-[hsl(var(--atlas-primary))]/30 flex items-center justify-center text-[hsl(var(--atlas-primary))] mb-5 group-hover:bg-[hsl(var(--atlas-primary))]/20 group-hover:border-[hsl(var(--atlas-primary))]/50 transition-all duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <span className="text-xs font-bold text-[hsl(var(--atlas-primary))]/50 tracking-widest mb-1">STEP {s.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {s.details.map((d, j) => (
                      <span key={j} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[hsl(var(--atlas-primary))]/8 text-[hsl(var(--atlas-primary))]/70 border border-[hsl(var(--atlas-primary))]/10">
                        {d}
                      </span>
                    ))}
                  </div>
                  {i < 2 && (
                    <ArrowRight className="md:hidden h-5 w-5 text-[hsl(var(--atlas-primary))]/30 mt-4 rotate-90" />
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
          <Card className="border-[hsl(var(--atlas-primary))]/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-xl bg-[hsl(var(--atlas-primary))]/10 flex items-center justify-center text-[hsl(var(--atlas-primary))] mx-auto mb-2">
                <Activity className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Request Module Activation</CardTitle>
              <CardDescription>
                Submit your request and our team will help you integrate Behavioral Analytics with your e-commerce portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requestSent ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-[hsl(var(--atlas-success))] mx-auto" />
                  <h3 className="font-semibold text-foreground">Request Submitted!</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your request and contact you at <strong>{formData.email}</strong> within 24 hours to start integration.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Work Email *</label>
                    <Input type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">E-Commerce Platform</label>
                    <Input placeholder="e.g. Shopify, Magento, Custom..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <Button className="w-full gap-2 bg-[hsl(var(--atlas-primary))] hover:bg-[hsl(var(--atlas-primary))]/90 text-white" size="lg" onClick={handleRequestAccess}>
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

export default BehavioralAnalyticsLanding;
