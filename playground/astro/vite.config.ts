import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      build: {
        // Prerendering starts Miniflare, which downloads Cloudflare's `Request.cf` data. Trusting the
        // system's CA store lets that work behind a TLS-intercepting proxy whose CA is installed there.
        command: 'NODE_USE_SYSTEM_CA=1 astro build',
      },
    },
  },
});
