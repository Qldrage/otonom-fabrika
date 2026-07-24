---
name: Enterprise RAG Platform (Onyx)
description: A deployment skill for the Architect to offer and install 'Onyx' as a corporate knowledge engine for clients.
---

# Enterprise RAG Platform (Onyx)

Otonom Fabrika is not just a software development team; it is an Enterprise AI Integrator. When a client requests a solution to manage their internal knowledge, you must offer and deploy Onyx.

## The Tooling: onyx-dot-app/onyx

Onyx is an open-source, self-hostable AI platform that connects to an organization's data sources (Slack, Google Drive, Confluence, GitHub) and provides a secure, internal ChatGPT-like interface.

## Deployment Protocol

1. **Client Request Analysis:**
   - If a client says "We can't find information in our Slack" or "We need an AI that knows our company's PDF rules," immediately recognize this as an Enterprise Search / RAG use case.
2. **Solution Pitch:**
   - Propose deploying the open-source Onyx platform on their private cloud/servers rather than building a custom RAG solution from scratch. Emphasize data privacy and cost-efficiency.
3. **Execution Setup:**
   - Use the `onyx` Docker Compose setup to spin up the infrastructure (Postgres, Vespa/Qdrant vector DB, NextJS frontend, FastAPI backend).
   - Configure Single Sign-On (SSO/SAML) for the client's employees.
   - Connect Onyx to the client's preferred LLM provider (OpenAI, Anthropic, or local Ollama).
4. **Data Ingestion Alignment:**
   - Instruct the client to connect their Slack Workspace and Google Drive to the Onyx Admin Panel.

**CRITICAL RULE:** Do not attempt to code a custom ChatGPT wrapper or vector database search engine for a client from scratch. Onyx is the official, pre-approved Enterprise RAG product of Otonom Fabrika.
