// 라이미 블록코딩 연구소 — 파이썬 배우기 (print/변수/연산/len/for/if/max)
import { t, getLang, show, raimiImg, breakSentences } from "./app.js?v=4";

const ICON = { print: "🗨️", repeat: "🔁", if: "🔀", var: "📦" };

let probIdx = 0;
let program = [];
let prob = null;
let running = false;
let uidSeq = 1;
const els = {};

function node(spec) {
  const n = { kind: spec.kind, _uid: uidSeq++ };
  if ("text" in spec) n.text = spec.text;
  if ("name" in spec) n.name = spec.name;
  if ("value" in spec) n.value = spec.value;
  if ("isStr" in spec) n.isStr = spec.isStr;
  if ("a" in spec) n.a = spec.a;
  if ("b" in spec) n.b = spec.b;
  if ("cond" in spec) n.cond = spec.cond;
  if (spec.kind === "repeat") n.count = 3;
  if (spec.kind === "repeat" || spec.kind === "if") n.body = [];
  return n;
}
function problems() { return t("PYLAB"); }
function isContainerKind(k) { return k === "repeat" || k === "if"; }
function colorClass(k) { return k === "setvar" ? "var" : k === "repeat" ? "repeat" : k === "if" ? "if" : "print"; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

export function openPyLab() {
  probIdx = 0;
  buildShell();
  openProblem(0);
  show("s-python");
}
export function rerenderPyLab() {
  if (!els.root) return;
  buildShell(true);
  renderConcept(); renderGoal(); renderPalette(); renderScript(); renderPython(); renderConsole(null);
}

function buildShell(keep) {
  const root = document.getElementById("s-python");
  els.root = root;
  root.innerHTML = `
    <div class="pyLabWrap">
      <div class="pyLeft">
        <div class="goalCard">
          <div class="gLabel" id="goalLabel"></div>
          <div class="gGoal" id="goalText"></div>
        </div>
        <div class="conceptBox" id="conceptBox"><div class="cText" id="conceptText"></div></div>
        <div class="console">
          <div class="conHead" id="conHead"></div>
          <div id="conOut"></div>
        </div>
      </div>
      <div class="pyRight">
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
    <div class="clearOverlay" id="clearOverlay"></div>`;
  // 같은 id가 게임 화면에도 있으므로 반드시 이 화면(root) 안에서만 찾는다
  ["goalLabel","goalText","conceptBox","conceptText","conHead","conOut","palTitle","palRow",
   "wsTitle","scriptScroll","pyHeadText","pyCode","resetBtn","runBtn","clearOverlay"]
    .forEach(id => els[id] = root.querySelector("#" + id));
  els.runBtn.onclick = run;
  els.resetBtn.onclick = () => { if (!running) { program = []; renderScript(); renderPython(); renderConsole(null); } };
  if (!keep) program = [];
}

function openProblem(i) {
  probIdx = i;
  prob = problems()[i];
  program = [];
  renderConcept(); renderGoal(); renderPalette(); renderScript(); renderPython(); renderConsole(null);
}

function renderGoal() {
  els.goalLabel.textContent = `${t("goalLabel")} · ${t("pyStep")} ${probIdx + 1} / ${problems().length}`;
  els.goalText.textContent = prob.goal;
}
function renderConcept() {
  els.conceptBox.querySelector(".cFace")?.remove();
  els.conceptBox.insertBefore(raimiImg("cFace"), els.conceptText);
  els.conceptText.innerHTML = breakSentences(prob.intro, true);   // 마침표 + 쉼표 줄바꿈
}

function renderPalette() {
  els.palTitle.textContent = t("palTitle");
  els.wsTitle.textContent = t("wsTitle");
  els.pyHeadText.textContent = t("pyHead");
  els.runBtn.textContent = t("runBtn");
  els.resetBtn.textContent = t("resetBtn");
  const row = els.palRow; row.innerHTML = "";
  prob.blocks.forEach(spec => {
    const b = blockEl(spec, null);
    b.classList.add("palItem");
    attachDragSource(b, () => ({ type: "new", spec }));
    row.appendChild(b);
  });
}

function pill(v) { return `<span class="evalpill" style="color:#d23b5c">${esc(v)}</span>`; }
function blockInner(s) {
  switch (s.kind) {
    case "print": return `<span class="bIcon">🗨️</span><span>print(</span>${pill('"' + s.text + '"')}<span>)</span>`;
    case "printvar": return `<span class="bIcon">🗨️</span><span>print(</span>${pill(s.name)}<span>)</span>`;
    case "printlen": return `<span class="bIcon">🗨️</span><span>print(len(</span>${pill('"' + s.text + '"')}<span>))</span>`;
    case "printsum": return `<span class="bIcon">🗨️</span><span>print(</span>${pill(s.a)}<span>+</span>${pill(s.b)}<span>)</span>`;
    case "printmax": return `<span class="bIcon">🗨️</span><span>print(max(</span>${pill(s.a)}<span>,</span>${pill(s.b)}<span>))</span>`;
    case "printmin": return `<span class="bIcon">🗨️</span><span>print(min(</span>${pill(s.a)}<span>,</span>${pill(s.b)}<span>))</span>`;
    case "setvar": return `<span class="bIcon">📦</span><span>${esc(s.name)} = </span>${pill(s.isStr ? '"' + s.value + '"' : s.value)}`;
  }
  return esc(s.kind);
}
function blockEl(spec, n) {
  const b = document.createElement("div");
  b.className = "eblock k-" + colorClass(spec.kind);
  if (spec.kind === "repeat") b.innerHTML = `<span class="bIcon">${ICON.repeat}</span><span>${t("blkRepeat")}</span>`;
  else if (spec.kind === "if") b.innerHTML = `<span class="bIcon">${ICON.if}</span><span>${t("blkIfPre")} ${esc(spec.cond)} ${t("blkIfPost")}</span>`;
  else b.innerHTML = blockInner(spec);
  if (n) b.dataset.uid = n._uid;
  return b;
}

function renderScript() {
  const wrap = els.scriptScroll;
  wrap.innerHTML = "";
  const hat = document.createElement("div");
  hat.className = "ehat";
  hat.innerHTML = `<span class="playico">▶</span><span>${t("hatLabel")}</span>`;
  wrap.appendChild(hat);
  if (prob.prelude) {
    const pre = document.createElement("div");
    pre.className = "eblock k-var"; pre.style.cursor = "default";
    pre.innerHTML = `<span class="bIcon">${ICON.var}</span><span>${esc(prob.prelude.name)} = ${esc(prob.prelude.value)}</span>`;
    const rowp = document.createElement("div"); rowp.className = "progNode nodeRow"; rowp.appendChild(pre);
    wrap.appendChild(rowp);
  }
  if (program.length === 0) {
    const hint = document.createElement("div");
    hint.className = "emptyHint"; hint.textContent = t("emptyHint");
    wrap.appendChild(hint);
  }
  renderContainer(program, wrap, true);
}
function renderContainer(arr, parent, isRoot) {
  if (arr.length === 0 && !isRoot) {
    const dz = makeDrop(arr, 0, false);
    dz.classList.add("bodyZone");
    dz.textContent = t("bodyEmpty");
    parent.appendChild(dz);
    return;
  }
  parent.appendChild(makeDrop(arr, 0, isRoot));
  arr.forEach((n, i) => { parent.appendChild(renderNode(n)); parent.appendChild(makeDrop(arr, i + 1, isRoot)); });
}
function renderNode(n) {
  if (n.kind === "repeat" || n.kind === "if") {
    const wrap = document.createElement("div");
    wrap.className = "ecwrap progNode" + (n.kind === "if" ? " cif" : "");
    const head = document.createElement("div");
    head.className = "ec-head";
    attachDragSource(head, () => ({ type: "move", node: n }));
    if (n.kind === "repeat") {
      const pre = t("blkRepeatPre"), post = t("blkRepeatPost");
      head.innerHTML = `<span class="bIcon">🔁</span>${pre ? `<span>${pre}</span>` : ""}`;
      const pl = document.createElement("div"); pl.className = "evalpill nodrag";
      pl.appendChild(stepBtn("−", () => { if (n.count > 1) { n.count--; renderScript(); renderPython(); } }));
      const num = document.createElement("span"); num.className = "stepNum"; num.textContent = n.count;
      pl.appendChild(num);
      pl.appendChild(stepBtn("+", () => { if (n.count < 9) { n.count++; renderScript(); renderPython(); } }));
      head.appendChild(pl);
      const ps = document.createElement("span"); ps.textContent = post; head.appendChild(ps);
    } else {
      head.innerHTML = `<span class="bIcon">🔀</span><span>${t("blkIfPre")} ${esc(n.cond)} ${t("blkIfPost")}</span>`;
    }
    head.appendChild(delBtn(n));
    wrap.appendChild(head);
    const mid = document.createElement("div"); mid.className = "ec-mid";
    const arm = document.createElement("div"); arm.className = "ec-arm";
    const body = document.createElement("div"); body.className = "ec-body";
    renderContainer(n.body, body, false);
    mid.appendChild(arm); mid.appendChild(body);
    wrap.appendChild(mid);
    const foot = document.createElement("div"); foot.className = "ec-foot"; wrap.appendChild(foot);
    return wrap;
  }
  const rowEl = document.createElement("div");
  rowEl.className = "progNode nodeRow";
  const blk = blockEl(n, n);
  attachDragSource(blk, () => ({ type: "move", node: n }));
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
function containers() {
  const list = [program];
  for (const n of program) if (n.body) list.push(n.body);
  return list;
}
function findParent(n) { for (const arr of containers()) if (arr.includes(n)) return arr; return program; }
function removeNode(n) { const arr = findParent(n); const i = arr.indexOf(n); if (i >= 0) arr.splice(i, 1); }

// ===== 드롭 + 드래그 =====
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
    const s = Math.min(window.innerWidth / 1340, window.innerHeight / 800);
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
  if (zone !== drag.overZone) { drag.overZone?.classList.remove("over"); drag.overZone = zone; zone?.classList.add("over"); }
}
function onDragEnd() {
  window.removeEventListener("pointermove", onDragMove);
  if (!drag) return;
  const { payload, overZone, moved } = drag;
  drag.clone.remove();
  drag.overZone?.classList.remove("over");
  drag = null;
  if (overZone) dropInto(payload, overZone._container, overZone._index);
  else if (!moved && payload.type === "new") program.push(node(payload.spec));
  renderScript(); renderPython();
}
function dropInto(payload, container, index) {
  const intoBody = container !== program;
  if (payload.type === "new") {
    if (isContainerKind(payload.spec.kind) && intoBody) { flashToast(getLang() === "ko" ? "여기엔 넣을 수 없어요" : "can't drop here"); return; }
    container.splice(index, 0, node(payload.spec));
  } else {
    const n = payload.node;
    if (isContainerKind(n.kind) && intoBody) { flashToast(getLang() === "ko" ? "여기엔 넣을 수 없어요" : "can't drop here"); return; }
    const from = findParent(n);
    const fromIdx = from.indexOf(n);
    if (from === container) { from.splice(fromIdx, 1); if (index > fromIdx) index--; container.splice(index, 0, n); }
    else { from.splice(fromIdx, 1); container.splice(index, 0, n); }
  }
}
function zoneUnder(x, y) {
  const prev = drag.clone.style.display;
  drag.clone.style.display = "none";
  const el = document.elementFromPoint(x, y);
  drag.clone.style.display = prev;
  return el ? el.closest(".dropzone") : null;
}

// ===== 파이썬 코드 =====
function renderPython() {
  const lines = [];
  if (prob.prelude) lines.push(`${esc(prob.prelude.name)} = <span class="num">${esc(prob.prelude.value)}</span>`);
  genPy(program, 0, lines);
  if (lines.length === (prob.prelude ? 1 : 0)) {
    els.pyCode.innerHTML = `<span class="cm"># ${getLang() === "ko" ? "여기에 블록을 넣어봐" : "add blocks here"}</span>`;
    if (prob.prelude) els.pyCode.innerHTML = lines[0] + "\n" + els.pyCode.innerHTML;
    return;
  }
  els.pyCode.innerHTML = lines.join("\n");
}
function genPy(arr, depth, out) {
  const pad = "    ".repeat(depth);
  for (const n of arr) {
    if (n.kind === "print") out.push(`${pad}<span class="fn">print</span>(<span class="str">"${esc(n.text)}"</span>)`);
    else if (n.kind === "printvar") out.push(`${pad}<span class="fn">print</span>(${esc(n.name)})`);
    else if (n.kind === "printlen") out.push(`${pad}<span class="fn">print</span>(<span class="fn">len</span>(<span class="str">"${esc(n.text)}"</span>))`);
    else if (n.kind === "printsum") out.push(`${pad}<span class="fn">print</span>(<span class="num">${n.a}</span> + <span class="num">${n.b}</span>)`);
    else if (n.kind === "printmax") out.push(`${pad}<span class="fn">print</span>(<span class="fn">max</span>(<span class="num">${n.a}</span>, <span class="num">${n.b}</span>))`);
    else if (n.kind === "printmin") out.push(`${pad}<span class="fn">print</span>(<span class="fn">min</span>(<span class="num">${n.a}</span>, <span class="num">${n.b}</span>))`);
    else if (n.kind === "setvar") out.push(`${pad}${esc(n.name)} = ${n.isStr ? `<span class="str">"${esc(n.value)}"</span>` : `<span class="num">${esc(n.value)}</span>`}`);
    else if (n.kind === "repeat") {
      out.push(`${pad}<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">${n.count}</span>):`);
      if (n.body.length === 0) out.push(`${pad}    <span class="kw">pass</span>`); else genPy(n.body, depth + 1, out);
    } else if (n.kind === "if") {
      out.push(`${pad}<span class="kw">if</span> ${escCond(n.cond)}:`);
      if (n.body.length === 0) out.push(`${pad}    <span class="kw">pass</span>`); else genPy(n.body, depth + 1, out);
    }
  }
}
function escCond(c) {
  return esc(c).replace(/(&gt;=|&lt;=|==|&gt;|&lt;)/g, '<span class="kw">$1</span>').replace(/(\d+)/g, '<span class="num">$1</span>');
}

// ===== 실행(인터프리터) =====
function execProgram(prog, vars, out) {
  for (const n of prog) {
    if (out.length > 200) return;
    if (n.kind === "print") out.push(n.text);
    else if (n.kind === "printvar") out.push(String(vars[n.name] ?? ""));
    else if (n.kind === "printlen") out.push(String([...String(n.text)].length));
    else if (n.kind === "printsum") out.push(String(Number(n.a) + Number(n.b)));
    else if (n.kind === "printmax") out.push(String(Math.max(Number(n.a), Number(n.b))));
    else if (n.kind === "printmin") out.push(String(Math.min(Number(n.a), Number(n.b))));
    else if (n.kind === "setvar") vars[n.name] = n.value;
    else if (n.kind === "repeat") { for (let i = 0; i < n.count; i++) execProgram(n.body, vars, out); }
    else if (n.kind === "if") { if (evalCond(n.cond, vars)) execProgram(n.body, vars, out); }
  }
}
function evalCond(cond, vars) {
  const m = String(cond).match(/(\w+)\s*(>=|<=|==|>|<)\s*(\d+)/);
  if (!m) return false;
  const v = Number(vars[m[1]] ?? 0), num = Number(m[3]);
  return m[2] === ">=" ? v >= num : m[2] === "<=" ? v <= num : m[2] === "==" ? v === num : m[2] === ">" ? v > num : v < num;
}

function run() {
  if (running) return;
  const out = [];
  execProgram(program, { ...(prob.vars || {}) }, out);
  if (out.length === 0) { flashToast(t("toastEmpty")); return; }
  renderConsole(out);
  const ok = out.length === prob.expected.length && out.every((v, i) => v === prob.expected[i]);
  if (ok) { running = true; setTimeout(() => { running = false; winProblem(); }, 600); }
  else flashToast(t("pyWrong"));
}
function renderConsole(out) {
  els.conHead.textContent = t("consoleHead");
  if (!out) { els.conOut.innerHTML = `<div class="conEmpty">${t("consoleEmpty")}</div>`; return; }
  els.conOut.innerHTML = out.map(l => `<div class="conLine">${esc(l)}</div>`).join("");
}

// ===== 클리어 =====
function winProblem() {
  confetti();
  const last = probIdx >= problems().length - 1;
  const ov = els.clearOverlay;
  ov.innerHTML = `
    <div class="clearCard">
      <h2></h2>
      <div class="clearLesson">${breakSentences(last ? t("pyAllClearBody") : prob.lesson)}</div>
      <div class="clearBtns" id="clearBtns"></div>
    </div>`;
  ov.querySelector(".clearCard").insertBefore(raimiImg("cFace"), ov.querySelector("h2"));
  ov.querySelector("h2").textContent = last ? "🏆 " + t("pyAllClearTitle") : "🎉 " + t("clearTitleWord");
  const btns = ov.querySelector("#clearBtns");
  btns.appendChild(cBtn(t("clearRetry"), "secondary", () => { hideOverlay(); openProblem(probIdx); }));
  if (last) btns.appendChild(cBtn(t("clearMenu"), "primary", () => { hideOverlay(); show("s-home"); }));
  else btns.appendChild(cBtn(t("clearNextPy"), "primary", () => { hideOverlay(); openProblem(probIdx + 1); }));
  ov.classList.add("show");
}
function cBtn(txt, cls, fn) { const b = document.createElement("button"); b.className = "cBtn " + cls; b.textContent = txt; b.onclick = fn; return b; }
function hideOverlay() { els.clearOverlay.classList.remove("show"); }

// ===== 토스트 / 컨페티 =====
let toastTimer = null;
function flashToast(msg) {
  if (toastTimer) { clearTimeout(toastTimer); document.getElementById("pyToast")?.remove(); }
  const tEl = document.createElement("div");
  tEl.className = "toast"; tEl.textContent = breakSentences(msg); tEl.id = "pyToast";
  els.root.appendChild(tEl);
  requestAnimationFrame(() => tEl.classList.add("show"));
  toastTimer = setTimeout(() => { document.getElementById("pyToast")?.remove(); toastTimer = null; }, 2200);
}
function confetti() {
  const emo = ["🎉", "⭐", "✨", "🎊", "💜", "💛"];
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("span");
    s.className = "confetti"; s.textContent = emo[i % emo.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
    s.style.fontSize = (16 + Math.random() * 18) + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3200);
  }
}
