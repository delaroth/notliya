const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// --------------------------------------------------------------------------
// Preload all critical assets into memory
// Explicit path.join(__dirname, ...) calls tell Vercel's Node File Trace (NFT)
// to automatically bundle these files into the serverless deployment.
// --------------------------------------------------------------------------
let indexHtml = '';
let cssContent = '';
let jsAppContent = '';
let jsDataContent = '';

try {
  indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
} catch (e) {
  console.error('[LOAD ERROR] index.html:', e.message);
}

try {
  cssContent = fs.readFileSync(path.join(__dirname, 'css', 'style.css'), 'utf8');
} catch (e) {
  console.error('[LOAD ERROR] css/style.css:', e.message);
}

try {
  jsAppContent = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');
} catch (e) {
  console.error('[LOAD ERROR] js/app.js:', e.message);
}

try {
  jsDataContent = fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8');
} catch (e) {
  console.error('[LOAD ERROR] js/data.js:', e.message);
}

// Preload Images Cache
const imagesCache = {};
const imageList = [
  'avatar.jpg',
  'art/balcony.jpg',
  'art/bedrot.jpg',
  'art/coffee.jpg',
  'art/pencil.jpg',
  'art/portrait.jpg',
  'art/protein.jpg',
  'post_1_DD7n-KhIptn.jpg',
  'post_2_DDkS_eUIv9t.jpg',
  'post_3_Dc1QeIQCach.jpg',
  'post_4_DcwHOeJiqKg.jpg',
  'post_5_DSQBX0kgnMB.jpg',
  'post_6_DR2KOUtAh0b.jpg',
  'post_7_DRzRYB3At6n.jpg',
  'post_8_DRzE3nygvmH.jpg',
  'post_9_DRxU2idgsJU.jpg',
  'post_10_DRxB_56AqXB.jpg',
  'post_11_DRwvLwlE1zb.jpg',
  'post_12_DRchG3kgm_I.jpg'
];

imageList.forEach(imgRel => {
  try {
    const full = path.join(__dirname, 'images', imgRel);
    if (fs.existsSync(full)) {
      imagesCache['/images/' + imgRel] = fs.readFileSync(full);
    }
  } catch (e) {}
});

// --------------------------------------------------------------------------
// Master Request Handler
// --------------------------------------------------------------------------
function requestHandler(req, res) {
  let reqPath = req.url.split('?')[0];

  // 1. API: Geolocation tracking & alerts
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

  // 2. HTML: Root index
  if (reqPath === '/' || reqPath === '' || reqPath === '/index.html') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(indexHtml);
    return;
  }

  // 3. CSS: Style sheets
  if (reqPath === '/css/style.css' || reqPath.endsWith('.css')) {
    res.writeHead(200, {
      'Content-Type': 'text/css; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(cssContent);
    return;
  }

  // 4. JS: Main Application
  if (reqPath === '/js/app.js' || reqPath.endsWith('/app.js')) {
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(jsAppContent);
    return;
  }

  // 5. JS: Content Data
  if (reqPath === '/js/data.js' || reqPath.endsWith('/data.js')) {
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(jsDataContent);
    return;
  }

  // 6. Preloaded Images
  if (imagesCache[reqPath]) {
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(imagesCache[reqPath]);
    return;
  }

  // 7. Dynamic File System Fallback
  const candidateBases = [__dirname, process.cwd(), '/var/task'];
  for (const base of candidateBases) {
    try {
      const full = path.normalize(path.join(base, reqPath));
      if (fs.existsSync(full) && fs.statSync(full).isFile()) {
        const ext = path.extname(full).toLowerCase();
        const mime = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.webp': 'image/webp',
          '.svg': 'image/svg+xml',
          '.json': 'application/json; charset=utf-8',
          '.txt': 'text/plain; charset=utf-8'
        }[ext] || 'application/octet-stream';

        res.writeHead(200, {
          'Content-Type': mime,
          'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(full).pipe(res);
        return;
      }
    } catch (e) {}
  }

  // 8. 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>404 Not Found</h1><p>The page or asset does not exist.</p>');
}

// Standalone mode for local development
if (require.main === module || !process.env.VERCEL) {
  const server = http.createServer(requestHandler);
  server.listen(PORT, () => {
    console.log(`\n✨ @not.liya Website server running at: http://localhost:${PORT}\n`);
  });
}

// Vercel Serverless Function entrypoint
module.exports = requestHandler;
