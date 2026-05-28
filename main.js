// ===== ESTADO DEL JUEGO =====
let estat = {
  monedes: parseInt(localStorage.getItem('pr_monedes')) || 0,
  nivell: parseInt(localStorage.getItem('pr_nivell')) || 1,
  idioma: localStorage.getItem('pr_idioma') || 'ca',
  packsComprats: JSON.parse(localStorage.getItem('pr_packs')) || ['base'],
  emojisDesbloquejats: JSON.parse(localStorage.getItem('pr_emojis')) || [],
  tipActual: null,
  minijoc: {fraseObjectiu: null, emojisTriats: [], emojisDisponibles: []}
};

const LANGS = {
  ca: {app_titol: "Paraula Ràpida", monedes: "Monedes", nivell: "Nivell", tab_mapa: "Mapa", tab_gremi: "Gremi", tab_lectura: "Lectura", tab_tips: "Tips", tab_botiga: "Botiga", minijoc_titol: "Arma la frase", minijoc_desc: "Tria els emojis per formar la frase", comprovar: "Comprovar", correcte: "Correcte!", incorrecte: "No és així. Era:", no_prou_monedes: "No tens prou monedes!", comprat: "Comprat"},
  es: {app_titol: "Paraula Ràpida", monedes: "Monedas", nivell: "Nivel", tab_mapa: "Mapa", tab_gremi: "Gremio", tab_lectura: "Lectura", tab_tips: "Tips", tab_botiga: "Tienda", minijoc_titol: "Arma la frase", minijoc_desc: "Elige los emojis para formar la frase", comprovar: "Comprobar", correcte: "¡Correcto!", incorrecte: "No es así. Era:", no_prou_monedes: "¡No tienes suficientes monedas!", comprat: "Comprado"},
  en: {app_titol: "Paraula Ràpida", monedes: "Coins", nivell: "Level", tab_mapa: "Map", tab_gremi: "Guild", tab_lectura: "Reading", tab_tips: "Tips", tab_botiga: "Shop", minijoc_titol: "Build the phrase", minijoc_desc: "Pick emojis to form the phrase", comprovar: "Check", correcte: "Correct!", incorrecte: "Not quite. It was:", no_prou_monedes: "Not enough coins!", comprat: "Bought"}
};

let LANG = LANGS[estat.idioma];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  aplicarIdioma();
  actualitzarUI();
  carregarMapa();
  carregarBotiga();
  carregarTips();
  carregarLectura();
});

function aplicarIdioma() {
  document.getElementById('app-titol').textContent = LANG.app_titol;
  document.getElementById('text-monedes').textContent = LANG.monedes;
  document.getElementById('tab-mapa-txt').textContent = LANG.tab_mapa;
  document.getElementById('tab-gremi-txt').textContent = LANG.tab_gremi;
  document.getElementById('tab-lectura-txt').textContent = LANG.tab_lectura;
  document.getElementById('tab-tips-txt').textContent = LANG.tab_tips;
  document.getElementById('tab-botiga-txt').textContent = LANG.tab_botiga;
  document.getElementById('idioma-display').textContent = `Idioma: ${estat.idioma.toUpperCase()}`;
}

function canviarTab(tab, e) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  if(e) e.target.closest('.nav-item').classList.add('active');

  // Cargar contenido al cambiar de tab
  if(tab === 'gremi') mostrarGremi('diccionari');
  if(tab === 'tips') carregarTips();
  if(tab === 'lectura') carregarLectura();
  if(tab === 'botiga') carregarBotiga();
}

function guardarEstat() {
  localStorage.setItem('pr_monedes', estat.monedes);
  localStorage.setItem('pr_nivell', estat.nivell);
  localStorage.setItem('pr_idioma', estat.idioma);
  localStorage.setItem('pr_packs', JSON.stringify(estat.packsComprats));
  localStorage.setItem('pr_emojis', JSON.stringify(estat.emojisDesbloquejats));
}

function actualitzarUI() {
  document.getElementById('coins').innerHTML = `🪙 ${estat.monedes}`;
  document.getElementById('nivell-text').textContent = `${LANG.nivell} ${estat.nivell}`;
}

function vibrar() {
  if (navigator.vibrate) navigator.vibrate(20);
}

// ===== MAPA =====
function carregarMapa() {
  const mapaDiv = document.getElementById('mapa');
  if(!mapaDiv) return;
  mapaDiv.innerHTML = '';
  for(let i=1; i<=100; i++) {
    const completat = i < estat.nivell;
    const desbloquejat = i <= estat.nivell;
    const card = document.createElement('div');
    card.className = 'capitol-card' + (completat? ' completat' : '') + (!desbloquejat? ' bloquejat' : '');
    card.innerHTML = `
      <div class="capitol-icona">${i}</div>
      <h3>Nivell ${i}</h3>
      ${completat? '✓ Completat' : desbloquejat? `<button class="btn" onclick="jugarNivell(${i})">Jugar</button>` : '<p style="color:#888;">Bloquejat</p>'}
    `;
    mapaDiv.appendChild(card);
  }
}

function jugarNivell(n) {
  estat.nivell = Math.max(estat.nivell, n);
  guardarEstat();
  mostrarModal(`Nivell ${n} - Properament amb frases adaptades!`);
}

// ===== GREMI =====
function mostrarGremi(tab, e) {
  document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  if(e) e.target.classList.add('active');
  if(tab === 'diccionari') mostrarDiccionari();
  else if(tab === 'minijoc') mostrarMinijoc();
}

function mostrarDiccionari() {
  const cont = document.getElementById('gremi-contenidor');
  if(!cont) return;
  const emojisDesbloquejats = getEmojisDesbloquejats();
  let html = '<h3>Biblioteca d\'Emojis</h3>';
  for(const [cat, emojis] of Object.entries(EMOJI_DATA.emojis.B1)) {
    html += `<h4 style="margin:15px 0 8px; color:var(--accent); text-transform:capitalize;">${cat}</h4>`;
    html += '<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px;">';
    for(const [emoji, desc] of Object.entries(emojis)) {
      const desbloquejat = emojisDesbloquejats.includes(emoji);
      const opacidad = desbloquejat? '1' : '0.2';
      const filtro = desbloquejat? '' : 'grayscale(1)';
      html += `<div style="text-align:center; padding:12px; background:var(--card); border-radius:10px; opacity:${opacidad}; filter:${filtro};">
        <div style="font-size:42px;">${emoji}</div>
        <div style="font-size:13px; margin-top:6px;">${desc}</div>
      </div>`;
    }
    html += '</div>';
  }
  cont.innerHTML = html;
}

// ===== MINIJOC =====
function mostrarMinijoc() {
  const cont = document.getElementById('gremi-contenidor');
  if(!cont) return;
  cont.innerHTML = `
    <h3>${LANG.minijoc_titol}</h3>
    <p style="color:var(--text-sec); margin:12px 0;">${LANG.minijoc_desc}</p>
    <div id="minijoc-frase" style="background:var(--card); padding:15px; border-radius:12px; min-height:50px; margin-bottom:15px; text-align:center; font-size:18px;">
      Prem "Nova frase" per començar
    </div>
    <button class="btn btn-sec" onclick="novaFraseMinijoc()" style="margin-bottom:15px;">Nova frase</button>
    <div id="minijoc-emojis" class="emoji-grid"></div>
    <div id="minijoc-triats" style="background:var(--card); padding:15px; border-radius:12px; min-height:50px; margin:15px 0; text-align:center; font-size:24px;"></div>
    <button class="btn" onclick="comprovarMinijoc()">${LANG.comprovar}</button>
    <div id="minijoc-feedback" style="margin-top:15px;"></div>
  `;
  novaFraseMinijoc();
}

function novaFraseMinijoc() {
  const emojisDisponibles = getEmojisDesbloquejats();
  if(emojisDisponibles.length < 2) {
    document.getElementById('minijoc-frase').textContent = "Compra més emojis per jugar!";
    return;
  }
  const nivellFrases = estat.nivell <= 30? 1 : estat.nivell <= 70? 2 : 3;
  const frasesNivell = window.FRASES_DATA?.[nivellFrases] || [];
  if(frasesNivell.length === 0) return;
  const frase = frasesNivell[Math.floor(Math.random()*frasesNivell.length)];
  estat.minijoc.fraseObjectiu = frase;
  estat.minijoc.emojisTriats = [];
  document.getElementById('minijoc-frase').textContent = frase[estat.idioma].text;
  document.getElementById('minijoc-triats').textContent = '';
  document.getElementById('minijoc-feedback').innerHTML = '';
  generarEmojisMinijoc(frase[estat.idioma].solution);
}

function generarEmojisMinijoc(solucio) {
  const emojisJugador = getEmojisDesbloquejats();
  const emojisFalsos = emojisJugador.filter(e =>!solucio.includes(e)).sort(() => 0.5 - Math.random()).slice(0, 10 - solucio.length);
  const emojisAMostrar = [...solucio,...emojisFalsos].sort(() => 0.5 - Math.random());
  estat.minijoc.emojisDisponibles = emojisAMostrar;
  let html = '';
  emojisAMostrar.forEach((emoji, i) => {
    html += `<div class="emoji-item" onclick="triarEmojiMinijoc(${i})"><div class="emoji-large">${emoji}</div></div>`;
  });
  document.getElementById('minijoc-emojis').innerHTML = html;
}

function triarEmojiMinijoc(index) {
  vibrar();
  const emoji = estat.minijoc.emojisDisponibles[index];
  const maxEmojis = estat.minijoc.fraseObjectiu[estat.idioma].solution.length;
  if(estat.minijoc.emojisTriats.length < maxEmojis) {
    estat.minijoc.emojisTriats.push(emoji);
    document.getElementById('minijoc-triats').textContent = estat.minijoc.emojisTriats.join(' ');
  }
}

function comprovarMinijoc() {
  vibrar();
  const solucio = estat.minijoc.fraseObjectiu[estat.idioma].solution.join('');
  const triats = estat.minijoc.emojisTriats.join('');
  const esCorrecte = solucio === triats;
  const feedback = document.getElementById('minijoc-feedback');
  if(esCorrecte) {
    feedback.innerHTML = `<p style="color:var(--success); font-weight:bold;">${LANG.correcte}</p>`;
    estat.monedes += 5;
    actualitzarUI();
    guardarEstat();
  } else {
    feedback.innerHTML = `<p style="color:var(--danger); font-weight:bold;">${LANG.incorrecte} ${solucio}</p>`;
  }
  setTimeout(() => novaFraseMinijoc(), 2000);
}

// ===== LECTURA =====
function carregarLectura() {
  const cont = document.getElementById('lectura-contenidor');
  if(!cont) return;
  const nivellLectura = estat.nivell <= 25? 1 : estat.nivell <= 75? 2 : 3;
  const text = generarTextLectura(nivellLectura, estat.idioma);
  cont.innerHTML = `
    <div class="lectura-card">
      <div class="tip-header">
        <h3>Lectura Nivell ${nivellLectura}</h3>
        <button class="btn-tts" onclick="parlar('${text.replace(/'/g, "\\'")}', '${estat.idioma}')">🔊</button>
      </div>
      <p id="lectura-text">${text}</p>
      <div class="idioma-btns">
        <button class="btn-lang ${estat.idioma==='ca'?'active':''}" onclick="canviarIdiomaLectura('ca')">CA</button>
        <button class="btn-lang ${estat.idioma==='es'?'active':''}" onclick="canviarIdiomaLectura('es')">ES</button>
        <button class="btn-lang ${estat.idioma==='en'?'active':''}" onclick="canviarIdiomaLectura('en')">EN</button>
      </div>
      <button class="btn" onclick="carregarLectura()" style="margin-top:20px;">Nova lectura</button>
    </div>
  `;
}

function canviarIdiomaLectura(lang) {
  estat.idioma = lang;
  localStorage.setItem('pr_idioma', lang);
  carregarLectura();
}

// ===== TIPS =====
function carregarTips() {
  const cont = document.getElementById('tips-contenidor');
  if(!cont) return;
  const tip = getRandomTip('gramatica', estat.nivell <= 30? 1 : estat.nivell <= 70? 2 : 3);
  estat.tipActual = tip;
  renderitzarTip(tip, estat.idioma);
}

function renderitzarTip(tip, lang) {
  const cont = document.getElementById('tips-contenidor');
  const trad = getTipTranslation(tip, lang);
  cont.innerHTML = `
    <div class="tip-card">
      <div class="tip-header">
        <h3>${trad.titol}</h3>
        <button class="btn-tts" onclick="parlar('${trad.text.replace(/'/g, "\\'")}', '${lang}')">🔊</button>
      </div>
      <p id="tip-text">${trad.text}</p>
      <div class="idioma-btns">
        <button class="btn-lang ${lang==='ca'?'active':''}" onclick="canviarIdiomaTip('ca')">CA</button>
        <button class="btn-lang ${lang==='es'?'active':''}" onclick="canviarIdiomaTip('es')">ES</button>
        <button class="btn-lang ${lang==='en'?'active':''}" onclick="canviarIdiomaTip('en')">EN</button>
      </div>
      <button class="btn btn-sec" onclick="carregarTips()" style="margin-top:20px;">Següent tip</button>
    </div>
  `;
}

function canviarIdiomaTip(lang) {
  renderitzarTip(estat.tipActual, lang);
}

// ===== TTS =====
function parlar(text, lang) {
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang==='ca'?'ca-ES':lang==='es'?'es-ES':'en-US';
  utter.rate = 0.9;
  speechSynthesis.speak(utter);
}

// ===== BOTIGA =====
function carregarBotiga() {
  const cont = document.getElementById('botiga-contenidor');
  if(!cont) return;
  cont.innerHTML = '';
  Object.values(PACKS_BOTIGA).forEach(pack => {
    const comprat = estat.packsComprats.includes(pack.id);
    const card = document.createElement('div');
    card.className = 'capitol-card';
    card.innerHTML = `
      <div class="capitol-icona">🎁</div>
      <h3>${pack.nom}</h3>
      <p style="color:var(--text-sec); margin:8px 0;">${getPackDescription(pack, estat.idioma)}</p>
      <p style="font-size:24px;">${pack.emojis.slice(0,8).join(' ')}${pack.emojis.length>8?'...':''}</p>
      <button class="btn ${comprat?'btn-sec':''}" onclick="comprarPack('${pack.id}', ${pack.preu})" ${comprat?'disabled':''}>
        ${comprat?LANG.comprat:`🪙 ${pack.preu}`}
      </button>
    `;
    cont.appendChild(card);
  });
}

function comprarPack(id, preu) {
  if(estat.monedes < preu) {
    mostrarModal(LANG.no_prou_monedes);
    return;
  }
  vibrar();
  estat.monedes -= preu;
  estat.packsComprats.push(id);
  const pack = PACKS_BOTIGA[id];
  estat.emojisDesbloquejats = [...new Set([...estat.emojisDesbloquejats,...pack.emojis])];
  guardarEstat();
  actualitzarUI();
  carregarBotiga();
  mostrarModal("Pack desbloquejat!");
}

function getEmojisDesbloquejats() {
  let emojis = [];
  estat.packsComprats.forEach(id => {
    if(PACKS_BOTIGA[id]) emojis = emojis.concat(PACKS_BOTIGA[id].emojis);
  });
  return [...new Set(emojis)];
}

// ===== MODAL =====
let accioPendents = null;
function mostrarModal(text, accio=null) {
  document.getElementById('modalText').textContent = text;
  accioPendents = accio;
  document.getElementById('modal').classList.remove('hidden');
}
function tancarModal() {
  document.getElementById('modal').classList.add('hidden');
  accioPendents = null;
}
function confirmarAccio() {
  tancarModal();
  if(accioPendents) accioPendents();
}