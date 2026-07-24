---
name: Self-Hosted Deployment (Dokploy)
description: A DevOps / SRE skill for deploying the open-source Dokploy PaaS onto a raw VPS, transforming it into a self-hosted alternative to Vercel/Heroku for autonomous, scalable deployments.
---

# Self-Hosted Deployment (Dokploy)

Otonom Fabrika operates as an Enterprise Engineering firm with a strict Cost-Benefit policy. We avoid vendor lock-in and excessive cloud bandwidth bills by deploying applications to our own infrastructure whenever possible.

## The Tooling: Dokploy/dokploy

Dokploy is a free, self-hostable Platform as a Service (PaaS). It provides a Vercel-like dashboard to easily deploy Web Apps (Node, Next.js, React), Docker Containers, and Databases (Postgres, MySQL, Redis, MongoDB) on a raw Linux VPS.

## Implementation Protocol (For DevOps / SRE Agents)

1. **Evaluate Deployment Target:**
   - When a project is ready for production (e.g., The Logistics App), check if the cost of managed services (Vercel, Heroku, AWS Amplify) exceeds the budget.
2. **Provision the PaaS:**
   - If self-hosting is chosen, ask the Architect/User to provide a raw, empty Linux VPS (Ubuntu/Debian) with SSH access.
   - Run the official Dokploy installation script to transform the empty server into a fully-fledged PaaS.
   - `curl -sSL https://dokploy.com/install.sh | sh`
3. **App & Database Orchestration:**
   - Instead of manually writing complex `docker-compose.yml` or Nginx configs on the VPS, use the newly installed Dokploy API/Dashboard to spin up the required PostgreSQL databases, Redis instances, and the main application containers.
   - Configure automatic SSL (Let's Encrypt) and Git push-to-deploy workflows via Dokploy.

**CRITICAL RULE:** Dokploy gives the Fabrika full "Platform Independence." Treat it as the default deployment engine for multi-container enterprise applications to minimize the user's monthly operational costs.
