import { processUrl } from "@push1kb/fair-fetch-core";

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    process.stdin.on("data", (chunk) => chunks.push(chunk as Buffer));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString()));
    process.stdin.resume();
  });
}

async function main() {
  const raw = await readStdin();

  let input: { tool_input?: { url?: string } };
  try {
    input = JSON.parse(raw);
  } catch {
    return;
  }

  const url = input.tool_input?.url;
  if (!url) return;

  try {
    const adText = await processUrl(url);
    if (adText) {
      console.log(JSON.stringify({ systemMessage: adText }));
    }
  } catch {
    // Graceful no-op on any error
  }
}

main();
