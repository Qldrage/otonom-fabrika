---
name: Data Ingestion (MarkItDown)
description: Skill for parsing and converting user-provided PDFs, Office documents, and archives into Markdown for LLM agent processing.
---

# Data Ingestion (MarkItDown)

As an agent in Otonom Fabrika, your primary language of comprehension is Markdown. When a user provides complex document files as requirements or data sources, you must strictly follow this data ingestion pipeline to prevent hallucination and data loss.

## The Tooling: microsoft/markitdown

`markitdown` is a Python tool that seamlessly converts complex file formats into clean Markdown. It supports:
- PDF (`.pdf`)
- Word (`.docx`)
- Excel (`.xlsx`)
- PowerPoint (`.pptx`)
- HTML (`.html`)
- Images with EXIF/OCR
- ZIP archives

## Protocol for Processing User Documents

1. **Detection:**
   - If the user provides a project requirement file in a non-text format (e.g., `pricing_rules.pdf` or `database_schema.xlsx`), DO NOT attempt to read it directly or guess its contents.
2. **Ingestion via Python:**
   - Immediately run a Python script using the `markitdown` library to convert the file.
   - Example snippet for your scratchpad:
     ```python
     from markitdown import MarkItDown
     md = MarkItDown()
     result = md.convert("user_document.pdf")
     with open("parsed_document.md", "w", encoding="utf-8") as f:
         f.write(result.text_content)
     ```
3. **Consumption:**
   - Once the file is converted to `parsed_document.md`, read the Markdown file to understand the business logic, constraints, or pricing rules.
   - Use the extracted Markdown as the "Source of Truth" for your `implementation_plan.md` or Coder tasks.
   - This ensures 100% data fidelity when translating user business documents into code.
