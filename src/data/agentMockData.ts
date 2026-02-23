import { Agent, AgentMessage, WorkspaceWidget } from "@/types/agents";

export const agents: Agent[] = [
  {
    id: "data",
    name: "Data Agent",
    role: "Analytics & Insights",
    description: "Explores metrics, builds dashboards, and surfaces data-driven insights.",
    status: "idle",
    color: "agent-data",
    iconName: "BarChart3",
  },
  {
    id: "campaign",
    name: "Campaign Agent",
    role: "Marketing Intelligence",
    description: "Optimizes campaigns, tracks ROI, and manages audience segments.",
    status: "idle",
    color: "agent-campaign",
    iconName: "Megaphone",
  },
  {
    id: "product",
    name: "Product Agent",
    role: "Product & Integration",
    description: "Guides integrations, explains features, and provides technical docs.",
    status: "idle",
    color: "agent-product",
    iconName: "Box",
  },
];

// ========== SCENARIO TYPES ==========
export interface AgentScenario {
  keywords: string[];
  messages: AgentMessage[];
  widgets: WorkspaceWidget[];
  tools: string[];
}

// ========== DATA AGENT SCENARIOS ==========

const dataRevenueScenario: AgentScenario = {
  keywords: ["revenue", "sales", "quarter", "top performing"],
  messages: [
    {
      id: "d-rev-1",
      role: "user",
      agentId: "data",
      content: "Analyze last quarter revenue",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "d-rev-2",
      role: "agent",
      agentId: "data",
      content: "I've analyzed Q4 2025 revenue across all channels. Here's what I found:\n\n**Total Revenue:** ₹4.82Cr — up 12.3% QoQ\n\n• **Online** contributed 58% of revenue, growing 18% QoQ\n• **Retail stores** grew 6%, led by Tier-1 cities\n• **Average order value** increased from ₹1,240 to ₹1,380\n• **Repeat purchase rate** hit 34%, the highest in 4 quarters\n\nThe revenue spike in December was driven by the holiday campaign — I've loaded the breakdown in your workspace.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Break down by region", "Compare with Q3", "Show top products", "Export this analysis"],
    },
  ],
  widgets: [
    {
      type: "kpi",
      title: "Revenue KPIs",
      data: [
        { label: "Total Revenue", value: "₹4.82Cr", change: "+12.3%", trend: "up" },
        { label: "AOV", value: "₹1,380", change: "+11.3%", trend: "up" },
        { label: "Orders", value: "34,920", change: "+8.1%", trend: "up" },
        { label: "Repeat Rate", value: "34%", change: "+4.2%", trend: "up" },
      ],
    },
    {
      type: "chart",
      title: "Monthly Revenue Trend",
      data: [
        { name: "Oct", value: 14200000 },
        { name: "Nov", value: 15800000 },
        { name: "Dec", value: 18200000 },
      ],
    },
    {
      type: "chart",
      title: "Channel Mix",
      data: [
        { name: "Online", value: 58 },
        { name: "Retail", value: 32 },
        { name: "Wholesale", value: 10 },
      ],
    },
    {
      type: "insight",
      title: "Key Insight",
      data: {
        text: "December holiday campaign drove a 28% revenue spike. Saree and ethnic wear categories outperformed by 3x compared to baseline.",
        confidence: "high",
      },
    },
  ],
  tools: ["Querying revenue database…", "Aggregating quarterly metrics…", "Generating dashboard…"],
};

const dataFraudScenario: AgentScenario = {
  keywords: ["fraud", "suspicious", "risk", "anomaly", "security"],
  messages: [
    {
      id: "d-fraud-1",
      role: "user",
      agentId: "data",
      content: "Show me recent fraud patterns",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "d-fraud-2",
      role: "agent",
      agentId: "data",
      content: "I've detected a significant increase in fraudulent activity this week.\n\nFraud attempts are up **18%** compared to last week. Here's the breakdown by type:\n\n• **Account takeover** attempts increased by 24%\n• **Payment fraud** up by 15%\n• **Promo code abuse** increased by 12%\n• **Identity fraud** flagged 19 new cases\n\nThis spike correlates with your recent promotional campaign launch. I've loaded the risk distribution and alert details in your workspace.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Show high-risk customers", "Block suspicious accounts", "Review promo abuse details", "Export fraud report"],
    },
  ],
  widgets: [
    {
      type: "kpi",
      title: "Fraud Metrics",
      data: [
        { label: "Flagged Txns", value: "1,247", change: "+18%", trend: "down" },
        { label: "Amount at Risk", value: "₹24.6L", change: "+12%", trend: "down" },
        { label: "Fraud Rate", value: "2.8%", change: "+0.4%", trend: "down" },
        { label: "Model Accuracy", value: "94.2%", change: "+1.1%", trend: "up" },
      ],
    },
    {
      type: "chart",
      title: "Fraud Incidents by Type",
      data: [
        { name: "Takeover", value: 45 },
        { name: "Payment", value: 32 },
        { name: "Promo", value: 28 },
        { name: "Identity", value: 19 },
      ],
    },
    {
      type: "table",
      title: "Recent Fraud Alerts",
      data: {
        columns: ["Alert", "Type", "Affected", "Status"],
        rows: [
          ["Multiple logins from new IPs", "High", "342 users", "Active"],
          ["Unusual redemption velocity", "Medium", "89 users", "Investigating"],
          ["Promo stacking detected", "Medium", "156 txns", "Blocked"],
          ["Geo-anomaly in transactions", "Low", "23 users", "Monitoring"],
        ],
      },
    },
    {
      type: "insight",
      title: "Fraud Intelligence",
      data: {
        text: "The fraud spike correlates strongly with the promotional campaign started 3 days ago. Implementing additional verification for high-value orders and promotional redemptions is recommended.",
        confidence: "high",
      },
    },
  ],
  tools: ["Scanning transaction logs…", "Running fraud detection model…", "Analyzing risk patterns…"],
};

const dataRFMScenario: AgentScenario = {
  keywords: ["rfm", "segment", "customer segment", "segmentation", "loyalty", "churn", "at-risk", "vip"],
  messages: [
    {
      id: "d-rfm-1",
      role: "user",
      agentId: "data",
      content: "Show customer segments",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "d-rfm-2",
      role: "agent",
      agentId: "data",
      content: "I've analyzed **1.56L customers** using RFM segmentation over the last 90 days. Here's the breakdown:\n\n• **VIP Champions** (8%): 12,547 customers — avg spend ₹45.2K, highest engagement\n• **Loyal Customers** (20%): 31,368 — steady repeat buyers\n• **At Risk** (18%): 28,231 — haven't purchased in 45+ days, ₹62.4Cr revenue at risk\n• **Churned** (22%): 34,505 — inactive for 120+ days\n• **New Customers** (17%): 26,665 — need nurturing\n\nYour VIP segment contributes 32% of total revenue despite being only 8% of customers. The At-Risk segment needs immediate win-back campaigns.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Create campaign for At-Risk", "Show VIP customer details", "Compare with last quarter", "Export segment data"],
    },
  ],
  widgets: [
    {
      type: "kpi",
      title: "Segmentation Overview",
      data: [
        { label: "Total Customers", value: "1.56L", change: "+12.4%", trend: "up" },
        { label: "VIP Contribution", value: "32%", change: "+3.1%", trend: "up" },
        { label: "At Risk Value", value: "₹62.4Cr", change: "+8%", trend: "down" },
        { label: "Avg. Order Value", value: "₹18.2K", change: "+5.8%", trend: "up" },
      ],
    },
    {
      type: "chart",
      title: "Segment Distribution",
      data: [
        { name: "VIP", value: 12547 },
        { name: "Loyal", value: 31368 },
        { name: "Potential", value: 23526 },
        { name: "At Risk", value: 28231 },
        { name: "Churned", value: 34505 },
        { name: "New", value: 26665 },
      ],
    },
    {
      type: "table",
      title: "Segment Details",
      data: {
        columns: ["Segment", "Count", "Avg Spend", "Recency"],
        rows: [
          ["VIP Champions", "12,547", "₹45.2K", "3 days"],
          ["Loyal", "31,368", "₹28.5K", "7 days"],
          ["Potential", "23,526", "₹15.8K", "14 days"],
          ["At Risk", "28,231", "₹22.1K", "45 days"],
          ["Churned", "34,505", "₹8.9K", "120 days"],
          ["New", "26,665", "₹4.5K", "5 days"],
        ],
      },
    },
    {
      type: "insight",
      title: "Segmentation Insight",
      data: {
        text: "Your At-Risk segment has grown 8% MoM. A targeted win-back campaign with personalized discounts based on past purchases could recover up to ₹15Cr in revenue.",
        confidence: "high",
      },
    },
  ],
  tools: ["Running RFM model…", "Clustering customer profiles…", "Generating segment insights…"],
};

const dataSentimentScenario: AgentScenario = {
  keywords: ["sentiment", "feedback", "satisfaction", "nps", "review", "customer sentiment"],
  messages: [
    {
      id: "d-sent-1",
      role: "user",
      agentId: "data",
      content: "Analyze customer sentiment",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "d-sent-2",
      role: "agent",
      agentId: "data",
      content: "Here's your customer sentiment analysis:\n\nOverall sentiment score is **4.2/5** with some areas needing attention:\n\n• **Product quality** feedback is excellent at 4.6/5\n• **Delivery experience** dropped to 3.8/5 this week\n• **Customer support** maintaining steady at 4.1/5\n• **NPS Score** is 72, up from 68 last month\n\n23% of negative reviews mention late deliveries or damaged packaging. I've loaded the detailed breakdown in your workspace.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Show negative review themes", "Compare with last month", "Drill into delivery issues", "Export sentiment report"],
    },
  ],
  widgets: [
    {
      type: "kpi",
      title: "Sentiment Metrics",
      data: [
        { label: "Overall Score", value: "4.2/5", change: "+0.3", trend: "up" },
        { label: "NPS Score", value: "72", change: "+4", trend: "up" },
        { label: "Positive Reviews", value: "78%", change: "+5%", trend: "up" },
        { label: "Response Rate", value: "92%", change: "+2%", trend: "up" },
      ],
    },
    {
      type: "chart",
      title: "Sentiment by Category",
      data: [
        { name: "Product", value: 4.6 },
        { name: "Delivery", value: 3.8 },
        { name: "Support", value: 4.1 },
        { name: "Pricing", value: 3.9 },
        { name: "App UX", value: 4.3 },
      ],
    },
    {
      type: "table",
      title: "Top Issues",
      data: {
        columns: ["Issue", "Mentions", "Sentiment", "Trend"],
        rows: [
          ["Late delivery", "1,240", "Negative", "↑ +15%"],
          ["Damaged packaging", "890", "Negative", "↑ +8%"],
          ["Great product quality", "3,450", "Positive", "↑ +12%"],
          ["Easy returns", "2,100", "Positive", "→ Stable"],
        ],
      },
    },
    {
      type: "insight",
      title: "Sentiment Insight",
      data: {
        text: "Delivery experience is the main pain point. 23% of negative reviews mention late deliveries. Consider reviewing logistics partner performance and implementing proactive status updates.",
        confidence: "medium",
      },
    },
  ],
  tools: ["Analyzing review corpus…", "Running NLP sentiment model…", "Aggregating feedback scores…"],
};

const dataDefaultScenario: AgentScenario = {
  keywords: [],
  messages: [
    {
      id: "d-def-1",
      role: "user",
      agentId: "data",
      content: "",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "d-def-2",
      role: "agent",
      agentId: "data",
      content: "I can help you analyze your business data across multiple domains. Here's what I can do:\n\n• **Revenue Analysis** — Quarterly trends, channel mix, store performance\n• **Fraud Detection** — Risk patterns, suspicious activity, fraud alerts\n• **Customer Segmentation** — RFM analysis, loyalty tiers, churn risk\n• **Sentiment Analysis** — NPS scores, review insights, feedback trends\n\nWhat would you like to explore?",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Analyze last quarter revenue", "Show fraud patterns", "Show customer segments", "Analyze customer sentiment"],
    },
  ],
  widgets: [],
  tools: ["Processing your query…", "Searching knowledge base…"],
};

// ========== CAMPAIGN AGENT SCENARIOS ==========

const campaignDiwaliScenario: AgentScenario = {
  keywords: ["diwali", "campaign", "optimize", "roi", "audience"],
  messages: [
    {
      id: "c-diw-1",
      role: "user",
      agentId: "campaign",
      content: "Optimize Diwali campaign",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "c-diw-2",
      role: "agent",
      agentId: "campaign",
      content: "I've analyzed the Diwali 2025 campaign performance and identified optimization opportunities:\n\n**Campaign Score:** 74/100 — Good, but room to improve\n\n• **Email channel** has the highest ROI at 8.2x\n• **Push notifications** are underperforming — 2.1% CTR vs 4.5% benchmark\n• **Audience segment** 'Lapsed Buyers' shows 3x higher conversion when targeted with 15% discount vs flat offers\n• **Best send window:** 6-8 PM IST on weekdays\n\nI've prepared a funnel breakdown and ROI comparison in your workspace.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Suggest better audience segments", "Compare with last Diwali", "A/B test recommendations", "Budget reallocation plan"],
    },
  ],
  widgets: [
    {
      type: "kpi",
      title: "Campaign Metrics",
      data: [
        { label: "Campaign Score", value: "74/100", change: "+8", trend: "up" },
        { label: "Total Reach", value: "2.4M", change: "+22%", trend: "up" },
        { label: "Conversions", value: "18,420", change: "+15%", trend: "up" },
        { label: "ROI", value: "6.8x", change: "+1.2x", trend: "up" },
      ],
    },
    {
      type: "funnel",
      title: "Campaign Funnel",
      data: [
        { stage: "Impressions", value: 2400000, pct: 100 },
        { stage: "Clicks", value: 192000, pct: 8 },
        { stage: "Add to Cart", value: 48000, pct: 2 },
        { stage: "Purchase", value: 18420, pct: 0.77 },
      ],
    },
    {
      type: "table",
      title: "Channel ROI Comparison",
      data: {
        columns: ["Channel", "Spend", "Revenue", "ROI"],
        rows: [
          ["Email", "₹2.4L", "₹19.7L", "8.2x"],
          ["SMS", "₹1.8L", "₹10.8L", "6.0x"],
          ["Push", "₹0.6L", "₹1.9L", "3.2x"],
          ["WhatsApp", "₹1.2L", "₹8.4L", "7.0x"],
        ],
      },
    },
    {
      type: "budget",
      title: "Budget Allocation",
      data: [
        { channel: "Email", current: 30, recommended: 40 },
        { channel: "SMS", current: 25, recommended: 20 },
        { channel: "Push", current: 15, recommended: 8 },
        { channel: "WhatsApp", current: 20, recommended: 25 },
        { channel: "Social", current: 10, recommended: 7 },
      ],
    },
  ],
  tools: ["Analyzing campaign metrics…", "Running segmentation model…", "Calculating ROI projections…"],
};

const campaignChannelScenario: AgentScenario = {
  keywords: ["channel", "compare", "rcs", "email", "sms", "push", "whatsapp"],
  messages: [
    {
      id: "c-ch-1",
      role: "user",
      agentId: "campaign",
      content: "Compare channel ROI",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "c-ch-2",
      role: "agent",
      agentId: "campaign",
      content: "I've compared all marketing channels across key performance metrics:\n\n**Top Performer:** RCS with 4.2x ROAS and 17.3% CTR\n\n• **RCS** — 89.2% open rate, highest engagement channel\n• **Push** — 8.9M revenue but declining CTR (-2.1% MoM)\n• **Email** — Largest reach at 1.25M deliveries, 3.2x ROAS\n• **SMS** — 94.8% open rate but lowest ROAS at 2.8x\n\nRecommendation: Shift 20% of SMS budget to RCS for better ROI.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Show daily channel trends", "Suggest budget reallocation", "Best performing content", "Audience overlap analysis"],
    },
  ],
  widgets: [
    {
      type: "kpi",
      title: "Channel Performance",
      data: [
        { label: "Best ROAS", value: "4.2x (RCS)", change: "+12.5%", trend: "up" },
        { label: "Total Revenue", value: "₹2.6Cr", change: "+8.3%", trend: "up" },
        { label: "Avg CTR", value: "14.3%", change: "+1.2%", trend: "up" },
        { label: "Total Reach", value: "28.5L", change: "+15%", trend: "up" },
      ],
    },
    {
      type: "chart",
      title: "ROAS by Channel",
      data: [
        { name: "RCS", value: 4.2 },
        { name: "Push", value: 3.8 },
        { name: "Email", value: 3.2 },
        { name: "SMS", value: 2.8 },
      ],
    },
    {
      type: "table",
      title: "Channel Comparison",
      data: {
        columns: ["Channel", "Deliveries", "CTR", "ROAS", "Trend"],
        rows: [
          ["RCS", "2.45L", "17.3%", "4.2x", "↑ +12.5%"],
          ["Push", "8.90L", "15.0%", "3.8x", "↑ +8.3%"],
          ["Email", "12.50L", "13.0%", "3.2x", "↓ -2.1%"],
          ["SMS", "4.50L", "12.0%", "2.8x", "↑ +5.7%"],
        ],
      },
    },
    {
      type: "insight",
      title: "Channel Intelligence",
      data: {
        text: "RCS shows 32% higher engagement than SMS. Consider shifting 20% of SMS budget to RCS. Push notifications at 2-4 PM IST show 45% higher CTR.",
        confidence: "high",
      },
    },
  ],
  tools: ["Fetching channel analytics…", "Comparing performance metrics…", "Generating recommendations…"],
};

const campaignDefaultScenario: AgentScenario = {
  keywords: [],
  messages: [
    {
      id: "c-def-1",
      role: "user",
      agentId: "campaign",
      content: "",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "c-def-2",
      role: "agent",
      agentId: "campaign",
      content: "I can help you optimize your marketing campaigns. Here's what I can do:\n\n• **Campaign Optimization** — Performance scoring, A/B testing, audience targeting\n• **Channel Analysis** — Compare ROI across RCS, Email, SMS, Push, WhatsApp\n• **Budget Planning** — Reallocation recommendations based on performance\n• **Audience Segmentation** — Find the right audience for your campaigns\n\nWhat would you like to explore?",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Optimize Diwali campaign", "Compare channel ROI", "Audience segmentation insights", "Budget reallocation plan"],
    },
  ],
  widgets: [],
  tools: ["Processing your query…", "Searching campaign data…"],
};

// ========== PRODUCT AGENT SCENARIOS ==========

const productCRMScenario: AgentScenario = {
  keywords: ["crm", "integration", "api", "connect", "salesforce", "hubspot"],
  messages: [
    {
      id: "p-crm-1",
      role: "user",
      agentId: "product",
      content: "How does CRM integration work?",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "p-crm-2",
      role: "agent",
      agentId: "product",
      content: "Here's how the Zence 360 CRM integration works:\n\n**Overview:** Zence 360 connects to your CRM via REST APIs and webhooks. It supports bi-directional sync of customer profiles, purchase history, and segment memberships.\n\n**Supported CRMs:** Salesforce, HubSpot, Zoho CRM, and custom REST endpoints.\n\n**Key features:**\n• Real-time customer profile sync\n• Automated segment push to CRM\n• Campaign response tracking\n• Custom field mapping\n\nI've loaded the integration guide, code examples, and checklist in your workspace.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Show webhook setup", "Salesforce-specific guide", "Authentication flow", "Rate limits and quotas"],
    },
  ],
  widgets: [
    {
      type: "code",
      title: "API Integration Example",
      data: {
        language: "typescript",
        code: `// Initialize Zence 360 CRM connector
import { ZenceClient } from '@zence/sdk';

const client = new ZenceClient({
  apiKey: process.env.ZENCE_API_KEY,
  crmProvider: 'salesforce',
  syncInterval: '5m',
});

// Sync customer profiles
await client.sync.customers({
  fields: ['email', 'name', 'loyalty_tier'],
  direction: 'bidirectional',
  conflictResolution: 'latest_wins',
});

// Push segment to CRM
await client.segments.push({
  segmentId: 'high_value_customers',
  targetList: 'SF_Campaign_Q4',
});`,
      },
    },
    {
      type: "checklist",
      title: "Integration Checklist",
      data: [
        { label: "API key generated", done: true },
        { label: "CRM provider configured", done: true },
        { label: "Field mapping completed", done: false },
        { label: "Webhook endpoint registered", done: false },
        { label: "Test sync executed", done: false },
        { label: "Production go-live", done: false },
      ],
    },
    {
      type: "table",
      title: "Supported Endpoints",
      data: {
        columns: ["Endpoint", "Method", "Description"],
        rows: [
          ["/api/v1/customers", "GET/POST", "Customer profile CRUD"],
          ["/api/v1/segments", "GET/POST", "Segment management"],
          ["/api/v1/sync", "POST", "Trigger manual sync"],
          ["/api/v1/webhooks", "POST", "Register webhooks"],
          ["/api/v1/mappings", "PUT", "Field mapping config"],
        ],
      },
    },
    {
      type: "insight",
      title: "Integration Tip",
      data: {
        text: "Use bi-directional sync with 'latest_wins' conflict resolution for best results. This ensures both systems stay in sync without data loss.",
        confidence: "medium",
      },
    },
  ],
  tools: ["Searching documentation…", "Generating API example…", "Loading integration guide…"],
};

const productFeatureScenario: AgentScenario = {
  keywords: ["feature", "documentation", "doc", "how to", "guide", "comparison"],
  messages: [
    {
      id: "p-feat-1",
      role: "user",
      agentId: "product",
      content: "Feature comparison",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "p-feat-2",
      role: "agent",
      agentId: "product",
      content: "Here's a comparison of Zence 360 modules and their capabilities:\n\n**Atlas Prime** — Store analytics, footfall tracking, heatmaps\n**Atlas Neo** — Advanced AI predictions, customer scoring\n**Clickrev** — Revenue attribution, conversion optimization\n**Segcon** — Customer segmentation, cohort analysis\n\nAll modules share a unified data layer and can be configured independently. I've loaded the feature matrix and architecture overview in your workspace.",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["Atlas Prime vs Neo details", "Pricing information", "Setup requirements", "Migration guide"],
    },
  ],
  widgets: [
    {
      type: "table",
      title: "Feature Matrix",
      data: {
        columns: ["Feature", "Atlas Prime", "Atlas Neo", "Clickrev", "Segcon"],
        rows: [
          ["Real-time Analytics", "✓", "✓", "✓", "—"],
          ["AI Predictions", "—", "✓", "✓", "✓"],
          ["Custom Dashboards", "✓", "✓", "✓", "✓"],
          ["API Access", "✓", "✓", "✓", "✓"],
          ["White-label", "—", "✓", "—", "—"],
        ],
      },
    },
    {
      type: "checklist",
      title: "Setup Requirements",
      data: [
        { label: "API key configured", done: true },
        { label: "Data source connected", done: true },
        { label: "User roles assigned", done: true },
        { label: "Dashboards customized", done: false },
        { label: "Alerts configured", done: false },
      ],
    },
    {
      type: "insight",
      title: "Recommendation",
      data: {
        text: "Based on your current usage, Atlas Neo + Segcon combination would provide the most value. Atlas Neo's AI predictions paired with Segcon's segmentation engine enables automated campaign targeting.",
        confidence: "high",
      },
    },
  ],
  tools: ["Searching documentation…", "Loading feature matrix…", "Comparing modules…"],
};

const productDefaultScenario: AgentScenario = {
  keywords: [],
  messages: [
    {
      id: "p-def-1",
      role: "user",
      agentId: "product",
      content: "",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "p-def-2",
      role: "agent",
      agentId: "product",
      content: "I can help you with product documentation, integrations, and technical guidance. Here's what I can do:\n\n• **CRM Integration** — Setup guides, API examples, webhook configuration\n• **Feature Documentation** — Module comparisons, architecture guides\n• **Technical Support** — Troubleshooting, best practices, code examples\n\nWhat would you like to explore?",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      followUps: ["How does CRM integration work?", "Show API documentation", "Feature comparison", "Setup guide"],
    },
  ],
  widgets: [],
  tools: ["Processing your query…", "Searching documentation…"],
};

// ========== SCENARIO REGISTRY ==========

export const agentScenarios: Record<string, AgentScenario[]> = {
  data: [dataRevenueScenario, dataFraudScenario, dataRFMScenario, dataSentimentScenario, dataDefaultScenario],
  campaign: [campaignDiwaliScenario, campaignChannelScenario, campaignDefaultScenario],
  product: [productCRMScenario, productFeatureScenario, productDefaultScenario],
};

export function matchScenario(agentId: string, query: string): AgentScenario {
  const scenarios = agentScenarios[agentId] || [];
  const lowerQuery = query.toLowerCase();

  for (const scenario of scenarios) {
    if (scenario.keywords.length === 0) continue; // skip default
    if (scenario.keywords.some((kw) => lowerQuery.includes(kw))) {
      return scenario;
    }
  }

  // Return default (last scenario with empty keywords)
  return scenarios[scenarios.length - 1] || scenarios[0];
}

// Legacy exports for backward compatibility
export const dataAgentConversation = dataRevenueScenario.messages;
export const dataWorkspaceWidgets = dataRevenueScenario.widgets;
export const campaignAgentConversation = campaignDiwaliScenario.messages;
export const campaignWorkspaceWidgets = campaignDiwaliScenario.widgets;
export const productAgentConversation = productCRMScenario.messages;
export const productWorkspaceWidgets = productCRMScenario.widgets;

export const toolActions: Record<string, string[]> = {
  data: dataRevenueScenario.tools,
  campaign: campaignDiwaliScenario.tools,
  product: productCRMScenario.tools,
};
