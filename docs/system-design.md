# System design — Kora Cortex

## Tokeny (CSS variables)
- **Paleta bazowa:** `--bg-dark`, `--surface-900/800/700` dla tła i paneli; akcent `--accent-300/400/500/900` oraz semafory `--success-500`, `--warning-500`, `--danger-500`.
- **Typografia:** `--font-sans`, `--font-mono` oraz skala `--text-xs` – `--text-xl` do spójnego ustawiania wielkości w całym UI.
- **Siatka odstępów:** `--space-1` – `--space-8` (bazowy krok 4px) dla paddingów/marginesów.
- **Promienie i cienie:** `--radius-sm/md/lg`, `--shadow-soft`, `--shadow-accent` jako domyślne krzywizny i elevacje.
- **Efekty:** `--cyan-glow`, `--focus-ring` zapewniają subtelne highlighty i focus state w jednym miejscu.

## Primitives / komponenty bazowe
- `.ui-card` — szklany panel z blur i cieniem, przejścia hover spójne z akcentem.
- `.ui-btn` + modyfikatory `.ui-btn--primary`, `.ui-btn--ghost`, `.ui-btn--sm`, `.ui-btn--lg` — standaryzowane CTA z jednolitymi stanami hover/focus.
- `.ui-badge` — kapsułka statusowa z wariantami semaforowymi (`data-variant="success|warning|danger"`).
- `.ui-section-label` — podpisy sekcji w monospaced uppercase.

## Adopcja w interfejsie
- Hero CTA korzysta z `.ui-btn--primary` z jednolitym focusem i mikro-shinem zamiast ad-hoc styli.
- Przyciski nawigacji (Raport/Programy/Statystyki/Bezpieczeństwo) używają `.ui-btn--ghost` dla spójnych stanów hover/focus.
- Statusy w nagłówku mają ujednolicony `.ui-badge`, co zapewnia spójny padding, krój pisma i kolory.

## Następne kroki
- Iteracyjne podmienianie kolejnych przycisków i kart na `.ui-btn` oraz `.ui-card`.
- Dodanie light theme override na tych samych tokenach (`:root[data-theme="light"]`).
- Uzupełnienie wariantów komponentów: pola formularzy, toggle, listy presetów.
