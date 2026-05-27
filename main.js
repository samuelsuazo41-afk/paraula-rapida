// main.js - Paraula Ràpida v1.1 - Pack Catalunya complet
// Depèn de: emoji-data.js carregat abans

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
  ],
 4: [
    {text: "El {persona} celebra amb {musica} i {roba} nova", gramatica: "celebrar amb + i", aquaval: "GRAMATICA", tema: "cultura"},
    {text: "La {persona} fotografia el {animal} a {natura} amb {clima} clar", gramatica: "amb + adjectiu", aquaval: "GRAMATICA", tema: "turisme"},
    {text: "El {professio} repara el {transport} i escolta {musica}", gramatica: "i + verb", aquaval: "GRAMATICA", tema: "tecnologia"},
    {text: "La {persona} juga a {esport} i està {emocio}", gramatica: "jugar i estar", aquaval: "GRAMATICA", tema: "esports"},
    {text: "El {persona} veu el partit del {club} i juga a {esport}", gramatica: "veure + i + jugar a", aquaval: "CULTURA", tema: "esports_catalans"},
    {text: "La {persona} balla la {tradicio} amb el {persona}", gramatica: "ballar la + amb", aquaval: "CULTURA", tema: "tradicions"},
    {text: "La {persona} menja {menjar_catala} amb {persona}", gramatica: "menjar amb", aquaval: "CULTURA", tema: "menjar_catala"},
    {text: "El {persona} cuina {menjar_catala} per la festa", gramatica: "cuinar per", aquaval: "CULTURA", tema: "gastronomia"}
  ],
 5: [
    {text: "El {persona} celebra amb {musica}, {roba} i {emocio}", gramatica: "enumeració amb comes", aquaval: "GRAMATICA", tema: "cultura"},
    {text: "La {persona} fotografia el {animal} a {natura} amb {clima} i el {objecte}", gramatica: "amb + i", aquaval: "GRAMATICA", tema: "ciència"},
    {text: "El {professio} repara el {transport} sota el {clima} i escolta {musica}", gramatica: "sota + i", aquaval: "GRAMATICA", tema: "tecnologia"},
    {text: "La {persona} juga a {esport} amb {roba} nova i està {emocio}", gramatica: "amb + i + estar", aquaval: "GRAMATICA", tema: "esports"},
    {text: "El {professio} organitza la {tradicio} i el {persona} juga a {esport} amb el {club}", gramatica: "organitzar + i + jugar a + amb", aquaval: "CULTURA", tema: "catalunya"},
    {text: "La {persona} celebra la victòria del {club} amb {musica} i {tradicio}", gramatica: "celebrar + amb + i", aquaval: "CULTURA", tema: "festa_catalana"},
    {text: "El {persona} i el {persona} tasten {menjar_catala} després de la {tradicio}", gramatica: "tastar després de", aquaval: "CULTURA", tema: "festa_catalana"},
    {text: "La {persona} compra {menjar_catala} al mercat i escolta {musica}", gramatica: "comprar al mercat + i", aquaval: "CULTURA", tema: "vida_quotidiana"}
  ]
};

// === POOLS D'EMOJIS COMPATIBLES ===
const POOLS_COMPATIBLES = {
  persona: EMOJI_DATA.emojis.B1.persona,
  animal: [...EMOJI_DATA.emojis.B1.animal,...EMOJI_DATA.emojis.B2.animal_ext],
  objecte: [...EMOJI_DATA.emojis.B1.objectes_casa,...EMOJI_DATA.emojis.B3.eines,...EMOJI_DATA.emojis.B3.tecnologia],
  professio: EMOJI_DATA.emojis.B2.professio,
  lloc: ["🏠","🏫","🏥","🏖️","🏔️","🏙️","🌳","🌊","🏛️","🗺️","🏟️","🎭"],
  natura: EMOJI_DATA.emojis.B2.natura,
  musica: ["🎵","🎶","🎸","🎹","🎺","🎻","🎤","🎧","🎼","🥁"],
  emocio: EMOJI_DATA.emojis.B2.emotions,
  clima: ["☀️","🌧️","⛈️","❄️","🌤️","🌪️","🌈","🌦️"],
  transport: ["🚗","🚌","🚲","🚆","✈️","🛵","🚤","🚂","🏎️"],
  esport: [...["⚽","🏀","🏐","🎾","🏓","🏸","🥊","🏊","🚴","⚾","🏏","🏉","⛳","🎯","🏹","🎣","🤿","🥋","🏇","🏂","⛷️","🛹","🏆"],...EMOJI_DATA.emojis.B3.esports_catalans],
  roba: ["👕","👗","👖","👟","👠","🧢","👒","🧣","🧤","👚","👛","👜"],
  menjar: EMOJI_DATA.emojis.B1.menjar_basic,
  ciutat: ["🏛️","🗼","🌉","🏙️","🗽","🏰"],
  ciencia: ["🔬","🧪","🧬","🔭","⚗️","🧠","⚛️"],
  cinema: ["🎬","🎥","📽️","🎞️","🍿"],
  simbol: EMOJI_DATA.emojis.B3.simbols,
  bandera: EMOJI_DATA.emojis.B3.banderes,
  tradicio: EMOJI_DATA.emojis.B3.tradicions_catalanes,
  club: EMOJI_DATA.emojis.B3.clubs_catalans,
  menjar_catala: EMOJI_DATA.emojis.B3.menjar_catala
};

// === FILTRE SEMÀNTIC ===
const FILTRE_SEMANTIC = {
  persona: {verbs: ["mira","troba","escolta","va","juga","treballa","compra","porta","llegeix","balla","celebra","fotografia","toca","canta","pinta","cuida","grava","guanya","ensenya","repara","veu","tasta","menja","cuina"]},
  animal: {verbs: ["corre","dorm","juga","amaga","caça","fuig"]},
  professio: {verbs: ["ajuda","repara","ensenya","treballa","compra","fotografia","organitza"]},
  transport: {verbs: ["va","arregla","s'atura","porta","viatja"]},
  esport: {verbs: ["juga a","guanya a","entrena","ensenya","veu"]},
  menjar: {verbs: ["menja","cuina","compra","prova","tasta"]},
  menjar_catala: {verbs: ["menja","cuina","compra","prova","tasta"]},
  tradicio: {verbs: ["balla","organitza","celebra","veu"]},
  club: {verbs: ["veu","juga a","celebra","organitza"]}
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
  if (nivell <= 70) return 3;
  return nivell <= 90? 4 : 5;
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
    "treballar de + professió": "Per dir la professió usem 'treballar de'",
    "se sentir + amb": "'Se sentir' + emoció + 'amb' + causa",
    "mentre + subjuntiu": "'Mentre' introdueix una acció simultània",
    "enumeració amb comes": "Separem elements amb comes abans de la conjunció 'i'",
    "veure + i + jugar a": "Combinem percepció i acció amb 'i'",
    "ballar la + amb": "Estructura per activitats culturals",
    "organitzar + i + jugar a + amb": "Frase complexa amb dos verbs i complement",
    "tastar després de": "Expressió temporal + acció gastronòmica",
    "comprar al mercat + i": "Locució + conjunció"
  };
  return explicacions[gramatica] || "Practica aquesta estructura gramatical";
}

// === GENERADOR PRINCIPAL ===
function generarFrase(nivell) {
  const plantilla = getPlantillesPerNivell(nivell);
  let frase = plantilla.text;
  const verbContext = plantilla.text.toLowerCase();

  const placeholders = frase.match(/{(\w+)}/g) || [];

  placeholders.forEach(ph => {
    const cat = ph.replace(/[{}]/g, '');
    let emoji = "❓";
    let intents = 0;

    do {
      const pool = POOLS_COMPATIBLES[cat] || ["❓"];
      emoji = getRandomFrom(pool);
      intents++;
    } while (intents < 5 &&!esCompatible(cat, verbContext));

    frase = frase.replace(ph, emoji);
  });

  return {
    frase: frase,
    fraseNet: frase.replace(/[^\p{L}\p{N}\s]/gu, '').trim().toLowerCase(),
    gramatica: plantilla.gramatica,
    explicacio: getExplicacio(plantilla.gramatica),
    aquaval: plantilla.aquaval,
    tema: plantilla.tema,
    dificultat: getDificultatPerNivell(nivell)
  };
}

// === INTEGRACIÓ AMB EL JOC ===
function carregarCartaNivell(nivell) {
  const carta = generarFrase(nivell);

  const cartaEl = document.getElementById('carta-actual');
  const feedbackEl = document.getElementById('minijoc-feedback');

  if (cartaEl) cartaEl.innerHTML = carta.frase;
  if (feedbackEl) {
    feedbackEl.dataset.resposta = carta.fraseNet;
    feedbackEl.dataset.gramatica = carta.gramatica;
    feedbackEl.dataset.explicacio = carta.explicacio;
    feedbackEl.dataset.aquaval = carta.aquaval;
    feedbackEl.dataset.tema = carta.tema;
  }

  return carta;
}

// === VALIDACIÓ DE RESPOSTA ===
function validarResposta(respostaUsuari, respostaCorrecta) {
  const neta = respostaUsuari.toLowerCase().trim().replace(/[^\p{L}\p{N}\s]/gu, '');
  return neta === respostaCorrecta;
}

// Export per si uses modules
if (typeof module!== 'undefined') {
  module.exports = {generarFrase, carregarCartaNivell, validarResposta};
     }
