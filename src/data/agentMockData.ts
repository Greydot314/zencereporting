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

// --- DATA AGENT SCENARIO ---
export const dataAgentConversation: AgentMessage[] = [
  {
    id: "d1",
    role: "user",
    agentId: "data",
    content: "Analyze last quarter revenue",
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: "d2",
    role: "agent",
    agentId: "data",
    content: "I've analyzed Q4 2025 revenue across all channels. Here's what I found:\n\n**Total Revenue:** ₹4.82Cr — up 12.3% QoQ\n\n• **Online** contributed 58% of revenue, growing 18% QoQ\n• **Retail stores** grew 6%, led by Tier-1 cities\n• **Average order value** increased from ₹1,240 to ₹1,380\n• **Repeat purchase rate** hit 34%, the highest in 4 quarters\n\nThe revenue spike in December was driven by the holiday campaign — I've loaded the breakdown in your workspace.",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    followUps: [
      "Break down by region",
      "Compare with Q3",
      "Show top products",
      "Export this analysis",
    ],
  },
];

export const dataWorkspaceWidgets: WorkspaceWidget[] = [
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
];

// --- CAMPAIGN AGENT SCENARIO ---
export const campaignAgentConversation: AgentMessage[] = [
  {
    id: "c1",
    role: "user",
    agentId: "campaign",
    content: "Optimize Diwali campaign",
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: "c2",
    role: "agent",
    agentId: "campaign",
    content: "I've analyzed the Diwali 2025 campaign performance and identified optimization opportunities:\n\n**Campaign Score:** 74/100 — Good, but room to improve\n\n• **Email channel** has the highest ROI at 8.2x\n• **Push notifications** are underperforming — 2.1% CTR vs 4.5% benchmark\n• **Audience segment** 'Lapsed Buyers' shows 3x higher conversion when targeted with 15% discount vs flat offers\n• **Best send window:** 6-8 PM IST on weekdays\n\nI've prepared a funnel breakdown and ROI comparison in your workspace.",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    followUps: [
      "Suggest better audience segments",
      "Compare with last Diwali",
      "A/B test recommendations",
      "Budget reallocation plan",
    ],
  },
];

export const campaignWorkspaceWidgets: WorkspaceWidget[] = [
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
];

// --- PRODUCT AGENT SCENARIO ---
export const productAgentConversation: AgentMessage[] = [
  {
    id: "p1",
    role: "user",
    agentId: "product",
    content: "How does CRM integration work?",
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: "p2",
    role: "agent",
    agentId: "product",
    content: "Here's how the Zence 360 CRM integration works:\n\n**Overview:** Zence 360 connects to your CRM via REST APIs and webhooks. It supports bi-directional sync of customer profiles, purchase history, and segment memberships.\n\n**Supported CRMs:** Salesforce, HubSpot, Zoho CRM, and custom REST endpoints.\n\n**Key features:**\n• Real-time customer profile sync\n• Automated segment push to CRM\n• Campaign response tracking\n• Custom field mapping\n\nI've loaded the integration guide, code examples, and checklist in your workspace.",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    followUps: [
      "Show webhook setup",
      "Salesforce-specific guide",
      "Authentication flow",
      "Rate limits and quotas",
    ],
  },
];

export const productWorkspaceWidgets: WorkspaceWidget[] = [
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
];

// Tool action messages per agent
export const toolActions: Record<string, string[]> = {
  data: [
    "Querying revenue database…",
    "Aggregating quarterly metrics…",
    "Generating dashboard…",
  ],
  campaign: [
    "Analyzing campaign metrics…",
    "Running segmentation model…",
    "Calculating ROI projections…",
  ],
  product: [
    "Searching documentation…",
    "Generating API example…",
    "Loading integration guide…",
  ],
};
