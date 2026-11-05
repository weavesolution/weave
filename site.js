/* Weave Solutions — shared script for every site page */
(function () {
  var d = document, h = d.querySelector('.hdr'), b = d.querySelector('.burger');
  d.documentElement.classList.add('js');

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

  /* reveal on scroll */
  var rv = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var o = new IntersectionObserver(function (e) {
      e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('sh'); o.unobserve(x.target); } });
    }, { threshold: .1 });
    rv.forEach(function (el, i) { el.style.transitionDelay = (i % 3 * 60) + 'ms'; o.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('sh'); });

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
