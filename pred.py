from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
import joblib

# Updated to use the generated pose_keypoints.csv
CSV_PATH = "pose_keypoints.csv"

if not pd.io.common.file_exists(CSV_PATH):
    print(f"Error: {CSV_PATH} not found. Run test.py first!")
    exit(1)

df = pd.read_csv(CSV_PATH)

# Features: all feat_ columns
X = df[[f"feat_{i}" for i in range(132)]]
y = df['class']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save the model
model_path = "pose_classifier_idc.joblib"
joblib.dump(clf, model_path)
print(f"Model saved to {model_path}")