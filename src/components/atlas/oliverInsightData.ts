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
      "Transacted base grew steadily across the last 6 weeks (+25% net).",
      "Redemption is concentrated in Gold-tier customers (78% of all redemptions).",
      "Silver tier shows the largest untapped opportunity: high transaction frequency, low redemption.",
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
    recommendation: "Run a Silver-tier reward unlock pilot for 2 weeks targeting 8 Lac customers.",
    anomaly: "Redemption rate 4.6% — well below industry benchmark of 9-12%.",
    confidence: 91,
  },

  "Engaged Customer": {
    headline:
      "Engaged customers — those with 2+ transactions in the last 90 days — represent 18.4 Lac, a 12% lift QoQ. Engagement depth is strongest in West, weakest in East where churn-risk signals are emerging.",
    bullets: [
      "Engagement grew steadily until W5, then plateaued — saturation in the existing campaign mix.",
      "West region overperforms its customer share by 1.6x — local store associates driving repeat visits.",
      "East engagement dipped 9% in the last 2 weeks — early churn signal worth a watch.",
      "Suggestion: launch a 'come back' offer to East's dormant 60-90 day segment.",
    ],
    trend: [
      { m: "W1", v: 142 }, { m: "W2", v: 151 }, { m: "W3", v: 163 },
      { m: "W4", v: 172 }, { m: "W5", v: 184 }, { m: "W6", v: 184 },
    ],
    regions: [
      { name: "West", v: 62 }, { name: "North", v: 55 },
      { name: "South", v: 41 }, { name: "East", v: 26 },
    ],
    recommendation: "Trigger a personalized 'we miss you' offer for East's 60-90 day dormant cohort.",
    anomaly: "Engagement plateau in W5-W6 after 4 weeks of growth — campaign fatigue likely.",
    confidence: 84,
  },

  "Repeat Sales %": {
    headline:
      "Repeat Sales contribute 58.2% of total revenue, up 4.1 pts vs last quarter. The metric is a strong indicator of loyalty program health — currently trending above the 50% industry benchmark.",
    bullets: [
      "Repeat sales share climbed steadily from 48% to 58% across the period.",
      "North leads at 64% repeat share; East lags at 41% — newer market with thinner loyalty base.",
      "Top 20% of repeat customers drive 71% of repeat revenue — heavy Pareto concentration.",
      "Suggestion: protect the top 20% with a dedicated VIP track; nurture the long tail with frequency nudges.",
    ],
    trend: [
      { m: "W1", v: 48 }, { m: "W2", v: 51 }, { m: "W3", v: 53 },
      { m: "W4", v: 55 }, { m: "W5", v: 57 }, { m: "W6", v: 58 },
    ],
    regions: [
      { name: "North", v: 64 }, { name: "West", v: 59 },
      { name: "South", v: 54 }, { name: "East", v: 41 },
    ],
    recommendation: "Stand up a VIP track for the top 20% repeat cohort to defend 71% of repeat revenue.",
    anomaly: "East's 41% repeat share is 23 pts below North — structural gap, not noise.",
    confidence: 88,
  },

  "Total Bills": {
    headline:
      "Total Bills crossed 12.4 Lac for the period, a 7.8% increase WoW. Bill velocity is strongest on weekends; weekday footfall in West remains a soft spot worth a targeted nudge.",
    bullets: [
      "Bill count grew every week with the steepest jump in W4 (+11%) driven by the weekend promo.",
      "Average basket size held steady at ₹1,820 — growth is volume-led, not ticket-led.",
      "North contributes 38% of bills but only 31% of revenue — heavy discounting suspected.",
      "Suggestion: rebalance North's discount mix to lift basket size without losing footfall.",
    ],
    trend: [
      { m: "W1", v: 178 }, { m: "W2", v: 184 }, { m: "W3", v: 192 },
      { m: "W4", v: 213 }, { m: "W5", v: 218 }, { m: "W6", v: 224 },
    ],
    regions: [
      { name: "North", v: 86 }, { name: "South", v: 58 },
      { name: "West", v: 48 }, { name: "East", v: 32 },
    ],
    recommendation: "Cap North's flat-discount SKUs and test a bundle promo to lift avg basket by ₹150.",
    anomaly: "North's revenue-per-bill is 18% below the network average — margin leak.",
    confidence: 82,
  },

  "Total Quantity": {
    headline:
      "Total Quantity sold reached 38.6 Lac units, a 9.4% WoW lift. Volume growth is outpacing bills, signaling rising units-per-transaction — bundling is starting to work.",
    bullets: [
      "UPT (units per transaction) climbed from 2.1 to 2.4 over the period.",
      "Apparel & accessories combo drove 62% of the unit lift.",
      "South region's UPT (1.8) lags the network (2.4) — under-indexed on cross-sell.",
      "Suggestion: roll the apparel+accessories combo into South stores with associate training.",
    ],
    trend: [
      { m: "W1", v: 540 }, { m: "W2", v: 572 }, { m: "W3", v: 598 },
      { m: "W4", v: 624 }, { m: "W5", v: 651 }, { m: "W6", v: 678 },
    ],
    regions: [
      { name: "North", v: 240 }, { name: "South", v: 168 },
      { name: "West", v: 162 }, { name: "East", v: 108 },
    ],
    recommendation: "Roll the apparel+accessories bundle to South — projected UPT lift of +0.3.",
    anomaly: "South UPT 25% below network — sustained gap across 6 weeks.",
    confidence: 80,
  },

  "Points Issued": {
    headline:
      "9.82 Cr points issued this period — a 14% rise WoW driven by accelerator campaigns. Issuance is healthy, but the issued-to-redeemed ratio of 3.1:1 signals a growing unredeemed liability on the books.",
    bullets: [
      "Issuance peaked in W4 during the 2x points weekend (+22% vs baseline).",
      "Gold-tier customers received 47% of points — concentration risk if churn rises.",
      "Unredeemed points balance is at an all-time high of 184 Cr.",
      "Suggestion: launch a time-bound redemption window to convert liability into footfall.",
    ],
    trend: [
      { m: "W1", v: 142 }, { m: "W2", v: 156 }, { m: "W3", v: 168 },
      { m: "W4", v: 205 }, { m: "W5", v: 186 }, { m: "W6", v: 178 },
    ],
    regions: [
      { name: "North", v: 78 }, { name: "South", v: 52 },
      { name: "West", v: 38 }, { name: "East", v: 24 },
    ],
    recommendation: "Launch a 30-day 'use them or lose them' redemption window to draw down liability.",
    anomaly: "Issued-to-redeemed ratio 3.1:1 vs healthy benchmark of 2:1.",
    confidence: 89,
  },

  "Points Redeemed": {
    headline:
      "3.16 Cr points redeemed — a 6% lift but lagging issuance growth of 14%. Redemption friction is the biggest lever to unlock loyalty ROI in the next quarter.",
    bullets: [
      "Only 11.6% of active members redeemed in the last 90 days vs benchmark of 22%.",
      "Average redemption value is ₹240 — under-utilization of point balance.",
      "Mobile app redemption is 3x more frequent than in-store — friction in store flow.",
      "Suggestion: simplify in-store redemption to a single QR scan to lift redemption rate.",
    ],
    trend: [
      { m: "W1", v: 48 }, { m: "W2", v: 50 }, { m: "W3", v: 52 },
      { m: "W4", v: 56 }, { m: "W5", v: 54 }, { m: "W6", v: 57 },
    ],
    regions: [
      { name: "North", v: 24 }, { name: "South", v: 16 },
      { name: "West", v: 12 }, { name: "East", v: 5 },
    ],
    recommendation: "Pilot single-QR redemption at 50 high-traffic stores to lift in-store redemption 2x.",
    anomaly: "In-store redemption rate trails app by 3x — process friction, not awareness.",
    confidence: 85,
  },

  "Visit Per Customer": {
    headline:
      "Average visits per customer is 2.7 over the trailing 90 days, up from 2.3 last quarter. Frequency is climbing fastest in West where the new format stores opened in March.",
    bullets: [
      "Frequency rose 17% QoQ — strongest lift since the program relaunch.",
      "Top decile customers visit 6.2x — heavy contribution from VIP segment.",
      "East frequency at 1.9 is dragging the network — limited assortment & store density.",
      "Suggestion: pilot a curated capsule range in East to lift trial-to-repeat conversion.",
    ],
    trend: [
      { m: "W1", v: 23 }, { m: "W2", v: 24 }, { m: "W3", v: 25 },
      { m: "W4", v: 26 }, { m: "W5", v: 26 }, { m: "W6", v: 27 },
    ],
    regions: [
      { name: "West", v: 31 }, { name: "North", v: 28 },
      { name: "South", v: 25 }, { name: "East", v: 19 },
    ],
    recommendation: "Test a 12-SKU curated capsule in East stores for 8 weeks to drive repeat visits.",
    anomaly: "East frequency 30% below network — assortment depth likely cause.",
    confidence: 83,
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
