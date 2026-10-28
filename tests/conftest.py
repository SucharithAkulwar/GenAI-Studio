import pytest
import sys
from pathlib import Path
from fastapi.testclient import TestClient

# Ensure genai_studio is on path
studio_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(studio_dir))

from app.main import app

@pytest.fixture(scope="session")
def client():
    return TestClient(app)
