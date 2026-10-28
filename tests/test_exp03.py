def test_exp03_info(client):
    res = client.get("/api/exp03/info")
    assert res.status_code == 200
    assert "google/flan-t5" in res.json()["code_snippet"]

def test_exp03_generate_answer(client):
    res = client.post("/api/exp03/generate-answer", json={
        "question": "What is generative AI?",
        "context": "Generative AI produces novel content.",
        "max_tokens": 32,
        "temperature": 0.5,
        "top_p": 0.9
    })
    assert res.status_code == 200
    data = res.json()
    assert "answer" in data
    assert len(data["answer"]) > 0
