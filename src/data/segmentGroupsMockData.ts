export interface GroupSegment {
  id: number;
  name: string;
  rawCount: number;
  overlapRemoved: number;
  netCount: number;
}

export interface SegmentGroup {
  id: string;
  name: string;
  status: "Active" | "Draft";
  createdDate: string;
  mode: "Waterfall";
  segments: GroupSegment[];
}

// Consistent colors for segments across all views
export const SEGMENT_COLORS = [
  "hsl(221, 83%, 53%)",   // primary blue
  "hsl(252, 100%, 67%)",  // accent purple
  "hsl(142, 76%, 36%)",   // green
  "hsl(38, 92%, 50%)",    // amber
  "hsl(340, 75%, 55%)",   // rose
  "hsl(190, 80%, 42%)",   // teal
  "hsl(280, 60%, 50%)",   // violet
  "hsl(15, 80%, 55%)",    // orange
];

export const mockSegmentGroups: SegmentGroup[] = [
  {
    id: "grp-1",
    name: "High-Value Retention Campaign",
    status: "Active",
    createdDate: "2026-03-10",
    mode: "Waterfall",
    segments: [
      { id: 1, name: "Champions", rawCount: 12450, overlapRemoved: 0, netCount: 12450 },
      { id: 2, name: "Loyal Customers", rawCount: 28900, overlapRemoved: 4200, netCount: 24700 },
      { id: 3, name: "Potential Loyalists", rawCount: 34200, overlapRemoved: 8100, netCount: 26100 },
    ],
  },
  {
    id: "grp-2",
    name: "Win-Back Q1 2026",
    status: "Active",
    createdDate: "2026-02-15",
    mode: "Waterfall",
    segments: [
      { id: 4, name: "At Risk", rawCount: 18600, overlapRemoved: 0, netCount: 18600 },
      { id: 5, name: "Hibernating", rawCount: 22100, overlapRemoved: 3400, netCount: 18700 },
      { id: 6, name: "Lost", rawCount: 35000, overlapRemoved: 5800, netCount: 29200 },
    ],
  },
  {
    id: "grp-3",
    name: "Spring Promo Targeting",
    status: "Draft",
    createdDate: "2026-03-20",
    mode: "Waterfall",
    segments: [
      { id: 7, name: "New Customers", rawCount: 8900, overlapRemoved: 0, netCount: 8900 },
      { id: 8, name: "Bargain Hunters", rawCount: 15200, overlapRemoved: 2100, netCount: 13100 },
    ],
  },
  {
    id: "grp-4",
    name: "Loyalty Tier Migration",
    status: "Active",
    createdDate: "2026-01-28",
    mode: "Waterfall",
    segments: [
      { id: 9, name: "Gold Tier", rawCount: 18900, overlapRemoved: 0, netCount: 18900 },
      { id: 10, name: "Silver Tier", rawCount: 42300, overlapRemoved: 6200, netCount: 36100 },
      { id: 11, name: "Bronze Tier", rawCount: 84850, overlapRemoved: 12400, netCount: 72450 },
      { id: 12, name: "Untiered", rawCount: 5200, overlapRemoved: 800, netCount: 4400 },
    ],
  },
];

// Available segments for the create flow
export const availableSegments = [
  { id: 101, name: "Champions", rawCount: 12450 },
  { id: 102, name: "Loyal Customers", rawCount: 28900 },
  { id: 103, name: "Potential Loyalists", rawCount: 34200 },
  { id: 104, name: "At Risk", rawCount: 18600 },
  { id: 105, name: "Hibernating", rawCount: 22100 },
  { id: 106, name: "Lost", rawCount: 35000 },
  { id: 107, name: "New Customers", rawCount: 8900 },
  { id: 108, name: "Bargain Hunters", rawCount: 15200 },
  { id: 109, name: "Gold Tier", rawCount: 18900 },
  { id: 110, name: "Silver Tier", rawCount: 42300 },
  { id: 111, name: "Bronze Tier", rawCount: 84850 },
  { id: 112, name: "Lapsed Digital Q1", rawCount: 4520 },
];
