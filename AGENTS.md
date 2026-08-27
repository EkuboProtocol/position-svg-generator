# AGENTS.md

## Complexity Policy
- Run `npm run lint` from the repo root before considering a change done, and
  `npm run lint` inside `packages/demo-app` for the app. CI runs both on every push
  and pull request.
- The rule is ESLint's `complexity`, capped at 10 per function.
- The root config skips `packages/demo-app`, which has its own ESLint config with its
  own rule set — the complexity rule is added there instead of duplicated, so the
  app's inline disable directives keep resolving against the config that defines
  those rules.
- Prefer splitting a function over adding `// eslint-disable-next-line complexity`.
- `packages/position-svg-generator` has snapshot tests over the rendered SVG. Run
  `npm test` there after any refactor: the output is expected to be byte-identical.
