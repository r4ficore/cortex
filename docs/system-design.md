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
| `breath.js` | Fazy 4–6, Box i 4–7–8, pozycja na kwadracie i ciągła interpolacja ruchu. |
| `breath-sound.js` | Deterministyczny szum powietrza dla pełnego cyklu; cisza w zatrzymaniach. |
| `visual.js` | Wektorowa membrana i czytelna forma oddechu z nieruchomym obrysem odniesienia. |
| `stimulation.js` | Całka częstotliwości, limity liniowej luminancji sRGB i diagnostyka tempa RAF. |
| `signal.js` | Wspólne definicje AM, obwiedni, szumu i zapasu cyfrowego dla live/WAV. |
| `platform.js` | Identyfikatory historii dla HTTP w LAN i opcjonalna Vibration API. |
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

Domyślna animacja jest niezależna od częstotliwości audio. Energia nie podnosi samoczynnie głośności. W Skupieniu i Energii dostępne jest eksperymentalne rytmiczne światło. Wybór w przygotowaniu i przycisk „Rozpocznij z pulsacją” jawnie je włączają; brak dodatkowego checkboxa i dziedziczenia przez programy. Tryb `adaptive` ogranicza częstotliwość do zmierzonego pułapu (3 próbki/cykl, np. 20 Hz przy 60 klatkach/s). Tryb `protocol` zachowuje oryginalne częstotliwości do 40 Hz i sprawdza bieżący etap, zamiast blokować całą sesję przez jej maksimum. Odtwarzacz ujawnia aktualną i żądaną częstotliwość. Dopasowanie nie zmienia audio.

Neutralne pole obejmuje odtwarzacz; w rozwiniętym widoku wypełnia całą stronę. Kontrolki znikają po 3 s, wracają po dotknięciu, ruchu myszy lub klawiszu. Ukryte panele są `inert`. Natywny Fullscreen API ma fallback CSS; nie usuwamy systemowych pasków Safari. Sinusoidalna zmiana liniowej luminancji sRGB: średnia 0,06, zakres szczyt–szczyt 0,04/0,06/0,08. Po kwantyzacji do 8 bitów zmiana <0,085. Brak nasyconej czerwieni. Nierówna prezentacja lub ukrycie karty zatrzymuje pulsację z przyciskiem ponowienia pomiaru. Nie jest to pomiar fizycznej matrycy ani dowód skuteczności klinicznej. Szczegółowe ograniczenia, badania i parametry: `light-audio-research.md`.

Sen domyślnie korzysta z nocnej palety całego odtwarzacza. Czarny ekran to natywny modal z przyciskiem powrotu obejmującym całą powierzchnię; kontrolki wracają po dotknięciu lub Escape. Nie wyłącza urządzenia. Rytmy 4–6 i 4–7–8 zmieniają średnicę formy 46–100%. Box prowadzi punktem po czterech bokach kwadratu, po 4 s każdy. Etykieta 15 px pozostaje czytelna. Przy małym obszarze znikają dodatkowe podpisy boków; zostają punkt, ślad, nazwa bieżącej fazy i odliczanie. Systemowe ograniczenie ruchu zatrzymuje ruch i migotanie.

Modulacje audio mają jawne definicje: `pulse` to AM 0,5; `iso` i `hard` to sinusoidalna AM 1, z szybkością równą efektywnej różnicy L/R. To naprawa wcześniej ignorowanych pól. Nie jest to prostokątny ciąg impulsów GENUS. Przejścia 20 ms, wspólne fade i headroom 0,85. Docelowe wartości protokołów zachowane, efektywne wartości ujawnione w szczegółach.

## Dane i zgodność

Odczyt `koraUserPreferences`, `koraSessionLogs` i `kora-lang`; zapis do `cortex.preferences.v3` i `cortex.history.v3`. Stare klucze pozostają nietknięte. Dawne `auto` oddechu przechodzi na 4–6; zaawansowana stymulacja nie jest dziedziczona. Historia zachowuje dodatkowe stare pola. Przy niedostępnym zapisie aplikacja działa w pamięci i informuje o ograniczeniu. Zmiany z innych kart są scalane przy zapisie.

Nie ma ankiety wejściowej, symulowanej kalibracji, zakupu ani okresu próbnego. Opcjonalna ocena samopoczucia po sesji pozostaje lokalna i nie udaje pomiaru fizjologicznego.


Dźwięk prowadzenia oddechu zastępuje sygnały 440/330 Hz. Bufor mono jednego cyklu zawiera szerokopasmowy, filtrowany szum z osobną obwiednią wdechu i wydechu oraz zerami podczas zatrzymań. Web Audio zapętla go niezależnie od RAF. Wspólny początek AudioContext wyrównuje licznik, punkt i dźwięk. Wznowienie używa offsetu w cyklu; cache buforów obejmuje rytm i sample rate. Odsłuch jednego cyklu nie tworzy wpisu historii i jest zatrzymywany przed sesją, zmianą widoku lub ukryciem karty. Pole preferencji `breathCues` zachowuje dotychczasowy wybór użytkownika, ale steruje nowym dźwiękiem.
