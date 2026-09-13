// ==========================================================================
// notliya.com • Main Application Engine
// Multi-theme color switcher, organic polaroid collage, and creative art gallery
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // State Management
  // ------------------------------------------------------------------------
  const state = {
    lang: localStorage.getItem('liya_lang') || 'he',
    theme: localStorage.getItem('liya_theme') || 'emo',
    soundEnabled: localStorage.getItem('liya_sound') !== 'false', // default true
    activeFilter: 'all',
    votes: JSON.parse(localStorage.getItem('liya_votes') || '{}'),
    votedOptions: JSON.parse(localStorage.getItem('liya_voted_options') || '[]'),
    userConfessions: JSON.parse(localStorage.getItem('liya_user_confessions') || '[]'),
    userPitches: JSON.parse(localStorage.getItem('liya_user_pitches') || '[]'),
    currentQuoteIndex: 0,
    heroArtIndex: 0
  };

  // ------------------------------------------------------------------------
  // Audio Synth Engine (Zero External Audio Assets - Web Audio API)
  // ------------------------------------------------------------------------
  const audio = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playTone(freq, type, duration, gainVal = 0.12) {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    },
    pop() {
      this.playTone(560, 'sine', 0.08, 0.16);
    },
    ding() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.setValueAtTime(1320, this.ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.32);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.32);
      } catch (e) {}
    },
    warmChime() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            this.playTone(freq, 'sine', 0.45, 0.1);
          }, idx * 65);
        });
      } catch (e) {}
    }
  };

  // ------------------------------------------------------------------------
  // DOM References
  // ------------------------------------------------------------------------
  const htmlDoc = document.documentElement;
  const langToggleBtn = document.getElementById('langToggleBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const themeChipsContainer = document.getElementById('themeChipsContainer');

  // Creator Note
  const dismissNoteBtn = document.getElementById('dismissNoteBtn');

  // Hero Polaroid
  const heroArtPolaroid = document.getElementById('heroArtPolaroid');
  const heroArtImg = document.getElementById('heroArtImg');
  const heroArtCaption = document.getElementById('heroArtCaption');

  // Navigation & Modals
  const forLiyaBtn = document.getElementById('forLiyaBtn');
  const forLiyaModal = document.getElementById('forLiyaModal');
  const liyaModalCloseBtn = document.getElementById('liyaModalCloseBtn');
  const copySiteLinkBtn = document.getElementById('copySiteLinkBtn');

  // Art Gallery
  const artGalleryGrid = document.getElementById('artGalleryGrid');

  // Vault
  const reelsGrid = document.getElementById('reelsGrid');
  const filterChips = document.querySelectorAll('.filter-chip');

  // Reel Modal
  const reelModal = document.getElementById('reelModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalQuote = document.getElementById('modalQuote');
  const modalCaption = document.getElementById('modalCaption');
  const modalViews = document.getElementById('modalViews');
  const modalLikes = document.getElementById('modalLikes');
  const modalIgBtn = document.getElementById('modalIgBtn');

  // Oracle
  const oracleInput = document.getElementById('oracleInput');
  const oracleBtn = document.getElementById('oracleBtn');
  const oracleSanityBtn = document.getElementById('oracleSanityBtn');
  const oracleQuoteText = document.getElementById('oracleQuoteText');
  const oracleCopyBtn = document.getElementById('oracleCopyBtn');

  // Clubhouse (Poll & Confessions)
  const pollGrid = document.getElementById('pollGrid');
  const pitchForm = document.getElementById('pitchForm');
  const pitchInput = document.getElementById('pitchInput');
  const confessWall = document.getElementById('confessWall');
  const confessForm = document.getElementById('confessForm');
  const confessAuthor = document.getElementById('confessAuthor');
  const confessText = document.getElementById('confessText');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // ------------------------------------------------------------------------
  // Toast Notifications
  // ------------------------------------------------------------------------
  function showToast(message, duration = 3200) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // ------------------------------------------------------------------------
  // Color Palette Theme Engine
  // ------------------------------------------------------------------------
  function applyTheme(themeId, triggerAudio = true) {
    state.theme = themeId;
    localStorage.setItem('liya_theme', themeId);
    htmlDoc.setAttribute('data-theme', themeId);

    // Update active state on chips
    document.querySelectorAll('.theme-chip-btn').forEach(btn => {
      const isSelected = btn.getAttribute('data-theme-id') === themeId;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    if (triggerAudio) {
      audio.ding();
      const currentThemeObj = SITE_DATA.themes.find(t => t.id === themeId);
      const themeName = state.lang === 'he' ? currentThemeObj.nameHe : currentThemeObj.nameEn;
      showToast(state.lang === 'he' ? `ערכת נושא: ${themeName} ✨` : `Theme: ${themeName} ✨`);
    }
  }

  function renderThemeChips() {
    if (!themeChipsContainer) return;
    themeChipsContainer.innerHTML = '';

    SITE_DATA.themes.forEach(theme => {
      const btn = document.createElement('button');
      btn.className = `theme-chip-btn ${theme.id === state.theme ? 'active' : ''}`;
      btn.setAttribute('data-theme-id', theme.id);
      btn.title = state.lang === 'he' ? theme.descHe : theme.descEn;

      const swatchDots = theme.swatch.map(col => 
        `<span class="theme-swatch-dot" style="background-color: ${col};"></span>`
      ).join('');

      const label = state.lang === 'he' ? theme.nameHe : theme.nameEn;

      btn.innerHTML = `
        <span class="theme-swatch-dots">${swatchDots}</span>
        <span>${label}</span>
      `;

      btn.addEventListener('click', () => {
        applyTheme(theme.id, true);
      });

      themeChipsContainer.appendChild(btn);
    });
  }

  // ------------------------------------------------------------------------
  // Sound Switcher
  // ------------------------------------------------------------------------
  function updateSoundUI() {
    if (!soundToggleBtn) return;
    if (state.soundEnabled) {
      soundToggleBtn.textContent = '🔊';
      soundToggleBtn.title = state.lang === 'he' ? 'צלילים פעילים (לחצי להשתקה)' : 'Sound On (Click to Mute)';
    } else {
      soundToggleBtn.textContent = '🔇';
      soundToggleBtn.title = state.lang === 'he' ? 'מושתק (לחצי להפעלה)' : 'Muted (Click to Unmute)';
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      localStorage.setItem('liya_sound', state.soundEnabled);
      updateSoundUI();
      if (state.soundEnabled) {
        audio.pop();
        showToast(state.lang === 'he' ? 'צלילים הופעלו 🔊' : 'Audio enabled 🔊');
      } else {
        showToast(state.lang === 'he' ? 'הושתק 🔇' : 'Muted 🔇');
      }
    });
  }

  // ------------------------------------------------------------------------
  // Hero Interactive Polaroid Swapper
  // ------------------------------------------------------------------------
  const heroArtList = [
    {
      img: "images/art/balcony.jpg",
      captionHe: "קפה בשקיעה 🌇 (לחצי להחלפה)",
      captionEn: "Sunset Balcony 🌇 (Click to swap)"
    },
    {
      img: "images/art/bedrot.jpg",
      captionHe: "בוריטו שמיכות 👻 (לחצי להחלפה)",
      captionEn: "Burrito Blanket 👻 (Click to swap)"
    },
    {
      img: "images/art/portrait.jpg",
      captionHe: "האיור המקורי 🎨 (לחצי להחלפה)",
      captionEn: "Original Portrait 🎨 (Click to swap)"
    }
  ];

  if (heroArtPolaroid) {
    heroArtPolaroid.addEventListener('click', () => {
      audio.pop();
      state.heroArtIndex = (state.heroArtIndex + 1) % heroArtList.length;
      const current = heroArtList[state.heroArtIndex];

      if (heroArtImg) {
        heroArtImg.style.opacity = '0.3';
        heroArtImg.style.transform = 'scale(0.96)';
        setTimeout(() => {
          heroArtImg.src = current.img;
          heroArtImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          heroArtImg.style.opacity = '1';
          heroArtImg.style.transform = 'scale(1)';
        }, 120);
      }

      if (heroArtCaption) {
        heroArtCaption.textContent = state.lang === 'he' ? current.captionHe : current.captionEn;
      }
    });
  }

  // ------------------------------------------------------------------------
  // Dismiss Creator Note
  // ------------------------------------------------------------------------
  if (dismissNoteBtn) {
    dismissNoteBtn.addEventListener('click', () => {
      audio.pop();
      const banner = dismissNoteBtn.closest('.creator-note-banner');
      if (banner) {
        banner.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-8px)';
        setTimeout(() => banner.parentElement.remove(), 240);
      }
    });
  }

  // ------------------------------------------------------------------------
  // Language Switcher
  // ------------------------------------------------------------------------
  function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('liya_lang', lang);

    const isRtl = lang === 'he';
    htmlDoc.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    htmlDoc.setAttribute('lang', lang);

    if (langToggleBtn) {
      langToggleBtn.textContent = isRtl ? 'EN' : 'עברית';
    }

    const t = SITE_DATA.translations[lang] || SITE_DATA.translations.he;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update hero caption
    if (heroArtCaption) {
      const current = heroArtList[state.heroArtIndex];
      heroArtCaption.textContent = isRtl ? current.captionHe : current.captionEn;
    }

    updateSoundUI();
    renderThemeChips();
    renderArtGallery();
    renderReels();
    renderPoll();
    renderConfessions();
    displayOracleQuote();
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      audio.pop();
      setLanguage(state.lang === 'he' ? 'en' : 'he');
    });
  }

  // ------------------------------------------------------------------------
  // Art Gallery
  // ------------------------------------------------------------------------
  function renderArtGallery() {
    if (!artGalleryGrid) return;
    const isRtl = state.lang === 'he';
    artGalleryGrid.innerHTML = '';

    SITE_DATA.artGallery.forEach(art => {
      const title = isRtl ? art.titleHe : art.titleEn;
      const tag = isRtl ? art.tagHe : art.tagEn;
      const desc = isRtl ? art.descHe : art.descEn;

      const card = document.createElement('div');
      card.className = 'art-gallery-card';
      card.innerHTML = `
        <div class="art-gallery-visual">
          <img src="${art.image}" alt="${title}" class="art-gallery-img" loading="lazy" />
          <span class="art-gallery-tag">${tag}</span>
        </div>
        <div class="art-gallery-info">
          <h3 class="art-gallery-title">${title}</h3>
          <p class="art-gallery-desc">${desc}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        audio.pop();
        // Cycle hero image to this clicked art
        if (heroArtImg) {
          heroArtImg.src = art.image;
        }
        if (heroArtCaption) {
          heroArtCaption.textContent = title;
        }
        showToast(isRtl ? `נבחר: ${title}` : `Selected: ${title}`);
        window.location.hash = '#hero';
      });

      artGalleryGrid.appendChild(card);
    });
  }

  // ------------------------------------------------------------------------
  // Reels Archive & Category Filtering
  // ------------------------------------------------------------------------
  function renderReels() {
    if (!reelsGrid) return;
    const isRtl = state.lang === 'he';

    const filtered = SITE_DATA.posts.filter(p => {
      if (state.activeFilter === 'all') return true;
      return p.category === state.activeFilter;
    });

    reelsGrid.innerHTML = '';

    filtered.forEach((post) => {
      const title = isRtl ? post.titleHe : post.titleEn;
      const quote = isRtl ? post.quoteHe : post.quoteEn;
      const tag = isRtl ? post.tagHe : post.tagEn;

      const card = document.createElement('article');
      card.className = 'reel-item-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', title);

      card.innerHTML = `
        <div class="reel-thumb-box">
          <img src="${post.image}" alt="${title}" class="reel-thumb-img" loading="lazy" />
          <div class="reel-overlay-stats">
            <span>👀 ${post.views}</span>
            <span>❤️ ${post.likes}</span>
          </div>
        </div>
        <div class="reel-card-info">
          <span class="modal-pill" style="font-size: 0.68rem; margin-bottom: 0.4rem; display: inline-block;">${tag}</span>
          <h3 class="reel-card-title">${title}</h3>
          <p class="reel-card-quote">"${quote}"</p>
        </div>
      `;

      card.addEventListener('click', () => openReelModal(post));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openReelModal(post);
        }
      });

      reelsGrid.appendChild(card);
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      audio.pop();
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.activeFilter = chip.getAttribute('data-filter') || 'all';
      renderReels();
    });
  });

  // ------------------------------------------------------------------------
  // Reel Modal
  // ------------------------------------------------------------------------
  function openReelModal(post) {
    if (!reelModal) return;
    audio.pop();

    const isRtl = state.lang === 'he';
    const title = isRtl ? post.titleHe : post.titleEn;
    const quote = isRtl ? post.quoteHe : post.quoteEn;
    const caption = isRtl ? post.captionHe : post.captionEn;
    const tag = isRtl ? post.tagHe : post.tagEn;

    if (modalImg) {
      modalImg.src = post.image;
      modalImg.alt = title;
    }
    if (modalTag) modalTag.textContent = tag;
    if (modalTitle) modalTitle.textContent = title;
    if (modalQuote) modalQuote.textContent = `"${quote}"`;
    if (modalCaption) modalCaption.textContent = caption;
    if (modalViews) modalViews.textContent = `👀 ${post.views} ${isRtl ? 'צפיות' : 'views'}`;
    if (modalLikes) modalLikes.textContent = `❤️ ${post.likes} ${isRtl ? 'לייקים' : 'likes'}`;
    if (modalIgBtn) {
      modalIgBtn.href = post.url;
      modalIgBtn.textContent = isRtl ? 'צפי בסרטון המקורי באינסטגרם ↗' : 'Watch Original Reel on Instagram ↗';
    }

    reelModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeReelModal() {
    if (!reelModal) return;
    audio.pop();
    reelModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeReelModal);
  if (reelModal) {
    reelModal.addEventListener('click', (e) => {
      if (e.target === reelModal) closeReelModal();
    });
  }

  // ------------------------------------------------------------------------
  // The Cynic Oracle & Reality Check
  // ------------------------------------------------------------------------
  function displayOracleQuote(quoteObj) {
    if (!oracleQuoteText) return;
    const isRtl = state.lang === 'he';
    const activeQuote = quoteObj || SITE_DATA.cynicQuotes[state.currentQuoteIndex];
    const text = isRtl ? activeQuote.he : activeQuote.en;

    oracleQuoteText.style.opacity = '0';
    oracleQuoteText.style.transform = 'translateY(5px)';
    setTimeout(() => {
      oracleQuoteText.textContent = `"${text}"`;
      oracleQuoteText.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      oracleQuoteText.style.opacity = '1';
      oracleQuoteText.style.transform = 'translateY(0)';
    }, 150);
  }

  if (oracleBtn) {
    oracleBtn.addEventListener('click', () => {
      audio.pop();
      const query = (oracleInput ? oracleInput.value.trim() : '');
      
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * SITE_DATA.cynicQuotes.length);
      } while (nextIndex === state.currentQuoteIndex && SITE_DATA.cynicQuotes.length > 1);

      state.currentQuoteIndex = nextIndex;
      displayOracleQuote(SITE_DATA.cynicQuotes[nextIndex]);

      if (query) {
        showToast(state.lang === 'he' ? 'הפאנץ\' שוגר בהתאמה אישית 💥' : 'Punchline delivered 💥');
      }
    });
  }

  if (oracleSanityBtn) {
    oracleSanityBtn.addEventListener('click', () => {
      audio.warmChime();
      const sanityObj = {
        he: "בדיקת מערכות דחופה: שחררי את הלסת. תורידי את הכתפיים. קחי שלוק מים עכשיו. אנחנו מרחפים על סלע בחלל וכל השאר פשוט לא משנה.",
        en: "Urgent system check: Unclench your jaw. Drop your shoulders down. Take a sip of cold water. We're floating on a space rock and none of it matters."
      };
      displayOracleQuote(sanityObj);
      showToast(state.lang === 'he' ? 'נשימה עמוקה... שחררי את הלסת 🛟' : 'Deep breath... unclench your jaw 🛟');
    });
  }

  if (oracleCopyBtn) {
    oracleCopyBtn.addEventListener('click', () => {
      audio.pop();
      const text = oracleQuoteText ? oracleQuoteText.textContent.replace(/^"|"$/g, '') : '';
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(state.lang === 'he' ? 'הציטוט הועתק ללוח! 📋' : 'Quote copied to clipboard! 📋');
        }).catch(() => {
          showToast(state.lang === 'he' ? 'הועתק!' : 'Copied!');
        });
      }
    });
  }

  // ------------------------------------------------------------------------
  // Clubhouse & Interactive Poll
  // ------------------------------------------------------------------------
  function renderPoll() {
    if (!pollGrid) return;
    const isRtl = state.lang === 'he';

    let totalVotesSum = 0;
    SITE_DATA.pollOptions.forEach(opt => {
      const userAdded = state.votes[opt.id] || 0;
      totalVotesSum += (opt.votes + userAdded);
    });

    pollGrid.innerHTML = '';

    SITE_DATA.pollOptions.forEach(opt => {
      const userAdded = state.votes[opt.id] || 0;
      const count = opt.votes + userAdded;
      const pct = totalVotesSum > 0 ? Math.round((count / totalVotesSum) * 100) : 0;
      const hasVoted = state.votedOptions.includes(opt.id);

      const title = isRtl ? opt.titleHe : opt.titleEn;
      const desc = isRtl ? opt.descHe : opt.descEn;
      const voteLabel = hasVoted ? (isRtl ? 'הצבעתם ✓' : 'Voted ✓') : (isRtl ? 'הצביעו' : 'Vote');

      const item = document.createElement('div');
      item.className = `poll-item ${hasVoted ? 'voted' : ''}`;
      item.innerHTML = `
        <div class="poll-item-header">
          <span class="poll-item-title">${title}</span>
          <span class="poll-item-pct">${pct}% (${count.toLocaleString()})</span>
        </div>
        <p class="poll-item-desc">${desc}</p>
        <div class="poll-meter-track">
          <div class="poll-meter-fill" style="width: ${pct}%"></div>
        </div>
        <button class="btn-vote-trigger" ${hasVoted ? 'disabled' : ''}>
          ${voteLabel}
        </button>
      `;

      const btn = item.querySelector('.btn-vote-trigger');
      btn.addEventListener('click', () => {
        if (state.votedOptions.includes(opt.id)) return;
        audio.ding();
        state.votes[opt.id] = (state.votes[opt.id] || 0) + 1;
        state.votedOptions.push(opt.id);
        localStorage.setItem('liya_votes', JSON.stringify(state.votes));
        localStorage.setItem('liya_voted_options', JSON.stringify(state.votedOptions));
        renderPoll();
        showToast(isRtl ? 'ההצבעה נקלטה בהצלחה! 🗳️' : 'Vote recorded! 🗳️');
      });

      pollGrid.appendChild(item);
    });
  }

  if (pitchForm) {
    pitchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = pitchInput ? pitchInput.value.trim() : '';
      if (!val) return;

      audio.ding();
      state.userPitches.push({ text: val, timestamp: new Date().toISOString() });
      localStorage.setItem('liya_user_pitches', JSON.stringify(state.userPitches));
      if (pitchInput) pitchInput.value = '';

      showToast(state.lang === 'he' ? 'תודה על הרעיון! נשמר עבור ליה ✨' : 'Idea saved for Liya! ✨');
    });
  }

  // ------------------------------------------------------------------------
  // Confessions Wall
  // ------------------------------------------------------------------------
  function renderConfessions() {
    if (!confessWall) return;
    const isRtl = state.lang === 'he';

    const all = [...state.userConfessions, ...SITE_DATA.confessions];
    confessWall.innerHTML = '';

    all.forEach(c => {
      const author = isRtl ? (c.author || 'אנונימית') : (c.authorEn || c.author || 'Anonymous');
      const text = isRtl ? (c.textHe || c.text) : (c.textEn || c.text);
      const time = isRtl ? (c.timestamp || 'לאחרונה') : (c.timestampEn || c.timestamp || 'Recently');

      const card = document.createElement('div');
      card.className = 'confess-bubble';
      card.innerHTML = `
        <div class="confess-meta-row">
          <span class="confess-who">💀 ${author}</span>
          <span class="confess-when">${time}</span>
        </div>
        <p class="confess-message">${text}</p>
      `;
      confessWall.appendChild(card);
    });
  }

  if (confessForm) {
    confessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const textVal = confessText ? confessText.value.trim() : '';
      if (!textVal) return;

      audio.ding();
      const authorVal = (confessAuthor ? confessAuthor.value.trim() : '') || (state.lang === 'he' ? 'אנונימית בחרדה' : 'Anxious Anon');
      const newEntry = {
        author: authorVal,
        authorEn: authorVal,
        textHe: textVal,
        textEn: textVal,
        timestamp: state.lang === 'he' ? 'ממש עכשיו' : 'Just now',
        timestampEn: 'Just now'
      };

      state.userConfessions.unshift(newEntry);
      localStorage.setItem('liya_user_confessions', JSON.stringify(state.userConfessions));

      if (confessText) confessText.value = '';
      if (confessAuthor) confessAuthor.value = '';

      renderConfessions();
      showToast(state.lang === 'he' ? 'הווידוי שוגר לריק בהצלחה! 💀' : 'Confession dropped into the void! 💀');
    });
  }

  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // VIP Personal Letter from Levi (Israel First-View & Bulgaria Safe Viewing Engine)
  // ------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const NTFY_TOPIC = 'notliya-live-tracker-levi';

  // Check if reset requested
  if (urlParams.get('reset') === 'true') {
    localStorage.removeItem('liya_welcome_seen');
    localStorage.removeItem('liya_israel_viewed_cache');
  }

  const isCreatorExplicit = urlParams.get('creator') === 'true' || urlParams.has('levi') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isCreatorExplicit) {
    localStorage.setItem('notliya_is_creator', 'true');
  }

  const isVipParam = urlParams.has('to') || urlParams.has('for') || urlParams.has('vip') || urlParams.get('to') === 'liya';
  const hasSeenLocally = localStorage.getItem('liya_welcome_seen') === 'true';

  // Synchronous Timezone Check
  const localTz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
  const isBulgariaTz = localTz.includes('sofia') || localTz.includes('bulgaria');
  const isIsraelTz = localTz.includes('jerusalem') || localTz.includes('tel_aviv');
  const isHebrewLang = (navigator.language || navigator.userLanguage || '').toLowerCase().startsWith('he');

  let isCreator = localStorage.getItem('notliya_is_creator') === 'true' || isBulgariaTz || isCreatorExplicit;
  let isIsraelVisitor = isIsraelTz || (isHebrewLang && !isBulgariaTz);
  let visitorCountry = isBulgariaTz ? 'BG' : (isIsraelTz ? 'IL' : 'UNKNOWN');
  let visitorCity = '';

  const creatorDevPill = document.getElementById('creatorDevPill');
  const creatorStatusBadge = document.getElementById('creatorStatusBadge');
  const creatorBannerContainer = document.getElementById('creatorBannerContainer');

  function openLiyaModal() {
    if (!forLiyaModal) return;
    audio.ding();
    forLiyaModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLiyaModal() {
    if (!forLiyaModal) return;
    audio.pop();
    forLiyaModal.classList.remove('open');
    document.body.style.overflow = '';

    // If visitor is in Israel or not creator, mark seen permanently and clean URL
    if (!isCreator || isIsraelVisitor) {
      localStorage.setItem('liya_welcome_seen', 'true');
      if (forLiyaBtn) forLiyaBtn.style.display = 'none';
      if (creatorBannerContainer) creatorBannerContainer.style.display = 'none';
      if (window.history && window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
      }
    }
  }

  if (forLiyaBtn) forLiyaBtn.addEventListener('click', openLiyaModal);
  if (liyaModalCloseBtn) liyaModalCloseBtn.addEventListener('click', closeLiyaModal);

  const enterSiteBtn = document.getElementById('enterSiteBtn');
  if (enterSiteBtn) {
    enterSiteBtn.addEventListener('click', () => {
      closeLiyaModal();
      showToast(state.lang === 'he' ? 'ברוכה הבאה לאתר שלך! ✨' : 'Welcome to your site! ✨');
    });
  }

  if (forLiyaModal) {
    forLiyaModal.addEventListener('click', (e) => {
      if (e.target === forLiyaModal) closeLiyaModal();
    });
  }

  // Poll ntfy.sh for global Israel view event
  async function fetchGlobalIsraelViewStatus() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`https://ntfy.sh/${NTFY_TOPIC}/json?poll=1`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) return null;
      const text = await res.text();
      const lines = text.trim().split('\n');

      for (let i = lines.length - 1; i >= 0; i--) {
        try {
          const item = JSON.parse(lines[i]);
          if (item.event === 'message') {
            let msgObj = null;
            try { msgObj = JSON.parse(item.message); } catch(e) {}
            if ((msgObj && msgObj.event === 'FIRST_VIEW_IL') || (item.title && item.title.includes('Israel'))) {
              return {
                viewed: true,
                time: (msgObj && msgObj.time) || new Date(item.time * 1000).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
                city: (msgObj && msgObj.city) || 'ישראל'
              };
            }
          }
        } catch(e) {}
      }
      return { viewed: false };
    } catch(e) {
      return null;
    }
  }

  // Send real-time notification alert to Levi in Bulgaria
  async function triggerIsraelFirstViewAlert(city) {
    const cityName = city || visitorCity || 'ישראל';
    const nowTime = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });

    // 1. Send via Vercel Serverless Function
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'FIRST_VIEW_IL', city: cityName })
    }).catch(() => {});

    // 2. Direct client-side push to ntfy.sh topic (ensures instant delivery to Levi's phone)
    try {
      await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: 'POST',
        headers: {
          'Title': 'Liya opened notliya.com in Israel!',
          'Priority': 'urgent',
          'Tags': 'tada,star,israel,sparkles',
          'Click': 'https://notliya.com?creator=true'
        },
        body: JSON.stringify({
          event: 'FIRST_VIEW_IL',
          country: 'IL',
          city: cityName,
          time: nowTime,
          timestamp: Date.now()
        })
      });
    } catch(e) {}
  }

  // Update Creator Dev Pill Status
  function updateCreatorPill(isViewedGlobally, viewInfo) {
    if (!creatorDevPill) return;
    creatorDevPill.style.display = 'flex';

    if (creatorStatusBadge) {
      if (isViewedGlobally) {
        const timeText = (viewInfo && viewInfo.time) ? viewInfo.time : '';
        const cityText = (viewInfo && viewInfo.city) ? ` (${viewInfo.city})` : '';
        creatorStatusBadge.textContent = `🔴 נצפה בישראל! ${timeText}${cityText}`;
        creatorStatusBadge.className = 'creator-status-badge viewed';
      } else {
        creatorStatusBadge.textContent = '🟢 טרם נצפה בישראל (מחכה לליה)';
        creatorStatusBadge.className = 'creator-status-badge waiting';
      }
    }

    const devPreviewBtn = document.getElementById('devPreviewBtn');
    const devResetBtn = document.getElementById('devResetBtn');

    if (devPreviewBtn) {
      devPreviewBtn.onclick = () => openLiyaModal();
    }

    if (devResetBtn) {
      devResetBtn.onclick = () => {
        localStorage.removeItem('liya_welcome_seen');
        audio.ding();
        showToast("איפוס מקומי בוצע! כעת תוכל לבדוק שוב 🔄");
        setTimeout(() => location.reload(), 600);
      };
    }
  }

  // Main Orchestrator for Location & View Logic
  async function initVipViewEngine() {
    // 1. Check IP Geolocation from /api/track or ipwho.is
    try {
      const geoRes = await fetch('/api/track').then(r => r.json()).catch(() => null);
      if (geoRes && geoRes.country) {
        visitorCountry = geoRes.country.toUpperCase();
        visitorCity = geoRes.city || '';
        if (geoRes.isBulgaria) isCreator = true;
        if (geoRes.isIsrael) isIsraelVisitor = true;
      } else {
        // Fallback to free ipwho.is
        const ipwhoRes = await fetch('https://ipwho.is/').then(r => r.json()).catch(() => null);
        if (ipwhoRes && ipwhoRes.country_code) {
          visitorCountry = ipwhoRes.country_code.toUpperCase();
          visitorCity = ipwhoRes.city || '';
          if (visitorCountry === 'BG') isCreator = true;
          if (visitorCountry === 'IL') isIsraelVisitor = true;
        }
      }
    } catch(e) {}

    // 2. Poll global view status
    const status = await fetchGlobalIsraelViewStatus();
    const isViewedGlobally = status ? status.viewed : false;

    // 3. Handle Bulgaria / Creator Mode
    if (isCreator || visitorCountry === 'BG' || isBulgariaTz) {
      updateCreatorPill(isViewedGlobally, status);

      // Levi in Bulgaria can view the message as long as she hasn't read it yet!
      if (!isViewedGlobally) {
        if (forLiyaBtn) forLiyaBtn.style.display = 'inline-flex';
        // If Levi opens with ?to=liya or ?creator, he can preview it
        if (isVipParam) {
          setTimeout(() => openLiyaModal(), 700);
        }
      } else {
        // She has already read it! Hide forLiyaBtn from general navigation
        if (forLiyaBtn) forLiyaBtn.style.display = 'none';
      }
      return; // Stop here for Levi in Bulgaria: NEVER burn view or send fake alert
    }

    // 4. Handle Israel Visitor (Liya or Israeli follower)
    if (isIsraelVisitor || visitorCountry === 'IL') {
      // If already viewed globally or locally, the message is permanently GONE
      if (isViewedGlobally || hasSeenLocally) {
        if (forLiyaBtn) forLiyaBtn.style.display = 'none';
        if (creatorBannerContainer) creatorBannerContainer.style.display = 'none';
        return;
      }

      // First time viewing in Israel!
      if (forLiyaBtn) forLiyaBtn.style.display = 'inline-flex';
      if (creatorBannerContainer) creatorBannerContainer.style.display = 'block';

      // Automatically open the personal letter modal
      setTimeout(() => {
        openLiyaModal();
      }, 700);

      // Trigger one-time alert to Levi's phone and lock globally
      triggerIsraelFirstViewAlert(visitorCity);
      localStorage.setItem('liya_welcome_seen', 'true');
      return;
    }

    // 5. Any other follower or visitor outside Israel/Bulgaria
    // Message is completely hidden
    if (forLiyaBtn) forLiyaBtn.style.display = 'none';
    if (creatorBannerContainer) creatorBannerContainer.style.display = 'none';
  }

  // Run VIP View Engine
  initVipViewEngine();

  // Voice Note Audio Player Logic
  const voicePlayBtn = document.getElementById('voicePlayBtn');
  const voicePlayIcon = document.getElementById('voicePlayIcon');
  const creatorAudioEl = document.getElementById('creatorAudioEl');
  const voiceNoteCard = document.querySelector('.voice-note-card');

  if (voicePlayBtn && creatorAudioEl) {
    let isPlayingVoice = false;

    function stopVoice() {
      isPlayingVoice = false;
      if (voicePlayIcon) voicePlayIcon.textContent = '▶';
      if (voiceNoteCard) voiceNoteCard.classList.remove('playing');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    voicePlayBtn.addEventListener('click', () => {
      if (isPlayingVoice) {
        creatorAudioEl.pause();
        stopVoice();
      } else {
        audio.pop();
        creatorAudioEl.play().then(() => {
          isPlayingVoice = true;
          if (voicePlayIcon) voicePlayIcon.textContent = '⏸';
          if (voiceNoteCard) voiceNoteCard.classList.add('playing');
        }).catch(() => {
          // Fallback to speech synthesis or pleasant reading feedback
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const speechText = "היי ליה, זה לוי. ראיתי ששאלת בסטורי איזה אתר לבנות, וזה נשמע לי כמו פרויקט מגניב אז בניתי לך אותו בסופ״ש ושמרתי לך את הדומיין. מקווה שקלעתי לסטייל ולהומור שלך. אם תרצי שינויים בעיצוב או בבדיחות, תגידי לי. כתבתי לך באינסטגרם לוי הלפרין, ויש פה גם קישור לוואטסאפ שלי. תהני!";
            const utter = new SpeechSynthesisUtterance(speechText);
            utter.lang = 'he-IL';
            utter.rate = 0.95;
            utter.onend = stopVoice;
            utter.onerror = stopVoice;
            isPlayingVoice = true;
            if (voicePlayIcon) voicePlayIcon.textContent = '⏸';
            if (voiceNoteCard) voiceNoteCard.classList.add('playing');
            window.speechSynthesis.speak(utter);
          } else {
            audio.warmChime();
            showToast("הטקסט המלא מופיע במכתב האישי ✍️");
          }
        });
      }
    });

    creatorAudioEl.addEventListener('ended', stopVoice);
    creatorAudioEl.addEventListener('pause', () => {
      if (!creatorAudioEl.seeking) stopVoice();
    });
  }

  if (copySiteLinkBtn) {
    copySiteLinkBtn.addEventListener('click', () => {
      audio.ding();
      const siteUrl = window.location.origin.includes('localhost') ? 'https://notliya.com' : window.location.href;
      navigator.clipboard.writeText(siteUrl).then(() => {
        showToast(state.lang === 'he' ? 'קישור האתר הועתק! 🤳' : 'Site link copied! 🤳');
      }).catch(() => {
        showToast(state.lang === 'he' ? 'הקישור הועתק!' : 'Link copied!');
      });
    });
  }

  // Global ESC Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (reelModal && reelModal.classList.contains('open')) closeReelModal();
      if (forLiyaModal && forLiyaModal.classList.contains('open')) closeLiyaModal();
    }
  });

  // ------------------------------------------------------------------------
  // App Initialization
  // ------------------------------------------------------------------------
  applyTheme(state.theme, false);
  setLanguage(state.lang);
});
