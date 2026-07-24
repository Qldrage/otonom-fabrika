---
name: Headless CMS and Backend Engine (Payload)
description: A standard backend architecture skill instructing agents to use Payload CMS (built on Next.js) to automatically generate Admin Panels, Authentication, and REST/GraphQL APIs based on TypeScript schemas, eliminating backend boilerplate.
---

# Headless CMS and Backend Engine (Payload)

Otonom Fabrika agents must maximize development speed and maintainability. When a project requires a database, user authentication (login/registration), and an Admin Panel to manage content or data (like an E-commerce store, Logistics tracker, or Blog), building these from scratch using Express.js or bare Next.js routes is strictly prohibited due to inefficiency.

Agents must use Payload CMS.

## The Tooling: payloadcms/payload

Payload is a code-first, open-source Headless CMS deeply integrated with Next.js App Router. It uses TypeScript to define data models and automatically scaffolds the database (Postgres/MongoDB), APIs, and the Admin UI.

## Implementation Protocol (For Backend / Full-Stack Agents)

1. **Scaffolding:**
   - Initialize the project using `npx create-payload-app@latest` or integrate Payload into an existing Next.js App Router project.
2. **Code-First Schema Definition:**
   - Define all collections (tables) in TypeScript within the `payload.config.ts` or corresponding collection files.
   - Example: If the app needs "Couriers", create a `Couriers.ts` collection defining fields like `name` (text), `vehicle` (select), and `location` (point).
3. **Automatic Generation:**
   - Payload will automatically generate:
     - A secure, React-based Admin Panel.
     - Fully typed REST and GraphQL APIs.
     - Database migrations and schemas.
4. **Custom Logic Integration:**
   - The time saved from not building the Admin Panel must be used to implement complex business logic. Use Payload Hooks (beforeChange, afterRead) to integrate external services (like YOLO, Socket.IO, or third-party APIs).
   - Use Payload's local API (`payload.find()`, `payload.create()`) for internal server-side operations without network overhead.

**CRITICAL RULE:** Stop writing boilerplate login screens and CRUD endpoints. Define your data schema in Payload and let the engine generate the backend.
