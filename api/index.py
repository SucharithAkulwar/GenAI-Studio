import sys
from pathlib import Path

# Add project root to sys.path so app module is importable
root_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from app.main import app as fastapi_app

async def app(scope, receive, send):
    if scope.get("type") == "http":
        headers = dict(scope.get("headers", []))
        matched = headers.get(b"x-matched-path", b"").decode("utf-8")
        if not matched:
            matched = headers.get(b"x-forwarded-uri", b"").decode("utf-8")
        if not matched:
            matched = headers.get(b"x-real-path", b"").decode("utf-8")

        current_path = scope.get("path", "")
        if matched:
            clean_path = matched.split("?")[0]
            if clean_path and clean_path not in ("/api/index.py", "/api/index", "/api"):
                scope["path"] = clean_path

    await fastapi_app(scope, receive, send)
