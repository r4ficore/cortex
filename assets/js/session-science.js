import { patterns, cycleDuration } from "./breath.js";
import { esc } from "./i18n.js";
import { reviewHTML } from "./protocol-review.js";

const pair = (pl, en) => ({ pl, en });
// Findings describe the cited experiment. Session choices below are explicitly
// design interpretations, never evidence that a neighbouring frequency is a dose.
export const studies = {
  auditory: {
    label: "Orozco Perez · 2020",
    url: "https://www.eneuro.org/content/7/2/ENEURO.0232-19.2020",
    text: pair(
      "EEG wykazało odpowiedź układu słuchowego zsynchronizowaną z rytmem bodźca. Była słabsza dla dudnień binauralnych niż monauralnych; w tym eksperymencie nie towarzyszyła jej zmiana nastroju. Reakcja mózgu na rytm i poprawa samopoczucia to dwa osobne wyniki.",
      "EEG showed auditory-system activity timed to the stimulus rhythm. It was weaker for binaural than monaural beats, with no mood change in this experiment. A brain response to rhythm and a wellbeing benefit are two separate outcomes.",
    ),
  },
  memory: {
    label: "Beauchene · 2016",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0166630",
    text: pair(
      "28 osób wykonywało zadanie pamięci wzrokowo-przestrzennej w sześciu warunkach, m.in. przy muzyce Vivaldiego i dudnieniach 15 Hz. W ciągu 5 minut trafność rosła przy 15 Hz, a spadała w pozostałych warunkach. EEG pokazało też różnice w łączności sieci korowych. To wynik konkretnego zadania, nie pomiar ogólnej produktywności.",
      "28 adults performed a visuospatial working-memory task under six conditions, including Vivaldi and 15 Hz beats. Accuracy rose over five minutes with 15 Hz and fell in the other conditions. EEG also showed differences in cortical network connectivity. This measured a specific task, not overall productivity.",
    ),
  },
  vigilance: {
    label: "Lane · 1998",
    url: "https://pubmed.ncbi.nlm.nih.gov/9423966/",
    text: pair(
      "W 30-minutowym zadaniu czujności u 29 osób rytmy 16/24 Hz wiązały się z większą liczbą poprawnych wykryć i mniejszą liczbą fałszywych alarmów niż 1,5/4 Hz. Porównaniem były wolniejsze rytmy, nie zwykła muzyka.",
      "In a 30-minute vigilance task with 29 adults, 16/24 Hz beats were associated with more correct detections and fewer false alarms than 1.5/4 Hz beats. The comparison was slower beats, not ordinary music.",
    ),
  },
  attentionNull: {
    label: "Robison · 2022",
    url: "https://pubmed.ncbi.nlm.nih.gov/33978805/",
    text: pair(
      "Trzy eksperymenty z rytmem 16 Hz nie wykazały poprawy podtrzymywania uwagi. Wyniki badań pasma beta są zatem mieszane; sama liczba Hz nie przesądza o efekcie.",
      "Three experiments with 16 Hz beats found no improvement in sustained attention. Beta-beat results are therefore mixed; the frequency alone does not determine the outcome.",
    ),
  },
  homeReasoning: {
    label: "Klichowski · 2023",
    url: "https://www.nature.com/articles/s41598-023-38313-4",
    text: pair("W dwóch eksperymentach domowych zrekrutowano łącznie 1000 osób. Dudnienia 5 i 15 Hz pogarszały wyniki zadań rozumowania względem warunków kontrolnych. To inne zadanie niż test pamięci Beauchene; pozytywnego wyniku pamięciowego nie można uogólniać na całą pracę umysłową. Jeśli tony Ci przeszkadzają, wybierz samo tło lub ciszę.", "Two home experiments recruited 1,000 people in total. 5 and 15 Hz beats worsened reasoning-task scores relative to controls. This differs from Beauchene’s memory task; its positive memory finding cannot be generalised to all mental work. If the tones distract you, choose background alone or silence."),
  },
  alpha: {
    label: "Solcà · 2016",
    url: "https://doi.org/10.1016/j.heares.2015.09.011",
    text: pair(
      "Przy dudnieniach 10 Hz i 4 Hz wzrosła spójność aktywności między korami słuchowymi w paśmie alfa — miara zgodności ich rytmów. Nie wykazano odpowiadającej temu poprawy zachowania. Mózg może reagować na bodziec w innym paśmie niż jego częstotliwość; 10 Hz nie jest prostym przełącznikiem w „stan alfa”.",
      "Both 10 Hz and 4 Hz beats increased alpha-band coherence between auditory cortices, a measure of how their rhythms relate. No corresponding behavioural improvement was demonstrated. Brain responses can occur in a different band from the stimulus; 10 Hz is not a simple switch into an “alpha state”.",
    ),
  },
  creativity: {
    label: "Reedijk · 2013",
    url: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2013.00786/full",
    text: pair(
      "Badano 10 i 40 Hz podczas zadań twórczych. Wynik generowania wielu pomysłów zależał od grupy uczestników: część poprawiała się, część nie lub wypadała gorzej. Nie wykazano poprawy znajdowania jednej poprawnej odpowiedzi. Badanie nie testowało 6 Hz jako „częstotliwości kreatywności”.",
      "10 and 40 Hz beats were tested in creativity tasks. Generating multiple ideas improved for some participants but not for others, whose performance could worsen. Finding a single correct answer did not improve. The study did not test 6 Hz as a “creativity frequency”.",
    ),
  },
  relaxation: {
    label: "Mallik i Russo · 2022",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0259312",
    text: pair(
      "163 osoby przyjmujące leki przeciwlękowe słuchały przez 24 minuty muzyki, rytmów theta, ich połączenia albo różowego szumu. W podgrupie o umiarkowanym lęku jako cesze połączenie muzyki i rytmów silniej zmniejszało poznawczy komponent lęku niż sama muzyka. Dotyczyło to zgłaszanych myśli i obaw; nie mierzono EEG ani kortyzolu.",
      "163 people taking anxiolytic medication listened for 24 minutes to music, theta beats, both, or pink noise. In the moderate trait-anxiety subgroup, music plus beats reduced cognitive state anxiety more than music alone. This concerned reported thoughts and worries; EEG and cortisol were not measured.",
    ),
  },
  autonomic: {
    label: "McConnell · 2014",
    url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2014.01248/full",
    text: pair(
      "U 21 osób po wysiłku porównano 20 minut dudnień zmieniających się w zakresie 5,5–8,5 Hz z tonami kontrolnymi. Zmiany wybranych wskaźników zmienności rytmu serca (HRV) były zgodne z większym udziałem regulacji przywspółczulnej. To wstępna obserwacja po ćwiczeniach, a nie dowód, że stałe 3 Hz aktywuje nerw błędny.",
      "In 21 adults after exercise, 20 minutes of beats varying between 5.5 and 8.5 Hz were compared with control tones. Changes in selected heart-rate variability (HRV) indices were consistent with greater parasympathetic regulation. This is preliminary post-exercise evidence, not proof that a fixed 3 Hz activates the vagus nerve.",
    ),
  },
  sleep: {
    label: "Lee · 2024",
    url: "https://academic.oup.com/sleep/article/47/10/zsae097/7647043",
    text: pair(
      "W pilotażu z 10 osobami dynamiczne dudnienia 0–3 Hz skróciły średni czas zasypiania z 12,5 do 6,1 minuty względem ciszy. Zmieniły się też wskaźniki HRV, ale nie wykazano istotnego wzrostu mocy delta w EEG. Bodziec podawano w określonych momentach ocenianych polisomnografią; nie był to test stałego 1 Hz ani porównanie z muzyką.",
      "In a ten-person pilot, dynamic 0–3 Hz beats shortened average sleep-onset time from 12.5 to 6.1 minutes versus silence. HRV indices also changed, but delta EEG power did not significantly increase. Stimulation was delivered at selected polysomnography-assessed stages; this was neither a fixed 1 Hz test nor a comparison with music.",
    ),
  },
  gamma: {
    label: "Melnichuk · 2025",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11799511/",
    text: pair(
      "Badanie rozpoczęto z 80 uczestnikami, porównując dudnienia z tonem kontrolnym. Wybrane ustawienia — 40 Hz z nośną 340 Hz oraz dodanie białego szumu — sprzyjały lepszemu ogólnemu wynikowi uwagi. Nie uzyskano przekonującego ograniczenia spadku czujności z czasem. EEG potwierdziło odpowiedź na rytm; jej siła nie odzwierciedlała wprost poprawy wyniku.",
      "The study enrolled 80 participants and compared beats with a control tone. Selected settings — 40 Hz with a 340 Hz carrier, and adding white noise — favoured overall attention performance. Evidence for preventing vigilance decline over time was weak. EEG confirmed a response to rhythm; its strength did not directly track performance gains.",
    ),
  },
  gammaNull: {
    label: "Leistik · 2023",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10157589/",
    text: pair(
      "W innym badaniu 58 osób dudnienia 40 Hz nie poprawiły czasu reakcji, liczby błędów ani samooceny lęku względem tonu kontrolnego. 40 Hz jest badaną metodą wpływania na uwagę, a nie potwierdzonym odpowiednikiem dawki energii.",
      "In another study of 58 adults, 40 Hz beats did not improve reaction time, errors or self-rated anxiety versus a control tone. 40 Hz is being studied for attention, not established as a dose of energy.",
    ),
  },
  slowBreath: {
    label: "Joseph · 2005",
    url: "https://pubmed.ncbi.nlm.nih.gov/16129818/",
    text: pair(
      "U 20 osób z nadciśnieniem i 26 osób kontrolnych oddychanie 6 razy na minutę zwiększyło wrażliwość odruchu z baroreceptorów, który pomaga regulować ciśnienie i pracę serca. To bezpośrednie oddziaływanie rytmu oddechu na regulację krążenia. Badanie nie ustalało, że proporcja 4–6 jest lepsza od innych podziałów tego samego cyklu.",
      "In 20 people with hypertension and 26 controls, breathing six times per minute increased sensitivity of the baroreflex, which helps regulate blood pressure and heart activity. This is a direct breathing–cardiovascular mechanism. The study did not establish that a 4–6 ratio is better than other divisions of the same cycle.",
    ),
  },
  box: {
    label: "Balban · 2023",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9873947/",
    text: pair(
      "W miesięcznym badaniu ćwiczeń po 5 minut dziennie grupa Box zgłaszała poprawę pozytywnego nastroju po ćwiczeniu. Najwyraźniejszą przewagę nad medytacją miało jednak cykliczne wzdychanie, inna technika. Box daje strukturę pracy z uwagą i oddechem; wynik badania nie dowodzi, że cztery równe fazy wyjątkowo obniżają tętno.",
      "In a month-long trial of five-minute daily practices, the Box group reported improved positive mood after practice. Cyclic sighing, a different technique, showed the clearest advantage over meditation. Box structures attention and breathing; this result does not establish a unique heart-rate-lowering effect of four equal phases.",
    ),
  },
  extendedExhale: {
    label: "Vierra · 2022",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9277512/",
    text: pair(
      "U 43 młodych dorosłych po ćwiczeniu 4–7–8 zmierzono spadek tętna i niektórych wartości ciśnienia. Porównywano osoby z niedoborem snu i bez niego, lecz obie grupy wykonywały ćwiczenie — brakowało grupy spokojnie odpoczywającej bez 4–7–8. Wynik jest obiecujący dla wyciszenia pobudzenia fizjologicznego, ale nie dowodzi szybszego zasypiania.",
      "In 43 young adults, heart rate and some blood-pressure measures fell after 4–7–8 practice. Sleep-deprived and non-deprived groups both performed it; there was no resting group without 4–7–8. The finding is promising for settling physiological arousal, but does not establish faster sleep onset.",
    ),
  },
};

const groups = {
  beta: { studies: ["memory", "vigilance", "attentionNull", "homeReasoning"], comparison: pair("Cortex daje zaplanowany rytm do jednego zadania, z łagodnym wejściem i zakończeniem. Tło oraz poziom tonów dobierasz osobno. W badaniu pamięci rytm 15 Hz porównywano m.in. z muzyką klasyczną — to konkretny powód, by wypróbować taki rodzaj bodźca podczas pracy. Wyniki innych zadań uwagowych były mieszane.", "Cortex provides a planned rhythm for one task, with a gentle opening and ending. Background and tone levels are adjustable separately. The memory study compared 15 Hz beats with classical music among other conditions, giving a concrete reason to try this type of stimulus while working. Findings from other attention tasks were mixed.") },
  alpha: { studies: ["alpha"], comparison: pair("Tutaj różnicą jest stały, precyzyjny rytm dla układu słuchowego. Badanie potwierdza zmianę EEG, nie przewagę relaksacyjną nad muzyką. Wybierz tę sesję, jeśli chcesz spokojnego, przewidywalnego bodźca bez melodii wymagającej śledzenia.", "The distinction here is a steady, precise rhythm for the auditory system. The study supports an EEG change, not superior relaxation versus music. Choose this session for a calm, predictable stimulus without a melody to follow.") },
  creative: { studies: ["creativity"], comparison: pair("Wybierz Genesis do swobodnego szkicowania i kojarzenia pomysłów, jeśli wyrazista muzyka odciąga Cię od własnego toku myślenia. Stałe 10 Hz odpowiada jednemu z bodźców badanych podczas zadań twórczych. Efekt zależał od uczestnika; nie ustalono przewagi nad muzyką.", "Choose Genesis for sketching and associations if prominent music distracts you from your own train of thought. Steady 10 Hz matches one stimulus studied during creativity tasks. Effects depended on the participant; superiority over music has not been established.") },
  calm: { studies: ["autonomic", "relaxation"], comparison: pair("Muzyka sama też może pomagać w wyciszeniu. Badanie Mallika wskazuje dodatkową korzyść po dołączeniu rytmów w określonej grupie. Cortex pozwala osobno dobrać tło i poziom tonów; jego sekwencje nie odtwarzają badanego nagrania.", "Music alone can also help with unwinding. Mallik’s trial suggests an added benefit from beats in a specific subgroup. Cortex lets you adjust background and tone levels separately; its sequences do not reproduce the studied recording.") },
  sleep: { studies: ["sleep"], comparison: pair("Powodem wyboru Hypnos jest powtarzalne przejście do wolniejszego bodźca, czarny ekran i łagodne wygaszenie przy ustawionym czasie. Pilotaż uzasadnia zainteresowanie wolnymi dudnieniami podczas zasypiania, ale nie wykazuje przewagi Hypnos nad spokojną muzyką.", "Choose Hypnos for a repeatable transition to a slower stimulus, a black-screen option and a gentle fade with a set duration. The pilot supports investigating slow beats at sleep onset, but does not establish that Hypnos outperforms quiet music.") },
  evening: { studies: ["relaxation"], comparison: pair("Cortex prowadzi przez skończoną sekwencję z łagodnym wygaszeniem i opcją czarnego ekranu. Możesz wybrać samo tło, same tony lub ich połączenie. Badania połączenia muzyki i rytmów uzasadniają sprawdzanie takiego podejścia przy wieczornym natłoku myśli; nie wykazują sterowania fazą REM ani wydłużania snu.", "Cortex provides a finite sequence, a gentle fade and a black-screen option. Choose background alone, tones alone or both. Music-plus-beats research gives a reason to try this approach for evening worries; it does not demonstrate control of REM stages or longer sleep.") },
  gamma: { studies: ["gamma", "gammaNull"], comparison: pair("Wybierz tę sesję, aby wypróbować regularny bodziec 40 Hz związany z badaniami uwagi. Muzyka zwykle nie utrzymuje takiej pulsacji. Badania porównywały dudnienia z tonami kontrolnymi, a nie z Twoją playlistą; Cortex używa pary tonów 320/360 Hz, a tło i poziom dźwięku dobierasz samodzielnie.", "Choose this session to try a regular 40 Hz stimulus studied in attention research. Music does not usually maintain this pulse. Studies compared beats with control tones, not your playlist; Cortex uses a 320/360 Hz tone pair, with background and level chosen by you.") },
};

// One selection rationale for each actual protocol, rather than a frequency-to-
// guaranteed-benefit lookup table. The numbers shown in the UI come from audio.
export const sessionResearch = {
  deepFocus: ["beta", pair("Stałe 15 Hz do pracy z informacjami, które trzeba utrzymać w pamięci. Wybierz Deep Focus do jednego zadania; Clarity i Prime używają tego samego sygnału w krótszych sesjach.", "Steady 15 Hz for work that involves holding information in mind. Choose Deep Focus for one task; Clarity and Prime use the same signal in shorter sessions.")],
  clarity: ["beta", pair("Pięciominutowy blok na zebranie informacji i ustalenie kolejnego kroku. Tony 255/240 Hz i czas 5 minut odpowiadają warunkowi z badania pamięci roboczej. Słuchaj podczas pracy z notatnikiem.", "A five-minute block for gathering information and choosing the next step. The 255/240 Hz tones and five-minute duration match a working-memory study condition. Listen while working with a notebook.")],
  cortexForge: ["beta", pair("Ten sam stabilny rytm 15 Hz co w Deep Focus, z większą ilością czasu na pracę. Wybierz go do dłuższego zadania; więcej czasu nie oznacza silniejszego efektu.", "The same steady 15 Hz rhythm as Deep Focus with more time to work. Choose it for a longer task; more time does not mean a stronger effect.")],
  prime: ["beta", pair("Pięć minut na pierwsze konkretne działanie przy rytmie 15 Hz. Zacznij zadanie podczas słuchania: właśnie pracę w trakcie bodźca oceniano w badaniu pamięci.", "Five minutes for your first concrete action with a 15 Hz rhythm. Start the task while listening: the memory experiment measured work during the stimulus.")],
  presence: ["alpha", pair("Przed rozmową, spotkaniem lub wystąpieniem, gdy chcesz na chwilę zebrać uwagę. Stałe 10 Hz daje niezmienny punkt skupienia. W badaniach ten rytm wpływał na zgodność aktywności obszarów słuchowych w paśmie alfa.", "Before a conversation, meeting or presentation when you want a moment to collect your attention. A constant 10 Hz gives a stable focus. Research found this rhythm affected alpha-band coordination between auditory areas.")],
  equilibrium: ["alpha", pair("Na krótką przerwę od tempa pracy. Rytm zwalnia z 12 przez 10 do 8 Hz, bez dodatkowej pulsacji głośności. Środkowe 10 Hz badano pod kątem synchronizacji aktywności obszarów słuchowych — tutaj jest spokojnym punktem odniesienia podczas odpoczynku.", "For a short break from the pace of work. The rhythm slows from 12 through 10 to 8 Hz without additional amplitude pulses. The middle 10 Hz has been studied for auditory-area coordination; here it provides a steady anchor while resting.")],
  genesis: ["creative", pair("Do swobodnego notowania i generowania pomysłów. Stałe 10 Hz z tonów 335/345 Hz nawiązuje do warunku z badania twórczości. Daje jeden przewidywalny rytm przez cały blok.", "For free notes and generating ideas. Steady 10 Hz from 335/345 Hz tones follows a creativity-study condition. It offers one predictable rhythm throughout the block.")],
  restoration: ["calm", pair("Na odpoczynek między blokami pracy. Wolny etap 3 Hz oddziela przerwę od działania, a powrót do 8 Hz domyka sesję. Uzasadnieniem dla badania wolnych dudnień są wyniki dotyczące odczuwanego napięcia i autonomicznej regulacji rytmu serca.", "For resting between work blocks. A slow 3 Hz stage marks the break, and a return to 8 Hz closes the session. Findings on reported tension and autonomic heart regulation motivate research into slow beats.")],
  parasymPathway: ["calm", pair("Dłuższa przerwa po intensywnym dniu, z wolniejszym środkiem. Sekwencja 6–3–8 Hz jest kompozycją Cortex do odpoczynku. Badanie autonomicznej regulacji serca używało innego, zmiennego bodźca.", "A longer break after an intense day, with a slower middle. The 6–3–8 Hz sequence is a Cortex rest composition. Research on autonomic heart regulation used a different, varying stimulus.")],
  hypnos: ["sleep", pair("Przejście z 8 do 1 Hz jest pomyślane na zasypianie. Wolne dudnienia mają wstępne wyniki w badaniach snu; Hypnos utrzymuje stałe 1 Hz, podczas gdy cytowany pilotaż zmieniał rytm między 0 a 3 Hz.", "The shift from 8 to 1 Hz is intended for settling into sleep. Slow beats have preliminary sleep findings; Hypnos holds at 1 Hz, while the cited pilot varied between 0 and 3 Hz.")],
  auroraReset: ["evening", pair("Zakres 4–8 Hz jest bliski rytmom theta badanym w połączeniu z muzyką podczas wyciszenia. Wybierz Aurora Reset na przejście od aktywności do wieczoru; środkowe 8 Hz jest wyraźniejsze niż początek i koniec.", "The 4–8 Hz range is close to theta beats studied with music for unwinding. Choose Aurora Reset for the transition into your evening; its 8 Hz middle is more present than the opening and ending.")],
  remSculpt: ["evening", pair("Dłuższy odpoczynek przed snem przy równym rytmie 6 Hz. Pozostają same dudnienia binauralne bez dodatkowej pulsacji głośności. Na końcu rytm przechodzi do 8 Hz i dźwięk wygasa.", "A longer rest before bed with a steady 6 Hz rhythm. Binaural beats remain without added amplitude pulses. The ending moves to 8 Hz and fades out.")],
  overdrive: ["gamma", pair("Krótki wariant do poznania rytmu gamma podczas małego zadania. Dudnienia 40 Hz są stałe; nie nakładamy na nie mocniejszej pulsacji głośności. Dłuższy wariant to Gamma Lift.", "A short option for trying gamma beats during a small task. The 40 Hz beat stays constant, without stronger amplitude pulses on top. Gamma Lift is the longer option.")],
  gammaLift: ["gamma", pair("Stałe 40 Hz przez 33 minuty podczas zadania. Tony 320/360 Hz odpowiadają nośnej 340 Hz w badaniu uwagi. To wariant dłuższej pracy, z łagodnym wejściem i wygaszeniem dźwięku.", "Steady 40 Hz for 33 minutes during a task. The 320/360 Hz tones correspond to the 340 Hz carrier in the attention study. This is a longer work option with gentle audio fades.")],
};

const breathResearch = {
  "4-6": { studies: ["slowBreath"], choice: pair("6 oddechów na minutę to tempo badane pod kątem współpracy oddechu, rytmu serca i odruchowej regulacji ciśnienia. Tu działasz poprzez własny oddech, a obraz lub dźwięk ułatwia utrzymanie tempa.", "Six breaths per minute is studied for breathing–heart coordination and reflex blood-pressure regulation. Your own breathing is the active mechanism; visuals or sound help you keep the pace.") },
  box: { studies: ["box"], choice: pair("Cztery równe fazy dają uwadze powtarzalną strukturę: wdech, pauza, wydech, pauza. To wybór do zebrania myśli i świadomej pracy z oddechem. W badaniu codziennej praktyki uczestnicy ćwiczący Box zgłaszali poprawę pozytywnego nastroju.", "Four equal phases give attention a repeating structure: inhale, hold, exhale, hold. Choose it to collect your thoughts and focus on breathing. Participants practising Box in a daily-practice trial reported improved positive mood.") },
  "4-7-8": { studies: ["extendedExhale"], choice: pair("Długi wydech i pauza tworzą wolny cykl oddechowy. Badano krótkoterminowe zmiany tętna po tej technice; wybierz ją tylko wtedy, gdy zatrzymanie oddechu jest dla Ciebie komfortowe.", "A long exhale and hold make a slow breathing cycle. Short-term heart-rate changes after this technique have been studied; choose it only if the hold feels comfortable.") },
};

export function researchFor(session, pattern = "4-6") {
  if (session.id === "breath") return {
    ...(breathResearch[pattern] || breathResearch["4-6"]),
    comparison: pair("Muzyka może towarzyszyć odpoczynkowi, ale sama nie prowadzi dokładnie przez fazy oddechu. Cortex przejmuje liczenie i pokazuje wdech, wydech oraz ewentualne pauzy. Działanie fizjologiczne wynika z oddychania, nie z częstotliwości syntetycznego szumu.", "Music can accompany rest, but does not itself guide exact breathing phases. Cortex handles the counting and marks inhales, exhales and any holds. The physiological mechanism is breathing, not the frequency of synthetic air noise."),
  };
  const [group, choice] = sessionResearch[session.id];
  return { ...groups[group], choice };
}

export function signalFacts(session, pattern = "4-6") {
  if (session.id === "breath") return {
    kind: "breath",
    phases: (patterns[pattern] || patterns["4-6"]).map((p) => p.seconds),
    cycles: 60 / cycleDuration(pattern),
  };
  return {
    kind: "audio",
    beats: session.phases.map((p) => Math.abs(p.audio.r - p.audio.l)),
    modulation: session.phases.map((p) => ({ ...p.audio.am })),
  };
}

export function signalHTML(session, pattern, lang) {
  const pl = lang === "pl", facts = signalFacts(session, pattern), research = researchFor(session, pattern);
  const values = facts.kind === "breath" ? facts.phases.join("–") + " s"
    : facts.beats.filter((v, i, a) => i === 0 || v !== a[i - 1]).join(" → ") + " Hz";
  return `<aside class="session-signal" aria-label="${pl ? "Dlaczego ten rytm" : "Why this rhythm"}"><span class="eyebrow">${facts.kind === "breath" ? (pl ? "Rytm oddechu" : "Breathing rhythm") : (pl ? "Rytm binauralny · audio v3" : "Binaural beat · audio v3")}</span><strong>${esc(values)}</strong><p>${esc(research.choice[lang])}</p><button class="text-link research-jump" data-action="showResearch" aria-controls="setupResearch">${pl ? "Zobacz działanie, czas i badania ↓" : "See mechanism, timing & research ↓"}</button></aside>`;
}

const citation = (study) => `<a class="research-source" href="${esc(study.url)}" target="_blank" rel="noopener">${esc(study.label)} ↗</a>`;
export function researchHTML(session, pattern, lang, actualDuration = session.duration) {
  const pl = lang === "pl", research = researchFor(session, pattern), facts = signalFacts(session, pattern);
  let mechanism = "";
  if (facts.kind === "audio") {
    const a = session.phases[0].audio;
    const example = pl
      ? `Na początku tej sesji lewe ucho otrzymuje ${a.l} Hz, a prawe ${a.r} Hz. Różnica ${Math.abs(a.r - a.l)} Hz tworzy rytm binauralny w układzie słuchowym — dlatego potrzebujesz słuchawek stereo. To częstotliwość bodźca, nie odczyt aktywności Twojego mózgu.`
      : `At the start, your left ear receives ${a.l} Hz and your right ear ${a.r} Hz. The ${Math.abs(a.r - a.l)} Hz difference produces a binaural beat in the auditory system, which is why stereo headphones matter. It is the stimulus rate, not a reading of your brain activity.`;
    const am = facts.modulation.some((m) => m.depth > 0)
      ? `<p>${pl ? "Dodatkowa pulsacja głośności (AM), kolejno:" : "Additional amplitude pulses (AM), in order:"} <strong>${facts.modulation.map((m) => m.depth > 0 ? `${m.rate} Hz / ${Math.round(m.depth * 100)}%` : "—").join(" → ")}</strong>. ${pl ? "Hz określa liczbę pulsacji na sekundę; procent — głębokość zmian amplitudy, a nie ustawienie głośności urządzenia. To osobny bodziec od dudnień binauralnych." : "Hz gives cycles per second; the percentage is modulation depth, not device volume. This is a separate stimulus from binaural beats."}</p>` : "";
    mechanism = `<h2>${pl ? "Jak reaguje mózg" : "How the brain responds"}</h2><p>${esc(example)}</p>${am}<p>${esc(studies.auditory.text[lang])}</p>${citation(studies.auditory)}`;
  } else {
    mechanism = `<p>${pl ? "Tempo wybranego rytmu:" : "Selected breathing rate:"} <strong>${facts.cycles.toLocaleString(lang, { maximumFractionDigits: 2 })} ${pl ? "cykli/min" : "cycles/min"}</strong>. ${pl ? "To rytm oddychania, a nie częstotliwość fali dźwiękowej ani pasmo EEG." : "This is a breathing rate, not an audio frequency or an EEG band."}</p>`;
  }
  return `<details class="setup-about setup-research" id="setupResearch"><summary>${pl ? "Wpływ na mózg i ciało · badania" : "Brain and body effects · research"}</summary><div class="session-explanation">${reviewHTML(session, lang, actualDuration)}<h2>${pl ? "Co zmierzono w badaniach" : "What studies measured"}</h2>${research.studies.map((id) => `<article class="research-finding"><p>${esc(studies[id].text[lang])}</p>${citation(studies[id])}</article>`).join("")}<h2>${pl ? "Dlaczego Cortex zamiast muzyki?" : "Why Cortex rather than music?"}</h2><p>${esc(research.comparison[lang])}</p>${mechanism}${facts.kind === "audio" ? `<p class="research-context">${pl ? "Dobór sekwencji Cortex jest autorski. Badane częstotliwości, nośne, czas i grupy uczestników podajemy przy wynikach, żeby można było ocenić ich związek z tą sesją. Opis dotyczy dźwięku; opcjonalne światło jest odrębnym bodźcem." : "Cortex sequences are original designs. Studied frequencies, carriers, durations and participant groups are given with the findings so you can assess their relevance to this session. This explanation concerns sound; optional light is a separate stimulus."}</p>` : ""}</div></details>`;
}
