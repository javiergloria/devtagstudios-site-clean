#!/usr/bin/env python3
"""Local backoffice for devtagstudios.com.

Run from the repo root:  python3 scripts/backoffice.py
Opens http://127.0.0.1:8765 with a visual dashboard. Save writes src/data/site-config.json.
Nothing is published until the change is committed and pushed (ask Claude to publish).
Only listens on 127.0.0.1 (this computer). Stop with Ctrl+C.
"""
import json
import re
import subprocess
import sys
import threading
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "src/data/site-config.json"
PAGE = Path(__file__).resolve().parent / "backoffice.html"
PORT = 8765

GALLERIES = {
    "beauty-glamour": "gallery",
    "boudoir-portraits": "boudoir",
    "urban-street": "urban",
}
MEDIA_MODES = {"auto", "on", "off"}


def published_files(folder):
    """File names in the gallery folder that are tracked or would be committed (not git-excluded originals)."""
    rel = f"public/images/{folder}"
    res = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "--", rel],
        cwd=ROOT, capture_output=True, text=True,
    )
    names = set()
    for line in res.stdout.splitlines():
        parts = line.split("/")
        if len(parts) == 4 and (ROOT / line).exists():  # direct children only (skips thumbs/)
            names.add(parts[3])
    return names


def counts():
    out = {}
    for key, folder in GALLERIES.items():
        files = published_files(folder)
        videos = [f for f in files if re.search(r"\.mp4$", f, re.I)]
        photos = [f for f in files if re.search(r"\.(jpe?g|png|webp)$", f, re.I)]
        out[key] = {"photos": len(photos), "videos": len(videos)}
    return out


def validate(data):
    """Return a clean config dict or raise ValueError."""
    if not isinstance(data, dict) or not isinstance(data.get("galleries"), dict):
        raise ValueError("bad shape")
    minv = int(data.get("videoToggleMinVideos", 8))
    if not 1 <= minv <= 999:
        raise ValueError("videoToggleMinVideos must be 1-999")
    clean = {"videoToggleMinVideos": minv, "galleries": {}}
    for key in GALLERIES:
        g = data["galleries"].get(key)
        if not isinstance(g, dict):
            raise ValueError(f"missing gallery {key}")
        mode = g.get("mediaToggle")
        cols = int(g.get("columns", 0))
        if mode not in MEDIA_MODES:
            raise ValueError(f"{key}: mediaToggle must be auto/on/off")
        if not 0 <= cols <= 8:
            raise ValueError(f"{key}: columns must be 0 (auto) to 8")
        clean["galleries"][key] = {
            "mediaToggle": mode,
            "showSort": bool(g.get("showSort")),
            "columns": cols,
        }
    return clean


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype="application/json"):
        raw = body if isinstance(body, bytes) else body.encode()
        self.send_response(code)
        self.send_header("Content-Type", ctype + "; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self._send(200, PAGE.read_bytes(), "text/html")
        elif self.path == "/api/config":
            self._send(200, json.dumps({"config": json.loads(CONFIG.read_text()), "counts": counts()}))
        else:
            self._send(404, json.dumps({"error": "not found"}))

    def do_POST(self):
        if self.path != "/api/config":
            return self._send(404, json.dumps({"error": "not found"}))
        # Refuse requests that did not come from this page (basic protection from other websites).
        if self.headers.get("Origin") not in (None, f"http://127.0.0.1:{PORT}", f"http://localhost:{PORT}"):
            return self._send(403, json.dumps({"error": "forbidden origin"}))
        try:
            length = int(self.headers.get("Content-Length", 0))
            clean = validate(json.loads(self.rfile.read(length)))
            CONFIG.write_text(json.dumps(clean, indent=2) + "\n")
            self._send(200, json.dumps({"ok": True, "config": clean}))
        except (ValueError, TypeError, json.JSONDecodeError) as e:
            self._send(400, json.dumps({"error": str(e)}))

    def log_message(self, *a):
        pass


def main():
    if not CONFIG.exists():
        sys.exit(f"Missing {CONFIG}. Run from the repo.")
    server = HTTPServer(("127.0.0.1", PORT), Handler)
    url = f"http://127.0.0.1:{PORT}"
    print(f"Backoffice running at {url}  (Ctrl+C to stop)")
    threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
