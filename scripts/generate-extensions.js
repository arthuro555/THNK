//@ts-check
const distPath = __dirname + "/../dist/";
const extensionsPath = __dirname + "/../extensions/";
const fs = require("fs");

{
  const thnkCode = fs.readFileSync(distPath + "index.global.js").toString();
  /** @type {{eventsFunctions: { name: string, events: { type: string, inlineCode: string }[] }[]}} */
  const thnkExt = JSON.parse(
    fs.readFileSync(extensionsPath + "THNK.json").toString()
  );

  thnkExt.eventsFunctions[0].events[0].inlineCode = `// Load THNK library (https://github.com/arthuro555/THNK)
window.${thnkCode.slice(`"use strict";var `.length)}`;

  fs.writeFileSync(
    extensionsPath + "THNK.json",
    JSON.stringify(thnkExt, null, 2)
  );
}

{
  const p2pCode = fs.readFileSync(distPath + "p2p.global.js").toString();
  /** @type {{eventsFunctions: { name: string, events: { type: string, inlineCode: string }[] }[]}} */
  const p2pExt = JSON.parse(
    fs.readFileSync(extensionsPath + "THNK_P2P.json").toString()
  );

  p2pExt.eventsFunctions[0].events[0].inlineCode =
    `// Load THNK P2P Adapter (https://github.com/arthuro555/THNK)\n` +
    p2pCode.replace(`var THNK;`, "const THNK = window.THNK;");

  fs.writeFileSync(
    extensionsPath + "THNK_P2P.json",
    JSON.stringify(p2pExt, null, 2)
  );
}
