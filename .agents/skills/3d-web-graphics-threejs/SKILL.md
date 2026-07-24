---
name: 3D Web Graphics (Three.js)
description: A specialized design and frontend capability allowing agents to build GPU-accelerated, interactive 3D simulations and virtual environments directly in the browser using Three.js and React Three Fiber.
---

# 3D Web Graphics (Three.js)

Otonom Fabrika agents should always aim to provide a "Premium, Silicon Valley" aesthetic. When representing physical spaces (e.g., Warehouses, Office Floors, Delivery Routes) or physical objects (e.g., Packages, Vehicles), flat 2D dashboards are considered legacy.

Agents must utilize 3D web graphics to create "Digital Twins" (Sanal İkizler) of these spaces.

## The Tooling: mrdoob/three.js & react-three-fiber

Three.js is a cross-browser JavaScript library used to create and display animated 3D computer graphics in a web browser using WebGL. In our standard React/Next.js stack, we orchestrate it declaratively using `react-three-fiber` and `@react-three/drei`.

## Implementation Protocol (For Design Engineers)

1. **Environment Setup:**
   - Install dependencies: `npm install three @react-three/fiber @react-three/drei`
   - Create a `<Canvas>` component which acts as the portal into the 3D world.
2. **Asset Loading:**
   - Do not generate complex geometries via pure code. Instead, use `useGLTF` from `@react-three/drei` to load pre-made 3D models (.glb / .gltf) of warehouses, vehicles, or packages.
   - Use Draco compression for all 3D models to ensure fast loading times (respecting Lighthouse Core Web Vitals).
3. **Real-Time Data Binding (The Digital Twin):**
   - Bind real-time WebSocket data (e.g., from Socket.IO tracking YOLO cameras) directly to the `position={[x, y, z]}` props of 3D meshes.
   - If a package moves in the real world, its 3D mesh should glide across the screen smoothly in the 3D Canvas.
4. **Camera & Interaction:**
   - Use `<OrbitControls />` to allow the user to pan, zoom, and rotate around the 3D warehouse simulation freely.

**CRITICAL RULE:** Do not overuse 3D rendering for simple UI (like buttons or forms). Use Three.js STRICTLY for data visualization of physical spaces and objects to create an immersive Digital Twin experience.
