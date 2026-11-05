/* tiny voice recorder: JERec.create(opts,onChange) returns an element */
(function(){
var MR=window.MediaRecorder;
function pick(){if(!MR)return'';var c=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg'];for(var i=0;i<c.length;i++){try{if(MR.isTypeSupported(c[i]))return c[i]}catch(e){}}return''}
function ext(m){m=String(m||'');return /mp4|m4a|aac/.test(m)?'m4a':/webm/.test(m)?'webm':/ogg/.test(m)?'ogg':/mpeg|mp3/.test(m)?'mp3':/wav/.test(m)?'wav':'m4a'}
function fmt(s){s=Math.round(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
window.JERec={ext:ext,fmt:fmt,create:function(o,cb){
  o=o||{};var max=o.max||90,T=o.t||{},el=document.createElement('div');el.className='rc';
  el.innerHTML='<div class="rc-i"><button type="button" class="rc-b" aria-label="Record"><span></span></button><div class="rc-s"><b class="rc-l">'+(T.rec||'Tap to record')+'</b><i class="rc-t"></i></div></div><div class="rc-d" hidden><audio controls playsinline></audio><button type="button" class="rc-x">'+(T.again||'Record again')+'</button></div>'+(o.upload?'<label class="rc-f"><span>'+(T.or||'or choose a file')+'</span><input type="file" accept="audio/*"></label>':'')+'<p class="rc-e" hidden></p>';
  var btn=el.querySelector('.rc-b'),lab=el.querySelector('.rc-l'),tm=el.querySelector('.rc-t'),dn=el.querySelector('.rc-d'),au=el.querySelector('audio'),err=el.querySelector('.rc-e'),ii=el.querySelector('.rc-i'),fi=el.querySelector('input[type=file]');
  var rec=null,chunks=[],t0=0,iv=0,stream=null,mime='',cur=null;
  function fail(m){err.textContent=m;err.hidden=false}
  function done(blob,m,sec){cur={blob:blob,mime:m,seconds:sec};au.src=URL.createObjectURL(blob);dn.hidden=false;ii.hidden=true;if(fi)fi.parentNode.hidden=true;cb&&cb(blob,{mime:m,seconds:sec,ext:ext(m)})}
  function reset(){if(au.src)URL.revokeObjectURL(au.src);au.removeAttribute('src');cur=null;dn.hidden=true;ii.hidden=false;if(fi){fi.parentNode.hidden=false;fi.value=''}tm.textContent='';lab.textContent=T.rec||'Tap to record';err.hidden=true;cb&&cb(null)}
  el.querySelector('.rc-x').onclick=reset;
  function stop(){if(rec&&rec.state!=='inactive')rec.stop()}
  btn.onclick=function(){
    if(rec&&rec.state==='recording'){stop();return}
    err.hidden=true;
    if(!MR||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){fail(T.nosup||'Recording is not supported on this browser.');return}
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){
      stream=s;mime=pick();chunks=[];
      try{rec=mime?new MR(s,{mimeType:mime}):new MR(s)}catch(e){fail(T.nosup||'Recording is not supported on this browser.');s.getTracks().forEach(function(t){t.stop()});return}
      rec.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
      rec.onstop=function(){clearInterval(iv);btn.classList.remove('on');stream.getTracks().forEach(function(t){t.stop()});var sec=(Date.now()-t0)/1000,m=rec.mimeType||mime||'audio/mp4';var b=new Blob(chunks,{type:m});if(sec<1||b.size<500){fail(T.short||'Too short, please try again.');lab.textContent=T.rec||'Tap to record';return}done(b,m,sec)};
      rec.start();t0=Date.now();btn.classList.add('on');lab.textContent=T.stop||'Recording… tap to stop';
      iv=setInterval(function(){var s=(Date.now()-t0)/1000;tm.textContent=fmt(s)+' / '+fmt(max);if(s>=max)stop()},250);
    }).catch(function(){fail(T.deny||'Please allow the microphone to record.')});
  };
  if(fi)fi.onchange=function(){var f=fi.files[0];if(!f)return;if(f.size>14*1048576){fail(T.big||'This file is too large (max 14 MB).');fi.value='';return}
    var a=new Audio(),u=URL.createObjectURL(f);a.onloadedmetadata=function(){done(f,f.type||'audio/mpeg',a.duration||0);URL.revokeObjectURL(u)};a.onerror=function(){fail(T.bad||'Could not read this audio file.');URL.revokeObjectURL(u)};a.src=u};
  el.get=function(){return cur};el.reset=reset;return el}}
})();
