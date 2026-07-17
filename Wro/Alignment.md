# 🏛️ The 4-Pillar Engineering Framework (Dance Robot Alignment)

As an elite AI system engineering workflow, all code written for this repository must align strictly with these four core development rules to avoid code bloat and token degradation.

---

## 1. 🔄 Pillar 1: Feedback Loops (Test-Driven & Hardened)
- **No Blind Inferences:** Model outputs must be continuously checked at the logit layer to find specific target numbers for performance confirmation.
- **Shape Invariance:** Every function mapping coordinate arrays must include protective shape-enforcement checks (e.g., confirming sequence arrays equal exactly `(240, 34)`) before interacting with PyTorch tensors.

## 2. 🏰 Pillar 2: Clean Architecture (Deep Context Files)
- **Consolidated Integrity:** Keep execution components deeply integrated. Training loops stay self-contained inside `get.py`; hardware inference, tracking overlays, and anomaly filters live as a unified block inside `fet.py`.
- **Clean API Interfaces:** Avoid splitting small utilities across dozens of scattered files. Deeper context per file ensures the Raspberry Pi environment can compile everything easily without confusing circular path imports.

## 3. 🧠 Pillar 3: Context & Workflow Management
- **Smart Zone Focus:** Code submissions must remain highly concise, targeting specific error lines or structural enhancements without dumping hundreds of redundant lines.
- **Token Control:** Keep the operational session focused purely on the current task. Clear out legacy, out-of-scope discussion modules (such as unrelated algorithmic trading text) to protect token availability.

## 4. 🚀 Pillar 4: Continuous Quality Assurance (QA)
- **Failure Anticipation:** The script cannot crash during a live competition run if a person steps out of the camera view. Fallbacks must instantly replace missing structures with zeroed vectors (`np.zeros`) to protect application uptime.
- **Mathematical Safety:** Loss calculations must enforce strict numeric stability constraints (`BCEWithLogitsLoss`) to completely eliminate runtime `NaN` overflows or unexpected CUDA core assertions.

---

## 🚀 PHASE 1: ALIGNMENT COMPLETE
The documentation parameters match the exact target engineering limits of the edge robot. Whenever you are ready to expand the project functionality, add multi-class labels, or modify the live webcam layer, declare **"GOOD TO GO"** and we will execute!