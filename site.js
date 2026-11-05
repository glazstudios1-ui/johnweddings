(function(){
var PRE=/[?&]preview=1/.test(location.search),SB='https://vzunjnrosrmvtlipqpsa.supabase.co',KEY='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',CK='je_home_v1',EDIT=/[?&]edit=1/.test(location.search);
var subs=[],cur=null,$$=function(s){return[].slice.call(document.querySelectorAll(s))};
function url(it,w){if(!it)return'';return it.b?it.b+'-'+w+'.jpg':(it.src||'')}
function base(c){
 if(window.__design&&c.design)window.__design(c.design);
 var t={};if(c.t)for(var k in c.t)t[k]=c.t[k];
 if(c.tm)c.tm.forEach(function(it,i){if(it){t['q'+(i+1)]=it.text;t['n'+(i+1)]=it.name}});
 for(var k in t){var v=t[k];if(v==null||v==='')continue;$$('[data-t="'+k+'"]').forEach(function(el){if(el.textContent===v)return;el.textContent=v;if(el.classList.contains('scrub')&&window.__splitScrub)window.__splitScrub(el)})}
 if(c.img)for(var k in c.img){var it=c.img[k];if(!it||!(it.b||it.src))continue;$$('[data-i="'+k+'"]').forEach(function(im){var pic=im.parentNode;if(pic&&pic.tagName==='PICTURE')$$('picture source').forEach(function(s){s.remove()});im.removeAttribute('srcset');im.src=url(it,k==='ab_img'?900:2000);if(it.pos)im.style.objectPosition=it.pos})}
}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function pageSlug(){var m=location.search.match(/[?&]s=([^&]+)/);return m?decodeURIComponent(m[1]):''}
function navs(c){$$('.je-cn').forEach(function(a){a.remove()});
 (c.pages||[]).filter(function(p){return p.slug&&p.nav!==false}).forEach(function(p){['.hdr nav.nr','.mm','.ftr nav'].forEach(function(sel){$$(sel).forEach(function(n){var a=document.createElement('a');a.className='je-cn';a.href='/page/?s='+encodeURIComponent(p.slug);a.textContent=p.title;n.appendChild(a)})})})}
function cpage(c){var root=document.getElementById('cp');if(!root)return;var sl=pageSlug(),pg=(c.pages||[]).filter(function(p){return p.slug===sl})[0];
 if(!pg){root.innerHTML='<div class="cp-in"><h1>Page not found</h1><p><a href="/">Back to the home page</a></p></div>';return}
 document.title=pg.title+' – john emad';
 var h='<div class="cp-in" data-sel="cp"><h1>'+esc(pg.title)+'</h1>';
 (pg.blocks||[]).forEach(function(b){
  if(b.type==='text')h+='<section class="cb">'+(b.h?'<h2>'+esc(b.h)+'</h2>':'')+String(b.p||'').split(/\n+/).filter(Boolean).map(function(x){return'<p>'+esc(x)+'</p>'}).join('')+'</section>';
  if(b.type==='image'&&b.img&&(b.img.b||b.img.src))h+='<figure class="cb"><img alt="" style="object-position:'+esc(b.img.pos||'50% 50%')+'" src="'+esc(url(b.img,2000))+'">'+(b.cap?'<figcaption>'+esc(b.cap)+'</figcaption>':'')+'</figure>';
  if(b.type==='gallery'&&b.imgs&&b.imgs.length)h+='<div class="cb gal">'+b.imgs.map(function(it){return'<img loading="lazy" alt="" src="'+esc(url(it,900))+'">'}).join('')+'</div>';
  if(b.type==='button'&&b.label)h+='<p class="cb"><a class="btn" href="'+esc(b.href||'/booking/')+'">'+esc(b.label)+'</a></p>';
 });
 root.innerHTML=h+'</div>'}

/* ---------- testimonials deck ---------- */
var DK={i:0,t:null,hold:false,sig:''},reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function ini(n){var p=String(n||'').split(/\s*(?:&|and|\+)\s*/i).map(function(x){return x.trim().charAt(0).toUpperCase()}).filter(Boolean);return p.slice(0,2).join('&')||'\u2605'}
function cardHtml(c,k){var v=c.t==='video',src=url(v?c.poster:c.img,900),full=url(v?c.poster:c.img,2000),m=c.ini==null?ini(c.name):c.ini;
 return '<article class="dk-card" data-k="'+k+'" data-type="'+(v?'video':'photo')+'"'+(v?' data-vid="'+esc((c.vid&&c.vid.src)||'')+'"':'')+' data-full="'+esc(full)+'"><img alt="'+esc(c.name)+' - wedding photographed by John Emad" loading="lazy" src="'+esc(src)+'" style="object-position:'+esc((c.img&&c.img.pos)||'50% 50%')+'"><div class="dk-sh"></div>'+(m?'<div class="dk-ini">'+esc(m)+'</div>':'')+'<div class="dk-nm">'+esc(c.name)+'</div>'+(v?'<span class="dk-play" aria-hidden="true"></span>':'')+'<div class="dk-tx" hidden>'+esc(c.text||'')+'</div></article>'}
function layout(){var cs=$$('.dk-card'),n=cs.length;if(DK.i>=n)DK.i=0;cs.forEach(function(el,k){var r=(k-DK.i+n)%n;el.style.setProperty('--r',Math.min(r,4));el.classList.toggle('far',r>3);el.style.zIndex=n-r});var cn=document.querySelector('.dk-n');if(cn&&n)cn.textContent=('0'+(DK.i+1)).slice(-2)+' / '+('0'+n).slice(-2)}
function adv(d){var cs=$$('.dk-card');if(cs.length<2)return;if(d>0){var top=cs[DK.i];top.classList.add('out');setTimeout(function(){top.classList.remove('out');DK.i=(DK.i+1)%cs.length;layout()},reduce?0:420)}else{DK.i=(DK.i-1+cs.length)%cs.length;layout()}}
function autoDeck(){clearInterval(DK.t);if(reduce||EDIT||!document.querySelector('.deck'))return;DK.t=setInterval(function(){if(!document.querySelector('.tmod.on')&&!DK.hold)adv(1)},4800)}
function renderDeck(cards){var d=document.querySelector('.deck');if(!d)return;var sig=JSON.stringify(cards);if(sig===DK.sig)return;DK.sig=sig;
 d.innerHTML=cards.map(cardHtml).join('');var l=document.querySelector('.tq-list');
 if(l)l.innerHTML=cards.filter(function(c){return c.text}).map(function(c){return'<blockquote><p>'+esc(c.text)+'</p><cite>'+esc(c.name)+'</cite></blockquote>'}).join('');layout();autoDeck()}
function openCard(el){var md=document.querySelector('.tmod');if(!md){md=document.createElement('div');md.className='tmod';document.body.appendChild(md);
  md.addEventListener('click',function(e){if(e.target===md||e.target.classList.contains('tm-x'))closeCard()});document.addEventListener('keydown',function(e){if(e.key==='Escape')closeCard()})}
 var v=el.dataset.type==='video',nm=el.querySelector('.dk-nm').textContent,tx=el.querySelector('.dk-tx').textContent;
 md.className='tmod on'+(v?' vd':'');
 md.innerHTML='<button class="tm-x" aria-label="Close">&times;</button><div class="tm-in">'+(v?'<video src="'+esc(el.dataset.vid)+'" poster="'+esc(el.querySelector('img').src)+'" controls autoplay playsinline></video>':'<img alt="'+esc(nm)+'" src="'+esc(el.dataset.full||el.querySelector('img').src)+'">')+'<div class="tm-t">'+(tx?'<p>&ldquo;'+esc(tx)+'&rdquo;</p>':'')+'<cite>'+esc(nm)+'</cite></div></div>'}
function closeCard(){var md=document.querySelector('.tmod');if(md){md.className='tmod';md.innerHTML=''}}
document.addEventListener('click',function(e){if(EDIT)return;var p=e.target.closest('.dk-p'),n=e.target.closest('.dk-nx'),c=e.target.closest('.dk-card');
 if(p){adv(-1);autoDeck()}else if(n){adv(1);autoDeck()}else if(c&&c.style.getPropertyValue('--r')==='0')openCard(c)});
document.addEventListener('mouseover',function(e){DK.hold=!!e.target.closest('.deck')});
document.addEventListener('DOMContentLoaded',function(){layout();autoDeck()});

function set(c){if(!c)return;cur=c;base(c);navs(c);cpage(c);if(c.tcards&&c.tcards.length)renderDeck(c.tcards);subs.forEach(function(f){try{f(c)}catch(e){}})}
window.JE={on:function(f){subs.push(f);if(cur)try{f(cur)}catch(e){}},set:set};
if(!EDIT){
 if(!PRE)try{set(JSON.parse(localStorage.getItem(CK)))}catch(e){}
 try{fetch(SB+'/rest/v1/site_content?key='+(PRE?'in.(home_draft,home)':'eq.home')+'&select=key,value',{headers:{apikey:KEY,Authorization:'Bearer '+KEY}}).then(function(r){return r.ok?r.json():null}).then(function(a){
  if(!a)return;var v=null;a.forEach(function(r){if(r.key==='home_draft'||(r.key==='home'&&!v))v=r.value});
  if(PRE){if(v)set(v);return}
  if(v){set(v);try{localStorage.setItem(CK,JSON.stringify(v))}catch(e){}}else{try{localStorage.removeItem(CK)}catch(e){}}
 }).catch(function(){})}catch(e){}
}else{
 addEventListener('message',function(e){var d=e.data;if(!d||!d.je)return;
  if(d.type==='content')set(d.c);
  if(d.type==='sel'){$$('.je-sel').forEach(function(x){x.classList.remove('je-sel')});var el=d.sel&&document.querySelector('[data-sel="'+d.sel+'"]');if(el){el.classList.add('je-sel');var r=el.getBoundingClientRect();scrollTo({top:scrollY+r.top-70,behavior:'smooth'})}}});
 document.addEventListener('click',function(e){var a=e.target.closest('a'),s=e.target.closest('[data-sel]');
  if(a||s)e.preventDefault();e.stopPropagation();
  var href=a&&a.getAttribute('href');
  if(href&&href.charAt(0)==='/'&&!s){parent.postMessage({je:1,type:'nav',href:href},'*');return}
  if(s){$$('.je-sel').forEach(function(x){x.classList.remove('je-sel')});s.classList.add('je-sel');parent.postMessage({je:1,type:'pick',sel:s.getAttribute('data-sel')},'*')}
 },true);
 document.addEventListener('submit',function(e){e.preventDefault()},true);
 addEventListener('load',function(){parent.postMessage({je:1,type:'ready',path:location.pathname,s:pageSlug()},'*')});
}
})();
