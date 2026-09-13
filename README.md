# ליה • notliya.com | Official Website & Community Hub

> **"פאנצ'ים שיכלתי לזרוק ואהבה שיכלתי לקבל"**  
> Bespoke, editorial website designed for Israeli creator & influencer **[@not.liya](https://www.instagram.com/not.liya/)**, featuring custom stylized 2D illustrations, her iconic dark humor, viral video lore, and an intimate clubhouse for her community.

---

## 🖤 Design Philosophy: Human-Crafted, Anti-AI Slop

Unlike generic, bloated AI website templates filled with tacky emoji meters and cluttered bento boxes, this site was reimagined with the sensibility of an editorial human designer:
- **Intimate Obsidian Palette**: Deep carbon and matte obsidian backgrounds (`#09090d`), subtle borders, and vivid neon-lime (`#c8ff00`) + soft pink (`#ff3b69`) accents.
- **Editorial Typography**: Pairing **Syne** (chic French display serif-sans) with **Heebo** (crafted Hebrew grotesque) and **Plus Jakarta Sans** for smooth readability.
- **Custom Stylized Visual Lore**: 4 consistent, stylized 2D graphic illustrations capturing Liya's authentic likeness (wavy dark hair, septum piercing, signature deadpan side-eye):
  1. `images/art/portrait.jpg` — Hero editorial portrait.
  2. `images/art/coffee.jpg` — Iced coffee, bed-rotting, and radical unbothered peace of mind.
  3. `images/art/protein.jpg` — Living in the shadow of boyfriend's industrial whey isolate obsession.
  4. `images/art/pencil.jpg` — The 0.7mm mechanical pencil childhood trauma origin story.
- **Generous Whitespace & Fluid Motion**: Focused sections with breathing room and crisp micro-interactions.

---

## 🌟 Features & Sections

1. **The Lore & Origin Stories**:
   - 3 deep-dive editorial cards with custom artwork chronicling her transition from global vanity metrics to an authentic Israeli community, the gym-bro partner roast, and the 0.7mm mechanical pencil trauma.
2. **The Reels Vault**:
   - 12 viral reels with instant category filtering (*Dark Humor*, *Dating & Men*, *Rants & Takes*, *Daily Chaos*).
   - Interactive high-res viewer modal with views, likes, original punchlines, and direct Instagram links.
3. **The Cynic Oracle & Sanity Check (הפאנצ'ומטר)**:
   - Ask life dilemmas or get random existential punchlines straight from Liya's videos.
   - Dedicated *"שחררי את הלסת 🛟"* (Unclench your jaw) button with calming mindfulness chime.
   - One-click quote copy with tactile toast feedback.
4. **The Clubhouse & Voting**:
   - Community poll on which permanent feature Liya should build into `notliya.com`.
   - Custom idea submission box saved locally for review.
   - Anonymous confessions & complaints wall where followers vent into the void.
5. **VIP "Hey Liya, This Is For You" Modal**:
   - Dedicated welcome modal for Liya with a 1-click button to copy `notliya.com` to her Instagram story.
6. **Zero-Dependency Synthesizer & Bilingual Engine**:
   - Web Audio API synthesizer for tactile pops and warm chimes (no audio file requests).
   - Seamless 1-click toggle between Hebrew (RTL) and English (LTR).

---

## 🌐 Domain & Vercel Deployment Guide (`notliya.com`)

### 1. Vercel Deployment
This repository is connected to GitHub at [`delaroth/notliya`](https://github.com/delaroth/notliya).
- Log in to [Vercel Dashboard](https://vercel.com/new).
- Click **"Add New..."** → **"Project"** → Import `delaroth/notliya`.
- Framework Preset: **Other** (Static HTML).
- Root Directory: `./`
- Click **Deploy**.

### 2. Custom Domain Configuration on Cloudflare
Under your Cloudflare dashboard for `notliya.com`:

1. **DNS Records**:
   | Type  | Name | Content             | Proxy Status |
   | :---- | :--- | :------------------ | :----------- |
   | **A** | `@`  | `76.76.21.21`       | **DNS only (Gray cloud)** |
   | **CNAME** | `www`| `cname.vercel-dns.com` | **DNS only (Gray cloud)** |

   > **Note**: Keep proxy status on **DNS only (Gray cloud)** during initial setup so Vercel can issue the Let's Encrypt SSL certificate. Once active, you may enable Cloudflare proxying if desired.

2. **Cloudflare SSL/TLS Encryption Mode**:
   - Go to **SSL/TLS** tab in Cloudflare.
   - Set encryption mode to **Full** or **Full (Strict)**.
   - *Do NOT set to Flexible*, as that causes an infinite redirect loop (`ERR_TOO_MANY_REDIRECTS`) with Vercel's automatic HTTPS.

---

## 💻 Running Locally

```bash
# Start local static server
node server.js

# Or open index.html directly in any browser
```
Open [http://localhost:3000](http://localhost:3000).

---

## 🔗 Official Social Links
- **Instagram**: [https://www.instagram.com/not.liya/](https://www.instagram.com/not.liya/)
- **TikTok**: [https://www.tiktok.com/@not.liya](https://www.tiktok.com/@not.liya)
