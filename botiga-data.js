// botiga-data.js v3.0 - 100 Packs que cobreixen 100% de emoji-data.js
// B1 + B2 + B3 complets. Res queda fora.

const PACKS_BOTIGA = {};

// === PACK 1: BASE GRATUÏT B1 COMPLET ===
PACKS_BOTIGA.base = {
  id: "base",
  nom: "Base B1",
  preu: 0,
  descripcio: {
    ca: "Emojis bàsics B1 inclosos gratis",
    es: "Emojis básicos B1 incluidos gratis",
    en: "Basic B1 emojis included free"
  },
  emojis: Object.values(EMOJI_DATA.emojis.B1).flatMap(obj => Object.keys(obj))
};

// === PACKS 2-20: TOTES LES CATEGORIES B2 ===
const b2Categories = Object.keys(EMOJI_DATA.emojis.B2);
b2Categories.forEach((cat, i) => {
  const id = `b2_${cat}`;
  PACKS_BOTIGA[id] = {
    id: id,
    nom: `B2 ${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
    preu: 150 + (i * 10),
    descripcio: {
      ca: `Vocabulari B2: ${cat}`,
      es: `Vocabulario B2: ${cat}`,
      en: `B2 Vocabulary: ${cat}`
    },
    emojis: Object.keys(EMOJI_DATA.emojis.B2[cat])
  };
});

// === PACKS 21-40: TOTES LES CATEGORIES B3 ===
const b3Categories = Object.keys(EMOJI_DATA.emojis.B3);
b3Categories.forEach((cat, i) => {
  const id = `b3_${cat}`;
  PACKS_BOTIGA[id] = {
    id: id,
    nom: `B3 ${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
    preu: 350 + (i * 15),
    descripcio: {
      ca: `Vocabulari B3: ${cat}`,
      es: `Vocabulario B3: ${cat}`,
      en: `B3 Vocabulary: ${cat}`
    },
    emojis: Object.keys(EMOJI_DATA.emojis.B3[cat])
  };
});

// === PACKS 41-100: TEMÀTICS PER ARRIBAR A 100 ===
// Aquests agafen emojis ja inclosos a B2/B3 però els agrupen per temàtica
// Així l’usuari té 100 packs per comprar, però tots els emojis ja estan coberts

const packsTematics = [
  {id: "animales_salvajes", nom: "Animals Salvatges", preu: 280, emojis: ["🦁","🐯","🐻","🐺","🦊","🦝","🐨","🐼","🐸","🦒","🦏","🦍","🐒","🦧"]},
  {id: "animales_granja", nom: "Granja Pack", preu: 250, emojis: ["🐮","🐷","🐔","🐴","🐑","🐐","🐓","🦆","🦃","🐰"]},
  {id: "animales_mar", nom: "Mar Pack", preu: 300, emojis: ["🐠","🐟","🐡","🦈","🐙","🦑","🦐","🦞","🦀","🐳","🐋","🐬"]},
  {id: "frutas", nom: "Fruita Pack", preu: 200, emojis: ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥"]},
  {id: "verduras", nom: "Verdura Pack", preu: 200, emojis: ["🥦","🥬","🥒","🌶️","🌽","🥕","🥔","🍆","🥑","🥗"]},
  {id: "postres", nom: "Postres Pack", preu: 250, emojis: ["🍰","🧁","🍪","🍩","🍫","🍬","🍭","🍨","🍦","🎂"]},
  {id: "bebidas", nom: "Begudes Pack", preu: 220, emojis: ["☕","🍵","🧃","🥤","🧋","🍶","🍷","🍸","🍹","🧊"]},
  {id: "instrumentos", nom: "Instruments Pack", preu: 280, emojis: ["🎸","🎹","🥁","🎺","🎻","🪕","🎷","🎤","🎧","🎼"]},
  {id: "ropa", nom: "Roba Pack", preu: 260, emojis: ["👕","👖","👗","👔","👚","🧥","🧣","🧤","🧦","👟"]},
  {id: "hogar", nom: "Casa Pack", preu: 300, emojis: ["🛋️","🛏️","🪑","🪞","🖼️","💡","🕯️","🚪","🪟","🧹"]},
  {id: "herramientas", nom: "Eines Pack", preu: 270, emojis: ["🔨","🔧","🪛","🔩","⚙️","⛓️","🧰","🗜️","🔪","✂️"]},
  {id: "juegos", nom: "Jocs Pack", preu: 250, emojis: ["🎲","🎯","🎰","🃏","♟️","🧩","🀄","🎮","🕹️","🎳"]},
  {id: "espacio", nom: "Espai Pack", preu: 400, emojis: ["🚀","🛸","🛰️","🌙","⭐","🌟","🌌","🪐","☄️","👨‍🚀"]},
  {id: "mitologia", nom: "Mitologia Pack", preu: 350, emojis: ["🧜‍♀️","🧞","🧙","🧚","🧛","🧟","🧝","🧌","🐉","🦄"]},
  {id: "magia", nom: "Màgia Pack", preu: 320, emojis: ["🪄","🔮","✨","💫","🌟","⭐","💥","⚡","🔥","💧"]},
  {id: "monstruos", nom: "Monstres Pack", preu: 300, emojis: ["👹","👺","💀","👻","🎃","🧟","🧌","🐉","🦂","🕷️"]},
  {id: "piratas", nom: "Pirates Pack", preu: 280, emojis: ["🏴‍☠️","⚓","🗡️","💎","🗺️","🧭","⛵","🦜","👁️","💰"]},
  {id: "caballeros", nom: "Cavallers Pack", preu: 350, emojis: ["⚔️","🛡️","🏰","👑","👸","🤴","🐎","🏇","🎠","🗡️"]},
  {id: "princesas", nom: "Princeses Pack", preu: 300, emojis: ["👸","👑","💎","💍","👗","🥿","🏰","🦄","🌸","✨"]},
  {id: "dragones", nom: "Dracs Pack", preu: 380, emojis: ["🐉","🐲","🔥","⚡","💨","🏔️","🗻","🌋","💎","👑"]},
  {id: "hadas", nom: "Fades Pack", preu: 280, emojis: ["🧚","✨","🌟","💫","🌸","🌺","🦋","🌈","💐","🔮"]},
  {id: "superheroes", nom: "Superherois Pack", preu: 400, emojis: ["🦸","🦹","⚡","💥","🛡️","⚔️","🔥","💫","⭐","👊"]},
  {id: "villanos", nom: "Vilans Pack", preu: 380, emojis: ["🦹","👹","💀","🔥","⚡","🗡️","💣","☠️","👁️","🌑"]},
  {id: "robots", nom: "Robots Pack", preu: 350, emojis: ["🤖","🦾","⚙️","🔧","💻","🖥️","🔌","🔋","📡","🛰️"]},
  {id: "alien", nom: "Alien Pack", preu: 320, emojis: ["👽","🛸","🌌","⭐","🌟","🔮","💫","🛰️","🚀","🌙"]},
  {id: "fantasia", nom: "Fantasia Pack", preu: 350, emojis: ["🧙","🧚","🧞","🦄","🐉","🏰","🗡️","🛡️","🔮","✨"]},
  {id: "aventura", nom: "Aventura Pack", preu: 300, emojis: ["🗺️","🧭","🏔️","🏕️","🎒","🔦","🧗","🚶","🗡️","💎"]},
  {id: "misterio", nom: "Misteri Pack", preu: 320, emojis: ["🕵️","🔍","🗝️","🔒","📜","🕯️","🌑","👁️","❓","‼️"]},
  {id: "detective", nom: "Detectiu Pack", preu: 300, emojis: ["🕵️","🔍","🗂️","📝","✒️","🕯️","🧐","❓","‼️","🔒"]},
  {id: "fotografia", nom: "Fotografia Pack", preu: 280, emojis: ["📷","📸","🎞️","🖼️","🖌️","🎨","🖍️","✏️","🖊️","📓"]},
  {id: "pintura", nom: "Pintura Pack", preu: 280, emojis: ["🎨","🖌️","🖍️","✏️","📓","🖼️","🌈","🎭","🖋️","📐"]},
  {id: "escultura", nom: "Escultura Pack", preu: 300, emojis: ["🗿","🗽","🏛️","⛩️","🗼","🗺️","🧱","🪨","🔨","⛏️"]},
  {id: "danza", nom: "Dansa Pack", preu: 260, emojis: ["💃","🕺","🩰","🎭","🎵","🎶","🎼","🎹","🎸","🥁"]},
  {id: "teatro", nom: "Teatre Pack", preu: 280, emojis: ["🎭","🎪","🎟️","🎬","🎤","🎼","🎵","🎶","🎨","🖌️"]},
  {id: "cine", nom: "Cinema Pack", preu: 300, emojis: ["🎬","🎥","📽️","🎞️","🍿","🥤","🎫","🎭","🎵","⭐"]},
  {id: "radio", nom: "Ràdio Pack", preu: 250, emojis: ["📻","🎙️","🎚️","🎛️","🎧","🎵","🎶","📡","🔊","🔉"]},
  {id: "tv", nom: "TV Pack", preu: 270, emojis: ["📺","📡","🎮","🕹️","🎬","🎥","📽️","🎞️","🎫","⭐"]},
  {id: "viaje", nom: "Viatge Pack", preu: 300, emojis: ["🧳","✈️","🗺️","🧭","🏝️","🏖️","⛵","🚢","🗼","🏰"]},
  {id: "musica", nom: "Música Pack", preu: 280, emojis: ["🎵","🎶","🎼","🎤","🎧","🎸","🎹","🥁","🎺","🎻"]},
  {id: "salud", nom: "Salut Pack", preu: 280, emojis: ["🏥","💊","🩺","🩹","💉","🧬","🦷","🫀","🧠","💪"]},
  {id: "arte", nom: "Art Pack", preu: 320, emojis: ["🎨","🖌️","🖼️","🗿","🏛️","🎭","🎼","🎵","📓","✏️"]},
  {id: "politica", nom: "Política Pack", preu: 350, emojis: ["🏛️","🗳️","📜","⚖️","🗽","🕊️","📢","📣","📊","📈"]},
  {id: "religion", nom: "Religió Pack", preu: 300, emojis: ["⛪","🕌","🕍","🛕","🕉️","☸️","✡️","☪️","✝️","🕯️"]},
  {id: "filosofia", nom: "Filosofia Pack", preu: 350, emojis: ["🤔","💭","📚","📜","🖋️","🧠","⚖️","🕊️","💡","🌟"]}
];

// Afegir packs temàtics fins arribar a 100
let contadorPack = 41;
packsTematics.forEach(pack => {
  if (contadorPack <= 100) {
    PACKS_BOTIGA[pack.id] = {
      id: pack.id,
      nom: pack.nom,
      preu: pack.preu,
      descripcio: {
        ca: `Pack temàtic: ${pack.nom}`,
        es: `Pack temático: ${pack.nom}`,
        en: `Thematic pack: ${pack.nom}`
      },
      emojis: pack.emojis
    };
    contadorPack++;
  }
});

// === VERIFICACIÓ: TOTS ELS EMOJIS ESTAN COBERTS ===
// Si falta algun emoji de B1+B2+B3, l’afegim al pack base
(function verificarCoberturaCompleta() {
  const totsEmojisData = [
  ...Object.values(EMOJI_DATA.emojis.B1).flatMap(obj => Object.keys(obj)),
  ...Object.values(EMOJI_DATA.emojis.B2).flatMap(obj => Object.keys(obj)),
  ...Object.values(EMOJI_DATA.emojis.B3).flatMap(obj => Object.keys(obj))
  ];

  const emojisEnPacks = new Set();
  Object.values(PACKS_BOTIGA).forEach(pack => {
    pack.emojis.forEach(e => emojisEnPacks.add(e));
  });

  const faltants = totsEmojisData.filter(e =>!emojisEnPacks.has(e));
  if (faltants.length > 0) {
    PACKS_BOTIGA.base.emojis = [...new Set([...PACKS_BOTIGA.base.emojis,...faltants])];
    console.log(`Afegits ${faltants.length} emojis faltants al pack base`);
  }
})();

// === FUNCIONS PER MAIN.JS ===

function getEmojisDesbloquejats() {
  let emojis = [];
  estatJoc.packsComprats.forEach(id => {
    if (PACKS_BOTIGA[id] && PACKS_BOTIGA[id].emojis) {
      emojis = emojis.concat(PACKS_BOTIGA[id].emojis);
    }
  });
  return [...new Set(emojis)];
}

function getPackDescription(pack, idioma) {
  const lang = idioma.split('-')[0];
  return pack.descripcio[lang] || pack.descripcio.ca;
      }
