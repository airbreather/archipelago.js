import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';
import { jsdoc } from 'eslint-plugin-jsdoc';
import packageJson from 'eslint-plugin-package-json';
import importSort from 'eslint-plugin-simple-import-sort';
import tslint from 'typescript-eslint';

// strict-type-checked is a little too strict for a public project.
const typescriptRelaxations: Exclude<Parameters<typeof defineConfig>[0], unknown[]>['rules'] = {
	// the problems from boolean and number aren't in the same league as the others
	'@typescript-eslint/restrict-template-expressions': ['error', {
		allowBoolean: true,
		allowNumber: true,
	}],

	// at least for now, there are enough non-null assertions that it's easiest just to not jump through hoops.
	'@typescript-eslint/no-non-null-assertion': 'off',
};

export default defineConfig(
	{
		ignores: ['node_modules', 'dist', 'docs', 'coverage'],
	},
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			tslint.configs.strictTypeChecked,
			tslint.configs.stylisticTypeChecked,
			stylistic.configs.customize({
				arrowParens: true,
				braceStyle: '1tbs',
				indent: 'tab',
				quotes: 'single',
				semi: true,
			}),
			jsdoc({
				config: 'flat/recommended-typescript',
			}),
		],
		plugins: {
			'simple-import-sort': importSort,
		},
		rules: {
			'@stylistic/operator-linebreak': ['error', 'after', {
				overrides: {
					'?': 'before',
					':': 'before',
					'|': 'before',
					'&': 'before',
				},
			}],
			...typescriptRelaxations,
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},
	{
		files: ['packages/**/package.json'],
		extends: [
			packageJson.configs.recommended,
			packageJson.configs.stylistic,
		],
	},
	{
		files: ['test/**/*.ts'],
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
