# Cortex — audyt po publikacji Porcelany

18 października 2026. Wersja produkcyjna: `baafb41035f94a6ee36a6937c5513f00047bbc4a`.

## Publikacja potwierdzona

Aplikacja działa pod [r4ficore.github.io/cortex](https://r4ficore.github.io/cortex/?v=baafb41). Telefon nie wymaga już włączonego Maca ani wspólnej sieci Wi-Fi. GitHub Pages buduje z `main`, katalog główny. Wdrożenie ma status `built`; pliki aplikacji i dokumentów pobrane z HTTPS są identyczne z lokalną wersją. Wszystkie moduły JS, CSS i lokalne Tone.js również sprawdzono pod publicznymi adresami bez parametrów zapytania.

Przed publikacją uruchomiono 47 testów, kontrolę składni i lokalnych odnośników; wszystkie przeszły. Tag `cortex-before-porcelain-2026-10-18` wskazuje wcześniejszy commit `44f3add`. Powrót można przygotować jako nowy commit odwracający przebudowę, bez przepisywania historii `main`. Nową historię użytkownika należy zachować/wyeksportować przed ewentualnym powrotem do starego formatu aplikacji.

Raport opisuje osobny audyt już opublikowanej wersji. Wymienione niżej poprawki nie zostały jeszcze wdrożone. Udane wdrożenie i zielone testy nie oznaczają braku usterek.

## Najważniejszy wniosek

Największy zwrot da teraz dopracowanie ciągłości sesji, zatrzymywania audio i odporności światła na chwilowe spowolnienia. Kolejna zmiana kolorów nie rozwiąże tych problemów. Porcelana jest już spójna, a badane ekrany nie wykazały poziomego przepełnienia.

W raporcie **P1** oznacza pierwszą kolejkę poprawek funkcjonalnych, **P2** — następną kolejkę jakości i wygody, **P3** — rozwój. Potwierdzone usterki odróżniam od ryzyka wynikającego z kodu i propozycji produktowej. Nie znalazłem potwierdzonej usterki wymagającej natychmiastowego wycofania całego wdrożenia.

## 1. P1 — pauza potrafi przerwać dźwięk skokowo

**Potwierdzone renderingiem rzeczywistego grafu AudioEngine.** `stop()` anuluje przyszłe zdarzenia obwiedni, nie zachowując jej aktualnej wartości. Usunięcie końca trwającej rampy zmienia poziom, od którego zaczyna się wygaszanie.

Reprodukcja: stały ton w profilu Skupienie, 20 s, bez tła. Pauza przy 1,3707 s podczas wejścia ucina sygnał natychmiast do zera. Pauza przy 17,1307 s podczas końcowego wygaszania zwiększa RMS w kolejnych 20 ms o **5,92 dB** względem poprzednich 20 ms. To krótkotrwały skok, nie wzrost głośności całej sesji. Badano PCM, nie słyszalność kliku na konkretnych słuchawkach.

**Naprawa:** zatrzymać obwiednię na aktualnie wyliczonej wartości i dopiero ją wygasić; użyć `cancelAndHoldAtTime` z poprawnym wariantem zastępczym, gdzie metoda nie jest dostępna. Osobno zachować pozycję końcowego wygaszania po wznowieniu.

**Odbiór:** PCM dla pauzy przy wejściu, w środku, podczas wyjścia i tuż przed końcem; brak dodatkowego skoku amplitudy oraz odsłuch w Safari iOS. [Kod stop](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/audio.js#L201), [dokumentacja AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/cancelAndHoldAtTime).

## 2. P1 — światło po jednym opóźnieniu może pozostać statyczne

**Potwierdzona logika i obserwacja zatrzymania w przeglądarce.** Przy 179 równych odstępach 16,67 ms i jednym końcowym odstępie 34 ms pomiar zwraca `unstable`, choć mediana nadal wynosi 60 klatek/s. Po rozpoczęciu pulsacji ten stan zatrzaskuje `lightStopped`; kolejne prawidłowe klatki same nie przywrócą ruchu.

W teście pełnego ekranu światło raz zostało zatrzymane i wymagało „Sprawdź ponownie”. Po ponownym pomiarze działało na całym obszarze 1280×720 i ukryło kontrolki. Dwa zrzuty bez kontrolek miały w centralnym pikselu RGB 60/60/60 oraz 67/67/67, więc obraz faktycznie był odmalowywany. Interfejs poprawnie pokazał **20 Hz zastosowane / 40 Hz protokołu przy 60 klatkach/s**. Nie jest to pomiar fizycznej częstotliwości matrycy ani odtworzenie 40 Hz.

**Naprawa:** rozdzielić krótką nierówność klatek od trwałego ograniczenia wydajności i ukrycia karty. Przy krótkim spowolnieniu zatrzymać modulację i ponowić pomiar stabilności, zamiast trwale zatrzaskiwać statyczny ekran. Ukrycie karty i świadome wyłączenie powinny nadal wymagać świadomego wznowienia. Pokazywać rzeczywistą przyczynę i czas zatrzymania.

**Odbiór:** pojedyncza spóźniona klatka, seria opóźnień, zmiana orientacji, pełny ekran, 30/60/120 klatek/s, tło i powrót. Nie usuwać limitów ani nie udawać 40 Hz na ekranie, który go nie odtwarza. [Ocena klatek](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/stimulation.js#L76), [zatrzask zatrzymania](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/app.js#L399).

## 3. P1 — odświeżenie usuwa niezakończoną sesję i jej czas

**Potwierdzone w interfejsie.** Uruchomiono Overdrive w odizolowanym podglądzie. Przy liczniku 04:45 odświeżono stronę. Sesja zniknęła, nie pojawiła się możliwość wznowienia, a historia nadal pokazywała 0 sesji. Zapis następuje dopiero podczas zakończenia; `pagehide` zatrzymuje dźwięk, ale nie zapisuje przebiegu.

**Naprawa:** okresowy lokalny zapis aktywnego przebiegu, zapis przy pauzie i ukryciu strony oraz ekran „Wrócić do przerwanej sesji?”. Po powrocie nie uruchamiać automatycznie audio ani światła. Zachować wypracowany czas i pozwolić zamknąć przerwaną sesję bez podwójnego wpisu w historii.

**Odbiór:** odświeżenie, zamknięcie i otwarcie, dwie karty, brak localStorage i ponowienie zapisu. Test usunięcia karty z pamięci przez iOS pozostaje do wykonania na urządzeniu. [Zapis historii](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/app.js#L772), [pagehide](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/app.js#L1225).

## 4. P2 — zielony szum i ambientowy ton nie dają się wybrać

**Potwierdzone na publicznej stronie i testem zapisu.** Menu oferuje `green` oraz `drone`, ale walidator dopuszcza wyłącznie soundscape/brown/pink/white/none. Wybranie zielonego szumu natychmiast przywraca „Brzmienie ścieżki”. Ambientowy ton jest odrzucany przez tę samą regułę. Nie jest to problem sprzętu ani dźwięku w Safari.

**Naprawa:** jeden współdzielony katalog typów tła dla interfejsu, preferencji i eksportu. Zachować oba istniejące generatory i wcześniejsze wybory. **Odbiór:** wybór → zapis → przeładowanie → odsłuch → eksport dla każdej opcji. [Walidator](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/store.js#L35).

## 5. P2 — krótki eksport Hypnos nie jest pełną sekwencją

**Potwierdzone na danych przekazywanych do eksportera.** Hypnos ma nieskończony czas bazowy i etap główny od 900 s. Funkcja skracania nie skaluje tego protokołu. Pliki 1, 5 i 15 minut zawierają wyłącznie parę 100/108 Hz; etap 60/61 Hz w nich nie występuje. Tymczasem panel mówi „Pełna sekwencja z wyciszeniem” oraz że zmieniona długość skaluje etapy. „Stały fragment” w takim krótkim wariancie również wybiera etap wstępny.

**Naprawa:** zdefiniować osobno semantykę eksportu Hypnos: jawny wycinek albo pełna sekwencja oparta na skończonym wariancie 30 min. Nie zmieniać przy tym potajemnie normalnego odtwarzania 30/45/90 min i bez limitu.

**Odbiór:** porównanie etapów i widma dla każdej długości eksportu oraz jednoznaczny opis pliku. [Skalowanie](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/catalog.js#L192), [wybór stałego fragmentu](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/export-worker.js#L22).

## 6. P2 — eksport JSON nie opisuje ustawionego WAV

**Potwierdzone kodem.** „Dane JSON” pobierają oryginalny katalog sesji. Nie uwzględniają wybranej długości, nośnej, mono/AM, tła, intensywności ani suwaków. Przykładowo pięciominutowy plik Deep Focus może mieć obok JSON z bazowym czasem 15 minut. JSON Hypnos ma czas Infinity, niezależnie od wybranej długości WAV.

**Naprawa:** rozdzielić „Definicję oryginalnego protokołu” od „Ustawień tego eksportu”. Do drugiego dodać wersję audio, rzeczywiste etapy i parametry wariantu. **Odbiór:** automatyczne porównanie metadanych z konfiguracją przekazaną workerowi. [Eksport metadanych](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/app.js#L1166).

## 7. P2 — minutnik może zakończyć oddech w środku fazy

**Potwierdzone arytmetyką cyklu, kwestia doświadczenia użytkownika.** W rytmie 4–7–8 sesja 60 s kończy się 3 sekundy po rozpoczęciu kolejnego wdechu; 180 s kończy się podczas zatrzymania, a 300 s podczas wydechu. Trzyminutowy box kończy się po wdechu, przed zatrzymaniem. Rytm 4–6 zamyka pełne cykle dla wszystkich obecnych długości.

**Usprawnienie:** przy końcu zakomunikować „Dokończ spokojnie ten oddech” i zakończyć po pełnym cyklu albo od początku prezentować czas wynikający z pełnych cykli. Zatrzymanie ręczne zawsze ma działać natychmiast. Nie wymuszać domykania oddechu wbrew komfortowi. **Odbiór:** 1/3/5 min dla każdego wzorca, zgodność dźwięku, obrazu i komunikatu końca.

## 8. P2 — telefon potrzebuje dopracowania pracy ekranu i baterii

**Brak funkcji potwierdzony kodem; wpływu na konkretne urządzenie nie zmierzono.** Nie ma obsługi Screen Wake Lock. System może wygasić ekran podczas oddechu lub światła. Aplikacja wykonuje też stałą pętlę animacji i zbierania klatek poza aktywną wizualizacją, w tym pod czarną zasłoną.

**Usprawnienie:** opcja utrzymywania ekranu podczas prowadzenia oddechu i świadomie wybranego światła, zwalniana przy pauzie/końcu. Sen z czarnym ekranem i samym audio powinien mieć odrębną politykę. Animację uruchamiać tylko wtedy, gdy coś widocznego wymaga odświeżania; zegar audio pozostaje niezależny.

Screen Wake Lock działa w obsługujących go przeglądarkach przez HTTPS i może zostać odrzucony lub zwolniony przez system. Interfejs powinien pokazać jego stan zamiast gwarantować działanie. [Dokumentacja](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API), [pętla aplikacji](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/app.js#L894).

## 9. P2 — długie WAV wymagają dużej pamięci

**Ryzyko wynikające z kodu i rozmiaru, nie odtworzona awaria iPhone’a.** 45 minut stereo PCM 48 kHz / 16 bit to 518,4 MB, około 494,4 MiB. Worker wysyła fragmenty, ale interfejs zachowuje wszystkie do utworzenia Blob. Samo dzielenie pracy na fragmenty nie ogranicza końcowej pamięci całego pliku; dodatkowe kopie zależą od implementacji przeglądarki.

**Usprawnienie:** na telefonie rozsądniejsza domyślna długość, wybór lżejszego formatu po sprawdzeniu wsparcia urządzenia oraz zapis strumieniowy tam, gdzie platforma go wspiera. WAV zostaje jako format bezstratny. Przygotować testy anulowania, niedostatku pamięci i pobrania na fizycznym Safari. [Gromadzenie fragmentów](https://github.com/r4ficore/cortex/blob/baafb41035f94a6ee36a6937c5513f00047bbc4a/assets/js/export.js#L108).

## 10. P2 — potrzeba importu historii i lepszego zapisu ustawień sesji

**Luka funkcjonalna potwierdzona kodem.** Jest eksport historii JSON, ale nie ma importu. Historia i preferencje ze starego podglądu LAN nie przeniosą się same do domeny GitHub Pages, bo przeglądarka rozdziela dane tych adresów. To samo dotyczy przenoszenia z komputera na telefon.

**Usprawnienie:** bez kont i serwera dodać import z walidacją schematu, podglądem liczby wpisów, łączeniem po ID i wyborem, czy przenosić też ustawienia. Nowy wpis sesji powinien zapisywać również wzorzec oddechu, wybrane obrazy, zastosowane ograniczenie częstotliwości i parametry audio. Obecne `audioVersion` i `soundBackground` to zbyt mało, by odtworzyć ustawienia udanej sesji.

## 11. P2 — wydawanie kolejnych wersji wymaga zabezpieczenia przed mieszaniem plików

**Ryzyko architektury oraz pojedyncza obserwacja.** GitHub zwracał `Cache-Control: max-age=600`, a nazwy modułów są stałe. Pierwsze otwarcie po publikacji pozostało na „Przygotowujemy Twoją przestrzeń…”. Zwykłe odświeżenie rozwiązało problem. Nie uzyskano błędu konsoli, więc nie przypisuję tej obserwacji definitywnie pamięci podręcznej.

**Usprawnienie:** wersjonowane zasoby, komunikat z ponowieniem przy błędzie startu i automatyczny test publicznego wdrożenia. Proces GitHub Actions powinien sprawdzić testy, zgodność wygenerowanych dokumentów i publikować tylko pliki produktu. Obecnie Pages publikuje także stare kopie w `backups/`, materiały robocze i fixture testowe. To porządek wydania, nie stwierdzony wyciek sekretów.

## 12. P3 — rozwój premium po usunięciu usterek

- **Programy:** wybór ręcznego lub automatycznego przejścia przed rozpoczęciem. Obecny Power Nap 45 zatrzymuje się pomiędzy etapami i czeka na dotyk, więc nie jest automatycznym 45-minutowym przebiegiem z powrotem. Każdy wariant powinien z góry pokazywać zasady; światło nadal nie może dziedziczyć się automatycznie.
- **Telefon:** instalowalna wersja PWA z kontrolowanym aktualizowaniem i trybem offline. Samo dodanie obecnej strony do ekranu początkowego nie oznacza gwarantowanej pracy bez internetu. Haptyka rytmu na iPhonie wymaga osobnego sprawdzenia platformy; nie obiecywać jej na podstawie pojedynczego przełącznika.
- **Brzmienie:** porównawcze odsłuchy pięciu ścieżek na docelowych słuchawkach, z wyrównanym poziomem. Test komfortu, rozpoznawania faz oddechu i męczących tonów; osobno badanie deklarowanego efektu. Poprawny RMS ani same Hz nie wystarczą do oceny jakości dźwięku.
- **Wiedza:** przy każdej sesji krótko opisać cel użytkowy, rzeczywisty sygnał i poziom dowodów. Rozbudowane źródła pozostawić w szczegółach. Nazwy historyczne nie powinny sugerować, że aplikacja mierzy REM lub steruje stanem mózgu.
- **Historia:** grupowanie programu i jego preludium jako jednej wizyty z etapami, powtórzenie tych samych ustawień oraz dobrowolna krótka notatka. Zamiast rozbudowywania dashboardu „mózgu” lepiej pokazać regularność i własne odczucia.

## Co przeszło sprawdzenie

- Wdrożenie produkcyjne `baafb41`: status `built`, publiczne pliki zgodne z repozytorium. 47/47 testów i kontrola składni zakończone poprawnie.
- 30 pomiarów: start przy szerokościach 320, 390, 430, 568, 768, 1024, 1280, 1440 oraz 640 px; Energia, Biblioteka, instrukcje PL/EN, whitepaper PL/EN i landing przy 320/390/768 px. `scrollWidth` równe `clientWidth` we wszystkich przypadkach. 640×360 to mały viewport, nie wykonany test rzeczywistego zoomu przeglądarki 200%.
- Główne kontrolki przygotowania oddechu na 320 px miały wysokość co najmniej 44 px. Sprawdzony skrót „Przejdź do treści” poprawnie przenosi fokus bez opuszczania biblioteki.
- Reprezentatywne pary kolorów: tekst podstawowy/tło 11,41:1; tekst pomocniczy/tło 4,83:1; nocny tekst pomocniczy/tło 9,74:1. Przekraczają próg tekstu zwykłego 4,5:1. To nie pełna certyfikacja wszystkich stanów i elementów. [WCAG: kontrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- Światło: po pomiarze porusza się, wypełnia pole i potrafi ukryć kontrolki; powrót do sterowania działa. Wskazuje zastosowaną częstotliwość zamiast nazywać 20 Hz częstotliwością 40 Hz.
- Katalog zachowuje 14 sesji i 5 programów. Nie znaleziono wysyłania historii lub preferencji przez kod aplikacji do usługi zewnętrznej. Hosting nadal otrzymuje zwykłe żądania plików WWW.

## Co pozostaje niezweryfikowane

Nie wykonano testu na fizycznym iPhonie/Androidzie, VoiceOver, sprzętowego pomiaru głośności, latencji Bluetooth ani pomiaru światła fotodiodą. Nie wykonano pełnej macierzy zoomu 200%, godzinnego testu zużycia baterii ani wymuszonego braku pamięci. Widok 390 px w przeglądarce desktopowej nie zastępuje tych testów. Przegląd kodu i działania nie jest badaniem klinicznej skuteczności Cortex.

## Zalecana kolejność kolejnej iteracji

1. **Ciągłość:** obwiednia pauzy, zapis aktywnej sesji, odzyskiwanie, diagnostyka i ponowny pomiar światła. Dodać testy regresji wykrytych przypadków, nie tylko dotychczasowych funkcji.
2. **Zgodność ustawień:** katalog tła, Hypnos w eksporcie, prawdziwe metadane WAV, kończenie oddechu po cyklu. Każda opcja UI musi odpowiadać temu, co faktycznie odtwarza generator.
3. **Odbiór telefonu:** Wake Lock i praca w tle, Safari/Chrome, orientacja, zablokowanie ekranu, słuchawki/Bluetooth, niska bateria, VoiceOver i zoom. Zmierzyć pamięć eksportu.
4. **Rozwój premium:** import historii, zapamiętane ustawienia, dopracowane przejścia programów i PWA. Dopiero potem kolejne dekoracje i eksperymenty z brzmieniem.

Żadna z tych rekomendacji nie wymaga teraz dodawania kont, płatności ani dużego frameworka.
