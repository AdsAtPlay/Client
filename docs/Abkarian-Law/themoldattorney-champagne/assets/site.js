/* Abkarian Law Group mockups · shared behaviour (no dependencies) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Header: mobile menu + dropdowns ---------- */
  var header = $('.site-header');
  var toggle = $('.menu-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
  $$('.nav-item > button.nav-top').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('open');
      $$('.nav-item.open').forEach(function (i) {
        i.classList.remove('open');
        var b = $('button.nav-top', i); if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) {
      $$('.nav-item.open').forEach(function (i) {
        i.classList.remove('open');
        var b = $('button.nav-top', i); if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = $('.nav-item.open');
    if (open) {
      open.classList.remove('open');
      var b = $('button.nav-top', open);
      if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); }
    }
  });

  /* ---------- Carousels ---------- */
  $$('[data-carousel]').forEach(function (root) {
    var track = $('.carousel-track', root);
    var prev = $('[data-prev]', root), next = $('[data-next]', root), count = $('[data-count]', root);
    var items = $$('.carousel-track > *', root);
    var i = 0;
    function perView() {
      var vp = $('.carousel', root).clientWidth;
      return Math.max(1, Math.floor((vp + 24) / 284));
    }
    function pages() { return Math.max(1, items.length - perView() + 1); }
    function show() {
      var max = pages() - 1;
      if (i > max) i = max;
      track.style.transform = 'translateX(' + (-i * 284) + 'px)';
      prev.disabled = i === 0;
      next.disabled = i === max;
      if (count) count.textContent = (i + 1) + ' / ' + (max + 1);
    }
    prev.addEventListener('click', function () { if (i > 0) { i--; show(); } });
    next.addEventListener('click', function () { if (i < pages() - 1) { i++; show(); } });
    window.addEventListener('resize', show);
    show();
  });

  /* ---------- Filter tabs (results grids) ---------- */
  $$('[data-filter-group]').forEach(function (group) {
    var target = document.getElementById(group.getAttribute('data-filter-group'));
    var buttons = $$('button[data-filter]', group);
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        buttons.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        $$('[data-cat]', target).forEach(function (card) {
          card.hidden = !(f === 'all' || card.getAttribute('data-cat').split(' ').indexOf(f) > -1);
        });
      });
    });
  });

  /* ---------- Situation switcher (mold results) ---------- */
  $$('[data-switch-group]').forEach(function (group) {
    var buttons = $$('button[data-switch]', group);
    function pick(key) {
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-switch') === key ? 'true' : 'false'); });
      $$('[data-panel]').forEach(function (p) {
        p.hidden = p.getAttribute('data-panel') !== key;
      });
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-switch')); }); });
    var q = new URLSearchParams(location.search).get('where');
    var map = { rent: 'rent', hoa: 'hoa', own: 'own' };
    pick(map[q] || buttons[0].getAttribute('data-switch'));
  });

  /* ---------- Mold case check (home hero) ---------- */
  var quiz = $('#case-check');
  if (quiz) {
    quiz.addEventListener('submit', function (e) {
      e.preventDefault();
      var where = (quiz.querySelector('input[name="where"]:checked') || {}).value;
      var reported = (quiz.querySelector('input[name="reported"]:checked') || {}).value;
      var health = (quiz.querySelector('input[name="health"]:checked') || {}).value;
      var err = $('.quiz-error', quiz);
      if (!where || !reported || !health) { err.classList.add('show'); return; }
      err.classList.remove('show');
      var pages = { rent: 'renters.html', hoa: 'condo-owners.html', own: 'homeowners.html', other: 'workplace.html' };
      location.href = pages[where] + '?where=' + where + '&reported=' + reported + '&health=' + health;
    });
  }

  /* ---------- Show the visitor's answers (situation + contact pages) ---------- */
  var answerBox = $('[data-answers]');
  if (answerBox) {
    var p = new URLSearchParams(location.search);
    var labels = {
      where: { rent: 'I rent', hoa: 'I own a condo (HOA)', own: 'I own my home', other: 'Somewhere else' },
      reported: { yes: 'I reported it', no: 'Not reported yet' },
      health: { yes: 'Someone is sick', no: 'No health problems', unsure: 'Not sure about health' }
    };
    var chips = [];
    ['where', 'reported', 'health'].forEach(function (k) {
      var v = p.get(k);
      if (v && labels[k][v]) chips.push(labels[k][v]);
    });
    if (chips.length) {
      var list = $('[data-answer-list]', answerBox);
      list.innerHTML = '';
      chips.forEach(function (c) {
        var s = document.createElement('span');
        s.className = 'chip';
        s.textContent = c;
        list.appendChild(s);
      });
      answerBox.hidden = false;
      var none = $('[data-no-answers]');
      if (none) none.hidden = true;
      $$('a[data-carry]').forEach(function (a) { a.href = a.getAttribute('href').split('?')[0] + location.search; });
    }
  }

  /* ---------- Demo forms: never send data anywhere ---------- */
  $$('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      location.href = f.getAttribute('data-next') || 'thank-you.html';
    });
  });

  /* ---------- Video placeholders ---------- */
  $$('.video-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var note = $('.vid-note', b);
      if (note) note.textContent = 'Video plays here once the client clip is added';
    });
  });

  /* ---------- Mockup flag ---------- */
  var flag = $('.mock-flag');
  if (flag) {
    var x = $('button', flag);
    if ($('.mock-dock')) {
      if (x) x.addEventListener('click', function () {
        flag.remove();
      });
    } else {
      try { if (sessionStorage.getItem('mockFlagHidden')) flag.remove(); } catch (e) {}
      if (x) x.addEventListener('click', function () {
        flag.remove();
        try { sessionStorage.setItem('mockFlagHidden', '1'); } catch (e) {}
      });
    }
  }
})();
