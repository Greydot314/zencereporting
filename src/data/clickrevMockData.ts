export interface AsmRow {
  region: string;
  asm: string;
  rm: string;
  dsm: string;
  store: string;
  // YTD pair
  newPrev: number;
  untaggedPrev: number;
  missOppPrev: number; // percent
  newCurr: number;
  untaggedCurr: number;
  missOppCurr: number;
  growth: number; // percent (vs last)
}

export const REPORT_TYPES = [
  "Fraud Reports",
  "KPI Report LTL",
  "Points Expiry Report",
  "Birthday Report",
  "Available Points > 500",
  "MVC Customer Fav Store",
  "NTR Report",
  "ASM Performance Report",
  "Store Wise Acquisition",
];

export const TIME_PERIODS = ["Monthly", "Overall"];
export const DIMENSIONS = ["Store", "City", "State", "Region", "Customer Tier", "Overall"];

// Hierarchy: Region -> RM -> DSM -> ASM -> Store
export interface HierarchyNode {
  id: string;
  label: string;
  type: "region" | "rm" | "dsm" | "asm" | "store";
  children?: HierarchyNode[];
}

export const HIERARCHY: HierarchyNode[] = [
  {
    id: "east",
    label: "EAST",
    type: "region",
    children: [
      {
        id: "east-rm1",
        label: "RM Subir Ghosh",
        type: "rm",
        children: [
          {
            id: "east-dsm1",
            label: "DSM Rakesh Kumar",
            type: "dsm",
            children: [
              { id: "asm-anand", label: "Anand Bihari Ojha", type: "asm", children: [
                { id: "store-pat-01", label: "PAT-01 Patna Boring Rd", type: "store" },
                { id: "store-pat-02", label: "PAT-02 Patna Frazer Rd", type: "store" },
              ]},
              { id: "asm-chandan", label: "Chandan Kumar Gautam", type: "asm" },
              { id: "asm-muzammil", label: "Muzammil Ibrahim Awati", type: "asm" },
            ],
          },
          {
            id: "east-dsm2",
            label: "DSM Pradeep Sinha",
            type: "dsm",
            children: [
              { id: "asm-nipon", label: "Nipon Pradhan-Left", type: "asm" },
              { id: "asm-praneta", label: "Praneta Kumar", type: "asm" },
              { id: "asm-saurabh", label: "Saurabh Raj Singh", type: "asm" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "north1",
    label: "NORTH1",
    type: "region",
    children: [
      {
        id: "north1-rm1",
        label: "RM Vikram Malhotra",
        type: "rm",
        children: [
          {
            id: "north1-dsm1",
            label: "DSM Harpreet Singh",
            type: "dsm",
            children: [
              { id: "asm-jitender", label: "Jitender Bansal", type: "asm" },
              { id: "asm-kulwinder", label: "Kulwinder Singh Athwal", type: "asm" },
              { id: "asm-prashant", label: "Prashant Srivastava", type: "asm" },
              { id: "asm-praveen", label: "Praveen Sharma", type: "asm" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "north2",
    label: "NORTH2",
    type: "region",
    children: [
      {
        id: "north2-rm1",
        label: "RM Suresh Yadav",
        type: "rm",
        children: [
          {
            id: "north2-dsm1",
            label: "DSM Anil Mishra",
            type: "dsm",
            children: [
              { id: "asm-anas", label: "Anas Ata", type: "asm" },
              { id: "asm-irfan", label: "Irfan Majid Isab", type: "asm" },
              { id: "asm-kapil", label: "Kapil Singh", type: "asm" },
              { id: "asm-uday", label: "Uday Nath Jha", type: "asm" },
              { id: "asm-madan", label: "Madan Singh", type: "asm" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "south",
    label: "SOUTH",
    type: "region",
    children: [
      {
        id: "south-rm1",
        label: "RM Karthik Reddy",
        type: "rm",
        children: [
          {
            id: "south-dsm1",
            label: "DSM Mohan Iyer",
            type: "dsm",
            children: [
              { id: "asm-chakra", label: "Chakravarthi V", type: "asm" },
              { id: "asm-ranjith", label: "Ranjith D R", type: "asm" },
              { id: "asm-saoud", label: "Saoud Ahmed", type: "asm" },
              { id: "asm-srika", label: "Srikakulapu Naga Rajasekhar", type: "asm" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "west1",
    label: "WEST1",
    type: "region",
    children: [
      {
        id: "west1-rm1",
        label: "RM Nilesh Kulkarni",
        type: "rm",
        children: [
          {
            id: "west1-dsm1",
            label: "DSM Ajay Patil",
            type: "dsm",
            children: [
              { id: "asm-atul", label: "Atul Ashok Shelar", type: "asm" },
              { id: "asm-krishna", label: "Krishna Kumar Singh", type: "asm" },
              { id: "asm-vinit", label: "Vinit Mishra", type: "asm" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "west2",
    label: "WEST2",
    type: "region",
    children: [
      {
        id: "west2-rm1",
        label: "RM Sanjay Joshi",
        type: "rm",
        children: [
          {
            id: "west2-dsm1",
            label: "DSM Mahesh Pawar",
            type: "dsm",
            children: [
              { id: "asm-jaikishan", label: "Jaikishan Murlidhar Yadav", type: "asm" },
              { id: "asm-mohammad", label: "Mohammad Safee Iftikhar Damudi", type: "asm" },
              { id: "asm-vivek", label: "Vivek Singh Chauhan", type: "asm" },
            ],
          },
        ],
      },
    ],
  },
];

export const ASM_REPORT_DATA: AsmRow[] = [
  { region: "EAST", asm: "Anand Bihari Ojha", rm: "Subir Ghosh", dsm: "Rakesh Kumar", store: "PAT-01", newPrev: 13009, untaggedPrev: 575, missOppPrev: 4, newCurr: 10995, untaggedCurr: 705, missOppCurr: 6, growth: 2 },
  { region: "EAST", asm: "Chandan Kumar Gautam", rm: "Subir Ghosh", dsm: "Rakesh Kumar", store: "RAN-02", newPrev: 15021, untaggedPrev: 485, missOppPrev: 3, newCurr: 13595, untaggedCurr: 952, missOppCurr: 7, growth: 3 },
  { region: "EAST", asm: "Muzammil Ibrahim Awati", rm: "Subir Ghosh", dsm: "Rakesh Kumar", store: "BHU-01", newPrev: 12753, untaggedPrev: 809, missOppPrev: 6, newCurr: 10478, untaggedCurr: 1011, missOppCurr: 9, growth: 3 },
  { region: "EAST", asm: "Nipon Pradhan-Left", rm: "Subir Ghosh", dsm: "Pradeep Sinha", store: "GUW-01", newPrev: 12999, untaggedPrev: 382, missOppPrev: 3, newCurr: 9523, untaggedCurr: 1103, missOppCurr: 10, growth: 8 },
  { region: "EAST", asm: "Praneta Kumar", rm: "Subir Ghosh", dsm: "Pradeep Sinha", store: "KOL-04", newPrev: 14439, untaggedPrev: 459, missOppPrev: 3, newCurr: 14310, untaggedCurr: 680, missOppCurr: 5, growth: 1 },
  { region: "EAST", asm: "Saurabh Raj Singh", rm: "Subir Ghosh", dsm: "Pradeep Sinha", store: "KOL-07", newPrev: 12891, untaggedPrev: 503, missOppPrev: 4, newCurr: 10887, untaggedCurr: 535, missOppCurr: 5, growth: 1 },

  { region: "NORTH1", asm: "Jitender Bansal", rm: "Vikram Malhotra", dsm: "Harpreet Singh", store: "DEL-09", newPrev: 16832, untaggedPrev: 1296, missOppPrev: 7, newCurr: 14501, untaggedCurr: 2039, missOppCurr: 12, growth: 5 },
  { region: "NORTH1", asm: "Kulwinder Singh Athwal", rm: "Vikram Malhotra", dsm: "Harpreet Singh", store: "CHD-02", newPrev: 21287, untaggedPrev: 1921, missOppPrev: 8, newCurr: 15250, untaggedCurr: 2298, missOppCurr: 13, growth: 3 },
  { region: "NORTH1", asm: "Prashant Srivastava", rm: "Vikram Malhotra", dsm: "Harpreet Singh", store: "LKO-01", newPrev: 10671, untaggedPrev: 489, missOppPrev: 4, newCurr: 9091, untaggedCurr: 487, missOppCurr: 5, growth: 1 },
  { region: "NORTH1", asm: "Praveen Sharma", rm: "Vikram Malhotra", dsm: "Harpreet Singh", store: "JAI-03", newPrev: 17894, untaggedPrev: 2711, missOppPrev: 13, newCurr: 13143, untaggedCurr: 3440, missOppCurr: 21, growth: 8 },

  { region: "NORTH2", asm: "Anas Ata", rm: "Suresh Yadav", dsm: "Anil Mishra", store: "AGR-01", newPrev: 14899, untaggedPrev: 915, missOppPrev: 6, newCurr: 13201, untaggedCurr: 1751, missOppCurr: 12, growth: 6 },
  { region: "NORTH2", asm: "Irfan Majid Isab", rm: "Suresh Yadav", dsm: "Anil Mishra", store: "VAR-01", newPrev: 16323, untaggedPrev: 915, missOppPrev: 5, newCurr: 13312, untaggedCurr: 964, missOppCurr: 7, growth: 1 },
  { region: "NORTH2", asm: "Kapil Singh", rm: "Suresh Yadav", dsm: "Anil Mishra", store: "ALD-01", newPrev: 11991, untaggedPrev: 604, missOppPrev: 5, newCurr: 9801, untaggedCurr: 710, missOppCurr: 7, growth: 2 },
  { region: "NORTH2", asm: "Uday Nath Jha", rm: "Suresh Yadav", dsm: "Anil Mishra", store: "GOR-01", newPrev: 11247, untaggedPrev: 553, missOppPrev: 5, newCurr: 9857, untaggedCurr: 955, missOppCurr: 9, growth: 4 },
  { region: "NORTH2", asm: "Madan Singh", rm: "Suresh Yadav", dsm: "Anil Mishra", store: "KAN-01", newPrev: 16361, untaggedPrev: 817, missOppPrev: 5, newCurr: 13354, untaggedCurr: 1246, missOppCurr: 9, growth: 4 },

  { region: "SOUTH", asm: "Chakravarthi V", rm: "Karthik Reddy", dsm: "Mohan Iyer", store: "BLR-04", newPrev: 12823, untaggedPrev: 1267, missOppPrev: 9, newCurr: 8961, untaggedCurr: 1615, missOppCurr: 15, growth: 6 },
  { region: "SOUTH", asm: "Ranjith D R", rm: "Karthik Reddy", dsm: "Mohan Iyer", store: "MAS-01", newPrev: 19221, untaggedPrev: 3501, missOppPrev: 15, newCurr: 15098, untaggedCurr: 4213, missOppCurr: 22, growth: 6 },
  { region: "SOUTH", asm: "Saoud Ahmed", rm: "Karthik Reddy", dsm: "Mohan Iyer", store: "HYD-02", newPrev: 16352, untaggedPrev: 1474, missOppPrev: 8, newCurr: 15488, untaggedCurr: 2581, missOppCurr: 14, growth: 6 },
  { region: "SOUTH", asm: "Srikakulapu Naga Rajasekhar", rm: "Karthik Reddy", dsm: "Mohan Iyer", store: "VIJ-01", newPrev: 9632, untaggedPrev: 320, missOppPrev: 3, newCurr: 8615, untaggedCurr: 660, missOppCurr: 7, growth: 4 },

  { region: "WEST1", asm: "Atul Ashok Shelar", rm: "Nilesh Kulkarni", dsm: "Ajay Patil", store: "MUM-08", newPrev: 14841, untaggedPrev: 1208, missOppPrev: 8, newCurr: 13779, untaggedCurr: 2080, missOppCurr: 13, growth: 6 },
  { region: "WEST1", asm: "Krishna Kumar Singh", rm: "Nilesh Kulkarni", dsm: "Ajay Patil", store: "MUM-12", newPrev: 12395, untaggedPrev: 803, missOppPrev: 6, newCurr: 9850, untaggedCurr: 1439, missOppCurr: 13, growth: 6 },
  { region: "WEST1", asm: "Vinit Mishra", rm: "Nilesh Kulkarni", dsm: "Ajay Patil", store: "PUN-03", newPrev: 10497, untaggedPrev: 349, missOppPrev: 3, newCurr: 8758, untaggedCurr: 637, missOppCurr: 7, growth: 4 },

  { region: "WEST2", asm: "Jaikishan Murlidhar Yadav", rm: "Sanjay Joshi", dsm: "Mahesh Pawar", store: "AHM-02", newPrev: 20521, untaggedPrev: 3207, missOppPrev: 14, newCurr: 16797, untaggedCurr: 4302, missOppCurr: 20, growth: 7 },
  { region: "WEST2", asm: "Mohammad Safee Iftikhar Damudi", rm: "Sanjay Joshi", dsm: "Mahesh Pawar", store: "SUR-01", newPrev: 12696, untaggedPrev: 906, missOppPrev: 7, newCurr: 9757, untaggedCurr: 1545, missOppCurr: 14, growth: 7 },
  { region: "WEST2", asm: "Vivek Singh Chauhan", rm: "Sanjay Joshi", dsm: "Mahesh Pawar", store: "VAD-01", newPrev: 14616, untaggedPrev: 823, missOppPrev: 5, newCurr: 12620, untaggedCurr: 1054, missOppCurr: 8, growth: 2 },
];
