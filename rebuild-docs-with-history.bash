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
git remote set-url origin https://github.com/airbreather/archipelago.js.git
rm -rf src test guides
jq 'del(.projectDocuments)|.gitRevision = "5c1ed7691875a574daa4a9844eee25390b2d1e56"' typedoc.json > /tmp/t.json
mv /tmp/t.json typedoc.json
git checkout 5c1ed7691875a574daa4a9844eee25390b2d1e56 -- src README.md
jq '.version = "1.0.0"' package.json > /tmp/t.json
mv /tmp/t.json package.json
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
git remote set-url origin https://github.com/airbreather/archipelago.js.git
rm -rf src test guides
jq 'del(.projectDocuments)|.gitRevision = "f2a4b2ed2fad44e9af2e59be8d0c0614fd38fffe"' typedoc.json > /tmp/t.json
mv /tmp/t.json typedoc.json
git checkout f2a4b2ed2fad44e9af2e59be8d0c0614fd38fffe -- src README.md
jq '.version = "1.1.0"' package.json > /tmp/t.json
mv /tmp/t.json package.json
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
git remote set-url origin https://github.com/airbreather/archipelago.js.git
rm -rf src test guides
jq 'del(.projectDocuments)|.gitRevision = "21370f41983fdb3ed3617acb43a237af0cb13d4d"' typedoc.json > /tmp/t.json
mv /tmp/t.json typedoc.json
git checkout 21370f41983fdb3ed3617acb43a237af0cb13d4d -- src README.md
jq '.version = "1.2.0"' package.json > /tmp/t.json
mv /tmp/t.json package.json
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
git remote set-url origin https://github.com/airbreather/archipelago.js.git
rm -rf src test
jq '.gitRevision = "c582895ca560ec66ba0bd6ed4b8214a01b0e88d7"' typedoc.json > /tmp/t.json
mv /tmp/t.json typedoc.json
git checkout c582895ca560ec66ba0bd6ed4b8214a01b0e88d7 -- src README.md guides
jq '.version = "2.0.4"' package.json > /tmp/t.json
mv /tmp/t.json package.json
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
git remote set-url origin https://github.com/airbreather/archipelago.js.git
rm -rf src test
jq '.gitRevision = "e4f692715efa87c9a69375da5a55e1c71833e07c"' typedoc.json > /tmp/t.json
mv /tmp/t.json typedoc.json
git checkout e4f692715efa87c9a69375da5a55e1c71833e07c -- src README.md guides
jq '.version = "2.1.0"' package.json > /tmp/t.json
mv /tmp/t.json package.json
# v2 had accidentally changed the lower-bound to ES2025 with a reduce() call on
# a MapIterator. we fixed that later, but we need tsconfig.json to agree.
jq '.compilerOptions.lib = ["ES2025", "DOM"]' tsconfig.json > /tmp/tsc.json
mv /tmp/tsc.json tsconfig.json
bun run docs
cd ..
mv $(realpath old-version-docs/docs/stable) docs/v2.1.0


# current (v2.2.1)
rm -rf old-version-docs
bun run docs
