def test_exp10_info(client):
    res = client.get("/api/exp10/info")
    assert res.status_code == 200
    assert "damo-vilab" in res.json()["code_snippet"]

def test_exp10_generate_video(client):
    res = client.post("/api/exp10/generate-video", json={
        "prompt": "Floating space satellite",
        "num_frames": 8,
        "steps": 10,
        "seed": 99
    })
    assert res.status_code == 200
    data = res.json()
    assert "video_base64" in data
    assert "download_url" in data
