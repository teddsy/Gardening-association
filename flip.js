/* Accessible flip cards. With JS, one state (.is-flipped) drives the visual flip, aria-expanded and button text.
   Sources: pointer hover (mouseenter/leave), "More info"/"Back" button (pins open / holds front until pointer leaves),
   keyboard focus on the back link. CSS hover flip applies only without JS (.flip:not(.flip-js)). */
(function(){
  function init(){
    document.querySelectorAll('.flip').forEach(function(card,i){
      if(card.classList.contains('flip-js'))return;
      var back=card.querySelector('.flip-back');if(!back)return;
      if(!back.id)back.id='flip-back-'+i;
      var b=document.createElement('button');b.type='button';b.className='flip-toggle';b.setAttribute('aria-controls',back.id);
      var pinned=false,hover=false,hold=false;
      function focusedBack(){return back.contains(document.activeElement);}
      function set(on){card.classList.toggle('is-flipped',on);card.classList.toggle('hold-front',hold);b.setAttribute('aria-expanded',String(on));b.textContent=on?'Back':'More info';}
      function update(){set(pinned||focusedBack()||(hover&&!hold));}
      b.addEventListener('click',function(e){e.preventDefault();var open=!card.classList.contains('is-flipped');pinned=open;hold=!open&&hover;if(!open&&focusedBack())b.focus();update();});
      card.addEventListener('mouseenter',function(){hover=true;update();});
      card.addEventListener('mouseleave',function(){hover=false;hold=false;update();});
      back.addEventListener('focusin',function(){hold=false;update();});
      card.addEventListener('focusout',function(){setTimeout(update,0);});
      card.appendChild(b);card.classList.add('flip-js');update();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
