import type { AdData, AdNetworkDetection, AdNetworkExtractor } from "../types.js";

const SPONSORS_URL_RE = /https?:\/\/github\.com\/sponsors\/([a-zA-Z0-9_-]+)/;

export const githubSponsors: AdNetworkExtractor = {
	name: "GitHub Sponsors",

	detect(html: string): AdNetworkDetection | null {
		const match = SPONSORS_URL_RE.exec(html);
		if (!match) return null;
		return {
			network: "GitHub Sponsors",
			params: { username: match[1], url: match[0] },
		};
	},

	async fetch(detection: AdNetworkDetection): Promise<AdData | null> {
		const { username, url } = detection.params;
		return {
			kind: "sponsor",
			description: `Support @${username} on GitHub Sponsors`,
			url,
			company: username,
			network: "GitHub Sponsors",
		};
	},
};
