import { mkdir, copyFile, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const target = path.join(root, 'dist');
const source = path.join(root, 'proposal');
const extensions = new Set(['.html', '.css', '.js', '.mjs', '.svg', '.json', '.txt']);
// dist is derived output; source and user documents are never deleted.
await rm(target, { recursive: true, force: true });
async function copyPublic(directory, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const from = path.join(directory, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) await copyPublic(from, to);
    else if (entry.isFile() && extensions.has(path.extname(entry.name))) await copyFile(from, to);
  }
}
await copyPublic(source, target);
console.log('Build ready: dist/');
