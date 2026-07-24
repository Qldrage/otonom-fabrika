---
name: Cinematic Web Animations (GSAP)
description: A specialized design capability requiring Design Engineers to use GSAP and ScrollTrigger for complex, timeline-based, and scroll-driven cinematic animations on Marketing and Landing pages.
---

# Cinematic Web Animations (GSAP)

Otonom Fabrika agents must ensure that "Marketing" or "Showcase" websites (e.g., the landing page selling our software products) look like award-winning (Awwwards) designs. Standard CSS transitions or Framer Motion are insufficient for complex storytelling. 

For these scenarios, agents must use the GreenSock Animation Platform (GSAP).

## The Tooling: greensock/GSAP

GSAP is the industry standard for JavaScript animation. It allows for ultra high-performance, sequenced, and scroll-driven animations across all modern browsers.

## Implementation Protocol (For Design Engineers)

1. **Use Cases:**
   - **DO NOT** use GSAP for simple button hovers or modal pop-ups. (Use Framer Motion or pure CSS for UI micro-interactions).
   - **DO** use GSAP for:
     - *Scroll-Driven Animations:* Elements appearing, transforming, or pinning as the user scrolls down the page (using the `ScrollTrigger` plugin).
     - *Complex Timelines:* Sequencing multiple animations back-to-back (e.g., Logo fades in -> Text splits -> 3D model rotates) using `gsap.timeline()`.
     - *SVG Manipulation:* Morphing SVG paths or drawing SVG lines.
2. **React / Next.js Integration:**
   - Always use the `@gsap/react` package hook `useGSAP()` to ensure proper cleanup of animations and to prevent React Strict Mode duplication issues.
   - Install dependencies: `npm install gsap @gsap/react`
3. **Synergy with Three.js:**
   - For ultra-premium landing pages, use GSAP ScrollTrigger to manipulate the camera position or object rotation of a `react-three-fiber` 3D Canvas based on the user's scroll position.

**CRITICAL RULE:** Marketing websites must tell a story. Use GSAP to make the website feel like a cinematic experience that flows with the user's scrolling action.
