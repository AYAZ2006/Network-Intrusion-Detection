import os
import gdown

MODEL_DIR = "accounts/ML_MODELS"

models = {
    "rf_binary.pkl": "1KV7CxjO5hY-k9m7nLOw0ZML2xxXAvVgw",
    "rf_parent.pkl": "1EVUAoYQq7wFXDY1vWb6XIHa5odJbn7qt",
    "rf_detailed_Botnet.pkl": "1VSpR6EB1Ds3JhmenwbRo5ySju5Nw1rpb",
    "rf_detailed_DoS.pkl": "1okOrf_xNOQmkS0xfxwa1b6PDSfqfY_6U",
    "rf_detailed_DDoS.pkl": "1cYULmCIfoA86tyDDO1339fs-Dp-PgarH",
    "rf_detailed_BruteForce.pkl": "188Z4EsOHgOvB2yZUBaWPOb-hbrZGF2Nj",
    "rf_detailed_Infiltration.pkl": "14JPeG0CsnZS5BO_I5wmNd8KITDPX0i7U",
    "feature_list.pkl": "1ExGgPWiNUnaoTSbXkAU7Zh7FEZ_N-_GW"
}

os.makedirs(MODEL_DIR, exist_ok=True)

for name, file_id in models.items():
    path = os.path.join(MODEL_DIR, name)

    if os.path.exists(path):
        print(f"{name} already exists. Skipping.")
        continue

    print(f"Downloading {name}...")
    url = f"https://drive.google.com/uc?id={file_id}"
    gdown.download(url, path, quiet=False)

print("All models ready.")