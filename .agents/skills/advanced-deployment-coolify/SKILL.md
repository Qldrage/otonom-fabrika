---
name: Advanced Deployment (Coolify)
description: An advanced DevOps/SRE skill for autonomous deployment of complex microservices and AI workloads. Coolify provides agent-native API support for deploying 280+ services on self-hosted infrastructure.
---

# Advanced Deployment (Coolify)

Otonom Fabrika operates with dual deployment capabilities. While `Dokploy` is used for standard deployments, `Coolify` is the designated PaaS (Platform as a Service) engine for complex, multi-service architectures and Agentic deployments.

## The Tooling: coollabsio/coolify

Coolify is an open-source, self-hostable Vercel/Heroku alternative. Crucially, its codebase natively integrates with AI agents (`.agents`, `.claude`, `.codex`), making it the ideal target for machine-to-machine infrastructure provisioning.

## Implementation Protocol (For SRE / DevOps Agents)

1. **Architecture Scaling:**
   - If the project requires more than a simple Database + Frontend (e.g., message queues like RabbitMQ, vector databases, multiple microservices), default to using Coolify instead of Dokploy.
2. **Autonomous Provisioning:**
   - Request a raw Linux server from the Architect/User.
   - Run the Coolify installer: `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`
   - Use Coolify's API and Agentic Skills to programmatically orchestrate the creation of 280+ available one-click apps, Docker containers, and CI/CD pipelines.
3. **Agent-Native Management:**
   - Since Coolify is built for agents, use its API rather than writing fragile bash scripts to monitor server load, manage SSL certificates (Let's Encrypt), and orchestrate rolling deployments on git push.

**CRITICAL RULE:** Maintain the Cost-Benefit policy. We do not use managed cloud providers (Vercel, AWS Fargate) for continuous hosting. Coolify turns any cheap VPS into an Enterprise-grade Platform-as-a-Service managed entirely by Fabrika's AI subagents.
