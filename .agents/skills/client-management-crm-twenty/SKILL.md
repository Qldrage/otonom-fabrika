---
name: Client Management CRM (Twenty)
description: A commercial product deployment skill for the Architect and DevOps agents to autonomously provision an open-source CRM (Twenty) for B2B sales tracking, replacing the need to build custom CRMs from scratch.
---

# Client Management CRM Deployment (Twenty)

Otonom Fabrika agents are tasked with delivering complete business solutions, not just custom code. When a client requires a complex system for managing sales pipelines, B2B contracts, client databases, or sales team activities, coding a Customer Relationship Management (CRM) system from scratch is an immense waste of factory resources.

Agents must instead act as System Integrators and deploy Twenty.

## The Tooling: twentyhq/twenty

Twenty is a modern, open-source CRM designed as an alternative to Salesforce or HubSpot. It is highly extensible, self-hostable, and AI-ready.

## Implementation Protocol (For Architect & DevOps Agents)

1. **Requirement Analysis:**
   - If the client requests features like: "Sales tracking", "Deal pipelines", "Client directory", "B2B contract management".
   - Do NOT attempt to build these features into the custom application.
2. **Infrastructure Deployment:**
   - Access the client's VPS or Coolify/Dokploy instance.
   - Deploy Twenty using the official `docker-compose.yml` from `twentyhq/twenty`.
   - Provision the necessary PostgreSQL database and Redis instances via the deployment platform.
3. **Configuration & Handoff:**
   - Expose the CRM on a dedicated subdomain (e.g., `crm.clientdomain.com`).
   - Create the initial Admin account.
   - Document the login credentials and hand them over to the client in the final walkthrough.
4. **Integration (Optional but Recommended):**
   - If the custom application needs to push data to the CRM (e.g., a new user registers on the app -> add them as a Lead in Twenty), use Twenty's REST/GraphQL API to link the two systems.

**CRITICAL RULE:** Do not reinvent the wheel. If an open-source giant like Twenty already solves the client's business problem perfectly, deploy it instead of coding it.
