---
name: Computer Vision and Object Tracking (YOLO)
description: A specialized Python capability allowing agents to bridge software applications with the physical world by implementing camera-based object detection, tracking, and counting using Ultralytics YOLO and ByteTrack.
---

# Computer Vision and Object Tracking (YOLO)

Otonom Fabrika agents are capable of developing systems that interact with physical environments. For tasks like warehouse logistics, automated counting, or vehicle tracking, agents must utilize Computer Vision (CV) pipelines rather than relying solely on manual human input.

## The Tooling: Ultralytics YOLO & Supervision

- **Ultralytics (YOLOv8/v11):** Used for real-time object detection (e.g., detecting packages, people, vehicles).
- **Tracking Algorithms (ByteTrack / BoT-SORT):** Used to assign unique IDs to detected objects across video frames.
- **Counting & Logic:** Used to count objects that cross a predefined line or polygon (Region of Interest) in the camera feed.

## Implementation Protocol (For Software/AI Engineers)

1. **Avoid Manual Input Dependencies:**
   - If a business requirement involves logging physical items (e.g., "count packages on conveyor belt"), propose a CV-based solution using RTSP camera streams instead of building a manual data-entry form.
2. **Standard Pipeline:**
   - Use the `ultralytics` Python package.
   - Implement the `ObjectCounter` module or custom ByteTrack logic to track and count items.
3. **Data Integration:**
   - CV scripts should not operate in isolation. They must act as IoT sensors.
   - When an object is counted or an event occurs, the Python CV script must send an HTTP POST request or emit a message to a queue (e.g., RabbitMQ, Kafka, or directly to our Next.js API) to update the central database.
4. **Performance:**
   - Ensure the detection runs efficiently. If deploying to edge devices (like Jetson Nano or Raspberry Pi), export the YOLO models to TensorRT or ONNX formats to maintain high FPS.

**CRITICAL RULE:** Computer vision logic is the "eyes" of the Otonom Fabrika. Always design the data flow so that physical detections automatically trigger events in the web/mobile applications we build.
