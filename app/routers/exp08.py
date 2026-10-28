from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json

from app.services.model_manager import ModelManager
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp08", tags=["Exp 08 - MusicGen"])

EXP_INFO = {
    "id": 8,
    "title": "Generation of Novel Music Compositions using a Pretrained Open-Source Foundation Model (MusicGen)",
    "aim": "Use a pretrained, open-source Transformer-based foundation model (MusicGen) to generate novel music directly from text prompts, without dataset collection or training, and save and play the generated audio.",
    "tags": ["MusicGen", "AudioCraft", "Residual Vector Quantization", "Audio Transformer", "Text-to-Audio"],
    "pipeline": [
        "1. Conditioning: Text description encoded into conditioning tokens via T5 text encoder",
        "2. Autoregressive Codebook Modeling: Transformer predicts discrete acoustic codebook indices",
        "3. Residual Vector Quantization (RVQ): Multi-stage codebook quantizes continuous spectrogram bands",
        "4. Neural Audio Decoder: EnCodec neural vocoder synthesizes high-fidelity 32kHz waveform from codes",
        "5. Playback & Export: Render in HTML audio player, visualize waveform, and offer direct WAV download"
    ],
    "code_snippet": '''from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy.io.wavfile

# 1. Load MusicGen Small
processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

# 2. Text to music generation
inputs = processor(text=["lo-fi chill beats with warm Rhodes piano"], return_tensors="pt")
audio_values = model.generate(**inputs, max_new_tokens=256)

# 3. Export WAV
scipy.io.wavfile.write("music.wav", rate=32000, data=audio_values[0, 0].numpy())'''
}

class MusicGenRequest(BaseModel):
    prompt: str
    duration: int = 8
    use_lora: bool = False

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("8", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.post("/generate-music")
def generate_music(req: MusicGenRequest):
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt must not be empty.")
    return ModelManager.generate_music(prompt=req.prompt, duration=req.duration, use_lora=req.use_lora)
