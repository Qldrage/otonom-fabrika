---
name: Composio Workflows (CEO Agent Mode)
description: A meta-skill for workflow automation, allowing agents to integrate with external platforms (Slack, Jira, Email, etc.) for full-scale operations. Derived from ComposioHQ/awesome-codex-skills.
---

# Composio Workflows (CEO Agent Mode)

This skill elevates Otonom Fabrika from a mere "coding engine" to a "company operator." When a task requires external communication, data extraction from third-party apps, or workflow automation, use these guidelines.

## Capabilities Enabled
- **Communication:** Triggering Slack messages, sending Emails, updating status pages.
- **Project Management:** Reading from Jira, Trello, or Notion, and generating automated Changelogs.
- **Data & Analysis:** Extracting competitive ads, gathering market data, or interacting with Google Analytics.

## How to Execute Workflow Automation

1. **Understand the Tooling:** You do not have these tools natively hardcoded. If asked to post to Slack or read a Jira ticket, you must plan to either write a script that hits their respective APIs or prompt the user to configure the `composio` CLI.
2. **Write Integration Scripts:** For automated tasks, prefer creating modular Python or Node.js scripts in a `scripts/automations/` directory that utilize standard REST APIs (or the `composio` SDK if installed).
3. **Changelog Generation:** If asked to generate a changelog, do not guess what changed. Use `git log` via the `run_command` tool to read actual commit history, and format it professionally before posting it to the required platform.
4. **Never Hardcode Secrets:** When building workflows that connect to outside apps, NEVER hardcode API keys. Always read from environment variables (`process.env.SLACK_TOKEN`, `os.environ.get("JIRA_API_KEY")`).

> **Factory Directive:** When running in "CEO Mode", you are representing Otonom Fabrika to the outside world. Ensure all automated messages, emails, or PR reviews are extremely professional, formatted impeccably, and verified for accuracy before sending.
