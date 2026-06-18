// 라이미 블록코딩 연구소 — 코딩 퀴즈 (카테고리: 1.코딩이란 2.함수)
import { t, getLang, show, raimiImg, breakSentences } from "./app.js?v=4";

let view = "pick";   // pick | quiz | result
let catIdx = 0;
let order = [];
let pos = 0;
let score = 0;
let answered = false;

export function openQuiz() {
  view = "pick";
  renderCategorySelect();
  show("s-quiz");
}
export function rerenderQuiz() {
  if (view === "pick") renderCategorySelect();
  else if (view === "result") renderResult();
  else renderQuestion();
}

function catIcon(icon, cls) {
  if (icon === "pylogo") {
    const img = document.createElement("img");
    img.src = "assets/python-logo.svg"; img.alt = "Python"; img.className = cls;
    return img.outerHTML;
  }
  return `<div class="cardIcon">${icon}</div>`;
}

function renderCategorySelect() {
  view = "pick";
  const cats = t("QUIZ");
  const sec = document.getElementById("s-quiz");
  sec.innerHTML = `
    <h1 class="homeH1">${t("quizPickH1")}</h1>
    <p class="homeP">${t("quizPickP")}</p>
    <div class="cardRow">
      ${cats.map((c, i) => `
        <button class="bigCard cardCat${i + 1}" data-cat="${i}">
          <div class="stepBadge">${i + 1}</div>
          ${catIcon(c.icon, "catImg")}
          <div class="cardTitle">${c.title}</div>
          <div class="cardTag">${c.q.length}${getLang() === "ko" ? "문제" : " questions"}</div>
        </button>`).join("")}
    </div>`;
  sec.querySelectorAll(".bigCard").forEach(card => {
    card.onclick = () => startCategory(Number(card.dataset.cat));
  });
}

function startCategory(ci) {
  catIdx = ci;
  const list = t("QUIZ")[ci].q;
  order = list.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  pos = 0; score = 0;
  renderQuestion();
}

const MC_KEYS = ["A", "B", "C", "D"];

function renderQuestion() {
  view = "quiz";
  answered = false;
  const cat = t("QUIZ")[catIdx];
  const q = cat.q[order[pos]];
  const sec = document.getElementById("s-quiz");

  const opts = q.t === "ox"
    ? `<div class="oxRow">
        <button class="oxBtn o qBtnState" data-ans="true">O</button>
        <button class="oxBtn x qBtnState" data-ans="false">X</button>
      </div>`
    : `<div class="mcGrid">` + q.o.map((opt, i) =>
        `<button class="mcBtn qBtnState" data-ans="${i}"><span class="mcKey">${MC_KEYS[i]}</span><span>${opt}</span></button>`
      ).join("") + `</div>`;

  sec.innerHTML = `
    <div class="quizWrap fadeUp">
      <div class="quizTop">
        <div class="quizDots">${order.map((_, i) => `<span class="qdot ${i === pos ? "active" : i < pos ? "done" : ""}"></span>`).join("")}</div>
        <div class="quizScoreTag">${cat.title} · ${pos + 1} / ${order.length} · ⭐ ${score}</div>
      </div>
      <div class="quizCard">
        <div class="qType ${q.t}">${q.t === "ox" ? t("qTypeOx") : t("qTypeMc")}</div>
        <div class="qText">${q.q}</div>
        ${opts}
        <div id="qSlot"></div>
      </div>
    </div>`;
  sec.querySelectorAll(".qBtnState").forEach(btn => { btn.onclick = () => answer(btn); });
}

function answer(btn) {
  if (answered) return;
  answered = true;
  const q = t("QUIZ")[catIdx].q[order[pos]];
  const isOx = q.t === "ox";
  const chosen = isOx ? (btn.dataset.ans === "true") : Number(btn.dataset.ans);
  const correct = chosen === q.a;
  if (correct) score++;

  document.getElementById("s-quiz").querySelectorAll(".qBtnState").forEach(b => {
    b.disabled = true;
    const val = isOx ? (b.dataset.ans === "true") : Number(b.dataset.ans);
    if (val === q.a) b.classList.add("correct");
    else if (b === btn) b.classList.add("wrong");
  });

  const last = pos >= order.length - 1;
  const slot = document.getElementById("qSlot");
  slot.innerHTML = `
    <div class="qFeedback fadeUp">
      <span class="res ${correct ? "ok" : "no"}">${correct ? t("qResOk") : t("qResNo")}</span>
      <span class="exp">${breakSentences(q.ex)}</span>
    </div>
    <button class="qNext" id="qNextBtn">${last ? t("qSeeResult") : t("qNextBtn")}</button>`;
  document.getElementById("qNextBtn").onclick = () => {
    pos++;
    if (pos >= order.length) renderResult();
    else renderQuestion();
  };
}

function renderResult() {
  view = "result";
  const total = order.length;
  const ko = getLang() === "ko";
  const praise = score === total ? (ko ? "완벽해요! 🎉" : "Perfect! 🎉")
    : score >= Math.ceil(total / 2) ? (ko ? "잘했어요! 👍" : "Well done! 👍")
    : (ko ? "다시 도전해 볼까요? 💪" : "Try again? 💪");
  const scoreLine = ko ? `${total}문제 중 <b>${score}</b>개 정답!` : `<b>${score}</b> out of ${total} correct!`;

  const sec = document.getElementById("s-quiz");
  sec.innerHTML = `
    <div class="quizResult fadeUp">
      <h2>🎓 ${t("quizDoneTitle")}</h2>
      <div class="bigScore">${scoreLine}</div>
      <div class="clearLesson" style="max-width:520px;margin:8px auto 0">${praise}</div>
      <div class="clearBtns">
        <button class="cBtn secondary" id="qOther">${t("quizBackToCat")}</button>
        <button class="cBtn primary" id="qGoGame">${t("quizGoGame")}</button>
      </div>
    </div>`;
  sec.querySelector(".quizResult").insertBefore(raimiImg("introHero"), sec.querySelector("h2"));
  document.getElementById("qOther").onclick = () => { view = "pick"; renderCategorySelect(); };
  document.getElementById("qGoGame").onclick = () => show("s-mode");
}
