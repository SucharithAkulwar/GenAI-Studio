import sys
from pathlib import Path
from urllib.parse import parse_qs, urlencode

# Add project root to sys.path so app module is importable
root_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from app.main import app as fastapi_app

async def app(scope, receive, send):
    if scope.get("type") == "http":
        qs_bytes = scope.get("query_string", b"")
        qs_str = qs_bytes.decode("utf-8", errors="ignore")
        if qs_str:
            params = parse_qs(qs_str, keep_blank_values=True)
            matched = params.pop("match", [None])[0]
            if matched:
                matched_clean = matched.lstrip("/")
                scope["path"] = f"/api/{matched_clean}" if matched_clean else "/api"
                remaining_qs = urlencode([(k, v) for k, vs in params.items() for v in vs])
                scope["query_string"] = remaining_qs.encode("utf-8")

    await fastapi_app(scope, receive, send)
