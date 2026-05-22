export type NudgePage = "atlas" | "dashboard" | "ai-insights" | "predictions";

export interface NudgeContent {
  headline: string;
  sub: string;
  cta: string;
  prompt: string;
  capabilities: { label: string; prompt: string; emoji: string }[];
  teaser: string;
}

export const nudgeContent: Record<NudgePage, NudgeContent> = {
  atlas: {
    headline: "Oliver spotted 3 things worth your time today ✨",
    sub: "Sales anomalies, a tier-migration risk pool, and a campaign idea — ready to walk you through.",
    cta: "Show me",
    prompt: "Summarize today's sales anomalies in Atlas Prime and what to do about them.",
    capabilities: [
      { label: "Spot sales anomalies", prompt: "Show me sales anomalies across regions this week.", emoji: "📈" },
      { label: "Find at-risk customers", prompt: "Which customer pools are at risk of churn this month?", emoji: "🛟" },
      { label: "Draft a winback campaign", prompt: "Draft a winback campaign for the lapsing Gold tier.", emoji: "💌" },
    ],
    teaser: "Want me to surface your top 3 growth levers from Atlas Prime?",
  },
  dashboard: {
    headline: "Hi! I'm Oliver — your AI co-pilot 👋",
    sub: "Ask me to summarize KPIs, prioritize alerts, or draft your next move.",
    cta: "Let's go",
    prompt: "Give me the 3 most important things to act on this week.",
    capabilities: [
      { label: "Today's priorities", prompt: "What should I focus on today?", emoji: "🎯" },
      { label: "Explain a KPI dip", prompt: "Why did engaged customers dip last week?", emoji: "🔎" },
      { label: "Brief me in 60 seconds", prompt: "Give me a 60-second executive briefing.", emoji: "⏱️" },
    ],
    teaser: "Want a 60-second briefing on what changed since yesterday?",
  },
  "ai-insights": {
    headline: "Turn these insights into action with Oliver 🚀",
    sub: "I'll prioritize, explain the why, and draft the next step for each one.",
    cta: "Prioritize for me",
    prompt: "Turn the latest insights into a prioritized action plan with owners and timing.",
    capabilities: [
      { label: "Prioritize insights", prompt: "Prioritize my open insights by revenue impact.", emoji: "🧭" },
      { label: "Explain the 'why'", prompt: "Explain the root cause behind the top insight.", emoji: "💡" },
      { label: "Draft an action plan", prompt: "Draft a 30-day action plan from these insights.", emoji: "📝" },
    ],
    teaser: "Want me to draft a 30-day action plan from your top insights?",
  },
  predictions: {
    headline: "Curious what's coming next? Ask Oliver 🔮",
    sub: "Forecasts, risk pools, and what-ifs — explained in plain business language.",
    cta: "Explain the forecast",
    prompt: "Explain next quarter's forecast and the biggest risks I should plan for.",
    capabilities: [
      { label: "Next quarter forecast", prompt: "Walk me through next quarter's revenue forecast.", emoji: "📊" },
      { label: "Top churn risks", prompt: "Which segments have the highest predicted churn?", emoji: "⚠️" },
      { label: "What-if a 5% price lift", prompt: "What if we lift prices 5% on the Gold tier?", emoji: "🧪" },
    ],
    teaser: "Want me to explain next quarter's forecast in plain English?",
  },
};
