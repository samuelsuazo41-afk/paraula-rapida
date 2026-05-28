// lectura-generator.js v1.0 - Motor generatiu de lectures

const PLANTILLES_LECTURA = {
 1: [
    "Avui parlem de {tema}. {frase_curta} Això és important perquè {explicacio_simple}. A Catalunya {costum_simple}.",
    "M’agrada molt {tema}. Quan {accio}, jo {sentiment}. {frase_curta} Tots els meus amics també ho pensen.",
    "El meu {tema} preferit és {exemple}. {frase_curta} M’agrada perquè {motiu_simple}."
  ],
 2: [
    "El {tema} a Catalunya té història. {frase_mitjana} Per això, {conseqüencia}. Molta gent {accio_cultural}.",
    "Si vols entendre el {tema}, has de saber que {explicacio_B2}. Per exemple, {exemple_concret}. Això canvia com veiem {tema}.",
    "El {tema} està connectat amb {tema_relacionat}. {frase_mitjana} Per tant, {conclusio_B2}."
  ],
 3: [
    "Analitzant el {tema} veiem que {analisi_complexa}. {frase_llarga} Això ens porta a qüestionar {pregunta_oberta}.",
    "El {tema} no només és {definicio_simple}, sinó també {capa_profunda}. {frase_llarga} Per tant, {reflexio_final}.",
    "El debat sobre {tema} és complex. {frase_llarga} Històricament, {context_historic}. Avui, {situacio_actual}."
  ]
};

const BANC_LECTURA = {
  tema: ["el pa amb tomàquet", "els castells", "la música catalana", "Gaudí", "el clima", "el futbol", "la llengua catalana", "la gastronomia", "el turisme", "la tecnologia"],
  accio: ["vaig a la platja", "ballo sardanes", "llegeixo un llibre", "menjo al mercat", "jugo a futbol"],
  sentiment: ["em sento feliç", "estic tranquil", "estic orgullós", "m’ho passo bé", "aprenc molt"],
  costum_simple: ["mengem pa amb tomàquet cada dia", "celebrem Sant Jordi", "fem castells a la festa major"],
  exemple: ["el Barça", "la Sagrada Família", "la sardana", "el formatge", "la platja"],
  tema_relacionat: ["la cultura", "la història", "la llengua", "l’economia", "l’art"],
  motiu_simple: ["és deliciós", "és divertit", "és bonic", "és important", "és tradicional"],
  accio_cultural: ["celebra la festa", "va al museu", "menja al mercat", "balla sardanes"],
  consequencia: ["la cultura creix", "la llengua es manté viva", "la gent s’uneix", "la ciutat canvia"],
  conclusio_B2: ["hem de cuidar el nostre patrimoni", "és clau per la identitat", "afecta la nostra vida diària"],
  analisi_complexa: ["barreja tradició i modernitat", "reflecteix la nostra identitat", "mostra el canvi social"],
  definicio_simple: ["una tradició", "un esport", "un art", "un costum"],
  capa_profunda: ["una forma d’expressar qui som", "un símbol de resistència cultural", "una eina de cohesió social"],
  pregunta_oberta: ["qui som com a poble", "on anem", "com conservem la tradició"],
  context_historic: ["aquest costum ve del segle XIX", "va néixer als pobles", "s’ha transformat amb el temps"],
  situacio_actual: ["avui el fan joves i grans", "s’ha modernitzat", "atrau turistes"],
  reflexio_final: ["hem de trobar equilibri", "és clau pel futur", "ens defineix com a poble"],

  // Funcions que agafen de les teves dades
  frase_curta: () => {
    const frases = window.FRSES_DATA?.[1] || [];
    return frases.length? frases[Math.floor(Math.random()*frases.length)].text : "És molt bonic.";
  },
  frase_mitjana: () => {
    const frases = window.FRSES_DATA?.[2] || [];
    return frases.length? frases[Math.floor(Math.random()*frases.length)].text : "És important per la cultura.";
  },
  frase_llarga: () => {
    const frases = window.FRSES_DATA?.[3] || [];
    return frases.length? frases[Math.floor(Math.random()*frases.length)].text : "Això mostra com ha canviat la societat.";
  },
  explicacio_simple: () => {
    const tips = window.TIPS_DATA?.[1] || [];
    const tip = tips[Math.floor(Math.random()*tips.length)];
    return tip? tip.ca.text : "ens ajuda a entendre el món";
  },
  explicacio_B2: () => {
    const tips = window.TIPS_DATA?.[2] || [];
    const tip = tips[Math.floor(Math.random()*tips.length)];
    return tip? tip.ca.text : "té moltes capes de significat";
  }
};

function generarTextLectura(nivell) {
  const plantilles = PLANTILLES_LECTURA[nivell];
  let plantilla = plantilles[Math.floor(Math.random()*plantilles.length)];

  return plantilla.replace(/{(\w+)}/g, (match, key) => {
    const valor = BANC_LECTURA[key];
    if (typeof valor === 'function') return valor();
    if (Array.isArray(valor)) return valor[Math.floor(Math.random()*valor.length)];
    return valor || match;
  });
      }
