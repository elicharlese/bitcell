#!/bin/bash
echo "Deploying contract..."

# Navigate to the root directory
cd "$(dirname "$0")"/../..

# Pre-deployment checks
./scripts/run_tests.sh || { echo "Tests failed. Cancelling deployment."; exit 1; }
./scripts/lint_and_format.sh || { echo "Linting/Formatting failed. Cancelling deployment."; exit 1; }

# Ensure NEAR CLI is installed
if ! command -v near &> /dev/null; then
    echo "NEAR CLI not installed. Install it using: npm install -g near-cli"
    exit 1
fi

# Define contracts and account info appropriately
WASM_FILE="path/to/compiled_bitcell.wasm"
ACCOUNT_ID="your_account_id"
PREVIOUS_WASM_FILE="path/to/compiled_previous_bitcell.wasm" # Backup previous version

# Create a backup of the existing contract (optional)
near view $ACCOUNT_ID get_code > $PREVIOUS_WASM_FILE.backup

# Deploy new contract
near deploy --wasmFile $WASM_FILE --accountId $ACCOUNT_ID --initFunction 'new' --initArgs '{"nucleus_contract": "nucleus_account_id", "vacuole_contract": "vacuole_account_id", "lipid_store_contract": "lipid_store_account_id", "golgi_apparatus_contract": "golgi_apparatus_account_id", "reinvest_percentage": 10}'

if [ $? -ne 0 ]; then
    echo "Deployment failed. Rolling back..."
    near deploy --wasmFile $PREVIOUS_WASM_FILE --accountId $ACCOUNT_ID
else
    echo "Deployment succeeded."
fi