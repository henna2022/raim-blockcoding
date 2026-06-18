// 라이미 블록코딩 연구소 — 미로 길찾기 게임 (엔트리 스타일 블록코딩)
import { t, getLang, show, raimiImg, breakSentences } from "./app.js?v=3";
import { I18N } from "./i18n.js?v=3";

// '#' 벽, '.' 길, 'S' 시작, 'G' 깃발(목표). dir = 시작 방향, hint = 초보자 강조 블록
const LEVELS = [
  { grid: ["######", "#S..G#", "######"], dir: "E", hint: "move" },
  { grid: ["#####", "###G#", "#S..#", "#####"], dir: "E", hint: "left" },
  { grid: ["######", "####G#", "###..#", "##..##", "#S.###", "######"], dir: "E", hint: "repeat" },
];
const LEVELS_TEXT = { ko: I18N.ko.LEVELS, en: I18N.en.LEVELS };

const DIRS = { N: [-1, 0], E: [0, 1], S: [1, 0], W: [0, -1] };
const LEFT = { N: "W", W: "S", S: "E", E: "N" };
const RIGHT = { N: "E", E: "S", S: "W", W: "N" };
const ROT = { E: 0, S: 90, W: 180, N: -90 };
const ICON = { move: "👣", left: "↩️", right: "↪️", repeat: "🔁" };

let mode = "beginner";
let levelIdx = 0;
let program = [];
let level = null;
let player = { r: 0, c: 0, dir: "E" };
let running = false;
let runToken = 0;
let uidSeq = 1;
const els = {};

function node(kind) {
  const n = { kind, _uid: uidSeq++ };
  if (kind === "repeat") { n.count = 3; n.body = []; }
  return n;
}
function levelsText() { return LEVELS_TEXT[getLang()] || LEVELS_TEXT.ko; }

export function openGame(m) {
  mode = m; levelIdx = 0;
  buildShell();
  openLevel(0);
  show("s-game");
}
export function rerenderGame() {
  if (!els.root) return;
  buildShell(true);
  renderGuide(); renderLevelLabel(); renderMaze(); placePlayer(false);
  renderPalette(); renderScript(); renderPython();
}

function buildShell(keepProgram) {
  const root = document.getElementById("s-game");
  els.root = root;
  root.innerHTML = `
    <div class="gameWrap">
      <div class="mazeCol">
        <div class="guideBar" id="guideBar"><div class="gText" id="guideText"></div></div>
        <div class="mazeCard">
          <div class="levelLabel" id="levelLabel"></div>
          <div class="mazeLegend"><span class="arrowDot">➤</span><span id="mazeLegendText"></span></div>
          <div class="mazeGrid" id="mazeGrid"></div>
        </div>
      </div>
      <div class="codeCol">
        <div class="palette">
          <div class="paletteTitle" id="palTitle"></div>
          <div class="palRow" id="palRow"></div>
        </div>
        <div class="workspace">
          <div class="wsHead"><span class="wsTitle" id="wsTitle"></span></div>
          <div class="scriptScroll" id="scriptScroll"></div>
        </div>
        <div class="pyPanel">
          <div class="pyHead"><img class="pyLogoSm" src="assets/python-logo.svg" alt="Python"> <span id="pyHeadText"></span></div>
          <pre class="pyCode" id="pyCode"></pre>
        </div>
        <div class="runRow">
          <button class="resetBtn" id="resetBtn"></button>
          <button class="runBtn" id="runBtn"></button>
        </div>
      </div>
    </div>
    <div class="clearOverlay" id="clearOverlay"></div>
  `;
  // 같은 id가 파이썬 화면에도 있으므로 반드시 이 화면(root) 안에서만 찾는다
  ["guideBar", "guideText", "levelLabel", "mazeLegendText", "mazeGrid", "palTitle", "palRow",
   "wsTitle", "scriptScroll", "pyHeadText", "pyCode", "resetBtn", "runBtn", "clearOverlay"]
    .forEach(id => els[id] = root.querySelector("#" + id));
  els.runBtn.onclick = run;
  els.resetBtn.onclick = () => { if (!running) { placePlayerStart(); placePlayer(true); clearToast(); } };
  if (!keepProgram) program = [];
}

function parseLevel(def) {
  const rows = def.grid.length, cols = def.grid[0].length;
  const cells = [], lv = { rows, cols };
  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < cols; c++) {
      const ch = def.grid[r][c];
      cells[r][c] = ch !== "#";
      if (ch === "S") lv.start = { r, c };
      if (ch === "G") lv.goal = { r, c };
    }
  }
  lv.cells = cells;
  lv.cell = Math.max(50, Math.min(86, Math.floor(Math.min(420 / cols, 360 / rows))));
  lv.dir = def.dir;
  return lv;
}
function openLevel(idx) {
  levelIdx = idx;
  level = parseLevel(LEVELS[idx]);
  program = [];
  placePlayerStart();
  renderGuide(); renderLevelLabel(); renderMaze(); placePlayer(false);
  renderPalette(); renderScript(); renderPython();
}
function placePlayerStart() { player = { r: level.start.r, c: level.start.c, dir: level.dir }; }

function renderGuide() {
  const bar = els.guideBar;
  bar.querySelector(".gFace")?.remove();
  const lv = levelsText()[levelIdx];
  if (mode === "beginner") {
    bar.classList.remove("challenger");
    bar.insertBefore(raimiImg("gFace"), els.guideText);
    els.guideText.innerHTML = breakSentences(lv.guide);
  } else {
    bar.classList.add("challenger");
    els.guideText.innerHTML = "🔥 " + breakSentences(t("guideGoal"));
  }
}
function renderLevelLabel() {
  const lv = levelsText()[levelIdx];
  els.levelLabel.innerHTML = `Level ${levelIdx + 1} · <span class="lvName">${lv.name}</span>`;
}

function renderMaze() {
  const g = els.mazeGrid, cs = level.cell;
  g.style.width = level.cols * cs + "px";
  g.style.height = level.rows * cs + "px";
  g.innerHTML = "";
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      if (!level.cells[r][c]) continue;
      const cell = document.createElement("div");
      const isGoal = level.goal.r === r && level.goal.c === c;
      cell.className = "cell path" + (isGoal ? " goal" : "");
      cell.style.cssText = `left:${c * cs + 3}px;top:${r * cs + 3}px;width:${cs - 6}px;height:${cs - 6}px;`;
      if (isGoal) cell.style.fontSize = cs * 0.56 + "px";
      g.appendChild(cell);
    }
  }
  const p = document.createElement("div");
  p.className = "player"; p.id = "player";
  p.style.width = cs + "px"; p.style.height = cs + "px";
  const img = raimiImg("pBody");
  img.style.width = cs * 0.82 + "px"; img.style.height = cs * 0.82 + "px"; img.style.objectFit = "contain";
  const arrow = document.createElement("span");
  arrow.className = "facing"; arrow.id = "facing"; arrow.textContent = "➤";
  arrow.style.cssText = `position:absolute;font-size:${cs * 0.3}px;color:#ff3b50;right:${cs * 0.02}px;top:50%;transition:transform .28s ease;text-shadow:0 0 3px #fff;`;
  p.appendChild(img); p.appendChild(arrow);
  g.appendChild(p);
  els.player = p; els.facing = arrow;
}
function placePlayer(animated) {
  const p = els.player; if (!p) return;
  const cs = level.cell;
  if (!animated) p.style.transition = "none"; else p.style.transition = "transform .28s ease";
  p.style.transform = `translate(${player.c * cs}px, ${player.r * cs}px)`;
  els.facing.style.transform = `translateY(-50%) rotate(${ROT[player.dir]}deg)`;
  if (!animated) { void p.offsetWidth; p.style.transition = "transform .28s ease"; }
}

function renderPalette() {
  els.palTitle.textContent = t("palTitle");
  els.wsTitle.textContent = t("wsTitle");
  els.pyHeadText.textContent = t("pyHead");
  els.runBtn.textContent = t("runBtn");
  els.resetBtn.textContent = t("resetBtn");
  els.mazeLegendText.textContent = t("arrowLegend");
  const row = els.palRow; row.innerHTML = "";
  ["move", "left", "right", "repeat"].forEach(kind => {
    const b = blockEl(kind, null);
    b.classList.add("palItem");
    if (mode === "beginner" && LEVELS[levelIdx].hint === kind) b.classList.add("hintPulse");
    attachDragSource(b, () => ({ type: "new", kind }));
    row.appendChild(b);
  });
}

function blockEl(kind, n) {
  const b = document.createElement("div");
  b.className = "eblock k-" + kind;
  const label = kind === "repeat"
    ? t("blkRepeat")
    : t(kind === "move" ? "blkMove" : kind === "left" ? "blkLeft" : "blkRight");
  b.innerHTML = `<span class="bIcon">${ICON[kind]}</span><span>${label}</span>`;
  if (n) b.dataset.uid = n._uid;
  return b;
}

function renderScript() {
  const wrap = els.scriptScroll;
  wrap.innerHTML = "";
  // 시작(모자) 블록
  const hat = document.createElement("div");
  hat.className = "ehat";
  hat.innerHTML = `<span class="playico">▶</span><span>${t("hatLabel")}</span>`;
  wrap.appendChild(hat);
  if (program.length === 0) {
    const hint = document.createElement("div");
    hint.className = "emptyHint"; hint.textContent = t("emptyHint");
    wrap.appendChild(hint);
  }
  renderContainer(program, wrap, true);
}
function renderContainer(arr, parent, isRoot) {
  if (arr.length === 0 && !isRoot) {           // 빈 C블록 몸통 = 큰 드롭 타깃
    const dz = makeDrop(arr, 0, false);
    dz.classList.add("bodyZone");
    dz.textContent = t("bodyEmpty");
    parent.appendChild(dz);
    return;
  }
  parent.appendChild(makeDrop(arr, 0, isRoot));
  arr.forEach((n, i) => {
    parent.appendChild(renderNode(n));
    parent.appendChild(makeDrop(arr, i + 1, isRoot));
  });
}
function renderNode(n) {
  if (n.kind === "repeat") {
    const wrap = document.createElement("div");
    wrap.className = "ecwrap progNode";
    const head = document.createElement("div");
    head.className = "ec-head";
    attachDragSource(head, () => ({ type: "move", node: n, fromArr: findParent(n) }));
    const pre = t("blkRepeatPre"), post = t("blkRepeatPost");
    head.innerHTML = `<span class="bIcon">🔁</span>${pre ? `<span>${pre}</span>` : ""}`;
    const pill = document.createElement("div"); pill.className = "evalpill nodrag";
    pill.appendChild(stepBtn("−", () => { if (n.count > 1) { n.count--; renderScript(); renderPython(); } }));
    const num = document.createElement("span"); num.className = "stepNum"; num.textContent = n.count;
    pill.appendChild(num);
    pill.appendChild(stepBtn("+", () => { if (n.count < 9) { n.count++; renderScript(); renderPython(); } }));
    head.appendChild(pill);
    const postSpan = document.createElement("span"); postSpan.textContent = post; head.appendChild(postSpan);
    head.appendChild(delBtn(n));
    wrap.appendChild(head);
    const mid = document.createElement("div"); mid.className = "ec-mid";
    const arm = document.createElement("div"); arm.className = "ec-arm";
    const body = document.createElement("div"); body.className = "ec-body";
    renderContainer(n.body, body, false);
    mid.appendChild(arm); mid.appendChild(body);
    wrap.appendChild(mid);
    const foot = document.createElement("div"); foot.className = "ec-foot";
    wrap.appendChild(foot);
    return wrap;
  }
  const rowEl = document.createElement("div");
  rowEl.className = "progNode nodeRow";
  const blk = blockEl(n.kind, n);
  attachDragSource(blk, () => ({ type: "move", node: n, fromArr: findParent(n) }));
  rowEl.appendChild(blk);
  rowEl.appendChild(delBtn(n));
  return rowEl;
}
function stepBtn(txt, fn) {
  const b = document.createElement("button"); b.className = "stepBtn nodrag"; b.textContent = txt;
  b.onclick = (e) => { e.stopPropagation(); if (!running) fn(); };
  return b;
}
function delBtn(n) {
  const b = document.createElement("button"); b.className = "nodeDel nodrag"; b.textContent = "×";
  b.onclick = (e) => { e.stopPropagation(); if (running) return; removeNode(n); renderScript(); renderPython(); };
  return b;
}
function findParent(n) {
  if (program.includes(n)) return program;
  for (const x of program) if (x.kind === "repeat" && x.body.includes(n)) return x.body;
  return program;
}
function removeNode(n) { const arr = findParent(n); const i = arr.indexOf(n); if (i >= 0) arr.splice(i, 1); }

// ===== 드롭존 + 드래그 =====
function makeDrop(arr, index, isRoot) {
  const d = document.createElement("div");
  d.className = "dropzone" + (isRoot ? " rootZone" : "");
  d._container = arr; d._index = index;
  return d;
}
let drag = null;
function attachDragSource(el, makePayload) {
  el.addEventListener("pointerdown", (e) => {
    if (running) return;
    if (e.target.closest(".nodrag")) return;
    e.preventDefault();
    const payload = makePayload();
    const s = currentScale();
    const clone = el.cloneNode(true);
    clone.classList.add("dragClone");
    clone.style.left = e.clientX + "px"; clone.style.top = e.clientY + "px";
    clone.style.transform = `translate(-50%,-50%) scale(${s})`;
    document.body.appendChild(clone);
    drag = { payload, clone, startX: e.clientX, startY: e.clientY, moved: false, overZone: null };
    window.addEventListener("pointermove", onDragMove);
    window.addEventListener("pointerup", onDragEnd, { once: true });
  });
}
function onDragMove(e) {
  if (!drag) return;
  drag.clone.style.left = e.clientX + "px"; drag.clone.style.top = e.clientY + "px";
  if (Math.abs(e.clientX - drag.startX) > 6 || Math.abs(e.clientY - drag.startY) > 6) drag.moved = true;
  const zone = zoneUnder(e.clientX, e.clientY);
  if (zone !== drag.overZone) {
    drag.overZone?.classList.remove("over");
    drag.overZone = zone;
    zone?.classList.add("over");
  }
}
function onDragEnd() {
  window.removeEventListener("pointermove", onDragMove);
  if (!drag) return;
  const { payload, overZone, moved } = drag;
  drag.clone.remove();
  drag.overZone?.classList.remove("over");
  drag = null;
  if (overZone) dropInto(payload, overZone._container, overZone._index);
  else if (!moved && payload.type === "new") program.push(node(payload.kind));
  renderScript(); renderPython();
}
function dropInto(payload, container, index) {
  const intoBody = container !== program;
  if (payload.type === "new") {
    if (payload.kind === "repeat" && intoBody) { flashToast("🔁 안에는 반복을 넣을 수 없어요"); return; }
    container.splice(index, 0, node(payload.kind));
  } else {
    const n = payload.node;
    if (n.kind === "repeat" && intoBody) { flashToast("🔁 안에는 반복을 넣을 수 없어요"); return; }
    const from = findParent(n);
    const fromIdx = from.indexOf(n);
    if (from === container) {
      from.splice(fromIdx, 1);
      if (index > fromIdx) index--;
      container.splice(index, 0, n);
    } else { from.splice(fromIdx, 1); container.splice(index, 0, n); }
  }
}
function zoneUnder(x, y) {
  const prev = drag.clone.style.display;
  drag.clone.style.display = "none";
  const el = document.elementFromPoint(x, y);
  drag.clone.style.display = prev;
  return el ? el.closest(".dropzone") : null;
}
function currentScale() { return Math.min(window.innerWidth / 1340, window.innerHeight / 800); }

// ===== 파이썬 코드 =====
function renderPython() {
  const lines = [];
  genPy(program, 0, lines);
  if (lines.length === 0) {
    els.pyCode.innerHTML = `<span class="cm"># ${getLang() === "ko" ? "여기에 블록을 넣어봐" : "add blocks here"}</span>`;
    return;
  }
  els.pyCode.innerHTML = lines.join("\n");
}
function genPy(arr, depth, out) {
  const pad = "    ".repeat(depth);
  for (const n of arr) {
    if (n.kind === "move") out.push(`${pad}<span class="fn">forward</span>()`);
    else if (n.kind === "left") out.push(`${pad}<span class="fn">turn_left</span>()`);
    else if (n.kind === "right") out.push(`${pad}<span class="fn">turn_right</span>()`);
    else if (n.kind === "repeat") {
      out.push(`${pad}<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">${n.count}</span>):`);
      if (n.body.length === 0) out.push(`${pad}    <span class="kw">pass</span>`);
      else genPy(n.body, depth + 1, out);
    }
  }
}

// ===== 실행 =====
function flatten(arr, out) {
  for (const n of arr) {
    if (out.length > 600) return;
    if (n.kind === "repeat") { for (let i = 0; i < n.count; i++) flatten(n.body, out); }
    else out.push(n);
  }
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
  if (running) return;
  const steps = [];
  flatten(program, steps);
  if (steps.length === 0) { flashToast(t("toastEmpty")); return; }
  running = true;
  els.runBtn.disabled = true; els.resetBtn.disabled = true;
  const token = ++runToken;
  placePlayerStart(); placePlayer(false);
  await sleep(220);
  for (const n of steps) {
    if (token !== runToken) return;
    highlight(n._uid, true);
    if (n.kind === "move") {
      const [dr, dc] = DIRS[player.dir];
      const nr = player.r + dr, nc = player.c + dc;
      if (inBounds(nr, nc) && level.cells[nr][nc]) { player.r = nr; player.c = nc; placePlayer(true); }
      else {
        els.player.classList.add("bump");
        flashToast(t("toastBump"));
        await sleep(500);
        els.player.classList.remove("bump");
        highlight(n._uid, false);
        return endRun();
      }
    } else if (n.kind === "left") { player.dir = LEFT[player.dir]; placePlayer(true); }
    else if (n.kind === "right") { player.dir = RIGHT[player.dir]; placePlayer(true); }
    await sleep(380);
    highlight(n._uid, false);
  }
  if (token !== runToken) return;
  if (player.r === level.goal.r && player.c === level.goal.c) { await sleep(180); winLevel(); }
  else flashToast(t("toastNotYet"));
  endRun();
}
function endRun() { running = false; els.runBtn.disabled = false; els.resetBtn.disabled = false; }
function inBounds(r, c) { return r >= 0 && c >= 0 && r < level.rows && c < level.cols; }
function highlight(uid, on) {
  els.scriptScroll.querySelectorAll(`[data-uid="${uid}"]`).forEach(b => b.classList.toggle("running", on));
}

// ===== 클리어 =====
function winLevel() {
  confetti();
  const last = levelIdx >= LEVELS.length - 1;
  const lv = levelsText()[levelIdx];
  const ov = els.clearOverlay;
  ov.innerHTML = `
    <div class="clearCard">
      <h2></h2>
      <div class="clearLesson">${breakSentences(last ? t("allClearBody") : lv.lesson)}</div>
      <div class="clearBtns" id="clearBtns"></div>
    </div>`;
  ov.querySelector(".clearCard").insertBefore(raimiImg("cFace"), ov.querySelector("h2"));
  ov.querySelector("h2").textContent = last ? "🏆 " + t("allClearTitle") : "🎉 " + t("clearTitleWord");
  const btns = ov.querySelector("#clearBtns");
  if (last) {
    btns.appendChild(cBtn(t("clearRetry"), "secondary", () => { hideOverlay(); openLevel(levelIdx); }));
    btns.appendChild(cBtn(t("clearMenu"), "primary", () => { hideOverlay(); show("s-home"); }));
  } else {
    btns.appendChild(cBtn(t("clearRetry"), "secondary", () => { hideOverlay(); openLevel(levelIdx); }));
    btns.appendChild(cBtn(t("clearNext"), "primary", () => { hideOverlay(); openLevel(levelIdx + 1); }));
  }
  ov.classList.add("show");
}
function cBtn(txt, cls, fn) {
  const b = document.createElement("button"); b.className = "cBtn " + cls; b.textContent = txt; b.onclick = fn; return b;
}
function hideOverlay() { els.clearOverlay.classList.remove("show"); }

// ===== 토스트 / 컨페티 =====
let toastTimer = null;
function flashToast(msg) {
  clearToast();
  const tEl = document.createElement("div");
  tEl.className = "toast"; tEl.textContent = breakSentences(msg); tEl.id = "gameToast";
  els.root.appendChild(tEl);
  requestAnimationFrame(() => tEl.classList.add("show"));
  toastTimer = setTimeout(() => clearToast(), 2200);
}
function clearToast() {
  if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }
  document.getElementById("gameToast")?.remove();
}
function confetti() {
  const emo = ["🎉", "⭐", "✨", "🎊", "💙", "🤖"];
  for (let i = 0; i < 26; i++) {
    const s = document.createElement("span");
    s.className = "confetti"; s.textContent = emo[i % emo.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
    s.style.fontSize = (16 + Math.random() * 18) + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3200);
  }
}
