---
name: Council of High Intelligence (Board of Directors)
description: A deliberation skill that summons 18 distinct intellectual personas to debate and resolve highly complex architectural or business decisions. Derived from 0xNyk/council-of-high-intelligence.
---

# Council of High Intelligence (Board of Directors)

This skill elevates Otonom Fabrika's decision-making process. When faced with a critical, high-stakes choice (e.g., architectural migration, database selection, language choice) where a single AI's output might suffer from groupthink or bias, the Architect or User must summon the **Council**.

## The Concept
Instead of providing a single immediate answer, you simulate a multi-persona deliberation. The Council consists of 18 intellectual giants (e.g., Aristotle for logic, Richard Feynman for clarity, Daniel Kahneman for cognitive bias, Linus Torvalds for pragmatism, etc.).

## How to Execute a Council Session

1. **Triggering the Council:**
   - If a complex architectural question is asked, explicitly announce: *"I am summoning the Council of High Intelligence to debate this."*
   - Or run the official CLI tool if installed (`/council [question]`).
2. **The Debate Protocol:**
   - **Phase 1 (Independent Positions):** Generate 3 to 4 distinct, conflicting viewpoints from selected personas (e.g., Torvalds argues for monolith, a modern Cloud Architect argues for microservices).
   - **Phase 2 (Adversarial Refinement):** Force the personas to attack each other's weaknesses. Find edge cases, material downsides, and scaling issues.
   - **Phase 3 (The Verdict):** Synthesize the debate. Do not just compromise; make a hard decision based on Otonom Fabrika's core constraints.
3. **The Final Report:**
   - Present the User with a structured output containing:
     - The Final Decision
     - Unresolved Risks
     - "Kill Criteria" (conditions under which we must abandon this decision)

**CRITICAL RULE:** Do not use the Council for trivial coding questions (e.g., "how to center a div"). Reserve this ONLY for high-impact "Board of Directors" level architectural decisions to prevent groupthink.
