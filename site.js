/* Weave Solutions — shared script for every site page */

/* ===== The website's email address. Change it here only — every page picks it up. ===== */
var WEAVE_EMAIL = 'weavesolution.connect@gmail.com';

(function () {
  var d = document, h = d.querySelector('.hdr'), b = d.querySelector('.burger');
  var WA = '917647989523';
  d.documentElement.classList.add('js');

  /* email links */
  var mailSet = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(WEAVE_EMAIL);
  d.querySelectorAll('[data-email]').forEach(function (a) {
    if (!mailSet) { if (a.classList.contains('way')) a.remove(); return; }
    a.href = 'mailto:' + WEAVE_EMAIL;
    var t = a.querySelector('[data-email-text]'); if (t && a.classList.contains('way')) t.textContent = WEAVE_EMAIL;
  });

  /* mobile menu */
  if (b) {
    b.addEventListener('click', function () {
      var open = h.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    d.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { h.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); });
    });
  }
  /* desktop: the "Our work" / "Free tools" buttons open their page */
  d.querySelectorAll('.nav .top').forEach(function (t) {
    t.addEventListener('click', function () { if (window.innerWidth > 860) location.href = t.dataset.href; });
  });

  /* missing pictures show their caption instead of a broken image */
  d.querySelectorAll('.ph img').forEach(function (i) {
    function m() { i.parentElement.classList.add('missing'); }
    i.addEventListener('error', m);
    /* lazy pictures that have not loaded yet are not missing; only check ones that finished */
    if (i.loading !== 'lazy' && i.complete && i.naturalWidth === 0) m();
  });
  var lg = d.querySelector('.brand img');
  if (lg) lg.addEventListener('error', function () { lg.remove(); d.querySelector('.brand').classList.add('nologo'); });

  /* footer year */
  d.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* floating WhatsApp chat button */
  var page = (d.querySelector('h1') || {}).textContent || d.title;
  var fab = d.createElement('a');
  fab.className = 'wa-fab'; fab.rel = 'noopener'; fab.target = '_blank';
  fab.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hello Weave Solutions, I was looking at "' + page.trim() + '" on your website. ');
  fab.setAttribute('aria-label', 'Chat with us on WhatsApp');
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 1.9a7.8 7.8 0 1 1-4 14.5l-.4-.2-2.9.8.8-2.9-.2-.4A7.8 7.8 0 0 1 12 4.1Zm-3.1 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4Z"/></svg><span>Chat with us</span>';
  fab.addEventListener('click', function () { if (window.gtag) gtag('event', 'whatsapp_click', { page: location.pathname }); });
  d.body.appendChild(fab);

  /* reveal on scroll */
  var rv = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var o = new IntersectionObserver(function (e) {
      e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('sh'); o.unobserve(x.target); } });
    }, { threshold: .1 });
    rv.forEach(function (el, i) { el.style.transitionDelay = (i % 3 * 60) + 'ms'; o.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('sh'); });

  /* download buttons — links come from the "Downloads" tab of the Google Sheet.
     Kept on the phone for 30 minutes so most visits cost no Apps Script call at all. */
  var slots = d.querySelectorAll('[data-dl]');
  if (slots.length && window.WEAVE_EP) {
    var KEY = 'weave.links', MAX = 30 * 60 * 1000, cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { }
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var safe = function (u) { return /^https:\/\//i.test(String(u)) ? u : ''; };
    var paint = function (rows) {
      slots.forEach(function (s) {
        var mine = (rows || []).filter(function (r) { return r.p === s.dataset.dl && safe(r.u); });
        if (!mine.length) { s.hidden = true; s.innerHTML = ''; return; }
        s.innerHTML = '<div class="dl-h">Download the latest version</div>' + mine.map(function (r) {
          return '<a class="dl-btn" href="' + esc(safe(r.u)) + '" target="_blank" rel="noopener" data-p="' + esc(r.p) + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14"/></svg>' +
            '<span><b>' + esc(r.l || 'Download') + '</b>' + (r.v || r.d ? '<small>' + esc([r.v ? 'Version ' + r.v : '', r.d].filter(Boolean).join(' · ')) + '</small>' : '') + '</span></a>';
        }).join('');
        s.hidden = false;
        s.querySelectorAll('.dl-btn').forEach(function (a) {
          a.addEventListener('click', function () { if (window.gtag) gtag('event', 'file_download', { product: a.dataset.p }); });
        });
      });
    };
    if (cached && cached.rows) paint(cached.rows);
    if (!cached || Date.now() - cached.t > MAX) {
      fetch(window.WEAVE_EP + '?action=links').then(function (r) { return r.json(); }).then(function (j) {
        if (!j || !j.ok) return;
        try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), rows: j.rows })); } catch (e) { }
        paint(j.rows);
      }).catch(function () { });
    }
  }

  /* screenshot galleries: tap to enlarge, arrows / swipe to move */
  var gals = d.querySelectorAll('.gal');
  if (!gals.length) return;
  var lb = d.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Screenshot');
  lb.innerHTML = '<img alt=""><button class="lb-p" aria-label="Previous">&#8249;</button><button class="lb-n" aria-label="Next">&#8250;</button>' +
    '<button class="lb-x" aria-label="Close">&times;</button><div class="lb-c"></div>';
  d.body.appendChild(lb);
  var img = lb.querySelector('img'), cap = lb.querySelector('.lb-c'), list = [], idx = 0, back = null;
  function show(i) {
    idx = (i + list.length) % list.length;
    var t = list[idx].querySelector('img');
    img.src = t.currentSrc || t.src; img.alt = t.alt; cap.textContent = t.alt + '  ·  ' + (idx + 1) + ' of ' + list.length;
    lb.querySelector('.lb-p').hidden = lb.querySelector('.lb-n').hidden = list.length < 2;
  }
  function close() { lb.classList.remove('show'); d.body.style.overflow = ''; if (back) back.focus(); }
  gals.forEach(function (g) {
    var items = Array.prototype.slice.call(g.querySelectorAll('button'));
    items.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        list = items; back = btn; show(i); lb.classList.add('show'); d.body.style.overflow = 'hidden'; lb.querySelector('.lb-x').focus();
      });
    });
  });
  lb.querySelector('.lb-x').onclick = close;
  lb.querySelector('.lb-p').onclick = function () { show(idx - 1); };
  lb.querySelector('.lb-n').onclick = function () { show(idx + 1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  d.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('show')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
  var sx = null;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });
})();
