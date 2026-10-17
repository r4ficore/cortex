# Cortex · Porcelana

Statyczna aplikacja do sesji dźwiękowych i prowadzonego oddechu. Pięć ścieżek: Oddech, Skupienie, Wyciszenie, Sen i Energia. Interfejs oraz materiały są dostępne po polsku i angielsku.

## Uruchomienie

```sh
python3 -m http.server 8770 --bind 127.0.0.1
```

Otwórz `http://127.0.0.1:8770/`. Moduły JavaScript wymagają HTTP, więc nie otwieraj aplikacji bezpośrednio przez `file://`. Publikacja w GitHub Pages nie wymaga kompilowania ani instalowania zależności.

## Sprawdzenie zmian

Wymagany Node.js 20 lub nowszy; testy używają wyłącznie biblioteki standardowej.

```sh
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

- [Architektura i system wizualny](docs/system-design.md)
- [Mapa produktu i odbiór](docs/next-steps.md)
- [Raport testów i audytu treści](docs/premium-qa.md)

Wyniki badań nad technikami nie są dowodem skuteczności Cortex. Aplikacja nie mierzy aktywności mózgu i nie jest narzędziem diagnostycznym ani leczniczym.
