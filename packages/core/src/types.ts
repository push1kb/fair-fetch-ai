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
