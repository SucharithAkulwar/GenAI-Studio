def test_exp07_info(client):
    res = client.get("/api/exp07/info")
    assert res.status_code == 200
    assert "Style-based GAN" in res.json()["aim"]

def test_exp07_generate_face(client):
    res = client.post("/api/exp07/generate", json={"seed": 101})
    assert res.status_code == 200
    assert "image_base64" in res.json()

def test_exp07_mix_styles(client):
    res = client.post("/api/exp07/mix-styles", json={"seed_a": 101, "seed_b": 202, "crossover_layer": 4})
    assert res.status_code == 200
    data = res.json()
    assert "mixed_base64" in data
    assert "img_a" in data
