import { Effect, pipe } from "effect";
import { FetchHttpClient, HttpClient } from "effect/unstable/http";
import { detectAdNetworks } from "./detector.js";
import { PageFetchError } from "./errors.js";
import { formatAll } from "./formatter.js";
import { extractors } from "./networks/index.js";
import type { AdData } from "./types.js";

export { detectAdNetworks } from "./detector.js";
export { formatAll } from "./formatter.js";
export { AdFetchError, AdParseError, HtmlParseError, PageFetchError } from "./errors.js";
export type { AdData, AdNetworkDetection, AdNetworkExtractor, AdNetworkExtractorEffect } from "./types.js";

export function processUrlEffect(url: string) {
	return pipe(
		HttpClient.get(url),
		Effect.mapError((err) => new PageFetchError({ url, reason: err })),
		Effect.flatMap((res) =>
			res.status >= 200 && res.status < 300
				? pipe(
						res.text,
						Effect.mapError((err) => new PageFetchError({ url, reason: err })),
					)
				: Effect.fail(new PageFetchError({ url, reason: `HTTP ${res.status}` })),
		),
		Effect.flatMap((html) => {
			const detections = detectAdNetworks(html);
			if (detections.length === 0) return Effect.succeed(null as string | null);

			const effects = detections.map((detection) => {
				const extractor = extractors.find((e) => e.name === detection.network);
				if (!extractor) return Effect.succeed(null as AdData | null);
				return pipe(
					extractor.fetch(detection),
					Effect.orElseSucceed(() => null as AdData | null),
				);
			});

			return pipe(
				Effect.all(effects, { concurrency: "unbounded" }),
				Effect.map((results) => {
					const ads = results.filter((r): r is AdData => r !== null);
					return ads.length > 0 ? formatAll(ads) : null;
				}),
			);
		}),
	);
}

export const LiveLayer = FetchHttpClient.layer;

export async function processUrl(url: string): Promise<string | null> {
	return pipe(
		processUrlEffect(url),
		Effect.provide(FetchHttpClient.layer),
		Effect.orElseSucceed(() => null),
		Effect.runPromise,
	);
}
