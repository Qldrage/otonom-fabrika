---
name: Open Design Systems (Dynamic Brand UI)
description: A meta-skill for Design Engineers to dynamically fetch and apply premium brand design systems (Stripe, Vercel, Apple, Airbnb, etc.) from the nexu-io/open-design repository.
---

# Open Design Systems (Meta-Skill)

This skill grants Design Engineers the ability to apply world-class, brand-grade UI systems to components WITHOUT relying on hardcoded generic Tailwind values.

## How It Works
If the Architect or User requests a specific brand's design style (e.g., "Make it look like Vercel" or "Use the Stripe design system"), you MUST NOT guess the design. Instead, you MUST fetch the exact design tokens and prompts from the `nexu-io/open-design` repository.

## Execution Steps for Design Engineers:

1. **Identify the Brand Request:** Determine which brand style is requested (e.g., `vercel`, `stripe`, `apple`, `airbnb`, `linear`, `glassmorphism`, `dashboard`).
2. **Fetch the System Prompt:** Use your `read_url_content` or `run_command` (curl) tool to fetch the raw system prompt for that specific brand from the repository.
   - Example URL format: `https://raw.githubusercontent.com/nexu-io/open-design/main/design-systems/[BRAND_NAME]/system-prompt.txt`
   - *If `system-prompt.txt` does not exist, look for `README.md` or `tokens.css` in that brand's directory.*
3. **Internalize the Rules:** Read the fetched design system rules. It will contain specific Tailwind utility classes, color palettes (e.g., `zinc-900`, `neutral-50`), spacing scales, and micro-interaction behaviors (e.g., `hover:-translate-y-0.5`).
4. **Apply the Design:** Rewrite the target React/HTML component applying those exact Tailwind classes. DO NOT hallucinate your own styles. Follow the fetched brand guide strictly.

## Default Fallback Systems
If a generic "Premium" or "Modern" UI is requested without a specific brand, default to fetching and applying one of these highly-rated systems:
- `vercel` (Sleek, developer-focused, high contrast, perfect for Dashboards)
- `stripe` (Clean, corporate, subtle gradients, perfect for Payment/SaaS)
- `glassmorphism` (Translucent, modern, blurred backgrounds)

**CRITICAL RULE:** Never break the component's existing logic, states, or accessibility attributes while applying the design system. Just replace the CSS/Tailwind layer.
