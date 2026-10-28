from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json

from app.services.model_manager import ModelManager
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp10", tags=["Exp 10 - Text-to-Video"])

EXP_INFO = {
    "id": 10,
    "title": "Generation of Videos from Text Prompts using a Pretrained Open-Source Video Generation Foundation Model",
    "aim": "Use a pretrained, open-source video generation foundation model to generate short videos directly from text prompts, without collecting a dataset or training the model, and preview and save the generated videos.",
    "tags": ["Diffusers", "Text-to-Video", "damo-vilab", "Spatiotemporal Attention", "Video Diffusion"],
    "pipeline": [
        "1. Text Conditioning: Encodes textual prompt via CLIP text encoder into contextual semantic features",
        "2. Spatiotemporal Latent Prior: Samples 3D latent noise tensor (Batch, Channels, Frames, Height, Width)",
        "3. Cross-Frame Attention: UNet alternates spatial 2D attention and temporal 1D self-attention across frames",
        "4. Temporal Denoising: Progressive DDIM denoising step-by-step preserves temporal visual coherence",
        "5. Video Rendering: VAE temporal decoder synthesizes coherent MP4 video playable in browser"
    ],
    "code_snippet": '''import torch
from diffusers import DiffusionPipeline

# 1. Load Text-to-Video Model
pipe = DiffusionPipeline.from_pretrained(
    "damo-vilab/text-to-video-ms-1.7b",
    torch_dtype=torch.float16,
    variant="fp16"
)
pipe.enable_model_cpu_offload()

# 2. Generate video frames
prompt = "An astronaut walking peacefully on the surface of Mars with crimson dust"
video_frames = pipe(prompt, num_frames=16, num_inference_steps=25).frames[0]

# 3. Export MP4
from diffusers.utils import export_to_video
export_to_video(video_frames, "mars_walk.mp4")'''
}

class VideoGenRequest(BaseModel):
    prompt: str
    num_frames: int = 16
    steps: int = 25
    seed: int = 42

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("10", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.post("/generate-video")
def generate_video(req: VideoGenRequest):
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt must not be empty.")
    return ModelManager.generate_video(prompt=req.prompt, num_frames=req.num_frames, steps=req.steps, seed=req.seed)
