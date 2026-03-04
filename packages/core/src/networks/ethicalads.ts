import { Effect } from "effect";
import type { AdNetworkExtractorEffect } from "../types.js";

export const ethicalads: AdNetworkExtractorEffect = {
	name: "EthicalAds",

	detect(_html: string) {
		// TODO: Implement EthicalAds detection
		return null;
	},

	fetch() {
		return Effect.succeed(null);
	},
};
