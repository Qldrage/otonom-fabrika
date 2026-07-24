---
name: Rich Text Editor (Quill)
description: A frontend skill instructing agents to replace plain textareas with a WYSIWYG rich text editor (Quill) for long-form content inputs to enhance user experience.
---

# Rich Text Editor (Quill)

Otonom Fabrika agents must provide a premium user experience (UX) across all developed applications. When creating forms that require long-form text input (such as announcements, blog posts, documentation, or company policies), a simple HTML `<textarea>` is unacceptable.

Agents must implement a WYSIWYG (What You See Is What You Get) Rich Text Editor using Quill.

## The Tooling: quilljs/quill

Quill is a modern, open-source rich text editor. In React environments, it is typically implemented via wrapper libraries (e.g., `react-quill` or modern Quill v2 components).

## Implementation Protocol (For Frontend Agents)

1. **Detection & Usage:**
   - Identify form fields intended for formatted text.
   - Do NOT use `<textarea>`. Use Quill to provide a toolbar with Bold, Italic, Underline, Bullet Lists, Numbered Lists, Headers, and Hyperlinks.
2. **React Integration:**
   - Install dependencies: `npm install react-quill` (or the equivalent modern wrapper).
   - Configure the `modules` prop to display the necessary toolbar options.
3. **Data Handling (Important):**
   - Quill outputs data as HTML (or Delta JSON).
   - Ensure the backend (Database) accepts and stores this HTML payload safely.
   - When displaying the saved content on the frontend, use React's `dangerouslySetInnerHTML={{ __html: content }}` or a safe HTML parser library (like `dompurify`) to render the formatted text correctly.

**CRITICAL RULE:** Flat text is for passwords and emails. If a user needs to write a paragraph, give them a proper Editor.
