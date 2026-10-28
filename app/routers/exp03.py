from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json

from app.services.model_manager import ModelManager
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp03", tags=["Exp 03 - FLAN-T5 QA"])

EXP_INFO = {
    "id": 3,
    "title": "Text Generation using a Pre-trained Transformer Model for a Question–Answer System",
    "aim": "Implement a text-generation Question–Answer system using a pre-trained Transformer and generate answers to user questions.",
    "tags": ["Transformers", "FLAN-T5", "Seq2Seq", "Prompt Engineering", "NLP"],
    "pipeline": [
        "1. Input Structuring: Format user question and optional background context into prompt template",
        "2. Tokenization: Convert text into subword token IDs using T5Tokenizer",
        "3. Transformer Forward Pass: Pass encoder-decoder representations through self-attention layers",
        "4. Decoding: Autoregressively sample tokens with temperature and top-p nucleus thresholds",
        "5. Output Formatting: Detokenize and present final generated answer with prompt breakdown"
    ],
    "code_snippet": '''from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# 1. Load model lazily
model_name = "google/flan-t5-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# 2. Formulate Prompt
prompt = "Context: Generative AI produces synthetic artifacts.\nQuestion: What does GenAI do?\nAnswer:"
inputs = tokenizer(prompt, return_tensors="pt")

# 3. Generate Answer
outputs = model.generate(**inputs, max_new_tokens=100, temperature=0.7, top_p=0.9)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))'''
}

class QARequest(BaseModel):
    question: str
    context: str = ""
    max_tokens: int = 128
    temperature: float = 0.7
    top_p: float = 0.9

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("3", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.post("/generate-answer")
def generate_answer(req: QARequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    
    result = ModelManager.answer_flan_t5(
        question=req.question,
        context=req.context,
        max_tokens=req.max_tokens,
        temperature=req.temperature,
        top_p=req.top_p
    )
    return result
