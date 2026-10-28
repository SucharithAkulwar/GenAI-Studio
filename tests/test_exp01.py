import io

def test_exp01_info(client):
    res = client.get("/api/exp01/info")
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == 1
    assert "aim" in data

def test_exp01_sample_dataset(client):
    res = client.get("/api/exp01/sample-dataset")
    assert res.status_code == 200
    assert "csv_data" in res.json()

def test_exp01_analyze_csv(client):
    csv_bytes = b"col1,col2,col3\n10,20,A\n15,25,B\n12,22,A\n14,24,B\n"
    files = {"file": ("test.csv", io.BytesIO(csv_bytes), "text/csv")}
    res = client.post("/api/exp01/analyze", files=files)
    assert res.status_code == 200
    data = res.json()
    assert data["shape"] == [4, 3]
    assert "col1" in data["describe"]

def test_exp01_preprocess_csv(client):
    csv_bytes = b"col1,col2\n10,A\n15,B\n12,A\n14,B\n"
    files = {"file": ("test.csv", io.BytesIO(csv_bytes), "text/csv")}
    res = client.post("/api/exp01/preprocess", files=files, data={"impute_strategy": "median", "encode_categoricals": "true", "scale_numeric": "true", "test_split_ratio": 0.2})
    assert res.status_code == 200
    assert res.json()["status"] == "success"
