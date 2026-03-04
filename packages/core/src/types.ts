export interface AdData {
	kind: "sponsor" | "ad";
	description: string;
	url: string;
	company: string;
	image?: string;
	network: string;
}

export interface AdNetworkDetection {
	network: string;
	params: Record<string, string>;
}

export interface AdNetworkExtractor {
	name: string;
	detect(html: string): AdNetworkDetection | null;
	fetch(detection: AdNetworkDetection): Promise<AdData | null>;
}

import type { Effect } from "effect";
import type { HttpClient } from "effect/unstable/http";
import type { AdFetchError, AdParseError } from "./errors.js";

export interface AdNetworkExtractorEffect {
	name: string;
	detect(html: string): AdNetworkDetection | null;
	fetch(
		detection: AdNetworkDetection,
	): Effect.Effect<AdData | null, AdFetchError | AdParseError, HttpClient.HttpClient>;
}
