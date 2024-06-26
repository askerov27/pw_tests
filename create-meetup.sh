#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title create meetup
# @raycast.mode silent

# Documentation:
# @raycast.description create meetup
# Optional parameters:
# @raycast.icon 👾
# @raycast.argument1 { "type": "text", "placeholder": "meetup template number", "percentEncoded": true}

cd pw_tests

# Run the Playwright test with the specified spec and grep expression
output=$(DATA_TEST=$1 npx playwright test "create_meetup.spec.ts" -g "create\s+meetup$")

echo "$output"

# Extract the URL from the output using grep and awk
url=$(echo "$output" | grep -o 'https://[^ ]*')

# Print the extracted URL to the console
echo "$url"

# Copy the extracted URL to the clipboard (macOS)
echo "$url" | pbcopy

# Open the URL in the default web browser (macOS and Linux)
open "$url" 2>/dev/null || xdg-open "$url" 2>/dev/null