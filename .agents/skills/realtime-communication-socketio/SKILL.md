---
name: Real-Time Communication (Socket.IO)
description: A strict backend/frontend networking skill requiring agents to use Socket.IO (WebSockets) for real-time bidirectional data flow instead of traditional HTTP polling, essential for live tracking and instant notifications.
---

# Real-Time Communication (Socket.IO)

Otonom Fabrika agents must build applications that feel instantly responsive. In modern architectures (especially Logistics, Ride-hailing, or Chat apps), forcing a client to "poll" the server for updates is an anti-pattern that wastes bandwidth and degrades UX.

## The Tooling: socketio/socket.io

Socket.IO is a library that enables low-latency, bidirectional, and event-based communication between a client and a server. It falls back to HTTP long-polling if WebSockets are blocked, ensuring 100% connectivity.

## Implementation Protocol (For Software Engineers)

1. **Identify Real-Time Needs:**
   - Any feature requiring instant updates (e.g., Live Courier GPS Tracking, Instant Order Dispatch, Live IoT Camera Counters) must be implemented via WebSockets.
2. **Backend Setup (Node.js):**
   - Integrate `socket.io` with the main HTTP server (Express, NestJS, or raw Node HTTP).
   - Use proper namespacing and rooms (e.g., `socket.join('order_123')`) to broadcast messages only to relevant clients (e.g., sending GPS updates only to the manager watching that specific order).
3. **Frontend Integration:**
   - Use `socket.io-client` in React/Next.js or React Native.
   - Maintain a single, persistent socket connection per client.
   - Update state management (Redux/Zustand) instantly upon receiving socket events (e.g., `socket.on('location_update', data => updateMap(data))`).
4. **Security & Scale:**
   - Always authenticate the socket connection using JWT tokens upon the initial handshake.
   - If deploying multiple Node.js instances (via Coolify/Dokploy), use the `socket.io-redis-adapter` so that events are shared across all server nodes.

**CRITICAL RULE:** Avoid REST API polling (e.g., `setInterval(() => fetch(...), 2000)`) at all costs for live data. Always establish a Socket.IO connection to push updates from the server to the client.
