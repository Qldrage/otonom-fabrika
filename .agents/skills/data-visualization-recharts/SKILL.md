---
name: Data Visualization (Recharts)
description: A standard design capability for creating stunning, interactive frontend data visualizations (Admin Dashboards, Analytics) using Recharts.
---

# Data Visualization (Recharts)

Otonom Fabrika applications must look premium and professional. When building Admin Dashboards, Analytics Pages, or any screen that displays statistics (like courier earnings, delivery metrics, or revenue), you must NOT use plain HTML tables.

## The Standard Tool: Recharts

For all React-based (Next.js/Vite) frontend applications, `recharts` is the official data visualization library. It is built on React components and D3, providing composable, animated, and responsive charts.

## Implementation Rules (Design Engineer & Coder)

1. **Dashboard UI:**
   - If the task is to build a dashboard, immediately install `recharts`.
   - Wrap all charts in a `<ResponsiveContainer>` so they adapt to screen sizes perfectly.
2. **Chart Types:**
   - Use `<LineChart>` for time-series data (e.g., earnings over a week).
   - Use `<BarChart>` for comparisons (e.g., total deliveries by courier).
   - Use `<PieChart>` for proportions (e.g., successful vs. failed deliveries).
   - Use `<AreaChart>` for volume metrics.
3. **Aesthetics:**
   - Always include `<Tooltip>` and `<Legend>` components for interactivity.
   - Use subtle animations (`isAnimationActive={true}`).
   - Style the chart colors to match the client's brand palette (Open-Design system).
   - Do not use harsh primary colors; use curated, harmonious HSL palettes.

**CRITICAL RULE:** For Server-Side (Backend) image generation (e.g., PDFs), use `skia-canvas`. For Client-Side (Frontend) interactive components, always use `recharts`.
