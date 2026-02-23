import {
  ShieldAlert, ShieldCheck, AlertTriangle, Eye, Fingerprint, Lock,
  ArrowRight, Zap, BarChart3, Bell, Cpu,
  FileSearch, Activity, Globe, Scan
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FraudLanding = () => {

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
            <Button size="lg" variant="destructive" className="gap-2" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Features <ArrowRight className="h-4 w-4" />
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

      {/* How It Works — Infographic */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How Sentinel Works</h2>
            <p className="text-muted-foreground">Three-stage pipeline from data ingestion to threat resolution</p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-destructive/20 via-destructive/40 to-destructive/20" />

            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {[
                {
                  step: "01",
                  icon: <Scan className="h-6 w-6" />,
                  title: "Monitor & Collect",
                  desc: "Ingest transactions, device signals, and behavioral data across all channels in real-time with sub-50ms processing.",
                  details: ["Multi-channel ingestion", "Device fingerprinting", "<50ms latency"],
                },
                {
                  step: "02",
                  icon: <Cpu className="h-6 w-6" />,
                  title: "Detect & Score",
                  desc: "ML models analyze 30+ risk signals per transaction. Each event gets a risk score with explainable AI reasoning.",
                  details: ["30+ risk signals", "Explainable AI scores", "94%+ accuracy"],
                },
                {
                  step: "03",
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: "Alert & Resolve",
                  desc: "Smart alerts route to investigators with full context. Auto-block high-confidence threats while flagging edge cases for review.",
                  details: ["Priority-ranked alerts", "Auto-block threats", "Investigation paths"],
                },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div className="relative z-10 h-14 w-14 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center text-destructive mb-5 group-hover:bg-destructive/20 group-hover:border-destructive/50 transition-all duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                  {/* Step number */}
                  <span className="text-xs font-bold text-destructive/50 tracking-widest mb-1">STEP {s.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  {/* Detail chips */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {s.details.map((d, j) => (
                      <span key={j} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-destructive/8 text-destructive/70 border border-destructive/10">
                        {d}
                      </span>
                    ))}
                  </div>
                  {/* Arrow between steps (mobile) */}
                  {i < 2 && (
                    <ArrowRight className="md:hidden h-5 w-5 text-destructive/30 mt-4 rotate-90" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default FraudLanding;
