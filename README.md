# Cortex · Porcelana

Statyczna aplikacja do sesji dźwiękowych i prowadzonego oddechu. Pięć ścieżek: Oddech, Skupienie, Wyciszenie, Sen i Energia. Interfejs oraz materiały są dostępne po polsku i angielsku.

## Codzienne korzystanie

- Start prowadzi od pięciu potrzeb bezpośrednio do gotowej propozycji. Oddech i Energia otwierają ćwiczenie lub Prime; Skupienie, Wyciszenie i Sen otwierają odpowiednio sekwencje work, reset i evening.
- Biblioteka zachowuje wszystkie sesje i programy. Przy powrocie z przygotowania odtwarzane są filtry, pozycja listy i fokus. Instrukcje i podstawy naukowe są dostępne z Biblioteki.
- Moje sesje łączą zapisane ustawienia i historię. Standardowe sesje oraz rytuały można uruchomić z zapisu jednym przyciskiem. Ustawienia dźwięku i obrazu pozostają w rozwijanej sekcji Dopasuj.

Preferencje v5 migrują dane v4/v3 i starsze ustawienia. Kopie danych zawierają zapisane profile oraz ustawienia potrzebne do powtórzenia sesji. Pulsacja wymaga osobnego wyboru w przygotowaniu. Stare adresy `#path/…` i `#history` nadal działają. Logikę przejść, zapisów i powtarzania sprawdzają testy `tests/experience.test.js`.

## Uruchomienie

```sh
python3 -m http.server 8770 --bind 127.0.0.1
```

Otwórz `http://127.0.0.1:8770/`. Moduły JavaScript wymagają HTTP, więc nie otwieraj aplikacji bezpośrednio przez `file://`. Podgląd źródeł nie wymaga kompilowania. Podgląd wydania i publikacja korzystają z `npm run build` oraz katalogu `dist/`, zgodnie z opisem poniżej.

## Sprawdzenie zmian

Wymagany Node.js 20 lub nowszy. Testy PCM korzystają z deweloperskiej zależności `node-web-audio-api`; nie jest dostarczana użytkownikom strony.

```sh
npm ci
npm test
npm run check
```

Treść dokumentów jest w `assets/js/documents.js`. Po jej zmianie wygeneruj strony:

```sh
node scripts/build-docs.mjs
```

## Strony

- `index.html` — aplikacja, biblioteka, oddech, odtwarzacz, programy, historia i eksport.
- `landing.html`, `landing-en.html` — ilustrowana strona promocyjna PL/EN z demonstracją oddechu.
- `guide-pl.html`, `guide.html` — instrukcja PL/EN.
- `whitepaper-pl.html`, `whitepaper.html` — opis działania i kontekst badań PL/EN.

Aplikacja i dokumenty korzystają z `assets/css/design.css`. Strona promocyjna ma izolowane style `assets/css/marketing.css`. Tone.js 14.7.77 jest dostarczany lokalnie wraz z licencją MIT. Aplikacja nie potrzebuje CDN, kont ani serwera z danymi użytkowników.

## Dokumentacja

- [Oddech — kwadrat, dźwięk i odbiór](docs/breathing-qa.md)
- [Pełne pole światła — odbiór poprawki](docs/fullscreen-light-qa.md)
- [Badania światła i audyt audio](docs/light-audio-research.md)
- [Odbiór poprawek światła, oddechu i trybu nocnego](docs/light-audio-qa.md)
- [Architektura i system wizualny](docs/system-design.md)
- [Mapa produktu i odbiór](docs/next-steps.md)
- [Raport testów i audytu treści](docs/premium-qa.md)

Wyniki badań nad technikami nie są dowodem skuteczności Cortex. Aplikacja nie mierzy aktywności mózgu i nie jest narzędziem diagnostycznym ani leczniczym.

Pomiar sygnału wszystkich etapów (plik raportu w wybranym miejscu):

```sh
node scripts/audit-audio.mjs /tmp/cortex-audio-audit.json
```

Badanie PCM nie mierzy fizycznej głośności słuchawek. Diagnostyka klatek nie mierzy matrycy fotodiodą.

### Verified static releases

Run `npm ci`, `npm test`, `npm run check`, then `npm run build`.
`dist/` contains only product pages and versioned assets. Serve `dist/` for the
release preview. GitHub Actions checks generated PL/EN documents, runs tests,
builds and publishes this artifact. Configure GitHub Pages to use GitHub Actions.
`release.json` identifies the published commit. Previous git tags allow a rollback
by reverting the change and rerunning the same pipeline; browser history remains
in its existing origin-local storage.

The post-release reliability revision adds paused-session recovery, validated
history import, complete breathing cycles, screen wake lock, and bounded-memory
WAV export. Recovery checkpoints remain local and are written every five seconds
and at lifecycle boundaries. Interrupted light never auto-starts after recovery.
See `docs/reliability-release-2026-10-18.md` for validation and device limits.

## Strona promocyjna i linki kampanii

Treść PL/EN: `assets/js/marketing.js`; generowanie: `node scripts/build-docs.mjs`.
Demonstracja ładuje tylko moduły oddechu i udostępniania. Nie uruchamia audio,
nie zapisuje historii ani preferencji. Trwa dwa cykle 4–6; pauzuje po ukryciu karty
lub opuszczeniu sekcji. Ograniczenie ruchu zachowuje tekst i odliczanie.

Publiczne wejścia do przygotowania (bez automatycznego odtwarzania):

- `index.html?start=break&lang=pl#ritual/reset`: 180 sekund oddechu 4–6.
- `index.html?start=work&lang=pl#ritual/work`: Deep Focus, 15 minut.
- `index.html?start=evening&lang=pl#ritual/evening`: Hypnos, 30 minut, czarny ekran.

Język może mieć wartość `pl` lub `en`. Parametry kampanii są jednorazowym szkicem
przygotowania; nie nadpisują zapisanych profili, głośności ani języka preferencji.
Przycisk zapisania ustawień nadal zapisuje dopiero na wyraźne żądanie użytkownika.
Udostępnianie przekazuje tylko identyfikator publicznej propozycji i język.

Ilustracje WebP mają warianty rozdzielczości. Obrazy marketingowe nie należą do
obowiązkowego precache aplikacji. Podglądy linków w `social/` mają stałe adresy.
Build weryfikuje również warianty `srcset`, sitemap oraz obecność obrazów OG.
Regresje demonstracji, wejść kampanii, profili i udostępniania: `tests/marketing.test.js`.
