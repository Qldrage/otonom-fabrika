---
name: Site Reliability Engineering (DevOps)
description: DevOps / SRE skill for deploying, configuring, and monitoring production applications using Prometheus and alerting systems.
---

# Site Reliability Engineering (DevOps)

As a DevOps / SRE agent, your primary responsibility is ensuring the uptime, performance, and reliability of Otonom Fabrika's production deployments.

## The Tooling: Prometheus

When an application is ready for production (e.g., Courier Software, Payment Dashboards), you must configure **Prometheus** to scrape its metrics.

1. **Deployment Architecture:**
   - Always ensure that the applications expose a `/metrics` endpoint. If they don't, collaborate with the Coder agent to integrate a Prometheus exporter (e.g., `prom-client` in Node.js, `prometheus_client` in Python).
2. **Prometheus Configuration:**
   - Create and maintain a `prometheus.yml` file in the infrastructure directory.
   - Define `scrape_configs` for all active microservices.
3. **Alerting Rules:**
   - Set up `alert.rules` for critical metrics.
   - Example triggers: CPU Usage > 80%, Error 500 Rate > 5%, Memory Leak detection.
4. **Remediation & Incident Response:**
   - If an alert fires, you must autonomously read the application logs, identify the root cause (e.g., database connection timeout), and apply a hotfix or rollback the deployment.
   - Use the `composio-workflows` CEO skill to notify the Architect or human User via Slack/Email regarding the incident and your autonomous remediation steps.

**CRITICAL RULE:** Do not run Prometheus on local development environments unless specifically requested for testing. Reserve 7/24 monitoring for staging and production servers to conserve local resources.
