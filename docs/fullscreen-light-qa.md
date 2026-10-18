# Pełne pole światła — odbiór poprawki

18 października 2026. Lokalny podgląd przed publikacją. Zastępuje opis małego pola z wcześniejszego `light-audio-qa.md`.

## Przyczyna i zmiana

Poprzedni warunek porównywał tempo RAF z maksimum całego protokołu. Overdrive wymagał w ten sposób 120 klatek/s już od początku i pozostawał statyczny na ekranie obsługiwanym przez przeglądarkę w 60 klatkach/s. Rozwinięcie odtwarzacza nadal pokazywało dysk 148 px i pełny zestaw kontrolek.

Obecnie użytkownik wybiera dopasowanie częstotliwości do ekranu albo zachowanie protokołu. Tryb dokładny sprawdza bieżący etap. Dopasowanie przy 60 klatkach/s daje pułap 20 Hz, jawnie pokazany obok żądanej wartości, i nie przestawia audio. Całe pole strony jest wypełnione światłem po rozwinięciu; kontrolki chowają się po 3 s, wracają po dotknięciu. Brak natywnego fullscreen uruchamia wariant CSS. Dodatkowy checkbox usunięto; włączeniem jest wybór obrazu i „Rozpocznij z pulsacją”.

## Testy automatyczne

`npm test`: **32/32**. `npm run check` i `git diff --check`: bez błędów.

Pokrycie obejmuje niezmienione definicje 14 sesji i 5 programów, zegar i pauzę, oddech, migrację, fallback fullscreen, 40 Hz przy 120/60 klatkach/s, pułapy dopasowania 10/20/40 Hz, całkowanie obciętych ramp w obu kierunkach oraz liniową luminancję po kwantyzacji do 8 bitów. Testy rzeczywistego grafu audio nadal potwierdzają kanały, AM i brak cyfrowego przesterowania na wszystkich etapach.

## Weryfikacja renderowanych pikseli

Zrzuty pochodzą z działającej przeglądarki, nie z generatora obrazów ani z odczytu samych stylów DOM. Zapis z API miał format JPEG; analiza pikseli uwzględnia artefakty kompresji przy granicach iframe.

- Desktop, natywny pełny ekran 1280 × 800: 12 kolejnych zrzutów. Każda cała klatka zawierała jeden neutralny kolor. Wartości kanału R=G=B kolejno: **74, 82, 77, 79, 81, 82, 84, 66, 55, 63, 66, 64**. Brak paneli i stałych dekoracji na powierzchni obrazu.
- Obszar strony 390 × 660, zablokowane natywne fullscreen i aktywny fallback CSS: pole miało prostokąt dokładnie `(0,0,390,660)`. Osiem kolejnych zrzutów, wartości środka: **68, 75, 84, 83, 82, 85, 79, 51**. Wewnętrzny prostokąt 350 × 620 miał w każdej klatce jeden neutralny kolor; krawędzie wykazują artefakty JPEG.
- Pauza: trzy zrzuty dały niezmienne tło **69,69,69**. Wznowienie ponowiło pomiar i przywróciło pulsację.

Dowodzi to faktycznego odmalowywania pełnego pola. Zrzuty nie są próbkowane równomiernie i **nie mierzą fizycznej częstotliwości matrycy**; nie zastępują fotodiody.

## Scenariusze w interfejsie

- Overdrive w dopasowaniu: przy około 60 klatkach/s widoczne „Światło 20.0 Hz · protokół 40.0 Hz”.
- Tryb dokładny przy około 60 klatkach/s: wymagający etap pozostaje bez pulsacji, z wartościami protokołu/ekranu i działającym przyciskiem dopasowania. Przełączenie ponowiło pomiar bez restartu sesji (licznik 03:51 → 03:50, następnie dalszy przebieg).
- Ukryte panele: `visibility:hidden`, wyłączone interakcje i `inert`. W drzewie dostępności pozostał przycisk obejmujący całe pole: „Pokaż sterowanie światłem”. Dotknięcie przywróciło pauzę, zakończenie i wyjście z pełnego widoku.
- Pauza/wznowienie, ręczne ukrywanie podczas pauzy, zakończenie sesji: działają; po zakończeniu wraca podsumowanie bez zasłony.
- 320 × 568: komunikat trybu dokładnego i kontrolki bez nakładania. Górny panel kończy się na 116 px, informacja na 220 px, dolny panel zaczyna się na 276 px i kończy na 552 px.
- 390 × 660: pole wypełnia stronę, kontrolki mieszczą się i chowają.
- 568 × 320: układ poziomy z informacją po lewej i sterowaniem po prawej; po ukryciu całe pole 568 × 320.
- 1024 × 600: pełne pole 1024 × 600, panele bez nakładania; wyjście usuwa klasę pełnego widoku i przywraca zwykły odtwarzacz.
- Testowy iframe w `tests/fixtures/embedded-light.html` pozwala odtworzyć małe powierzchnie i brak natywnego fullscreen.

## Ograniczenia

To test rzeczywistego renderera przeglądarki na Macu w ograniczonym obszarze strony, **nie test fizycznego iPhone’a ani symulacja wszystkich zachowań iOS**. Nie zmierzono jasności w lux/nitach, opóźnienia audio–ekran ani fizycznego przebiegu światła. Paski systemowe/Safari mogą pozostać. Nie przeprowadzono badania skuteczności ani niezależnego pomiaru PEAT/Harding. Konstrukcja neutralnego sygnału ogranicza zmianę liniowej luminancji do <0,085 po zaokrągleniu; nie jest gwarancją tolerancji każdej osoby.

Instrukcja i whitepaper PL/EN oraz `light-audio-research.md` opisują nową implementację i odróżniają wariant dopasowany od oryginalnego protokołu. Publiczna strona nie została zaktualizowana w tym odbiorze.
