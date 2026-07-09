const pages = [
  {
    type: "cover", image: "assets/cover.png",
    title: "The River|of Stars",
    subtitle: "A gentle Tanabata tale",
    alt: "Orihime and Hikoboshi smile across a glowing river of stars above a Japanese village."
  },
  {
    image: "assets/weaving.png", eyebrow: "Long ago, in the sky…",
    title: "Orihime wove stars.", text: "Her cloth sparkled and shone.",
    alt: "Orihime weaves sparkling star cloth while the Sky King watches proudly."
  },
  {
    image: "assets/meeting.png", eyebrow: "One bright day…",
    title: "She met Hikoboshi.", text: "He took care of the cows.", side: "right",
    alt: "Orihime meets Hikoboshi in a glowing meadow beside a small brown cow."
  },
  {
    image: "assets/meeting.png", eyebrow: "Their hearts felt happy.",
    title: "They played all day.", text: "But they forgot their work.",
    alt: "Orihime and Hikoboshi smile together among flowers and stars."
  },
  {
    image: "assets/river.png", eyebrow: "The Sky King said…",
    title: "“You must work, too.”", text: "He put a river of stars between them.", side: "right",
    alt: "The Milky Way separates Orihime and Hikoboshi as the Sky King looks on."
  },
  {
    image: "assets/river.png", eyebrow: "Then he made a promise.",
    title: "“Meet once each year.”", text: "Orihime and Hikoboshi waited.",
    alt: "Orihime and Hikoboshi reach toward one another across the star river."
  },
  {
    image: "assets/bridge.png", eyebrow: "On the seventh night…",
    title: "The magpies made a bridge!", text: "Across the stars they flew.", side: "right",
    alt: "Friendly magpies form a bridge across the Milky Way."
  },
  {
    image: "assets/bridge.png", eyebrow: "At last!",
    title: "Together again.", text: "The whole sky twinkled with joy.",
    alt: "Orihime and Hikoboshi hurry joyfully toward each other over the magpie bridge."
  },
  {
    image: "assets/festival.png", eyebrow: "Every Tanabata…",
    title: "We hang up our wishes.", text: "What will you wish for?",
    alt: "Children hang colorful wishes on bamboo at a glowing Tanabata festival."
  },
  {
    type: "end", image: "assets/festival.png",
    title: "May your wish find the stars.", text: "Happy Tanabata · おしまい",
    alt: "A joyful Tanabata festival beneath the shining Milky Way."
  }
];

let current = 0;
let animating = false;
let soundOn = true;
let readAloud = false;
let touchStartX = 0;

const book = document.querySelector("#book");
const currentPage = document.querySelector("#currentPage");
const underPage = document.querySelector("#underPage");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const prevCorner = document.querySelector("#prevCorner");
const nextCorner = document.querySelector("#nextCorner");
const pageCount = document.querySelector("#pageCount");
const dots = document.querySelector("#progressDots");
const soundToggle = document.querySelector("#soundToggle");
const readToggle = document.querySelector("#readToggle");
const replayButton = document.querySelector("#replayButton");
const narration = document.querySelector("#narrationAudio");
narration.preload = "auto";

function narrationSource(index) {
  return `audio/page-${String(index).padStart(2, "0")}.mp3`;
}

function updateNarrationControls() {
  const playing = !narration.paused && !narration.ended;
  readToggle.classList.toggle("is-playing", playing);
  readToggle.setAttribute("aria-pressed", String(readAloud));
  readToggle.setAttribute("aria-label", playing ? "Pause read aloud" : "Start read aloud");
  readToggle.querySelector(".narrator-icon").textContent = playing ? "Ⅱ" : "▶";
  readToggle.querySelector(".narrator-label").textContent = playing ? "Pause" : narration.ended && readAloud ? "Read again" : "Read aloud";
}

async function playNarration(index = current) {
  narration.pause();
  narration.src = narrationSource(index);
  narration.currentTime = 0;
  readAloud = true;
  updateNarrationControls();
  try {
    await narration.play();
    delete readToggle.dataset.audioError;
  } catch (error) {
    readToggle.dataset.audioError = error?.name || "PlaybackError";
    readAloud = false;
    updateNarrationControls();
  }
}

function pauseNarration(disableReadAloud = false) {
  narration.pause();
  if (disableReadAloud) readAloud = false;
  updateNarrationControls();
}

function pageMarkup(page) {
  if (page.type === "cover") {
    const [line1, line2] = page.title.split("|");
    return `<div class="cover-page art-page" data-page><img class="page-image" src="${page.image}" alt="${page.alt}"><div class="page-shade"></div><div class="cover-copy"><p class="cover-kicker">A STORY FROM JAPAN</p><h1>${line1}<em>${line2}</em></h1><p class="cover-subtitle">${page.subtitle}</p><div class="cover-mark"></div></div></div>`;
  }
  if (page.type === "end") {
    return `<div class="end-page art-page" data-page><img class="page-image" src="${page.image}" alt="${page.alt}"><div class="page-shade"></div><div class="end-copy"><h2>${page.title}</h2><p>${page.text}</p></div></div>`;
  }
  return `<div class="art-page ${page.side === "right" ? "copy-right" : ""}" data-page><img class="page-image" src="${page.image}" alt="${page.alt}"><div class="page-shade"></div><div class="story-copy"><span class="eyebrow">${page.eyebrow}</span><h2>${page.title}</h2><p>${page.text}</p></div></div>`;
}

function render(target, index) {
  target.innerHTML = pageMarkup(pages[index]);
}

function buildDots() {
  dots.innerHTML = pages.map((_, i) => `<button class="dot" type="button" aria-label="Go to page ${i + 1}" data-index="${i}"></button>`).join("");
  dots.addEventListener("click", event => {
    const dot = event.target.closest(".dot");
    if (!dot) return;
    const index = Number(dot.dataset.index);
    if (index !== current) turn(index, index > current ? 1 : -1);
  });
}

function updateControls() {
  prevButton.disabled = prevCorner.disabled = current === 0;
  nextButton.disabled = nextCorner.disabled = current === pages.length - 1;
  prevButton.innerHTML = current === 1 ? `<span aria-hidden="true">←</span> Cover` : `<span aria-hidden="true">←</span> Back`;
  nextButton.innerHTML = current === 0 ? `Begin <span aria-hidden="true">→</span>` : current === pages.length - 2 ? `Finish <span aria-hidden="true">→</span>` : `Next <span aria-hidden="true">→</span>`;
  pageCount.textContent = current === 0 ? "Cover" : current === pages.length - 1 ? "The end" : `Page ${current} of ${pages.length - 2}`;
  [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
}

function paperSound() {
  if (!soundOn) return;
  const audio = new (window.AudioContext || window.webkitAudioContext)();
  const size = Math.floor(audio.sampleRate * .16);
  const buffer = audio.createBuffer(1, size, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / size, 2) * .08;
  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1200;
  source.buffer = buffer;
  source.connect(filter).connect(audio.destination);
  source.start();
  source.onended = () => audio.close();
}

function turn(target, direction) {
  if (animating || target < 0 || target >= pages.length || target === current) return;
  animating = true;
  pauseNarration(false);
  render(underPage, target);
  paperSound();
  currentPage.classList.add(direction > 0 ? "turn-next" : "turn-prev");
  window.setTimeout(() => {
    current = target;
    render(currentPage, current);
    currentPage.className = "page current-page";
    underPage.innerHTML = "";
    updateControls();
    animating = false;
    if (readAloud) playNarration(current);
  }, 820);
}

function next() { turn(current + 1, 1); }
function previous() { turn(current - 1, -1); }

prevButton.addEventListener("click", previous);
prevCorner.addEventListener("click", previous);
nextButton.addEventListener("click", next);
nextCorner.addEventListener("click", next);

document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" || event.key === " ") { event.preventDefault(); next(); }
  if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
});

book.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
book.addEventListener("touchend", event => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 45) distance < 0 ? next() : previous();
}, { passive: true });

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.setAttribute("aria-pressed", String(soundOn));
  soundToggle.setAttribute("aria-label", soundOn ? "Turn page sounds off" : "Turn page sounds on");
  soundToggle.querySelector(".sound-waves").textContent = soundOn ? "◖))" : "◖×";
  soundToggle.querySelector(".sound-label").textContent = soundOn ? "Page sounds on" : "Page sounds off";
});

readToggle.addEventListener("click", () => {
  if (!narration.paused && !narration.ended) {
    pauseNarration(true);
  } else {
    playNarration(current);
  }
});

replayButton.addEventListener("click", () => playNarration(current));
narration.addEventListener("play", updateNarrationControls);
narration.addEventListener("pause", updateNarrationControls);
narration.addEventListener("ended", updateNarrationControls);
narration.addEventListener("error", () => {
  readAloud = false;
  updateNarrationControls();
});

pages.forEach(page => { const img = new Image(); img.src = page.image; });
pages.forEach((_, index) => { const audio = new Audio(); audio.preload = "metadata"; audio.src = narrationSource(index); });
buildDots();
render(currentPage, current);
updateControls();
updateNarrationControls();
