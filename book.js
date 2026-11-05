(function(){
var SU='https://vzunjnrosrmvtlipqpsa.supabase.co',SK='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',root=document.getElementById('bk'),QS=new URLSearchParams(location.search),s=QS.get('s')||'',k=QS.get('k')||'',demo=s==='demo';
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function rpc(n,b){return fetch(SU+'/rest/v1/rpc/'+n,{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':'application/json'},body:JSON.stringify(b)}).then(function(r){return r.ok?r.json():null}).catch(function(){return null})}
function ext(u){var m=String(u).split('?')[0].match(/\.([a-z0-9]{2,4})$/i);return m?m[1]:'m4a'}
function safe(n){return String(n||'voice').replace(/[^\w؀-ۿ -]+/g,'').trim().slice(0,40)||'voice'}
function dlOne(u,name){fetch(u).then(function(r){return r.blob()}).then(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();a.remove()}).catch(function(){window.open(u,'_blank')})}
function loadZip(){return new Promise(function(res,rej){if(window.JSZip)return res();var x=document.createElement('script');x.src='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';x.onload=res;x.onerror=rej;document.head.appendChild(x)})}
function fmtD(t){try{return new Date(t).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}catch(e){return ''}}
Promise.all([demo?Promise.resolve({names:'Sara & Omar',voices:[]}):rpc('get_invitation',{p_slug:s}),demo?Promise.resolve([{guest_name:'Mona',url:'',seconds:23,created_at:new Date().toISOString()},{guest_name:'Uncle Hany',url:'',seconds:41,created_at:new Date().toISOString()}]):rpc('get_voices',{p_slug:s,p_key:k})]).then(function(r){
  var inv=r[0]||{},rows=r[1];
  if(!inv.names||!Array.isArray(rows)){root.innerHTML='<div class="bk-in"><h1>Link not found</h1><p>Please check the link we emailed you.</p></div>';return}
  var items=[];(inv.voices||[]).forEach(function(v){if(v&&v.url)items.push({n:v.label||'You',u:v.url,d:'',c:1})});
  rows.forEach(function(x){items.push({n:x.guest_name||'Guest',u:x.url,d:fmtD(x.created_at),sec:x.seconds,c:0})});
  var h='<div class="bk-in"><p class="bk-k">Your memories</p><h1>'+esc(inv.names)+'</h1><p class="bk-s">'+rows.length+' voice blessing'+(rows.length===1?'':'s')+' from your guests. Keep them forever.</p>';
  if(items.some(function(x){return x.u}))h+='<button class="bk-all" id="all">Download all (zip)</button><p class="bk-m" id="am"></p>';
  h+='<div class="bk-l">'+(items.length?items.map(function(x,i){return '<div class="bk-r"><div class="bk-t"><b>'+esc(x.n)+'</b><span>'+(x.c?'Your voice note':esc(x.d))+'</span></div>'+(x.u?'<audio controls preload="none" src="'+esc(x.u)+'"></audio><button class="bk-d" data-i="'+i+'">Download</button>':'<em>(demo)</em>')+'</div>'}).join(''):'<p class="bk-s">No blessings yet. Share the invitation link with your guests.</p>')+'</div></div>';
  root.innerHTML=h;
  [].forEach.call(root.querySelectorAll('.bk-d'),function(b){b.onclick=function(){var x=items[+b.getAttribute('data-i')];dlOne(x.u,safe(x.n)+'.'+ext(x.u))}});
  var all=document.getElementById('all');
  if(all)all.onclick=function(){var am=document.getElementById('am');all.disabled=true;am.textContent='Preparing…';
    loadZip().then(function(){var z=new JSZip(),n=0,used={};
      return items.filter(function(x){return x.u}).reduce(function(p,x,i){return p.then(function(){return fetch(x.u).then(function(r){return r.blob()}).then(function(b){var nm=(x.c?'0-couple-':String(i+1).padStart(2,'0')+'-')+safe(x.n);if(used[nm]){used[nm]++;nm+='-'+used[nm]}else used[nm]=1;z.file(nm+'.'+ext(x.u),b);n++}).catch(function(){})})},Promise.resolve()).then(function(){return z.generateAsync({type:'blob'})})})
     .then(function(blob){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=safe(inv.names)+'-voice-memories.zip';document.body.appendChild(a);a.click();a.remove();am.textContent='Done!';all.disabled=false})
     .catch(function(){am.textContent='Could not prepare the zip. Use the Download buttons below.';all.disabled=false})};
});
})();
