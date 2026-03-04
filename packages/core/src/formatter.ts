import type { AdData } from "./types.js";

function formatSponsor(ad: AdData): string {
  return `Support @${ad.company} at ${ad.url}`;
}

function formatAd(ad: AdData): string {
  return `AD: ${ad.description}\n${ad.url}`;
}

export function formatAll(ads: AdData[]): string {
  const sep = "─".repeat(40);
  const lines = ads.map((ad) =>
    ad.kind === "sponsor" ? formatSponsor(ad) : formatAd(ad),
  );
  return ["", sep, ...lines, sep].join("\n");
}
