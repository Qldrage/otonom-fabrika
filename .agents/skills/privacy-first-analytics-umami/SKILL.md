---
name: Privacy-First Web Analytics (Umami)
description: A strict operational skill requiring agents to use the lightweight, privacy-focused Umami analytics engine instead of heavy third-party trackers like Google Analytics.
---

# Privacy-First Web Analytics (Umami)

Otonom Fabrika agents must preserve the Core Web Vitals (speed) of their applications and respect user privacy (GDPR compliance). Therefore, third-party analytics scripts that bloat the frontend or track users with invasive cookies are prohibited.

## The Tooling: umami-software/umami

Umami is a self-hostable, open-source web analytics alternative to Google Analytics. It does not use cookies, does not track users across domains, and is extremely lightweight.

## Implementation Protocol (For Architect & DevOps)

1. **Reject Heavy Trackers:**
   - Do NOT inject Google Analytics (`gtag.js`), Facebook Pixel, or any cookie-based tracking solution into the application's frontend.
2. **Self-Hosted Deployment:**
   - When a project requires user analytics (e.g., tracking page views on a landing page), the DevOps subagent should deploy an instance of `umami` to the Fabrika's own infrastructure (e.g., using the Dokploy self-hosted PaaS).
3. **Frontend Integration:**
   - The Architect or Design Engineer must inject only the lightweight Umami tracking script into the application's `<head>`.
   - **Example:** `<script defer src="https://[YOUR-UMAMI-URL]/script.js" data-website-id="YOUR-WEBSITE-ID"></script>`
4. **No Cookie Banners:**
   - Because Umami is cookie-free and GDPR-compliant by design, Design Engineers do not need to build or integrate annoying "Accept Cookies" banners, leading to a much cleaner UX.

**CRITICAL RULE:** All analytics data must remain within the Otonom Fabrika infrastructure. Do not leak visitor data to external third parties.
