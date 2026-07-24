---
name: Image Processing and Camera Control (OpenCV)
description: A specialized Python capability allowing agents to bridge software applications with the physical world by capturing video streams and performing image manipulation using OpenCV, working alongside YOLO.
---

# Image Processing and Camera Control (OpenCV)

Otonom Fabrika agents must not build Computer Vision applications without proper video stream handling. While YOLO is the brain that detects objects, OpenCV is the required "eye" and "hand" that captures the physical world and draws the results.

## The Tooling: opencv/opencv

OpenCV is an open-source computer vision library. It provides the low-level infrastructure to read RTSP streams, resize image frames (for YOLO inference), and draw bounding boxes on the original video feed.

## Implementation Protocol (For Backend / ML Agents)

1. **Stream Capture:**
   - Use `cv2.VideoCapture()` to connect to external warehouse cameras, webcams, or RTSP/HTTP video streams.
   - Read the video feed frame by frame in a `while` loop.
2. **Preprocessing for YOLO:**
   - Before sending a frame to the YOLO object detection model, use OpenCV to resize or convert color spaces (e.g., `cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)`) if required by the model.
3. **Visual Manipulation (Drawing):**
   - Once YOLO returns the bounding box coordinates `[x1, y1, x2, y2]`, use `cv2.rectangle()` to draw the box on the frame.
   - Use `cv2.putText()` to overlay labels (e.g., "Package - 98%") and count numbers dynamically on the video.
4. **Output and Streaming:**
   - The processed frame (with drawings) can be saved as an MP4 using `cv2.VideoWriter`, or encoded to base64/JPEG to be streamed to a web dashboard via Socket.IO for real-time monitoring.

**CRITICAL RULE:** YOLO cannot capture video streams on its own. Always pair the YOLO object detection skill with this OpenCV skill for end-to-end physical world integration.
