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

export const comparisonFields = [
  { field: 'Input Requirements', rfm: 'Transactional', kmeans: 'Transactional + Behavioral', churn: 'Transactional + Behavioral', clv: 'Transactional', product: 'Transactional + Product Catalog', hybrid: 'Demographic + Behavioral', sql: 'Any', auto: 'All Available' },
  { field: 'Output Type', rfm: '5 RFM Tiers', kmeans: 'N Clusters', churn: 'Risk Scores', clv: '4 Value Tiers', product: 'Product Scores', hybrid: 'Named Personas', sql: 'User-defined', auto: 'Auto-detected' },
  { field: 'Training Time', rfm: '< 2 min', kmeans: '5–10 min', churn: '10–15 min', clv: '5–8 min', product: '8–12 min', hybrid: '10–15 min', sql: 'Varies', auto: '15–20 min' },
  { field: 'Recommended Use Case', rfm: 'Loyalty & CRM', kmeans: 'Exploration', churn: 'Retention', clv: 'Revenue Planning', product: 'Cross-sell', hybrid: 'Marketing Personas', sql: 'Advanced Users', auto: 'First-time Users' },
  { field: 'Accuracy Profile', rfm: 'Deterministic', kmeans: 'High', churn: 'High', clv: 'Medium-High', product: 'Medium', hybrid: 'Medium', sql: 'Varies', auto: 'High' },
  { field: 'Interpretability', rfm: 'High', kmeans: 'Medium', churn: 'Medium', clv: 'High', product: 'Low', hybrid: 'High', sql: 'High', auto: 'Low' },
];
