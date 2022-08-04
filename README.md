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

Run `yarn build` to execute the full build pipeline. You can also build individual parts with the other build scripts in package.json:

Building THNK with `yarn build:thnk` and the adapters with `yarn build:adapters` outputs a bundle to the `dist` folder. `yarn build:extensions` automatically inserts its contents into the THNK extensions in `extensions`.

To test your changes, import the extension with your changes into GDevelop. If you make changes to the extension itself, don't forget to export it back to the `extensions` folder.

### Submitting changes

Before submitting a PR, make sure that your code builds & fully functions within the extension, and that it passes both typescript & jest tests.
Run `yarn ts && yarn test` to run both checks.
Make sure the extensions in `extensions` are properly generated with the latest version of your code. In case of doubts, run `yarn build` again before committing.

### Understanding the architecture

There are a few main folders that you need to keep in mind while contributing:

- `protocol` - Contains FlatBuffers protocol definitions. Anything that transits between the server and client **must** be defined through a FlatBuffer `ServerMessage` or `ClientMessage`, depenfing on which side will be sending that message.
  - After changing, you need to run `yarn generate-protocol` to regenerate the source code from the FlatBuffers files before using it in `code`
- `code/server` - All of the server-only code.
- `code/client` - All of the client-only code.
- `code/adapters` - All the different adapters implementations. Each file contains a server and client adapter for a single backend.
- `extensions` - Contains the GDevelop extensions files. While most of the mportant code is in `code`, the extensions themselves need to be modified to add actions, conditions, etc. You also need them to actually use the built THNK code.
