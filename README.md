# TypeScript Call Graph

This **CLI** will create an interactive graph of all the functions and their calls in the TypeScript files you provide.

⚠️ this is a work in progress 🚧

## How to use

```sh
npm install -g typescript-call-graph
```

Inside any directory, run:

```sh
tcg
```

It will remind you how to use the CLI: you need to provide specific files, or globs (wildcard paths):

```sh
tcg myFile.ts folder/* anotherFolder/**/*
```

## Developing

Clone repository. Edit `index.ts` and/or `extract.ts` and run `npm start` to build changes, `npm test` to run CLI against files in this repository.

Suggestions or PRs for how to improve this CLI are very welcome 	🙇

### Thank you

- [Tutorial](https://convincedcoder.com/2019/01/19/Processing-TypeScript-using-TypeScript/) and code for processing TypeScript (AST)
- [Tutorial](https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs) for creating a *CLI*
- [TS-Call-Graph](https://github.com/Deskbot/TS-Call-Graph) for inspiration