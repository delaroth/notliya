const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

// Search across multiple root locations (local dev, Vercel Lambda /var/task, process.cwd)
function resolveFile(cleanPath) {
  const possibleBases = [
    __dirname,
    process.cwd(),
    path.resolve(__dirname, '.'),
    '/var/task'
  ];

  for (const base of possibleBases) {
    if (!base) continue;
    try {
      const full = path.normalize(path.join(base, cleanPath));
      if (fs.existsSync(full) && fs.statSync(full).isFile()) {
        return full;
      }
    } catch (e) {}
  }
  return null;
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  // API router for location tracking & notifications
  if (reqPath === '/api/track' || reqPath.startsWith('/api/track/')) {
    try {
      const trackHandler = require('./api/track.js');
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        req.body = body;
        trackHandler(req, res);
      });
      return;
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
      return;
    }
  }

  // Normalize root path to index.html
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Attempt to resolve file on disk
  const filePath = resolveFile(reqPath);

  if (filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Set caching headers: immutable for images, immediate revalidate for css/js
    const isImmutable = reqPath.startsWith('/images/') || reqPath.startsWith('/audio/');
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': isImmutable ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    return;
  }

  // Fallback for CSS if disk lookup fails in Lambda
  if (reqPath.endsWith('.css')) {
    const candidateCss = [
      path.join(__dirname, 'css', 'style.css'),
      path.join(process.cwd(), 'css', 'style.css'),
      path.join('/var/task', 'css', 'style.css')
    ];
    for (const c of candidateCss) {
      try {
        if (fs.existsSync(c)) {
          res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
          res.end(fs.readFileSync(c, 'utf8'));
          return;
        }
      } catch(e) {}
    }
  }

  // Fallback for JS if disk lookup fails in Lambda
  if (reqPath.endsWith('app.js')) {
    const candidateJs = [
      path.join(__dirname, 'js', 'app.js'),
      path.join(process.cwd(), 'js', 'app.js'),
      path.join('/var/task', 'js', 'app.js')
    ];
    for (const c of candidateJs) {
      try {
        if (fs.existsSync(c)) {
          res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
          res.end(fs.readFileSync(c, 'utf8'));
          return;
        }
      } catch(e) {}
    }
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>404 Not Found</h1><p>The page or asset does not exist.</p>');
});

server.listen(PORT, () => {
  console.log(`\n✨ @not.liya Website server running at: http://localhost:${PORT}\n`);
});

// Export server for Vercel Serverless Function runtime compatibility
module.exports = server;
