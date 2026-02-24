/* global $ */

// ----------------------
// 1) KÜSIMUSTE ANDMED
// ----------------------
// Õige vastus(ed): correct = [indexid], kus indexid viitavad options järjekorrale ENNE shuffle’it.
// Kood shuffle’b valikud, nii et correct konverteeritakse automaatselt uutele indexitele.
const QUESTIONS = [
  {
    id: 1,
    text: "Isik on deliktistruktuuri kohaselt teo toimepanemises süüdi, kui ta:",
    options: [
      "on tõendatud, et tema on süüteo toimepanija",
      "kui isik tunnistab süüteo toimepanemist",
      "tema vanus, vaimne seisund ja tema-poolse süüteo toimepanemise asjaolud vastavad deliktistruktuuri kolmanda astme täidetust iseloomustavatele kõigile kriteeriumitele",
      "on süüvõimeline ja puuduvad seaduses sätestatud süüd välistavad asjaolud"
    ],
    correct: [2, 3]
  },
  {
    id: 2,
    text: "Kas karistusõiguse kui õigusharu teemad on jaotatavad:",
    options: [
      "on jaotatavad: korrakaitselisteks ja õiguskaitselisteks teemadeks",
      "on jaotatavad: üld- ja eriosa teemadeks",
      "on jaotatavad: õiguskaitselisteks ja õigusabi puudutavateks teemadeks",
      "ei ole üldsegi jaotatavad"
    ],
    correct: [1]
  },
  {
    id: 3,
    text: "Süüteo toimepanemise katse:",
    options: [
      "ei ole karistatav",
      "on alati karistatav",
      "on alati karistatav vaid siis, kui pandi toime kuriteokatse",
      "ei ole karistatav, kui isik vabatahtlikult loobus süüteo lõpuleviimisest"
    ],
    correct: [3]
  },
  {
    id: 4,
    text: "Süüteokoosseisu objektiivseteks tunnusteks seaduse teksti kohaselt peetakse:",
    options: [
      "asjaolusid, mida on võimalik tõendada asitõenditega",
      "käitumist, mille tagajärgi on võimalik objektiivselt hinnata",
      "isiku mingit tegevust või tegevusetust ja seaduses sätestatud juhtudel ka nendega põhjuslikus seoses olevaid tagajärgi",
      "isiku tegevusi, mida saab tõendada nii asitõenditega kui ka pealtnägijate poolt antavate tunnistustega"
    ],
    correct: [2]
  },
  {
    id: 5,
    text: "Erilise isikutunnuse sätestatus süüteokoosseisus tähendab seda, et:",
    options: [
      "konkreetse süüteokoosseisu saab kvalifitseerida ainult sellele isikule, kellel esineb kvalifikatsioonis esitletav koosseisukohane eriline isikutunnus – kui toimepanijal nõutavat erilist isikutunnust aga ei ole, siis seda konkreetset koosseisulist tegu ei saa talle kahtlustuseks/süüdistuseks kvalifitseerida",
      "isiku, kes pani küll toime sisult koosseisule omase teo, kuid kellel puudub koosseisukohane eriline isikutunnus, saab vastutusele võtta kas seda süütegu kajastava normi (§-i) mingite muude, erilist isikutunnust mitte-eeldavate sätete alusel või siis mingi teise normi (§-i), mille tunnustega isiku teo põhiasjaolud samastuvad, alusel",
      "isikut, kes pani küll toime koosseisule omase teo, kuid kellel puudub koosseisukohane eriline isikutunnus, saab vastutusele võtta vaid ettevaatamatusest toimepandud süüteo eest",
      "isiku, kes pani küll toime sisult koosseisule omase teo, kuid kellel puudub koosseisukohane eriline isikutunnus, saab vastutusele võtta sama koosseisu vähemohtliku kvalifikatsiooni järgi – ehk siis reeglina süütegu sätestava §-i lg.1 järgi"
    ],
    correct: [0, 1]
  },
  {
    id: 6,
    text: "Süütegude KarS üldosast tulenev liigitus ja/või alaliigitus on järgmine:",
    options: [
      "vähetähtsad ja esmatähtsad süüteod",
      "kerged ja rasked süüteod",
      "väärteod ja kuriteod",
      "esimese astme ja teise astme kuriteod"
    ],
    correct: [2, 3]
  },
  {
    id: 7,
    text: "Karistuse mõistmisel/määramisel, karistuse liigi ja suuruse valikul arvestatakse:",
    options: [
      "isiku süüd välistavaid asjaolusid",
      "isiku süü suurust",
      "teo piirkonnas väljakujunenud karistuste keskmist määra",
      "teo õigusvastasust välistavaid asjaolusid"
    ],
    correct: [1]
  },
  {
    id: 8,
    text: "Olukorda, kus isik ei olnud süüteo toimepanemisel teadlik mõnest elulisest, aga samas süüteokoosseisule vastavast asjaolust:",
    options: [
      "nimetatakse keelueksimuseks, mis tähendab erandkorras seda, et isikut ei saagi vastutusele võtta, sest seaduse mittetundmine on antud olukorras vabandatav",
      "nimetatakse koosseisueksimuseks, mis tähendab, et isiku tegu ei saa käsitleda tahtlikult toimepandud süüteona, mistõttu võib kõne alla tulla tema vastutus vaid ettevaatamatult toimepandud teo eest juhul, kui seadus üldse sätestab samaste objektiivsete tunnustega ettevaatamatu teo karistatavuse",
      "käsitletakse süü puudumisena, mistõttu isikut ei saa vastutusele võtta ja karistada",
      "nimetatakse teo õigusvastasuse puudumiseks, mis tähendab, et isikut ei saa vastutusele võtta"
    ],
    correct: [1]
  },
  {
    id: 9,
    text: "Erinevate karistatavate tegude kirjelduste (süüteokoosseisude) puhul on seadustes (§-des ja/või nende lõigetes) koheselt teokirjelduse järel nimetatud ka kirjeldatud süüteo eest ettenähtud:",
    options: [
      "võimalikud põhi- ja lisakaristused",
      "ainult üks konkreetne karistus, mida menetleja vastavalt isiku süü suurusele saab vajadusel kohaldada nii põhi- kui lisakaristusena",
      "võimalikud põhi-, lisa- ja asenduskaristused",
      "ainult võimalikud põhikaristused"
    ],
    correct: [3]
  },
  {
    id: 10,
    text: "Kuriteo toimepanijateks võivad olla:",
    options: [
      "täideviija ja kaasteadjad",
      "täideviijad ja osavõtjad",
      "kaastäideviija, kihutaja ja kaasaaitaja",
      "täideviija ja muu süüvõimeline isik"
    ],
    correct: [1, 2]
  },
  {
    id: 11,
    text: "Kaasaaitamine, ehk kaasabi osutamine teise isiku poolt toimepandavale kuriteole võib seisneda:",
    options: [
      "ainult füüsilise kaasabi osutamises",
      "ainult ainelise kaasabi osutamises",
      "ainult kas ainelise või vaimse kaasabi osutamises",
      "nii füüsilise, vaimse kui ka ainelise kaasabi osutamises"
    ],
    correct: [3]
  },
  {
    id: 12,
    text: "Süütegude ideaalkogumina (ideaalkonkurentsina) käsitletakse:",
    options: [
      "olukorda, kus isik ühe süüteo menetluse käigus tunnistab üles ka enda poolt toimepandud teised süüteod",
      "olukorda, kus isiku, kes on erinevatel aegadel toime pannud mitu erinevat süütegu, kõik toimepandud süüteod leiavad tõendamist ühe menetluse käigus",
      "olukorda, kus isiku ühtsest tahtlusest hõlmatud tegu sisaldab endas samaaegselt mitut erinevat süüteokoosseisu",
      "teoainsuse olukorda, kus isik aeg-ruumiliselt ühtsena kulgeva sündmustiku käigus paneb toime mitu, koosseisuliselt erinevat süütegu"
    ],
    correct: [2, 3]
  },
  {
    id: 13,
    text: "Kui isik on toime pannud seadusega keelatud süüteo, aga see ei ole õigusvastane, siis:",
    options: [
      "isiku suhtes võib kohaldada üldkasuliku töö tegemise kohustust",
      "isikut saab küll karistada, aga karistus ei tohi ületada süüteo eest ettenähtud karistuse keskmist määra",
      "isikut ei saa vastutusele võtta ja karistada",
      "isik vabaneb küll kriminaalvastutusest, aga teda võib karistada väärteolise karistusega"
    ],
    correct: [2]
  },
  {
    id: 14,
    text: "Vahendlik täideviimine on:",
    options: [
      "süüteo toimepanemiseks sellise isiku ära kasutamine, kes ei teagi, et see, mida ta teeb, on süütegu",
      "süüteo toimepanemiseks teise vabatahtliku süüvõimelise isiku leidmine ja kasutamine",
      "süüteo toimepanemiseks mingi eseme või koguni looma kasutamine",
      "süüvõimetu või sunni alla seatud isiku ärakasutamine süüteo toimepanemiseks"
    ],
    correct: [0, 3]
  },
  {
    id: 15,
    text: "Süütegude aegumise tähtajad ja tingimused on sätestatud:",
    options: [
      "kõigi süütegude puhul täitevmenetluse seadustikus",
      "iga süüteo osas seda süütegu sätestavas õigusnormis",
      "karistusseadustiku üldosas",
      "kuritegude osas karistusseadustiku eriosas ja väärtegude osas eriseadustes"
    ],
    correct: [2]
  },
  {
    id: 16,
    text: "„Karistatuse kustumine“, ehk karistusandmete kustutamine karistusregistrist tähendab seda, et:",
    options: [
      "isikule on süüteo toimepanemise eest mõistetud/määratud karistus ning seaduses sätestatud aja möödumisel, alates karistusotsuse jõustumise kuupäevast, tuleb andmed isiku karistamise fakti kohta registrist kustutada – arhiveeritud varasema karistatuse andmeid võib kasutada uues menetluses tõe tuvastamise huvides ja neile võib viidata karistusotsuse tegemisel kui eripreventiivseid kaalutlusi mõjutavatele tõsiasjadele",
      "isik on süüteo toimepanemise eest vastutusele võetud ja talle on mõistetud/määratud karistus ning seaduses sätestatud aja möödumisel, alates karistusotsuse jõustumise kuupäevast, tuleb andmed isiku karistamise fakti kohta registrist kustutada – ning isiku varasemat karistatust mingi süüteo eest ei tohi uue süüteoasja menetlusotsustes enam arvesse võtta",
      "isikut on süüteo toimepanemise eest karistatud ja ta on karistuse ka ära kandnud (näiteks tasunud ära rahalise karistuse või „istunud ära“ ettenähtud arestipäevad) ning seaduses sätestatud aja möödumisel, alates karistuse äratäitmise kuupäevast, tuleb andmed isiku karistamise fakti kohta registrist kustutada – isiku varasemat karistatust mingi süüteo eest ei tohi uue süüteoasja menetlusotsuste tegemisel enam arvesse võtta",
      "isikut on süüteo toimepanemise eest karistatud ja ta on karistuse ka ära kandnud (näiteks on tasunud ära rahatrahvi) ning seaduses sätestatud aja möödumisel, alates karistuse äratäitmise kuupäevast, tuleb andmed isiku karistamise fakti kohta registrist kustutada – isiku varasemat karistatust mingi süüteo eest ei tohi uues menetluses küll arvesse võtta korduva, teistkordse süüteo toimepanemisena, aga varasemat süüteo toimepanemist võib võtta arvesse isiku karistust raskendava mittekoosseisulise asjaoluna või siis eripreventiivse asjaoluna uue karistusotsuse tegemisel"
    ],
    correct: [2]
  },
  {
    id: 17,
    text: "Süüteo toimepanemine hädaseisundis välistab:",
    options: [
      "süü olemasolu isikul ja seega võimaluse tema vastutusele võtmiseks",
      "teo õigusvastasuse ja seega võimaluse isiku vastutusele võtmiseks",
      "süüteokoosseisu esinemise isiku käitumises ja seega ka karistusõigusliku vastutuse",
      "deliktistruktuuri 2-se astme täidetuse esinemise ja seega isiku vastutusele võtmise"
    ],
    correct: [1, 3]
  },
  {
    id: 18,
    text: "Karistuse mõistmisel/määramisel, karistuse liigi ja suuruse valikul arvestatakse:",
    options: [
      "karistust kergendavaid asjaolusid",
      "vastutust pehmendavaid ja karmistavaid asjaolusid",
      "karistust raskendavaid asjaolusid",
      "karistust vähendavaid ja suurendavaid asjaolusid"
    ],
    correct: [0, 2]
  },
  {
    id: 19,
    text: "Süüteokoosseisulise teo toimepanemine hädakaitseseisundis hädakaitsepiire ületamata:",
    options: [
      "välistab isiku vastutusele võtmise seetõttu, et tegutsemine hädakaitseseisundis on süüd välistav asjaolu",
      "välistab isiku vastutusele võtmise, kuna deliktistruktuur ei ole siinkohal terviklik struktuuri teise astme mittetäidetuse tõttu",
      "välistab isiku vastutusele võtmise seetõttu, et juba hädakaitse iseenesest välistab süüteokoosseisu olemasolu isiku käitumises",
      "välistab isiku vastutusele võtmise seetõttu, et hädakaitset peetakse teo õigusvastasust välistavaks asjaoluks"
    ],
    correct: [1, 3]
  },
  {
    id: 20,
    text: "Süüteo kaastäideviimiseks võib kindlalt pidada seda, kui:",
    options: [
      "on üle kahe inimese, kes kooskõlastatult kõik üheskoos panevad toime mingi väärteo",
      "on kaks või rohkem inimest, kes füüsiliselt on kuidagigi seotud uuritava süüteo asetleidmisega",
      "on kaks isikut, kes ühiselt ja kooskõlastatult teevad elus seda, mis on kirjas ühe karistatava teo seaduslikus kirjelduses",
      "on vähemalt kaks isikut, kes on süüteo toimepanemisega kindlalt seotud, näiteks üks on muretsenud süüteo toimepanemiseks mingid vahendid, mida teine eelneva kokkuleppe kohaselt süüteo toimepanemisel kasutabki"
    ],
    correct: [0, 2]
  },
  {
    id: 21,
    text: "Esimese astme kuriteod on süüteod, mille toimepanemise eest on füüsilisele isikule põhikaristusena ettenähtud:",
    options: [
      "rahaline karistus ulatusega üle 500 päevamäära",
      "üle viieaastane vangistus",
      "üle viie aastane või eluaegne vangistus",
      "surmanuhtlus"
    ],
    correct: [1, 2]
  },
  {
    id: 22,
    text: "Süü suuruse arvestamine karistuse liigi ja suuruse valikul tähendab seda, et:",
    options: [
      "tuleb arvestada sellega, kas süüteo toimepanija tunnistab enda süüd või ei tunnista, kas ta tunnistab enda süüd täielikult või ainult osaliselt",
      "tuleb arvestada sellega, kui suurel hulgal käesoleval perioodil samaseid süütegusid riigis tervikuna või konkreetses regioonis toime pannakse – kui süütegude hulk on suur, on ka isiku süü suurem, kui süütegusid pannakse toime harva, on isiku süü väike, kui selliste süütegude hulk on keskmine võrreldes teiste süütegude hulgaga, siis on isiku süü keskmine",
      "tuleb kaaluda seda, millised on hetkel ühiskonna arusaamad ja ootused õiguse ning õigluse osas – kas ühiskond peab sellise teo toimepannud isiku süüd ebaoluliseks, väikeseks, keskmiseks või suureks",
      "tuleb kaaluda kui oluliselt teo toimepanija keelunormi rikkus ja/või milline oli teo tagajärgede raskusaste – kui paljud süüteokoosseisu objektiivsed tunnused olid tema teost hõlmatud, millises mahus olid hõlmatud, ning millise suhtumisega isik teo toime pani, kas tahtlikult või ettevaatamatusest"
    ],
    correct: [3]
  },
  {
    id: 23,
    text: "On süütegusid, mis ei aegu kunagi. Sellised süüteod on:",
    options: [
      "riigivastased kuriteod",
      "need kuriteod, mille eest on ette nähtud eluaegne vangistus",
      "esimese astme kuriteod",
      "isikuvastased kuriteod"
    ],
    correct: [1]
  },
  {
    id: 24,
    text: "Süüteo toimepanemisele kaasaaitajana saab vastutusele võtta isiku, kes:",
    options: [
      "sisenes koos sõbraga alkoholikauplusesse ja aitas sõbral kauplusest välja viia osa sõbra poolt välja valitud alkoholipudelitest, olles peitnud need oma jope põuetaskutesse",
      "andis teisele isikule, kes plaanis väärteo toimepanemist, head nõu, kuidas plaanitavat tegu oleks lihtsam toime panna",
      "teades, et sõber tahab õhtul röövida ühe kaupluse kassaraha, andis selleks sõbrale kasutada oma ametlikult registreeritud tulirelva",
      "sõidutas sõbra tema endise tüdruksõbra maja juurde, et sõber saaks kättemaksuks „mahajätmise“ eest tüdruksõbra magamistoa akna kiviga katki visata"
    ],
    correct: [2]
  },
  {
    id: 25,
    text: "Kohtuväline menetleja:",
    options: [
      "kohaldab oma pädevuse kohaselt isikutele põhikaristusi",
      "mõistab isikutele oma pädevuse piires karistuseks rahatrahvi või sõiduki juhtimisõiguse äravõtmise",
      "määrab oma pädevuse piires isikutele karistuseks aresti",
      "määrab isikutele karistuseks kas rahatrahvi või sõiduki juhtimisõiguse äravõtmise"
    ],
    correct: [0, 3]
  },
    {
    id: 26,
    text: "Karistusõiguses kehtivat, isiku vastutusele võtmise ja tema karistamise aluseks olevat keskset põhimõtet: „Karistatakse teo eest, kui see vastab süüteokoosseisule, on õigusvastane ja isik on selle toimepanemises süüdi“, nimetatakse:",
    options: [
      "deliktistruktuuriks",
      "süüpõhimõtteks",
      "karistusõiguslikuks paradigmaks",
      "karistuse doktriiniks"
    ],
    correct: [0]
  },
  {
    id: 27,
    text: "Juriidiline isiku vastutusele võtmine süüteo toimepanemise eest on võimalik alati, kui:",
    options: [
      "ta on toime pannud kannatanule varalist kahju põhjustanud süüteo",
      "on ära tõendatud, et lisaks muude juriidilise isiku vastutust tingivate asjaolude esinemisele pandi süütegu toime just nimelt juriidilise isiku huvides",
      "süütegu on toime pandud ükskõik millise isiku poolt, kes on selle juriidilise isikuga töölepingulises töösuhtes",
      "juriidilise isiku vastutus mingi süüteo eest on vastavat süütegu sätestavas paragrahvis ka ette nähtud"
    ],
    correct: [1]
  },
  {
    id: 28,
    text: "KarS § 56 lg.1 ütleb, et „karistamise alus on isiku süü“. „Süü“ tähendab siin seda, et:",
    options: [
      "isiku karistamiseks on olemas piisav alus, kui isik on tunnistanud, et tema pani menetletava süüteo toime ja lisaks on ära tõendatud, et ta pani teo toime justnimelt õigusvastaselt, ehk et tema teole ei ole õiguslikus mõttes ühtki õigustust",
      "isiku karistamiseks on olemas piisav alus, kui on ära tõendatud, et isik on süüvõimeline, ehk et ta on vähemalt 14 aastane ja süüdiv ning ei esine mingeid, tema süüd välistavaid asjaolusid",
      "isiku karistamiseks on olemas piisav alus, kui on ära tõendatud, et just see isik pani menetletava süüteo toime ja et tema tegu samastub igati kvalifitseeritava süüteokoosseisuga, ning et see tegu oli ka õigusvastane ja isik on deliktistruktuuri 3-nda astme tähenduses selle teo toimepanemises ka süüdi",
      "isiku karistamiseks on olemas piisav alus, kui on ära tõendatud, et tema oli see isik, kes pani menetletava süüteo toime"
    ],
    correct: [2]
  },
  {
    id: 29,
    text: "Juriidiline isik vastutab seaduses sätestatud juhtudel teo eest, mis:",
    options: [
      "on toime pandud juriidilise isiku huvides mõne tema töötaja poolt",
      "on toime pandud juriidilise isiku huvides tema organi või selle liikme poolt",
      "on toime pandud juriidilise isikuga lepingulises suhtes oleva isiku vastu",
      "on juriidilise isiku huvides toime pandud tema juhtivtöötaja või pädeva esindaja poolt"
    ],
    correct: [1, 3]
  },
  {
    id: 30,
    text: "Süüteole kihutajana ja/või kaasaaitajana saab isikut karistada juhul, kui:",
    options: [
      "väärteole kihutamine või kaasaaitamine leidis aset tahtlikult",
      "kihutamine või kaasaaitamine oli tahtlik ja tegu, mis sellega seoses toime pandi, oli kuritegu",
      "kihutamine või kaasaaitamine toimus küll ettevaatamatusest, aga tegu, mis sellega seoses toime pandi, oli kuritegu",
      "kihutamine või kaasaaitamine võis olla nii tahtlik kui ka ettevaatamatu, kuid tegu, mis sellega seoses toime pandi, oli väärtegu, mille eest võib karistuseks määrata aresti"
    ],
    correct: [1]
  },
  {
    id: 31,
    text: "Karistuse mõistmisel/määramisel, karistuse liigi ja suuruse valikul arvestatakse:",
    options: [
      "asjaolusid, mille alusel saab hinnata, kas karistus on kooskõlas põhiseadusega",
      "karistust kergendavaid ja raskendavaid asjaolusid",
      "asjaolusid, mille alusel saab kaaluda, kas karistus on piisav, et mõjutada isiku õiguskuulekust – kas karistus motiveerib isikut hoiduma tulevikus süütegude toimepanemisest",
      "karistamise õigust välistavaid ja mittevälistavaid asjaolusid"
    ],
    correct: [1, 2]
  },
  {
    id: 32,
    text: "Teoainsuse (ideaalkogumi) korral:",
    options: [
      "menetluse käigus kvalifitseeritakse kõik isiku poolt toimepandud süüteod eraldi ja mõistetakse/määratakse ka karistused iga süüteo eest eraldi",
      "isiku poolt toimepandud erinevate süütegude eraldi kvalifitseerimist, esiletoomist, menetluse käigus ei toimu, sest karistus mõistetakse/määratakse talle nagunii seadusesätte alusel, mis näeb ette raskeima karistuse",
      "kõikvõimalikud isiku poolt toimepandud erinevad süüteod tõendatakse ja kvalifitseeritakse asjakohaselt ning isikule mõistetakse/määratakse üks karistus seadusesätte alusel, mis näeb ette raskeima karistuse",
      "menetluse käigus kvalifitseeritakse küll kõik isiku poolt toimepandud süüteod eraldi, aga karistus mõistetakse/määratakse talle selle süüteokoosseisu alusel, mille eest on ettenähtud kõige raskem karistus"
    ],
    correct: [2, 3]
  },
  {
    id: 33,
    text: "KarS §§-des 57 ja 58 sätestatud karistust kergendavaid või raskendavaid asjaolusid ei võeta karistuse kohaldamisel arvesse, kui:",
    options: [
      "isik on toime pannud kõigest süüteokatse",
      "isikut tahetakse karistada ettevaatamatusest toimepandud süüteo eest",
      "vastav karistust kergendav või raskendav asjaolu on selle süüteo, mille eest isikut tahetakse karistada, koosseisus juba koosseisutunnusena kirjas või Riigikohtu mingi lahendi kohaselt elulise asjaoluna selle süüteo koosseisust hõlmatud",
      "vastav karistust kergendav või raskendav asjaolu on selle süüteo, mille eest isikut tahetakse karistada, koosseisu raskemas kvalifikatsioonis, ehk §-i lg.2 juba koosseisutunnusena kirjas – koosseisu lg.1 see reegel ei puuduta"
    ],
    correct: [2]
  },
  {
    id: 34,
    text: "Ühe süüteo eest võib isikule kohaldada:",
    options: [
      "ühe põhikaristuse, vajadusel ühe asjakohase lisakaristuse ja ühe või mitu asenduskaristust",
      "ühe põhikaristuse ja ühe või mitu asjakohast lisakaristust",
      "erandina, kui isiku süü teo toimepanemises on suur, mitu põhikaristust",
      "mitu põhikaristust tingimusel, et siis ei tohi enam kohaldada ühtki lisakaristust"
    ],
    correct: [1]
  },
  {
    id: 35,
    text: "Deliktistruktuuri põhimõte tähendab seda, et:",
    options: [
      "tegu on karistatav, kui isik tahtlikult pani toime süüteokoosseisulise teo",
      "tegu on karistatav, kui isiku süüteoline käitumine ei ole vabandatav ühegi teo õigusvastasust välistava asjaoluga",
      "tegu on karistatav, kui süüvõimeline isik pani toime süüteokoosseisule vastava teo",
      "tegu on karistatav, kui see vastab süüteokoosseisule, on õigusvastane ja isik on selle toimepanemises süüdi"
    ],
    correct: [3]
  },
  {
    id: 36,
    text: "Süüteokoosseisuline tegu on:",
    options: [
      "tegu, milles ilmnevad asjaolud, mis vastavad nii süüteokoosseisu objektiivsetele kui subjektiivsetele tunnustele",
      "karistatav alati, kui teos esinevad mingi süüteokoosseisu objektiivsed ja subjektiivsed tunnused",
      "tegu, mille toimepanjaks saab pidada konkreetset isikut",
      "ühtlasi alati õigusvastane"
    ],
    correct: [0]
  },
  {
    id: 37,
    text: "Väärtegu on aegunud:",
    options: [
      "üldjuhul 3, erandina 4 aasta möödudes alates väärteo lõpuleviimisest – kui selle aja jooksul ei jõua väärteo kohta tehtud otsus jõustuda, siis tuleb menetlus lõpetada",
      "kõigi väärtegude puhul 3 aasta möödudes",
      "enamike väärtegude puhul 2 aasta, mõnede puhul 3 aasta möödudes – kui selle aja jooksul, arvestades aega teo lõpuleviimisest alates, ei ole menetlust alustatud või pole kindlaks tehtud väärteo toimepanijat või ei ole tema suhtes tehtud otsust või ei jõua tehtud otsus jõustuda, siis menetlust enam alustada ei tohi või juba alustatud menetlus tuleb lõpetada",
      "kui väärteo toimepanija varjab end menetluse eest, hoiab pahatahtlikult menetlusest kõrvale, siis 5 aasta möödudes"
    ],
    correct: [2]
  },
  {
    id: 38,
    text: "Süüteokatse on karistatav:",
    options: [
      "väärtegude puhul vaid siis, kui konkreetset väärtegu sätestav norm näeb ette ka selle väärteo katse karistatavuse",
      "vaid juhul, kui isik pani toime tahtliku kuriteo- või väärteokatse",
      "kõigi väärtegude puhul, väljarvatud juhtumitel, kui isik loobub väärteo toimepanemise jätkamisest",
      "kuritegude puhul alati, väljaarvatud kõlbmatu kuriteokatse puhul"
    ],
    correct: [0]
  },
  {
    id: 39,
    text: "Tahtluse alaliikideks on:",
    options: [
      "otsene ja kaudne tahtlus",
      "kavatsetus ja otsene tahtlus",
      "kuritahtlikkus ja lihtsalt tahtlikkus",
      "etteplaanitus ja kuritahtlikkus"
    ],
    correct: [0, 1]
  },
  {
    id: 40,
    text: "Eriline isikutunnus karistusõiguslikus mõttes on:",
    options: [
      "tunnus, mille järgi on võimalik identifitseerida süüteoga seotud isikut",
      "tunnus, mis on kirjas süüteokoosseisu tekstis, ning mis kas objektiivse või subjektiivse asjaoluna peab toimepanijal esinema selleks, et teda antud koosseisulise teo eest vastutusele võtta",
      "tunnus, mis määratleb ära isikute ringi, keda saab pidada konkreetse süüteo puhul kannatanuteks",
      "süüteokoosseisus sisalduv tunnus, mis iseloomustab selle süüteokoosseisulise teo toimepanijat"
    ],
    correct: [1, 3]
  },
  {
    id: 41,
    text: "Süüteoks nimetatakse:",
    options: [
      "tegu, mida enamus ühiskonnaliikmeid peab karistamisväärseks",
      "tegu, mille karistatus on sätestatud kas karistusseadustikus või muus seaduses",
      "tegu, mille karistatus on sätestatud ainult karistusseadustikus",
      "tegu, mille eest ainult kohus võib inimest karistada"
    ],
    correct: [1]
  },
  {
    id: 42,
    text: "Teomitmuse (reaalkogumi) korral:",
    options: [
      "menetluse käigus kvalifitseeritakse küll kõik isiku poolt toimepandud väärteod eraldi, aga karistus mõistetakse/määratakse talle selle väärteokoosseisu alusel, mille eest on ettenähtud kõige raskem karistus",
      "erinevatel aegadel toimepandud eriliigilised väärteod kvalifitseeritakse ja mõistetakse/määratakse nende eest kokku liitkaristus tingimusel, et see ei ole suurem kui maksimaalne lubatud põhikaristuse määr (näiteks mitte suurem kui 300 trahviühikut)",
      "menetluse käigus kvalifitseeritakse kõik isiku poolt toimepandud väärteod eraldi ja mõistetakse/määratakse ka karistused iga süüteo eest eraldi",
      "kõikvõimalikud isiku poolt toimepandud erinevad väärteod tõendatakse ja kvalifitseeritakse asjakohaselt ning isikule mõistetakse/määratakse neist igaühe eest omaette karistus"
    ],
    correct: [2, 3]
  },
  {
    id: 43,
    text: "Deliktistruktuur on:",
    options: [
      "4 astmeline",
      "3 astmeline",
      "2 astmeline",
      "1 astmeline, aga lisaks hõlmab veel erinevate võimalike karistuste käsitlust"
    ],
    correct: [1]
  },
  {
    id: 44,
    text: "Süüvõimelisus tervikuna tähendab seda, et isik:",
    options: [
      "ei ole mingi vaimse või füüsilise puudega",
      "on vähemalt 14 aastane ja süüdiv",
      "on vähemalt 18 aastane ja vaimse tervise poolest on ta võimeline aru saama oma tegude tähendusest ning oma käitumist selle arusaamise kohaselt ka juhtima",
      "on võimeline ise kandma varalist vastutust süüteoga tekitatud varalise kahju eest"
    ],
    correct: [1]
  },
  {
    id: 45,
    text: "Väärtegu on süütegu, mille toimepanemise eest on füüsilisele isikule põhikaristusena ettenähtud:",
    options: [
      "tingimisi vangistus kuni 1 aasta",
      "rahatrahv või sõiduki juhtimisõiguse äravõtmine",
      "kuni pooleaastane vangistus",
      "arest"
    ],
    correct: [1, 3]
  },
  {
    id: 46,
    text: "Õiguskorra kaitsmise huvidega arvestamine karistuse valikul tähendab seda, et:",
    options: [
      "tuleb mõelda sellele, kuidas hindavad isikule mõistetud/määratud karistust riigivõimu kõrgemad esindajad ja õiguskaitseliste asutuste/organisatsioonide juhtivametnikud – kas nad peavad karistust piisavalt mõjusaks üleüldise õiguskorra hoidmise, ühiskonna õigusliku stabiilsuse säilimise seisukohast või mitte",
      "tuleb mõelda sellele, kuidas ühele isikule mingi väärteo eest määratud karistus mõjutab ühiskonna- või kogukonnaliikmete rahulolu – kas inimesed tunnevad ühe isiku karistusest rahulolu või rahulolematust ja kas tekkinud rahulolu tagab ka rahu ühiskonnas või kogukonnas või kas rahulolematus võib tuua kaasa avalikke protestiavaldusi või koguni massirahutusi",
      "tuleb mõelda sellele, kuidas isikule määratud karistus mõjutab tema edasist suhtumist õiguskorda – kas karistus tekitab temas soovi rikkuda tulevikus senisest rohkem õiguskorda või hoiduda edaspidistest korrarikkumistest",
      "tuleb mõelda sellele, kuidas konkreetse süüteo toimepanijale mõistetud/määratud karistus mõjutab teiste isikute, kes võivad sellest karistusest teadlikuks saada, õigushoiakuid – kas nad püüaksid karistuse vältimiseks ise hoiduda selliste süütegude toimepanemisest või mitte"
    ],
    correct: [3]
  },
  {
    id: 47,
    text: "Süüteokoosseisu objektiivseteks tunnusteks võivad seadusest tulenevalt olla:",
    options: [
      "mingi muu objektiivne tunnus (näiteks teo toimepanemise koht, aeg või nõutava eriloa puudumine), kui selline tunnus sisaldub on karistatava teo kirjelduses",
      "põhjus, miks isik teo toime pani (näiteks kättemaksu või rikastumise soov), kui see on kirjas ka teo koosseisus, ehk karistatava teo kirjelduses",
      "mingi keelatud tegevus või tegevusetus",
      "alati ka mingi tagajärg (näiteks varaline kahju või tervisekahjustus), mis on põhjustatud tegija poolse tegevusega"
    ],
    correct: [0, 2]
  },
  {
    id: 48,
    text: "Seda, et isik pani toime süüteokoosseisule vastava teo saab väita üheselt vaid siis, kui:",
    options: [
      "isiku käitumises avaldusid vähemalt pooled süüteokoosseisu objektiivsed tunnused ja isik pani süüteo toime meelega, ehk tahtlikult",
      "tegu sisaldas endas süüteokoosseisule omaseid objektiivseid ja ka asjakohaseid subjektiivseid tunnuseid",
      "isiku käitumises esinesid süüteokoosseisule omased objektiivsed tunnused",
      "tegu on toime pandud tahtlikult ja teo tagajärjel tekkisid kellelegi mingid kahjud"
    ],
    correct: [1]
  },
  {
    id: 49,
    text: "Karistuse valikul selle kaalumist, kuidas ühe isiku karistus võiks edaspidi mõjutada õiguskorra kaitsmise huvisid, ja sellisest kaalutlusest lähtumist ühele isikule karistuse mõistmisel/määramisel võib nimetada:",
    options: [
      "eripreventiivsete asjaolude arvestamiseks, ehk eripreventsiooniks",
      "üldpreventiivsete asjaolude arvestamiseks, ehk üldpreventsiooniks",
      "üldpresentatiivsete asjaolude arvestamiseks, ehk üldpresentatsiooniks",
      "eriabinõude arvestamiseks ja rakendamiseks"
    ],
    correct: [1]
  },
  {
    id: 50,
    text: "Süüteo aegumine tähendab seda, et:",
    options: [
      "kui muudetakse karistusseadust ja uue seaduse redaktsioon tunnistab kehtetuks mingi seni süüteoks olnud teo karistatavuse, siis tuleb pidada karistatavuse kaotanud süütegu aegunuks ning isikud, kes olid varasemalt selle teo eest vastutusele võetud ja karistuse saanud, tuleb koheselt karistuse kandmisest vabastada",
      "kui seaduses sätestatud aja jooksul pole suudetud kindlaks teha süüteo toimepanija isikut või isik on küll kindlaks tehtud, aga menetluse käigus ei ole jõutud saavutada tema osas jõustunud karistamisotsust, siis tuleb menetlus lõpetada – kedagi ei tohi enam, menetluseks ettenähtud aja möödumise tõttu, selles süüteos süüdi mõista või süüdlaseks määrata, ega karistada",
      "kui kohtuvälise menetleja poolt on isiku suhtes tehtud küll otsus isiku karistamise kohta, aga isik on seaduses ettenähtud korras selle edasikaevanud ja seejärel on maakohus oma otsusega kohtuvälise menetleja otsuse muutmatuks jätnud ning isik on loobunud täiendavast edasikaebamisest, siis seoses sellega saab lugeda protsessi lõppenuks ning süüteo ühtlasi aegunuks",
      "kui seaduses sätestatud aja jooksul ei suudeta jõustunud otsust täide viia, siis muutub isikule süüteo toimepanemise eest mõistetud/määratud karistus kehtetuks"
    ],
    correct: [1]
  },
  {
    id: 51,
    text: "Karistuse mõistmisel/määramisel, karistuse liigi ja suuruse valikul arvestatakse:",
    options: [
      "õiguskorra kaitsmise huvisid",
      "Riigikogu õiguskomisjoni suuniseid karistuste mõistmise kohta",
      "karistust kergendavaid asjaolusid",
      "karistamise arvuliste näitajate tähtsust ametkondlikus statistikas"
    ],
    correct: [0, 2]
  },
  {
    id: 52,
    text: "Süüteokoosseis on:",
    options: [
      "mingi karistatava teo kirjeldus, mis on esitatud ainult karistusseadustiku eriosas",
      "asjaolude kogum, mis iseloomustab isiku süütunnet tema poolt toimepandud õigusrikkumise suhtes",
      "mingi karistatava teo kirjeldus, mis on esitatud kas karistusseadustiku eriosas või mõnes muus seaduses, selle seaduse peatükis pealkirjaga „Vastutus“",
      "isiku poolt toimepandud mitme väär- või kuriteo kogum"
    ],
    correct: [2]
  },
  {
    id: 53,
    text: "Süüteokoosseis on:",
    options: [
      "koosseisuliste objektiivsete ja subjektiivsete tunnuste ühtne kogum",
      "isiku süüd iseloomustavate kõikvõimalike asjaolude kogum",
      "tegu, mille isik on teinud ja mille tegemise pärast enamus ühiskonnaliikmeid tunneks enda süüd nende ees, keda see tegu kahjustas",
      "objektiivste asjaolude (keelatud tegevus või tegevusetus, jms) kogum, mille toimepanemise süü on omistatav konkreetsele isikule"
    ],
    correct: [0]
  },
  {
    id: 54,
    text: "Karistusõiguse üldosa teemadeks on:",
    options: [
      "süütegude seosed korrakaitseliste menetlustega",
      "karistusõigusliku vastutuse üldkehtivad põhimõtted",
      "karistuste määramise või mõistmise põhimõtted",
      "karistusõiguse seosed kriminaalõigusega"
    ],
    correct: [1, 2]
  },
  {
    id: 55,
    text: "Väärteo toimepanemise eest vastutavad:",
    options: [
      "kihutaja ja kaasaaitaja",
      "kaastäideviijad",
      "kõik süüteost osavõtjad",
      "üksiktäideviija ja vahendlik täideviija"
    ],
    correct: [1, 3]
  },
  {
    id: 56,
    text: "Kihutajana saab vastutusele võtta isiku, kes:",
    options: [
      "ületas tahtlikult lubatud piirkiirust",
      "kes teadlikult tekitas teises isikus soovi panna toime kuritegu",
      "tahtlikult kallutas teist isikut väärteo toimepanemisele",
      "tahtlikult kallutas teist isikut kuriteo toimepanemisele"
    ],
    correct: [1, 3]
  },
  {
    id: 57,
    text: "Karistuse saab määrata ositi, ehk osade kaupa tasumiseks või kandmiseks, kui:",
    options: [
      "karistuse tervikuna realiseerimine on süüdlasele või tema lähedastele liigselt koormav arvestades süüdlase perekondlikku, tööalast või tervislikku seisundit – sellisel juhul ei tohi ositi tasumiseks või kandmiseks määratud karistuse täitmise tähtaeg ületada ühte aastat",
      "rahatrahvi tasumine tervikuna osutub mõjuvatel põhjustel süüdlase jaoks liiga koormavaks – sellisel juhul ei tohi ositi tasumiseks määratud karistuse täitmise tähtaeg ületada ühte aastat",
      "süüdlane on esitanud määratud karistuse suuruse peale edasikaebuse – sellisel juhul on ta kohustatud kuni kaebuse läbivaatamiseni ära tasuma või kandma vaid osa karistusest, ning ülejäänud osa tasumise või kandmise vajadus ning tingimused selguvad alles pärast kaebuse läbivaatamist kõrgema astme menetleja poolt",
      "riigil puuduvad hetkeperioodil võimalused karistuse tervikuna täideviimiseks (näiteks on puudu aresti- või vangistuskohtadest, ehk kinnipidamiskohad on hetkel süüdlastega täidetud)"
    ],
    correct: [0, 1]
  },
  {
    id: 58,
    text: "Karistuse valikul selle kaalumist, kuidas karistus võiks edaspidi mõjutada süüdlase õiguskuulekust, ja sellisest kaalutlusest lähtumist karistuse mõistmisel/määramisel võib nimetada:",
    options: [
      "eripresentatiivsete asjaolude arvestamiseks, ehk eripresentatsiooniks",
      "üldpreventiivsete asjaolude arvestamiseks, ehk üldpreventsiooniks",
      "üldabinõude arvestamiseks ja nende rakendamiseks",
      "eripreventiivsete asjaolude arvestamiseks, ehk eripreventsiooniks"
    ],
    correct: [3]
  },
  {
    id: 59,
    text: "Ettevaatamatuse alaliikideks on:",
    options: [
      "kergemeelsus ja hooletus",
      "lihtsameelsus ja hoolimatus",
      "kogematus ja hooletus",
      "ettenägematus ja hooletus"
    ],
    correct: [0]
  },
  {
    id: 60,
    text: "Selleks, et väita: „Isik pani süüteo toime tahtlikult“, peab olema ära tõendatud:",
    options: [
      "et isik pani teo toime vähemalt kuritegeliku kergemeelsusega",
      "et isik oli süütegu toime pannes teadlik kõigist nendest elulistest asjaoludest, mis paigutuvad süüteokoosseisu objektiivsete tunnuste alla",
      "et isiku poolt tekitatud süüteolised tagajärjed on põhjustatud vähemalt kuritegelikust hooletusest",
      "et isik pani teo toime vähemalt kaudse tahtlusega"
    ],
    correct: [1, 3]
  },
  {
    id: 61,
    text: "Süütegude reaalkogumina (reaalkonkurentsina) saab käsitleda:",
    options: [
      "olukorda, kus isiku, kes on ühe teoga toime pannud mitu erinevat väärtegu, süü leiab tegelikult ka tõendamist",
      "teomitmuse olukorda, kus isik on ühe nädala jooksul, aga erinevatel aegadel ja erinevates kohtades toime pannud mitu erinevat süütegu, aga teda pole neist mitteühegi eest veel karistatud",
      "olukorda, kus isik paneb reaalselt aeg-ruumiliselt ühtsena kulgeva sündmustiku käigus toime mitu erinevat süütegu",
      "olukorda, kus reaalselt pole võimalik isikut karistada mitme süüteo toimepanemise eest, kuigi on tõendatud, et tema need süüteod toime pani"
    ],
    correct: [1]
  },
  {
    id: 62,
    text: "Karistusõiguse eriosa teemad käsitlevad:",
    options: [
      "ainult eriliiki kuritegude liigitamise põhimõtteid ja nende sisulist olemust",
      "erinevaid süüteoliike, erinevate konkreetsete süüteokoosseisude kirjeldusi ja nende eest ettenähtud võimalikke karistusi",
      "karistusseadustiku eriosas sätestatud süütegusid ja ka erinevate muude seaduste vastutuse peatükkides sätestatud väärtegusid",
      "ainult karistusseadustiku eriosas sätestatud erinevaid süütegusid"
    ],
    correct: [1, 2]
  },
  {
    id: 63,
    text: "Tahtluse tõendatus süüteokoosseisu subjektiivse tunnusena on nõutav:",
    options: [
      "üldreeglina kõigi väärtegude puhul – erandiks on väärteod, mida seadus sätestab karistatavaks ka ettevaatamatult toimepanduna",
      "esimese astme kuritegude ja nende väärtegude puhul, mille maksimumkaristuseks võib mõista kas aresti või rahatrahvi maksimumühikutes",
      "üldreeglina kõigi kuritegude puhul – erandiks võivad olla kuriteod, mille seadus sätestab karistatavaks justnimelt ettevaatamatu kuriteokoosseisuna",
      "väärtegude puhul, kui samaliigilise teo põhikoosseis on käsitletav kuriteona – ehk väärtegude puhul, mida peetakse mingi kuriteo vähemohtlikuks esinemisvariandiks"
    ],
    correct: [2, 3]
  },
  {
    id: 64,
    text: "Karistusõiguse üldosa teemasid puudutavad õigusnormid on sätestatud:",
    options: [
      "põhiseaduses ja Riigikohtuseaduses",
      "seadustes, mis sisaldavad peatükki nimetusega „Vastutus“",
      "karistusseadustiku üldosas",
      "väärteomenetluse ja kriminaalmenetluse seadustikes"
    ],
    correct: [2]
  },
  {
    id: 65,
    text: "Tegu on õigusvastane, kui:",
    options: [
      "tegu ei ole küll süüteokoosseisuline, aga on vastuolus mingi õigusliku regulatsiooniga (seadusest või muust seadusega kooskõlasolevast normist tuleneva reegliga)",
      "isikul pole teoga seoses midagi enda õigustuseks öelda",
      "kui ta vastab süüteokoosseisule ja teo õigusvastasus on välistatud mõne siseriikliku õigus- või rahvusvaheliselt tunnustatud muu normiga",
      "kui ta vastab süüteokoosseisule ja teo õigusvastasus ei ole välistatud ühegi siseriikliku õigusnormiga või rahvusvaheliselt tunnustatud muu normiga"
    ],
    correct: [3]
  },
  {
    id: 66,
    text: "Isiku käitumise eluliste asjaolude samastamist, nende võrdsustamist mingi konkreetse süüteokoosseisu objektiivsete ja subjektiivsete tunnustega, nimetatakse mitmeti, näiteks:",
    options: [
      "süü tuvastamiseks",
      "teo kvalifitseerimiseks",
      "subsumeerimiseks",
      "teo õigusvastasuse tuvastamiseks"
    ],
    correct: [1, 2]
  },
  {
    id: 67,
    text: "Süüteokoosseisu subjektiivseteks tunnusteks seaduse teksti kohaselt võivad olla:",
    options: [
      "tahtlus või ettevaatamatus",
      "süüteo pealtnägijal tekkinud häiritusetunne",
      "süüteo ohvril süüteo toimepanemise tõttu tekkinud valutunne",
      "süüteo toimepanemise motiiv, eesmärk või muu subjektiivne tunnus"
    ],
    correct: [0, 3]
  },
  {
    id: 68,
    text: "Andmed isiku väärteolise karistatuse kohta kustutatakse karistusregistrist:",
    options: [
      "karistuse ärakandmise kuupäevale järgnevast kuupäevast alates hiljemalt 30 ööpäeva jooksul",
      "2 aasta möödumisel karistusotsuse jõustumisest",
      "1 aasta möödumisel karistuse ärakandmisest",
      "1 aasta möödumisel karistusotsuse jõustumisest"
    ],
    correct: [2]
  },
  {
    id: 69,
    text: "Deliktistruktuuri tähenduses on isiku süüd ja seega ka karistusõiguslikku vastutust välistavaks asjaoluks:",
    options: [
      "see, et süüteo toimepanemist alustanud isik otsustas loobuda süüteo toimepanemise jätkamisest, kuna sai aru, et tal ei õnnestu ületada takistusi, mis süüteo toimepanemisel ilmnesid (näiteks: tema jaoks osutus liiga keeruliseks võõra korteri ukseluku avamine)",
      "asjaolu, et 14 kuni 18 aastane süüteokoosseisuliselt käitunud isik ise ja tema pereliikmed ning lähedased ja tuttavad on pidanud ning peavad sellist käitumist üldiselt õigeks",
      "isiku poolne vabatahtlik süüteo toimepanemise jätkamisest loobumine pärast seda, kui ta oli juba teinud midagi, mis seadusekohaselt on käsitletav süüteokatse toimepanemisena",
      "isiku poolne vältimatu eksimus teo keelatuses, ehk asjaolu, et isik ei tundnud seadust ja seaduse mittetundmine antud juhtumil on tema puhul vabandatav"
    ],
    correct: [2, 3]
  }
];

// Soovi korral lisa siia kiiresti 70 tk: kopeeri objekt ja muuda text/options/correct.
// Kui sul on 70 küsimust juba tekstina, võin need sinu eest siia massiliselt sisse tõsta.


// ----------------------
// 2) ABIFUNKTSIOONID
// ----------------------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setsEqual(a, b) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  for (let i = 0; i < sa.length; i++) {
    if (sa[i] !== sb[i]) return false;
  }
  return true;
}

// Võtab küsimuse ja teeb sellest "runtime" versiooni,
// kus options on shuffle’itud ja correct on ümber mapitud.
function prepareQuestion(q) {
  const indexed = q.options.map((txt, idx) => ({ txt, originalIndex: idx }));
  const shuffled = shuffle(indexed);

  // uus correct = need indexid, mille originalIndex on q.correct sees
  const correctSet = new Set(q.correct);
  const newCorrect = [];
  shuffled.forEach((opt, newIdx) => {
    if (correctSet.has(opt.originalIndex)) newCorrect.push(newIdx);
  });

  return {
    id: q.id,
    text: q.text,
    options: shuffled.map(x => x.txt),
    correct: newCorrect
  };
}

// ----------------------
// 3) STATE
// ----------------------
let pool = [];             // ettevalmistatud küsimused (shuffled)
let current = null;        // praegune küsimus
let total = 0;
let done = 0;
let correctCount = 0;
let answeredLocked = false;

// ----------------------
// 4) RENDER
// ----------------------
function updateStats() {
  $("#doneCount").text(done);
  $("#totalCount").text(total);
  $("#correctCount").text(correctCount);

  const percent = total === 0 ? 0 : Math.round((correctCount / done) * 100) || 0;
  $("#percent").text(`${percent}%`);

  const progress = total === 0 ? 0 : Math.round((done / total) * 100);
  $("#progressFill").css("width", `${progress}%`);
  $("#progressText").text(`${progress}%`);
}

function showFinished() {
  $("#quizArea").addClass("hidden");
  $("#finishedArea").removeClass("hidden");
  $("#finalCorrect").text(correctCount);
  $("#finalTotal").text(total);
  const p = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  $("#finalPercent").text(`${p}%`);
}

function renderQuestion() {
  answeredLocked = false;
  $("#feedback").addClass("hidden").removeClass("good bad").empty();
  $("#nextBtn").addClass("hidden");
  $("#submitBtn").prop("disabled", false);

  if (!current) {
    showFinished();
    return;
  }

  $("#qIndex").text(`Küsimus ${done + 1}/${total}`);
  const isMulti = current.correct.length > 1;
  $("#qType").text(isMulti ? "Mitu õiget" : "Üks õige");

  $("#questionText").text(current.text);

  const type = isMulti ? "checkbox" : "radio";
  const name = "ans";

  const $form = $("#answersForm");
  $form.empty();

  current.options.forEach((optText, idx) => {
    const id = `opt_${current.id}_${idx}`;
    const $row = $(`
      <label class="answer" for="${id}">
        <input type="${type}" id="${id}" name="${name}" value="${idx}">
        <div class="label"></div>
      </label>
    `);
    $row.find(".label").text(optText);
    $form.append($row);
  });

  updateStats();
}

function revealCorrectAndWrong(picked) {
  // picked = array of chosen indexid
  const correctSet = new Set(current.correct);

  $("#answersForm .answer").each(function () {
    const $label = $(this);
    const val = parseInt($label.find("input").val(), 10);

    const isPicked = picked.includes(val);
    const isCorrect = correctSet.has(val);

    if (isCorrect) $label.addClass("correctReveal");
    if (isPicked && !isCorrect) $label.addClass("wrongPick");
  });
}

// ----------------------
// 5) LOGIKA
// ----------------------
function pickNextQuestion() {
  if (pool.length === 0) {
    current = null;
    renderQuestion();
    return;
  }
  current = pool.shift(); // pool on juba suvalises järjekorras
  renderQuestion();
}

function handleSubmit() {
  if (answeredLocked) return;

  // loe valikud
  const picked = $("#answersForm input:checked")
    .map(function () { return parseInt($(this).val(), 10); })
    .get();

  if (picked.length === 0) {
    $("#feedback")
      .removeClass("hidden good bad")
      .addClass("bad")
      .html(`<div class="title">Vali vähemalt üks vastus.</div>`);
    return;
  }

  answeredLocked = true;
  $("#submitBtn").prop("disabled", true);

  const isCorrect = setsEqual(picked, current.correct);

  done += 1;
  if (isCorrect) correctCount += 1;

  // tagasiside
  if (isCorrect) {
    $("#feedback")
      .removeClass("hidden bad")
      .addClass("good")
      .html(`<div class="title">ÕIGE ✅</div><div class="small">Liigu edasi järgmise küsimusega.</div>`);
  } else {
    // Näita õiged vastused tekstina
    const correctTexts = current.correct.map(i => current.options[i]);
    $("#feedback")
      .removeClass("hidden good")
      .addClass("bad")
      .html(`
        <div class="title">VALE ❌</div>
        <div>Õiged vastused:</div>
        <ul>${correctTexts.map(t => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
        <div class="small">Roheline = õige. Punane = sinu vale valik.</div>
      `);

    revealCorrectAndWrong(picked);
  }

  updateStats();
  $("#nextBtn").removeClass("hidden");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function restart() {
  // Valmista ette küsimused: shuffle küsimused + shuffle vastused igal küsimusel
  const prepared = QUESTIONS.map(q => prepareQuestion(q));
  pool = shuffle(prepared);

  total = pool.length;
  done = 0;
  correctCount = 0;
  answeredLocked = false;

  $("#finishedArea").addClass("hidden");
  $("#quizArea").removeClass("hidden");

  pickNextQuestion();
}

// ----------------------
// 6) EVENTS
// ----------------------
$(function () {
  $("#submitBtn").on("click", handleSubmit);

  $("#nextBtn").on("click", function () {
    // järgmine küsimus (praegune on juba “väljas”, sest shiftisime poolist)
    pickNextQuestion();
  });

  $("#restartBtn, #restartBtn2").on("click", restart);

  restart();
});