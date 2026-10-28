from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List
import json

from app.services.model_manager import ModelManager
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp09", tags=["Exp 09 - RAG Assistant"])

EXP_INFO = {
    "id": 9,
    "title": "Development of a Personalized AI Assistant using an Open-Source LLM, Retrieval-Augmented Generation (RAG) and Fine-Tuning",
    "aim": "Develop a personalized AI assistant using an open-source foundational language model, integrate a RAG system to answer questions from user-specific documents, and investigate the effect of parameter-efficient fine-tuning using LoRA or QLoRA on response quality.",
    "tags": ["RAG", "FAISS", "Sentence-Transformers", "PEFT", "LoRA", "Open-Source LLM"],
    "pipeline": [
        "1. Document Ingestion: Extract text chunks from uploaded PDF and TXT domain files",
        "2. Embedding & Indexing: Compute dense vector embeddings and index in FAISS vector store",
        "3. Semantic Retrieval: Retrieve top-k most relevant chunks using cosine similarity metric",
        "4. Prompt Augmentation: Ground LLM generation with retrieved contextual excerpts and citations",
        "5. Comparative Evaluation: Side-by-side output comparison between Base Model and LoRA-fine-tuned weights"
    ],
    "code_snippet": '''from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

# 1. LoRA Configuration
config = LoraConfig(
    r=8,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# 2. Wrap Base Model
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-0.5B-Instruct")
peft_model = get_peft_model(model, config)
peft_model.print_trainable_parameters() # Trainable params: ~0.1%'''
}

class QueryRequest(BaseModel):
    question: str
    use_lora: bool = False

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("9", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.post("/upload-docs")
async def upload_docs(files: List[UploadFile] = File(...)):
    files_payload = []
    for f in files:
        raw = await f.read()
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError:
            text = raw.decode("latin-1", errors="ignore")
        files_payload.append({"filename": f.filename, "content": text})
    return ModelManager.process_rag_docs(files_payload)

@router.post("/ask")
def ask_assistant(req: QueryRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    return ModelManager.query_rag(question=req.question, use_lora=req.use_lora)
