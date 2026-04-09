import { 
  ForecastData, 
  ChurnData, 
  CLVData, 
  TierMigrationData, 
  ProductDemandData, 
  WhatIfData,
  DecisionImpactRadarData 
} from "@/types/predictions";

export const mockForecastData: ForecastData = {
  predictions: [
    { period: "30 Days", predicted: 15200000, lowerBound: 14100000, upperBound: 16300000, confidence: 87, growth: 8.5 },
    { period: "60 Days", predicted: 31500000, lowerBound: 28900000, upperBound: 34100000, confidence: 82, growth: 12.3 },
    { period: "90 Days", predicted: 48200000, lowerBound: 43500000, upperBound: 52900000, confidence: 76, growth: 15.8 },
  ],
  dailyForecast: [
    { date: "Jan 1", value: 520000, lower: 480000, upper: 560000 },
    { date: "Jan 2", value: 485000, lower: 445000, upper: 525000 },
    { date: "Jan 3", value: 610000, lower: 560000, upper: 660000 },
    { date: "Jan 4", value: 720000, lower: 660000, upper: 780000 },
    { date: "Jan 5", value: 680000, lower: 620000, upper: 740000 },
    { date: "Jan 6", value: 590000, lower: 540000, upper: 640000 },
    { date: "Jan 7", value: 550000, lower: 500000, upper: 600000 },
    { date: "Jan 8", value: 530000, lower: 485000, upper: 575000 },
    { date: "Jan 9", value: 620000, lower: 570000, upper: 670000 },
    { date: "Jan 10", value: 750000, lower: 690000, upper: 810000 },
    { date: "Jan 11", value: 810000, lower: 745000, upper: 875000 },
    { date: "Jan 12", value: 780000, lower: 715000, upper: 845000 },
    { date: "Jan 13", value: 640000, lower: 585000, upper: 695000 },
    { date: "Jan 14", value: 580000, lower: 530000, upper: 630000 },
  ],
  drivers: [
    "VIP segment spending up 23% YoY",
    "Holiday season approaching (+18% expected)",
    "New premium rewards driving engagement",
    "Email campaign conversion rate improved"
  ],
  seasonality: "Strong weekend peaks detected (Sat-Sun +35% vs weekdays). Monthly spike around salary dates (1st-5th).",
  modelAccuracy: 91.2,
  lastUpdated: "2 hours ago"
};

export const mockChurnData: ChurnData = {
  summary: {
    highRisk: 2340,
    mediumRisk: 8920,
    lowRisk: 145582,
    totalAtRisk: 11260,
    revenueAtRisk: 28500000
  },
  segments: [
    {
      id: "1",
      name: "Dormant Silver Members",
      count: 1250,
      probability: 0.78,
      predictedChurnDate: "Next 14 days",
      suggestedAction: "Reactivation campaign with bonus points",
      expectedSaveRate: 0.35,
      revenueAtRisk: 8750000
    },
    {
      id: "2",
      name: "Declining Gold Spenders",
      count: 680,
      probability: 0.65,
      predictedChurnDate: "Next 30 days",
      suggestedAction: "Exclusive early access to new rewards",
      expectedSaveRate: 0.48,
      revenueAtRisk: 12200000
    },
    {
      id: "3",
      name: "Low-Engagement New Members",
      count: 2100,
      probability: 0.52,
      predictedChurnDate: "Next 45 days",
      suggestedAction: "Onboarding acceleration program",
      expectedSaveRate: 0.42,
      revenueAtRisk: 4200000
    },
    {
      id: "4",
      name: "Price-Sensitive Bronze",
      count: 3200,
      probability: 0.41,
      predictedChurnDate: "Next 60 days",
      suggestedAction: "Value-focused communication",
      expectedSaveRate: 0.28,
      revenueAtRisk: 3350000
    }
  ],
  timeline: [
    { period: "7 Days", count: 890 },
    { period: "14 Days", count: 1650 },
    { period: "30 Days", count: 3420 },
    { period: "60 Days", count: 5300 }
  ],
  modelAccuracy: 88.5,
  lastUpdated: "1 hour ago"
};

export const mockCLVData: CLVData = {
  tiers: [
    {
      tier: "Platinum",
      currentCLV: 185000,
      predictedCLV: 210000,
      change: 13.5,
      customerCount: 2450,
      topDrivers: ["Premium reward redemptions", "Cross-category spending"]
    },
    {
      tier: "Gold",
      currentCLV: 72000,
      predictedCLV: 78500,
      change: 9.0,
      customerCount: 18200,
      topDrivers: ["Frequency increase", "Referral program participation"]
    },
    {
      tier: "Silver",
      currentCLV: 28000,
      predictedCLV: 26500,
      change: -5.4,
      customerCount: 45600,
      topDrivers: ["Competition pressure", "Reduced visit frequency"]
    },
    {
      tier: "Bronze",
      currentCLV: 8500,
      predictedCLV: 9200,
      change: 8.2,
      customerCount: 89000,
      topDrivers: ["New member activation", "Entry-level reward uptake"]
    }
  ],
  totalPredictedRevenue: 4850000000,
  revenueAtRisk: 285000000,
  recommendations: [
    "Focus retention efforts on Silver tier - showing CLV decline",
    "Accelerate Gold-to-Platinum conversion with exclusive experiences",
    "Implement Bronze tier engagement program within 30 days",
    "Launch referral program expansion for Gold members"
  ],
  modelAccuracy: 89.7,
  lastUpdated: "3 hours ago"
};

export const mockTierMigrationData: TierMigrationData = {
  flows: [
    { from: "Bronze", to: "Silver", count: 4200, percentage: 4.7 },
    { from: "Silver", to: "Gold", count: 2100, percentage: 4.6 },
    { from: "Gold", to: "Platinum", count: 450, percentage: 2.5 },
    { from: "Silver", to: "Bronze", count: 1800, percentage: 3.9 },
    { from: "Gold", to: "Silver", count: 920, percentage: 5.1 },
    { from: "Platinum", to: "Gold", count: 180, percentage: 7.3 }
  ],
  upgradeOpportunities: [
    { tier: "Bronze → Silver", nearThreshold: 8500, probability: 0.72 },
    { tier: "Silver → Gold", nearThreshold: 3200, probability: 0.65 },
    { tier: "Gold → Platinum", nearThreshold: 890, probability: 0.58 }
  ],
  downgradeAlerts: [
    { tier: "Platinum → Gold", atRisk: 320, probability: 0.45 },
    { tier: "Gold → Silver", atRisk: 1450, probability: 0.38 },
    { tier: "Silver → Bronze", atRisk: 2800, probability: 0.42 }
  ],
  summary: {
    totalUpgrades: 6750,
    totalDowngrades: 2900,
    netChange: 3850
  },
  lastUpdated: "4 hours ago"
};

export const mockProductDemandData: ProductDemandData = {
  products: [
    { category: "Electronics", currentDemand: 45000, predictedDemand: 62000, change: 37.8, trend: "up", confidence: 85 },
    { category: "Travel & Experiences", currentDemand: 32000, predictedDemand: 48000, change: 50.0, trend: "up", confidence: 82 },
    { category: "Fashion & Lifestyle", currentDemand: 28000, predictedDemand: 31000, change: 10.7, trend: "up", confidence: 78 },
    { category: "Gift Cards", currentDemand: 52000, predictedDemand: 49000, change: -5.8, trend: "down", confidence: 88 },
    { category: "Home & Living", currentDemand: 18000, predictedDemand: 17500, change: -2.8, trend: "stable", confidence: 75 }
  ],
  trendingProducts: [
    { name: "Premium Headphones", demandScore: 94 },
    { name: "Weekend Getaway Package", demandScore: 91 },
    { name: "Smart Watch", demandScore: 88 },
    { name: "Spa & Wellness Voucher", demandScore: 85 },
    { name: "Designer Accessories", demandScore: 82 }
  ],
  seasonalEvents: [
    { event: "Republic Day Sale", date: "Jan 26", impact: "+45% redemptions expected" },
    { event: "Valentine's Week", date: "Feb 7-14", impact: "+60% experience rewards" },
    { event: "Holi Festival", date: "Mar 14", impact: "+35% gift card demand" }
  ],
  recommendations: [
    {
      title: "Aggressively Increase Knit Inventory for Loyalty Members",
      reason: "Knit sales are surging. Loyalty members are key; ensure ample stock to meet demand & reward their loyalty with consistent availability.",
      confidence: 85,
      action_type: "INVENTORY_INCREASE",
      time_horizon_days: 30,
      predicted_surge_pct: 37.6
    },
    {
      title: "Partner with Travel Providers for Exclusive Experiences",
      reason: "Travel & Experiences demand is up 50%. Exclusive partnerships can drive premium engagement and differentiate the rewards catalog.",
      confidence: 82,
      action_type: "PARTNERSHIP",
      time_horizon_days: 45,
      predicted_surge_pct: 50.0
    },
    {
      title: "Reduce Gift Card Promotion Spend",
      reason: "Gift Card demand is declining at -5.8%. Reallocate marketing budget to higher-growth categories like Electronics and Travel.",
      confidence: 88,
      action_type: "BUDGET_REALLOCATION",
      time_horizon_days: 14,
      predicted_surge_pct: -5.8
    }
  ],
  lastUpdated: "6 hours ago"
};

export const mockWhatIfData: WhatIfData = {
  currentState: {
    revenue: 156000000,
    churnRate: 4.2,
    engagement: 68.5
  },
  scenarios: [
    {
      id: "1",
      name: "Increase Reward Value",
      description: "Boost point value by adjusting reward pricing",
      variables: [
        { name: "Point Value Increase", value: 15, min: 0, max: 50, step: 5, unit: "%" }
      ],
      predictedOutcome: {
        revenue: 168000000,
        revenueChange: 7.7,
        churnRate: 3.5,
        churnChange: -16.7,
        engagement: 74.2,
        engagementChange: 8.3
      }
    },
    {
      id: "2",
      name: "Lower Tier Thresholds",
      description: "Make Gold tier more accessible",
      variables: [
        { name: "Gold Threshold Reduction", value: 20, min: 0, max: 40, step: 5, unit: "%" }
      ],
      predictedOutcome: {
        revenue: 149000000,
        revenueChange: -4.5,
        churnRate: 3.2,
        churnChange: -23.8,
        engagement: 76.8,
        engagementChange: 12.1
      }
    },
    {
      id: "3",
      name: "Launch Referral Bonus",
      description: "Implement 2x points for successful referrals",
      variables: [
        { name: "Referral Bonus Multiplier", value: 2, min: 1, max: 5, step: 0.5, unit: "x" }
      ],
      predictedOutcome: {
        revenue: 172000000,
        revenueChange: 10.3,
        churnRate: 4.0,
        churnChange: -4.8,
        engagement: 71.5,
        engagementChange: 4.4
      }
    }
  ]
};

export const mockDecisionImpactRadarData: DecisionImpactRadarData = {
  widget_type: "decision_impact_radar",
  last_updated: "2026-01-06T14:30:00Z",
  primary_recommendation: {
    strategy_id: "electronics_rewards_boost",
    title: "Boost Electronics Rewards",
    target_segments: ["Growing Engaged", "High-Value Regulars"],
    time_horizon_days: 30,
    predicted_impact: {
      revenue: { value: 1.2, unit: "Cr", delta_percent: 7.4 },
      churn_rate: { value: -0.6, unit: "%" },
      engagement: { value: 8.9, unit: "%" }
    },
    confidence: 86
  },
  alternative_strategies: [
    {
      strategy_id: "silver_reactivation",
      title: "Reactivate Dormant Silver Members",
      target_segments: ["Dormant Silver"],
      time_horizon_days: 45,
      predicted_impact: {
        revenue: { value: 0.85, unit: "Cr" },
        churn_rate: { value: -1.1, unit: "%" },
        engagement: { value: 12.4, unit: "%" }
      },
      confidence: 82
    },
    {
      strategy_id: "tier_threshold_optimization",
      title: "Reduce Gold Tier Threshold",
      target_segments: ["Near-Threshold Silver"],
      time_horizon_days: 60,
      predicted_impact: {
        revenue: { value: 0.6, unit: "Cr" },
        churn_rate: { value: -0.4, unit: "%" },
        engagement: { value: 5.1, unit: "%" }
      },
      confidence: 78
    }
  ]
};

// Follow-up suggestions for AI Chat
export const forecastFollowUpSuggestions = [
  "What's driving the weekend sales spike?",
  "Show me the 90-day forecast breakdown",
  "Which segments contribute most to predicted revenue?",
  "Compare this forecast to last quarter"
];

export const churnFollowUpSuggestions = [
  "Which intervention has the highest save rate?",
  "Show me the revenue at risk by segment",
  "What triggered the churn risk for Gold members?",
  "Create a retention campaign for high-risk customers"
];

export const whatIfFollowUpSuggestions = [
  "What if we increase reward value by 25%?",
  "Simulate lowering Gold threshold by 30%",
  "Compare all three scenarios side by side",
  "Which scenario minimizes churn the most?"
];

export const clvFollowUpSuggestions = [
  "Which tier has the highest growth potential?",
  "What's causing Silver tier CLV decline?",
  "Show me CLV trends over the last 6 months",
  "How can we accelerate Gold tier CLV?"
];
