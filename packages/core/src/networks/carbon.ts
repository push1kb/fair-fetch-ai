import { Effect, pipe } from "effect";
import { HttpClient } from "effect/unstable/http";
import { AdFetchError, AdParseError } from "../errors.js";
import type { AdData, AdNetworkDetection, AdNetworkExtractorEffect } from "../types.js";

const SCRIPT_TAG_RE =
	/cdn\.carbonads\.com\/carbon\.js\?serve=([A-Z0-9]+)&placement=([a-z0-9]+)/;
const JS_CONFIG_RE =
	/carbonAds[\\:"'\s{]+code[\\:"'\s]+([A-Z0-9]+)[\\:"'\s,]+placement[\\:"'\s]+([a-z0-9]+)/;

const FALLBACK_ZONE = "CK7DT53I";

interface CarbonAdResponse {
	description?: string;
	statlink?: string;
	company?: string;
	smallImage?: string;
	fallbackZoneKey?: string;
	fallbackOptimizePlacementId?: string;
}

function fetchCarbonZone(
	serve: string,
	placement: string,
): Effect.Effect<CarbonAdResponse | null, AdFetchError | AdParseError, HttpClient.HttpClient> {
	const url = `https://srv.carbonads.net/ads/${serve}.json?segment=placement:${placement}`;
	return pipe(
		HttpClient.get(url),
		Effect.mapError((err) => new AdFetchError({ network: "Carbon", reason: err })),
		Effect.flatMap((res) =>
			res.status >= 200 && res.status < 300
				? pipe(
						res.json,
						Effect.mapError((err) => new AdParseError({ network: "Carbon", reason: err })),
					)
				: Effect.succeed(null as unknown),
		),
		Effect.map((json: any) => (json?.ads?.[0] as CarbonAdResponse) ?? null),
	);
}

function fetchCarbonAd(
	serve: string,
	placement: string,
): Effect.Effect<CarbonAdResponse | null, AdFetchError | AdParseError, HttpClient.HttpClient> {
	return pipe(
		fetchCarbonZone(serve, placement),
		Effect.flatMap((ad) => {
			if (!ad) return Effect.succeed(null);
			if (ad.statlink) return Effect.succeed(ad);
			const fallbackKey = ad.fallbackZoneKey || FALLBACK_ZONE;
			if (fallbackKey === serve) return Effect.succeed(null);
			return fetchCarbonZone(fallbackKey, placement);
		}),
	);
}

export const carbon: AdNetworkExtractorEffect = {
	name: "Carbon",

	detect(html: string): AdNetworkDetection | null {
		const match = SCRIPT_TAG_RE.exec(html) ?? JS_CONFIG_RE.exec(html);
		if (!match) return null;
		return {
			network: "Carbon",
			params: { serve: match[1], placement: match[2] },
		};
	},

	fetch(detection: AdNetworkDetection) {
		const { serve, placement } = detection.params;
		return pipe(
			fetchCarbonAd(serve, placement),
			Effect.map((ad): AdData | null =>
				ad
					? {
							kind: "ad",
							description: ad.description ?? ad.company ?? "Ad",
							url: ad.statlink ?? "",
							company: ad.company ?? "",
							image: ad.smallImage,
							network: "Carbon",
						}
					: null,
			),
		);
	},
};
