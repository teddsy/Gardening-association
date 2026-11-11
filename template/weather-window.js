/* Opens the weather link in a separate, smaller, resizable window on a plain click.
   The weather page can't be framed (the provider forbids it), so this is a normal external window. This page is left untouched.
   Change the address on the link itself (search this site for WEATHER LINK).
   - Blank window opened first, opener detached, then navigated (standard reverse-tabnabbing protection).
   - If the popup is blocked (null) or open() throws, the normal link default runs.
   - Ctrl/Cmd/Shift/Alt/middle clicks keep normal browser behaviour. Nothing opens automatically. */
(function(){
  function features(){
    var s=window.screen||{},aw=s.availWidth||1280,ah=s.availHeight||800;
    var w=Math.max(320,Math.min(1000,aw-40)),h=Math.max(300,Math.min(740,ah-80));
    var l=Math.max(0,Math.round((aw-w)/2)),t=Math.max(0,Math.round((ah-h)/3));
    return 'popup=yes,width='+w+',height='+h+',left='+l+',top='+t+',resizable=yes,scrollbars=yes';
  }
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest&&e.target.closest('a[data-weather-window]');if(!a)return;
    if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    var url=a.href,win=null;
    try{win=window.open('','clubWeather',features());}catch(err){win=null;}
    if(!win)return; /* blocked: let the normal new-tab link work */
    e.preventDefault();
    try{win.opener=null;}catch(err){}
    try{win.location.replace(url);try{win.focus();}catch(err){}}
    catch(err){try{win.close();}catch(e2){}try{window.open(url,'_blank','noopener,noreferrer');}catch(e3){}}
  });
})();
