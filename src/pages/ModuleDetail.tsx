import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { AIInsightCard } from "@/components/AIInsightCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react";

const moduleData: Record<string, any> = {
  "atlas-prime": {
    name: "Atlas Prime",
    description: "Complete brand performance analysis with detailed metrics and insights",
    insights: [
      {
        title: "Overall Performance Snapshot",
        summary: "Your business is performing 12% above target this month. Revenue, customer acquisition, and satisfaction metrics are all trending positively.",
        details: "Key metrics: Revenue ₹2.4Cr (+12%), New customers: 3,847 (+8%), Customer satisfaction: 4.2⭐ (+0.3), Average transaction value: ₹4,250 (+5%). Strong performance across all regions with Zone A leading growth.",
        trend: "up" as const,
        metric: "+12%",
        category: "Performance"
      },
      {
        title: "Top Performing Categories",
        summary: "Premium saree collection is your star performer, contributing 34% of total revenue with highest margins.",
        details: "Category breakdown: 1) Premium sarees: ₹81.6L (34% of revenue, 18% margin), 2) Designer blouses: ₹52.8L (22%), 3) Traditional wear: ₹48L (20%). Recommended: Expand premium saree inventory and consider exclusive designer collaborations.",
        trend: "up" as const,
        metric: "34%",
        category: "Revenue"
      },
      {
        title: "Store Performance Comparison",
        summary: "Store 3 and Store 7 are outperforming other locations by 15%+ in both revenue and customer satisfaction.",
        details: "Top performers: Store 3 (₹18.4L revenue, 4.5⭐ rating), Store 7 (₹17.2L revenue, 4.4⭐ rating). Success factors: 1) Experienced staff with 2+ years tenure, 2) Premium location with high foot traffic, 3) Effective merchandising and display. Consider applying best practices to underperforming stores.",
        trend: "neutral" as const,
        category: "Operations"
      }
    ]
  },
  "clickrev": {
    name: "Clickrev",
    description: "Customer reviews, ratings & sentiment analytics",
    insights: [
      {
        title: "Overall Sentiment Analysis",
        summary: "Customer sentiment improved to 4.2⭐ this month with 847 new reviews. Positive sentiment is at 78%, up from 71% last month.",
        details: "Review breakdown: Positive (78%, 659 reviews), Neutral (15%, 127 reviews), Negative (7%, 61 reviews). Most praised: Product quality (423 mentions), Customer service (389 mentions), Store ambiance (267 mentions).",
        trend: "up" as const,
        metric: "4.2⭐",
        category: "Sentiment"
      },
      {
        title: "Trending Topics",
        summary: "New saree collection receiving exceptional feedback. 'Beautiful designs' mentioned 147 times in past week.",
        details: "Top positive themes: 1) 'Beautiful new designs' (147 mentions), 2) 'Great fabric quality' (98 mentions), 3) 'Helpful staff' (89 mentions). Emerging concerns: 'Limited parking' (23 mentions), 'Long wait during weekends' (18 mentions).",
        trend: "up" as const,
        metric: "147",
        category: "Reviews"
      },
      {
        title: "Response Rate Impact",
        summary: "Stores with higher review response rates show 23% better customer retention and higher follow-up purchase rates.",
        details: "Response analysis: High response stores (>80% response rate): 4.4⭐ average, 67% retention. Low response stores (<40% response rate): 3.9⭐ average, 44% retention. Recommended: Implement systematic review response process across all locations.",
        trend: "up" as const,
        metric: "+23%",
        category: "Engagement"
      }
    ]
  },
  "behavioural-analytics": {
    name: "Behavioural Analytics",
    description: "Track customer behavior patterns and user journey",
    insights: [
      {
        title: "Customer Journey Analysis",
        summary: "Average customer journey involves 3.2 store visits before purchase. Digital touchpoints influence 67% of in-store purchases.",
        details: "Journey insights: 1) Research phase: 2.1 website visits, 1.4 social media interactions, 2) Consideration: 1.8 store visits, 0.9 phone inquiries, 3) Purchase: Made during 3rd visit on average. Cross-channel customers spend 34% more than single-channel customers.",
        trend: "neutral" as const,
        metric: "3.2",
        category: "Journey"
      },
      {
        title: "Drop-off Points",
        summary: "42% of customers who browse for >10 minutes but don't purchase cite 'need to check with family' as primary reason.",
        details: "Drop-off analysis: 1) Long browsers (>10 min): 42% don't purchase immediately, 68% return within 7 days, 2) Quick visitors (<5 min): 78% are researching, 52% return later. Recommended: Offer 'save favorites' feature and family consultation booking service.",
        trend: "down" as const,
        metric: "42%",
        category: "Funnel"
      },
      {
        title: "Peak Traffic Patterns",
        summary: "Weekend afternoons (2-5 PM) see 3x traffic but longer wait times. Conversion rate drops 12% during peak hours.",
        details: "Traffic patterns: Peak hours: Sat-Sun 2-5 PM (avg 347 visitors), Optimal hours: Weekday 11-1 PM (avg 124 visitors, highest conversion 5.2%). Recommendation: Implement appointment system for peak hours and offer weekday incentives.",
        trend: "down" as const,
        metric: "-12%",
        category: "Traffic"
      }
    ]
  },
  "fraud": {
    name: "Fraud Detection",
    description: "Identify fraud patterns and provide risk scoring",
    insights: [
      {
        title: "Fraud Risk Overview",
        summary: "Overall fraud risk is low with 0.8% of transactions flagged. Detection accuracy improved to 94% with new ML model.",
        details: "Risk metrics: Total transactions: 12,847, Flagged: 103 (0.8%), Confirmed fraud: 23 (22% of flagged), False positives reduced by 31%. Estimated savings: ₹4.2L prevented losses this month.",
        trend: "down" as const,
        metric: "0.8%",
        category: "Risk"
      },
      {
        title: "High-Risk Pattern Detection",
        summary: "Unusual return pattern detected in Zone 3 stores. Multiple high-value purchases followed by immediate returns across different locations.",
        details: "Pattern details: 1) 12 transactions identified, 2) Common characteristics: Cash payments, high-value items (>₹25,000), same-day returns, 3) Estimated exposure: ₹2.1L. Recommended actions: Enhanced verification for returns >₹5,000, staff training on fraud indicators, implement return ID verification.",
        trend: "down" as const,
        metric: "12",
        category: "Alert"
      },
      {
        title: "Payment Method Risk Analysis",
        summary: "Cash transactions over ₹50,000 have 4.2x higher fraud risk compared to digital payments.",
        details: "Risk by payment method: Cash (>₹50K): 3.4% fraud rate, Digital payments: 0.8% fraud rate, Credit card: 0.6% fraud rate. Recommendation: Implement additional verification steps for large cash transactions and incentivize digital payments for high-value purchases.",
        trend: "neutral" as const,
        metric: "4.2x",
        category: "Payment"
      }
    ]
  }
};

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const module = moduleData[moduleId || ""];

  if (!module) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-6 py-8">
          <p>Module not found</p>
        </main>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold mb-2">{module.name}</h1>
          <p className="text-muted-foreground">{module.description}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Performance Score</p>
                      <p className="text-2xl font-bold">92/100</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data Quality</p>
                      <p className="text-2xl font-bold">98%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Month over Month</p>
                      <p className="text-2xl font-bold text-green-600">+12.4%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year over Year</p>
                      <p className="text-2xl font-bold text-green-600">+28.7%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="outline">Export Data</Button>
                  <Button className="w-full" variant="outline">Schedule Report</Button>
                  <Button className="w-full" variant="outline">Configure Alerts</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes in this module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="font-medium">Data sync completed</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="font-medium">New insights generated</p>
                      <p className="text-sm text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    <div className="flex-1">
                      <p className="font-medium">Weekly report generated</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="space-y-4">
              {module.insights.map((insight: any, index: number) => (
                <AIInsightCard key={index} {...insight} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Generate and download detailed reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  Daily Performance Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Weekly Summary Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Monthly Analytics Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Custom Report Builder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ModuleDetail;
