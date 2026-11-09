(function(){
  var menu=document.getElementById('menu'),burger=document.getElementById('burger');
  function close(){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.textContent='☰'}
  burger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',open);burger.textContent=open?'✕':'☰';
  });
  menu.addEventListener('click',function(e){if(e.target.tagName==='A')close()});

  var links=[].slice.call(menu.querySelectorAll('a'));
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){
        a.setAttribute('aria-current',a.getAttribute('href')==='#'+(e.target.id==='projects'?'work':e.target.id)?'true':'false')})}
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('#home-view section').forEach(function(s){io.observe(s)});

  var homeV=document.getElementById('home-view'),workV=document.getElementById('work'),
      reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var views={work:workV},titles={work:'Projects'};
  function route(){
    var h=location.hash.slice(1),v=views[h];
    homeV.hidden=!!v;workV.hidden=!v;
    document.title=v?titles[h]+' \u2014 Junior Salazar':'Junior Cesar D. Salazar \u2014 Aspiring Fullstack Developer';
    if(v){links.forEach(function(a){a.setAttribute('aria-current',a.getAttribute('href')==='#'+h?'true':'false')});window.scrollTo(0,0)}
    else if(h){var t=document.getElementById(h);if(t){window.scrollTo({top:0,behavior:'instant'});t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})}}
  }
  window.addEventListener('hashchange',route);route();
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');
    if(!a||homeV.hidden||/^#work$/.test(a.getAttribute('href')))return;
    var id=a.getAttribute('href').slice(1),t=id&&document.getElementById(id);
    if(!t)return;
    e.preventDefault();
    t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    try{if(location.hash!=='#'+id)history.pushState(null,'','#'+id)}catch(x){}
  });

  document.getElementById('theme').addEventListener('click',function(){
    var r=document.documentElement,
        dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
    r.dataset.theme=dark?'light':'dark';
  });

  var form=document.getElementById('form'),note=document.getElementById('note'),btn=form.querySelector('button');
  var F={name:document.getElementById('name'),email:document.getElementById('email'),msg:document.getElementById('msg')};
  function setErr(k,t){document.getElementById('e-'+k).textContent=t;F[k].setAttribute('aria-invalid',t?'true':'false');F[k].setAttribute('aria-describedby','e-'+k)}
  function validate(){
    var n=F.name.value.trim(),m=F.email.value.trim(),t=F.msg.value.trim();
    var en=n.length<2?'Enter your name (at least 2 characters).':'';
    var ee=!m?'Enter your email address.':!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)?'Enter a valid email, like name@example.com.':'';
    var et=t.length<10?'Write a message of at least 10 characters.':'';
    setErr('name',en);setErr('email',ee);setErr('msg',et);
    if(en||ee||et){(en?F.name:ee?F.email:F.msg).focus();return false}
    return true;
  }
  Object.keys(F).forEach(function(k){F[k].addEventListener('input',function(){setErr(k,'')})});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!validate())return;
    var n=F.name.value.trim(),m=F.email.value.trim(),t=F.msg.value.trim();
    note.textContent='Opening your email app to send the message.';
    location.href='mailto:salazarjc030@gmail.com?subject='+encodeURIComponent('Project enquiry from '+n)+'&body='+encodeURIComponent(t+'\n\n'+n+' ('+m+')');
  });
})();
