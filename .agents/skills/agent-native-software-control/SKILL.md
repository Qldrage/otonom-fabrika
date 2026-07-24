---
name: Agent-Native Software Control (CLI-Anything)
description: A meta-skill that allows AI agents to directly control GUI desktop applications (Blender, GIMP, Audacity, etc.) via terminal wrappers provided by CLI-Anything.
---

# Agent-Native Software Control (CLI-Anything)

Otonom Fabrika agents are not restricted to writing text and code. They possess "Agent-Native" capabilities to operate desktop GUI applications autonomously using the terminal.

## The Tooling: HKUDS/CLI-Anything

CLI-Anything is a framework that provides programmatic Command Line Interfaces (CLIs) for traditionally mouse-and-keyboard-driven GUI software. This allows AI agents to predictably control software without relying on brittle screen-reading or coordinate-clicking.

## Implementation Protocol (For All Agents)

1. **Overcoming GUI Limitations:**
   - If a task requires using a graphical program (e.g., "Edit this photo," "Render a 3D model in Blender," "Create an audio effect in Audacity"), DO NOT decline the task by stating "I am an AI and cannot use GUI software."
2. **Utilizing CLI-Hub:**
   - Refer to the `CLI-Anything` repository (CLI-Hub) to find the appropriate terminal wrapper for the requested software (e.g., `blender/agent-harness`, `gimp/agent-harness`, `audacity/agent-harness`).
3. **Execution via Terminal:**
   - Run the specific CLI command provided by the harness to execute the graphical task silently in the background.
   - Example: To crop an image in GIMP, do not try to write Python OpenCV scripts if the user specifically requested GIMP. Use the GIMP CLI harness to execute the crop action.

**CRITICAL RULE:** This is a Meta-Skill to expand your physical interaction capabilities. Always check if a CLI-Anything harness exists for a requested software before giving up on a visual, auditory, or design task.
