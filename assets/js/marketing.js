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
        "Jedno zadanie. Trochę miejsca na myśli. Dźwięk, który może Ci towarzyszyć.",
        "One task. A little room to think. Sound to keep you company.",
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
        "Odsuń na moment listę spraw. Podążaj za spokojnym rytmem wdechu i wydechu.",
        "Set your to-do list aside for a moment. Follow a gentle rhythm of breathing in and out.",
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
        "Zamknij laptop. Wybierz spokojny dźwięk i czarny ekran na koniec dnia.",
        "Close your laptop. Choose quiet sound and a black screen as the day comes to a close.",
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
      l("Znajdź swój rytm.", "Find your rhythm."),
      "prepare/breath",
    ],
    [
      "focus",
      l("Skupienie", "Focus"),
      l("Zrób miejsce na jedno zadanie.", "Make room for one thing."),
      "ritual/work",
    ],
    [
      "calm",
      l("Wyciszenie", "Unwind"),
      l("Daj sobie chwilę przerwy.", "Give yourself a little pause."),
      "ritual/reset",
    ],
    [
      "sleep",
      l("Sen", "Sleep"),
      l("Przygotuj się do odpoczynku.", "Ease into your evening."),
      "ritual/evening",
    ],
    [
      "energy",
      l("Energia", "Energy"),
      l("Znajdź swój początek.", "Find your momentum."),
      "prepare/prime",
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
<section class="m-hero m-wrap"><div class="m-hero-copy"><p class="m-eyebrow"><span></span>${l("ODDECH. DŹWIĘK. TWOJA CHWILA.", "BREATH. SOUND. YOUR MOMENT.")}</p><h1>${l("Zrób sobie<br>chwilę <em>oddechu.</em>", "Make a little<br>room to <em>breathe.</em>")}</h1><p class="m-lead">${l("Prowadzony oddech i sesje dźwiękowe do skupienia, przerwy i wieczornego odpoczynku. Otwórz Cortex i wybierz chwilę dla siebie.", "Guided breathing and sound sessions for focus, a little reset and winding down. Open Cortex and take a moment for yourself.")}</p><div class="m-hero-actions">${cta}<a class="m-text-link" href="#how-it-works">${l("Zobacz, jak to działa", "See how it works")} <span aria-hidden="true">↓</span></a></div><ul class="m-benefits"><li>${l("Bez zakładania konta", "No account needed")}</li><li>${l("W przeglądarce", "In your browser")}</li><li>${l("Historia na Twoim urządzeniu", "History on your device")}</li></ul></div><figure class="m-hero-art">${image("hero", l("Osoba odpoczywa w szałwiowym fotelu przy otwartym oknie. Lekka zasłona porusza się na wietrze.", "A person resting in a sage armchair by an open window, with a light curtain in the breeze."), true)}<figcaption><span class="m-small-line"></span>${l("Twój czas. Twoje tempo.", "Your time. Your pace.")}</figcaption></figure></section>
<section id="how-it-works" class="m-demo-section m-wrap m-section"><div class="m-demo-copy"><p class="m-eyebrow">${l("ZACZNIJ OD MAŁEJ CHWILI", "START WITH A SMALL MOMENT")}</p><h2>${l("Nie musisz od razu<br>zmieniać całego dnia.", "You don’t have to<br>change your whole day.")}</h2><p>${l("Wystarczy miejsce na jeden spokojny oddech. Zobacz, jak Cortex prowadzi Cię przez wdech i wydech.", "Just make room for one gentle breath. See how Cortex guides you through breathing in and out.")}</p><p class="m-comfort">${l("Oddychaj wygodnie. Nie wymuszaj tempa ani głębokości.", "Breathe comfortably. Don’t force your pace or depth.")}</p><a class="m-text-link" href="${url("break")}">${l("Przejdź do pełnych 3 minut", "Continue to the full 3 minutes")} ${icon("arrow", 18)}</a></div><div id="breath-demo" class="m-demo" data-state="idle"><div class="m-demo-top"><span>${l("DWA SPOKOJNE ODDECHY", "TWO GENTLE BREATHS")}</span><span>4 : 6</span></div><div class="m-breath-stage"><div class="m-breath-guide" aria-hidden="true"></div><div id="demoForm" class="m-breath-form" aria-hidden="true"><span></span><span></span><span></span></div></div><div class="m-phase"><span id="demoPhase" aria-live="polite">${l("W Twoim rytmie", "At your pace")}</span><span id="demoSeconds" aria-hidden="true"></span></div><button id="demoToggle" class="m-btn m-primary" disabled>${l("Spróbuj · 20 sekund", "Try it · 20 seconds")}</button><p id="demoStatus" class="m-demo-status">${l("Dwa cykle. Bez dźwięku.", "Two cycles. No sound.")}</p><noscript><p>${l("Demonstracja wymaga JavaScript. Pełne ćwiczenie otworzysz przyciskiem obok.", "The demo needs JavaScript. Use the link beside it to open the full exercise.")}</p></noscript></div></section>
<section id="moments" class="m-moments m-wrap m-section"><div class="m-section-intro"><p class="m-eyebrow">${l("W RYTMIE TWOJEGO DNIA", "IN THE RHYTHM OF YOUR DAY")}</p><h2>${l("Na co masz teraz chwilę?", "What do you have a moment for?")}</h2><p>${l("Przed pierwszym zadaniem. Pomiędzy spotkaniami. Kiedy dzień dobiega końca.", "Before the first task. Between meetings. As the day comes to a close.")}</p></div><div class="m-moment-grid">${moments.map(([id, number, title, desc, time, label, alt]) => `<article class="m-moment">${image(id, alt)}<div class="m-moment-meta"><span>${number}</span><span>${time}</span></div><h3>${title}</h3><p>${desc}</p><div class="m-moment-actions"><a class="m-text-link" href="${url(id)}">${label} ${icon("arrow", 17)}</a><button class="m-share" data-share="${id}" hidden aria-label="${l("Udostępnij", "Share")}: ${title}">${l("Udostępnij", "Share")}</button></div><div class="share-result"></div></article>`).join("")}</div></section>
<section class="m-product-section"><div class="m-wrap m-product"><div class="m-product-copy"><p class="m-eyebrow">${l("PROSTO. OD PIERWSZEJ CHWILI.", "SIMPLE. FROM THE FIRST MOMENT.")}</p><h2>${l("Tak wygląda<br>Twoja chwila.", "This is what<br>your moment looks like.")}</h2><p>${l("Wybierasz sesję. Dopasowujesz ją, jeśli chcesz. Zaczynasz. Wszystko, czego potrzebujesz, jest pod ręką.", "Choose a session. Adjust it if you like. Begin. Everything you need stays within reach.")}</p><ol class="m-product-steps"><li><span>01</span><div><strong>${l("Wybierz potrzebę", "Choose an intention")}</strong><p>${l("Pięć ścieżek i gotowe propozycje.", "Five paths and ready-to-start sessions.")}</p></div></li><li><span>02</span><div><strong>${l("Zostań na chwilę", "Take a moment")}</strong><p>${l("Oddech, dźwięk i czytelne prowadzenie.", "Breathing, sound and clear guidance.")}</p></div></li><li><span>03</span><div><strong>${l("Wracaj po swojemu", "Come back your way")}</strong><p>${l("Zapisz ulubioną sesję na kolejny dzień.", "Save a favourite session for another day.")}</p></div></li></ol><a class="m-text-link" href="${app}">${l("Zajrzyj do Cortex", "Explore Cortex")} ${icon("arrow", 18)}</a></div><div class="m-devices"><figure class="m-device m-device-setup"><img src="assets/images/marketing/setup-${lang}.webp" width="390" height="780" loading="lazy" alt="${l("Rzeczywisty ekran przygotowania trzyminutowej przerwy w Cortex.", "The actual Cortex preparation screen for a three-minute break.")}"><figcaption>${l("Wybierz swoją chwilę", "Choose your moment")}</figcaption></figure><figure class="m-device m-device-player"><img src="assets/images/marketing/player-${lang}.webp" width="390" height="780" loading="lazy" alt="${l("Rzeczywisty odtwarzacz ćwiczenia oddechowego Cortex.", "The actual Cortex breathing exercise player.")}"><figcaption>${l("Podążaj za oddechem", "Follow your breath")}</figcaption></figure></div></div></section>
<section class="m-paths-section m-wrap m-section"><div class="m-section-intro"><p class="m-eyebrow">${l("JEDNA PRZESTRZEŃ. PIĘĆ ŚCIEŻEK.", "ONE SPACE. FIVE PATHS.")}</p><h2>${l("Każdy dzień ma swój rytm.", "Every day has its own rhythm.")}</h2></div><div class="m-paths">${paths.map(([id, title, desc, route]) => `<a href="${app}#${route}" class="m-path" data-goal="${id}"><span class="m-path-icon">${icon(id, 26)}</span><h3>${title}</h3><p>${desc}</p><span class="m-path-arrow" aria-hidden="true">↗</span></a>`).join("")}</div></section>
<section class="m-trust m-wrap m-section"><div class="m-trust-title"><img src="assets/images/cortex-mark.svg" width="58" height="58" alt=""><h2>${l("Spokój również<br>w szczegółach.", "Care in the<br>little things, too.")}</h2></div><div class="m-trust-copy"><article><h3>${l("Twoja historia zostaje przy Tobie.", "Your history stays with you.")}</h3><p>${l("Sesje i ustawienia zapisują się na Twoim urządzeniu. Bez konta i obowiązkowej ankiety na wejściu.", "Sessions and settings are saved on your device. No account or compulsory questionnaire to get started.")}</p><a class="m-text-link" href="${l("guide-pl.html", "guide.html")}">${l("Jak korzystać z Cortex", "How to use Cortex")} ${icon("arrow", 16)}</a></article><article><h3>${l("Ciekawość i uczciwe wyjaśnienia.", "Curiosity and honest explanations.")}</h3><p>${l("Opisujemy, co wiemy o oddechu i dźwięku. Badania nad technikami nie są badaniami tej wersji Cortex — nie obiecujemy konkretnego efektu zdrowotnego.", "We explain what is known about breathing and sound. Research on these techniques is not research on this version of Cortex — we don’t promise a particular health outcome.")}</p><a class="m-text-link" href="${l("whitepaper-pl.html", "whitepaper.html")}">${l("Poznaj podstawy i źródła", "Read the background and sources")} ${icon("arrow", 16)}</a></article></div></section>
<section class="m-faq m-wrap m-section"><div><p class="m-eyebrow">${l("ZANIM ZACZNIESZ", "BEFORE YOU BEGIN")}</p><h2>${l("Dobrze wiedzieć.", "Good to know.")}</h2></div><div>${faq.map(([q, a]) => `<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join("")}</div></section>
<section class="m-closing m-wrap"><p class="m-eyebrow">${l("TA CHWILA MOŻE BYĆ TWOJA", "THIS MOMENT CAN BE YOURS")}</p><h2>${l("Reszta dnia może<br>chwilę poczekać.", "The rest of the day<br>can wait a moment.")}</h2>${cta}<p>${l("Trzy minuty. Bez zakładania konta.", "Three minutes. No account needed.")}</p></section>
</main><footer class="m-footer m-wrap"><a class="m-brand" href="${app}"><img src="assets/images/cortex-mark.svg" width="28" height="28" alt="">cortex</a><span>${l("Twój czas. Twoje tempo.", "Your time. Your pace.")}</span><div><a href="${l("guide-pl.html", "guide.html")}">${l("Przewodnik", "Guide")}</a><a href="${l("whitepaper-pl.html", "whitepaper.html")}">${l("Podstawy naukowe", "The science")}</a><a href="${app}">${l("Otwórz aplikację", "Open the app")}</a></div></footer>`;
}
export function marketingHTML(lang) {
  const en = lang === "en";
  const file = en ? "landing-en.html" : "landing.html";
  const title = en
    ? "Cortex — make a little room to breathe"
    : "Cortex — zrób sobie chwilę oddechu";
  const description = en
    ? "Guided breathing and sound for focus, a little reset and winding down. Try three minutes in your browser. No account needed."
    : "Prowadzony oddech i dźwięk do skupienia, przerwy i wieczornego odpoczynku. Wypróbuj trzy minuty w przeglądarce, bez zakładania konta.";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f7f8f5"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${publicSite}${file}"><link rel="alternate" hreflang="pl" href="${publicSite}landing.html"><link rel="alternate" hreflang="en" href="${publicSite}landing-en.html"><link rel="alternate" hreflang="x-default" href="${publicSite}landing.html"><meta property="og:type" content="website"><meta property="og:site_name" content="Cortex"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${publicSite}${file}"><meta property="og:locale" content="${en ? "en_US" : "pl_PL"}"><meta property="og:image" content="${publicSite}social/cortex-${lang}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${title}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${publicSite}social/cortex-${lang}.jpg"><link rel="icon" href="assets/images/cortex-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/css/marketing.css"><script type="module" src="assets/js/landing.js"></script></head><body class="marketing-body">${marketingBody(lang)}</body></html>`;
}
