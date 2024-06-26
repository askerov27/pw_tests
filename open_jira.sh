#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Open Jira Task
# @raycast.mode silent

# Optional parameters:
# @raycast.icon https://slackmojis.com/emojis/9132-jira-new/download
# @raycast.argument1 { "type": "text", "placeholder": "task number", "percentEncoded": true}
# @raycast.packageName Web Searches

open "https://jira.tcsbank.ru/browse/EDP-$1"
