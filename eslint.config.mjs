import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/**", "coverage/**", "Support/**"],
    },
    js.configs.recommended,
    {
        // Every source file is a classic <script>/vm script sharing one global
        // scope: classes (Character, CharacterGenerator, Dice, Tester), the
        // constants (PHYSICAL_ABILITIES, ALL_ABILITIES) and the data tables
        // (Data*.js) are all declared in *other* files, so per-file analysis
        // cannot resolve them. Disable no-undef for that reason.
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "script",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-undef": "off",
            // Top-level declarations are the shared cross-file API (data table
            // constants, Tester.* test registrations) and are never "used" in
            // the file that defines them — only flag unused locals inside
            // functions. Function params are intentionally loose (callback /
            // optional-gen test style).
            "no-unused-vars": [
                "error",
                { vars: "local", args: "none", caughtErrors: "none" },
            ],
        },
    },
];
