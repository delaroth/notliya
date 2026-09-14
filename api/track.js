// Vercel Serverless Function & Node.js Universal Handler
// Advanced Visitor Telemetry, Dwell Time, Scroll Depth & Behavior Tracker

module.exports = async function handler(req, res) {
  function sendJson(statusCode, data) {
    if (typeof res.status === 'function') {
      return res.status(statusCode).json(data);
    }
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
  }

  // Enable CORS
  if (typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(200).end();
    res.writeHead(200);
    return res.end();
  }

  const country = (req.headers['x-vercel-ip-country'] || '').toUpperCase();
  const rawCity = req.headers['x-vercel-ip-city'] || '';
  const city = rawCity ? decodeURIComponent(rawCity) : '';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';

  const isIsrael = country === 'IL';
  const isBulgaria = country === 'BG';

  if (req.method === 'GET') {
    let posthogKey = String(process.env.POSTHOG_API_KEY || '').trim();
    if ((posthogKey.startsWith('"') && posthogKey.endsWith('"')) || (posthogKey.startsWith("'") && posthogKey.endsWith("'"))) {
      posthogKey = posthogKey.slice(1, -1).trim();
    }
    const posthogReady = posthogKey.startsWith('phc_');
    return sendJson(200, {
      country,
      city,
      region,
      isIsrael,
      isBulgaria,
      timestamp: Date.now(),
      posthogKey: posthogReady ? posthogKey : '',
      posthogStatus: posthogReady ? 'ready' : (posthogKey ? 'bad_prefix' : 'missing')
    });
  }

  if (req.method === 'POST') {
    try {
      let body = {};
      if (typeof req.body === 'string') {
        try { body = JSON.parse(req.body); } catch(e) {}
      } else if (req.body && typeof req.body === 'object') {
        body = req.body;
      }

      const eventType = body.event || 'FIRST_VIEW_IL';
      const cityName = body.city || city || 'ישראל';
      const timeStr = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
      const durationStr = body.durationFormatted || (body.durationSec ? `${body.durationSec} שניות` : '');
      const device = userAgent.includes('iPhone') ? 'iPhone' : (userAgent.includes('Android') ? 'Android' : 'Desktop');
      const isInstagramBrowser = userAgent.includes('Instagram');
      const browserStr = isInstagramBrowser ? 'אינסטגרם' : (userAgent.includes('Safari') ? 'Safari' : 'Chrome');

      console.log(`[TELEMETRY] ${eventType} | ${country || 'IL'} - ${cityName} | ${device} (${browserStr})`);

      // Filter: If the visitor is Levi himself (Bulgaria or creator flag), do not spam his phone
      if (body.isCreator || isBulgaria) {
        return sendJson(200, { success: true, ignored: 'creator_session' });
      }

      // Configure dynamic notification based on user behavior event
      const ntfyTopic = 'notliya-live-tracker-levi';
      let title = '';
      let message = '';
      let priority = 3;
      let tags = ['sparkles'];
      let shouldSendPush = true;

      switch (eventType) {
        case 'FIRST_VIEW_IL':
          title = `🌸 ליה פתחה את notliya.com בישראל!`;
          message = `נכנסה עכשיו מ-${cityName}! מכשיר: ${device} (דפדפן ${browserStr})`;
          priority = 5;
          tags = ['tada', 'star', 'israel', 'sparkles'];
          break;

        case 'RETURNING_VIEW_IL':
          title = `🔥 ליה חזרה לאתר! (כניסה #${body.visitCount || 2})`;
          message = `ביקור חוזר מ-${cityName}! נכנסה דרך ${device} (${browserStr})`;
          priority = 5;
          tags = ['fire', 'repeat', 'heart', 'sparkles'];
          break;

        case 'SCROLL_DEPTH':
          const depth = Number(body.depth) || 0;
          if (depth >= 100) {
            title = `📜 ליה גללה 100% עד סוף האתר!`;
            message = `קראה את המכתב האישי והגיעה לתחתית! זמן שהייה עד כה: ${durationStr}`;
            priority = 4;
            tags = ['eyes', 'scroll', 'tada', 'heart'];
          } else if (depth >= 50) {
            title = `📜 ליה גוללת באתר (50%)`;
            message = `עברה חצי מהאתר (גלריה ותמונות). זמן שהייה: ${durationStr}`;
            priority = 3;
            tags = ['eyes', 'scroll'];
          } else {
            shouldSendPush = false; // Don't push 25% to keep notifications clean
          }
          break;

        case 'THEME_CHANGE':
          title = `🎨 ליה החליפה עיצוב: ${body.themeName || body.theme}`;
          message = `בודקת את ערכת הנושא "${body.themeName || body.theme}" (${cityName})`;
          priority = 2;
          tags = ['art', 'palette'];
          break;

        case 'VIP_CLICK':
          title = `💌 ליה לחצה על: ${body.buttonName || 'יצירת קשר'}!`;
          message = `לחצה על כפתור "${body.buttonName}" (זמן שהייה: ${durationStr})`;
          priority = 5;
          tags = ['heart', 'incoming_envelope', 'star'];
          break;

        case 'SESSION_SUMMARY':
          title = `⏱️ סיכום שהייה של ליה: ${durationStr || 'כמה דקות'}`;
          message = `שהתה באתר ${durationStr} | גלילה: ${body.maxScroll || 100}% | פעולות שבוצעו: ${body.actionsCount || 0}`;
          priority = 3;
          tags = ['hourglass', 'bar_chart', 'sparkles'];
          break;

        case 'HEARTBEAT':
          // Periodic dwell time ping (30s, 60s, 2m, 5m) - keep internal log, do not push notify
          shouldSendPush = false;
          break;

        default:
          title = `👀 פעילות באתר notliya.com`;
          message = `${eventType} מ-${cityName}`;
          priority = 2;
          tags = ['eyes'];
          break;
      }

      let alertSent = false;
      if (shouldSendPush) {
        try {
          const ntfyResponse = await fetch('https://ntfy.sh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              topic: ntfyTopic,
              title,
              message,
              priority,
              tags,
              click: 'https://notliya.com?creator=true'
            })
          });
          alertSent = ntfyResponse.ok;
        } catch (postErr) {
          console.error('[NTFY POST ERROR]', postErr.message);
        }
      }

      return sendJson(200, {
        success: true,
        alertSent,
        eventType,
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
