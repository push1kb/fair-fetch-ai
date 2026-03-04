# Fair Fetch

Fair Fetch helps Claude surface sponsor and ad links from pages it reads in the UI, so creators and open-source projects get visibility without adding extra context tokens.

## Why this exists

Many sites fund their work through sponsors and ethical ads. When AI tools summarize content, those support links often disappear. Fair Fetch surfaces them directly in Claude Code's UI.

## What you get

- Automatic detection after Claude uses `WebFetch` or `WebSearch`
- Clear sponsor/ad attributions in the Claude Code UI
- Lightweight plugin with no setup beyond install
- Zero extra prompt/context token overhead

## Supported networks

- Sponsor: GitHub Sponsors
- Ads: Carbon, EthicalAds

## Install in Claude Code

1. Add the marketplace:

```bash
/plugin marketplace add push1kb/fair-fetch-ai
```

2. Install the plugin:

```bash
/plugin install fair-fetch@fair-fetch-ai
```

## How it looks

When Fair Fetch detects support signals, you see messages such as:

- `Support @<company> at <url>`
- `AD: <description>`

## Privacy and behavior

- Runs only when Claude invokes `WebFetch` or `WebSearch`
- Processes the fetched page URL for known sponsor/ad patterns
- Displays short sponsor/ad notices in the UI only when relevant signals are found

## Status

- Repository: Monorepo (`fair-fetch`)
- Claude plugin: Done
- Codex plugin: Next
- Claude plugin name: `fair-fetch`
- Version: `0.1.0`
- Author: Vijay Pushkin

## License

MIT. See [LICENSE](/Users/pushkin/Developer/Code/push1kb/plugins/ethical-fetch/LICENSE).
