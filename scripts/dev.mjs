import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
const defaultRoot = fileURLToPath(new URL('../proposal/', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
export function resolveAsset(requestPath, root = defaultRoot) {
  let pathname;
  try { pathname = decodeURIComponent(requestPath.split('?')[0]); } catch { return null; }
  if (pathname.includes('\\') || pathname.includes('\0')) return null;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.some(segment => segment.startsWith('.'))) return null;
  const filename = pathname === '/' ? 'index.html' : segments.join('/');
  if (path.extname(filename) === '.txt' && filename !== 'lab/vendor/PLOTLY-LICENSE.txt') return null;
  if (!mime[path.extname(filename)]) return null;
  const resolved = path.resolve(root, filename);
  if (!resolved.startsWith(path.resolve(root) + path.sep)) return null;
  return { file: resolved, type: mime[path.extname(filename)] };
}
export function createPortfolioServer(root = defaultRoot) {
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    const asset = resolveAsset(request.url, root);
    if (!asset) { response.writeHead(404); response.end('Not found'); return; }
    try {
      const physical = await realpath(asset.file);
      const physicalRoot = await realpath(root);
      if (!physical.startsWith(physicalRoot + path.sep)) { response.writeHead(404); response.end('Not found'); return; }
      const data = await readFile(physical);
      response.writeHead(200, { 'Content-Type': asset.type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch { response.writeHead(404); response.end('Not found'); }
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 4173);
  const server = createPortfolioServer();
  server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `Porta ${port} occupata: chiudi il server già avviato oppure imposta PORT.` : error.message); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Portfolio ready: http://127.0.0.1:${port}`));
}
