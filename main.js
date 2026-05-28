// main.js v3.3 - Amb lectura-content.js separat

let estatJoc = JSON.parse(localStorage.getItem('paraulaRapida_v33')) || {
  nivellActual: 1,
  monedes: 20,
  xp: 0,
  idiomaActual: 'ca-es',
  packsComprats: []
};

let idiomaActual = estatJoc.idiomaActual;
let fraseActual = null;
let emojiSeleccionats = [];
let langAudioActual = 'ca';

function guardarEstat() {
  localStorage.setItem('paraulaRapida_v33', JSON.stringify(estatJoc));
}

function getDificultatPerNivell(nivell) {
  if (nivell <= 25) return 1;
  if (nivell <= 75) return 2;
  return 3;
}

function getEmojisDesbloquejats(nivell) {
  const dif = getDificultatPerNivell(nivell);
  let base = EMOJI_DATA.filter(e => e.nivell <= dif);
  estatJoc.packsComprats.forEach(packId => {
    const pack = BOTIGA_PACKS.find(p => p.id === packId);
    if (pack && pack.emojis) base = base.concat(pack.emojis);
  });
  return [...new Map(base.map(e => [e.emoji, e])).values()];
}

function getRandomFrase(nivell) {
  const dif = getDificultatPerNivell(nivell);
  const frases = FRASES_DATA[dif] || [];
  const emojisDisp = getEmojisDesbloquejats(nivell).map(e => e.emoji);
  const disponibles = frases.filter(f => f.emojis.every(em => emojisDisp.includes(em)));
  return disponibles.length > 0? disponibles[Math.floor(Math.random() * disponibles.length)] : frases[0];
}

function getTextEnIdioma(obj, lang) {
  const key = lang.split('-')[0];
  return obj[key] || obj.ca;
}

function parlarText(text, langKey) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (langKey === 'ca') utterance.lang = 'ca-ES';
    else if (langKey === 'es') utterance.lang = 'es-ES';
    else utterance.lang = 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}

// === NAVEGACIÓ ===
function mostrarTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  event.currentTarget.classList.add('active');
  if (tab === 'missio') iniciarJoc();
  if (tab === 'gremi') mostrarGremi();
  if (tab === 'botiga') mostrarBotiga();
  if (tab === 'mapa') mostrarMapa();
}

// === JOC ===
window.iniciarJoc = function() {
  const contenidor = document.getElementById('minijoc-container');
  fraseActual = getRandomFrase(estatJoc.nivellActual);
  emojiSeleccionats = [];
  contenidor.innerHTML = `
    <div id="minijoc-titol">Nivell ${estatJoc.nivellActual} - B${getDificultatPerNivell(estatJoc.nivellActual)}</div>
    <div id="frase-objectiu">${fraseActual.ca}</div>
    <div id="frase-construida"></div>
    <div id="grid-emojis"></div>
    <button class="btn-encert" onclick="comprovarFrase()">Comprovar</button>
    <div id="minijoc-feedback"></div>
  `;
  const grid = document.getElementById('grid-emojis');
  const emojis = [...fraseActual.emojis].sort(() => Math.random() - 0.5);
  emojis.forEach((emoji) => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn';
    btn.textContent = emoji;
    btn.onclick = () => afegirEmoji(emoji, btn);
    grid.appendChild(btn);
  });
}

function afegirEmoji(emoji, btn) {
  if (btn.disabled) return;
  emojiSeleccionats.push(emoji);
  btn.disabled = true;
  const slot = document.createElement('span');
  slot.className = 'emoji-slot';
  slot.textContent = emoji;
  slot.onclick = () => {
    emojiSeleccionats = emojiSeleccionats.filter(e => e!== emoji);
    btn.disabled = false;
    slot.remove();
  };
  document.getElementById('frase-construida').appendChild(slot);
}

window.comprovarFrase = function() {
  const feedback = document.getElementById('minijoc-feedback');
  const correcte = JSON.stringify(emojiSeleccionats) === JSON.stringify(fraseActual.emojis);
  if (correcte) {
    feedback.className = 'correcte';
    feedback.innerHTML = `✅ Correcte! <div class="gramatica">${fraseActual.gramatica}</div>`;
    estatJoc.xp += 10;
    estatJoc.monedes += 5;
    estatJoc.nivellActual++;
    guardarEstat();
    actualitzarUI();
    setTimeout(() => mostrarTab('mapa'), 1500);
  } else {
    feedback.className = 'incorrecte';
    feedback.innerHTML = `❌ Prova de nou. Ordre: ${fraseActual.emojis.join(' ')}`;
    emojiSeleccionats = [];
    document.getElementById('frase-construida').innerHTML = '';
    document.querySelectorAll('.emoji-btn').forEach(b => b.disabled = false);
  }
}

// === MAPA ===
window.mostrarMapa = function() {
  const contenidor = document.getElementById('mapa-nivells');
  let html = '';
  for (let i = 1; i <= 100; i++) {
    const bloquejat = i > estatJoc.nivellActual;
    const completat = i < estatJoc.nivellActual;
    const actiu = i === estatJoc.nivellActual;
    html += `<div class="nivell-btn ${bloquejat?'bloquejat':''} ${completat?'completat':''} ${actiu?'actiu':''}"
      onclick="${bloquejat?'':`seleccionarNivell(${i})`}">
      ${bloquejat?'🔒':completat?'✅':i}
    </div>`;
  }
  contenidor.innerHTML = html;
}

window.seleccionarNivell = function(nivell) {
  estatJoc.nivellActual = nivell;
  guardarEstat();
  actualitzarUI();
  mostrarTab('missio');
}

// === GREMI ===
window.mostrarGremi = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  contenidor.innerHTML = `
    <div class="sub-tabs">
      <button class="sub-tab-btn active" onclick="mostrarSubTab('diccionari', this)">📖 Diccionari</button>
      <button class="sub-tab-btn" onclick="mostrarSubTab('memory', this)">🎮 Mini-joc</button>
      <button class="sub-tab-btn" onclick="mostrarSubTab('tips', this)">💡 Tips</button>
      <button class="sub-tab-btn" onclick="mostrarSubTab('lectura', this)">📚 Lectura</button>
    </div>
    <div id="gremi-subcontent"></div>
  `;
  mostrarSubTab('diccionari', document.querySelector('.sub-tab-btn'));
}

window.mostrarSubTab = function(tab, btn) {
  document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'diccionari') mostrarDiccionari();
  if (tab === 'memory') mostrarMemory();
  if (tab === 'tips') mostrarTips();
  if (tab === 'lectura') mostrarLectura();
}

// === DICCIONARI ===
window.mostrarDiccionari = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  const desbloquejats = getEmojisDesbloquejats(estatJoc.nivellActual).map(e => e.emoji);
  contenidor.innerHTML = `
    <h3>📖 Diccionari complet</h3>
    <div class="diccionari-grid">
      ${EMOJI_DATA.map(e => {
        const desbloquejat = desbloquejats.includes(e.emoji);
        return `<div class="emoji-item ${desbloquejat? '' : 'bloquejat'}" title="${e.ca}">${e.emoji}</div>`;
      }).join('')}
    </div>
  `;
}

// === MEMORY ===
window.mostrarMemory = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  contenidor.innerHTML = `<h3>🎮 Mini-joc</h3><p>Pròximament: Memory amb emojis</p>`;
}

// === TIPS amb Parlantito ===
window.mostrarTips = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const categoria = ['gramatica', 'vocabulari', 'cultura'][Math.floor(Math.random() * 3)];
  const tips = TIPS_DATA[nivell].filter(t => t.categoria === categoria);
  const tip = tips[Math.floor(Math.random() * tips.length)];
  langAudioActual = idiomaActual.split('-')[0];
  const renderTip = (langKey) => {
    const titol = getTextEnIdioma(tip, idiomaActual).titol;
    const text = tip[langKey].text;
    return `
      <div class="tip-card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h3>${titol}</h3>
          <button onclick="parlarText('${text.replace(/'/g,"\\'")}', '${langKey}')" class="btn-audio">🔊</button>
        </div>
        <p id="tip-text">${text}</p>
        <div class="lang-audio-buttons">
          <button onclick="canviarLangTip('ca', this)" class="lang-btn ${langKey==='ca'?'active':''}">CA</button>
          <button onclick="canviarLangTip('es', this)" class="lang-btn ${langKey==='es'?'active':''}">ES</button>
          <button onclick="canviarLangTip('en', this)" class="lang-btn ${langKey==='en'?'active':''}">EN</button>
        </div>
      </div>
    `;
  };
  contenidor.innerHTML = renderTip(langAudioActual) + `<button class="btn-nova" onclick="mostrarTips()">🔄 Nou Tip</button>`;
}

window.canviarLangTip = function(langKey, btn) {
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const categoria = ['gramatica', 'vocabulari', 'cultura'][Math.floor(Math.random() * 3)];
  const tips = TIPS_DATA[nivell].filter(t => t.categoria === categoria);
  const tip = tips[Math.floor(Math.random() * tips.length)];
  const text = tip[langKey].text;
  document.getElementById('tip-text').textContent = text;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// === LECTURA: ara agafa només de LECTURA_CONTENT ===
window.mostrarLectura = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const textos = LECTURA_CONTENT[nivell] || LECTURA_CONTENT[1];
  let html = '<h3>📚 Lectures</h3>';
  textos.slice(0,3).forEach((textObj, i) => {
    html += `
      <div class="lectura-card" id="lectura-${i}">
        <h4>Lectura ${i+1} - B${nivell}</h4>
        <button onclick="parlarText('${textObj[langAudioActual].replace(/'/g,"\\'")}', '${langAudioActual}')" class="btn-audio">🔊 Escoltar</button>
        <p class="lectura-text">${textObj[langAudioActual]}</p>
        <div class="lang-audio-buttons">
          <button onclick="canviarLangLectura(${i}, 'ca')" class="lang-btn ${langAudioActual==='ca'?'active':''}">CA</button>
          <button onclick="canviarLangLectura(${i}, 'es')" class="lang-btn ${langAudioActual==='es'?'active':''}">ES</button>
          <button onclick="canviarLangLectura(${i}, 'en')" class="lang-btn ${langAudioActual==='en'?'active':''}">EN</button>
        </div>
      </div>
    `;
  });
  html += `<button class="btn-nova" onclick="mostrarLectura()">🔄 Noves lectures</button>`;
  contenidor.innerHTML = html;
}

window.canviarLangLectura = function(index, langKey) {
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const textos = LECTURA_CONTENT[nivell] || LECTURA_CONTENT[1];
  const textObj = textos[index];
  const card = document.getElementById(`lectura-${index}`);
  card.querySelector('.lectura-text').textContent = textObj[langKey];
  card.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

// === BOTIGA ===
window.mostrarBotiga = function() {
  const contenidor = document.getElementById('botiga-contenidor');
  const packs = [];
  for (let i = 0; i < EMOJI_DATA.length; i += 15) {
    const slice = EMOJI_DATA.slice(i, i + 15);
    packs.push({
      id: `pack${Math.floor(i/15)+1}`,
      nom: `Pack ${Math.floor(i/15)+1}`,
      emoji: slice[0]?.emoji || '📦',
      preu: 20 + Math.floor(i/15) * 10,
      emojis: slice
    });
  }
  let html = '<div class="botiga-grid">';
  packs.forEach(pack => {
    const comprat = estatJoc.packsComprats.includes(pack.id);
    html += `
      <div class="pack-card ${comprat?'comprat':''}">
        <div class="puck">${pack.emoji}</div>
        <h4>${pack.nom}</h4>
        <p>${pack.preu} monedes</p>
        <button ${comprat?'disabled':''} onclick="comprarPack('${pack.id}', ${pack.preu})">
          ${comprat?'Comprat':'Comprar'}
        </button>
      </div>
    `;
  });
  html += '</div>';
  contenidor.innerHTML = html;
}

window.comprarPack = function(id, preu) {
  if (estatJoc.monedes >= preu &&!estatJoc.packsComprats.includes(id)) {
    estatJoc.monedes -= preu;
    estatJoc.packsComprats.push(id);
    guardarEstat();
    actualitzarUI();
    mostrarBotiga();
    alert('Pack desbloquejat! Mira el Diccionari');
  }
}

// === UI ===
function actualitzarUI() {
  document.getElementById('nivell-actual').textContent = `Nivell ${estatJoc.nivellActual} - B${getDificultatPerNivell(estatJoc.nivellActual)}`;
  document.getElementById('monedes').textContent = estatJoc.monedes;
  document.getElementById('xp').textContent = estatJoc.xp;
  document.getElementById('record').textContent = estatJoc.xp;
}

// === IDIOMA GLOBAL ===
document.getElementById('idioma-select').addEventListener('change', (e) => {
  idiomaActual = e.target.value;
  langAudioActual = idiomaActual.split('-')[0];
  estatJoc.idiomaActual = idiomaActual;
  guardarEstat();
});

// === HASH SHORTCUTS ===
function activarTabPerHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'tab-missio') mostrarTab('missio');
  else if (hash === 'tab-botiga') mostrarTab('botiga');
  else if (hash === 'tab-mapa') mostrarTab('mapa');
  else if (hash === 'tab-gremi') mostrarTab('gremi');
}

// === INIT ===
activarTabPerHash();
actualitzarUI();
if (!window.location.hash) mostrarTab('mapa');