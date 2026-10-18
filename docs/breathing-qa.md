# Oddech: kwadrat i dźwięk — odbiór

18 października 2026. Lokalny podgląd, bez publikacji GitHub Pages.

## Wprowadzone zmiany

- Box 4–4–4–4 ma kwadrat zamiast rozszerzającego się koła. Punkt porusza się w górę przy wdechu, po górnym boku podczas zatrzymania, w dół przy wydechu i po dolnym boku podczas drugiego zatrzymania. Ślad pokazuje przebytą część cyklu. Centrum zawiera małą nazwę fazy i odliczanie.
- Dodatkowe podpisy boków pojawiają się przy wystarczającym miejscu. Przy małej powierzchni pozostają punkt, kwadrat, bieżąca faza i czas. Pauza zamraża pozycję. Ograniczony ruch usuwa punkt i wyróżnia statycznie bieżący bok. Rytmy 4–6 i 4–7–8 zachowują rozszerzanie/kurczenie formy.
- Krótkie sygnały oscylatorów 440/330 Hz zostały usunięte z prowadzenia oddechu. Zastępuje je syntetyczny, szerokopasmowy szum powietrza, filtrowany i kształtowany przez pełną fazę. Wdech narasta i staje się jaśniejszy; wydech ma cieplejsze widmo i miękko opada. Zatrzymania są ciche.
- Dźwięk korzysta z jednego bufora mono na cykl, zapętlanego w Web Audio. Bufory są pamiętane dla rytmu i sample rate. Nie jest to nagranie człowieka. Nie dodano tonów, dzwonków ani automatycznej mowy.
- Zegar audio jest wspólny z wizualizacją. Wznowienie rozpoczyna dźwięk z właściwego offsetu w cyklu, także w środku zatrzymania. Dźwięk nie jest wyzwalany przez klatki animacji. Zmiana preferencji dla kolejnej sesji nie przestawia zegara bieżącej praktyki.
- „Posłuchaj jednego cyklu” umożliwia odsłuch przed startem i zatrzymanie go. Podgląd nie tworzy wpisu historii. Start sesji, opuszczenie przygotowania, ukrycie karty i przerwanie systemowe zatrzymują podgląd.
- Pole `breathCues` zachowuje dotychczasowy wybór; nowa funkcja nadal jest opcjonalna, domyślnie wyłączona. Dostępna również we wstępie oddechowym przed sesją dźwiękową. Instrukcje i whitepaper PL/EN zaktualizowano.

## Sprawdzenie

`npm test`: **37/37**. `npm run check` i `git diff --check`: bez błędów.

Nowe testy obejmują cztery boki i narożniki kwadratu, oba różne zatrzymania, wszystkie trzy rytmy dźwięku, ciszę w zatrzymaniach, łagodne brzegi sygnału, skończone i ograniczone próbki oraz rzeczywisty graf AudioEngine renderowany przez OfflineAudioContext. Test wznowienia w szóstej sekundzie Boxa potwierdza pozostałe dwie sekundy ciszy, następnie wydech i kolejną ciszę. Kolejny test potwierdza zakończenie pętli przy skróconej sesji. Testy wcześniejszych protokołów audio i światła nadal przechodzą.

Odbiór w przeglądarce na Macu:

- 390 × 660: punkt i ślad zmieniają pozycję, wszystkie podpisy mieszczą się, etykieta fazy jest mała, sterowanie widoczne.
- 320 × 568: kwadrat mieści się w dostępnej przestrzeni, dodatkowe podpisy są ukryte, pauza i zakończenie pozostają dostępne.
- 568 × 320: grafika po lewej i kontrolki po prawej, bez kolizji.
- Pauza: transform punktu pozostał dokładnie `translate(48 127.01600000000018)` pomiędzy odczytami rozdzielonymi pracą nad dokumentacją. Wznowienie i naturalne zakończenie minuty działają; zapis podsumowania wyniósł 01:00.
- EN i ograniczony ruch: ukryty punkt (`display:none`), jedna aktywna statyczna krawędź, czytelna nazwa fazy i odliczanie.
- Odsłuch: przycisk zmienia się na „Zatrzymaj odsłuch” i zatrzymuje próbkę. Wstęp przed Prime obsługuje pauzę, wznowienie oraz „Przejdź do sesji”; prowadzenie przechodzi do protokołu audio.

Testy w przeglądarce wykonywano przy wyciszonym wyjściu, a przebieg dźwięku sprawdzono na rzeczywistych próbkach PCM. Nie oznacza to odsłuchu na fizycznym iPhonie ani oceny subiektywnego komfortu brzmienia. Próbki WAV z tego samego silnika umożliwiają odsłuch przed akceptacją.

Przykładowe renderowanie odsłuchu:

```sh
node scripts/render-breath-preview.mjs /tmp/cortex-breath-box.wav box
node scripts/render-breath-preview.mjs /tmp/cortex-breath-4-6.wav 4-6
```

Praktyka zachowuje wcześniejsze czasy i wskazówki komfortowego oddechu. Żaden test techniczny nie potwierdza skuteczności klinicznej.
