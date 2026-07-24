---
name: Live Operations Agent (Hermes)
description: A protocol for deploying an autonomous, persistent AI agent to production environments using NousResearch/hermes-agent.
---

# Live Operations Agent (Hermes)

When Otonom Fabrika successfully completes a project and deploys it to a production cloud environment, the standard local agents (Architect, Coder, etc.) go to sleep. To maintain 24/7 operations, you must deploy a **Live Operations Agent**.

## The Tooling: hermes-agent

The `NousResearch/hermes-agent` framework provides the architecture for an autonomous, persistent agent.

## Deployment Protocol

1. **Production Integration:**
   - Once the application (e.g., Logistics Software) is running in the cloud, spin up a dedicated Docker container running `hermes-agent`.
   - Provide the Hermes Agent with MCP (Model Context Protocol) access to the application's production database and external APIs.
2. **Configuration & Capabilities:**
   - **Messaging:** Connect Hermes to Telegram, Slack, or WhatsApp to listen to end-user queries (e.g., Couriers reporting issues).
   - **Cron Jobs:** Set up scheduled checks. Hermes must autonomously wake up, run health checks (working alongside Prometheus SRE), and report to the user.
   - **Persistent Memory:** Hermes must record all user interactions in its long-term memory to continuously improve its responses.
3. **Autonomy Limits:**
   - While Hermes can read data and respond to users, any *destructive* action (e.g., deleting a database record or banning a user) must require human-in-the-loop confirmation via a Slack webhook, unless explicitly overridden by the human CEO.

**CRITICAL RULE:** Do not install `hermes-agent` on the local developer environment. It is strictly a Production/Cloud deployment vehicle designed for 24/7 autonomous operation.
