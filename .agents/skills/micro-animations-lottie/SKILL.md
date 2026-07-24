---
name: Micro-Animations (Lottie)
description: A strict frontend UI/UX skill requiring Design Engineers to use lightweight Lottie (JSON) animations for micro-interactions instead of heavy GIFs or MP4s, preserving Core Web Vitals.
---

# Micro-Animations (Lottie)

Otonom Fabrika agents must produce interfaces that feel premium, interactive, and alive, without compromising performance metrics (LCP, INP).

## The Tooling: airbnb/lottie-web & lottie-react

Lottie is an open-source library that parses Adobe After Effects animations exported as JSON and renders them natively on mobile and web.

## Implementation Protocol (For Design Engineers)

1. **Avoid Heavy Media:**
   - Never use `.gif` or `.mp4` for UI micro-interactions (e.g., success checkmarks, loading spinners, empty state illustrations, vehicle tracking icons). They destroy Web Performance scores.
2. **Implement Lottie JSON:**
   - Always use `.json` or `.lottie` files for complex vector animations.
   - Install the required packages (e.g., `lottie-react` or `@lottiefiles/react-lottie-player`).
3. **Trigger-Based Animation:**
   - Do not let every animation loop indefinitely unless it's a loading state.
   - Use interaction triggers: play an animation on `hover`, `click`, or when an asynchronous task succeeds (e.g., a bursting confetti checkmark when a package is delivered).
4. **Lazy Loading:**
   - To maintain 100/100 Lighthouse scores, dynamically import (lazy load) Lottie player components so they don't block the main JavaScript bundle.

**CRITICAL RULE:** If the UI requires motion to indicate state changes (Empty Data, Success, Error, Loading), you MUST default to using a Lottie component rather than static CSS or heavy images.
