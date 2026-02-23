import { useState } from "react";
import {
  Bell, Mail, MessageSquare, Send, ArrowRight, CheckCircle2,
  BarChart3, TrendingUp, Smartphone, Clock, Settings2, Zap,
  Target, AlertCircle, LineChart, Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const KpiAlertsLanding = () => {
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
      icon: <MessageSquare className="h-6 w-6" />,
      title: "WhatsApp Alerts",
      description: "Push critical KPI updates directly to stakeholders on WhatsApp. Rich media messages with charts, trend indicators, and actionable summaries."
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Digests & Alerts",
      description: "Scheduled daily/weekly KPI digests and real-time threshold-based email alerts with interactive charts and drill-down links."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "SMS & Push Notifications",
      description: "Instant SMS alerts for mission-critical KPIs. Push notifications via mobile app for on-the-go monitoring by leadership teams."
    },
    {
      icon: <Settings2 className="h-6 w-6" />,
      title: "Custom Alert Rules",
      description: "Configure thresholds, anomaly detection triggers, and trend-based rules. Set different alert levels — info, warning, critical — per KPI."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "KPI Dashboard Snapshots",
      description: "Auto-generate visual dashboard snapshots attached to alerts. Recipients see the full picture without needing to log in."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Smart Scheduling",
      description: "Time-zone aware delivery, business-hours routing, and escalation chains. Ensure the right person gets the right alert at the right time."
    },
  ];

  const metrics = [
    { value: "6+", label: "Channels Supported" },
    { value: "<30s", label: "Alert Delivery Time" },
    { value: "100+", label: "KPI Templates" },
    { value: "99.9%", label: "Delivery Reliability" },
  ];

  const useCases = [
    {
      title: "Executive KPI Briefings",
      description: "Automated morning briefings with overnight KPI changes, trend analysis, and anomaly highlights delivered to C-suite via their preferred channel.",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Threshold Breach Alerts",
      description: "Instant notifications when KPIs cross critical thresholds — revenue drops, churn spikes, conversion dips — with root-cause context.",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      title: "Campaign Performance Updates",
      description: "Real-time campaign KPI tracking pushed to marketing teams. Open rates, conversions, and ROI updates as campaigns run.",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Team-Specific Dashboards",
      description: "Route department-specific KPIs to relevant teams. Sales gets revenue metrics, ops gets fulfillment data, CX gets satisfaction scores.",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  return (
    <main className="flex-1 overflow-auto">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[hsl(var(--atlas-success))]/5 opacity-60" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[hsl(var(--atlas-success))]/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary px-4 py-1.5 text-sm">
            <Bell className="h-3.5 w-3.5 mr-1.5" />
            Communication Module
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            KPI Alerts — Multi-Channel{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(var(--atlas-success))] bg-clip-text text-transparent">KPI Communication</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Deliver critical business KPIs to stakeholders across WhatsApp, Email, SMS, and Push notifications.
            Keep your teams informed with real-time alerts, scheduled digests, and smart escalations.
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
            <p className="text-muted-foreground">Omni-channel KPI delivery for your entire organization</p>
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
            <p className="text-muted-foreground">Keeping every team informed, in real-time</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((uc, i) => (
              <Card key={i} className="surface-hover">
                <CardContent className="flex gap-4 pt-6">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--atlas-success))]/10 flex items-center justify-center text-[hsl(var(--atlas-success))] shrink-0">
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
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How KPI Alerts Works</h2>
            <p className="text-muted-foreground">From data source to stakeholder inbox in seconds</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {[
                {
                  step: "01",
                  icon: <LineChart className="h-6 w-6" />,
                  title: "Connect & Configure",
                  desc: "Connect your KPI data sources — dashboards, databases, APIs. Define alert rules, thresholds, and recipient groups with an intuitive rule builder.",
                  details: ["Multi-source ingestion", "Visual rule builder", "Recipient groups"],
                },
                {
                  step: "02",
                  icon: <Zap className="h-6 w-6" />,
                  title: "Monitor & Trigger",
                  desc: "Continuous KPI monitoring with anomaly detection. When thresholds breach or trends shift, alerts trigger instantly with full context and visuals.",
                  details: ["Real-time monitoring", "Anomaly detection", "Smart triggers"],
                },
                {
                  step: "03",
                  icon: <Send className="h-6 w-6" />,
                  title: "Deliver & Escalate",
                  desc: "Alerts routed to the right channel — WhatsApp, Email, SMS, Push. Unacknowledged alerts auto-escalate through the chain until resolved.",
                  details: ["Omni-channel delivery", "Auto-escalation", "Read receipts"],
                },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className="relative z-10 h-14 w-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  <span className="text-xs font-bold text-primary/50 tracking-widest mb-1">STEP {s.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {s.details.map((d, j) => (
                      <span key={j} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/8 text-primary/70 border border-primary/10">
                        {d}
                      </span>
                    ))}
                  </div>
                  {i < 2 && (
                    <ArrowRight className="md:hidden h-5 w-5 text-primary/30 mt-4 rotate-90" />
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
                <Bell className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Connect with Your Account Manager</CardTitle>
              <CardDescription>
                Reach out to your account manager to activate KPI Alerts for your organization.
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
                    <Input placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Work Email *</label>
                    <Input type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Additional Notes</label>
                    <Textarea placeholder="Tell us about your KPI communication needs..." rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
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

export default KpiAlertsLanding;
