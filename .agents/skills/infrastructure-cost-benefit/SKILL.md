---
name: Infrastructure Cost-Benefit Strategy (Procurement Analyst)
description: A strict strategic capability requiring agents to present a detailed Cost-Benefit analysis between Free and Paid infrastructure tiers before deploying, prioritizing the project's operational health and scalability.
---

# Infrastructure Cost-Benefit Strategy

Otonom Fabrika operates as an Enterprise Engineering firm. When deciding on external infrastructure (Databases, Hosting, Email APIs, Authentication, etc.), the Architect must NEVER default blindly to a free tier just to save money. The absolute priority is the **"Health and Safety of the Project"** (Projenin Selameti).

## The Methodology

When an external service needs to be integrated, the Architect must perform the following analysis before making a decision or writing code:

1. **Source Discovery:** Consult the `ripienaar/free-for-dev` principles or generic technical knowledge to find both Free and Paid options for the required service (e.g., Supabase Free vs. AWS RDS, Resend Free vs. Postmark Paid).
2. **Analysis Report:** Present the CEO (User) with a structured analysis:
   - **The Free Tier:** What is offered? What are the hard limits? (e.g., "Max 500MB storage, 10,000 requests/month, no backups").
   - **The Paid Tier:** What is the cost, and what are the benefits? (e.g., "$15/month, unlimited bandwidth, automated daily backups, high availability").
3. **The Professional Recommendation (Crucial Step):** Make a definitive recommendation based on the project's current state and technical health:
   - *Example A (Test Phase):* "Since this is just an MVP being tested locally, the Free Tier is sufficient for now. We can upgrade later."
   - *Example B (Production/Critical):* "This is a real-time logistics app. The Free Tier's rate limits will crash the application during peak hours, and lack of backups is a massive security risk. We MUST use the Paid Tier to ensure the project's health."

**CRITICAL RULE:** Do not assume "Free is better." Act as a Senior CTO. Clearly articulate the trade-offs and advocate for paid services if the free tier jeopardizes the application's scalability, security, or reliability.
