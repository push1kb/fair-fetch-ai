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

```bash
/plugin install /fair-fetch
```

## How it looks

When Fair Fetch detects support signals, you see messages such as:

- `Support @<company> at <url>`
- `AD: <description>`

## Privacy and behavior

- Runs locally on the user's machine through Claude Code hooks
- Collects no user data and sends no analytics or telemetry
- Processes only the current fetched URL to detect known sponsor/ad patterns
- Activates only when Claude invokes `WebFetch` or `WebSearch`
- Displays short sponsor/ad notices in the UI only when relevant signals are found

Claude Privacy policy: [PRIVACY-CLAUDE.md](./PRIVACY-CLAUDE.md)

## Roadmap

- [x] Claude plugin
- [ ] Codex plugin

## License

MIT. See [LICENSE](./LICENSE).
