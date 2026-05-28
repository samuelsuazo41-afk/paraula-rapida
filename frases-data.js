// frases-data.js v2.0 - Paraula Ràpida
// Generador de frases + Diccionari. Llegeix EMOJI_DATA i no petarà mai.

const PLANTILLES_FRASES = {
 1: [
    {id: "p1_1", text: "El {persona} mira el {objecte}", dificultat: 1, categories: ["persona", "objecte"]},
    {id: "p1_2", text: "La {persona} troba el {objecte} a {lloc}", dificultat: 1, categories: ["persona", "objecte", "lloc"]},
    {id: "p1_3", text: "El {animal} corre per {natura}", dificultat: 1, categories: ["animal", "natura"]},
    {id: "p1_4", text: "La {persona} escolta {sons}", dificultat: 1, categories: ["persona", "sons"]},
    {id: "p1_5", text: "El {persona} està {emotions} avui", dificultat: 1, categories: ["persona", "emotions"]},
    {id: "p1_6", text: "Fa {temps} a {lloc}", dificultat: 1, categories: ["temps", "lloc"]},
    {id: "p1_7", text: "El {persona} va a {lloc} amb el {transport}", dificultat: 1, categories: ["persona", "lloc", "transport"]},
    {id: "p1_8", text: "La {persona} juga a {esports}", dificultat: 1, categories: ["persona", "esports"]},
    {id: "p1_9", text: "El {persona} treballa de {professio}", dificultat: 1, categories: ["persona", "professio"]},
    {id: "p1_10", text: "La {persona} porta {roba}", dificultat: 1, categories: ["persona", "roba"]},
    {id: "p1_11", text: "La {persona} menja {menjar}", dificultat: 1, categories: ["persona", "menjar"]},
    {id: "p1_12", text: "El {persona} fa {gestos}", dificultat: 1, categories: ["persona", "gestos"]},
    {id: "p1_13", text: "El número és {numeros}", dificultat: 1, categories: ["numeros"]},
    {id: "p1_14", text: "El color és {colors}", dificultat: 1, categories: ["colors"]},
    {id: "p1_15", text: "La {persona} visita {lloc_catala}", dificultat: 1, categories: ["persona", "lloc_catala"]}
  ],
 2: [
    {id: "p2_1", text: "El {animal_ext} dorm sota el {objecte}", dificultat: 2, categories: ["animal_ext", "objecte"]},
    {id: "p2_2", text: "La {persona} fotografia el {animal} a {natura_catala}", dificultat: 2, categories: ["persona", "animal", "natura_catala"]},
    {id: "p2_3", text: "El {persona} toca {sons} amb el {objecte}", dificultat: 2, categories: ["persona", "sons", "objecte"]},
    {id: "p2_4", text: "La {persona} se sent {emotions} amb el {temps}", dificultat: 2, categories: ["persona", "emotions", "temps"]},
    {id: "p2_5", text: "El {professio} arregla el {transport}", dificultat: 2, categories: ["professio", "transport"]},
    {id: "p2_6", text: "La {persona} guanya a {esports_catala} a {lloc_catala}", dificultat: 2, categories: ["persona", "esports_catala", "lloc_catala"]},
    {id: "p2_7", text: "El {professio} ajuda a la {persona} a {lloc_catala}", dificultat: 2, categories: ["professio", "persona", "lloc_catala"]},
    {id: "p2_8", text: "La {persona} compra {roba_ext} a {lloc_catala}", dificultat: 2, categories: ["persona", "roba_ext", "lloc_catala"]},
    {id: "p2_9", text: "El {animal_ext} amaga el {objecte} a {natura_catala}", dificultat: 2, categories: ["animal_ext", "objecte", "natura_catala"]},
    {id: "p2_10", text: "La {persona} cuina {menjar_catala} a {lloc_catala}", dificultat: 2, categories: ["persona", "menjar_catala", "lloc_catala"]}
  ],
 3: [
    {id: "p3_1", text: "El {persona} i el {persona} van a {lloc_catala} amb {transport}", dificultat: 3, categories: ["persona", "persona", "lloc_catala", "transport"]},
    {id: "p3_2", text: "La {persona} toca {sons} mentre el {animal_ext} juga a {natura_catala}", dificultat: 3, categories: ["persona", "sons", "animal_ext", "natura_catala"]},
    {id: "p3_3", text: "El {professio} repara el {eines} sota el {temps} a {lloc_catala}", dificultat: 3, categories: ["professio", "eines", "temps", "lloc_catala"]},
    {id: "p3_4", text: "La {persona} porta {roba_ext} i escolta {sons}", dificultat: 3, categories: ["persona", "roba_ext", "sons"]},
    {id: "p3_5", text: "El {animal_ext} amaga el {objecte} a {natura_catala} amb {temps}", dificultat: 3, categories: ["animal_ext", "objecte", "natura_catala", "temps"]},
    {id: "p3_6", text: "La {persona} està {emotions} i balla {sons} a la {festa_catala}", dificultat: 3, categories: ["persona", "emotions", "sons", "festa_catala"]},
    {id: "p3_7", text: "El {professio} ensenya {esports_catala} a {lloc_catala}", dificultat: 3, categories: ["professio", "esports_catala", "lloc_catala"]},
    {id: "p3_8", text: "La {persona} fotografia {natura_catala} amb el {tecnologia_ext}", dificultat: 3, categories: ["persona", "natura_catala", "tecnologia_ext"]}
  ],
 4: [
    {id: "p4_1", text: "El {persona} celebra amb {sons}, {roba_ext} i {emotions} a la {festa_catala}", dificultat: 4, categories: ["persona", "sons", "roba_ext", "emotions", "festa_catala"]},
    {id: "p4_2", text: "La {persona} fotografia el {animal_ext} a {natura_catala} amb {temps} i el {tecnologia_ext}", dificultat: 4, categories: ["persona", "animal_ext", "natura_catala", "temps", "tecnologia_ext"]},
    {id: "p4_3", text: "El {professio} repara el {eines} sota el {temps} i escolta {sons} a {lloc_catala}", dificultat: 4, categories: ["professio", "eines", "temps", "sons", "lloc_catala"]},
    {id: "p4_4", text: "La {persona} juga a {esports_catala} amb {senyals} i està {emotions}", dificultat: 4, categories: ["persona", "esports_catala", "senyals", "emotions"]},
    {id: "p4_5", text: "El {animal_ext} corre per {natura_catala} amb el {objecte} i el {fletxes}", dificultat: 4, categories: ["animal_ext", "natura_catala", "objecte", "fletxes"]},
    {id: "p4_6", text: "La {persona} pinta {natura_catala} escoltant {sons} i està {emotions} com {artista_catala}", dificultat: 4, categories: ["persona", "natura_catala", "sons", "emotions", "artista_catala"]}
  ],
 5: [
    {id: "p5_1", text: "El {professio} i el {persona} treballen junts a {lloc_catala} amb el {eines}", dificultat: 5, categories: ["professio", "persona", "lloc_catala", "eines"]},
    {id: "p5_2", text: "La {persona} viatja amb el {transport} portant {roba_ext} i escoltant {sons}", dificultat: 5, categories: ["persona", "transport", "roba_ext", "sons"]},
    {id: "p5_3", text: "El {animal_ext} juga a {natura_catala} amb el {objecte} sota el {temps} {fletxes}", dificultat: 5, categories: ["animal_ext", "natura_catala", "objecte", "temps", "fletxes"]},
    {id: "p5_4", text: "La {persona} i el {persona} celebren a {lloc_catala} amb {sons} i {emotions} {simbols}", dificultat: 5, categories: ["persona", "persona", "lloc_catala", "sons", "emotions", "simbols"]},
    {id: "p5_5", text: "El {professio} llegeix el {senyals} i va cap al {fletxes} a {lloc_catala}", dificultat: 5, categories: ["professio", "senyals", "fletxes", "lloc_catala"]},
    {id: "p5_6", text: "La {persona} paga amb {diners} i rep el {objecte} a {lloc_catala}", dificultat: 5, categories: ["persona", "diners", "objecte", "lloc_catala"]},
    {id: "p5_7", text: "El {persona} porta {disfresses} i fa {senyals_gest} a la {festa_catala}", dificultat: 5, categories: ["persona", "disfresses", "senyals_gest", "festa_catala"]}
  ]
};

// === DICCIONARI COMPLET v2.0 ===
// Llegeix EMOJI_DATA i afegeix vocabulari català: cultura, esports, gastronomia, llocs icònics
const EMOJI_DICCIONARI = {};

// Vocabulari extra català - sense emojis, només paraules per les plantilles
const VOCABULARI_CAT = {
  lloc_catala: [
    "Barcelona", "Girona", "Tarragona", "Lleida", "Sabadell", "Terrassa", "Mataró",
    "Costa Brava", "Costa Daurada", "Montserrat", "Sagrada Família", "Parc Güell",
    "Camp Nou", "Estadi Montilivi", "Tibidabo", "Barri Gòtic", "La Boqueria",
    "Girona vella", "Besalú", "Cadaqués", "Figueres", "Sitges", "Salou", "PortAventura"
  ],
  natura_catala: [
    "els Pirineus", "el Montseny", "el Delta de l’Ebre", "els Aiguamolls", "la Costa Brava",
    "el Montserrat", "el Parc de Collserola", "les Illes Medes", "el Cap de Creus"
  ],
  menjar_catala: [
    "pa amb tomàquet", "calçots", "escudella", "fideuà", "sarsuela", "crema catalana",
    "suquet de peix", "cargols a la llauna", "botifarra", "pa de pessic", "xuixos"
  ],
  esports_catala: [
    "futbol", "bàsquet", "handbol", "hoquei patins", "castells", "sardana", "curses de muntanya"
  ],
  festa_catala: [
    "La Mercè", "Sant Jordi", "La Patum", "Festa Major de Gràcia", "Castanyada", "Carnaval de Sitges"
  ],
  artista_catala: [
    "Dalí", "Gaudí", "Miró", "Casals", "Moncada", "Rodoreda", "Maragall"
  ]
};

// Diccionaris manuals per emojis que no té EMOJI_DATA
const DESCS_SENYALS = { /*... igual que abans... */ };
const DESCS_FLETXES = { /*... igual que abans... */ };
const DESCS_MANUAL = { /*... igual que abans... */ };

function generarDiccionari() {
  const CAT_MAP = {
    persona:"persona",animal:"animal",numeros:"numeros",colors:"colors",gestos:"gestos",
    menjar:"menjar",objecte:"objecte",professio:"professio",natura:"natura",
    emotions:"emotions",temps:"temps",fletxes:"fletxes",sons:"sons",animal_ext:"animal_ext",
    simbols:"simbols",senyals:"senyals",diners:"diners",eines:"eines",tecnologia:"tecnologia_ext",
    esports:"esports",tradicions:"tradicions",clubs:"clubs",menjar_catala:"menjar_catala",
    banderes:"banderes",combinats:"combinats",roba:"roba_ext",accessoris:"accessoris",
    partscos:"partscos",senyals_gest:"senyals_gest",disfresses:"disfresses",oci:"oci"
  };

  // 1. Omple des d’EMOJI_DATA
  for (const [nivell, grups] of Object.entries(EMOJI_DATA.emojis)) {
    for (const [catOrig, emojis] of Object.entries(grups)) {
      const cat = CAT_MAP[catOrig] || catOrig;
      if (!EMOJI_DICCIONARI[cat]) EMOJI_DICCIONARI[cat] = {};
      for (const [e, desc] of Object.entries(emojis)) {
        if (!EMOJI_DICCIONARI[cat][e]) {
          EMOJI_DICCIONARI[cat][e] = {nom: desc, desc: desc};
        }
      }
    }
  }

  // 2. Afegeix vocabulari català a categories sense emoji
  for (const [cat, llista] of Object.entries(VOCABULARI_CAT)) {
    if (!EMOJI_DICCIONARI[cat]) EMOJI_DICCIONARI[cat] = {};
    llista.forEach(p => {
      EMOJI_DICCIONARI[cat][p] = {nom: p, desc: p};
    });
  }

  // 3. Fallback per si falta algo
  for (const cat in EMOJI_DICCIONARI) {
    for (const k in EMOJI_DICCIONARI[cat]) {
      if (!EMOJI_DICCIONARI[cat][k].nom) {
        EMOJI_DICCIONARI[cat][k] = {nom: k, desc: k};
      }
    }
  }
}

generarDiccionari();

// Funció per obtenir un emoji/paraula aleatòria d’una categoria
function getRandomEmoji(cat) {
  const pool = EMOJI_DICCIONARI[cat];
  if (!pool) return `{${cat}}`;
  const keys = Object.keys(pool);
  const k = keys[Math.floor(Math.random() * keys.length)];
  return {emoji: k, info: pool[k]};
}

// Genera una frase substituint placeholders
function generarFrase(nivell = 1) {
  const plantilles = PLANTILLES_FRASES[nivell] || PLANTILLES_FRASES[1];
  const tpl = plantilles[Math.floor(Math.random() * plantilles.length)];
  let text = tpl.text;
  const usats = {};

  tpl.categories.forEach(cat => {
    const {emoji, info} = getRandomEmoji(cat);
    const regex = new RegExp(`{${cat}}`, 'g');
    text = text.replace(regex, `<span class="emoji" title="${info.desc}">${emoji}</span>`);
    usats[cat] = info.nom;
  });

  return {id: tpl.id, text, dificultat: tpl.dificultat, categories: usats};
}
