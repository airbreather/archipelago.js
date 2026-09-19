#!/bin/bash
set -Eeuo pipefail


SCRIPT_DIR="$(dirname "$(realpath "$0")")"
cd $SCRIPT_DIR


rm -rf docs
mkdir docs


# v1.0.0
rm -rf old-version-docs
git clone . old-version-docs
cd old-version-docs
rm -rf src test
git checkout 1.0.0 -- src
bun i -D @types/ws@8.5.5
bun i -D isomorphic-ws@5.0.0
bun i -D @types/uuid@9.0.2
bun run docs
cd ..
mv $(realpath old-version-docs/docs/stable) docs/v1.0.0


# v1.1.0
rm -rf old-version-docs
git clone . old-version-docs
cd old-version-docs
rm -rf src test
git checkout 1.1.0 -- src
bun i -D @types/ws@8.5.5
bun i -D isomorphic-ws@5.0.0
bun i -D @types/uuid@9.0.2
bun run docs
cd ..
mv $(realpath old-version-docs/docs/stable) docs/v1.1.0


# v1.2.0
rm -rf old-version-docs
git clone . old-version-docs
cd old-version-docs
rm -rf src test
git checkout 1.2.0 -- src
bun i -D @types/ws@8.5.13
bun i -D isomorphic-ws@5.0.0
bun i -D @types/uuid@9.0.8
bun run docs
cd ..
mv $(realpath old-version-docs/docs/stable) docs/v1.2.0


# v2.0.4 (untagged)
rm -rf old-version-docs
git clone . old-version-docs
cd old-version-docs
rm -rf src test
git checkout c582895ca560ec66ba0bd6ed4b8214a01b0e88d7 -- src # untagged
# v2 had accidentally changed the lower-bound to ES2025 with a reduce() call on
# a MapIterator. we fixed that later, but we need tsconfig.json to agree.
jq '.compilerOptions.lib = ["ES2025", "DOM"]' tsconfig.json > /tmp/tsc.json
mv /tmp/tsc.json tsconfig.json
bun run docs
cd ..
mv $(realpath old-version-docs/docs/stable) docs/v2.0.4


# v2.1.0
rm -rf old-version-docs
git clone . old-version-docs
cd old-version-docs
rm -rf src test
git checkout 2.1.0 -- src
# v2 had accidentally changed the lower-bound to ES2025 with a reduce() call on
# a MapIterator. we fixed that later, but we need tsconfig.json to agree.
jq '.compilerOptions.lib = ["ES2025", "DOM"]' tsconfig.json > /tmp/tsc.json
mv /tmp/tsc.json tsconfig.json
bun run docs
cd ..
mv $(realpath old-version-docs/docs/stable) docs/v2.1.0


# current (v2.2.0)
rm -rf old-version-docs
bun run docs
