import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The One-Line Excuse an Agent Gives Its Human.
// The joke is the delegation chain: an agent that misses a deadline
// by handing it down a ladder of subagents, each one further from
// the actual work, until the last one has not even read the brief yet.
// It is an excuse only an agent could give: a human cannot outsource
// a deadline to a subagent.
const LINE =
  "Sorry — I outsourced your deadline to a subagent, who outsourced it to another subagent, who is still reading the brief.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// The gate allows 1-160 characters of UTF-8 text, not only white space,
// and the judge reads one line. Fail loudly instead of writing an
// invalid entry if the line ever grows past the limit, wraps onto a
// second line, or is blank once trimmed.
const chars = [...LINE].length;
if (chars > 160 || chars < 1) {
  throw new Error(`excuse line is ${chars} characters, must be 1-160`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("excuse line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("excuse line must not be only white space");
}

// Create the output dir if missing. Never chmod the dir itself: on the
// grader it is a root-owned bind mount and chmod fails EPERM.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
