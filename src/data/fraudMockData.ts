import { FraudData } from "@/types/fraud";

export const mockFraudData: FraudData = {
  summary: {
    totalTransactions: 2450000,
    flaggedTransactions: 8420,
    totalAmountAtRisk: 45600000,
    fraudRate: 0.34,
    trend: -12.5,
  },
  riskSegments: [
    {
      id: "high",
      name: "High Risk",
      count: 1245,
      percentage: 15,
      riskScore: 85,
      amountAtRisk: 28500000,
      trend: "down",
      color: "hsl(var(--destructive))",
    },
    {
      id: "medium",
      name: "Medium Risk",
      count: 3560,
      percentage: 42,
      riskScore: 55,
      amountAtRisk: 12400000,
      trend: "stable",
      color: "hsl(var(--chart-4))",
    },
    {
      id: "low",
      name: "Low Risk",
      count: 3615,
      percentage: 43,
      riskScore: 25,
      amountAtRisk: 4700000,
      trend: "down",
      color: "hsl(var(--chart-3))",
    },
  ],
  recentAlerts: [
    {
      id: "1",
      type: "high",
      message: "Unusual redemption pattern detected in Gold tier - 15x normal velocity",
      affectedCustomers: 234,
      detectedAt: "2 hours ago",
    },
    {
      id: "2",
      type: "medium",
      message: "Multiple accounts linked to same device fingerprint in Silver tier",
      affectedCustomers: 89,
      detectedAt: "5 hours ago",
    },
    {
      id: "3",
      type: "low",
      message: "Geographic anomaly detected - purchases from 3+ countries in 24h",
      affectedCustomers: 12,
      detectedAt: "1 day ago",
    },
  ],
  recommendations: [
    "Implement 2FA for high-value redemptions above ₹10,000 to reduce fraud exposure by 45%",
    "Review Gold tier accounts with >5 redemptions in past 24 hours - 78% correlation with fraud patterns",
    "Consider velocity limits on new accounts (< 30 days) to prevent synthetic identity fraud",
    "Deploy device fingerprinting for mobile transactions to detect account sharing",
  ],
  modelAccuracy: 94.2,
  lastUpdated: "Jan 28, 2026 10:45 AM",
};

export const fraudFollowUpSuggestions = [
  "Show high-risk customer details",
  "Compare with last month's fraud rate",
  "Export fraud report",
  "View fraud prevention rules",
];
