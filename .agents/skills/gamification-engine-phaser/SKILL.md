---
name: Gamification and Interactive Simulation (Phaser.js)
description: A design and frontend capability allowing agents to build highly engaging, game-like 2D interfaces and interactive simulations using the Phaser.js HTML5 framework.
---

# Gamification and Interactive Simulation (Phaser)

Otonom Fabrika agents must prioritize User Retention by integrating Gamification into standard business applications. Boring data tables and static maps should be upgraded to interactive, game-like experiences.

## The Tooling: phaserjs/phaser

Phaser is a fast, free, and fun open source HTML5 2D game framework. It allows for canvas and WebGL rendering directly inside modern web applications (React/Next.js).

## Implementation Protocol (For Design & Frontend Agents)

1. **Interactive Data Visualization:**
   - Instead of standard Maps (Google Maps) for tracking logistics/delivery vehicles, consider using Phaser to render a 2D isometric grid or top-down simulation.
   - Bind real-time WebSocket data (e.g., from YOLO cameras or GPS trackers) to Phaser Sprite coordinates to show smooth, interpolated vehicle movement.
2. **Gamified User Journeys:**
   - For user-facing apps (like Courier or Driver apps), implement "Mini-Games" that users can play while waiting in queues or for orders.
   - Use Phaser to create high-impact, interactive reward animations (e.g., unlocking a milestone badge with particle physics) that standard CSS or Lottie cannot handle.
3. **Integration with React:**
   - Embed Phaser instances within React components. Ensure that the Phaser Game instance is properly destroyed when the React component unmounts to prevent memory leaks.
   - Use `phaser` npm package and follow modern ES6+ import structures.

**CRITICAL RULE:** Do not build a boring enterprise application when you can build an engaging simulation. If the data represents physical movement or user achievement, gamify it using Phaser.
