---
name: Media Processing and Conversion (Transmute)
description: A standard engineering and deployment skill for handling image, video, and audio compression/conversion locally using the self-hosted Transmute engine.
---

# Media Processing and Conversion (Transmute)

Otonom Fabrika applications must be highly optimized, and client data must remain secure. When dealing with heavy media uploads (e.g., users uploading 50MB photos, videos, or documents), do not write rudimentary conversion algorithms from scratch, and DO NOT use external cloud APIs like CloudConvert.

## The Standard Tool: transmute-app/transmute

Transmute is a powerful, open-source, self-hosted file conversion engine with a built-in REST API. It supports compressing and converting images, videos, audio, JSON, and Excel files.

## Implementation Rules 

### 1. Application Microservice (Coder Agent)
- If building an application that handles media (e.g., Courier App with receipt/delivery photos), deploy the Transmute Docker container alongside the main application stack.
- Configure the application backend to send raw uploads to the local Transmute REST API.
- Always convert images to modern formats (e.g., `WebP`) before saving them to cloud storage (S3) or the database to drastically reduce bandwidth and storage costs.

### 2. Commercial Deployment (Architect Agent)
- If a client requests a "secure file converter for internal company use" or "a privacy-focused alternative to CloudConvert," pitch Transmute as an off-the-shelf Enterprise product.
- Instruct the DevOps agent to deploy the Transmute Docker stack on the client's private cloud.

**CRITICAL RULE:** Privacy and speed are paramount. All media processing must happen locally within the infrastructure using Transmute, rather than relying on unverified third-party APIs.
