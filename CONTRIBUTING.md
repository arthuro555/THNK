# Contributing to THNK

Thanks for your interest in contributing to THNK! We value them a lot, and hope to see you stick around :)

Although THNK is a program, non-code contributions are very welcome too! If you do not feel confortable writing code, you can also contribute to the project by:

- Creating and sharing an example
- Publishing video tutorials
- Writing a blog post about THNK
- Answering questions of fellow community members
- Donating to the project
- Advocating for THNK
- Giving honest feedback in issues
- Testing changes in pull requests
- Hunting for bugs
- Code-reviewing PRs
- Sending supportive messages to all contributors :)
- Staring the repository

With that said, let's look at how to contribute to THNK!

## Issues - Making the case for your feature

Before adding a feature to THNK, an issue must be created to discuss it. It'd be a shame to spend hours implementing a feature to see the community rejecting the change! :(

Make sure to include useful information to allow everyone to understand the full extent of your feature:

- What does the feature do exactly?
- What are uses for it?
  - Are those uses covered by another feature already?
- How do you imagine its usage (API)? (If applicable and possible, include screenshots of mockup GDevelop events)
  - Do you have ideas for alternative usages?
- Is your feature useful for a plethora of games, or does it cover a rather niche use-case?
- What amount of work do you expect to be necessary for the feature to be implemented?
- Is there another feature to consider as an alternative to this one?

You can start implementing the feature whenever you wish, but we recommend you do so once a majority of the contributors & community have reached a consensus about the feature and its API being well designed.

## Coding - Navigating the repository

You have found an issue to implement, or want to generally experiment with the source code? Great!

This repository is a monorepo. We have multiple separated TypeScript projects within the `code` directory:

- `client` is the client-side extension code
- `server` is the server-side extension code
- `adapters` is the source code for the individual adapters
- `relay` is the source for the THNK Relay (for the THNK Rooms adapter)
- etc.

You can find the website & documentation at the `docs` folder. It is a Docusaurus project. You can create documentation pages by simply writing markdown files in `docs/docs`.

The `protocol` folder contains FlatBuffer files, used to generate the binary protocol used for communication between THNK clients and servers. The generated code for reading and writing messages is generated into `code/t-h-n-k`.

The GDevelop extensions are contained in `extensions`. You can install the latest version of THNK from there.

## Building - Test your changes

You will need the following tools to build THNK:
- NodeJS (Preferably v16 LTS)
- Yarn
- A system that can run FlatBuffer's `flatc`

When you first download the repository, you will need to install dependencies by running `yarn`. Remember to run it again regularely to ensure you are using the same version and dependencies as everyone else!

To launch a full build of THNK, run `yarn build`. You can also run the build step-by-step:

- Run `yarn generate-protocol` to run `flatc` and compile the FlatBuffers binary protocol library
- Run `yarn build:thnk` to generate the bundle the THNK Core library
- Run `yarn build:adapters` to transpile the Adapter libraries
- Run `yarn build:extensions` to inject the THNK Core and Adapter libraries builds into the extension files.

After building, reimport the THNK extensions in GDevelop from your `extensions` folder to test them out.

## Testing - Prepare your code for submission

Before making a commit, you should verify your code is not broken by checking for TypeScript errors (`yarn tsc`) and running the unit tests (`yarn test`). If those do not pass, your contribution is likely breaking something!

Additionally, run `yarn format` and `yarn build` before committing. This ensures the code stays readable and that the extensions files are up-to-date with the latest version of your code.

Once you tested your changes and passed these steps, you are ready to submit a pull request!

## Pull Request - Submit your contribution

Once your contribution is ready (or if it is not but you wish to get early feedback), you can submit it as a pull request. We encourage you to:

- Use multiple small commits instead of a single big one, both for you to create yourself checkpoints and for us to see the process and logical units that constitute your contribution for reviewing purposes.
- Never force-push or rewrite git history, as this makes checking out your code harder for us.

If your pull request is related to an issue, link it by writing `Closes #<Issue Number>.` at the start of the PR description.

Describe in the body of your PR any issues or uncertainties you have about your implementation. Explain what you did to test the feature, and if there remains tasks/tests to be done before merging.

You might to modify a few things before we accept your PR, but do not be disheartened! Your PR will be eventually merged (unless you really messed up the code to an unredeemable extent 😅). We may sound nitpicky at times, but that is necessary to keep the code understandable for other future contributors, and the project production-ready.

---

Thank you again for your interest in THNK, we are excited to see your contributions!
