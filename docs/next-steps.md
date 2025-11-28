# Plan modernizacji UI/UX — status i kolejne kroki

## Dotychczas zrealizowane etapy
- **Audyt bazowy**: inwentaryzacja ekranów startowych, kalibracji i głównego interfejsu oraz identyfikacja braków w stylach i wzorcach.
- **System design**: zdefiniowane tokeny (kolory, typografia, spacing, radii, cienie) i prymitywy (`ui-btn`, `ui-card`, `ui-badge`, stany focus/hover/disabled) jako wspólne źródło prawdy.
- **Użyteczność pierwszego wejścia**: doprecyzowane CTA („Inicjuj sesję” + tryb demo), sekcja „Jak to działa”, widoczny wymóg słuchawek i rozszerzony overlay kalibracji.
- **Architektura głównego interfejsu**: uporządkowany layout dashboardu z quick-actions, kartą parametrów sesji i responsywnym stackingiem bez kolizji elementów.
- **Personalizacja / rekomendacje startu**: panel rekomendacji na podstawie onboarding/circadian, chipy preferencji, akcje podglądu i szybkiego zastosowania.

## Kolejny rekomendowany krok (Etap 6 z planu)
**Dostępność i ergonomia** – zaadresować WCAG, fokusy, klawiaturę i redukcję ruchu.

**Cele:**
1. **Kontrast i czytelność:** przegląd kolorów paneli glass i CTA pod kątem WCAG AA; korekty tokenów, jeśli tekst < 4.5:1.
2. **Stany focus/klawiatura:** pełna obsługa klawiaturą dla przycisków, kart i przełączników; widoczny ring focus zgodny z tokenami.
3. **Preferencje ruchu:** respektowanie `prefers-reduced-motion`, throttling animacji glitch/puls, możliwość wyłączenia animacji w ustawieniach.
4. **Ujednolicone scrollbary/paddingi:** poprawa ergonomii list na desktop/mobile, spójne spacingi.
5. **Walidacja:** szybki audyt dostępności (axe/lighthouse) na ekranach landing i dashboard oraz checklisty regresji.

## Co pozostaje po tym kroku
- **Warstwa wizualna premium (Etap 7):** subtelne gradienty/film grain, neonowe kontury CTA, spójny set ikon, mikro-charty w kartach statystyk, fluid typography.
- **Walidacja i iteracja ciągła (Etap 8):** testy użyteczności (mobile/desktop), NPS/feedback inline, krótkie release notes na ekranie startowym.

## Sugerowana kolejność realizacji
1. Dostępność i ergonomia (Etap 6) — kluczowe dla jakości podstawowej.
2. Warstwa wizualna premium (Etap 7) — podniesienie percepcji marki po zabezpieczeniu dostępności.
3. Walidacja ciągła (Etap 8) — rytuał iteracji po wdrożeniu zmian.

## Artefakty do przygotowania w następnym sprincie
- Lista komponentów wymagających focus states/ARIA (CTA, karty presetów, przełączniki trybów, listy programów).
- Tabela kontrastów dla tokenów akcentu i paneli glass (tekst główny/podtytuł/badge).
- Profil animacji: czasy/krzywe + wariant redukcji ruchu.
- Checklista regresji dostępności (desktop/mobile, ekran startowy + dashboard).
