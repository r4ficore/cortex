# Poprawki audytu Porcelany — 18.10.2026

Zakres tej iteracji: potwierdzone usterki i poprawki funkcjonalne P1/P2 z audytu po publikacji. Zachowano pięć ścieżek, identyfikatory, częstotliwości oraz czasy protokołów odtwarzanych na żywo. Nie dodano kont ani płatności.

## Wdrożone

- Audio: zachowanie bieżącej wartości obwiedni przy pauzie, także bez natywnego `cancelAndHoldAtTime`; wznowienie zachowuje pierwotne końcowe wygaszanie.
- Światło: natychmiastowe wstrzymanie przy nierównych klatkach i automatyczny ponowny pomiar. Po ustabilizowaniu ekran łagodnie wraca do pulsacji. Ukrycie strony nadal wymaga świadomego wznowienia; ograniczenia częstotliwości i kontrastu pozostają.
- Sesje: lokalne checkpointy co 5 s, przy pauzie i opuszczeniu strony. Powrót do tego samego miejsca w stanie pauzy albo zapis czasu w historii. Stabilne ID zapobiegają duplikacji, osobne klucze i właściciel przebiegu rozdzielają karty. Po odzyskaniu światło pozostaje wyłączone.
- Wszystkie siedem opcji tła korzysta ze wspólnego katalogu UI i preferencji. Zielony szum i ambientowy ton zachowują się po przeładowaniu.
- Eksport Hypnos: pełna, skalowana wersja 30-minutowa albo stały etap główny. Odtwarzanie 30/45/90/∞ pozostaje bez zmian. JSON i WAV korzystają z jednej konfiguracji i zawierają rzeczywiste parametry wariantu.
- Oddech: czas zaokrąglony w górę do pełnego cyklu, pokazany przed startem. Box: 1:04 / 3:12 / 5:04. 4–7–8: 1:16 / 3:10 / 5:04. Ręczne zakończenie zawsze natychmiastowe.
- Telefon: opcja Screen Wake Lock dla aktywnego oddechu i światła, informacja o stanie, zwalnianie przy pauzie/końcu/czarnym ekranie. Brak ciągłej pętli RAF na starcie, poza odtwarzaczem, w pauzie, przy samym dźwięku, czarnym ekranie i ograniczonym ruchu.
- WAV: wybór 24/48 kHz. Zapis strumieniowy z potwierdzeniem każdego fragmentu tam, gdzie dostępny jest wybór pliku; w pozostałych przeglądarkach limit 192 MiB i wcześniejsza informacja o rozmiarze. Anulowanie zatrzymuje worker i zapis. To limit inżynierski, nie gwarancja dostępnej pamięci urządzenia.
- Import kopii JSON: walidacja przed zmianą danych, podgląd liczby nowych wpisów, łączenie po ID, opcjonalne preferencje bez odziedziczenia światła. Historia zapisuje również ustawienia miksu, wzorzec oddechu i identyfikator wizyty.
- Publikacja: izolowane zasoby w katalogu zależnym od zawartości, komunikat błędu startu z ponowieniem, testy i kontrola dokumentów w GitHub Actions, artefakt wyłącznie z plikami produktu.
- Instrukcje PL/EN opisują nowe zachowania.

## Sprawdzenie

61 testów obejmuje rzeczywiste PCM dla pauzy podczas wejścia, plateau, wyjścia i tuż przed końcem (z metodą natywną i bez niej), wznowienie wygaszania, checkpointy, programy i nieskończony Hypnos, brak pamięci lokalnej, łączenie kart i import, pełne cykle, nierówne klatki i ponowny pomiar, semantykę eksportu Hypnos, metadane, 24 kHz, kontrolę przepływu fragmentów i asynchroniczne zwolnienie Wake Lock.

W podglądzie wydania sprawdzono: oddech pudełkowy, pauzę, odświeżenie i odzyskanie tego samego miejsca, historię bez duplikacji, zachowanie zielonego szumu po przeładowaniu, import istniejącej historii bez duplikacji oraz rzeczywisty eksport minutowego Hypnos i jego JSON. Pełne pole światła schowało kontrolki i wskazywało rzeczywiste 20 Hz przy 60 klatkach/s; po zmianie wymiarów ponownie mierzyło ekran.

Pomiary w ramce przeglądarki (nie na urządzeniu): start 320/390/430/768/1024/1280/1440 px, oddech 320/390/430 px, niski ekran 320×568 oraz poziomy 768×390. Bez poziomego przepełnienia, główne przyciski oddechu 44–56 px wysokości. Pełne ćwiczenie box zakończyło się po 1:04.

## Granice i dalszy rozwój

Nie wykonano fizycznych testów iPhone/Android, VoiceOver, pomiarów fotodiodą, dB SPL, zużycia baterii, wywołania presji pamięci ani latencji Bluetooth. Nie da się zastąpić ich szerokością ramki. Usunięcie danych witryny usuwa lokalne kopie; przy nagłym ubiciu procesu ostatnie kilka sekund może pozostać niezapisane.

P3 z audytu pozostaje osobnym rozwojem: instalowalne PWA/offline, opcjonalne automatyczne przejścia programów, odsłuchy porównawcze na urządzeniach, grupowanie wizyt i notatki. Nie przedstawiam tych propozycji jako ukończonych.

Dokumentacja platformy: [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/cancelAndHoldAtTime), [Screen Wake Lock](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API), [wybór pliku do zapisu](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker). Wake Lock może być odmówiony lub zwolniony przez system. Brak `showSaveFilePicker` uruchamia ograniczony eksport Blob.
