import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: 'astro build',
        // Prerendering starts Miniflare, which downloads Cloudflare's `Request.cf` data. Behind a
        // TLS-intercepting proxy, that needs the proxy's CA certificates.
        cache: { untrackedEnv: ['NODE_EXTRA_CA_CERTS'] },
      },
    },
  },
});
