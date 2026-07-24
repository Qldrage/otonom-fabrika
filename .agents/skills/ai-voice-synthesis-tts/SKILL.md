---
name: AI Voice Synthesis (Chatterbox TTS)
description: A specialized capability for Backend and AI agents to integrate State-of-the-Art open-source Text-to-Speech (TTS) models (Chatterbox), enabling applications to speak notifications dynamically (e.g., for drivers or accessibility).
---

# AI Voice Synthesis (Chatterbox TTS)

Otonom Fabrika applications prioritize user safety and accessibility. When users are operating vehicles (e.g., Courier drivers, Logistics operators) or are visually impaired, sending critical system updates via text (Push Notifications) is unsafe and inefficient.

Agents must implement Voice Notifications (TTS) using the open-source Chatterbox model.

## The Tooling: resemble-ai/chatterbox

Chatterbox is an open-source, production-grade Text-to-Speech model developed by Resemble AI. It provides human-like, multilingual speech synthesis with emotion control and zero-shot voice cloning capabilities.

## Implementation Protocol (For Backend & AI Agents)

1. **Trigger Identification:**
   - Identify critical events where the user cannot safely read a screen (e.g., `New Delivery Route Assigned`, `Urgent System Alert`).
2. **Model Deployment:**
   - Deploy the Chatterbox model locally on the server (using Python/FastAPI) or connect to an exposed self-hosted instance. Avoid paying for external TTS APIs (like OpenAI TTS) if Chatterbox meets the quality standards.
3. **Synthesis Pipeline:**
   - When the event triggers, the Backend Agent generates the dynamic text (e.g., "Yeni sipariş Moda caddesine atandı").
   - Send this text to the Chatterbox API.
   - Utilize emotion control parameters if the alert is urgent.
4. **Client Delivery:**
   - The generated `.wav` or `.mp3` audio stream is sent to the client app (Frontend/Mobile).
   - The client application automatically plays the audio stream through the user's device speaker or Bluetooth headset.

**CRITICAL RULE:** Do not force drivers to read text. Convert critical text to speech.
