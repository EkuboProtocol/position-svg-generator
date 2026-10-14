# AGENTS.md

## Checks

Run these from the repository root before considering a change done. CI runs all
of them on every pull request and on every push to `main`.

| Command                                                     | What it does                                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run fix`                                               | Formats with oxfmt. `npm run format:check` is the CI check.                                |
| `npm run lint`                                              | oxlint, including type-aware rules, over the whole repository.                             |
| `npm run check-ts`                                          | `tsc -b` with TypeScript 7 over every project (see below).                                 |
| `npm test`                                                  | Snapshot tests over the rendered SVG in `packages/position-svg-generator`.                 |
| `npm run build --workspace packages/position-svg-generator` | Builds the published library with tsup (which uses TypeScript 5 to emit the declarations). |
| `npm run build --workspace packages/demo-app`               | Type-checks and builds the demo app.                                                       |

- The TypeScript projects are referenced from the root `tsconfig.json`:
  `packages/position-svg-generator/tsconfig.json` (the library and its tests),
  `packages/demo-app/tsconfig.app.json`, `packages/demo-app/tsconfig.node.json` and
  `tsconfig.scripts.json` (`scripts`). TypeScript 7 is installed as
  `@typescript/native` for checks; the library package keeps `typescript` 5 only
  because tsup's declaration build needs the JavaScript compiler API.
- `packages/position-svg-generator/snapshots` is the expected SVG output,
  byte-for-byte. Run `npm test` after any refactor of the library, and never
  reformat the snapshots.

## Lint rules

- Rules are in `.oxlintrc.json`. The whole repository gets `complexity` (capped at
  10 per function) and the type-aware rules from typescript-eslint's
  recommended-type-checked set that catch real defects (`no-floating-promises`,
  `no-misused-promises`, `await-thenable`, `no-base-to-string`,
  `restrict-template-expressions` and the rest, except `no-unsafe-*`,
  `unbound-method` and `require-await`). `packages/demo-app` additionally gets
  ESLint's recommended rules, typescript-eslint's recommended rules and the React
  hooks and refresh rules, as its old ESLint config did, with warnings promoted to
  errors.
- Existing violations are recorded per file and per rule in
  `lint-suppressions.json`. That file is a ratchet, not an amnesty: a file may not
  gain a violation of a rule, even one it already has entries for, so a _new_
  violation fails the build. Do not raise a count to make the build pass.
- If you fix a recorded violation the lint run reports an outdated suppression. That
  is the ratchet working: run `npm run lint:prune` and commit the tightened file
  alongside your change. `npm run lint -- --suppress-rule=<code>` records every
  current violation of a rule and is only for introducing a new rule.
- Prefer splitting a function over adding `// eslint-disable-next-line complexity`.
  If a disable really is the right call, put the reason on the line. An unused
  disable directive is itself an error.
