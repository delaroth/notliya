// Vercel Serverless Function & Node.js Universal Handler
// Detects whether visitor is in Israel vs Bulgaria and forwards alerts to Levi

module.exports = async function handler(req, res) {
  // Helper for universal JSON responses (works in Vercel & standard Node http)
  function sendJson(statusCode, data) {
    if (typeof res.status === 'function') {
      return res.status(statusCode).json(data);
    }
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(200).end();
    res.writeHead(200);
    return res.end();
  }

  const country = (req.headers['x-vercel-ip-country'] || '').toUpperCase();
  const city = req.headers['x-vercel-ip-city'] || '';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';

  const isIsrael = country === 'IL';
  const isBulgaria = country === 'BG';

  if (req.method === 'GET') {
    return sendJson(200, {
      country,
      city: decodeURIComponent(city),
      region,
      isIsrael,
      isBulgaria,
      timestamp: Date.now()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const eventType = body.event || 'FIRST_VIEW_IL';

      // Forward alert to Levi's ntfy.sh topic
      const ntfyTopic = 'notliya-live-tracker-levi';
      const cityName = decodeURIComponent(city) || body.city || 'ישראל';
      const timeStr = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });

      console.log(`[ALERT] ${eventType} from ${country || 'CLIENT'} - ${cityName} (IP: ${ip})`);

      // Broadcast notification to Levi's phone
      let alertSent = false;
      try {
        const ntfyResponse = await fetch(`https://ntfy.sh/${ntfyTopic}`, {
          method: 'POST',
          headers: {
            'Title': 'Liya opened notliya.com in Israel!',
            'Priority': 'urgent',
            'Tags': 'tada,star,israel,sparkles',
            'Click': 'https://notliya.com?creator=true'
          },
          body: JSON.stringify({
            event: eventType,
            country: country || 'IL',
            city: cityName,
            time: timeStr,
            timestamp: Date.now(),
            userAgent: userAgent.slice(0, 120)
          })
        });
        alertSent = ntfyResponse.ok;
      } catch (postErr) {
        console.error('[NTFY POST ERROR]', postErr.message);
      }

      return sendJson(200, {
        success: true,
        alertSent,
        isIsrael,
        isBulgaria,
        country,
        city: cityName,
        time: timeStr
      });
    } catch (err) {
      console.error('[ALERT ERROR]', err);
      return sendJson(500, { success: false, error: err.message });
    }
  }

  return sendJson(405, { error: 'Method Not Allowed' });
};
