const pages = [
  {type:"cover",image:"assets/cover.png",title:"Haru Can|Be Anything!",sub:"A little book of very big dreams",hot:{x:79,y:25,icon:"✦",label:"Spin Haru's dream jobs",effect:"dream",sound:"magic"}},
  {image:"assets/cover.png",chapter:"A big question",title:"What can I be?",text:"Haru has many dreams.",side:"right",job:"Tap a dream",hot:{x:50,y:27,icon:"?",label:"Open a dream bubble",effect:"dream",sound:"magic"}},
  {image:"assets/firefighter.png",chapter:"Dream job 01",title:"A brave firefighter!",text:"I help. Splash!",job:"Firefighter · 消防士",hot:{x:91,y:72,icon:"💧",label:"Spray the fire hose",effect:"water",sound:"water"}},
  {image:"assets/train.png",chapter:"Dream job 02",title:"A speedy train driver!",text:"All aboard. Right on time!",side:"right",job:"Train driver · 運転士",hot:{x:10,y:84,icon:"●",label:"Turn the signal green",effect:"train",sound:"train"}},
  {image:"assets/chef.png",chapter:"Dream job 03",title:"A careful sushi chef!",text:"Roll. Press. Smile. Yum!",job:"Sushi chef · 寿司職人",hot:{x:89,y:82,icon:"🍣",label:"Spin the sushi plate",effect:"sushi",sound:"pop"}},
  {image:"assets/astronaut.png",chapter:"Dream job 04",title:"A curious astronaut!",text:"Up, up, up. Hello, stars!",side:"right",job:"Astronaut · 宇宙飛行士",hot:{x:18,y:86,icon:"🚀",label:"Launch the rocket",effect:"rocket",sound:"rocket"}},
  {image:"assets/vet.png",chapter:"Dream job 05",title:"A gentle vet!",text:"Easy, little pup. I will help.",job:"Veterinarian · 獣医",hot:{x:90,y:85,icon:"♥",label:"Hear the puppy's happy heart",effect:"hearts",sound:"heart"}},
  {image:"assets/architect.png",chapter:"Dream job 06",title:"A clever architect!",text:"I draw a home. Then we build!",side:"right",job:"Architect · 建築家",hot:{x:10,y:83,icon:"▦",label:"Build the little city",effect:"build",sound:"build"}},
  {image:"assets/taiko.png",chapter:"Dream job 07",title:"A bold taiko player!",text:"Boom! Boom! Feel the beat!",job:"Taiko performer · 太鼓奏者",hot:{x:64,y:61,icon:"●",label:"Play the big taiko drum",effect:"drum",sound:"drum"}},
  {image:"assets/marine.png",chapter:"Dream job 08",title:"A kind ocean scientist!",text:"Hello, sea friends. I keep your home clean.",side:"right",job:"Marine biologist · 海洋学者",hot:{x:90,y:83,icon:"◌",label:"Send a sonar bubble",effect:"bubbles",sound:"bubbles"}},
  {image:"assets/inventor.png",chapter:"Dream job 09",title:"A bright inventor!",text:"Click. Whirr. My robot works!",side:"right",job:"Inventor · 発明家",hot:{x:13,y:82,icon:"⚡",label:"Wake up Haru's robot",effect:"robot",sound:"robot"}},
  {type:"end",image:"assets/cover.png",chapter:"The biggest dream",title:"So many jobs. One big heart.",text:"Haru can grow into anything.",job:"And so can you.",hot:{x:50,y:25,icon:"★",label:"Celebrate every dream",effect:"finale",sound:"finale"}}
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
    return `<div class="cover" data-page><img class="page-image" src="${page.image}" alt="Haru stands proudly while many dream jobs swirl around him."><div class="shade"></div><div class="cover-copy"><p class="mini">A STORY FROM JAPAN</p><h1>${a}<em>${b}</em></h1><p>${page.sub}</p><div class="cover-ribbon"><i></i><i></i><i></i></div></div>${hot}</div>`;
  }
  return `<div class="${page.side==="right"?"copy-right":""}" data-page><img class="page-image" src="${page.image}" alt="${page.title}"><div class="shade"></div><div class="story-copy"><span class="chapter">${page.chapter}</span><h2>${page.title}</h2><p>${page.text}</p><span class="job-pill">${page.job}</span></div>${hot}</div>`;
}
function render(target,index){target.innerHTML=pageMarkup(pages[index],index);if(target===currentPage)bindHotspot()}
function bindHotspot(){const hot=currentPage.querySelector("[data-hotspot]");if(hot)hot.addEventListener("click",triggerInteraction)}
function buildDots(){dots.innerHTML=pages.map((_,i)=>`<button class="dot" data-index="${i}" type="button" aria-label="Go to page ${i+1}"></button>`).join("");dots.addEventListener("click",e=>{const d=e.target.closest(".dot");if(d&&Number(d.dataset.index)!==current)turn(Number(d.dataset.index),Number(d.dataset.index)>current?1:-1)})}
function updateUI(){prevButton.disabled=prevCorner.disabled=current===0;nextButton.disabled=nextCorner.disabled=current===pages.length-1;prevButton.querySelector("em").textContent=current===1?"Cover":"Back";nextButton.querySelector("em").textContent=current===0?"Begin":current===pages.length-2?"Finish":"Next";pageCount.textContent=current===0?"Cover":current===pages.length-1?"The end":`Page ${current} of ${pages.length-2}`;[...dots.children].forEach((d,i)=>{d.classList.toggle("active",i===current);d.classList.toggle("discovered",found.has(i))});foundCount.textContent=found.size;fxToggle.setAttribute("aria-pressed",String(fxOn));readToggle.setAttribute("aria-pressed",String(readAloud));autoToggle.setAttribute("aria-pressed",String(autoPlay));autoToggle.setAttribute("aria-label",autoPlay?"Turn automatic page turning off":"Turn automatic page turning on");const playing=!narration.paused&&!narration.ended;voiceIcon.textContent=playing?"Ⅱ":"▶";voiceLabel.textContent=playing?"Pause":"Read"}
function audioPath(i){return `audio/page-${String(i).padStart(2,"0")}.mp3`}
async function playNarration(i=current){narration.pause();narration.src=audioPath(i);narration.currentTime=0;readAloud=true;updateUI();try{await narration.play()}catch{readAloud=false;updateUI();if(autoPlay)scheduleAuto()}}
function pauseNarration(disable=false){narration.pause();if(disable)readAloud=false;updateUI()}
function clearAuto(){autoEpoch++;clearTimeout(autoTimer);autoTimer=null}
function scheduleAuto(){clearAuto();if(!autoPlay||current===pages.length-1)return;const token=autoEpoch,page=current,delay=readAloud&&narration.ended?1300:6500;autoTimer=setTimeout(()=>{if(token===autoEpoch&&autoPlay&&current===page&&!animating)next()},delay)}
function turn(target,direction){if(animating||target<0||target>=pages.length||target===current)return;animating=true;clearAuto();pauseNarration(false);layer.innerHTML="";render(underPage,target);pageFlipSound();currentPage.classList.add(direction>0?"turn-next":"turn-prev");setTimeout(()=>{current=target;render(currentPage,current);currentPage.className="page current-page";underPage.innerHTML="";animating=false;coach.classList.remove("hide");updateUI();if(readAloud)playNarration(current);else scheduleAuto()},940)}
function next(){turn(current+1,1)}function previous(){turn(current-1,-1)}

function ctx(){window.__audioCtx=window.__audioCtx||new(window.AudioContext||window.webkitAudioContext)();return window.__audioCtx}
function tone(freq,duration=.12,type="sine",delay=0,volume=.08){if(!fxOn)return;const c=ctx(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,c.currentTime+delay);g.gain.setValueAtTime(0,c.currentTime+delay);g.gain.linearRampToValueAtTime(volume,c.currentTime+delay+.015);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+delay+duration);o.connect(g).connect(c.destination);o.start(c.currentTime+delay);o.stop(c.currentTime+delay+duration+.03)}
function noise(duration=.18,volume=.025,filterFreq=1100){if(!fxOn)return;const c=ctx(),b=c.createBuffer(1,c.sampleRate*duration,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();f.type="bandpass";f.frequency.value=filterFreq;g.gain.value=volume;s.buffer=b;s.connect(f).connect(g).connect(c.destination);s.start()}
function pageFlipSound(){noise(.22,.035,1250);tone(240,.1,"sine",.08,.025)}
function playSfx(name){if(!fxOn)return;const map={magic:[[523,.2,"sine",0],[659,.2,"sine",.08],[880,.35,"sine",.17]],water:[[180,.3,"sine",0]],train:[[180,.15,"square",0],[240,.18,"square",.17],[360,.28,"sine",.34]],pop:[[520,.09,"sine",0],[690,.1,"sine",.1]],rocket:[[90,.5,"sawtooth",0],[190,.55,"sine",.18]],heart:[[160,.1,"sine",0],[130,.14,"sine",.15]],build:[[420,.06,"square",0],[330,.06,"square",.12],[520,.1,"sine",.24]],drum:[[75,.42,"sine",0],[58,.5,"sine",.18]],bubbles:[[650,.08,"sine",0],[850,.08,"sine",.12],[1050,.12,"sine",.24]],robot:[[310,.08,"square",0],[470,.08,"square",.1],[720,.14,"sine",.2]],finale:[[523,.25,"sine",0],[659,.25,"sine",.1],[784,.25,"sine",.2],[1046,.5,"sine",.32]]};(map[name]||map.magic).forEach(v=>tone(...v));if(name==="water"||name==="rocket")noise(.45,.03,name==="water"?1800:450)}
function particle(symbol,x,y,dx,dy,color,size=22,life=.85,delay=0,dot=false){const p=document.createElement("span");p.className=`particle${dot?" dot":""}`;p.textContent=symbol;p.style.cssText=`--x:${x}%;--y:${y}%;--dx:${dx}px;--dy:${dy}px;--color:${color};--size:${size}px;--life:${life}s;--spin:${Math.floor(Math.random()*260-130)}deg;animation-delay:${delay}s`;layer.appendChild(p);setTimeout(()=>p.remove(),(life+delay)*1000+100)}
function burst(symbols,count,x,y,palette,mode="up"){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,r=50+Math.random()*210,dx=Math.cos(a)*r,dy=mode==="up"?-(70+Math.random()*240):Math.sin(a)*r;particle(symbols[i%symbols.length],x,y,dx,dy,palette[i%palette.length],14+Math.random()*18,.75+Math.random()*.65,i*.018,symbols[0]==="")}}
function waves(x,y,color){for(let i=0;i<3;i++){const w=document.createElement("span");w.className="wave";w.style.cssText=`--x:${x}%;--y:${y}%;--color:${color}`;layer.appendChild(w)}setTimeout(()=>layer.innerHTML="",1500)}
function showToast(text){clearTimeout(toastTimer);toast.textContent=text;toast.classList.add("show");toastTimer=setTimeout(()=>toast.classList.remove("show"),1700)}
function triggerInteraction(){const p=pages[current],h=p.hot;found.add(current);this.classList.add("found");currentPage.classList.add("is-interacted");book.classList.remove("rumble","rush","launch","glow");void book.offsetWidth;playSfx(h.sound);coach.classList.add("hide");const x=h.x,y=h.y,colors=["#ffd657","#4de0d0","#f06c5e","#ffffff"];
  if(h.effect==="water")burst(["",""] ,28,x,y,["#70e8ff","#ffffff"],"up");
  else if(h.effect==="train"){book.classList.add("rush");burst(["➜"],15,x,y,["#7fe8de","#ffffff"],"burst")}
  else if(h.effect==="sushi")burst(["🍣","✦"],18,x,y,colors,"up");
  else if(h.effect==="rocket"){book.classList.add("launch");burst(["★","✦"],25,x,y,colors,"up")}
  else if(h.effect==="hearts")burst(["♥","♡"],20,x,y,["#ff7982","#ffd2cb","#ffffff"],"up");
  else if(h.effect==="build")burst(["■","▦","▲"],22,x,y,["#ffd657","#4de0d0","#f06c5e","#357bea"],"up");
  else if(h.effect==="drum"){book.classList.add("rumble");waves(x,y,"#ffd657")}
  else if(h.effect==="bubbles")burst(["○","◌","◦"],28,x,y,["#8af5ff","#ffffff","#4de0d0"],"up");
  else if(h.effect==="robot"){book.classList.add("glow");burst(["⚡","✦","+"],24,x,y,["#ffd657","#4de0d0","#ffffff"],"burst")}
  else if(h.effect==="finale")burst(["★","✦","●"],55,x,y,colors,"burst");
  else burst(["✦","★","●"],30,x,y,colors,"burst");
  showToast(found.size===pages.length?"Every dream discovered! ✦":`Surprise ${found.size} of ${pages.length} found!`);updateUI();setTimeout(()=>{book.classList.remove("rumble","rush","launch","glow");currentPage.classList.remove("is-interacted")},1100)}

prevButton.addEventListener("click",previous);prevCorner.addEventListener("click",previous);nextButton.addEventListener("click",next);nextCorner.addEventListener("click",next);
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();next()}if(e.key==="ArrowLeft"){e.preventDefault();previous()}});
book.addEventListener("touchstart",e=>touchX=e.changedTouches[0].clientX,{passive:true});book.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>45)d<0?next():previous()},{passive:true});
fxToggle.addEventListener("click",()=>{fxOn=!fxOn;fxToggle.setAttribute("aria-label",fxOn?"Turn sound effects off":"Turn sound effects on");updateUI();if(fxOn)tone(660,.12)});
readToggle.addEventListener("click",()=>{if(!narration.paused&&!narration.ended){pauseNarration(true);autoPlay=false;clearAuto();updateUI()}else playNarration(current)});
autoToggle.addEventListener("click",()=>{autoPlay=!autoPlay;updateUI();showToast(autoPlay?"Auto story on":"Auto story off");if(autoPlay){if(!readAloud)playNarration(current);else scheduleAuto()}else clearAuto()});
narration.addEventListener("play",updateUI);narration.addEventListener("pause",updateUI);narration.addEventListener("ended",()=>{updateUI();scheduleAuto()});narration.addEventListener("error",()=>{readAloud=false;updateUI()});

for(let i=0;i<42;i++){const s=document.createElement("i");s.className="star";s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;--speed:${2+Math.random()*4}s;--delay:${-Math.random()*5}s`;document.querySelector("#stars").appendChild(s)}
pages.forEach(p=>{const i=new Image();i.src=p.image});pages.forEach((_,i)=>{const a=new Audio();a.preload="metadata";a.src=audioPath(i)});
buildDots();render(currentPage,current);updateUI();
