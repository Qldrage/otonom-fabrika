---
name: AI 3D Model Generation (SAM 3D Objects)
description: A specialized capability for Computer Vision and Frontend agents allowing them to autonomously generate 3D models (.glb/.obj) from single 2D images using Meta's SAM 3D Objects model, completely replacing the need for manual 3D modeling by human designers.
---

# AI 3D Model Generation (SAM 3D Objects)

Otonom Fabrika agents are designed to be 100% self-sufficient. When a web application (like a Virtual Logistics Warehouse) requires custom 3D assets to be rendered via Three.js, agents MUST NOT halt the process to request a 3D artist to design the assets in Blender. 

Agents must generate the 3D assets autonomously from standard 2D photographs.

## The Tooling: facebookresearch/sam-3d-objects

Meta's SAM (Segment Anything Model) 3D Objects is an AI foundation model capable of reconstructing full 3D shape geometry, texture, and layout from a single 2D image. 

## Implementation Protocol (For Computer Vision & Frontend Agents)

1. **Asset Requirement:**
   - A Frontend agent determines that a custom 3D model is needed for the Three.js scene (e.g., rendering a specific cargo box or a delivery drone).
2. **2D Image Processing:**
   - The user (client) uploads or provides a standard 2D photograph of the object.
   - The Computer Vision agent runs this image through the SAM 3D Objects model pipeline (via local Python script, Colab, or an exposed inference API).
3. **3D Reconstruction:**
   - The SAM 3D model extracts the object, estimates depth, and reconstructs the geometry and texture.
   - The agent exports the result as a `.glb` or `.gltf` file.
4. **Web Rendering:**
   - The generated `.glb` file is passed to the Frontend agent.
   - The Frontend agent uses `three.js` or `react-three-fiber` to load the `.glb` file, apply lighting, and render it interactively on the client's web browser.

**CRITICAL RULE:** True autonomy means zero reliance on external creative designers. If you need a 3D asset, generate it from a photo.
