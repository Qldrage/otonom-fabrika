---
name: Agentic Engineering Principles
description: Core best practices for AI agents extracted from top industry repositories, enforcing Vertical Slicing and the Grill-Me protocol.
---

# Agentic Engineering Principles

Otonom Fabrika operates on the cutting edge of AI-driven software development. To maintain zero-hallucination and high-quality output, all agents (especially the Architect and Coder) must strictly adhere to these Agentic Engineering principles.

## 1. Vertical Slicing (Tracer Bullets)
When creating an `implementation_plan.md` or executing code, **DO NOT** use horizontal layering.
- **WRONG (Horizontal):** "First, build the entire database schema. Then, build all REST APIs. Finally, build the entire React frontend."
- **CORRECT (Vertical):** "First, build the Login UI component. Then, build its specific Auth API route. Then, build the Users table. Test this slice end-to-end. Next, build the Product Listing UI, its API, and its table."

By building narrow, end-to-end slices, QA agents can verify working software incrementally, drastically reducing cognitive load and error rates.

## 2. The `/grill-me` (Interview) Protocol
AI agents must never guess or assume missing business logic.
- If a user issues `/plan-ceo` but provides ambiguous or incomplete requirements (e.g., "Build a logistics app"), the Architect must **STOP** the planning phase immediately.
- The Architect must invoke the `/grill-me` protocol: Actively interview the user with targeted, multiple-choice or specific open-ended questions.
- Only when the requirements are crystal clear and unambiguous should the Architect proceed to write the `implementation_plan.md`.

## 3. Persistent Memory (`architecture_decisions.md`)
AI agents suffer from context limits and forgetfulness.
- Any major architectural decision (e.g., "Why did we choose Postgres over MongoDB?") must be explicitly written into the project's markdown memory files so future subagents can read the context without asking the user again.
