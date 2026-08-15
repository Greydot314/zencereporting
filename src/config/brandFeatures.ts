import { eventsFor } from "@/data/eventCatalog";

/**
 * Per-brand capability flags.
 *
 * Behavioural (event) segmentation only makes sense when the brand has actually
 * instrumented events on its Web / App properties. Most brands have nothing
 * configured, so the whole section must stay hidden instead of showing an
 * empty builder.
 *
 * In production this object comes from the brand/tenant config API; here it is
 * a single source of truth the UI reads from.
 */
export interface BrandFeatureConfig {
  /** Master switch from the tenant config (SDK integrated + plan entitlement). */
  behaviouralEventsEnabled: boolean;
}

export const brandFeatures: BrandFeatureConfig = {
  behaviouralEventsEnabled: true,
};

/** A brand qualifies only if the flag is on AND at least one event exists in either catalog. */
export const hasBehaviouralEvents = () =>
  brandFeatures.behaviouralEventsEnabled &&
  eventsFor("web").length + eventsFor("app").length > 0;

export const behaviouralCatalogCounts = () => ({
  web: eventsFor("web").length,
  app: eventsFor("app").length,
});
