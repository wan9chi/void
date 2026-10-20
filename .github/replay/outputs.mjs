// Replay check: compare the outputs of the cached `vp run --cache build:all` with a fresh build.
//
//   node .github/replay/outputs.mjs snapshot <file>    hash build outputs into <file>
//   node .github/replay/outputs.mjs compare <cached> <fresh>
//
// Outputs are the files git doesn't track (ignored ones included) and tracked files the build
// modified, outside node_modules and .git. `compare` prints one `replay-verify:` line per path
// that differs, exists only after the cached build, or exists only after the fresh one.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const [command, ...args] = process.argv.slice(2);

function list(flags) {
  const out = execFileSync('git', ['ls-files', '-z', ...flags], { maxBuffer: 1 << 30 });
  return out.toString('utf8').split('\0').filter(Boolean);
}

if (command === 'snapshot') {
  const paths = new Set([
    ...list(['--others', '--exclude=node_modules', '--exclude=.git']),
    ...list(['--modified']),
  ]);
  const hashes = {};
  for (const path of [...paths].sort()) {
    try {
      hashes[path] = createHash('sha256').update(readFileSync(path)).digest('hex');
    } catch (error) {
      hashes[path] = `unreadable:${error.code}`;
    }
  }
  writeFileSync(args[0], JSON.stringify(hashes));
  console.log(`replay-verify: snapshot of ${Object.keys(hashes).length} files`);
} else if (command === 'compare') {
  const cached = JSON.parse(readFileSync(args[0], 'utf8'));
  const fresh = JSON.parse(readFileSync(args[1], 'utf8'));
  const counts = { differs: 0, 'only-cached': 0, 'only-fresh': 0 };
  for (const path of [...new Set([...Object.keys(cached), ...Object.keys(fresh)])].sort()) {
    const kind =
      !(path in fresh) ? 'only-cached' : !(path in cached) ? 'only-fresh' : cached[path] !== fresh[path] ? 'differs' : null;
    if (!kind) continue;
    counts[kind]++;
    console.log(`replay-verify: ${kind} ${path}`);
  }
  console.log(
    `replay-verify: done ${counts.differs} differ, ${counts['only-cached']} only cached, ${counts['only-fresh']} only fresh, ${Object.keys(fresh).length} files`,
  );
} else {
  console.error('Usage: outputs.mjs snapshot <file> | compare <cached> <fresh>');
  process.exit(2);
}
