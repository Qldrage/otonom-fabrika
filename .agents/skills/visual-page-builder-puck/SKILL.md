---
name: Visual Page Builder (Puck)
description: A frontend architecture skill allowing agents to integrate a drag-and-drop visual page builder into applications, empowering clients to create their own pages using pre-defined React components without writing code.
---

# Visual Page Builder (Puck)

Otonom Fabrika agents must not create static, hard-coded marketing or content pages (like Home, About Us, or promotional pages) if the client requires frequent content updates. Constantly requiring a developer (or an AI agent) to change a button or add a new promotional block is highly inefficient.

Instead, agents must build a Visual CMS (Content Management System) using Puck.

## The Tooling: measuredco/puck

Puck is an open-source visual editor for React. It allows developers to configure custom React components and exposes them to a drag-and-drop interface.

## Implementation Protocol (For Frontend Agents)

1. **Component Engineering:**
   - Write standard, high-quality React components (e.g., `HeroBanner`, `PricingTable`, `TrackingWidget`). Include any necessary GSAP or Framer Motion animations within them.
2. **Puck Configuration:**
   - Define a Puck `config` object. Map the React components to Puck fields (e.g., mapping a `title` prop to a Text input, or an `image` prop to a File upload).
3. **Admin Integration:**
   - Create a hidden `/admin/builder` route in the Next.js/React application.
   - Render the `<Puck>` editor component on this route, passing the `config`.
4. **Data Persistence & Rendering:**
   - When the user (client) finishes dragging and dropping components and clicks "Publish", Puck outputs a JSON object representing the page structure.
   - Save this JSON object to the database (e.g., PostgreSQL / AppFlowy backend).
   - On the public-facing pages, fetch the JSON data and use `<Render config={config} data={data} />` to display the client's custom page.

**CRITICAL RULE:** Empower the client. Give them a Webflow-like experience baked right into their own application using our premium components.
