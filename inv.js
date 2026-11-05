(function(){
var SU='https://vzunjnrosrmvtlipqpsa.supabase.co',SK='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',root=document.getElementById('inv');
var slug=new URLSearchParams(location.search).get('s')||'';
var DEMO={theme:new URLSearchParams(location.search).get('theme')||'noir',lang:'en',hosts:'Together with their families',names:'Sara & Omar',date:(function(){var d=new Date();d.setMonth(d.getMonth()+3);return d.toISOString().slice(0,10)})(),time:'18:30',venue:'The Garden Hall',address:'New Cairo, Egypt',map:'https://maps.google.com',program:[{t:'6:30 PM',l:'Ceremony'},{t:'8:00 PM',l:'Dinner'},{t:'9:30 PM',l:'Party'}],dress:'Formal',msg:'Your presence is the best gift we could ask for. We cannot wait to celebrate with you.',rsvp:'01066600848',photo:''};
var L={en:{loc:'en-GB',rsvp:'Will you join us?',yes:'Yes, I will be there',no:'Sorry, I cannot make it',prog:'The day',dress:'Dress code',when:'When',where:'Where',maps:'Get directions',cal:'Add to calendar',days:'Days',hrs:'Hours',min:'Min',sec:'Sec',today:'Today is the day',made:'Digital invitation by John Emad Weddings',yesm:function(n){return 'Hi! I will be at '+n+'\'s wedding. See you there!'},nom:function(n){return 'Hi! Sorry, I cannot make it to '+n+'\'s wedding. Wishing you all the best!'},nf:'This invitation was not found.',nf2:'Please check the link you were sent.'},
ar:{loc:'ar-EG-u-nu-latn',rsvp:'هل ستشاركنا فرحتنا؟',yes:'نعم، سأكون هناك',no:'للأسف لن أستطيع الحضور',prog:'برنامج اليوم',dress:'الزي',when:'الموعد',where:'المكان',maps:'الاتجاهات',cal:'أضف إلى التقويم',days:'يوم',hrs:'ساعة',min:'دقيقة',sec:'ثانية',today:'اليوم هو اليوم الموعود',made:'دعوة رقمية من جون عماد ويدينجز',yesm:function(n){return 'أهلاً! سأحضر زفاف '+n+'. نراكم هناك!'},nom:function(n){return 'أهلاً! للأسف لن أستطيع حضور زفاف '+n+'. أتمنى لكم كل السعادة!'},nf:'لم نجد هذه الدعوة.',nf2:'من فضلك تأكد من الرابط الذي وصلك.'}};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function wa(ph){var n=String(ph||'').replace(/[^\d]/g,'');if(n.indexOf('00')===0)n=n.slice(2);else if(n.indexOf('0')===0)n='20'+n.slice(1);return 'https://wa.me/'+n}
function http(u){return /^https?:\/\//i.test(u||'')?u:''}
function parts(n){return String(n||'').split(/\s*(?:&|\band\b|\+|و)\s*/i).map(function(x){return x.trim()}).filter(Boolean)}
function ini(n){var p=parts(n).map(function(x){return x.charAt(0).toUpperCase()});return p.slice(0,2).join(' & ')}
function load(){
  if(slug==='demo')return Promise.resolve(DEMO);
  if(!slug)return Promise.resolve(null);
  return fetch(SU+'/rest/v1/rpc/get_invitation',{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':'application/json'},body:JSON.stringify({p_slug:slug})}).then(function(r){return r.ok?r.json():null}).catch(function(){return null});
}
function when(d){var dt=new Date(d.date+'T'+(d.time||'00:00')+':00');return isNaN(dt)?null:dt}
function render(d){
  document.body.classList.remove('th-sage','th-ivory');if(d.theme==='sage'||d.theme==='ivory')document.body.classList.add('th-'+d.theme);
  var t=L[d.lang==='ar'?'ar':'en'],ar=d.lang==='ar';
  document.documentElement.lang=ar?'ar':'en';root.dir=ar?'rtl':'ltr';root.classList.toggle('ar',ar);
  if(!d.names){root.innerHTML='<div class="inv-nf"><h1>'+t.nf+'</h1><p>'+t.nf2+'</p></div>';return}
  document.title=d.names;
  var dt=when(d),pn=parts(d.names),h='';
  var photo=(d.photo&&d.photo.indexOf(SU)===0)?d.photo:'';
  h+='<section class="iv-hero'+(photo?' has-photo':'')+'">'+(photo?'<div class="iv-bg" style="background-image:url(\''+esc(photo)+'\')"></div>':'')+'<div class="iv-in">';
  h+='<div class="iv-mono">'+esc(ini(d.names))+'</div>';
  if(d.hosts)h+='<p class="iv-hosts">'+esc(d.hosts)+'</p>';
  h+='<h1 class="iv-names">'+(pn.length>1?esc(pn[0])+'<span class="iv-and">&amp;</span>'+esc(pn.slice(1).join(' & ')):esc(d.names))+'</h1>';
  if(dt)h+='<p class="iv-date">'+esc(dt.toLocaleDateString(t.loc,{weekday:'long',day:'numeric',month:'long',year:'numeric'}))+'</p>';
  if(d.venue)h+='<p class="iv-venue">'+esc(d.venue)+'</p>';
  h+='<span class="iv-scroll" aria-hidden="true"></span></div></section>';
  if(dt)h+='<section class="iv-cd" id="cd"></section>';
  h+='<section class="iv-sec"><div class="iv-grid">';
  if(dt)h+='<div class="iv-box"><span>'+t.when+'</span><b>'+esc(dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}))+'</b>'+(d.time?'<em>'+esc(dt.toLocaleTimeString(t.loc,{hour:'numeric',minute:'2-digit'}))+'</em>':'')+'</div>';
  if(d.venue)h+='<div class="iv-box"><span>'+t.where+'</span><b>'+esc(d.venue)+'</b>'+(d.address?'<em>'+esc(d.address)+'</em>':'')+'</div>';
  h+='</div><div class="iv-btns">'+(http(d.map)?'<a class="iv-btn" href="'+esc(http(d.map))+'" target="_blank" rel="noopener">'+t.maps+'</a>':'')+(dt?'<button class="iv-btn ghost" id="ics">'+t.cal+'</button>':'')+'</div></section>';
  var pr=(d.program||[]).filter(function(x){return x&&(x.l||x.t)});
  if(pr.length){h+='<section class="iv-sec"><h2>'+t.prog+'</h2><ol class="iv-prog">'+pr.map(function(x){return '<li><time>'+esc(x.t||'')+'</time><span>'+esc(x.l||'')+'</span></li>'}).join('')+'</ol></section>'}
  if(d.dress)h+='<section class="iv-sec"><h2>'+t.dress+'</h2><p class="iv-p">'+esc(d.dress)+'</p></section>';
  if(d.msg)h+='<section class="iv-sec"><p class="iv-msg">'+esc(d.msg).replace(/\n/g,'<br>')+'</p></section>';
  if(d.rsvp)h+='<section class="iv-sec iv-rs"><h2>'+t.rsvp+'</h2><div class="iv-btns"><a class="iv-btn" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.yesm(d.names))+'" target="_blank" rel="noopener">'+t.yes+'</a><a class="iv-btn ghost" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.nom(d.names))+'" target="_blank" rel="noopener">'+t.no+'</a></div></section>';
  h+='<footer class="iv-ft"><a href="https://www.johnemadweddings.com/shop/invitation/" target="_blank" rel="noopener">'+t.made+'</a></footer>';
  root.innerHTML=h;
  envelope(d,t);
  reveal();
  if(dt){
    var cd=document.getElementById('cd');
    (function tick(){var ms=dt-new Date();if(ms<=0){cd.innerHTML='<p class="iv-today">'+t.today+'</p>';return}
      var s=Math.floor(ms/1000),dd=Math.floor(s/86400),hh=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60),ss=s%60;
      cd.innerHTML=[[dd,t.days],[hh,t.hrs],[mm,t.min],[ss,t.sec]].map(function(x){return '<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('');setTimeout(tick,1000)})();
    var b=document.getElementById('ics');
    if(b)b.onclick=function(){
      var p=function(n){return String(n).padStart(2,'0')},f=function(x){return x.getFullYear()+p(x.getMonth()+1)+p(x.getDate())+'T'+p(x.getHours())+p(x.getMinutes())+'00'},e=new Date(dt.getTime()+4*3600*1000);
      var s=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//John Emad Weddings//EN','BEGIN:VEVENT','UID:'+Date.now()+'@johnemadweddings.com','DTSTAMP:'+f(new Date()),'DTSTART:'+f(dt),'DTEND:'+f(e),'SUMMARY:'+String(d.names).replace(/[,;\n]/g,' '),'LOCATION:'+[d.venue,d.address].filter(Boolean).join(' - ').replace(/[,;\n]/g,' '),'END:VEVENT','END:VCALENDAR'].join('\r\n');
      var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'text/calendar'}));a.download='invitation.ics';document.body.appendChild(a);a.click();a.remove()};
  }
}
function envelope(d,t){
  var ev=document.createElement('div');ev.className='iv-env';
  ev.innerHTML='<div class="iv-envw" role="button" tabindex="0" aria-label="Open"><div class="iv-envb"></div><div class="iv-card"><span>'+esc(d.names)+'</span></div><div class="iv-front"></div><div class="iv-flap"></div><div class="iv-seal">'+esc(ini(d.names).replace(/\s/g,''))+'</div></div><div class="iv-tap">'+(d.lang==='ar'?'اضغط لفتح الدعوة':'Tap to open')+'</div>';
  document.body.appendChild(ev);document.documentElement.style.overflow='hidden';
  var done=false;function open(){if(done)return;done=true;ev.classList.add('open');setTimeout(function(){ev.classList.add('gone');document.documentElement.style.overflow='';reveal(true);setTimeout(function(){ev.remove()},1400)},1900)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(new URLSearchParams(location.search).get('open')==='1')open();
}
function reveal(go){
  var els=[].slice.call(document.querySelectorAll('.iv-sec,.iv-cd,.iv-ft'));els.forEach(function(e){e.classList.add('rv')});
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)});
}
load().then(function(d){render(d||{})});
})();
