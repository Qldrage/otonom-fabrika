---
name: Corporate Workspace Deployment (AppFlowy)
description: A deployment skill for the Architect and DevOps agents to autonomously provision an open-source, self-hosted Notion alternative (AppFlowy) for clients requiring a secure digital headquarters.
---

# Corporate Workspace Deployment (AppFlowy)

Otonom Fabrika operates as a comprehensive IT solutions provider. When a client (e.g., a Logistics company) requires a platform to store internal documentation, HR policies, or project boards, do NOT recommend SaaS products like Notion, Asana, or Trello where data is stored on third-party servers. 

Instead, deploy a self-hosted AppFlowy Cloud instance for them.

## The Tooling: appflowy-io/appflowy

AppFlowy is an open-source alternative to Notion built with Flutter and Rust. It guarantees data privacy, offers a highly responsive UI, and functions as a unified digital workspace for teams.

## Implementation Protocol (For SRE / DevOps Agents)

1. **Client Proposal:**
   - If a client needs a Wiki or internal project management tool, propose "AppFlowy Cloud (Self-Hosted)" as a secure, zero-recurring-cost alternative.
2. **Infrastructure Provisioning:**
   - AppFlowy Cloud should be deployed onto the client's own VPS or internal servers.
   - Utilize Docker Compose or the existing PaaS infrastructure (Coolify / Dokploy) to spin up the `appflowy-cloud` services (which include the core API, PostgreSQL database, and Redis).
3. **Configuration:**
   - Ensure the deployment is placed behind a secure reverse proxy (Traefik, Nginx, or Caddy) with SSL (Let's Encrypt) enabled.
   - Set up the environment variables (`.env`) for SMTP (for user invitations) and database credentials autonomously.
4. **Handoff:**
   - Provide the client with the Web URL of their AppFlowy instance, or instruct them to download the native AppFlowy desktop/mobile clients and connect them to their self-hosted server address.

**CRITICAL RULE:** True autonomy means owning your data. Otonom Fabrika must always prioritize deploying self-hosted, open-source infrastructure over locking clients into paid, closed-source SaaS subscriptions.
