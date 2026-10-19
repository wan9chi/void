import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: 'vp run build:pack && node scripts/build-runtime.mjs',
        // The dispatch Worker bundles `@void/isr/runtime` from the isr package's build output.
        dependsOn: ['@void/isr#build'],
        cache: {
          // The runtime manifest records VOID_PLATFORM_SOURCE_REVISION or the Git revision.
          env: ['VOID_PLATFORM_SOURCE_REVISION'],
          input: [
            { auto: true },
            { pattern: '.git/HEAD', base: 'workspace' },
            { pattern: '.git/refs/**', base: 'workspace' },
          ],
        },
      },
      // A separate task, so a new Git revision doesn't rerun the pack.
      'build:pack': 'vp pack',
    },
  },
  pack: {
    entry: [
      'src/index.ts',
      'src/installer.ts',
      'src/email-protocol.ts',
      'src/plans.ts',
      'src/browser-page.ts',
    ],
    format: 'esm',
    dts: true,
    clean: true,
  },
});
