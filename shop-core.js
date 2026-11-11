/* RGA seed shop core logic – pure functions shared by seed pages (demo; no payment). */
(function(root,factory){var S=factory();if(typeof module==='object'&&module.exports)module.exports=S;else root.RGA_SHOP=S;})(this,function(){
  var PER_PAGE=24, CART_KEY='rgaKingsCart', MAX_QTY=99;
  var FRUIT=['Rhubarb','Strawberry','Strawberries (plants)','Raspberries','Blackberries','Blueberries','Currants','Gooseberry','Loganberries','Rhubarb Crowns'];
  var CATS=[{id:'veg',label:'Vegetables'},{id:'herb',label:'Herbs'},{id:'fruit',label:'Fruit & soft fruit plants'}];
  function catOf(sec){if(/^Herbs:/.test(sec.name))return'herb';if(FRUIT.indexOf(sec.name)>=0||sec.items.some(function(x){return x.kind==='plant';}))return'fruit';return'veg';}
  function cropLabel(n){return String(n).replace(/^Herbs:\s*/,'');}
  function buildIndex(data){var items=[],byId={},crops=[];
    (data&&data.sections||[]).forEach(function(sec){var cat=catOf(sec);crops.push({name:sec.name,label:cropLabel(sec.name),cat:cat,count:sec.items.length});
      sec.items.forEach(function(it){var o=Object.assign({},it,{section:sec.name,cat:cat});items.push(o);byId[o.id]=o;});});
    return{items:items,byId:byId,crops:crops,meta:data&&data.meta||{}};}
  function isSeed(i){return i.kind!=='plant';}
  function membersFromList(lp){return Math.round(Math.round(lp*100)*0.75)/100;}
  function unitPrice(i){if(i.listPrice==null)return null;if(!isSeed(i))return i.listPrice;return i.memberPrice!=null?i.memberPrice:membersFromList(i.listPrice);}
  function r2(n){return Math.round(n*100)/100;}
  function toInt(v,d){var n=parseInt(v,10);return isFinite(n)?n:d;}
  function validCat(c){return CATS.some(function(x){return x.id===c;})?c:'';}
  function query(idx,o){o=o||{};var cat=validCat(o.cat),crop=o.crop||'',q=String(o.q||'').trim().toLowerCase(),clay=o.clay==='1'||o.clay===true;
    var per=toInt(o.perPage,PER_PAGE);if(per<1)per=PER_PAGE;
    if(crop&&!idx.crops.some(function(c){return c.name===crop&&(!cat||c.cat===cat);}))crop='';
    var list=idx.items.filter(function(i){if(cat&&i.cat!==cat)return false;if(crop&&i.section!==crop)return false;if(clay&&!i.clay)return false;
      if(q)return[i.name,i.section,i.pack,i.sku,i.desc,i.tip].join(' ').toLowerCase().indexOf(q)>=0;return true;});
    var s=o.sort||'';
    if(s==='name')list.sort(function(a,b){return a.name.localeCompare(b.name);});
    else if(s==='price-asc'||s==='price-desc'){var k=s==='price-asc'?1:-1;list.sort(function(a,b){var x=unitPrice(a),y=unitPrice(b);if(x==null)x=Infinity*k;if(y==null)y=Infinity*k;return (x-y)*k||a.name.localeCompare(b.name);});}
    var pages=Math.max(1,Math.ceil(list.length/per)),page=Math.min(Math.max(1,toInt(o.page,1)),pages);
    return{items:list.slice((page-1)*per,page*per),total:list.length,page:page,pages:pages,cat:cat,crop:crop,q:q,sort:s,clay:clay};}
  function sanitizeCart(raw,byId){var out={};if(!raw||typeof raw!=='object'||Array.isArray(raw))return out;
    Object.keys(raw).forEach(function(id){if(!byId||!byId[id])return;var v=raw[id];if(typeof v==='string'&&!/^\s*\d+(\.\d+)?\s*$/.test(v))return;var n=Math.floor(Number(v));if(!isFinite(n)||n<1)return;out[id]=Math.min(n,MAX_QTY);});return out;}
  function cartTotals(cart,byId){var c=0,reg=0,mem=0;Object.keys(cart||{}).forEach(function(id){var it=byId[id];if(!it)return;var q=cart[id];c+=q;reg+=q*(it.listPrice||0);mem+=q*(unitPrice(it)||0);});
    reg=r2(reg);mem=r2(mem);return{count:c,regular:reg,members:mem,save:r2(reg-mem)};}
  function loadCart(st,byId){try{var raw=st.getItem(CART_KEY);if(!raw)return{};return sanitizeCart(JSON.parse(raw),byId);}catch(e){return{};}}
  function saveCart(st,cart){try{st.setItem(CART_KEY,JSON.stringify(cart));return true;}catch(e){return false;}}
  var KEYS=['cat','crop','q','sort','clay','page','view'];
  function parseState(search){var p=new URLSearchParams(search||''),o={};KEYS.forEach(function(k){o[k]=p.get(k)||'';});o.page=Math.max(1,toInt(o.page,1));return o;}
  function toSearch(o){var p=new URLSearchParams();KEYS.forEach(function(k){var v=o[k];if(k==='page'){if(v&&+v>1)p.set(k,v);}else if(v)p.set(k,v);});var s=p.toString();return s?'?'+s:'';}
  function money(n){return n==null?'—':'£'+Number(n).toFixed(2);}
  return{PER_PAGE:PER_PAGE,CART_KEY:CART_KEY,MAX_QTY:MAX_QTY,CATS:CATS,catOf:catOf,cropLabel:cropLabel,buildIndex:buildIndex,isSeed:isSeed,membersFromList:membersFromList,unitPrice:unitPrice,
    query:query,sanitizeCart:sanitizeCart,cartTotals:cartTotals,loadCart:loadCart,saveCart:saveCart,parseState:parseState,toSearch:toSearch,money:money};
});
