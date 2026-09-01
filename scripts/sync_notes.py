#!/usr/bin/env python3
"""Build Notes pages from Obsidian Markdown files."""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NOTES_DIR = ROOT / "notes"


def parse_note(path: Path) -> tuple[dict[str, str], str]:
    raw = path.read_text(encoding="utf-8")
    meta: dict[str, str] = {}
    if raw.startswith("---"):
        _, front, body = raw.split("---", 2)
        for line in front.splitlines():
            if ":" in line:
                key, value = line.split(":", 1)
                meta[key.strip()] = value.strip().strip('"\'')
        raw = body.lstrip()
    meta.setdefault("title", path.stem.replace("-", " ").title())
    meta.setdefault("date", "")
    meta.setdefault("summary", "")
    return meta, raw


def inline(text: str) -> str:
    text = html.escape(text, quote=False)
    text = re.sub(r"\[([^]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)
    return text


def markdown(body: str) -> str:
    out: list[str] = []
    paragraph: list[str] = []
    in_code = False
    for line in body.splitlines():
        if line.strip().startswith("```"):
            if paragraph:
                out.append(f"<p>{inline(' '.join(paragraph))}</p>")
                paragraph = []
            in_code = not in_code
            out.append("<pre><code>" if in_code else "</code></pre>")
        elif in_code:
            out.append(html.escape(line) + "\n")
        elif not line.strip():
            if paragraph:
                out.append(f"<p>{inline(' '.join(paragraph))}</p>")
                paragraph = []
        elif line.startswith("### "):
            out.append(f"<h3>{inline(line[4:])}</h3>")
        elif line.startswith("## "):
            out.append(f"<h2>{inline(line[3:])}</h2>")
        elif line.startswith("# "):
            out.append(f"<h2>{inline(line[2:])}</h2>")
        elif line.startswith("- "):
            out.append(f"<li>{inline(line[2:])}</li>")
        else:
            paragraph.append(line.strip())
    if paragraph:
        out.append(f"<p>{inline(' '.join(paragraph))}</p>")
    return "\n".join(out)


def page(title: str, content: str) -> str:
    return f'''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)} · Pancheng Niu</title><link rel="stylesheet" href="../layouts.css"><link rel="stylesheet" href="../academic-color.css"></head><body class="academic"><main><header><a href="../index.html">Pancheng Niu</a><nav><a href="../index.html">Homepage</a><a href="../about.html">About</a><a href="../now.html">Now</a><a href="../projects.html">Publications</a><a class="active" href="../notes.html">Notes</a><a href="../experience.html">Experience</a></nav></header><section class="page-section note-page"><p class="kicker">04 / NOTES</p><h1>{html.escape(title)}</h1><div class="note-content">{content}</div></section></main><script src="../language.js"></script></body></html>'''


def main() -> None:
    notes = []
    for source in sorted(NOTES_DIR.glob("*.md"), reverse=True):
        if source.name.lower() == "readme.md":
            continue
        meta, body = parse_note(source)
        slug = source.stem.lower().replace(" ", "-")
        rendered = markdown(body)
        (NOTES_DIR / f"{slug}.html").write_text(page(meta["title"], rendered), encoding="utf-8")
        summary = meta["summary"] or re.sub(r"<[^>]+>", "", rendered).strip()[:180]
        notes.append((meta["date"], meta["title"], summary, slug))
    rows = "\n".join(f'<article><time>{html.escape(date)}</time><div><h2><a href="notes/{slug}.html">{html.escape(title)} ↗</a></h2><p>{html.escape(summary)}</p></div></article>' for date, title, summary, slug in notes)
    if not rows:
        rows = '<p class="note-empty">No notes yet. Add a Markdown file to the <code>notes/</code> folder.</p>'
    output = f'''<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Notes · Pancheng Niu</title><link rel="stylesheet" href="layouts.css"><link rel="stylesheet" href="academic-color.css"></head><body class="academic"><main><header><a href="index.html">Pancheng Niu</a><nav><a href="index.html">Homepage</a><a href="about.html">About</a><a href="now.html">Now</a><a href="projects.html">Publications</a><a class="active" href="notes.html">Notes</a><a href="experience.html">Experience</a></nav></header><section class="page-section notes-index"><p class="kicker">04 / NOTES</p><h1>Notes</h1><div class="notes-list">{rows}</div></section></main><script src="language.js"></script></body></html>'''
    (ROOT / "notes.html").write_text(output, encoding="utf-8")
    print(f"Synced {len(notes)} note(s).")


if __name__ == "__main__":
    main()
