import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      // Records the source revision in the runtime manifest. It isn't cached, so a new revision
      // reruns only this step, and it gets the full environment, including
      // VOID_PLATFORM_SOURCE_REVISION.
      build: {
        command: 'node scripts/stamp-source-revision.mjs',
        dependsOn: ['build:runtime'],
        cache: false,
      },
      'build:runtime': {
        command: 'node scripts/build-runtime.mjs',
        // The runtime build imports the pack's output, and the dispatch Worker bundles
        // `@void/isr/runtime` from the isr package's build output.
        dependsOn: ['build:pack', '@void/isr#build'],
      },
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
