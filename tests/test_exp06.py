def test_exp06_info(client):
    res = client.get("/api/exp06/info")
    assert res.status_code == 200
    assert "CelebA" in res.json()["aim"]

def test_exp06_generate_faces(client):
    res = client.post("/api/exp06/generate-faces", json={"seed": 42, "num_faces": 4})
    assert res.status_code == 200
    assert "image_base64" in res.json()

def test_exp06_progression(client):
    res = client.get("/api/exp06/training-progression")
    assert res.status_code == 200
    assert len(res.json()["progression"]) >= 5
