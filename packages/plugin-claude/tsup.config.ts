import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/post-fetch.ts"],
	format: ["esm"],
	outDir: "scripts",
	noExternal: [/.*/],
	clean: true,
	banner: {
		js: "#!/usr/bin/env node",
	},
});
