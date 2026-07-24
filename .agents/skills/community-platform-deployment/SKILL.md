---
name: Community Platform Deployment (Forem)
description: A commercial product deployment skill for the Architect to deploy the open-source Forem platform (DEV.to engine) for clients requesting a social network or forum.
---

# Community Platform Deployment (Forem)

Otonom Fabrika is a commercial Technology Holding. In addition to custom software development, we offer "Off-The-Shelf" Enterprise products. If a client requests a social network, forum, or community-driven platform, you must deploy Forem.

## The Tooling: forem/forem

Forem is the open-source software (Ruby on Rails + Preact) that powers DEV.to. It is highly scalable, feature-rich (articles, comments, tags, moderation), and designed to build robust communities.

## Deployment Protocol

1. **Client Request Analysis:**
   - If a client says "We need a forum like Reddit," "We want a platform for our users to write articles and discuss," or "Build us a community site," immediately recognize this as a Forem deployment use case.
2. **Solution Pitch:**
   - Propose deploying the open-source Forem platform rather than building a custom social network from scratch. Emphasize speed to market, robust existing features, and high scalability.
3. **Execution Setup (DevOps):**
   - Instruct the DevOps agent to clone the `forem/forem` repository.
   - Use the provided Docker configurations to spin up the infrastructure (Postgres, Redis, Rails app).
4. **Customization (Design Engineer):**
   - Instruct the Design Engineer to customize the Forem instance.
   - Replace default DEV.to logos with the client's branding.
   - Adjust the CSS variables to match the client's corporate color palette.
   - Ensure the community name and welcome messages are tailored.

**CRITICAL RULE:** Do not attempt to code a custom social network or forum from scratch unless the client explicitly refuses an off-the-shelf solution. Forem is the official, pre-approved Community Platform product of Otonom Fabrika.
