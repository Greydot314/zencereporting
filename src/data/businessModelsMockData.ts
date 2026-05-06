export interface BusinessModel {
  id: string;
  name: string;
  category: 'Propensity' | 'Winback' | 'Forecasting' | 'New-to-Repeat' | 'Basket Analysis';
  useCase: string;
  problem: string;
  whenToUse: string;
  techniques: string[];
  status: 'Active' | 'Draft';
  lastRun: string;
  accuracy?: number;
  inputColumns: { name: string; type: string; example: string }[];
  features: { name: string; description: string }[];
  featureImportance: { feature: string; importance: number }[];
}

export const businessModels: BusinessModel[] = [
  {
    id: 'propensity',
    name: 'Propensity Model',
    category: 'Propensity',
    useCase: 'Predict likelihood of a customer making a purchase in the next 30 days.',
    problem: 'Identify which customers are most likely to convert so marketing budget is spent on highest-ROI cohorts instead of broad blasts.',
    whenToUse: 'Use before promotional campaigns, product launches, or whenever you need to rank a customer base by purchase intent.',
    techniques: ['BG/NBD', 'XGBoost', 'Random Forest', 'Feature Selection (VIF + SHAP)', 'Clustering'],
    status: 'Active',
    lastRun: 'May 4, 2026',
    accuracy: 87.4,
    inputColumns: [
      { name: 'customer_id', type: 'string', example: 'C-10234' },
      { name: 'transactions_90d', type: 'int', example: '12' },
      { name: 'visit_frequency', type: 'float', example: '3.4 / week' },
      { name: 'avg_basket_size', type: 'float', example: '₹1,820' },
      { name: 'days_since_last_purchase', type: 'int', example: '14' },
      { name: 'product_categories', type: 'array', example: '[Electronics, Fashion]' },
    ],
    features: [
      { name: 'Recency', description: 'Days since the last purchase event' },
      { name: 'Frequency', description: 'Purchase count in last 90 days (BG/NBD λ)' },
      { name: 'Monetary', description: 'Average transaction value over last 6 months' },
      { name: 'Category Affinity', description: 'Top product category share-of-wallet' },
      { name: 'Channel Mix', description: 'Online vs Offline behavior ratio' },
    ],
    featureImportance: [
      { feature: 'Days Since Last Purchase', importance: 0.31 },
      { feature: 'Purchase Frequency (90d)', importance: 0.24 },
      { feature: 'Avg Basket Size', importance: 0.18 },
      { feature: 'Category Affinity', importance: 0.14 },
      { feature: 'Visit Frequency', importance: 0.08 },
      { feature: 'Channel Mix', importance: 0.05 },
    ],
  },
  {
    id: 'winback',
    name: 'Winback Model',
    category: 'Winback',
    useCase: 'Score lapsed customers on the chance of returning if re-engaged.',
    problem: 'Most lapsed customers are unreachable economically. Winback targets only those with a real chance of returning.',
    whenToUse: 'For any cohort inactive 60+ days where you plan a reactivation push (email, SMS, voucher).',
    techniques: ['Logistic Regression', 'Feature Selection', 'Clustering'],
    status: 'Active',
    lastRun: 'May 2, 2026',
    accuracy: 81.2,
    inputColumns: [
      { name: 'customer_id', type: 'string', example: 'C-44912' },
      { name: 'inactive_days', type: 'int', example: '92' },
      { name: 'historical_clv', type: 'float', example: '₹38,400' },
      { name: 'past_campaign_response', type: 'float', example: '0.42' },
      { name: 'tenure_months', type: 'int', example: '18' },
    ],
    features: [
      { name: 'Inactivity Window', description: 'Bucketed lapse duration' },
      { name: 'Historical CLV', description: 'Pre-lapse lifetime value' },
      { name: 'Past Campaign Response Rate', description: 'Open / click / redeem history' },
      { name: 'Tenure', description: 'Months as an active customer before lapse' },
    ],
    featureImportance: [
      { feature: 'Past Campaign Response', importance: 0.34 },
      { feature: 'Historical CLV', importance: 0.27 },
      { feature: 'Inactivity Window', importance: 0.21 },
      { feature: 'Tenure', importance: 0.12 },
      { feature: 'Last Channel Used', importance: 0.06 },
    ],
  },
  {
    id: 'bb-projection',
    name: 'BB Projection',
    category: 'Forecasting',
    useCase: 'Forecast brand-business revenue for FY 2026–27 by month.',
    problem: 'Finance and category planners need a defensible monthly revenue trajectory that respects seasonality and recent trend.',
    whenToUse: 'Annual planning, mid-year re-forecast, or when a major macro event shifts the baseline.',
    techniques: ['Forecasting (FY 2026–27)', 'SARIMAX'],
    status: 'Active',
    lastRun: 'Apr 28, 2026',
    accuracy: 92.6,
    inputColumns: [
      { name: 'period', type: 'date', example: '2025-04' },
      { name: 'gross_sales', type: 'float', example: '₹4.2 Cr' },
      { name: 'promo_intensity', type: 'float', example: '0.18' },
      { name: 'store_count', type: 'int', example: '412' },
    ],
    features: [
      { name: 'Trend (T)', description: 'Long-term growth component' },
      { name: 'Seasonality (S)', description: 'Monthly seasonal index' },
      { name: 'Exogenous: Promo', description: 'Planned promotional intensity' },
      { name: 'Exogenous: Store Footprint', description: 'Active retail count' },
    ],
    featureImportance: [
      { feature: 'Seasonality (S)', importance: 0.42 },
      { feature: 'Trend (T)', importance: 0.31 },
      { feature: 'Promo Intensity', importance: 0.17 },
      { feature: 'Store Footprint', importance: 0.10 },
    ],
  },
  {
    id: 'n2r',
    name: 'New to Repeat Customer',
    category: 'New-to-Repeat',
    useCase: 'Predict which first-time buyers will convert into repeat customers.',
    problem: 'Acquisition is expensive — knowing which new customers will repeat lets you double-down on the right onboarding journey.',
    whenToUse: 'Within 0–14 days of a customer\'s first transaction.',
    techniques: ['XGBoost'],
    status: 'Active',
    lastRun: 'May 5, 2026',
    accuracy: 84.9,
    inputColumns: [
      { name: 'customer_id', type: 'string', example: 'C-99021' },
      { name: 'first_order_value', type: 'float', example: '₹1,240' },
      { name: 'first_order_category', type: 'string', example: 'Beauty' },
      { name: 'acquisition_channel', type: 'string', example: 'Paid Social' },
      { name: 'first_order_discount', type: 'float', example: '0.15' },
    ],
    features: [
      { name: 'First Order Value', description: 'Higher AOV correlates with repeat behavior' },
      { name: 'Discount Depth', description: 'Heavy discounting reduces repeat likelihood' },
      { name: 'Acquisition Channel', description: 'Organic vs paid signal' },
      { name: 'Category Entered', description: 'Replenishable categories repeat sooner' },
    ],
    featureImportance: [
      { feature: 'First Order Value', importance: 0.29 },
      { feature: 'Category Entered', importance: 0.25 },
      { feature: 'Discount Depth', importance: 0.22 },
      { feature: 'Acquisition Channel', importance: 0.16 },
      { feature: 'Onboarding Email Opens', importance: 0.08 },
    ],
  },
  {
    id: 'basket',
    name: 'Basket Analysis',
    category: 'Basket Analysis',
    useCase: 'Discover product associations — "people who buy X also buy Y".',
    problem: 'Cross-sell and merchandising teams need rules to drive bundle, placement and recommendation strategies.',
    whenToUse: 'Pre-season planning, recommendation engine refresh, or store layout reviews.',
    techniques: ['Apriori Algorithm'],
    status: 'Active',
    lastRun: 'May 1, 2026',
    inputColumns: [
      { name: 'transaction_id', type: 'string', example: 'TXN-88234' },
      { name: 'customer_id', type: 'string', example: 'C-10234' },
      { name: 'product_skus', type: 'array', example: '[SKU-101, SKU-447]' },
    ],
    features: [
      { name: 'Support', description: 'Frequency of itemset across baskets' },
      { name: 'Confidence', description: 'P(Y | X) for an association rule' },
      { name: 'Lift', description: 'Strength of association vs random co-occurrence' },
    ],
    featureImportance: [
      { feature: 'Lift', importance: 0.45 },
      { feature: 'Confidence', importance: 0.35 },
      { feature: 'Support', importance: 0.20 },
    ],
  },
];

// Mock outputs per model
export const propensityScores = [
  { id: 'C-10234', name: 'Vikram Patel', score: 92, segment: 'Very High', nextBest: 'Wireless Earbuds Pro' },
  { id: 'C-22845', name: 'Anika Rao', score: 85, segment: 'Very High', nextBest: 'Organic Face Serum' },
  { id: 'C-30912', name: 'Rohit Khanna', score: 71, segment: 'High', nextBest: 'Smart Home Hub' },
  { id: 'C-41277', name: 'Priya Sharma', score: 56, segment: 'Medium', nextBest: 'Premium Coffee Blend' },
  { id: 'C-55402', name: 'Karan Mehta', score: 38, segment: 'Low', nextBest: 'Running Shoes X1' },
  { id: 'C-66781', name: 'Sneha Iyer', score: 22, segment: 'Very Low', nextBest: 'Vitamin C Moisturizer' },
];

export const propensityDistribution = [
  { bucket: '0–20', count: 18420, color: 'hsl(0, 84%, 60%)' },
  { bucket: '21–40', count: 24310, color: 'hsl(15, 80%, 55%)' },
  { bucket: '41–60', count: 31280, color: 'hsl(38, 92%, 50%)' },
  { bucket: '61–80', count: 22180, color: 'hsl(142, 50%, 50%)' },
  { bucket: '81–100', count: 12810, color: 'hsl(142, 76%, 36%)' },
];

export const winbackScores = [
  { id: 'C-77231', name: 'Meera Joshi', score: 88, label: 'High chance to return', expectedValue: '₹12,400' },
  { id: 'C-88412', name: 'Arjun Reddy', score: 74, label: 'Likely to return', expectedValue: '₹8,200' },
  { id: 'C-91203', name: 'Sanya Gupta', score: 52, label: 'Possible', expectedValue: '₹4,100' },
  { id: 'C-94567', name: 'Ravi Verma', score: 28, label: 'Unlikely', expectedValue: '₹1,800' },
];

export const winbackBuckets = [
  { name: 'High chance', value: 14820, color: 'hsl(142, 76%, 36%)' },
  { name: 'Likely', value: 22140, color: 'hsl(142, 50%, 50%)' },
  { name: 'Possible', value: 18620, color: 'hsl(38, 92%, 50%)' },
  { name: 'Unlikely', value: 31420, color: 'hsl(0, 84%, 60%)' },
];

export const bbForecast = [
  { month: 'Apr 26', actual: 4.2, forecast: 4.3, lower: 3.9, upper: 4.6 },
  { month: 'May 26', actual: 4.4, forecast: 4.5, lower: 4.1, upper: 4.9 },
  { month: 'Jun 26', actual: 4.1, forecast: 4.2, lower: 3.8, upper: 4.6 },
  { month: 'Jul 26', actual: null, forecast: 4.6, lower: 4.2, upper: 5.0 },
  { month: 'Aug 26', actual: null, forecast: 4.8, lower: 4.3, upper: 5.3 },
  { month: 'Sep 26', actual: null, forecast: 5.1, lower: 4.5, upper: 5.7 },
  { month: 'Oct 26', actual: null, forecast: 5.6, lower: 4.9, upper: 6.3 },
  { month: 'Nov 26', actual: null, forecast: 6.4, lower: 5.6, upper: 7.2 },
  { month: 'Dec 26', actual: null, forecast: 7.2, lower: 6.3, upper: 8.1 },
  { month: 'Jan 27', actual: null, forecast: 5.4, lower: 4.7, upper: 6.1 },
  { month: 'Feb 27', actual: null, forecast: 5.0, lower: 4.4, upper: 5.6 },
  { month: 'Mar 27', actual: null, forecast: 5.3, lower: 4.6, upper: 6.0 },
];

export const n2rOutputs = [
  { id: 'C-99021', name: 'Tara Bhatt', score: 81, label: 'Likely Repeater', firstOrder: '₹1,240' },
  { id: 'C-99102', name: 'Dev Malhotra', score: 67, label: 'Likely Repeater', firstOrder: '₹2,100' },
  { id: 'C-99240', name: 'Isha Kapoor', score: 41, label: 'At Risk', firstOrder: '₹680' },
  { id: 'C-99318', name: 'Manish Yadav', score: 22, label: 'One-time', firstOrder: '₹420' },
];

export const n2rConversion = [
  { week: 'W1', repeat: 8 }, { week: 'W2', repeat: 14 }, { week: 'W3', repeat: 19 },
  { week: 'W4', repeat: 23 }, { week: 'W6', repeat: 28 }, { week: 'W8', repeat: 31 },
  { week: 'W12', repeat: 34 },
];

export const basketRules = [
  { antecedent: 'Wireless Earbuds Pro', consequent: 'Phone Case Premium', support: 0.12, confidence: 0.68, lift: 3.2 },
  { antecedent: 'Organic Face Serum', consequent: 'Vitamin C Moisturizer', support: 0.09, confidence: 0.74, lift: 4.1 },
  { antecedent: 'Smart Home Hub', consequent: 'Smart Bulb Pack', support: 0.07, confidence: 0.81, lift: 5.3 },
  { antecedent: 'Running Shoes X1', consequent: 'Sports Watch Elite', support: 0.06, confidence: 0.62, lift: 2.9 },
  { antecedent: 'Premium Coffee Blend', consequent: 'French Press Set', support: 0.05, confidence: 0.55, lift: 2.4 },
  { antecedent: 'Yoga Mat Pro', consequent: 'Resistance Band Set', support: 0.04, confidence: 0.59, lift: 2.7 },
];

// Comparison data for XGBoost vs Random Forest (Propensity)
export const modelComparison = {
  XGBoost: { accuracy: 87.4, precision: 84.1, recall: 79.6, f1: 81.8, auc: 0.91, trainTime: '4m 12s' },
  'Random Forest': { accuracy: 84.2, precision: 81.7, recall: 78.2, f1: 79.9, auc: 0.88, trainTime: '6m 48s' },
};
