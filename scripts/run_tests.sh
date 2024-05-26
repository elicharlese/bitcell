#!/bin/bash
echo "Running tests..."

# Navigate to the root directory
cd "$(dirname "$0")"/../..

# Run Rust tests
cargo test --all

if [ $? -ne 0 ]; then
  echo "Tests failed."
  exit 1
else
  echo "All tests passed."
  exit 0
fi