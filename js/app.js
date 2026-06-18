import { I18N } from "./i18n.js?v=3";
import { openGame, rerenderGame } from "./maze.js?v=3";
import { openQuiz, rerenderQuiz } from "./quiz.js?v=3";
import { openPyLab, rerenderPyLab } from "./pylab.js?v=3";

const RAIMI_IMG = "assets/raimi.png";

let lang = localStorage.getItem("raim-block-lang") || "ko";
if (!I18N[lang]) lang = "ko";
let currentScreen = "s-intro";

export function t(key) { return I18N[lang][key]; }
export function getLang() { return lang; }
export function currentScreenId() { return currentScreen; }

// 문장이 끝나면(. ? ! 。 ？ ！) 줄바꿈 — 소수점(3.14)·말줄임표(...)는 제외
// alsoComma=true 이면 쉼표(, ，) 뒤에서도 줄바꿈 (파이썬 배우기 설명란 규칙)
export function breakSentences(text, alsoComma) {
  let out = String(text)
    .replace(/([.?!。？！]+)(\s*)/g, (m, punct, _ws, offset, str) => {
      const prev = str[offset - 1], next = str[offset + m.length];
      if (punct === "." && /\d/.test(prev || "") && /\d/.test(next || "")) return m;
      if (/^[.。]{2,}$/.test(punct)) return m;
      return punct + "\n";
    });
  if (alsoComma) {
    out = out.replace(/([,，])\s*/g, (m, comma, offset, str) => {
      const prev = str[offset - 1], next = str[offset + m.length];
      if (/\d/.test(prev || "") && /\d/.test(next || "")) return m; // 1,000 같은 숫자는 제외
      return comma + "\n";
    });
  }
  return out.replace(/\n+$/, "");
}

export function raimiFallback(img) {
  img.onerror = () => {
    const span = document.createElement("span");
    span.textContent = "🤖";
    span.style.fontSize = img.classList.contains("gFace") ? "60px"
      : img.classList.contains("cardImg") ? "64px"
      : img.classList.contains("cFace") ? "90px" : "80px";
    span.className = img.className;
    img.replaceWith(span);
  };
}
export function raimiImg(extraClass) {
  const img = document.createElement("img");
  img.src = RAIMI_IMG; img.alt = "라이미"; img.className = extraClass || "";
  raimiFallback(img);
  return img;
}

function applyTranslations() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.getElementById("langCurrent").textContent = lang === "ko" ? "ENG" : "한국어";
}

function setLang(code) {
  if (!I18N[code]) return;
  lang = code;
  localStorage.setItem("raim-block-lang", code);
  applyTranslations();
  if (currentScreen === "s-game") rerenderGame();
  else if (currentScreen === "s-quiz") rerenderQuiz();
  else if (currentScreen === "s-python") rerenderPyLab();
}
document.getElementById("langBtn").onclick = () => setLang(lang === "ko" ? "en" : "ko");

export function show(id) {
  currentScreen = id;
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("on"));
  document.getElementById(id).classList.add("on");
  document.getElementById("homeBtn").style.display = (id === "s-intro") ? "none" : "block";
}

function resetToStart() { show("s-intro"); }
document.getElementById("homeBtn").onclick = resetToStart;
document.getElementById("introStart").onclick = () => show("s-home");

// 홈: 활동 선택
document.querySelectorAll("#s-home .bigCard").forEach(card => {
  card.onclick = () => {
    const act = card.dataset.act;
    if (act === "game") show("s-mode");
    else if (act === "quiz") openQuiz();
    else if (act === "python") openPyLab();
  };
});

// 게임 모드 선택 → 게임 시작
document.querySelectorAll("#s-mode .bigCard").forEach(card => {
  card.onclick = () => { openGame(card.dataset.mode); };
});
document.getElementById("modeBack").onclick = () => show("s-home");
document.getElementById("soonBack").onclick = () => show("s-home");

raimiFallback(document.getElementById("introHero"));
applyTranslations();
show("s-intro");

function fitScreen() {
  const el = document.getElementById("appScale");
  if (!el) return;
  const DW = 1340, DH = 800;
  const s = Math.min(window.innerWidth / DW, window.innerHeight / DH);
  const x = (window.innerWidth - DW * s) / 2;
  const y = (window.innerHeight - DH * s) / 2;
  el.style.transform = "translate(" + x + "px," + y + "px) scale(" + s + ")";
}
window.addEventListener("resize", fitScreen);
window.addEventListener("orientationchange", fitScreen);
fitScreen();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
