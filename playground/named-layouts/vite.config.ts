import { voidMarkdown } from '@void/md/plugin';
import { voidReact } from '@void/react/plugin';
import { defineConfig } from 'vite-plus';
import { voidPlugin } from 'void';

export default defineConfig({
  run: {
    tasks: {
      build: 'vp build',
    },
  },
  plugins: [voidPlugin(), voidReact(), voidMarkdown()],
});
