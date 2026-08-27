import tsParser from "@typescript-eslint/parser";

// Complexity gate only. This is deliberately not a general-purpose lint setup:
// the single rule here is a guardrail against functions growing unreviewably
// branchy, and keeping the config to one rule means a failure is always
// actionable and never a style argument.
const rules = { complexity: ["error", 10] };

export default [
  {
    // demo-app has its own eslint.config.js with its own rule set; the complexity
    // rule is added there rather than duplicated here, so its inline disable
    // directives keep resolving against the config that defines those rules.
    ignores: ["node_modules/**", "dist/**", "build/**", "packages/demo-app/**"],
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    rules,
  },
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules,
  },
  {
    files: ["**/*.cjs"],
    languageOptions: { ecmaVersion: "latest", sourceType: "commonjs" },
    rules,
  },
];
