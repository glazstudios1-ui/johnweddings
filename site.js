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
function set(c){if(!c)return;cur=c;base(c);subs.forEach(function(f){try{f(c)}catch(e){}})}
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
 addEventListener('load',function(){parent.postMessage({je:1,type:'ready',path:location.pathname},'*')});
}
})();
