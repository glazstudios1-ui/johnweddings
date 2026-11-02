(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};

/* mobile menu */
var b=$('.burger');if(b)b.addEventListener('click',function(){document.body.classList.toggle('menu-open')});

/* hero slider */
var hero=$('.hero');
if(hero){
  var sl=$$('.slide',hero),i=0,cnt=$('.pg-n',hero),t;
  function show(n){i=(n+sl.length)%sl.length;sl.forEach(function(s,k){s.classList.toggle('on',k===i)});cnt.textContent=(i+1)}
  function auto(){clearInterval(t);t=setInterval(function(){show(i+1)},5500)}
  $('.hp-prev',hero).addEventListener('click',function(){show(i-1);auto()});
  $('.hp-next',hero).addEventListener('click',function(){show(i+1);auto()});
  show(0);auto();
}

/* testimonials: one continuous, smooth strip. Pauses on hover/drag; arrows nudge one card. */
$$('.car').forEach(function(car){
  var track=$('.car-track',car),view=$('.car-view',car),cards=$$('.card',track);
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cards.forEach(function(c){var k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.classList.add('clone');track.appendChild(k)});
  var x=0,setW=0,paused=false,drag=null,glide=0,last=0,visible=true;
  function measure(){var f=cards[0],g=cards[1];var gap=g?g.offsetLeft-f.offsetLeft-f.offsetWidth:0;setW=cards.length*(f.offsetWidth+gap);return f.offsetWidth+gap}
  function wrap(){if(setW){while(x<=-setW)x+=setW;while(x>0)x-=setW}}
  function paint(){track.style.transform='translate3d('+x+'px,0,0)'}
  function speed(){return window.innerWidth<=768?30:42}
  function tick(t){
    var dt=Math.min((t-last)/1000||0,.05);last=t;
    if(visible&&!drag){
      if(glide){var step=glide*Math.min(1,dt*7);x+=step;glide-=step;if(Math.abs(glide)<.5){x+=glide;glide=0}}
      else if(!paused&&!reduce)x-=speed()*dt;
      wrap();paint();
    }
    requestAnimationFrame(tick);
  }
  var card=measure();
  window.addEventListener('resize',function(){card=measure();wrap();paint()});
  if('IntersectionObserver' in window){new IntersectionObserver(function(e){visible=e[0].isIntersecting}).observe(view)}
  view.addEventListener('mouseenter',function(){paused=true});
  view.addEventListener('mouseleave',function(){paused=false});
  $$('.prev',car).forEach(function(a){a.addEventListener('click',function(){glide+=card})});
  $$('.next',car).forEach(function(a){a.addEventListener('click',function(){glide-=card})});
  view.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'&&e.button!==0)return;drag={x:e.clientX,x0:x,id:e.pointerId,moved:false};glide=0});
  window.addEventListener('pointermove',function(e){if(!drag)return;var d=e.clientX-drag.x;if(Math.abs(d)>4&&!drag.moved){drag.moved=true;try{view.setPointerCapture(drag.id)}catch(_){}}if(drag.moved){x=drag.x0+d;wrap();paint()}});
  function end(){drag=null}
  window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  view.addEventListener('dragstart',function(e){e.preventDefault()});
  requestAnimationFrame(function(t){last=t;requestAnimationFrame(tick)});
});

/* masonry gallery (aspect ratios are known, so there is no layout jump) */
var gal=$('.gal');
if(gal){
  var items=$$('a',gal),GAP=14;
  function layout(){
    var W=gal.clientWidth,n=window.innerWidth<=768?2:4,cw=(W-(n-1)*GAP)/n,cols=[];
    for(var c=0;c<n;c++)cols.push(0);
    items.forEach(function(a){
      var r=+a.dataset.h/+a.dataset.w,h=cw*r,m=0;
      for(var c=1;c<n;c++)if(cols[c]<cols[m]-0.01)m=c;
      a.style.width=cw+'px';a.style.height=h+'px';
      a.style.left=m*(cw+GAP)+'px';a.style.top=cols[m]+'px';
      cols[m]+=h+GAP;
    });
    gal.style.height=Math.max.apply(null,cols)+'px';
  }
  layout();window.addEventListener('resize',layout);
  /* lightbox */
  var lb=document.createElement('div');lb.className='lb';
  lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="pv" aria-label="Previous">&#8592;</button><img alt=""><button class="nx" aria-label="Next">&#8594;</button>';
  document.body.appendChild(lb);
  var li=0,im=$('img',lb);
  function open(n){li=(n+items.length)%items.length;im.src=items[li].href;lb.classList.add('on')}
  items.forEach(function(a,k){a.addEventListener('click',function(e){e.preventDefault();open(k)})});
  $('.x',lb).onclick=function(){lb.classList.remove('on')};
  $('.pv',lb).onclick=function(e){e.stopPropagation();open(li-1)};
  $('.nx',lb).onclick=function(e){e.stopPropagation();open(li+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('on')});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')open(li-1);if(e.key==='ArrowRight')open(li+1)});
}

/* booking form: save to the database, upload the payment screenshot, then email the details */
var f=$('#booking-form');
if(f){
  var SU='https://vzunjnrosrmvtlipqpsa.supabase.co',SK='sb_publishable_3jb0Y2sDRHAcCesFcKzyZw_iDquPZwj',Q=new URLSearchParams(location.search);
  var hasPkg=!!Q.get('package'),proofEl=document.getElementById('f-proof');
  /* deposit box */
  if(hasPkg&&Q.get('deposit')){document.getElementById('pamt-wrap').hidden=false;document.getElementById('pamt').textContent='EGP '+Number(Q.get('deposit')).toLocaleString('en-US');}
  else document.getElementById('pay-desc').textContent='To reserve your date, transfer the 50% deposit through InstaPay and upload the screenshot. Your date is only held once the deposit is paid. If you have not chosen a package yet or would like to talk first, send the form without it and we will call you.';
  var cpb=document.getElementById('ipa-copy');
  if(cpb)cpb.addEventListener('click',function(){var t=document.getElementById('ipa').textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){cpb.textContent='Copied'},function(){window.prompt('Copy',t)});setTimeout(function(){cpb.textContent='Copy'},1600)});

  f.addEventListener('submit',function(e){
    e.preventDefault();
    var msg=$('.form-msg'),btn=$('button[type=submit]',f);
    if(f.elements['surname']&&f.elements['surname'].value)return;
    var file=proofEl.files&&proofEl.files[0];
    if(file&&file.size>8*1024*1024){msg.textContent='The screenshot is too large (max 8 MB).';msg.style.display='block';return}
    btn.disabled=true;msg.textContent='Sending…';msg.style.display='block';
    var fd=new FormData(f);fd.delete('surname');
    var proofUrl='',bookingId='';
    var step=Promise.resolve();
    if(file){
      step=step.then(function(){
        var ext=(file.type.split('/')[1]||'jpg').replace('jpeg','jpg').replace(/[^a-z0-9]/gi,'');
        var name=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random().toString(36).slice(2))+'.'+ext;
        return fetch(SU+'/storage/v1/object/proofs/'+name,{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':file.type||'image/jpeg'},body:file})
          .then(function(r){if(!r.ok)throw new Error('upload');proofUrl=SU+'/storage/v1/object/public/proofs/'+name});
      });
    }
    step=step.then(function(){
      var num=function(k){var v=parseInt(Q.get(k),10);return isNaN(v)?null:v};
      return fetch(SU+'/rest/v1/rpc/create_booking',{method:'POST',headers:{apikey:SK,Authorization:'Bearer '+SK,'Content-Type':'application/json'},body:JSON.stringify({
        p_couple:fd.get('Groom&Bride')||'',p_date:fd.get('Date')||null,p_venue:fd.get('venue')||null,p_phone:fd.get('Number phone')||null,p_phone2:fd.get('Number phone 2')||null,
        p_email:fd.get('email')||null,p_message:fd.get('Message')||null,p_package:hasPkg?fd.get('Package'):null,p_extras:fd.get('Extras')||null,
        p_total:num('total'),p_deposit:num('deposit'),p_proof:proofUrl||null,p_ref:Q.get('ref')||null,p_marketing:!!(f.elements['marketing']&&f.elements['marketing'].checked)})})
        .then(function(r){if(!r.ok)throw new Error('save');return r.json()}).then(function(id){bookingId=id});
    });
    step.then(function(){
      fd.set('Payment screenshot',proofUrl||'(not uploaded)');fd.set('Payment status',proofUrl?'Deposit screenshot uploaded - please verify':'NO DEPOSIT YET - client may want a call first');fd.set('Booking ID',bookingId);
      var notify=fetch('https://api.web3forms.com/submit',{method:'POST',body:fd,headers:{'Accept':'application/json'}}).catch(function(){});
      var thanks=bookingId?fetch(SU+'/functions/v1/send-thanks',{method:'POST',headers:{'Content-Type':'application/json',apikey:SK,Authorization:'Bearer '+SK},body:JSON.stringify({booking_id:bookingId})}).catch(function(){}):Promise.resolve();
      return Promise.all([notify,thanks]);
    }).then(function(){
      f.reset();document.getElementById('f-package').value=hasPkg?Q.get('package')?'Photography — '+Q.get('package'):'':'No package selected (booked directly)';
      msg.textContent=proofUrl?'Thank you! We received your request and your payment screenshot. Your date is confirmed as soon as we verify the deposit, and we will contact you shortly.':'Thank you! We received your request and will contact you shortly. Please note that your date is only reserved once the 50% deposit is paid.';
    }).catch(function(err){
      msg.textContent='Something went wrong ('+(err&&err.message?err.message:'network')+'). Please WhatsApp me on +201066600848.';
    }).then(function(){btn.disabled=false});
  });
}

/* booking: pre-fill from the package page */
(function(){
  var sel=document.getElementById('sel'),pk=document.getElementById('f-package');
  if(!sel||!pk)return;
  var q=new URLSearchParams(location.search),pkg=q.get('package');
  var n=q.get('name'),ph=q.get('phone');
  var nameEl=document.getElementById('f-Groom-Bride'),phEl=document.getElementById('f-Number-phone');
  if(n&&nameEl)nameEl.value=n;
  if(ph&&phEl)phEl.value=ph;
  if(!pkg)return;
  pk.value='Photography — '+pkg;
  var labels={hour:'Extra hour',photographer:'Extra photographer'},ex=[];
  (q.get('extras')||'').split(',').forEach(function(x){var p=x.split(':');if(labels[p[0]]&&+p[1]>0)ex.push((+p[1]>1?p[1]+'× ':'')+labels[p[0]])});
  var egp=function(v){return 'EGP '+Number(v||0).toLocaleString('en-US')},tot=q.get('total'),dep=q.get('deposit');
  var esc=function(v){return String(v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  sel.innerHTML='<div class="t">Your selection</div>'
    +'<div class="r"><span>Package</span><b>Photography — '+esc(pkg)+'</b></div>'
    +'<div class="r"><span>Add-ons</span><b>'+(ex.length?esc(ex.join(', ')):'None')+'</b></div>'
    +(tot?'<div class="r tot"><span>Estimated total</span><b>'+egp(tot)+'</b></div>':'')
    +(dep?'<div class="r"><span>Deposit (50%)</span><b>'+egp(dep)+'</b></div>':'');
  sel.hidden=false;
  document.getElementById('f-extras').value=ex.length?ex.join(', '):'None';
  document.getElementById('f-total').value=tot?egp(tot):'';
  document.getElementById('f-deposit').value=dep?egp(dep):'';
  document.getElementById('f-ref').value=q.get('ref')||'';
})();
/* booking (phones): the photo opens the page, then the form fades in as you scroll */
(function(){
  var bg=$('.book-bg'),form=$('.b-form');
  if(!bg||!form||!window.matchMedia('(max-width:768px)').matches)return;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function dim(){var p=Math.min(1,window.scrollY/(window.innerHeight*.75));bg.style.opacity=(1-p*.84).toFixed(3)}
  window.addEventListener('scroll',dim,{passive:true});dim();
  if(reduce||!('IntersectionObserver' in window))return;
  form.classList.add('pre');
  var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){form.classList.add('in');io.disconnect()}},{threshold:.04,rootMargin:'0px 0px -12% 0px'});
  io.observe(form);
  var go=$('.b-go');if(go)go.addEventListener('click',function(){form.classList.add('in')});
})();
})();
