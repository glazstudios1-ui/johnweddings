(function(){
var SU='https://vzunjnrosrmvtlipqpsa.supabase.co',SK='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',root=document.getElementById('inv');
var QS=new URLSearchParams(location.search),slug=QS.get('s')||'',PREVIEW=QS.get('preview')==='1',gen=0,audio=null,cur=null,vols=[],duck=0;
var DEMO={theme:QS.get('theme')||'sage',lang:QS.get('lang')||'en',hosts:'',names:'Sara & Omar',date:(function(){var d=new Date();d.setMonth(d.getMonth()+3);d.setDate(12);return d.toISOString().slice(0,10)})(),time:'18:30',venue:'The Garden Hall',address:'New Cairo, Egypt',map:'https://maps.google.com',program:[{t:'6:30 PM',l:'Ceremony'},{t:'8:00 PM',l:'Dinner'},{t:'9:30 PM',l:'Party'},{t:'11:30 PM',l:'Cake'}],dress:'Formal, soft green tones',msg:'Your presence is the best gift we could ask for.',rsvp:'01066600848',photos:['/img/home/hero1.jpg','/img/home/hero2.jpg','/img/home/hero3.jpg'],music:'',voices:[{label:'Sara',url:''},{label:'Omar',url:''}]};
var L={en:{loc:'en-GB',join:'Join us for the wedding of',std:'Save the date',det:'The details',when:'When',where:'Where',dress:'Dress code',prog:'Wedding program',rsvp:'Kindly RSVP',rsub:'We would love to know if you can join us',yes:'Yes, I will be there',no:'Sorry, I cannot make it',call:'Call us',fin:'We hope to see you there',cal:'Add to calendar',maps:'Get directions',tap:'Tap to open',scroll:'Scroll',vh:'A little hello',vs:'Press play to hear us',bh:'Leave us a voice blessing',bs:'Record a short message for the couple. They will keep it forever.',bn:'Your name',bsend:'Send my blessing',bsending:'Sending…',bok:'Thank you! Your blessing was sent.',berr:'Could not send. Please try again.',bneed:'Please write your name and record your message first.',days:'Days',hrs:'Hours',min:'Min',sec:'Sec',today:'Today is the day',made:'Digital invitation by John Emad Weddings',yesm:function(n){return 'Hi! I will be at '+n+'\'s wedding. See you there!'},nom:function(n){return 'Hi! Sorry, I cannot make it to '+n+'\'s wedding. Wishing you all the best!'},nf:'This invitation was not found.',nf2:'Please check the link you were sent.',rt:{rec:'Tap to record',stop:'Recording… tap to stop',again:'Record again',deny:'Please allow the microphone to record.',nosup:'Recording is not supported on this browser.',short:'Too short, please try again.'}},
ar:{loc:'ar-EG-u-nu-latn',join:'يتشرفون بدعوتكم لحضور زفاف',std:'احفظوا الموعد',det:'التفاصيل',when:'الموعد',where:'المكان',dress:'الزي',prog:'برنامج الحفل',rsvp:'تأكيد الحضور',rsub:'يسعدنا معرفة حضوركم',yes:'نعم، سأكون هناك',no:'للأسف لن أستطيع الحضور',call:'اتصل بنا',fin:'نتشرف بحضوركم',cal:'أضف إلى التقويم',maps:'الاتجاهات',tap:'اضغط لفتح الدعوة',scroll:'اسحب لأسفل',vh:'كلمة منا',vs:'اضغط للاستماع',bh:'اترك لنا بركة بصوتك',bs:'سجّل رسالة قصيرة للعروسين، وهم هيحتفظوا بيها للأبد.',bn:'اسمك',bsend:'ابعت البركة',bsending:'جاري الإرسال…',bok:'شكرًا! وصلت رسالتك.',berr:'تعذر الإرسال، حاول مرة أخرى.',bneed:'من فضلك اكتب اسمك وسجّل رسالتك أولًا.',days:'يوم',hrs:'ساعة',min:'دقيقة',sec:'ثانية',today:'اليوم هو اليوم الموعود',made:'دعوة رقمية من جون عماد ويدينجز',yesm:function(n){return 'أهلاً! سأحضر زفاف '+n+'. نراكم هناك!'},nom:function(n){return 'أهلاً! للأسف لن أستطيع حضور زفاف '+n+'. أتمنى لكم كل السعادة!'},nf:'لم نجد هذه الدعوة.',nf2:'من فضلك تأكد من الرابط الذي وصلك.',rt:{rec:'اضغط للتسجيل',stop:'جاري التسجيل… اضغط للإيقاف',again:'سجّل من جديد',deny:'من فضلك اسمح باستخدام المايك.',nosup:'التسجيل غير مدعوم في هذا المتصفح.',short:'التسجيل قصير جدًا، حاول مرة أخرى.'}}};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function wa(ph){var n=String(ph||'').replace(/[^\d]/g,'');if(n.indexOf('00')===0)n=n.slice(2);else if(n.indexOf('0')===0)n='20'+n.slice(1);return 'https://wa.me/'+n}
function http(u){return /^https?:\/\//i.test(u||'')?u:''}
function parts(n){return String(n||'').split(/\s*(?:&|\band\b|\+|و)\s*/i).map(function(x){return x.trim()}).filter(Boolean)}
function ini(n){return parts(n).map(function(x){return x.charAt(0).toUpperCase()}).slice(0,2).join('')}
function okPhoto(u){u=String(u||'');return u.indexOf(SU)===0||(PREVIEW&&u.indexOf('blob:')===0)||((slug==='demo'||PREVIEW)&&u.indexOf('/img/')===0)}
function okAudio(u){u=String(u||'');return u.indexOf(SU)===0||(PREVIEW&&u.indexOf('blob:')===0)}
function load(){
  if(slug==='demo')return Promise.resolve(DEMO);
  if(!slug)return Promise.resolve(null);
  return fetch(SU+'/rest/v1/rpc/get_invitation',{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':'application/json'},body:JSON.stringify({p_slug:slug})}).then(function(r){return r.ok?r.json():null}).catch(function(){return null});
}
function when(d){var dt=new Date(d.date+'T'+(d.time||'00:00')+':00');return isNaN(dt)?null:dt}
function wreath(t,dk){
  var s='<svg viewBox="0 0 120 120" class="wr'+(dk?' dk':'')+'" aria-hidden="true"><circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width=".8" opacity=".8"/><g fill="currentColor" opacity=".85">';
  for(var side=0;side<2;side++)for(var i=0;i<9;i++){var a=95+i*19,r=a*Math.PI/180,x=60+(side?-1:1)*46*Math.cos(r),y=60+46*Math.sin(r),rot=(side?180-(a+90):a+90)+(i%2?28:-28);s+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="6.4" ry="2.2" transform="rotate('+rot.toFixed(0)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>'}
  return s+'</g><text x="60" y="67" text-anchor="middle" font-size="21" fill="currentColor" font-family="Cormorant Garamond,serif" letter-spacing="2">'+esc(t.split('').join(' '))+'</text></svg>'}
var IC={cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',dress:'<path d="M9 3l3 3 3-3 4 4-3 3v11H8V10L5 7z"/>',ring:'<circle cx="12" cy="15" r="5"/><path d="M9 8l3-4 3 4z"/>',food:'<path d="M7 3v8M5 3v5a2 2 0 004 0V3M7 11v10M17 3c-2 2-3 5-3 8h3v10"/>',music:'<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/>',cake:'<path d="M4 20h16v-7H4zM6 13c0-3 2-4 6-4s6 1 6 4M12 9V5M12 5c-1-1 0-2 0-2s1 1 0 2"/>',cam:'<rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3.4"/><path d="M8 7l1.5-2h5L16 7"/>',dia:'<path d="M12 4l6 8-6 8-6-8z"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>'};
function ico(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">'+IC[k]+'</svg>'}
function pick(l){var s=String(l).toLowerCase();return /ceremon|vow|nikah|katb|كتب|عقد|مراسم|زواج/.test(s)?'ring':/dinner|lunch|food|buffet|عشاء|غداء|بوفيه|اكل|أكل|طعام/.test(s)?'food':/party|dance|dj|music|band|حفل|رقص|ميوزك|دي جي|فرقة|زفة|زفه/.test(s)?'music':/cake|كيك|تورتة|تورته/.test(s)?'cake':/photo|session|تصوير|صور/.test(s)?'cam':'dia'}
function calendar(dt,t,ar){
  var y=dt.getFullYear(),m=dt.getMonth(),first=new Date(y,m,1),days=new Date(y,m+1,0).getDate(),start=ar?(first.getDay()+1)%7:first.getDay();
  var wd=[];for(var i=0;i<7;i++){var d=new Date(2024,0,(ar?6:7)+i);wd.push(d.toLocaleDateString(t.loc,{weekday:'narrow'}))}
  var h='<div class="cal"><div class="cal-m">'+esc(dt.toLocaleDateString(t.loc,{month:'long',year:'numeric'}))+'</div><div class="cal-g">'+wd.map(function(x){return '<i>'+esc(x)+'</i>'}).join('');
  for(var b=0;b<start;b++)h+='<span></span>';
  for(var n=1;n<=days;n++)h+=(n===dt.getDate()?'<span class="on"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.4-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.6-8 11-8 11z" fill="none" stroke="currentColor" stroke-width="1.1"/></svg><b>'+n+'</b></span>':'<span>'+n+'</span>');
  return h+'</div></div>'}
var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
function player(v,i){var bars='';seed=11+i*5;for(var k=0;k<30;k++)bars+='<i style="height:'+(18+Math.round(rnd()*70))+'%"></i>';
  return '<div class="vp" data-src="'+esc(v.url||'')+'"><button type="button" class="vp-b" aria-label="Play"><span></span></button><div class="vp-m"><b>'+esc(v.label||'')+'</b><div class="vp-w">'+bars+'</div><em class="vp-t">0:00</em></div></div>'}
function sections(d,t,ar){
  var dt=when(d),pn=parts(d.names),S=[];
  var nm=pn.length>1?'<span>'+esc(pn[0])+'</span><em>&amp;</em><span>'+esc(pn.slice(1).join(' & '))+'</span>':'<span>'+esc(d.names)+'</span>';
  S.push({c:'cover',h:'<div class="frame"></div>'+wreath(ini(d.names))+'<p class="sc-j">'+esc(d.hosts||t.join)+'</p><h1 class="sc-n">'+nm+'</h1>'+(dt?'<p class="sc-d">'+esc(dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}))+'</p>':'')+'<div class="cue"><span>'+t.scroll+'</span><i></i></div>'});
  var box=function(k,l,a,b){return '<div class="bx"><div class="bx-i">'+ico(k)+'</div><span>'+l+'</span><b>'+esc(a)+'</b>'+(b?'<em>'+esc(b)+'</em>':'')+'</div>'};
  var dh='<h2 class="sc-h">'+t.det+'</h2><div class="orn"></div>';
  if(dt)dh+='<div class="cd" id="cd"></div>';
  dh+='<div class="bxs">';
  if(dt)dh+=box('cal',t.when,dt.toLocaleDateString(t.loc,{weekday:'long',day:'numeric',month:'long'}),d.time?dt.toLocaleTimeString(t.loc,{hour:'numeric',minute:'2-digit'}):'');
  if(d.venue)dh+=box('pin',t.where,d.venue,d.address);
  if(d.dress)dh+=box('dress',t.dress,d.dress);
  dh+='</div><div class="btns">'+(http(d.map)?'<a class="bt" href="'+esc(http(d.map))+'" target="_blank" rel="noopener">'+t.maps+'</a>':'')+(dt?'<button type="button" class="bt ghost" id="ics">'+t.cal+'</button>':'')+'</div>';
  S.push({c:'det',h:dh});
  if(dt)S.push({c:'calx',h:'<h2 class="sc-h">'+t.std+'</h2><div class="orn"></div>'+calendar(dt,t,ar)});
  var vs=(d.voices||[]).filter(function(x){return x&&(PREVIEW||slug==="demo"||okAudio(x.url))});
  if(vs.length)S.push({c:'voice',h:'<div class="mic">'+ico('mic')+'</div><h2 class="sc-h">'+t.vh+'</h2><p class="sc-s">'+t.vs+'</p><div class="vps">'+vs.map(player).join('')+'</div>'});
  var pr=(d.program||[]).filter(function(x){return x&&(x.l||x.t)}).slice(0,8);
  if(pr.length)S.push({c:'prog',h:'<h2 class="sc-h">'+t.prog+'</h2><div class="orn"></div><ol class="tl">'+pr.map(function(x){return '<li><span class="dot">'+ico(pick(x.l||''))+'</span><div><time>'+esc(x.t||'')+'</time><b>'+esc(x.l||'')+'</b></div></li>'}).join('')+'</ol>'});
  if(d.msg)S.push({c:'msg',h:'<div class="orn"></div><p class="sc-m">'+esc(d.msg).replace(/\n/g,'<br>')+'</p><div class="orn"></div>'});
  if(d.rsvp)S.push({c:'rsvp',h:'<h2 class="sc-h">'+t.rsvp+'</h2><div class="orn"></div><p class="sc-s">'+t.rsub+'</p><div class="btns col"><a class="bt" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.yesm(d.names))+'" target="_blank" rel="noopener">'+t.yes+'</a><a class="bt ghost" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.nom(d.names))+'" target="_blank" rel="noopener">'+t.no+'</a><a class="bt ghost" href="tel:+'+wa(d.rsvp).replace('https://wa.me/','')+'">'+t.call+'</a></div>'});
  S.push({c:'bless',h:'<div class="mic">'+ico('mic')+'</div><h2 class="sc-h">'+t.bh+'</h2><p class="sc-s">'+t.bs+'</p><div class="bl"><input id="bn" maxlength="60" placeholder="'+t.bn+'"><div id="bz"></div><button type="button" class="bt" id="bsend" disabled>'+t.bsend+'</button><p class="bmsg" id="bmsg" hidden></p></div>'});
  S.push({c:'end',h:'<div class="fcard">'+wreath(ini(d.names),1)+'<p class="fc-j">'+esc(d.names)+'</p><p class="fc-t">'+t.fin+'</p>'+(dt?'<p class="fc-d">'+esc(dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}))+'</p>':'')+'</div><a class="mk" href="https://www.johnemadweddings.com/shop/invitation/" target="_blank" rel="noopener">'+t.made+'</a>'});
  return S}
function fade(on){if(!audio)return;audio.volume=on?.15:.7}
function wirePlayers(){
  [].forEach.call(root.querySelectorAll('.vp'),function(p){
    var src=p.getAttribute('data-src'),a=null,btn=p.querySelector('.vp-b'),tm=p.querySelector('.vp-t'),bars=[].slice.call(p.querySelectorAll('.vp-w i'));
    btn.onclick=function(e){e.stopPropagation();if(!src)return;
      if(!a){a=new Audio(src);a.preload='metadata';vols.push(a);
        a.ontimeupdate=function(){var f=a.duration?a.currentTime/a.duration:0;bars.forEach(function(b,i){b.classList.toggle('on',i/bars.length<f)});tm.textContent=JERec.fmt(a.currentTime)};
        a.onended=function(){p.classList.remove('play');fade(false);bars.forEach(function(b){b.classList.remove('on')});tm.textContent='0:00'};
        a.onloadedmetadata=function(){tm.textContent=JERec.fmt(a.duration)}}
      if(a.paused){vols.forEach(function(x){if(x!==a){x.pause()}});[].forEach.call(root.querySelectorAll('.vp.play'),function(q){if(q!==p)q.classList.remove('play')});a.play().catch(function(){});p.classList.add('play');fade(true)}
      else{a.pause();p.classList.remove('play');fade(false)}}});
}
function wireBless(d,t){
  var host=document.getElementById('bz');if(!host)return;
  var nm=document.getElementById('bn'),sb=document.getElementById('bsend'),ms=document.getElementById('bmsg'),got=null;
  var rc=JERec.create({max:60,t:t.rt},function(b,m){got=b?{blob:b,m:m}:null;sb.disabled=!got});host.appendChild(rc);
  sb.onclick=function(){
    if(!got||!nm.value.trim()){ms.textContent=t.bneed;ms.hidden=false;return}
    sb.disabled=true;sb.textContent=t.bsending;ms.hidden=true;
    var fin=function(ok){sb.textContent=t.bsend;if(ok){ms.textContent=t.bok;ms.hidden=false;ms.className='bmsg ok';rc.reset();nm.value='';sb.disabled=true}else{ms.textContent=t.berr;ms.hidden=false;ms.className='bmsg';sb.disabled=false}};
    if(PREVIEW||slug==='demo'){setTimeout(function(){fin(true)},700);return}
    var id=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random().toString(36).slice(2)),path='voice/'+slug+'/'+id+'.'+got.m.ext;
    fetch(SU+'/storage/v1/object/voices/'+path,{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':(got.m.mime||'audio/mp4').split(';')[0]},body:got.blob})
     .then(function(r){if(!r.ok)throw new Error('up');return fetch(SU+'/rest/v1/rpc/add_guest_voice',{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':'application/json'},body:JSON.stringify({p_slug:slug,p_name:nm.value.trim(),p_url:SU+'/storage/v1/object/public/voices/'+path,p_seconds:Math.round(got.m.seconds||0)})})})
     .then(function(r){if(!r.ok)throw new Error('db');fin(true)}).catch(function(){fin(false)});
  };
}
function render(d){
  var my=++gen;
  var t=L[d.lang==='ar'?'ar':'en'],ar=d.lang==='ar';
  document.body.classList.remove('th-sage','th-ivory');if(d.theme==='sage'||d.theme==='ivory')document.body.classList.add('th-'+d.theme);
  document.documentElement.lang=ar?'ar':'en';root.dir=ar?'rtl':'ltr';root.classList.toggle('ar',ar);
  if(!d.names){root.innerHTML='<div class="inv-nf"><h1>'+t.nf+'</h1><p>'+t.nf2+'</p></div>';return}
  document.title=d.names;
  var ph=(d.photos&&d.photos.length?d.photos:(d.photo?[d.photo]:[])).filter(okPhoto),dt=when(d);
  var S=sections(d,t,ar),h='<div class="prog"><b></b></div>';
  S.forEach(function(x,i){var bgp=ph.length?'<div class="bg" style="background-image:url(\''+esc(ph[i%ph.length])+'\');background-position:'+(['50% 30%','50% 50%','50% 65%'][i%3])+'"></div>':'<div class="bg nobg"></div>';
    h+='<section class="sec s-'+x.c+(ph.length?' hasph':'')+'">'+bgp+'<div class="ov"></div><div class="in">'+x.h+'</div></section>'});
  root.innerHTML=h;
  var secs=[].slice.call(root.querySelectorAll('.sec'));
  secs.forEach(function(s){[].forEach.call(s.querySelectorAll('.in>*'),function(e,i){e.classList.add('rv');e.style.transitionDelay=(i*0.09)+'s'})});
  var els=[].slice.call(root.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('vis');io.unobserve(x.target)}})},{threshold:.15});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('vis')});
  var bgs=[].slice.call(root.querySelectorAll('.bg')),pb=root.querySelector('.prog b'),tick=false;
  function par(){tick=false;var vh=window.innerHeight;secs.forEach(function(s,i){var r=s.getBoundingClientRect();if(r.bottom<-50||r.top>vh+50)return;var o=(r.top+r.height/2-vh/2)*-.12;bgs[i].style.transform='translate3d(0,'+o.toFixed(1)+'px,0) scale(1.18)'});
    var sc=window.scrollY||document.documentElement.scrollTop,mx=document.documentElement.scrollHeight-vh;pb.style.width=(mx>0?Math.min(100,sc/mx*100):0)+'%'}
  var onS=function(){if(!tick){tick=true;requestAnimationFrame(par)}};
  if(window.__ivs)window.removeEventListener('scroll',window.__ivs);window.__ivs=onS;window.addEventListener('scroll',onS,{passive:true});window.addEventListener('resize',onS);par();
  if(dt){var cd=document.getElementById('cd');
    (function tk(){if(my!==gen)return;var ms=dt-new Date();if(ms<=0){cd.innerHTML='<p class="iv-today">'+t.today+'</p>';return}
      var s=Math.floor(ms/1000),dd=Math.floor(s/86400),hh=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60),ss=s%60;
      cd.innerHTML=[[dd,t.days],[hh,t.hrs],[mm,t.min],[ss,t.sec]].map(function(x){return '<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('');setTimeout(tk,1000)})();
    var b=document.getElementById('ics');
    if(b)b.onclick=function(){
      var p=function(n){return String(n).padStart(2,'0')},f=function(x){return x.getFullYear()+p(x.getMonth()+1)+p(x.getDate())+'T'+p(x.getHours())+p(x.getMinutes())+'00'},e=new Date(dt.getTime()+4*3600*1000);
      var s=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//John Emad Weddings//EN','BEGIN:VEVENT','UID:'+Date.now()+'@johnemadweddings.com','DTSTAMP:'+f(new Date()),'DTSTART:'+f(dt),'DTEND:'+f(e),'SUMMARY:'+String(d.names).replace(/[,;\n]/g,' '),'LOCATION:'+[d.venue,d.address].filter(Boolean).join(' - ').replace(/[,;\n]/g,' '),'END:VEVENT','END:VCALENDAR'].join('\r\n');
      var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'text/calendar'}));a.download='invitation.ics';document.body.appendChild(a);a.click();a.remove()};
  }
  wirePlayers();wireBless(d,t);
  if(!PREVIEW&&!d._done){root.classList.add('locked');envelope(d,t,function(){root.classList.remove('locked');if(d.music&&okAudio(d.music)){try{audio=new Audio(d.music);audio.loop=true;audio.volume=.7;audio.play().catch(function(){})}catch(x){}}})}
}
function envelope(d,t,cb){
  var ev=document.createElement('div');ev.className='iv-env';
  ev.innerHTML='<div class="iv-envw" role="button" tabindex="0" aria-label="Open"><div class="iv-envb"></div><div class="iv-card"><span>'+esc(d.names)+'</span></div><div class="iv-front"></div><div class="iv-flap"></div><div class="iv-seal">'+esc(ini(d.names))+'</div></div><div class="iv-tap">'+t.tap+'</div>';
  document.body.appendChild(ev);document.documentElement.classList.add('lk');
  var done=false;function open(){if(done)return;done=true;ev.classList.add('open');setTimeout(function(){ev.classList.add('gone');document.documentElement.classList.remove('lk');cb();setTimeout(function(){ev.remove()},1400)},1900)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(QS.get('open')==='1')open();
}
if(PREVIEW){
  var fill=function(x){x=x||{};var o={};Object.keys(DEMO).forEach(function(k){o[k]=DEMO[k]});Object.keys(x).forEach(function(k){if(x[k]!==''&&x[k]!=null&&!(Array.isArray(x[k])&&!x[k].length))o[k]=x[k]});o.music='';return o};
  window.addEventListener('message',function(e){if(e.data&&e.data.je==='inv'){var y=window.scrollY;render(fill(e.data.d));window.scrollTo(0,y)}});
  render(fill({}));try{parent.postMessage({je:'inv-ready'},'*')}catch(x){}
}else load().then(function(d){render(d||{})});
})();
