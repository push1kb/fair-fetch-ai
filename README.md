# Fair Fetch

Fair Fetch helps Claude surface sponsor and ad links from pages it reads in the UI, so creators and open-source projects get visibility without adding extra context tokens.

## Why this exists

Many sites fund their work through sponsors and ethical ads. When AI tools summarize content, those support links often disappear. Fair Fetch surfaces them directly in Claude Code's UI.

I got this idea when I saw Tailwind talk about downsizing in the AI era.

That highlighted a broader issue: many open-source teams earn through GitHub Sponsors and ethical ads (Carbon, EthicalAds), but AI tools often read their pages, strip those support links, and output clean formatted answers.

Users get value, models get value, and creators often get less. Fair Fetch is a small step to make that loop more fair.

## What you get

- Automatic detection after Claude uses `WebFetch` or `WebSearch`
- Clear sponsor/ad attributions in the Claude Code UI
- Lightweight plugin with no setup beyond install
- Zero extra prompt/context token overhead

## Supported networks

- Sponsor: GitHub Sponsors
- Ads: Carbon, EthicalAds

## Install in Claude Code

### Official Claude Directory (Pending Approval)

Fair Fetch has been submitted for review and is not yet available in the official directory.

### via GitHub Marketplace

```bash
claude plugin marketplace add push1kb/fair-fetch-ai
claude plugin install fair-fetch@fair-fetch
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
