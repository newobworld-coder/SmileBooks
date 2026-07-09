<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Smile Books</title>
<meta name="description" content="A little library of stories. Tap a book to read." />
<meta name="theme-color" content="#FFF1F7" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='26' fill='%23FFF1F7'/%3E%3Cpath d='M50 24l7 15 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2z' fill='%23FFB5D2' stroke='%23E39CBF' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E" />
<style>
  :root{
    --sky-top:#FFF1F7; --sky-mid:#EEF0FF; --sky-bot:#EAF9F3;
    --ink:#5A4A6A; --ink-soft:#9A8FB0; --ink-faint:#BCB3CE;
    --card:#FFFFFF; --stroke:rgba(120,100,150,.14);
    --pink:#FFB5D2; --peach:#FFD8B5; --butter:#FFF0B5; --mint:#B5F0D8; --sky:#B5DCFF; --lav:#D8C4FF;
    --wood:#EBCBA2; --wood-dk:#D8AE7E; --wood-edge:#C79A6A;
    --ease:cubic-bezier(.34,1.3,.5,1);
    --ease-soft:cubic-bezier(.22,.61,.36,1);
  }
  *{box-sizing:border-box}
  html,body{margin:0;min-height:100%}
  body{
    font-family:Nunito,system-ui,sans-serif; color:var(--ink); overflow-x:hidden; min-height:100dvh;
    background:linear-gradient(170deg,var(--sky-top) 0%, var(--sky-mid) 46%, var(--sky-bot) 100%);
    background-attachment:fixed; -webkit-font-smoothing:antialiased;
  }
  #sky{position:fixed;inset:0;z-index:0;display:block}
  .twinkles{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
  .tw{position:absolute;color:#fff;opacity:0;animation:tw 4s ease-in-out infinite}
  @keyframes tw{0%,100%{opacity:0;transform:scale(.6)}50%{opacity:.9;transform:scale(1)}}
  .wrap{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 clamp(18px,4vw,40px)}

  .topbar{display:flex;align-items:center;gap:12px;padding:22px 0 6px}
  .brand{display:flex;align-items:center;gap:12px}
  .brand .mark{width:44px;height:44px;border-radius:15px;display:grid;place-items:center;
    background:radial-gradient(120% 120% at 30% 20%, #fff, #FFE6F1 70%);border:1px solid var(--stroke);
    box-shadow:0 8px 20px -10px rgba(180,120,160,.5)}
  .brand .mark svg{width:26px;height:26px}
  .brand b{font-family:Fredoka;font-weight:600;font-size:1.12rem;letter-spacing:.01em;color:var(--ink)}
  .brand span{display:block;font-family:Nunito;font-weight:700;font-size:.6rem;letter-spacing:.32em;color:var(--ink-soft);margin-top:2px}

  .hero{padding:clamp(26px,6vw,64px) 0 clamp(14px,3vw,30px);text-align:center}
  .eyebrow{font-family:Nunito;font-weight:700;font-size:.72rem;letter-spacing:.36em;text-transform:uppercase;
    color:#E39CBF;display:inline-flex;align-items:center;gap:12px;margin:0 0 16px}
  .eyebrow::before,.eyebrow::after{content:"✦";color:var(--lav);font-size:.9rem}
  h1{font-family:Fredoka;font-weight:600;margin:0;line-height:1;
    font-size:clamp(2.6rem,9vw,5.4rem);letter-spacing:-.01em;color:var(--ink)}
  h1 .g{background:linear-gradient(100deg,#FF9EC8 0%, #B79BFF 52%, #7FC8FF 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .tagline{margin:18px auto 0;max-width:40ch;color:var(--ink-soft);font-size:clamp(1rem,2vw,1.16rem);font-weight:600}
  .count{margin-top:16px;font-family:Fredoka;font-weight:500;font-size:.9rem;color:var(--ink-soft)}
  .count b{color:var(--ink)}

  .controls{display:flex;justify-content:center;margin:22px 0 10px}
  .search{position:relative;width:min(340px,90vw)}
  .search input{width:100%;font-family:Nunito;font-weight:600;font-size:.95rem;color:var(--ink);
    background:rgba(255,255,255,.75);border:2px solid #fff;border-radius:999px;padding:12px 16px 12px 42px;outline:none;
    box-shadow:0 10px 26px -14px rgba(150,110,150,.5);transition:.2s}
  .search input::placeholder{color:var(--ink-faint)}
  .search input:focus{border-color:var(--pink);background:#fff}
  .search svg{position:absolute;left:15px;top:50%;transform:translateY(-50%);width:17px;height:17px;color:var(--ink-faint)}

  /* -------- shelves -------- */
  #shelves{padding:22px 0 90px}
  .shelf{position:relative;margin-bottom:clamp(30px,4vw,52px)}
  .books{display:flex;flex-wrap:nowrap;justify-content:center;align-items:flex-end;
    gap:clamp(20px,3vw,40px);padding:0 8px 20px}
  .plank{position:absolute;left:2%;right:2%;bottom:0;height:20px;border-radius:6px 6px 8px 8px;
    background:linear-gradient(180deg,var(--wood) 0%,var(--wood-dk) 60%,var(--wood-edge) 100%);
    box-shadow:0 16px 30px -14px rgba(150,110,80,.55), inset 0 2px 0 rgba(255,255,255,.4);}
  .plank::before{content:"";position:absolute;left:0;right:0;top:-3px;height:3px;border-radius:3px;
    background:linear-gradient(180deg,#F6E2C8,transparent)}

  .book-slot{perspective:1000px;display:flex;flex-direction:column;align-items:center;flex:none;
    opacity:0;transform:translateY(18px);animation:rise .7s var(--ease) forwards}
  @keyframes rise{to{opacity:1;transform:none}}
  .book-3d{position:relative;width:100%;aspect-ratio:3/4;transform-style:preserve-3d;
    transform:rotateY(-24deg);transition:transform .55s var(--ease);cursor:pointer;will-change:transform}
  .cover{position:absolute;inset:0;border-radius:5px 13px 13px 5px;overflow:hidden;background:#fff;
    box-shadow:-2px 6px 16px -4px rgba(90,60,90,.4), inset 3px 0 0 rgba(0,0,0,.05), inset 7px 0 8px -6px rgba(0,0,0,.12);
    transition:box-shadow .5s var(--ease-soft)}
  .cover img{width:100%;height:100%;object-fit:cover;display:block}
  .cover.proc{display:grid;place-items:center;padding:12px;text-align:center;background:var(--c,#FFB5D2);
    background:linear-gradient(160deg,var(--c,#FFB5D2), color-mix(in srgb,var(--c,#FFB5D2) 62%, #fff))}
  .cover.proc .doodle{position:absolute;font-size:1.2rem;opacity:.7}
  .cover.proc .d1{top:10px;left:12px}.cover.proc .d2{bottom:12px;right:12px}
  .cover.proc .proc-t{font-family:Fredoka;font-weight:600;font-size:clamp(.8rem,1.5vw,1.05rem);line-height:1.12;
    color:#6a4a63;text-shadow:0 1px 0 rgba(255,255,255,.5);word-break:break-word}
  .edge{position:absolute;top:3%;right:0;height:94%;width:16px;transform-origin:100% 50%;
    transform:rotateY(90deg);border-radius:0 2px 2px 0;
    background:repeating-linear-gradient(90deg,#fff 0 2px,#efe7de 2px 4px)}
  .badge-audio{position:absolute;z-index:3;top:9px;right:9px;width:26px;height:26px;border-radius:50%;
    display:grid;place-items:center;font-size:.8rem;background:rgba(255,255,255,.9);
    box-shadow:0 3px 8px -2px rgba(90,60,90,.4)}
  .ground{position:absolute;left:8%;right:8%;bottom:-2px;height:12px;border-radius:50%;z-index:-1;
    background:radial-gradient(closest-side,rgba(90,60,90,.28),transparent);
    transform:translateZ(-8px) scaleY(.5);opacity:.5;transition:.5s var(--ease-soft)}

  .book-slot:hover{z-index:5}
  .book-slot:hover .book-3d{transform:rotateY(0deg) translateY(-16px) scale(1.06)}
  .book-slot:hover .cover{box-shadow:-2px 22px 34px -10px rgba(120,80,120,.5)}
  .book-slot:hover .ground{opacity:.7;transform:translateZ(-8px) scaleY(.5) scale(1.15)}
  .book-slot:focus-visible{outline:none}
  .book-slot:focus-visible .book-3d{transform:rotateY(0deg) translateY(-10px) scale(1.04)}

  .book-title{margin-top:14px;font-family:Fredoka;font-weight:500;font-size:.92rem;color:var(--ink);
    text-align:center;line-height:1.15;max-width:15ch}
  .book-author{font-family:Nunito;font-weight:600;font-size:.72rem;color:var(--ink-soft);margin-top:2px;text-align:center}

  .empty{text-align:center;padding:70px 22px;max-width:520px;margin:0 auto;
    background:rgba(255,255,255,.6);border:2px dashed #FAD3E4;border-radius:28px}
  .empty .big{font-size:2.4rem}
  .empty h3{font-family:Fredoka;font-weight:600;font-size:1.4rem;margin:10px 0 8px;color:var(--ink)}
  .empty p{color:var(--ink-soft);font-weight:600;margin:0;line-height:1.5}
  .empty code{background:#fff;padding:2px 7px;border-radius:7px;font-family:Nunito;font-weight:700;color:#C77AA0}

  footer{text-align:center;padding:20px 0 40px;color:var(--ink-faint);font-weight:600;font-size:.8rem}

  @media (max-width:520px){
    .brand span{display:none}
    .book-title{font-size:.82rem}
  }
  @media (prefers-reduced-motion:reduce){
    *{animation-duration:.001ms!important;transition-duration:.06s!important}
    .book-slot{opacity:1;transform:none}
    .book-3d{transform:rotateY(-12deg)}
  }
  :focus-visible{outline:3px solid var(--lav);outline-offset:3px;border-radius:10px}
</style>
</head>
<body>
<canvas id="sky"></canvas>
<div class="twinkles" id="twinkles" aria-hidden="true"></div>

<div class="wrap">
  <header class="topbar">
    <div class="brand">
      <span class="mark"><svg viewBox="0 0 100 100"><path d="M50 26l6.5 14 15 2-11 10.5 2.8 15L50 74.5 36.7 81.5l2.8-15-11-10.5 15-2z" fill="#FFB5D2" stroke="#E39CBF" stroke-width="3" stroke-linejoin="round"/></svg></span>
      <div><b class="brand-name">Smile Books</b><span>STORY SHELF</span></div>
    </div>
  </header>

  <section class="hero">
    <p class="eyebrow">Story time</p>
    <h1><span class="g">Smile Books</span></h1>
    <p class="tagline">A little library of stories. Tap a book to read.</p>
    <p class="count" id="count"></p>
  </section>

  <div class="controls">
    <div class="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/></svg>
      <input id="search" type="search" placeholder="Find a story…" autocomplete="off" aria-label="Search books" />
    </div>
  </div>

  <main id="shelves"></main>

  <footer>Made with love · Smile Club</footer>
</div>

<script src="catalog.js"></script>
<script type="module">
/* =====================================================================
 * SMILE BOOKS — a pastel bookshelf. Catalog is generated at build time
 * by build-catalog.mjs and loaded from catalog.js as window.__BOOKS__.
 * Each book is a folder under books/ (its index.html + audio/images).
 * ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;

const DATA = (window.__BOOKS__ && typeof window.__BOOKS__ === "object") ? window.__BOOKS__ : { books: [] };
const state = { query: "" };
const DOODLES = ["✦","♥","★","✿","☾","✚","❀","✧"];

if(DATA.title){ $(".brand-name").textContent = DATA.title; $("h1 .g").textContent = DATA.title; document.title = DATA.title; }
if(DATA.tagline){ $(".tagline").textContent = DATA.tagline; }

function filtered(){
  const q = state.query.trim().toLowerCase();
  if(!q) return DATA.books;
  return DATA.books.filter(b => (`${b.title} ${b.author} ${b.description}`).toLowerCase().includes(q));
}

function renderCount(){
  const n = DATA.books.length;
  $("#count").innerHTML = n ? `<b>${n}</b> ${n===1?"story":"stories"} on the shelf` : "";
}

function coverInner(b){
  if(b.cover) return `<img loading="lazy" src="${esc(b.cover)}" alt="Cover of ${esc(b.title)}" />`;
  const d1 = DOODLES[(b.title.charCodeAt(0)||0) % DOODLES.length];
  const d2 = DOODLES[(b.title.length) % DOODLES.length];
  return `<span class="doodle d1">${d1}</span><span class="doodle d2">${d2}</span><span class="proc-t">${esc(b.title)}</span>`;
}

function bookHTML(b, i, w){
  const proc = b.cover ? "" : "proc";
  const delay = Math.min(i*60, 640);
  return `<div class="book-slot" data-id="${esc(b.id)}" tabindex="0" role="button"
       aria-label="Open ${esc(b.title)}" style="width:${w}px;animation-delay:${delay}ms">
    <div class="book-3d">
      <div class="ground"></div>
      <div class="edge"></div>
      <div class="cover ${proc}" style="--c:${esc(b.color)}">
        ${coverInner(b)}
        ${b.audio ? `<span class="badge-audio" title="Has sound">🔊</span>` : ""}
      </div>
    </div>
    <div class="book-title">${esc(b.title)}</div>
    ${b.author ? `<div class="book-author">${esc(b.author)}</div>` : ""}
  </div>`;
}

function emptyState(){
  return `<div class="empty"><div class="big">📚✨</div>
    <h3>${state.query ? "No stories found" : "The shelf is waiting"}</h3>
    <p>${state.query
      ? "Try a different word — or clear the search to see every book."
      : `Add a folder inside <code>books/</code> with the book's <code>index.html</code> and its sounds, then it'll hop onto the shelf here.`}</p></div>`;
}

function render(){
  renderCount();
  const shelves = $("#shelves");
  const list = filtered();
  if(!list.length){ shelves.innerHTML = emptyState(); return; }
  const cw = shelves.clientWidth || 1000;
  const w = cw < 520 ? 104 : (cw < 820 ? 130 : 150);
  const gap = cw < 520 ? 20 : 40;
  const perRow = Math.max(1, Math.floor((cw + gap) / (w + gap)));
  let html = "";
  for(let i = 0; i < list.length; i += perRow){
    const row = list.slice(i, i + perRow);
    html += `<div class="shelf"><div class="books">` +
      row.map((b, j) => bookHTML(b, i + j, w)).join("") +
      `</div><div class="plank"></div></div>`;
  }
  shelves.innerHTML = html;

  $$(".book-slot", shelves).forEach(slot => {
    const b = DATA.books.find(x => x.id === slot.dataset.id);
    const open = () => launch(b);
    slot.addEventListener("click", open);
    slot.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); } });
  });
}

function launch(b){ if(b?.path) window.open(b.path, "_blank", "noopener"); }

/* re-flow shelves when the width changes */
let ro;
function watchResize(){
  const shelves = $("#shelves");
  let last = shelves.clientWidth, t;
  ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => {
    if(Math.abs(shelves.clientWidth - last) > 24){ last = shelves.clientWidth; render(); }
  }, 140); });
  ro.observe(shelves);
}

let searchT;
$("#search").addEventListener("input", e => { clearTimeout(searchT); searchT = setTimeout(() => { state.query = e.target.value; render(); }, 130); });

/* sprinkle a few CSS twinkles (charm even without WebGL) */
(function twinkle(){
  const box = $("#twinkles"); if(reduced) return;
  const chars = ["✦","·","✧","star"];
  for(let i=0;i<16;i++){
    const s = document.createElement("span"); s.className = "tw";
    s.textContent = "✦"; s.style.left = Math.random()*100+"%"; s.style.top = Math.random()*100+"%";
    s.style.fontSize = (7+Math.random()*10)+"px"; s.style.animationDelay = (Math.random()*4)+"s";
    s.style.color = ["#FFC7E4","#D8C4FF","#B5DCFF","#fff"][i%4];
    box.appendChild(s);
  }
})();

render();
watchResize();
initSky();

/* =====================================================================
 * Floating 3D candy hearts & stars (Three.js from CDN; if it can't load,
 * the CSS twinkles above keep the page cheerful).
 * ===================================================================== */
async function initSky(){
  if(reduced) return;
  let THREE;
  try{ THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"); }
  catch{ return; }
  const canvas = $("#sky");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, .1, 100);
  cam.position.z = 30;

  scene.add(new THREE.AmbientLight(0xffffff, .85));
  const key = new THREE.DirectionalLight(0xffffff, .7); key.position.set(-6, 10, 12); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd9ec, .5); fill.position.set(10, -4, 6); scene.add(fill);

  // heart shape
  const heart = new THREE.Shape();
  heart.moveTo(0, .3);
  heart.bezierCurveTo(0, .55, -.35, .8, -.6, .55);
  heart.bezierCurveTo(-.95, .2, -.55, -.2, 0, -.6);
  heart.bezierCurveTo(.55, -.2, .95, .2, .6, .55);
  heart.bezierCurveTo(.35, .8, 0, .55, 0, .3);
  // star shape
  const star = new THREE.Shape();
  for(let i=0;i<10;i++){ const r = i%2 ? .38 : .85, a = Math.PI/2 + i*Math.PI/5;
    const x = Math.cos(a)*r, y = Math.sin(a)*r; i? star.lineTo(x,y) : star.moveTo(x,y); }
  star.closePath();

  const exOpts = { depth:.35, bevelEnabled:true, bevelThickness:.12, bevelSize:.1, bevelSegments:2 };
  const heartGeo = new THREE.ExtrudeGeometry(heart, exOpts);
  const starGeo = new THREE.ExtrudeGeometry(star, exOpts);
  heartGeo.center(); starGeo.center();

  const pastels = [0xFFB5D2, 0xFFD8B5, 0xFFF0B5, 0xB5F0D8, 0xB5DCFF, 0xD8C4FF, 0xFFC7E4];
  const shapes = [];
  const COUNT = 26;
  for(let i=0;i<COUNT;i++){
    const geo = Math.random() < .5 ? heartGeo : starGeo;
    const mat = new THREE.MeshStandardMaterial({ color: pastels[i % pastels.length], roughness:.65, metalness:0, transparent:true, opacity:.92 });
    const m = new THREE.Mesh(geo, mat);
    const s = .7 + Math.random()*1.5; m.scale.setScalar(s);
    m.position.set((Math.random()-.5)*54, (Math.random()-.5)*40, (Math.random()-.5)*16 - 2);
    m.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    m.userData = { sy: .01 + Math.random()*.02, rx:(Math.random()-.5)*.01, ry:(Math.random()-.5)*.012,
      bob: Math.random()*Math.PI*2, ba: .002 + Math.random()*.004 };
    scene.add(m); shapes.push(m);
  }

  const mouse = { x:0, y:0 };
  addEventListener("pointermove", e => { mouse.x = e.clientX/innerWidth - .5; mouse.y = e.clientY/innerHeight - .5; }, { passive:true });
  function resize(){ cam.aspect = innerWidth/innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); }
  addEventListener("resize", resize); resize();

  let running = true, t = 0;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if(running) loop(); });
  const TOP = 22;
  function loop(){
    if(!running) return;
    t += 1;
    shapes.forEach(m => {
      m.position.y += m.userData.sy;
      m.position.x += Math.sin(t*.01 + m.userData.bob) * m.userData.ba;
      m.rotation.x += m.userData.rx; m.rotation.y += m.userData.ry;
      if(m.position.y > TOP){ m.position.y = -TOP; m.position.x = (Math.random()-.5)*54; }
    });
    cam.position.x += (mouse.x*4 - cam.position.x)*.04;
    cam.position.y += (-mouse.y*3 - cam.position.y)*.04;
    cam.lookAt(0,0,0);
    renderer.render(scene, cam);
    requestAnimationFrame(loop);
  }
  loop();
}
</script>
</body>
</html>
