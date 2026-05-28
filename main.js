// main.js - Paraula Ràpida v1.3
// Mecànica: 25 aciertos = pasar nivel + Botiga + 2 modos de joc
// Depèn de: emoji-data.js carregat abans

// === CONFIG PROGRÉS v1.3 ===
let estatJoc = JSON.parse(localStorage.getItem('paraulaRapida_v13')) || {
  nivellActual: 1,
  nivellMaximDesbloquejat: 1,
  encerts: 0,
  fallades: 0,
  encertsEnAquestNivell: 0, // NUEVO: contador para pasar nivel
  record: 0,
  monedes: 0, // NUEVO: moneda para Botiga
  emojisDesbloquejats: ["👩","👨","⚽","🐶","🍗","🏠","☀️","🎵","😊"], // B1 base
  packsComprats: ["base"]
};

// Frases recientes para evitar repetición
let frasesUsadesRecents = [];
let cartaActual = null;
let fraseConstruida = []; // para modo "Arma la frase"

// === Packs de Botiga ===
const PACKS_BOTIGA = {
  base: {nom: "Base B1", preu: 0, emojis: ["👩","👨","⚽","🐶","🍗","🏠","☀️","🎵","😊"]},
  persones: {nom: "Persones Tó Clar", preu: 200, emojis: ["👩🏻","👨🏻","👵🏻","👴🏻","👩‍🦰","👨‍🦱","👶🏻"]},
  natura: {nom: "Natura B2", preu: 350, emojis: ["🦅","🦊","🌲","🌺","🏔️","🌊","🌵","🦋","🐝","🍄","🍁","🍂"]},
  cultura: {nom: "Cultura Catalana", preu: 500, emojis: ["🏰","🎭","🏆","🍅","🎆","💃"]}
};

// === PLANTILLES DE FRASES === [tu código igual, lo mantengo]
const PLANTILLES_FRASES = {... };

// === POOLS D'EMOJIS === [tu código igual]
const POOLS_COMPATIBLES = {... };

// === FILTRE SEMÀNTIC === [tu código igual]
const FILTRE_SEMANTIC = {... };
function esCompatible(categoria, verbContext) {... }
function getRandomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function getDificultatPerNivell(nivell) {... }
function getPlantillesPerNivell(nivell) {... }
function getExplicacio(gramatica) {... }

// === GENERADOR PRINCIPAL CON ANTI-REPETICIÓN ===
function generarFrase(nivell) {
  let carta, intents = 0;
  do {
    const plantilla = getPlantillesPerNivell(nivell);
    let frase = plantilla.text;
    const verbContext = plantilla.text.toLowerCase();
    const placeholders = frase.match(/{(\w+)}/g) || [];
    const resposta = [];

    placeholders.forEach(ph => {
      const cat = ph.replace(/[{}]/g, '');
      let emoji = "❓";
      let i = 0;
      do {
        const pool = POOLS_COMPATIBLES[cat] || ["❓"];
        emoji = getRandomFrom(pool.filter(e => estatJoc.emojisDesbloquejats.includes(e)));
        i++;
      } while (i < 5 &&!esCompatible(cat, verbContext));
      resposta.push(emoji);
      frase = frase.replace(ph, emoji);
    });

    carta = {
      fraseText: frase.replace(/[^\p{L}\p{N}\s]/gu, '').trim(), // texto para mostrar
      resposta: resposta, // array d'emojis en ordre correcte
      gramatica: plantilla.gramatica,
      explicacio: getExplicacio(plantilla.gramatica),
      aquaval: plantilla.aquaval,
      tema: plantilla.tema,
      dificultat: getDificultatPerNivell(nivell)
    };
    intents++;
  } while (frasesUsadesRecents.includes(carta.fraseText) && intents < 10);

  frasesUsadesRecents.push(carta.fraseText);
  if (frasesUsadesRecents.length > 10) frasesUsadesRecents.shift();

  return carta;
}

// === MECÀNICA 1: ARMA LA FRASE - Tab Jugar ===
function carregarJugar() {
  cartaActual = generarFrase(estatJoc.nivellActual);
  fraseConstruida = [];

  document.getElementById('frase-objectiu').textContent = cartaActual.fraseText;
  document.getElementById('frase-construida').innerHTML = '';

  // Generar 8-10 botones: los correctos + distractores
  const grid = document.getElementById('grid-emojis');
  grid.innerHTML = '';

  const distractors = getRandomFromPool(estatJoc.emojisDesbloquejats, 6);
  const botones = [...cartaActual.resposta,...distractors].sort(() => Math.random() - 0.5);

  botones.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn';
    btn.textContent = emoji;
    btn.onclick = () => afegirEmoji(emoji, btn);
    grid.appendChild(btn);
  });
}

function afegirEmoji(emoji, btn) {
  fraseConstruida.push(emoji);
  const zona = document.getElementById('frase-construida');
  const span = document.createElement('span');
  span.textContent = emoji;
  span.className = 'emoji-slot';
  span.onclick = () => {
    fraseConstruida = fraseConstruida.filter(e => e!== emoji);
    zona.removeChild(span);
    btn.disabled = false;
  };
  zona.appendChild(span);
  btn.disabled = true;
}

window.comprovarFrase = function() {
  const feedback = document.getElementById('minijoc-feedback');
  const correcte = JSON.stringify(fraseConstruida) === JSON.stringify(cartaActual.resposta);

  if (correcte) {
    feedback.className = 'correcte';
    feedback.innerHTML = `✅ Correcte!<br><div class="gramatica">${cartaActual.gramatica}: ${cartaActual.explicacio}</div>`;
    estatJoc.encerts++;
    estatJoc.encertsEnAquestNivell++;
    estatJoc.monedes += 10;

    // CONDICIÓN PASAR NIVELL
    if (estatJoc.encertsEnAquestNivell >= 25) {
      if (estatJoc.nivellActual === estatJoc.nivellMaximDesbloquejat && estatJoc.nivellActual < 100) {
        estatJoc.nivellMaximDesbloquejat++;
        desbloquejarNousEmojis();
      }
      estatJoc.nivellActual++;
      estatJoc.encertsEnAquestNivell = 0;
    }
    if (estatJoc.nivellActual > estatJoc.record) estatJoc.record = estatJoc.nivellActual;

  } else {
    feedback.className = 'incorrecte';
    feedback.innerHTML = `❌ Intenta-ho de nou!`;
    estatJoc.fallades++;
  }

  guardarEstat();
  actualitzarUI();

  setTimeout(() => {
    carregarJugar();
    feedback.className = '';
    feedback.innerHTML = '';
  }, 2000);
}

// === MECÀNICA 2: MEMORY - Tab Mini-joc ===
window.iniciarMemory = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  const parells = getRandomFromPool(estatJoc.emojisDesbloquejats, 6);
  const cartes = [...parells,...parells].sort(() => Math.random() - 0.5);

  let html = `<div class="memory-grid">`;
  cartes.forEach((emoji, i) => {
    html += `<div class="memory-card" data-emoji="${emoji}" onclick="voltearCarta(this, ${i})">?</div>`;
  });
  html += `</div><div id="memory-stats">Parells: 0/6 | Temps: 60</div>`;
  contenidor.innerHTML = html;

  // Timer de 60s
  let temps = 60, parellsTrobat = 0;
  const timer = setInterval(() => {
    temps--;
    document.getElementById('memory-stats').textContent = `Parells: ${parellsTrobat}/6 | Temps: ${temps}`;
    if (temps <= 0 || parellsTrobat >= 6) {
      clearInterval(timer);
      if (parellsTrobat >= 6) {
        estatJoc.monedes += 5;
        guardarEstat();
        actualitzarUI();
      }
    }
  }, 1000);
}

let cartesVoltejades = [];
window.voltearCarta = function(card, index) {
  if (cartesVoltejades.length >= 2 || card.classList.contains('voltejada')) return;
  card.textContent = card.dataset.emoji;
  card.classList.add('voltejada');
  cartesVoltejades.push(card);

  if (cartesVoltejades.length === 2) {
    setTimeout(() => {
      if (cartesVoltejades[0].dataset.emoji === cartesVoltejades[1].dataset.emoji) {
        cartesVoltejades.forEach(c => c.classList.add('acertada'));
      } else {
        cartesVoltejades.forEach(c => {
          c.textContent = '?';
          c.classList.remove('voltejada');
        });
      }
      cartesVoltejades = [];
    }, 800);
  }
}

// === BOTIGA ===
window.mostrarBotiga = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  let html = `<h3>🛒 Botiga - Monedes: ${estatJoc.monedes}</h3><div class="botiga-grid">`;

  Object.entries(PACKS_BOTIGA).forEach(([id, pack]) => {
    const comprat = estatJoc.packsComprats.includes(id);
    const bloquejat =!comprat && estatJoc.monedes < pack.preu;
    html += `
      <div class="pack-card ${comprat? 'comprat' : ''} ${bloquejat? 'bloquejat' : ''}">
        <h4>${pack.nom}</h4>
        <p>${pack.emojis.slice(0,6).join('')}...</p>
        <button onclick="comprarPack('${id}')" ${comprat || bloquejat? 'disabled' : ''}>
          ${comprat? 'Comprat' : pack.preu + ' monedes'}
        </button>
      </div>`;
  });
  html += `</div>`;
  contenidor.innerHTML = html;
}

window.comprarPack = function(id) {
  const pack = PACKS_BOTIGA[id];
  if (estatJoc.monedes >= pack.preu &&!estatJoc.packsComprats.includes(id)) {
    estatJoc.monedes -= pack.preu;
    estatJoc.packsComprats.push(id);
    estatJoc.emojisDesbloquejats = [...new Set([...estatJoc.emojisDesbloquejats,...pack.emojis])];
    guardarEstat();
    mostrarBotiga();
    actualitzarUI();
  }
}

function desbloquejarNousEmojis() {
  // Desbloqueja 2-3 emojis nous cada 5 nivells
  if (estatJoc.nivellActual % 5 === 0) {
    const tots = Object.values(POOLS_COMPATIBLES).flat();
    const nous = tots.filter(e =>!estatJoc.emojisDesbloquejats.includes(e)).slice(0,3);
    estatJoc.emojisDesbloquejats.push(...nous);
  }
}

// === DICCIONARI ===
window.mostrarDiccionari = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  let html = `<h3>📖 Diccionari d’Emojis</h3><div class="diccionari-grid">`;

  const tots = Object.values(POOLS_COMPATIBLES).flat();
  [...new Set(tots)].forEach(emoji => {
    const desbloquejat = estatJoc.emojisDesbloquejats.includes(emoji);
    html += `<div class="emoji-item ${desbloquejat? '' : 'bloquejat'}">
      ${desbloquejat? emoji : '🔒'}
    </div>`;
  });
  html += `</div>`;
  contenidor.innerHTML = html;
}

// === UI I NAVEGACIÓ ===
function guardarEstat() {
  localStorage.setItem('paraulaRapida_v13', JSON.stringify(estatJoc));
}

function actualitzarUI() {
  document.getElementById('nivell-actual').textContent =
    `Nivell ${estatJoc.nivellActual} - B${getDificultatPerNivell(estatJoc.nivellActual)} | Progrés: ${estatJoc.encertsEnAquestNivell}/25`;
  document.getElementById('stats').textContent = `Monedes: ${estatJoc.monedes} | Rècord: ${estatJoc.record}`;
}

function getRandomFromPool(pool, n) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

function generarMapaNivells() {... tu código igual... }

window.canviarTab = function(tab, event) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  if (event) event.currentTarget.classList.add('active');

  if (tab === 'mapa') generarMapaNivells();
  if (tab === 'missio') carregarJugar();
  if (tab === 'gremi') mostrarDiccionari();
}

window.mostrarTab = function(tab, event) {
  document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  if (event) event.currentTarget.classList.add('active');

  if (tab === 'diccionari') mostrarDiccionari();
  if (tab === 'minijocs') iniciarMemory();
  if (tab === 'tips') document.getElementById('gremi-contenidor').innerHTML = '<p style="padding:20px">Tips de gramàtica próximament</p>';
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  actualitzarUI();
  carregarJugar();
});