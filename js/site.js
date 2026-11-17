/* Jon Ander portfolio: shared header controls (theme, effects) and the glitch engine. Loaded by every page; the home adds home.js on top. */

const root=document.documentElement;
/* ---------- header icons (Lucide, ISC) ---------- */
const ICON={
 sun:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
 moon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
 pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>',
 play:'<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>'};
document.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=ICON[e.dataset.icon]);
const themeBtn=document.getElementById('themeBtn'),fxBtn=document.getElementById('fxBtn');
let theme='dark';{const q=new URLSearchParams(location.search).get('theme');if(q==='light'||q==='dark')theme=q;else{try{const v=localStorage.getItem('theme');if(v==='light')theme='light'}catch(e){}}}
function applyTheme(){root.dataset.theme=theme;const toDark=theme!=='dark',l=toDark?'Switch to dark':'Switch to light';themeBtn.innerHTML=toDark?ICON.moon:ICON.sun;themeBtn.setAttribute('aria-label',l);themeBtn.title=l}
themeBtn.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';applyTheme();try{localStorage.setItem('theme',theme)}catch(e){}const u=new URL(location.href);u.searchParams.delete('theme');history.replaceState(history.state,'',u)});
applyTheme();
let OFF=matchMedia('(prefers-reduced-motion: reduce)').matches;try{const v=localStorage.getItem('fx');if(v)OFF=v==='off'}catch(e){}
function applyFx(){root.classList.toggle('rm',OFF);const l=OFF?'Play effects':'Pause effects';fxBtn.innerHTML=OFF?ICON.play:ICON.pause;fxBtn.removeAttribute('aria-pressed');fxBtn.setAttribute('aria-label',l);fxBtn.title=l}
fxBtn.addEventListener('click',()=>{OFF=!OFF;try{localStorage.setItem('fx',OFF?'off':'on')}catch(e){}applyFx();if(OFF){clearTimeout(schedT);document.querySelectorAll('.gx').forEach(reset)}else charge(.6)});
applyFx();

/* ---------- glitch engine ---------- */
const onScreen=el=>{const r=el.getBoundingClientRect();return r.width>0&&r.bottom>0&&r.top<innerHeight};
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[(Math.random()*a.length)|0];
function build(el){const t=el.dataset.text;el.innerHTML=`<span class="sr">${t}</span><span class="base" aria-hidden="true">${t.split(' ').map(w=>`<span class="wd">${[...w].map(c=>c==='.'?'<i data-dot>.</i>':`<i>${c}</i>`).join('')}</span>`).join(' ')}</span><span class="cp m" aria-hidden="true" data-t="${t}"></span><span class="cp a" aria-hidden="true" data-t="${t}"></span><span class="il a" aria-hidden="true" data-t="${t}"></span><span class="il b" aria-hidden="true" data-t="${t}"></span><i class="streak" aria-hidden="true"></i><span class="ct" aria-hidden="true" data-t="${t}"></span>`}
document.querySelectorAll('.page .gx').forEach(build);
/* the residual glitch runs over the page's titles, as on the home; the menu only breaks under the pointer */
const GX=[...document.querySelectorAll('.page main .gx,.page .contact .gx')];
function parts(el){return{b:el.querySelector('.base'),m:el.querySelector('.cp.m'),a:el.querySelector('.cp.a'),ia:el.querySelector('.il.a'),ib:el.querySelector('.il.b'),s:el.querySelector('.streak')}}
function reset(el){const p=parts(el);if(!p.b)return;p.b.style.cssText='';[p.m,p.a,p.ia,p.ib,p.s].forEach(x=>x.style.cssText='');el.querySelectorAll('.base .wd').forEach(w=>w.style.transform='');el.querySelectorAll('.base i').forEach(i=>{if(!i._entering){i.className='';i.style.cssText=''}})}
function rgb(p,k){p.m.style.opacity=1;p.m.style.transform=`translateX(${(rnd(.018,.05)*k).toFixed(3)}em)`;p.a.style.opacity=1;p.a.style.transform=`translateX(${(-rnd(.018,.05)*k).toFixed(3)}em)`}
const FX={
 jump(p,k){p.b.style.transform=`translate(${(rnd(-.035,.035)*k).toFixed(3)}em,${(rnd(-.07,.07)*k).toFixed(3)}em)`;if(Math.random()<.6)rgb(p,k);[p.m,p.a].forEach(c=>{if(c.style.opacity)c.style.transform+=' '+p.b.style.transform})},
 rgb(p,k){rgb(p,1.4*k)},
 squash(p,k){const y=rnd(-.15,.35)*k;p.b.style.transform=`translateY(${y.toFixed(3)}em) scaleY(${(1-(1-rnd(.08,.26))*k).toFixed(2)})`;p.s.style.opacity=1;p.s.style.top=`calc(50% + ${y.toFixed(3)}em)`;p.s.style.left=`${rnd(-14,4).toFixed(0)}%`;p.s.style.right=`${rnd(-22,-2).toFixed(0)}%`;p.s.style.background=pick(['currentColor','var(--sig-m)','var(--sig-a)'])},
 interlace(p,k){const part=k<1||Math.random()<.5,from=k<1?rnd(62,82):rnd(45,78),sh=rnd(.02,.07)*k;
  p.ia.style.opacity=1;p.ib.style.opacity=1;p.ia.style.transform=`translateX(${sh.toFixed(3)}em)`;p.ib.style.transform=`translateX(${(-sh*rnd(.4,1.2)).toFixed(3)}em)`;
  if(part){p.ia.style.clipPath=p.ib.style.clipPath=`inset(0 0 0 ${from.toFixed(0)}%)`;p.b.style.clipPath=`inset(0 ${(100-from).toFixed(0)}% 0 0)`}else p.b.style.opacity=0;
  if(Math.random()<.5)rgb(p,.8*k)},
 slice(p,k){const t=rnd(5,75),h=rnd(6,22)*(k<1?.6:1);p.b.style.clipPath=`polygon(0 0,100% 0,100% ${t}%,0 ${t}%,0 ${t+h}%,100% ${t+h}%,100% 100%,0 100%)`;
  p.m.style.opacity=1;p.m.style.color='currentColor';p.m.style.mixBlendMode='normal';p.m.style.clipPath=`inset(${t.toFixed(0)}% 0 ${(100-t-h).toFixed(0)}% 0)`;p.m.style.transform=`translateX(${(rnd(-.09,.09)*k).toFixed(3)}em)`;
  if(Math.random()<.6){p.a.style.opacity=1;p.a.style.clipPath=p.m.style.clipPath;p.a.style.transform=`translateX(${(rnd(-.12,.12)*k).toFixed(3)}em)`}},
 letters(p,k){const ls=[...p.b.querySelectorAll('i')].filter(l=>!l._entering);if(!ls.length)return;const n=1+Math.round(Math.random()*2*k);
  for(let j=0;j<n;j++){const l=Math.random()<.6?ls[ls.length-1-((Math.random()*Math.min(3,ls.length))|0)]:pick(ls);
   l.style.transform=`translate(${(rnd(-.06,.06)*k).toFixed(3)}em,${(rnd(-.09,.09)*k).toFixed(3)}em)`;const r=Math.random();if(r<.45)l.className=pick(['fm','fa']);else if(r<.7)l.style.opacity=.15}},
 strike(p,k){p.s.style.opacity=1;p.s.style.top=`${rnd(25,72).toFixed(0)}%`;p.s.style.left=`${rnd(-6,10).toFixed(0)}%`;p.s.style.right=`${rnd(-16,0).toFixed(0)}%`;if(Math.random()<.5)rgb(p,.7)}
};
const TYPES=['jump','jump','rgb','rgb','squash','interlace','interlace','slice','slice','strike','letters','letters'],SOFT=['rgb','rgb','slice','interlace','interlace','jump','letters','letters','letters'];
const LOG=window.__gl=[];
const GM=document.documentElement.dataset.glitch||new URLSearchParams(location.search).get('glitch')||'cb';
const CB=GM==='cb'||GM==='only',CB_ONLY=GM==='only';
function cbHit(el,k=1){if(OFF||!el)return;const p=parts(el);if(!p.b)return;const ls=[...p.b.querySelectorAll('i')].filter(l=>!l._entering&&l.textContent.trim());if(!ls.length)return;
 const ws=[...p.b.querySelectorAll('.wd')],nb=k>=1?1+((Math.random()*3)|0):1+((Math.random()*2)|0),pinkAt=Math.random()<.25?0:-1;
 let blk=k<1&&Math.random()<.5?[]:[...ls].sort(()=>Math.random()-.5).slice(0,nb);const sh=ws.map(()=>rnd(-.06,.06)*k),frames=3+((Math.random()*2)|0);let f=0;
 LOG.push([Math.round(performance.now()),el.dataset.text,'cb']);
 (function step(){reset(el);if(f++>=frames)return;
  if(f===frames&&Math.random()<.5)blk=blk.slice(0,Math.max(1,blk.length-1));
  blk.forEach((l,j)=>{l.classList.add('blk');if(j===pinkAt)l.style.setProperty('--bk','var(--accent)');if(j===0&&f>1&&Math.random()<.4){l.style.transformOrigin='0 50%';l.style.transform=`scaleX(${rnd(1.1,1.7).toFixed(2)})`}});
  if(ws.length>1)ws.forEach((w,j)=>w.style.transform=`translateX(${(sh[j]+rnd(-.012,.012)).toFixed(3)}em)`);else p.b.style.transform=`translateX(${(sh[0]+rnd(-.012,.012)).toFixed(3)}em)`;
  if(f===1)rgb(p,1.1*Math.max(k,.7));else if(f===2&&Math.random()<.6)rgb(p,.7*Math.max(k,.7));
  setTimeout(step,85+Math.random()*30)})()}
function burst(el,str=1,i=.72){if(OFF||!el)return;const cbp=CB&&(CB_ONLY||Math.random()<.34);el.classList.add('busy');clearTimeout(el._bt);el._bt=setTimeout(()=>el.classList.remove('busy'),cbp?480:260);if(cbp){cbHit(el,str);return}const strong=str>=1,n=strong?2+((Math.random()*3)|0):Math.max(2,1+Math.round(i*2)+((Math.random()*2)|0)-(Math.random()<.5?1:0));let k=0;
 LOG.push([Math.round(performance.now()),el.dataset.text,+str.toFixed(2)]);
 (function step(){reset(el);if(k++>=n)return;FX[pick(strong?TYPES:SOFT)](parts(el),str);setTimeout(step,30+Math.random()*30)})()}
function land(el,li=0,q=1){if(OFF)return;const ls=[...el.querySelectorAll('.base i')],sp=q<1?.55:1;el.classList.add('busy');clearTimeout(el._bt);el._bt=setTimeout(()=>el.classList.remove('busy'),(li*220+ls.length*45+1100)*sp);
 ls.forEach((l,i)=>{l._entering=true;const dx=rnd(-2.4,2.4)*q,dy=rnd(-1.6,1.2)*(li?3:1)*q;l.style.transform=`translate(${dx.toFixed(2)}em,${dy.toFixed(2)}em)`;l.style.opacity=0;
  const t0=(li*220+i*45+rnd(0,260)+(i>=ls.length-2?260:0))*sp;
  setTimeout(()=>{l.style.opacity=1;if(Math.random()<.5)l.className=pick(['fm','fa'])},t0);
  setTimeout(()=>{l.style.opacity=.15},t0+60*sp);
  setTimeout(()=>{l.style.opacity=1;l.style.transform=`translate(${(dx*.35).toFixed(2)}em,${(dy*.35).toFixed(2)}em)`},t0+120*sp);
  setTimeout(()=>{l.className='';l.style.transform=`translate(${(dx*.08).toFixed(2)}em,0)`},t0+(210+rnd(0,120))*sp);
  setTimeout(()=>{l.style.cssText='';l.className='';l._entering=false},t0+(330+rnd(0,160))*sp)})}
let E=.6,lastT=performance.now(),schedT=0;const FLOOR=.72,TAU=5000;
function energy(){const t=performance.now();E=FLOOR+(E-FLOOR)*Math.exp(-(t-lastT)/TAU);lastT=t;return E}
function charge(v){energy();E=Math.max(E,v);clearTimeout(schedT);if(!OFF)schedT=setTimeout(sched,rnd(260,520))}
function bloom(){}
/* ---------- residual: whatever glitch text is on screen; anything entering the screen breaks once ---------- */
function sched(){const i=energy();if(!OFF&&document.visibilityState==='visible'){const pool=GX.filter(onScreen);
 if(pool.length){const strong=Math.random()<(.04+.2*i),k=strong?1:Math.min(.99,(.3+.7*i)*rnd(.85,1.1));burst(pick(pool),k,i);if(Math.random()<i*.45){const e2=pick(pool);setTimeout(()=>burst(e2,Math.min(.99,k*.8),i),rnd(90,200))}}}
 if(!OFF)schedT=setTimeout(sched,Math.max(450,(6000-5300*i)*rnd(.6,1.4)))}
const gio=new IntersectionObserver(es=>{let k=0;es.forEach(e=>{if(e.isIntersecting&&!OFF&&!e.target.hasAttribute('data-land')){const g=e.target,d=k++*160;charge(.6);setTimeout(()=>burst(g,1),d);gio.unobserve(g)}})},{threshold:.6});
GX.forEach(g=>gio.observe(g));
const setHdr=()=>root.style.setProperty('--hdr',document.querySelector('.top').offsetHeight+'px');setHdr();addEventListener('resize',setHdr);
/* the page title lands letter by letter, then the residual starts */
document.fonts.ready.then(()=>{const t=document.querySelector('[data-land]');if(OFF||!t)return;if(document.documentElement.dataset.arrived==='blocks'){charge(1);return}E=1;land(t,0,.8);setTimeout(()=>burst(t,1),1100);setTimeout(()=>charge(1),1400)});


/* Jon Ander portfolio: the transition between pages (cover on leaving, reveal on arriving).
   Same pieces as the original proposal 1: colour liquid from the click, torn strips, scan lines, two flashes at the cut. */
(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const off=()=>{try{const v=localStorage.getItem('fx');if(v)return v==='off'}catch(e){}return RM};
// the liquid needs the goo filter on every page
if(!document.getElementById('goo')){const d=document.createElement('div');d.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="goo" x="-50%" y="-50%" width="200%" height="200%"><feTurbulence id="gt" type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="90" xChannelSelector="R" yChannelSelector="G"/></filter></svg>';document.body.appendChild(d.firstChild)}
const gt=document.getElementById('gt');
if(matchMedia('(hover: none)').matches&&gt){gt.parentElement.querySelector('feDisplacementMap').setAttribute('scale','45');gt.setAttribute('numOctaves','1')}
function layers(x,y){return ['a','m','i'].map(c=>{const d=document.createElement('div');d.className='fl '+c;d.style.left=x+'px';d.style.top=y+'px';document.body.appendChild(d);return d})}
function cover(x,y){return 2*Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y))/220+0.6}
function wobble(ms){if(!gt)return;const st=performance.now();const f=t=>{const p=(t-st)/ms;gt.setAttribute('baseFrequency',(0.012+Math.sin(p*9)*0.006).toFixed(4));gt.setAttribute('seed',String(4+((p*24)|0)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function fx(){const sl=document.createElement('div');sl.className='slices';sl.innerHTML='<i></i>'.repeat(14);const sc=document.createElement('div');sc.className='scan';const fl=document.createElement('div');fl.className='flash';document.body.append(sl,sc,fl);return{sl,sc,fl}}
function tear(o,dir){[...o.sl.children].forEach(b=>{const d=(Math.random()*160)|0;const from=dir>0?'translateX(-110%)':'translateX(0)';const to=dir>0?'translateX(0)':'translateX(110%)';b.animate([{transform:from},{transform:`translateX(${dir>0?-20+Math.random()*30:Math.random()*40}%)`,offset:.55},{transform:to}],{duration:420+Math.random()*260,delay:d,easing:'steps(7,end)',fill:'forwards'})});
 o.sc.animate(dir>0?[{opacity:0},{opacity:1,offset:.2},{opacity:.8}]:[{opacity:.8},{opacity:1,offset:.2},{opacity:.8,offset:.8},{opacity:0}],{duration:1100,fill:'forwards'})}
/* the white flash is out (no white light on this site); kept only for reference */
function flashAt(fl){fl.animate([{opacity:0},{opacity:.85,offset:.15},{opacity:0,offset:.3},{opacity:.6,offset:.55},{opacity:0,offset:.7},{opacity:0}],{duration:280,fill:'forwards'})}

/* page change in macroblocks (from the Circuit Breakers sequence): pieces of the page jump out of place, a cut to black,
   then the new page builds itself from displaced blocks of different sizes and settles. The default; ?transition=liquid brings back the old one */
const BLOCKS=!(document.documentElement.dataset.transition==='liquid'||new URLSearchParams(location.search).get('transition')==='liquid');
const rn=(a,b)=>a+Math.random()*(b-a);
/* most blocks fall on the page title, like the pieces of the logo in Circuit Breakers; the rest anywhere */
function focusBox(){const els=[...document.querySelectorAll('.page #nm,.page #rl,.page [data-land],.page .ctitle')].map(e=>e.getBoundingClientRect()).filter(b=>b.width&&b.bottom>0&&b.top<innerHeight);
 if(!els.length)return null;return els.reduce((a,b)=>({left:Math.min(a.left,b.left),top:Math.min(a.top,b.top),right:Math.max(a.right,b.right),bottom:Math.max(a.bottom,b.bottom)}))}
function rects(n,big){const u=16,out=[],F=focusBox();for(let i=0;i<n;i++){const w=u*Math.round(big?rn(8,34):rn(3,14)),h=u*Math.round(big?rn(2,10):rn(1,4));
 if(F&&Math.random()<.75)out.push({x:Math.round(rn(F.left-w*.3,F.right-w*.7)),y:Math.round(rn(F.top-h*.2,F.bottom-h*.8)),w,h});
 else out.push({x:Math.round(rn(-w*.2,innerWidth-w*.8)),y:Math.round(rn(innerHeight*.08,innerHeight*.9-h)),w,h})}return out}
/* a macroblock: a window onto the page, showing it displaced and sometimes scaled */
function frag(r,dx,dy,sc){const pg=document.querySelector('.page');const f=document.createElement('div');f.className='mb';Object.assign(f.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});
 if(pg){const c=pg.cloneNode(true);c.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));c.removeAttribute('id');c.querySelectorAll('.top').forEach(t=>t.style.position='relative');
  const ox=r.x+r.w/2-dx,oy=r.y+r.h/2-dy+scrollY;c.style.cssText=`position:absolute;margin:0;left:${(-r.x+dx).toFixed(0)}px;top:${(-r.y+dy-scrollY).toFixed(0)}px;width:${pg.offsetWidth}px;transform-origin:${ox.toFixed(0)}px ${oy.toFixed(0)}px;transform:scale(${sc.toFixed(2)})`;f.append(c)}
 document.body.append(f);return f}
function cut(){const k=document.createElement('div');k.className='mb-cut';document.body.append(k);return k}
function blockCover(done){rects(7,false).forEach(r=>frag(r,rn(-60,60),rn(-8,8),rn(1,1.25)));
 setTimeout(()=>{rects(10,true).forEach(r=>frag(r,rn(-90,90),rn(-12,12),rn(1,1.5)))},80);
 setTimeout(cut,170);setTimeout(done,300)}
function blockReveal(){const k=cut();const H=[];
 setTimeout(()=>{rects(6,true).forEach(r=>{const f=frag(r,rn(-120,120),rn(-20,20),rn(1.1,1.7));f.style.zIndex='2147483647';H.push(f)})},90);
 setTimeout(()=>{rects(10,false).forEach(r=>{const f=frag(r,rn(-50,50),rn(-6,6),rn(1,1.2));f.style.zIndex='2147483647';H.push(f)})},170);
 setTimeout(()=>{k.remove();H.forEach((f,i)=>{if(i>3)f.remove()})},250);
 setTimeout(()=>{document.querySelectorAll('.mb,.mb-cut').forEach(d=>d.remove());},330);
 setTimeout(()=>document.querySelectorAll('.mb,.mb-cut').forEach(d=>d.remove()),1200)}

/* leaving: cover the screen from the click point, then change page */
function go(url,x,y,mode){
 if(off()){location.href=url;return}
 if(mode?mode==='blocks':BLOCKS){blockCover(()=>{try{sessionStorage.setItem('arriveB','1')}catch(e){}location.href=url});return}
 x=x??innerWidth/2;y=y??innerHeight/2;
 const L=layers(x,y),s=cover(x,y);wobble(1100);
 L.forEach((d,i)=>d.animate([{transform:'translate(-50%,-50%) scale(0)'},{transform:`translate(-50%,-50%) scale(${s})`}],{duration:760,delay:i*55,easing:'cubic-bezier(.8,0,.15,1)',fill:'forwards'}));
 const o=fx();setTimeout(()=>tear(o,1),140);
 try{sessionStorage.setItem('arrive',JSON.stringify({x,y}))}catch(e){}
 setTimeout(()=>{location.href=url},1000)}

/* arriving: start covered, then the cut (two flashes) and the strips tear away */
function reveal(){let a=null;try{a=JSON.parse(sessionStorage.getItem('arrive')||'null');sessionStorage.removeItem('arrive')}catch(e){}
 if(!a)return false;if(off())return true;
 const o=fx();o.sl.querySelectorAll('i').forEach(b=>b.style.transform='translateX(0)');o.sc.style.opacity='.8';
 const L=layers(a.x,a.y),s=cover(a.x,a.y);L.forEach(d=>d.style.transform=`translate(-50%,-50%) scale(${s})`);
 /* timers, not animation frames, drive the reveal and the clean-up, so a throttled tab never stays covered */
 setTimeout(()=>{tear(o,-1);wobble(900);
  [...L].reverse().forEach((d,i)=>{const an=d.animate([{transform:`translate(-50%,-50%) scale(${s})`},{transform:'translate(-50%,-50%) scale(0)'}],{duration:700,delay:120+i*55,easing:'cubic-bezier(.8,0,.15,1)',fill:'forwards'});an.onfinish=()=>d.remove()})},30);
 setTimeout(()=>{document.querySelectorAll('.fl,.slices,.scan,.flash').forEach(d=>d.remove())},1500);return true}

/* arriving fresh (no transition before): the whole page breaks for a moment, then only the letters keep the residue */
function hit(){if(off())return;
 const o=fx();
 [...o.sl.children].forEach(b=>{const d=(Math.random()*140)|0;b.animate([{transform:'translateX(-110%)'},{transform:`translateX(${-30+Math.random()*40}%)`,offset:.45},{transform:'translateX(110%)'}],{duration:360+Math.random()*220,delay:d,easing:'steps(6,end)',fill:'forwards'})});
 o.sc.animate([{opacity:0},{opacity:.9,offset:.2},{opacity:.6,offset:.7},{opacity:0}],{duration:760,fill:'forwards'});
 const pg=document.querySelector('.page');
 if(pg)pg.animate([{transform:'none',clipPath:'none'},{transform:'translateX(-.7vw)',clipPath:'polygon(0 0,100% 0,100% 24%,0 24%,0 31%,100% 31%,100% 100%,0 100%)'},{transform:'translateX(.5vw)',clipPath:'none'},{transform:'translate(-.25vw,.2vh)',clipPath:'polygon(0 0,100% 0,100% 62%,0 62%,0 66%,100% 66%,100% 100%,0 100%)'},{transform:'none',clipPath:'none'}],{duration:300,delay:90,easing:'steps(4,end)'});
 setTimeout(()=>{o.sl.remove();o.sc.remove();o.fl.remove()},1100)}
let arrivedB=false;try{arrivedB=sessionStorage.getItem('arriveB')==='1';sessionStorage.removeItem('arriveB')}catch(e){}
/* arriving through blocks: the blocks are the entrance, so the title skips its letter fall */
if(arrivedB){if(!off()){document.documentElement.dataset.arrived='blocks';blockReveal()}}else if(!reveal())hit();

addEventListener('pageshow',e=>{if(e.persisted)document.querySelectorAll('.fl,.slices,.scan,.flash,.mb,.mb-cut').forEach(d=>d.remove())});

/* any link marked data-nav uses the transition */
document.addEventListener('click',e=>{const a=e.target.closest('a[data-nav]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;e.preventDefault();go(a.href,e.clientX||null,e.clientY||null)});
window.Nav={go,_test:{frag,rects,cut,blockReveal}};
})();


/* Movement while scrolling, built on his own engine (Jon 17/11: «hay que montar las animaciones que consideremos para acompañar scrolleo»).
   Nothing new: the block hit (cbHit) on section headings as they enter, his rip on images as they enter, the flow diagrams' steps
   appearing one by one without easing, and the project rule drawing itself in steps. One movement at a time (queue); off with the
   effects switch, `prefers-reduced-motion` or the .rm class. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const off=()=>(typeof OFF!=='undefined'&&OFF)||document.documentElement.classList.contains('rm')||reduce;
 let until=0;const queue=(dur,fn)=>{const now=performance.now(),start=Math.max(now,until);until=start+dur;setTimeout(fn,start-now)};
 let io1=null;
 /* 1 · section headings: his glitch structure, one block hit on entering. scan(root) also serves the home, which loads a case over itself */
 const scan=rootEl=>{
  rootEl.querySelectorAll('h2.chap').forEach(h=>{if(h.querySelector('.gx'))return;const t=h.textContent.trim();const sp=document.createElement('span');sp.className='gl gx cutx';sp.dataset.text=t;h.textContent='';h.appendChild(sp);if(typeof build==='function')build(sp)});
  if(!io1)io1=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io1.unobserve(e.target);if(off())return;const g=e.target.querySelector('.gx');if(g&&typeof cbHit==='function')queue(500,()=>cbHit(g,1))}),{threshold:.6});
  rootEl.querySelectorAll('h2.chap').forEach(h=>io1.observe(h));
 };
 window.__motionScan=scan;
 const ready=()=>scan(document);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();


/* Image zoom: opens a.zoom images in an in-page dialog that closes with the X, Escape or a click.
   On a narrow screen the image opens at its real size inside a scroller, so it can be read by panning. */
(function () {
  var links = document.querySelectorAll('a.zoom');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  var dlg = document.createElement('dialog');
  dlg.className = 'zoombox';
  dlg.setAttribute('aria-label', 'Enlarged image');
  dlg.innerHTML = '<button type="button" class="zoomclose" aria-label="Close">×</button><div class="zoomscroll"></div>';
  document.body.appendChild(dlg);
  var scroller = dlg.querySelector('.zoomscroll');
  var closeBtn = dlg.querySelector('.zoomclose');
  var img = null;
  links.forEach(function (a) {
    a.removeAttribute('target');
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      var inner = a.querySelector('img');
      img = document.createElement('img');
      /* data-zoom holds a 1x and a 2x file at the capture's real size, so every screen gets exact pixels */
      if (a.dataset.zoom) img.srcset = a.dataset.zoom;
      img.src = a.getAttribute('href');
      img.alt = inner ? inner.alt : '';
      var w = +(a.dataset.w || (inner && inner.getAttribute('width')) || 0);
      var narrow = window.matchMedia('(max-width: 48rem)').matches;
      if (w && (!narrow || w > window.innerWidth)) img.style.inlineSize = w + 'px';
      dlg.classList.toggle('pan', narrow);
      scroller.replaceChildren(img);
      dlg.showModal();
      scroller.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
    });
  });
  function close() { if (dlg.open) dlg.close(); }
  closeBtn.addEventListener('click', close);
  dlg.addEventListener('click', function (e) {
    if (e.target === closeBtn) return;
    if (dlg.classList.contains('pan') && e.target === img) return; /* on a phone a tap on the image is for panning, not closing */
    close();
  });
  dlg.addEventListener('close', function () { document.documentElement.style.overflow = ''; scroller.replaceChildren(); img = null; });
})();


/* About: the second photo starts level with the "Outside work" paragraph, whatever the text length */
(function(){var ps=document.querySelectorAll('.about-intro p'),im=document.querySelectorAll('.about-photos img');if(ps.length<2||im.length<2)return;
function align(){im[1].style.marginBlockStart='';if(im[0].getBoundingClientRect().left<ps[0].getBoundingClientRect().right)return;im[1].style.marginBlockStart=Math.max(0,ps[1].getBoundingClientRect().top-ps[0].getBoundingClientRect().top)+'px'}
align();addEventListener('resize',align);if(document.fonts)document.fonts.ready.then(align)})();
