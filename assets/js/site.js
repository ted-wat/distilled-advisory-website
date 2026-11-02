// Distilled Advisory site JS.
// Three small jobs: nav scroll state, mobile drawer, scroll-reveal.

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const drawer = document.getElementById('nav-drawer');
  const toggle = document.querySelector('.nav__toggle');

  // ---- Nav scroll state -----------------------------------------------
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Mobile drawer --------------------------------------------------
  if (toggle && drawer) {
    const setOpen = (isOpen) => {
      drawer.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      drawer.inert = !isOpen;
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    setOpen(false);
    toggle.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (event) => {
      if (!drawer.classList.contains('is-open')) return;
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.focus();
      }
      if (event.key === 'Tab') {
        const last = drawer.querySelector('a:last-child');
        if (event.shiftKey && document.activeElement === toggle) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); toggle.focus();
        }
      }
    });
    window.matchMedia('(min-width: 881px)').addEventListener('change', (event) => {
      if (event.matches) setOpen(false);
    });
  }

  // ---- Scroll reveal --------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();
