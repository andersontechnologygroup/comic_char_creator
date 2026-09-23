# Agent Instructions

## Critical Rules

### Data Files — Read-Only Unless Explicitly Authorized

The following files contain game data tables and must **never** be modified unless the user **explicitly** tells you to change them, or you **ask the user first** and receive clear permission:

- `DataBasic.js`
- `DataAdvanced.js`
- `DataUltimate.js`

These files define the source-of-truth game data (physical forms, powers, talents, contacts, resources, origins, etc.) for each generation mode. Even small accidental edits (whitespace, formatting, attribute changes) can break character generation or tests in subtle ways.

**Before editing any of these files, always:**

1. State what you want to change and why.
2. Ask the user to confirm.
3. Only proceed after receiving explicit approval.

This rule applies even if a test is failing — a failing test may indicate a bug in the generator code or test code, not necessarily the data.
