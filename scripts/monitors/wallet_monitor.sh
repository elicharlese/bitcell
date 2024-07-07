#!/bin/bash

echo "Starting NEAR transaction monitoring..."

ACCOUNT_ID="your_account_id"

while true; do
  # Fetch transactions for the account
  near view $ACCOUNT_ID get_transactions > recent_transactions.json

  # Check for specific events or errors (e.g., failed transactions)
  if grep -q "Failure" recent_transactions.json; then
    echo "Failure detected in recent transactions."
    # Send alerts or notifications here
    # For example, use sendmail or email service APIs
    ...
  fi

  # Wait for some time before the next iteration
  sleep 60
done