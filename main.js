// main.js v2.8 - Paraula Ràpida simplificat, sense quiz a Tips

let estatJoc = JSON.parse(localStorage.getItem('paraulaRapida_v28')) || {
  nivellActual: 1,
  monedes: 20,
  xp: 0,
  recordRacha: 0,
  packsComprats: [],
  memoryParells: 0,
  idiomaActual: 'ca-es'
};

let idiomaActual = estatJoc.idiomaActual;
let fraseActual = null;
let emojiSeleccionats = [];
let memoryInterval = null;

function guardarEstat() {
  localStorage.setItem('paraulaRapida_v28', JSON.stringify(estatJoc));
}

function getDificultatPerNivell(nivell) {
  if (nivell <= 25) return 1;
  if (nivell <= 75) return 2;
  return 3;
}

function getEmojisPerNivell(nivell) {
  const dif = getDificultatPerNivell(nivell);
  const base = EMOJI_DATA.filter(e => e.nivell <= dif);
  return base.sort(() => Math.random() - 0.5).slice(0, 8);
}

function getRandomFrase(nivell) {
  const dif = getDificultatPerNivell(nivell);
  const frases = FRASES_DATA[dif] || [];
  return frases[Math.floor(Math.random() * frases.length)];
}

function getRandomTip(categoria, nivell) {
  const tips = TIPS_DATA[nivell].filter(t => t.categoria === categoria);
  return tips[Math.floor(Math.random() * tips.length)];
}

function getTipTranslation(tip, lang) {
  const langKey = lang.split('-')[0];
  return { titol: tip[langKey].titol, text: tip[langKey].text };
}

function parlarText(text, lang) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === 'ca') utterance.lang = 'ca-ES';
    else if (lang === 'es') utterance.lang = 'es-ES';
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

  if (tab === 'missio') iniciarMec1();
  if (tab === 'gremi') mostrarGremi();
  if (tab === 'botiga') mostrarBotiga();
  if (tab === 'mapa') mostrarMapa();
}

// === MECÀNICA 1 ===
window.iniciarMec1 = function() {
  const contenidor = document.getElementById('minijoc-container');
  fraseActual = getRandomFrase(estatJoc.nivellActual);
  emojiSeleccionats = [];

  contenidor.innerHTML = `
    <div id="minijoc-titol">Mecànica 1: Construeix la frase</div>
    <div id="instruccio-mec1">Clica els emojis en ordre per formar: "${fraseActual.ca}"</div>
    <div id="frase-objectiu">${fraseActual.ca}</div>
    <div id="frase-construida"></div>
    <div id="grid-emojis"></div>
    <button class="btn-encert" onclick="comprovarMec1()">Comprovar</button>
    <div id="minijoc-feedback"></div>
    <button class="btn-nova" onclick="iniciarMec2()">➡️ Passar a Mecànica 2</button>
  `;

  const grid = document.getElementById('grid-emojis');
  const emojis = [...fraseActual.emojis].sort(() => Math.random() - 0.5);
  emojis.forEach((emoji, idx) => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn';
    btn.textContent = emoji;
    btn.onclick = () => afegirEmoji(emoji, idx, btn);
    grid.appendChild(btn);
  });
}

function afegirEmoji(emoji, idx, btn) {
  if (btn.disabled) return;
  emojiSeleccionats.push(emoji);
  btn.disabled = true;
  const slot = document.createElement('span');
  slot.className = 'emoji-slot';
  slot.textContent = emoji;
  slot.onclick = () => treureEmoji(emoji, idx, btn, slot);
  document.getElementById('frase-construida').appendChild(slot);
}

function treureEmoji(emoji, idx, btn, slot) {
  emojiSeleccionats = emojiSeleccionats.filter(e => e!== emoji);
  btn.disabled = false;
  slot.remove();
}

window.comprovarMec1 = function() {
  const feedback = document.getElementById('minijoc-feedback');
  const correcte = JSON.stringify(emojiSeleccionats) === JSON.stringify(fraseActual.emojis);
  if (correcte) {
    feedback.className = 'correcte';
    feedback.innerHTML = `✅ Correcte! <div class="gramatica">${fraseActual.gramatica}</div>`;
    estatJoc.xp += 10;
    estatJoc.recordRacha++;
    guardarEstat();
    actualitzarUI();
  } else {
    feedback.className = 'incorrecte';
    feedback.innerHTML = `❌ Prova de nou. Ordre correcte: ${fraseActual.emojis.join(' ')}`;
    estatJoc.recordRacha = 0;
  }
}

window.iniciarMec2 = function() {
  const contenidor = document.getElementById('minijoc-container');
  const frase = getRandomFrase(estatJoc.nivellActual);
  const langKey = idiomaActual.split('-')[1];
  contenidor.innerHTML = `
    <div id="minijoc-titol">Mecànica 2: Traducció</div>
    <div id="instruccio-mec2">Escriu en ${langKey}:</div>
    <div id="frase-a-traduir">${frase.ca}</div>
    <input type="text" id="input-traduccio" placeholder="La teva traducció...">
    <button class="btn-encert" onclick="comprovarMec2('${frase[langKey]}')">Comprovar</button>
    <div id="feedback-mec2"></div>
    <button class="btn-nova" onclick="iniciarMec1()">⬅️ Tornar a Mecànica 1</button>
  `;
}

window.comprovarMec2 = function(respostaCorrecta) {
  const input = document.getElementById('input-traduccio').value.toLowerCase().trim();
  const feedback = document.getElementById('feedback-mec2');
  const correcte = input === respostaCorrecta.toLowerCase();
  if (correcte) {
    feedback.className = 'correcte';
    feedback.textContent = '✅ Molt bé!';
    estatJoc.monedes += 5;
    guardarEstat();
    actualitzarUI();
  } else {
    feedback.className = 'incorrecte';
    feedback.textContent = `❌ La resposta era: ${respostaCorrecta}`;
  }
}

// === GREMI AMB SUB-TABS - FIX CLAU AQUÍ ===
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
  btn.classList.add('active'); // ✅ Ara usa btn, no event

  if (window.memoryInterval) {
    clearInterval(window.memoryInterval);
    window.memoryInterval = null;
  }

  if (tab === 'diccionari') mostrarDiccionari();
  if (tab === 'memory') mostrarMemory();
  if (tab === 'tips') mostrarTips();
  if (tab === 'lectura') mostrarLectura();
}

// === DICCIONARI ===
window.mostrarDiccionari = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  const emojis = getEmojisPerNivell(estatJoc.nivellActual);
  contenidor.innerHTML = `
    <h3>📖 Diccionari d'Emojis</h3>
    <div class="diccionari-grid">
      ${emojis.map(e => `<div class="emoji-item" title="${e.ca}">${e.emoji}</div>`).join('')}
    </div>
  `;
}

// === MEMORY ===
window.mostrarMemory = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  estatJoc.memoryParells = 0;

  if (window.memoryInterval) {
    clearInterval(window.memoryInterval);
    window.memoryInterval = null;
  }

  const emojis = getEmojisPerNivell(estatJoc.nivellActual).slice(0,6);
  const parelles = [...emojis,...emojis].sort(() => Math.random()-0.5);

  contenidor.innerHTML = `
    <div class="memory-grid" id="memory-grid"></div>
    <div id="memory-stats">Parells: 0/6 | Temps: 0</div>
  `;

  let temps = 0;
  window.memoryInterval = setInterval(() => {
    temps++;
    const stats = document.getElementById('memory-stats');
    if (stats) stats.textContent = `Parells: ${estatJoc.memoryParells}/6 | Temps: ${temps}`;
  }, 1000);

  const grid = document.getElementById('memory-grid');
  parelles.forEach((e) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.emoji = e.emoji;
    card.onclick = () => voltejarCarta(card);
    grid.appendChild(card);
  });
}

let cartesVoltejades = [];
function voltejarCarta(card) {
  if (card.classList.contains('voltejada') || cartesVoltejades.length === 2) return;
  card.classList.add('voltejada');
  card.textContent = card.dataset.emoji;
  cartesVoltejades.push(card);
  if (cartesVoltejades.length === 2) {
    setTimeout(() => {
      if (cartesVoltejades[0].dataset.emoji === cartesVoltejades[1].dataset.emoji) {
        cartesVoltejades.forEach(c => c.classList.add('acertada'));
        estatJoc.memoryParells++;
        if (estatJoc.memoryParells === 6) {
          clearInterval(window.memoryInterval);
          alert('Guanyat!');
          estatJoc.monedes += 10;
          guardarEstat();
          actualitzarUI();
        }
      } else {
        cartesVoltejades.forEach(c => {
          c.classList.remove('voltejada');
          c.textContent = '';
        });
      }
      cartesVoltejades = [];
    }, 800);
  }
}

// === TIPS SIMPLIFICAT ===
window.mostrarTips = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const categoria = ['gramatica', 'vocabulari', 'cultura'][Math.floor(Math.random() * 3)];
  const tip = getRandomTip(categoria, nivell);
  const data = getTipTranslation(tip, idiomaActual);

  const textCA = tip.ca.text.replace(/'/g, "\\'");
  const textES = tip.es.text.replace(/'/g, "\\'");
  const textEN = tip.en.text.replace(/'/g, "\\'");

  contenidor.innerHTML = `
    <div id="tips-container">
      <div class="tip-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3>${data.titol}</h3>
          <button onclick="parlarText('${textCA}', 'ca')" class="btn-audio">🔊</button>
        </div>
        <p id="tip-text" style="color:var(--text-sec);line-height:1.6;">${data.text}</p>
        <div class="lang-audio-buttons">
          <button onclick="parlarText('${textCA}', 'ca'); canviarTextTip('${textCA}')" class="lang-btn active">CA</button>
          <button onclick="parlarText('${textES}', 'es'); canviarTextTip('${textES}')" class="lang-btn">ES</button>
          <button onclick="parlarText('${textEN}', 'en'); canviarTextTip('${textEN}')" class="lang-btn">EN</button>
        </div>
      </div>
      <button class="btn-nova" onclick="mostrarTips()">🔄 Nou Tip</button>
    </div>
  `;
}

window.canviarTextTip = function(nouText) {
  document.getElementById('tip-text').textContent = nouText;
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
}

// === LECTURA ===
window.mostrarLectura = function() {
  const contenidor = document.getElementById('gremi-subcontent');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const lang = idiomaActual.split('-')[0];
  let html = '<h3>📚 Lectures</h3>';
  for (let i = 0; i < 3; i++) {
    const text = generarTextLectura(nivell, lang);
    html += `
      <div class="lectura-card">
        <h4>Lectura ${i+1} - B${nivell}</h4>
        <button class="btn-audio" onclick="parlarText('${text.replace(/'/g,"\\'")}', '${lang}')">🔊 Escoltar</button>
        <p>${text}</p>
      </div>
    `;
  }
  html += `<button class="btn-nova" onclick="mostrarLectura()">🔄 Noves lectures</button>`;
  contenidor.innerHTML = html;
}

// === MAPA ===
window.mostrarMapa = function() {
  const contenidor = document.getElementById('mapa-contenidor');
  let html = '<div id="mapa-nivells">';
  for (let i = 1; i <= 100; i++) {
    const bloquejat = i > estatJoc.nivellActual + 1;
    const completat = i < estatJoc.nivellActual;
    const actiu = i === estatJoc.nivellActual;
    html += `<div class="nivell-btn ${bloquejat?'bloquejat':''} ${completat?'completat':''} ${actiu?'actiu':''}" onclick="${bloquejat?'':`seleccionarNivell(${i})`}">
      ${bloquejat?'🔒':completat?'✅':i}
      ${!bloquejat &&!completat?i:''}
    </div>`;
  }
  html += '</div>';
  contenidor.innerHTML = html;
}

window.seleccionarNivell = function(nivell) {
  estatJoc.nivellActual = nivell;
  guardarEstat();
  actualitzarUI();
  mostrarTab('missio');
}

// === BOTIGA ===
window.mostrarBotiga = function() {
  const contenidor = document.getElementById('botiga-contenidor');
  let html = '<div class="botiga-grid">';
  BOTIGA_PACKS.forEach(pack => {
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
  if (estatJoc.monedes >= preu) {
    estatJoc.monedes -= preu;
    estatJoc.packsComprats.push(id);
    guardarEstat();
    actualitzarUI();
    mostrarBotiga();
  }
}

// === UI ===
function actualitzarUI() {
  document.getElementById('nivell-actual').textContent = `Nivell ${estatJoc.nivellActual} - B${getDificultatPerNivell(estatJoc.nivellActual)}`;
  document.getElementById('monedes').textContent = estatJoc.monedes;
  document.getElementById('xp').textContent = estatJoc.xp;
  document.getElementById('record').textContent = estatJoc.recordRacha;
}

// === IDIOMA ===
document.getElementById('idioma-select').addEventListener('change', (e) => {
  idiomaActual = e.target.value;
  estatJoc.idiomaActual = idiomaActual;
  guardarEstat();
  iniciarMec1();
});

// === INIT ===
actualitzarUI();
iniciarMec1();