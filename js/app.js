// ==========================================================================
// @not.liya Official Web Experience - Main Application Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    lang: localStorage.getItem('liya_lang') || 'he',
    soundEnabled: localStorage.getItem('liya_sound') === 'true',
    activeFilter: 'all',
    activeMoodIndex: 0,
    currentSanityIndex: 0,
    currentReelIndex: 0,
    votes: JSON.parse(localStorage.getItem('liya_votes') || '{}'),
    votedOptions: JSON.parse(localStorage.getItem('liya_voted_options') || '[]'),
    confessions: JSON.parse(localStorage.getItem('liya_user_confessions') || '[]'),
    userPitches: JSON.parse(localStorage.getItem('liya_user_pitches') || '[]')
  };

  // Audio Synth Engine (Web Audio API - zero external audio assets required)
  const audio = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playTone(freq, type, duration, gainVal = 0.15) {
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
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio not supported or blocked:', e);
      }
    },
    pop() {
      this.playTone(600, 'sine', 0.08, 0.2);
    },
    buzzer() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.25);
      } catch(e) {}
    },
    ding() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.setValueAtTime(1174.66, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
      } catch(e) {}
    },
    warmChime() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            this.playTone(freq, 'sine', 0.5, 0.12);
          }, idx * 70);
        });
      } catch(e) {}
    }
  };

  // DOM Elements
  const htmlDoc = document.documentElement;
  const langToggleBtn = document.getElementById('langToggleBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const forLiyaBtn = document.getElementById('forLiyaBtn');
  const forLiyaModal = document.getElementById('forLiyaModal');
  const liyaModalCloseBtn = document.getElementById('liyaModalCloseBtn');
  const liyaCloseActionBtn = document.getElementById('liyaCloseActionBtn');
  const copySiteLinkBtn = document.getElementById('copySiteLinkBtn');

  const moodSelector = document.getElementById('moodSelector');
  const moodResponseText = document.getElementById('moodResponseText');

  const sanityBtn = document.getElementById('sanityBtn');
  const sanityQuote = document.getElementById('sanityQuote');
  const sanityDisplayBox = document.getElementById('sanityDisplayBox');

  const reelsGrid = document.getElementById('reelsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const cynicAnswerBox = document.getElementById('cynicAnswerBox');
  const cynicText = document.getElementById('cynicText');
  const cynicBtn = document.getElementById('cynicBtn');
  const cynicInput = document.getElementById('cynicInput');
  const cynicCopyBtn = document.getElementById('cynicCopyBtn');

  const pollContainer = document.getElementById('pollContainer');
  const customPitchForm = document.getElementById('customPitchForm');
  const pitchInput = document.getElementById('pitchInput');

  const confessWall = document.getElementById('confessWall');
  const confessForm = document.getElementById('confessForm');
  const confessText = document.getElementById('confessText');
  const confessAuthor = document.getElementById('confessAuthor');

  const merchGrid = document.getElementById('merchGrid');

  const modalBackdrop = document.getElementById('reelModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalQuote = document.getElementById('modalQuote');
  const modalCaption = document.getElementById('modalCaption');
  const modalTag = document.getElementById('modalTag');
  const modalViews = document.getElementById('modalViews');
  const modalLikes = document.getElementById('modalLikes');
  const modalIgBtn = document.getElementById('modalIgBtn');

  const toastContainer = document.getElementById('toastContainer');

  // Helper: Toast Notifications
  function showToast(message, duration = 3500) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>💬</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  // Language Switcher Logic
  function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('liya_lang', lang);

    const isRtl = lang === 'he';
    htmlDoc.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    htmlDoc.setAttribute('lang', lang);

    // Update button text
    if (langToggleBtn) {
      langToggleBtn.innerHTML = isRtl ? '🌐 English' : '🌐 עברית';
    }

    // Update all elements with data-i18n
    const trans = SITE_DATA.translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (trans[key]) {
        el.textContent = trans[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (trans[key]) {
        el.setAttribute('placeholder', trans[key]);
      }
    });

    // Update dynamic sections
    renderMoods();
    renderSanityQuote();
    renderReels();
    renderPoll();
    renderConfessions();
    renderMerch();
    renderCynicQuote();
  }

  // Sound Switcher Logic
  function updateSoundButton() {
    if (!soundToggleBtn) return;
    const trans = SITE_DATA.translations[state.lang];
    if (state.soundEnabled) {
      soundToggleBtn.innerHTML = `🔊 ${trans.soundOn}`;
      soundToggleBtn.classList.add('active');
    } else {
      soundToggleBtn.innerHTML = `🔇 ${trans.soundOff}`;
      soundToggleBtn.classList.remove('active');
    }
  }

  // Render Daily Mood Check-In Widget
  function renderMoods() {
    if (!moodSelector) return;
    const isRtl = state.lang === 'he';

    moodSelector.innerHTML = '';
    SITE_DATA.moods.forEach((m, idx) => {
      const btn = document.createElement('button');
      btn.className = `mood-btn ${idx === state.activeMoodIndex ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="mood-btn-icon">${m.icon}</span>
        <span class="mood-btn-label">${isRtl ? m.labelHe : m.labelEn}</span>
      `;

      btn.addEventListener('click', () => {
        audio.pop();
        state.activeMoodIndex = idx;
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        moodResponseText.textContent = `"${isRtl ? m.responseHe : m.responseEn}"`;
      });

      moodSelector.appendChild(btn);
    });

    // Initial response
    const currentMood = SITE_DATA.moods[state.activeMoodIndex];
    moodResponseText.textContent = `"${isRtl ? currentMood.responseHe : currentMood.responseEn}"`;
  }

  // Emergency Sanity Check Logic
  function renderSanityQuote() {
    if (!sanityQuote) return;
    const isRtl = state.lang === 'he';
    const item = SITE_DATA.sanityChecks[state.currentSanityIndex];
    sanityQuote.textContent = `"${isRtl ? item.he : item.en}"`;
  }

  function triggerSanityBoost() {
    audio.warmChime();
    if (sanityDisplayBox) {
      sanityDisplayBox.style.transform = 'scale(0.97)';
      setTimeout(() => {
        state.currentSanityIndex = (state.currentSanityIndex + 1) % SITE_DATA.sanityChecks.length;
        renderSanityQuote();
        sanityDisplayBox.style.transform = 'scale(1)';
        showToast(state.lang === 'he' ? 'שפיות שוחזרה בהצלחה (לפחות ל-10 הדקות הקרובות).' : 'Sanity restored (valid for the next 10 minutes).');
      }, 200);
    }
  }

  // Render Video Vault / Reels
  function renderReels() {
    if (!reelsGrid) return;
    const isRtl = state.lang === 'he';
    const filtered = SITE_DATA.posts.filter(post => {
      if (state.activeFilter === 'all') return true;
      return post.category === state.activeFilter;
    });

    reelsGrid.innerHTML = '';
    filtered.forEach((post) => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      const title = isRtl ? post.titleHe : post.titleEn;
      const quote = isRtl ? post.quoteHe : post.quoteEn;
      const tag = isRtl ? post.tagHe : post.tagEn;

      card.innerHTML = `
        <div class="reel-media-wrapper">
          <img class="reel-thumb" src="${post.image}" alt="${title}" loading="lazy" />
          <div class="reel-tag-badge">${tag}</div>
          <div class="reel-stats-overlay">
            <span>👁️ ${post.views}</span>
            <span>❤️ ${post.likes}</span>
          </div>
          <div class="reel-play-overlay">
            <div class="play-icon-circle">▶</div>
          </div>
        </div>
        <div class="reel-content">
          <h3 class="reel-title">${title}</h3>
          <p class="reel-quote">"${quote}"</p>
        </div>
      `;

      card.addEventListener('click', () => {
        audio.pop();
        openModal(post);
      });

      reelsGrid.appendChild(card);
    });
  }

  // Reel Modal Logic
  function openModal(post) {
    const isRtl = state.lang === 'he';
    const trans = SITE_DATA.translations[state.lang];

    modalImg.src = post.image;
    modalImg.alt = isRtl ? post.titleHe : post.titleEn;
    modalTitle.textContent = isRtl ? post.titleHe : post.titleEn;
    modalQuote.textContent = `"${isRtl ? post.quoteHe : post.quoteEn}"`;
    modalCaption.textContent = isRtl ? post.captionHe : post.captionEn;
    modalTag.textContent = isRtl ? post.tagHe : post.tagEn;
    modalViews.textContent = `👁️ ${post.views}`;
    modalLikes.textContent = `❤️ ${post.likes}`;
    modalIgBtn.href = post.url;
    modalIgBtn.textContent = trans.openInIg;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    if (forLiyaModal) forLiyaModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Sarcasm 8-Ball Generator
  let currentQuoteIndex = 0;
  function renderCynicQuote(isRandom = false) {
    const isRtl = state.lang === 'he';
    if (isRandom) {
      currentQuoteIndex = Math.floor(Math.random() * SITE_DATA.cynicQuotes.length);
    }
    const q = SITE_DATA.cynicQuotes[currentQuoteIndex];
    cynicText.textContent = `"${isRtl ? q.he : q.en}"`;
  }

  function triggerCynicRoast() {
    audio.buzzer();
    cynicAnswerBox.style.transform = 'scale(0.97)';
    cynicText.textContent = state.lang === 'he' ? 'חושבת כמה זה מביך...' : 'Calculating how embarrassing this is...';
    
    setTimeout(() => {
      cynicAnswerBox.style.transform = 'scale(1)';
      renderCynicQuote(true);
      cynicAnswerBox.classList.add('active');
    }, 450);
  }

  // Render Poll Options
  function renderPoll() {
    if (!pollContainer) return;
    const isRtl = state.lang === 'he';
    const trans = SITE_DATA.translations[state.lang];

    let totalVotes = 0;
    SITE_DATA.pollOptions.forEach(opt => {
      const stored = state.votes[opt.id] || 0;
      totalVotes += (opt.votes + stored);
    });

    pollContainer.innerHTML = '';
    SITE_DATA.pollOptions.forEach(opt => {
      const userExtra = state.votes[opt.id] || 0;
      const votesCount = opt.votes + userExtra;
      const percent = totalVotes > 0 ? Math.round((votesCount / totalVotes) * 100) : 0;
      const hasVoted = state.votedOptions.includes(opt.id);

      const card = document.createElement('div');
      card.className = `poll-card ${hasVoted ? 'voted' : ''}`;
      card.innerHTML = `
        <h3>${isRtl ? opt.titleHe : opt.titleEn}</h3>
        <p>${isRtl ? opt.descHe : opt.descEn}</p>
        <div class="poll-meta">
          <span>${percent}%</span>
          <span>${votesCount.toLocaleString()} ${isRtl ? 'קולות' : 'votes'}</span>
        </div>
        <div class="poll-progress-track">
          <div class="poll-progress-fill" style="width: ${percent}%"></div>
        </div>
        <button class="btn-vote" data-id="${opt.id}">
          ${hasVoted ? `✓ ${trans.pitchVoted}` : trans.pitchVoteBtn}
        </button>
      `;

      const voteBtn = card.querySelector('.btn-vote');
      voteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        castVote(opt.id);
      });

      pollContainer.appendChild(card);
    });
  }

  function castVote(optId) {
    if (state.votedOptions.includes(optId)) {
      showToast(state.lang === 'he' ? 'כבר הצבעת לפיצ\'ר הזה!' : 'You already voted for this feature!');
      return;
    }

    audio.ding();
    state.votes[optId] = (state.votes[optId] || 0) + 1;
    state.votedOptions.push(optId);

    localStorage.setItem('liya_votes', JSON.stringify(state.votes));
    localStorage.setItem('liya_voted_options', JSON.stringify(state.votedOptions));

    renderPoll();
    showToast(state.lang === 'he' ? 'ההצבעה נקלטה! ליה קיבלה את המסר.' : 'Vote registered! Liya received the hint.');
  }

  // Render Confessions Wall
  function renderConfessions() {
    if (!confessWall) return;
    const isRtl = state.lang === 'he';
    const all = [...state.confessions, ...SITE_DATA.confessions];

    confessWall.innerHTML = '';
    all.forEach(item => {
      const card = document.createElement('div');
      card.className = 'confess-card';
      const author = isRtl ? item.author : (item.authorEn || item.author);
      const text = isRtl ? item.textHe : (item.textEn || item.textHe);

      card.innerHTML = `
        <div class="confess-header">
          <span class="confess-author">💀 ${author}</span>
          <span class="confess-time">${item.timestamp}</span>
        </div>
        <p class="confess-text">"${text}"</p>
      `;
      confessWall.appendChild(card);
    });
  }

  // Render Concept Merch
  function renderMerch() {
    if (!merchGrid) return;
    const isRtl = state.lang === 'he';
    const trans = SITE_DATA.translations[state.lang];

    merchGrid.innerHTML = '';
    SITE_DATA.merch.forEach(item => {
      const card = document.createElement('div');
      card.className = 'merch-card';
      const title = isRtl ? item.titleHe : item.titleEn;
      const desc = isRtl ? item.descHe : item.descEn;
      const badge = isRtl ? item.badgeHe : item.badgeEn;
      const price = isRtl ? item.price : item.priceUsd;

      card.innerHTML = `
        <div class="merch-img-wrapper">
          <img class="merch-img" src="${item.imageMock}" alt="${title}" loading="lazy" />
          <div class="merch-badge">${badge}</div>
        </div>
        <div class="merch-content">
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="merch-footer">
            <span class="merch-price">${price}</span>
            <button class="btn-pill btn-buy" data-id="${item.id}">
              ${trans.merchBuyBtn}
            </button>
          </div>
        </div>
      `;

      const buyBtn = card.querySelector('.btn-buy');
      buyBtn.addEventListener('click', () => {
        audio.pop();
        showToast(trans.merchToast, 4000);
      });

      merchGrid.appendChild(card);
    });
  }

  // Setup Event Handlers
  function setupEvents() {
    // "Hey Liya!" Modal triggers
    if (forLiyaBtn && forLiyaModal) {
      forLiyaBtn.addEventListener('click', () => {
        audio.warmChime();
        forLiyaModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (liyaModalCloseBtn) {
      liyaModalCloseBtn.addEventListener('click', closeModal);
    }
    if (liyaCloseActionBtn) {
      liyaCloseActionBtn.addEventListener('click', closeModal);
    }

    if (copySiteLinkBtn) {
      copySiteLinkBtn.addEventListener('click', () => {
        audio.ding();
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast(state.lang === 'he' ? 'הקישור הועתק! שימי אותו בסטורי של ליה 🤳' : 'Link copied! Drop it on Liya\'s story 🤳');
        });
      });
    }

    // Sanity first-aid button
    if (sanityBtn) {
      sanityBtn.addEventListener('click', triggerSanityBoost);
    }

    // Language toggle
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        audio.pop();
        const nextLang = state.lang === 'he' ? 'en' : 'he';
        setLanguage(nextLang);
        updateSoundButton();
      });
    }

    // Sound toggle
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        localStorage.setItem('liya_sound', state.soundEnabled);
        if (state.soundEnabled) audio.ding();
        updateSoundButton();
      });
    }

    // Filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audio.pop();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.getAttribute('data-filter');
        renderReels();
      });
    });

    // Cynic 8-Ball Roaster
    if (cynicBtn) {
      cynicBtn.addEventListener('click', triggerCynicRoast);
    }
    if (cynicInput) {
      cynicInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          triggerCynicRoast();
        }
      });
    }

    // Copy Quote
    if (cynicCopyBtn) {
      cynicCopyBtn.addEventListener('click', () => {
        audio.pop();
        const textToCopy = cynicText.textContent.replace(/^"|"$/g, '');
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(SITE_DATA.translations[state.lang].cynicCopied);
        });
      });
    }

    // Custom Pitch Form
    if (customPitchForm) {
      customPitchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = pitchInput.value.trim();
        if (!text) return;

        audio.ding();
        state.userPitches.push({
          text,
          date: new Date().toISOString()
        });
        localStorage.setItem('liya_user_pitches', JSON.stringify(state.userPitches));
        pitchInput.value = '';

        const msg = state.lang === 'he' 
          ? 'ההצעה נשמרה! אם ליה תאהב אותה, אולי לא תתעלם ממנה.'
          : 'Pitch saved! If Liya likes it, she might not ignore it.';
        showToast(msg);
      });
    }

    // Confession Form
    if (confessForm) {
      confessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = confessText.value.trim();
        if (!text) return;

        audio.ding();
        const authorVal = confessAuthor.value.trim() || (state.lang === 'he' ? 'משתמש אנונימי' : 'Anonymous');
        const newConfession = {
          author: authorVal,
          authorEn: authorVal,
          textHe: text,
          textEn: text,
          timestamp: state.lang === 'he' ? 'עכשיו' : 'Just now',
          verified: false
        };

        state.confessions.unshift(newConfession);
        localStorage.setItem('liya_user_confessions', JSON.stringify(state.confessions));

        confessText.value = '';
        confessAuthor.value = '';
        renderConfessions();

        showToast(state.lang === 'he' ? 'הווידוי נזרק לחלל הריק! תודה על הכנות.' : 'Confession dropped into the void! Thank you for the honesty.');
      });
    }

    // Modal close events
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closeModal();
        }
      });
    }
    if (forLiyaModal) {
      forLiyaModal.addEventListener('click', (e) => {
        if (e.target === forLiyaModal) {
          closeModal();
        }
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // Initialization
  setLanguage(state.lang);
  updateSoundButton();
  setupEvents();
  renderCynicQuote(true);
});
