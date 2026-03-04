import type { AdNetworkDetection } from "./types.js";
import { extractors } from "./networks/index.js";

export function detectAdNetworks(html: string): AdNetworkDetection[] {
  const detections: AdNetworkDetection[] = [];

  for (const extractor of extractors) {
    const detection = extractor.detect(html);
    if (detection) {
      detections.push(detection);
    }
  }
  return detections;
}
