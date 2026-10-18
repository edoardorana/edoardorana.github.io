import { mkdir, copyFile, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const target = path.join(root, 'dist');
const source = path.join(root, 'proposal');
const extensions = new Set(['.html', '.css', '.js', '.mjs', '.svg']);
// dist is derived output; source and user documents are never deleted.
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
for (const entry of await readdir(source, { withFileTypes: true })) {
  if (entry.isFile() && extensions.has(path.extname(entry.name))) {
    await copyFile(path.join(source, entry.name), path.join(target, entry.name));
  }
}
console.log('Build ready: dist/');
