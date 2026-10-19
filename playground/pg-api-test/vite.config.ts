import { defineConfig } from 'vite-plus';
import { voidPlugin } from 'void';

export default defineConfig({
  run: {
    tasks: {
      build: 'vp build',
    },
  },
  plugins: [voidPlugin()],
});
