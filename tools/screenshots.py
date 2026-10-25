"""Full-page screenshots of key pages at desktop and mobile widths, light and dark.

Usage: python3 tools/screenshots.py BASE_URL OUT_DIR [PREFIX]
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

base = sys.argv[1].rstrip("/")
out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
prefix = sys.argv[3] if len(sys.argv) > 3 else ""
pages = {
    "home": "/",
    "post": "/posts/sre-time-management/",
    "issue": "/posts/week-in-review-ai-sre-observability-sep-25-oct-2-2026/",
    "list": "/posts/",
    "newsletter": "/tags/weekly-roundup/",
    "about": "/about/",
    "tags": "/tags/",
    "404": "/404.html",
}
if len(sys.argv) > 4:
    pages = {k: v for k, v in pages.items() if k in sys.argv[4].split(",")}
sizes = {"desktop": (1440, 900), "mobile": (390, 844)}
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome")
    for scheme in ("light", "dark"):
        for sname, (w, h) in sizes.items():
            ctx = b.new_context(viewport={"width": w, "height": h}, color_scheme=scheme,
                                device_scale_factor=1 if sname == "desktop" else 2,
                                reduced_motion="reduce")
            pg = ctx.new_page()
            for name, path in pages.items():
                pg.goto(base + path, wait_until="networkidle")
                # Grow the viewport to the page height so fixed layers (grain) cover
                # the whole capture and lazy images load, then wait for decode.
                full = pg.evaluate("document.documentElement.scrollHeight")
                pg.set_viewport_size({"width": w, "height": full})
                pg.wait_for_function("[...document.images].every(i => i.complete)")
                pg.evaluate("Promise.all([...document.images].map(i => i.decode().catch(() => null)))")
                pg.wait_for_timeout(300)
                f = out / f"{prefix}{name}-{sname}-{scheme}.png"
                pg.screenshot(path=str(f), full_page=True)
                print(f)
                pg.set_viewport_size({"width": w, "height": h})
            ctx.close()
    b.close()
