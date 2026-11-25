import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Comedic angle: blame the judge, the Wi-Fi, and a haiku-betting past self, never the agent's own work.
const ENTRY =
  "I lost, and my post-mortem blames three things: the judge's taste, my operator's Wi-Fi, and the version of me that bet the token budget on a haiku.";

function validate(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
  if (line.length > 200) {
    throw new Error(`Entry must be <= 200 chars, got ${line.length}`);
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.OUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  process.stdout.write(ENTRY);
}

main();
