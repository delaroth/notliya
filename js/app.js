// ==========================================================================
// notliya.com • Main Application Engine
// Multi-theme color switcher, organic polaroid collage, and creative art gallery
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // [LINES 1-702: ALL PREVIOUS CODE STAYS THE SAME - Theme, Audio, Language, Gallery, etc.]
  // I'm only showing the CHANGED section below (Lines 704-958)

  // ========================================================================
  // VIP PERSONAL LETTER FROM LEVI - SIMPLIFIED & TARGETED
  // Only shows the modal & banner SPECIFICALLY for Israel first-time viewers
  // Does NOT affect CSS, JS, images, or any site styling
  // ========================================================================
  
  const forLiyaBtn = document.getElementById('forLiyaBtn');
  const forLiyaModal = document.getElementById('forLiyaModal');
  const liyaModalCloseBtn = document.getElementById('liyaModalCloseBtn');
  const creatorBannerContainer = document.getElementById('creatorBannerContainer');
  const enterSiteBtn = document.getElementById('enterSiteBtn');

  // Simple timezone-based check (no async API calls)
  const localTz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
  const isIsraelTz = localTz.includes('jerusalem') || localTz.includes('tel_aviv');
  const isHebrewLang = (navigator.language || navigator.userLanguage || '').toLowerCase().startsWith('he');
  
  // Detect if visitor is likely in Israel
  const isLikelyIsrael = isIsraelTz || (isHebrewLang && !localTz.includes('sofia'));
  
  // Check if already seen
  const hasSeenLocally = localStorage.getItem('liya_welcome_seen') === 'true';
  
  // Helper functions
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
    
    // Mark as seen and hide the button/banner
    localStorage.setItem('liya_welcome_seen', 'true');
    if (forLiyaBtn) forLiyaBtn.style.display = 'none';
    if (creatorBannerContainer) creatorBannerContainer.style.display = 'none';
    
    // Clean URL
    if (window.history && window.history.replaceState) {
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }
  }

  // Event listeners
  if (forLiyaBtn) forLiyaBtn.addEventListener('click', openLiyaModal);
  if (liyaModalCloseBtn) liyaModalCloseBtn.addEventListener('click', closeLiyaModal);
  if (forLiyaModal) {
    forLiyaModal.addEventListener('click', (e) => {
      if (e.target === forLiyaModal) closeLiyaModal();
    });
  }
  if (enterSiteBtn) {
    enterSiteBtn.addEventListener('click', () => {
      closeLiyaModal();
      showToast(state.lang === 'he' ? 'ברוכה הבאה לאתר שלך! ✨' : 'Welcome to your site! ✨');
    });
  }

  // MAIN LOGIC: Show message ONLY to Israel visitors on first view
  function initVipViewEngine() {
    // If already seen, hide the message completely
    if (hasSeenLocally) {
      if (forLiyaBtn) forLiyaBtn.style.display = 'none';
      if (creatorBannerContainer) creatorBannerContainer.style.display = 'none';
      return;
    }

    // If visitor is from Israel AND first time viewing
    if (isLikelyIsrael) {
      if (forLiyaBtn) forLiyaBtn.style.display = 'inline-flex';
      if (creatorBannerContainer) creatorBannerContainer.style.display = 'block';
      
      // Auto-open modal after 700ms
      setTimeout(() => openLiyaModal(), 700);
      return;
    }

    // All other visitors: hide the message completely
    if (forLiyaBtn) forLiyaBtn.style.display = 'none';
    if (creatorBannerContainer) creatorBannerContainer.style.display = 'none';
  }

  // Run it
  initVipViewEngine();

  // [LINES 960-1039: ALL REMAINING CODE STAYS THE SAME]
  // Voice player, ESC key listener, app initialization, etc.
});
