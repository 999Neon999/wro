# 🤖 WRO Real-Time Dance Evaluator (Project Specification)

## 📌 Project Overview
An edge-computing AI system running on a Raspberry Pi 5 designed to evaluate, differentiate, and classify complex human dance choreography in real-time. The system processes video streams (via webcam or local input files), tracks skeleton layouts using MediaPipe, and filters motion signatures through a sequence-regularized PyTorch LSTM model to output joint angles to a physical PWM-driven robotic chassis.

---

## 🏗️ Core Engineering Architecture

### 1. Data Capture & Extraction Pipeline (MediaPipe Pose)
- **Framerate Handling:** Dynamic capture via OpenCV (`cv2.VideoCapture`).
- **Feature Extraction:** Standardizes pose landmarks down to the first **17 critical joints** (Head landmarks, shoulders, elbows, wrists, hips, knees, ankles).
- **Coordinate Dimensions:** Each frame creates a flat array of 34 spatial float variables ($17 \text{ joints} \times 2 \text{ coordinates } [x, y]$).
- **Data Hardening:** Integrated continuous cleansing layer (`np.nan_to_num`) that converts dropped tracking points, camera artifacts, or invalid entries (`NaN` or `inf`) safely to `0.0` to preserve mathematical sequence stability.

### 2. Sequence Deep Learning Layer (PyTorch LSTM)
- **Input Dimension:** 34 features per frame.
- **Hidden Layer Geometry:** 64 units across 2 recurrent layers.
- **Sequence Horizon:** Fixed rolling window of **240 consecutive frames** (Shape: `(1, 240, 34)`).
- **Temporal Normalization:** Slices longer clips and zero-pads shorter windows along the vertical time-axis.
- **Regularization:** Built with heavy structural Dropout (0.5) and gradient clipping (`max_norm=1.0`) to suppress coordinate noise.

### 3. Actuation & Low-Level Driver Infrastructure
- **Hardware Controller:** PCA9685 16-Channel 12-bit PWM I2C Bus Driver (plus direct Pi GPIO PWM for the 17th joint).
- **Communication Protocol:** Inter-Integrated Circuit (I2C) operating via hardware pins 3 (SDA) and 5 (SCL).
- **Kinematic Handshake:** Converts ML-calculated angular position vectors directly into microsecond pulse-widths ($500\,\mu\text{s} - 2500\,\mu\text{s}$ or equivalent duty cycles) mapping to $0^\circ - 180^\circ$ of physical servo rotation.

---

## 🛠️ Deployment Targets
- **Initial Prototyping:** Raspberry Pi OS Lite (Official environment, stable ARM dependencies, straightforward Python wheels initialization).
- **Final Robot Production:** DietPi (Ultra-stripped RAM consumption, zero background process overhead, protection loops writing logs directly to RAM to save SD card lifecycle).