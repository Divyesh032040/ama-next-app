import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  next.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", // Ensures TypeScript support
      },
    },
    plugins: {
      "@typescript-eslint": ts, // ✅ Plugins should be an object, NOT an array
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];
