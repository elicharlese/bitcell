#!/bin/bash
echo "Running security checks..."

# Navigate to the root directory
cd "$(dirname "$0")"/../..

# Run RUSTSEC (requires cargo-audit)
cargo install cargo-audit
cargo audit

if [ $? -ne 0 ]; then
  echo "Security issues found. Please address them before deployment."
  exit 1
else
  echo "No security issues found."
  exit 0
fi