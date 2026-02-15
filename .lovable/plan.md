

## AI Insight Log -- Scalable Flashcard Carousel (up to 50 cards)

### Overview

Redesign the AI Insight Log from a static 5-column grid into a **horizontal flashcard carousel** that can handle up to 50 insight entries efficiently.

### Design Decisions for Scale

Since the count can reach 50 cards:
- **Lazy rendering**: Only visible cards + neighbors are fully rendered (Embla handles this natively via its viewport clipping)
- **Category filter tabs**: Add filter tabs (All / Fraud / Churn / Anomaly) above the carousel so users can narrow down insights without scrolling through all 50
- **Counter badge**: Show total count and filtered count (e.g., "Showing 12 of 50")
- **Keyboard navigation**: Left/Right arrow keys to scroll
- **Loop disabled**: With 50 cards, looping would be disorienting -- scroll stops at ends

### Flashcard Layout (per card)

Each card will show:
- Type icon + status badge (top row)
- Title (bold, 2-line clamp)
- Detail text (2-line clamp)
- Inline metrics: customers affected + revenue at risk
- Footer: program name, timestamp, chevron arrow
- Hover: subtle shadow lift effect

### Carousel Behavior

- **Desktop**: Show 3 cards at a time (`basis-1/3`)
- **Tablet**: Show 2 cards (`basis-1/2`)
- **Mobile**: Show 1 card (`basis-full`)
- Left/Right arrow buttons on edges
- Smooth slide animation with `align: "start"`
- Scroll progress indicator (dot pagination replaced with a thin progress bar for 50 items -- dots would be too many)

### Technical Plan

**File: `src/components/AIInsightsLog.tsx`**

1. **Add filter state**: `useState` for active filter type (`"all" | "fraud" | "churn" | "anomaly"`)
2. **Filter tabs UI**: Row of pill buttons above the carousel to filter by insight type, with count badges on each
3. **Replace grid with Carousel**: Import `Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext` from `@/components/ui/carousel`
4. **Carousel options**: `{ align: "start", loop: false, dragFree: true }` -- `dragFree` allows smooth free-scrolling which is better for large sets
5. **CarouselItem sizing**: Responsive classes `basis-full md:basis-1/2 lg:basis-1/3` on each item
6. **Flashcard markup**: Enriched card with metrics row (customers affected, revenue at risk) and program/region info in footer
7. **Progress indicator**: A thin horizontal bar below the carousel showing scroll position (using Embla's `scrollProgress` API)
8. **Expand mock data**: Add more entries to reach ~15-20 sample items covering various KPI types to demonstrate scalability
9. **Preserve dialog**: Existing click-to-detail dialog remains unchanged

**No other files need changes.** The carousel UI components and Embla package are already installed.

### Summary of Additions
- Filter tabs with count badges
- Carousel with responsive card sizing
- Scroll progress bar (not dots -- better for 50 items)
- `dragFree` mode for fast browsing
- Expanded mock data for realistic testing
- All existing dialog/detail functionality preserved

