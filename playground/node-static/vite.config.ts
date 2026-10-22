import { voidReact } from '@void/react/plugin';
import { defineConfig } from 'vite-plus';
import { voidPlugin } from 'void';

export default defineConfig({
  run: {
    tasks: {
      // The prerendered pages embed `process.versions.node`, so the build depends on the Node.js
      // version, which `.node-version` pins. Inputs are inferred as usual, plus that file.
      build: {
        command: 'vp build',
        cache: { input: [{ auto: true }, { pattern: '.node-version', base: 'workspace' }] },
      },
    },
  },
  plugins: [voidPlugin(), voidReact()],
});
