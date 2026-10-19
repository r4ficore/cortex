// Explain the intended use separately from the signal definitions in protocols.js.
// Stage descriptions use relative order so they also fit scaled programme steps.
const pair = (pl, en) => ({ pl, en });

export const sessionCopy = {
  breath: {
    goal: "breath",
    title: pair("Twój rytm", "Your rhythm"),
    description: pair(
      "Gdy czujesz napięcie lub gonitwę myśli. Zatrzymaj się i skup uwagę na spokojnym oddechu.",
      "When you feel tense or your thoughts race. Pause and bring your attention to gentle breathing.",
    ),
    benefit: pair(
      "Krótka przerwa od reagowania na kolejne bodźce. Prowadzenie przejmuje liczenie, a Ty możesz skupić się na oddechu i rozluźnieniu ciała.",
      "A short break from reacting to one thing after another. Guidance takes care of counting, leaving you free to attend to your breath and relax your body.",
    ),
    how: pair(
      "Obraz lub dźwięk wskazuje kolejne fazy oddechu. Wybierz płynny rytm 4–6, cztery równe fazy Box albo dłuższy wydech w 4–7–8.",
      "Visual or sound guidance marks each breathing phase. Choose a flowing 4–6 rhythm, four equal Box phases, or a longer exhale with 4–7–8.",
    ),
    practice: pair(
      "Usiądź wygodnie. Oddychaj lekko, bez nabierania powietrza na siłę; wybierz rytm, przy którym czujesz się swobodnie.",
      "Sit comfortably. Keep your breathing light rather than forcing deep breaths, and choose a rhythm that feels comfortable.",
    ),
  },
  deepFocus: {
    goal: "focus",
    title: pair("Jedno zadanie", "One thing at a time"),
    description: pair(
      "Gdy rozpraszają Cię kolejne zakładki i powiadomienia. Skup się na jednym zadaniu i ogranicz przełączanie uwagi.",
      "When tabs and notifications keep pulling you away. Set aside time for one task and sustained attention.",
    ),
    benefit: pair(
      "Wyraźny początek i koniec bloku pracy pomagają ograniczyć przełączanie się między zadaniami. Dźwięk bez słów daje stałe tło, do którego możesz wracać, gdy uwaga odpływa.",
      "A clear beginning and end give your work a boundary and help you limit task switching. Wordless sound provides a steady backdrop to return to when your attention wanders.",
    ),
    how: pair(
      "Po krótkim wprowadzeniu następuje długi, równomierny etap pracy, a potem łagodne zakończenie. W słuchawkach lekko różne tony w obu uszach tworzą rytm binauralny; jego tempo jest wyższe w środkowej części.",
      "A brief introduction leads into a long, steady work phase and a gentle finish. Through headphones, slightly different tones in each ear create a binaural beat, with a faster rate during the middle phase.",
    ),
    practice: pair("Przed startem zapisz jeden konkretny cel i wycisz powiadomienia. Pracuj podczas sesji; nie musisz patrzeć na ekran Cortex.", "Write down one specific goal and silence notifications before starting. Work during the session; you do not need to watch Cortex."),
  },
  clarity: {
    goal: "focus",
    title: pair("Uporządkuj myśli", "A clear starting point"),
    description: pair("Gdy masz wiele spraw w głowie i nie wiesz, od czego zacząć. Zrób plan, wybierz priorytet i określ następny krok.", "When too many things compete for your attention. Make a plan, choose a priority and identify your next step."),
    benefit: pair("To ramy dla krótkiej pracy z notatnikiem: zebrania myśli, porównania opcji i zamiany ogólnego zamiaru w konkretne działanie.", "A bounded session for working with a notebook: gathering thoughts, comparing options and turning a broad intention into a concrete action."),
    how: pair("Spokojniejsze wejście przechodzi w wyraźnie pulsujący środek, po którym rytm zwalnia. Oprócz różnicy tonów między uszami sesja wykorzystuje regularną zmianę głośności. Daje bardziej wyrazisty punkt skupienia niż Deep Focus.", "A calmer opening leads into a distinctly pulsing middle before the rhythm slows. Alongside the difference between the tones in each ear, the session uses regular changes in amplitude. It offers a more pronounced focus cue than Deep Focus."),
    practice: pair("Wypisz to, co zajmuje Ci głowę. Na koniec zaznacz jedną rzecz, którą zrobisz jako następną.", "Write down what is on your mind. Finish by marking the one thing you will do next."),
  },
  genesis: {
    goal: "focus",
    title: pair("Miejsce na pomysły", "Room for ideas"),
    description: pair("Gdy utkniesz przy pomyśle. Zrób miejsce na swobodne skojarzenia, szkice i szukanie innego podejścia.", "When an idea feels stuck. Make room for associations, sketches and a different approach."),
    benefit: pair("Chwila na eksplorowanie możliwości bez konieczności natychmiastowego oceniania wyniku. Przydaje się przed pisaniem, projektowaniem lub burzą mózgów.", "Time to explore possibilities without having to judge the result immediately. Useful before writing, designing or brainstorming."),
    how: pair("Środkowa część ma wolniejszy rytm binauralny i niższe tony niż wprowadzenie. Zakończenie wraca do rytmu początkowego, wyznaczając moment na zebranie notatek i wybór dalszego kierunku.", "The middle phase uses a slower binaural beat and lower tones than the opening. The ending returns to the initial rhythm, marking a moment to gather your notes and choose a direction."),
    practice: pair("Zapisuj pomysły bez poprawiania ich w trakcie. Dopiero po sesji wybierz jeden, który chcesz rozwinąć.", "Capture ideas without editing them as you go. After the session, choose one to develop."),
  },
  presence: {
    goal: "focus",
    title: pair("Przed spotkaniem", "Before a conversation"),
    description: pair("Gdy chcesz wejść w rozmowę z większą uważnością. Zostaw na chwilę poprzednie zadanie i przygotuj się do słuchania.", "When you want to be more present in a conversation. Set your previous task aside and prepare to listen."),
    benefit: pair("Tworzy przerwę między pośpiechem a spotkaniem. Możesz zauważyć napięcie w ciele, rozluźnić barki i świadomie skierować uwagę na osobę, z którą będziesz rozmawiać.", "Creates a pause between rushing and meeting someone. Notice tension in your body, release your shoulders and deliberately turn your attention towards the conversation ahead."),
    how: pair("Rytm binauralny pozostaje równy przez całą sesję. Brak wyraźnych zmian tempa pozwala potraktować go jako stały punkt uwagi podczas spokojnego przygotowania.", "The binaural beat stays at the same rate throughout. With no pronounced tempo changes, it can serve as a steady point of attention while you prepare."),
    practice: pair("Odłóż czytanie wiadomości. Pomyśl o jednym pytaniu, które chcesz zadać, i o tym, czego chcesz się dowiedzieć.", "Set messages aside. Think of one question you want to ask and what you hope to understand."),
  },
  cortexForge: {
    goal: "focus",
    title: pair("Dłuższe skupienie", "A longer focus session"),
    description: pair("Gdy zadanie wymaga dłuższego zanurzenia. Wybierz blok na pisanie, naukę lub analizę bez ciągłego sprawdzania czasu.", "When a task needs a longer stretch of attention. Set aside a block for writing, studying or analysis without checking the time."),
    benefit: pair("Dłuższa przestrzeń na wejście w temat i pozostanie przy nim. Wybierz ją, gdy krótki start już nie wystarcza, a chcesz doprowadzić fragment pracy do końca.", "More room to get into a subject and stay with it. Choose it when a short start is not enough and you want to finish a meaningful piece of work."),
    how: pair("Wprowadzenie prowadzi do długiego środkowego etapu ze stałym rytmem binauralnym i delikatną pulsacją głośności. Na końcu rytm zwalnia. W porównaniu z Deep Focus masz dłuższy blok oraz dodatkową pulsację dźwięku.", "The introduction leads into a long middle phase with a steady binaural beat and gentle amplitude pulses. The rate slows at the end. Compared with Deep Focus, you get a longer block and an additional pulsing layer."),
    practice: pair("Przygotuj materiały przed startem. Ustal, jaki fragment pracy zamkniesz, a po sesji zrób krótką przerwę.", "Prepare your materials first. Decide which part of the work you will finish, then take a short break afterwards."),
  },
  equilibrium: {
    goal: "calm",
    title: pair("Chwila równowagi", "A moment of balance"),
    description: pair("Gdy po intensywnym zadaniu nadal czujesz pośpiech. Zrób krótką przerwę na wyciszenie i rozluźnienie napięcia.", "When you still feel rushed after an intense task. Take a short pause to unwind and release tension."),
    benefit: pair("Pozwala na chwilę odłożyć kolejne decyzje i skierować uwagę na odpoczynek. Dobry wybór między spotkaniami albo po wymagającej rozmowie.", "A chance to set the next decision aside and turn your attention towards rest. A useful pause between meetings or after a demanding conversation."),
    how: pair("Rytm binauralny zwalnia w trzech etapach, bez dodatkowej pulsacji głośności. Ten stopniowo spokojniejszy przebieg towarzyszy przejściu od aktywności do odpoczynku.", "The binaural beat slows across three stages, with no added amplitude pulses. The gradually calmer sequence accompanies your transition from activity to rest."),
    practice: pair("Na te kilka minut odłóż zadania. Opuść barki, rozluźnij szczękę i pozwól oddechowi płynąć naturalnie.", "Put tasks aside for these few minutes. Lower your shoulders, relax your jaw and let your breathing settle naturally."),
  },
  restoration: {
    goal: "calm",
    title: pair("Czas na odpoczynek", "Time to rest"),
    description: pair("Gdy potrzebujesz prawdziwej przerwy w środku dnia. Oderwij się od pracy, odpocznij i przygotuj do powrotu.", "When you need a proper break during the day. Step away from work, rest and prepare to return."),
    benefit: pair("Wyznacza czas, w którym nie trzeba niczego robić ani śledzić kolejnych treści. Ma wyraźne zakończenie, więc łatwiej zaplanować odpoczynek między zadaniami.", "Sets aside time when you do not have to do anything or keep consuming information. A clear ending makes rest easier to fit between tasks."),
    how: pair("Po wprowadzeniu pojawia się dłuższy etap z wolniejszym rytmem binauralnym. Końcówka wraca do tempa z początku. To przerwa z powrotem do aktywności, podczas gdy Equilibrium stopniowo zwalnia do końca.", "An opening phase leads into a longer stretch with a slower binaural beat. The ending returns to the initial rate. This is a break with a return to activity, while Equilibrium slows through to the end."),
    practice: pair("Oprzyj się wygodnie i odłóż telefon. Po zakończeniu daj sobie chwilę, zanim wrócisz do ekranu.", "Lean back comfortably and put your phone down. Give yourself a moment before returning to your screen."),
  },
  parasymPathway: {
    goal: "calm",
    title: pair("Dłuższe wyciszenie", "A slower interlude"),
    description: pair("Gdy krótka przerwa to za mało. Daj sobie więcej czasu na odpuszczenie napięcia po wymagającym dniu.", "When a short pause is not enough. Give yourself more time to let go of tension after a demanding day."),
    benefit: pair("Dłuższy odpoczynek bez presji szybkiego powrotu do obowiązków. Możesz poświęcić go na spokojne słuchanie i stopniowe rozluźnianie ciała.", "A longer rest without pressure to rush back to your responsibilities. Use it for quiet listening and gradually relaxing your body."),
    how: pair("Środek sesji ma niższe tony, wolniejszy rytm binauralny i łagodną pulsację głośności. Ostatni etap wraca do wyraźniejszego rytmu, zostawiając czas na spokojne zakończenie przerwy.", "The middle phase uses lower tones, a slower binaural beat and gentle amplitude pulses. The final stage returns to a more distinct rhythm, leaving time to ease out of the break."),
    practice: pair("Znajdź pozycję, w której nie musisz napinać mięśni. Kieruj uwagę kolejno na twarz, barki i dłonie, pozwalając im odpocząć.", "Find a position that does not require you to brace your muscles. Bring your attention to your face, shoulders and hands in turn, letting them rest."),
  },
  hypnos: {
    goal: "sleep",
    title: pair("Wieczorny rytuał", "An evening ritual"),
    description: pair("Gdy chcesz zakończyć scrollowanie i przygotować się do snu. Odłóż sprawy dnia i przejdź do spokojnego odpoczynku.", "When you want to stop scrolling and get ready for sleep. Set the day aside and ease into quiet rest."),
    benefit: pair("Stały wieczorny rytuał wyznacza granicę między aktywnością a porą odpoczynku. Możesz wybrać czarny ekran, żeby słuchać bez kolejnych obrazów i światła strony.", "A repeatable evening ritual creates a boundary between activity and rest. Choose a black screen to listen without more images or light from the page."),
    how: pair("Po pierwszym etapie tony stają się niższe, a rytm binauralny wolniejszy i pozostaje taki do końca. Przy wybranym czasie zakończenia dźwięk łagodnie wygasa; w trybie bez limitu gra do ręcznego zatrzymania.", "After the first phase, the tones become lower and the binaural beat slows, staying that way through the rest of the session. With a set duration, sound gently fades out; unlimited mode continues until you stop it."),
    practice: pair("Ustaw cichą, wygodną głośność i wybierz czas przed położeniem się. Nie musisz pilnować przebiegu sesji ani patrzeć na ekran.", "Choose a quiet, comfortable volume and set the duration before lying down. You do not need to follow the stages or watch the screen."),
  },
  auroraReset: {
    goal: "sleep",
    title: pair("Miękkie przejście", "A gentle transition"),
    description: pair("Gdy dzień się kończy, ale myślami wciąż jesteś w pracy. Stwórz spokojne przejście od obowiązków do wieczoru.", "When the day is ending but your mind is still at work. Create a gentle transition from responsibilities into your evening."),
    benefit: pair("Czas na zamknięcie dnia, zanim położysz się spać. Dobry wybór do odpoczynku w fotelu, kiedy chcesz odłożyć zadania i stopniowo zmienić tempo.", "Time to close the day before going to bed. A good fit for resting in a chair when you want to put tasks aside and gradually change pace."),
    how: pair("Cichy początek przechodzi w wyraźniejszy środkowy etap z delikatną pulsacją, a końcowa część ponownie zwalnia. Ta sekwencja ma kształt spokojnego przejścia; Hypnos po wprowadzeniu pozostaje przy wolniejszym rytmie.", "A quiet opening gives way to a more present middle with gentle pulses, before the final phase slows again. The sequence provides a gradual transition; Hypnos instead stays at a slower rate after its introduction."),
    practice: pair("Zamknij laptop i zapisz sprawy, które mogą poczekać do jutra. Słuchaj bez równoczesnego przeglądania wiadomości.", "Close your laptop and note what can wait until tomorrow. Listen without checking messages at the same time."),
  },
  remSculpt: {
    goal: "sleep",
    title: pair("Wieczorne wyciszenie", "Evening stillness"),
    description: pair("Gdy przed snem potrzebujesz dłuższej, uporządkowanej chwili spokoju. Zostaw sobie czas na odpoczynek bez ekranu.", "When you need a longer, structured wind-down before bed. Give yourself time to rest away from the screen."),
    benefit: pair("Pomaga zbudować regularną przestrzeń na wieczorne wyciszenie: bez zadań, rozmów i ciągłego wybierania kolejnych treści.", "Helps you make a regular space for winding down in the evening, free from tasks, conversations and choosing what to watch next."),
    how: pair("Większość sesji utrzymuje równy, wolny rytm binauralny; w środku dochodzi subtelna pulsacja głośności. Końcówka jest nieco szybsza, po czym dźwięk wygasa. Sesja prowadzi wieczorny odpoczynek, a nazwa REM Sculpt nie oznacza sterowania fazą REM.", "Most of the session maintains a steady, slow binaural beat, with subtle amplitude pulses added in the middle. The rate rises slightly at the end before the sound fades. The session accompanies an evening wind-down; the name REM Sculpt does not mean it controls REM sleep."),
    practice: pair("Wybierz czarny ekran lub nocną formę i odpoczywaj w wygodnej pozycji. Jeśli wolisz dźwięk bez końcowego przyspieszenia, wybierz Hypnos.", "Choose a black screen or night visual and rest comfortably. If you prefer sound without a faster final phase, choose Hypnos."),
  },
  prime: {
    goal: "energy",
    title: pair("Łagodny start", "A gentle start"),
    description: pair("Gdy odkładasz rozpoczęcie i brakuje Ci rozpędu. Zrób krótką rozgrzewkę uwagi przed pierwszym działaniem.", "When you keep putting off getting started. Give your attention a short warm-up before taking the first step."),
    benefit: pair("Mały rytuał startowy zamienia czekanie na odpowiedni moment w konkretny początek. To najłagodniejszy wybór w ścieżce Energia, gdy chcesz wejść w działanie bez intensywnej pulsacji.", "A small starting ritual turns waiting for the right moment into a concrete beginning. This is the gentlest Energy option for getting into action without strong pulses."),
    how: pair("Rytm binauralny przechodzi od spokojniejszego do szybszego, przy tej samej wysokości tonu bazowego. Sesja nie dodaje pulsacji głośności stosowanej w Overdrive i Gamma Lift.", "The binaural beat moves from a calmer to a faster rate while the base tone stays at the same pitch. It does not add the amplitude pulses used by Overdrive and Gamma Lift."),
    practice: pair("Przed startem wybierz najmniejszy pierwszy krok. Po sesji od razu go wykonaj — otwórz dokument, napisz pierwsze zdanie lub przygotuj stanowisko.", "Choose the smallest first step before starting. Afterwards, do it immediately: open the document, write the first sentence or prepare your workspace."),
  },
  overdrive: {
    goal: "energy",
    title: pair("Mocniejsze pobudzenie", "A stronger lift"),
    description: pair("Gdy potrzebujesz wyrazistego sygnału do działania. Krótka, intensywniejsza rozgrzewka przed wymagającym zadaniem.", "When you want a more pronounced cue to get moving. A short, more intense warm-up before a demanding task."),
    benefit: pair("Zaznacza zdecydowane przejście od bezczynności do aktywności. Wybierz ją, jeśli odpowiada Ci mocniejszy bodziec dźwiękowy, a łagodny start Prime jest dla Ciebie zbyt spokojny.", "Marks a deliberate shift from inactivity into action. Choose it if a stronger sound cue suits you and Prime feels too gentle."),
    how: pair("Środkowy etap łączy szybszą różnicę tonów między uszami z regularną pulsacją głośności. Końcówka obniża tempo. Intensywność wynika z budowy dźwięku; głośność ustawiasz niezależnie.", "The middle phase combines a faster difference between the tones in each ear with regular amplitude pulses. The final phase slows down. Intensity comes from the sound pattern; you control listening volume separately."),
    practice: pair("Słuchaj na wygodnym poziomie głośności. Po zakończeniu przejdź do zadania; do dłuższej pracy wybierz Deep Focus lub Cortex Forge.", "Listen at a comfortable volume. Move into your task afterwards; for sustained work, choose Deep Focus or Cortex Forge."),
  },
  gammaLift: {
    goal: "energy",
    title: pair("Dłuższa aktywacja", "A longer lift"),
    description: pair("Gdy chcesz poświęcić więcej czasu na wejście w działanie. Dłuższa rozgrzewka uwagi z wyraźnym etapem aktywacji.", "When you want more time to get into action. A longer attention warm-up with a pronounced activation phase."),
    benefit: pair("Daje więcej przestrzeni na przygotowanie niż krótki Overdrive: wejście, intensywniejszy środek i spokojniejsze zakończenie. Przydaje się, gdy lubisz wyraźny rytm, ale nie chcesz kończyć na jego szczycie.", "Offers more preparation time than the short Overdrive session: an opening, a stronger middle and a calmer ending. Useful if you enjoy a distinct rhythm but do not want to finish at its peak."),
    how: pair("Środkowy etap wykorzystuje różnicę tonów 40 Hz i pulsację głośności 40 razy na sekundę. Poprzedza go wolniejszy etap, a kończy łagodniejszy powrót. To parametry sygnału dźwiękowego; światło pozostaje osobnym wyborem.", "The middle phase uses a 40 Hz tone difference and amplitude pulses at 40 cycles per second. A slower opening precedes it and a gentler return follows. These are sound-signal parameters; light remains a separate choice."),
    practice: pair("Zaplanuj, co zrobisz po sesji. Zacznij od wygodnej głośności i wykorzystaj spokojną końcówkę na zebranie uwagi przed działaniem.", "Decide what you will do afterwards. Start at a comfortable volume and use the calmer ending to gather your attention before acting."),
  },
};

export const breathingCopy = {
  "4-6": {
    description: pair("Gdy czujesz napięcie lub gonitwę myśli. Zwolnij oddech i zrób miejsce na spokojniejszy rytm.", "When you feel tense or your thoughts race. Slow your breathing and make room for a calmer rhythm."),
    benefit: pair("Dłuższy wydech wyznacza spokojne tempo bez zatrzymywania powietrza. To prosty punkt wyjścia do wyciszenia i skupienia uwagi na ciele zamiast na kolejnych zadaniach.", "A longer exhale sets a gentle pace without breath holds. It is a simple starting point for settling down and attending to your body instead of the next task."),
    how: pair("Wdech trwa 4 sekundy, wydech 6 — łącznie 6 cykli na minutę. Forma rośnie i maleje zgodnie z fazą; po włączeniu dźwięku możesz podążać za nim bez patrzenia na ekran.", "Inhale for 4 seconds and exhale for 6: 6 cycles per minute. The form grows and shrinks with each phase; with sound guidance enabled, you can follow without watching the screen."),
    practice: sessionCopy.breath.practice,
  },
  box: {
    description: pair("Gdy trudno zatrzymać rozbiegane myśli. Podążaj za czterema równymi fazami i skup się na jednym cyklu naraz.", "When your thoughts feel scattered. Follow four equal phases and give your attention to one cycle at a time."),
    benefit: pair("Powtarzalna struktura daje uwadze konkretne zadanie. Kwadrat prowadzi Cię przez cały cykl, więc nie musisz samodzielnie liczyć ani pamiętać kolejności.", "The repeating structure gives your attention a specific task. The square guides the whole cycle, so you do not have to count or remember the order yourself."),
    how: pair("Cztery boki to: wdech, zatrzymanie, wydech i zatrzymanie — po 4 sekundy. Wdech prowadzi w górę, wydech w dół, poziome boki oznaczają pauzy. W prowadzeniu dźwiękowym pauzy są ciche.", "The four sides represent inhale, hold, exhale and hold, each lasting 4 seconds. Inhale travels up, exhale down, and horizontal sides mark the holds. Sound guidance is quiet during holds."),
    practice: pair("Nie napinaj ciała podczas pauz. Jeśli zatrzymanie oddechu jest niewygodne, wróć do naturalnego oddechu i wybierz płynne 4–6.", "Keep your body relaxed during the holds. If holding feels uncomfortable, return to natural breathing and choose the flowing 4–6 pattern."),
  },
  "4-7-8": {
    description: pair("Gdy chcesz spokojnie zakończyć dzień i odpowiada Ci oddech z pauzą. Skieruj uwagę na długi, łagodny wydech.", "When you want to wind down and feel comfortable with a breath hold. Bring your attention to a long, gentle exhale."),
    benefit: pair("Wyraźnie wydłużony wydech daje czas na świadome zwolnienie tempa. Prowadzenie pozwala zostać przy odczuciu oddechu, bez samodzielnego odliczania.", "The extended exhale makes room to deliberately slow your pace. Guidance lets you stay with the sensation of breathing without doing the counting."),
    how: pair("Wdech trwa 4 sekundy, zatrzymanie 7, a wydech 8. Forma pozostaje nieruchoma podczas pauzy, a potem powoli maleje; dźwięk, jeśli go wybierzesz, prowadzi wdech i wydech.", "Inhale for 4 seconds, hold for 7 and exhale for 8. The form stays still during the hold, then slowly shrinks; optional sound guides the inhale and exhale."),
    practice: pair("Nie wymuszaj długiego wydechu ani pauzy. Jeśli ten rytm wymaga wysiłku, wybierz 4–6 bez zatrzymywania powietrza.", "Do not force the long exhale or hold. If this pattern feels effortful, choose 4–6 without holds."),
  },
};

export const programCopy = {
  flow90: pair("Gdy potrzebujesz długiego bloku pracy: wejście w skupienie, rozgrzewka uwagi, praca z wyraźnym rytmem i odpoczynek na koniec.", "For a long work block: settle into focus, warm up your attention, work with a distinct rhythm, then take time to unwind."),
  socialUpgrade: pair("Przed ważną rozmową: najpierw skieruj uwagę na spotkanie, potem daj sobie czas na odpuszczenie napięcia.", "Before an important conversation: first bring your attention to the meeting, then give yourself time to let go of tension."),
  sleepReset: pair("Gdy trudno odłożyć sprawy dnia: zacznij od spokojnej przerwy, a potem przejdź do dłuższego wieczornego odpoczynku z Hypnos.", "When it is hard to put the day aside: begin with a quiet break, then move into a longer evening wind-down with Hypnos."),
  powerNap45: pair("Na odpoczynek w środku dnia: wyciszenie, czas na leżenie lub drzemkę i zakończenie, do którego wrócisz, gdy zechcesz.", "For a daytime rest: unwind, take time to lie down or nap, and return to a closing stage when you are ready."),
  creativeBloom: pair("Gdy chcesz przejść od zamiaru do twórczej pracy: zbierz uwagę, poświęć dłuższy blok jednemu pomysłowi i zakończ odpoczynkiem.", "To move from intention into creative work: gather your attention, dedicate a longer block to one idea and finish with a rest."),
};
