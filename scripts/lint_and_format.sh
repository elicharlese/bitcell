#!/bin/bash
echo "Running linting and formatting..."

# Navigate to the root directory
cd "$(dirname "$0")"/../..

# Run Rust fmt
cargo fmt --all -- --check
FMT_EXIT_CODE=$?

# Run Rust Clippy
cargo clippy --all -- -D warnings
CLIPPY_EXIT_CODE=$?

if [ $FMT_EXIT_CODE -ne 0 ] || [ $CLIPPY_EXIT_CODE -ne 0 ]; then
  echo "Linting or formatting issues found."
  exit 1
else
  echo "Linting and formatting passed."
  exit 0
fi