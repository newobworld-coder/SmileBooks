const pages = [
  {type:"cover",image:"assets/cover.png",title:"Momo Can|Help!",sub:"A little robot book to read, repeat, and play",hot:{x:72,y:35,icon:"♥",label:"Wave hello to Momo",effect:"power",sound:"magic"}},
  {image:"assets/button.png",chapter:"Momo can help",title:"The robot can push a button.",text:"Click, click, click!",side:"left",job:"Say it with Momo",hot:{x:61,y:66,icon:"●",label:"Push the yellow button",effect:"power",sound:"power"}},
  {image:"assets/sweep.png",chapter:"Momo can help",title:"The robot can sweep the floor.",text:"Sweep, sweep, sweep!",side:"right",job:"Say it with Momo",hot:{x:40,y:79,icon:"✦",label:"Sweep the fluffy dust",effect:"practice",sound:"practice"}},
  {image:"assets/wash.png",chapter:"Momo can help",title:"The robot can wash the cups.",text:"Splash, splash, splash!",side:"left",job:"Say it with Momo",hot:{x:66,y:76,icon:"○",label:"Splash the bubbles",effect:"scan",sound:"scan"}},
  {image:"assets/water.png",chapter:"Momo can help",title:"The robot can water the flowers.",text:"Drip, drip, drip!",side:"right",job:"Say it with Momo",hot:{x:62,y:56,icon:"♧",label:"Water the happy flowers",effect:"garden",sound:"garden"}},
  {image:"assets/sort.png",chapter:"Momo can help",title:"The robot can sort the blocks.",text:"Plunk, plunk, plunk!",side:"left",job:"Say it with Momo",hot:{x:67,y:63,icon:"◆",label:"Sort the purple block",effect:"pattern",sound:"pattern"}},
  {image:"assets/dance.png",chapter:"Momo can play",title:"The robot can dance with friends.",text:"Beep, beep, beep!",side:"right",job:"Dance with Momo",hot:{x:50,y:49,icon:"♫",label:"Start the happy robot dance",effect:"finale",sound:"finale"}},
  {type:"end",image:"assets/cover.png",chapter:"All done",title:"Momo helped all day.",text:"Hooray, hooray, hooray!",job:"You helped, too!",hot:{x:72,y:35,icon:"★",label:"Cheer for Momo",effect:"finale",sound:"finale"}}
];

let current=0,animating=false,fxOn=true,readAloud=false,autoPlay=false,touchX=0,autoTimer=null,autoEpoch=0,toastTimer=null;
const found=new Set();
const book=document.querySelector("#book"),currentPage=document.querySelector("#currentPage"),underPage=document.querySelector("#underPage"),layer=document.querySelector("#interactionLayer");
const prevButton=document.querySelector("#prevButton"),nextButton=document.querySelector("#nextButton"),prevCorner=document.querySelector("#prevCorner"),nextCorner=document.querySelector("#nextCorner");
const dots=document.querySelector("#dots"),pageCount=document.querySelector("#pageCount"),foundCount=document.querySelector("#foundCount"),toast=document.querySelector("#toast"),coach=document.querySelector("#tapCoach");
const fxToggle=document.querySelector("#fxToggle"),readToggle=document.querySelector("#readToggle"),autoToggle=document.querySelector("#autoToggle"),voiceIcon=document.querySelector("#voiceIcon"),voiceLabel=document.querySelector("#voiceLabel"),narration=document.querySelector("#narrationAudio");

function pageMarkup(page,index){
  const hot=`<button class="hotspot ${found.has(index)?"found":""}" style="--x:${page.hot.x}%;--y:${page.hot.y}%" type="button" aria-label="${page.hot.label}" data-hotspot>${page.hot.icon}</button>`;
  if(page.type==="cover"){
    const [a,b]=page.title.split("|");
    return `<div class="cover" data-page><img class="page-image" src="${page.image}" alt="Friendly little robot Momo waves in a soft pastel playroom."><div class="shade"></div><div class="cover-copy"><p class="mini">READ · REPEAT · PLAY</p><h1>${a}<em>${b}</em></h1><p>${page.sub}</p><div class="cover-ribbon"><i></i><i></i><i></i></div></div>${hot}</div>`;
  }
  return `<div class="${page.side==="right"?"copy-right":""}" data-page><img class="page-image" src="${page.image}" alt="${page.title}"><div class="shade"></div><div class="story-copy"><span class="chapter">${page.chapter}</span><h2>${page.title}</h2><p>${page.text}</p><span class="job-pill">${page.job}</span></div>${hot}</div>`;
}
function render(target,index){target.innerHTML=pageMarkup(pages[index],index);if(target===currentPage)bindHotspot()}
function bindHotspot(){const hot=currentPage.querySelector("[data-hotspot]");if(hot)hot.addEventListener("click",triggerInteraction)}
function buildDots(){dots.innerHTML=pages.map((_,i)=>`<button class="dot" data-index="${i}" type="button" aria-label="Go to page ${i+1}"></button>`).join("");dots.addEventListener("click",e=>{const d=e.target.closest(".dot");if(d&&Number(d.dataset.index)!==current)turn(Number(d.dataset.index),Number(d.dataset.index)>current?1:-1)})}
function updateUI(){
  prevButton.disabled=prevCorner.disabled=current===0;nextButton.disabled=nextCorner.disabled=current===pages.length-1;
  prevButton.querySelector("em").textContent=current===1?"Cover":"Back";nextButton.querySelector("em").textContent=current===0?"Begin":current===pages.length-2?"Finish":"Next";
  pageCount.textContent=current===0?"Cover":current===pages.length-1?"The end":`Page ${current} of ${pages.length-2}`;
  [...dots.children].forEach((d,i)=>{d.classList.toggle("active",i===current);d.classList.toggle("discovered",found.has(i))});foundCount.textContent=found.size;
  fxToggle.setAttribute("aria-pressed",String(fxOn));readToggle.setAttribute("aria-pressed",String(readAloud));autoToggle.setAttribute("aria-pressed",String(autoPlay));autoToggle.setAttribute("aria-label",autoPlay?"Turn automatic page turning off":"Turn automatic page turning on");
  const playing=!narration.paused&&!narration.ended;voiceIcon.textContent=playing?"Ⅱ":"▶";voiceLabel.textContent=playing?"Pause":"Read";
}
function audioPath(i){return `audio/page-${String(i).padStart(2,"0")}.mp3`}
async function playNarration(i=current){narration.pause();narration.src=audioPath(i);narration.currentTime=0;readAloud=true;updateUI();try{await narration.play()}catch{readAloud=false;updateUI();if(autoPlay)scheduleAuto()}}
function pauseNarration(disable=false){narration.pause();if(disable)readAloud=false;updateUI()}
function clearAuto(){autoEpoch++;clearTimeout(autoTimer);autoTimer=null}
function scheduleAuto(){clearAuto();if(!autoPlay||current===pages.length-1)return;const token=autoEpoch,page=current,delay=readAloud&&narration.ended?1300:6500;autoTimer=setTimeout(()=>{if(token===autoEpoch&&autoPlay&&current===page&&!animating)next()},delay)}
function turn(target,direction){if(animating||target<0||target>=pages.length||target===current)return;animating=true;clearAuto();pauseNarration(false);layer.innerHTML="";render(underPage,target);pageFlipSound();currentPage.classList.add(direction>0?"turn-next":"turn-prev");setTimeout(()=>{current=target;render(currentPage,current);currentPage.className="page current-page";underPage.innerHTML="";animating=false;coach.classList.remove("hide");updateUI();if(readAloud)playNarration(current);else scheduleAuto()},940)}
function next(){turn(current+1,1)} function previous(){turn(current-1,-1)}

function ctx(){window.__audioCtx=window.__audioCtx||new(window.AudioContext||window.webkitAudioContext)();return window.__audioCtx}
function tone(freq,duration=.12,type="sine",delay=0,volume=.08){if(!fxOn)return;const c=ctx(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,c.currentTime+delay);g.gain.setValueAtTime(0,c.currentTime+delay);g.gain.linearRampToValueAtTime(volume,c.currentTime+delay+.015);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+delay+duration);o.connect(g).connect(c.destination);o.start(c.currentTime+delay);o.stop(c.currentTime+delay+duration+.03)}
function noise(duration=.18,volume=.025,filterFreq=1100){if(!fxOn)return;const c=ctx(),b=c.createBuffer(1,c.sampleRate*duration,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();f.type="bandpass";f.frequency.value=filterFreq;g.gain.value=volume;s.buffer=b;s.connect(f).connect(g).connect(c.destination);s.start()}
function pageFlipSound(){noise(.22,.035,1250);tone(240,.1,"sine",.08,.025)}
function playSfx(name){
  if(!fxOn)return;
  const map={magic:[[523,.2,"sine",0],[659,.2,"sine",.08],[880,.35,"sine",.17]],power:[[140,.12,"square",0],[310,.12,"square",.12],[720,.3,"sine",.25]],scan:[[440,.08,"sine",0],[650,.08,"sine",.11],[920,.18,"sine",.22]],pattern:[[392,.1,"sine",0],[523,.1,"sine",.1],[659,.2,"sine",.2]],compare:[[330,.12,"sine",0],[660,.18,"sine",.16]],oops:[[180,.14,"square",0],[120,.25,"sine",.16]],practice:[[440,.08,"square",0],[550,.08,"square",.1],[880,.25,"sine",.22]],garden:[[350,.12,"sine",0],[520,.15,"sine",.12],[780,.25,"sine",.24]],heart:[[160,.1,"sine",0],[130,.14,"sine",.15]],explore:[[150,.3,"sine",0],[600,.12,"square",.2],[900,.2,"sine",.36]],shield:[[330,.14,"sine",0],[495,.2,"sine",.12],[740,.35,"sine",.25]],finale:[[523,.25,"sine",0],[659,.25,"sine",.1],[784,.25,"sine",.2],[1046,.5,"sine",.32]]};
  (map[name]||map.magic).forEach(v=>tone(...v));if(name==="explore"||name==="garden")noise(.35,.018,name==="garden"?1800:500);
}
function particle(symbol,x,y,dx,dy,color,size=22,life=.85,delay=0,dot=false){const p=document.createElement("span");p.className=`particle${dot?" dot":""}`;p.textContent=symbol;p.style.cssText=`--x:${x}%;--y:${y}%;--dx:${dx}px;--dy:${dy}px;--color:${color};--size:${size}px;--life:${life}s;--spin:${Math.floor(Math.random()*260-130)}deg;animation-delay:${delay}s`;layer.appendChild(p);setTimeout(()=>p.remove(),(life+delay)*1000+100)}
function burst(symbols,count,x,y,palette,mode="up"){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,r=50+Math.random()*210,dx=Math.cos(a)*r,dy=mode==="up"?-(70+Math.random()*240):Math.sin(a)*r;particle(symbols[i%symbols.length],x,y,dx,dy,palette[i%palette.length],14+Math.random()*18,.75+Math.random()*.65,i*.018,symbols[0]==="")}}
function waves(x,y,color){for(let i=0;i<3;i++){const w=document.createElement("span");w.className="wave";w.style.cssText=`--x:${x}%;--y:${y}%;--color:${color}`;layer.appendChild(w)}setTimeout(()=>layer.innerHTML="",1500)}
function showToast(text){clearTimeout(toastTimer);toast.textContent=text;toast.classList.add("show");toastTimer=setTimeout(()=>toast.classList.remove("show"),1700)}
function triggerInteraction(){
  const h=pages[current].hot;found.add(current);this.classList.add("found");currentPage.classList.add("is-interacted");book.classList.remove("rumble","rush","launch","glow");void book.offsetWidth;playSfx(h.sound);coach.classList.add("hide");
  const x=h.x,y=h.y,colors=["#63f3df","#58c9ff","#ffcf57","#ff7b70","#ffffff"];
  if(h.effect==="power"){book.classList.add("glow");waves(x,y,"#63f3df");burst(["⚡","✦"],18,x,y,colors,"burst")}
  else if(h.effect==="scan"){waves(x,y,"#58c9ff");burst(["⌁","·"],22,x,y,["#58c9ff","#ffffff"],"burst")}
  else if(h.effect==="pattern")burst(["★","●","◆"],25,x,y,colors,"burst");
  else if(h.effect==="compare")burst(["↔","●","✦"],20,x,y,colors,"up");
  else if(h.effect==="oops"){book.classList.add("rumble");burst(["●","!","?"],22,x,y,["#ff6d63","#ffcf57","#ffffff"],"up")}
  else if(h.effect==="practice")burst(["★","→","✦"],26,x,y,["#63f3df","#ffcf57","#ffffff"],"up");
  else if(h.effect==="garden")burst(["✿","♧","·"],30,x,y,["#65e28a","#63f3df","#ffcf57","#ffffff"],"up");
  else if(h.effect==="care")burst(["♥","♡","✦"],24,x,y,["#ff7b86","#ffd2cb","#ffffff"],"up");
  else if(h.effect==="explore"){book.classList.add("rumble");burst(["◆","✦","·"],28,x,y,["#ff9c4a","#ffcf57","#ffffff"],"burst")}
  else if(h.effect==="shield"){book.classList.add("glow");waves(x,y,"#63f3df");burst(["◆","♥","✦"],26,x,y,colors,"burst")}
  else if(h.effect==="finale")burst(["★","✦","●","♥"],60,x,y,colors,"burst");
  else burst(["✦","●","◇","+"],34,x,y,colors,"burst");
  showToast(found.size===pages.length?"Every surprise discovered! ✦":`Surprise ${found.size} of ${pages.length} found!`);updateUI();setTimeout(()=>{book.classList.remove("rumble","rush","launch","glow");currentPage.classList.remove("is-interacted")},1100);
}

prevButton.addEventListener("click",previous);prevCorner.addEventListener("click",previous);nextButton.addEventListener("click",next);nextCorner.addEventListener("click",next);
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();next()}if(e.key==="ArrowLeft"){e.preventDefault();previous()}});
book.addEventListener("touchstart",e=>touchX=e.changedTouches[0].clientX,{passive:true});book.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>45)d<0?next():previous()},{passive:true});
fxToggle.addEventListener("click",()=>{fxOn=!fxOn;fxToggle.setAttribute("aria-label",fxOn?"Turn sound effects off":"Turn sound effects on");updateUI();if(fxOn)tone(660,.12)});
readToggle.addEventListener("click",()=>{if(!narration.paused&&!narration.ended){pauseNarration(true);autoPlay=false;clearAuto();updateUI()}else playNarration(current)});
autoToggle.addEventListener("click",()=>{autoPlay=!autoPlay;updateUI();showToast(autoPlay?"Auto story on":"Auto story off");if(autoPlay){if(!readAloud)playNarration(current);else scheduleAuto()}else clearAuto()});
narration.addEventListener("play",updateUI);narration.addEventListener("pause",updateUI);narration.addEventListener("ended",()=>{updateUI();scheduleAuto()});narration.addEventListener("error",()=>{readAloud=false;updateUI()});

for(let i=0;i<48;i++){const s=document.createElement("i");s.className="star";s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;--speed:${2+Math.random()*4}s;--delay:${-Math.random()*5}s`;document.querySelector("#stars").appendChild(s)}
pages.forEach(p=>{const i=new Image();i.src=p.image});pages.forEach((_,i)=>{const a=new Audio();a.preload="metadata";a.src=audioPath(i)});
buildDots();render(currentPage,current);updateUI();
