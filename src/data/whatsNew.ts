/**
 * What's New release feed.
 *
 * Bump `version` every time you ship something worth announcing and add a new
 * entry at the top of `releases`. Every user sees the popup once per version —
 * the moment the version changes, it appears again on their next visit.
 */
export interface WhatsNewItem {
  title: string;
  description: string;
  tag: "New" | "Improved" | "Fixed";
  /** In-app route the "Take me there" button navigates to. */
  route?: string;
  routeLabel?: string;
}

export interface WhatsNewRelease {
  version: string;
  date: string;
  headline: string;
  items: WhatsNewItem[];
}

/** Current version shown to users. Bump this to re-trigger the popup for everyone. */
export const WHATS_NEW_VERSION = "2026.08.1";

export const releases: WhatsNewRelease[] = [
  {
    version: "2026.08.1",
    date: "15 Aug 2026",
    headline: "Behavioural segmentation, split summaries & more",
    items: [
      {
        title: "Behavioural event segmentation",
        description:
          "Build segments on Web and App events with separate catalogs, frequency, time windows and payload property filters.",
        tag: "New",
        route: "/module/segcon/segments/create",
        routeLabel: "Open Create Segment",
      },
      {
        title: "Two-part segment summary",
        description:
          "Attribute criteria and behavioural events now get their own query summary and mind map so the logic is easy to read.",
        tag: "Improved",
        route: "/module/segcon/segments/create",
        routeLabel: "See it",
      },
      {
        title: "Oliver AI insights on every KPI",
        description:
          "Each Atlas Prime KPI now has a bespoke AI narrative, trend markers and a dive-deeper handoff into the Oliver chat.",
        tag: "New",
        route: "/module/atlas-prime",
        routeLabel: "Open Atlas Prime",
      },
      {
        title: "Auto-scheduled Clickrev reports",
        description:
          "Large report extracts are scheduled automatically and delivered to your inbox within 30 minutes.",
        tag: "New",
        route: "/clickrev/reports",
        routeLabel: "Open Reports",
      },
    ],
  },
];

export const currentRelease = () =>
  releases.find((r) => r.version === WHATS_NEW_VERSION) ?? releases[0];
