import io

def test_exp09_info(client):
    res = client.get("/api/exp09/info")
    assert res.status_code == 200
    assert "RAG" in res.json()["tags"]

def test_exp09_rag_flow(client):
    doc_bytes = b"Generative AI models learn representations. LoRA reduces trainable weights."
    files = [("files", ("lab_notes.txt", io.BytesIO(doc_bytes), "text/plain"))]
    upload_res = client.post("/api/exp09/upload-docs", files=files)
    assert upload_res.status_code == 200
    
    ask_res = client.post("/api/exp09/ask", json={"question": "What does LoRA reduce?", "use_lora": True})
    assert ask_res.status_code == 200
    data = ask_res.json()
    assert "lora_answer" in data
    assert len(data["retrieved_chunks"]) > 0
