# Mobilny odtwarzacz — poprawka po zgłoszeniu z iPhone’a

18 października 2026, po `f9fbac9`.

Użytkownik zgłosił działający licznik i nieruchome koło w osobnej ścieżce Oddech. Zdjęcia pokazują także sesje Genesis, Restoration i Deep Focus oraz komunikat o niedostępnym pełnym ekranie. Nie przedstawiają samego ćwiczenia oddechowego ani ruchu w czasie. Zatrzymania koła nie odtworzono w lokalnej przeglądarce; konkretna przyczyna na fizycznym iPhonie pozostaje niepotwierdzona.

## Zmiany

- Koło oddechu jest teraz elementem HTML z gradientem CSS. Transformacja skali jest wpisywana bezpośrednio w element, bez dziedziczonej zmiennej CSS animującej SVG.
- Wymiary koła wynikają z rzeczywistego prostokąta sceny. ResizeObserver oraz zdarzenia zmiany okna dopasowują je po obrocie i zmianie dostępnej wysokości. Usunięto zależność od cqw/cqh i `container-type: size`.
- Ograniczenie ruchu przez system, preferencję Cortex i tryb samego dźwięku ma widoczny komunikat. Ustawienie systemowe nie jest obchodzone. Tekst fazy i odliczanie pozostają dostępne.
- Spokojne wizualizacje mają zauważalniejszy ruch: cykle 16 s (Skupienie), 12 s (Wyciszenie), 24 s (Sen), 9 s (Energia), z niezależną deformacją wewnętrznej warstwy. Pauza zachowuje położenie zamiast zerować obrót. Te cykle nie są stymulacją częstotliwościową i nie zmieniają audio.
- „Rozwiń widok” korzysta z natywnego pełnego ekranu, a przy braku obsługi lub odmowie rozszerza odtwarzacz wewnątrz strony. „Zwiń widok” i Escape przywracają nagłówek. Nie obiecuje ukrycia pasków Safari.
- Częstotliwości, kontrast i ograniczenia eksperymentalnego światła pozostają bez zmian. Dekoracja w tym trybie jest nieruchoma.

## Weryfikacja

- 30 testów automatycznych: dotychczasowy audyt audio oraz nowe przypadki bezpośredniej skali, dopasowania do sceny, zachowania położenia przy pauzie i braku/odmowy API pełnego ekranu.
- Przy 390×660 odczyt rzeczywistych prostokątów koła podczas biegnącego czasu: około 155,2 px przy skali 0,588 i 262,3 px przy skali 0,994. To próbki ruchu, nie pomiar dokładnego minimum i maksimum.
- Włączenie preferencji Ogranicz ruch wyświetla komunikat i statyczną skalę 0,82; wyłączenie przywraca animację.
- Fixture `tests/fixtures/embedded-player.html` blokuje natywne fullscreen przez Permissions Policy. W nim przycisk faktycznie włącza rozszerzenie strony, ukrywa nagłówek i zachowuje sterowanie; zwinięcie działa.
- Rozszerzony odtwarzacz: 320×568, 390×660, 430×740, 568×320, 844×390 i 1280×720. Bez przewijania poziomego; sterowanie w wysokości widoku.
- Genesis 10 Hz przy około 60 klatkach/s: odczytane kolejne kolory pola RGB 123, 122, 115, 114, 120, 123 (neutralne kanały R=G=B). Potwierdza zmianę stylu w przeglądarce, nie pomiar fizycznej matrycy. Wyłączenie pulsacji działa.
- Zrzut nowego oddechu zapisany w plikach odbiorowych. Brak testu fizycznego iPhone’a. Użytkownik powinien odświeżyć podgląd, a ewentualny komunikat o ograniczeniu ruchu pozwoli rozróżnić preferencję od problemu renderowania.

Poprawka jest lokalna, bez publikacji GitHub Pages. Poprzednie raporty opisują stan swoich wersji.
