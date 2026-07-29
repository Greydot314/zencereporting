// ── Behavioural event catalog for Web & App segmentation ──
// Inspired by MoEngage / CleverTap / WebEngage event-based segment builders.

export type EventPlatform = "web" | "app" | "both";

export interface EventProperty {
  id: string;
  name: string;
  type: "string" | "number" | "boolean";
  options?: string[];
}

export interface BehavioralEvent {
  id: string;
  name: string;
  platform: EventPlatform;
  group: string;
  description: string;
  properties: EventProperty[];
}

export const behavioralEvents: BehavioralEvent[] = [
  // ── Acquisition & Session ──
  {
    id: "session_started", name: "Session Started", platform: "both", group: "Session",
    description: "User started a browsing session on web or app",
    properties: [
      { id: "source", name: "UTM Source", type: "string", options: ["google", "meta", "email", "direct", "affiliate"] },
      { id: "campaign", name: "UTM Campaign", type: "string" },
      { id: "session_duration", name: "Session Duration (sec)", type: "number" },
    ],
  },
  {
    id: "app_installed", name: "App Installed", platform: "app", group: "Session",
    description: "User installed the mobile app",
    properties: [
      { id: "os", name: "OS", type: "string", options: ["iOS", "Android"] },
      { id: "install_source", name: "Install Source", type: "string", options: ["Play Store", "App Store", "Referral", "Ad"] },
    ],
  },
  {
    id: "app_uninstalled", name: "App Uninstalled", platform: "app", group: "Session",
    description: "User uninstalled the mobile app",
    properties: [{ id: "os", name: "OS", type: "string", options: ["iOS", "Android"] }],
  },
  {
    id: "push_permission", name: "Push Permission Granted", platform: "app", group: "Session",
    description: "User allowed push notifications",
    properties: [{ id: "os", name: "OS", type: "string", options: ["iOS", "Android"] }],
  },

  // ── Discovery ──
  {
    id: "page_viewed", name: "Page Viewed", platform: "web", group: "Discovery",
    description: "User viewed a web page",
    properties: [
      { id: "page_url", name: "Page URL", type: "string" },
      { id: "page_type", name: "Page Type", type: "string", options: ["Home", "Category", "PDP", "Cart", "Checkout", "Blog"] },
      { id: "time_on_page", name: "Time on Page (sec)", type: "number" },
    ],
  },
  {
    id: "screen_viewed", name: "Screen Viewed", platform: "app", group: "Discovery",
    description: "User viewed an app screen",
    properties: [
      { id: "screen_name", name: "Screen Name", type: "string", options: ["Home", "Category", "Product", "Cart", "Wallet", "Profile"] },
      { id: "time_on_screen", name: "Time on Screen (sec)", type: "number" },
    ],
  },
  {
    id: "search_performed", name: "Search Performed", platform: "both", group: "Discovery",
    description: "User ran a search query",
    properties: [
      { id: "query", name: "Search Query", type: "string" },
      { id: "results_count", name: "Results Count", type: "number" },
      { id: "zero_result", name: "Zero Result", type: "boolean" },
    ],
  },
  {
    id: "product_viewed", name: "Product Viewed", platform: "both", group: "Discovery",
    description: "User opened a product detail page",
    properties: [
      { id: "category", name: "Category", type: "string", options: ["Electronics", "Fashion", "Beauty", "Grocery", "Home & Living"] },
      { id: "brand", name: "Brand", type: "string" },
      { id: "price", name: "Price", type: "number" },
    ],
  },
  {
    id: "filter_applied", name: "Filter Applied", platform: "both", group: "Discovery",
    description: "User applied a listing filter",
    properties: [
      { id: "filter_type", name: "Filter Type", type: "string", options: ["Price", "Brand", "Rating", "Discount", "Size"] },
    ],
  },

  // ── Conversion ──
  {
    id: "added_to_cart", name: "Added to Cart", platform: "both", group: "Conversion",
    description: "User added a product to the cart",
    properties: [
      { id: "category", name: "Category", type: "string", options: ["Electronics", "Fashion", "Beauty", "Grocery", "Home & Living"] },
      { id: "cart_value", name: "Cart Value", type: "number" },
      { id: "quantity", name: "Quantity", type: "number" },
    ],
  },
  {
    id: "added_to_wishlist", name: "Added to Wishlist", platform: "both", group: "Conversion",
    description: "User saved a product to wishlist",
    properties: [{ id: "category", name: "Category", type: "string", options: ["Electronics", "Fashion", "Beauty", "Grocery"] }],
  },
  {
    id: "checkout_started", name: "Checkout Started", platform: "both", group: "Conversion",
    description: "User initiated checkout",
    properties: [
      { id: "cart_value", name: "Cart Value", type: "number" },
      { id: "items", name: "Item Count", type: "number" },
    ],
  },
  {
    id: "payment_failed", name: "Payment Failed", platform: "both", group: "Conversion",
    description: "Payment attempt failed",
    properties: [{ id: "method", name: "Payment Method", type: "string", options: ["UPI", "Card", "Netbanking", "Wallet", "COD"] }],
  },
  {
    id: "order_placed", name: "Order Placed", platform: "both", group: "Conversion",
    description: "User completed a purchase",
    properties: [
      { id: "order_value", name: "Order Value", type: "number" },
      { id: "payment_method", name: "Payment Method", type: "string", options: ["UPI", "Card", "Netbanking", "Wallet", "COD"] },
      { id: "coupon_used", name: "Coupon Used", type: "boolean" },
    ],
  },

  // ── Engagement ──
  {
    id: "push_clicked", name: "Push Notification Clicked", platform: "app", group: "Engagement",
    description: "User tapped a push notification",
    properties: [{ id: "campaign", name: "Campaign Name", type: "string" }],
  },
  {
    id: "email_clicked", name: "Email Link Clicked", platform: "web", group: "Engagement",
    description: "User clicked a link inside an email",
    properties: [{ id: "campaign", name: "Campaign Name", type: "string" }],
  },
  {
    id: "banner_clicked", name: "Banner Clicked", platform: "both", group: "Engagement",
    description: "User clicked an on-site / in-app banner",
    properties: [{ id: "banner_id", name: "Banner", type: "string" }],
  },
  {
    id: "points_redeemed", name: "Loyalty Points Redeemed", platform: "both", group: "Engagement",
    description: "User redeemed loyalty points",
    properties: [{ id: "points", name: "Points", type: "number" }],
  },
];

export const eventGroups = ["Session", "Discovery", "Conversion", "Engagement"];

export const frequencyOperators = [
  "at least",
  "at most",
  "exactly",
  "between",
] as const;

export const timeWindowPresets = [
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
  "Last 60 days",
  "Last 90 days",
  "Last 6 months",
  "This month",
  "Lifetime",
  "Custom range",
] as const;

export const stringOperators = ["equals", "not equals", "contains", "does not contain", "starts with"];
export const numberOperators = ["equals", "greater than", "less than", "between"];
export const booleanOperators = ["is true", "is false"];
