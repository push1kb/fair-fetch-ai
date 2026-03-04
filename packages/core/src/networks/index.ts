import type { AdNetworkExtractor } from "../types.js";
import { carbon } from "./carbon.js";
import { ethicalads } from "./ethicalads.js";
import { githubSponsors } from "./github-sponsors.js";

export const extractors: AdNetworkExtractor[] = [githubSponsors, carbon, ethicalads];
