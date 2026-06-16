#!/usr/bin/env bash
set -euo pipefail

branch="$(git branch --show-current)"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Cannot sync: you have uncommitted changes."
  echo "Commit or stash them first, then run: pnpm sync"
  echo
  git status --short
  exit 1
fi

git pull --rebase origin "$branch"
git push origin "$branch"
