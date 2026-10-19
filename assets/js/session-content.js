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
    how: pair("Przez cały blok słyszysz stałe dudnienia 15 Hz: 255 Hz w lewym uchu i 240 Hz w prawym. Głośność łagodnie narasta i wygasa; częstotliwość nie zmienia się podczas pracy. Badanie pamięci z tym bodźcem trwało 5 minut; dłuższy blok służy organizacji pracy.", "The whole block uses steady 15 Hz beats: 255 Hz in the left ear and 240 Hz in the right. Volume fades in and out; the frequency stays constant while you work. The memory study used five minutes of this stimulus; longer blocks structure your work."),
    practice: pair("Przed startem zapisz jeden konkretny cel i wycisz powiadomienia. Pracuj podczas sesji; nie musisz patrzeć na ekran Cortex.", "Write down one specific goal and silence notifications before starting. Work during the session; you do not need to watch Cortex."),
  },
  clarity: {
    goal: "focus",
    title: pair("Uporządkuj myśli", "A clear starting point"),
    description: pair("Gdy masz wiele spraw w głowie i nie wiesz, od czego zacząć. Zrób plan, wybierz priorytet i określ następny krok.", "When too many things compete for your attention. Make a plan, choose a priority and identify your next step."),
    benefit: pair("To ramy dla krótkiej pracy z notatnikiem: zebrania myśli, porównania opcji i zamiany ogólnego zamiaru w konkretne działanie.", "A bounded session for working with a notebook: gathering thoughts, comparing options and turning a broad intention into a concrete action."),
    how: pair("Pięć minut stałego rytmu binauralnego 15 Hz, bez dodatkowej pulsacji głośności. To ten sam bodziec co w Deep Focus, w krótszym bloku. Czas i para tonów 255/240 Hz odpowiadają warunkowi z badania pamięci roboczej; planowanie jest zastosowaniem praktycznym.", "Five minutes of steady 15 Hz binaural beats without added amplitude pulses. This is the same stimulus as Deep Focus in a shorter block. Its duration and 255/240 Hz tone pair match a working-memory study condition; planning is a practical application."),
    practice: pair("Wypisz to, co zajmuje Ci głowę. Na koniec zaznacz jedną rzecz, którą zrobisz jako następną.", "Write down what is on your mind. Finish by marking the one thing you will do next."),
  },
  genesis: {
    goal: "focus",
    title: pair("Miejsce na pomysły", "Room for ideas"),
    description: pair("Gdy utkniesz przy pomyśle. Zrób miejsce na swobodne skojarzenia, szkice i szukanie innego podejścia.", "When an idea feels stuck. Make room for associations, sketches and a different approach."),
    benefit: pair("Chwila na eksplorowanie możliwości bez konieczności natychmiastowego oceniania wyniku. Przydaje się przed pisaniem, projektowaniem lub burzą mózgów.", "Time to explore possibilities without having to judge the result immediately. Useful before writing, designing or brainstorming."),
    how: pair("Stałe 10 Hz tworzone przez tony 335 i 345 Hz odpowiada częstotliwości i nośnej z badania myślenia twórczego. Czas sesji przeznacz na własne notatki; badanie obejmowało trzyminutowe wprowadzenie i zadania twórcze.", "Steady 10 Hz from 335 and 345 Hz tones matches the beat and carrier used in creativity research. Use the session for your own notes; the study included a three-minute lead-in followed by creativity tasks."),
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
    how: pair("Stałe 15 Hz, takie jak w Deep Focus, przez cały blok pracy. Nie dodajemy szybszych rytmów ani modulacji głośności. Dłuższy czas służy organizacji pracy; nie oznacza większej skuteczności bodźca.", "The same steady 15 Hz as Deep Focus throughout the work block. No faster beats or additional amplitude modulation. The longer duration structures work; it does not imply a stronger stimulus benefit."),
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
    how: pair("Trzy etapy dudnień 6–3–8 Hz, z niższymi tonami pośrodku i łagodnym wygaszeniem. Dodatkowa pulsacja głośności została usunięta. To autorska kompozycja do odpoczynku; badanie HRV stosowało inny, zmienny rytm 5,5–8,5 Hz.", "Three beat stages at 6–3–8 Hz, with lower tones in the middle and a gentle fade. Added amplitude pulses have been removed. This is an original rest composition; the HRV trial used a different, varying 5.5–8.5 Hz rhythm."),
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
    how: pair("Rytm 4–8–5 Hz tworzy trzy części wieczornego odpoczynku. Pozostają same dudnienia binauralne, bez dodatkowej pulsacji głośności. Przebieg i 30 minut są wyborem kompozycyjnym, nie procedurą przestawiania zegara biologicznego.", "A 4–8–5 Hz sequence marks three parts of an evening rest. It uses binaural beats without additional amplitude modulation. The sequence and 30-minute duration are composition choices, not a body-clock-reset procedure."),
    practice: pair("Zamknij laptop i zapisz sprawy, które mogą poczekać do jutra. Słuchaj bez równoczesnego przeglądania wiadomości.", "Close your laptop and note what can wait until tomorrow. Listen without checking messages at the same time."),
  },
  remSculpt: {
    goal: "sleep",
    title: pair("Wieczorne wyciszenie", "Evening stillness"),
    description: pair("Gdy przed snem potrzebujesz dłuższej, uporządkowanej chwili spokoju. Zostaw sobie czas na odpoczynek bez ekranu.", "When you need a longer, structured wind-down before bed. Give yourself time to rest away from the screen."),
    benefit: pair("Pomaga zbudować regularną przestrzeń na wieczorne wyciszenie: bez zadań, rozmów i ciągłego wybierania kolejnych treści.", "Helps you make a regular space for winding down in the evening, free from tasks, conversations and choosing what to watch next."),
    how: pair("Długi, stały rytm 6 Hz kończy się etapem 8 Hz i wygaszeniem. Usunięto dodatkową pulsację głośności. To dłuższy wariant wieczornego odpoczynku; nazwa nie oznacza sterowania fazą REM.", "A long, steady 6 Hz rhythm ends with an 8 Hz stage and a fade. Added amplitude modulation has been removed. This is a longer evening-rest option; its name does not imply control of REM sleep."),
    practice: pair("Wybierz czarny ekran lub nocną formę i odpoczywaj w wygodnej pozycji. Jeśli wolisz dźwięk bez końcowego przyspieszenia, wybierz Hypnos.", "Choose a black screen or night visual and rest comfortably. If you prefer sound without a faster final phase, choose Hypnos."),
  },
  prime: {
    goal: "energy",
    title: pair("Łagodny start", "A gentle start"),
    description: pair("Gdy odkładasz rozpoczęcie i brakuje Ci rozpędu. Wykonaj pierwszy mały krok podczas pięciominutowej sesji.", "When you keep putting off getting started. Take your first small step during a five-minute session."),
    benefit: pair("Mały rytuał startowy zamienia czekanie na odpowiedni moment w konkretny początek. Wybierz pięć minut na pierwsze konkretne działanie, z równym dźwiękiem w tle.", "A small starting ritual turns waiting for the right moment into a concrete beginning. Choose five minutes for your first concrete action, with a steady sound in the background."),
    how: pair("Pięć minut stałych dudnień 15 Hz. Zamiast przyspieszającego wstępu masz od razu rytm, którego użyto podczas zadania pamięciowego. Prime i Clarity mają ten sam sygnał; różnią się proponowanym sposobem użycia.", "Five minutes of steady 15 Hz beats. Instead of an accelerating introduction, the rhythm used during a memory task is present from the start. Prime and Clarity share the same signal and suggest different uses."),
    practice: pair("Rozpocznij małe zadanie już podczas słuchania: otwórz dokument, zapisz pierwsze zdanie lub uporządkuj materiały. Badanie dotyczyło pracy podczas bodźca, nie zastrzyku energii po nim.", "Start a small task while listening: open a document, write the first sentence or organise your materials. The study tested work during the stimulus, not an energy boost afterwards."),
  },
  overdrive: {
    goal: "energy",
    title: pair("Krótki rytm gamma", "A short gamma rhythm"),
    description: pair("Gdy chcesz sprawdzić, czy rytm gamma pomaga Ci pozostać przy zadaniu. Krótka próba 40 Hz przed wyborem dłuższego bloku.", "When you want to find out whether a gamma rhythm helps you stay with a task. A short 40 Hz trial before choosing a longer block."),
    benefit: pair("Pozwala porównać szybki rytm 40 Hz z 15 Hz w Prime, bez rezerwowania pół godziny. Wybór zależy od komfortu i tego, czy dźwięk pomaga w Twoim zadaniu.", "Compare a fast 40 Hz rhythm with Prime’s 15 Hz without setting aside half an hour. Choose according to comfort and whether the sound helps with your task."),
    how: pair("Stałe dudnienia 40 Hz powstają z tonów 320 i 360 Hz. Nie nakładamy na nie dodatkowej pulsacji głośności. Pięć minut pozwala poznać ten bodziec; pozytywne badanie uwagi używało około 33 minut podczas zadania.", "Steady 40 Hz beats arise from 320 and 360 Hz tones. No amplitude pulses are layered on top. Five minutes lets you try this stimulus; the positive attention experiment used about 33 minutes during a task."),
    practice: pair("Wybierz małe zadanie wykonywane podczas słuchania. Jeżeli tony Cię rozpraszają, zmniejsz ich poziom lub pozostaw samo tło.", "Choose a small task to do while listening. If the tones distract you, lower their level or use the background alone."),
  },
  gammaLift: {
    goal: "energy",
    title: pair("Dłuższy rytm gamma", "A longer gamma rhythm"),
    description: pair("Gdy chcesz wypróbować rytm gamma podczas dłuższego zadania. Stałe 40 Hz przez 33 minuty, z łagodnym początkiem i zakończeniem.", "When you want to try a gamma rhythm during a longer task. Steady 40 Hz for 33 minutes, with a gentle opening and ending."),
    benefit: pair("Daje czas na pracę przy niezmiennym rytmie gamma, zamiast przełączania utworów. Wybierz ją, jeśli krótka próba Overdrive była komfortowa i chcesz sprawdzić ten sam bodziec podczas dłuższego zadania.", "Gives you time to work with a constant gamma rhythm instead of changing tracks. Choose it if the short Overdrive trial felt comfortable and you want to try the same stimulus during a longer task."),
    how: pair("Tony 320 i 360 Hz tworzą 40 Hz przez całą sesję, bez dodatkowej modulacji głośności. Para tonów i 33-minutowy czas odpowiadają wariantowi od początku zadania w badaniu uwagi. Poziom dźwięku i tło dobierasz samodzielnie.", "320 and 360 Hz tones produce 40 Hz throughout, without added amplitude modulation. The tone pair and 33-minute duration match the task-onset condition in an attention study. You choose sound level and background yourself."),
    practice: pair("Zacznij zadanie równocześnie z sesją. Badano uwagę podczas słuchania, nie odległy efekt po zakończeniu. Możesz przerwać wcześniej; nie musisz wytrzymywać dźwięku, który Ci przeszkadza.", "Start your task with the session. Research measured attention while listening, not a delayed effect afterwards. You can stop early; there is no need to tolerate distracting sound."),
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
  flow90: pair("Trzy 25-minutowe bloki pracy przeplatane pięciominutowymi przerwami. Czas służy organizacji pracy, nie określa dawki stymulacji.", "Three 25-minute work blocks interleaved with five-minute breaks. The timing structures work rather than defining a stimulation dose."),
  socialUpgrade: pair("Przed ważną rozmową: najpierw skieruj uwagę na spotkanie, potem daj sobie czas na odpuszczenie napięcia.", "Before an important conversation: first bring your attention to the meeting, then give yourself time to let go of tension."),
  sleepReset: pair("Gdy trudno odłożyć sprawy dnia: zacznij od spokojnej przerwy, a potem przejdź do dłuższego wieczornego odpoczynku z Hypnos.", "When it is hard to put the day aside: begin with a quiet break, then move into a longer evening wind-down with Hypnos."),
  powerNap45: pair("Na odpoczynek w środku dnia: wyciszenie, czas na leżenie lub drzemkę i zakończenie, do którego wrócisz, gdy zechcesz.", "For a daytime rest: unwind, take time to lie down or nap, and return to a closing stage when you are ready."),
  creativeBloom: pair("Gdy chcesz przejść od zamiaru do twórczej pracy: zbierz uwagę, poświęć dłuższy blok jednemu pomysłowi i zakończ odpoczynkiem.", "To move from intention into creative work: gather your attention, dedicate a longer block to one idea and finish with a rest."),
};
