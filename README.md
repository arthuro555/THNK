# 🤔 THNK

![The THNK Framework Banner](./banner.png "He do be thonkin")

An authoritative multiplayer games framework for the FLOSS engine GDevelop.

## Links

- [🌐 Website](https://thnk.cloud/)
- [📰 Introduction blog post](https://bit.ly/thnk-introduction)
- [📅 Roadmap](https://bit.ly/thnk-roadmap)
- [💖 Support the project](https://ko-fi.com/arthuro555)
- [📄 Documentation](https://thnk.cloud/docs/getting-started/)

## Contributors

Thanks to all the contributors to THNK! Here is the full list of all contributors of all kinds to the project:

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://ko-fi.com/arthuro555"><img src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png?s=100" width="100px;" alt="Ko-fi contributors"/><br /><sub><b>Ko-fi contributors</b></sub></a><br /><a href="#financial" title="Financial">💵</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/arthuro555"><img src="https://avatars.githubusercontent.com/u/19349038?v=4?s=100" width="100px;" alt="Arthur Pacaud"/><br /><sub><b>Arthur Pacaud</b></sub></a><br /><a href="#maintenance-arthuro555" title="Maintenance">🚧</a> <a href="https://github.com/arthuro555/THNK/commits?author=arthuro555" title="Code">💻</a> <a href="https://github.com/arthuro555/THNK/commits?author=arthuro555" title="Documentation">📖</a> <a href="#blog-arthuro555" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MyNameIsRinax"><img src="https://avatars.githubusercontent.com/u/40387061?v=4?s=100" width="100px;" alt="Rinax"/><br /><sub><b>Rinax</b></sub></a><br /><a href="https://github.com/arthuro555/THNK/issues?q=author%3AMyNameIsRinax" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Midhil457"><img src="https://avatars.githubusercontent.com/u/73597906?v=4?s=100" width="100px;" alt="Leo_Red"/><br /><sub><b>Leo_Red</b></sub></a><br /><a href="#design-Midhil457" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Entr0py404"><img src="https://avatars.githubusercontent.com/u/75917656?v=4?s=100" width="100px;" alt="Tim"/><br /><sub><b>Tim</b></sub></a><br /><a href="https://github.com/arthuro555/THNK/commits?author=Entr0py404" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

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
- `code` - Contains all the THNK extension's typescript code. All imports are relative to this directory: `import "server";` would import `code/server`.
  - `server` - All the server-relevant code.
  - `client` - All the client-relevant code.
  - `adapters` - Contains the different adapters' implementations.
  - `types` - Useful type definitions: `global.d.ts` defines the `THNK` global namespace and `thnk.d.ts` overrides GDevelop type definitions with the additional properties THNK adds.
  - `utils` - Misc. Code that is relevant for both server and client.
