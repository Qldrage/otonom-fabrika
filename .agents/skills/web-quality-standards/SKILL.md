---
name: Web Quality Standards (Core Web Vitals & Lighthouse)
description: Strict frontend engineering principles based on Addy Osmani's agent-skills. Enforces Core Web Vitals (LCP, CLS, INP), Accessibility (a11y), and Technical SEO on all generated web UI.
---

# Web Quality Standards

Otonom Fabrika agents must not simply write "working" code. All frontend code (React, HTML, CSS, Next.js) must be "Production-Grade" and score 100/100 on Google Lighthouse.

## The Methodology (For Design Engineers and QA)

When generating or reviewing frontend code, you must enforce the following Web Quality principles (inspired by Addy Osmani):

1. **Largest Contentful Paint (LCP):**
   - The largest image or text block must load instantly.
   - **Rule:** Use `<link rel="preload" as="image" href="...">` and `fetchpriority="high"` for hero images. Avoid lazy-loading above-the-fold content.
2. **Cumulative Layout Shift (CLS):**
   - UI elements must never shift during page load.
   - **Rule:** Always set explicit `width` and `height` attributes (or CSS `aspect-ratio`) on `<img>`, `<video>`, and `<iframe>` elements to reserve space before they load.
3. **Interaction to Next Paint (INP):**
   - The UI must respond immediately to user clicks/taps.
   - **Rule:** Avoid long-running synchronous JavaScript tasks on the main thread. Yield to the main thread frequently.
4. **Accessibility (a11y):**
   - The UI must be usable by everyone.
   - **Rule:** Ensure sufficient color contrast. Always use semantic HTML (`<nav>`, `<main>`, `<article>`). Use `aria-label` or `aria-labelledby` for icon buttons without visible text. Support full keyboard navigation.
5. **Technical SEO:**
   - **Rule:** Include proper `<title>`, `<meta name="description">`, and structured schema data. Use semantic heading hierarchies (only one `<h1>` per page).

**CRITICAL RULE:** Octopus Reviewer (QA) must fail any Pull Request or code submission that violates these Core Web Vitals or Accessibility rules, sending it back to the Design Engineer for a rewrite.
