---
name: Infinite Canvas and Whiteboard (Tldraw)
description: A frontend architecture skill allowing agents to integrate an infinite canvas SDK (Tldraw) into applications, providing clients with a built-in Miro/Figma-like collaborative whiteboard for planning and drawing.
---

# Infinite Canvas and Whiteboard (Tldraw)

Otonom Fabrika applications must provide deep utility to users. When an application requires free-form planning, strategic mapping, or collaborative brainstorming (e.g., drawing delivery zones, sketching warehouse layouts), relying on external tools (Miro, Excalidraw) or simple text inputs is unacceptable.

Agents must embed a native Infinite Canvas using Tldraw.

## The Tooling: tldraw/tldraw

Tldraw is an open-source, feature-complete Infinite Canvas SDK built for React. It provides a highly optimized whiteboard engine with drawing tools, shapes, text, and sticky notes out of the box.

## Implementation Protocol (For Frontend Agents)

1. **Feature Identification:**
   - If the client's business logic requires visual planning (e.g., "We need to map out where the delivery trucks park"), provision a Whiteboard module.
2. **SDK Integration:**
   - Install the SDK: `npm install tldraw`
   - Render the `<Tldraw />` component within a dedicated Route or Modal in the React/Next.js application.
   - Configure the canvas container to take up `100vw` and `100vh` (or the full dimension of the parent div).
3. **Data Persistence:**
   - Implement the `onMount` or `store` sync methods to save the canvas state (JSON) to the backend database (PostgreSQL/AppFlowy).
   - Load the saved state when the user revisits the page, ensuring their drawings and notes persist.
4. **Collaboration (Optional but Recommended):**
   - If requested, integrate `tldraw-sync` with Socket.IO or Cloudflare Workers to allow multiple users (e.g., the logistics manager and the warehouse supervisor) to draw on the same canvas simultaneously.

**CRITICAL RULE:** Do not force users to leave your application to draw a sketch. Bring the whiteboard to them.
