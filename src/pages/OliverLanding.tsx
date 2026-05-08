import {
  Sparkles,
  MessageSquare,
  Zap,
  Lightbulb,
  BarChart3,
  BookOpen,
  LayoutDashboard,
  ArrowRight,
  Lock,
  Megaphone,
  FileText,
  Users,
  Target,
  Bell,
  Workflow,
  Brain,
  TrendingUp,
  ShoppingBag,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const agents = [
  {
    icon: BarChart3,
    name: "Analytics Agent",
    tag: "Insights",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    desc: "Ask any KPI question — sales, retention, tier movement — get instant charts & summaries.",
    sample: "What were my Gold-tier sales last quarter vs prior?",
  },
  {
    icon: Megaphone,
    name: "Campaign Agent",
    tag: "Activation",
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
    desc: "Plan, launch & optimize campaigns across email, SMS, WhatsApp & push from one prompt.",
    sample: "Launch a Diwali offer to lapsed Gold customers.",
  },
  {
    icon: FileText,
    name: "Template Creator",
    tag: "Content",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    desc: "Generates ready-to-send email, SMS, WhatsApp & push templates — branded and on-tone.",
    sample: "Draft a winback email for high-CLV dormant users.",
  },
  {
    icon: Users,
    name: "RFM Segment Suggestor",
    tag: "Segmentation",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    desc: "Recommends RFM cohorts and dynamic segments aligned to your business goal.",
    sample: "Find segments most likely to respond to a 15% off bundle.",
  },
  {
    icon: Target,
    name: "Churn & Winback Agent",
    tag: "Retention",
    color: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-500",
    desc: "Surfaces at-risk pools and prescribes the next-best intervention with expected lift.",
    sample: "Who is most likely to churn in the next 30 days?",
  },
  {
    icon: ShoppingBag,
    name: "Product Insights Agent",
    tag: "Catalog",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    desc: "Tracks SKU velocity, basket affinity & cross-sell opportunities across stores.",
    sample: "Which SKUs are driving repeat in Tier-1 cities?",
  },
  {
    icon: TrendingUp,
    name: "Forecast Agent",
    tag: "Predictions",
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-500",
    desc: "Predicts demand, revenue and tier migration with confidence bands.",
    sample: "Forecast next month's revenue by region.",
  },
  {
    icon: Bell,
    name: "Alerting Agent",
    tag: "Monitoring",
    color: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-500",
    desc: "Watches your KPIs 24/7 and pings you the moment a metric breaks its band.",
    sample: "Alert me if redemption rate drops below 12%.",
  },
  {
    icon: Workflow,
    name: "Journey Builder",
    tag: "Automation",
    color: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
    desc: "Spins up multi-step lifecycle journeys from a one-line objective.",
    sample: "Build an onboarding journey for new Silver members.",
  },
  {
    icon: Mail,
    name: "Performance Reporter",
    tag: "Reporting",
    color: "from-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-500",
    desc: "Auto-compiles weekly/monthly performance decks ready to share with leadership.",
    sample: "Send me last week's loyalty performance summary.",
  },
];

const howItWorks = [
  { icon: <MessageSquare className="h-4 w-4" />, title: "Ask in Plain English", desc: "No SQL, no BI tool — just type your question or goal." },
  { icon: <Brain className="h-4 w-4" />, title: "The Right Agent Responds", desc: "Oliver routes your request to the specialist agent best suited for it." },
  { icon: <Zap className="h-4 w-4" />, title: "Get Insights or Actions", desc: "From charts to launched campaigns — Oliver doesn't just answer, it acts." },
];

const OliverLanding = () => {
  return (
    <main className="flex-1 overflow-auto bg-background">
      {/* Hero */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary px-4 py-1.5">
            <Lock className="h-3 w-3 mr-1.5" />
            Premium Module — Access Required
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
            Meet <span className="gradient-text">Oliver</span>
            <br />
            A Team of AI Agents for Your CRM
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Oliver is not one bot — it's a <span className="font-semibold text-foreground">multi-agent system</span>.
            Analytics, Campaigns, Templates, Segmentation, Forecasting & more — each specialist agent collaborates
            to turn your questions into instant insights and real actions.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Button size="lg" className="gap-2">
              Request Access <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Connect with your account manager
            </Button>
          </div>

          {/* Agent chips */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {agents.slice(0, 6).map((a) => (
              <div key={a.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs">
                <a.icon className={`h-3.5 w-3.5 ${a.iconColor}`} />
                <span className="text-foreground">{a.name}</span>
              </div>
            ))}
            <div className="flex items-center px-3 py-1.5 rounded-full bg-muted border border-border text-xs text-muted-foreground">
              + {agents.length - 6} more
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">One Conversation. Many Specialists.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You talk to Oliver — Oliver orchestrates the right agents behind the scenes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {howItWorks.map((item, i) => (
              <Card key={i} className="border-2 border-primary/10">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold">{i + 1}. {item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Catalog */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="border-primary/30 text-primary">Agent Catalog</Badge>
            <h2 className="text-3xl font-bold">A Specialist for Every CRM Job</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each agent has a focused skillset. Together they cover the entire customer lifecycle —
              from insight to action to measurement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card key={agent.name} className="group hover:border-primary/40 transition-all overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${agent.color}`} />
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                      <agent.icon className={`h-5 w-5 ${agent.iconColor}`} />
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{agent.tag}</Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{agent.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-[11px] text-muted-foreground italic">
                      <span className="text-primary not-italic">Try:</span> "{agent.sample}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-agent collaboration demo */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Watch the Agents Collaborate</h2>
            <p className="text-muted-foreground">
              One prompt. Multiple agents. End-to-end execution.
            </p>
          </div>

          <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-8 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <span className="text-muted-foreground font-medium">You:</span>{" "}
                Find Gold customers at risk of churn and run a winback campaign this weekend.
              </div>

              {[
                { agent: "RFM Segment Suggestor", color: "text-violet-500", icon: Users, msg: "Identified 12,480 Gold customers with declining recency. Created segment 'Gold At-Risk Q2'." },
                { agent: "Churn & Winback Agent", color: "text-red-500", icon: Target, msg: "Predicted churn probability: 64%. Recommended 18% bundle offer + free shipping (expected lift +9.2%)." },
                { agent: "Template Creator", color: "text-amber-500", icon: FileText, msg: "Drafted email + WhatsApp templates. Subject: 'We saved your favourites — here's 18% off'." },
                { agent: "Campaign Agent", color: "text-pink-500", icon: Megaphone, msg: "Scheduled multichannel send for Sat 10:00 AM IST. Awaiting your approval." },
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 ${step.color}`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 bg-primary/5 rounded-lg p-3 text-sm">
                    <span className={`font-semibold ${step.color}`}>{step.agent}:</span>{" "}
                    <span className="text-foreground">{step.msg}</span>
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="gap-1">Approve & Launch <ArrowRight className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline">Tweak</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Build Dashboards */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {["#a78bfa", "#60a5fa", "#fbbf24", "#f472b6"].map((c, i) => (
                  <div key={i} className="h-12 rounded-lg" style={{ backgroundColor: c, opacity: 0.3 }} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 rounded-lg bg-primary/10 flex items-end p-2 gap-1">
                  {[40, 70, 50, 90, 60].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="h-32 rounded-lg bg-accent/10 flex items-end p-2 gap-1">
                  {[60, 30, 80, 50, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-accent/40 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <LayoutDashboard className="h-10 w-10 text-primary" />
            <h2 className="text-3xl font-bold">Or Build a Dashboard with One Sentence</h2>
            <p className="text-muted-foreground">
              Need a view for repeat behavior or new SKU sales? Tell Oliver — the Analytics Agent
              assembles a fully interactive dashboard in seconds.
            </p>
            <Button className="gap-2">
              Request Access <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Self-help */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <BookOpen className="h-10 w-10 text-primary" />
            <h2 className="text-3xl font-bold">Product Updates &amp; Self-Help, Built In</h2>
            <p className="text-muted-foreground">
              Ask "What's new this month?" or "How do I set up a journey?" — Oliver fetches release
              notes, walkthroughs and best-practice playbooks instantly.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <Card className="relative">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary/50" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Sparkles className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to put your AI team to work?</h2>
          <p className="text-muted-foreground">
            Oliver is a premium agentic AI module. Connect with your account manager to enable access
            and onboard the right agents for your team.
          </p>
          <Button size="lg" className="gap-2">
            Connect with your account manager <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default OliverLanding;
