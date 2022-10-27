# 🤔 THNK

An authoritative multiplayer games framework for the FLOSS engine GDevelop.

## Links

- [🌐 Website](https://thnk.arthuro555.com/)
- [📰 Introduction blog post](https://bit.ly/thnk-introduction)
- [📅 Roadmap](https://bit.ly/thnk-roadmap)
- [💖 Support the project](https://ko-fi.com/arthuro555)
- [📄 Documentation](https://thnk.arthuro555.com/docs/getting-started/)

## Contributing

### Installing

To install all dependencies, run `yarn`. You may use `npm`, but note that only a yarn lockfile will be provided and accepted in PRs.
If you have disabled postinstall scripts, run `yarn generate-protocol` to run the code generator on the flatbuffer files.

### Building

Run `yarn build` to execute the full build pipeline. You can also build individual parts with the other build scripts in package.json:

Building THNK with `yarn build:thnk` and the adapters with `yarn build:adapters` outputs a bundle to the `dist` folder. `yarn build:extensions` automatically inserts those into the THNK extensions in `extensions`.

To test your changes, import the extension with your changes into GDevelop. If you make changes to the extension itself, don't forget to export it back to the `extensions` folder.

### Submitting changes

Before submitting a PR, make sure that your code builds & fully functions within the extension, and that it passes both typescript & jest tests.
Run `yarn ts && yarn test` to run both checks.
Make sure the extensions in `extensions` are properly generated with the latest version of your code. In case of doubts, run `yarn build` again before committing.

### Understanding the file structure 

There are a few main folders that you need to keep in mind while contributing:

- `extensions` - Contains the GDevelop extensions files. While most of the important code is in `code`, the extensions themselves need to be modified to add actions, conditions, etc. You also need them to actually use the built THNK code.
- `protocol` - Contains FlatBuffers protocol definitions. Anything that transits between the server and client **must** be defined through a FlatBuffer `ServerMessage` or `ClientMessage`, depending on which side will be sending that message.
  - After changing a file there, you need to run `yarn generate-protocol` to run codegen for the FlatBuffers files before using the modified interfaces in `code`
- `types` - GDJS type definitions. They were generated automatically with TSC.
- `docs` - The docusaurus website and documentation.
- `scripts` - A few scripts used for building.
- `code` - Contains all of the THNK extension's typescript code. All imports are relative to this directory: `import "server";` would import `code/server`.
  - `server` - All of the server-relevant code.
  - `client` - All of the client-relevant code.
  - `adapters` - Contains the different adapters' implementations. 
  - `types` - Useful type definitions: `global.d.ts` defines the `THNK` global namespace and `thnk.d.ts` overrides GDevelop type definitions with the additional properties THNK adds.
  - `utils` - Misc. code that is relevant for both server and client.
