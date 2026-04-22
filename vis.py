# visualize_poses_2d_safe.py
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import random
from pathlib import Path

CSV_PATH = "pose_keypoints.csv"
OUTPUT_DIR = Path("pose_visualizations_2d")
OUTPUT_DIR.mkdir(exist_ok=True)

# MediaPipe pose connections
POSE_CONNECTIONS = [
    (0,1), (1,2), (2,3), (3,7), (0,4), (4,5), (5,6), (6,8),
    (9,10),
    (11,13), (13,15), (15,17), (15,19), (15,21), (17,19),
    (12,14), (14,16), (16,18), (16,20), (16,22), (18,20),
    (11,12), (23,24), (11,23), (12,24),
    (23,25), (25,27), (27,29), (27,31),
    (24,26), (26,28), (28,30), (28,32)
]

def plot_2d_pose(row, save_path=None):
    features = row[[f"feat_{i}" for i in range(132)]].values
    xs = features[0::4]
    ys = features[1::4]
    vis = features[3::4]

    visible = vis > 0.1
    if np.sum(visible) < 5:
        print(f"Skipping {row['image']} - only {np.sum(visible)} visible keypoints")
        return

    xs_vis = xs[visible]
    ys_vis = -ys[visible]  # flip for upright human pose

    plt.figure(figsize=(6, 8))
    plt.scatter(xs_vis, ys_vis, c='blue', s=100, label=f'Keypoints ({np.sum(visible)}/33)')

    for p1, p2 in POSE_CONNECTIONS:
        if p1 < len(vis) and p2 < len(vis):
            if vis[p1] > 0.1 and vis[p2] > 0.1:
                plt.plot(
                    [xs[p1], xs[p2]],
                    [-ys[p1], -ys[p2]],
                    'r-', linewidth=3
                )

    plt.title(f"{row['class']} - {row['image']}\nVisible keypoints: {np.sum(visible)}/33")
    plt.gca().invert_yaxis()  # head at top
    plt.grid(True, alpha=0.3)

    if save_path:
        plt.savefig(save_path, dpi=200, bbox_inches='tight')
        print(f"Saved 2D plot: {save_path}")
    
    plt.close()

if __name__ == "__main__":
    if not Path(CSV_PATH).exists():
        print(f"Error: {CSV_PATH} not found!")
        exit(1)

    print("Loading data...")
    df = pd.read_csv(CSV_PATH)
    print(f"Loaded {len(df)} records")
    print(df['class'].value_counts())

    # Select samples across available classes
    available_classes = df['class'].unique()
    samples = []
    for cls in available_classes:
        class_samples = df[df['class'] == cls]
        samples.append(class_samples.sample(min(2, len(class_samples))))
    
    samples_df = pd.concat(samples)

    for idx, row in samples_df.iterrows():
        print(f"\nPlotting: {row['class']} - {row['image']}")
        save_path = OUTPUT_DIR / f"2d_{row['image'].replace('.jpg', '').replace('.png', '')}.png"
        plot_2d_pose(row, save_path=save_path)