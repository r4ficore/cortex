# Cortex — korekta audio v2

18 października 2026 · implementacja w podglądzie Porcelana, przed publikacją

## Zakres i decyzja

Korekta obejmuje 14 sesji dźwiękowych, pięć istniejących programów, samodzielny oddech i oddech wstępny, odsłuch przed sesją, eksport WAV, preferencje oraz instrukcje i whitepaper PL/EN. Wszystkie programy korzystają z tego samego poprawionego silnika. Identyfikatory, czasy etapów i docelowe pary częstotliwości L/R pozostają zachowane. Parametry światła nie są zmieniane w tej rewizji.

To jawna rewizja audio, a nie samo przepisanie opisów. Zmieniono poziomy tonów, głębokość części modulacji, przejścia i tła. Nie wybrano nowych „terapeutycznych częstotliwości”: literatura nie uzasadnia takiej tabeli dla Cortex. Zachowanie dawnych częstotliwości również nie oznacza walidacji ich skuteczności.

## Co zmieniono

- Intensywność reguluje poziom tonów: 0,70 / 1,00 / 1,15. Nie przestraja par L/R ani AM. Dawne mnożniki częstotliwości 0,9 / 1,1 zostały usunięte.
- Wszystkie etapy mają jawne poziomy początkowe i końcowe. Zniknęły nieciągłości wynikające z niepełnych definicji i zmiany modulacji, szczególnie w Overdrive i Clarity.
- Przejścia częstotliwości i modulacji trwają 4 s w Energii, 6 s w Skupieniu, 8 s w Wyciszeniu i 12 s we Śnie. Krzywa podniesionego kosinusa jest opisana węzłami co najwyżej co 50 ms; pomiędzy nimi Web Audio automatyzuje parametry na zegarze audio. To nie jest aktualizowanie audio klatkami animacji.
- AM jest jawnie sinusoidalna. Normalizacja utrzymuje zbliżoną energię RMS nośnej podczas zmiany głębokości. Nie jest modelem jednakowej odczuwanej głośności.
- Modulacja w Aurora Reset i REM Sculpt jest płytsza (15%), w Parasym Pathway 20%, w Cortex Forge 35%. Są to decyzje o komforcie brzmienia, nie dawki wyprowadzone z badań. Overdrive zachowuje 50%, Clarity i Gamma Lift 100%.
- Każda z czterech ścieżek dźwiękowych ma własne harmonijne tło. Skupienie: stabilne; Wyciszenie: cieplejsze; Sen: niskie i stonowane; Energia: jaśniejsze. Tło jest opcjonalne; wybór Energii nie zmienia głośności.
- Bufory tła mają 32 s i dwusekundowe nakładanie szumu na złączu, bez okresowego zanikania do ciszy. Składniki harmoniczne mieszczą całkowitą liczbę okresów w buforze. Tła mają podobny RMS, z ograniczeniem szczytu. Nie są nagraniami natury ani nieskończenie unikalnym materiałem.
- Wygaszenie końca: Skupienie 8 s, Wyciszenie 12 s, Sen 30 s, Energia 8 s; odpowiednio skracane w krótkim odsłuchu lub przy wznowieniu blisko końca. Hypnos bez limitu nie ma automatycznego końca.
- Prowadzenie oddechu używa syntetycznego szumu powietrza przez całą fazę. Wdech i wydech mają wyrównaną energię, zatrzymania pozostają ciche, kolejne cztery cykle mają różne próbki. Głośność oddechu jest niezależna od głośności sesji dźwiękowych, także w preludium.
- Odsłuch przed startem trwa 12 s, nie zapisuje historii i jest zatrzymywany przed rozpoczęciem sesji. To fragment brzmienia głównego etapu, nie przyspieszona pełna sesja.
- WAV i odtwarzacz korzystają ze wspólnej osi parametrów, tła i wygaszeń. Wariant „Jedna nośna + sinusoidalna AM” ma teraz faktycznie jedną nośną. Nie jest opisany jako laboratoryjny ciąg krótkich impulsów GENUS.
- Przy wznowieniu w środku przejścia wraca częstotliwość pośrednia. Budowanie bufora tła poprzedza ustalenie czasu startu, aby obliczenia na telefonie nie przesuwały zaplanowanego audio w przeszłość.

## Docelowe parametry wszystkich sesji

W tabeli: pary L/R w Hz, kolejne etapy oddzielone strzałką; AM = częstotliwość / głębokość. Brak AM nie oznacza braku różnicy L/R. W czasie przejść parametry płynnie zmierzają do tych wartości. Wybór tła ich nie zmienia.

| Sesja | Ścieżka | L/R · Hz | Sinusoidalna AM |
| --- | --- | --- | --- |
| Deep Focus | Skupienie | 210/224 → 230/248 → 210/224 | — → — → — |
| Clarity | Skupienie | 220/232 → 220/236 → 220/232 | — → 16 Hz / 100% → — |
| Genesis | Skupienie | 180/190 → 150/156 → 180/190 | — → — → — |
| Presence | Skupienie | 240/250 → 240/250 | — → — |
| Cortex Forge | Skupienie | 230/244 → 250/268 → 210/222 | — → 18 Hz / 35% → — |
| Equilibrium | Wyciszenie | 200/212 → 200/210 → 200/208 | — → — → — |
| Restoration | Wyciszenie | 100/108 → 100/103 → 100/108 | — → — → — |
| Parasym Pathway | Wyciszenie | 170/176 → 140/143 → 170/178 | — → 3 Hz / 20% → — |
| Hypnos | Sen | 100/108 → 60/61 | — → — |
| Aurora Reset | Sen | 160/164 → 180/188 → 170/175 | — → 8 Hz / 15% → — |
| REM Sculpt | Sen | 170/176 → 160/166 → 180/188 | — → 6 Hz / 15% → — |
| Prime | Energia | 220/228 → 220/234 | — → — |
| Overdrive | Energia | 440/470 → 440/480 → 440/460 | — → 40 Hz / 50% → — |
| Gamma Lift | Energia | 240/258 → 260/300 → 230/242 | — → 40 Hz / 100% → — |

## Powiązanie z badaniami

Źródła są kontekstem projektowania, nie recepturą odwzorowaną przez Cortex. Tabele sygnału w aplikacji i obu whitepaperach są generowane z rzeczywistych definicji sesji.

| Ścieżka | Ustalenie i konsekwencja dla treści |
| --- | --- |
| Oddech | [Balban 2023](https://pubmed.ncbi.nlm.nih.gov/36630953/) porównywał krótkie praktyki, z obiecującymi wynikami ćwiczeń akcentujących wydech. [Fincham 2023](https://www.nature.com/articles/s41598-023-49279-8) nie wykazał przewagi powolnego rytmu nad aktywną kontrolą w głównych wynikach zdrowia psychicznego. Dźwięk Cortex jest pomocą w orientacji w fazach, nie samodzielną terapią. |
| Skupienie | [Lane 1998](https://pubmed.ncbi.nlm.nih.gov/9423966/) badał inne częstotliwości i 30-minutową ekspozycję w zadaniu czujności. Nie potwierdza sekwencji Deep Focus ani Clarity. Opisy wskazują zastosowanie do pracy, bez obietnicy przełączenia mózgu w określony stan. |
| Wyciszenie | [Mallik i Russo 2022](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0259312) badali muzykę, bodźce słuchowe i ich połączenie; wynik zależał od warunku i grupy. Nasze harmonijne tło nie odtwarza tej procedury. Nie ma obietnicy „resetu nerwu błędnego”. |
| Sen | [Lee 2024](https://academic.oup.com/sleep/article/47/10/zsae097/7647043) to mały pilotaż dynamicznych dudnień 0–3 Hz. [Basner 2026](https://pubmed.ncbi.nlm.nih.gov/41627391/) pokazuje, że różowy szum nie jest uniwersalnym polepszeniem snu. Tło pozostaje opcjonalne, dostępna jest cisza i czarny ekran; nazwy Aurora Reset/REM Sculpt nie oznaczają kontroli rytmu dobowego lub pomiaru REM. |
| Energia | [Attokaren 2026](https://pubmed.ncbi.nlm.nih.gov/42146314/) badał godzinę światła i dźwięku 40 Hz podczas zadania, [Wu 2025](https://pubmed.ncbi.nlm.nih.gov/40034515/) nie wykazał poprawy badanych funkcji po półgodzinnej ekspozycji mimo odpowiedzi EEG. Nie uzasadnia to obietnicy „zastrzyku energii” po 5 minutach Cortex. |

[Orozco Perez 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7082494/) rozróżnia odpowiedzi na bodźce binauralne i monauralne. Badania nad jedną techniką nie walidują drugiej. Pełny przegląd światła, ograniczeń ekranów i audio: [light-audio-research.md](light-audio-research.md).

## Migracja i zgodność

Preferencje v4 odczytują v3 oraz starszy zapis Kora. Zachowują jawnie wybrane tło, poziomy, język i wyłączone prowadzenie oddechu. Gdy brak osobnego poziomu oddechu, dziedziczy on dotychczasową głośność. Historia pozostaje pod swoim dotychczasowym kluczem. Nowe wpisy zapisują `audioVersion: 2` i wybrane tło; starym wpisom nie przypisuje się nowej wersji wstecznie.

Nowe instalacje domyślnie wybierają „Brzmienie ścieżki”. Istniejący użytkownik może wybrać tę opcję w przygotowaniu. Nie resetujemy jego ustawień. Programy, identyfikatory sesji i eksport danych pozostają dostępne.

## Weryfikacja i granice

- 47 testów automatycznych: czasy, pauza, programy, migracja, oddech, częstotliwości, AM, przejścia, zgodność WAV i rzeczywistego grafu AudioEngine.
- Rendering PCM w `node-web-audio-api`, 48 kHz: 39 etapów przy maksymalnym zdefiniowanym poziomie danego etapu, maksymalnych suwakach, wysokiej intensywności i białym tle. Szczyt 0,46948, czyli około −6,57 dBFS. To konkretny test, nie dowód dla każdego możliwego urządzenia i ustawienia.
- Analiza widma potwierdza Clarity 16 Hz (składowe boczne/nośna ≈ 0,500), Gamma Lift 40 Hz (≈ 0,500), Overdrive 40 Hz (≈ 0,167).
- Testy czterech dawnych granic z dużymi skokami w Overdrive i Clarity: różnica RMS przed i po przejściu < 0,5 dB, zamiast około 9–10 dB. Zmiana barwy i odczucia pulsacji nadal może być słyszalna.
- Porównanie WAV i grafu live z tłem, przy wysokiej intensywności, również podczas przejść i przez granicę 32-sekundowej pętli: różnice RMS w badanych oknach < 0,12 dB. Nie wymaga identycznej fazy próbek na dwóch implementacjach Web Audio.
- Testy interfejsu: PL/EN, odsłuch → start, pauza/wznowienie, naturalne zakończenie oddechu, czarny ekran → sterowanie, panel audio przy szerokościach 320/390 px, oddech przy 568×320 px. Testowana przeglądarka desktopowa z rzeczywistym rozmiarem ramki, nie fizyczny iPhone.
- Eksport w interfejsie dochodzi do 100% i komunikatu przekazania pliku. Narzędzie przeglądarkowe nie zwróciło ścieżki pobrania z ramki; poprawność nagłówka i PCM eksportera sprawdzono niezależnymi testami automatycznymi.
- Brak testu odsłuchowego na fizycznym iPhonie i pomiaru wyjścia słuchawek. Wartości dBFS nie są dB SPL. Brak klinicznej walidacji Cortex.

Polecenia: `npm test`, `npm run check`, `node scripts/audit-audio.mjs`, `node scripts/render-audio-previews.mjs <katalog>`. Próbki odsłuchowe czterech ścieżek są 20-sekundowymi fragmentami etapu głównego z wygaszeniami; oddech jest jednym cyklem box. Nie są skróconymi protokołami terapeutycznymi.
