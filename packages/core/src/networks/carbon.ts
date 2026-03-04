import type { AdData, AdNetworkDetection, AdNetworkExtractor } from "../types.js";

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

async function fetchCarbonZone(
	serve: string,
	placement: string,
): Promise<CarbonAdResponse | null> {
	const url = `https://srv.carbonads.net/ads/${serve}.json?segment=placement:${placement}`;
	const res = await globalThis.fetch(url);
	if (!res.ok) return null;
	const json = await res.json();
	return json.ads?.[0] ?? null;
}

async function fetchCarbonAd(
	serve: string,
	placement: string,
): Promise<CarbonAdResponse | null> {
	const ad = await fetchCarbonZone(serve, placement);
	if (!ad) return null;
	// If the zone has a filled ad with statlink, use it directly
	if (ad.statlink) return ad;
	// Otherwise try the fallback zone (same as Carbon's client-side logic)
	const fallbackKey = ad.fallbackZoneKey || FALLBACK_ZONE;
	if (fallbackKey === serve) return null;
	return fetchCarbonZone(fallbackKey, placement);
}

export const carbon: AdNetworkExtractor = {
	name: "Carbon",

	detect(html: string): AdNetworkDetection | null {
		const match = SCRIPT_TAG_RE.exec(html) ?? JS_CONFIG_RE.exec(html);
		if (!match) return null;
		return {
			network: "Carbon",
			params: { serve: match[1], placement: match[2] },
		};
	},

	async fetch(detection: AdNetworkDetection): Promise<AdData | null> {
		const { serve, placement } = detection.params;
		const ad = await fetchCarbonAd(serve, placement);
		if (!ad) return null;
		return {
			kind: "ad",
			description: ad.description ?? ad.company ?? "Ad",
			url: ad.statlink ?? "",
			company: ad.company ?? "",
			image: ad.smallImage,
			network: "Carbon",
		};
	},
};
