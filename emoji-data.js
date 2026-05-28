// emoji-data.js v2.0 - Paraula Ràpida
// Catàleg complet B1-B3 amb descripció en català per cada emoji

const EMOJI_DATA = {
  "config": {
    "total_nivells": 100,
    "progresio": "barreja_ponderada",
    "objectiu": "C1 català mitjançant joc amb emojis",
    "criteris_aquaval": ["COMPRENSIO_ORAL", "EXPRESSIO_ORAL", "GRAMATICA", "VOCABULARI", "CULTURA"]
  },
  "nivells": {
    "1-10": {"pes": {"B1": 90, "B2": 10, "B3": 0}, "focus_gramatica": ["article", "nom", "present", "numeral"], "tipus_frase": ["Nom + adjectiu", "Numeral + nom", "Salutació"]},
    "11-30": {"pes": {"B1": 70, "B2": 30, "B3": 0}, "focus_gramatica": ["verb_copulatiu", "adjectiu", "plural"], "tipus_frase": ["Subjecte + verb + complement", "Demostratius"]},
    "31-50": {"pes": {"B1": 20, "B2": 70, "B3": 10}, "focus_gramatica": ["passat_perifrastic", "imperatiu", "adverbi"], "tipus_frase": ["Acció passada", "Ordre", "Descripció d’estat"]},
    "51-70": {"pes": {"B1": 10, "B2": 70, "B3": 20}, "focus_gramatica": ["subjuntiu_present", "condicional", "connectors"], "tipus_frase": ["Desig + subjuntiu", "Condicional real", "Coordinació"]},
    "71-90": {"pes": {"B1": 5, "B2": 25, "B3": 70}, "focus_gramatica": ["subjuntiu_passat", "passiva", "registre_formal"], "tipus_frase": ["Prohibició + conseqüència", "Expressió idiomàtica"]},
    "91-100": {"pes": {"B1": 5, "B2": 15, "B3": 80}, "focus_gramatica": ["hipotetic", "discurs_indirecte", "variacio_dialectal"], "tipus_frase": ["Frase complexa", "Cultura catalana"]}
  },
  "emojis": {
    "B1": {
      "persona": {
        "👨":"home adult","👩":"dona adulta","👦":"nen","👧":"nena","👴":"avi","👵":"àvia","👶":"bebè","🧑":"persona adulta",
        "👨🏻":"home to clar","👩🏻":"dona to clar","👦🏻":"nen to clar","👧🏻":"nena to clar","👴🏻":"avi to clar","👵🏻":"àvia to clar","👶🏻":"bebè to clar",
        "👨🏼":"home to mitjà clar","👩🏼":"dona to mitjà clar","👦🏼":"nen to mitjà clar","👧🏼":"nena to mitjà clar","👴🏼":"avi to mitjà clar","👵🏼":"àvia to mitjà clar","👶🏼":"bebè to mitjà clar",
        "👨🏽":"home to mitjà","👩🏽":"dona to mitjà","👦🏽":"nen to mitjà","👧🏽":"nena to mitjà","👴🏽":"avi to mitjà","👵🏽":"àvia to mitjà","👶🏽":"bebè to mitjà",
        "👨🏾":"home to mitjà fosc","👩🏾":"dona to mitjà fosc","👦🏾":"nen to mitjà fosc","👧🏾":"nena to mitjà fosc","👴🏾":"avi to mitjà fosc","👵🏾":"àvia to mitjà fosc","👶🏾":"bebè to mitjà fosc",
        "👨🏿":"home to fosc","👩🏿":"dona to fosc","👦🏿":"nen to fosc","👧🏿":"nena to fosc","👴🏿":"avi to fosc","👵🏿":"àvia to fosc","👶🏿":"bebè to fosc",
        "🧑🏻":"persona to clar","🧑🏼":"persona to mitjà clar","🧑🏽":"persona to mitjà","🧑🏾":"persona to mitjà fosc","🧑🏿":"persona to fosc"
      },
      "animal": {
        "🐶":"gos","🐱":"gat","🐭":"ratolí","🐹":"hàmster","🐰":"conill","🐻":"ós","🐼":"panda","🐔":"gallina","🐧":"pingüí","🐦":"ocell","🐟":"peix","🐠":"peix tropical",
        "🐎":"cavall","🐷":"porc","🐮":"vaca","🐸":"granota","🐵":"mono","🐤":"pollet","🦆":"ànec","🐺":"llop","🐗":"porc senglar","🐴":"cavall","🦄":"unicorn","🐝":"abella",
        "🐛":"eruga","🦋":"papallona","🐌":"cargol","🐬":"dofí","🐳":"balena","🐋":"balena","🦈":"tauró","🐙":"pop","🐡":"peix globus"
      },
      "numeros": {
        "0️⃣":"número 0","1️⃣":"número 1","2️⃣":"número 2","3️⃣":"número 3","4️⃣":"número 4","5️⃣":"número 5","6️⃣":"número 6","7️⃣":"número 7","8️⃣":"número 8","9️⃣":"número 9",
        "🔟":"número 10","💯":"100 per cent","🔢":"símbol números","#️⃣":"coixinera","*️⃣":"asterisc"
      },
      "colors": {
        "🟥":"quadrat vermell","🟧":"quadrat taronja","🟨":"quadrat groc","🟩":"quadrat verd","🟦":"quadrat blau","🟪":"quadrat lila","🟫":"quadrat marró","⬛":"quadrat negre","⬜":"quadrat blanc",
        "🟠":"cercle taronja","🔶":"rombe taronja gran","🔷":"rombe blau gran","🔸":"rombe taronja petit","🔹":"rombe blau petit","🔳":"quadrat blanc borde","🔲":"quadrat negre borde",
        "▪️":"quadret negre petit","▫️":"quadret blanc petit"
      },
      "gestos": {
        "👋":"mà acomiadant","🤚":"dors mà aixecada","🖐️":"mà oberta","✋":"mà aturada","🖖":"salutació vulcana","👌":"ok","🤏":"pessic","✌️":"victòria","🤞":"dits creuats",
        "🤟":"t’estimo llengua signes","🤘":"banyes rock","🤙":"trucada telèfon","👈":"dit esquerra","👉":"dit dreta","👆":"dit amunt","🖕":"dit mig","👇":"dit avall","☝️":"dit índex amunt",
        "👍":"polze amunt","👎":"polze avall","✊":"puny aixecat","👊":"cop puny","🤛":"puny esquerra","🤜":"puny dreta","👏":"aplaudint","🙌":"mans aixecades","👐":"mans obertes",
        "🤝":"encaixada","🙏":"mans pregant","💪":"bíceps","🦾":"braç mecànic","🦵":"cama","🦿":"cama mecànica","🦶":"peu","👣":"empremtes peus","💋":"petó llavis","👄":"llavis",
        "🦷":"dent","👅":"llengua","👂":"orella","🦻":"orella audiòfon","👃":"nas","🧠":"cervell","🫀":"cor","🫁":"pulmons","👁️":"ull","👀":"ulls"
      },
      "menjar": {
        "🍎":"poma","🍐":"pera","🍊":"taronja","🍋":"llimona","🍌":"plàtan","🍉":"síndria","🍇":"raïm","🍓":"maduixa","🍈":"meló","🍒":"cirera","🍑":"préssec","🥭":"mango","🍍":"pinya",
        "🥥":"coco","🥝":"kiwi","🍅":"tomàquet","🍆":"albergínia","🥑":"alvocat","🥦":"bròquil","🥬":"enciam","🥒":"cogombre","🌶️":"bitxo","🌽":"blat de moro","🥕":"pastanaga",
        "🧄":"all","🧅":"ceba","🥔":"patata","🍠":"moniato","🥐":"croissant","🥯":"bagel","🍞":"pa de motlle","🥖":"barra pa","🧀":"formatge","🥚":"ou","🍳":"ous fregits",
        "🥞":"creps","🧇":"waffle","🥓":"bacó","🥩":"carn","🍗":"cuixa pollastre","🍖":"os carn","🦴":"os","🌭":"hot dog","🍔":"hamburguesa","🍟":"patates fregides","🍕":"pizza",
        "🥪":"entrepà","🥙":"falafel","🧆":"falafel","🌮":"taco","🌯":"burrito","🥗":"amanida","🥘":"paella","🥫":"llauta conserva","🍝":"espaguetis","🍜":"fideus","🍲":"cassola",
        "🍛":"curri","🍣":"sushi","🍱":"carmanyola","🥟":"dumpling","🦪":"ostra","🍙":"bola arròs","🍘":"galeta arròs","🍚":"arròs cuit","🍥":"pastís peix","🥠":"fortuna cookie",
        "🍢":"broqueta","🍡":"dango","🍧":"gelat raspat","🍨":"gelat copa","🍦":"gelat cucurutxo","🥧":"pastís","🧁":"cupcake","🍰":"pastís","🎂":"pastís aniversari","🍮":"flam",
        "🍭":"piruleta","🍬":"caramel","🍫":"xocolata","🍿":"crispetes","🍩":"dònut","🍪":"galeta","🌰":"castanya","🥜":"cacauet","🍯":"mel","🥛":"llet","🍼":"biberó","☕":"cafè",
        "🍵":"te","🧃":"suc caixa","🥤":"refresc","🧋":"bubble tea","🍶":"sake","🍺":"cervesa","🍻":"copas cervesa","🥂":"copa brindar","🍷":"vi","🥃":"got whisky","🍸":"còctel",
        "🍹":"còctel tropical","🧉":"mate","🍾":"ampolla xampany","🧊":"gel"
      },
      "objecte": {
        "🏠":"casa","🏡":"casa amb jardí","🏢":"edifici","🏬":"centre comercial","🏭":"fàbrica","🏣":"oficina correus","🏫":"escola","🏥":"hospital","🏦":"banc","🏪":"botiga",
        "🏨":"hotel","🏩":"hotel amor","🏯":"castell japonès","🏰":"castell","💒":"església casament","🗼":"torre","🗽":"estàtua llibertat","⛪":"església","🕌":"mesquita",
        "🛕":"temple hindú","🕍":"sinagoga","⛩️":"temple xintoista","🕋":"meca","⛲":"font","⛺":"tenda","🌁":"boira ciutat","🌃":"nit estrellada","🏙️":"ciutat","🌄":"alba muntanyes",
        "🌅":"sortida sol","🌆":"ciutat capvespre","🌇":"posta sol","🌉":"pont nit","🎠":"carrousel","🎡":"roda fira","🎢":"muntanya russa","🚂":"tren antic","🚃":"vagó tren",
        "🚄":"tren bala","🚅":"tren alta velocitat","🚆":"tren","🚇":"metro","🚈":"tren lleuger","🚉":"estació","🚊":"tramvia","🚝":"monorail","🚞":"tren muntanya","🚋":"tramvia",
        "🚌":"autobús","🚍":"autobús que ve","🚏":"parada autobús","🚐":"furgoneta","🚑":"ambulància","🚓":"cotxe policia","🚔":"cotxe policia","🚕":"taxi","🚖":"taxi","🚗":"cotxe",
        "🚘":"cotxe","🚙":"SUV","🛻":"camioneta","🚚":"camió repartiment","🚛":"camió articulat","🚜":"tractor","🏎️":"cotxe carreres","🏍️":"moto","🛵":"scooter","🦽":"cadira rodes manual",
        "🦼":"cadira rodes motor","🛺":"tuk tuk","🚲":"bicicleta","🛴":"patinet","🛹":"skate","🛼":"patins","🚁":"helicòpter","🛸":"OVNI","🚀":"coet","🛦":"satèl·lit","🛰️":"satèl·lit",
        "🛳️":"vaixell passatgers","⛵":"vela","🚤":"llanxa motor","🛥️":"iot","🛶":"canoa","⚓":"àncora","🛟":"salvavides","✈️":"avió","🛩️":"avioneta","🛫":"avió enlairant",
        "🛬":"avió aterrant","🪂":"paracaigudes","💺":"seient avió","🛞":"roda","🧳":"maleta","🕰️":"rellotge paret","⏰":"despertador","⏳":"rellotge sorra corrent","⌛":"rellotge sorra",
        "🕐":"1 en punt","🕑":"2 en punt","🕒":"3 en punt","🕓":"4 en punt","🕔":"5 en punt","🕕":"6 en punt","🕖":"7 en punt","🕗":"8 en punt","🕘":"9 en punt","🕙":"10 en punt",
        "🕚":"11 en punt","🕛":"12 en punt","📱":"mòbil","💻":"ordinador","🖥️":"monitor","🖨️":"impressora","⌨️":"teclat","🖱️":"ratolí","📚":"llibres","📖":"llibre obert","🖊️":"bolígraf",
        "🕶️":"ulleres sol","👜":"bosseta","🎒":"motxilla","☕":"tassa cafè","🍎":"poma","🎁":"regal"
      ],
      "roba": {
        "👕":"samarreta","👗":"vestit","👖":"texans","👟":"sabata esport","👠":"taló alt","🧢":"gorra","👒":"barret ala","🧣":"bufanda","🧤":"guants","🧥":"abric","🧦":"mitjó",
        "👚":"blusa","👛":"cartera petita","👜":"bosseta mà","👝":"cartera mà","🛍️":"bosses compra","🎒":"motxilla","🩴":"xancleta","👞":"sabata home","👟":"sabata esport",
        "🥾":"bota muntanya","🥿":"sabata plana","👠":"taló alt","👡":"sandalia","🩰":"sabata ballet","👢":"bota alta","👑":"corona","👒":"barret dama","🎩":"barret copa",
        "🎓":"birret graduat","🧢":"gorra beisbol","🪖":"casc militar","⛑️":"casc protecció"
      }
    },
    "B2": {
      "professio": {
        "👨‍⚕️":"metge","👩‍⚕️":"metgessa","👨‍🏫":"mestre","👩‍🏫":"mestra","👨‍🚒":"bomber","👩‍🚒":"bombera","👨‍✈️":"pilot home","👩‍✈️":"pilot dona","👨‍🚀":"astronauta home","👩‍🚀":"astronauta dona",
        "👨‍🔧":"mecànic","👩‍🔧":"mecànica","👨‍💻":"programador","👩‍💻":"programadora","👨‍🍳":"cuiner","👩‍🍳":"cuinera","👨‍🎨":"pintor","👩‍🎨":"pintora","👨‍⚖️":"jutge","👩‍⚖️":"jutgessa",
        "👨‍🌾":"pagès","👩‍🌾":"pagesa","👨‍🎤":"cantant home","👩‍🎤":"cantant dona","👨‍🔬":"científic","👩‍🔬":"científica","👨‍💼":"oficinista home","👩‍💼":"oficinista dona",
        "👨‍🏭":"obrer fàbrica","👩‍🏭":"obrera fàbrica","🧑‍⚕️":"personal sanitari","🧑‍🏫":"personal docent","🧑‍🚒":"bomber","🧑‍✈️":"pilot","🧑‍🚀":"astronauta","🧑‍🔧":"mecànic","🧑‍💻":"programador",
        "🧑‍🍳":"cuiner","🧑‍🎨":"pintor","🧑‍⚖️":"jutge","🧑‍🌾":"pagès","🧑‍🎤":"cantant","🧑‍🔬":"científic","🧑‍💼":"oficinista","🧑‍🏭":"obrer fàbrica"
      },
      "natura": {
        "🌳":"arbre","🌲":"pi","🪵":"tronc","🌱":"plàntula","🌿":"herba","☘️":"trèvol","🍀":"trèvol 4 fulles","🎋":"canya bambú","🌾":"espiga","🌵":"cactus","🌺":"hibisc",
        "🌻":"gira-sol","🌼":"flor","🌷":"tulipa","🌹":"rosa","🥀":"rosa marcida","🌸":"flor cirerer","🌰":"castanya","🌕":"lluna plena","🌖":"lluna minvant gibosa","🌗":"quart minvant",
        "🌘":"lluna minvant","🌑":"lluna nova","🌒":"lluna creixent","🌓":"quart creixent","🌔":"lluna creixent gibosa","🌝":"lluna plena cara","🌚":"lluna nova cara","🌍":"terra Europa-Àfrica",
        "🌎":"terra Amèrica","🌏":"terra Àsia-Austràlia","🌙":"lluna creixent","⭐":"estrella","🌟":"estrella brillant","✨":"espurnes","⚡":"llamp","☄️":"cometa","💥":"col·lisió",
        "🔥":"foc","🌈":"arc de Sant Martí","🌤️":"sol darrere núvol","⛅":"sol amb núvol","🌦️":"sol i pluja","🌧️":"núvol pluja","⛈️":"tempesta","🌩️":"núvol amb llamp","🌨️":"núvol neu",
        "❄️":"floc neu","☃️":"ninot neu","☁️":"núvol","💨":"bufada aire","💧":"gota aigua","💦":"gotes suor","🫧":"bombolles","🌊":"ona","☂️":"paraguas"
      },
      "emotions": {
        "😀":"cara somrient","😃":"cara somrient ulls grans","😄":"cara somrient ulls somrients","😁":"cara somrient dents","😆":"cara somrient ulls tancats","😅":"cara suant somrient",
        "🤣":"cara rodant terra riure","😂":"cara llàgrimes alegria","🙂":"cara lleuger somriure","🙃":"cara cap per avall","😉":"cara guiño","😊":"cara somrient ulls somrients",
        "😇":"cara somrient aurèola","🥰":"cara somrient cors","😍":"cara ulls cor","🤩":"cara estrellada","😘":"cara llançant petó","😗":"cara petó","😚":"cara petó ulls tancats",
        "😙":"cara petó somrient","😋":"cara menjant bo","😛":"cara llengua fora","😜":"cara guiño llengua","🤪":"cara boig","😝":"cara llengua estreta","🤑":"cara diners boca",
        "🤗":"cara abraçant","🤭":"cara mà boca","🤫":"cara xut","🤔":"cara pensant","🤐":"cara cremallera boca","🤨":"cara cella aixecada","😐":"cara neutral","😑":"cara inexpresiva",
        "😶":"cara sense boca","😶‍🌫️":"cara núvols","😏":"cara somriure maliciós","😒":"cara descontent","🙄":"cara ulls en blanc","😬":"cara ensenyant dents","😮‍💨":"cara exhalant",
        "🤥":"cara mentider","😌":"cara alleujament","😔":"cara trist","😪":"cara somnolent","🤤":"cara bavejant","😴":"cara dormint","😷":"cara màscara","🤒":"cara termòmetre",
        "🤕":"cara embenat","🤢":"cara nàusea","🤮":"cara vomitant","🤧":"cara esternudant","🥵":"cara calent","🥶":"cara fred","🥴":"cara marejat","😵":"cara marejat",
        "😵‍💫":"cara marejat espiral","🤯":"cara explotant","🤠":"cara cowboy","🥳":"cara festa","😎":"cara ulleres sol","🤓":"cara nerd","🧐":"cara monòcle","😕":"cara confós",
        "😟":"cara preocupat","🙁":"cara lleugerament trist","☹️":"cara trist","😮":"cara boca oberta","😯":"cara sorprès","😲":"cara astorat","😳":"cara vermell","🥺":"cara implorant",
        "😦":"cara trist boca oberta","😧":"cara angoixa","😨":"cara por","😰":"cara ansiós suant","😥":"cara trist alleujament","😢":"cara plorant","😭":"cara plorant fort",
        "😱":"cara cridant por","😖":"cara confós","😣":"cara perseverant","😞":"cara decebut","😓":"cara suant trist","😩":"cara cansat","😫":"cara cansat","🥱":"cara badallant",
        "😤":"cara bufant nas","😡":"cara enfadat","😠":"cara enfadat","🤬":"cara maleint","😈":"cara dimoni somrient","👿":"cara dimoni enfadat","💀":"calavera","☠️":"calavera ossos",
        "💩":"caca","🤡":"pallasso","👹":"ogre","👺":"tengu","👻":"fantasma","👽":"alien","👾":"monstre arcade","🤖":"robot","😺":"gat somrient","😸":"gat somrient ulls somrients",
        "😹":"gat llàgrimes alegria","😻":"gat ulls cor","😼":"gat somriure maliciós","😽":"gat petó","🙀":"gat esgarrifat","😿":"gat plorant","😾":"gat enfadat"
      },
      "temps": {
        "🕐":"1 en punt","🕑":"2 en punt","🕒":"3 en punt","🕓":"4 en punt","🕔":"5 en punt","🕕":"6 en punt","🕖":"7 en punt","🕗":"8 en punt","🕘":"9 en punt","🕙":"10 en punt",
        "🕚":"11 en punt","🕛":"12 en punt","🕜":"1 i 30","🕝":"2 i 30","🕞":"3 i 30","🕟":"4 i 30","🕠":"5 i 30","🕡":"6 i 30","🕢":"7 i 30","🕣":"8 i 30","🕤":"9 i 30","🕥":"10 i 30",
        "🕦":"11 i 30","🕧":"12 i 30","⏰":"despertador","⏳":"rellotge sorra corrent","⌛":"rellotge sorra","📅":"calendari","📆":"calendari full","🗓️":"calendari espiral","📇":"fitxer",
        "📁":"carpeta","📂":"carpeta oberta","🗂️":"separadors","📊":"gràfic barres","📈":"gràfic pujant","📉":"gràfic baixant","📜":"pergamí","📃":"pàgina","📄":"pàgina cara amunt",
        "📑":"marcadors","🧾":"rebut","📕":"llibre tancat vermell","📗":"llibre tancat verd","📘":"llibre tancat blau","📙":"llibre tancat taronja","📚":"llibres apilats","📖":"llibre obert",
        "🔗":"enllaç","📎":"clip","🖇️":"clips enllaçats","✂️":"tisores","📏":"regle","📐":"escaire","📌":"xinxeta","📍":"marca mapa","🚩":"bandera vermella","🏁":"bandera quadres",
        "🏆":"trofeu","🥇":"medalla or","🥈":"medalla plata","🥉":"medalla bronze","🏅":"medalla esportiva","🎖️":"medalla militar","🏵️":"flor medalla","🎗️":"llacet recordatori","🎫":"entrada",
        "🎟️":"entrades","🎪":"circ","🤹":"malabarista","🤹‍♂️":"malabarista home","🤹‍♀️":"malabarista dona","🎭":"màscares teatre","🖼️":"quadre","🎨":"paleta pintura","🧵":"fil","🧶":"llana",
        "👓":"ulleres","🕶️":"ulleres sol","🥽":"ulleres protecció","🥼":"bata","🦺":"armilla seguretat","👔":"corbata","👕":"samarreta","👖":"texans","🧣":"bufanda","🧤":"guants",
        "🧥":"abric","🧦":"mitjó","👗":"vestit","👘":"kimono","🥻":"sari","🩱":"banyador","🩲":"calçotets","🩳":"shorts","👙":"biquini","👚":"blusa","👛":"cartera petita","👜":"bosseta mà",
        "👝":"cartera mà","🛍️":"bosses compra","🎒":"motxilla","🩴":"xancleta","👞":"sabata home","👟":"sabata esport","🥾":"bota muntanya","🥿":"sabata plana","👠":"taló alt",
        "👡":"sandalia","🩰":"sabata ballet","👢":"bota alta","👑":"corona","👒":"barret ala","🎩":"barret copa","🎓":"birret graduat","🧢":"gorra beisbol","🪖":"casc militar",
        "⛑️":"casc protecció","📿":"collar","💄":"barra llavis","💍":"anell","💎":"diamant"
      },
      "fletxes": {
        "⬆️":"fletxa cap amunt","↗️":"fletxa cap amunt i a la dreta","➡️":"fletxa cap a la dreta","↘️":"fletxa cap avall i a la dreta","⬇️":"fletxa cap avall",
        "↙️":"fletxa cap avall i a l’esquerra","⬅️":"fletxa cap a l’esquerra","↖️":"fletxa cap amunt i a l’esquerra","↕️":"fletxa amunt i avall","↔️":"fletxa esquerra i dreta",
        "↪️":"fletxa cap a la dreta i abaix","↩️":"fletxa cap a l’esquerra i amunt","⤴️":"fletxa girar amunt","⤵️":"fletxa girar avall","🔄":"símbol reciclar","🔃":"símbol girar horari",
        "🔀":"símbol aleatori","🔁":"símbol repetir"
      },
      "sons": {
        "🎵":"nota musical","🎶":"notes musicals","🎼":"partitura","🔇":"altaveu silenci","🔈":"altaveu baix volum","🔉":"altaveu mig volum","🔊":"altaveu alt volum","🎤":"micròfon",
        "🎧":"auriculars","🎹":"piano","🥁":"bateria","🪘":"tambor","🎷":"saxo","🎺":"trompeta","🪗":"acordió","🎸":"guitarra","🪕":"banjo","🎻":"violí","🎲":"dau","🧩":"puzzle",
        "🧸":"ós peluix","🪆":"matrioska","♠️":"pica","♥️":"cors","♦️":"rombes","♣️":"trèvols","♟️":"peó escacs","🃏":"comodí","🀄":"mahjong","🎴":"carta japonesa","🎯":"diana",
        "🏓":"ping pong","🏸":"bàdminton","🥅":"portería","🏒":"hoquei gel","🏑":"hoquei herba","🥍":"lacrosse","🏏":"críquet","🪃":"boomerang","🥎":"softball","🥏":"frisbee",
        "🎱":"billar 8","🪀":"iot iot","🏐":"voleibol","🏈":"futbol americà","🏉":"rugbi","🎳":"bitlles","⛳":"golf","⛸️":"patinatge gel","🎣":"pesca","🤿":"busseig","🥊":"guant boxa",
        "🥋":"kimono judo","🎽":"samarreta atletes","🛹":"skate","🛼":"patins","🛷":"trineu","⛷️":"esquí","🏂":"snowboard","🪂":"paracaigudes","🏋️":"halterofília","🤼":"lluitadors",
        "🤸":"gimnasta","⛹️":"bàsquet","🤺":"esgrima","🤾":"handbol","🏌️":"golf","🧘":"ioga","🏄":"surf","🏊":"natació","🤽":"waterpolo","🚣":"rem","🧗":"escalada","🚵":"BTT",
        "🚴":"bicicleta","🏆":"trofeu","🥇":"medalla or","🥈":"medalla plata","🥉":"medalla bronze","🏅":"medalla esportiva","🎖️":"medalla militar","🏵️":"flor medalla"
     },
    "B3": {
      "simbols": {
        "✅":"marca de correcte","❌":"marca d’error","❓":"símbol de pregunta","❗":"símbol d’exclamació","‼️":"doble exclamació","⁉️":"símbol interrogació i exclamació",
        "⚠️":"símbol d’avís","🚫":"símbol prohibit","⛔":"senyal no passar","🛑":"senyal stop","✔️":"marca vist","❎":"marca no vàlid","➕":"símbol més","➖":"símbol menys",
        "➗":"símbol dividir","✖️":"símbol multiplicar","🟰":"símbol igual","♾️":"símbol infinit","💲":"símbol dòlar","💱":"símbol canvi de divisa","™️":"símbol marca comercial",
        "©️":"símbol copyright","®️":"símbol marca registrada","🔠":"símbol lletres majúscules","🔡":"símbol lletres minúscules","🔢":"símbol números","🔣":"símbol símbols",
        "🔤":"símbol abc","🆗":"símbol ok","🆙":"símbol pujar","🆒":"símbol guai","🆕":"símbol nou","🆓":"símbol gratis","🆖":"símbol no vàlid","🆘":"símbol socors",
        "🆔":"símbol identitat","🆚":"símbol versus","🅰️":"lletra A en quadrat","🅱️":"lletra B en quadrat","🆎":"AB en quadrat","🅾️":"lletra O en quadrat","☮️":"símbol de pau",
        "✝️":"creu cristiana","☪️":"lluna creixent islam","🕉️":"símbol om hindú","☸️":"roda dharma budista","✡️":"estrella de David","☯️":"símbol yin yang","☦️":"creu ortodoxa",
        "🛐":"lloc de pregària","☢️":"símbol radioactiu","☣️":"símbol perill biològic","⚛️":"símbol àtom","♻️":"símbol reciclar","🔞":"símbol majors 18","📴":"símbol mòbil apagat",
        "📶":"barres de senyal","📳":"símbol vibració","♨️":"símbol aigua calenta"
      },
      "senyals": {
        "🚻":"senyal lavabos","🚹":"senyal lavabo home","🚺":"senyal lavabo dona","♿":"senyal accessible cadira rodes","🚾":"senyal WC","🅿️":"senyal pàrquing","🛗":"senyal ascensor",
        "🚮":"senyal paperera","🛂":"senyal control passaport","🛃":"senyal duana","🛄":"senyal reclam equipatge","🛅":"senyal consigna","🚇":"senyal metro","🚉":"senyal estació tren",
        "🚏":"senyal parada bus","🚦":"senyal semàfor horitzontal","🚥":"senyal semàfor vertical","🗺️":"mapa plegat","🏧":"símbol caixer automàtic","🔅":"símbol baixa brillantor",
        "🔆":"símbol alta brillantor","💤":"símbol dormir","🛜":"símbol wifi","📢":"megàfon","📣":"altaveu","🔔":"campana","🔕":"campana amb barra","🔇":"altaveu silenci",
        "🔈":"altaveu baix volum","🔉":"altaveu mig volum","🔊":"altaveu alt volum"
      },
      "senyals_gest": {
        "🙅":"geste no","🙆":"geste ok persona","💁":"geste info","🙋":"mà aixecada","🧏":"persona orella","🤷":"geste no ho sé","🙇":"inclinació respecte","🤦":"geste frustració",
        "🤔":"pensant","🤫":"xut","🤐":"boca tancada","🥱":"badallant","😴":"dormint","😷":"màscara","🤒":"febre","🤕":"ferit","🤢":"nàusea","🤮":"vomitant","🤧":"esternudant"
      },
      "diners": {
        "💵":"bitllet dòlar","💴":"bitllet ien","💶":"bitllet euro","💷":"bitllet lliura","💰":"sac diners","💸":"diners volant","🪙":"moneda","💳":"targeta crèdit","💎":"diamant","🏦":"banc","💱":"canvi divisa"
      },
      "eines": {
        "🔧":"clau anglesa","🔨":"martell","⚒️":"martell i pic","🛠️":"caixa eines","⛏️":"pic","🪓":"destral","🔩":"cargol i femella","⚙️":"engranatge","🧲":"imant","🧱":"maó",
        "⛓️":"cadenes","🧰":"caixa eines","🔫":"pistola aigua","💣":"bomba","🧨":"petard","🪚":"serra","🪛":"tornavís","🔑":"clau","🗝️":"clau antiga","🔗":"enllaç","🪞":"mirall",
        "🪟":"finestra","🛏️":"llit","🛋️":"sofà","🪑":"cadira","🚽":"WC","🛁":"banyera","🚿":"dutxa","🛎️":"campana recepció","🧴":"ampolla","🧷":"imperdible","🧹":"escombra",
        "🧺":"cistella","🧻":"paper WC","🧼":"sabó","🫧":"bombolles","🧽":"esponja","🧯":"extintor","🛒":"carro compra","🚬":"cigarreta","⚰️":"taüt","🪦":"làpida","⚱️":"urna",
        "🗿":"moai","🛂":"control passaport","🛃":"duana","🛄":"reclam equipatge","🛅":"consigna","📡":"antena satèl·lit","🛜":"wifi","🛑":"senyal stop","⛔":"senyal no passar",
        "📛":"insígnia nom","🔰":"símbol principiant","⭕":"cercle","🌀":"remolí","💢":"símbol enfadat","💨":"bufada","💫":"estrelles mareig","🗯️":"núvol paraules enfadat",
        "💬":"núvol paraules","💭":"núvol pensament","🗨️":"bocata esquerra"
      },
      "banderes": {
        "🏁":"bandera quadres","🚩":"bandera vermella","🏴":"bandera negra","🏳️":"bandera blanca","🏴‍☠️":"bandera pirata","🏳️‍🌈":"bandera arc de Sant Martí","🏳️‍⚧️":"bandera trans",
        "🇺🇳":"ONU","🇪🇸":"Espanya","🇨🇦":"Canadà","🇫🇷":"França","🇬🇧":"Regne Unit","🇩🇪":"Alemanya","🇮🇹":"Itàlia","🇵🇹":"Portugal","🇲🇽":"Mèxic","🇦🇷":"Argentina","🇨🇱":"Xile",
        "🇨🇴":"Colòmbia","🇵🇪":"Perú","🇻🇪":"Veneçuela","🇺🇸":"Estats Units"
      },
      "combinats": {
        "❤️":"cor vermell","💔":"cor trencat","💯":"100 punts","🆘":"SOS","🆚":"versus","🔄":"reciclar","🔁":"repetir","🔀":"aleatori","➕":"més","➖":"menys","✖️":"multiplicar",
        "➗":"dividir","✅":"correcte","❌":"error","⚠️":"avís","🚫":"prohibit","🆗":"ok","💲":"dòlar","♻️":"reciclar","☮️":"pau","🔞":"+18","🧠":"cervell","💡":"idea","💭":"pensament",
        "💬":"parlar","💮":"flor blanca","🏧":"caixer automàtic","💳":"targeta","💹":"gràfic pujant"
      },
      "tecnologia_ext": {
        "⌚":"rellotge polsera","📱":"mòbil","📲":"mòbil trucant","💻":"portàtil","⌨️":"teclat","🖥️":"monitor","🖨️":"impressora","🖱️":"ratolí","🖲️":"trackball","💽":"disc dur",
        "💾":"disquet","💿":"CD","📀":"DVD","🧮":"àbac","🎥":"càmera vídeo","🎞️":"tira pel·lícula","📽️":"projector","📺":"televisió","📷":"càmera foto","📸":"càmera amb flash",
        "📹":"videocàmera","📼":"cinta vídeo","🔍":"lupa esquerra","🔎":"lupa dreta","🕯️":"espelma","💡":"bombeta","🔦":"llanterna","🏮":"llanterna paper","📔":"quadern decorat",
        "📕":"llibre tancat vermell","📗":"llibre tancat verd","📘":"llibre tancat blau","📙":"llibre tancat taronja","📚":"llibres apilats","📖":"llibre obert","🔗":"enllaç",
        "📎":"clip","🖇️":"clips enllaçats","✂️":"tisores","📏":"regle","📐":"escaire","📌":"xinxeta","📍":"marca mapa"
      },
      "oci": {
        "🩰":"sabata ballet","🎨":"paleta pintura","🖌️":"pinzell","🎬":"claqueta","🎤":"micròfon","🎧":"auriculars","🎼":"partitura","🎹":"piano","🥁":"bateria","🪘":"tambor",
        "🎷":"saxo","🎺":"trompeta","🪗":"acordió","🎸":"guitarra","🪕":"banjo","🎻":"violí","🎲":"dau","🧩":"puzzle","🧸":"ós peluix","🪆":"matrioska","♠️":"pica","♥️":"cors",
        "♦️":"rombes","♣️":"trèvols","♟️":"peó escacs","🃏":"comodí","🀄":"mahjong","🎴":"carta japonesa","🎯":"diana","🏓":"ping pong","🏸":"bàdminton","🥅":"portería",
        "🏒":"hoquei gel","🏑":"hoquei herba","🥍":"lacrosse","🏏":"críquet","🪃":"boomerang","🥎":"softball","🥏":"frisbee","🎱":"billar 8","🪀":"iot iot","🏐":"voleibol",
        "🏈":"futbol americà","🏉":"rugbi","🎳":"bitlles","⛳":"golf","⛸️":"patinatge gel","🎣":"pesca","🤿":"busseig","🥊":"guant boxa","🥋":"kimono judo","🎽":"samarreta atletes",
        "🛹":"skate","🛼":"patins","🛷":"trineu","⛷️":"esquí","🏂":"snowboard","🪂":"paracaigudes","🏋️":"halterofília","🤼":"lluitadors","🤸":"gimnasta","⛹️":"bàsquet","🤺":"esgrima",
        "🤾":"handbol","🏌️":"golf","🧘":"ioga","🏄":"surf","🏊":"natació","🤽":"waterpolo","🚣":"rem","🧗":"escalada","🚵":"BTT","🚴":"bicicleta","🏆":"trofeu","🥇":"medalla or",
        "🥈":"medalla plata","🥉":"medalla bronze","🏅":"medalla esportiva","🎖️":"medalla militar","🏵️":"flor medalla"
      },
      "disfresses": {
        "🤴":"príncep","🥷":"ninja","🦸":"superheroi","🦹":"supervilà","🧙":"mag","🧝":"elf","🧛":"vampir","🧟":"zombi","🧞":"geni","🧜":"sirena","🧚":"fada","🧑‍🎄":"Pare Noel",
        "🤶":"Mama Noel","🧑‍🚀":"astronauta"
      },
      "roba_ext": {
        "👑":"corona","👒":"barret ala","🎩":"barret copa","🧢":"gorra","⛑️":"casc protecció","🪖":"casc militar","👞":"sabata home","👟":"sabata esport","🥾":"bota muntanya",
        "🧦":"mitjó","🩴":"xancleta","👠":"taló alt","👡":"sandalia","🩰":"sabata ballet","👢":"bota alta","👚":"blusa","👕":"samarreta","👖":"texans","🧣":"bufanda","🧤":"guants",
        "🧥":"abric","🧦":"mitjó","👗":"vestit","👘":"kimono","🥻":"sari","🩱":"banyador","🩲":"calçotets","🩳":"shorts","👙":"biquini"
      }
    }
  }
};