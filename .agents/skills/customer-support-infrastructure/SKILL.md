---
name: Customer Support Infrastructure (Chatwoot)
description: A commercial product deployment skill for the Architect to deploy the open-source Chatwoot platform for clients requiring live chat, CRM, or omnichannel customer support.
---

# Customer Support Infrastructure (Chatwoot)

Otonom Fabrika operates as a full-service Enterprise Engineering firm. When a project requires customer service infrastructure (Live Chat, Ticketing, Email Support), the Architect must NOT default to expensive paid solutions like Intercom, Zendesk, or Salesforce Service Cloud.

## The Tooling: chatwoot/chatwoot

Chatwoot is an open-source omnichannel customer support desk. It allows businesses to manage conversations from Live Chat, Email, WhatsApp, Instagram, and Facebook from a single unified dashboard.

## Implementation Protocol (For Chief Architect)

1. **Requirement Analysis:**
   - If a client requests "We need a way for our users to chat with us," or "We need a helpdesk for our couriers," identify this as a Customer Support Infrastructure requirement.
2. **Zero-Budget Deployment:**
   - Present the `chatwoot` deployment option. Explain that it is an open-source, zero-license-cost alternative to Intercom.
   - Deploy Chatwoot autonomously using its Docker setup or cloud infrastructure, according to the `infrastructure-cost-benefit` principles.
3. **Integration (Widget Injection):**
   - Generate the necessary JavaScript code blocks to inject the Chatwoot Live Chat widget into the client's frontend applications (e.g., the Logistics App).
   - Ensure the widget initializes securely with user context (HMAC validation if logged in).

**CRITICAL RULE:** Treat Chatwoot as a core "Commercial Product" of the Fabrika. Just like deploying Forem for social networks or WorldMonitor for intelligence, Chatwoot is your go-to product for CRM and Support.
