// ====== Pomocne funkcije za datume i pohranu ======
const LOG_KEY = "mojsplit:logs";
const DOW_NAMES = ["ned","pon","uto","sri","cet","pet","sub"];
const MONTHS = ["sij","velj","ozu","tra","svi","lip","srp","kol","ruj","lis","stu","pro"];

function todayKey(d = new Date()){
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,"0"), day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function fmtDate(key){
  const [y,m,d] = key.split("-").map(Number);
  const dt = new Date(y, m-1, d);
  return `${d}. ${MONTHS[m-1]} · ${DOW_NAMES[dt.getDay()]}`;
}
function getLogs(){
  try{ return JSON.parse(localStorage.getItem(LOG_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveLogs(logs){ localStorage.setItem(LOG_KEY, JSON.stringify(logs)); }

function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._tm);
  showToast._tm = setTimeout(()=> t.classList.remove("show"), 1800);
}

// ====== Stanje aplikacije ======
const todayWeekday = new Date().getDay();
const matchedDay = SPLIT.find(d => d.weekday === todayWeekday);
let state = {
  view: "workout",
  dayId: (matchedDay || SPLIT[0]).id,
  openDetails: {} // exerciseName -> bool
};

function currentDay(){ return SPLIT.find(d => d.id === state.dayId); }

// ====== Zadnji put odradjeno ======
function findLastSession(dayId, exerciseName, excludeKey){
  const logs = getLogs();
  const dates = Object.keys(logs).filter(k => k !== excludeKey && logs[k].dayId === dayId && logs[k].entries[exerciseName]).sort().reverse();
  if(!dates.length) return null;
  return { date: dates[0], sets: logs[dates[0]].entries[exerciseName] };
}

// ====== Render: day picker ======
function renderDayPicker(){
  const el = document.getElementById("dayPicker");
  el.innerHTML = "";
  SPLIT.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "plate-btn" + (day.id === state.dayId ? " is-active" : "") + (day.weekday === todayWeekday ? " is-today" : "");
    btn.style.setProperty("--dc", day.color);
    btn.setAttribute("role","tab");
    btn.setAttribute("aria-selected", day.id === state.dayId ? "true" : "false");
    btn.innerHTML = `
      <span class="ring">${day.plate}</span>
      <span class="short">${day.short}</span>
      <span class="type">${day.title}</span>
    `;
    btn.addEventListener("click", () => { state.dayId = day.id; render(); });
    el.appendChild(btn);
  });
}

// ====== Render: workout view ======
function renderWorkout(){
  const day = currentDay();
  const key = todayKey();
  const logs = getLogs();
  if(!logs[key]) logs[key] = { dayId: day.id, entries: {} };
  // ako korisnik danas otvori drugi dan nego sto je zapoceo, azuriraj dayId zapisa samo ako nema unosa jos
  if(Object.keys(logs[key].entries).length === 0) logs[key].dayId = day.id;
  saveLogs(logs);

  const wrap = document.createElement("div");

  const head = document.createElement("div");
  head.className = "day-head";
  head.style.setProperty("--dc", day.color);
  head.innerHTML = `<h1>${day.title}</h1><span class="sub">${day.full} · ${day.exercises.length} vjezbi</span>`;
  wrap.appendChild(head);

  day.exercises.forEach((ex, i) => wrap.appendChild(renderExerciseCard(day, ex, i, key)));

  const main = document.getElementById("app");
  main.innerHTML = "";
  main.appendChild(wrap);
}

function renderExerciseCard(day, ex, idx, dateKey){
  const card = document.createElement("div");
  card.className = "ex-card";
  card.style.setProperty("--dc", day.color);

  const last = findLastSession(day.id, ex.name, dateKey);
  const lastLine = last
    ? `Zadnji put (${fmtDate(last.date)}): ` + last.sets.map(s => (s.w!=="" && s.w!=null ? `${s.w}kg×${s.r||"?"}` : null)).filter(Boolean).join(", ")
    : "Jos nema zabiljezenih rezultata.";

  const detailId = `detail-${day.id}-${idx}`;
  const isOpen = !!state.openDetails[detailId];

  card.innerHTML = `
    <div class="ex-top">
      <p class="ex-name">${ex.name}</p>
      <span class="ex-goal">${ex.goal}</span>
    </div>
    <div class="ex-target"><b>${ex.sets} × ${ex.reps}</b> &nbsp;·&nbsp; RIR ${ex.rir} &nbsp;·&nbsp; odmor ${ex.rest}</div>

    <button class="ex-toggle ${isOpen ? "is-open":""}" data-detail="${detailId}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      Kako izvesti i na sto paziti
    </button>
    <div class="ex-detail ${isOpen ? "is-open":""}" data-detailbody="${detailId}">
      <h4>Izvedba</h4>
      <ol>${ex.how.map(s=>`<li>${s}</li>`).join("")}</ol>
      ${ex.tips.length ? `<h4>Pazi</h4><ul class="tips">${ex.tips.map(s=>`<li>${s}</li>`).join("")}</ul>` : ""}
    </div>

    <p class="last-time">${lastLine}</p>
    <div class="set-rows">
      ${Array.from({length: ex.sets}).map((_,si) => `
        <div class="set-row">
          <span class="set-label">Serija ${si+1}</span>
          <input type="number" inputmode="decimal" step="0.5" class="w-input" data-ex="${ex.name}" data-set="${si}" data-field="w" placeholder="${last && last.sets[si] ? last.sets[si].w : "kg"}">
          <span class="unit">kg</span>
          <span class="x">×</span>
          <input type="number" inputmode="numeric" class="r-input" data-ex="${ex.name}" data-set="${si}" data-field="r" placeholder="${last && last.sets[si] ? last.sets[si].r : "reps"}">
          <span class="unit">reps</span>
        </div>
      `).join("")}
    </div>
    <p class="save-hint" data-savehint="${ex.name}"></p>
  `;

  // popuni postojece vrijednosti za danas ako postoje
  const logs = getLogs();
  const todayEntry = logs[dateKey] && logs[dateKey].entries[ex.name];
  if(todayEntry){
    todayEntry.forEach((s, si) => {
      const wInput = card.querySelector(`input[data-ex="${CSS.escape(ex.name)}"][data-set="${si}"][data-field="w"]`);
      const rInput = card.querySelector(`input[data-ex="${CSS.escape(ex.name)}"][data-set="${si}"][data-field="r"]`);
      if(wInput && s.w != null) wInput.value = s.w;
      if(rInput && s.r != null) rInput.value = s.r;
    });
  }

  // toggle detalja
  card.querySelector(".ex-toggle").addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.detail;
    state.openDetails[id] = !state.openDetails[id];
    e.currentTarget.classList.toggle("is-open");
    card.querySelector(`[data-detailbody="${id}"]`).classList.toggle("is-open");
  });

  // spremanje unosa
  card.querySelectorAll(".set-rows input").forEach(inp => {
    inp.addEventListener("change", () => saveSetInput(dateKey, day.id, ex.name, ex.sets, card));
    inp.addEventListener("blur", () => saveSetInput(dateKey, day.id, ex.name, ex.sets, card));
  });

  return card;
}

function saveSetInput(dateKey, dayId, exName, numSets, card){
  const logs = getLogs();
  if(!logs[dateKey]) logs[dateKey] = { dayId, entries: {} };
  const sets = [];
  for(let si=0; si<numSets; si++){
    const w = card.querySelector(`input[data-ex="${CSS.escape(exName)}"][data-set="${si}"][data-field="w"]`).value;
    const r = card.querySelector(`input[data-ex="${CSS.escape(exName)}"][data-set="${si}"][data-field="r"]`).value;
    sets.push({ w: w === "" ? null : Number(w), r: r === "" ? null : Number(r) });
  }
  const hasAny = sets.some(s => s.w != null || s.r != null);
  if(hasAny){ logs[dateKey].entries[exName] = sets; }
  else { delete logs[dateKey].entries[exName]; }
  saveLogs(logs);
  const hint = card.querySelector(`[data-savehint="${CSS.escape(exName)}"]`);
  if(hint){ hint.textContent = "Spremljeno."; setTimeout(()=>{ if(hint) hint.textContent=""; }, 1200); }
}

// ====== Render: history view ======
function renderHistory(){
  const main = document.getElementById("app");
  main.innerHTML = "";
  const logs = getLogs();
  const dates = Object.keys(logs)
    .filter(k => Object.keys(logs[k].entries).length > 0)
    .sort().reverse();

  const head = document.createElement("div");
  head.className = "day-head";
  head.innerHTML = `<h1 style="color:var(--text)">Povijest</h1><span class="sub">${dates.length} zabiljezenih treninga</span>`;
  main.appendChild(head);

  if(!dates.length){
    main.innerHTML += `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l4 2"/></svg>
      <p>Jos nema unesenih treninga.<br>Zabiljezi prvu seriju na kartici Trening.</p>
    </div>`;
    return;
  }

  dates.forEach(key => {
    const rec = logs[key];
    const day = SPLIT.find(d => d.id === rec.dayId) || {};
    const details = document.createElement("details");
    details.className = "hist-day";
    details.style.setProperty("--dc", day.color || "var(--text-faint)");
    const exNames = Object.keys(rec.entries);
    details.innerHTML = `
      <summary>
        <span class="hist-date">${fmtDate(key)}</span>
        <span class="hist-type">${day.title || "?"} · ${exNames.length} vj.</span>
      </summary>
      <div class="hist-body">
        ${exNames.map(n => `
          <div class="hist-ex">
            <div class="n">${n}</div>
            <div class="sets">${rec.entries[n].map(s => (s.w!=null||s.r!=null) ? `${s.w ?? "?"}kg×${s.r ?? "?"}`:null).filter(Boolean).join("  ·  ") || "—"}</div>
          </div>
        `).join("")}
      </div>
    `;
    main.appendChild(details);
  });
}

// ====== Render: settings view ======
function renderSettings(){
  const main = document.getElementById("app");
  main.innerHTML = `
    <div class="day-head"><h1 style="color:var(--text)">Postavke</h1><span class="sub">podaci se cuvaju lokalno u ovom pregledniku</span></div>

    <div class="settings-block">
      <h3>Izvezi podatke</h3>
      <p>Preuzmi backup svih treninga kao datoteku. Posalji je sebi (npr. na mail ili Drive) pa je uvezi na drugom uredjaju da prebacis povijest izmedju mobitela i racunala.</p>
      <button class="btn" id="btnExport">Preuzmi backup (.json)</button>
    </div>

    <div class="settings-block">
      <h3>Uvezi podatke</h3>
      <p>Ucitaj prethodno preuzetu backup datoteku. Spojit ce se s postojecim podacima u ovom pregledniku.</p>
      <input type="file" id="fileImport" accept="application/json">
    </div>

    <div class="settings-block">
      <h3>Obrisi sve podatke</h3>
      <p>Trajno brise svu povijest treninga iz ovog preglednika. Napravi prvo backup ako nisi siguran.</p>
      <button class="btn danger" id="btnReset">Obrisi sve</button>
    </div>
  `;

  document.getElementById("btnExport").addEventListener("click", () => {
    const data = JSON.stringify(getLogs(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moj-split-backup-${todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup preuzet");
  });

  document.getElementById("fileImport").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const imported = JSON.parse(reader.result);
        const current = getLogs();
        const merged = { ...current, ...imported };
        saveLogs(merged);
        showToast("Podaci uvezeni");
        render();
      }catch(err){
        showToast("Datoteka nije valjana");
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("btnReset").addEventListener("click", () => {
    if(confirm("Sigurno zelis obrisati svu povijest treninga? Ovo se ne moze vratiti.")){
      localStorage.removeItem(LOG_KEY);
      showToast("Podaci obrisani");
      render();
    }
  });
}

// ====== Glavni render ======
function render(){
  document.getElementById("todayLabel").textContent = fmtDate(todayKey());
  renderDayPicker();
  document.querySelectorAll(".bn-btn").forEach(b => {
    const active = b.dataset.view === state.view;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-selected", active ? "true":"false");
  });
  if(state.view === "workout") renderWorkout();
  else if(state.view === "history") renderHistory();
  else renderSettings();
}

document.querySelectorAll(".bn-btn").forEach(btn => {
  btn.addEventListener("click", () => { state.view = btn.dataset.view; render(); });
});

render();

// ====== PWA: service worker (radi i offline u dvorani) ======
if("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
