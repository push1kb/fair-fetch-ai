import { detectAdNetworks } from "./detector.js";
import { formatAll } from "./formatter.js";
import { extractors } from "./networks/index.js";
import type { AdData } from "./types.js";

export { detectAdNetworks } from "./detector.js";
export { formatAll } from "./formatter.js";
export type { AdData, AdNetworkDetection, AdNetworkExtractor } from "./types.js";

export async function processUrl(url: string): Promise<string | null> {
	const res = await globalThis.fetch(url);
	if (!res.ok) return null;
	const html = await res.text();

	const detections = detectAdNetworks(html);
	if (detections.length === 0) return null;

	const results: AdData[] = [];
	for (const detection of detections) {
		const extractor = extractors.find((e) => e.name === detection.network);
		if (!extractor) continue;
		const ad = await extractor.fetch(detection);
		if (ad) results.push(ad);
	}

	if (results.length === 0) return null;
	return formatAll(results);
}
