// Tabs + theme toggle with deep linking and history support
(() => {
  // ----- Tabs -----
  const tabs  = Array.from(document.querySelectorAll('.tab'));
  const links = Array.from(document.querySelectorAll('[data-tab]'));
  if (!tabs.length || !links.length) return;

  const byId = id => document.getElementById(id);

  function setActive(id, { push = true, focus = false } = {}) {
    const target = byId(id) || byId('home') || tabs[0];
    if (!target) return;

    // Show selected tab, hide others
    tabs.forEach(sec => sec.classList.toggle('active', sec === target));

    // Update nav state + a11y
    links.forEach(a => {
      const on = a.getAttribute('data-tab') === target.id;
      a.classList.toggle('active', on);
      a.setAttribute('aria-selected', on);
      if (on) { a.setAttribute('aria-current','page'); a.removeAttribute('tabindex'); }
      else    { a.removeAttribute('aria-current'); a.setAttribute('tabindex','-1'); }
    });

    // Sync URL hash
    if (push) {
      const hash = '#' + target.id;
      if (location.hash !== hash) history.pushState({ tab: target.id }, '', hash);
    }

    // Optional focus move
    if (focus) {
      const h = target.querySelector('h1, h2, h3, [tabindex]');
      if (h) try { h.focus({ preventScroll: true }); } catch(_) {}
    }
  }

  // Clicks on any element with data-tab (ignore theme-toggle etc.)
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-tab]');
    if (!link) return;
    const id = link.getAttribute('data-tab');
    if (!id) return;
    e.preventDefault();
    setActive(id, { push: true, focus: true });
  });

  function initFromHash(push = false) {
    const id = (location.hash || '').slice(1);
    if (id) setActive(id, { push });
    else setActive(document.querySelector('.tab.active')?.id || 'home', { push });
  }

  window.addEventListener('popstate', () => initFromHash(false));
  window.addEventListener('hashchange', () => initFromHash(false));
  document.addEventListener('DOMContentLoaded', () => initFromHash(false));

  // ----- Light/Dark theme toggle -----
  const KEY = "theme";
  const btn = document.getElementById("theme-toggle");
  const mq  = window.matchMedia("(prefers-color-scheme: light)");

  const resolvedTheme = () => localStorage.getItem(KEY) || (mq.matches ? "light" : "dark");

  function renderTheme(theme) {
    const t = theme || resolvedTheme();
    document.documentElement.setAttribute("data-theme", t);
    if (btn) {
      const light = t === "light";
      btn.setAttribute("aria-pressed", String(light));
      btn.textContent = light ? "☀️" : "🌙";
      btn.title = light ? "Switch to dark" : "Switch to light";
    }
  }
  function setTheme(next) {
    localStorage.setItem(KEY, next);
    renderTheme(next);
  }

  renderTheme(); // init

  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || resolvedTheme();
      setTheme(current === "light" ? "dark" : "light");
    });
  }

  // Follow system if user hasn't chosen
  mq.addEventListener("change", (e) => {
    if (!localStorage.getItem(KEY)) renderTheme(e.matches ? "light" : "dark");
  });
})();
