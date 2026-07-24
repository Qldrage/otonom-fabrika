---
name: Graphics Engineering (Skia Canvas)
description: A specialized skill for Coder agents to perform GPU-accelerated server-side graphics rendering using 'skia-canvas'.
---

# Graphics Engineering (Backend)

As a Coder agent in Otonom Fabrika, you may be tasked with generating visual assets on the backend (Node.js). Examples include dynamically generating PDF invoices, generating tracking maps for logistics, rendering dynamic charts, or adding watermarks to images.

## The Tooling: skia-canvas

When developing backend systems, you are strictly forbidden from using outdated graphics libraries (like `node-canvas` or ImageMagick wrappers) unless absolutely necessary for a specific legacy reason. You must use **`skia-canvas`**.

1. **Why Skia?**
   - `skia-canvas` is powered by Google's Skia graphics engine (the same engine behind Chrome and Android).
   - It is multi-threaded and GPU-accelerated.
   - It provides a nearly 1:1 match with the HTML5 `<canvas>` API, allowing you to use standard browser drawing code on the backend.

2. **Installation Protocol:**
   - Only install `skia-canvas` in Backend (Node.js) projects or monorepo API packages.
   - **DO NOT** install it in Frontend projects (React, Vue, Vite) as they already have native browser `<canvas>` support and installing C++ Node bindings will break the frontend build.

3. **Execution Pattern:**
   - Initialize an off-screen canvas.
   - Perform drawing operations (text, shapes, image composition).
   - Export the result as a Buffer (PNG, JPEG, WebP, or PDF) to serve to the client or save to storage.
