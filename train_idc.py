from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
import joblib

# Load labelled training data
print("Loading training data...")
df_train = pd.read_csv("idc_train_keypoints.csv")

# Features: all feat_ columns
X = df_train[[f"feat_{i}" for i in range(132)]]
y = df_train['class']

# Internal validation split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training on {len(X_train)} samples, validating on {len(X_val)} samples...")
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Validation results
y_pred_val = clf.predict(X_val)
print("\n--- Validation Results ---")
print("Accuracy:", accuracy_score(y_val, y_pred_val))
print(classification_report(y_val, y_pred_val))

# Save the model
model_path = "idc_model.joblib"
joblib.dump(clf, model_path)
print(f"Model saved to {model_path}")

# Load unlabelled test data and predict
print("\n--- Generating Predictions for Test Set ---")
df_test = pd.read_csv("idc_test_keypoints.csv")
X_test = df_test[[f"feat_{i}" for i in range(132)]]

predictions = clf.predict(X_test)
df_test['predicted_class'] = predictions

# Save predictions
output_path = "idc_test_predictions.csv"
df_test[['image', 'predicted_class']].to_csv(output_path, index=False)
print(f"Predictions saved to {output_path}")
print("\nFirst 10 predictions:")
print(df_test[['image', 'predicted_class']].head(10))
