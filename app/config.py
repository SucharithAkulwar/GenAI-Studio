import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

DEVICE = os.getenv("DEVICE", "auto").lower()
HF_TOKEN = os.getenv("HF_TOKEN", "")
REMOTE_API_URL = os.getenv("REMOTE_API_URL", "").rstrip("/")
MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", 26214400)) # 25MB limit

MODELS_DIR = BASE_DIR / "models"
OUTPUTS_DIR = BASE_DIR / "outputs"
CONFIG_DIR = BASE_DIR / "config"
NOTEBOOKS_FILE = CONFIG_DIR / "notebooks.json"

MODELS_DIR.mkdir(parents=True, exist_ok=True)
OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)
CONFIG_DIR.mkdir(parents=True, exist_ok=True)

def detect_device() -> str:
    if DEVICE in ["cuda", "cpu"]:
        return DEVICE
    try:
        import torch
        if torch.cuda.is_available():
            return "cuda"
    except Exception:
        pass
    try:
        import tensorflow as tf
        if len(tf.config.list_physical_devices('GPU')) > 0:
            return "cuda"
    except Exception:
        pass
    return "cpu"

RESOLVED_DEVICE = detect_device()
