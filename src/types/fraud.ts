export interface FraudRiskSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  riskScore: number;
  amountAtRisk: number;
  trend: "up" | "down" | "stable";
  color: string;
}

export interface FraudAlert {
  id: string;
  type: "high" | "medium" | "low";
  message: string;
  affectedCustomers: number;
  detectedAt: string;
}

export interface FraudData {
  summary: {
    totalTransactions: number;
    flaggedTransactions: number;
    totalAmountAtRisk: number;
    fraudRate: number;
    trend: number;
  };
  riskSegments: FraudRiskSegment[];
  recentAlerts: FraudAlert[];
  recommendations: string[];
  modelAccuracy: number;
  lastUpdated: string;
}
