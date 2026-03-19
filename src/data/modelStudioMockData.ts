export interface CatalogModel {
  id: string;
  name: string;
  type: 'AI-Powered' | 'Rule-Based' | 'Hybrid' | 'Custom';
  inputData: string[];
  output: string;
  description: string;
  recommended?: boolean;
}

export interface MyModel {
  id: string;
  name: string;
  baseModel: string;
  dataSource: string;
  lastRun: string;
  status: 'Completed' | 'Running' | 'Scheduled' | 'Failed' | 'Draft';
  segmentsGenerated: number;
}

export interface RunHistoryEntry {
  runId: string;
  modelName: string;
  triggeredBy: { name: string; avatar: string };
  startedAt: string;
  duration: string;
  status: 'Completed' | 'Failed' | 'Running';
  segmentsOutput: number;
  errorLog?: string;
}

export const catalogModels: CatalogModel[] = [
  {
    id: 'rfm',
    name: 'RFM Segmentation',
    type: 'Rule-Based',
    inputData: ['Transactional'],
    output: '5 RFM tiers (Champions, Loyal, At-Risk, Hibernating, Lost)',
    description: 'Segments customers by Recency, Frequency, and Monetary value of transactions. Best for loyalty and CRM programs.',
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    type: 'AI-Powered',
    inputData: ['Transactional', 'Behavioral'],
    output: 'Configurable clusters (3–10)',
    description: 'Unsupervised ML clustering that finds natural groupings across any combination of customer attributes.',
  },
  {
    id: 'churn',
    name: 'Churn Propensity Model',
    type: 'AI-Powered',
    inputData: ['Transactional', 'Behavioral'],
    output: 'Scored list (0–100 churn risk score per customer)',
    description: 'Predicts likelihood of customer churn using behavioral signals and purchase patterns. Triggers retention workflows.',
  },
  {
    id: 'clv',
    name: 'CLV Prediction',
    type: 'AI-Powered',
    inputData: ['Transactional'],
    output: '4 value tiers (High, Medium, Low, Dormant)',
    description: 'Forecasts Customer Lifetime Value using BG-NBD model to identify your most valuable future customers.',
  },
  {
    id: 'product-propensity',
    name: 'Product Propensity',
    type: 'AI-Powered',
    inputData: ['Transactional', 'Product Catalog'],
    output: 'Top-N product scores per customer',
    description: 'Predicts which products each customer is most likely to purchase next. Powers next-best-offer campaigns.',
  },
  {
    id: 'demo-behavioral',
    name: 'Demographic + Behavioral Hybrid',
    type: 'Hybrid',
    inputData: ['Demographic', 'Behavioral'],
    output: 'Named personas (e.g., "Weekend Splurger", "Loyal Minimalist")',
    description: 'Combines demographic profiles with behavioral signals to create rich, named customer personas for marketing teams.',
  },
  {
    id: 'custom-sql',
    name: 'Custom SQL + AI Layer',
    type: 'Custom',
    inputData: ['Any (user defines SQL query)'],
    output: 'User-defined',
    description: 'Define your own base segment using SQL, then layer AI scoring on top. Full control with AI augmentation.',
  },
  {
    id: 'auto-segment',
    name: 'AI Auto-Segment',
    type: 'AI-Powered',
    inputData: ['Transactional', 'Behavioral', 'Demographic'],
    output: 'Auto-detected optimal segments',
    description: 'Let the AI choose the best model and number of segments automatically based on your data profile. Recommended for first-time runs.',
    recommended: true,
  },
];

export const myModels: MyModel[] = [
  { id: '1', name: 'RFM Q1 2025 - Brand A', baseModel: 'RFM Segmentation', dataSource: 'Atlantis Retail DB', lastRun: '3 days ago', status: 'Completed', segmentsGenerated: 5 },
  { id: '2', name: 'Churn Risk - All Brands', baseModel: 'Churn Propensity Model', dataSource: 'ClickHouse - Brand A', lastRun: '1 hour ago', status: 'Running', segmentsGenerated: 0 },
  { id: '3', name: 'CLV Tiers - Premium', baseModel: 'CLV Prediction', dataSource: 'Atlantis Retail DB', lastRun: '1 week ago', status: 'Completed', segmentsGenerated: 4 },
  { id: '4', name: 'K-Means Exploration', baseModel: 'K-Means Clustering', dataSource: 'ClickHouse - Brand B', lastRun: '—', status: 'Draft', segmentsGenerated: 0 },
  { id: '5', name: 'Auto-Segment Monthly', baseModel: 'AI Auto-Segment', dataSource: 'Atlantis Retail DB', lastRun: '2 days ago', status: 'Scheduled', segmentsGenerated: 7 },
  { id: '6', name: 'Product Affinity - Brand B', baseModel: 'Product Propensity', dataSource: 'ClickHouse - Brand B', lastRun: '5 days ago', status: 'Failed', segmentsGenerated: 0 },
];

export const runHistory: RunHistoryEntry[] = [
  { runId: 'RUN-0041', modelName: 'RFM Q1 2025 - Brand A', triggeredBy: { name: 'Priya Sharma', avatar: 'PS' }, startedAt: '2025-03-12 14:30', duration: '4m 12s', status: 'Completed', segmentsOutput: 5 },
  { runId: 'RUN-0040', modelName: 'Churn Risk - All Brands', triggeredBy: { name: 'Rahul Mehta', avatar: 'RM' }, startedAt: '2025-03-12 13:15', duration: '—', status: 'Running', segmentsOutput: 0 },
  { runId: 'RUN-0039', modelName: 'CLV Tiers - Premium', triggeredBy: { name: 'Priya Sharma', avatar: 'PS' }, startedAt: '2025-03-11 09:00', duration: '6m 45s', status: 'Completed', segmentsOutput: 4 },
  { runId: 'RUN-0038', modelName: 'Auto-Segment Monthly', triggeredBy: { name: 'System', avatar: 'SY' }, startedAt: '2025-03-10 00:00', duration: '12m 03s', status: 'Completed', segmentsOutput: 7 },
  { runId: 'RUN-0037', modelName: 'Product Affinity - Brand B', triggeredBy: { name: 'Ankit Jain', avatar: 'AJ' }, startedAt: '2025-03-09 16:22', duration: '2m 58s', status: 'Failed', segmentsOutput: 0, errorLog: 'DataSourceError: Connection to ClickHouse timed out after 30s. Retry with increased timeout.' },
  { runId: 'RUN-0036', modelName: 'RFM Q1 2025 - Brand A', triggeredBy: { name: 'Priya Sharma', avatar: 'PS' }, startedAt: '2025-03-08 11:00', duration: '3m 55s', status: 'Completed', segmentsOutput: 5 },
  { runId: 'RUN-0035', modelName: 'K-Means Exploration', triggeredBy: { name: 'Rahul Mehta', avatar: 'RM' }, startedAt: '2025-03-07 15:30', duration: '8m 20s', status: 'Completed', segmentsOutput: 6 },
  { runId: 'RUN-0034', modelName: 'Churn Risk - All Brands', triggeredBy: { name: 'Priya Sharma', avatar: 'PS' }, startedAt: '2025-03-06 10:45', duration: '5m 10s', status: 'Completed', segmentsOutput: 3 },
  { runId: 'RUN-0033', modelName: 'Auto-Segment Monthly', triggeredBy: { name: 'System', avatar: 'SY' }, startedAt: '2025-03-05 00:00', duration: '1m 12s', status: 'Failed', segmentsOutput: 0, errorLog: 'InsufficientDataError: Minimum 1000 records required, only 342 found in selected date range.' },
  { runId: 'RUN-0032', modelName: 'CLV Tiers - Premium', triggeredBy: { name: 'Ankit Jain', avatar: 'AJ' }, startedAt: '2025-03-04 14:00', duration: '7m 30s', status: 'Completed', segmentsOutput: 4 },
];

export const rfmInsightsData = {
  segments: [
    { name: 'Champions', emoji: '🏆', count: 14947, pct: 12, avgRecency: 5, avgFrequency: 18, avgMonetary: 12500, action: 'Reward' },
    { name: 'Loyal', emoji: '💛', count: 34877, pct: 28, avgRecency: 15, avgFrequency: 12, avgMonetary: 7800, action: 'Upsell' },
    { name: 'At-Risk', emoji: '⚠️', count: 27403, pct: 22, avgRecency: 62, avgFrequency: 5, avgMonetary: 3200, action: 'Win-back' },
    { name: 'Hibernating', emoji: '😴', count: 29894, pct: 24, avgRecency: 120, avgFrequency: 2, avgMonetary: 1500, action: 'Re-engage' },
    { name: 'Lost', emoji: '🚫', count: 17439, pct: 14, avgRecency: 240, avgFrequency: 1, avgMonetary: 800, action: 'Last chance' },
  ],
  overlapData: [
    { aiSegment: 'Champions', ruleSegment: 'VIP Customers', overlap: 78, newFound: 3284 },
    { aiSegment: 'Loyal', ruleSegment: 'Regular Buyers', overlap: 65, newFound: 12207 },
    { aiSegment: 'At-Risk', ruleSegment: 'Inactive 60d', overlap: 54, newFound: 12605 },
    { aiSegment: 'Hibernating', ruleSegment: 'Inactive 90d', overlap: 71, newFound: 8669 },
    { aiSegment: 'Lost', ruleSegment: 'Churned', overlap: 82, newFound: 3139 },
  ],
  scatterData: [
    // Champions cluster
    ...Array.from({ length: 15 }, (_, i) => ({ recency: 2 + Math.random() * 10, frequency: 14 + Math.random() * 8, monetary: 8000 + Math.random() * 8000, segment: 'Champions' })),
    // Loyal cluster
    ...Array.from({ length: 20 }, (_, i) => ({ recency: 10 + Math.random() * 15, frequency: 8 + Math.random() * 8, monetary: 4000 + Math.random() * 6000, segment: 'Loyal' })),
    // At-Risk cluster
    ...Array.from({ length: 18 }, (_, i) => ({ recency: 45 + Math.random() * 30, frequency: 3 + Math.random() * 5, monetary: 1500 + Math.random() * 3000, segment: 'At-Risk' })),
    // Hibernating cluster
    ...Array.from({ length: 20 }, (_, i) => ({ recency: 90 + Math.random() * 60, frequency: 1 + Math.random() * 3, monetary: 500 + Math.random() * 2000, segment: 'Hibernating' })),
    // Lost cluster
    ...Array.from({ length: 12 }, (_, i) => ({ recency: 180 + Math.random() * 120, frequency: 0.5 + Math.random() * 1.5, monetary: 200 + Math.random() * 1000, segment: 'Lost' })),
  ],
};

// ── K-Means Insights ──
export const kmeansInsightsData = {
  meta: { name: 'K-Means Exploration', runDate: 'Mar 7, 2025', dataSource: 'ClickHouse - Brand B', customers: '98,320', clusters: 6 },
  clusters: [
    { id: 1, name: 'High-Value Regulars', count: 14748, pct: 15, avgSpend: 9200, avgFreq: 14, avgRecency: 8, topCategory: 'Electronics', color: 'hsl(221, 83%, 53%)' },
    { id: 2, name: 'Weekend Shoppers', count: 17714, pct: 18, avgSpend: 4500, avgFreq: 6, avgRecency: 22, topCategory: 'Fashion', color: 'hsl(262, 83%, 58%)' },
    { id: 3, name: 'Bargain Hunters', count: 22578, pct: 23, avgSpend: 1800, avgFreq: 10, avgRecency: 15, topCategory: 'Groceries', color: 'hsl(142, 76%, 36%)' },
    { id: 4, name: 'New Explorers', count: 12781, pct: 13, avgSpend: 2200, avgFreq: 2, avgRecency: 5, topCategory: 'Home & Living', color: 'hsl(38, 92%, 50%)' },
    { id: 5, name: 'Seasonal Buyers', count: 19664, pct: 20, avgSpend: 3100, avgFreq: 4, avgRecency: 65, topCategory: 'Sports', color: 'hsl(340, 75%, 55%)' },
    { id: 6, name: 'Dormant Accounts', count: 10835, pct: 11, avgSpend: 600, avgFreq: 1, avgRecency: 180, topCategory: 'N/A', color: 'hsl(220, 14%, 60%)' },
  ],
  silhouetteScores: [
    { k: 2, score: 0.42 }, { k: 3, score: 0.56 }, { k: 4, score: 0.61 }, { k: 5, score: 0.67 },
    { k: 6, score: 0.72 }, { k: 7, score: 0.70 }, { k: 8, score: 0.65 }, { k: 9, score: 0.58 }, { k: 10, score: 0.51 },
  ],
  pca: [
    ...Array.from({ length: 20 }, () => ({ x: -3 + Math.random() * 2, y: 2 + Math.random() * 2, cluster: 'High-Value Regulars' })),
    ...Array.from({ length: 20 }, () => ({ x: 1 + Math.random() * 2, y: 2 + Math.random() * 1.5, cluster: 'Weekend Shoppers' })),
    ...Array.from({ length: 25 }, () => ({ x: -1 + Math.random() * 2, y: -1 + Math.random() * 2, cluster: 'Bargain Hunters' })),
    ...Array.from({ length: 15 }, () => ({ x: 3 + Math.random() * 1.5, y: 0 + Math.random() * 1.5, cluster: 'New Explorers' })),
    ...Array.from({ length: 20 }, () => ({ x: -3 + Math.random() * 2, y: -3 + Math.random() * 1.5, cluster: 'Seasonal Buyers' })),
    ...Array.from({ length: 12 }, () => ({ x: 2 + Math.random() * 2, y: -3 + Math.random() * 1.5, cluster: 'Dormant Accounts' })),
  ],
  aiSummary: 'K=6 yields the optimal silhouette score of 0.72. "High-Value Regulars" (15%) drive 38% of total revenue — they purchase electronics bi-weekly. "Dormant Accounts" (11%) haven\'t transacted in 180+ days and are candidates for win-back. "Weekend Shoppers" show a strong Saturday spike pattern ideal for flash-sale targeting.',
};

// ── Churn Insights ──
export const churnInsightsData = {
  meta: { name: 'Churn Risk - All Brands', runDate: 'Mar 6, 2025', dataSource: 'ClickHouse - Brand A', customers: '1,12,400', accuracy: 87.3 },
  riskBuckets: [
    { range: '0–20', label: 'Very Low', count: 39340, pct: 35, color: 'hsl(142, 76%, 36%)' },
    { range: '21–40', label: 'Low', count: 24728, pct: 22, color: 'hsl(142, 50%, 50%)' },
    { range: '41–60', label: 'Medium', count: 19108, pct: 17, color: 'hsl(38, 92%, 50%)' },
    { range: '61–80', label: 'High', count: 17984, pct: 16, color: 'hsl(15, 80%, 55%)' },
    { range: '81–100', label: 'Critical', count: 11240, pct: 10, color: 'hsl(0, 84%, 60%)' },
  ],
  featureImportance: [
    { feature: 'Days Since Last Purchase', importance: 0.28 },
    { feature: 'Purchase Frequency (90d)', importance: 0.22 },
    { feature: 'Support Tickets', importance: 0.16 },
    { feature: 'Avg Order Value Trend', importance: 0.13 },
    { feature: 'Email Engagement', importance: 0.11 },
    { feature: 'App Sessions (30d)', importance: 0.06 },
    { feature: 'Loyalty Points Balance', importance: 0.04 },
  ],
  monthlyTrend: [
    { month: 'Oct', churnRate: 4.2 }, { month: 'Nov', churnRate: 3.8 }, { month: 'Dec', churnRate: 3.1 },
    { month: 'Jan', churnRate: 5.6 }, { month: 'Feb', churnRate: 5.1 }, { month: 'Mar', churnRate: 4.8 },
  ],
  topRiskCustomers: [
    { id: 'C-10234', name: 'Vikram Patel', score: 94, lastPurchase: '142 days ago', ltv: '₹45,200' },
    { id: 'C-10891', name: 'Meera Joshi', score: 91, lastPurchase: '128 days ago', ltv: '₹38,700' },
    { id: 'C-11456', name: 'Arjun Reddy', score: 88, lastPurchase: '115 days ago', ltv: '₹52,100' },
    { id: 'C-12003', name: 'Sanya Gupta', score: 85, lastPurchase: '98 days ago', ltv: '₹29,400' },
    { id: 'C-12567', name: 'Rohan Mehta', score: 82, lastPurchase: '105 days ago', ltv: '₹61,800' },
  ],
  aiSummary: 'Churn risk has increased 14% since January, primarily driven by post-holiday drop-off. The top predictor is "Days Since Last Purchase" — customers inactive for 90+ days have a 6x higher churn probability. 29,224 customers are in the High/Critical zone (26%) representing ₹18.2Cr in at-risk revenue. Recommend immediate win-back for the Critical bucket.',
};

// ── CLV Insights ──
export const clvInsightsData = {
  meta: { name: 'CLV Tiers - Premium', runDate: 'Mar 11, 2025', dataSource: 'Atlantis Retail DB', customers: '1,24,560' },
  tiers: [
    { name: 'Platinum', emoji: '💎', count: 6228, pct: 5, avgCLV: 125000, predictedRevenue: '₹77.8Cr', color: 'hsl(262, 83%, 58%)' },
    { name: 'Gold', emoji: '🥇', count: 18684, pct: 15, avgCLV: 52000, predictedRevenue: '₹97.2Cr', color: 'hsl(38, 92%, 50%)' },
    { name: 'Silver', emoji: '🥈', count: 43596, pct: 35, avgCLV: 18000, predictedRevenue: '₹78.5Cr', color: 'hsl(220, 14%, 60%)' },
    { name: 'Bronze', emoji: '🥉', count: 56052, pct: 45, avgCLV: 4500, predictedRevenue: '₹25.2Cr', color: 'hsl(25, 60%, 50%)' },
  ],
  clvDistribution: [
    { range: '₹0–5K', count: 42000 }, { range: '₹5K–15K', count: 31000 }, { range: '₹15K–30K', count: 22000 },
    { range: '₹30K–60K', count: 16000 }, { range: '₹60K–1L', count: 8500 }, { range: '₹1L+', count: 5060 },
  ],
  migrationMatrix: [
    { from: 'Bronze', to: 'Silver', probability: 18 },
    { from: 'Silver', to: 'Gold', probability: 12 },
    { from: 'Gold', to: 'Platinum', probability: 7 },
    { from: 'Silver', to: 'Bronze', probability: 22 },
    { from: 'Gold', to: 'Silver', probability: 15 },
  ],
  aiSummary: 'Platinum customers (5%) generate 28% of total predicted revenue over the next 12 months. Gold-tier customers show the highest upward migration potential — 12% are projected to reach Platinum with targeted loyalty incentives. Bronze-tier has a 22% risk of churning entirely. Focus retention on Gold customers and acquisition-to-Silver programs.',
};

// ── Product Propensity Insights ──
export const productInsightsData = {
  meta: { name: 'Product Affinity - Brand B', runDate: 'Mar 9, 2025', dataSource: 'ClickHouse - Brand B', customers: '76,540' },
  topProducts: [
    { product: 'Wireless Earbuds Pro', propensityScore: 0.82, potentialBuyers: 12400, avgAffinity: 78, category: 'Electronics' },
    { product: 'Organic Face Serum', propensityScore: 0.76, potentialBuyers: 9800, avgAffinity: 72, category: 'Beauty' },
    { product: 'Running Shoes X1', propensityScore: 0.71, potentialBuyers: 8200, avgAffinity: 68, category: 'Sports' },
    { product: 'Smart Home Hub', propensityScore: 0.65, potentialBuyers: 6500, avgAffinity: 61, category: 'Electronics' },
    { product: 'Premium Coffee Blend', propensityScore: 0.61, potentialBuyers: 11200, avgAffinity: 58, category: 'Food & Beverage' },
  ],
  crossSellMatrix: [
    { source: 'Wireless Earbuds Pro', target: 'Phone Case Premium', affinity: 72 },
    { source: 'Organic Face Serum', target: 'Vitamin C Moisturizer', affinity: 68 },
    { source: 'Running Shoes X1', target: 'Sports Watch Elite', affinity: 64 },
    { source: 'Smart Home Hub', target: 'Smart Bulb Pack', affinity: 81 },
    { source: 'Premium Coffee Blend', target: 'French Press Set', affinity: 55 },
  ],
  categoryBreakdown: [
    { category: 'Electronics', customers: 24500, avgScore: 0.73 },
    { category: 'Beauty', customers: 18200, avgScore: 0.68 },
    { category: 'Sports', customers: 14800, avgScore: 0.62 },
    { category: 'Food & Beverage', customers: 12040, avgScore: 0.57 },
    { category: 'Home & Living', customers: 7000, avgScore: 0.49 },
  ],
  aiSummary: 'Wireless Earbuds Pro has the highest purchase propensity at 82% with 12,400 potential buyers — ideal for a targeted push campaign. Cross-sell affinity is strongest between Smart Home Hub and Smart Bulb Pack (81%). Electronics customers have the highest overall propensity scores, suggesting a tech-forward customer base for Brand B.',
};

// ── Hybrid Persona Insights ──
export const hybridPersonaInsightsData = {
  meta: { name: 'Hybrid Persona Analysis — All Brands', runDate: 'Mar 15, 2025', dataSource: 'Atlantis CRM + Web Analytics', customers: '98,340' },
  personas: [
    { name: 'Urban Trendsetters', emoji: '🏙️', tagline: 'Tech-savvy, brand-conscious city dwellers', pct: 28, count: 27535, avgAge: 29, avgSpend: 8400, engagementScore: 8.2, topTraits: ['Mobile-first', 'Social buyer', 'Early adopter'] },
    { name: 'Value Seekers', emoji: '🏷️', tagline: 'Price-driven, coupon-loving bargain hunters', pct: 24, count: 23602, avgAge: 38, avgSpend: 4200, engagementScore: 6.5, topTraits: ['Coupon user', 'Bulk buyer', 'Price alerts'] },
    { name: 'Premium Loyalists', emoji: '👑', tagline: 'High-spending repeat customers', pct: 18, count: 17701, avgAge: 44, avgSpend: 14500, engagementScore: 9.1, topTraits: ['Loyalty member', 'Full price', 'Brand advocate'] },
    { name: 'Weekend Browsers', emoji: '🛋️', tagline: 'Casual weekend shoppers with low commitment', pct: 19, count: 18685, avgAge: 33, avgSpend: 3100, engagementScore: 4.8, topTraits: ['Weekend active', 'Window shopper', 'Impulse buys'] },
    { name: 'Dormant Potentials', emoji: '💤', tagline: 'Previously active, now disengaged', pct: 11, count: 10817, avgAge: 41, avgSpend: 1800, engagementScore: 2.3, topTraits: ['Lapsed 90d+', 'Email ignorer', 'Re-engage target'] },
  ],
  demographics: {
    ageGroups: [
      { range: '18-24', 'Urban Trendsetters': 8200, 'Value Seekers': 2100, 'Premium Loyalists': 800, 'Weekend Browsers': 3400 },
      { range: '25-34', 'Urban Trendsetters': 12400, 'Value Seekers': 6500, 'Premium Loyalists': 4200, 'Weekend Browsers': 7800 },
      { range: '35-44', 'Urban Trendsetters': 5100, 'Value Seekers': 9800, 'Premium Loyalists': 7500, 'Weekend Browsers': 4600 },
      { range: '45-54', 'Urban Trendsetters': 1500, 'Value Seekers': 4200, 'Premium Loyalists': 4000, 'Weekend Browsers': 2100 },
      { range: '55+', 'Urban Trendsetters': 335, 'Value Seekers': 1002, 'Premium Loyalists': 1201, 'Weekend Browsers': 785 },
    ],
    regions: [
      { name: 'Metro', value: 42 },
      { name: 'Tier-2 Cities', value: 28 },
      { name: 'Tier-3 Cities', value: 18 },
      { name: 'Rural', value: 12 },
    ],
  },
  behavioralPatterns: [
    { dimension: 'Browse Depth', 'Urban Trendsetters': 8.5, 'Value Seekers': 7.2, 'Premium Loyalists': 6.8, 'Weekend Browsers': 4.1 },
    { dimension: 'Cart Frequency', 'Urban Trendsetters': 7.9, 'Value Seekers': 8.4, 'Premium Loyalists': 9.2, 'Weekend Browsers': 3.5 },
    { dimension: 'Social Sharing', 'Urban Trendsetters': 9.1, 'Value Seekers': 3.2, 'Premium Loyalists': 5.6, 'Weekend Browsers': 2.8 },
    { dimension: 'Review Writing', 'Urban Trendsetters': 6.3, 'Value Seekers': 4.8, 'Premium Loyalists': 8.7, 'Weekend Browsers': 1.9 },
    { dimension: 'Wishlist Usage', 'Urban Trendsetters': 7.1, 'Value Seekers': 8.9, 'Premium Loyalists': 5.4, 'Weekend Browsers': 6.7 },
    { dimension: 'Loyalty Points', 'Urban Trendsetters': 5.8, 'Value Seekers': 6.1, 'Premium Loyalists': 9.5, 'Weekend Browsers': 2.2 },
  ],
  channelPreferences: [
    { channel: 'Mobile App', 'Urban Trendsetters': 38, 'Value Seekers': 22, 'Premium Loyalists': 18, 'Weekend Browsers': 15 },
    { channel: 'Website', 'Urban Trendsetters': 12, 'Value Seekers': 28, 'Premium Loyalists': 25, 'Weekend Browsers': 35 },
    { channel: 'In-Store', 'Urban Trendsetters': 5, 'Value Seekers': 15, 'Premium Loyalists': 32, 'Weekend Browsers': 28 },
    { channel: 'Email', 'Urban Trendsetters': 8, 'Value Seekers': 20, 'Premium Loyalists': 15, 'Weekend Browsers': 12 },
    { channel: 'Social Media', 'Urban Trendsetters': 30, 'Value Seekers': 10, 'Premium Loyalists': 8, 'Weekend Browsers': 8 },
  ],
  aiSummary: 'Urban Trendsetters (28%) drive the highest engagement via mobile and social channels — ideal for influencer and app-exclusive campaigns. Premium Loyalists (18%) contribute 39% of total revenue despite being a smaller segment, making them prime candidates for VIP programs. Dormant Potentials (11%) represent ₹19.5Cr in recoverable annual revenue; a targeted win-back sequence via SMS (their last responsive channel) could reactivate an estimated 30% within 60 days.',
};

export type ModelInsightType = 'rfm' | 'kmeans' | 'churn' | 'clv' | 'product' | 'hybrid';

export const modelNameToInsightType: Record<string, ModelInsightType> = {
  'RFM Q1 2025 - Brand A': 'rfm',
  'Churn Risk - All Brands': 'churn',
  'CLV Tiers - Premium': 'clv',
  'K-Means Exploration': 'kmeans',
  'Auto-Segment Monthly': 'rfm',
  'Product Affinity - Brand B': 'product',
  'Hybrid Persona - All Brands': 'hybrid',
};

export const comparisonFields = [
  { field: 'Input Requirements', rfm: 'Transactional', kmeans: 'Transactional + Behavioral', churn: 'Transactional + Behavioral', clv: 'Transactional', product: 'Transactional + Product Catalog', hybrid: 'Demographic + Behavioral', sql: 'Any', auto: 'All Available' },
  { field: 'Output Type', rfm: '5 RFM Tiers', kmeans: 'N Clusters', churn: 'Risk Scores', clv: '4 Value Tiers', product: 'Product Scores', hybrid: 'Named Personas', sql: 'User-defined', auto: 'Auto-detected' },
  { field: 'Training Time', rfm: '< 2 min', kmeans: '5–10 min', churn: '10–15 min', clv: '5–8 min', product: '8–12 min', hybrid: '10–15 min', sql: 'Varies', auto: '15–20 min' },
  { field: 'Recommended Use Case', rfm: 'Loyalty & CRM', kmeans: 'Exploration', churn: 'Retention', clv: 'Revenue Planning', product: 'Cross-sell', hybrid: 'Marketing Personas', sql: 'Advanced Users', auto: 'First-time Users' },
  { field: 'Accuracy Profile', rfm: 'Deterministic', kmeans: 'High', churn: 'High', clv: 'Medium-High', product: 'Medium', hybrid: 'Medium', sql: 'Varies', auto: 'High' },
  { field: 'Interpretability', rfm: 'High', kmeans: 'Medium', churn: 'Medium', clv: 'High', product: 'Low', hybrid: 'High', sql: 'High', auto: 'Low' },
];
