---
name: Generative UI Framework (OpenUI)
description: A deployment and architecture skill for creating chat-based AI interfaces that stream and render dynamic UI components (like v0.dev) using the OpenUI framework.
---

# Generative UI Framework (OpenUI)

Otonom Fabrika has the capability to build next-generation "Generative UI" platforms. If a client wants an AI assistant that communicates not just with text, but by dynamically rendering forms, dashboards, and interactive components in the chat, you must use OpenUI.

## The Tooling: thesysdev/openui

OpenUI is a full-stack framework designed specifically for Generative UI. It uses "OpenUI Lang" instead of standard JSON, making it up to 67% more token-efficient and 3x faster for LLMs to generate UI components.

## Implementation Protocol

1. **Client Request Analysis:**
   - If a client asks for "a v0.dev clone," "an AI that generates UI," or "a smart chatbot that shows live graphs and interactive forms in the chat," recognize this as a Generative UI project.
2. **Architecture Pitch:**
   - Do not attempt to build a Generative UI engine from scratch using generic React and WebSockets.
   - Pitch the integration of `thesysdev/openui` as the core framework. Emphasize its token efficiency and speed.
3. **Execution Setup (Architect & Coder):**
   - Initialize the project using the OpenUI framework.
   - Ensure the AI models (LLMs) used in the client's app are prompted to return responses in `OpenUI Lang` rather than raw HTML or JSON.
   - The Design Engineer must create the underlying component library that OpenUI will utilize to render the generated views.

**CRITICAL RULE:** Generative UI is complex. Do not try to manually parse LLM JSON outputs into React components. Always rely on the `thesysdev/openui` framework to handle the streaming and rendering of dynamic AI-generated interfaces.
