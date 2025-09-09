// main.js
(() => {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const links = Array.from(document.querySelectorAll('[data-tab]'));
  if (!tabs.length || !links.length) return;

  const byId = id => document.getElementById(id);

  function setActive(id, { push = true, focus = false } = {}) {
    const target = byId(id) || byId('home') || tabs[0];
    if (!target) return;

    // show the target tab, hide others
    tabs.forEach(sec => sec.classList.toggle('active', sec === target));

    // update nav state + a11y
    links.forEach(a => {
      const on = a.getAttribute('data-tab') === target.id;
      a.classList.toggle('active', on);
      a.setAttribute('aria-selected', on);
      if (on) {
        a.setAttribute('aria-current', 'page');
        a.removeAttribute('tabindex');
      } else {
        a.removeAttribute('aria-current');
        a.setAttribute('tabindex', '-1');
      }
    });

    // keep the URL hash synced
    if (push) {
      const hash = '#' + target.id;
      if (location.hash !== hash) history.pushState({ tab: target.id }, '', hash);
    }

    // optional: move focus for keyboard users
    if (focus) {
      const h = target.querySelector('h1, h2, h3, [tabindex]');
      if (h) try { h.focus({ preventScroll: true }); } catch (_) {}
    }
  }

  // click handler for all [data-tab] links (doesn't touch external links)
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
    else {
      const initial = document.querySelector('.tab.active')?.id || 'home';
      setActive(initial, { push });
    }
  }

  window.addEventListener('popstate', () => initFromHash(false));
  window.addEventListener('hashchange', () => initFromHash(false));
  document.addEventListener('DOMContentLoaded', () => initFromHash(false));
})();
