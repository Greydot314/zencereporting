import { ForecastData, ChurnData, WhatIfData } from "./predictions";

export type ContentType = "text" | "insight" | "dashboard" | "table" | "segment" | "campaign" | "rfm" | "forecast" | "churn" | "whatif";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  contentType?: ContentType;
  insightData?: InsightData;
  dashboardData?: DashboardData;
  tableData?: TableData;
  segmentData?: SegmentData;
  campaignData?: CampaignData;
  rfmData?: RFMData;
  forecastData?: ForecastData;
  churnData?: ChurnData;
  whatIfData?: WhatIfData;
  followUpSuggestions?: string[];
}

export interface InsightData {
  title: string;
  description: string;
  trend: number;
  icon: string;
}

export interface DashboardData {
  kpis: KPICard[];
}

export interface KPICard {
  id: string;
  title: string;
  value: string;
  trend: number;
  chartType: "line" | "bar";
  chartData: number[];
  insight: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface SegmentData {
  segments: Segment[];
  recommendations: string[];
}

export interface Segment {
  name: string;
  count: number;
  percentage: number;
  avgMonetary: number;
  avgRecency: number;
  avgFrequency: number;
}

export interface CampaignData {
  channels: ChannelMetrics[];
  recommendations: CampaignRecommendation[];
}

export interface ChannelMetrics {
  name: string;
  icon: string;
  deliveries: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roas: number;
  ctr: number;
  openRate: number;
  performance: "HIGH" | "MEDIUM" | "LOW";
  trend: number;
}

export interface CampaignRecommendation {
  type: "success" | "warning";
  message: string;
}

export interface RFMData {
  totalCustomers: number;
  period: string;
  segments: RFMSegment[];
  chartData: { name: string; value: number; color: string }[];
}

export interface RFMSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  avgMonetary: number;
  avgRecency: number;
  avgFrequency: number;
  color: string;
  campaignRecommendation: string;
  priority: "high" | "medium" | "low";
}

export interface SearchStep {
  id: string;
  label: string;
  status: "completed" | "active" | "pending";
}

export interface DataSource {
  name: string;
  color: string;
}
