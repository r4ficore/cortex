# Cortex — audyt światła, dźwięku i oddechu

18 października 2026 · przegląd badań i audyt implementacji · wersja robocza przed publikacją

## Wnioski dla produktu

Rytmiczne światło jest rzeczywistym bodźcem sensorycznym. Może wywoływać mierzalną odpowiedź EEG, a część badań wykazuje również zmiany zachowania. Usunięcie częstotliwości protokołów i zastąpienie ich wszystkich animacją 2 Hz było zmianą funkcjonalną, nie tylko estetyczną. W tej wersji cofnięto uniwersalne ograniczenie częstotliwości do 2 Hz.

Nie istnieje jednak zweryfikowana tabela „częstotliwość → gwarantowany stan psychiczny” dla Cortex. Odpowiedź wywołana w EEG, pobudzenie, poprawa uwagi, sen i korzyść kliniczna to odrębne wyniki. Nie można utożsamić dwóch tonów różniących się o 40 Hz z 40 impulsami dźwiękowymi na sekundę ani dowolnego migania ekranu z panelem LED użytym w badaniu.

Przywrócony tryb światła jest opcjonalnym eksperymentem sensorycznym w sesjach Skupienia i Energii. Oferuje zapisane częstotliwości albo jawnie wybrany wariant dopasowany do ekranu, kontroluje tempo wywołań klatek i ogranicza zmianę luminancji. Jednolite pole może wypełniać całą stronę, bez stałych kontrolek. Nie jest odtworzeniem dawki klinicznej. Sen ma domyślnie nocną formę i łatwo dostępne całkowite wygaszenie strony. Oddech ma znacznie czytelniejszy ruch, bez szybkiego migotania.

## Jak przeprowadzono przegląd

Przeszukano publikacje pierwotne i dokumentację techniczną, obejmując wyniki pozytywne, zerowe i ograniczenia. Główne pytania: co wywołuje rytmiczne światło; czy zmiana EEG przekłada się na zachowanie; czym różnią się LED, gogle i ekran; jakie parametry trzeba zmierzyć; jak działają binauralne, monauralne i modulowane sygnały; co faktycznie generuje kod Cortex. Przegląd jest pogłębionym przeglądem ukierunkowanym na projekt, a nie przeglądem systematycznym z prerejestracją i oceną wszystkich publikacji.

Sprawdzono bieżący kod oraz implementację sprzed przebudowy Porcelana. Historyczne propozycje w repozytorium zawierają także hipotezy produktowe, np. „reset dobowy” i „reset nerwu błędnego”; same opisy nie stanowią walidacji skuteczności. Poniższe decyzje odnoszą się do konkretnie zweryfikowanego kodu i wymienionych źródeł.

## Co pokazują badania nad światłem

| Badanie | Projekt i bodziec | Wynik istotny dla Cortex | Ograniczenie przenoszenia wyniku |
| --- | --- | --- | --- |
| [Chan i wsp., 2022](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0278412) | Badanie wykonalności: 25 osób zdrowych, 16 osób z łagodnym AD oraz 2 pacjentów monitorowanych elektrodami śródczaszkowymi. Oddzielny pilotaż randomizowany: 15 osób z AD, 1 h dziennie przez 3 miesiące. | Wywołana odpowiedź 40 Hz i obiecujące wyniki eksploracyjne; wykonalność w badanej grupie. | Mały pilotaż, populacja kliniczna, dobór i nadzór. Panel LED i synchronizowany dźwięk; nie dowód na 5-minutowy „zastrzyk energii” na telefonie. |
| [Attokaren i wsp., 2026](https://pubmed.ncbi.nlm.nih.gov/42146314/) | 62 zdrowych dorosłych, 1 h stymulacji audiowizualnej 40 Hz podczas zadania czujności; kontrola stała i losowe migotanie. | Grupa 40 Hz miała lepszą trafność i szybsze reakcje. To konkretne wsparcie hipotezy wpływu na uwagę. | Wynik w określonym zadaniu podczas ekspozycji; nie test Cortex, samopoczucia energetycznego ani całodziennej produktywności. Wnioski oparto na abstrakcie i dostępnych fragmentach metod/wyników; pełny tekst wydawcy był niedostępny. |
| [Wu i wsp., 2025](https://journals.sagepub.com/doi/10.1177/25424823241311927) | 20 uczestników w analizie; 30 min światła i dźwięku 40 Hz porównane ze stałym światłem i dźwiękiem. | Odpowiedź EEG podczas stymulacji, bez wykazanej poprawy percepcji, uwagi, pamięci krótkiej i długiej po sesji. | Niewielka próba i pojedyncza sesja. Nie przekreśla innych zastosowań, ale pokazuje, że entrainment nie gwarantuje poprawy funkcji. |
| [Hsiung i Hsieh, 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10901250/) | Eksperyment ze źródłem światła 40 Hz oraz drugi z ekranem 48 Hz. | Nie wykazano przewagi w progach widzenia i pamięci wzrokowo-przestrzennej. | Różne urządzenia i częstotliwości; zakres wyników ograniczony do badanych zadań. Nie można wybierać wyłącznie publikacji pozytywnych. |
| [de Graaf i wsp., 2013](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0060035) | Rytmiczna stymulacja wzrokowa i zadania percepcyjne w paśmie alfa. | Efekty zależne od fazy i czasu prezentacji bodźca. Potwierdza znaczenie rytmu dla przetwarzania wzrokowego. | Nie test „10 Hz na relaks”, leczenia stresu ani uniwersalnego profilu alfa dla każdego człowieka. |
| [Yang i wsp., 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11995936/) | 62 studentów; quasi-eksperyment, 6/10/25 Hz w okularach MindLightz, 20 min, losowana kolejność i przerwy między wizytami. | Zmiany parametrów autonomicznych zależały od częstotliwości i grupy. W grupie z objawami depresji odpowiedź nie była po prostu „uspokajająca”. | Brak równoważnej kontroli bez migotania i dokładnej dawki w jednostkach fotometrycznych. HRV i ciśnienie nie dowodzą „resetu nerwu błędnego”. |
| [Zhou i wsp., 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10907382/) | Mechanizmy adenozynowe głównie u myszy; także badanie przed–po u 49 dzieci z bezsennością, 30 min 40 Hz. | Wyniki dotyczące snu są interesujące i wymagają dalszych badań. | U dzieci nie było randomizowanej równoległej grupy sham. Badano specjalny sprzęt; raportowano 4000 lux u myszy i 2000 lux u ludzi. Nie przenosimy tego na domowy telefon ani zalecenia dla dzieci. |
| [Chang i wsp., 2015](https://pubmed.ncbi.nlm.nih.gov/25535358/) | Randomizowane porównanie wieczornego czytania na świecącym urządzeniu i książki papierowej w kontrolowanych warunkach. | Ekspozycja ekranowa wpływała na melatoninę, porę snu i czujność następnego ranka. | Badano długą ekspozycję, nie krótką animację Cortex. Uzasadnia ograniczanie wieczornego światła, nie precyzyjny próg czasu dla aplikacji. |

W badaniu Chan poziom światła przy oczach wynosił około 390–400 lux; dźwięk miał krótkie impulsy 1 ms w okresie 25 ms, czyli 4% wypełnienia. To parametry opisu eksperymentu, nie zalecenia ustawienia Cortex. Procent suwaka telefonu nie odpowiada lux ani dB SPL. W szczególności 40 Hz binauralnego dudnienia nie odtwarza takiego ciągu impulsów. [Metody badania](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0278412).

Pozytywny wynik uwagi podczas godzinnej stymulacji i brak poprawy po półgodzinnej sesji mogą współistnieć: inne zadania, czas pomiaru, urządzenia i próby. Uczciwy wniosek to uzasadnienie dalszej walidacji, a nie obietnica skuteczności każdego presetu.

## Parametry światła i implementacja

### Częstotliwość oraz odświeżanie

Przywrócono oddzielny renderer sinusoidalnej zmiany luminancji. Wykorzystuje `visual.f`, a dla ramp `f_s → f_e` oblicza całkę częstotliwości. Wzór `sin(2π f(t)t)` dawałby błędną częstotliwość rampy. Parametry audio nie są przestawiane przez wybór obrazu.

| Sesja | Żądana sekwencja światła | Minimalne tempo wywołań klatek przy przyjętym marginesie |
| --- | --- | --- |
| Prime | 8 → 14 Hz | około 42/s |
| Deep Focus | 10 → 14 → 10 Hz | około 42/s |
| Clarity | 10 → 12 → 8 Hz | około 36/s |
| Genesis | 10 → 6 → 8 Hz | około 30/s |
| Presence | 10 → 8 Hz | około 30/s |
| Cortex Forge | 12 → 18 → 12 Hz | około 54/s |
| Overdrive | rampa 20–35 → 40 → rampa 30–10 Hz | około 120/s |
| Gamma Lift | 16 → 38 → 12 Hz | około 114/s |

W trybie dokładnym Gamma Lift zachowuje historyczne **38 Hz obrazu i 40 Hz różnicy tonów** w środkowym etapie. Nie nazywamy tego synchronizowanym protokołem GENUS 40 Hz. Zachowanie katalogu nie oznacza naukowej walidacji tej konkretnej kombinacji. Częstotliwości 14/18/38 Hz pozostają eksperymentalnym wyborem istniejącego produktu; przegląd nie ustalił ich klinicznej przewagi.

Przed pierwszym migotaniem zbieramy co najmniej 90 odstępów `requestAnimationFrame`; okno dochodzi do 180 próbek. Analizujemy medianę, 95. percentyl i ostatnią klatkę. Przyjmujemy co najmniej trzy próbki na cykl sinusoidy (2% tolerancji pomiaru) jako **decyzję inżynierską**, nie standard kliniczny.

Wcześniejszy warunek używał maksymalnej częstotliwości całej sesji, przez co Overdrive pozostawał statyczny od początku przy 60 klatkach/s. Poprawka rozdziela dwa jawnie opisane warianty:

- **Dopasuj do ekranu:** użytkownik wybiera ograniczanie częstotliwości do zmierzonego pułapu. Przy 60 klatkach/s jest to 20 Hz, przy 30 — 10 Hz, przy 120 — 40 Hz. Pułap zostaje ustalony po pomiarze; nie skacze między klatkami. Rampy są całkowane z uwzględnieniem obcięcia. Ekran pokazuje zastosowaną i żądaną wartość, gdy się różnią. Jest to zmieniony bodziec, **nie odtworzenie 40 Hz ani GENUS**. Audio zachowuje swoje parametry.
- **Dokładnie według protokołu:** zachowuje oryginalną częstotliwość i ocenia wyłącznie bieżący etap. Przy 60 klatkach/s etap 40 Hz pozostaje bez pulsacji; interfejs proponuje świadome dopasowanie. Późniejszy zgodny etap może działać. Nie blokujemy już całego protokołu jego maksymalną częstotliwością.

Nierówne klatki po uruchomieniu, ukrycie karty albo opuszczenie odtwarzacza zatrzymują pulsację. Przycisk „Sprawdź ponownie” ponawia pomiar bez resetowania audio. Rozwinięcie odtwarzacza i wznowienie po pauzie również rozpoczynają pomiar od nowa, ponieważ zmiana powierzchni może chwilowo zaburzyć tempo klatek.

To pomiar tempa callbacków, **nie pomiar fotodiodą rzeczywistych błysków matrycy**. Przeglądarka może pominąć prezentację klatki mimo callbacku. Zmienny refresh, tryb oszczędzania energii, kompozytor, PWM ekranu i latencja wyjścia pozostają poza tą kontrolą. 120 Hz na specyfikacji telefonu nie gwarantuje 120 callbacków/s w Safari. [Dokumentacja `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), [wyjaśnienie WebKit](https://webkit.github.io/explainers/animation-frame-rate/).

### Luminancja, kontrast, powierzchnia i kształt

- Jednolite neutralne pole wypełnia odtwarzacz. „Rozwiń widok” rozszerza je na całą dostępną stronę; po 3 sekundach znika nazwa, licznik i sterowanie. Dotknięcie przywraca kontrolki. Przycisk „Ukryj sterowanie” ponownie usuwa nakładki, a Escape lub „Zwiń widok” wraca do odtwarzacza. Systemowych pasków Safari nie da się w ten sposób zagwarantowanie usunąć.
- Średnia liniowa luminancja sRGB: 0,06. Zmiana szczyt–szczyt: 0,04, 0,06 lub 0,08, domyślnie 0,06. Odpowiada to około 33%, 50% i 67% kontrastu Michelsona wokół tej średniej. Niższe tło umożliwia wyraźniejszą względną modulację przy ograniczonej bezwzględnej zmianie luminancji.
- Wartości liniowe przeliczamy na sRGB przed wyświetleniem. Po zaokrągleniu do 8 bitów maksymalna zmiana pozostaje poniżej 0,085, co obejmuje automatyczny test. Kontrolowany sygnał pozostaje poniżej zmiany 0,10 definiującej ogólny błysk w kryterium W3C; nie opieramy pełnego pola na wyjątku małej powierzchni.
- Sinusoidalna modulacja ma łagodniejsze przejścia niż prostokątny stroboskop. Nie opisujemy jej jako 50% wypełnienia „włącz/wyłącz”. Nie odtwarzamy wysokokontrastowych prostokątnych błysków z poprzedniego rendereru.
- Brak nasyconej czerwieni, migających pasów i nałożonej membrany. Kontrast narasta przez 2 s po poprawnym pomiarze. Gdy pulsacja jest zatrzymana, pozostaje stała średnia jasność i dostępne sterowanie.
- Parametr historyczny `bri` nie jest traktowany jako skalibrowana jasność. Renderer korzysta z jawnych, ograniczonych poziomów opisanych powyżej.

W3C uwzględnia częstotliwość, zmianę luminancji, czerwone błyski i obszar; samo „nie więcej niż 2 Hz” nie jest jedyną metodą ograniczenia ryzyka. Jednak zgodność modelu kolorów nie gwarantuje tolerancji danej osoby, szczególnie przy HDR, ustawieniach ekranu i nieznanej odległości. Nie przeprowadzono niezależnego testu PEAT/Harding ani pomiaru fizycznego ekranu. [WCAG 2.2, kryterium 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html).

Migotanie może wywołać napad także u osoby nieświadomej nadwrażliwości. Znaczenie mają jasność, kontrast, powierzchnia, barwa i indywidualna podatność. Zakres 5–30 Hz jest szczególnie prowokujący; 40 Hz nie jest uniwersalną „bezpieczną granicą”. Tryb wymaga osobnego wyboru w przygotowaniu i naciśnięcia „Rozpocznij z pulsacją”. Krótka informacja o ryzyku towarzyszy ustawieniom; dodatkowy checkbox został usunięty. Tryb nie jest dziedziczony przez kolejne sesje, respektuje ograniczony ruch i nie nakłada się na oddech. Dotknięcie pola natychmiast przywraca przyciski pauzy i wyłączenia. Ostrzeżenie samo w sobie nie zastępuje ograniczeń technicznych. [Epilepsy Foundation](https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity).

Nie wyznaczono biologicznie optymalnej jasności dla Cortex. Przyjęte poziomy są ograniczeniem projektowym, a **nie dawką o dowiedzionej skuteczności**. Zwiększenie ich do wartości laboratoryjnych wymagałoby odrębnego sprzętu, kalibracji, protokołu badania i nadzoru; nie jest zwykłym podniesieniem suwaka CSS.

## Audyt dźwięku

[Orozco Perez, Dumas i Lehmann, 2020](https://www.eneuro.org/content/7/2/ENEURO.0232-19.2020) porównali binauralne i monauralne bodźce 7 i 40 Hz. Oba wywoływały odpowiedzi słuchowe, z różnicami siły odpowiedzi; wynik nie uprawnia do utożsamiania ich działania. Przegląd [Ingendoh i wsp., 2023](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0286023) wykazał niespójność wyników synchronizacji EEG. Dlatego naprawa generatora potwierdza **właściwości sygnału**, nie korzyść zdrowotną aplikacji.

### Zidentyfikowane błędy i naprawy

| Obszar | Przed audytem | Po audycie |
| --- | --- | --- |
| `iso` w Clarity | Stała modulacja 2 Hz niezależna od pary tonów 220/236 Hz. | Jawna modulacja amplitudy 16 Hz przy standardowej intensywności. |
| `pulse` i `hard` | Flagi istniały w katalogu, ale były ignorowane. Problem obecny także przed Porcelaną. | `pulse`: sinusoidalna AM o głębokości 0,5; `iso`/`hard`: głębokość 1. Częstotliwość wynika z efektywnej różnicy L/R. Są to nowe jawne definicje DSP, nie odkryte „oryginalne dawki”. |
| Zmiany etapów | Natychmiastowe skoki częstotliwości i wzmocnienia. | Krótkie przejścia 20 ms częstotliwości, wzmocnienia i głębokości AM. Docelowe pary tonów pozostają zachowane. |
| Koniec po wznowieniu | Przy końcówce krótszej niż sekundę obwiednia mogła mieć zaplanowany wzrost już po końcu sesji. | Czasy wejścia i wyjścia dostosowane do pozostałego czasu, bez zdarzeń poza końcem. |
| Zapas sygnału | Brak jawnego wspólnego współczynnika zapasu. | Wspólne wzmocnienie wyjściowe 0,85; szum ograniczony do [-1,1]. Zapas potwierdzony testem PCM. |
| WAV | Inne poziomy miksu i czasy obwiedni; ignorowanie intensywności i bieżących suwaków. | Wspólna definicja modulacji, szumu i fade; WAV uwzględnia suwaki i intensywność. Mono i wymuszona AM pozostają jawnymi transformacjami eksportu. |
| Stały fragment WAV | Początek i koniec bez wygaszenia, możliwość kliku. | Krótkie wygaszenia również w stałym fragmencie; plik nie jest reklamowany jako bezszwowa pętla. |
| Zegar | Dźwięk był planowany 40 ms po początku licznika. | Początek zegara sesji wyrównany do zaplanowanego startu grafu audio. Nie oznacza kalibracji opóźnienia sprzętowego audio–ekran. |
| Tło | Powtarzana 4-sekundowa próbka szumu. | Pętla 16-sekundowa z zerowanymi końcami; zmniejszona częstotliwość powtórzeń. Nie jest to nieskończony unikalny szum. |

Definicje wszystkich 14 sesji i 5 programów pozostają niezmienione. Zmieniła się interpretacja wcześniej nieobsługiwanych pól i wykonanie DSP. Intensywność niska/wysoka nadal zachowuje wcześniejsze mnożniki rozstawu częstotliwości 0,9/1,1 oraz poziomu 0,6/1,3; interfejs ujawnia efektywne parametry. Nie dodano rzekomo terapeutycznych częstotliwości ani podnoszenia głośności przy wyborze Energii.

### Weryfikacja sygnału

Oprócz testów logiki użyto `OfflineAudioContext` z implementacji node-web-audio-api do renderowania **rzeczywistego grafu AudioEngine**. Analiza próbek 48 kHz sprawdza separację kanałów, amplitudy nośnych i bocznych składowych AM. To dokładniejsze niż samo sprawdzenie, jakie liczby wpisano do `AudioParam`, lecz nadal nie pomiar wyjścia iPhone’a.

- Clarity: nośna 220 Hz, składowe 204/236 Hz, stosunek każdej do nośnej około 0,500; potwierdzona AM 16 Hz.
- Gamma Lift: nośna 260 Hz, składowe 220/300 Hz, stosunek około 0,500; potwierdzona pełna AM 40 Hz.
- Overdrive: nośna 440 Hz, składowe 400/480 Hz, stosunek około 0,167; potwierdzona częściowa AM 40 Hz.
- Test obciążeniowy 39 etapów, maksymalnych suwaków, wysokiej intensywności i białego szumu: najwyższy szczyt około 0,77415, czyli −2,22 dBFS; bez próbek poza zakresem.
- Dodatkowy test porównuje amplitudy nośnej i składowych bocznych między WAV i grafem na żywo, przy tych samych ustawieniach i wyłączonym szumie.

Losowy szum nie daje identycznych próbek między odtworzeniem i eksportem; zgodność dotyczy rodzaju i skali sygnału. Przy pauzie graf jest wygaszany i odtwarzany od tego samego miejsca protokołu; nie zachowujemy dokładnej fazy oscylatora sprzed pauzy. Obwiednia łagodzi ponowne wejście. Głośność cyfrowa nie określa dB SPL: potrzebny byłby pomiar konkretnych słuchawek. Brak cyfrowego przesterowania nie oznacza bezpieczeństwa dowolnej głośności sprzętowej.

## Oddech, noc i iPhone

W rytmach 4–6 i 4–7–8 forma oddechu ma średnicę od 46% do 100%, czyli ponad dwukrotną zmianę rozmiaru. Stały obrys pozwala ocenić ruch bez zapamiętywania poprzedniej klatki. Delikatna strzałka pokazuje kierunek. Napis ma 15 px, odliczanie 12 px; tekst pozostaje ciemny i czytelny. Ograniczony ruch zatrzymuje kształt, zachowując fazę i czas. Rytmy nie zostały zmienione. Instrukcja nadal wymaga komfortowego, niewymuszonego oddechu zgodnie z [NHS](https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/).

Box ma osobną wizualizację: punkt obiega kwadrat, a cztery boki odpowiadają wdechowi, zatrzymaniu, wydechowi i zatrzymaniu. Dźwięk prowadzenia nie korzysta już z krótkich tonów 440/330 Hz. To syntetyczny szum przepływu powietrza, jaśniejszy na wdechu i cieplejszy na wydechu, z ciszą podczas zatrzymań. Działa przez pełne fazy, na zegarze audio wspólnym z animacją; nie jest zapisem czyjegoś oddechu ani dowodem biologicznej skuteczności. Szczegóły odbioru: `breathing-qa.md`.

Tryb nocny przyciemnia **cały interfejs**, nie tylko ilustrację. Czarny ekran używa #000 i po 4 sekundach usuwa podpowiedź. Dotknięcie, Enter/Spacja lub Escape przywraca sterowanie. Dźwięk trwa nadal. Przeglądarka nie blokuje w ten sposób urządzenia i nie ma kontroli nad wszystkimi paskami Safari ani nad fizycznym podświetleniem LCD. Na OLED czerń i podświetlenie LCD mają różne właściwości. Po naturalnym końcu czarna zasłona nie odsłania automatycznie jasnego ekranu.

Safari na iPhonie nie udostępnia ogólnego `navigator.vibrate()` do tworzenia rytmu wibracji; WebKit sprzeciwia się tej specyfikacji. Dodanie witryny do ekranu początkowego nie daje automatycznie Core Haptics. [Specyfikacja W3C](https://w3c.github.io/vibration/), [Apple Core Haptics](https://developer.apple.com/documentation/corehaptics).

Od iOS 18 prawdziwy przełącznik `input type=checkbox switch` może dawać systemowe pojedyncze potwierdzenie dotykiem. Dodano ten atrybut do rzeczywistych przełączników Cortex. Nie ma ukrytych przełączników uruchamianych programowo. To **nie jest haptyczne prowadzenie oddechu**. [WebKit Safari 18](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/).

Na przeglądarkach udostępniających Vibration API pojawia się opcja oddechu dotykiem: jeden krótki impuls dla wdechu, dwa dla wydechu, domyślnie wyłączona. Samo istnienie API nie gwarantuje fizycznego silnika wibracji. Dla dowolnych wzorców na iPhonie potrzebna byłaby aplikacja natywna lub opakowanie z mostem do Core Haptics. Tego mostu nie ma w tej statycznej wersji.

## Granice odbioru i następny etap walidacji

Odbiór naprawy pełnego pola obejmuje także pomiar kolorów pikseli na kolejnych rzeczywistych zrzutach przeglądarki — sama zmiana wartości w DOM nie dowodziłaby odmalowywania obrazu. Szczegóły: `fullscreen-light-qa.md`.

Automatyczne testy i emulacja rozmiarów ekranu są oddzielone od badania fizycznego urządzenia. Brakuje pomiaru fotodiodą, luksomierzem i miernikiem dźwięku oraz odsłuchu na rzeczywistym iPhonie. Nie sprawdzono klinicznej skuteczności ani indywidualnej tolerancji żadnej sekwencji Cortex.

Przed rozważaniem mocniejszego lub klinicznie opisanego bodźca należy: zmierzyć rzeczywisty przebieg światła na docelowych ekranach przy różnych jasnościach i trybach oszczędzania; sprawdzić błędy prezentacji i aliasing; zmierzyć opóźnienie audio–obraz; przeprowadzić niezależną ocenę dostępności błysków; dopiero potem zaprojektować badanie z kontrolą i właściwymi wynikami. Nie zastępujemy tych kroków etykietą „Safe visuals”.

Bieżący podgląd telefonu: http://192.168.1.186:8771/ — ta sama sieć Wi‑Fi co Mac, Mac włączony, serwer uruchomiony. Adres lokalny może zmienić się po zmianie sieci. Publiczna strona GitHub Pages zawiera wcześniejszą wersję do czasu osobnej publikacji zaakceptowanego podglądu. Historia w podglądzie LAN i publicznej witrynie należy do różnych adresów i nie synchronizuje się automatycznie.
