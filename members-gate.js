/* RGA demo members gate — localStorage only. NOT real security. */
(function () {
  var KEY = 'rgaMembersSession';
  var CODE = 'RGA2026';

  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.name) return s;
    } catch (e) {}
    return null;
  }
  function signIn(name) {
    var s = { name: String(name || '').trim(), at: new Date().toISOString(), demo: true };
    if (!s.name) throw new Error('Please enter your name');
    localStorage.setItem(KEY, JSON.stringify(s));
    return s;
  }
  function signOut() {
    localStorage.removeItem(KEY);
  }
  function isSignedIn() {
    return !!getSession();
  }

  window.RGA_MEMBERS = {
    KEY: KEY,
    CODE: CODE,
    getSession: getSession,
    signIn: signIn,
    signOut: signOut,
    isSignedIn: isSignedIn
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function ensureStyles() {
    if (document.getElementById('rga-gate-css')) return;
    var css = document.createElement('style');
    css.id = 'rga-gate-css';
    css.textContent =
      '#rga-gate-overlay{position:fixed;inset:0;z-index:2000;background:rgba(251,247,240,.96);display:flex;align-items:center;justify-content:center;padding:1.2rem;overflow:auto}' +
      '#rga-gate-card{background:#fff;border:2px solid #351c4d;border-radius:16px;padding:1.6rem 1.8rem;max-width:28rem;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.12);font-family:Montserrat,"Segoe UI",system-ui,Arial,sans-serif;color:#3b302b}' +
      '#rga-gate-card h2{color:#351c4d;font-size:1.55rem;margin:0 0 .6rem;text-align:center}' +
      '#rga-gate-card p{margin:.5rem 0;line-height:1.55;font-size:1.05rem}' +
      '#rga-gate-card label{display:block;font-weight:700;margin:1rem 0 .35rem;font-size:1.05rem}' +
      '#rga-gate-card input{width:100%;padding:.85rem 1rem;font-size:1.15rem;border:2px solid #e6dccf;border-radius:10px;box-sizing:border-box}' +
      '#rga-gate-card input:focus{outline:3px solid #222;outline-offset:2px}' +
      '#rga-gate-card .gate-btn{display:block;width:100%;margin-top:1.1rem;padding:1rem;font-size:1.15rem;font-weight:700;border:0;border-radius:30px;background:#ce3a0d;color:#fff;cursor:pointer}' +
      '#rga-gate-card .gate-btn:hover{background:#351c4d}' +
      '#rga-gate-card .gate-btn:focus-visible{outline:3px solid #222;outline-offset:2px}' +
      '#rga-gate-card .demo-cred{background:#fff8e1;border-left:5px solid #e3b86a;padding:.85rem 1rem;margin:1rem 0;border-radius:0 8px 8px 0;font-size:1.05rem}' +
      '#rga-gate-card .honest{background:#fbe7dd;border:1px solid #e6dccf;padding:.75rem .9rem;border-radius:8px;font-size:.98rem;color:#333;margin-top:1rem}' +
      '#rga-gate-card .err{color:#7a1f1f;font-weight:700;min-height:1.3em}' +
      '#rga-gate-card a{color:#351c4d;font-weight:600}' +
      '.rga-signed-bar{display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:center;justify-content:space-between;background:#efe8f3;border-bottom:2px solid #e6dccf;padding:.55rem 4%;font-size:1.05rem;color:#2c2c2c}' +
      '.rga-signed-bar strong{color:#351c4d}' +
      '.rga-signed-bar button,.rga-signed-bar a.signout{font:inherit;font-weight:700;font-size:1.05rem;padding:.45rem 1rem;border-radius:22px;border:2px solid #351c4d;background:#fff;color:#351c4d;cursor:pointer;text-decoration:none}' +
      '.rga-signed-bar button:hover,.rga-signed-bar a.signout:hover{background:#351c4d;color:#fff}' +
      '.rga-signed-bar button:focus-visible,.rga-signed-bar a.signout:focus-visible{outline:3px solid #222;outline-offset:2px}' +
      'body.rga-gated-locked main,body.rga-gated-locked .crumbs,body.rga-gated-locked .hero,body.rga-gated-locked .back-members,body.rga-gated-locked #tools,body.rga-gated-locked #cols,body.rga-gated-locked #strip,body.rga-gated-locked #cart,body.rga-gated-locked .layout-tog,body.rga-gated-locked .content-box,body.rga-gated-locked .cards,body.rga-gated-locked .agrid{visibility:hidden}' +
      'body.rga-gated-locked footer{visibility:hidden}';
    document.head.appendChild(css);
  }

  function showOverlay() {
    ensureStyles();
    document.body.classList.add('rga-gated-locked');
    var existing = document.getElementById('rga-gate-overlay');
    if (existing) existing.remove();
    var wrap = document.createElement('div');
    wrap.id = 'rga-gate-overlay';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'rga-gate-title');
    wrap.innerHTML =
      '<div id="rga-gate-card">' +
      '<h2 id="rga-gate-title">Members sign-in</h2>' +
      '<p>This area is for RGA members. Sign in with your name and the club demo code.</p>' +
      '<div class="demo-cred"><strong>Demo sign-in:</strong> any name + code <strong>RGA2026</strong> — real logins come later</div>' +
      '<form id="rga-gate-form" novalidate>' +
      '<label for="rga-gate-name">Your name</label>' +
      '<input id="rga-gate-name" name="name" type="text" autocomplete="name" required placeholder="e.g. Pat Smith">' +
      '<label for="rga-gate-code">Members code</label>' +
      '<input id="rga-gate-code" name="code" type="text" autocomplete="off" required placeholder="Demo code" spellcheck="false">' +
      '<p class="err" id="rga-gate-err" role="alert"></p>' +
      '<button type="submit" class="gate-btn">Sign in to members area</button>' +
      '</form>' +
      '<p class="honest"><strong>Honest note:</strong> this is a demo gate only. It is <strong>not real security</strong> — anyone who knows the code can enter, and the check runs only in your browser.</p>' +
      '<p style="text-align:center;margin-top:1rem"><a href="index.html">← Back to Home</a> · <a href="join.html">Join the RGA</a></p>' +
      '</div>';
    document.body.appendChild(wrap);
    var form = document.getElementById('rga-gate-form');
    var nameEl = document.getElementById('rga-gate-name');
    var codeEl = document.getElementById('rga-gate-code');
    var err = document.getElementById('rga-gate-err');
    setTimeout(function () { try { nameEl.focus(); } catch (e) {} }, 50);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.textContent = '';
      var name = (nameEl.value || '').trim();
      var code = (codeEl.value || '').trim();
      if (!name) { err.textContent = 'Please enter your name.'; nameEl.focus(); return; }
      if (code.toUpperCase() !== CODE) { err.textContent = 'That code is not right. Use the demo code RGA2026.'; codeEl.focus(); return; }
      try { signIn(name); } catch (ex) { err.textContent = ex.message || 'Could not sign in.'; return; }
      unlock();
    });
  }

  function showSignedBar() {
    ensureStyles();
    var old = document.getElementById('rga-signed-bar');
    if (old) old.remove();
    var s = getSession();
    if (!s) return;
    var bar = document.createElement('div');
    bar.id = 'rga-signed-bar';
    bar.className = 'rga-signed-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Members session');
    bar.innerHTML =
      '<span>Signed in as <strong>' + esc(s.name) + '</strong> <span style="font-size:.92rem;color:#444">(demo)</span></span>' +
      '<button type="button" id="rga-signout" class="signout">Sign out</button>';
    var header = document.querySelector('.site-header');
    if (header && header.parentNode) header.parentNode.insertBefore(bar, header.nextSibling);
    else document.body.insertBefore(bar, document.body.firstChild);
    document.getElementById('rga-signout').addEventListener('click', function () {
      signOut();
      location.reload();
    });
  }

  function unlock() {
    document.body.classList.remove('rga-gated-locked');
    var ov = document.getElementById('rga-gate-overlay');
    if (ov) ov.remove();
    showSignedBar();
    try {
      document.dispatchEvent(new CustomEvent('rga-members-ready', { detail: getSession() }));
    } catch (e) {}
  }

  /* Demo pages are open for demonstration. Keep the session API, but never
     show the sign-in overlay or lock the page. A signed-in bar is not shown. */
  function boot() {
    if (!document.body) return;
    document.body.classList.remove('rga-gated-locked');
    var ov = document.getElementById('rga-gate-overlay');
    if (ov) ov.remove();
    var bar = document.getElementById('rga-signed-bar');
    if (bar) bar.remove();
    try {
      document.dispatchEvent(new CustomEvent('rga-members-ready', { detail: getSession() }));
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
