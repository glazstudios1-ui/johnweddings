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

/* testimonials carousel */
$$('.car').forEach(function(car){
  var track=$('.car-track',car),cards=$$('.card',track),pg=0,per=3,pages;
  var mq=window.matchMedia('(max-width:768px)');
  function build(){
    per=mq.matches?1:3;
    var cur=Math.floor(pg*per_prev/per);
    track.innerHTML='';pages=[];
    for(var k=0;k<cards.length;k+=per){var p=document.createElement('div');p.className='car-page';cards.slice(k,k+per).forEach(function(c){p.appendChild(c)});track.appendChild(p);pages.push(p)}
    pg=Math.min(cur,pages.length-1);go(pg,true);per_prev=per;
  }
  var per_prev=3;
  function go(n,instant){pg=(n+pages.length)%pages.length;track.style.transition=instant?'none':'';track.style.transform='translateX(-'+pg*100+'%)'}
  $$('.prev',car).forEach(function(a){a.addEventListener('click',function(){go(pg-1)})});
  $$('.next',car).forEach(function(a){a.addEventListener('click',function(){go(pg+1)})});
  mq.addEventListener?mq.addEventListener('change',build):mq.addListener(build);
  build();
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

/* booking form */
var f=$('#booking-form');
if(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var body=new URLSearchParams(new FormData(f)).toString(),msg=$('.form-msg');
    var btn=$('button',f);btn.disabled=true;
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body})
      .then(function(r){if(!r.ok)throw 0;f.reset();msg.textContent='Thank you for contacting me!';msg.style.display='block'})
      .catch(function(){msg.textContent='Something went wrong. Please WhatsApp me on +201066600848.';msg.style.display='block'})
      .then(function(){btn.disabled=false});
  });
}
})();
