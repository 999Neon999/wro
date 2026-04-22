import cv2
import mediapipe as mp
import os
import json
import pandas as pd
from pathlib import Path
import numpy as np

def extract_keypoints(dataset_dir, output_csv, is_labelled=True):
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(static_image_mode=True, model_complexity=2)
    
    dataset_path = Path(dataset_dir)
    data_rows = []

    if is_labelled:
        # Train set structure: class_folder/*.jpg
        for class_folder in dataset_path.iterdir():
            if not class_folder.is_dir():
                continue
            class_name = class_folder.name

            print(f"Processing class: {class_name}")

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

                    flat_landmarks = np.array(landmarks).flatten().tolist()

                    data_rows.append({
                        "image": img_path.name,
                        "class": class_name,
                        **{f"feat_{i}": v for i, v in enumerate(flat_landmarks)}
                    })
    else:
        # Test set structure: *.jpg or *.png
        print(f"Processing unlabelled test set in: {dataset_dir}")
        for img_path in dataset_path.glob("*.[jp][pn][g]"):
            image = cv2.imread(str(img_path))
            if image is None:
                continue

            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = pose.process(image_rgb)

            if results.pose_landmarks:
                landmarks = []
                for lm in results.pose_landmarks.landmark:
                    landmarks.extend([lm.x, lm.y, lm.z, lm.visibility])

                flat_landmarks = np.array(landmarks).flatten().tolist()

                data_rows.append({
                    "image": img_path.name,
                    **{f"feat_{i}": v for i, v in enumerate(flat_landmarks)}
                })

    # Save to CSV
    df = pd.DataFrame(data_rows)
    df.to_csv(output_csv, index=False)
    print(f"\nSaved {len(df)} pose records to {output_csv}")
    if is_labelled and not df.empty:
        print(df['class'].value_counts())

if __name__ == "__main__":
    TRAIN_DIR = "Datasets/idc/train"
    TEST_DIR = "Datasets/idc/test"
    
    print("--- Extracting Train Features ---")
    extract_keypoints(TRAIN_DIR, "idc_train_keypoints.csv", is_labelled=True)
    
    print("\n--- Extracting Test Features ---")
    extract_keypoints(TEST_DIR, "idc_test_keypoints.csv", is_labelled=False)
