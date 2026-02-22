import { useState } from "react";
import {
  ShieldAlert, ShieldCheck, AlertTriangle, Eye, Fingerprint, Lock,
  ArrowRight, CheckCircle2, Send, Zap, BarChart3, Bell, Cpu,
  FileSearch, Activity, Globe, Scan
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const FraudLanding = () => {
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
      icon: <Scan className="h-6 w-6" />,
      title: "Real-Time Transaction Monitoring",
      description: "Analyze every transaction in milliseconds. ML models detect anomalies in redemption velocity, geographic patterns, and spending behavior."
    },
    {
      icon: <Fingerprint className="h-6 w-6" />,
      title: "Device & Identity Fingerprinting",
      description: "Track device signatures, IP patterns, and behavioral biometrics to detect synthetic identities and account takeover attempts."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Risk Scoring Engine",
      description: "Multi-dimensional risk scores combining 30+ signals. Configurable thresholds let you balance fraud prevention with customer experience."
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Alert System",
      description: "Priority-based alerts with contextual intelligence. Reduce alert fatigue by 60% with AI-ranked notifications and auto-resolution for low-risk flags."
    },
    {
      icon: <FileSearch className="h-6 w-6" />,
      title: "Investigation Workbench",
      description: "Full customer timeline, linked accounts, and transaction graphs in one view. Resolve cases 3x faster with AI-suggested investigation paths."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Adaptive ML Models",
      description: "Self-learning models that evolve with emerging fraud patterns. Automatic retraining on confirmed cases ensures 94%+ detection accuracy."
    },
  ];

  const metrics = [
    { value: "94.2%", label: "Detection Accuracy" },
    { value: "<50ms", label: "Response Time" },
    { value: "₹45.6Cr", label: "Amount Protected" },
    { value: "60%", label: "Fewer False Positives" },
  ];

  const useCases = [
    {
      title: "Redemption Fraud Prevention",
      description: "Detect unusual point redemption patterns — velocity spikes, geographic impossibilities, and account sharing — before rewards are disbursed.",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      title: "Synthetic Identity Detection",
      description: "Identify fake accounts created to exploit sign-up bonuses and referral rewards using behavioral analysis and device correlation.",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      title: "Insider Threat Monitoring",
      description: "Monitor staff actions for unauthorized point adjustments, tier overrides, and suspicious account modifications with full audit trails.",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: "Cross-Channel Fraud Correlation",
      description: "Connect fraud signals across online, in-store, and partner channels to detect coordinated fraud rings and collusion patterns.",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  return (
    <main className="flex-1 overflow-auto">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-[hsl(var(--atlas-warning))]/5 opacity-60" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[hsl(var(--atlas-warning))]/5 blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="border-destructive/30 text-destructive px-4 py-1.5 text-sm">
            <ShieldAlert className="h-3.5 w-3.5 mr-1.5" />
            Security Module
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Fraud Sentinel — AI-Powered{" "}
            <span className="bg-gradient-to-r from-destructive to-[hsl(var(--atlas-warning))] bg-clip-text text-transparent">Fraud Detection</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Protect your loyalty program from fraud, abuse, and revenue leakage. Sentinel uses advanced ML models 
            to detect threats in real-time while minimizing false positives and customer friction.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" variant="destructive" className="gap-2" onClick={() => document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" })}>
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
                  <div className="text-2xl lg:text-3xl font-bold text-destructive">{m.value}</div>
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
            <p className="text-muted-foreground">Enterprise-grade fraud protection for your loyalty ecosystem</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Card key={i} className="surface-hover group">
                <CardHeader className="pb-3">
                  <div className="h-11 w-11 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive mb-3 group-hover:bg-destructive/15 transition-colors">
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
            <p className="text-muted-foreground">Protecting loyalty programs across every vector</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((uc, i) => (
              <Card key={i} className="surface-hover">
                <CardContent className="flex gap-4 pt-6">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--atlas-warning))]/10 flex items-center justify-center text-[hsl(var(--atlas-warning))] shrink-0">
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

      {/* How It Works */}
      <section className="px-6 py-12 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How Sentinel Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Monitor & Collect", desc: "Ingest transactions, device signals, and behavioral data across all channels in real-time with sub-50ms processing." },
              { step: "02", title: "Detect & Score", desc: "ML models analyze 30+ risk signals per transaction. Each event gets a risk score with explainable AI reasoning." },
              { step: "03", title: "Alert & Resolve", desc: "Smart alerts route to investigators with full context. Auto-block high-confidence threats while flagging edge cases for review." },
            ].map((s, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="text-4xl font-bold text-destructive/20">{s.step}</div>
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Access Form */}
      <section id="request-form" className="px-6 py-16">
        <div className="max-w-lg mx-auto">
          <Card className="border-destructive/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mx-auto mb-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Request Module Activation</CardTitle>
              <CardDescription>
                Submit your request and our team will get back to you within 24 hours to set up Fraud Sentinel for your organization.
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
                      placeholder="Tell us about your fraud detection needs..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button className="w-full gap-2" size="lg" variant="destructive" onClick={handleRequestAccess}>
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

export default FraudLanding;
