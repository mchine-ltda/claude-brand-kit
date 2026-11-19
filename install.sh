#!/usr/bin/env bash
# Claude Brand Kit installer
#
#   ./install.sh              install for every project (~/.claude/skills)
#   ./install.sh --project    install into this folder's project (./.claude/skills)
#   ./install.sh --project /path/to/project
#
# Copies the four skills (brand-identity, brand-kit, moodboard, logo), keeps a
# backup of any skill with the same name, and installs the one dependency
# (playwright-core, which drives the Chrome you already have).
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
target="$HOME/.claude/skills"
if [[ "${1:-}" == "--project" ]]; then
  target="${2:-$PWD}/.claude/skills"
fi

bold=$'\033[1m'; dim=$'\033[2m'; lime=$'\033[38;5;154m'; red=$'\033[31m'; off=$'\033[0m'
say() { printf "%s\n" "$*"; }

say ""
say "${lime}●${off} ${bold}Claude Brand Kit${off} ${dim}→ $target${off}"
say ""

# Node 18+
if ! command -v node >/dev/null 2>&1; then
  say "${red}Node.js is required (18 or newer): https://nodejs.org${off}"; exit 1
fi
major="$(node -p 'process.versions.node.split(".")[0]')"
if (( major < 18 )); then
  say "${red}Node.js 18 or newer is required (found $(node -v)).${off}"; exit 1
fi

# Chrome (a warning only: CHROME_PATH can point at another Chromium)
chrome=""
for p in "${CHROME_PATH:-}" \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "/usr/bin/google-chrome" "/usr/bin/chromium" "/usr/bin/chromium-browser"; do
  if [[ -n "$p" && -x "$p" ]]; then chrome="$p"; break; fi
done
if [[ -z "$chrome" ]]; then
  say "${red}!${off} Google Chrome not found. Install it, or set CHROME_PATH to a Chrome/Chromium binary before using the skills."
fi

mkdir -p "$target"
stamp="$(date +%Y%m%d-%H%M%S)"
# backups go next to the skills folder, not inside it, so Claude doesn't load them twice
backup="$(dirname "$target")/skills-backup/$stamp"
for skill in brand-identity brand-kit moodboard logo; do
  if [[ -e "$target/$skill" ]]; then
    mkdir -p "$backup"
    mv "$target/$skill" "$backup/$skill"
    say "  ${dim}kept your old $skill in ${backup/#$HOME/~}${off}"
  fi
  cp -R "$here/skills/$skill" "$target/$skill"
  say "  ${lime}✓${off} $skill"
done

say ""
say "  installing playwright-core…"
(cd "$target/brand-kit" && npm install --omit=dev --no-audit --no-fund --silent)
say "  ${lime}✓${off} ready"
say ""
say "${bold}Start a new Claude Code session and type:${off}"
say "  /brand-identity   ${dim}build a brand from scratch: questions → strategy → logo → kit${off}"
say "  /brand-kit        ${dim}full kit for an existing brand${off}"
say "  /moodboard        ${dim}the 7-tile moodboard${off}"
say "  /logo             ${dim}logo files: PNG, SVG, favicon${off}"
say ""
