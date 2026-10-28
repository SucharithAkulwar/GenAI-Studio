from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json

from app.services.model_manager import ModelManager
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp04", tags=["Exp 04 - Diffusion Text-to-Image"])

EXP_INFO = {
    "id": 4,
    "title": "Text-to-Image Generation using a Pre-trained Diffusion Model",
    "aim": "Generate images from natural-language prompts using a pre-trained diffusion model.",
    "tags": ["Diffusers", "Stable Diffusion", "SD-Turbo", "Latent Diffusion", "Text-to-Image"],
    "pipeline": [
        "1. Conditioning: Text prompt encoded via CLIP/OpenCLIP text encoder into continuous embeddings",
        "2. Latent Initialization: Random Gaussian noise latents sampled from prior distribution",
        "3. Iterative Denoising: UNet predicts noise residual across timesteps guided by classifier-free guidance",
        "4. Autoencoder Decoding: VAE decoder maps denoised latent representation back to pixel space",
        "5. Delivery: Save generated image artifact with instant download link"
    ],
    "code_snippet": '''from diffusers import AutoPipelineForText2Image
import torch

# 1. Pipeline initialization
pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/sd-turbo",
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)
if torch.cuda.is_available():
    pipe.to("cuda")

# 2. Generation with CFG & Seed
prompt = "A high-tech laboratory with glowing neural holographic displays"
image = pipe(prompt=prompt, num_inference_steps=20, guidance_scale=7.5).images[0]
image.save("output.png")'''
}

class ImageGenRequest(BaseModel):
    prompt: str
    negative_prompt: str = ""
    steps: int = 20
    guidance_scale: float = 7.5
    seed: int = 42

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("4", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.post("/generate-image")
def generate_image(req: ImageGenRequest):
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt must not be empty.")
    
    res = ModelManager.generate_diffusion(
        prompt=req.prompt,
        negative_prompt=req.negative_prompt,
        steps=req.steps,
        guidance_scale=req.guidance_scale,
        seed=req.seed
    )
    return res
