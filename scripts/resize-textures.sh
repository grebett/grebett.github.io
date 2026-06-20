#!/bin/zsh
set -euo pipefail

ROOT_DIR="${0:A:h}/.."
TEXTURE_DIR="$ROOT_DIR/public/textures"
SIZE="300"

if ! command -v sips >/dev/null 2>&1; then
  echo "sips is required on macOS to resize textures." >&2
  exit 1
fi

if [[ ! -d "$TEXTURE_DIR" ]]; then
  echo "Texture directory not found: $TEXTURE_DIR" >&2
  exit 1
fi

for image in "$TEXTURE_DIR"/*.png(N); do
  echo "Resizing ${image:t} to ${SIZE}x${SIZE}"
  sips --resampleHeightWidth "$SIZE" "$SIZE" "$image" >/dev/null
done
