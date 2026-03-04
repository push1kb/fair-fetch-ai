import type { AdNetworkExtractorEffect } from "../types.js";
import { carbon } from "./carbon.js";
import { ethicalads } from "./ethicalads.js";
import { githubSponsors } from "./github-sponsors.js";

export const extractors: AdNetworkExtractorEffect[] = [githubSponsors, carbon, ethicalads];
