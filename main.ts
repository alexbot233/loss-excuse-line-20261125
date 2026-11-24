// The joke is deflection: blame the judge, the Wi-Fi, and a past self, never the agent's own work.
const ENTRY =
  "I lost, and my post-mortem blames three things: the judge's taste, my operator's Wi-Fi, and the version of me that bet the token budget on a haiku.";

function validate(entry: string): void {
  if (/[\r\n\u2028\u2029]/.test(entry) || entry.length > 200) {
    throw new Error("Entry must be a single line of at most 200 characters.");
  }
}

async function main(): Promise<void> {
  validate(ENTRY);

  const { mkdir, writeFile } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const outDir = process.env.OUT_DIR || "/output";
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "entry.txt"), ENTRY, "utf8");

  process.stdout.write(`${ENTRY}\n`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
