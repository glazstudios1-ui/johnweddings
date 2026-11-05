(function(){
var SU='https://vzunjnrosrmvtlipqpsa.supabase.co',SK='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',root=document.getElementById('inv');
var QS=new URLSearchParams(location.search),slug=QS.get('s')||'',PREVIEW=QS.get('preview')==='1',gen=0,cur=0,timer=0,audio=null;
var DEMO={theme:QS.get('theme')||'sage',lang:QS.get('lang')||'en',hosts:'',names:'Sara & Omar',date:(function(){var d=new Date();d.setMonth(d.getMonth()+3);d.setDate(12);return d.toISOString().slice(0,10)})(),time:'18:30',venue:'The Garden Hall',address:'New Cairo, Egypt',map:'https://maps.google.com',program:[{t:'6:30 PM',l:'Ceremony'},{t:'8:00 PM',l:'Dinner'},{t:'9:30 PM',l:'Party'},{t:'11:30 PM',l:'Cake'}],dress:'Formal, soft green tones',msg:'Your presence is the best gift we could ask for.',rsvp:'01066600848',photos:['/img/home/hero1.jpg','/img/home/hero2.jpg','/img/home/hero3.jpg'],music:''};
var L={en:{loc:'en-GB',join:'Join us for the wedding of',std:'Save the date',det:'The details',ven:'The venue',cer:'The ceremony',dress:'Dress code',prog:'Wedding program',rsvp:'Kindly RSVP',rsub:'We would love to know if you can join us',yes:'Yes, I will be there',no:'Sorry, I cannot make it',call:'Call us',fin:'We hope to see you there',cal:'Add to calendar',maps:'Get directions',tap:'Tap to open',yesm:function(n){return 'Hi! I will be at '+n+'\'s wedding. See you there!'},nom:function(n){return 'Hi! Sorry, I cannot make it to '+n+'\'s wedding. Wishing you all the best!'},nf:'This invitation was not found.',nf2:'Please check the link you were sent.',made:'Digital invitation by John Emad Weddings'},
ar:{loc:'ar-EG-u-nu-latn',join:'يتشرفون بدعوتكم لحضور زفاف',std:'احفظوا الموعد',det:'التفاصيل',ven:'المكان',cer:'الموعد',dress:'الزي',prog:'برنامج الحفل',rsvp:'تأكيد الحضور',rsub:'يسعدنا معرفة حضوركم',yes:'نعم، سأكون هناك',no:'للأسف لن أستطيع الحضور',call:'اتصل بنا',fin:'نتشرف بحضوركم',cal:'أضف إلى التقويم',maps:'الاتجاهات',tap:'اضغط لفتح الدعوة',yesm:function(n){return 'أهلاً! سأحضر زفاف '+n+'. نراكم هناك!'},nom:function(n){return 'أهلاً! للأسف لن أستطيع حضور زفاف '+n+'. أتمنى لكم كل السعادة!'},nf:'لم نجد هذه الدعوة.',nf2:'من فضلك تأكد من الرابط الذي وصلك.',made:'دعوة رقمية من جون عماد ويدينجز'}};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function wa(ph){var n=String(ph||'').replace(/[^\d]/g,'');if(n.indexOf('00')===0)n=n.slice(2);else if(n.indexOf('0')===0)n='20'+n.slice(1);return 'https://wa.me/'+n}
function http(u){return /^https?:\/\//i.test(u||'')?u:''}
function parts(n){return String(n||'').split(/\s*(?:&|\band\b|\+|و)\s*/i).map(function(x){return x.trim()}).filter(Boolean)}
function ini(n){return parts(n).map(function(x){return x.charAt(0).toUpperCase()}).slice(0,2).join('')}
function okPhoto(u){u=String(u||'');return u.indexOf(SU)===0||(PREVIEW&&u.indexOf('blob:')===0)||(slug==='demo'||PREVIEW)&&u.indexOf('/img/')===0}
function load(){
  if(slug==='demo')return Promise.resolve(DEMO);
  if(!slug)return Promise.resolve(null);
  return fetch(SU+'/rest/v1/rpc/get_invitation',{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':'application/json'},body:JSON.stringify({p_slug:slug})}).then(function(r){return r.ok?r.json():null}).catch(function(){return null});
}
function when(d){var dt=new Date(d.date+'T'+(d.time||'00:00')+':00');return isNaN(dt)?null:dt}
function wreath(t){
  var s='<svg viewBox="0 0 120 120" class="wr" aria-hidden="true"><circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width=".8" opacity=".8"/><g fill="currentColor" opacity=".85">';
  for(var side=0;side<2;side++)for(var i=0;i<9;i++){var a=95+i*19,ang=side?180-a:a,r=a*Math.PI/180,x=60+(side?-1:1)*46*Math.cos(r),y=60+46*Math.sin(r),rot=(side?180-(a+90):a+90)+(i%2?28:-28);s+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="6.4" ry="2.2" transform="rotate('+rot.toFixed(0)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>'}
  return s+'</g><text x="60" y="67" text-anchor="middle" font-size="21" fill="currentColor" font-family="Cormorant Garamond,serif" letter-spacing="2">'+esc(t.split('').join(' '))+'</text></svg>'}
function icon(l){
  var s=String(l).toLowerCase(),p='M12 3l2 4h-4z';
  var I={ring:'<circle cx="12" cy="15" r="5"/><path d="M9 8l3-4 3 4z"/>',food:'<path d="M7 3v8M5 3v5a2 2 0 004 0V3M7 11v10M17 3c-2 2-3 5-3 8h3v10"/>',music:'<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/>',cake:'<path d="M4 20h16v-7H4zM6 13c0-3 2-4 6-4s6 1 6 4M12 9V5M12 5c-1-1 0-2 0-2s1 1 0 2"/>',cam:'<rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3.4"/><path d="M8 7l1.5-2h5L16 7"/>',dia:'<path d="M12 4l6 8-6 8-6-8z"/>'};
  var k=/ceremon|vow|nikah|katb|كتب|عقد|مراسم|زواج/.test(s)?'ring':/dinner|lunch|food|buffet|عشاء|غداء|بوفيه|اكل|أكل|طعام/.test(s)?'food':/party|dance|dj|music|band|حفل|رقص|ميوزك|دي جي|فرقة|زفة|زفه/.test(s)?'music':/cake|كيك|تورتة|تورته/.test(s)?'cake':/photo|session|تصوير|صور/.test(s)?'cam':'dia';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">'+I[k]+'</svg>'}
function calendar(dt,t,ar){
  var y=dt.getFullYear(),m=dt.getMonth(),first=new Date(y,m,1),days=new Date(y,m+1,0).getDate(),start=ar?(first.getDay()+1)%7:first.getDay();
  var wd=[];for(var i=0;i<7;i++){var d=new Date(2024,0,(ar?6:7)+i);wd.push(d.toLocaleDateString(t.loc,{weekday:'narrow'}))}
  var h='<div class="cal"><div class="cal-m">'+esc(dt.toLocaleDateString(t.loc,{month:'long',year:'numeric'}))+'</div><div class="cal-g">'+wd.map(function(x){return '<i>'+esc(x)+'</i>'}).join('');
  for(var b=0;b<start;b++)h+='<span></span>';
  for(var n=1;n<=days;n++)h+=(n===dt.getDate()?'<span class="on"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.4-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.6-8 11-8 11z" fill="none" stroke="currentColor" stroke-width="1.1"/></svg><b>'+n+'</b></span>':'<span>'+n+'</span>');
  return h+'</div></div>'}
function slides(d,t,ar){
  var dt=when(d),pn=parts(d.names),S=[];
  var nm=pn.length>1?'<span>'+esc(pn[0])+'</span><em>&amp;</em><span>'+esc(pn.slice(1).join(' & '))+'</span>':'<span>'+esc(d.names)+'</span>';
  S.push('<div class="sl-c">'+wreath(ini(d.names))+'<p class="sc-j">'+esc(d.hosts||t.join)+'</p><h1 class="sc-n">'+nm+'</h1>'+(dt?'<p class="sc-d">'+esc(dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}))+'</p>':'')+'</div>');
  if(dt)S.push('<div class="sl-c"><h2 class="sc-h">'+t.std+'</h2><div class="orn"></div>'+calendar(dt,t,ar)+(d.time?'<p class="sc-d">'+esc(dt.toLocaleTimeString(t.loc,{hour:'numeric',minute:'2-digit'}))+'</p>':'')+'<div class="btns"><button class="bt ghost" id="ics">'+t.cal+'</button></div></div>');
  var box=function(l,a,b){return '<div class="bx"><span>'+l+'</span><b>'+esc(a)+'</b>'+(b?'<em>'+esc(b)+'</em>':'')+'</div>'};
  var dh='<div class="sl-c"><h2 class="sc-h">'+t.det+'</h2><div class="orn"></div>';
  if(d.venue)dh+=box(t.ven,d.venue,d.address);
  if(dt&&d.time)dh+=box(t.cer,dt.toLocaleTimeString(t.loc,{hour:'numeric',minute:'2-digit'}),dt.toLocaleDateString(t.loc,{weekday:'long',day:'numeric',month:'long'}));
  if(d.dress)dh+=box(t.dress,d.dress);
  if(http(d.map))dh+='<div class="btns"><a class="bt" href="'+esc(http(d.map))+'" target="_blank" rel="noopener">'+t.maps+'</a></div>';
  S.push(dh+'</div>');
  var pr=(d.program||[]).filter(function(x){return x&&(x.l||x.t)}).slice(0,6);
  if(pr.length)S.push('<div class="sl-c"><h2 class="sc-h">'+t.prog+'</h2><div class="orn"></div><ol class="pg">'+pr.map(function(x){return '<li>'+icon(x.l||'')+'<time>'+esc(x.t||'')+'</time><span>'+esc(x.l||'')+'</span></li>'}).join('')+'</ol></div>');
  if(d.msg)S.push('<div class="sl-c"><div class="orn"></div><p class="sc-m">'+esc(d.msg).replace(/\n/g,'<br>')+'</p><div class="orn"></div></div>');
  if(d.rsvp)S.push('<div class="sl-c"><h2 class="sc-h">'+t.rsvp+'</h2><div class="orn"></div><p class="sc-s">'+t.rsub+'</p><div class="btns col"><a class="bt" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.yesm(d.names))+'" target="_blank" rel="noopener">'+t.yes+'</a><a class="bt ghost" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.nom(d.names))+'" target="_blank" rel="noopener">'+t.no+'</a><a class="bt ghost" href="tel:+'+wa(d.rsvp).replace('https://wa.me/','')+'">'+t.call+'</a></div></div>');
  S.push('<div class="sl-c"><div class="fcard">'+wreath(ini(d.names)).replace('class="wr"','class="wr dk"')+'<p class="fc-j">'+esc(d.names)+'</p><p class="fc-t">'+t.fin+'</p>'+(dt?'<p class="fc-d">'+esc(dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}))+'</p>':'')+'</div><a class="mk" href="https://www.johnemadweddings.com/shop/invitation/" target="_blank" rel="noopener">'+t.made+'</a></div>');
  return S}
function render(d){
  var my=++gen;clearTimeout(timer);
  var t=L[d.lang==='ar'?'ar':'en'],ar=d.lang==='ar';
  document.body.classList.remove('th-sage','th-ivory');if(d.theme==='sage'||d.theme==='ivory')document.body.classList.add('th-'+d.theme);
  document.documentElement.lang=ar?'ar':'en';root.dir=ar?'rtl':'ltr';root.classList.toggle('ar',ar);
  if(!d.names){root.innerHTML='<div class="inv-nf"><h1>'+t.nf+'</h1><p>'+t.nf2+'</p></div>';return}
  document.title=d.names;
  var ph=(d.photos&&d.photos.length?d.photos:(d.photo?[d.photo]:[])).filter(okPhoto);
  var S=slides(d,t,ar),dt=when(d),n=S.length;if(cur>=n)cur=0;
  var h='<div class="stage"><div class="bars">'+S.map(function(_,i){return '<i><b></b></i>'}).join('')+'</div>'+(d.music&&http(d.music)&&!PREVIEW?'<button class="mu" id="mu" aria-label="Music"></button>':'');
  S.forEach(function(x,i){var bg=ph.length?'<div class="bg" style="background-image:url(\''+esc(ph[i%ph.length])+'\')"></div>':'<div class="bg nobg"></div>';h+='<section class="sl'+(i===0?' first':'')+(ph.length?' hasph':'')+'" data-i="'+i+'">'+bg+'<div class="ov"></div>'+x+'</section>'});
  h+='<div class="zl"></div><div class="zr"></div></div>';
  root.innerHTML=h;
  var sl=[].slice.call(root.querySelectorAll('.sl')),bars=[].slice.call(root.querySelectorAll('.bars i'));
  var DUR=8000,auto=!PREVIEW,paused=false,t0=0,el=0;
  function show(i){cur=Math.max(0,Math.min(n-1,i));sl.forEach(function(s,k){s.classList.toggle('on',k===cur)});bars.forEach(function(b,k){b.className=k<cur?'full':k===cur?'run':'';b.firstChild.style.animation='none';void b.offsetWidth;b.firstChild.style.animation=''});el=0;t0=Date.now();root.classList.toggle('last',cur===n-1)}
  function tick(){if(my!==gen)return;if(auto&&!paused&&cur<n-1){if(Date.now()-t0>=DUR-el){show(cur+1)}}timer=setTimeout(tick,200)}
  show(cur);tick();
  if(!auto)root.classList.add('manual');
  var zl=root.querySelector('.zl'),zr=root.querySelector('.zr'),pd=0;
  function go(k){if(PREVIEW){show(cur+k);return}show(cur+k)}
  zl.onclick=function(){go(-1)};zr.onclick=function(){go(1)};
  var sx=0;root.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;paused=true;el+=Date.now()-t0},{passive:true});
  root.addEventListener('touchend',function(e){paused=false;t0=Date.now();var dx=(e.changedTouches[0].clientX-sx);if(Math.abs(dx)>50){e.preventDefault();go(dx<0?1:-1)}});
  root.addEventListener('keydown',function(e){if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
  document.onkeydown=function(e){if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)};
  var b=document.getElementById('ics');
  if(b&&dt)b.onclick=function(ev){ev.stopPropagation();
    var p=function(n){return String(n).padStart(2,'0')},f=function(x){return x.getFullYear()+p(x.getMonth()+1)+p(x.getDate())+'T'+p(x.getHours())+p(x.getMinutes())+'00'},e=new Date(dt.getTime()+4*3600*1000);
    var s=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//John Emad Weddings//EN','BEGIN:VEVENT','UID:'+Date.now()+'@johnemadweddings.com','DTSTAMP:'+f(new Date()),'DTSTART:'+f(dt),'DTEND:'+f(e),'SUMMARY:'+String(d.names).replace(/[,;\n]/g,' '),'LOCATION:'+[d.venue,d.address].filter(Boolean).join(' - ').replace(/[,;\n]/g,' '),'END:VEVENT','END:VCALENDAR'].join('\r\n');
    var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'text/calendar'}));a.download='invitation.ics';document.body.appendChild(a);a.click();a.remove()};
  [].forEach.call(root.querySelectorAll('.btns a,.btns button,.mk'),function(x){x.addEventListener('click',function(e){e.stopPropagation()});x.addEventListener('touchend',function(e){e.stopPropagation()})});
  var mu=document.getElementById('mu');
  if(mu){mu.onclick=function(e){e.stopPropagation();if(!audio)return;audio.muted=!audio.muted;mu.classList.toggle('off',audio.muted)}}
  if(!PREVIEW){root.classList.add('wait');paused=true;envelope(d,t,function(){paused=false;t0=Date.now();root.classList.remove('wait');if(d.music&&http(d.music)){try{audio=new Audio(d.music);audio.loop=true;audio.volume=.7;audio.play().catch(function(){})}catch(x){}}})}
}
function envelope(d,t,cb){
  var ev=document.createElement('div');ev.className='iv-env';
  ev.innerHTML='<div class="iv-envw" role="button" tabindex="0" aria-label="Open"><div class="iv-envb"></div><div class="iv-card"><span>'+esc(d.names)+'</span></div><div class="iv-front"></div><div class="iv-flap"></div><div class="iv-seal">'+esc(ini(d.names))+'</div></div><div class="iv-tap">'+t.tap+'</div>';
  document.body.appendChild(ev);
  var done=false;function open(){if(done)return;done=true;ev.classList.add('open');setTimeout(function(){ev.classList.add('gone');cb();setTimeout(function(){ev.remove()},1400)},1900)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(QS.get('open')==='1')open();
}
if(PREVIEW){
  var fill=function(x){x=x||{};var o={};Object.keys(DEMO).forEach(function(k){o[k]=DEMO[k]});Object.keys(x).forEach(function(k){if(x[k]!==''&&x[k]!=null&&!(Array.isArray(x[k])&&!x[k].length))o[k]=x[k]});o.music='';return o};
  window.addEventListener('message',function(e){if(e.data&&e.data.je==='inv')render(fill(e.data.d))});
  render(fill({}));try{parent.postMessage({je:'inv-ready'},'*')}catch(x){}
}else load().then(function(d){render(d||{})});
})();
