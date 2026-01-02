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

export interface ProductDemandData {
  products: ProductDemand[];
  trendingProducts: { name: string; demandScore: number }[];
  seasonalEvents: { event: string; date: string; impact: string }[];
  recommendations: string[];
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
