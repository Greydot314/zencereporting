export interface ForecastPeriod {
  period: string;
  predicted: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
  growth: number;
}

export interface DailyForecast {
  date: string;
  value: number;
  lower: number;
  upper: number;
}

export interface ForecastData {
  predictions: ForecastPeriod[];
  dailyForecast: DailyForecast[];
  drivers: string[];
  seasonality: string;
  modelAccuracy: number;
  lastUpdated: string;
}

export interface ChurnSegment {
  id: string;
  name: string;
  count: number;
  probability: number;
  predictedChurnDate: string;
  suggestedAction: string;
  expectedSaveRate: number;
  revenueAtRisk: number;
}

export interface ChurnData {
  summary: {
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    totalAtRisk: number;
    revenueAtRisk: number;
  };
  segments: ChurnSegment[];
  timeline: { period: string; count: number }[];
  modelAccuracy: number;
  lastUpdated: string;
}

export interface CLVTier {
  tier: string;
  currentCLV: number;
  predictedCLV: number;
  change: number;
  customerCount: number;
  topDrivers: string[];
}

export interface CLVData {
  tiers: CLVTier[];
  totalPredictedRevenue: number;
  revenueAtRisk: number;
  recommendations: string[];
  modelAccuracy: number;
  lastUpdated: string;
}

export interface TierFlow {
  from: string;
  to: string;
  count: number;
  percentage: number;
}

export interface TierMigrationData {
  flows: TierFlow[];
  upgradeOpportunities: {
    tier: string;
    nearThreshold: number;
    probability: number;
  }[];
  downgradeAlerts: {
    tier: string;
    atRisk: number;
    probability: number;
  }[];
  summary: {
    totalUpgrades: number;
    totalDowngrades: number;
    netChange: number;
  };
  lastUpdated: string;
}

export interface ProductDemand {
  category: string;
  currentDemand: number;
  predictedDemand: number;
  change: number;
  trend: "up" | "down" | "stable";
  confidence: number;
}

export interface TopRecommendation {
  title: string;
  reason: string;
  confidence: number;
  action_type: string;
  time_horizon_days: number;
  predicted_surge_pct: number;
}

export interface ProductDemandData {
  products: ProductDemand[];
  trendingProducts: { name: string; demandScore: number }[];
  seasonalEvents: { event: string; date: string; impact: string }[];
  recommendations: TopRecommendation[];
  lastUpdated: string;
}

export interface ScenarioOutcome {
  revenue: number;
  revenueChange: number;
  churnRate: number;
  churnChange: number;
  engagement: number;
  engagementChange: number;
}

export interface WhatIfScenario {
  id: string;
  name: string;
  description: string;
  variables: {
    name: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
  }[];
  predictedOutcome: ScenarioOutcome;
}

export interface WhatIfData {
  currentState: {
    revenue: number;
    churnRate: number;
    engagement: number;
  };
  scenarios: WhatIfScenario[];
}

// Decision Impact Radar Types
export interface PredictedImpact {
  revenue: { value: number; unit: string; delta_percent?: number };
  churn_rate: { value: number; unit: string };
  engagement: { value: number; unit: string };
}

export interface Strategy {
  strategy_id: string;
  title: string;
  target_segments?: string[];
  time_horizon_days?: number;
  predicted_impact: PredictedImpact;
  confidence: number;
}

export interface DecisionImpactRadarData {
  widget_type: string;
  last_updated: string;
  primary_recommendation: Strategy;
  alternative_strategies: Strategy[];
}
