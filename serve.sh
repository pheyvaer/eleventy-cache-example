#!/usr/bin/env bash

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
  rm -rf _data/_cache
  exit 0
}

# Remove old folders
rm -rf _data/_cache # Should already be removed, but just in case
rm -rf _site

# Create needed folders
mkdir _data/_cache

ELEVENTY_SERVE=true npx eleventy --serve --port 8080
