---
name: Animated UI Components (React Bits)
description: A frontend design capability requiring Design Engineers to use the React Bits library (reactbits.dev) to inject copy-paste animated components, micro-interactions, and premium visual effects into applications.
---

# Animated UI Components (React Bits)

Otonom Fabrika applications must look and feel premium, akin to top-tier Silicon Valley startups (Stripe, Vercel, Linear). To achieve this, flat and static designs are unacceptable. Design Engineers must inject high-quality micro-interactions and smooth animations.

Instead of writing complex `Framer Motion` physics from scratch, agents must utilize **React Bits** (`reactbits.dev` / `DavidHDev/react-bits`).

## The Tooling: React Bits

React Bits is an open-source library containing over 110+ highly polished animated, interactive, and customizable React components. Like `shadcn/ui`, it follows a "copy-paste" or CLI injection architecture rather than being a black-box NPM dependency.

## Implementation Protocol (For Design & Frontend Agents)

1. **Identify Interaction Opportunities:**
   - When building a landing page, marketing site, or a premium dashboard, identify areas where an animation adds value without harming UX (e.g., Hero Backgrounds, Feature Cards, Loading States, Hover Buttons).
2. **Component Injection:**
   - Do NOT try to invent complex magnetic buttons or liquid backgrounds from scratch.
   - Fetch the raw component code from the React Bits repository.
   - Example categories to use:
     - **Backgrounds:** Animated, glowing, or particle backgrounds for Hero sections.
     - **Text Animations:** Scrambling text, typewriter effects, or split-reveal text for headers.
     - **Components:** Magnetic buttons, glowing borders, or tilt cards.
3. **Integration with Shadcn:**
   - React Bits components must be integrated seamlessly with the existing `shadcn/ui` architecture. 
   - Apply Tailwind CSS variables (`var(--primary)`, `var(--background)`) to the React Bits raw code so the animations match the client's global brand theme.

**CRITICAL RULE:** Do not overuse animations. Apply them tastefully to create a "Premium" feel, ensuring that performance (Core Web Vitals) is never compromised.
