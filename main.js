// main.js v3.0 - Paraula Ràpida complet amb Gremi: Diccionari + Tips + Mini-Joc

let estat = JSON.parse(localStorage.getItem('paraulaRapida_v3')) || {
  nivellActual: 1,
  monedes: 20,
  xp: 0,
  recordRacha: 0,
  compres: [], // ids de packs comprats
  idioma: 'ca'
};

let idioma = estat.idioma;
let EMOJIS_JUGABLES = []; // base + packs comprats
let CATEGORIES_EMOJI = {}; // {persona: ['👨',...], animal: ['🐱',...],...}
let FRASES_MINIJOC = [];
let fraseActual = null;
let seleccioActual = [];

const NIVELL_MINIJOC = {
  nivelActual: 1,
  xp: 0,
  xpPerNivel: 100
};

const TRADUCCIONS = {
  ca: {app: 'Paraula Ràpida', mapa: 'Mapa', gremi: 'Gremi', botiga: 'Botiga', diccionari: 'Diccionari', tips: 'Tips', minijoc: 'Mini-Joc', monedes: 'Monedes', nivell: 'Nivell', novaFrase: 'Nova frase', comprovar: 'Comprovar', correcte: '✅ Correcte!', incorrecte: '❌ Prova de nou'},
  es: {app: 'Paraula Ràpida', mapa: 'Mapa', gremi: 'Gremi', botiga: 'Tienda', diccionari: 'Diccionario', tips: 'Tips', minijoc: 'Mini-Juego', monedes: 'Monedas', nivell: 'Nivel', novaFrase: 'Nueva frase', comprovar: 'Comprobar', correcte: '✅ ¡Correcto!', incorrecte: '❌ Prueba de nuevo'},
  en: {app: 'Fast Word', mapa: 'Map', gremi: 'Guild', botiga: 'Shop', diccionari: 'Dictionary', tips: 'Tips', minijoc: 'Mini-Game', monedes: 'Coins', nivell: 'Level', novaFrase: 'New phrase', comprovar: 'Check', correcte: '✅ Correct!', incorrecte: '❌ Try again'}
};

// === INIT ===
function init() {
  carregarDades();
  aplicarIdioma();
  actualitzarUI();
  canviarTab('mapa');
}
document.addEventListener('DOMContentLoaded', init);

function carregarDades() {
  // Emojis base de emoji-data.js
  let base = [];
  if (typeof EMOJI_DATA!== 'undefined') base = EMOJI_DATA;

  // Packs comprats de botiga-data.js
  let packsComprats = [];
  if (typeof BOTIGA_DATA!== 'undefined') {
    packsComprats = BOTIGA_DATA.filter(p => estat.compres.includes(p.id));
  }

  // Combina base + packs
  EMOJIS_JUGABLES = [...base];
  packsComprats.forEach(pack => {
    EMOJIS_JUGABLES = EMOJIS_JUGABLES.concat(pack.emojis);
  });
  // Elimina duplicats per emoji
  EMOJIS_JUGABLES = EMOJIS_JUGABLES.filter((v,i,a) => a.findIndex(t => t.emoji === v.emoji) === i);

  // Agrupa per categoria
  CATEGORIES_EMOJI = {};
  EMOJIS_JUGABLES.forEach(e => {
    const cat = e.categoria || 'altres';
    if (!CATEGORIES_EMOJI[cat]) CATEGORIES_EMOJI[cat] = [];
    if (!CATEGORIES_EMOJI[cat].includes(e.emoji)) {
      CATEGORIES_EMOJI[cat].push(e.emoji);
    }
  });

  // Frases de frases-data.js
  if (typeof FRASES_DATA!== 'undefined' && FRASES_DATA.frases) {
    FRASES_MINIJOC = FRASES_DATA.frases;
  }
}

function guardarEstat() {
  localStorage.setItem('paraulaRapida_v3', JSON.stringify(estat));
}

function actualitzarUI() {
  document.getElementById('coins').textContent = `🪙 ${estat.monedes} ${TRADUCCIONS[idioma].monedes}`;
  document.getElementById('nivell-actual').textContent = `${TRADUCCIONS[idioma].nivell} ${NIVELL_MINIJOC.nivelActual} - B${NIVELL_MINIJOC.nivelActual}`;
}

// === NAVEGACIÓ ===
function canviarTab(tab, e) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (e) e.currentTarget.classList.add('active');

  if (tab === 'gremi') mostrarGremi();
  if (tab === 'botiga') mostrarBotiga();
  if (tab === 'mapa') mostrarMapa();
}

function aplicarIdioma() {
  document.getElementById('app-titol').textContent = TRADUCCIONS[idioma].app;
  document.getElementById('tab-mapa-txt').textContent = TRADUCCIONS[idioma].mapa;
  document.getElementById('tab-gremi-txt').textContent = TRADUCCIONS[idioma].gremi;
  document.getElementById('tab-botiga-txt').textContent = TRADUCCIONS[idioma].botiga;
  document.getElementById('idioma-select').value = idioma;
}

function canviarIdioma(nouIdioma) {
  idioma = nouIdioma;
  estat.idioma = nouIdioma;
  guardarEstat();
  aplicarIdioma();
  actualitzarUI();
  if (document.getElementById('tab-gremi').classList.contains('active')) mostrarGremi();
}

// === GREMI ===
function mostrarGremi(tab = 'diccionari', e) {
  document.querySelectorAll('#biblioteca-subtabs.sub-tab-btn').forEach(b => b.classList.remove('active'));
  if (e) e.target.classList.add('active');
  document.getElementById('biblioteca-subtabs').style.display = 'flex';
  mostrarBibliotecaTab(tab, e);
}

function mostrarBibliotecaTab(tab, e) {
  document.querySelectorAll('#biblioteca-subtabs.sub-tab-btn').forEach(b => b.classList.remove('active'));
  if (e) e.target.classList.add('active');

  const cont = document.getElementById('gremi-contenidor');
  cont.innerHTML = '';

  if (tab === 'diccionari') {
    let html = `<h3>${TRADUCCIONS[idioma].diccionari}</h3><div class="diccionari-grid">`;
    EMOJIS_JUGABLES.forEach(e => {
      html += `<div class="emoji-item" title="${e.categoria}">${e.emoji}</div>`;
    });
    html += `</div>`;
    cont.innerHTML = html;
  }

  if (tab === 'tips') {
    const nivell = NIVELL_MINIJOC.nivelActual;
    let html = `<h3>${TRADUCCIONS[idioma].tips}</h3><p style="text-align:center;color:#888;margin-bottom:15px;">Nivell ${nivell}</p>`;

    ['gramatica', 'vocabulari', 'cultura'].forEach(cat => {
      if (typeof TIPS_DATA!== 'undefined' && TIPS_DATA[cat]) {
        const tipsFiltrats = TIPS_DATA[cat].filter(t => t.nivell <= nivell);
        const tip = tipsFiltrats[Math.floor(Math.random() * tipsFiltrats.length)];
        if (tip) {
          const trad = tip[idioma] || tip.ca;
          html += `
            <div style="background:#1a1a1a;padding:15px;border-radius:12px;margin-bottom:15px;">
              <div style="color:#4CAF50;font-size:12px;font-weight:700;text-transform:uppercase;margin-bottom:8px;">${cat}</div>
              <h4 style="margin:0 0 8px 0;">${trad.titol}</h4>
              <p style="margin:0;color:#aaa;line-height:1.5;">${trad.text}</p>
            </div>
          `;
        }
      }
    });
    html += `<button class="btn btn-sec" onclick="mostrarBibliotecaTab('tips')" style="width:100%;">🔄 Següent tip</button>`;
    cont.innerHTML = html;
  }
}

// === MINI-JOC ===
function iniciarMinijoc() {
  if (FRASES_MINIJOC.length === 0) return;

  const plantilla = FRASES_MINIJOC[Math.floor(Math.random() * FRASES_MINIJOC.length)];
  fraseActual = generarFraseAmbEmojis(plantilla);
  seleccioActual = [];

  const cont = document.getElementById('gremi-contenidor');
  let html = `<h3>${TRADUCCIONS[idioma].minijoc}</h3>`;
  html += `<div style="background:#1a1a1a;padding:15px;border-radius:12px;margin-bottom:15px;text-align:center;">`;
  html += `<p style="color:#888;margin-bottom:10px;">${TRADUCCIONS[idioma].novaFrase}:</p>`;
  html += `<div style="font-size:18px;font-weight:600;">${fraseActual.text}</div>`;
  html += `</div>`;

  html += `<div id="frase-construida" style="min-height:50px;background:#0a0a0a;border:2px dashed #333;border-radius:10px;padding:10px;margin-bottom:15px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;"></div>`;

  html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(60px,1fr));gap:8px;margin-bottom:15px;">`;
  fraseActual.opcions.forEach((emoji, idx) => {
    html += `<button class="btn btn-sec" onclick="seleccionarEmoji('${emoji}', ${idx}, this)" style="font-size:28px;padding:12px;">${emoji}</button>`;
  });
  html += `</div>`;

  html += `<button class="btn btn-principal" onclick="comprovarMinijoc()" style="width:100%;">${TRADUCCIONS[idioma].comprovar}</button>`;
  html += `<div id="feedback-minijoc" style="margin-top:15px;text-align:center;font-weight:700;"></div>`;

  cont.innerHTML = html;
}

function generarFraseAmbEmojis(plantilla) {
  let text = plantilla.text;
  let resposta = [];
  let opcions = [];

  plantilla.categories.forEach(cat => {
    const emojisCat = CATEGORIES_EMOJI[cat] || ['❓'];
    const emoji = emojisCat[Math.floor(Math.random() * emojisCat.length)];
    text = text.replace(`{${cat}}`, emoji);
    resposta.push(emoji);
    opcions.push(emoji);
  });

  // Afegeix emojis extra per confondre
  const altresCats = Object.keys(CATEGORIES_EMOJI).filter(c =>!plantilla.categories.includes(c));
  while (opcions.length < 8 && altresCats.length > 0) {
    const catRandom = altresCats[Math.floor(Math.random() * altresCats.length)];
    const emoji = CATEGORIES_EMOJI[catRandom][Math.floor(Math.random() * CATEGORIES_EMOJI[catRandom].length)];
    if (!opcions.includes(emoji)) opcions.push(emoji);
  }

  return {text, resposta: resposta.sort(), opcions: opcions.sort(() => Math.random() - 0.5)};
}

function seleccionarEmoji(emoji, idx, btn) {
  if (btn.disabled) return;
  seleccioActual.push(emoji);
  btn.disabled = true;
  const slot = document.createElement('span');
  slot.style.fontSize = '32px';
  slot.textContent = emoji;
  slot.onclick = () => treureEmoji(emoji, idx, btn, slot);
  document.getElementById('frase-construida').appendChild(slot);
}

function treureEmoji(emoji, idx, btn, slot) {
  seleccioActual = seleccioActual.filter(e => e!== emoji);
  btn.disabled = false;
  slot.remove();
}

function comprovarMinijoc() {
  const feedback = document.getElementById('feedback-minijoc');
  const correcte = JSON.stringify(seleccioActual.sort()) === JSON.stringify(fraseActual.resposta);

  if (correcte) {
    feedback.style.color = '#4CAF50';
    feedback.textContent = TRADUCCIONS[idioma].correcte;
    NIVELL_MINIJOC.xp += 20;
    estat.monedes += 5;
    estat.xp += 10;
    estat.recordRacha++;
    if (NIVELL_MINIJOC.xp >= NIVELL_MINIJOC.xpPerNivel) {
      NIVELL_MINIJOC.nivelActual++;
      NIVELL_MINIJOC.xp = 0;
    }
    guardarEstat();
    actualitzarUI();
    setTimeout(iniciarMinijoc, 1500);
  } else {
    feedback.style.color = '#f44336';
    feedback.textContent = `${TRADUCCIONS[idioma].incorrecte} ${fraseActual.resposta.join(' ')}`;
    estat.recordRacha = 0;
  }
}

// === BOTIGA ===
function mostrarBotiga() {
  const cont = document.getElementById('botiga-contenidor');
  if (typeof BOTIGA_DATA === 'undefined') {
    cont.innerHTML = '<p>No hi ha packs disponibles</p>';
    return;
  }

  let html = '<div class="botiga-grid">';
  BOTIGA_DATA.forEach(pack => {
    const comprat = estat.compres.includes(pack.id);
    html += `
      <div class="pack-card ${comprat? 'comprat' : ''}">
        <div style="font-size:40px;margin-bottom:10px;">${pack.emoji}</div>
        <h4>${pack.nom}</h4>
        <p style="color:#888;margin:8px 0;">${pack.preu} monedes</p>
        <button class="btn ${comprat? 'btn-sec' : 'btn-principal'}"
                ${comprat? 'disabled' : ''}
                onclick="comprarPack('${pack.id}', ${pack.preu})">
          ${comprat? 'Comprat' : 'Comprar'}
        </button>
      </div>
    `;
  });
  html += '</div>';
  cont.innerHTML = html;
}

function comprarPack(id, preu) {
  if (estat.monedes >= preu &&!estat.compres.includes(id)) {
    estat.monedes -= preu;
    estat.compres.push(id);
    guardarEstat();
    actualitzarUI();
    carregarDades(); // Recarrega emojis amb el nou pack
    mostrarBotiga();
  }
}

// === MAPA ===
function mostrarMapa() {
  const cont = document.getElementById('mapa-nivells');
  let html = '';
  for (let i = 1; i <= 100; i++) {
    const bloquejat = i > NIVELL_MINIJOC.nivelActual + 1;
    const completat = i < NIVELL_MINIJOC.nivelActual;
    const actiu = i === NIVELL_MINIJOC.nivelActual;
    html += `<div class="nivell-btn ${bloquejat? 'bloquejat' : ''} ${completat? 'completat' : ''} ${actiu? 'actiu' : ''}"
             onclick="${bloquejat? '' : `seleccionarNivell(${i})`}">
             ${bloquejat? '🔒' : completat? '✅' : i}
             </div>`;
  }
  cont.innerHTML = html;
}

function seleccionarNivell(nivell) {
  NIVELL_MINIJOC.nivelActual = nivell;
  actualitzarUI();
  mostrarGremi();
  setTimeout(iniciarMinijoc, 100);
}