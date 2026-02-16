/* assets/js/lang.js */
/* VAIRA Advisory – simple EN/DE language switcher with persistence */
(function () {
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'vaira-lang';

  function detectInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    } catch (_) {}
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /(^de\b|[-_]de\b)/i.test(nav) ? 'de' : DEFAULT_LANG;
  }

  function applyLang(lang) {
    const root = document.documentElement;
    root.classList.remove('lang-en', 'lang-de');
    root.classList.add('lang-' + lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  const initial = detectInitialLang();
  applyLang(initial);

  document.addEventListener('click', (e) => {
    const el = e.target.closest('.lang-btn');
    if (!el) return;
    const lang = el.dataset.lang;
    if (lang === 'en' || lang === 'de') applyLang(lang);
  });
})();
