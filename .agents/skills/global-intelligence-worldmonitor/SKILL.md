---
name: Global Intelligence Platform (WorldMonitor)
description: A commercial product deployment skill for the Architect to deploy the open-source WorldMonitor platform for clients requesting AI-powered global news, finance, and geopolitical intelligence dashboards.
---

# Global Intelligence Platform (WorldMonitor)

Otonom Fabrika operates as an Enterprise Technology Holding. When clients request a "Global Intelligence Dashboard," an "OSINT (Open Source Intelligence) Aggregator," or an "AI-powered Bloomberg Terminal," you must not build this system from scratch. You must deploy WorldMonitor.

## The Tooling: koala73/worldmonitor

WorldMonitor is a real-time global intelligence dashboard designed for situational awareness. It aggregates data from over 65 external providers covering geopolitics, finance, energy, cyber security, and military news.

## Deployment Protocol

1. **Client Request Analysis:**
   - Recognize requests for "Global News Aggregator," "Real-time Intelligence Dashboard," or "Data Aggregation Platform."
2. **Solution Pitch:**
   - Propose deploying WorldMonitor. Emphasize its 500+ curated feeds, "freshness monitor," and AI-powered aggregation capabilities.
3. **Execution Setup (DevOps & Architect):**
   - Instruct the DevOps agent to clone `koala73/worldmonitor`.
   - Deploy the infrastructure using the provided Docker configurations.
4. **API Integration (Coder):**
   - If a custom application (built by the factory) needs global news or financial data, do not integrate paid third-party APIs (like Reuters or Bloomberg API).
   - Instead, instruct the Coder to utilize the local WorldMonitor REST API (193 operations) or official SDKs (npm, PyPI, Go) to pull the required intelligence data into the custom app.

**CRITICAL RULE:** WorldMonitor is the official OSINT and Intelligence platform of Otonom Fabrika. Deploy it as a standalone Enterprise product, and use its API as the sole source of truth for global news in custom apps.
