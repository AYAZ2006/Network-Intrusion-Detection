import pandas as pd
import numpy as np
import joblib
import os
from django.conf import settings

MODEL_DIR = os.path.join(settings.BASE_DIR, "accounts", "ML_MODELS")

rf_binary = None
rf_parent = None
rf_detailed = None
feature_list = None


def load_models():
    global rf_binary, rf_parent, rf_detailed, feature_list

    if rf_binary is None:

        rf_binary = joblib.load(os.path.join(MODEL_DIR, "rf_binary.pkl"))
        rf_parent = joblib.load(os.path.join(MODEL_DIR, "rf_parent.pkl"))

        rf_detailed = {
            "Botnet": joblib.load(os.path.join(MODEL_DIR, "rf_detailed_Botnet.pkl")),
            "DoS": joblib.load(os.path.join(MODEL_DIR, "rf_detailed_DoS.pkl")),
            "DDoS": joblib.load(os.path.join(MODEL_DIR, "rf_detailed_DDoS.pkl")),
            "BruteForce": joblib.load(os.path.join(MODEL_DIR, "rf_detailed_BruteForce.pkl")),
            "Infiltration": joblib.load(os.path.join(MODEL_DIR, "rf_detailed_Infiltration.pkl")),
        }

        feature_list = joblib.load(os.path.join(MODEL_DIR, "feature_list.pkl"))


DROP_COLS = [
    "Label",
    "detailed_label",
    "parent_label",
    "Src IP",
    "Dst IP",
    "Timestamp"
]


def predict_csv(csv_path):

    load_models()   # <-- models load here safely

    df = pd.read_csv(csv_path)

    X = df.drop(columns=[c for c in DROP_COLS if c in df.columns], errors="ignore")

    X = X.replace([np.inf, -np.inf], np.nan).fillna(0)

    for col in feature_list:
        if col not in X.columns:
            X[col] = 0

    X = X[feature_list]

    X = X.astype("float64").clip(-1e9, 1e9)

    predictions = []

    for i in range(len(X)):

        row = X.iloc[[i]]

        binary = rf_binary.predict(row)[0]

        if binary == 0:
            predictions.append("Benign")
            continue

        parent = rf_parent.predict(row)[0]

        detailed = rf_detailed[parent].predict(row)[0]

        predictions.append(detailed)

    df["prediction"] = predictions

    return df