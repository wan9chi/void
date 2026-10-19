import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';
import { voidPlugin } from 'void';

export default defineConfig({
  run: {
    tasks: {
      build: 'vp build',
    },
  },
  plugins: [react(), voidPlugin()],
});
