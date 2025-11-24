import { Header } from "@/components/Header";
import { AIInsightCard } from "@/components/AIInsightCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AIInsights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-6 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AI Insights Pulse
          </h1>
          <p className="text-muted-foreground text-lg">
            Your AI-powered business intelligence assistant • Real-time insights • Anomaly detection • Predictive analytics
          </p>
        </div>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList>
            <TabsTrigger value="daily">Daily Pulse</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Pulse</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="card-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Business Health</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Normal</div>
                  <p className="text-xs text-muted-foreground">All systems operating well</p>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹12.4L</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Store Visits</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">-3.1%</span> from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.3%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+0.5%</span> from yesterday
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">What Happened Yesterday</h3>
                <p className="text-muted-foreground">AI-generated narrative summary of your business performance compared to historical patterns</p>
              </div>
              
              <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-background card-shadow mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">📊 Daily Business Summary</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="mb-3">
                    <strong className="text-foreground">Yesterday was a strong day for your business.</strong> Revenue reached <strong className="text-foreground">₹12.4L</strong>, marking an <strong className="text-green-600">8.2% increase</strong> compared to the same day last week. This growth came despite a slight dip in store traffic, indicating higher customer value and improved conversion efficiency.
                  </p>
                  <p className="mb-3">
                    The <strong className="text-foreground">premium saree collection</strong> was the star performer, contributing <strong className="text-foreground">34% of total revenue</strong>. Average transaction value increased to ₹4,350 from ₹4,020, suggesting customers are purchasing higher-value items. Zone A stores showed particularly strong performance with conversion rates reaching 4.8%.
                  </p>
                  <p>
                    However, <strong className="text-foreground">store visits declined by 3.1%</strong>, concentrated in evening hours. This appears to be a temporary anomaly due to local events and weather conditions rather than a concerning trend.
                  </p>
                </CardContent>
              </Card>
              
              <AIInsightCard
                title="Revenue Performance"
                summary="Revenue increased by 8.2% yesterday compared to last week, driven by strong performance in the premium saree collection."
                details="The increase was primarily driven by: 1) Higher average transaction value (₹4,350 vs ₹4,020), 2) Improved conversion rate in Zone A stores (4.8% vs 4.1%), 3) Strong weekend foot traffic. Recommended action: Increase inventory for premium sarees and consider expanding similar collections."
                trend="up"
                metric="+8.2%"
                category="Atlas Prime"
                modulePath="/module/atlas-prime"
              />

              <AIInsightCard
                title="Store Visits Decline"
                summary="Store visits dropped by 3.1% yesterday. The decline was concentrated in evening hours (6-9 PM) across Zone B locations."
                details="Contributing factors: 1) Local festival event diverted foot traffic, 2) Weather conditions (heavy rain between 5-8 PM), 3) Temporary road construction near 3 key stores. This is likely a temporary anomaly. Monitor over the next 48 hours."
                trend="down"
                metric="-3.1%"
                category="Behavioural Analytics"
                modulePath="/module/behavioural-analytics"
              />

              <AIInsightCard
                title="Customer Sentiment Improved"
                summary="Clickrev rating improved to 4.2⭐ driven by positive reviews about the new saree collection and improved customer service."
                details="Key themes from recent reviews: 1) 'Beautiful new designs' mentioned 47 times, 2) 'Helpful staff' sentiment up 23%, 3) 'Fast checkout' mentioned positively in 31 reviews. Consider highlighting these strengths in marketing materials."
                trend="up"
                metric="4.2⭐"
                category="Clickrev"
                modulePath="/module/clickrev"
              />

              <AIInsightCard
                title="Fraud Detection Alert"
                summary="Fraud attempts increased by 14% this week. High-risk cluster detected in Store Zone 3 with unusual return patterns."
                details="Pattern analysis shows: 1) 12 transactions flagged for similar purchase-return behavior, 2) Common characteristics: high-value items, cash payments, same-day returns, 3) Estimated risk exposure: ₹2.1L. Recommended actions: Enhanced verification for returns over ₹5,000, staff training on fraud indicators."
                trend="down"
                metric="+14%"
                category="Fraud"
                modulePath="/module/fraud"
              />
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">What Happened Last Week</h3>
                <p className="text-muted-foreground">Week-over-week analysis with trend identification and strategic recommendations</p>
              </div>
              
              <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-background card-shadow mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">📈 Weekly Business Summary</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="mb-3">
                    <strong className="text-foreground">Last week marked exceptional performance across all metrics.</strong> Your business generated <strong className="text-foreground">₹86.4L in revenue</strong>, representing a <strong className="text-green-600">12% increase</strong> compared to the previous week. This growth was accompanied by improvements in both volume (store visits up 5.3%) and efficiency (conversion rate up 0.4%).
                  </p>
                  <p className="mb-3">
                    The <strong className="text-foreground">VIP customer segment</strong> showed particularly strong engagement, with purchase frequency increasing by 23%. This segment now contributes a disproportionate share of revenue with average transactions of ₹8,750. The data suggests your high-value customers are becoming more loyal and increasing their spending.
                  </p>
                  <p>
                    <strong className="text-foreground">Operational efficiency</strong> also improved significantly. The new POS system deployment resulted in 18% faster checkout times, which contributed to higher customer satisfaction scores and increased capacity during peak hours.
                  </p>
                </CardContent>
              </Card>
              
              <AIInsightCard
                title="Weekly Performance Overview"
                summary="Overall business performance was strong this week with revenue up 12% week-over-week. All key metrics showing positive trends."
                details="Week highlights: 1) Revenue: ₹86.4L (+12%), 2) Store visits: 19,850 (+5.3%), 3) Conversion rate: 4.1% (+0.4%), 4) Customer satisfaction: 4.1⭐ (+0.2). Top performing category: Premium sarees contributed 34% of revenue."
                trend="up"
                metric="+12%"
                category="Atlas Prime"
                modulePath="/module/atlas-prime"
              />

              <AIInsightCard
                title="Customer Segment Analysis"
                summary="VIP segment showed exceptional growth with 23% increase in purchases. New customer acquisition is up 8% compared to last week."
                details="Segment insights: 1) VIP customers: Average transaction ₹8,750 (+15% vs previous week), 2) Repeat customers: Strong loyalty with 3.2 visits per week, 3) New customers: 847 new acquisitions, 52% conversion to first purchase. Recommended: Launch VIP exclusive preview events."
                trend="up"
                metric="+23%"
                category="Insights"
                modulePath="/module/insights"
              />

              <AIInsightCard
                title="Operational Efficiency"
                summary="Average checkout time reduced by 18% this week following new POS system deployment. Customer satisfaction with checkout experience improved."
                details="Efficiency gains: 1) Average checkout: 2.8 minutes (down from 3.4 minutes), 2) Peak hour capacity: +25%, 3) Staff productivity: +12%. Customer feedback mentions 'quick service' up 31%. Continue monitoring system performance."
                trend="up"
                metric="-18%"
                category="Behavioural Analytics"
                modulePath="/module/behavioural-analytics"
              />
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-6">
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Detected Anomalies</h3>
                <p className="text-muted-foreground">AI-powered anomaly detection identifying patterns that deviate from historical norms</p>
              </div>
              
              <Card className="border-red-200 bg-red-50/50 card-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-red-900">Critical Anomaly</CardTitle>
                  </div>
                  <CardDescription className="text-red-700">
                    Unusual transaction pattern detected
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-red-900">
                  <p className="mb-2">
                    A spike in high-value transactions followed by immediate returns was detected in Store 7. 
                    This pattern matches known fraud signatures.
                  </p>
                  <Badge variant="destructive">Requires Immediate Action</Badge>
                </CardContent>
              </Card>

              <AIInsightCard
                title="Inventory Anomaly"
                summary="Stock levels for popular items dropped below reorder threshold in 4 stores. Potential stock-out risk identified."
                details="At-risk items: 1) Premium silk sarees (Store 2, 5, 8), 2) Designer blouses (Store 3, 7). Current stock: 2-3 days remaining at current sales velocity. Recommended: Expedite replenishment orders and consider inter-store transfers."
                trend="down"
                metric="4 stores"
                category="Atlas Prime"
                modulePath="/module/atlas-prime"
              />

              <AIInsightCard
                title="Traffic Pattern Shift"
                summary="Unusual decrease in morning traffic (9-11 AM) across all stores this week. Pattern differs from historical baseline."
                details="Analysis shows: 1) Morning traffic down 22% vs 4-week average, 2) Evening traffic stable, 3) No corresponding decrease in revenue (customers purchasing more per visit). Possible causes: Weather patterns, local events, changing customer behavior. Continue monitoring."
                trend="down"
                metric="-22%"
                category="Behavioural Analytics"
                modulePath="/module/behavioural-analytics"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AIInsights;
