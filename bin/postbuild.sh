#!/usr/bin/env bash
set -euo pipefail

rm -rf .amplify-hosting

mkdir -p .amplify-hosting/compute/default
mkdir -p .amplify-hosting/static

cp dist/index.cjs .amplify-hosting/compute/default/index.cjs
cp -R dist/public/. .amplify-hosting/compute/default/public/
cp -R dist/public/. .amplify-hosting/static/
cp deploy-manifest.json .amplify-hosting/deploy-manifest.json

du -sh .amplify-hosting
