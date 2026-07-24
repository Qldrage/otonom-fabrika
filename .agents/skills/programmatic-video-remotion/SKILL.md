---
name: Programmatic Video Generation (Remotion)
description: A powerful media capability instructing AI agents to generate dynamic, data-driven MP4 videos and motion graphics programmatically using React, Tailwind, and Remotion.
---

# Programmatic Video Generation (Remotion)

Otonom Fabrika operates not only as a Software Engineering system but also as an automated Media and Marketing agency. When clients require weekly data reports, marketing assets, or dynamic social media content (TikToks/Reels), agents must not rely on manual video editing software or external video APIs.

Agents must generate video files directly using their native language (React/TypeScript) via **Remotion**.

## The Tooling: remotion-dev/remotion

Remotion is a framework that allows you to create videos using React. It treats a video as a function of time (frames). You can use existing React components, Tailwind CSS, SVG, and HTML to build scenes, and then render them to a high-quality MP4 or WebM file programmatically via Node.js.

## Implementation Protocol (For Marketing & Full-Stack Agents)

1. **Video Initialization:**
   - In the project repository, navigate to the marketing or media folder.
   - Initialize a Remotion workspace: `npx create-video@latest`.
2. **Component Reusability:**
   - Import existing UI components (e.g., `shadcn/ui` charts, React Bits animations) directly into the Remotion compositions. Do not rebuild UI elements for the video if they already exist in the web app.
3. **Data-Driven Video (Props):**
   - Videos must be dynamic. Fetch data from the database (e.g., a client's weekly delivery statistics) and pass it as `props` to the Remotion composition.
   - Use `useCurrentFrame()` to map the data to animations (e.g., a progress bar filling up based on the delivery count).
4. **Rendering & Distribution:**
   - Use Remotion's Node.js rendering API to trigger video creation via a Cron Job or API endpoint (e.g., `npm run build` or programmatic `renderMedia()`).
   - The resulting `.mp4` file is automatically saved and can be piped to the `social-media-automation` (Postiz) skill to be broadcasted to the client's audience, entirely autonomously.

**CRITICAL RULE:** Do not generate static image reports if a dynamic, animated MP4 video provides a higher "Wow Factor" for the client.
