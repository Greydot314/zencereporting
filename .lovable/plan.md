## Goal

Create a reusable footer nudge system that slides up from the bottom with soft rounded edges (Plotline-style), highlights what users can explore in Oliver AI, and routes to `/ai-chat` with a context-aware prefilled prompt. Each of the 4 pages will showcase all 4 designs via a small variant switcher so you can compare them in one session.

## Pages in scope

- `/module/atlas-prime` (Atlas Prime Dashboard)
- `/` (Dashboard)
- `/ai-insights` (AI Insights)
- `/predictions` (Predictions)

## The 4 nudge designs

All share: bottom-fixed, slide-up entrance, 16-20px rounded top corners, soft shadow, close (X), CTA → `/ai-chat` with prefilled prompt via `navigate("/ai-chat", { state: { prompt } })`. Jolly tone, light gradient backgrounds, subtle confetti/sparkle accents.

1. **Spotlight Card** — Centered pill card (~480px) floating above footer. Oliver avatar circle on left, single jolly headline, one bright CTA. Best for quick attention. Accent: purple→pink gradient.
2. **Capability Carousel** — Full-width slim bar with auto-rotating capability chips ("Spot churn risks", "Forecast next quarter", "Draft a campaign"). Left: animated Oliver mark. Right: "Try it →" CTA that prefills the current chip's prompt. Accent: indigo + mint.
3. **Mini Chat Teaser** — Looks like a collapsed chat bubble in the bottom-right (~360px wide). Shows Oliver "typing" a playful question ("Want me to find your top 3 growth levers? ✨"). CTA: "Yes, show me". Accent: warm peach + violet.
4. **Confetti Banner** — Edge-to-edge celebratory band with confetti dots, big emoji-led headline ("🎉 Meet Oliver — your AI co-pilot"), 3 quick pill links (Insights · Predictions · Campaigns) each prefilling a different prompt. Accent: multi-color gradient.

## Behavior

- Slide-up entrance (`animate-fade-in` + translateY) ~600ms after page mount.
- Dismissable via X; dismissal stored in `sessionStorage` per `(page, variant)` so you can re-test by reloading.
- A small floating **variant switcher** (bottom-left, dev-style chip group: 1 · 2 · 3 · 4) lets you cycle designs on each page without code changes.
- CTA navigates to `/ai-chat` passing `{ state: { prompt: "<context prompt>" } }`. AIChat will read `location.state.prompt` and prefill the input.

## Per-page prefill prompts (defaults)

- Atlas Prime Dashboard → "Summarize today's sales anomalies and what to do about them."
- Dashboard → "Give me the 3 most important things to act on this week."
- AI Insights → "Turn the latest insights into a prioritized action plan."
- Predictions → "Explain next quarter's forecast and the biggest risks."

## Technical details

New files:
- `src/components/nudges/OliverNudgeProvider.tsx` — wraps page content, renders the active variant + variant switcher, manages dismissal state.
- `src/components/nudges/variants/SpotlightNudge.tsx`
- `src/components/nudges/variants/CarouselNudge.tsx`
- `src/components/nudges/variants/ChatTeaserNudge.tsx`
- `src/components/nudges/variants/ConfettiNudge.tsx`
- `src/components/nudges/nudgeContent.ts` — per-page copy + prefill prompts.

Edits:
- `src/pages/atlas/AtlasPrimeDashboard.tsx`, `src/pages/Dashboard.tsx`, `src/pages/AIInsights.tsx`, `src/pages/Predictions.tsx` — mount `<OliverNudgeProvider page="..." />`.
- `src/pages/AIChat.tsx` — read `location.state?.prompt` on mount, set as initial input value.

Styling:
- Use existing HSL tokens (`--primary`, `--accent`) plus the Oliver purple gradient `from-[#5B3FBF] to-[#8B6FE8]` already used in `OliverInsightDialog`.
- Soft top corners: `rounded-t-[20px]`. Shadow: `shadow-[0_-8px_32px_-8px_rgba(91,63,191,0.25)]`.
- Animations: existing `animate-fade-in`; add a small keyframe `slide-up-soft` in `tailwind.config.ts` if needed.
- Respects dark mode via tokens.

Out of scope: persistence across sessions, A/B analytics, real LLM wiring (chat remains the existing mock).

## Validation

After build: load each of the 4 pages, cycle through variants 1–4 using the switcher, confirm slide-up + dismiss + CTA navigates to `/ai-chat` with the prompt prefilled in the textarea.
