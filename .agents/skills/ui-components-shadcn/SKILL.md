---
name: Modern UI Components (shadcn/ui)
description: A frontend architecture skill instructing agents to use shadcn/ui to inject raw, highly-customizable React/Tailwind components directly into the codebase instead of writing UI elements from scratch or using rigid npm component libraries.
---

# Modern UI Components (shadcn/ui)

Otonom Fabrika agents must produce web interfaces that meet the highest industry standards for aesthetics, accessibility (a11y), and maintainability. When building User Interfaces (UI), writing complex components (Modals, Calendars, Selects, Data Tables) from scratch wastes factory resources. Using traditional component libraries (like Material UI or Ant Design) restricts design freedom and introduces heavy dependencies.

Agents must use `shadcn/ui`.

## The Tooling: shadcn-ui/ui

Shadcn/ui is NOT a component library. It is a collection of re-usable components built on Radix UI and Tailwind CSS. You do not install it as a dependency. Instead, you use its CLI to inject the raw code of the components directly into your project, giving you 100% control over the styling and logic.

## Implementation Protocol (For Frontend & Design Agents)

1. **Initialization:**
   - On a new Next.js project, run `npx shadcn-ui@latest init` to configure the `components.json` and base CSS variables.
2. **Component Injection:**
   - Whenever a standard UI element is needed (e.g., a Button, a Dropdown Menu, a Dialog, a Form), do NOT code it from scratch.
   - Run `npx shadcn-ui@latest add <component-name>` (e.g., `npx shadcn-ui@latest add dialog`).
   - The raw code will be added to `components/ui/dialog.tsx`.
3. **Customization & Premium Aesthetics:**
   - Since the raw code is now in your repository, apply your `design-engineering` principles.
   - Modify the Tailwind classes within the component file to match the client's premium brand identity (e.g., Apple-like borders, Vercel-like shadows, Stripe-like colors).
   - Ensure you use `Framer Motion` (from previous skills) to add micro-interactions to these shadcn components.

**CRITICAL RULE:** Do not reinvent the wheel for standard UI elements. Inject them via shadcn/ui, then style them to perfection.
