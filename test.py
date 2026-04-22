import cv2
import mediapipe as mp
import os
import json
import pandas as pd
from pathlib import Path
import numpy as np

mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, model_complexity=2)

# Pointing to the new IDC dataset
DATASET_DIR = Path("Datasets/idc/train")
OUTPUT_CSV = "pose_keypoints.csv"
OUTPUT_JSON_DIR = Path("keypoints_json")
OUTPUT_JSON_DIR.mkdir(exist_ok=True)

data_rows = []

if not DATASET_DIR.exists():
    print(f"Error: {DATASET_DIR} not found!")
    exit(1)

for class_folder in DATASET_DIR.iterdir():
    if not class_folder.is_dir():
        continue
    class_name = class_folder.name.replace(" Augmented", "")  # Clean name

    print(f"Processing class: {class_name}")

    # IDC train set contains .png and .jpg files
    for img_path in class_folder.glob("*.[jp][pn][g]"):
        image = cv2.imread(str(img_path))
        if image is None:
            continue

        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = pose.process(image_rgb)

        if results.pose_landmarks:
            landmarks = []
            for lm in results.pose_landmarks.landmark:
                landmarks.extend([lm.x, lm.y, lm.z, lm.visibility])

            # Flatten to 33*4 = 132 features
            flat_landmarks = np.array(landmarks).flatten().tolist()

            data_rows.append({
                "image": img_path.name,
                "class": class_name,
                **{f"feat_{i}": v for i, v in enumerate(flat_landmarks)}
            })

            # Save per-image JSON (optional)
            json_path = OUTPUT_JSON_DIR / f"{img_path.stem}.json"
            with open(json_path, "w") as f:
                json.dump({
                    "image": img_path.name,
                    "class": class_name,
                    "landmarks": flat_landmarks
                }, f, indent=2)

            print(f"  Extracted: {img_path.name}")

# Save all to CSV
df = pd.DataFrame(data_rows)
df.to_csv(OUTPUT_CSV, index=False)
print(f"\nSaved {len(df)} pose records to {OUTPUT_CSV}")
if not df.empty:
    print(df['class'].value_counts())  # Class distribution