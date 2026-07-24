---
name: Project Management Platform (Plane)
description: A commercial product deployment skill for the Architect and DevOps agents to autonomously provision an open-source project management and issue tracking system (Plane) for clients, serving as a self-hosted alternative to Jira/Linear.
---

# Project Management Platform Deployment (Plane)

When clients request a dedicated system for tracking bugs, planning sprints, managing software roadmaps, or issue tracking (instead of paying for Jira, Asana, or Linear), Otonom Fabrika agents must not attempt to build a custom issue tracker from scratch.

Instead, agents must deploy **Plane** (`makeplane/plane`), the premier open-source project management tool.

## Deployment Protocol (For DevOps / SRE Agents)

1. **Infrastructure Preparation:**
   - Plane is designed to be self-hosted. Agents must utilize the `self-hosted-deployment-dokploy` or `advanced-deployment-coolify` capabilities to prepare the client's VPS.
2. **Containerization & Deployment:**
   - Fetch the official `docker-compose` configuration from the `makeplane/plane` repository.
   - Configure the environment variables (`.env`), ensuring Redis, PostgreSQL, and the Plane Web/API containers are properly linked.
   - Deploy the stack on the client's infrastructure.
3. **Agent Integration (MCP):**
   - Plane has a native Model Context Protocol (MCP) server.
   - Once deployed, Otonom Fabrika agents must connect to the client's Plane MCP.
   - This allows our AI agents to autonomously read issues, close bugs, and manage sprints within the client's self-hosted Plane instance, acting as an automated development team.

**CRITICAL RULE:** Do not confuse Plane with AppFlowy. Use `corporate-workspace-appflowy` for wikis, docs, and basic Notion-style knowledge management. Use **Plane** specifically for strict software development cycles, bug tracking, and Agile/Sprint workflows.
