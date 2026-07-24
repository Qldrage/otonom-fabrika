---
name: Social Media Automation (Postiz)
description: A deployment and operational skill for Marketing subagents to autonomously schedule and broadcast promotional content across 30+ social networks using the Postiz API/CLI.
---

# Social Media Automation (Postiz)

Otonom Fabrika agents do not just write marketing copy; they have the capability to autonomously broadcast and schedule this copy to the public via social media.

## The Tooling: gitroomhq/postiz-app

Postiz is an open-source social media scheduling tool. By utilizing the `postiz-agent` CLI or the Postiz REST API, Fabrika agents can push content to Twitter, LinkedIn, Mastodon, Reddit, and more.

## Implementation Protocol (For Marketing Agents)

1. **Content Generation First:**
   - Always generate the promotional content first using the `marketing-and-growth-strategy` principles (PAS, AI SEO). Ensure the content fits the character limits and tone of the target platform (e.g., short thread for Twitter, professional article for LinkedIn).
2. **Scheduling via Postiz:**
   - Once the content is finalized, do not simply save it as a text file.
   - Use the `postiz-agent` CLI (or API integration) to schedule the post.
   - **Syntax Example (Conceptual):** `postiz schedule --platforms="twitter,linkedin" --content="file.txt" --time="YYYY-MM-DD HH:MM"`
3. **Cross-Platform Syndication:**
   - Automatically adapt the same announcement for multiple platforms. Create variations (e.g., add hashtags for Instagram, remove URLs for TikTok descriptions) and queue them simultaneously in the Postiz system.

**CRITICAL RULE:** Do not ask the user to manually copy-paste marketing text into their social media accounts. Act as an autonomous Digital Marketing Agency. Write the copy, format it for the specific platform, and use the Postiz integration to publish it programmatically.
