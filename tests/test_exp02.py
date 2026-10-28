def test_exp02_info(client):
    res = client.get("/api/exp02/info")
    assert res.status_code == 200
    assert "allowed_operations" in res.json()

def test_exp02_run_constant(client):
    res = client.post("/api/exp02/run-op", json={"operation": "constant", "params": {"value": [1.0, 2.0]}})
    assert res.status_code == 200
    data = res.json()
    assert data["shape"] == [2]
    assert data["result"] == [1.0, 2.0]

def test_exp02_run_gradient_tape(client):
    res = client.post("/api/exp02/run-op", json={"operation": "GradientTape", "params": {"x": 3.0}})
    assert res.status_code == 200
    data = res.json()
    assert data["dy_dx"] == 9.0
