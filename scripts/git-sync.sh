#!/usr/bin/env bash
set -euo pipefail

branch="$(git branch --show-current)"

if [[ -f .nvmrc ]]; then
  required="$(tr -d '[:space:]' < .nvmrc)"
  current_node="$(node -v | sed 's/^v//')"
  req_major="${required%%.*}"
  cur_major="${current_node%%.*}"

  if (( cur_major < req_major )); then
    echo "Node v${current_node} is too old; this project requires Node ${required}+."
    echo "Run: nvm use"
    exit 1
  fi
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Cannot sync: you have uncommitted changes."
  echo "Commit or stash them first, then run: pnpm sync"
  echo
  git status --short
  exit 1
fi

git pull --rebase origin "$branch"
git push origin "$branch"
