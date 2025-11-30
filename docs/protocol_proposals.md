# Propozycje nowych protokołów (do wdrożenia później)

Poniższe protokoły są koncepcyjne – opisują cele, przebieg i wymagane sygnały, ale **nie są jeszcze zaimplementowane w aplikacji**. Mają być „pełnym doświadczeniem”, a nie jedynie nazwą.

## 1. Aurora Reset – głęboki reset dobowy
- **Cel:** szybkie przesunięcie zegara biologicznego po zmianie strefy czasowej lub pracy zmianowej.
- **Fazy:**
  - *Prime (5 min):* delikatne tony delta–theta (1.5–5 Hz) z ciepłym różowym szumem, przygaszone tło wizualne.
  - *Anchor (10–15 min):* stopniowy wzrost do 7–9 Hz, dodane modulacje gamma 40 Hz w tle (niską głośnością) dla czuwania bez niepokoju.
  - *Stabilize (10 min):* zejście do 5–6 Hz, wygaszanie gamma, wizualny gradient naśladujący świt.
- **Dodatki:** cykliczne przypomnienia oddechowe (4–6 s wdech/wydech), powolne wygaszanie głośności końcowej.

## 2. Cortex Forge – hiper-fokus kognitywny
- **Cel:** mocna sesja pracy poznawczej (np. kodowanie, analiza), bez efektu „przepalenia”.
- **Fazy:**
  - *Ignite (3–5 min):* rytm 12–14 Hz, jasne tło beta, lekki biały szum dla maskowania otoczenia.
  - *Drive (20–30 min):* 16–18 Hz z delikatną modulacją 40 Hz co 8–10 s; wizualizacja z wyraźnym ruchem w jednym kierunku (flow).
  - *Cool (5–7 min):* zejście do 10–12 Hz, wygaszanie szumu, ciemniejsze tło, aby zapobiec rebound stresowemu.
- **Dodatki:** mikro-przerwy co 8–10 min (krótki spadek do 8 Hz na 10–15 s) sygnalizowane subtelną zmianą koloru fali.

## 3. Parasym Pathway – szybka regeneracja po stresie
- **Cel:** zejście z pobudzenia sympatycznego do stanu parasympatycznego (reset nerwu błędnego).
- **Fazy:**
  - *Release (5 min):* tony 6–7 Hz z ciepłym szumem brązowym, niska głośność, wygaszające pulsowanie wizualne.
  - *Deep Sink (10–12 min):* zejście do 3–4 Hz, dodanie delikatnych infratonów <1 Hz w wibracji dudnienia (jeśli sprzęt pozwala).
  - *Rebalance (5–7 min):* łagodne podniesienie do 7–8 Hz, by uniknąć ospałości po sesji.
- **Dodatki:** prowadzone tempo oddechu 4–7–8 (wdech–pauza–wydech), wizualne zwężanie/rozszerzanie fali zsynchronizowane z oddechem.

## 4. REM Sculpt – trening śnienia i konsolidacji pamięci
- **Cel:** wsparcie hipnagogii i konsolidacji pamięci (np. po nauce języka lub gry na instrumencie).
- **Fazy:**
  - *Hypnagogic Gate (7–10 min):* naprzemienne bloki 6–8 Hz i 3–4 Hz, łagodny różowy szum, ciche dzwonki alfa co 90 s.
  - *REM Drift (15–20 min):* stabilizacja na 4–6 Hz z mikropikami 10 Hz co 30–40 s, zmienne nasycenie kolorów w wizualizacji.
  - *Wake Buffer (5 min):* podniesienie do 8–10 Hz, wygaszanie szumu, przywrócenie neutralnej jasności ekranu.
- **Dodatki:** opcjonalne „marker tones” co 5 min do notowania snów/kontekstu; stopniowe przyciemnianie UI, by nie wybudzić użytkownika nagłą zmianą.

## 5. Gamma Lift – szybkie pobudzenie i czujność
- **Cel:** krótkie, intensywne podniesienie czujności przed wystąpieniem/public speaking.
- **Fazy:**
  - *Ramp (2–3 min):* start 12–14 Hz, szybki wzrost do 18–20 Hz, biały szum na stałym poziomie.
  - *Peak (5–8 min):* 35–40 Hz (niski wolumen), miksowane z 16–18 Hz jako kotwica; wyraźny ruch wizualny (wysoki kontrast).
  - *Landing (3–5 min):* zejście do 12 Hz, redukcja szumu, wygładzanie fali.
- **Dodatki:** krótkie cue oddechowe 2–2–4 (szybkie pobudzenie), mikrofade głośności przed końcem, by uniknąć „roztrzęsienia”.

## 6. Deep Delta Restore – głęboka regeneracja nocna
- **Cel:** przyspieszenie zasypiania i pogłębienie snu wolnofalowego.
- **Fazy:**
  - *Descent (10 min):* liniowe zejście 8 → 4 Hz, różowy szum, ciemne, statyczne tło.
  - *Depth Hold (25–40 min):* stabilne 1–3 Hz, bardzo ciche modulacje 0.5–1 Hz; wizualizacja prawie bez ruchu.
  - *Gentle Rise (5 min):* powolne podniesienie do 6–7 Hz, minimalny szum, delikatne rozjaśnienie ekranu.
- **Dodatki:** długie wyciszanie końcowe (2–3 min), opcjonalne odtwarzanie binaural pods w paśmie delta, brak ostrych kolorów.

---
**Uwagi wdrożeniowe:**
- Każdy protokół wymaga mapy parametrów (docelowe Hz, głośności, typ szumu, długości faz) i sekwencji wizualizacji. Wdrożenie powinno wykorzystywać istniejący mechanizm faz i kontrolerów głośności, bez duplikowania UI.
- Zalecane jest przygotowanie presetów audio (fal binauralnych/isochronicznych) oraz zestawu palet kolorystycznych pod każdą fazę, aby wrażenie było spójne multisensorycznie.
