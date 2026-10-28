def test_exp05_info(client):
    res = client.get("/api/exp05/info")
    assert res.status_code == 200
    assert res.json()["id"] == 5

def test_exp05_decode_latent(client):
    res = client.post("/api/exp05/decode-latent", json={"z1": 0.0, "z2": 0.0})
    assert res.status_code == 200
    data = res.json()
    assert "image_base64" in data

def test_exp05_scatter(client):
    res = client.get("/api/exp05/latent-scatter")
    assert res.status_code == 200
    assert len(res.json()["points"]) > 0
