import type { AdNetworkExtractor } from "../types.js";

export const ethicalads: AdNetworkExtractor = {
	name: "EthicalAds",

	detect(_html: string) {
		// TODO: Implement EthicalAds detection
		return null;
	},

	async fetch() {
		return null;
	},
};
