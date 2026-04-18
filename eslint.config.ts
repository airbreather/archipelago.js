import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";
import { jsdoc } from "eslint-plugin-jsdoc";
import packageJson from "eslint-plugin-package-json";
import importSort from "eslint-plugin-simple-import-sort";
import tslint from "typescript-eslint";

export default defineConfig(
    {
        ignores: ["node_modules", "dist", "docs", "coverage"],
    },
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            tslint.configs.recommendedTypeChecked,
            tslint.configs.stylisticTypeChecked,
            stylistic.configs.customize({
                arrowParens: true,
                braceStyle: "1tbs",
                indent: 4,
                quotes: "double",
                semi: true,
            }),
            jsdoc({
                config: "flat/recommended-typescript",
                rules: {
                    "jsdoc/check-tag-names": ["warn", { definedTags: ["remarks", "category", "experimental"] }],
                    "jsdoc/require-description": "warn",
                    "jsdoc/require-template": "warn",
                    "jsdoc/require-returns": "off",
                    "jsdoc/require-throws": "warn",
                    "jsdoc/require-throws-type": "off",
                    "jsdoc/sort-tags": "warn",
                    "jsdoc/valid-types": "off",
                },
            }),
        ],
        plugins: {
            "simple-import-sort": importSort,
        },
        rules: {
            "@stylistic/operator-linebreak": ["error", "after", {
                overrides: {
                    "|": "before",
                },
            }],
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        files: ["package.json"],
        extends: [
            packageJson.configs.recommended,
            packageJson.configs.stylistic,
        ],
    },
    {
        files: ["test/**/*.ts"],
        extends: [
            vitest.configs.recommended,
        ],
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
);
