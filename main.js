// main.js - Paraula Ràpida v1.4
// + Secció Lectura B1-B2-B3 + Parlantito CA/ES/EN
// 25 aciertos = pasar nivel + Botiga + 2 modos de joc + Header color + Vibració

// === CONFIG PROGRÉS v1.4 ===
let estatJoc = JSON.parse(localStorage.getItem('paraulaRapida_v14')) || {
  nivellActual: 1,
  nivellMaximDesbloquejat: 1,
  encerts: 0,
  fallades: 0,
  encertsEnAquestNivell: 0,
  record: 0,
  monedes: 0,
  emojisDesbloquejats: ["👩","👨","⚽","🐶","🍗","🏠","☀️","🎵","😊"],
  packsComprats: ["base"]
};

let dificultatAnterior = getDificultatPerNivell(estatJoc.nivellActual);
let frasesUsadesRecents = [];
let cartaActual = null;
let fraseConstruida = [];
let cartesVoltejades = [];
let parellsTrobat = 0;

// === Packs de Botiga ===
const PACKS_BOTIGA = {
  base: {nom: "Base B1", preu: 0, emojis: ["👩","👨","⚽","🐶","🍗","🏠","☀️","🎵","😊"]},
  persones: {nom: "Persones Tó Clar", preu: 200, emojis: ["👩🏻","👨🏻","👵🏻","👴🏻","👩‍🦰","👨‍🦱","👶🏻"]},
  natura: {nom: "Natura B2", preu: 350, emojis: ["🦅","🦊","🌲","🌺","🏔️","🌊","🌵","🦋","🐝","🍄","🍁","🍂"]},
  cultura: {nom: "Cultura Catalana", preu: 500, emojis: ["🏰","🎭","🏆","🍅","🎆","💃"]}
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
 1: {
    ca: {titol: "Article 'el/la'", text: "En català sempre posem l'article davant del nom: el gos, la casa."},
    es: {titol: "Artículo 'el/la'", text: "En catalán siempre ponemos el artículo delante del nombre: el gos, la casa."},
    en: {titol: "Article 'el/la'", text: "In Catalan we always use the article before the noun: el gos, la casa."}
  },
 2: {
    ca: {titol: "Preposició 'a'", text: "'A' indica direcció o ubicació: Vaig a l'escola, Estic a casa."},
    es: {titol: "Preposición 'a'", text: "'A' indica dirección o ubicación: Vaig a l'escola, Estic a casa."},
    en: {titol: "Preposition 'a'", text: "'A' shows direction or location: Vaig a l'escola, Estic a casa."}
  },
 3: {
    ca: {titol: "Verb 'estar' + adjectiu", text: "'Estar' descriu estats temporals: Estic content, Estàs cansat."},
    es: {titol: "Verbo 'estar' + adjetivo", text: "'Estar' describe estados temporales: Estic content, Estàs cansat."},
    en: {titol: "Verb 'estar' + adjective", text: "'Estar' describes temporary states: Estic content, Estàs cansat."}
  }
};

let idiomaTip = 'ca';

// === PLANTILLES DE FRASES ===
const PLANTILLES_FRASES = {
 1: [
    {text: "El {persona} mira el {objecte}", gramatica: "article + nom", aquaval: "VOCABULARI", tema: "bàsic"},
    {text: "La {persona} troba el {objecte} a {lloc}", gramatica: "preposició a + lloc", aquaval: "GRAMATICA", tema: "turisme"},
    {text: "El {animal} corre per {natura}", gramatica: "verb + preposició per", aquaval: "GRAMATICA", tema: "natura"},
    {text: "La {persona} escolta {musica}", gramatica: "verb + nom", aquaval: "VOCABULARI", tema: "música"},
    {text: "El {persona} està {emocio} avui", gramatica: "verb estar + adjectiu", aquaval: "GRAMATICA", tema: "emocions"},
    {text: "Fa {clima} a {lloc}", gramatica: "expressió impersonal", aquaval: "GRAMATICA", tema: "temps"},
    {text: "El {persona} va a {lloc} amb el {transport}", gramatica: "anar a + amb", aquaval: "GRAMATICA", tema: "turisme"},
    {text: "La {persona} juga a {esport}", gramatica: "jugar a + esport", aquaval: "GRAMATICA", tema: "esports"},
    {text: "El {persona} treballa de {professio}", gramatica: "treballar de + professió", aquaval: "GRAMATICA", tema: "feina"},
    {text: "La {persona} porta {roba}", gramatica: "verb portar + nom", aquaval: "VOCABULARI", tema: "moda"}
  ],
 2: [
    {text: "El {animal} dorm sota el {objecte}", gramatica: "preposició sota", aquaval: "GRAMATICA", tema: "natura"},
    {text: "La {persona} fotografia el {animal} a {natura}", gramatica: "verb + a + lloc", aquaval: "GRAMATICA", tema: "turisme"},
    {text: "El {persona} toca {musica} amb el {objecte}", gramatica: "tocar amb", aquaval: "GRAMATICA", tema: "música"},
    {text: "La {persona} se sent {emocio} amb el {clima}", gramatica: "se sentir + amb", aquaval: "GRAMATICA", tema: "temps"},
    {text: "El {persona} arregla el {transport}", gramatica: "verb + objecte directe", aquaval: "GRAMATICA", tema: "tecnologia"},
    {text: "La {persona} guanya a {esport} a {lloc}", gramatica: "guanyar a + lloc", aquaval: "GRAMATICA", tema: "esports"},
    {text: "El {professio} ajuda a la {persona} a {lloc}", gramatica: "ajudar a + a", aquaval: "GRAMATICA", tema: "ciència"},
    {text: "La {persona} compra {roba} a {lloc}", gramatica: "comprar a + lloc", aquaval: "GRAMATICA", tema: "moda"}
  ],
 3: [
    {text: "El {persona} i el {persona} van a {lloc} amb {transport}", gramatica: "conjunció i + anar", aquaval: "GRAMATICA", tema: "turisme"},
    {text: "La {persona} toca {musica} mentre el {animal} juga", gramatica: "mentre + subjuntiu", aquaval: "GRAMATICA", tema: "música"},
    {text: "El {professio} repara el {transport} sota el {clima}", gramatica: "sota + nom", aquaval: "GRAMATICA", tema: "tecnologia"},
    {text: "La {persona} porta {roba} i escolta {musica}", gramatica: "conjunció i", aquaval: "GRAMATICA", tema: "moda"},
    {text: "El {animal} amaga el {objecte} a {natura} amb {clima}", gramatica: "amagar a + amb", aquaval: "GRAMATICA", tema: "natura"},
    {text: "La {persona} està {emocio} i balla {musica}", gramatica: "estar + i + verb", aquaval: "GRAMATICA", tema: "música"}
  ]
};

// === POOLS D'EMOJIS ===
const POOLS_COMPATIBLES = {
  persona: ["👩","👨","👵","👴","👧","👦","👶","👩‍🦰","👨‍🦱","👩‍🦳","👨‍🦳"],
  animal: ["🐶","🐱","🐰","🐻","🦊","🦁","🐯","🐮","🐷","🐸","🦅","🦋","🐝"],
  objecte: ["🏠","📱","💻","📚","🖊️","🕶️","👜","🎒","☕","🍎","🎁"],
  professio: ["👨‍🏫","👩‍⚕️","👨‍🍳","👩‍🔧","👨‍🚀","👩‍🎨","👨‍⚖️"],
  lloc: ["🏠","🏫","🏥","🏖️","🏔️","🏙️","🌳","🌊","🏛️","🗺️","🏟️","🎭"],
  natura: ["🌳","🌲","🌺","🌸","🌼","🍄","🍁","🍂","🌵","🌴"],
  musica: ["🎵","🎶","🎸","🎹","🎺","🎻","🎤","🎧","🎼","🥁"],
  emocio: ["😊","😢","😡","😱","😍","🤔","😴","🥳","😎","🤗"],
  clima: ["☀️","🌧️","⛈️","❄️","🌤️","🌪️","🌈","🌦️"],
  transport: ["🚗","🚌","🚲","🚆","✈️","🛵","🚤","🚂","🏎️"],
  esport: ["⚽","🏀","🏐","🎾","🏓","🏸","🥊","🏊","🚴","⚾","🏏","🏉","⛳","🎯","🏹"],
  roba: ["👕","👗","👖","👟","👠","🧢","👒","🧣","🧤","👚","👛","👜"]
};

const FILTRE_SEMANTIC = {
  persona: {verbs: ["mira","troba","escolta","va","juga","treballa","compra","porta","llegeix","balla","celebra","fotografia","toca","canta","pinta","cuida","grava","guanya","ensenya","repara","veu","tasta","menja","cuina"]},
  animal: {verbs: ["corre","dorm","juga","amaga","caça","fuig"]},
  professio: {verbs: ["ajuda","repara","ensenya","treballa","compra","fotografia","organitza"]},
  transport: {verbs: ["va","arregla","s'atura","porta","viatja"]},
  esport: {verbs: ["juga a","guanya a","entrena","ensenya","veu"]}
};

function esCompatible(categoria, verbContext) {
  if (!FILTRE_SEMANTIC[categoria]) return true;
  return FILTRE_SEMANTIC[categoria].verbs.some(v => verbContext.includes(v));
}

function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDificultatPerNivell(nivell) {
  if (nivell <= 10) return 1;
  if (nivell <= 30) return 2;
  return 3;
}

function getPlantillesPerNivell(nivell) {
  const dif = getDificultatPerNivell(nivell);
  const plantilles = PLANTILLES_FRASES[dif] || PLANTILLES_FRASES[1];
  return getRandomFrom(plantilles);
}

function getExplicacio(gramatica) {
  const explicacions = {
    "article + nom": "En català fem servir l'article 'el/la' davant del nom",
    "preposició a + lloc": "Utilitzem 'a' per indicar direcció o ubicació",
    "verb + preposició per": "'Per' indica moviment a través d'un lloc",
    "verb estar + adjectiu": "'Estar' + adjectiu descriu un estat temporal",
    "expressió impersonal": "Amb 'fer' + clima no cal subjecte: Fa sol, Fa fred",
    "anar a + amb": "'Anar a' + lloc + 'amb' + mitjà de transport",
    "jugar a + esport": "El verb 'jugar' sempre va amb la preposició 'a'",
    "treballar de + professió": "Per dir la professió usem 'treballar de'"
  };
  return explicacions[gramatica] || "Practica aquesta estructura gramatical";
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
      fraseText: frase.replace(/[^\p{L}\p{N}\s]/gu, '').trim(),
      resposta: resposta,
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

// === MECÀNICA 1: ARMA LA FRASE ===
function carregarJugar() {
  cartaActual = generarFrase(estatJoc.nivellActual);
  fraseConstruida = [];

  document.getElementById('frase-objectiu').textContent = cartaActual.fraseText;
  document.getElementById('frase-construida').innerHTML = '';

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
    vibrar([20]);

    const dificultatAbans = getDificultatPerNivell(estatJoc.nivellActual);

    if (estatJoc.encertsEnAquestNivell >= 25) {
      if (estatJoc.nivellActual === estatJoc.nivellMaximDesbloquejat && estatJoc.nivellActual < 100) {
        estatJoc.nivellMaximDesbloquejat++;
        desbloquejarNousEmojis();
      }
      estatJoc.nivellActual++;
      estatJoc.encertsEnAquestNivell = 0;

      const dificultatDespres = getDificultatPerNivell(estatJoc.nivellActual);

      if (dificultatDespres > dificultatAbans) {
        if (dificultatDespres === 2) {
          vibrar([50, 100, 50, 100, 50]); // B1 → B2
        } else if (dificultatDespres === 3) {
          vibrar([100, 50, 100, 50, 200]); // B2 → B3
        }
      }
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

  setTimeout(() => {
    carregarJugar();
    feedback.className = '';
    feedback.innerHTML = '';
  }, 2000);
}

// === MECÀNICA 2: MEMORY ===
window.iniciarMemory = function() {
  const contenidor = document.getElementById('gremi-contenidor');
  const parells = getRandomFromPool(estatJoc.emojisDesbloquejats, 6);
  const cartes = [...parells,...parells].sort(() => Math.random() - 0.5);

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

window.voltearCarta = function(card, index) {
  if (cartesVoltejades.length >= 2 || card.classList.contains('voltejada')) return;
  card.textContent = card.dataset.emoji;
  card.classList.add('voltejada');
  cartesVoltejades.push(card);

  if (cartesVoltejades.length === 2) {
    setTimeout(() => {
      if (cartesVoltejades[0].dataset.emoji === cartesVoltejades[1].dataset.emoji) {
        cartesVoltejades.forEach(c => c.classList.add('acertada'));
        parellsTrobat++;
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
  const contenidor = document.getElementById('botiga-contenidor');
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

// === TIPS ===
function mostrarTips(nivell) {
  const contenidor = document.getElementById('gremi-contenidor');
  const tip = TIPS_DATA[nivell] || TIPS_DATA[1];
  const data = tip[idiomaTip];

  contenidor.innerHTML = `
    <div class="tip-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h3>${data.titol}</h3>
        <button onclick="parlarText('${data.text.replace(/'/g, "\\'")}', '${idiomaTip}')"
                style="background:none;border:none;font-size:24px;cursor:pointer;">🔊</button>
      </div>
      <p style="color:var(--text-sec);line-height:1.6;">${data.text}</p>
      <div class="idioma-selector" style="display:flex;gap:8px;margin-top:20px;">
        <button class="idioma-btn ${idiomaTip==='ca'?'active':''}" onclick="canviarIdiomaTip('ca', ${nivell})">CA</button>
        <button class="idioma-btn ${idiomaTip==='es'?'active':''}" onclick="canviarIdiomaTip('es', ${nivell})">ES</button>
        <button class="idioma-btn ${idiomaTip==='en'?'active':''}" onclick="canviarIdiomaTip('en', ${nivell})">EN</button>
      </div>
    </div>
  `;
}

function canviarIdiomaTip(idioma, nivell) {
  idiomaTip = idioma;
  mostrarTips(nivell);
}

// === LECTURA ===
function mostrarLectura() {
  const contenidor = document.getElementById('gremi-contenidor');
  const nivell = getDificultatPerNivell(estatJoc.nivellActual);
  const notes = NOTES_LECTURA[nivell] || NOTES_LECTURA[1];

  let html = `<h3>📚 Lectura Nivell B${nivell}</h3>`;
  notes.forEach((nota) => {
    html += `
      <div class="lectura-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h4>${nota.titol}</h4>
          <button onclick="parlarText('${nota.text.replace(/'/g, "\\'")}', 'ca')"
                  style="background:none;border:none;font-size:24px;cursor:pointer;">🔊</button>
        </div>
        <p style="color:var(--text-sec);line-height:1.7;">${nota.text}</p>
      </div>
    `;
  });
  contenidor.innerHTML = html;
}

// === UI I NAVEGACIÓ ===
function guardarEstat() {
  localStorage.setItem('paraulaRapida_v14', JSON.stringify(estatJoc));
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

function getRandomFromPool(pool, n) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
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
        carregarJugar();
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
  if (tab === 'missio') carregarJugar();
  if (tab === 'gremi') mostrarDiccionari();
  if (tab === 'botiga') mostrarBotiga();
}

window.mostrarTab = function(tab, event) {
  document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  if (event) event.currentTarget.classList.add('active');

  if (tab === 'diccionari') mostrarDiccionari();
  if (tab === 'minijocs') iniciarMemory();
  if (tab === 'tips') mostrarTips(estatJoc.nivellActual);
  if (tab === 'lectura') mostrarLectura();
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  actualitzarUI();
  carregarJugar();
});