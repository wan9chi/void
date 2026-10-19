import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      build: 'vp pack',
    },
  },
  pack: {
    entry: ['src/plugin.ts'],
    format: 'esm',
    dts: true,
    clean: true,
    deps: {
      resolveDepSubpath: true,
      neverBundle: ['svelte', 'svelte/*', 'vite', 'void', 'void/*', '@sveltejs/vite-plugin-svelte'],
    },
  },
});
