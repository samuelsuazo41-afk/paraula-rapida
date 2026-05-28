// lectura-generator.js v2.0 - Motor generatiu de lectures multidioma

const PLANTILLES_LECTURA = {
  ca: {
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
  },
  es: {
    1: [
      "Hoy hablamos de {tema}. {frase_curta} Esto es importante porque {explicacio_simple}. En Cataluña {costum_simple}.",
      "Me gusta mucho {tema}. Cuando {accio}, yo {sentiment}. {frase_curta} Todos mis amigos también lo piensan.",
      "Mi {tema} favorito es {exemple}. {frase_curta} Me gusta porque {motiu_simple}."
    ],
    2: [
      "El {tema} en Cataluña tiene historia. {frase_mitjana} Por eso, {conseqüencia}. Mucha gente {accio_cultural}.",
      "Si quieres entender el {tema}, debes saber que {explicacio_B2}. Por ejemplo, {exemple_concret}. Esto cambia cómo vemos {tema}.",
      "El {tema} está conectado con {tema_relacionat}. {frase_mitjana} Por tanto, {conclusio_B2}."
    ],
    3: [
      "Analizando el {tema} vemos que {analisi_complexa}. {frase_llarga} Esto nos lleva a cuestionar {pregunta_oberta}.",
      "El {tema} no solo es {definicio_simple}, sino también {capa_profunda}. {frase_llarga} Por tanto, {reflexio_final}.",
      "El debate sobre {tema} es complejo. {frase_llarga} Históricamente, {context_historic}. Hoy, {situacio_actual}."
    ]
  },
  en: {
    1: [
      "Today we talk about {tema}. {frase_curta} This is important because {explicacio_simple}. In Catalonia {costum_simple}.",
      "I really like {tema}. When I {accio}, I feel {sentiment}. {frase_curta} All my friends think so too.",
      "My favorite {tema} is {exemple}. {frase_curta} I like it because {motiu_simple}."
    ],
    2: [
      "{tema} in Catalonia has history. {frase_mitjana} That’s why {conseqüencia}. Many people {accio_cultural}.",
      "If you want to understand {tema}, you should know that {explicacio_B2}. For example, {exemple_concret}. This changes how we see {tema}.",
      "{tema} is connected to {tema_relacionat}. {frase_mitjana} Therefore, {conclusio_B2}."
    ],
    3: [
      "Analyzing {tema} we see that {analisi_complexa}. {frase_llarga} This leads us to question {pregunta_oberta}.",
      "{tema} is not just {definicio_simple}, but also {capa_profunda}. {frase_llarga} Therefore, {reflexio_final}.",
      "The debate about {tema} is complex. {frase_llarga} Historically, {context_historic}. Today, {situacio_actual}."
    ]
  }
};

const BANC_LECTURA = {
  ca: {
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
    reflexio_final: ["hem de trobar equilibri", "és clau pel futur", "ens defineix com a poble"]
  },
  es: {
    tema: ["el pan con tomate", "los castells", "la música catalana", "Gaudí", "el clima", "el fútbol", "la lengua catalana", "la gastronomía", "el turismo", "la tecnología"],
    accio: ["voy a la playa", "bailo sardanas", "leo un libro", "como en el mercado", "juego a fútbol"],
    sentiment: ["me siento feliz", "estoy tranquilo", "estoy orgulloso", "me lo paso bien", "aprendo mucho"],
    costum_simple: ["comemos pan con tomate cada día", "celebramos Sant Jordi", "hacemos castells en la fiesta mayor"],
    exemple: ["el Barça", "la Sagrada Familia", "la sardana", "el queso", "la playa"],
    tema_relacionat: ["la cultura", "la historia", "la lengua", "la economía", "el arte"],
    motiu_simple: ["es delicioso", "es divertido", "es bonito", "es importante", "es tradicional"],
    accio_cultural: ["celebra la fiesta", "va al museo", "come en el mercado", "baila sardanas"],
    consequencia: ["la cultura crece", "la lengua se mantiene viva", "la gente se une", "la ciudad cambia"],
    conclusio_B2: ["debemos cuidar nuestro patrimonio", "es clave para la identidad", "afecta nuestra vida diaria"],
    analisi_complexa: ["mezcla tradición y modernidad", "refleja nuestra identidad", "muestra el cambio social"],
    definicio_simple: ["una tradición", "un deporte", "un arte", "una costumbre"],
    capa_profunda: ["una forma de expresar quiénes somos", "un símbolo de resistencia cultural", "una herramienta de cohesión social"],
    pregunta_oberta: ["quiénes somos como pueblo", "a dónde vamos", "cómo conservamos la tradición"],
    context_historic: ["esta costumbre viene del siglo XIX", "nació en los pueblos", "se ha transformado con el tiempo"],
    situacio_actual: ["hoy lo hacen jóvenes y mayores", "se ha modernizado", "atrae turistas"],
    reflexio_final: ["debemos encontrar el equilibrio", "es clave para el futuro", "nos define como pueblo"]
  },
  en: {
    tema: ["pan tumaca", "human towers", "Catalan music", "Gaudí", "the weather", "football", "the Catalan language", "gastronomy", "tourism", "technology"],
    accio: ["I go to the beach", "I dance sardanas", "I read a book", "I eat at the market", "I play football"],
    sentiment: ["I feel happy", "I feel calm", "I feel proud", "I have fun", "I learn a lot"],
    costum_simple: ["we eat pan tumaca every day", "we celebrate Sant Jordi", "we build human towers at the town festival"],
    exemple: ["Barça", "Sagrada Familia", "the sardana", "cheese", "the beach"],
    tema_relacionat: ["culture", "history", "language", "economy", "art"],
    motiu_simple: ["it’s delicious", "it’s fun", "it’s beautiful", "it’s important", "it’s traditional"],
    accio_cultural: ["celebrates the festival", "goes to the museum", "eats at the market", "dances sardanas"],
    consequencia: ["culture grows", "the language stays alive", "people unite", "the city changes"],
    conclusio_B2: ["we must take care of our heritage", "it’s key to identity", "it affects our daily life"],
    analisi_complexa: ["mixes tradition and modernity", "reflects our identity", "shows social change"],
    definicio_simple: ["a tradition", "a sport", "an art", "a custom"],
    capa_profunda: ["a way to express who we are", "a symbol of cultural resistance", "a tool for social cohesion"],
    pregunta_oberta: ["who we are as a people", "where we’re going", "how we preserve tradition"],
    context_historic: ["this custom comes from the 19th century", "it was born in villages", "it has changed over time"],
    situacio_actual: ["today young and old do it", "it has been modernized", "it attracts tourists"],
    reflexio_final: ["we must find balance", "it’s key for the future", "it defines us as a people"]
  },

  frase_curta: (lang) => {
    const frases = window.FRASES_DATA?.[1] || [];
    const frase = frases.length? frases[Math.floor(Math.random()*frases.length)] : null;
    return frase? frase[lang].text : (lang==='es'?'Es muy bonito.':lang==='en'?'It’s very nice.':'És molt bonic.');
  },
  frase_mitjana: (lang) => {
    const frases = window.FRASES_DATA?.[2] || [];
    const frase = frases.length? frases[Math.floor(Math.random()*frases.length)] : null;
    return frase? frase[lang].text : (lang==='es'?'Es importante para la cultura.':lang==='en'?'It’s important for culture.':'És important per la cultura.');
  },
  frase_llarga: (lang) => {
    const frases = window.FRASES_DATA?.[3] || [];
    const frase = frases.length? frases[Math.floor(Math.random()*frases.length)] : null;
    return frase? frase[lang].text : (lang==='es'?'Esto muestra cómo ha cambiado la sociedad.':lang==='en'?'This shows how society has changed.':'Això mostra com ha canviat la societat.');
  },
  explicacio_simple: (lang) => {
    const tips = window.TIPS_DATA?.[1] || [];
    const tip = tips.length? tips[Math.floor(Math.random()*tips.length)] : null;
    return tip? tip[lang].text : (lang==='es'?'nos ayuda a entender el mundo':lang==='en'?'it helps us understand the world':'ens ajuda a entendre el món');
  },
  explicacio_B2: (lang) => {
    const tips = window.TIPS_DATA?.[2] || [];
    const tip = tips.length? tips[Math.floor(Math.random()*tips.length)] : null;
    return tip? tip[lang].text : (lang==='es'?'tiene muchas capas de significado':lang==='en'?'it has many layers of meaning':'té moltes capes de significat');
  }
};

function generarTextLectura(nivell, lang = 'ca') {
  const plantilles = PLANTILLES_LECTURA[lang][nivell];
  let plantilla = plantilles[Math.floor(Math.random()*plantilles.length)];
  const banc = BANC_LECTURA[lang];

  return plantilla.replace(/{(\w+)}/g, (match, key) => {
    const valor = BANC_LECTURA[key];
    if (typeof valor === 'function') return valor(lang);
    if (Array.isArray(valor)) return valor[Math.floor(Math.random()*valor.length)];
    if (banc[key]) return banc[key][Math.floor(Math.random()*banc[key].length)];
    return match;
  });
} 