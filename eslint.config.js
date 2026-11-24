import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

// Regla del proyecto: ningún archivo de más de 250 líneas (ver docs/adr/010).
const MAX_LINES = 250;

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'graphify-out', 'private', 'supabase/.temp'] },
  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { ecmaVersion: 2022, globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'max-lines': ['error', { max: MAX_LINES, skipBlankLines: false, skipComments: false }],
    },
  },
);
