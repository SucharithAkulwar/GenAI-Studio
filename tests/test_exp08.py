def test_exp08_info(client):
    res = client.get("/api/exp08/info")
    assert res.status_code == 200
    assert "MusicGen" in res.json()["tags"]

def test_exp08_generate_music(client):
    res = client.post("/api/exp08/generate-music", json={
        "prompt": "Relaxing piano chords",
        "duration": 5,
        "use_lora": False
    })
    assert res.status_code == 200
    data = res.json()
    assert "audio_base64" in data
    assert "download_url" in data
    assert len(data["waveform_preview"]) > 0
