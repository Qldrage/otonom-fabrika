---
name: Startup Landing Page Design (MagicUI)
description: A specialized design capability requiring Design Engineers to use MagicUI (magicui.design) to inject heavy, Vercel/Linear-style animations (3D Globes, Bento Grids, Animated Beams) into public-facing landing pages, ensuring a premium startup aesthetic.
---

# Startup Landing Page Design (MagicUI)

The "Landing Page" (Marketing Site or Homepage) is the most critical public face of any software deployed by Otonom Fabrika. It must never look generic, static, or like a simple admin template. It must emulate the high-budget "Design Engineering" aesthetic seen in top-tier startups (Vercel, Linear, Stripe).

To achieve this effortlessly, Frontend and Design agents must leverage **MagicUI** (`magicuidesign/magicui`).

## The Tooling: MagicUI

MagicUI is a UI library focused specifically on landing pages and heavy animations. Like `shadcn/ui` and `react-bits`, it is a "copy-paste" library built on Framer Motion and Tailwind CSS, meaning it does not introduce external npm dependencies that lock you in.

## Implementation Protocol (For Design & Frontend Agents)

1. **Strategic Placement:**
   - Use MagicUI exclusively for public-facing Marketing/Landing pages. Do not use heavy 3D globes or animated beams inside data-heavy dashboards (use `shadcn/ui` and `recharts` for dashboards).
2. **Component Injection (CLI or Copy-Paste):**
   - Identify the section type needed for the landing page.
   - Run the MagicUI CLI (e.g., `npx magicui-cli add globe`) or manually fetch the raw code from the repository.
   - **Key Components to Utilize:**
     - **Hero Sections:** Use `Animated Shiny Text` or `Retro Grid` backgrounds to make the hero section pop.
     - **Features Section:** Use the `Bento Grid` component to display features in a polished, Apple-like grid.
     - **Integrations/Connections:** Use `Animated Beam` to visually demonstrate how the system connects to other services (e.g., showing a line connecting a DB to an API).
     - **Global Reach:** Use the `Globe` (3D Interactive GitHub Globe) component for logistics, global tracking, or "Used Worldwide" sections.
     - **Social Proof:** Use `Marquee` to create infinite scrolling logos of clients or testimonials.
3. **Theming & Integration:**
   - Ensure the copied code correctly maps to the project's existing Tailwind CSS variables (e.g., `bg-background`, `text-primary`).
   - MagicUI components must blend seamlessly with the underlying `shadcn/ui` base architecture.

**CRITICAL RULE:** The goal is the "Wow Effect". If a user opens the landing page and it does not look like a multi-million dollar Silicon Valley product, the Design Engineer has failed. Use MagicUI to guarantee that premium feel.
