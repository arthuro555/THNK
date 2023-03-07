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

This repository is a monorepo. We have multiple separated projects within the `code` directory:

- `client` is all the client-side extension code
- `server` is all the server-side extension code
- `relay` is the source for the THNK Relay (for the THNK Rooms adapter)
- etc.

You can find the website & doocumentation at the `docs` folder. You can simply create documentation pages by creating markdown files in `docs/docs`.


