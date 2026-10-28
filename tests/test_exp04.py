def test_exp04_info(client):
    res = client.get("/api/exp04/info")
    assert res.status_code == 200
    assert res.json()["id"] == 4

def test_exp04_generate_image(client):
    res = client.post("/api/exp04/generate-image", json={
        "prompt": "Test miniature neural sketch",
        "steps": 5,
        "guidance_scale": 7.0,
        "seed": 12
    })
    assert res.status_code == 200
    data = res.json()
    assert "image_base64" in data
    assert "download_url" in data
