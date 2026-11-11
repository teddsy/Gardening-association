/* RGA seed shop pages (landing, list, product, basket). Demo – no payment, nothing sent. Needs kings-seeds-data.js + shop-core.js. */
(function(){
'use strict';
var S=window.RGA_SHOP, IDX=S.buildIndex(window.RGA_KINGS||{sections:[]});
var $=function(s,r){return (r||document).querySelector(s);};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var store=null;try{store=window.localStorage;var t='__rga_t';store.setItem(t,'1');store.removeItem(t);}catch(e){store=null;}
var saveFailed=false, refreshView=function(){};
function readStored(){if(!store)return null;try{var raw=store.getItem(S.CART_KEY);if(!raw)return{};return S.sanitizeCart(JSON.parse(raw),IDX.byId);}catch(e){return null;}}
var cart=readStored()||{};
/* Re-read the latest saved basket (another tab/page may have changed it). Keep unsaved in-page changes if saving is failing. */
function sync(){if(saveFailed)return;var s=readStored();if(s)cart=s;}
function warn(on){var w=$('#storage-warn');if(!w&&on){w=document.createElement('p');w.id='storage-warn';w.className='storage-warn';w.setAttribute('role','alert');
    var m=$('main');(m||document.body).insertBefore(w,m?m.firstChild:null);}
  if(!w)return;w.hidden=!on;w.textContent=on?'Your basket has not been saved: this browser is blocking or out of storage. Items stay on this page only and will be lost if you leave or refresh. Write your order down or try another browser.':'';}
function persist(){var ok=!!(store&&S.saveCart(store,cart));saveFailed=!ok;warn(!ok);updateBadge();return ok;}
function mutate(fn){sync();fn();return persist();}
function toast(msg){var t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);}t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('show');},2600);}
function updateBadge(){var tt=S.cartTotals(cart,IDX.byId);document.querySelectorAll('[data-basket-count]').forEach(function(el){el.textContent=tt.count;});var Q=window.RGA_QUICKLIST;if(Q&&document.body.classList.contains('shop-list-view'))Q.updateBar(cart,IDX.byId);}
var VIEW_KEY='rgaShopView';
function readViewPref(){try{var v=store&&store.getItem(VIEW_KEY);if(v==='list'||v==='page')return v;}catch(e){}return 'page';}
function writeViewPref(v){try{if(store&&(v==='list'||v==='page'))store.setItem(VIEW_KEY,v);}catch(e){}}
function resolveView(st){if(st.view==='list'||st.view==='page'){writeViewPref(st.view);return st.view;}return readViewPref();}
function setTick(id,on){if(!IDX.byId[id])return;mutate(function(){if(on){if(!cart[id])cart[id]=1;}else delete cart[id];});var Q=window.RGA_QUICKLIST;if(Q)Q.syncTicks($('#ql-list'),cart);updateBadge();}
function add(id,q){var it=IDX.byId[id];if(!it)return;var n;var ok=mutate(function(){n=Math.min(S.MAX_QTY,(cart[id]||0)+(q||1));cart[id]=n;});
  toast(ok?'Added '+it.name+' (×'+n+' in basket)':'Added '+it.name+' on this page only – not saved (see warning)');refreshView();return{ok:ok,n:n};}
function resync(){sync();updateBadge();refreshView();}
window.addEventListener('pageshow',function(e){if(e.persisted)resync();});
window.addEventListener('storage',function(e){if(!e.key||e.key===S.CART_KEY)resync();});
function catLabel(c){var x=S.CATS.filter(function(k){return k.id===c;})[0];return x?x.label:'All seeds';}
function priceHtml(it){if(it.listPrice==null)return'<div class="price-row"><span class="plain">Price on request</span><span class="note">Ask Mike</span></div>';
  if(!S.isSeed(it))return'<div class="price-row"><span class="plain">'+S.money(it.listPrice)+'</span><span class="pill-plant">Plant – list price</span><span class="note">Soft fruit plants are not in the seed discount</span></div>';
  return'<div class="price-row"><span class="was" aria-label="Regular price">'+S.money(it.listPrice)+'</span><span class="now">'+S.money(S.unitPrice(it))+'</span><span class="pill-off">Members 25% off</span><span class="note">Regular '+S.money(it.listPrice)+' · Members '+S.money(S.unitPrice(it))+'</span></div>';}
function lastList(){try{var v=sessionStorage.getItem('rgaShopLast');if(v&&/^\?[^<>"]*$/.test(v))return 'seed-shop.html'+v;}catch(e){}return 'seed-shop.html';}

/* ---- Landing ---- */
function landing(){document.querySelectorAll('[data-cat-count]').forEach(function(el){el.textContent=S.query(IDX,{cat:el.getAttribute('data-cat-count')}).total;});
  var el=$('#countdown');if(el){var end=new Date('2027-01-31T23:59:59');var ms=end-new Date();
    el.textContent=ms<=0?'Orders have closed (deadline was 31 January 2027).':'Orders close 31 January 2027 · '+Math.floor(ms/864e5)+' days remaining';}
  var box=$('#crop-list');
  if(box){var html=[],last=null,labels={};S.CATS.forEach(function(c){labels[c.id]=c.label;});
    IDX.crops.forEach(function(c){if(c.cat!==last){last=c.cat;html.push('<h3 class="ql-group">'+esc(labels[c.cat]||c.cat)+'</h3>');}
      var page='seed-shop.html'+S.toSearch({cat:c.cat,crop:c.name,view:'page'});
      var list='seed-shop.html'+S.toSearch({cat:c.cat,crop:c.name,view:'list'});
      html.push('<div class="ql-crop-row"><span class="ql-crop-name">'+esc(c.label)+' <span class="meta">('+c.count+')</span></span><span class="ql-crop-acts"><a href="'+page+'">Page view</a><a href="'+list+'">List view</a></span></div>');});
    box.innerHTML=html.join('');}}

/* ---- List ---- */
function list(){
  var st=S.parseState(location.search), r=S.query(IDX,st);
  var view=resolveView(st);
  var cleanState={cat:r.cat,crop:r.crop,q:st.q,sort:st.sort,clay:r.clay?'1':'',page:view==='list'?1:r.page,view:view};
  try{sessionStorage.setItem('rgaShopLast',S.toSearch(cleanState));}catch(e){}
  var title=r.crop?S.cropLabel(r.crop):catLabel(r.cat);
  document.title=title+' | Seed shop | RGA Members';
  if(!document.body.id)document.body.id='top';
  document.body.classList.toggle('ql-page',view==='list');
  document.body.classList.toggle('shop-list-view',view==='list');
  var pageView=$('#shop-page-view'),listView=$('#shop-list-view'),bar=$('#ql-bar');
  if(pageView)pageView.hidden=view==='list';
  if(listView)listView.hidden=view!=='list';
  if(bar)bar.hidden=view!=='list';
  var tog=$('#view-toggle');
  if(tog){var pageHref='seed-shop.html'+S.toSearch(Object.assign({},cleanState,{view:'page',page:1}));
    var listHref='seed-shop.html'+S.toSearch(Object.assign({},cleanState,{view:'list',page:1}));
    tog.innerHTML='<a href="'+pageHref+'"'+(view==='page'?' aria-current="page"':'')+'>Page view</a>'+
      '<a href="'+listHref+'"'+(view==='list'?' aria-current="page"':'')+'>List view</a>';}
  $('#crumbs').innerHTML='<a href="members.html">Members</a> › <a href="seed-order.html">Seed purchase</a> › '+(r.crop?(function(){var cc=(IDX.crops.filter(function(c){return c.name===r.crop;})[0]||{}).cat||'';return'<a href="seed-shop.html'+S.toSearch({cat:cc,view:view})+'">'+esc(catLabel(cc))+'</a> › ';})():'')+'<span aria-current="page">'+esc(title)+'</span>';
  $('#list-title').textContent=title;
  $('#cat-tabs').innerHTML=[{id:'',label:'All'}].concat(S.CATS).map(function(c){var on=(r.cat||'')===c.id&&!r.crop;var href='seed-shop.html'+S.toSearch({cat:c.id,view:view});return'<a href="'+href+'"'+(on||((r.cat||'')===c.id&&r.crop)?' aria-current="page"':'')+'>'+esc(c.label)+'</a>';}).join('');
  var f=$('#filters'),E=f.elements,fc={cat:E.namedItem('cat'),crop:E.namedItem('crop'),q:E.namedItem('q'),sort:E.namedItem('sort'),clay:E.namedItem('clay')};fc.cat.value=r.cat;fc.q.value=st.q;fc.sort.value=['name','price-asc','price-desc'].indexOf(st.sort)>=0?st.sort:'';fc.clay.checked=r.clay;
  function fillCrops(cat,sel){var crops=IDX.crops.filter(function(c){return !cat||c.cat===cat;}).slice().sort(function(a,b){return a.label.localeCompare(b.label);});
    fc.crop.innerHTML='<option value="">All crops ('+crops.length+')</option>'+crops.map(function(c){return'<option value="'+esc(c.name)+'"'+(c.name===sel?' selected':'')+'>'+esc(c.label)+(cat?'':' – '+catLabel(c.cat))+' ('+c.count+')</option>';}).join('');}
  fillCrops(r.cat,r.crop);
  fc.cat.addEventListener('change',function(){fillCrops(fc.cat.value,'');});
  f.addEventListener('submit',function(e){e.preventDefault();location.href='seed-shop.html'+S.toSearch({cat:fc.cat.value,crop:fc.crop.value,q:fc.q.value.trim(),sort:fc.sort.value,clay:fc.clay.checked?'1':'',view:view});});
  fc.crop.addEventListener('change',function(){f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit'));});
  fc.sort.addEventListener('change',function(){f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit'));});
  var from=encodeURIComponent(S.toSearch(cleanState));
  var Q=window.RGA_QUICKLIST;
  if(view==='list'){
    var all=S.query(IDX,Object.assign({},st,{perPage:Math.max(r.total,1)||1,page:1}));
    $('#result-count').textContent=all.total?('Showing all '+all.total+' item'+(all.total===1?'':'s')+(st.q?' matching “'+st.q+'”':'')):'';
    var g=$('#grid');if(g)g.innerHTML='';
    var pager=$('#pager');if(pager)pager.innerHTML='';
    if(!all.total){if($('#ql-list'))$('#ql-list').innerHTML='';$('#empty').hidden=false;return;}
    $('#empty').hidden=true;
    if(Q&&$('#ql-list')){
      Q.render($('#ql-list'),all.items,cart);
      Q.bindList($('#ql-list'),{setTick:setTick});
      Q.updateBar(cart,IDX.byId);
      refreshView=function(){Q.syncTicks($('#ql-list'),cart);Q.updateBar(cart,IDX.byId);};
    }
    return;
  }
  var start=(r.page-1)*S.PER_PAGE;
  $('#result-count').textContent=r.total?('Showing '+(start+1)+'–'+(start+r.items.length)+' of '+r.total+' item'+(r.total===1?'':'s')+(st.q?' matching “'+st.q+'”':'')):'';
  var g=$('#grid');
  if(!r.total){g.innerHTML='';$('#empty').hidden=false;$('#pager').innerHTML='';return;}
  $('#empty').hidden=true;
  var grpOn=!st.sort,lastSec=null;
  g.innerHTML=r.items.map(function(it){var href='seed-product.html?id='+encodeURIComponent(it.id)+'&from='+from;
    var hd='';if(grpOn&&it.section!==lastSec){lastSec=it.section;hd='<li class="pgroup" role="presentation"><h3>'+esc(S.cropLabel(it.section))+'</h3></li>';}
    return hd+'<li class="pitem"><span class="crop">'+esc(S.cropLabel(it.section))+'</span><h3><a href="'+href+'" data-details="'+esc(it.id)+'">'+esc(it.name)+'</a></h3><span class="meta">'+esc(it.pack||'')+'</span>'+(it.clay?'<span><span class="pill-clay">Clay-soil friendly</span></span>':'')+priceHtml(it)+
    '<div class="acts">'+(it.listPrice!=null?'<button type="button" class="btn small" data-add="'+esc(it.id)+'">Add to basket</button>':'')+'<a class="btn ghost small" href="'+href+'" data-details="'+esc(it.id)+'">Details</a></div></li>';}).join('');
  g.addEventListener('click',function(e){var b=e.target.closest('[data-add]');if(b)add(b.getAttribute('data-add'),1);});
  var p=$('#pager'),h=[];function link(n,text,rel){var s=Object.assign({},cleanState,{page:n});return'<a href="seed-shop.html'+esc(S.toSearch(s))+'"'+(rel?' rel="'+rel+'"':'')+' aria-label="Page '+n+'">'+text+'</a>';}
  if(r.pages>1){if(r.page>1)h.push(link(r.page-1,'‹ Prev','prev'));
    for(var n=1;n<=r.pages;n++){if(n===1||n===r.pages||Math.abs(n-r.page)<=2){h.push(n===r.page?'<span aria-current="page">'+n+'</span>':link(n,String(n)));}else if(h[h.length-1]!=='<span class="gap">…</span>')h.push('<span class="gap">…</span>');}
    if(r.page<r.pages)h.push(link(r.page+1,'Next ›','next'));}
  p.innerHTML=h.join('');
}

/* ---- Product ---- */
var LABELS={when_to_sow:'When to sow',where_to_sow:'Where to sow',sowing_depth:'Sowing depth',spacing:'Spacing',germination:'Germination',harvest:'Harvest',maturity:'Maturity',height:'Height',spread:'Spread',hardiness:'Hardiness',handy_tip:'Handy tip',notes:'Notes'};
function product(){
  var p=new URLSearchParams(location.search),id=p.get('id'),from=p.get('from')||'';
  var back=/^\?[^<>"]*$/.test(from)?'seed-shop.html'+from:lastList();
  var it=id&&IDX.byId[id];var box=$('#product');
  $('#back-link').href=back;
  if(!it){document.title='Product not found | RGA seed shop';$('#crumbs').innerHTML='<a href="members.html">Members</a> › <a href="seed-order.html">Seed purchase</a> › <span aria-current="page">Not found</span>';
    box.innerHTML='<div class="empty-state"><h2>Product not found</h2><p>We could not find that seed or plant. It may have been mistyped or removed from this demo catalogue.</p><p><a class="btn" href="'+esc(back)+'">Back to the seed list</a> <a class="btn ghost" href="seed-order.html">Seed purchase home</a></p></div>';return;}
  document.title=it.name+' | RGA seed shop';
  $('#crumbs').innerHTML='<a href="members.html">Members</a> › <a href="seed-order.html">Seed purchase</a> › <a href="seed-shop.html?cat='+it.cat+'">'+esc(catLabel(it.cat))+'</a> › <a href="seed-shop.html'+esc(S.toSearch({cat:it.cat,crop:it.section}))+'">'+esc(S.cropLabel(it.section))+'</a> › <span aria-current="page">'+esc(it.name)+'</span>';
  var rat={};try{rat=JSON.parse(store&&store.getItem('rgaKingsRatings'))||{};}catch(e){rat={};}
  var mine=rat[id]&&rat[id].n||0;
  box.innerHTML='<div class="product"><div><p class="kicker">'+esc(S.cropLabel(it.section))+' · '+esc(catLabel(it.cat))+'</p><h2>'+esc(it.name)+'</h2>'+
   '<p class="meta">'+esc(it.pack||'')+(it.sku?' · Kings code '+esc(it.sku):'')+'</p>'+(it.clay?'<p><span class="pill-clay">Clay-soil friendly (RGA notes)</span></p>':'')+
   '<h3>Description</h3><p id="desc">'+esc(it.desc||'Loading description…')+'</p><div class="grow" id="grow"></div>'+
   (it.tip?'<p><strong>RGA clay note:</strong> '+esc(it.tip)+'</p>':'')+(it.url?'<p class="meta"><a href="'+esc(it.url)+'" target="_blank" rel="noopener">View on Kings Seeds (new tab)</a></p>':'')+
   '<div class="box" style="margin-top:1rem"><h4>Your rating</h4><p class="meta">Saved in this browser only – not shared with other members.</p><div id="stars" role="group" aria-label="Your rating"></div></div></div>'+
   '<aside class="buybox" aria-label="Buy">'+priceHtml(it)+
   (it.listPrice!=null?'<form id="buy"><label for="qty">Quantity</label><div class="qty"><button type="button" data-step="-1" aria-label="Decrease quantity">−</button><input id="qty" name="qty" type="number" inputmode="numeric" min="1" max="99" value="1"><button type="button" data-step="1" aria-label="Increase quantity">+</button></div><p style="margin-top:.8rem"><button class="btn" type="submit">Add to basket</button></p></form>':'<p>Ask Mike Davey for a price.</p>')+
   '<p class="meta" id="in-basket"></p><p><a class="basket-link" href="seed-basket.html">View basket (<span data-basket-count>0</span>)</a></p><p class="meta">Order by 31 January 2027. Demo – no payment taken.</p></aside></div>';
  function inBasket(){$('#in-basket').textContent=cart[id]?('In your basket: '+cart[id]):'';}inBasket();
  refreshView=inBasket;var f=$('#buy');if(f){var q=f.elements.namedItem('qty');f.addEventListener('click',function(e){var b=e.target.closest('[data-step]');if(!b)return;q.value=Math.min(99,Math.max(1,(parseInt(q.value,10)||1)+(+b.getAttribute('data-step'))));});
    f.addEventListener('submit',function(e){e.preventDefault();var n=Math.min(99,Math.max(1,parseInt(q.value,10)||1));q.value=n;add(id,n);inBasket();});}
  function stars(){$('#stars').innerHTML=[1,2,3,4,5].map(function(n){return'<button type="button" class="btn '+(n<=mine?'':'ghost')+' small" data-n="'+n+'" aria-pressed="'+(n===mine)+'" aria-label="'+n+' star'+(n>1?'s':'')+'">★</button>';}).join(' ');}stars();
  $('#stars').addEventListener('click',function(e){var b=e.target.closest('[data-n]');if(!b)return;mine=+b.getAttribute('data-n');rat[id]={n:mine,comment:(rat[id]&&rat[id].comment)||'',at:new Date().toISOString()};
    try{store.setItem('rgaKingsRatings',JSON.stringify(rat));}catch(er){toast('Could not save rating in this browser.');}stars();});
  loadDesc().then(function(D){var d=D&&D[id];if(d&&d.description)$('#desc').textContent=d.description;else if(!it.desc)$('#desc').textContent='Description to follow – see the Kings Seeds page.';
    var g=growRows(d);if(g)$('#grow').innerHTML='<h3>Growing guide</h3><dl>'+g+'</dl>';},function(){if(!it.desc)$('#desc').textContent='The full description could not load. Use the Kings Seeds link below.';});
}

/* ---- Basket ---- */
function basket(){
  $('#continue').href=lastList();
  function render(){var ids=Object.keys(cart),t=S.cartTotals(cart,IDX.byId),w=$('#basket');
    if(!ids.length){w.innerHTML='<div class="empty-state"><h2>Your basket is empty</h2><p>Browse the Kings Seeds range and add seeds or soft fruit plants.</p><p><a class="btn" href="seed-shop.html">Browse seeds</a></p></div>';$('#summary').hidden=true;return;}
    $('#summary').hidden=false;
    w.innerHTML='<table class="basket-table"><thead><tr><th scope="col">Item</th><th scope="col">Each</th><th scope="col">Qty</th><th scope="col">Line</th><th scope="col"><span class="sr">Remove</span></th></tr></thead><tbody>'+
     ids.map(function(id){var it=IDX.byId[id],u=S.unitPrice(it)||0,q=cart[id];return'<tr><td><a href="seed-product.html?id='+encodeURIComponent(id)+'" data-details="'+esc(id)+'">'+esc(it.name)+'</a><br><span class="meta">'+esc(it.pack||'')+' · '+(S.isSeed(it)?'seed – 25% members off (regular '+S.money(it.listPrice)+')':'plant – list price, no seed discount')+'</span></td><td>'+S.money(u)+'</td>'+
      '<td><div class="qty no-print"><button type="button" data-dec="'+esc(id)+'" aria-label="Decrease '+esc(it.name)+'">−</button><input type="number" min="1" max="99" value="'+q+'" data-qty="'+esc(id)+'" aria-label="Quantity of '+esc(it.name)+'"><button type="button" data-inc="'+esc(id)+'" aria-label="Increase '+esc(it.name)+'">+</button></div><span class="print-only">'+q+'</span></td>'+
      '<td>'+S.money(Math.round(u*q*100)/100)+'</td><td><button type="button" class="btn linkish no-print" data-rm="'+esc(id)+'">Remove</button></td></tr>';}).join('')+'</tbody></table>';
    $('#t-count').textContent=t.count;$('#t-reg').textContent=S.money(t.regular);$('#t-mem').textContent=S.money(t.members);$('#t-save').textContent=S.money(t.save);updateBadge();}
  var w=$('#basket');
  w.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var id;
    var act=b.getAttribute('data-rm')?'rm':b.getAttribute('data-inc')?'inc':b.getAttribute('data-dec')?'dec':'';if(!act)return;id=b.getAttribute('data-'+act);
    mutate(function(){if(!cart[id])return;if(act==='rm')delete cart[id];else if(act==='inc')cart[id]=Math.min(99,cart[id]+1);else{cart[id]-=1;if(cart[id]<1)delete cart[id];}});render();});
  w.addEventListener('change',function(e){var id=e.target.getAttribute('data-qty');if(!id)return;var n=parseInt(e.target.value,10);mutate(function(){if(!isFinite(n)||n<1)delete cart[id];else cart[id]=Math.min(99,n);});render();});
  $('#empty-basket').addEventListener('click',function(){if(confirm('Remove everything from your seed basket?')){mutate(function(){cart={};});render();}});
  $('#print').addEventListener('click',function(){var n=$('#member-name');$('#print-name').textContent=(n&&n.value.trim())||'(name)';$('#print-date').textContent=new Date().toLocaleDateString('en-GB');window.print();});
  refreshView=render;render();
}

/* ---- Shared lazy descriptions (one script load) ---- */
var descP=null;
function loadDesc(){if(window.RGA_KINGS_DESC)return Promise.resolve(window.RGA_KINGS_DESC);if(descP)return descP;
  descP=new Promise(function(res,rej){var sc=document.createElement('script');sc.src='kings-descriptions.js';sc.async=true;sc.onload=function(){res(window.RGA_KINGS_DESC||{});};sc.onerror=function(){descP=null;sc.remove();rej(new Error('desc'));};document.head.appendChild(sc);});return descP;}
function growRows(d){var g=d&&d.grow||{};return Object.keys(g).filter(function(k){return g[k];}).map(function(k){return'<dt>'+esc(LABELS[k]||k.replace(/_/g,' '))+'</dt><dd>'+esc(g[k])+'</dd>';}).join('');}

/* ---- Details dialog (seed list + basket). Native showModal when available, simple fallback otherwise. ---- */
var dlg=null,opener=null,openSeq=0,curId=null,sess=0,cleaned=0;
function ensureDialog(){if(dlg)return dlg;dlg=document.createElement('dialog');dlg.id='det';dlg.className='det-dialog';dlg.setAttribute('aria-labelledby','det-title');dlg.setAttribute('aria-modal','true');document.body.appendChild(dlg);
  dlg.addEventListener('close',function(){if(dlg.hasAttribute('open'))return;cleanup();}); /* queued close from an older session is ignored once a new one is open or already cleaned */
  dlg.addEventListener('cancel',function(e){e.preventDefault();closeDetails();});
  dlg.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();closeDetails();}});
  dlg.addEventListener('click',function(e){if(e.target===dlg){closeDetails();return;}var b=e.target.closest('button');if(!b)return;
    if(b.classList.contains('det-close')){closeDetails();return;}
    var st=b.getAttribute('data-step');if(st){var q=dlg.querySelector('#det-qty');q.value=Math.min(99,Math.max(1,(parseInt(q.value,10)||1)+(+st)));}});
  return dlg;}
function onDetSubmit(e){e.preventDefault();if(!curId)return;var q=dlg.querySelector('#det-qty');var n=Math.min(99,Math.max(1,parseInt(q.value,10)||1));q.value=n;
    var r=add(curId,n);var st=dlg.querySelector('#det-status');if(r)st.textContent=r.ok?('Added – '+cart[curId]+' in your basket.'):'Added on this page only – not saved. See the warning at the top of the page.';}
function cleanup(){if(cleaned===sess)return;cleaned=sess;document.body.classList.remove('modal-open');curId=null;openSeq++;var o=opener;opener=null;if(o&&o.focus){try{o.focus();}catch(e){}}}
function closeDetails(){if(!dlg||!dlg.hasAttribute('open'))return;if(typeof dlg.close==='function'&&typeof dlg.showModal==='function'){dlg.close();}else{dlg.removeAttribute('open');}cleanup();}
function openDetails(id,from){ensureDialog();if(dlg.hasAttribute('open')){var keep=opener;closeDetails();opener=keep;}opener=from||document.activeElement;sess++;
  var it=IDX.byId[id];var seq=++openSeq;curId=it?id:null;
  var full='seed-product.html?id='+encodeURIComponent(id)+'&from='+encodeURIComponent(location.search||'');
  if(!it){dlg.innerHTML='<div class="det-head"><h2 id="det-title">Product not found</h2><button type="button" class="det-close" aria-label="Close">×</button></div><p>We could not find that seed or plant in this demo catalogue.</p><p><button type="button" class="btn det-close">Close</button></p>';}
  else dlg.innerHTML='<div class="det-head"><h2 id="det-title">'+esc(it.name)+'</h2><button type="button" class="det-close" aria-label="Close details">×</button></div>'+
    '<p class="meta">'+esc(S.cropLabel(it.section))+' · '+esc(it.pack||'')+(it.sku?' · Kings code '+esc(it.sku):'')+'</p>'+(it.clay?'<p><span class="pill-clay">Clay-soil friendly (RGA notes)</span></p>':'')+priceHtml(it)+
    (it.listPrice!=null?'<form id="det-form" class="det-buy"><label for="det-qty">Quantity</label><div class="qty"><button type="button" data-step="-1" aria-label="Decrease quantity">−</button><input id="det-qty" type="number" inputmode="numeric" min="1" max="99" value="1"><button type="button" data-step="1" aria-label="Increase quantity">+</button></div> <button class="btn" type="submit">Add to basket</button></form>':'<p>Price on request – ask Mike Davey.</p>')+
    '<p class="meta" id="det-status" role="status" aria-live="polite">'+(cart[id]?'In your basket: '+cart[id]:'')+'</p>'+
    '<h3>Description</h3><p id="det-desc">'+esc(it.desc||'Loading description…')+'</p><div class="grow" id="det-grow"></div>'+
    (it.tip?'<p><strong>RGA clay note:</strong> '+esc(it.tip)+'</p>':'')+
    '<p class="meta"><a href="'+esc(full)+'">Open full page (rating, share link)</a>'+(it.url?' · <a href="'+esc(it.url)+'" target="_blank" rel="noopener">Kings Seeds (new tab)</a>':'')+'</p>'+
    '<p class="meta">'+(S.isSeed(it)?'Group members discount: 25% off seeds.':'Soft fruit plant – Kings Seeds list price, not in the seed discount.')+' Order by 31 January 2027. Demo – no payment.</p>';
  var df=dlg.querySelector('#det-form');if(df)df.addEventListener('submit',onDetSubmit);
  document.body.classList.add('modal-open');
  if(typeof dlg.showModal==='function'){dlg.showModal();}else{dlg.setAttribute('open','');}
  var f=dlg.querySelector('.det-close');if(f)try{f.focus();}catch(e){}
  if(it)loadDesc().then(function(D){if(seq!==openSeq||curId!==id)return;var d=D&&D[id];var el=dlg.querySelector('#det-desc');if(d&&d.description)el.textContent=d.description;else if(!it.desc)el.textContent='Description to follow – see the Kings Seeds page.';
    var g=growRows(d);if(g)dlg.querySelector('#det-grow').innerHTML='<h3>Growing guide</h3><dl>'+g+'</dl>';},function(){if(seq!==openSeq)return;if(!it.desc)dlg.querySelector('#det-desc').textContent='The full description could not load – use the full page or Kings Seeds link.';});}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-details]');if(!a)return;if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  if(page!=='list'&&page!=='basket')return;e.preventDefault();openDetails(a.getAttribute('data-details'),a);});
var page=document.body.getAttribute('data-page');
function run(){updateBadge();if(page==='list'||page==='basket')ensureDialog();({landing:landing,list:list,product:product,basket:basket}[page]||function(){})();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
window.RGA_SHOP_UI={index:IDX,openDetails:openDetails,closeDetails:closeDetails};
})();
