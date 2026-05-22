export interface InsightData {
  headline: string;
  bullets: string[];
  trend: { m: string; v: number }[];
  regions: { name: string; v: number }[];
  recommendation?: string;
  anomaly?: string;
  confidence?: number;
}

export const insightByKpi: Record<string, InsightData> = {
  "Total Sales": {
    headline:
      "Total Sales surged from 3.0 Cr in 202502 to 119.6 Cr in 202503 — a 3,886.7% jump indicating strong initial market penetration. It peaked at 174.7 Cr in 202506 then sharply declined to 98.8 Cr in 202508, highlighting significant midyear volatility.",
    bullets: [
      "Pattern: recurring strong growth followed by significant dips — campaign-driven peaks + seasonal lulls.",
      "North leads at 151.0 Cr (40.7%) of total; East underperforms at 29.8 Cr (8.0%).",
      "A 2.8 Cr (0.8%) value is unassigned to any Region — investigate data quality.",
      "Suggestion: replicate successful campaign strategies from 202506 & 202510 during weaker months.",
    ],
    trend: [
      { m: "202502", v: 3 }, { m: "202503", v: 119 }, { m: "202504", v: 142 },
      { m: "202505", v: 156 }, { m: "202506", v: 174 }, { m: "202507", v: 132 },
      { m: "202508", v: 98 }, { m: "202509", v: 109 }, { m: "202510", v: 156 },
    ],
    regions: [
      { name: "North", v: 151 }, { name: "South", v: 100 },
      { name: "West", v: 86 }, { name: "East", v: 29 },
    ],
    recommendation: "Replicate the 202506 campaign mix in East to lift its 8% share toward 15%.",
    anomaly: "Midyear dip of ~43% — investigate inventory & promo overlap.",
    confidence: 86,
  },
  "Total Customers": {
    headline:
      "Total Customers reached 75.43 Lac with 24.72 Lac transacting and 1.14 Lac redeeming rewards. Engagement-to-base ratio sits at 32.8% — healthy but with clear redemption friction.",
    bullets: [
      "Transacted base grew steadily across the last 6 weeks.",
      "Redemption is concentrated in Gold-tier customers.",
      "Suggestion: nudge Silver tier with low-friction reward unlocks to lift redemption.",
    ],
    trend: [
      { m: "W1", v: 60 }, { m: "W2", v: 64 }, { m: "W3", v: 68 },
      { m: "W4", v: 70 }, { m: "W5", v: 73 }, { m: "W6", v: 75 },
    ],
    regions: [
      { name: "North", v: 30 }, { name: "South", v: 20 },
      { name: "West", v: 17 }, { name: "East", v: 8 },
    ],
    recommendation: "Run a Silver-tier reward unlock pilot for 2 weeks.",
    confidence: 91,
  },
};

export const getInsight = (kpi: string): InsightData => insightByKpi[kpi] ?? {
  headline: `Oliver analyzed ${kpi} across the selected period. The metric is trending within expected bands with minor weekly variance — no critical anomalies detected.`,
  bullets: [
    "No critical anomalies detected in the last 6 weeks.",
    "Top contributing region: North (40.7% share).",
    "Suggestion: monitor next 2 weeks for any deviation beyond the control band.",
  ],
  trend: [
    { m: "W1", v: 40 }, { m: "W2", v: 55 }, { m: "W3", v: 50 },
    { m: "W4", v: 70 }, { m: "W5", v: 65 }, { m: "W6", v: 80 },
  ],
  regions: [
    { name: "North", v: 40 }, { name: "South", v: 27 },
    { name: "West", v: 23 }, { name: "East", v: 10 },
  ],
  recommendation: "Set a watchlist alert for ±10% week-over-week change.",
  anomaly: "No anomalies above 2σ threshold this period.",
  confidence: 78,
};
