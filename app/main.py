from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path

from app.config import OUTPUTS_DIR, BASE_DIR
from app.services.model_manager import ModelManager

from app.routers import (
    exp01, exp02, exp03, exp04, exp05,
    exp06, exp07, exp08, exp09, exp10
)

app = FastAPI(
    title="GenAI Studio",
    description="Interactive Lab Studio running all 10 Generative AI Experiments",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(404)
async def custom_404_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "url_path": request.url.path,
            "scope_path": request.scope.get("path"),
            "query_params": dict(request.query_params)
        }
    )


# Include Experiment Routers
app.include_router(exp01.router)
app.include_router(exp02.router)
app.include_router(exp03.router)
app.include_router(exp04.router)
app.include_router(exp05.router)
app.include_router(exp06.router)
app.include_router(exp07.router)
app.include_router(exp08.router)
app.include_router(exp09.router)
app.include_router(exp10.router)

# Mount outputs directory
app.mount("/outputs", StaticFiles(directory=str(OUTPUTS_DIR)), name="outputs")

# Mount frontend static files
STATIC_DIR = BASE_DIR / "static"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

@app.get("/api")
def api_root():
    return {"status": "ok", "message": "GenAI Studio API is operational"}

@app.get("/api/system/status")
@app.get("/system/status")
def system_status():
    return ModelManager.get_system_status()

@app.get("/api/experiments")
@app.get("/experiments")
def list_experiments():
    return [
        {"id": 1, "title": exp01.EXP_INFO["title"], "category": "Data Foundations", "tags": exp01.EXP_INFO["tags"]},
        {"id": 2, "title": exp02.EXP_INFO["title"], "category": "Tensor Computing", "tags": exp02.EXP_INFO["tags"]},
        {"id": 3, "title": exp03.EXP_INFO["title"], "category": "Transformers & NLP", "tags": exp03.EXP_INFO["tags"]},
        {"id": 4, "title": exp04.EXP_INFO["title"], "category": "Generative Diffusion", "tags": exp04.EXP_INFO["tags"]},
        {"id": 5, "title": exp05.EXP_INFO["title"], "category": "Latent Space & VAE", "tags": exp05.EXP_INFO["tags"]},
        {"id": 6, "title": exp06.EXP_INFO["title"], "category": "Adversarial Networks", "tags": exp06.EXP_INFO["tags"]},
        {"id": 7, "title": exp07.EXP_INFO["title"], "category": "Style-Based Synthesis", "tags": exp07.EXP_INFO["tags"]},
        {"id": 8, "title": exp08.EXP_INFO["title"], "category": "Audio & MusicGen", "tags": exp08.EXP_INFO["tags"]},
        {"id": 9, "title": exp09.EXP_INFO["title"], "category": "RAG & LLM Fine-Tuning", "tags": exp09.EXP_INFO["tags"]},
        {"id": 10, "title": exp10.EXP_INFO["title"], "category": "Video Diffusion", "tags": exp10.EXP_INFO["tags"]}
    ]

@app.get("/")
def serve_index():
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"message": "GenAI Studio Backend is live. Static UI files loading..."}
