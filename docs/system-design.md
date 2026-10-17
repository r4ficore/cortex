# Cortex Porcelana — architektura i system wizualny

## Powierzchnie i nawigacja

Start prowadzi przez pięć równorzędnych potrzeb. Ścieżka dźwiękowa zajmuje trzy świadome kroki: wybór potrzeby, wybór sesji, start. Oddech wymaga dwóch. Biblioteka zawiera 14 oryginalnych protokołów, ćwiczenie oddechowe oraz pięć programów. Filtry jedynie wybierają sesje; nie modyfikują ich parametrów.

Hash router utrzymuje ekran przygotowania i odtwarzacz osobno. Przejście do biblioteki, historii lub wiedzy zachowuje przebieg sesji. Pasek aktywnej sesji umożliwia powrót. Przy aktywnej sesji dokumenty otwierają się w osobnej karcie. Główna nawigacja na telefonie znajduje się na dole; odtwarzacz zastępuje ją kontrolkami.

## Moduły

| Moduł | Odpowiedzialność |
| --- | --- |
| `protocols.js` | Niezmienione identyfikatory, fazy, częstotliwości i definicje pięciu programów z `ecddf71`. |
| `catalog.js` | Pięć celów, opisy PL/EN, wybór sesji, filtrowanie i warianty długości programów. |
| `session.js` | Zegar sesji, pauza/wznowienie, wybór fazy oraz interpolacja poziomów. |
| `audio.js` | AudioContext odblokowywany przez lokalny Tone.js; parametry faz planowane z wyprzedzeniem niezależnie od RAF. |
| `breath.js` | Fazy 4–6, Box i 4–7–8 oraz ciągła interpolacja ruchu. |
| `visual.js` | Wektorowa membrana, ruch ścieżek, statyczny wariant i ograniczona pulsacja. |
| `store.js` | Wersja 3 preferencji/historii, migracja i działanie bez dostępnego localStorage. |
| `i18n.js`, `views.js` | Bilingwalne treści, wspólne szablony i ikony SVG. |
| `app.js` | Kontroler przepływu, zdarzenia, router i integracja Media Session. |
| `export.js`, `export-worker.js`, `wav.js` | Anulowalny eksport WAV, grafiki i danych; PCM stereo 48 kHz/16 bit w workerze. |
| `documents.js`, `reading.js`, `landing.js` | Wspólne materiały PL/EN, druk i strona promocyjna. |

Przebieg: przygotowanie → opcjonalny wstęp oddechowy → odtwarzanie ↔ pauza → zakończenie. Program między etapami czeka na świadome uruchomienie następnego kroku. Błąd odblokowania audio pozostawia możliwość ponowienia. Wielokrotny start jest blokowany.

Dźwięk korzysta z zegara AudioContext. Ćwiczenie bez dźwięku używa monotonicznego zegara performance. Pauza nie dodaje czasu do historii. Utrata widoczności zatrzymuje prowadzenie oddechu; audio może działać w tle, o ile system nie zawiesi kontekstu. Przerwanie audio przez system przechodzi w pauzę. Wejście/wyjście z BFCache nie wznawia samoczynnie dźwięku.

## Wygląd

Jeden plik `design.css`, bez starych nadpisań oraz Tailwind CDN. Tło `#f7f8f5`, białe powierzchnie, tekst `#243a32`, drugorzędny tekst `#627168`, szałwiowy akcent `#386b55`. Energia ma bursztynowy akcent `#84592c`; sen przygaszony niebieskoszary. Czcionka systemowa, podstawowy tekst 16 px, tekst dokumentów 17 px, kolumna maksymalnie 72ch.

Responsywny odtwarzacz używa wysokości `svh`. Przy małej wysokości i układzie poziomym forma i kontrolki zajmują dwie kolumny. Dekoracja zmniejsza się przed sterowaniem. Dokumenty przewijają się standardowo, a tabele mają lokalny scroll. Widoczny fokus, semantyczne przyciski, natywny dialog oraz powrót fokusu po zamknięciu.

## Oddech i bodźce

Domyślnie 3 minuty, rytm 4–6, sygnały wyłączone. Wstęp 60 sekund jest opcjonalny i wyłączony domyślnie; jego czas zapisuje się osobno w historii oddechu i wlicza do podsumowania całego przebiegu. Box i 4–7–8 wymagają wyboru, nie są przypisywane do snu.

Domyślna animacja jest niezależna od częstotliwości audio. Energia zmienia kolor i spokojną dynamikę formy, bez automatycznej zmiany głośności. Zaawansowana pulsacja jest oddzielnym wyborem z potwierdzeniem przed każdą sesją. Stare parametry wizualne zachowano w danych historycznych protokołów, ale ekran ogranicza ich interpretację do maks. 2 Hz, przezroczystości 0.78–0.94 i małej formy. Brak pełnoekranowych lub czerwonych błysków. Nie odtwarzamy dawnych kombinacji 10–40 Hz. Ograniczenie ruchu wyłącza dekorację dynamiczną i pulsację.

## Dane i zgodność

Odczyt `koraUserPreferences`, `koraSessionLogs` i `kora-lang`; zapis do `cortex.preferences.v3` i `cortex.history.v3`. Stare klucze pozostają nietknięte. Dawne `auto` oddechu przechodzi na 4–6; zaawansowana stymulacja nie jest dziedziczona. Historia zachowuje dodatkowe stare pola. Przy niedostępnym zapisie aplikacja działa w pamięci i informuje o ograniczeniu. Zmiany z innych kart są scalane przy zapisie.

Nie ma ankiety wejściowej, symulowanej kalibracji, zakupu ani okresu próbnego. Opcjonalna ocena samopoczucia po sesji pozostaje lokalna i nie udaje pomiaru fizjologicznego.
