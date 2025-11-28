# Audyt bazowy UI/UX — Kora Cortex

## Mapa ekranów i kluczowych interakcji
- **Landing / brama dostępu** — pełnoekranowa sekcja z hero, trzema kartami wartości, CTA „Inicjuj System” i statusem łączności; nakładka siatki tła i animacja glitch budują klimat high-tech.【F:index.html†L1-L172】
- **Overlay kalibracji** — modal pełnoekranowy z paskiem postępu i copy „System Check”, wyświetlany w toku przejścia do aplikacji właściwej.【F:index.html†L175-L188】
- **Główny interfejs** — layout 3/9 kolumn (programy, moduły stanu, wizualizer) z nagłówkiem nawigacyjnym (Raport/Programy/Statystyki/Bezpieczeństwo, statusy) oraz stopką z komunikatem bezpieczeństwa.【F:index.html†L189-L240】【F:index.html†L320-L341】
- **Panele funkcjonalne**
  - **Lista protokołów** w lewym panelu (szklane karty, scroll), osobny selector czasu dla Hypnos (ukryty domyślnie).【F:index.html†L241-L287】
  - **Wizualizer** z overlayem kroków programu, progress barem i przyciskiem pełnego ekranu; wykorzystuje stany hover do ujawniania kontroli.【F:index.html†L288-L366】
  - **Modale i ustawienia**: konfiguracja (asystent oddechu, kolor szumu), raport (treści edukacyjne), programy (kafle presetów), statystyki (tabele sesji), bezpieczeństwo (zasady i ostrzeżenia).【F:index.html†L367-L583】

## Inwentaryzacja stylów i wzorców
- **Tokeny Tailwind (inline config)**: akcent „medical” (cyjan 400/500/900), dodatkowe odcienie „zinc 850/925”, siatka tła `grid-pattern` oraz custom animacje (breath-grid, fade-in-up, glitch, pulse-slow). Brak szerszej skali semantycznej dla spacingu, promieni, cieni i typografii.【F:index.html†L26-L76】
- **Motyw wizualny**: dominują panele typu glass (ciemne tło + blur + border), neonowe akcenty cyjan, font Inter i JetBrains Mono, animacje ping/glitch na znacznikach statusu i CTA.【F:index.html†L103-L172】
- **Układ**: wiele elementów z `fixed` i efektami opacity/transition sterowanych klasami; layout główny w gridzie 12 kolumn z obszernymi odstępami. Nie ma jawnej definicji breakpointów ani komponentów atomowych poza klasami Tailwind.【F:index.html†L189-L366】
- **Wzorce interakcji**: CTA z mikro-animacjami (hover scale/shine), panele z hover state (zmiana obramowania/koloru ikony), modale full-screen. Brak spójnych stanów focus/active i wariantów `disabled` w przyciskach nagłówka i kartach.【F:index.html†L189-L240】【F:index.html†L367-L454】

## Tokeny i luki systemu designu
- **Kolory**: dostępne tylko trzy odcienie akcentu i dwa odcienie tła; brakuje skali neutrali i stanów semaforowych (success/warning/error) potrzebnych dla alertów bezpieczeństwa i statusów połączenia.【F:index.html†L35-L76】
- **Typografia**: brak modular scale i aliasów semantycznych (np. `heading-lg`, `body-sm`); wielkości są ad-hoc w klasach (10px, 12px, 14px itd.), co utrudnia spójność między kartami, tabelami i modalami.【F:index.html†L103-L172】【F:index.html†L367-L583】
- **Spacing i promienie**: stosowane niestandardowe wartości (`rounded-2xl`, `rounded-sm`, `px-12`) bez wspólnej siatki (8/12px). Glass-panele i karty presetów nie mają jednolitego paddingu i obramowań across sekcje.【F:index.html†L103-L172】【F:index.html†L241-L341】
- **Komponenty**: brak wyodrębnionej biblioteki (np. button, badge, card). Stany statusu (Standby, Brak aktywnego programu) są zakodowane w nagłówku jako tekst + kropka bez definicji wariantów; utrudnia to późniejszą rozbudowę (np. offline/error).【F:index.html†L189-L240】

## Spostrzeżenia użyteczności (pierwsze wejście)
- Komunikat „Wymagane słuchawki stereo” jest mały i mniej widoczny; brak trybu demo lub wyjaśnienia konsekwencji pominięcia audio.【F:index.html†L154-L172】
- CTA „Inicjuj System” nie informuje, co wydarzy się po kliknięciu (brak krótkiego subcopy lub sekundaryjnego CTA z demo).【F:index.html†L154-L172】
- Overlay kalibracji nie posiada wskaźnika czasu ani opisu kroków; copy jest techniczne („System Check”), co może wprowadzać niepewność dla nowych użytkowników.【F:index.html†L175-L188】

## Obszary do standaryzacji w kolejnych etapach
- **Biblioteka tokenów**: przenieść kolory/spacing/typografię do jednej konfiguracji (Tailwind theme + CSS variables) z nazwami semantycznymi.
- **Komponenty bazowe**: zdefiniować button, card, badge/status oraz warianty focus/disabled dla dostępności.
- **Animacje**: ujednolicić timing/easing i wprowadzić tryb „reduce motion” zgodny z prefers-reduced-motion.
- **Onboarding**: dodać mikrotekst „Jak to działa” pod CTA oraz nieinwazyjne CTA demo/tryb silent.
