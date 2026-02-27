import { readFileSync, writeFileSync } from "node:fs";

const files = ["dist/react.mjs", "dist/react.js"];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  if (!content.startsWith('"use client"')) {
    writeFileSync(file, `"use client";\n${content}`);
    console.log(`✓ Added "use client" to ${file}`);
  }
}
