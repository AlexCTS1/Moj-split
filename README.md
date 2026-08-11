# Moj Split — dnevnik treninga

Osobna web-aplikacija za tvoj split: prikazuje vjezbe po danima (Upper Power, Lower Power,
Upper Hypertrophy, Lower Hypertrophy + Arms), objasnjava izvedbu i na sto paziti, i sluzi za
biljezenje tezine/ponavljanja iz treninga u treninng.

## Kako je hostati na GitHubu (besplatno, ~5 min)

1. Idi na github.com i napravi novi **javni** repozitorij (npr. `moj-split`).
2. U taj repozitorij ubaci svih 7 datoteka iz ovog folder: `index.html`, `style.css`,
   `app.js`, `data.js`, `manifest.json`, `sw.js` i folder `icons/` (drag & drop na GitHubovoj
   stranici "Add file → Upload files" radi odlicno).
3. Otvori **Settings → Pages** u tom repozitoriju.
4. Pod "Branch" odaberi `main` i folder `/ (root)`, pa klikni **Save**.
5. Za par minuta stranica ce biti dostupna na:
   `https://tvoje-korisnicko-ime.github.io/moj-split/`

Ta adresa radi identicno na mobitelu i na racunalu — samo je otvoris u pregledniku.

## Dodavanje na pocetni ekran mobitela (izgleda kao app)

- **Android (Chrome):** otvori link → tri tockice gore desno → "Dodaj na pocetni zaslon".
- **iPhone (Safari):** otvori link → ikona dijeljenja (kvadratic sa strelicom) → "Add to
  Home Screen".

Nakon toga imas ikonu na ekranu koja se otvara bez adresne trake, kao prava aplikacija.
Radi i offline zahvaljujuci `sw.js` (service worker), sto je zgodno ako u dvorani nemas signal.

## Kako radi spremanje podataka

Svi uneseni rezultati (tezine i ponavljanja) spremaju se **lokalno u pregledniku**
(`localStorage`) — nema baze ni servera, pa je stranica potpuno besplatna za hostati.

Vazno: to znaci da mobitel i racunalo **ne dijele automatski** povijest, jer je svaki
preglednik zaseban. Rjesenje je u tabu **Postavke**:

- **Izvezi** — preuzmi `.json` backup svih treninga.
- **Uvezi** — ucitaj taj `.json` na drugom uredjaju da prebacis povijest.

Najjednostavnije: posalji si backup fajl na mail ili ga spremi na Google Drive, pa ga s
drugog uredjaja preuzmes i uvezes. Traje 10 sekundi.

### Zelis pravu automatsku sinkronizaciju (mobitel ↔ racunalo, bez rucnog izvoza)?

To se moze dodati kasnije preko Firebase Firestore (besplatan tier, ne trazi kreditnu
karticu) — samo reci pa ti to dogradim. Zahtijeva da napravis besplatan Firebase projekt
(nekoliko klikova) i zalijepis mi konfiguracijske podatke.

## Ako zelis promijeniti vjezbe ili raspored

Sve vjezbe, serije, ponavljanja, RIR, odmor, opis izvedbe i savjeti nalaze se u
datoteci **`data.js`** — jasno su odvojeni po danima, pa ih mozes urediti i bez
programerskog znanja (kopiraj postojeci blok vjezbe i promijeni tekst).
