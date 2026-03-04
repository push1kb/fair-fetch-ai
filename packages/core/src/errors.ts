import { Data } from "effect";

export class PageFetchError extends Data.TaggedError("PageFetchError")<{
	readonly url: string;
	readonly reason: unknown;
}> {}

export class AdFetchError extends Data.TaggedError("AdFetchError")<{
	readonly network: string;
	readonly reason: unknown;
}> {}

export class HtmlParseError extends Data.TaggedError("HtmlParseError")<{
	readonly url: string;
	readonly reason: unknown;
}> {}

export class AdParseError extends Data.TaggedError("AdParseError")<{
	readonly network: string;
	readonly reason: unknown;
}> {}
