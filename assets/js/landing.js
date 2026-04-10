/* ═══════════════════════════════════════════════════════
   KORA CORTEX — Landing Page JavaScript
   i18n, Counter-up, Scroll Animations, Sticky Nav
   ═══════════════════════════════════════════════════════ */

// ── i18n Translations ────────────────────────────────────
const landingI18n = {
    en: {
        // Nav
        'nav.cta': 'Start Free',

        // Hero
        'hero.label': 'ACOUSTIC NEUROMODULATION',
        'hero.h1_line1': 'Deep focus in 10 minutes.',
        'hero.h1_line2': 'Deep sleep in 15.',
        'hero.subtitle': 'Clinically validated sound waves synchronize your neurons — no pills, no meditation, no random music.',
        'hero.cta_primary': 'Start Free — 7 Day Trial',
        'hero.cta_ghost': 'How it works ↓',

        // Problem Strip
        'problem.label': 'YOUR BRAIN vs. 2026',
        'problem.stat1_unit': 'hours / day',
        'problem.stat1_desc': 'lost recovering focus after every distraction',
        'problem.stat2_unit': 'days / year',
        'problem.stat2_desc': 'wasted fighting distraction — that\'s your vacation, burned',
        'problem.stat3_unit': 'avg. in 2026',
        'problem.stat3_desc': 'to fall asleep — while your mind replays the entire day',
        'problem.quote': 'Your brain isn\'t broken. It\'s bombarded. It needs a metronome, not another Spotify playlist.',

        // Agitation
        'agit.label': 'THE WIDENING GAP',
        'agit.h2': 'While you fight distractions, your competitors optimize their brains.',
        'agit.p1': 'AI accelerates exponentially. In a year, the gap between an optimized and unoptimized mind will be like the gap between a computer and a typewriter.',
        'agit.quote1': 'The question is not "should I optimize."',
        'agit.quote2': 'The question is "can I afford not to."',
        'agit.legend_optimized': 'Optimized (Cortex)',
        'agit.legend_baseline': 'Unoptimized Baseline',
        'agit.x_now': 'Now',
        'agit.x_6mo': '6 months',
        'agit.x_1yr': '1 year',
        'agit.x_2yr': '2 years',
        'agit.caption': 'Cognitive capacity trajectory under AI disruption pressure',

        // Solution
        'sol.label': 'THE SOLUTION',
        'sol.h2': 'The only app that combines both proven neuromodulation methods in one medical-grade cockpit.',
        'sol.subtitle': 'Not AI music. Not white noise. Not a random playlist. Precision sound waves, calibrated to the Hertz.',
        'sol.card1_title': 'Titanic Focus',
        'sol.card1_desc': 'Isochronic Tones (50 dB modulation, 100,000:1 power ratio) activate the thalamocortical pathway. Flow State in 10 minutes.',
        'sol.card2_title': 'Deep Sleep',
        'sol.card2_desc': 'Binaural Beats gently synchronize Delta waves. Extended N3 phase = body and mind regeneration.',
        'sol.card3_title': 'Neuroprotection 40 Hz',
        'sol.card3_desc': 'MIT GENUS Protocol. The glymphatic system literally flushes toxins from your brain.',
        'sol.card4_title': 'Phased Ramp-up',
        'sol.card4_desc': 'Proprietary protocol: gentle entry then gradual escalation. Zero panic, maximum tolerance. No competitor has this.',

        // Comparison
        'comp.label': 'HEAD TO HEAD',
        'comp.h2': 'We are not "another focus music app."',
        'comp.subtitle': 'See how clinical neuromodulation compares to AI-generated music and playlists.',
        'comp.th_feature': 'Feature',
        'comp.th_kora': 'Kora Cortex',
        'comp.th_brainfm': 'Brain.fm',
        'comp.th_endel': 'Endel',
        'comp.th_spotify': 'Spotify',
        'comp.row1': 'Isochronic Tones',
        'comp.row3': 'Hz frequency control',
        'comp.row5': 'Offline mode',
        'comp.row6': 'Gamma 40 Hz Protocol',
        'comp.row7': 'Transparent mechanism',
        'comp.row8': 'Monthly price',
        'comp.fn1': '1. Brain.fm: "We took the concept of binaural beats and improved it" but do NOT offer pure isochronic tones.',
        'comp.fn2': '2. Endel: One hidden Binaural Beats scenario. Everything else is generative AI, a black box.',

        // How It Works
        'how.label': 'HOW IT WORKS',
        'how.h2': 'Three steps to a synchronized brain.',
        'how.step1_title': 'Choose Your Goal',
        'how.step1_desc': 'Focus, Sleep, Neuroprotection, or Relaxation. Select a program calibrated to specific brainwave frequencies.',
        'how.step2_title': 'Press Play',
        'how.step2_desc': 'Kora Cortex generates precise sound waves in real time. No downloads, no buffering. Pure signal.',
        'how.step3_title': 'Feel the Difference',
        'how.step3_desc': 'Entrainment begins at ~4 minutes. Full synchronization at 10-15. Flow state or deep sleep on demand.',
        'how.step3_badge': '~10 min to flow',

        // Science
        'sci.label': 'THE SCIENCE',
        'sci.h2': 'Built on research, not hype.',
        'sci.subtitle': 'Every feature is backed by peer-reviewed neuroscience. No marketing claims, only mechanisms.',
        'sci.card1_title': 'FFR Response',
        'sci.card1_desc': 'Isochronic modulation depth: 100,000x more powerful than Binaural Beats at driving cortical entrainment.',
        'sci.card2_title': 'Phased Ramp-up',
        'sci.card2_desc': 'Proprietary protocol eliminating the Acoustic Startle Response. Gradual volume and frequency escalation.',
        'sci.card3_title': 'MIT GENUS 40 Hz',
        'sci.card3_desc': 'Gamma stimulation activates the glymphatic system, flushing beta-amyloid plaques from the brain.',
        'sci.card4_title': 'Transient Hypofrontality',
        'sci.card4_desc': 'Deactivating the prefrontal cortex unlocks auto-pilot productivity, the neurological basis of flow state.',
        'sci.cta': 'Read Full Whitepaper \u2192',

        // Timeline
        'tl.label': 'WHAT TO EXPECT',
        'tl.h2': 'Your first session, minute by minute.',
        'tl.phase1_title': 'Calibration',
        'tl.phase1_feel': 'You hear the tones. Mind is still racing. This is normal.',
        'tl.phase1_brain': 'Brain registers acoustic stimuli, begins frequency matching.',
        'tl.phase2_title': 'Entrainment',
        'tl.phase2_feel': 'Limbs feel heavy. Thoughts begin to dissolve. You stop noticing the sound.',
        'tl.phase2_brain': 'Neurons lock onto the target frequency. Cortical synchronization begins.',
        'tl.phase3_title': 'Synchronization',
        'tl.phase3_feel': 'Time perception shifts. You lose track of minutes. Deep calm or laser focus.',
        'tl.phase3_brain': 'Full brainwave stabilization at target frequency. Neural coherence achieved.',
        'tl.phase4_title': 'Optimal State',
        'tl.phase4_feel': 'Flow state or deep sleep. Effortless. Sustained. Peak performance.',
        'tl.phase4_brain': 'Sustained modulation. Brain operates at peak efficiency with minimal energy cost.',

        // Pricing
        'price.label': 'SIMPLE PRICING',
        'price.h2': 'Less than your daily coffee. More than any supplement.',
        'price.subtitle': 'Every feature. Every program. Every frequency. Unlimited.',
        'price.monthly': 'Monthly',
        'price.annual': 'Annual',
        'price.save': 'Save 17%',
        'price.anchor_label': 'Brain.fm charges',
        'price.mo': '/mo',
        'price.per_month': '/month',
        'price.per_year': '/year',
        'price.annual_total': '$90/year billed annually',
        'price.f1': 'Isochronic + Binaural in one cockpit',
        'price.f2': 'All programs (Focus, Sleep, Neuro, Relax)',
        'price.f3': 'Hz frequency control',
        'price.f4': 'Phased Ramp-up protocol',
        'price.f5': 'Offline sessions (no internet required)',
        'price.f6': '40 Hz Gamma neuroprotection',
        'price.cta': 'Start Free - 7 Day Trial',
        'price.disclaimer': 'Cancel anytime. No questions asked. $0 during trial.',

        // FAQ
        'faq.label': 'FAQ',
        'faq.h2': 'You have questions. We have mechanisms.',
        'faq.q1': 'Is this safe? Any side effects?',
        'faq.a1': 'Completely safe. Isochronic tones and binaural beats are non-invasive acoustic stimulation used in clinical settings since the 1990s. No drugs, no electrodes, no risk. The only "side effect" is you might fall asleep 20 minutes earlier than planned.',
        'faq.q2': 'Do I need headphones?',
        'faq.a2': 'For Binaural Beats: yes, they rely on sending different frequencies to each ear. For Isochronic Tones: headphones are ideal but not required. They work through speakers too because the modulation is in the signal itself, not the stereo separation.',
        'faq.q3': 'How is this different from Brain.fm or Endel?',
        'faq.a3': 'Brain.fm and Endel generate AI music and call it "science-based." You never see what frequency your brain is actually receiving. Kora Cortex uses raw isochronic tones and binaural beats with transparent Hz control. You choose the frequency. You see the modulation depth. No black box.',
        'faq.q4': 'I already use lo-fi / nature sounds / white noise. Why switch?',
        'faq.a4': 'Lo-fi and white noise are pleasant, but they do NOT drive brainwave entrainment. There is zero frequency-following response. Kora Cortex uses clinically validated isochronic and binaural protocols that physically synchronize your neurons to a target frequency. The difference is like comparing a warm bath to physical therapy.',
        'faq.q5': 'How fast will I feel results?',
        'faq.a5': 'Most users report a noticeable shift within the first session (4-10 minutes). Full entrainment typically occurs at 10-15 minutes. Sleep programs work even faster because Delta synchronization meets your natural sleep drive. It is not placebo: EEG studies confirm frequency-following response within minutes.',
        'faq.q6': 'What happens after the 7-day trial?',
        'faq.a6': 'You will be charged $9/month (or $7.50/month on annual). Cancel anytime from your Stripe dashboard with one click. No lock-in, no cancellation fees, no "are you sure?" loops.',
        'faq.q7': 'Can I use it while working / studying / coding?',
        'faq.a7': 'That is exactly what it is designed for. The Focus programs use Beta/Gamma frequencies (14-40 Hz) that promote concentration and flow state. Put on headphones, press play, and work. Many users code for 3-4 hours straight without breaking focus.',
        'faq.q8': 'Does it work for ADHD?',
        'faq.a8': 'Isochronic tones in the Beta range (14-30 Hz) have shown promising results for attention regulation in multiple studies. Users with ADHD consistently report improved focus and reduced mind-wandering. A dedicated ADHD-optimized program with SMR (12-15 Hz) protocols is in development.',

        // Final CTA
        'final.label': 'ONE QUESTION',
        'final.h2': 'What would you do with 2 extra hours of deep focus every day?',
        'final.subtitle': 'Find out in 10 minutes. First 7 days free.',
        'final.cta': 'Start Free - 7 Day Trial',

        // Footer
        'footer.rights': 'All rights reserved.'
    },
    pl: {
        // Nav
        'nav.cta': 'Zacznij Za Darmo',

        // Hero
        'hero.label': 'NEUROMODULACJA AKUSTYCZNA',
        'hero.h1_line1': 'Głębokie skupienie w 10 minut.',
        'hero.h1_line2': 'Głęboki sen w 15.',
        'hero.subtitle': 'Klinicznie potwierdzone fale dźwiękowe synchronizują Twoje neurony — bez leków, bez medytacji, bez losowej muzyki.',
        'hero.cta_primary': 'Zacznij Za Darmo — 7 Dni Trial',
        'hero.cta_ghost': 'Jak to działa? ↓',

        // Problem Strip
        'problem.label': 'TWÓJ MÓZG vs. 2026',
        'problem.stat1_unit': 'godziny / dzień',
        'problem.stat1_desc': 'tracisz na odzyskiwanie koncentracji po każdym rozproszeniu',
        'problem.stat2_unit': 'dni / rok',
        'problem.stat2_desc': 'marnujesz na walkę z rozkojarzeniem — to Twój urlop, spalony',
        'problem.stat3_unit': 'średnio w 2026',
        'problem.stat3_desc': 'na zaśnięcie — podczas gdy umysł odtwarza cały dzień od nowa',
        'problem.quote': 'Twój mózg nie jest zepsuty. Jest bombardowany. Potrzebuje metronoma, nie kolejnej playlisty ze Spotify.',

        // Agitation
        'agit.label': 'ROSNĄCA PRZEPAŚĆ',
        'agit.h2': 'Podczas gdy Ty walczysz z rozproszeniem, Twoi konkurenci optymalizują swoje mózgi.',
        'agit.p1': 'AI przyspiesza wykładniczo. Za rok różnica między optymalizowanym a nieoptymalizowanym umysłem będzie jak między komputerem a maszyną do pisania.',
        'agit.quote1': 'Pytanie nie brzmi "czy powinienem się optymalizować."',
        'agit.quote2': 'Pytanie brzmi "czy mogę sobie pozwolić, żeby tego nie robić."',
        'agit.legend_optimized': 'Zoptymalizowany (Cortex)',
        'agit.legend_baseline': 'Niezoptymalizowany Baseline',
        'agit.x_now': 'Teraz',
        'agit.x_6mo': '6 miesięcy',
        'agit.x_1yr': '1 rok',
        'agit.x_2yr': '2 lata',
        'agit.caption': 'Trajektoria zdolności kognitywnych pod presją dywersji AI',

        // Solution
        'sol.label': 'ROZWIĄZANIE',
        'sol.h2': 'Jedyna aplikacja łącząca obie potwierdzone metody neuromodulacji w jednym cockpicie klasy medycznej.',
        'sol.subtitle': 'Nie muzyka AI. Nie white noise. Nie losowa playlista. Precyzyjne fale dźwiękowe, skalibrowane do Hertza.',
        'sol.card1_title': 'Titanowe Skupienie',
        'sol.card1_desc': 'Tony Isochroniczne (50 dB modulacja, stosunek mocy 100 000:1) aktywują szlak wzgórzowo-korowy. Flow State w 10 minut.',
        'sol.card2_title': 'Głęboki Sen',
        'sol.card2_desc': 'Binaural Beats delikatnie synchronizują fale Delta. Wydłużona faza N3 = regeneracja ciała i umysłu.',
        'sol.card3_title': 'Neuroochrona 40 Hz',
        'sol.card3_desc': 'Protokół MIT GENUS. System glimfatyczny dosłownie wypłukuje toksyny z Twojego mózgu.',
        'sol.card4_title': 'Phased Ramp-up',
        'sol.card4_desc': 'Autorski protokół: łagodne wejście, stopniowa eskalacja. Zero paniki, maksymalna tolerancja. Żaden konkurent tego nie ma.',

        // Comparison
        'comp.label': 'PORÓWNANIE',
        'comp.h2': 'Nie jesteśmy "kolejną apką z muzyką do pracy."',
        'comp.subtitle': 'Zobacz, jak kliniczna neuromodulacja wypada na tle muzyki generowanej przez AI i playlist.',
        'comp.th_feature': 'Funkcja',
        'comp.th_kora': 'Kora Cortex',
        'comp.th_brainfm': 'Brain.fm',
        'comp.th_endel': 'Endel',
        'comp.th_spotify': 'Spotify',
        'comp.row1': 'Tony Isochroniczne',
        'comp.row3': 'Kontrola częstotliwości (Hz)',
        'comp.row5': 'Tryb offline',
        'comp.row6': 'Protokół Gamma 40 Hz',
        'comp.row7': 'Transparentny mechanizm',
        'comp.row8': 'Cena miesięczna',
        'comp.fn1': '1. Brain.fm: "Wzięliśmy koncepcję binaural beats i ulepszyliśmy" ale NIE oferują czystych tonów izochronicznych.',
        'comp.fn2': '2. Endel: Jeden ukryty scenariusz Binaural. Reszta to generatywne AI, czarna skrzynka.',

        // How It Works
        'how.label': 'JAK TO DZIAŁA',
        'how.h2': 'Trzy kroki do zsynchronizowanego mózgu.',
        'how.step1_title': 'Wybierz Cel',
        'how.step1_desc': 'Skupienie, Sen, Neuroochrona lub Relaks. Wybierz program skalibrowany pod konkretne częstotliwości fal mózgowych.',
        'how.step2_title': 'Naciśnij Play',
        'how.step2_desc': 'Kora Cortex generuje precyzyjne fale dźwiękowe w czasie rzeczywistym. Bez pobierania, bez buforowania. Czysty sygnał.',
        'how.step3_title': 'Poczuj Różnicę',
        'how.step3_desc': 'Entrainment zaczyna się po ~4 minutach. Pełna synchronizacja w 10-15. Flow state lub głęboki sen na żądanie.',
        'how.step3_badge': '~10 min do flow',

        // Science
        'sci.label': 'NAUKA',
        'sci.h2': 'Zbudowane na badaniach, nie na hype.',
        'sci.subtitle': 'Każda funkcja jest poparta recenzowanymi badaniami neurobiologicznymi. Bez marketingowych claimów, tylko mechanizmy.',
        'sci.card1_title': 'Odpowiedź FFR',
        'sci.card1_desc': 'Głębokość modulacji izochronicznej: 100 000x silniejsza niż Binaural Beats w napędzaniu entrainmentu korowego.',
        'sci.card2_title': 'Phased Ramp-up',
        'sci.card2_desc': 'Autorski protokół eliminujący Acoustic Startle Response. Stopniowa eskalacja głośności i częstotliwości.',
        'sci.card3_title': 'MIT GENUS 40 Hz',
        'sci.card3_desc': 'Stymulacja gamma aktywuje system glimfatyczny, wypłukując płytki beta-amyloidowe z mózgu.',
        'sci.card4_title': 'Przejściowa Hipofrontalność',
        'sci.card4_desc': 'Dezaktywacja kory przedczołowej odblokowuje automatyczną produktywność, neurologiczna baza flow state.',
        'sci.cta': 'Czytaj Pełny Whitepaper →',

        // Timeline
        'tl.label': 'CZEGO SIĘ SPODZIEWAĆ',
        'tl.h2': 'Twoja pierwsza sesja, minuta po minucie.',
        'tl.phase1_title': 'Kalibracja',
        'tl.phase1_feel': 'Słyszysz tony. Umysł jeszcze pędzi. To normalne.',
        'tl.phase1_brain': 'Mózg rejestruje bodźce akustyczne, zaczyna dopasowanie częstotliwości.',
        'tl.phase2_title': 'Entrainment',
        'tl.phase2_feel': 'Kończyny ciężkieją. Myśli zaczynają się rozpuszczać. Przestajesz zauważać dźwięk.',
        'tl.phase2_brain': 'Neurony łapią docelową częstotliwość. Synchronizacja korowa się rozpoczyna.',
        'tl.phase3_title': 'Synchronizacja',
        'tl.phase3_feel': 'Percepcja czasu się zmienia. Tracisz poczucie minut. Głęboki spokój lub laserowe skupienie.',
        'tl.phase3_brain': 'Pełna stabilizacja fal mózgowych na docelowej częstotliwości. Koherencja neuronowa.',
        'tl.phase4_title': 'Stan Optymalny',
        'tl.phase4_feel': 'Flow state lub głęboki sen. Bez wysiłku. Utrzymany. Szczytowa wydajność.',
        'tl.phase4_brain': 'Podtrzymywana modulacja. Mózg pracuje z maksymalną wydajnością przy minimalnym koszcie energetycznym.',

        // Pricing
        'price.label': 'PROSTY CENNIK',
        'price.h2': 'Taniej niż kawa dziennie. Więcej niż jakikolwiek suplement.',
        'price.subtitle': 'Każda funkcja. Każdy program. Każda częstotliwość. Bez limitów.',
        'price.monthly': 'Miesięczny',
        'price.annual': 'Roczny',
        'price.save': 'Oszczędź 17%',
        'price.anchor_label': 'Brain.fm kosztuje',
        'price.mo': '/mies.',
        'price.per_month': '/miesiąc',
        'price.per_year': '/rok',
        'price.annual_total': '$90/rok rozliczane rocznie',
        'price.f1': 'Isochronic + Binaural w jednym cockpicie',
        'price.f2': 'Wszystkie programy (Focus, Sen, Neuro, Relaks)',
        'price.f3': 'Kontrola częstotliwości (Hz)',
        'price.f4': 'Protokół Phased Ramp-up',
        'price.f5': 'Sesje offline (bez internetu)',
        'price.f6': 'Neuroochrona Gamma 40 Hz',
        'price.cta': 'Zacznij Za Darmo - 7 Dni Trial',
        'price.disclaimer': 'Anuluj kiedy chcesz. Bez pyta\u0144. $0 podczas trialu.',

        // FAQ
        'faq.label': 'FAQ',
        'faq.h2': 'Masz pytania. My mamy mechanizmy.',
        'faq.q1': 'Czy to jest bezpieczne? Jakie\u015b skutki uboczne?',
        'faq.a1': 'Ca\u0142kowicie bezpieczne. Tony izochroniczne i binaural beats to nieinwazyjna stymulacja akustyczna stosowana w klinikach od lat 90. Bez lek\u00f3w, bez elektrod, bez ryzyka. Jedyny \"skutek uboczny\" to to, \u017ce mo\u017cesz zasn\u0105\u0107 20 minut wcze\u015bniej ni\u017c planowa\u0142e\u015b.',
        'faq.q2': 'Czy potrzebuj\u0119 s\u0142uchawek?',
        'faq.a2': 'Dla Binaural Beats: tak, polegaj\u0105 na wys\u0142aniu r\u00f3\u017cnych cz\u0119stotliwo\u015bci do ka\u017cdego ucha. Dla ton\u00f3w izochronicznych: s\u0142uchawki s\u0105 idealne, ale niekonieczne. Dzia\u0142aj\u0105 te\u017c przez g\u0142o\u015bniki, bo modulacja jest w samym sygnale.',
        'faq.q3': 'Czym to si\u0119 r\u00f3\u017cni od Brain.fm lub Endel?',
        'faq.a3': 'Brain.fm i Endel generuj\u0105 muzyk\u0119 AI i nazywaj\u0105 to \"science-based.\" Nigdy nie widzisz, jak\u0105 cz\u0119stotliwo\u015b\u0107 odbiera Tw\u00f3j m\u00f3zg. Kora Cortex u\u017cywa surowych ton\u00f3w izochronicznych z transparentn\u0105 kontrol\u0105 Hz. Ty wybierasz cz\u0119stotliwo\u015b\u0107. \u017badnej czarnej skrzynki.',
        'faq.q4': 'Ju\u017c u\u017cywam lo-fi / d\u017awi\u0119k\u00f3w natury / white noise. Dlaczego mam zmienia\u0107?',
        'faq.a4': 'Lo-fi i white noise s\u0105 przyjemne, ale NIE nap\u0119dzaj\u0105 entrainmentu fal m\u00f3zgowych. Kora Cortex fizycznie synchronizuje Twoje neurony z docelow\u0105 cz\u0119stotliwo\u015bci\u0105. R\u00f3\u017cnica jak mi\u0119dzy ciep\u0142\u0105 k\u0105piel\u0105 a fizjoterapi\u0105.',
        'faq.q5': 'Jak szybko poczuj\u0119 efekty?',
        'faq.a5': 'Wi\u0119kszo\u015b\u0107 u\u017cytkownik\u00f3w raportuje zmian\u0119 w ci\u0105gu pierwszej sesji (4-10 minut). Pe\u0142ny entrainment w 10-15 minut. Programy snu dzia\u0142aj\u0105 jeszcze szybciej. Badania EEG potwierdzaj\u0105 frequency-following response w ci\u0105gu minut.',
        'faq.q6': 'Co si\u0119 dzieje po 7-dniowym trialu?',
        'faq.a6': 'Zostaniesz obci\u0105\u017cony $9/mies. (lub $7.50/mies. na rocznym). Anuluj jednym klikni\u0119ciem z dashboardu Stripe. Bez lock-in, bez op\u0142at za anulowanie.',
        'faq.q7': 'Czy mog\u0119 tego u\u017cywa\u0107 podczas pracy / nauki / kodowania?',
        'faq.a7': 'Dok\u0142adnie do tego to jest zaprojektowane. Programy Focus u\u017cywaj\u0105 cz\u0119stotliwo\u015bci Beta/Gamma (14-40 Hz). Za\u0142\u00f3\u017c s\u0142uchawki, naci\u015bnij play i pracuj. Wielu u\u017cytkownik\u00f3w koduje po 3-4 godziny bez przerywania skupienia.',
        'faq.q8': 'Czy dzia\u0142a na ADHD?',
        'faq.a8': 'Tony izochroniczne w zakresie Beta (14-30 Hz) wykazuj\u0105 obiecuj\u0105ce wyniki w regulacji uwagi. U\u017cytkownicy z ADHD raportuj\u0105 lepsze skupienie i mniejsze b\u0142\u0105dzenie umys\u0142u. Dedykowany program ADHD z protoko\u0142ami SMR (12-15 Hz) jest w trakcie rozwoju.',

        // Final CTA
        'final.label': 'JEDNO PYTANIE',
        'final.h2': 'Co zrobi\u0142by\u015b z 2 dodatkowymi godzinami g\u0142\u0119bokiego skupienia ka\u017cdego dnia?',
        'final.subtitle': 'Dowiedz si\u0119 w 10 minut. Pierwsze 7 dni za darmo.',
        'final.cta': 'Zacznij Za Darmo - 7 Dni Trial',

        // Footer
        'footer.rights': 'Wszelkie prawa zastrze\u017cone.'
    }
};

// ── Language State ────────────────────────────────────────
let currentLandingLang = localStorage.getItem('kora-landing-lang') || 'en';

function setLandingLang(lang) {
    currentLandingLang = lang;
    localStorage.setItem('kora-landing-lang', lang);

    // Update all i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = landingI18n[lang]?.[key];
        if (translation) {
            el.textContent = translation;
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update lang switch buttons
    document.getElementById('langEn')?.classList.toggle('active', lang === 'en');
    document.getElementById('langPl')?.classList.toggle('active', lang === 'pl');
}

// Expose globally for onclick
window.setLandingLang = setLandingLang;

// ── Counter-up Animation ──────────────────────────────────
function animateCountUp(element) {
    const target = parseFloat(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const decimals = parseInt(element.dataset.decimals) || 0;
    const duration = 2000;
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = easedProgress * target;

        element.textContent = currentValue.toFixed(decimals) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ── Scroll Observer (Fade-in + Counter-up) ────────────────
function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If this is a stat-card, trigger counter-up on its .stat-number
                const counter = entry.target.querySelector('.stat-number[data-count]');
                if (counter && !counter.dataset.animated) {
                    counter.dataset.animated = 'true';
                    animateCountUp(counter);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ── Sticky Nav Scroll Detection ───────────────────────────
function initStickyNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ── Billing Toggle ────────────────────────────────────────
let isAnnual = false;

function toggleBilling() {
    isAnnual = !isAnnual;
    const toggle = document.getElementById('billingToggle');
    const amount = document.getElementById('priceAmount');
    const period = document.getElementById('pricePeriod');
    const note = document.getElementById('annualNote');

    if (toggle) toggle.classList.toggle('active', isAnnual);

    if (isAnnual) {
        if (amount) amount.textContent = '7.50';
        if (period) {
            const t = landingI18n[currentLandingLang];
            period.textContent = t['price.per_year'] || '/year';
        }
        if (note) note.style.display = 'block';
    } else {
        if (amount) amount.textContent = '9';
        if (period) {
            const t = landingI18n[currentLandingLang];
            period.textContent = t['price.per_month'] || '/month';
        }
        if (note) note.style.display = 'none';
    }
}

// ── Initialize ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    setLandingLang(currentLandingLang);

    // Init scroll animations
    initScrollObserver();

    // Init sticky nav
    initStickyNav();
});
