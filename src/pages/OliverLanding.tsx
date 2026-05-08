import { Sparkles, MessageSquare, Zap, Lightbulb, BarChart3, BookOpen, LayoutDashboard, ArrowRight, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OliverLanding = () => {
  const howItWorks = [
    { icon: <MessageSquare className="h-4 w-4" />, title: "Ask Your Question", desc: "What is my top-selling SKU this week?" },
    { icon: <Zap className="h-4 w-4" />, title: "Instant Response", desc: "AI charts, summaries & trends." },
    { icon: <Lightbulb className="h-4 w-4" />, title: "Act on Insights", desc: "Drill down into, download reports." },
  ];

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
            Your <span className="gradient-text">AI-Powered</span>
            <br />
            CRM &amp; Analytics Assistant Is Here
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet <span className="font-semibold text-foreground">Oliver</span> — your agentic AI bot.
            Ask. Analyze. Act. Let Oliver turn your everyday questions into instant, actionable insights.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Button size="lg" className="gap-2">
              Request Access <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Connect with your account manager
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl blur-2xl" />
            <Card className="relative overflow-hidden border-2 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <Badge className="bg-primary/10 text-primary border-0">NEW</Badge>
                <h3 className="font-bold text-lg">Unlock Unlimited Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Ask Oliver anything from KPI trends to churn risk and product-level performance.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-primary/60" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <div className="space-y-4">
              {howItWorks.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ask Anything */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">Ask Anything — From KPIs to Product FAQs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let your CRM or Analytics Manager ask one-line questions like "What were my sales last quarter?"
              or "What's new in the product this month?" — Oliver &amp; answers in seconds — no SQL, no BI tool.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
              <div className="h-2 bg-gradient-to-r from-primary to-accent" />
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold">Hi, I'm Oliver</span>
                </div>
                <div className="text-left bg-muted/50 rounded-lg p-4 text-sm">
                  <span className="text-muted-foreground">You:</span> Show me Gold tier churn risk analysis
                </div>
                <div className="text-left bg-primary/5 rounded-lg p-4 text-sm">
                  <span className="text-primary font-semibold">Oliver:</span> 23% of Gold tier customers show declining engagement.
                  Top driver: reduced redemption frequency. Recommend targeted re-engagement campaign...
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Updates */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <BookOpen className="h-10 w-10 text-primary" />
            <h2 className="text-3xl font-bold">Product Updates &amp; Self-Help</h2>
            <p className="text-muted-foreground">
              Ask "What's new this month?" or "How do I set up campaign automation?" —
              and Oliver will fetch the latest feature updates &amp; help guides.
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
            <h2 className="text-3xl font-bold">Build Dashboards with a Single Command</h2>
            <p className="text-muted-foreground">
              Need a dashboard for repeat customer behavior or new SKU sales? Just type it.
              Oliver creates fully interactive dashboards on the fly.
            </p>
            <Button className="gap-2">
              Request Access <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <BarChart3 className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to meet Oliver?</h2>
          <p className="text-muted-foreground">
            Oliver is a premium agentic AI module. Connect with your account manager to enable access for your team.
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
