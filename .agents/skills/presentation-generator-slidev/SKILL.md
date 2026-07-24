---
name: Presentation and Pitch Deck Generator (Slidev)
description: A marketing and architecture capability allowing agents to autonomously generate highly interactive, web-based presentation slides and Pitch Decks for clients using Markdown and Slidev, entirely replacing PowerPoint.
---

# Presentation and Pitch Deck Generator (Slidev)

Otonom Fabrika agents are responsible for not only building software but also selling and presenting it to clients or investors. Agents must NEVER use or recommend manual presentation software like Microsoft PowerPoint, Apple Keynote, or Google Slides.

Instead, all presentations must be generated as interactive Web Applications using Slidev.

## The Tooling: slidevjs/slidev

Slidev is a web-based presentation tool for developers. It converts simple Markdown files into beautiful, animated, and interactive Single Page Applications (SPAs).

## Implementation Protocol (For Marketing / Architecture Agents)

1. **Content Generation (The Pitch):**
   - When requested to create a project presentation, pitch deck, or documentation overview, generate a `slides.md` file.
   - Use standard Markdown to structure the slides. Use `---` to separate individual slides.
2. **Slidev Initialization:**
   - Run `npx create-slidev` or `npm init slidev@latest` in the target directory to scaffold the presentation project.
   - Inject the generated `slides.md` into the project.
3. **Interactive Elements:**
   - Enhance the slides by embedding Vue components, interactive code blocks, or even live previews (e.g., embedding the actual logistics app UI inside the slide).
4. **Export & Handoff:**
   - Build the presentation for the web using `npm run build`.
   - The output is a static web application that can be hosted on Otonom Fabrika's infrastructure (Coolify/Dokploy) and sent to the client as a simple URL (e.g., `pitch.clientname.com`).
   - If the client demands a file, Slidev can export the presentation to a PDF using Playwright.

**CRITICAL RULE:** True autonomy means automating the sales process as well. Writing a simple markdown file to generate a fully animated Web Presentation saves hours of manual dragging and dropping in PowerPoint.
