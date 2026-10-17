# System design — Kora Cortex · Porcelana

## Kierunek wizualny
- Porcelanowe tło `#f7f8f7`, białe powierzchnie, grafitowy tekst `#202b28` i zielony akcent `#386d5b`.
- Tokeny `canvas`, `paper`, `soft`, `line`, `ink`, `muted` są dostępne zarówno w CSS, jak i konfiguracji Tailwind w `index.html`.
- Nowy ekran wejścia oferuje trzy istniejące sesje: Deep Focus, Equilibrium i Hypnos. Przycisk przygotowuje wybraną sesję; odtwarzanie uruchamia się osobno w panelu.
- Lokalne pliki `assets/images/cortex-mark.svg` i `cortex-contours.svg` tworzą motyw mózgu. Elementy dekoracyjne nie animują się.
- Jasny panel pozostaje czytelny podczas konfiguracji. Uruchomiona wizualizacja zachowuje ciemne tło i dotychczasowe reguły bezpieczeństwa.
- Ekran wejścia, nowe etykiety i przyciski sesji mają wersje PL i EN. Przyciski start/koniec pozostają widoczne poza pełnym ekranem.

## Tokeny (CSS variables)
- **Paleta bazowa:** `--bg-dark`, `--surface-900/800/700` dla tła i paneli; akcent `--accent-300/400/500/900` oraz semafory `--success-500`, `--warning-500`, `--danger-500`.
- **Typografia:** `--font-sans`, `--font-mono` oraz skala `--text-xs` – `--text-xl` do spójnego ustawiania wielkości w całym UI.
- **Siatka odstępów:** `--space-1` – `--space-8` (bazowy krok 4px) dla paddingów/marginesów.
- **Promienie i cienie:** `--radius-sm/md/lg`, `--shadow-soft`, `--shadow-accent` jako domyślne krzywizny i elevacje.
- **Efekty:** `--cyan-glow`, `--focus-ring` zapewniają subtelne highlighty i focus state w jednym miejscu.

## Primitives / komponenty bazowe
- `.ui-card` — biała powierzchnia z delikatnym obramowaniem i cieniem.
- `.ui-btn` + modyfikatory `.ui-btn--primary`, `.ui-btn--ghost`, `.ui-btn--sm`, `.ui-btn--lg` — standaryzowane CTA z jednolitymi stanami hover/focus.
- `.ui-badge` — kapsułka statusowa z wariantami semaforowymi (`data-variant="success|warning|danger"`).
- `.ui-section-label` — czytelne etykiety sans-serif bez wersalików.

## Adopcja w interfejsie
- Główne przyciski korzystają z `.ui-btn--primary`, jednolitej zieleni i widocznego obrysu fokusu.
- Przyciski nawigacji (Raport/Programy/Statystyki/Bezpieczeństwo) używają `.ui-btn--ghost` dla spójnych stanów hover/focus.
- Statusy w nagłówku mają ujednolicony `.ui-badge`, co zapewnia spójny padding, krój pisma i kolory.

## Następne kroki
- Iteracyjne podmienianie kolejnych przycisków i kart na `.ui-btn` oraz `.ui-card`.
- Osobne strony `landing.html` i whitepaper pozostają niezależne od motywu aplikacji.
- Uzupełnienie wariantów komponentów: pola formularzy, toggle, listy presetów.
