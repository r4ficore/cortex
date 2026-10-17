# Odbiór światła, audio, oddechu i trybu nocnego

18 października 2026. Zmiany po wersji Porcelana `78e2d73`. Odbiór lokalnego podglądu przed publikacją.

## Automatyczna weryfikacja

- `npm test`: 27 testów. Zegar, pauza, oddech, migracja danych, programy, eksport, oryginalne definicje wszystkich 14 sesji i 5 programów.
- Testy grafu `AudioEngine` w `OfflineAudioContext`: separacja stereo, częstotliwości nośne, składowe boczne AM, końcówka krótsza niż sekunda, zgodność amplitud WAV i odtwarzacza przy tych samych ustawieniach.
- Próbki PCM 39 etapów przy maksymalnych suwakach, wysokiej intensywności i białym szumie: szczyt około 0,77415 / −2,22 dBFS, bez cyfrowego przesterowania. Polecenie odtwarzające audyt: `node scripts/audit-audio.mjs /tmp/cortex-audio-audit.json`.
- Renderer światła: całka rampy częstotliwości, blokada 40 Hz przy 60 klatkach/s, dopuszczenie przy symulowanych 120 klatkach/s, wykrywanie przerw, minimalne okno pomiaru, liniowa luminancja po kwantyzacji 8-bitowej.
- Sprawdzenie identyfikatorów historii w HTTP bez `crypto.randomUUID`, obsługi ograniczonego ruchu i zakresu skalowania oddechu.
- `npm run check`: składnia modułów i lokalne zasoby stron. `git diff --check`: brak błędów białych znaków.

## Odbiór w przeglądarce

Codex In-app Browser, lokalny podgląd HTTP/LAN. To test przeglądarki przy różnych wymiarach, nie test fizycznego iPhone’a.

| Obszar | Wynik |
| --- | --- |
| Oddech | Wyraźny zakres średnicy 46–100%, stała granica, kierunek strzałką. Podpis 15 px i odliczanie 12 px. Forma pozostaje kołem także w poziomie. |
| Ograniczony ruch | Stała skala 0,82 potwierdzona w różnych fazach; tekst zmienia się z Wdech na Wydech. |
| Prime | Po wymaganej zgodzie i pomiarze klatek uruchomiona pulsacja 8 Hz, później 14 Hz; diagnostyka około 60 klatek/s. |
| Overdrive | Przy około 60 klatkach/s blokada całego protokołu zawierającego etap 40 Hz; komunikat o zbyt wolnym odświeżaniu. |
| Wyłączenie światła | Osobny przycisk usuwa pulsację. Pełny ekran nie rozszerza pola światła poza ograniczenia. |
| Tryb nocny | Ciemne tło całego odtwarzacza, łagodna forma, kontrastowe sterowanie. Nocne tło zachowane na zakończeniu. |
| Czarny ekran | Warstwa #000 na cały obszar strony, po 4 s niewidoczna podpowiedź; dotknięcie przywraca sterowanie. Escape sprawdzony w EN, fokus wraca do wyboru obrazu. |
| Tłumaczenia | Przełączenie PL/EN, nowe opcje obrazu i komunikaty odtwarzacza. Instrukcje i whitepaper PL/EN otwierają się bez poziomego przewijania strony przy 320 px. |
| LAN | Aplikacja dostępna pod lokalnym adresem Maca; zapis zakończenia sesji działa w HTTP. Nie sprawdzono połączenia z osobnego fizycznego telefonu. |
| Konsola | Bez błędów i ostrzeżeń w końcowych scenariuszach. |

## Wymiary

Sprawdzono oddech, nocny odtwarzacz i zaawansowane światło przy: 320×568, 390×844, 430×932, 768×1024, 1024×768, 1280×720, 1440×900, 568×320 i 640×400 CSS px. Ostatni rozmiar sprawdza również układ odpowiadający reflow przy dwukrotnym powiększeniu okna 1280×800; nie jest testem rzeczywistego zoomu Safari.

Kontrolki mieszczą się w wysokości ekranu. Brak poziomego przewijania całej strony. W czasie odbioru poprawiono wypychanie sterowania przez komunikat światła na telefonie w poziomie oraz wychodzenie obracającej się dekoracji poza szerokość odtwarzacza. Poprawione stany sprawdzono ponownie. Długie ekrany przygotowania i dokumenty przewijają się normalnie.

Zrzuty odbiorowe: oddech i nocny odtwarzacz, 390×844. Nie są zrzutami fizycznego telefonu.

## Granice weryfikacji

Nie przeprowadzono odsłuchu i testów haptyki na fizycznym iPhonie, pomiaru matrycy fotodiodą, pomiaru lux/dB SPL, niezależnego testu PEAT/Harding ani walidacji klinicznej. Przypadek 120 klatek/s jest sprawdzony testem algorytmu; rzeczywisty podgląd działał przy około 60 klatkach/s. Vibration API nie daje rytmu wibracji w Safari na iPhonie; natywny atrybut przełącznika nie zastępuje Core Haptics.

Parametry światła są ograniczeniami inżynierskimi, nie zweryfikowaną dawką. Szczegóły i źródła: [raport badań](light-audio-research.md). Publiczna wersja GitHub Pages nie została zmieniona w ramach tego odbioru.
