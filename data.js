// Podaci o splitu — sve izmjene rasporeda/vjezbi radi se ovdje.
const SPLIT = [
  {
    id: "monday",
    weekday: 1, // JS getDay(): 1 = ponedjeljak
    short: "PON",
    full: "Ponedjeljak",
    title: "Upper Power",
    plate: "25",
    color: "var(--c-mon)",
    exercises: [
      {
        name: "Bench press",
        sets: 3, reps: "4–6", rir: "1–2", rest: "2–3 min",
        goal: "Prsa · Triceps · Prednje rame",
        how: [
          "Lezi na klupu tako da je sipka iznad prsa.",
          "Spusti je kontrolirano prema donjem dijelu prsa.",
          "Gurni sipku prema gore dok ruke ne budu ispruzene."
        ],
        tips: [
          "Stopala cvrsto na podu",
          "Lopatice lagano povuci natrag",
          "Ne odbijaj sipku od prsa",
          "Ne moras ici do potpunog otkaza"
        ]
      },
      {
        name: "Chest-supported row",
        sets: 3, reps: "5–8", rir: "1–2", rest: "2 min",
        goal: "Sredina ledja · Latovi · Biceps",
        how: [
          "Sjedni ili lezi prsima na oslonac sprave.",
          "Povuci rucke prema donjem dijelu prsa/trbuhu.",
          "Kratko stisni lopatice, pa kontrolirano vrati."
        ],
        tips: [
          "Prsa drzi cijelo vrijeme na osloncu",
          "Ne moras drzati ledja pod opterecenjem — dobra opcija za pocetak"
        ]
      },
      {
        name: "Lat pulldown",
        sets: 3, reps: "5–8", rir: "1–2", rest: "2 min",
        goal: "Sirina ledja · Biceps",
        how: [
          "Sjedni na spravu i uhvati sipku sire od ramena.",
          "Povuci sipku prema gornjem dijelu prsa.",
          "Kontrolirano pusti natrag do ispruzenih ruku."
        ],
        tips: [
          "Ne naginji se jako unatrag",
          "Ne trzaj tijelom",
          "Zamisli da laktovima vuces dolje, ne rukama"
        ]
      },
      {
        name: "Arnold press",
        sets: 3, reps: "5–8", rir: "1–2", rest: "2 min",
        goal: "Prednje i srednje rame · Triceps",
        how: [
          "Sjedni na klupu s naslonom podignutim na 90 stupnjeva.",
          "Drži bućice ispred prsa s dlanovima okrenutim prema sebi.",
          "Potiskuj bućice prema gore dok istovremeno rotiraš podlaktice.",
          "U gornjem položaju dlanovi moraju biti okrenuti prema naprijed.",
          "Kontrolirano spuštaj bućice natrag i rotiraj dlanove u početni položaj."
        ],
        tips: [
          "Nemoj raditi nagle pokrete tijekom rotacije",
          "Čvrsto stisni trbuh i drži leđa ravno uz naslon",
          "Nemoj potpuno zaključavati laktove na samom vrhu"
        ]

      },
      {
        name: "Incline dumbbell press",
        sets: 2, reps: "8–10", rir: "1–2", rest: "2 min",
        goal: "Gornji dio prsa",
        how: [
          "Klupa nagnuta otprilike 30°.",
          "Bucice spusti kontrolirano prema gornjem dijelu prsa.",
          "Gurni ih gore dok ruke ne budu ispruzene."
        ],
        tips: []
      },
      {
        name: "EZ-bar curl",
        sets: 3, reps: "6–10", rir: "1", rest: "1,5 min",
        goal: "Biceps",
        how: [
          "Stojeci drzi EZ sipku hvatom u sirini ramena.",
          "Savij ruke prema gore, stisni biceps na vrhu.",
          "Kontrolirano spusti."
        ],
        tips: [
          "Laktovi ostaju uz tijelo",
          "Ne ljuljaj se cijelim tijelom"
        ]
      },
      {
        name: "Triceps pushdown",
        sets: 3, reps: "6–10", rir: "1", rest: "1,5 min",
        goal: "Triceps",
        how: [
          "Uhvati sipku ili konop na sajli u visini prsa.",
          "Guraj prema dolje dok ruke ne budu ispruzene.",
          "Kontrolirano pusti natrag."
        ],
        tips: ["Laktovi ostaju uz tijelo"]
      }
    ]
  },
  {
    id: "tuesday",
    weekday: 2,
    short: "UTO",
    full: "Utorak",
    title: "Lower Power",
    plate: "20",
    color: "var(--c-tue)",
    exercises: [
      {
        name: "Leg press",
        sets: 3, reps: "5–8", rir: "1–2", rest: "2–3 min",
        goal: "Kvadricepsi · Gluteus · Zadnja loza",
        how: [
          "Sjedni na spravu, stopala u sirini ramena na platformi.",
          "Guraj platformu nogama dok noge ne budu skoro ispruzene.",
          "Spustaj se kontrolirano nazad."
        ],
        tips: ["Ne spustaj se toliko duboko da se donji dio ledja odvoji od naslona"]
      },
      {
        name: "Romanian deadlift (RDL)",
        sets: 2, reps: "6–8", rir: "2", rest: "2–3 min",
        goal: "Zadnja loza · Gluteus",
        how: [
          "Drzi sipku blizu nogu.",
          "Ne cucni — guraj kukove prema natrag dok ne osjetis istezanje zadnje loze.",
          "Ledja drzi neutralna cijelo vrijeme."
        ],
        tips: [
          "Ovo je vjezba tehnike koju vrijedi posebno savladati",
          "Ako izgleda nesigurno, prvo nauci pokret s praznom sipkom ili laganim bucicama"
        ]
      },
      {
        name: "Leg curl",
        sets: 3, reps: "6–10", rir: "1", rest: "1,5–2 min",
        goal: "Zadnja loza",
        how: [
          "Sjedni ili lezi na spravu.",
          "Savij koljena protiv otpora.",
          "Kontrolirano vrati noge u pocetni polozaj."
        ],
        tips: []
      },
      {
        name: "Leg extension",
        sets: 2, reps: "8–10", rir: "1", rest: "1,5 min",
        goal: "Prednja strana bedra",
        how: [
          "Sjedni na spravu, potkoljenice ispod jastucica.",
          "Ispruzi noge prema gore.",
          "Na vrhu kratko stisni kvadriceps, pa spusti kontrolirano."
        ],
        tips: []
      },
      {
        name: "Calf raise",
        sets: 3, reps: "8–12", rir: "1", rest: "1–1,5 min",
        goal: "Listovi",
        how: [
          "Guraj se prema gore preko prstiju do maksimalne kontrakcije.",
          "Kontrolirano se spusti do istezanja lista."
        ],
        tips: ["Ne radi kratke, brze pokrete — puni opseg"]
      },
      {
        name: "Cable crunch",
        sets: 3, reps: "8–12", rir: "1–2", rest: "1 min",
        goal: "Trbusnjaci",
        how: [
          "Klekni ispred sajle, drzi rucku kraj glave.",
          "Savij gornji dio tijela prema dolje koristeci trbusnjake.",
          "Vrati se kontrolirano."
        ],
        tips: ["Ne povlaci samo rukama — pokret dolazi iz trbuha"]
      }
    ]
  },
  {
    id: "thursday",
    weekday: 4,
    short: "ČET",
    full: "Četvrtak",
    title: "Upper Hypertrophy",
    plate: "15",
    color: "var(--c-thu)",
    exercises: [
      {
        name: "Incline machine press",
        sets: 3, reps: "8–12", rir: "1–2", rest: "90 s",
        goal: "Gornja prsa",
        how: [
          "Sjedni na spravu za kosi potisak.",
          "Guraj rucke prema naprijed dok ruke ne budu skoro ispruzene.",
          "Kontrolirano vrati."
        ],
        tips: ["Lakse je kontrolirati nego bucice — dobra za vecu utrenutost"]
      },
      {
        name: "Lat pulldown",
        sets: 3, reps: "8–12", rir: "1–2", rest: "90 s",
        goal: "Sirina ledja · Biceps",
        how: ["Isto kao ponedjeljkom, samo s vise ponavljanja i lakšom kilažom."],
        tips: []
      },
      {
        name: "Seated cable row",
        sets: 3, reps: "8–12", rir: "1–2", rest: "90 s",
        goal: "Ledja",
        how: [
          "Sjedni, uhvati rucku, koljena lagano savijena.",
          "Povuci rucku prema trbuhu.",
          "Kontrolirano vrati naprijed."
        ],
        tips: ["Ne ljuljaj se naprijed-natrag"]
      },
      {
        name: "Pec deck (Chest fly stroj)",
        sets: 2, reps: "10–12", rir: "1", rest: "90 s",
        goal: "Prsa (izolacija)",
        how: [
          "Sjedni na spravu, ledja uz naslon, ruke na jastucicima ili ruckama u visini prsa.",
          "Spoji ruke ispred prsa u polukruznom pokretu.",
          "Na vrhu kratko stisni prsa, pa kontrolirano vrati natrag."
        ],
        tips: [
          "Ne zakljucavaj laktove potpuno",
          "Pokret vodi iz prsa, ne iz ramena"
        ]
      },
      {
        name: "Lateral raise",
        sets: 3, reps: "12–20", rir: "0–1", rest: "60 s",
        goal: "Bocno rame",
        how: [
          "Drzi bucice sa strane tijela.",
          "Dizi ruke sa strane dok ne budu priblizno u ravnini ramena.",
          "Kontrolirano spusti."
        ],
        tips: ["Ne treba ogromna kilaza — kontrola je bitnija"]
      },
      {
        name: "Rear delt fly",
        sets: 2, reps: "12–20", rir: "0–1", rest: "60 s",
        goal: "Straznje rame",
        how: [
          "Na spravi za straznje rame, prsa oslonjena na jastuk.",
          "Povuci rucke prema van/natrag, kontrolirano."
        ],
        tips: []
      },
      {
        name: "Incline dumbbell curl",
        sets: 2, reps: "10–15", rir: "0–1", rest: "60 s",
        goal: "Biceps (duga glava)",
        how: [
          "Sjedni na klupu nagnutu na cca 45-60 stupnjeva, ruke neka slobodno vise pored tijela.",
          "Savij ruke prema gore bez pomicanja laktova unaprijed.",
          "Na vrhu stisni biceps, pa kontrolirano spusti natrag do potpunog istezanja."
        ],
        tips: [
          "Sto vise nagnuta klupa, to je vece istezanje duge glave u dnu pokreta",
          "Ne dopusti da laktovi bjeze naprijed tijekom dizanja"
        ]
      },
      {
        name: "EZ-bar skull crusher",
        sets: 2, reps: "10–15", rir: "0–1", rest: "60 s",
        goal: "Triceps (sve tri glave, naglasak na dugoj)",
        how: [
          "Lezi na klupu s EZ sipkom iznad prsa, ruke ispruzene prema stropu.",
          "Savijaj samo laktove i spustaj sipku prema celu/iza glave — nadlaktice ostaju nepomicne.",
          "Prije nego sipka dotakne celo, zaustavi pokret i gurni natrag u pocetni polozaj."
        ],
        tips: [
          "Laktovi ostaju uski i nepomicni cijelo vrijeme",
          "Ako osjetis pritisak u laktovima, smanji kilazu ili skrati raspon pokreta"
        ]
      },
      {
        name: "Hammer curl",
        sets: 2, reps: "10–15", rir: "0–1", rest: "60 s",
        goal: "Biceps · Podlaktica",
        how: [
          "Drzi bucice kao cekic, dlanovi okrenuti jedan prema drugom.",
          "Savij ruku bez ljuljanja tijela."
        ],
        tips: []
      }
    ]
  },
  {
    id: "friday",
    weekday: 5,
    short: "PET",
    full: "Petak",
    title: "Lower Hypertrophy + Arms",
    plate: "10",
    color: "var(--c-fri)",
    exercises: [
      {
        name: "Hack squat / Leg press",
        sets: 3, reps: "8–12", rir: "1–2", rest: "90 s",
        goal: "Kvadricepsi · Gluteus",
        how: ["Ako znas koristiti hack squat, koristi njega. Ako ne, leg press je potpuno dovoljan."],
        tips: []
      },
      {
        name: "Bulgarian split squat",
        sets: 2, reps: "8–12 po nozi", rir: "1–2", rest: "90 s",
        goal: "Kvadricepsi · Gluteus",
        how: [
          "Jednu nogu stavi iza sebe na klupu.",
          "Drugom nogom radi cucanj dok prednje bedro ne bude priblizno paralelno s podom.",
          "Gurni se natrag gore."
        ],
        tips: ["Ako je nestabilno, slobodno se pridrzavaj za nesto"]
      },
      {
        name: "Leg curl",
        sets: 3, reps: "10–15", rir: "0–1", rest: "60 s",
        goal: "Zadnja loza",
        how: ["Isto kao utorkom, samo s vecim brojem ponavljanja."],
        tips: []
      },
      {
        name: "Leg extension",
        sets: 2, reps: "10–15", rir: "0–1", rest: "60 s",
        goal: "Prednja strana bedra",
        how: ["Kontrolirano ispruzi noge i stisni kvadriceps na vrhu."],
        tips: []
      },
      {
        name: "Calf raise",
        sets: 3, reps: "10–15", rir: "0–1", rest: "60 s",
        goal: "Listovi",
        how: ["Puni opseg pokreta, kontrolirano gore i dolje."],
        tips: []
      },
      {
        name: "Cable crunch",
        sets: 3, reps: "10–15", rir: "1", rest: "60 s",
        goal: "Trbusnjaci",
        how: ["Kontrolirano savijanje trupa pomocu trbusnjaka."],
        tips: []
      },
      {
        name: "EZ-bar curl",
        sets: 3, reps: "8–12", rir: "0–1", rest: "60 s",
        goal: "Biceps",
        how: ["Isto kao ponedjeljkom."],
        tips: ["Zadnju seriju mozes odraditi jako blizu otkaza"]
      },
      {
        name: "Triceps pushdown",
        sets: 3, reps: "8–12", rir: "0–1", rest: "60 s",
        goal: "Triceps",
        how: ["Isto kao ponedjeljkom."],
        tips: ["Kontroliraj spustanje i ne miči laktove"]
      }
    ]
  }
];
