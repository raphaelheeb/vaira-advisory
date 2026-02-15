/* assets/js/lang.js */
/* VAIRA Advisory – simple EN/DE language switcher
   - toggles visibility of [lang="en"] and [lang="de"]
   - persists selection in localStorage
   - auto-activates correct button on each page
*/
(function () {
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'vaira-lang';

  // Get saved lang, or probe browser once (first visit)
  function detectInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    } catch (_) {}
    // simple browser hint (en/de only)
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /(^de\b|[-_]de\b)/i.test(nav) ? 'de' : DEFAULT_LANG;
  }

  function applyLang(lang) {
    const root = document.documentElement;
    root.classList.remove('lang-en', 'lang-de');
    root.classList.add('lang-' + lang);

    // Update buttons active state (if present)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    // Persist
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  // Initialize
  const initial = detectInitialLang();
  applyLang(initial);

  // Attach handlers (delegation)
  document.addEventListener('click', (e) => {
    const el = e.target.closest('.lang-btn');
    if (!el) return;
    const lang = el.dataset.lang;
    if (lang === 'en' || lang === 'de') applyLang(lang);
  });
})();
