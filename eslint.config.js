import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    typescript: true,
    stylistic: false,
    formatters: false,
    ignores: ["**/migrations/*"],
  },
  {
    rules: {
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": "off",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
      "style/*": "off",
      "stylistic/*": "off",
      "unicorn/*": "off",
      "@typescript-eslint/*": "off",
      "test/prefer-lowercase-title": "off",
    },
  },
);
