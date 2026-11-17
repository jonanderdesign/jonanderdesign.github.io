/* Jon Ander Saenz · portfolio · home: the intro, the work rows, a project opening over the home, the menu marker and the arrival. The engine, theme and effects come from site.js. */
gio.disconnect();
const caseEl=document.getElementById('case'),cmain=document.getElementById('cmain'),pageEl=document.querySelector('.page');
const focusBack=()=>{const b=cmain.querySelector('.back');if(b)b.focus({preventScroll:true})};
let isOpen=false;
function sched(){const i=energy();if(!OFF&&document.visibilityState==='visible'){
 const pool=isOpen?[...cmain.querySelectorAll('.gx')].filter(onScreen):(onScreen(rl)?[rl,rl,nm].concat(rl2?[rl2,rl2]:[]):GX.filter(g=>g!==nm&&g!==rl&&g!==rl2&&onScreen(g)));
 if(pool.length){const strong=Math.random()<(.04+.2*i),k=strong?1:Math.min(.99,(.3+.7*i)*rnd(.85,1.1));burst(pick(pool),k,i);if(Math.random()<i*.45){const e2=pick(pool);setTimeout(()=>burst(e2,Math.min(.99,k*.8),i),rnd(90,200))}}}
 if(!OFF)schedT=setTimeout(sched,Math.max(450,(6000-5300*i)*rnd(.6,1.4)))}
/* each project, as it comes into view: its title breaks once (as on the home) */
/* one headline lands at a time (critic R8): a queue; the role's arrival holds it first */
window.__hlUntil=performance.now()+2600;
document.fonts.ready.then(()=>{window.__hlUntil=Math.max(window.__hlUntil,performance.now()+2200)});
window.__queue=(dur,fn)=>{const now=performance.now(),start=Math.max(now,window.__hlUntil||0);window.__hlUntil=start+dur;setTimeout(fn,start-now)};
/* «Vuelta»: as each project comes into view, its title lands letter by letter like the role on arrival, then breaks once (screens untouched) */
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!OFF){const pr=e.target;charge(.6);
 window.__queue(500,()=>{burst(pr.querySelector('.ptitle .gx'),1)});io.unobserve(pr)}})},{threshold:.3});
document.querySelectorAll('.proj').forEach(p=>io.observe(p));
const fio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!OFF){charge(.6);burst(e.target,1);fio.unobserve(e.target)}}),{threshold:.6});
document.querySelectorAll('.contact .gx').forEach(g=>fio.observe(g));

/* ---------- 4 · menu: his glitch under the pointer; the pink pixel under the section you are in ---------- */
const navLinks=[...document.querySelectorAll('.top nav a')];
navLinks.forEach(a=>a.addEventListener('pointerenter',()=>burst(a.querySelector('.gx'),.9)));
const nWork=document.getElementById('nWork'),nContact=document.getElementById('nContact');
function whereAmI(){const line=innerHeight*.45,w=document.getElementById('work').getBoundingClientRect(),c=document.getElementById('contact').getBoundingClientRect();
 const atEnd=scrollY+innerHeight>=document.documentElement.scrollHeight-2;
 const cur=(atEnd||c.top<line)?nContact:(w.top<line&&w.bottom>line)?nWork:null;
 [nWork,nContact].forEach(a=>a===cur?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'));if(cur!==whereAmI.last){whereAmI.last=cur;if(cur===nWork&&!whereAmI.seen){whereAmI.seen=true;return}if(cur&&!OFF&&!(window.__wkLanding>performance.now()))burst(cur.querySelector('.gx'),.9)}}
addEventListener('scroll',whereAmI,{passive:true});addEventListener('resize',whereAmI);
/* ---------- 7 · contact: his glitch under the pointer ---------- */
document.querySelectorAll('.contact a.big').forEach(a=>a.addEventListener('pointerenter',()=>burst(a.querySelector('.gx'),1)));

/* ---------- 1 · intro: the role across the page (one line; two on a phone), the name signs under it ---------- */
const namesBox=document.getElementById('names'),nm=document.getElementById('nm'),rl=document.getElementById('rl'),rl2=document.getElementById('rl2');

function fitRole(){const wide=innerWidth>=768;namesBox.style.width='';const W=namesBox.clientWidth;
 /* el hero se encoge con el scroll: getBoundingClientRect devuelve la caja ya escalada, asi que toda medida se
    normaliza por la escala vigente; sin esto, un resize a media pagina (la barra del navegador del movil al
    plegarse) mide el 86% y agranda el titulo hasta sacarlo de la pantalla */
 const sc=(namesBox.getBoundingClientRect().width/W)||1;
 const wAt=(el,fs)=>{el.style.fontSize=fs+'px';el.style.fontStretch='62%';return el.getBoundingClientRect().width/sc};
 let fs=100*W/Math.max(wAt(rl,100),wAt(rl2,100));
 if(wide){const hdr=document.querySelector('.top').offsetHeight,ic=getComputedStyle(document.querySelector('.intro')),sg=document.querySelector('.names .sign');
  const sgH=sg.getBoundingClientRect().height/sc+parseFloat(getComputedStyle(sg).marginTop||0);const avail=innerHeight-hdr-parseFloat(ic.paddingTop)-parseFloat(ic.paddingBottom)-sgH-24;const fsH=avail/(2*.84);if(fsH<fs)fs=fsH}
 [rl,rl2].forEach(el=>wAt(el,fs))}
let rzn,rzw=innerWidth;addEventListener('resize',()=>{if(innerWidth===rzw&&innerWidth<768)return;rzw=innerWidth;clearTimeout(rzn);rzn=setTimeout(fitRole,80)});
/* ---------- intro: the photo glitches inside with the role and the name (the home's) ---------- */
let photoUntil=0,photoStr=0;
const _burst=burst;burst=function(el,str=1,i=.72){if((el===nm||el===rl||(rl2&&el===rl2))&&!OFF){photoUntil=performance.now()+220;photoStr=Math.max(.45,str)}return _burst(el,str,i)};
(()=>{const cv=document.getElementById('pcv'),cx=cv.getContext('2d'),img=new Image();let S=0,R,G,B,tmp,lv=0,lt=0;
 function make(){S=Math.round(cv.clientWidth*Math.min(2,devicePixelRatio||1));if(!S)return;cv.width=cv.height=S;
  const o=document.createElement('canvas');o.width=o.height=S;const ox=o.getContext('2d');ox.drawImage(img,0,0,S,S);const d=ox.getImageData(0,0,S,S).data;
  const mk=ch=>{const c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d'),id=x.createImageData(S,S),a=id.data;
   for(let i=0;i<d.length;i+=4){const l=Math.max(0,Math.min(255,(d[i]*.3+d[i+1]*.59+d[i+2]*.11-128)*1.12+128));a[i]=ch===0?l:0;a[i+1]=ch===1?l:0;a[i+2]=ch===2?l:0;a[i+3]=255}
   x.putImageData(id,0,0);return c};
  R=mk(0);G=mk(1);B=mk(2);tmp=document.createElement('canvas');tmp.width=tmp.height=S;draw(0)}
 function draw(v){cx.globalCompositeOperation='source-over';cx.fillStyle='#000';cx.fillRect(0,0,S,S);cx.globalCompositeOperation='lighter';
  const d=Math.round(v*S*.03);if(v>.6)cx.filter='blur('+(v*1.6).toFixed(1)+'px)';cx.drawImage(R,-d,0);cx.filter='none';cx.drawImage(G,0,0);if(v>.6)cx.filter='blur('+(v*1.2).toFixed(1)+'px)';cx.drawImage(B,d,0);cx.filter='none';cx.globalCompositeOperation='source-over';
  if(v>.35){const t=tmp.getContext('2d');t.clearRect(0,0,S,S);t.drawImage(cv,0,0);const n=2+Math.floor(v*5);for(let k=0;k<n;k++){const y=Math.random()*S,h=S*(.006+Math.random()*.028),dx=(Math.random()-.5)*S*.16*v;cx.drawImage(tmp,0,y,S,h,dx,y,S,h)}}}
 function loop(t){if(S&&t-lt>70){lt=t;const target=(!OFF&&performance.now()<photoUntil)?photoStr:0;if(target>0||lv>0){lv+=(target-lv)*(target>lv?.7:.25);if(lv<.01&&target===0)lv=0;draw(lv)}}requestAnimationFrame(loop)}
 img.onload=()=>{make();requestAnimationFrame(loop)};img.src='../img/jon-square.webp';
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(img.complete)make()},120)})})();

/* ---------- 5 · work rows: the home's (one open at a time, on pointer or keyboard; nothing under the pointer moves).
   New: when a row opens, its screen comes in torn by the glitch and its title breaks once. ---------- */
const rows=[...document.querySelectorAll('.prow')];
function tear(r){if(!r)return;syncRow(r);if(OFF)return;const w=winOf(r);if(w&&w.getClientRects().length){setTimeout(()=>{w.classList.remove('rip');void w.offsetWidth;w.classList.add('rip');setTimeout(()=>w.classList.remove('rip'),400)},220)}burst(r.querySelector('.ptitle .gx'),.9)}
let showRow=()=>{};
(()=>{const list=document.querySelector('.rows');if(!list)return;let t=null,ct=null,px=-1,py=-1;
 let hEl=null,hTop=0,hEnd=0,hRaf=0,hT=null;
 function fix(){if(!hEl)return;const d=hEl.getBoundingClientRect().top-hTop;if(Math.abs(d)>.5)scrollBy({top:d,behavior:'instant'})}
 function loop(){fix();if(hEl&&performance.now()<hEnd)hRaf=requestAnimationFrame(loop)}
 function release(){hEl=null;cancelAnimationFrame(hRaf);clearTimeout(hT);window.__pinUntil=0}
 ['wheel','touchstart','keydown','mousedown'].forEach(t=>addEventListener(t,()=>{if(hEl)release()},{passive:true}));
 function hold(el,top){hEl=el;hTop=top;hEnd=performance.now()+600;window.__pinUntil=hEnd+200;cancelAnimationFrame(hRaf);hRaf=requestAnimationFrame(loop);clearTimeout(hT);hT=setTimeout(()=>{fix();hEl=null},620)}
 function under(){return py<0?null:document.elementFromPoint(px,py)}
 function show(r,anchor){if(r&&r.classList.contains('open'))return;const top=anchor?anchor.getBoundingClientRect().top:0;
  rows.forEach(x=>{if(x!==r)x.classList.remove('open')});if(r){r.classList.add('open');tear(r);window.__rowSwitch=performance.now()}}
 showRow=show;
 if(matchMedia('(hover:hover)').matches){
  addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY},{passive:true});
  let sx=null,sy=null,scrolled=false;addEventListener('scroll',()=>{if(performance.now()<(window.__pinUntil||0))return;scrolled=true;sx=null},{passive:true});
  let lx=null,ly=null;rows.forEach(r=>{r.addEventListener('pointermove',e=>{if(r.classList.contains('open'))return;if(performance.now()-(window.__rowSwitch||0)<650){if(lx===null){lx=e.clientX;ly=e.clientY;return}if(Math.hypot(e.clientX-lx,e.clientY-ly)<10)return}lx=null;if(scrolled){if(sx===null){sx=e.clientX;sy=e.clientY;return}if(Math.hypot(e.clientX-sx,e.clientY-sy)<24)return;scrolled=false}clearTimeout(t);t=setTimeout(()=>show(r,under()),140)});r.addEventListener('pointerleave',()=>clearTimeout(t))});
  list.addEventListener('pointerenter',()=>clearTimeout(ct));
  list.addEventListener('pointerleave',()=>{clearTimeout(t);clearTimeout(ct);ct=setTimeout(()=>{if(!isOpen)show(null,under())},220)});
  }
 rows.forEach(r=>r.addEventListener('focus',()=>{if(!isOpen)show(r,null)}));
 list.addEventListener('focusout',e=>{const n=e.relatedTarget;if(n&&!list.contains(n)&&!list.matches(':hover'))show(null,n)})})();

/* ---------- 6 · a project opens over the home: its title and its screen travel into the case, and back to the row ---------- */
const VT=typeof document.startViewTransition==='function';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const abs=(u,b)=>new URL(u,b||location.href).href;
const rowOf=url=>rows.find(r=>abs(r.getAttribute('href'))===url);
const cache=new Map();
function getCase(url){if(!cache.has(url))cache.set(url,fetch(url).then(r=>{if(!r.ok)throw new Error(r.status);return r.text()}).then(t=>{
  const d=new DOMParser().parseFromString(t,'text/html');const m=d.querySelector('main');if(!m)throw new Error('no main');
  m.querySelectorAll('[src]').forEach(e=>e.setAttribute('src',abs(e.getAttribute('src'),url)));
  m.querySelectorAll('a[href]').forEach(e=>{const h=e.getAttribute('href');if(!/^(mailto:|#)/.test(h))e.setAttribute('href',abs(h,url))});
  m.querySelectorAll('[srcset],[data-zoom]').forEach(e=>['srcset','data-zoom'].forEach(k=>{const v=e.getAttribute(k);if(v)e.setAttribute(k,v.split(',').map(s=>{const [u,...r]=s.trim().split(/\s+/);return [abs(u,url),...r].join(' ')}).join(', '))}));
  m.querySelectorAll('[data-nav]').forEach(a=>a.removeAttribute('data-nav'));
  const h=m.querySelector('.chead .plate img');if(h){h.removeAttribute('loading');h.setAttribute('decoding','sync');const pre=new Image();if(h.srcset){pre.sizes=h.sizes;pre.srcset=h.srcset}pre.src=h.src;
   return Promise.race([pre.decode().catch(()=>{}),wait(900)]).then(()=>m)}
  return m}));return cache.get(url)}
const name=(el,n)=>{if(el)el.style.viewTransitionName=n||''};
const inView=(el,box)=>{if(!el||!el.getClientRects().length)return false;const r=el.getBoundingClientRect(),b=box?box.getBoundingClientRect():{top:0,bottom:innerHeight};return r.height>0&&r.bottom>b.top&&r.top<b.bottom};
function winOf(r){if(!r)return null;const v=document.querySelector('.viewer .vp[data-for="'+r.dataset.slug+'"] .win');return v||r.querySelector('.win')}
function syncRow(r){const v=document.querySelector('.viewer');if(!v||!r)return;v.querySelectorAll('.vp').forEach(x=>x.classList.toggle('on',x.dataset.for===r.dataset.slug))}
const visibleWin=r=>{const w=winOf(r);return w&&w.getClientRects().length&&inView(w)?w:null};
function lock(on){root.classList.toggle('lock',on);document.querySelector('.page > main').inert=on;document.getElementById('contact').inert=on}
const shapeOf=el=>{const r=el.getBoundingClientRect();return r.width/Math.max(1,r.height)};
const sameShape=(a,b)=>a&&b&&Math.abs(Math.log(a/b))<.3;
let busy=false,cur=null;
function fill(m,url){cmain.replaceChildren(...m.cloneNode(true).childNodes);
 const cf=document.getElementById('contact').cloneNode(true);cf.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));cf.id='ccontact';cmain.append(cf);
 cmain.querySelectorAll('.gx').forEach(build);if(window.__motionScan)window.__motionScan(cmain);
 const h=cmain.querySelector('.ctitle');caseEl.setAttribute('aria-label',h?h.textContent.trim():'Project');cur={url,row:rowOf(url)}}
async function openCase(row,{push=true,instant=false}={}){
 if(busy||isOpen)return;busy=true;const url=abs(row.getAttribute('href')),slug=row.dataset.slug;const p=getCase(url);
 const t=row.querySelector('.ptitle .gl'),w=visibleWin(row);
 if(!OFF&&!instant){t.classList.add('hard');burst(t,1)}
 let m;try{m=await Promise.all([p,OFF||instant?0:wait(170)]).then(a=>a[0])}catch(e){location.href=url;return}
 t.classList.remove('hard');reset(t);
 try{if(push)history.pushState({c6:slug,pushed:true},'','#'+slug);else history.replaceState({c6:slug,pushed:false},'','#'+slug)}catch(e){}
 const t0=shapeOf(t);
 const swap=()=>{name(t);name(w);fill(m,url);caseEl.hidden=false;caseEl.classList.add('open');caseEl.scrollTop=0;isOpen=true;lock(true);
  const ct=cmain.querySelector('.ctitle .gl');const fl=!OFF&&!instant&&VT&&shapeOf(ct)>=t0*.95&&shapeOf(ct)<=t0*1.6;if(fl)name(ct,'ptitle');else root.classList.add('vt-solo');if(w)name(cmain.querySelector('.chead .plate'),'pshot');if(fl||w)root.classList.add('vt-fly')};
 row.classList.add('vt-hold');t.classList.add('vt-travel');
 if(!OFF&&!instant&&VT){root.classList.add('vt-open');name(t,'ptitle');if(w)name(w,'pshot');const vt=document.startViewTransition(swap);await vt.finished.catch(()=>{})}else swap();
 root.classList.remove('vt-solo','vt-fly','vt-open');name(cmain.querySelector('.ctitle .gl'));name(cmain.querySelector('.chead .plate'));
 focusBack();
 if(!OFF){const ct=cmain.querySelector('.ctitle .gx');setTimeout(()=>burst(ct,.55),60);charge(1)}
 busy=false}
async function closeCase({instant=false,top=false}={}){
 if(!isOpen||busy)return;busy=true;const row=cur&&cur.row;
 const ct=cmain.querySelector('.ctitle .gl'),cp=cmain.querySelector('.chead .plate');
 const t=row&&row.querySelector('.ptitle .gl'),w=row&&winOf(row);
 const fly=!OFF&&!instant&&!top&&VT&&row;if(fly&&!inView(ct,caseEl))caseEl.scrollTop=0;
 const useT=fly&&inView(ct,caseEl)&&!!t&&shapeOf(ct)>=shapeOf(t)*.95&&shapeOf(ct)<=shapeOf(t)*1.6,useP=fly&&inView(cp,caseEl)&&matchMedia('(min-width: 48rem) and (hover: hover)').matches;
 if(useT){ct.classList.add('hard');burst(ct,1);await wait(150);ct.classList.remove('hard');reset(ct)}
 const swap=()=>{name(ct);name(cp);caseEl.classList.remove('open');caseEl.hidden=true;isOpen=false;lock(false);
  if(top){rows.forEach(x=>x.classList.remove('open'));scrollTo({top:0,behavior:'instant'})}
  else if(row){rows.forEach(x=>x.classList.remove('open'));row.classList.add('snap','open');syncRow(row);
   const r=row.getBoundingClientRect(),hdr=document.querySelector('.top').offsetHeight;if(r.top<hdr||r.top>innerHeight*.5)scrollTo({top:scrollY+r.top-hdr-24,behavior:'instant'})}
  if(useT)name(t,'ptitle');const fp=useP&&inView(w);if(fp)name(w,'pshot');root.classList.add(useT||fp?'vt-fly':'vt-wait')};
 if(fly){root.classList.add('vt-close');if(useT)name(ct,'ptitle');if(useP)name(cp,'pshot');const vt=document.startViewTransition(swap);await vt.finished.catch(()=>{})}
 else if(top&&!OFF&&VT){root.classList.add('vt-wait');const vt=document.startViewTransition(swap);await vt.finished.catch(()=>{})}else swap();
 root.classList.remove('vt-solo','vt-fly','vt-close','vt-wait');name(t);name(w);cmain.replaceChildren();rows.forEach(x=>x.classList.remove('vt-hold'));document.querySelectorAll('.vt-travel').forEach(x=>x.classList.remove('vt-travel'));if(row)setTimeout(()=>row.classList.remove('snap'),50);
 if(top){const b=document.querySelector('.top .brand');if(b)b.focus({preventScroll:true});requestAnimationFrame(()=>scrollTo({top:0,behavior:'instant'}));if(!OFF)charge(1)}
 else if(row){row.focus({preventScroll:true});if(!OFF){setTimeout(()=>burst(t,1),60);charge(1)}}
 busy=false}
/* the next project, from inside a case: its name travels to the top and becomes the new title */
async function nextCase(a){
 if(busy)return;busy=true;const url=a.href,row=rowOf(url),nt=a.querySelector('.nt .gl');const p=getCase(url);
 if(!OFF&&nt){nt.classList.add('hard');burst(nt,1)}
 let m;try{m=await Promise.all([p,OFF?0:wait(170)]).then(a=>a[0])}catch(e){location.href=url;return}
 if(nt){nt.classList.remove('hard');reset(nt)}
 try{history.replaceState({c6:row&&row.dataset.slug,pushed:!!(history.state&&history.state.pushed)},'','#'+(row?row.dataset.slug:''))}catch(e){}
 const n0=nt?shapeOf(nt):0;
 const swap=()=>{name(nt);fill(m,url);caseEl.scrollTop=0;const ct=cmain.querySelector('.ctitle .gl');if(sameShape(n0,shapeOf(ct))){name(ct,'ptitle');root.classList.add('vt-fly')}else root.classList.add('vt-solo')};
 if(!OFF&&VT&&nt){name(nt,'ptitle');const vt=document.startViewTransition(swap);await vt.finished.catch(()=>{})}else swap();
 root.classList.remove('vt-solo','vt-fly');name(cmain.querySelector('.ctitle .gl'));focusBack();
 if(!OFF){setTimeout(()=>burst(cmain.querySelector('.ctitle .gx'),1),60);charge(1)}
 busy=false}
function goHomeTop(){if(!isOpen||busy)return;try{history.pushState(null,'',location.pathname+location.search)}catch(e){}closeCase({top:true})}
function requestClose(){if(!isOpen)return;if(history.state&&history.state.pushed)history.back();else{closeCase();try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}}
rows.forEach(r=>{const warm=()=>getCase(abs(r.getAttribute('href'))).catch(()=>{});r.addEventListener('pointerenter',warm);r.addEventListener('focus',warm);
 r.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;e.preventDefault();openCase(r)})});
/* the site's header stays over the case, as on the base's case pages */
document.querySelector('.top').addEventListener('click',e=>{if(!isOpen)return;const a=e.target.closest('a');if(!a)return;const h=a.getAttribute('href');
 if(h==='#contact'){e.preventDefault();const c=document.getElementById('ccontact');if(c)caseEl.scrollTo({top:c.offsetTop,behavior:OFF?'auto':'smooth'});return}
 if(h==='#'){e.preventDefault();goHomeTop();return}
 if(h==='#work'){e.preventDefault();requestClose()}});
addEventListener('popstate',()=>{const s=(location.hash||'').slice(1),r=rows.find(x=>x.dataset.slug===s);if(isOpen&&!r)closeCase();else if(!isOpen&&r)openCase(r,{push:false})});
const zoomDlg=document.createElement('dialog');zoomDlg.className='zoombox';zoomDlg.setAttribute('aria-label','Enlarged image');
zoomDlg.innerHTML='<button type="button" class="zoomclose" aria-label="Close">×</button><div class="zoomscroll"></div>';document.body.append(zoomDlg);
zoomDlg.addEventListener('click',e=>{if(zoomDlg.classList.contains('pan')&&e.target.tagName==='IMG')return;zoomDlg.close()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen&&!zoomDlg.open){e.preventDefault();requestClose()}});
caseEl.addEventListener('pointerover',e=>{const a=e.target.closest('#ccontact a.big');if(a&&!a.contains(e.relatedTarget))burst(a.querySelector('.gx'),1)});
caseEl.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.metaKey||e.ctrlKey||e.shiftKey)return;
 if(a.classList.contains('zoom')){e.preventDefault();const im=new Image(),inner=a.querySelector('img');if(a.dataset.zoom)im.srcset=a.dataset.zoom;im.src=a.href;im.alt=inner?inner.alt:'';
  const w=+(a.dataset.w||0),narrow=matchMedia('(max-width: 48rem)').matches;if(w&&(!narrow||w>innerWidth))im.style.inlineSize=w+'px';zoomDlg.classList.toggle('pan',narrow&&w>innerWidth);
  zoomDlg.querySelector('.zoomscroll').replaceChildren(im);zoomDlg.showModal();return}
 const hh=a.getAttribute('href')||'';if(hh.startsWith('#')&&hh.length>1){const tg=cmain.querySelector(hh);if(tg){e.preventDefault();e.stopPropagation();caseEl.scrollTo({top:caseEl.scrollTop+tg.getBoundingClientRect().top-caseEl.getBoundingClientRect().top-24,behavior:OFF?'auto':'smooth'});return}}
 if(a.classList.contains('next')){e.preventDefault();e.stopPropagation();nextCase(a);return}
 if(a.classList.contains('back')){e.preventDefault();e.stopPropagation();requestClose()}});

/* ---------- arrival (the home's): the role and the name land letter by letter, then break once ---------- */
document.fonts.ready.then(()=>{fitRole();whereAmI();
 const s=(location.hash||'').slice(1),r=rows.find(x=>x.dataset.slug===s);if(r)openCase(r,{push:false,instant:true});
 if(OFF)return;if(document.documentElement.dataset.arrived==='blocks'){charge(1);return}E=1;land(rl,0);if(rl2)land(rl2,1);land(nm,rl2?2:1,.5);photoUntil=performance.now()+1400;photoStr=1;setTimeout(()=>burst(rl,1),1500);if(rl2)setTimeout(()=>burst(rl2,1),1580);setTimeout(()=>burst(nm,1),1650);setTimeout(()=>charge(1),1850)});

/* the data lines: the separators, and the break between items when a line wraps */
(()=>{const metas=[...document.querySelectorAll('.rows .pmeta')];
metas.forEach(m=>m.querySelectorAll('.nb').forEach(n=>{const t=n.firstChild;if(t&&t.nodeType===3&&t.data.startsWith('· ')){t.data=t.data.slice(2);const sp=document.createElement('span');sp.className='sep';sp.textContent='· ';n.prepend(sp)}}));
const fit=()=>metas.forEach(m=>{const ns=[...m.querySelectorAll('.nb')];ns.forEach(n=>n.classList.remove('ls'));let prev=null;ns.forEach(n=>{if(prev){const a=prev.getClientRects(),b=n.getClientRects();if(a.length&&b.length&&b[0].top>a[a.length-1].top+2)n.classList.add('ls')}prev=n})});
document.fonts.ready.then(fit);addEventListener('resize',fit);fit()})();

/* R8: «WORK» at the size of the role; its entrance lands with his glitch and takes one block hit */
(()=>{const wk=document.querySelector('#h-work .gx'),rl=document.getElementById('rl');if(!wk||!rl)return;
  let done=false;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting||done)return;done=true;io.disconnect();
  if(OFF||reduce)return;window.__wkLanding=performance.now()+1600;window.__queue(500,()=>{cbHit(wk,1)})}),{threshold:.6});
 io.observe(wk.closest('.wk'))})();
/* the hero's right column lines up with the role: the photo starts at the top of «PRODUCT» */
(()=>{const al=()=>{const band=document.querySelector('.intro .band'),cue=document.querySelector('.intro .cue'),rl=document.getElementById('rl'),nm=document.getElementById('nm');if(!band||!rl)return;
 band.style.marginTop='';if(cue)cue.style.transform='';if(innerWidth<768)return;
 const cap=rl.getBoundingClientRect().top+parseFloat(getComputedStyle(rl).fontSize)*.127;band.style.marginTop=Math.max(0,cap-band.getBoundingClientRect().top).toFixed(1)+'px';
};
 document.fonts.ready.then(()=>setTimeout(al,120));addEventListener('resize',()=>setTimeout(al,160))})();
