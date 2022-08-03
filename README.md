# 🤔 THNK

An authoritative multiplayer games framework for the FLOSS engine GDevelop.

## Links

- [📰 Introduction blog post](https://bit.ly/thnk-introduction)
- [📅 Roadmap](https://bit.ly/thnk-roadmap)
- [💖 Support the project](https://ko-fi.com/arthuro555)

## Contributing

### Installing

To install all dependencies, run `yarn`. You may use `npm install`, but note that only a yarn lockfile will be provided and accepted in PRs.
If you have disabled postinstall scripts, run `yarn generate-protocol` to run the code generator on the flatbuffer files.

### Building

Run `yarn build` to execute the full build pipeline. You can also build individual parts with the other build scripts in package.json.

Building THNK outputs an `index.global.js` file in the `dist` folder. Import the THNK extension file in `extensions` into GDevelop, and in the `onFirstSceneLoaded` functions, replace the contents of the JS code block with the contents of `index.global.js`. At the beginning of the code block , replace `var THNK` with `window.THNK`. You now are running your custom build of THNK.

For the adapters, the process is similar. Each produce another file in `dist`, with code that can be copied to the `onFirstSceneLoaded` of their respective extensions. The difference lies within the fact that you need to rename the two references to THNK at the bottom at the file with `window.THNK`, **not the `var THNK` at the top of the file**.

### Testing

Before submitting a PR, make sure that your code passes both typescript and jest tests.
Run `yarn ts && yarn test` to run both checks.

### Understanding the architecture

There are a few main folders that you need to keep in mind while contributing:

- `protocol` - Contains FlatBuffers protocol definitions. Anything that transits between the server and client **must** be defined through a FlatBuffer `ServerMessage` or `ClientMessage`, depenfing on which side will be sending that message.
  - After changing, you need to run `yarn generate-protocol` to regenerate the source code from the FlatBuffers files before using it in `code`
- `code/server` - All of the server-only code.
- `code/client` - All of the client-only code.
- `code/adapters` - All the different adapters implementations. Each file contains a server and client adapter for a single backend.
- `extensions` - Contains the GDevelop extensions files. While most of the mportant code is in `code`, the extensions themselves need to be modified to add actions, conditions, etc. You also need them to actually use the THNK built code.
