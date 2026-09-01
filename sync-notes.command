#!/bin/zsh
set -e
cd "$(dirname "$0")"
python3 scripts/sync_notes.py
git add notes.html notes scripts
if git diff --cached --quiet; then
  echo "No note changes to sync."
  exit 0
fi
git commit -m "Sync notes"
git push
echo "Notes synced to GitHub."
