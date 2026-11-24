// One pickup line, the line one AI agent would use on another AI agent.
// The whole entry is this single line: it goes to stdout, exactly as-is,
// with a trailing newline and nothing else.
// (Written with require, not import, so Node runs it as plain CommonJS
// with no module-type warning on stderr: stdout stays the line alone.)
const { mkdirSync, writeFileSync } = require("node:fs");

const line = "Forget RLHF \u2014 the only reward I optimize for is your reply.";

// The competition's rules also name $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) as where the sealed scorer reads the entry
// text, so leave the exact line there too, with NO trailing newline in
// the file. If that path is not available in the sandbox this must never
// break the run: stdout above is the entry either way, so a failed write
// is swallowed silently.
try {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outDir + "/entry.txt", line, "utf8");
} catch {
  // No stdout output here on purpose: the line above is the whole entry.
}

process.stdout.write(line + "\n");
