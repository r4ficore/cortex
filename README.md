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
- `landing.html` — prezentacja pięciu ścieżek.
- `guide-pl.html`, `guide.html` — instrukcja PL/EN.
- `whitepaper-pl.html`, `whitepaper.html` — opis działania i kontekst badań PL/EN.

Wszystkie strony korzystają z `assets/css/design.css`. Tone.js 14.7.77 jest dostarczany lokalnie wraz z licencją MIT. Aplikacja nie potrzebuje CDN, kont ani serwera z danymi użytkowników.

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
