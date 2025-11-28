# Plan naprawy layoutu aplikacji

## Problemy do rozwiązania
- **Siatka główna traci spójność na węższych viewportach** – sekcje `Polecany start`, wizualizacja i statystyki są osadzone w `flex flex-col` z `max-w-6xl`, co powoduje ściskanie kolumn i nakładanie się paneli po przekroczeniu szerokości 1280 px.【F:index.html†L304-L456】
- **Wizualizacja jest spłaszczona, a kontrolka startu żyje w osobnym pasku** – panel wizualizacji ma tylko minimalną wysokość i oddzielny pasek CTA z długim opisem, co ukrywa płótno i mnoży miejsca do kliknięcia.【F:index.html†L384-L432】
- **Zostawione style starego docka mogą kolidować z nowym układem** – klasy `.control-dock` w CSS wciąż definiują absolutnie pozycjonowane okno sterowania, co może nieświadomie nadpisywać nowy rząd kontroli w przeglądarkach z pamięcią cache.【F:assets/css/app.css†L570-L759】

## Plan działań
1. **Przebudowa siatki dashboardu**
   - Zastąpić `flex flex-col` w kontenerze głównym semantycznym układem siatki z minimalnymi szerokościami kolumn, aby `Polecany start`, wizualizacja i statystyki nie ściskały się przy 1200–1366 px.
   - Dodać przerwy i `minmax()` dla kolumn lewa/prawa, aby karty miały stabilne szerokości bez nachodzenia.

2. **Wizualizacja + kontrolki w jednym komponencie**
   - Podnieść wysokość wizualizacji do proporcji 16:9 na desktopie i 4:5 na mobile z limitem `max-height: 80vh`, aby płótno było widoczne bez ręcznego powiększania.
   - Wprowadzić pasek sterowania w obrębie wizualizacji (nad lub pod canvasem) z ikoną „play/stop” i krótkim tekstem pomocniczym, eliminując oddzielny pasek pod spodem i wygaszanie zasłaniające płótno.
   - Ustawić badge stanu w nagłówku (już przeniesiony) oraz skrócić tekst pomocy, by uniknąć zawijania po jednym słowie.

3. **Sprzątnięcie starych stylów i test regresji**
   - Usunąć lub namespacować reguły `.control-dock` i inne legacy helpery tak, by nie wpływały na nowe kontrolki.
   - Sprawdzić wejście z landingu → kalibracja → dashboard na viewportach 1280, 1440 i 1920 px, potwierdzając brak nakładania się paneli i widoczność wizualizacji.
   - Dodać szybki smoke-test Playwright z kliknięciem „Inicjuj sesję” i weryfikacją widoczności canvasu oraz przycisku play, żeby wychwycić przyszłe regresje layoutu.
