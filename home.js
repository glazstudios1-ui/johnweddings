(function(){
var SB='https://vzunjnrosrmvtlipqpsa.supabase.co',KEY='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',CK='je_home_v1',IK='je_intro_t';
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,desk=function(){return innerWidth>=900};
var root=document.documentElement,body=document.body;

/* ---------- intro (once every 8 hours) ---------- */
var done=false;
function finish(){if(done)return;done=true;try{localStorage.setItem(IK,String(Date.now()))}catch(e){}
 body.classList.add('go');setTimeout(function(){root.classList.remove('introing');body.classList.add('ready')},1250)}
if(root.classList.contains('introing')){var tm=setTimeout(finish,reduce?200:3000);var sk=$('#skip');if(sk)sk.addEventListener('click',function(){clearTimeout(tm);finish()})}
else body.classList.add('ready','go');

/* ---------- editable content (Dashboard > Website) ---------- */
function url(it,w){if(!it)return '';return it.b?it.b+'-'+w+'.jpg':(it.src||'')}
var scr=[];
function splitScrub(el){el.innerHTML=el.textContent.trim().split(/\s+/).map(function(w){return '<span style="opacity:.16;transition:opacity .35s">'+w+'</span>'}).join(' ')}
function setT(k,v){if(v==null||v==='')return;$$('[data-t="'+k+'"]').forEach(function(el){el.textContent=v;if(el.classList.contains('scrub'))splitScrub(el)})}
function apply(c){
 if(!c)return;
 if(c.hero)c.hero.forEach(function(it,i){var el=$('[data-i="hero'+(i+1)+'"]');if(el&&it){el.src=url(it,2000);if(it.pos)el.style.setProperty('--pos',it.pos)}});
 if(c.t)Object.keys(c.t).forEach(function(k){setT(k,c.t[k])});
 if(c.connect_text)$$('[data-rep="connect"] span').forEach(function(s){s.textContent=c.connect_text});
 if(c.tm)c.tm.forEach(function(it,i){var n=i+1;setT('q'+n,it.text);setT('n'+n,it.name);var im=$('[data-i="t'+n+'"]');if(im&&(it.b||it.src)){im.src=url(it,900);if(it.pos)im.style.objectPosition=it.pos}});
 if(c.connect&&(c.connect.b||c.connect.src)){var bg=$('[data-bg="connect"]');if(bg)bg.style.backgroundImage='url('+url(c.connect,2000)+')'}
 if(c.grid&&c.grid.length){var g=$('.gcols');if(g){g.innerHTML=c.grid.map(function(it){return '<figure class="rv in"><img loading="lazy" alt="" src="'+url(it,900)+'" data-full="'+url(it,2000)+'"></figure>'}).join('');}
  var lab=$('[data-count]');if(lab)lab.textContent=c.grid.length+' moments'}
}
try{apply(JSON.parse(localStorage.getItem(CK)))}catch(e){}
try{fetch(SB+'/rest/v1/site_content?key=eq.home&select=value',{headers:{apikey:KEY,Authorization:'Bearer '+KEY}}).then(function(r){return r.ok?r.json():null}).then(function(a){
 if(!a)return;var v=a[0]&&a[0].value;
 if(v){apply(v);try{localStorage.setItem(CK,JSON.stringify(v))}catch(e){}}else{try{localStorage.removeItem(CK)}catch(e){}}
}).catch(function(){})}catch(e){}

/* ---------- reveal ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach(function(el){io.observe(el)});

/* ---------- words light up with scroll ---------- */
scr=$$('.scrub');scr.forEach(splitScrub);
function paintScrub(){scr.forEach(function(el){var r=el.getBoundingClientRect(),vh=innerHeight;var p=clamp((vh*.82-r.top)/(vh*.5+r.height*.6),0,1);var w=$$('span',el),n=Math.floor(p*w.length*1.08);w.forEach(function(s,i){s.style.opacity=i<n?1:.16})})}

/* ---------- testimonial slider ---------- */
$$('.slider').forEach(function(sl){var q=$$('.sq',sl),ph=$$('.ph img',sl),i=0,cn=$('.cn',sl),t;
 function go(n){i=(n+q.length)%q.length;q.forEach(function(e,k){e.classList.toggle('on',k===i)});ph.forEach(function(e,k){e.classList.toggle('on',k===i)});if(cn)cn.textContent=('0'+(i+1)).slice(-2)}
 function auto(){clearInterval(t);if(!reduce)t=setInterval(function(){go(i+1)},7000)}
 $$('.pv',sl).forEach(function(b){b.addEventListener('click',function(){go(i-1);auto()})});$$('.nx',sl).forEach(function(b){b.addEventListener('click',function(){go(i+1);auto()})});go(0);auto()});

/* ---------- lightbox ---------- */
var lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt="">';body.appendChild(lb);
lb.addEventListener('click',function(){lb.classList.remove('on')});
document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});
var gc=$('.gcols');if(gc)gc.addEventListener('click',function(e){var m=e.target.closest('img');if(!m)return;lb.firstChild.src=m.dataset.full||m.src;lb.classList.add('on')});

/* ---------- hero ---------- */
var fr=$('#frame'),hero=$('#hero'),bgc=$('.cn2 .bg'),hs=$$('#frame img'),cur=0;
function show(i){if(i===cur&&hs[i].classList.contains('on'))return;cur=i;hs.forEach(function(m,k){m.classList.toggle('on',k===i)})}
setInterval(function(){if(!desk())show((cur+1)%hs.length)},4200);
function paint(){
 if(desk()){var r=hero.getBoundingClientRect(),p=clamp(-r.top/(r.height-innerHeight),0,1);
  show(p<.2?0:p<.4?1:2);
  var q=clamp((p-.55)/.45,0,1),e=1-Math.pow(1-q,3);
  fr.style.transform='scale('+(1-e*.46)+')';fr.style.borderRadius=(e*22)+'px';$('.heroA .ttl').style.opacity=clamp((q-.35)/.4,0,1)}
 else{fr.style.transform='';$('.heroA .ttl').style.opacity=''}
 if(bgc){var c=bgc.parentNode.getBoundingClientRect();if(c.bottom>0&&c.top<innerHeight){bgc.style.transform='translateY('+((c.top/innerHeight)*-40).toFixed(1)+'px)'}}
 paintScrub();
}
var tick=false;function req(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;paint()})}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);addEventListener('load',req);req();
})();
