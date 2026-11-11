// Temporary change to verify read-only remote caching in pull requests.
import { defineHandler } from 'void';

export const GET = defineHandler(() => {
  return { message: 'Hello from Void!', timestamp: Date.now() };
});
