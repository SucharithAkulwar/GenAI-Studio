from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json

from app.services.model_manager import ModelManager
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp07", tags=["Exp 07 - StyleGAN"])

EXP_INFO = {
    "id": 7,
    "title": "Implementation of StyleGANs for Generating High-Quality Images",
    "aim": "Implement a Style-based GAN for generating high-quality and diverse human face images using CelebA, and demonstrate explicit control over generation through a learned intermediate latent space: coarse-to-fine style control, style mixing between two identities, and stochastic detail variation using noise injection.",
    "tags": ["StyleGAN", "AdaIN", "Latent Space W", "Style Mixing", "Noise Injection"],
    "pipeline": [
        "1. Mapping Network: 8-layer MLP maps latent z in Z to disentangled intermediate latent w in W",
        "2. Synthesis Network: Progressive resolution generator starting from learned constant 4x4 tensor",
        "3. Adaptive Instance Normalization (AdaIN): Modulates feature channels using scale and bias from w",
        "4. Style Mixing: Injects latent w1 at coarse layers and w2 at fine layers to combine identities",
        "5. Stochastic Noise Injection: Adds per-pixel Gaussian noise to control fine stochastic details (freckles, curls)"
    ],
    "code_snippet": '''# AdaIN Formulation
def AdaIN(x, y):
    mean_x = tf.reduce_mean(x, axis=[1, 2], keepdims=True)
    std_x = tf.math.reduce_std(x, axis=[1, 2], keepdims=True)
    norm = (x - mean_x) / (std_x + 1e-8)
    # y provides scale (ys) and bias (yb) learned from latent w
    return ys * norm + yb'''
}

class StyleGenRequest(BaseModel):
    seed: int = 100

class StyleMixRequest(BaseModel):
    seed_a: int = 101
    seed_b: int = 202
    crossover_layer: int = 4

class NoiseInjectRequest(BaseModel):
    seed: int = 100
    noise_seed: int = 42

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("7", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.post("/generate")
def generate_face(req: StyleGenRequest):
    return ModelManager.generate_stylegan(seed=req.seed)

@router.post("/mix-styles")
def mix_styles(req: StyleMixRequest):
    return ModelManager.mix_stylegan(seed_a=req.seed_a, seed_b=req.seed_b, crossover=req.crossover_layer)

@router.post("/inject-noise")
def inject_noise(req: NoiseInjectRequest):
    return ModelManager.stylegan_noise_injection(seed=req.seed, noise_seed=req.noise_seed)
