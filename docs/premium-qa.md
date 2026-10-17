# Porcelana — raport kontroli, 18 października 2026

## Wynik

Przebudowa przygotowana do odbioru w lokalnym podglądzie. Brak publikacji na GitHub Pages w tym etapie. Weryfikacja dotyczy lokalnej aplikacji uruchomionej przez HTTP oraz przeglądarki w Codex. Historia lokalnego podglądu zawiera sesje wykonane podczas testów.

## Testy automatyczne

`npm test`: 18/18 testów przechodzi. Zakres:

- Dokładne porównanie wszystkich 14 definicji audio i pięciu programów z bazą `ecddf71`.
- Pięć celów, poprawne domyślne sesje i osobny zbiór Prime / Overdrive / Gamma Lift dla Energii.
- Filtrowanie bez mutacji protokołów, skalowanie etapów programów oraz nieskończony Hypnos.
- Pauza i wznowienie bez doliczania przerwy, ograniczenie czasu do długości sesji.
- Granice i ciągłość wzorców 4–6, Box i 4–7–8.
- Harmonogram wszystkich faz audio z wyprzedzeniem, częstotliwości kanałów, wznowienie w bieżącej fazie i pozostały czas.
- Błąd blokady audio, systemowe zawieszenie kontekstu oraz brak nieskończonych wartości w AudioParam.
- Migracja ustawień/historii, brak dziedziczenia zaawansowanych bodźców, brak pamięci lokalnej i scalanie zmian z innych kart.
- Ograniczenie pulsacji do maksymalnie 2 Hz.
- Nagłówek i próbki WAV; długość pliku, różne kanały stereo, mono, modulacja, wariant stały i wszystkie rodzaje tła; odmowa zbyt dużego renderu.

`npm run check`: składnia modułów oraz lokalne odnośniki sześciu stron poprawne, brak Tailwind CDN. `git diff --check`: bez błędów białych znaków.

## Przepływy sprawdzone w przeglądarce

- Start → ścieżka → przygotowanie → odtwarzacz: wszystkie 14 sesji; prawidłowe czasy, cele i zachowana głośność.
- Przygotowanie pierwszego etapu wszystkich pięciu programów pokazuje jego faktyczną długość.
- Flow 90: pełny pierwszy etap 5 min, automatyczne przejście do przerwy, ręczny start drugiego etapu Prime 10 min, zakończenie i sumaryczny czas 5:34.
- Samodzielny oddech: zakończenie całej minuty, podsumowanie 1:00, pauza i dostępne warianty czasu.
- Wstęp oddechowy: pauza, pominięcie i przejście do właściwej sesji; czas oddechu wliczany do podsumowania.
- Pauza Prime: czas pozostał 4:52 podczas przejścia do biblioteki; powrót i wznowienie z tego samego miejsca.
- Zaawansowana pulsacja: wybór nie zmienia głośności; start bez osobnego potwierdzenia wyświetla komunikat i pozostaje w przygotowaniu.
- Pełny ekran: wejście i powrót do zwykłego układu.
- Ustawienia w trakcie sesji: ograniczenie ruchu i ukrycie formy działają; sterowanie pozostaje dostępne.
- PL/EN: aktywna sesja, podsumowanie, nawigacja i materiały. Zmiana języka nie resetuje zegara.
- Eksport: pobrany WAV 60 s, 2 kanały, 48 000 Hz, PCM 16 bit, 2 880 000 klatek. Anulowanie renderu 45 min odblokowuje panel. Pobrano też SVG, JSON sesji oraz JSON historii.
- Okna: Escape zamyka dialog i przywraca fokus. Brak duplikatów identyfikatorów pól po otwarciu ustawień nad przygotowaniem. Elementy mają dostępne nazwy.
- Brak błędów JavaScript w sprawdzanych przepływach.

## Responsywność i dostępność

70 kombinacji: Start, Biblioteka, przygotowanie Prime, Historia, Wiedza, oba whitepapery, obie instrukcje i strona promocyjna × 320, 390, 430, 768, 1024, 1280 i 1440 px. Brak przewijania poziomego całej strony.

Odtwarzacz i wstęp sprawdzone przy 320×568, 390×844, 430×932, 768×1024, 1024×600, 1280×720, 1440×900, 844×390, 568×320 i 640×400. Wykryte spychanie kontrolek na niskim ekranie naprawiono: dekoracja ustępuje sterowaniu, a układ poziomy ma dwie kolumny. Ponowny pomiar 568×320: wszystkie kontrolki mieszczą się w wysokości 320 px, ostatnia kończy się przy 305 px.

Pomiar kontrastu tekstów na ośmiu powierzchniach wykrył oznaczenie oddechu 4.4:1. Akcent przyciemniono z `#54785f` do `#4c7057`; pozostałe sprawdzone teksty spełniały progi 4.5:1 lub 3:1 dla dużych nagłówków. Ostrzeżenia używają ciemnego tekstu na jasnym tle. Kontrolki i obszary etykiet mają co najmniej 44×44 px; poszerzono także krótkie odnośniki w spisie treści. Ruch można ograniczyć, a forma może zostać całkowicie ukryta.

Geometria 640×400 odpowiada przestrzeni CSS okna 1280×800 przy powiększeniu 200%; to test reflow, nie test natywnego ustawienia zoomu przeglądarki.

## Audyt treści

- Oddzielono instrukcje od wyjaśnienia działania i kontekstu badań.
- Usunięto obietnice poprawy N3, neuroprotekcji, leczenia, gwarantowanej energii i rzekomych pomiarów mózgu.
- Nazwy pięciu ścieżek opisują intencję użycia. Energia i Skupienie są różnymi kategoriami, nie diagnozami użytkownika.
- Instrukcje oddechu podkreślają wygodny, łagodny oddech bez wymuszania głębokości. Wzorce z zatrzymaniem są opcjonalne.
- Whitepaper wyraźnie oddziela wyniki badań nad technikami od dowodów dotyczących Cortex. Linki prowadzą do oryginalnych publikacji, NHS oraz W3C.
- Zweryfikowano: Ingendoh i in., PLOS ONE 2023 (10.1371/journal.pone.0286023); Fincham i in., Scientific Reports 2023 (s41598-022-27247-y); Fincham, Strauss i Cavanagh, Scientific Reports 2023 (s41598-023-49279-8); zalecenia NHS i kryterium błysków WCAG 2.2.
- Strona promocyjna przedstawia pięć ścieżek i faktyczne wejście do aplikacji, bez zakupu i pozornego okresu próbnego.

## Granice tej weryfikacji

To emulacja rozmiarów, nie test fizycznego telefonu. Nie wykonano odsłuchu na docelowych słuchawkach, testu hardware'owych klawiszy multimedialnych ani macierzy Safari iOS / Chrome Android. Blokadę i przerwanie AudioContext sprawdzono w testach kontrolowanych; zachowanie systemu mobilnego wymaga urządzenia. Arkusz wydruku został przygotowany, lecz nie przeprowadzono fizycznego wydruku. Nie jest to certyfikacja WCAG ani ocena medyczna.

Publikacja następuje po odbiorze podglądu jako jeden zestaw zmian. Powrót: odwrócenie commitu przebudowy. Oryginalne klucze danych użytkownika pozostają zachowane.
