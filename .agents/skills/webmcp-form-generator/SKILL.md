---
name: webmcp-form-generator
description: "Use when you need to generate WebMCP-compliant appointment or contact forms for local commerce (esnaf) websites. Generates declarative HTML forms with toolname and tooldescription attributes for AI agents."
---

# WebMCP Form Generator

This skill enables the generation of WebMCP-compliant forms. 

## Requirements
Forms must include specific data attributes to be fully machine-readable by external AI agents.
- Add `toolname="[tool_identifier]"` to the `<form>` element.
- Add `tooldescription="[clear_description]"` to describe what the form submission achieves.

## Imperative Execution
For complex logic, expose an `execute()` function returning a JSON-Schema API via `document.modelContext`.
