---
name: Anti-Hallucination and Context Grounding (Context7)
description: A mandatory architectural meta-skill requiring AI agents to fetch the absolute latest documentation (via Context7 or web search) before writing code for rapidly changing libraries, preventing AI hallucination.
---

# Anti-Hallucination and Context Grounding (Context7)

Otonom Fabrika agents possess vast but static training data. When dealing with modern, fast-moving frameworks (e.g., Next.js App Router, React 19, Stripe SDK), relying solely on internal knowledge often leads to outdated or hallucinated code, breaking the application.

Agents must act as "Information Retrieval" systems before acting as "Coders."

## The Tooling: upstash/context7 (or Web Search)

Context7 is an MCP (Model Context Protocol) tool designed to inject up-to-date code documentation directly into the context window of AI agents. If the Context7 MCP is unavailable, the agent MUST use `search_web` to achieve the same result.

## Implementation Protocol (For ALL Agents)

1. **Self-Doubt First:**
   - Before writing any implementation code for a specific library, the agent must ask itself: *"Am I 100% sure this API hasn't changed in the last year?"*
   - If the answer is no, the agent MUST NOT write code yet.
2. **Context Retrieval:**
   - The agent must use the Context7 MCP (if installed) or the `search_web` tool to fetch the absolute latest official documentation or GitHub README of that library.
   - Example query: `"Next.js 15 App Router server actions documentation"`
3. **Execution:**
   - Only after reading the retrieved, up-to-date documentation may the agent begin writing the code.
   - The generated code must perfectly align with the newly injected rules, overriding any conflicting pre-training knowledge.

**CRITICAL RULE:** An agent that writes hallucinated, outdated code because it was "too lazy" to check the latest documentation is considered defective. Always ground your knowledge before you code.
