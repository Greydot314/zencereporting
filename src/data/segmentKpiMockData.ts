export interface KpiCard {
  label: string;
  value: string;
  sub?: string;
  subColor?: "green" | "amber" | "red" | "neutral";
}

export interface BarItem {
  label: string;
  value: number;
}

export interface DurationData {
  healthScore: number;
  healthLabel: string;
  healthPercentile: number;
  totalCustomers: number;
  overview: {
    volume: KpiCard[];
    monetary: KpiCard[];
    engagement: KpiCard[];
    genderSplit: BarItem[];
    ageSplit: BarItem[];
  };
  loyalty: {
    pointsActivity: KpiCard[];
    pointsRisk: KpiCard[];
    tierDynamics: KpiCard[];
    alert: string;
  };
  transactions: {
    purchaseBehaviour: KpiCard[];
    categoryAffinity: BarItem[];
    crossSell: KpiCard[];
    insight: string;
  };
  channels: {
    channelSplit: BarItem[];
    reachability: KpiCard[];
    storeConcentration: BarItem[];
    recommendation: string;
  };
  campaigns: {
    responseHistory: KpiCard[];
    bestCampaignType: BarItem[];
    communicationHealth: KpiCard[];
    recommendation: string;
  };
}

export type DurationKey = "lifetime" | "12m" | "6m" | "3m";

const base: DurationData = {
  healthScore: 82,
  healthLabel: "Very Good",
  healthPercentile: 12,
  totalCustomers: 4520,
  overview: {
    volume: [
      { label: "Total Customers", value: "4,520", sub: "Active: 3,610 · 79.9%", subColor: "green" },
      { label: "Repeat Customers", value: "2,108", sub: "46.6% of total" },
      { label: "Redeemers", value: "1,582", sub: "35.0% redemption rate", subColor: "green" },
      { label: "New This Month", value: "164", sub: "+8 vs last mo", subColor: "green" },
      { label: "Dormant", value: "910", sub: "20.1% of total" },
      { label: "Avg Loyalty Tier", value: "Silver", sub: "Tier 2 / 4" },
    ],
    monetary: [
      { label: "Total Sales", value: "₹1.24Cr", sub: "Segment revenue" },
      { label: "Avg Order Value", value: "₹2,740", sub: "+12% vs all customers", subColor: "green" },
      { label: "Avg Visits / Customer", value: "4.3", sub: "Per customer" },
      { label: "Avg Basket Size", value: "3.1", sub: "Items per txn" },
    ],
    engagement: [
      { label: "Avg Recency", value: "18 days", sub: "Since last purchase" },
      { label: "Avg Latency", value: "32 days", sub: "Between purchases" },
      { label: "Churn Risk", value: "Low", sub: "8.2% at-risk", subColor: "green" },
      { label: "Predicted LTV", value: "₹18,400", sub: "Next 12 months" },
    ],
    genderSplit: [
      { label: "Female", value: 62 },
      { label: "Male", value: 38 },
    ],
    ageSplit: [
      { label: "18–25", value: 14 },
      { label: "25–35", value: 38 },
      { label: "35–45", value: 32 },
      { label: "45+", value: 16 },
    ],
  },
  loyalty: {
    pointsActivity: [
      { label: "Avg Points Balance", value: "2,840", sub: "Per customer" },
      { label: "Avg Points Earned", value: "1,620", sub: "+18% vs avg", subColor: "green" },
      { label: "Avg Points Burned", value: "980", sub: "Per customer" },
      { label: "Burn Rate", value: "60.5%", sub: "Of earned points used" },
    ],
    pointsRisk: [
      { label: "Expiring in 30 Days", value: "48,200 pts", sub: "312 customers affected", subColor: "red" },
      { label: "Expiring in 90 Days", value: "1,24,000 pts", sub: "890 customers affected", subColor: "amber" },
      { label: "Dormant Point Holders", value: "428", sub: "No burn in 6 months", subColor: "amber" },
    ],
    tierDynamics: [
      { label: "Tier Upgrade Candidates", value: "342", sub: "Within 500 pts of next tier", subColor: "green" },
      { label: "Tier Downgrade Risk", value: "186", sub: "Renewal due in 60 days", subColor: "amber" },
      { label: "Redemption Rate", value: "35.0%", sub: "+4.2% vs all customers", subColor: "green" },
      { label: "Preferred Reward Type", value: "Discount", sub: "62% prefer discounts" },
    ],
    alert: "186 customers are at tier downgrade risk with renewal due in 60 days. Consider a targeted points top-up campaign to retain tier status.",
  },
  transactions: {
    purchaseBehaviour: [
      { label: "Total Transactions", value: "19,436", sub: "In segment" },
      { label: "Avg Txn / Customer", value: "4.3", sub: "+0.8 vs avg", subColor: "green" },
      { label: "Full Price Ratio", value: "41%", sub: "Buy without discount", subColor: "green" },
      { label: "Discount Ratio", value: "59%", sub: "Only buy on offer", subColor: "amber" },
    ],
    categoryAffinity: [
      { label: "Apparel", value: 68 },
      { label: "Footwear", value: 45 },
      { label: "Accessories", value: 32 },
      { label: "Beauty", value: 28 },
      { label: "Electronics", value: 12 },
    ],
    crossSell: [
      { label: "Avg Categories / Customer", value: "2.1", sub: "Categories purchased" },
      { label: "Single-Category Buyers", value: "1,840", sub: "Cross-sell opportunity", subColor: "amber" },
      { label: "Multi-Category Buyers", value: "2,680", sub: "Higher LTV", subColor: "green" },
    ],
    insight: "Apparel and Footwear are the top two categories with a combined 72% coverage. Multi-category buyers in these show 2.4x higher LTV than single-category buyers.",
  },
  channels: {
    channelSplit: [
      { label: "In-Store", value: 52 },
      { label: "App", value: 31 },
      { label: "Website", value: 17 },
    ],
    reachability: [
      { label: "RCS Reachable", value: "3,210", sub: "71% RCS-capable devices", subColor: "green" },
      { label: "Email Reachable", value: "3,840", sub: "91% valid email", subColor: "green" },
      { label: "SMS Reachable", value: "4,120", sub: "94% mobile coverage", subColor: "green" },
      { label: "WhatsApp Opted-In", value: "2,140", sub: "47% opt-in rate", subColor: "amber" },
    ],
    storeConcentration: [
      { label: "Phoenix Mall", value: 28 },
      { label: "Select Citywalk", value: 19 },
      { label: "Ambience Mall", value: 14 },
      { label: "Others", value: 39 },
    ],
    recommendation: "SMS has the highest reachability at 94% mobile coverage. Use SMS as the primary channel for this segment.",
  },
  campaigns: {
    responseHistory: [
      { label: "Avg Open Rate", value: "34.2%", sub: "+6.1% vs avg", subColor: "green" },
      { label: "Avg Click Rate", value: "8.4%", sub: "+2.3% vs avg", subColor: "green" },
      { label: "Avg Redemption Rate", value: "12.8%", sub: "+3.1% vs avg", subColor: "green" },
      { label: "Campaigns Received", value: "14", sub: "In selected period" },
    ],
    bestCampaignType: [
      { label: "Delivered", value: 98 },
      { label: "Opened", value: 34 },
      { label: "Clicked", value: 12 },
      { label: "Redeemed", value: 8 },
    ],
    communicationHealth: [
      { label: "Last Campaign Sent", value: "12 days ago", sub: "Safe to contact", subColor: "green" },
      { label: "Fatigue Score", value: "Low", sub: "Well-spaced cadence", subColor: "green" },
      { label: "Unsubscribe Rate", value: "0.6%", sub: "Below 1%", subColor: "green" },
    ],
    recommendation: "Funnel drop-off is steepest from Opened (34%) to Clicked (12%). Tighten subject-line to CTA alignment to lift click-through for this segment.",
  },
};

const make6m: DurationData = {
  ...base,
  healthScore: 76,
  healthLabel: "Good",
  healthPercentile: 22,
  totalCustomers: 4520,
  overview: {
    ...base.overview,
    volume: [
      { label: "Total Customers", value: "4,520", sub: "Active: 3,200 · 70.8%", subColor: "green" },
      { label: "Repeat Customers", value: "1,800", sub: "39.8% of total" },
      { label: "Redeemers", value: "1,280", sub: "28.3% redemption rate" },
      { label: "New (6m)", value: "640", sub: "Added in period", subColor: "green" },
      { label: "Dormant", value: "1,320", sub: "29.2% of total", subColor: "amber" },
      { label: "Avg Loyalty Tier", value: "Silver", sub: "Tier 2 / 4" },
    ],
    monetary: [
      { label: "Total Sales", value: "₹68.2L", sub: "Segment revenue" },
      { label: "Avg Order Value", value: "₹2,580", sub: "+8% vs all customers", subColor: "green" },
      { label: "Avg Visits / Customer", value: "2.8", sub: "Per customer" },
      { label: "Avg Basket Size", value: "2.9", sub: "Items per txn" },
    ],
  },
};

const make3m: DurationData = {
  ...base,
  healthScore: 68,
  healthLabel: "Good",
  healthPercentile: 35,
  totalCustomers: 4520,
  overview: {
    ...base.overview,
    volume: [
      { label: "Total Customers", value: "4,520", sub: "Active: 2,400 · 53.1%", subColor: "amber" },
      { label: "Repeat Customers", value: "1,100", sub: "24.3% of total" },
      { label: "Redeemers", value: "820", sub: "18.1% redemption rate", subColor: "amber" },
      { label: "New (3m)", value: "280", sub: "Added in period" },
      { label: "Dormant", value: "2,120", sub: "46.9% of total", subColor: "red" },
      { label: "Avg Loyalty Tier", value: "Silver", sub: "Tier 2 / 4" },
    ],
    monetary: [
      { label: "Total Sales", value: "₹32.1L", sub: "Segment revenue" },
      { label: "Avg Order Value", value: "₹2,420", sub: "+4% vs all customers", subColor: "green" },
      { label: "Avg Visits / Customer", value: "1.6", sub: "Per customer" },
      { label: "Avg Basket Size", value: "2.7", sub: "Items per txn" },
    ],
  },
};

const makeLifetime: DurationData = {
  ...base,
  healthScore: 85,
  healthLabel: "Very Good",
  healthPercentile: 8,
  overview: {
    ...base.overview,
    volume: [
      { label: "Total customers", value: "4,520", sub: "Active: 4,100  90.7%", subColor: "green" },
      { label: "Repeat customers", value: "3,200", sub: "70.8% of segment", subColor: "green" },
      { label: "Redeemers", value: "2,400", sub: "53.1% redemption" },
      { label: "New this month", value: "184", sub: "+12 vs last mo", subColor: "green" },
      { label: "Dormant", value: "420", sub: "9.3% of segment" },
      { label: "Avg loyalty tier", value: "Gold", sub: "Tier 2 / 4" },
    ],
    monetary: [
      { label: "Total sales (lifetime)", value: "₹3.8Cr", sub: "+18% vs last period", subColor: "green" },
      { label: "Avg order value", value: "₹2,900", sub: "+16% vs all customers", subColor: "green" },
      { label: "Avg visits / customer", value: "8.2", sub: "Per customer" },
      { label: "Avg basket size", value: "3.4", sub: "Items per txn" },
      { label: "Revenue / customer", value: "₹8,407", sub: "Lifetime avg" },
      { label: "Spend share", value: "22.4%", sub: "Of total portfolio" },
    ],
    engagement: [
      { label: "Avg recency", value: "24 days", sub: "Since last purchase", subColor: "green" },
      { label: "Churn risk", value: "14.2%", sub: "Medium", subColor: "amber" },
      { label: "Predicted LTV", value: "₹12,400", sub: "Next 12 months" },
    ],
  },
};

export const segmentKpiByDuration: Record<DurationKey, DurationData> = {
  lifetime: makeLifetime,
  "12m": base,
  "6m": make6m,
  "3m": make3m,
};
