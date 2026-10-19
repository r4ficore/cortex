import { icon } from "./i18n.js";
import { publicSite } from "./campaign.js";
const image = (name, alt, hero = false) =>
  `<img src="assets/images/marketing/${name}-${hero ? 960 : 480}.webp" srcset="assets/images/marketing/${name}-${hero ? 640 : 480}.webp ${hero ? 640 : 480}w, assets/images/marketing/${name}-${hero ? 960 : 900}.webp ${hero ? 960 : 900}w${hero ? ", assets/images/marketing/hero-1440.webp 1440w" : ""}" sizes="${hero ? "(min-width: 1000px) 58vw, 100vw" : "(min-width: 800px) 32vw, 100vw"}" width="1536" height="1024" alt="${alt}" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
export function marketingBody(lang) {
  const l = (pl, en) => (lang === "en" ? en : pl);
  const url = (id) =>
    `index.html?start=${id}&amp;lang=${lang}#ritual/${id === "break" ? "reset" : id}`;
  const app = `index.html?lang=${lang}`;
  const cta = `<a class="m-btn m-primary" href="${url("break")}">${l("Zacznij od 3 minut", "Start with 3 minutes")} ${icon("arrow", 18)}</a>`;
  const moments = [
    [
      "work",
      "01",
      l("Zaczynam pracę", "Time to focus"),
      l(
        "Gdy uwaga ucieka do kolejnej karty: ustaw 15 minut i zajmij się jednym zadaniem. Ciągłe tło bez słów nie wymaga wybierania następnego utworu.",
        "When another tab keeps pulling you away: set aside 15 minutes for one task. Continuous, wordless sound means no next track to choose.",
      ),
      l("15 min · skupienie", "15 min · focus"),
      l("Otwórz sesję skupienia", "Open a focus session"),
      l(
        "Osoba przy biurku z notesem i zamkniętym laptopem w porannym świetle.",
        "A person at a desk with a notebook and closed laptop in morning light.",
      ),
    ],
    [
      "break",
      "02",
      l("Potrzebuję przerwy", "A little reset"),
      l(
        "Po spotkaniu, przed trudną rozmową, między zadaniami. Zamień kolejne trzy minuty przewijania na spokojny oddech z dłuższym wydechem.",
        "After a meeting, before a difficult conversation, between tasks. Trade three more minutes of scrolling for gentle breathing with a longer exhale.",
      ),
      l("3 min · oddech", "3 min · breathing"),
      l("Otwórz ćwiczenie oddechu", "Open a breathing exercise"),
      l(
        "Osoba siedząca przy otwartym oknie podczas spokojnej przerwy od pracy.",
        "A person sitting beside an open window during a quiet break from work.",
      ),
    ],
    [
      "evening",
      "03",
      l("Kończę dzień", "Let the day go"),
      l(
        "Kiedy praca się skończyła, ale myśli wciąż krążą wokół niej. Stonowany dźwięk, czarny ekran i łagodne zakończenie pomagają stworzyć spokojniejszy wieczorny rytuał.",
        "When work is over but your thoughts are still there. Subdued sound, a black screen and a gradual fade help you build a calmer evening routine.",
      ),
      l("30 min · wieczór", "30 min · evening"),
      l("Otwórz sesję wieczorną", "Open an evening session"),
      l(
        "Osoba odkładająca laptop przy ciepłym świetle lampki o zmierzchu.",
        "A person putting a laptop aside in warm lamplight at dusk.",
      ),
    ],
  ];
  const paths = [
    [
      "breath",
      l("Oddech", "Breathe"),
      l("Zwolnij, kiedy napięcie rośnie.", "Slow down when tension builds."),
      l(
        "Cztery sekundy wdechu, sześć wydechu. Prowadzenie wizualne i opcjonalny dźwięk oddechu odmierzają fazy, żebyś mógł skupić się na oddychaniu, zamiast liczyć. To prosty sposób na ćwiczenie spokojniejszego rytmu.",
        "Four seconds in, six seconds out. Visual guidance and optional breath sounds pace each phase, so you can concentrate on breathing instead of counting. A simple way to practise a steadier rhythm.",
      ),
      l("Oddech 4–6 · 3 min", "4–6 breathing · 3 min"),
      url("break"),
    ],
    [
      "focus",
      l("Skupienie", "Focus"),
      l("Zostań przy jednym zadaniu.", "Stay with one task."),
      l(
        "Deep Focus łączy stabilne tony z dyskretnym tłem bez słów. Wyznaczasz blok pracy i zostajesz z jednym, ciągłym brzmieniem — bez zmiany utworów i szukania kolejnej playlisty.",
        "Deep Focus combines steady tones with a discreet, wordless background. Set a work block and stay with one continuous sound, without track changes or searching for another playlist.",
      ),
      l("Deep Focus · 15 min", "Deep Focus · 15 min"),
      url("work"),
    ],
    [
      "calm",
      l("Wyciszenie", "Unwind"),
      l(
        "Odpocznij od nadmiaru bodźców.",
        "Take a break from sensory overload.",
      ),
      l(
        "Equilibrium łączy równomierne tony z ciepłym, miękkim tłem. Łagodne przejścia pozwalają odpoczywać bez nagłych zmian brzmienia. Jeśli chcesz, zacznij od minuty prowadzonego oddechu.",
        "Equilibrium pairs steady tones with a warm, soft background. Gentle transitions give you a break from sudden changes in sound. Add a minute of guided breathing at the start if you like.",
      ),
      l("Equilibrium · 7 min", "Equilibrium · 7 min"),
      `${app}#prepare/equilibrium`,
    ],
    [
      "sleep",
      l("Sen", "Sleep"),
      l(
        "Wyjdź z trybu pracy przed snem.",
        "Leave work mode behind before bed.",
      ),
      l(
        "Hypnos stopniowo przechodzi do niższych tonów i wolniejszego rytmu. Czarny ekran ogranicza światło, a dźwięk łagodnie wygasa na końcu. Wybierz czas i odłóż telefon, zamiast dalej przewijać.",
        "Hypnos gradually moves towards lower tones and a slower beat. A black screen reduces light, and the sound fades gently at the end. Choose a duration and put your phone aside instead of scrolling.",
      ),
      l("Hypnos · 30 min", "Hypnos · 30 min"),
      url("evening"),
    ],
    [
      "energy",
      l("Energia", "Energy"),
      l("Zacznij, gdy trudno ruszyć.", "Get started when it feels difficult."),
      l(
        "Prime ma narastający rytm i jaśniejsze brzmienie. Pięciominutowa sesja wyznacza przejście od przerwy do działania. Gdy wolisz intensywniejszy charakter dźwięku, wybierz Overdrive lub Gamma Lift.",
        "Prime builds its rhythm over a brighter sound background. The five-minute session marks a transition from a break to action. Choose Overdrive or Gamma Lift when you prefer a more intense sound.",
      ),
      l("Prime · 5 min", "Prime · 5 min"),
      `${app}#prepare/prime`,
    ],
  ];
  const mechanisms = [
    [
      "breath",
      l(
        "Oddech i rytm serca są połączone.",
        "Breathing and heart rhythm are connected.",
      ),
      l(
        "Zmieniając tempo oddechu, wpływasz na pracę układu autonomicznego. Rytm 4–6 prowadzi do sześciu oddechów na minutę — tempa wykorzystywanego w badaniach nad regulacją pracy serca.",
        "Changing your breathing pace affects autonomic activity. The 4–6 rhythm guides you to six breaths a minute — a pace used in research on the regulation of heart rhythm.",
      ),
      l(
        "W badaniu 36 osób miesiąc codziennych ćwiczeń w tempie 6 oddechów/min zwiększył wybrane wskaźniki zmienności rytmu serca (HRV) względem grupy kontrolnej.",
        "In a study of 36 people, a month of daily practice at six breaths a minute increased selected measures of heart rate variability (HRV) compared with a control group.",
      ),
      [["Tharion et al., 2012", "https://pubmed.ncbi.nlm.nih.gov/23029969/"]],
    ],
    [
      "focus",
      l("Rytm angażuje układ słuchowy.", "Rhythm engages the auditory system."),
      l(
        "Nieco inne tony w lewym i prawym uchu tworzą wrażenie pulsacji — dudnienie binauralne. Cortex łączy je z zaplanowanymi zmianami brzmienia i poziomu dźwięku. Dzięki temu sesje mają różny przebieg, od stabilnego tła po narastający rytm.",
        "Slightly different tones in the left and right ear create a perceived pulse — a binaural beat. Cortex combines these with planned changes in tone and level, giving sessions different progressions, from a steady background to a building rhythm.",
      ),
      l(
        "W 30-minutowym badaniu 29 osób rytmy 16/24 Hz wiązały się z większą liczbą trafnych reakcji i mniejszą liczbą fałszywych alarmów niż rytmy 1,5/4 Hz. Wynik dotyczył konkretnego zadania czujności.",
        "In a 30-minute study of 29 people, 16/24 Hz beats were associated with more correct detections and fewer false alarms than 1.5/4 Hz beats. The result concerned a specific vigilance task.",
      ),
      [
        ["Lane et al., 1998", "https://pubmed.ncbi.nlm.nih.gov/9423966/"],
        [
          "Orozco Perez et al., 2020",
          "https://www.eneuro.org/content/7/2/ENEURO.0232-19.2020",
        ],
      ],
    ],
    [
      "calm",
      l(
        "Brzmienie ma znaczenie dla wyciszenia.",
        "Sound character matters for unwinding.",
      ),
      l(
        "Na przerwę wybierasz inne bodźce niż na początek pracy. Ścieżka Wyciszenie korzysta z cieplejszego tła i wolniejszych przejść. Głośność tonów oraz tła ustawiasz osobno, więc możesz dopasować brzmienie do swojego komfortu.",
        "A break calls for different sounds from the start of a work session. The Unwind path uses a warmer background and slower transitions. Separate tone and background controls let you adjust the sound to your comfort.",
      ),
      l(
        "W badaniu Mallika i Russo 163 osoby przyjmujące leki przeciwlękowe słuchały przez 24 minuty muzyki, rytmów theta, ich połączenia lub szumu. U osób o umiarkowanej skłonności do lęku połączenie muzyki i rytmów silniej zmniejszało poznawcze objawy lęku niż pozostałe warunki.",
        "In Mallik and Russo’s study, 163 people taking anxiety medication listened to music, theta beats, both together or noise for 24 minutes. In the moderate trait-anxiety subgroup, the combination reduced cognitive state anxiety more than the other conditions.",
      ),
      [
        [
          "Mallik &amp; Russo, 2022",
          "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0259312",
        ],
      ],
    ],
    [
      "sleep",
      l(
        "Wieczorem znaczenie ma też światło.",
        "In the evening, light matters too.",
      ),
      l(
        "Światło docierające do oczu jest sygnałem dla zegara biologicznego. Dlatego wieczorna propozycja Cortex otwiera się z czarnym ekranem, stonowanym dźwiękiem i łagodnym wygaszeniem na końcu. Możesz słuchać bez patrzenia w jasny interfejs.",
        "Light reaching your eyes is a signal to your body clock. Cortex’s evening preset therefore starts with a black screen, subdued sound and a gradual fade at the end. You can listen without watching a bright interface.",
      ),
      l(
        "W badaniu 12 osób czytanie na świecącym ekranie przez 4 godziny przed snem, przez 5 wieczorów, opóźniało rytm melatoniny i zasypianie względem książki papierowej.",
        "In a study of 12 people, reading on a light-emitting screen for four hours before bed over five evenings delayed melatonin timing and sleep onset compared with a printed book.",
      ),
      [
        [
          "Chang et al., 2015",
          "https://pmc.ncbi.nlm.nih.gov/articles/PMC4313820/",
        ],
      ],
    ],
  ];
  const faq = [
    [
      l("Czy potrzebuję konta?", "Do I need an account?"),
      l(
        "Nie. Otwierasz Cortex, wybierasz sesję i zaczynasz. Historia i zapisane ustawienia pozostają w przeglądarce na Twoim urządzeniu. Możesz je wyeksportować w ustawieniach.",
        "No. Open Cortex, choose a session and begin. Your history and saved settings stay in the browser on your device. You can export them from Settings.",
      ),
    ],
    [
      l("Czy Cortex działa na telefonie?", "Does Cortex work on my phone?"),
      l(
        "Tak, w przeglądarce. Na iPhonie otwórz aplikację w Safari, wybierz Udostępnij → Dodaj do ekranu początkowego. Na Androidzie użyj opcji Zainstaluj aplikację lub Dodaj do ekranu głównego. System telefonu może przerwać dźwięk po zablokowaniu ekranu.",
        "Yes, in your browser. On iPhone, open the app in Safari, choose Share → Add to Home Screen. On Android, choose Install app or Add to Home screen. Your phone may interrupt audio when the screen is locked.",
      ),
    ],
    [
      l("Czy potrzebuję słuchawek?", "Do I need headphones?"),
      l(
        "Do samego prowadzenia oddechu nie są potrzebne. Sesje z tonami binauralnymi wymagają słuchawek stereo. Zacznij od komfortowej, niewielkiej głośności.",
        "Visual breathing guidance works without headphones. Sessions with binaural tones require stereo headphones. Start at a comfortable, low volume.",
      ),
    ],
    [
      l("Czy działa bez internetu?", "Does it work offline?"),
      l(
        "Aplikacja może działać offline po przygotowaniu jej zasobów podczas pierwszego wejścia z internetem. Gotowość sprawdzisz w ustawieniach. Przeglądarka może usunąć zapisane zasoby; ilustracje tej strony wymagają połączenia.",
        "The app can work offline after its resources are prepared during an online visit. Check readiness in Settings. Your browser may remove saved resources; the illustrations on this page require a connection.",
      ),
    ],
    [
      l("Od której sesji zacząć?", "Where should I start?"),
      l(
        "Od trzech minut łagodnego oddechu 4–6: cztery sekundy wdechu, sześć wydechu. Oddychaj wygodnie, bez wymuszania tempa i głębokości. Jeśli rytm jest niewygodny, wróć do naturalnego oddechu. W każdej chwili możesz przerwać.",
        "Try three minutes of gentle 4–6 breathing: four seconds in, six seconds out. Breathe comfortably without forcing your pace or depth. Return to your natural rhythm if it feels uncomfortable. You can stop at any time.",
      ),
    ],
  ];
  return `<a class="m-skip" href="#main">${l("Przejdź do treści", "Skip to content")}</a>
<header class="m-header m-wrap"><a class="m-brand" href="${app}" aria-label="Cortex"><img src="assets/images/cortex-mark.svg" width="34" height="34" alt="">cortex<span class="m-brand-dot"></span></a><nav class="m-nav" aria-label="${l("Na tej stronie", "On this page")}"><a href="#how-it-works">${l("Jak działa", "How it works")}</a><a href="#moments">${l("Na co masz chwilę", "Find your moment")}</a></nav><div class="m-header-actions"><a class="m-language" href="${lang === "pl" ? "landing-en.html" : "landing.html"}" lang="${lang === "pl" ? "en" : "pl"}" hreflang="${lang === "pl" ? "en" : "pl"}" aria-label="${l("Read in English", "Czytaj po polsku")}">${l("EN", "PL")}</a><a class="m-btn m-header-open" href="${app}">${l("Otwórz Cortex", "Open Cortex")} ${icon("arrow", 16)}</a></div></header>
<main id="main">
<section class="m-hero m-wrap"><div class="m-hero-copy"><p class="m-eyebrow"><span></span>${l("ODDECH. DŹWIĘK. TWOJA CHWILA.", "BREATH. SOUND. YOUR MOMENT.")}</p><h1>${l("Mniej napięcia.<br>Więcej <em>skupienia.</em>", "Less tension.<br>More <em>focus.</em>")}</h1><p class="m-lead">${l("Gdy trudno się skupić albo zwolnić po całym dniu, zacznij od oddechu i dźwięku. Cortex prowadzi Cię przez spokojny rytm oddychania i sesje dopasowane do pracy, wyciszenia, snu lub wejścia w działanie.", "When it is hard to focus or slow down after a long day, start with breathing and sound. Cortex guides you through a steady breathing rhythm and sessions designed for work, unwinding, bedtime or getting started.")}</p><div class="m-hero-actions">${cta}<a class="m-text-link" href="#how-it-works">${l("Zobacz, jak to działa", "See how it works")} <span aria-hidden="true">↓</span></a></div><ul class="m-benefits"><li>${l("Bez zakładania konta", "No account needed")}</li><li>${l("W przeglądarce", "In your browser")}</li><li>${l("Historia na Twoim urządzeniu", "History on your device")}</li></ul></div><figure class="m-hero-art">${image("hero", l("Osoba odpoczywa w szałwiowym fotelu przy otwartym oknie. Lekka zasłona porusza się na wietrze.", "A person resting in a sage armchair by an open window, with a light curtain in the breeze."), true)}<figcaption><span class="m-small-line"></span>${l("Twój czas. Twoje tempo.", "Your time. Your pace.")}</figcaption></figure></section>
<section id="how-it-works" class="m-demo-section m-wrap m-section"><div class="m-demo-copy"><p class="m-eyebrow">${l("ZACZNIJ OD MAŁEJ CHWILI", "START WITH A SMALL MOMENT")}</p><h2>${l("Zacznij od oddechu.<br>Daj napięciu odpuścić.", "Start with your breath.<br>Give tension room to ease.")}</h2><p>${l("Wdech przez 4 sekundy, wydech przez 6. Taki rytm spowalnia oddech do sześciu cykli na minutę. Podążasz za formą i kierujesz uwagę na ciało — Cortex odmierza czas za Ciebie.", "Breathe in for 4 seconds and out for 6. This pace brings your breathing to six cycles a minute. Follow the shape and bring your attention to your body — Cortex keeps time for you.")}</p><p class="m-comfort">${l("Oddychaj wygodnie. Nie wymuszaj tempa ani głębokości.", "Breathe comfortably. Don’t force your pace or depth.")}</p><a class="m-text-link" href="${url("break")}">${l("Przejdź do pełnych 3 minut", "Continue to the full 3 minutes")} ${icon("arrow", 18)}</a></div><div id="breath-demo" class="m-demo" data-state="idle"><div class="m-demo-top"><span>${l("DWA SPOKOJNE ODDECHY", "TWO GENTLE BREATHS")}</span><span>4 : 6</span></div><div class="m-breath-stage"><div class="m-breath-guide" aria-hidden="true"></div><div id="demoForm" class="m-breath-form" aria-hidden="true"><span></span><span></span><span></span></div></div><div class="m-phase"><span id="demoPhase" aria-live="polite">${l("W Twoim rytmie", "At your pace")}</span><span id="demoSeconds" aria-hidden="true"></span></div><button id="demoToggle" class="m-btn m-primary" disabled>${l("Spróbuj · 20 sekund", "Try it · 20 seconds")}</button><p id="demoStatus" class="m-demo-status">${l("Dwa cykle. Bez dźwięku.", "Two cycles. No sound.")}</p><noscript><p>${l("Demonstracja wymaga JavaScript. Pełne ćwiczenie otworzysz przyciskiem obok.", "The demo needs JavaScript. Use the link beside it to open the full exercise.")}</p></noscript></div></section>
<section id="moments" class="m-moments m-wrap m-section"><div class="m-section-intro"><p class="m-eyebrow">${l("W RYTMIE TWOJEGO DNIA", "IN THE RHYTHM OF YOUR DAY")}</p><h2>${l("Na co masz teraz chwilę?", "What do you have a moment for?")}</h2><p>${l("Przed pierwszym zadaniem. Pomiędzy spotkaniami. Kiedy dzień dobiega końca.", "Before the first task. Between meetings. As the day comes to a close.")}</p></div><div class="m-moment-grid">${moments.map(([id, number, title, desc, time, label, alt]) => `<article class="m-moment">${image(id, alt)}<div class="m-moment-meta"><span>${number}</span><span>${time}</span></div><h3>${title}</h3><p>${desc}</p><div class="m-moment-actions"><a class="m-text-link" href="${url(id)}">${label} ${icon("arrow", 17)}</a><button class="m-share" data-share="${id}" hidden aria-label="${l("Udostępnij", "Share")}: ${title}">${l("Udostępnij", "Share")}</button></div><div class="share-result"></div></article>`).join("")}</div></section>
<section id="why-it-works" class="m-mechanisms m-wrap m-section"><div class="m-section-intro"><p class="m-eyebrow">${l("CO DZIEJE SIĘ W ORGANIZMIE", "WHAT HAPPENS IN THE BODY")}</p><h2>${l("Rytm ma znaczenie.", "Rhythm makes a difference.")}</h2><p>${l("Oddech, pulsacja dźwięku i światło oddziałują na różne procesy. Dlatego Cortex dobiera je do sytuacji, w której chcesz z niego korzystać.", "Breathing, sound pulses and light interact with different processes. Cortex brings them together according to how you want to use a session.")}</p></div><div class="m-mechanism-grid">${mechanisms.map(([id, title, desc, evidence, sources]) => `<article class="m-mechanism"><span class="m-path-icon">${icon(id, 28)}</span><h3>${title}</h3><p>${desc}</p><div class="m-research"><p>${evidence}</p><div class="m-source-links">${sources.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label} ↗</a>`).join("")}</div></div></article>`).join("")}</div><a class="m-text-link m-science-link" href="${l("whitepaper-pl.html", "whitepaper.html")}">${l("Poznaj parametry sesji i pełne omówienie badań", "Explore session parameters and the full research review")} ${icon("arrow", 18)}</a></section>
<section class="m-product-section"><div class="m-wrap m-product"><div class="m-product-copy"><p class="m-eyebrow">${l("PROSTO. OD PIERWSZEJ CHWILI.", "SIMPLE. FROM THE FIRST MOMENT.")}</p><h2>${l("Tak wygląda<br>Twoja chwila.", "This is what<br>your moment looks like.")}</h2><p>${l("Wybierasz sesję. Dopasowujesz ją, jeśli chcesz. Zaczynasz. Wszystko, czego potrzebujesz, jest pod ręką.", "Choose a session. Adjust it if you like. Begin. Everything you need stays within reach.")}</p><ol class="m-product-steps"><li><span>01</span><div><strong>${l("Wybierz potrzebę", "Choose an intention")}</strong><p>${l("Pięć ścieżek i gotowe propozycje.", "Five paths and ready-to-start sessions.")}</p></div></li><li><span>02</span><div><strong>${l("Zostań na chwilę", "Take a moment")}</strong><p>${l("Oddech, dźwięk i czytelne prowadzenie.", "Breathing, sound and clear guidance.")}</p></div></li><li><span>03</span><div><strong>${l("Wracaj po swojemu", "Come back your way")}</strong><p>${l("Zapisz ulubioną sesję na kolejny dzień.", "Save a favourite session for another day.")}</p></div></li></ol><a class="m-text-link" href="${app}">${l("Zajrzyj do Cortex", "Explore Cortex")} ${icon("arrow", 18)}</a></div><div class="m-devices"><figure class="m-device m-device-setup"><img src="assets/images/marketing/setup-${lang}.webp" width="390" height="780" loading="lazy" alt="${l("Rzeczywisty ekran przygotowania trzyminutowej przerwy w Cortex.", "The actual Cortex preparation screen for a three-minute break.")}"><figcaption>${l("Wybierz swoją chwilę", "Choose your moment")}</figcaption></figure><figure class="m-device m-device-player"><img src="assets/images/marketing/player-${lang}.webp" width="390" height="780" loading="lazy" alt="${l("Rzeczywisty odtwarzacz ćwiczenia oddechowego Cortex.", "The actual Cortex breathing exercise player.")}"><figcaption>${l("Podążaj za oddechem", "Follow your breath")}</figcaption></figure></div></div></section>
<section id="paths" class="m-paths-section m-wrap m-section"><div class="m-section-intro"><p class="m-eyebrow">${l("JEDNA PRZESTRZEŃ. PIĘĆ ŚCIEŻEK.", "ONE SPACE. FIVE PATHS.")}</p><h2>${l("Pięć potrzeb. Pięć różnych sesji.", "Five needs. Five different sessions.")}</h2></div><div class="m-paths">${paths.map(([id, title, benefit, desc, label, href]) => `<article class="m-path" data-goal="${id}"><div class="m-path-heading"><span class="m-path-icon">${icon(id, 26)}</span><h3>${title}</h3></div><div class="m-path-copy"><h4>${benefit}</h4><p>${desc}</p><a class="m-text-link" href="${href}">${label} ${icon("arrow", 17)}</a></div></article>`).join("")}</div></section>
<section class="m-trust m-wrap m-section"><div class="m-trust-title"><img src="assets/images/cortex-mark.svg" width="58" height="58" alt=""><h2>${l("Dopasuj bodźce.<br>Zostań przy swoim rytmie.", "Adjust the sound.<br>Find your own rhythm.")}</h2></div><div class="m-trust-copy"><article><h3>${l("Twoja historia zostaje przy Tobie.", "Your history stays with you.")}</h3><p>${l("Sesje i ustawienia zapisują się na Twoim urządzeniu. Bez konta i obowiązkowej ankiety na wejściu.", "Sessions and settings are saved on your device. No account or compulsory questionnaire to get started.")}</p><a class="m-text-link" href="${l("guide-pl.html", "guide.html")}">${l("Jak korzystać z Cortex", "How to use Cortex")} ${icon("arrow", 16)}</a></article><article><h3>${l("Ty decydujesz, ile bodźców.", "You choose how much stimulation.")}</h3><p>${l("Osobno ustawiasz głośność tonów, tła i prowadzenia oddechu. Wybierasz spokojną wizualizację albo czarny ekran. Zapisujesz swój zestaw i następnym razem wracasz do niego bez ponownego ustawiania.", "Adjust tones, background and breathing guidance separately. Choose a calm visual or a black screen. Save your setup and return to it next time without starting from scratch.")}</p><a class="m-text-link" href="#paths">${l("Zobacz, jak dobrać sesję", "Find the right session")} ${icon("arrow", 16)}</a></article></div></section>
<section class="m-faq m-wrap m-section"><div><p class="m-eyebrow">${l("ZANIM ZACZNIESZ", "BEFORE YOU BEGIN")}</p><h2>${l("Dobrze wiedzieć.", "Good to know.")}</h2></div><div>${faq.map(([q, a]) => `<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join("")}</div></section>
<section class="m-closing m-wrap"><p class="m-eyebrow">${l("TA CHWILA MOŻE BYĆ TWOJA", "THIS MOMENT CAN BE YOURS")}</p><h2>${l("Reszta dnia może<br>chwilę poczekać.", "The rest of the day<br>can wait a moment.")}</h2>${cta}<p>${l("Trzy minuty. Bez zakładania konta.", "Three minutes. No account needed.")}</p></section>
</main><footer class="m-footer m-wrap"><a class="m-brand" href="${app}"><img src="assets/images/cortex-mark.svg" width="28" height="28" alt="">cortex</a><span>${l("Twój czas. Twoje tempo.", "Your time. Your pace.")}</span><div><a href="${l("guide-pl.html", "guide.html")}">${l("Przewodnik", "Guide")}</a><a href="${l("whitepaper-pl.html", "whitepaper.html")}">${l("Podstawy naukowe", "The science")}</a><a href="${app}">${l("Otwórz aplikację", "Open the app")}</a></div></footer>`;
}
export function marketingHTML(lang) {
  const en = lang === "en";
  const file = en ? "landing-en.html" : "landing.html";
  const title = en
    ? "Cortex — breathing and sound for focus and calm"
    : "Cortex — oddech i dźwięk do skupienia i wyciszenia";
  const description = en
    ? "Ease into a calmer breathing rhythm, set aside time to focus and wind down before bed. Five paths, guided breathing and tailored sound. Start with 3 minutes."
    : "Zwolnij oddech, zrób miejsce na skupienie i wycisz wieczór. Pięć ścieżek, prowadzone ćwiczenia i dopasowane sesje dźwiękowe. Zacznij od 3 minut.";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f7f8f5"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${publicSite}${file}"><link rel="alternate" hreflang="pl" href="${publicSite}landing.html"><link rel="alternate" hreflang="en" href="${publicSite}landing-en.html"><link rel="alternate" hreflang="x-default" href="${publicSite}landing.html"><meta property="og:type" content="website"><meta property="og:site_name" content="Cortex"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${publicSite}${file}"><meta property="og:locale" content="${en ? "en_US" : "pl_PL"}"><meta property="og:image" content="${publicSite}social/cortex-${lang}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${title}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${publicSite}social/cortex-${lang}.jpg"><link rel="icon" href="assets/images/cortex-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/css/marketing.css"><script type="module" src="assets/js/landing.js"></script></head><body class="marketing-body">${marketingBody(lang)}</body></html>`;
}
