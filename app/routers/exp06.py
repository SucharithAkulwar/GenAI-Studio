from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json

from app.services.model_manager import ModelManager
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp06", tags=["Exp 06 - DCGAN"])

EXP_INFO = {
    "id": 6,
    "title": "Implementation of GANs (DCGAN) on CelebA Dataset",
    "aim": "Implement a Deep Convolutional GAN on the CelebA dataset.",
    "tags": ["DCGAN", "CelebA", "Adversarial Training", "Conv2DTranspose", "BatchNormalization"],
    "pipeline": [
        "1. Prior Sampling: Sample latent vector z from standard Gaussian N(0, I)",
        "2. Generator Synthesis: Project and upsample latent code through transposed convolutions & BatchNorm",
        "3. Discriminator Evaluation: Strided convolutions classify synthetic vs real CelebA faces",
        "4. Minimax Adversarial Optimization: Binary cross entropy loss updates G and D alternately",
        "5. Progression Tracking: Review epoch-by-epoch loss convergence and synthesized face grids"
    ],
    "code_snippet": '''from tensorflow.keras import layers, models

# 1. Generator Model
def make_generator_model():
    model = models.Sequential([
        layers.Dense(8*8*256, use_bias=False, input_shape=(100,)),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        layers.Reshape((8, 8, 256)),
        layers.Conv2DTranspose(128, 5, strides=2, padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        layers.Conv2DTranspose(64, 5, strides=2, padding='same', use_bias=False),
        layers.BatchNormalization(),
        layers.LeakyReLU(0.2),
        layers.Conv2DTranspose(3, 5, strides=2, padding='same', activation='tanh')
    ])
    return model'''
}

class FaceGenRequest(BaseModel):
    seed: int = 42
    num_faces: int = 4

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("6", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.post("/generate-faces")
def generate_faces(req: FaceGenRequest):
    return ModelManager.generate_dcgan(seed=req.seed, num_faces=req.num_faces)

@router.get("/training-progression")
def get_progression():
    return ModelManager.get_dcgan_progression()
