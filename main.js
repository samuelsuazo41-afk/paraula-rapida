// main.js - Paraula Ràpida v2.0
// Integra emoji-data.js + frases-data.js + 2 mecàniques + Quiz Tips + Parlantito

// === CONFIG PROGRÉS v2.0 ===
let estatJoc = JSON.parse(localStorage.getItem('paraulaRapida_v20')) || {
  nivellActual: 1,
  nivellMaximDesbloquejat: 1,
  encerts: 0,
  fallades: 0,
  encertsEnAquestNivell: 0,
  record: 0,
  monedes: 0
};

let idiomaActual = 'ca-es'; // ca-es, ca-en, es-ca, en-ca
let cartaActual = null;
let fraseConstruida = [];
let cartesVoltejades = [];
let parellsTrobat = 0;
let tipActual = null;

// === Packs de Botiga ===
const PACKS_BOTIGA = {
  base: {nom: "Base B1", preu: 0},
  cultura: {nom: "Cultura Catalana", preu: 500},
  extensio: {nom: "Pack Extensió B2-B3", preu: 350}
};

// === SECCIÓ LECTURA NIVELLADA ===
const NOTES_LECTURA = {
 1: [
    {titol: "El meu dia", text: "Em dic Marta. Sóc estudiant. Cada dia vaig a l'escola amb el meu amic Pau. Ens agrada escoltar música i jugar a futbol."},
    {titol: "La meva casa", text: "Visc en una casa petita amb la meva família. La meva casa té tres habitacions. La meva habitació és blava i m'agrada molt."}
  ],
 2: [
    {titol: "Un viatge a la muntanya", text: "El cap de setmana passat vaig anar a la muntanya amb els meus amics. Vam caminar durant tres hores. El paisatge era preciós i vam fer moltes fotos."},
    {titol: "La meva feina", text: "Treballo en una biblioteca. M'agrada ajudar la gent a trobar llibres. Cada dia llegeixo una mica i aprenc coses noves."}
  ],
 3: [
    {titol: "La Festa Major", text: "Ahir va ser la Festa Major del meu poble. Vam ballar sardanes, vam menjar pa amb tomàquet i vam escoltar música tradicional. Va ser una nit inoblidable."},
    {titol: "Un llibre interessant", text: "He llegit un llibre sobre la història de Catalunya. He après moltes coses sobre el segle XIX. L'autor explica molt bé els fets i recomano el llibre a tothom."}
  ]
};

// === TIPS AMB PARLANTITO CA/ES/EN ===
const TIPS_DATA = {
 1: {ca: {titol: "Article 'el/la'", text: "En català sempre posem l'article davant del nom: el gos, la casa."},
      es: {titol: "Artículo 'el/la'", text: "En catalán siempre ponemos el artículo delante del nombre: el gos, la casa."},
      en: {titol: "Article 'el/la'", text: "In Catalan we always use the article before the noun: el gos, la casa."}},
 2: {ca: {titol: "Preposició 'a'", text: "'A' indica direcció o ubicació: Vaig a l'escola, Estic a casa."},
      es: {titol: "Preposición 'a'", text: "'A' indica dirección o ubicación: Vaig a l'escola, Estic a casa."},
      en: {titol: "Preposition 'a'", text: "'A' shows direction or location: Vaig a l'escola, Estic a casa."}},
 3: {ca: {titol: "Verb 'estar' + adjectiu", text: "'Estar' descriu estats temporals: Estic content, Estàs cansat."},
      es: {titol: "Verbo 'estar' + adjetivo", text: "'Estar' describe estados temporales: Estic content, Estàs cansat."},
      en: {titol: "Verb 'estar' + adjective", text: "'Estar' describes temporary states: Estic content, Estàs cansat."}}
};

// === UTILITATS ===
function getDificultatPerNivell(nivell) {
  if (nivell <= 10) return 1;
  if (nivell <= 30) return 2;
  return 3;
}

function vibrar(patro = [20]) {
  if (navigator.vibrate) navigator.vibrate(patro);
}

function parlarText(text, lang) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ca'? 'ca-ES' : lang === 'es'? 'es-ES' : 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}

// === MECÀNICA 1: ARMA LA FRASE ===
window.novaFrase = function() {
  cartaActual = generarFrase(estatJoc.nivellActual);
  fraseConstruida = [];

  document.getElementById('frase-objectiu').innerHTML = cartaActual.text;
  document.getElementById('frase-construida').innerHTML = '';
  document.getElementById('mec2-container').style.display = 'none';
  document.getElementById('mec1-container').style.display = 'block';

  const grid = document.getElementById('grid-emojis');
  grid.innerHTML = '';

  // Extreu els emojis de la resposta correcta
  const emojisCorrectes = cartaActual.text.match(/<span[^>]*>([^<]+)<\/span>/g)?.map(s => s.replace(/<[^>]+>/g,'')) || [];

  // Afegeix distractors
  const totsEmojis = Object.values(EMOJI_DATA.emojis.B1).flatMap(obj => Object.keys(obj));
  const distractors = totsEmojis.filter(e =>!emojisCorrectes.includes(e)).sort(() => 0.5 - Math.random()).slice(0, 6);
  const botones = [...emojisCorrectes,...distractors].sort(() => 0.5 - Math.random());

  botones.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn';
    btn.textContent = emoji;
    btn.onclick = () => afegirEmoji(emoji, btn);
    grid.appendChild(btn);
  });

  document.getElementById('minijoc-feedback').innerHTML = '';
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
  const emojisCorrectes = cartaActual.text.match(/<span[^>]*>([^<]+)<\/span>/g)?.map(s => s.replace(/<[^>]+>/g,'')) || [];
  const correcte = JSON.stringify(fraseConstruida) === JSON.stringify(emojisCorrectes);

  if (correcte) {
    feedback.className = 'correcte';
    feedback.innerHTML = `✅ Correcte!<br><div class="gramatica">Ben fet!</div>`;
    estatJoc.encerts++;
    estatJoc.encertsEnAquestNivell++;
    estatJoc.monedes += 10;
    vibrar([20]);

    // Passar a Mecànica 2
    setTimeout(() => {
      document.getElementById('mec1-container').style.display = 'none';
      document.getElementById('mec2-container').style.display = 'block';
      document.getElementById('frase-a-traduir').innerHTML = cartaActual.text;
      document.getElementById('input-traduccio').value = '';
      document.getElementById('feedback-mec2').innerHTML = '';
    }, 1500);

    // Pujar nivell
    if (estatJoc.encertsEnAquestNivell >= 25) {
      if (estatJoc.nivellActual === estatJoc.nivellMaximDesbloquejat && estatJoc.nivellActual < 100) {
        estatJoc.nivellMaximDesbloquejat++;
      }
      estatJoc.nivellActual++;
      estatJoc.encertsEnAquestNivell = 0;
    }
    if (estatJoc.nivellActual > estatJoc.record) estatJoc.record = estatJoc.nivellActual;

  } else {
    feedback.className = 'incorrecte';
    feedback.innerHTML = `❌ Intenta-ho de nou!`;
    estatJoc.fallades++;
    vibrar([100]);
  }

  guardarEstat();
  actualitzarUI();
}

// === MECÀNICA 2: TRADUEIX ===
window.comprovarTraduccio = function() {
  const resposta = document.getElementById('input-traduccio').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback-mec2');

  // Aquí pots validar si vols, però de moment acceptem qualsevol cosa
  feedback.className = 'correcte';
  feedback.innerHTML = `✅ Molt bé!`;
  estatJoc.monedes += 5;
  guardarEstat();
  actualitzarUI();

  setTimeout(novaFrase, 1500);
}

window.saltarMec2 = function() {
  novaFrase();
}

// === QUIZ TIPS - NOVA SECCIÓ CONTESTAR ===
window.iniciarQuizTips = function() {
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  tipActual = TIPS_DATA[nivell] || TIPS_DATA[1];

  document.getElementById('quiz-tips-container').style.display = 'block';
  document.getElementById('pregunta-tip').innerHTML = tipActual[idiomaActual.split('-')[0]].text;
  document.getElementById('input-resposta-tip').value = '';
  document.getElementById('feedback-tip').innerHTML = '';
}

window.parlarTip = function() {
  if (tipActual) {
    const lang = idiomaActual.split('-')[0];
    parlarText(tipActual[lang].text, lang);
  }
}

window.comprovarRespostaTip = function() {
  const resposta = document.getElementById('input-resposta-tip').value.trim();
  const feedback = document.getElementById('feedback-tip');

  feedback.className = 'correcte';
  feedback.innerHTML = `✅ Correcte! La resposta era: ${tipActual[idiomaActual.split('-')[0]].text}`;
  estatJoc.monedes += 3;
  guardarEstat();
  actualitzarUI();
}

window.saltarTip = function() {
  document.getElementById('quiz-tips-container').style.display = 'none';
}

// === BOTIGA ===
window.mostrarBotiga = function() {
  const contenidor = document.getElementById('botiga-contenidor');
  let html = `<h3>🛒 Botiga - Monedes: ${estatJoc.monedes}</h3><div class="botiga-grid">`;

  Object.entries(PACKS_BOTIGA).forEach(([id, pack]) => {
    html += `
      <div class="pack-card">
        <h4>${pack.nom}</h4>
        <button onclick="comprarPack('${id}')" ${estatJoc.monedes < pack.preu? 'disabled' : ''}>
          ${pack.preu} monedes
        </button>
      </div>`;
  });
  html += `</div>`;
  contenidor.innerHTML = html;
}

window.comprarPack = function(id) {
  const pack = PACKS_BOTIGA[id];
  if (estatJoc.monedes >= pack.preu) {
    estatJoc.monedes -= pack.preu;
    guardarEstat();
    mostrarBotiga();
    actualitzarUI();
  }
}

// === DICCIONARI ===
window.mostrarDiccionari = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  let html = `<h3>📖 Diccionari d’Emojis</h3><div class="diccionari-grid">`;

  const tots = Object.values(EMOJI_DATA.emojis.B1).flatMap(obj => Object.keys(obj));
  [...new Set(tots)].slice(0, 50).forEach(emoji => {
    html += `<div class="emoji-item">${emoji}</div>`;
  });
  html += `</div>`;
  contenidor.innerHTML = html;
}

// === TIPS ===
window.mostrarTips = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const tip = TIPS_DATA[nivell] || TIPS_DATA[1];
  const lang = idiomaActual.split('-')[0];
  const data = tip[lang];

  contenidor.innerHTML = `
    <div id="tips-container">
      <div class="tip-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3>${data.titol}</h3>
          <button onclick="parlarText('${data.text.replace(/'/g, "\\'")}', '${lang}')" class="btn-audio">🔊</button>
        </div>
        <p style="color:var(--text-sec);line-height:1.6;">${data.text}</p>
      </div>
      <button class="btn-encert" onclick="iniciarQuizTips()">🧠 Contestar</button>
      <div id="quiz-tips-container" style="display:none">
        <p id="pregunta-tip"></p>
        <input type="text" id="input-resposta-tip" placeholder="Escriu la resposta...">
        <button class="btn-encert" onclick="comprovarRespostaTip()">Comprovar</button>
        <button class="btn-secundari" onclick="saltarTip()">Saltar</button>
        <button class="btn-audio" onclick="parlarTip()">🔊 Parlantito</button>
        <div id="feedback-tip"></div>
      </div>
    </div>
  `;
}

// === LECTURA ===
window.mostrarLectura = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const notes = NOTES_LECTURA[nivell] || NOTES_LECTURA[1];

  let html = `<h3>📚 Lectura Nivell B${nivell}</h3>`;
  notes.forEach((nota) => {
    html += `
      <div class="lectura-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h4>${nota.titol}</h4>
          <button onclick="parlarText('${nota.text.replace(/'/g, "\\'")}', 'ca')" class="btn-audio">🔊</button>
        </div>
        <p style="color:var(--text-sec);line-height:1.7;">${nota.text}</p>
      </div>
    `;
  });
  contenidor.innerHTML = html;
}

// === MEMORY ===
window.iniciarMemory = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  const totsEmojis = Object.values(EMOJI_DATA.emojis.B1).flatMap(obj => Object.keys(obj));
  const parells = totsEmojis.sort(() => 0.5 - Math.random()).slice(0, 6);
  const cartes = [...parells,...parells].sort(() => 0.5 - Math.random());

  parellsTrobat = 0;
  cartesVoltejades = [];

  let html = `<div class="memory-grid">`;
  cartes.forEach((emoji, i) => {
    html += `<div class="memory-card" data-emoji="${emoji}" onclick="voltearCarta(this, ${i})">?</div>`;
  });
  html += `</div><div id="memory-stats">Parells: 0/6 | Temps: 60</div>`;
  contenidor.innerHTML = html;

  let temps = 60;
  const timer = setInterval(() => {
    temps--;
    const statsEl = document.getElementById('memory-stats');
    if (statsEl) statsEl.textContent = `Parells: ${parellsTrobat}/6 | Temps: ${temps}`;
    if (temps <= 0 || parellsTrobat >= 6) clearInterval(timer);
  }, 1000);
}

window.voltearCarta = function(card) {
  if (cartesVoltejades.length >= 2 || card.classList.contains('voltejada')) return;
  card.textContent = card.dataset.emoji;
  card.classList.add('voltejada');
  cartesVoltejades.push(card);

  if (cartesVoltejades.length === 2) {
    setTimeout(() => {
      if (cartesVoltejades[0].dataset.emoji === cartesVoltejades[1].dataset.emoji) {
        cartesVoltejades.forEach(c => c.classList.add('acertada'));
        parellsTrobat++;
        estatJoc.monedes += 2;
        guardarEstat();
        actualitzarUI();
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

// === UI I NAVEGACIÓ ===
function guardarEstat() {
  localStorage.setItem('paraulaRapida_v20', JSON.stringify(estatJoc));
}

function actualitzarUI() {
  const header = document.getElementById('app-header');
  const dificultat = getDificultatPerNivell(estatJoc.nivellActual);

  if (header) {
    if (dificultat === 1) {
      header.style.background = 'linear-gradient(135deg, #FF6B35, #F7931E)';
    } else if (dificultat === 2) {
      header.style.background = 'linear-gradient(135deg, #9C27B0, #E91E63)';
    } else {
      header.style.background = 'linear-gradient(135deg, #2196F3, #00BCD4)';
    }
  }

  document.getElementById('nivell-actual').textContent =
    `Nivell ${estatJoc.nivellActual} - B${dificultat} | Progrés: ${estatJoc.encertsEnAquestNivell}/25`;
  document.getElementById('stats').textContent = `Monedes: ${estatJoc.monedes} | Rècord: ${estatJoc.record}`;
}

function generarMapaNivells() {
  const contenedor = document.getElementById('mapa-nivells');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  for (let i = 1; i <= 100; i++) {
    const btn = document.createElement('div');
    btn.className = 'nivell-btn';

    if (i > estatJoc.nivellMaximDesbloquejat) {
      btn.classList.add('bloquejat');
      btn.innerHTML = `🔒<br>${i}`;
    } else if (i < estatJoc.nivellActual) {
      btn.classList.add('completat');
      btn.innerHTML = `✅<br>${i}`;
    } else if (i === estatJoc.nivellActual) {
      btn.classList.add('actiu');
      btn.innerHTML = `🎯<br>${i}`;
    } else {
      btn.innerHTML = `${i}`;
    }

    btn.onclick = () => {
      if (i <= estatJoc.nivellMaximDesbloquejat) {
        estatJoc.nivellActual = i;
        estatJoc.encertsEnAquestNivell = 0;
        canviarTab('missio', null);
        novaFrase();
        generarMapaNivells();
      }
    };
    contenedor.appendChild(btn);
  }
}

window.canviarTab = function(tab, event) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  if (event) event.currentTarget.classList.add('active');

  if (tab === 'mapa') generarMapaNivells();
  if (tab === 'missio') novaFrase();
  if (tab === 'gremi') mostrarDiccionari();
  if (tab === 'botiga') mostrarBotiga();
}

window.mostrarTab = function(tab, event) {
  document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  if (event) event.currentTarget.classList.add('active');

  if (tab === 'diccionari') mostrarDiccionari();
  if (tab === 'minijocs') iniciarMemory();
  if (tab === 'tips') mostrarTips();
  if (tab === 'lectura') mostrarLectura();
}

// Listener per canviar idioma Babel
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('idioma-select');
  if (selector) {
    selector.addEventListener('change', (e) => {
      idiomaActual = e.target.value;
    });
  }
  actualitzarUI();
  novaFrase();
});