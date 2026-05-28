// main.js - Paraula Ràpida v2.4
// Inclou generarFrase fallback + proteccions nulls

// === CONFIG PROGRÉS v2.4 ===
let estatJoc = JSON.parse(localStorage.getItem('paraulaRapida_v24')) || {
  nivellActual: 1,
  nivellMaximDesbloquejat: 1,
  encerts: 0,
  fallades: 0,
  encertsEnAquestNivell: 0,
  record: 0,
  monedes: 0,
  packsComprats: ["base"]
};

let idiomaActual = 'ca-es';
let cartaActual = null;
let fraseConstruida = [];
let cartesVoltejades = [];
let parellsTrobat = 0;
let tipActual = null;

// === UTILITATS BOTIGA ===
function getEmojisDesbloquejats() {
  if (typeof PACKS_BOTIGA === 'undefined') return ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼"];
  let emojis = [];
  estatJoc.packsComprats.forEach(id => {
    if (PACKS_BOTIGA[id] && PACKS_BOTIGA[id].emojis) {
      emojis = emojis.concat(PACKS_BOTIGA[id].emojis);
    }
  });
  return [...new Set(emojis)];
}

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
    {titol: "La Festa Major", text: "Ahir va ser la Festa Major del meu poble. Vam ballar sardanes, vam menjar pa amb tomàquet i vam escoltar música tradicional. Va va ser una nit inoblidable."},
    {titol: "Un llibre interessant", text: "He llegit un llibre sobre la història de Catalunya. He après moltes coses sobre el segle XIX. L'autor explica molt bé els fets i recomano el llibre a tothom."}
  ]
};

// === GENERAR FRASE - FALLBACK SI NO EXISTEIX FRASES-DATA ===
function generarFrase(nivell) {
  if (typeof FRSES_DATA!== 'undefined' && typeof generarFraseExterna === 'function') {
    return generarFraseExterna(nivell);
  }
  // Fallback bàsic per no petar
  const frasesFallback = [
    {text: "Hola <span class='emoji'>👋</span> com <span class='emoji'>❓</span> estàs <span class='emoji'>😊</span>"},
    {text: "Jo <span class='emoji'>❤️</span> el <span class='emoji'>🐱</span> i el <span class='emoji'>🐶</span>"},
    {text: "Vaig a <span class='emoji'>🏫</span> amb el <span class='emoji'>🚌</span>"}
  ];
  return frasesFallback[Math.floor(Math.random() * frasesFallback.length)];
}

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

  const emojisCorrectes = cartaActual.text.match(/<span[^>]*>([^<]+)<\/span>/g)?.map(s => s.replace(/<[^>]+>/g,'')) || [];
  const totsEmojis = getEmojisDesbloquejats();
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

    setTimeout(() => {
      document.getElementById('mec1-container').style.display = 'none';
      document.getElementById('mec2-container').style.display = 'block';
      document.getElementById('frase-a-traduir').innerHTML = cartaActual.text;
      document.getElementById('input-traduccio').value = '';
      document.getElementById('feedback-mec2').innerHTML = '';
    }, 1500);

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
  const feedback = document.getElementById('feedback-mec2');
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

// === QUIZ TIPS ===
window.iniciarQuizTips = function() {
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const categoria = ['gramatica', 'vocabulari', 'cultura'][Math.floor(Math.random() * 3)];
  tipActual = getRandomTip(categoria, nivell);

  document.getElementById('quiz-tips-container').style.display = 'block';
  const data = getTipTranslation(tipActual, idiomaActual);
  document.getElementById('pregunta-tip').innerHTML = `Què diu el tip sobre "${data.titol}"?`;
  document.getElementById('input-resposta-tip').value = '';
  document.getElementById('feedback-tip').innerHTML = '';
}

window.parlarTip = function() {
  if (tipActual) {
    const lang = idiomaActual.split('-')[0];
    const data = getTipTranslation(tipActual, idiomaActual);
    parlarText(data.text, lang);
  }
}

window.comprovarRespostaTip = function() {
  const feedback = document.getElementById('feedback-tip');
  const data = getTipTranslation(tipActual, idiomaActual);
  feedback.className = 'correcte';
  feedback.innerHTML = `✅ Correcte! La resposta era: ${data.text}`;
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
  if (typeof PACKS_BOTIGA === 'undefined') {
    contenidor.innerHTML = '<p>Carregant botiga...</p>';
    return;
  }
  let html = `<h3>🛒 Botiga - Monedes: ${estatJoc.monedes}</h3><div class="botiga-grid">`;

  Object.values(PACKS_BOTIGA).forEach(pack => {
    const estaComprat = estatJoc.packsComprats.includes(pack.id);
    const puckEmoji = pack.emojis.length > 0? pack.emojis[0] : "📦";

    html += `
      <div class="pack-card ${estaComprat? 'comprat' : ''}">
        <div class="puck" style="font-size:48px;text-align:center;margin-bottom:8px;">${puckEmoji}</div>
        <h4>${pack.nom}</h4>
        ${estaComprat
         ? '<div style="color:#4CAF50">✅ Desbloquejat</div>'
          : `<button onclick="comprarPack('${pack.id}')" ${estatJoc.monedes < pack.preu? 'disabled' : ''}>
               ${pack.preu} monedes
             </button>`
        }
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
    guardarEstat();
    mostrarBotiga();
    actualitzarUI();
  }
}

// === DICCIONARI ===
window.mostrarDiccionari = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  const emojisDesbloquejats = getEmojisDesbloquejats();

  let html = `<h3>📖 Diccionari d’Emojis</h3><div class="diccionari-grid">`;
  emojisDesbloquejats.slice(0, 100).forEach(emoji => {
    html += `<div class="emoji-item">${emoji}</div>`;
  });
  html += `</div>`;
  contenidor.innerHTML = html;
}

// === TIPS ===
window.mostrarTips = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const categoria = ['gramatica', 'vocabulari', 'cultura'][Math.floor(Math.random() * 3)];
  const tip = getRandomTip(categoria, nivell);
  const data = getTipTranslation(tip, idiomaActual);

  contenidor.innerHTML = `
    <div id="tips-container">
      <div class="tip-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3>${data.titol}</h3>
          <button onclick="parlarText('${data.text.replace(/'/g, "\\'")}', '${idiomaActual.split('-')[0]}')" class="btn-audio">🔊</button>
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
  const totsEmojis = getEmojisDesbloquejats();
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
  localStorage.setItem('paraulaRapida_v24', JSON.stringify(estatJoc));
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

// Init
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('idioma-select');
  if (selector) {
    selector.addEventListener('change', (e) => {
      idiomaActual = e.target.value;
    });
  }
  actualitzarUI();
  novaFrase();
  generarMapaNivells();
});