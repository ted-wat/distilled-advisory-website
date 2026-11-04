// Distilled site behaviour: chapter colour, header tone, mobile menu, entrances.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var body = document.body;
  var header = document.querySelector('.site-header');
  var chapters = [].slice.call(document.querySelectorAll('[data-tone]'));
  var toneBg = { accent: 'var(--accent)', paper: 'var(--paper-100)', ink: 'var(--ink-900)' };

  // The page takes the tone of the chapter under the header line.
  function setTone() {
    var line = 90;
    var current = chapters[0];
    for (var i = 0; i < chapters.length; i++) {
      if (chapters[i].getBoundingClientRect().top <= line) current = chapters[i];
    }
    if (!current) return;
    var tone = current.getAttribute('data-tone');
    // Body colour follows the chapter under the middle of the screen.
    var mid = window.innerHeight * 0.55;
    var bodyTone = tone;
    for (var j = 0; j < chapters.length; j++) {
      var r = chapters[j].getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) bodyTone = chapters[j].getAttribute('data-tone');
    }
    body.setAttribute('data-tone', bodyTone);
    if (header) {
      header.classList.toggle('is-light', tone === 'paper');
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      header.style.setProperty('--hdr-bg', toneBg[tone]);
    }
  }
  if (chapters.length) {
    setTone();
    window.addEventListener('scroll', setTone, { passive: true });
    window.addEventListener('resize', setTone);
  }

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    function close() { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menu'; }
    btn.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { close(); btn.focus(); } });
  }

  // Entrances
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
