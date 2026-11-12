/* Ayoub Bni-Bourk — portfolio behaviour. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  };
  var css = function (name) { return getComputedStyle(root).getPropertyValue(name).trim(); };

  /* Run a callback while an element is on screen, stop when it leaves. */
  function whileVisible(el, onChange, margin) {
    if (!('IntersectionObserver' in window)) { onChange(true); return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { onChange(e.isIntersecting); });
    }, { rootMargin: margin || '80px' }).observe(el);
  }

  /* ======================================================================
     Language (English is in the HTML, French in fr.js)
     ====================================================================== */
  var STR = {
    en: {
      'meta.title': document.title,
      'meta.desc': ($('meta[name="description"]') || {}).content || '',
      'tank.flow': 'Scrubber valve: flow control', 'tank.level': 'Scrubber valve: follows tank 07 level',
      'tank.more': 'Increase demand', 'tank.normal': 'Normal demand',
      'tank.scrubber': 'SCRUBBER', 'tank.name': 'TANK 07', 'tank.pumps': 'PUMPS',
      'rfid.tool': 'TOOL', 'rfid.prog': 'PROGRAM',
      'toast.copied': 'Email address copied',
      'msg.hello': 'Hello Ayoub,', 'msg.need': 'Need', 'msg.name': 'Name', 'msg.co': 'Company',
      'msg.subject': 'Request from your website'
    },
    fr: {
      'tank.flow': 'Vanne laveur : régulation débit', 'tank.level': 'Vanne laveur : suit le niveau du bac 07',
      'tank.more': 'Augmenter la consommation', 'tank.normal': 'Consommation normale',
      'tank.scrubber': 'LAVEUR', 'tank.name': 'BAC 07', 'tank.pumps': 'POMPES',
      'rfid.tool': 'OUTIL', 'rfid.prog': 'PROGRAMME',
      'toast.copied': 'Adresse e-mail copiée',
      'msg.hello': 'Bonjour Ayoub,', 'msg.need': 'Besoin', 'msg.name': 'Nom', 'msg.co': 'Société',
      'msg.subject': 'Demande depuis votre site'
    }
  };
  var frDict = window.I18N_FR || {};
  Object.keys(frDict).forEach(function (k) { STR.fr[k] = frDict[k]; });

  var lang = root.getAttribute('data-lang') === 'fr' ? 'fr' : 'en';
  function t(key) { return (STR[lang] && STR[lang][key]) || STR.en[key] || ''; }

  var i18nNodes = $$('[data-i18n]');
  var i18nAttrs = $$('[data-i18n-attr]').map(function (el) {
    return {
      el: el,
      pairs: el.getAttribute('data-i18n-attr').split(';').map(function (p) {
        var a = p.split(':'); return { attr: a[0].trim(), key: a[1].trim() };
      })
    };
  });
  // remember the English that is written in the page
  i18nNodes.forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in STR.en)) STR.en[k] = el.innerHTML.replace(/\s+/g, ' ').trim();
  });
  i18nAttrs.forEach(function (o) {
    o.pairs.forEach(function (p) { if (!(p.key in STR.en)) STR.en[p.key] = o.el.getAttribute(p.attr) || ''; });
  });

  var langListeners = [];
  function applyLang() {
    root.setAttribute('lang', lang);
    root.setAttribute('data-lang', lang);
    i18nNodes.forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    i18nAttrs.forEach(function (o) { o.pairs.forEach(function (p) { o.el.setAttribute(p.attr, t(p.key)); }); });
    document.title = t('meta.title');
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta.desc'));
    $$('[data-set-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang)); });
    langListeners.forEach(function (fn) { fn(); });
  }
  function setLang(next) {
    if (next === lang) return;
    lang = next; store.set('lang', lang);
    if (reduced) { applyLang(); return; }
    root.classList.add('is-swapping');
    setTimeout(function () { applyLang(); root.classList.remove('is-swapping'); }, 160);
  }
  $$('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
  });
  if (lang !== 'en') applyLang(); else $$('[data-set-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === 'en')); });

  /* ======================================================================
     Theme
     ====================================================================== */
  var themeListeners = [];
  var themeBtn = $('#themeBtn');
  function applyTheme(th) {
    root.setAttribute('data-theme', th);
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', th === 'light' ? '#e6e8e3' : '#0a0f14');
    themeListeners.forEach(function (fn) { fn(); });
  }
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    store.set('theme', next);
    if (!document.startViewTransition || reduced) { applyTheme(next); return; }
    var r = themeBtn.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var vt = document.startViewTransition(function () { applyTheme(next); });
    vt.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + end + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(function () { });
  });

  /* ======================================================================
     Header: mobile menu, active link, progress bar
     ====================================================================== */
  var header = $('#siteHeader'), menu = $('#menu'), burger = $('#burger'), progress = $('#progress');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', String(open));
    });
    // tap anywhere outside the panel closes it
    document.addEventListener('pointerdown', function (e) {
      if (menu.classList.contains('is-open') && !e.target.closest('#menu, #burger')) closeMenu();
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (innerWidth > 1120) closeMenu(); });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || 0, max = root.scrollHeight - innerHeight;
      if (header) header.classList.toggle('is-stuck', y > 8);
      if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')';
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  if ('IntersectionObserver' in window && menu) {
    var links = {};
    $$('a[href^="#"]', menu).forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var navIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('is-on', k === e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { navIO.observe(s); });
  }

  /* ======================================================================
     Reveal on scroll, ladder rungs, figures
     ====================================================================== */
  var revealEls = $$('[data-reveal]');
  revealEls.forEach(function (el) {
    var sibs = $$(':scope > [data-reveal]', el.parentElement);
    var i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty('--d', (i % 3) * 90 + 'ms');
  });
  if ('IntersectionObserver' in window && !reduced) {
    var revIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); revIO.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { revIO.observe(el); });
    var rungIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-live'); rungIO.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0.5 });
    $$('[data-rung]').forEach(function (el) { rungIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
    $$('[data-rung]').forEach(function (el) { el.classList.add('is-live'); });
  }
  // safety net: never leave content hidden
  setTimeout(function () {
    revealEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
    });
  }, 2500);

  $$('[data-fig]').forEach(function (fig) {
    whileVisible(fig, function (on) { fig.classList.toggle('is-playing', on && !reduced); });
  });

  // RFID figure: step through the stations
  (function () {
    var fig = $('#figRfid'), txt = $('#rfidTxt'); if (!fig || !txt) return;
    var rects = $$('.g-st rect', fig), i = 0, timer = null;
    function paint() {
      rects.forEach(function (r, k) { r.classList.toggle('is-on', k === i); });
      var n = ('0' + (i + 1)).slice(-2);
      txt.textContent = t('rfid.tool') + ' ' + n + ' → ' + t('rfid.prog') + ' ' + n;
    }
    paint(); langListeners.push(paint);
    if (reduced) return;
    whileVisible(fig, function (on) {
      clearInterval(timer);
      if (on) timer = setInterval(function () { i = (i + 1) % rects.length; paint(); }, 950);
    });
  })();

  /* phones: older roles fold away behind a "Details" button */
  $$('.sfc__more').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.closest('.sfc__step').classList.toggle('is-open');
      b.setAttribute('aria-expanded', String(open));
    });
  });

  /* phones: the project cards become a swipeable row, with position dots */
  (function () {
    var list = $('.cases'); if (!list) return;
    var items = $$('.case', list), dots = document.createElement('div'), busy = false;
    dots.className = 'cases__dots'; dots.setAttribute('aria-hidden', 'true');
    items.forEach(function () { dots.appendChild(document.createElement('i')); });
    list.parentNode.insertBefore(dots, list.nextSibling);
    function update() {
      busy = false;
      var w = items[0].getBoundingClientRect().width + 12;
      var i = clamp(Math.round(list.scrollLeft / w), 0, items.length - 1);
      Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle('is-on', k === i); });
    }
    list.addEventListener('scroll', function () { if (!busy) { busy = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  })();

  /* pointer spotlight on cards */
  $$('[data-spot]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ticker: duplicate the list once so the loop is seamless */
  (function () {
    var tr = $('#ticker'); if (!tr) return;
    var ul = $('ul', tr), copy = ul.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true'); tr.appendChild(copy); tr.classList.add('is-ready');
  })();

  /* hero read-outs count up */
  if (!reduced) $$('[data-count]').forEach(function (el) {
    var end = parseInt(el.getAttribute('data-count'), 10), start = performance.now() + 1100, dur = 900;
    el.textContent = '0';
    (function step(now) {
      var p = clamp((now - start) / dur, 0, 1);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  });

  /* ======================================================================
     Hero background: wiring traces with travelling signals
     ====================================================================== */
  (function () {
    var cv = $('#heroBg'); if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d'), W = 0, H = 0, paths = [], col = {}, raf = 0, visible = true, last = 0;
    var G = 44;
    function rng(seed) { return function () { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }; }
    function colours() {
      col = { line: css('--line'), dot: css('--line-2'), sig: [css('--teal'), css('--amber'), css('--green'), css('--teal')] };
    }
    function build() {
      var r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; if (!W || !H) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var rnd = rng(7), cols = Math.ceil(W / G), rows = Math.ceil(H / G);
      var n = clamp(Math.round(W / 85), 6, 18);
      paths = [];
      for (var i = 0; i < n; i++) {
        var x = Math.floor(rnd() * cols) * G, y = Math.floor(rnd() * rows) * G, horiz = rnd() > 0.5;
        var pts = [[x, y]], len = 0, segs = 3 + Math.floor(rnd() * 4);
        for (var s = 0; s < segs; s++) {
          var d = (2 + Math.floor(rnd() * 6)) * G * (rnd() > 0.35 ? 1 : -1);
          if (horiz) x = clamp(x + d, 0, cols * G); else y = clamp(y + d, 0, rows * G);
          var p0 = pts[pts.length - 1]; len += Math.abs(x - p0[0]) + Math.abs(y - p0[1]);
          pts.push([x, y]); horiz = !horiz;
        }
        if (len > 4 * G) paths.push({ pts: pts, len: len, pos: rnd() * len, v: 70 + rnd() * 110, wait: rnd() * 4, c: i % 4, tail: 60 + rnd() * 80 });
      }
      colours(); draw(0);
    }
    function trace(p) {
      ctx.beginPath(); ctx.moveTo(p.pts[0][0] + 0.5, p.pts[0][1] + 0.5);
      for (var k = 1; k < p.pts.length; k++) ctx.lineTo(p.pts[k][0] + 0.5, p.pts[k][1] + 0.5);
    }
    function draw(dt) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = col.dot; ctx.globalAlpha = 0.55;
      for (var gx = 0; gx <= W; gx += G) for (var gy = 0; gy <= H; gy += G) ctx.fillRect(gx, gy, 1.5, 1.5);
      ctx.globalAlpha = 1; ctx.lineWidth = 1; ctx.lineJoin = 'round'; ctx.setLineDash([]);
      paths.forEach(function (p) {
        ctx.strokeStyle = col.line; trace(p); ctx.stroke();
        var a = p.pts[0], b = p.pts[p.pts.length - 1];
        ctx.fillStyle = col.dot; ctx.fillRect(a[0] - 2.5, a[1] - 2.5, 6, 6); ctx.fillRect(b[0] - 2.5, b[1] - 2.5, 6, 6);
      });
      if (reduced) return;
      ctx.lineWidth = 2; ctx.lineCap = 'round';
      paths.forEach(function (p) {
        if (p.wait > 0) { p.wait -= dt; return; }
        p.pos += p.v * dt;
        if (p.pos > p.len + p.tail) { p.pos = 0; p.wait = 0.5 + Math.random() * 3.5; return; }
        ctx.strokeStyle = col.sig[p.c]; ctx.shadowColor = col.sig[p.c]; ctx.shadowBlur = 10;
        ctx.setLineDash([p.tail, p.len + p.tail * 2]); ctx.lineDashOffset = p.tail - p.pos;
        trace(p); ctx.stroke();
      });
      ctx.shadowBlur = 0; ctx.setLineDash([]);
    }
    function loop(now) {
      raf = 0; if (!visible || document.hidden) return;
      var dt = Math.min(0.05, (now - last) / 1000 || 0); last = now; draw(dt);
      raf = requestAnimationFrame(loop);
    }
    function start() { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } }
    build();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
    themeListeners.push(function () { colours(); draw(0); });
    whileVisible(cv, function (on) { visible = on; if (on) start(); }, '0px');
    document.addEventListener('visibilitychange', start);
  })();

  /* ======================================================================
     Live PID faceplate (first-order process with dead time + PI controller)
     ====================================================================== */
  (function () {
    var box = $('#pid'), cv = $('#pidTrend'); if (!box || !cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var P = { K: 1.5, amb: 25, tau: 6, dead: 0.8, Kp: 2.4, Ti: 5, dt: 0.05 };
    var N = 600, HIST_DT = 0.1;                       // 60 s of history
    var uss = function (sp) { return (sp - P.amb) / P.K; };
    var s = { sp: 120, pv: 120, out: uss(120), integ: uss(120), dist: 0, auto: true, buf: [] };
    for (var b = 0; b < Math.round(P.dead / P.dt); b++) s.buf.push(s.out);
    var hSp = [], hPv = [], hOut = [], acc = 0, hAcc = 0;
    var elSp = $('#pidSp'), elPv = $('#pidPv'), elOut = $('#pidOut'), elWhat = $('#pidWhat');
    var bAuto = $('#pidAuto'), bMan = $('#pidMan');
    var W = 0, H = 0, col = {}, visible = true, raf = 0, last = 0, lastUser = -1e9, autoT = 0, autoI = 0, roT = 0;
    var AUTO_SP = [132, 112, 126, 138, 118];

    function step(dt) {
      var e = s.sp - s.pv;
      if (s.auto) {
        var integ = s.integ + (P.Kp / P.Ti) * e * dt, u = P.Kp * e + integ;
        if (u > 100 || u < 0) u = clamp(u, 0, 100); else s.integ = integ;   // anti-windup
        s.out = u;
      }
      s.buf.push(s.out); var ud = s.buf.shift();
      s.pv += dt * ((P.amb + P.K * ud + s.dist) - s.pv) / P.tau;
      s.dist *= Math.exp(-dt / 22);
    }
    function record() {
      hSp.push(s.sp); hPv.push(s.pv + (Math.random() - 0.5) * 0.25); hOut.push(s.out);
      if (hSp.length > N) { hSp.shift(); hPv.shift(); hOut.shift(); }
    }
    function advance(sec) {
      acc += sec;
      while (acc >= P.dt) {
        step(P.dt); acc -= P.dt; hAcc += P.dt;
        if (hAcc >= HIST_DT - 1e-9) { record(); hAcc = 0; }
      }
    }
    // pre-roll one minute so the trend is full when the page opens
    (function () {
      var plan = [[0, 112], [14, 130], [34, 120]], k = 0;
      for (var tt = 0; tt < 60; tt += P.dt) {
        if (k < plan.length && tt >= plan[k][0]) { s.sp = plan[k][1]; k++; }
        if (Math.abs(tt - 47) < P.dt / 2) s.dist = -14;
        advance(P.dt);
      }
    })();

    function colours() {
      col = { grid: css('--line'), txt: css('--muted'), sp: css('--amber'), pv: css('--teal'), out: css('--violet'), bg: css('--bg') };
    }
    function size() {
      var r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; if (!W || !H) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    function draw() {
      if (!W) return;
      var pl = 10, pr = 44, pt = 12, pb = 22, pw = W - pl - pr, ph = H - pt - pb;
      var yMin = 95, yMax = 145;
      var X = function (i) { return pl + (i / (N - 1)) * pw; };
      var Y = function (v) { return pt + (1 - (v - yMin) / (yMax - yMin)) * ph; };
      var YO = function (v) { return pt + (1 - v / 100) * ph; };
      ctx.clearRect(0, 0, W, H);
      ctx.font = '10px "IBM Plex Mono", ui-monospace, monospace'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 1; ctx.setLineDash([]); ctx.strokeStyle = col.grid; ctx.fillStyle = col.txt;
      for (var v = 100; v <= 140; v += 10) {
        var gy = Math.round(Y(v)) + 0.5;
        ctx.beginPath(); ctx.moveTo(pl, gy); ctx.lineTo(pl + pw, gy); ctx.stroke();
        ctx.textAlign = 'left'; ctx.fillText(v + '°', pl + pw + 8, gy);
      }
      for (var sx = 0; sx <= 6; sx++) {
        var gx = Math.round(pl + (sx / 6) * pw) + 0.5;
        ctx.beginPath(); ctx.moveTo(gx, pt); ctx.lineTo(gx, pt + ph); ctx.stroke();
      }
      ctx.textAlign = 'left'; ctx.fillText('-60 s', pl, H - 9);
      ctx.textAlign = 'center'; ctx.fillText('-30 s', pl + pw / 2, H - 9);
      ctx.textAlign = 'right'; ctx.fillText('0', pl + pw, H - 9);

      ctx.save(); ctx.beginPath(); ctx.rect(pl, pt - 4, pw + 6, ph + 8); ctx.clip();
      var n = hPv.length, off = N - n, i;
      // controller output
      ctx.strokeStyle = col.out; ctx.lineWidth = 1.25; ctx.globalAlpha = 0.85; ctx.beginPath();
      for (i = 0; i < n; i++) { if (i) ctx.lineTo(X(i + off), YO(hOut[i])); else ctx.moveTo(X(off), YO(hOut[0])); }
      ctx.stroke(); ctx.globalAlpha = 1;
      // setpoint (stepped)
      ctx.strokeStyle = col.sp; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath();
      for (i = 0; i < n; i++) {
        if (!i) ctx.moveTo(X(off), Y(hSp[0]));
        else { ctx.lineTo(X(i + off), Y(hSp[i - 1])); ctx.lineTo(X(i + off), Y(hSp[i])); }
      }
      ctx.stroke(); ctx.setLineDash([]);
      // process value
      ctx.beginPath();
      for (i = 0; i < n; i++) { if (i) ctx.lineTo(X(i + off), Y(hPv[i])); else ctx.moveTo(X(off), Y(hPv[0])); }
      ctx.strokeStyle = col.pv; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.shadowColor = col.pv; ctx.shadowBlur = 8; ctx.stroke(); ctx.shadowBlur = 0;
      ctx.lineTo(X(N - 1), pt + ph); ctx.lineTo(X(off), pt + ph); ctx.closePath();
      var g = ctx.createLinearGradient(0, pt, 0, pt + ph); g.addColorStop(0, col.pv); g.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.16; ctx.fillStyle = g; ctx.fill(); ctx.globalAlpha = 1;
      ctx.restore();
      // live point
      var ly = clamp(Y(hPv[n - 1]), pt, pt + ph);
      ctx.fillStyle = col.pv; ctx.beginPath(); ctx.arc(X(N - 1), ly, 3.5, 0, 6.2832); ctx.fill();
      ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.arc(X(N - 1), ly, 8, 0, 6.2832); ctx.fill(); ctx.globalAlpha = 1;
    }
    function readouts() {
      elSp.textContent = s.sp.toFixed(1); elPv.textContent = s.pv.toFixed(1); elOut.textContent = s.out.toFixed(1);
    }
    function autopilot(dt, now) {
      if (!s.auto || now - lastUser < 14000) return;
      autoT += dt;
      if (autoT > 6.5) {
        autoT = 0; autoI++;
        if (autoI % 3 === 0) s.dist = -15; else s.sp = AUTO_SP[autoI % AUTO_SP.length];
      }
    }
    function loop(now) {
      raf = 0; if (!visible || document.hidden) return;
      var dt = Math.min(0.1, (now - last) / 1000 || 0); last = now;
      autopilot(dt, now); advance(dt); draw();
      roT += dt; if (roT > 0.12) { roT = 0; readouts(); }
      raf = requestAnimationFrame(loop);
    }
    function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }
    function touched() { lastUser = performance.now(); autoT = 0; }
    function setMode(auto) {
      if (auto && !s.auto) s.integ = s.out - P.Kp * (s.sp - s.pv);         // bumpless transfer
      s.auto = auto; bAuto.setAttribute('aria-pressed', String(auto)); bMan.setAttribute('aria-pressed', String(!auto));
      elWhat.textContent = auto ? 'SP' : 'OUT'; touched();
    }
    function nudge(dir) {
      if (s.auto) s.sp = clamp(s.sp + dir * 5, 100, 140); else s.out = clamp(s.out + dir * 5, 0, 100);
      touched(); readouts(); if (reduced) settle();
    }
    // with reduced motion the trend does not run continuously: jump to the settled result instead
    function settle() { advance(20); draw(); readouts(); }

    $('#pidUp').addEventListener('click', function () { nudge(1); });
    $('#pidDown').addEventListener('click', function () { nudge(-1); });
    $('#pidDist').addEventListener('click', function () { s.dist = -16; touched(); if (reduced) settle(); });
    bAuto.addEventListener('click', function () { setMode(true); if (reduced) settle(); });
    bMan.addEventListener('click', function () { setMode(false); });

    colours(); size(); readouts();
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(cv); else window.addEventListener('resize', size);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    themeListeners.push(function () { colours(); draw(); });
    if (!reduced) {
      whileVisible(box, function (on) { visible = on; if (on) start(); });
      document.addEventListener('visibilitychange', start);
    }
  })();

  /* ======================================================================
     Tank 07 demo. The fill valve holds the tank level. The scrubber water valve
     is on flow control, and follows the tank level when the fill valve is at
     100 % and the level still drops.
     ====================================================================== */
  (function () {
    var box = $('#tank'); if (!box) return;
    var el = {
      liq: $('#tankLiq'), lvl: $('#tankLvl'), fic: $('#tankFIC'), lic: $('#tankLIC'), sigF: $('#tankSigF'), sigL: $('#tankSigL'),
      inFlow: $('#tankInFlow'), drain: $('#tankDrainFlow'), fill: $('#tankFillFlow'), out: $('#tankOutFlow'),
      mode: $('#tankMode'), modeTxt: $('#tankModeTxt'), led: $('#tankMode .led'), btn: $('#tankBtn'),
      L: $('#tankL'), V: $('#tankV'), Q: $('#tankQ'),
      scr: $('#tankScrLbl'), name: $('#tankName'), demand: $('#tankDemand'), qs: $('#tankQs'), lv: $('#tankLv'), fv: $('#tankFv')
    };
    var LSP = 60, FSP = 20, K = 0.6;   // level setpoint %, scrubber flow setpoint m3/h, m3/h per % of valve
    var s = { L: 60, lv: 50, fv: 33.3, qs: 20, qf: 30, qd: 50, iL: 50, iF: 33.3, i2: 0, mode: 'F', high: false };
    var off = { a: 0, b: 0, c: 0 }, visible = false, raf = 0, last = 0, acc = 0, user = false, demoT = 0, roT = 0, shown = '';

    function step(dt) {
      s.qd += ((s.high ? 95 : 50) - s.qd) * dt / 0.8;                 // water taken by the pumps
      var eL = LSP - s.L;
      // level controller on the fill valve
      var iL = s.iL + 0.5 * eL * dt, uL = 5 * eL + iL;
      if (uL > 100 || uL < 0) uL = clamp(uL, 0, 100); else s.iL = iL;
      s.lv += (uL - s.lv) * dt / 0.5;
      // scrubber valve: flow control, or level control when the fill valve is not enough
      if (s.mode === 'F' && s.lv > 99 && s.L < LSP - 5) { s.mode = 'L'; s.i2 = s.fv - 4 * eL; }
      else if (s.mode === 'L' && s.fv < FSP / K && s.L >= LSP) { s.mode = 'F'; s.iF = s.fv - 0.8 * (FSP - s.qs); }
      var u;
      if (s.mode === 'F') { var e = FSP - s.qs; s.iF += (0.8 / 1.5) * e * dt; u = 0.8 * e + s.iF; }
      else { var i2 = s.i2 + 0.5 * eL * dt; u = 4 * eL + i2; if (u > 100 || u < 0) u = clamp(u, 0, 100); else s.i2 = i2; }
      s.fv += (clamp(u, 0, 100) - s.fv) * dt / 0.5;
      s.qs += (K * s.fv - s.qs) * dt / 0.4;
      s.qf += (K * s.lv - s.qf) * dt / 0.4;
      s.L = clamp(s.L + (s.qf + s.qs - s.qd) * 0.08 * dt, 0, 100);
    }
    function paintMode() {
      var lvl = s.mode === 'L'; shown = s.mode;
      el.fic.classList.toggle('is-on', !lvl); el.lic.classList.toggle('is-on', lvl);
      el.sigF.classList.toggle('is-on', !lvl); el.sigL.classList.toggle('is-on', lvl);
      el.mode.classList.toggle('is-level', lvl);
      el.led.className = 'led ' + (lvl ? 'led--hold' : 'led--run');
      el.modeTxt.textContent = t(lvl ? 'tank.level' : 'tank.flow');
      el.btn.textContent = t(s.high ? 'tank.normal' : 'tank.more');
      el.btn.setAttribute('aria-pressed', String(s.high));
      el.scr.textContent = t('tank.scrubber'); el.name.textContent = t('tank.name');
    }
    function paint(force) {
      var h = 78 * s.L / 100;        // tank is 78 units tall, bottom at y = 284
      el.liq.setAttribute('y', (284 - h).toFixed(1)); el.liq.setAttribute('height', h.toFixed(1));
      el.inFlow.style.strokeDashoffset = (-off.a).toFixed(1); el.drain.style.strokeDashoffset = (-off.a).toFixed(1);
      el.fill.style.strokeDashoffset = (-off.b).toFixed(1); el.out.style.strokeDashoffset = (-off.c).toFixed(1);
      if (!force && roT < 0.15) return; roT = 0;
      var L = Math.round(s.L), lv = Math.round(s.lv), fv = Math.round(s.fv);
      el.lvl.textContent = L + '%'; el.L.textContent = L; el.V.textContent = lv; el.Q.textContent = fv;
      el.qs.textContent = Math.round(s.qs) + ' m³/h';
      el.lv.textContent = 'LV ' + lv + '%'; el.fv.textContent = 'FV ' + fv + '%';
      el.demand.textContent = t('tank.pumps') + ' ' + Math.round(s.qd) + ' m³/h';
    }
    function tick(dt) {
      acc += dt;
      while (acc >= 0.05) { step(0.05); acc -= 0.05; if (s.mode !== shown) paintMode(); }
      off.a += s.qs * dt * 1.6; off.b += s.qf * dt * 1.1; off.c += s.qd * dt * 0.8; roT += dt;
    }
    function demo(dt) {              // plays by itself until the visitor takes over
      if (user) return;
      demoT += dt;
      if (!s.high && demoT > 5) { s.high = true; demoT = 0; paintMode(); }
      else if (s.high && demoT > 26) { s.high = false; demoT = -20; paintMode(); }
    }
    function loop(now) {
      raf = 0; if (!visible || document.hidden) return;
      var dt = Math.min(0.1, (now - last) / 1000 || 0); last = now;
      demo(dt); tick(dt); paint(false);
      raf = requestAnimationFrame(loop);
    }
    function start() { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } }

    el.btn.addEventListener('click', function () {
      user = true; s.high = !s.high; paintMode();
      if (reduced) { for (var i = 0; i < 900; i++) tick(0.05); paint(true); }   // show the settled state
    });
    langListeners.push(function () { paintMode(); paint(true); });
    paintMode(); paint(true);
    whileVisible(box, function (on) { visible = on; if (on) start(); }, '0px');
    document.addEventListener('visibilitychange', start);
  })();

  /* ======================================================================
     Contact: build the WhatsApp / email message from the brief
     ====================================================================== */
  (function () {
    var form = $('#brief'); if (!form) return;
    var wa = $('#sendWa'), mail = $('#sendMail');
    var PHONE = '212674335326', EMAIL = 'ayoubbnibourk728@gmail.com';
    function message() {
      var needs = $$('input[name="need"]:checked', form).map(function (i) { return i.nextElementSibling.textContent.trim(); });
      var name = $('#bName').value.trim(), co = $('#bCo').value.trim(), msg = $('#bMsg').value.trim();
      var lines = [t('msg.hello'), ''];
      if (needs.length) lines.push(t('msg.need') + ': ' + needs.join(', '));
      if (name) lines.push(t('msg.name') + ': ' + name);
      if (co) lines.push(t('msg.co') + ': ' + co);
      if (msg) { if (lines.length > 2) lines.push(''); lines.push(msg); }
      return lines.length > 2 ? lines.join('\n') : '';
    }
    function sync() {
      var m = message();
      wa.href = 'https://wa.me/' + PHONE + (m ? '?text=' + encodeURIComponent(m) : '');
      mail.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(t('msg.subject')) + (m ? '&body=' + encodeURIComponent(m) : '');
    }
    form.addEventListener('input', sync); form.addEventListener('change', sync);
    form.addEventListener('submit', function (e) { e.preventDefault(); sync(); wa.click(); });
    wa.addEventListener('click', sync); mail.addEventListener('click', sync);
    langListeners.push(sync); sync();

    var toast = $('#toast'), tt;
    function say(txt) { toast.textContent = txt; toast.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('is-on'); }, 2200); }
    var copy = $('#copyMail');
    if (copy) copy.addEventListener('click', function () {
      var done = function () { say(t('toast.copied')); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents($('#mailTxt'));
        var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        try { if (document.execCommand('copy')) done(); } catch (e) { }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(EMAIL).then(done, fallback); else fallback();
    });
  })();

  /* ======================================================================
     Footer: year and a real "scan cycle" (time between two frames)
     ====================================================================== */
  var yr = $('#year'); if (yr) yr.textContent = String(new Date().getFullYear());
  (function () {
    var el = $('#cycle'); if (!el || reduced) return;
    var prev = 0, sum = 0, n = 0, shownAt = 0;
    (function f(now) {
      if (prev) { var d = now - prev; if (d < 100) { sum += d; n++; } }
      prev = now;
      if (now - shownAt > 1000 && n > 10) { el.textContent = (sum / n).toFixed(1); sum = 0; n = 0; shownAt = now; }
      requestAnimationFrame(f);
    })(performance.now());
  })();
})();
