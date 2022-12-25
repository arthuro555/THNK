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

  thnkExt.eventsFunctions[0].events[0].inlineCode = `}// Load THNK library (https://github.com/arthuro555/THNK)
window.${thnkCode.slice(`"use strict";var `.length)}{`;

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
    p2pCode.replace(
      `var THNK;`,
      "if(!window.THNK)window.THNK={};let THNK=window.THNK;"
    );

  fs.writeFileSync(
    extensionsPath + "THNK_P2P.json",
    JSON.stringify(p2pExt, null, 2)
  );
}

{
  const geckosServerCode = fs
    .readFileSync(distPath + "geckos-server.js")
    .toString();
  /** @type {{eventsFunctions: { name: string, events: { type: string, inlineCode: string }[] }[]}} */
  const geckosServerExt = JSON.parse(
    fs.readFileSync(extensionsPath + "THNK_GeckosServer.json").toString()
  );

  geckosServerExt.eventsFunctions[0].events[0].inlineCode =
    `// Load THNK Geckos Server Adapter (https://github.com/arthuro555/THNK)\n` +
    geckosServerCode;

  fs.writeFileSync(
    extensionsPath + "THNK_GeckosServer.json",
    JSON.stringify(geckosServerExt, null, 2)
  );
}

{
  const geckosClientCode = fs
    .readFileSync(distPath + "geckos-client.global.js")
    .toString();
  /** @type {{eventsFunctions: { name: string, events: { type: string, inlineCode: string }[] }[]}} */
  const geckosClientExt = JSON.parse(
    fs.readFileSync(extensionsPath + "THNK_GeckosClient.json").toString()
  );

  geckosClientExt.eventsFunctions[0].events[0].inlineCode =
    `// Load THNK Geckos Client Adapter (https://github.com/arthuro555/THNK)\n` +
    geckosClientCode;

  fs.writeFileSync(
    extensionsPath + "THNK_GeckosClient.json",
    JSON.stringify(geckosClientExt, null, 2)
  );
}

{
  const extensionFile = extensionsPath + "THNK_Local.json";
  const localCode = fs.readFileSync(distPath + "local.global.js").toString();
  /** @type {{eventsFunctions: { name: string, events: { type: string, inlineCode: string }[] }[]}} */
  const localExt = JSON.parse(fs.readFileSync(extensionFile).toString());

  localExt.eventsFunctions[0].events[0].inlineCode =
    `// Load THNK Local Adapter (https://github.com/arthuro555/THNK)\n` +
    localCode.replace(
      `var THNK;`,
      "if(!window.THNK)window.THNK={};let THNK=window.THNK;"
    );

  fs.writeFileSync(extensionFile, JSON.stringify(localExt, null, 2));
}
