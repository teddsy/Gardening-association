/* Quick order list renderer – compact one-row-per-product view.
   Shared by seed-quicklist.html and seed-shop.html list view.
   Uses shop-core.js and the shared seed basket. Demo – no payment. */
(function (root) {
  'use strict';
  var S = root.RGA_SHOP;
  if (!S) return;
  var IDX = S.buildIndex(root.RGA_KINGS || { sections: [] });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function packOf(it) { return (it.pack && String(it.pack).trim()) || '—'; }
  function typeOf(it) { return S.cropLabel(it.section); }
  function qtyHint(cart, id) {
    var q = (cart && cart[id]) || 0;
    return q > 1 ? '<span class="ql-qty">×' + q + '</span>' : '';
  }
  function rowHtml(it, cart) {
    var id = it.id;
    var on = !!(cart && cart[id]);
    var name = it.name || '';
    var typ = typeOf(it);
    var pack = packOf(it);
    var plant = !S.isSeed(it);
    var memNote = plant ? ' <span class="ql-plant">list</span>' : '';
    var search = [typ, name, pack, it.section, it.sku].join(' ').toLowerCase();
    return '<div class="ql-row" role="row" data-id="' + esc(id) + '" data-cat="' + esc(it.cat) + '" data-section="' + esc(it.section) + '" data-text="' + esc(search) + '">' +
      '<div class="ql-type" role="cell">' + esc(typ) + '</div>' +
      '<div class="ql-name" role="cell">' + esc(name) + (plant ? ' <span class="pill-plant">Plant</span>' : '') + '</div>' +
      '<div class="ql-pack" role="cell">' + esc(pack) + '</div>' +
      '<div class="ql-reg" role="cell">' + S.money(it.listPrice) + '</div>' +
      '<div class="ql-mem" role="cell">' + S.money(S.unitPrice(it)) + memNote + '</div>' +
      '<div class="ql-tick" role="cell"><label class="ql-check"><input type="checkbox" data-add="' + esc(id) + '" id="ql-' + esc(id) + '"' + (on ? ' checked' : '') + '><span class="sr">Add ' + esc(name) + ' to basket</span>' + qtyHint(cart, id) + '</label></div>' +
      '</div>';
  }
  function listHtml(items, cart) {
    var html = ['<div class="ql-head" role="row">' +
      '<div role="columnheader">Type</div><div role="columnheader">Variety</div><div role="columnheader">Packet / size</div>' +
      '<div role="columnheader">Regular</div><div role="columnheader">Members</div><div role="columnheader">Add</div></div>'];
    var last = null;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.section !== last) {
        last = it.section;
        html.push('<h3 class="ql-group" data-section="' + esc(it.section) + '">' + esc(typeOf(it)) + '</h3>');
      }
      html.push(rowHtml(it, cart));
    }
    return html.join('');
  }
  function render(container, items, cart) {
    if (!container) return;
    container.innerHTML = listHtml(items || [], cart || {});
  }
  function syncTicks(container, cart) {
    if (!container) return;
    cart = cart || {};
    container.querySelectorAll('input[data-add]').forEach(function (inp) {
      var id = inp.getAttribute('data-add');
      inp.checked = !!cart[id];
      var lab = inp.closest('label');
      if (!lab) return;
      var hint = lab.querySelector('.ql-qty');
      var want = (cart[id] || 0) > 1 ? '×' + cart[id] : '';
      if (hint) {
        if (want) hint.textContent = want; else hint.remove();
      } else if (want) {
        var s = document.createElement('span');
        s.className = 'ql-qty';
        s.textContent = want;
        lab.appendChild(s);
      }
    });
  }
  function bindList(container, api) {
    if (!container || container._qlBound) return;
    container._qlBound = true;
    container.addEventListener('change', function (e) {
      var inp = e.target.closest && e.target.closest('input[data-add]');
      if (!inp || !api || !api.setTick) return;
      api.setTick(inp.getAttribute('data-add'), inp.checked);
    });
  }
  function updateBar(cart, byId) {
    var tt = S.cartTotals(cart || {}, byId || IDX.byId);
    var set = function (id, v) { var el = $(id); if (el) el.textContent = v; };
    set('#ql-count', String(tt.count));
    set('#ql-reg', S.money(tt.regular));
    set('#ql-mem', S.money(tt.members));
    set('#ql-save', S.money(tt.save));
    document.querySelectorAll('[data-basket-count]').forEach(function (el) { el.textContent = tt.count; });
    return tt;
  }
  root.RGA_QUICKLIST = {
    render: render,
    listHtml: listHtml,
    rowHtml: rowHtml,
    syncTicks: syncTicks,
    bindList: bindList,
    updateBar: updateBar,
    typeOf: typeOf,
    packOf: packOf,
    index: IDX
  };

  /* ---- Standalone page (seed-quicklist.html) ---- */
  if (!document.body || document.body.getAttribute('data-page') !== 'quicklist') return;

  var store = null;
  try {
    store = window.localStorage;
    var t = '__rga_t';
    store.setItem(t, '1');
    store.removeItem(t);
  } catch (e) { store = null; }
  var saveFailed = false;
  function readStored() {
    if (!store) return null;
    try {
      var raw = store.getItem(S.CART_KEY);
      if (!raw) return {};
      return S.sanitizeCart(JSON.parse(raw), IDX.byId);
    } catch (e) { return null; }
  }
  var cart = readStored() || {};
  function sync() {
    if (saveFailed) return;
    var s = readStored();
    if (s) cart = s;
  }
  function warn(on) {
    var w = $('#storage-warn');
    if (!w && on) {
      w = document.createElement('p');
      w.id = 'storage-warn';
      w.className = 'storage-warn';
      w.setAttribute('role', 'alert');
      var m = $('main');
      (m || document.body).insertBefore(w, m ? m.firstChild : null);
    }
    if (!w) return;
    w.hidden = !on;
    w.textContent = on
      ? 'Your basket has not been saved: this browser is blocking or out of storage. Items stay on this page only and will be lost if you leave or refresh. Write your order down or try another browser.'
      : '';
  }
  function persist() {
    var ok = !!(store && S.saveCart(store, cart));
    saveFailed = !ok;
    warn(!ok);
    return ok;
  }
  function refresh() {
    syncTicks($('#ql-list'), cart);
    updateBar(cart, IDX.byId);
  }
  function setTick(id, on) {
    if (!IDX.byId[id]) return;
    if (!saveFailed) sync();
    if (on) { if (!cart[id]) cart[id] = 1; }
    else { delete cart[id]; }
    persist();
    refresh();
  }
  function visibleRow(row, cat, q) {
    if (cat && row.getAttribute('data-cat') !== cat) return false;
    if (q && (row.getAttribute('data-text') || '').indexOf(q) < 0) return false;
    return true;
  }
  function applyFilter() {
    var cat = ($('#ql-cat') && $('#ql-cat').value) || '';
    var q = (($('#ql-q') && $('#ql-q').value) || '').trim().toLowerCase();
    var rows = document.querySelectorAll('#ql-list .ql-row');
    var shown = 0;
    var i, row;
    for (i = 0; i < rows.length; i++) {
      row = rows[i];
      var on = visibleRow(row, cat, q);
      row.hidden = !on;
      if (on) shown++;
    }
    var groups = document.querySelectorAll('#ql-list .ql-group');
    for (i = 0; i < groups.length; i++) {
      var g = groups[i];
      var n = g.nextElementSibling;
      var any = false;
      while (n && !n.classList.contains('ql-group')) {
        if (n.classList.contains('ql-row') && !n.hidden) { any = true; break; }
        n = n.nextElementSibling;
      }
      g.hidden = !any;
    }
    var empty = $('#ql-empty');
    if (empty) empty.hidden = shown !== 0;
    updateFilterCount(shown);
  }
  function updateFilterCount(shown) {
    var el = $('#ql-result');
    if (!el) return;
    var n = shown != null ? shown : IDX.items.length;
    el.textContent = n === IDX.items.length
      ? 'All ' + IDX.items.length + ' products'
      : 'Showing ' + n + ' of ' + IDX.items.length;
  }
  function boot() {
    if (!$('#ql-list')) return;
    if (S.fillLabels) S.fillLabels();
    render($('#ql-list'), IDX.items, cart);
    bindList($('#ql-list'), { setTick: setTick });
    updateBar(cart, IDX.byId);
    updateFilterCount();
    var form = $('#ql-filters');
    if (form) {
      form.addEventListener('submit', function (e) { e.preventDefault(); applyFilter(); });
      var q = $('#ql-q'), cat = $('#ql-cat');
      if (q) q.addEventListener('input', applyFilter);
      if (cat) cat.addEventListener('change', applyFilter);
    }
    window.addEventListener('pageshow', function (e) { if (e.persisted) { sync(); refresh(); } });
    window.addEventListener('storage', function (e) { if (!e.key || e.key === S.CART_KEY) { sync(); refresh(); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(this);
