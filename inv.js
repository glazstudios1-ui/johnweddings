(function(){
var SU='https://vzunjnrosrmvtlipqpsa.supabase.co',SK='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',root=document.getElementById('inv');
var QS=new URLSearchParams(location.search),slug=QS.get('s')||'',PREVIEW=QS.get('preview')==='1',gen=0,lastPv='',audio=null,cur=null,vols=[],duck=0;
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
var TH=['ivory','wine','noir','sage','kraft','curtain','gate','mono','stars','bloom','persian','lace','oval'];
function corner(){return '<svg viewBox="0 0 40 40" class="cn"><path d="M1 39V14A13 13 0 0 1 14 1h25" fill="none" stroke="currentColor" stroke-width=".8"/><path d="M6 39V17A11 11 0 0 1 17 6h22" fill="none" stroke="currentColor" stroke-width=".5" opacity=".6"/><path d="M7 7l3 3-3 3-3-3z" fill="currentColor"/><circle cx="20" cy="3.2" r=".9" fill="currentColor"/><circle cx="3.2" cy="20" r=".9" fill="currentColor"/></svg>'}
function frame(){return '<div class="frm"><i class="c1">'+corner()+'</i><i class="c2">'+corner()+'</i><i class="c3">'+corner()+'</i><i class="c4">'+corner()+'</i></div>'}
function divider(){return '<svg class="dv" viewBox="0 0 220 22" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round"><path d="M2 11h84M134 11h84" opacity=".7"/><path d="M92 11c5-8 10-8 18 0 8 8 13 8 18 0" opacity=".9"/><path d="M92 11c5 8 10 8 18 0" opacity=".5"/></g><path d="M110 4l4 7-4 7-4-7z" fill="currentColor"/><circle cx="86" cy="11" r="1.6" fill="currentColor"/><circle cx="134" cy="11" r="1.6" fill="currentColor"/></svg>'}
function sprig(){var s='<svg viewBox="0 0 70 170" class="sp" aria-hidden="true"><path d="M35 168C34 120 38 70 50 6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>';
  for(var i=0;i<8;i++){var y=150-i*17,x=35+(i*1.7),r=-26-i*1.2,sc=1-i*.06;s+='<ellipse cx="'+(x-9).toFixed(1)+'" cy="'+y+'" rx="'+(11*sc).toFixed(1)+'" ry="3.6" transform="rotate('+(r-18)+' '+(x-9).toFixed(1)+' '+y+')" fill="currentColor" opacity=".9"/><ellipse cx="'+(x+9).toFixed(1)+'" cy="'+(y-8)+'" rx="'+(11*sc).toFixed(1)+'" ry="3.6" transform="rotate('+(r+60)+' '+(x+9).toFixed(1)+' '+(y-8)+')" fill="currentColor" opacity=".9"/>'}
  return s+'<ellipse cx="50" cy="5" rx="9" ry="3.4" transform="rotate(-70 50 5)" fill="currentColor"/></svg>'}
function parts_html(n,cls){return n}
function particles(th){var n=th==='ivory'||th==='sage'?11:16,s='<div class="pts pt-'+th+'" aria-hidden="true">';seed=3;for(var i=0;i<n;i++){s+='<i style="left:'+Math.round(rnd()*100)+'%;animation-duration:'+(9+Math.round(rnd()*9))+'s;animation-delay:-'+Math.round(rnd()*14)+'s;--sz:'+(5+Math.round(rnd()*9))+'px;--dx:'+(Math.round(rnd()*80)-40)+'px;--rt:'+(Math.round(rnd()*360))+'deg"></i>'}return s+'</div>'}
function sections(d,t,ar,ph,th){
  var dt=when(d),pn=parts(d.names),S=[];
  var nm=pn.length>1?'<span>'+esc(pn[0])+'</span><em>&amp;</em><span>'+esc(pn.slice(1).join(' & '))+'</span>':'<span>'+esc(d.names)+'</span>';
  var dateL=dt?esc(dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'})):'';
  var arch=ph.length?'<div class="arch"><div class="arch-i" style="background-image:url(\''+esc(ph[0])+'\')"></div></div>':wreath(ini(d.names));
  S.push({c:'cover',h:frame()+(th==='sage'||th==='ivory'?'<div class="spr l">'+sprig()+'</div><div class="spr r">'+sprig()+'</div>':'')+particles(th)+'<p class="sc-j">'+esc(d.hosts||t.join)+'</p>'+arch+'<h1 class="sc-n">'+nm+'</h1>'+(dt?'<p class="sc-d"><i></i>'+dateL+'<i></i></p>':'')+'<div class="cue"><span>'+t.scroll+'</span><i></i></div>'});
  var box=function(k,l,a,b){return '<div class="bx"><div class="bx-i">'+ico(k)+'</div><span>'+l+'</span><b>'+esc(a)+'</b>'+(b?'<em>'+esc(b)+'</em>':'')+'</div>'};
  if(dt)S.push({c:'std',h:'<h2 class="sc-h">'+t.std+'</h2>'+divider()+'<div class="cd" id="cd"></div>'+calendar(dt,t,ar)});
  var dh='<h2 class="sc-h">'+t.det+'</h2>'+divider()+'<div class="bxs">';
  if(dt)dh+=box('cal',t.when,dt.toLocaleDateString(t.loc,{weekday:'long',day:'numeric',month:'long'}),d.time?dt.toLocaleTimeString(t.loc,{hour:'numeric',minute:'2-digit'}):'');
  if(d.venue)dh+=box('pin',t.where,d.venue,d.address);
  if(d.dress)dh+=box('dress',t.dress,d.dress);
  dh+='</div><div class="btns">'+(http(d.map)?'<a class="bt" href="'+esc(http(d.map))+'" target="_blank" rel="noopener">'+t.maps+'</a>':'')+(dt?'<button type="button" class="bt ghost" id="ics">'+t.cal+'</button>':'')+'</div>';
  S.push({c:'det',h:dh});
  var vs=(d.voices||[]).filter(function(x){return x&&(PREVIEW||slug==='demo'||okAudio(x.url))});
  if(vs.length)S.push({c:'voice',h:'<div class="mic">'+ico('mic')+'</div><h2 class="sc-h">'+t.vh+'</h2><p class="sc-s">'+t.vs+'</p><div class="vps">'+vs.map(player).join('')+'</div>'});
  var pr=(d.program||[]).filter(function(x){return x&&(x.l||x.t)}).slice(0,8);
  if(pr.length)S.push({c:'prog',h:'<h2 class="sc-h">'+t.prog+'</h2>'+divider()+'<ol class="tl">'+pr.map(function(x){return '<li><span class="dot">'+ico(pick(x.l||''))+'</span><div><time>'+esc(x.t||'')+'</time><b>'+esc(x.l||'')+'</b></div></li>'}).join('')+'</ol>'});
  if(ph.length>1){var g=ph.slice(1,6).map(function(u,i){return '<figure class="gp g'+(i%3)+(i%2?' rr':'')+'" data-sp="'+(i%2?-1:1)+'"><div style="background-image:url(\''+esc(u)+'\')"></div></figure>'}).join('');S.push({c:'gal',h:'<div class="gal">'+g+'</div>'})}
  if(d.msg)S.push({c:'msg',h:divider()+'<p class="sc-m">'+esc(d.msg).replace(/\n/g,'<br>')+'</p>'+divider()});
  if(d.rsvp)S.push({c:'rsvp',h:'<h2 class="sc-h">'+t.rsvp+'</h2>'+divider()+'<p class="sc-s">'+t.rsub+'</p><div class="btns col"><a class="bt" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.yesm(d.names))+'" target="_blank" rel="noopener">'+t.yes+'</a><a class="bt ghost" href="'+wa(d.rsvp)+'?text='+encodeURIComponent(t.nom(d.names))+'" target="_blank" rel="noopener">'+t.no+'</a><a class="bt ghost" href="tel:+'+wa(d.rsvp).replace('https://wa.me/','')+'">'+t.call+'</a></div>'});
  S.push({c:'bless',h:'<div class="mic">'+ico('mic')+'</div><h2 class="sc-h">'+t.bh+'</h2><p class="sc-s">'+t.bs+'</p><div class="bl"><input id="bn" maxlength="60" placeholder="'+t.bn+'"><div id="bz"></div><button type="button" class="bt" id="bsend" disabled>'+t.bsend+'</button><p class="bmsg" id="bmsg" hidden></p></div>'});
  S.push({c:'end',h:frame()+particles(th)+'<div class="fcard">'+wreath(ini(d.names),1)+'<p class="fc-j">'+esc(d.names)+'</p>'+divider()+'<p class="fc-t">'+t.fin+'</p>'+(dt?'<p class="fc-d">'+dateL+'</p>':'')+'</div><a class="mk" href="https://www.johnemadweddings.com/shop/invitation/" target="_blank" rel="noopener">'+t.made+'</a>'});
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
  var my=++gen;d.lang='en';
  var t=L[d.lang==='ar'?'ar':'en'],ar=d.lang==='ar',th=TH.indexOf(d.theme)>-1?d.theme:(d.theme==='gold'?'ivory':'ivory');
  TH.concat(['gold','navy']).forEach(function(x){document.body.classList.remove('th-'+x)});document.body.classList.add('th-'+(PAL[th]||th));
  document.documentElement.lang=ar?'ar':'en';root.dir=ar?'rtl':'ltr';root.classList.toggle('ar',ar);
  if(!d.names){root.innerHTML='<div class="inv-nf"><h1>'+t.nf+'</h1><p>'+t.nf2+'</p></div>';return}
  document.title=d.names;
  var ph=(d.photos&&d.photos.length?d.photos:(d.photo?[d.photo]:[])).filter(okPhoto),dt=when(d);
  var S=sections(d,t,ar,ph,PAL[th]||th),h='<div class="prog"><b></b></div><div class="tex"></div>';
  S.forEach(function(x,i){h+='<section class="sec s-'+x.c+'"><div class="in">'+x.h+'</div></section>'});
  root.innerHTML=h;
  var secs=[].slice.call(root.querySelectorAll('.sec'));
  secs.forEach(function(s){[].forEach.call(s.querySelectorAll('.in>*:not(.frm):not(.pts):not(.spr)'),function(e,i){e.classList.add('rv');e.style.transitionDelay=(i*0.11)+'s'})});
  var els=[].slice.call(root.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('vis');io.unobserve(x.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('vis')});
  var pb=root.querySelector('.prog b'),tick=false,archI=root.querySelector('.arch-i'),gps=[].slice.call(root.querySelectorAll('.gp>div'));
  function par(){tick=false;var vh=window.innerHeight,sc=window.scrollY||document.documentElement.scrollTop,mx=document.documentElement.scrollHeight-vh;pb.style.width=(mx>0?Math.min(100,sc/mx*100):0)+'%';
    if(archI&&sc<vh*1.2)archI.style.transform='translate3d(0,'+(sc*.12).toFixed(1)+'px,0) scale(1.12)';
    gps.forEach(function(g){var r=g.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;var o=(r.top+r.height/2-vh/2)*-.1;g.style.transform='translate3d(0,'+o.toFixed(1)+'px,0) scale(1.2)'})}
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
  if(PREVIEW&&th!==lastPv){lastPv=th;var oe=document.querySelector('.iv-env');if(oe)oe.remove();document.documentElement.classList.remove('lk');envelope(d,t,th,function(){});var ne=document.querySelector('.iv-env');setTimeout(function(){if(ne)ne.dispatchEvent(new Event('click'))},1100)}
  if(!PREVIEW&&!d._done){root.classList.add('locked');envelope(d,t,th,function(){root.classList.remove('locked');if(d.music&&okAudio(d.music)){try{audio=new Audio(d.music);audio.loop=true;audio.volume=.7;audio.play().catch(function(){})}catch(x){}}})}
}
function lacePts(x0,y0,x1,y1,off,step,r,flip){var dx=x1-x0,dy=y1-y0,L=Math.sqrt(dx*dx+dy*dy),ux=dx/L,uy=dy/L,nx=-uy*(flip?-1:1),ny=ux*(flip?-1:1),n=Math.floor(L/step),s='';
  for(var i=1;i<n;i++){var px=x0+ux*i*step+nx*off,py=y0+uy*i*step+ny*off;s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="'+r+'" fill="none" stroke="var(--lace)" stroke-width="1.1"/><circle cx="'+(px+nx*(r+2.2)).toFixed(1)+'" cy="'+(py+ny*(r+2.2)).toFixed(1)+'" r="1.15" fill="var(--lace)"/>'}
  return s+'<line x1="'+(x0+nx*(off+r+5)).toFixed(1)+'" y1="'+(y0+ny*(off+r+5)).toFixed(1)+'" x2="'+(x1+nx*(off+r+5)).toFixed(1)+'" y2="'+(y1+ny*(off+r+5)).toFixed(1)+'" stroke="var(--lace)" stroke-width=".7" opacity=".7"/>'}
function sealSvg(txt,col){var id='w'+Math.floor(Math.random()*1e6);
  return '<svg viewBox="0 0 420 420"><defs><filter id="'+id+'" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="30" xChannelSelector="R" yChannelSelector="G" result="d"/><feColorMatrix in="d" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" result="h"/><feGaussianBlur in="h" stdDeviation="2.4" result="hb"/><feComponentTransfer in="h" result="m"><feFuncA type="linear" slope="60" intercept="0"/></feComponentTransfer><feSpecularLighting in="hb" surfaceScale="9" specularConstant="1.3" specularExponent="26" lighting-color="#fff" result="sp"><feDistantLight azimuth="225" elevation="50"/></feSpecularLighting><feDiffuseLighting in="hb" surfaceScale="9" diffuseConstant="1" lighting-color="#fff" result="df"><feDistantLight azimuth="225" elevation="50"/></feDiffuseLighting><feFlood flood-color="'+col+'" result="col"/><feComposite in="col" in2="df" operator="arithmetic" k1="1.25" k2="0" k3="0" k4="0" result="lit"/><feComposite in="sp" in2="lit" operator="arithmetic" k1="0" k2=".6" k3="1" k4="0" result="lit2"/><feComposite in="lit2" in2="m" operator="in" result="out"/><feDropShadow dx="6" dy="12" stdDeviation="9" flood-color="#000" flood-opacity=".5"/></filter></defs><g filter="url(#'+id+')"><rect width="420" height="420" fill="#000"/><circle cx="210" cy="210" r="150" fill="#fff"/><circle cx="210" cy="210" r="112" fill="#8a8a8a"/><circle cx="210" cy="210" r="118" fill="none" stroke="#fff" stroke-width="8"/><circle cx="210" cy="210" r="103" fill="none" stroke="#d0d0d0" stroke-width="2.5"/><text x="210" y="'+(txt.length>1?246:250)+'" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-weight="700" font-size="'+(txt.length>1?104:120)+'" fill="#fff" letter-spacing="2">'+esc(txt)+'</text></g></svg>'}
function envelopePhoto(d,t,cb){
  var IMG='/img/inv/noir-scene.jpg',poly='polygon(17.13% 9.58%,82.93% 9.58%,81.27% 14.58%,77.93% 22.50%,76.27% 26.25%,73.93% 29.17%,69.93% 30.50%,29.27% 30.50%,26.93% 29.38%,25.60% 28.33%,21.27% 20.83%,18.60% 14.17%)';
  var ev=document.createElement('div');ev.className='iv-env ph';
  ev.innerHTML='<div class="sc3" role="button" tabindex="0" aria-label="Open"><div class="sc-bg" style="background-image:url('+IMG+')"></div><div class="sc-hole" style="clip-path:'+poly+'"></div><div class="sc-flap" style="clip-path:'+poly+'"><div class="ff" style="background-image:url('+IMG+')"></div><div class="fb"></div></div><i class="sc-ring"></i></div><div class="inv-card"><i></i><p>'+(d.lang==='ar'?'دعوة زفاف':'You are invited')+'</p><b>'+esc(d.names)+'</b>'+(when(d)?'<span>'+esc(when(d).toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}))+'</span>':'')+'</div><div class="iv-tap">'+t.tap+'</div>';
  document.body.appendChild(ev);document.documentElement.classList.add('lk');
  var done=false;function open(){if(done)return;done=true;ev.classList.add('o1');setTimeout(function(){ev.classList.add('o2')},500);setTimeout(function(){ev.classList.add('o3')},1500);setTimeout(function(){ev.classList.add('o4');document.documentElement.classList.remove('lk');cb()},3100);setTimeout(function(){ev.classList.add('gone')},3500);setTimeout(function(){ev.remove()},5000)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(QS.get('open')==='1')open();
}
function envelopeKraft(d,t,cb){
  var ev=document.createElement('div');ev.className='iv-env ph kr';
  var S='/img/inv/kraft-scene.jpg';
  ev.innerHTML='<div class="sc3 k3" role="button" tabindex="0" aria-label="Open"><div class="sc-bg" style="background-image:url('+S+')"></div><div class="k-patch"></div><div class="k-card"><i></i><p>'+(d.lang==='ar'?'دعوة زفاف':'You are invited')+'</p><b>'+esc(d.names)+'</b>'+(when(d)?'<span>'+esc(when(d).toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}))+'</span>':'')+'</div><div class="k-pouch" style="background-image:url('+S+')"></div><i class="k-ring"></i></div><div class="iv-tap">'+t.tap+'</div>';
  document.body.appendChild(ev);document.documentElement.classList.add('lk');
  var done=false;function open(){if(done)return;done=true;ev.classList.add('o1');setTimeout(function(){ev.classList.add('o2')},500);setTimeout(function(){ev.classList.add('o3')},1700);setTimeout(function(){ev.classList.add('o4');document.documentElement.classList.remove('lk');cb()},3000);setTimeout(function(){ev.classList.add('gone')},3400);setTimeout(function(){ev.remove()},4900)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(QS.get('open')==='1')open();
}
function envelopeWine(d,t,cb){
  var S='/img/inv/wine-scene.jpg',poly='polygon(0 0,100% 0,100% 26%,67.9% 44.4%,51.1% 54.3%,34% 44.4%,0 23.3%)';
  var dt=when(d),ds=dt?dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}):'';
  var ev=document.createElement('div');ev.className='iv-env ph wn';
  ev.innerHTML='<div class="sc3 w3" role="button" tabindex="0" aria-label="Open"><div class="sc-bg" style="background-image:url('+S+')"></div><div class="w-dark" style="clip-path:'+poly+'"></div><div class="w-in"><div class="w-card"><div class="wc-in"><p>You are invited</p><b>'+esc(d.names)+'</b><i></i>'+(ds?'<span>'+esc(ds)+'</span>':'')+'</div></div></div><div class="sc-flap" style="clip-path:'+poly+'"><div class="ff" style="background-image:url('+S+')"></div><div class="fb"></div></div><i class="w-ring"></i></div><div class="iv-tap">'+t.tap+'</div>';
  document.body.appendChild(ev);document.documentElement.classList.add('lk');
  var done=false;function open(){if(done)return;done=true;ev.classList.add('o1');setTimeout(function(){ev.classList.add('o2')},450);setTimeout(function(){ev.classList.add('o3')},1700);setTimeout(function(){ev.classList.add('o4');document.documentElement.classList.remove('lk');cb()},3300);setTimeout(function(){ev.classList.add('gone')},3700);setTimeout(function(){ev.remove()},5200)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(QS.get('open')==='1')open();
}

var PAL={persian:'wine',lace:'wine',oval:'wine',curtain:'wine',gate:'ivory',mono:'noir',stars:'navy',bloom:'sage'};
function mk(cls,html,t,cb,T){
  var ev=document.createElement('div');ev.className='iv-env cs '+cls;ev.setAttribute('role','button');ev.tabIndex=0;ev.innerHTML=html+'<div class="iv-tap">'+t.tap+'</div>';
  document.body.appendChild(ev);document.documentElement.classList.add('lk');
  var done=false;function open(){if(done)return;done=true;ev.classList.add('o1');setTimeout(function(){ev.classList.add('o2')},T[0]);setTimeout(function(){ev.classList.add('o3')},T[1]);setTimeout(function(){ev.classList.add('o4');document.documentElement.classList.remove('lk');cb()},T[2]);setTimeout(function(){ev.classList.add('gone')},T[2]+400);setTimeout(function(){ev.remove()},T[2]+1900)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(QS.get('open')==='1')open();
}
function txt(d,t){var dt=when(d),ds=dt?dt.toLocaleDateString(t.loc,{day:'numeric',month:'long',year:'numeric'}):'';return '<p>You are invited</p><b>'+esc(d.names)+'</b><i></i>'+(ds?'<span>'+esc(ds)+'</span>':'')}
function introCurtain(d,t,cb){mk('cu','<div class="cu-stage"><div class="cu-spot"></div><div class="cu-txt">'+txt(d,t)+'</div></div><div class="cu-c cu-l"></div><div class="cu-c cu-r"></div><div class="cu-val"></div><div class="cu-rod"></div><div class="cu-seam"><u></u><span>'+esc(ini(d.names))+'</span></div>',t,cb,[300,2400,3600])}
function introGate(d,t,cb){var ph=(d.photos||[]).filter(okPhoto)[0]||'';mk('ga','<div class="ga-wrap"><div class="ga-in" style="'+(ph?'background-image:url('+ph+')':'')+'"><div class="ga-sh"></div><div class="cu-txt ga-txt">'+txt(d,t)+'</div></div><div class="ga-d ga-l"><i></i></div><div class="ga-d ga-r"><i></i></div><div class="ga-gl"></div></div>',t,cb,[300,2300,3600])}
function introMono(d,t,cb){var I=esc(ini(d.names));mk('mo','<div class="mo-box"><svg viewBox="0 0 300 300" class="mo-svg"><circle class="mo-c1" cx="150" cy="150" r="118"/><circle class="mo-c2" cx="150" cy="150" r="108"/><text class="mo-t" x="150" y="178" text-anchor="middle">'+I+'</text></svg><div class="mo-tx">'+txt(d,t)+'</div></div><i class="mo-dot"></i>',t,cb,[1400,3400,5000])}
function introStars(d,t,cb){var s='',i;seed=11;for(i=0;i<110;i++){s+='<i style="left:'+(rnd()*100).toFixed(1)+'%;top:'+(rnd()*100).toFixed(1)+'%;--z:'+(1+rnd()*2.2).toFixed(1)+'px;animation-delay:-'+(rnd()*6).toFixed(1)+'s;animation-duration:'+(2.5+rnd()*4).toFixed(1)+'s"></i>'}
  mk('st','<div class="st-sky">'+s+'</div><i class="st-moon"></i><i class="st-shoot"></i><div class="st-glow"></div><div class="cu-txt st-txt">'+txt(d,t)+'</div>',t,cb,[500,2500,4300])}
function introBloom(d,t,cb){var p='',i,a;for(i=0;i<8;i++){a=i*45;p+='<g class="bl-p bl-o" style="--r:'+a+'deg"><path d="M0 0C-34-26-40-98 0-142 40-98 34-26 0 0Z"/></g>'}
  for(i=0;i<8;i++){a=i*45+22.5;p+='<g class="bl-p bl-i" style="--r:'+a+'deg"><path d="M0 0C-28-20-32-76 0-112 32-76 28-20 0 0Z"/></g>'}
  var lv='';for(i=0;i<6;i++){lv+='<g class="bl-lf" style="--r:'+(i*60+30)+'deg"><path d="M0 0C-22-24-22-78 0-118 22-78 22-24 0 0Z"/></g>'}
  mk('bl','<div class="bl-box"><svg viewBox="-160 -160 320 320" class="bl-svg"><defs><linearGradient id="blg" x1="0" y1="0" x2="0" y2="-1"><stop offset="0" stop-color="#f6e3dc"/><stop offset="1" stop-color="#fdf6f1"/></linearGradient></defs>'+lv+p+'<circle class="bl-c" r="62"/></svg><div class="cu-txt bl-txt">'+txt(d,t)+'</div></div>',t,cb,[500,2400,4000])}

function introPersian(d,t,cb){var I='/img/inv/';mk('pr','<div class="pr-bg"></div><div class="pr-vig"></div><img class="pr-fl pr-f2" src="'+I+'flower-red.webp" alt=""><div class="pr-env"><img class="pr-eb" src="'+I+'env-open.webp" alt=""><div class="pr-cw"><div class="pr-card"><div class="cu-txt">'+txt(d,t)+'</div></div></div><img class="pr-fr" src="'+I+'env-open.webp" alt=""></div><img class="pr-fl pr-f1" src="'+I+'peony.webp" alt="">',t,cb,[1900,2700,4300])}
function introLace(d,t,cb){var I='/img/inv/';mk('la','<div class="la-back"><div class="cu-txt la-txt">'+txt(d,t)+'</div></div><div class="la-wrap"><div class="la-d la-l"></div><div class="la-d la-r"></div></div><div class="la-seal">'+sealSvg(ini(d.names),'#7a1020')+'<u></u></div>',t,cb,[300,2300,3700])}
function introOval(d,t,cb){var I='/img/inv/';mk('ov','<div class="ov-bg"></div><div class="ov-wrap"><img class="ov-frame" src="'+I+'oval.webp" alt=""><div class="cu-txt ov-txt">'+txt(d,t)+'</div></div><img class="ov-fl ov-a" src="'+I+'peony.webp" alt=""><img class="ov-fl ov-b" src="'+I+'flower-red.webp" alt=""><img class="ov-fl ov-c" src="'+I+'pearl.webp" alt=""><img class="ov-fl ov-d" src="'+I+'lily.webp" alt="">',t,cb,[400,1900,3500])}
function envelope(d,t,th,cb){
  if(th==='persian')return introPersian(d,t,cb);if(th==='lace')return introLace(d,t,cb);if(th==='oval')return introOval(d,t,cb);
  if(th==='curtain')return introCurtain(d,t,cb);if(th==='gate')return introGate(d,t,cb);if(th==='mono')return introMono(d,t,cb);if(th==='stars')return introStars(d,t,cb);if(th==='bloom')return introBloom(d,t,cb);
  if(th==='wine')return envelopeWine(d,t,cb);
  if(th==='kraft')return envelopeKraft(d,t,cb);
  if(th==='noir')return envelopePhoto(d,t,cb);
  var W=340,H=240,cx=170,cy=132,lace=th==='ivory'||th==='noir',stitch=th==='wine';
  var TX={ivory:'linen',wine:'velvet',sage:'sagepaper'}[th]||'linen';
  var sc=th==='wine'?'#000':(th==='sage'?'#2f3d2a':'#8a6a3a');
  var tdef='<pattern id="tx" width="256" height="256" patternUnits="userSpaceOnUse"><image href="/img/inv/tex_'+TX+'.jpg" width="256" height="256"/></pattern><linearGradient id="sl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity=".05"/></linearGradient><linearGradient id="sr" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity=".05"/></linearGradient><linearGradient id="sb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient><linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>';
  var pocket='<svg class="ev-pk" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"><defs>'+tdef+'<linearGradient id="gl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color:var(--e3)"/><stop offset="1" style="stop-color:var(--e2)"/></linearGradient><linearGradient id="gr" x1="1" y1="0" x2="0" y2="0"><stop offset="0" style="stop-color:var(--e3)"/><stop offset="1" style="stop-color:var(--e2)"/></linearGradient><linearGradient id="gb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" style="stop-color:var(--e2)"/><stop offset="1" style="stop-color:var(--e1)"/></linearGradient></defs><polygon points="0,0 '+cx+','+cy+' 0,'+H+'" fill="url(#tx)"/><polygon points="0,0 '+cx+','+cy+' 0,'+H+'" fill="url(#sl)"/><polygon points="'+W+',0 '+cx+','+cy+' '+W+','+H+'" fill="url(#tx)"/><polygon points="'+W+',0 '+cx+','+cy+' '+W+','+H+'" fill="url(#sr)"/><polygon points="0,'+H+' '+cx+','+cy+' '+W+','+H+'" fill="url(#tx)"/><polygon points="0,'+H+' '+cx+','+cy+' '+W+','+H+'" fill="url(#sb)"/><g stroke="#fff" stroke-opacity=".16" stroke-width="1" fill="none"><path d="M0 '+H+'L'+cx+' '+cy+'L'+W+' '+H+'"/><path d="M0 0L'+cx+' '+cy+'L'+W+' 0" stroke-opacity=".0"/></g><g stroke="#000" stroke-opacity=".22" stroke-width="1.2" fill="none"><path d="M0 '+H+'L'+cx+' '+(cy+1.5)+'L'+W+' '+H+'"/></g>'+(lace?lacePts(0,H,cx,cy,8,8.5,2.7,true)+lacePts(W,H,cx,cy,8,8.5,2.7,false):'')+(stitch?'<g stroke="var(--lace)" stroke-width="1" stroke-dasharray="4 3" fill="none" opacity=".7"><path d="M0 '+(H-6)+'L'+cx+' '+(cy+5)+'L'+W+' '+(H-6)+'"/><path d="M6 0L'+(cx-3)+' '+(cy-2)+'L6 '+H+'" opacity=".6"/><path d="M'+(W-6)+' 0L'+(cx+3)+' '+(cy-2)+'L'+(W-6)+' '+H+'" opacity=".6"/></g>':'')+'</svg>';
  var fl='<svg viewBox="0 0 '+W+' '+cy+'" preserveAspectRatio="none"><defs>'+tdef+'<linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--e1)"/><stop offset="1" style="stop-color:var(--e2)"/></linearGradient></defs><polygon points="0,0 '+W+',0 '+cx+','+cy+'" fill="url(#tx)"/><polygon points="0,0 '+W+',0 '+cx+','+cy+'" fill="url(#sf)"/><polygon points="0,0 '+W+',0 '+cx+','+cy+'" fill="none" stroke="#fff" stroke-opacity=".2"/>'+(lace?lacePts(0,0,cx,cy,8,8.5,2.7,true)+lacePts(W,0,cx,cy,8,8.5,2.7,false):'')+(stitch?'<path d="M5 4L'+cx+' '+(cy-8)+'L'+(W-5)+' 4" stroke="var(--lace)" stroke-width="1" stroke-dasharray="4 3" fill="none" opacity=".7"/>':'')+(th==='sage'?'<g class="ev-print" transform="translate(110 8) scale(.62)">'+sprig().replace('<svg viewBox="0 0 70 170" class="sp" aria-hidden="true">','').replace('</svg>','')+'</g>':'')+'</svg>';
  var ev=document.createElement('div');ev.className='iv-env';
  ev.innerHTML=particles(th)+'<div class="ev-sc"><div class="ev" role="button" tabindex="0" aria-label="Open"><div class="ev-back"></div><div class="ev-card"><i></i><p>'+(d.lang==='ar'?'دعوة زفاف':'You are invited')+'</p><b>'+esc(d.names)+'</b></div>'+pocket+'<div class="ev-flap"><div class="ff">'+fl+'</div><div class="fb"></div></div><div class="ev-seal">'+sealSvg(ini(d.names),th==='sage'?'#ebe5d6':'#c99d47')+'</div></div><div class="iv-tap">'+t.tap+'</div></div>';
  document.body.appendChild(ev);document.documentElement.classList.add('lk');
  var done=false;function open(){if(done)return;done=true;ev.classList.add('o1');setTimeout(function(){ev.classList.add('o2')},550);setTimeout(function(){ev.classList.add('o3')},1500);setTimeout(function(){ev.classList.add('o4');document.documentElement.classList.remove('lk');cb()},2900);setTimeout(function(){ev.classList.add('gone')},3300);setTimeout(function(){ev.remove()},4800)}
  ev.addEventListener('click',open);ev.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
  if(QS.get('open')==='1')open();
}
if(PREVIEW){
  var fill=function(x){x=x||{};var o={};Object.keys(DEMO).forEach(function(k){o[k]=DEMO[k]});Object.keys(x).forEach(function(k){if(x[k]!==''&&x[k]!=null&&!(Array.isArray(x[k])&&!x[k].length))o[k]=x[k]});o.music='';return o};
  window.addEventListener('message',function(e){if(e.data&&e.data.je==='inv'){var y=window.scrollY;render(fill(e.data.d));window.scrollTo(0,y)}});
  render(fill({}));try{parent.postMessage({je:'inv-ready'},'*')}catch(x){}
}else load().then(function(d){render(d||{})});
})();
