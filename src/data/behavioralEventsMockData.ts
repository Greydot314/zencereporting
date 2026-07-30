// ── Behavioural event catalog for Web & App segmentation ──
// Inspired by MoEngage / CleverTap / WebEngage event-based segment builders.
//
// KEY IDEA: an event is not always available on both platforms.
// `availability` says where the event is actually tracked, `tags` describe what
// it is, and `equivalent` points to the closest event on the other platform
// (e.g. "App Installed" has no web counterpart → "First Time Visitor").

export type EventPlatform = "web" | "app" | "both";
export type EventSource = "standard" | "system" | "custom";

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
  /** Where this event is actually captured */
  availability: { web: boolean; app: boolean };
  /** Who emits it: SDK standard, auto-collected system event, or client-defined */
  source: EventSource;
  /** Free-form tags used for filtering + explaining the event */
  tags: string[];
  /** Closest usable event on the platform where this one is not tracked */
  equivalent?: { eventId: string; note: string };
  properties: EventProperty[];
}

const both = { web: true, app: true };
const webOnly = { web: true, app: false };
const appOnly = { web: false, app: true };

export const behavioralEvents: BehavioralEvent[] = [
  // ── Acquisition & Session ──
  {
    id: "session_started", name: "Session Started", platform: "both", group: "Session",
    description: "User started a browsing session on web or app",
    availability: both, source: "system", tags: ["auto-collected", "session", "acquisition"],
    properties: [
      { id: "source", name: "UTM Source", type: "string", options: ["google", "meta", "email", "direct", "affiliate"] },
      { id: "campaign", name: "UTM Campaign", type: "string" },
      { id: "session_duration", name: "Session Duration (sec)", type: "number" },
    ],
  },
  {
    id: "first_time_visitor", name: "First Time Visitor", platform: "web", group: "Session",
    description: "First ever web session from this browser / identity",
    availability: webOnly, source: "system", tags: ["auto-collected", "web-only", "acquisition"],
    equivalent: { eventId: "app_installed", note: "On app, first-touch is captured as App Installed." },
    properties: [
      { id: "source", name: "UTM Source", type: "string", options: ["google", "meta", "email", "direct", "affiliate"] },
      { id: "landing_page", name: "Landing Page", type: "string" },
    ],
  },
  {
    id: "app_installed", name: "App Installed", platform: "app", group: "Session",
    description: "User installed the mobile app",
    availability: appOnly, source: "system", tags: ["auto-collected", "app-only", "acquisition", "lifecycle"],
    equivalent: { eventId: "first_time_visitor", note: "Web has no install; the nearest signal is First Time Visitor." },
    properties: [
      { id: "os", name: "OS", type: "string", options: ["iOS", "Android"] },
      { id: "install_source", name: "Install Source", type: "string", options: ["Play Store", "App Store", "Referral", "Ad"] },
    ],
  },
  {
    id: "app_uninstalled", name: "App Uninstalled", platform: "app", group: "Session",
    description: "User uninstalled the mobile app",
    availability: appOnly, source: "system", tags: ["auto-collected", "app-only", "lifecycle", "churn signal"],
    equivalent: { eventId: "session_started", note: "Web equivalent is inactivity — use 'Did not perform Session Started'." },
    properties: [{ id: "os", name: "OS", type: "string", options: ["iOS", "Android"] }],
  },
  {
    id: "push_permission", name: "Push Permission Granted", platform: "app", group: "Session",
    description: "User allowed push notifications",
    availability: appOnly, source: "system", tags: ["app-only", "reachability", "permission"],
    equivalent: { eventId: "web_push_subscribed", note: "Web uses browser push opt-in instead of OS permission." },
    properties: [{ id: "os", name: "OS", type: "string", options: ["iOS", "Android"] }],
  },
  {
    id: "web_push_subscribed", name: "Web Push Subscribed", platform: "web", group: "Session",
    description: "User accepted browser push notifications",
    availability: webOnly, source: "system", tags: ["web-only", "reachability", "permission"],
    equivalent: { eventId: "push_permission", note: "App equivalent is the OS-level push permission." },
    properties: [{ id: "browser", name: "Browser", type: "string", options: ["Chrome", "Safari", "Edge", "Firefox"] }],
  },

  // ── Discovery ──
  {
    id: "page_viewed", name: "Page Viewed", platform: "web", group: "Discovery",
    description: "User viewed a web page",
    availability: webOnly, source: "system", tags: ["auto-collected", "web-only", "discovery"],
    equivalent: { eventId: "screen_viewed", note: "App tracks Screen Viewed instead of page URLs." },
    properties: [
      { id: "page_url", name: "Page URL", type: "string" },
      { id: "page_type", name: "Page Type", type: "string", options: ["Home", "Category", "PDP", "Cart", "Checkout", "Blog"] },
      { id: "time_on_page", name: "Time on Page (sec)", type: "number" },
    ],
  },
  {
    id: "screen_viewed", name: "Screen Viewed", platform: "app", group: "Discovery",
    description: "User viewed an app screen",
    availability: appOnly, source: "system", tags: ["auto-collected", "app-only", "discovery"],
    equivalent: { eventId: "page_viewed", note: "Web equivalent is Page Viewed (URL based)." },
    properties: [
      { id: "screen_name", name: "Screen Name", type: "string", options: ["Home", "Category", "Product", "Cart", "Wallet", "Profile"] },
      { id: "time_on_screen", name: "Time on Screen (sec)", type: "number" },
    ],
  },
  {
    id: "search_performed", name: "Search Performed", platform: "both", group: "Discovery",
    description: "User ran a search query",
    availability: both, source: "standard", tags: ["discovery", "intent"],
    properties: [
      { id: "query", name: "Search Query", type: "string" },
      { id: "results_count", name: "Results Count", type: "number" },
      { id: "zero_result", name: "Zero Result", type: "boolean" },
    ],
  },
  {
    id: "product_viewed", name: "Product Viewed", platform: "both", group: "Discovery",
    description: "User opened a product detail page",
    availability: both, source: "standard", tags: ["discovery", "intent", "catalog"],
    properties: [
      { id: "category", name: "Category", type: "string", options: ["Electronics", "Fashion", "Beauty", "Grocery", "Home & Living"] },
      { id: "brand", name: "Brand", type: "string" },
      { id: "price", name: "Price", type: "number" },
    ],
  },
  {
    id: "filter_applied", name: "Filter Applied", platform: "both", group: "Discovery",
    description: "User applied a listing filter",
    availability: both, source: "standard", tags: ["discovery", "intent"],
    properties: [
      { id: "filter_type", name: "Filter Type", type: "string", options: ["Price", "Brand", "Rating", "Discount", "Size"] },
    ],
  },

  // ── Conversion ──
  {
    id: "added_to_cart", name: "Added to Cart", platform: "both", group: "Conversion",
    description: "User added a product to the cart",
    availability: both, source: "standard", tags: ["conversion", "intent", "revenue"],
    properties: [
      { id: "category", name: "Category", type: "string", options: ["Electronics", "Fashion", "Beauty", "Grocery", "Home & Living"] },
      { id: "cart_value", name: "Cart Value", type: "number" },
      { id: "quantity", name: "Quantity", type: "number" },
    ],
  },
  {
    id: "added_to_wishlist", name: "Added to Wishlist", platform: "both", group: "Conversion",
    description: "User saved a product to wishlist",
    availability: both, source: "standard", tags: ["conversion", "intent"],
    properties: [{ id: "category", name: "Category", type: "string", options: ["Electronics", "Fashion", "Beauty", "Grocery"] }],
  },
  {
    id: "checkout_started", name: "Checkout Started", platform: "both", group: "Conversion",
    description: "User initiated checkout",
    availability: both, source: "standard", tags: ["conversion", "funnel", "revenue"],
    properties: [
      { id: "cart_value", name: "Cart Value", type: "number" },
      { id: "items", name: "Item Count", type: "number" },
    ],
  },
  {
    id: "payment_failed", name: "Payment Failed", platform: "both", group: "Conversion",
    description: "Payment attempt failed",
    availability: both, source: "standard", tags: ["conversion", "friction", "revenue"],
    properties: [{ id: "method", name: "Payment Method", type: "string", options: ["UPI", "Card", "Netbanking", "Wallet", "COD"] }],
  },
  {
    id: "order_placed", name: "Order Placed", platform: "both", group: "Conversion",
    description: "User completed a purchase",
    availability: both, source: "standard", tags: ["conversion", "revenue", "loyalty"],
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
    availability: appOnly, source: "standard", tags: ["app-only", "engagement", "campaign"],
    equivalent: { eventId: "email_clicked", note: "On web, campaign engagement is usually Email / Web-push click." },
    properties: [{ id: "campaign", name: "Campaign Name", type: "string" }],
  },
  {
    id: "email_clicked", name: "Email Link Clicked", platform: "web", group: "Engagement",
    description: "User clicked a link inside an email",
    availability: webOnly, source: "standard", tags: ["web-only", "engagement", "campaign"],
    equivalent: { eventId: "push_clicked", note: "In-app campaign engagement is Push Notification Clicked." },
    properties: [{ id: "campaign", name: "Campaign Name", type: "string" }],
  },
  {
    id: "banner_clicked", name: "Banner Clicked", platform: "both", group: "Engagement",
    description: "User clicked an on-site / in-app banner",
    availability: both, source: "standard", tags: ["engagement", "campaign", "merchandising"],
    properties: [{ id: "banner_id", name: "Banner", type: "string" }],
  },
  {
    id: "points_redeemed", name: "Loyalty Points Redeemed", platform: "both", group: "Engagement",
    description: "User redeemed loyalty points",
    availability: both, source: "custom", tags: ["loyalty", "engagement", "custom event"],
    properties: [{ id: "points", name: "Points", type: "number" }],
  },
];

export const eventGroups = ["Session", "Discovery", "Conversion", "Engagement"];

/** Tag vocabulary used for chips + filtering in the picker */
export const eventTags = [
  "auto-collected", "app-only", "web-only", "acquisition", "lifecycle",
  "reachability", "permission", "discovery", "intent", "conversion",
  "funnel", "revenue", "friction", "engagement", "campaign", "loyalty",
  "catalog", "session", "churn signal", "merchandising", "custom event",
];

export const sourceMeta: Record<EventSource, { label: string; hint: string }> = {
  system: { label: "System", hint: "Auto-collected by the Web/App SDK — no engineering work needed." },
  standard: { label: "Standard", hint: "Part of the standard commerce event spec, fired by the SDK once mapped." },
  custom: { label: "Custom", hint: "Client-defined event pushed from your app/site or imported from your event list." },
};

export const availabilityLabel = (a: { web: boolean; app: boolean }) =>
  a.web && a.app ? "Web + App" : a.web ? "Web only" : "App only";

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
