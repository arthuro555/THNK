//@ts-check
const { readdirSync, writeFileSync, rmSync } = require("fs");
const { basename } = require("path");
const { execSync } = require("child_process");
const protocolPath = __dirname + "/../code/t-h-n-k";

// Remove previous version
rmSync(protocolPath, { force: true, recursive: true });

// Run flatbuffer compiler
try {
  execSync(__dirname + "/flatc --ts --gen-all -o code protocol/THNK.fbs", {
    stdio: "inherit",
  });
} catch {
  process.exit(1);
}

// Generate an index.ts for the generated files
const files = readdirSync(protocolPath);
const content = files.reduce(
  (content, fileName) =>
    fileName !== "index.ts"
      ? content + `export * from "./${basename(fileName, ".ts")}";\n`
      : content,
  `// Auto-generated index file for THNK protocol\n\nexport { Builder, ByteBuffer } from "flatbuffers";\n`
);
writeFileSync(protocolPath + "/index.ts", content);
