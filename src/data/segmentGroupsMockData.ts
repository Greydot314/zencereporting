export interface SegmentGroup {
  id: string;
  name: string;
  status: "Active" | "Draft";
  createdDate: string;
  mode: "Waterfall";
  segments: { id: number; name: string }[];
}

export const mockSegmentGroups: SegmentGroup[] = [
  {
    id: "grp-1",
    name: "High-Value Retention Campaign",
    status: "Active",
    createdDate: "2026-03-10",
    mode: "Waterfall",
    segments: [
      { id: 1, name: "Champions" },
      { id: 2, name: "Loyal Customers" },
      { id: 3, name: "Potential Loyalists" },
    ],
  },
  {
    id: "grp-2",
    name: "Win-Back Q1 2026",
    status: "Active",
    createdDate: "2026-02-15",
    mode: "Waterfall",
    segments: [
      { id: 4, name: "At Risk" },
      { id: 5, name: "Hibernating" },
      { id: 6, name: "Lost" },
    ],
  },
  {
    id: "grp-3",
    name: "Spring Promo Targeting",
    status: "Draft",
    createdDate: "2026-03-20",
    mode: "Waterfall",
    segments: [
      { id: 7, name: "New Customers" },
      { id: 8, name: "Bargain Hunters" },
    ],
  },
  {
    id: "grp-4",
    name: "Loyalty Tier Migration",
    status: "Active",
    createdDate: "2026-01-28",
    mode: "Waterfall",
    segments: [
      { id: 9, name: "Gold Tier" },
      { id: 10, name: "Silver Tier" },
      { id: 11, name: "Bronze Tier" },
      { id: 12, name: "Untiered" },
    ],
  },
];

export const availableSegments = [
  { id: 101, name: "Champions" },
  { id: 102, name: "Loyal Customers" },
  { id: 103, name: "Potential Loyalists" },
  { id: 104, name: "At Risk" },
  { id: 105, name: "Hibernating" },
  { id: 106, name: "Lost" },
  { id: 107, name: "New Customers" },
  { id: 108, name: "Bargain Hunters" },
  { id: 109, name: "Gold Tier" },
  { id: 110, name: "Silver Tier" },
  { id: 111, name: "Bronze Tier" },
  { id: 112, name: "Lapsed Digital Q1" },
];
