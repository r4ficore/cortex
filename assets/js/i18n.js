/**
 * Kora Cortex — i18n (Internationalization)
 * Lightweight translation system. EN default, PL toggle.
 * Must load BEFORE app.js.
 */

const LANG = {
    en: {
        // ── Navigation ──
        'nav.report': 'Report',
        'nav.programs': 'Programs',
        'nav.stats': 'Statistics',
        'nav.safety': 'Safety',
        'nav.standby': 'Standby',
        'nav.close': 'Close',

        // ── Settings Modal Header ──
        'settings.title': 'Configuration',

        // ── Landing Page ──
        'landing.hero': 'Advanced bio-hacking platform. Harness <span class="text-zinc-200">Binaural Beats</span>, <span class="text-zinc-200">Isochronic Tones</span> and <span class="text-zinc-200">Stochastic Resonance</span> for precision consciousness modulation.',
        'landing.feat1.title': 'Deep Work',
        'landing.feat1.desc': 'Beta (14-30Hz) and Gamma (40Hz) protocols optimize information processing, supporting logical thinking and neuroprotection.',
        'landing.feat2.title': 'Knowledge Base',
        'landing.feat2.desc': 'Access the full research report. FFR mechanisms, Harding FPA protocols and glymphatic system analysis.',
        'landing.feat3.title': 'Recovery',
        'landing.feat3.desc': 'Delta waves (0.5-4Hz) and Pink Noise support deep NREM sleep and physiological brain detoxification.',
        'landing.cta': 'Initialize audio session',
        'landing.headphones': 'Best results with stereo headphones',
        'landing.step1.label': 'How it works · 1',
        'landing.step1.title': 'Choose a mode',
        'landing.step1.desc': 'Focus, sleep, relaxation or creativity. Each card shows expected effects and duration.',
        'landing.step2.label': 'How it works · 2',
        'landing.step2.title': 'Quick calibration',
        'landing.step2.desc': 'A few seconds to verify L/R channels, volume balance and safe visual effects.',
        'landing.step3.label': 'How it works · 3',
        'landing.step3.title': 'Start & control',
        'landing.step3.desc': 'Press "Start" in the visualizer panel. Stop the session or adjust intensity at any time.',

        // ── Calibration ──
        'calib.label': 'Calibration',
        'calib.title': 'Audio + visual synchronization',
        'calib.subtitle': 'Verifying L/R channels, volume balance and visual safety.',
        'calib.mode': 'Full calibration',
        'calib.progress': 'Progress',
        'calib.preparing': 'Preparing system...',
        'calib.step1.title': 'L/R Channels',
        'calib.step1.desc': 'Confirming audibility on both sides.',
        'calib.step2.title': 'Volume Balance',
        'calib.step2.desc': 'Adjusting levels and reducing risk.',
        'calib.step3.title': 'Oscillator Tuning',
        'calib.step3.desc': 'Synchronizing signal phases.',
        'calib.step4.title': 'Safe Visuals',
        'calib.step4.desc': 'Reducing flicker, preparing canvas.',
        'calib.run.lr': 'Checking L/R channels',
        'calib.run.volume': 'Calibrating volume balance',
        'calib.run.osc': 'Tuning oscillators',
        'calib.run.done': 'Audio + visuals ready.',
        'calib.run.demo1': 'Checking visuals (demo)',
        'calib.run.demo2': 'Reducing flicker',
        'calib.run.demo3': 'Tuning animation smoothness',
        'calib.run.demo4': 'Demo mode ready.',
        'calib.mode.demo': 'Visual preview',
        'calib.mode.full': 'Full audio calibration',

        // ── Status ──
        'status.standby': 'Standby',
        'status.active': 'ACTIVE',
        'status.ready': 'Ready',

        // ── Onboarding ──
        'onboard.title': 'Customize Kora to your goals',
        'onboard.subtitle': 'Set the default protocol, intensity level and visual mode before your first session.',
        'onboard.skip': 'Skip for now',
        'onboard.goal.label': 'Primary Goal',
        'onboard.goal.focus': 'Focus',
        'onboard.goal.sleep': 'Sleep',
        'onboard.goal.calm': 'Tension relief',
        'onboard.goal.creative': 'Creativity',
        'onboard.goal.social': 'Social',
        'onboard.time.label': 'When do you use Kora?',
        'onboard.time.morning': 'Morning',
        'onboard.time.work': 'At work',
        'onboard.time.evening': 'Evening',
        'onboard.time.preSleep': 'Before sleep',
        'onboard.sens.label': 'Sensitivity',
        'onboard.sens.low': 'Low',
        'onboard.sens.medium': 'Medium',
        'onboard.sens.high': 'High',
        'onboard.sens.hint': 'High sensitivity automatically activates gentle visuals.',
        'onboard.error': 'Select an answer in each section.',
        'onboard.cancel': 'Cancel',
        'onboard.save': 'Save preferences',

        // ── Preference Badges (used by onboarding) ──
        'pref.goal': 'Goal',
        'pref.time': 'Time',
        'pref.sensitivity': 'Sensitivity',
        'recommend.based_on_goals': 'Based on goals',
        'recommend.reason': 'Goal: {goal} · Time: {time} · Sensitivity: {sens}',
        'recommend.circadian_label': 'Time-based suggestion',
        'recommend.circadian_reason': 'Matched to your circadian rhythm (click to start)',
        'recommend.personalization_active': 'Personalization active',
        'recommend.circadian_auto': 'Auto · circadian rhythm',
        'recommend.default_desc': 'Personalized start based on your choices.',

        // ── Cockpit: Status Bar ──
        'cockpit.time': 'Time',
        'cockpit.phase': 'Current Phase',
        'cockpit.beat': 'Binaural Beat',
        'cockpit.background': 'Background',
        'cockpit.waiting': 'Waiting for start',

        // ── Cockpit: Circadian ──
        'circadian.label': 'Circadian Sync',
        'circadian.analyzing': 'Analyzing...',
        'circadian.init': 'Initializing',
        'circadian.cortisol': 'Window: Cortisol / Start',
        'circadian.productivity': 'Window: Productivity',
        'circadian.reset': 'Window: Reset / Theta',
        'circadian.integration': 'Window: Integration',
        'circadian.melatonin': 'Window: Melatonin',

        // ── Cockpit: Protocol List ──
        'protocols.title': 'Choose Protocol',
        'protocols.count': '9 AVAILABLE',

        // ── Cockpit: Hypnos Duration ──
        'hypnos.title': 'Hypnos \u00b7 Time',
        'hypnos.desc': 'Choose session length and save in memory.',
        'hypnos.night': '\u221e night',

        // ── Cockpit: Volume ──
        'volume.title': 'Volume',
        'volume.reset': 'Reset settings',
        'volume.master': 'Master',
        'volume.beat': 'Beat',
        'volume.noise': 'Noise',
        'volume.hint': 'Sliders control the current session directly \u2014 master scales both channels, beat and noise sliders allow quick fine-tuning.',

        // ── Cockpit: Personalization ──
        'personal.title': 'Recommended Start',
        'personal.edit': 'Edit preferences',
        'personal.badge': 'Recommended',
        'personal.apply': 'Set and start',
        'personal.preview': 'Show parameters',
        'personal.settings_label': 'Your settings',

        // ── Cockpit: Visualizer ──
        'viz.system_ready': 'System ready. Stereo headphones required.',
        'viz.fullscreen': 'Fullscreen',

        // ── Cockpit: Program Overlay ──
        'program.next_step': 'Next program step',
        'program.end': 'End program',
        'program.continue': 'Start next step',

        // ── Settings Modal ──
        'settings.assistant': 'Assistant',
        'settings.breath_toggle': 'Breath Assistant',
        'settings.breath_summary': 'Rhythm 4s/6s or automatic per protocol.',
        'settings.breath_style': 'Breath style',
        'settings.breath_auto': 'Auto (per mode)',
        'settings.breath_helper': 'Auto adjusts the pattern to the selected mode.',
        'settings.noise_label': 'Noise Color (Background)',
        'settings.noise_pink': 'Pink',
        'settings.noise_brown': 'Brown',
        'settings.volume_note_title': 'Volume',
        'settings.volume_note': 'Volume sliders have been moved to the main cockpit so they are always accessible. Settings are saved locally and persist after closing the app.',
        'settings.safe_visuals': 'Safe Visuals',
        'settings.safe_visuals_desc': 'Reduce flicker and contrast.',
        'settings.audio_only': 'Audio Only Mode',
        'settings.audio_only_desc': 'Static background without animations.',
        'settings.reduce_motion': 'Reduce motion',
        'settings.reduce_motion_desc': 'Respects system prefers-reduced-motion.',
        'settings.intensity': 'Intensity Level',
        'settings.intensity_hint': 'Scales L/R channel volume and frequency separation.',
        'settings.calib_label': 'Audio Calibration',
        'settings.calib_left': 'Left',
        'settings.calib_right': 'Right',
        'settings.onboard_label': 'Onboarding',
        'settings.onboard_desc': 'Set default goal, sensitivity and suggested protocol.',
        'settings.onboard_run': 'Launch',
        'settings.profile': 'Session Profile',
        'settings.profile_desc': 'Adjust intensity and visualization mode before starting any protocol. Settings are saved locally.',
        'settings.tips_label': 'Tips',
        'settings.tips_desc': 'Changes made here sync immediately with recommendations and demo mode, so you can quickly check differences without leaving a session.',

        // ── Safety Modal ──
        'safety.title': 'Safety Instructions',
        'safety.subtitle': 'Guidelines before starting visualizations and audio',
        'safety.close': 'Close',
        'safety.warning': 'WARNING: Strong visual and auditory stimuli. Do not use with photosensitive epilepsy or while driving.',
        'safety.contra_title': 'Contraindications',
        'safety.contra1': 'Photosensitivity (PSE), post-neurological injury conditions, migraines with aura.',
        'safety.contra2': 'Use of seizure threshold-lowering medications — consult a doctor.',
        'safety.contra3': 'Fatigue, dehydration or sleep deprivation may increase sensory discomfort.',
        'safety.rules_title': 'Usage Guidelines',
        'safety.rules1': 'Always use stereo headphones and start at low volume.',
        'safety.rules2': 'Enable \"Safe visuals\" or \"Audio-only\" on first use or with stimulus sensitivity.',
        'safety.rules3': 'Stop the session if you experience dizziness, nausea, visual disturbances or discomfort.',
        'safety.rules4': 'Avoid looking at bright light sources in dark rooms during intense protocols.',
        'safety.tips_title': 'Practical Tips',
        'safety.tips1': 'Before sleep, choose gentle modes (Hypnos/Restoration) and avoid blue light.',
        'safety.tips2': 'Take breaks between sessions (min. 10 minutes) and stay hydrated.',
        'safety.tips3': 'Test L/R channels in settings before longer sessions.',

        // ── Programs Modal ──
        'programs.title': 'Kora Programs',
        'programs.subtitle': 'Sequences of multiple protocols with breaks between steps.',
        'programs.status_none': 'No active program',
        'programs.close': 'Close',
        'programs.no_programs': 'No programs available.',
        'programs.steps': 'steps',
        'programs.start': 'Start',

        // ── Guide Modal (Research Report) ──
        'guide.title': 'RESEARCH REPORT: KORA CORTEX',
        'guide.subtitle': 'Digital Neurotechnology & Brainwave Modulation',
        'guide.close': 'Close',
        'guide.sec1_title': 'Introduction: Paradigm Evolution',
        'guide.sec1_p1': 'This report constitutes a comprehensive scientific input for the "Kora Cortex" project. Developed from the perspective of a Senior Neuroscientist, it aims to provide a rigorous analysis of the biophysical mechanisms underlying Brainwave Entrainment (BWE).',
        'guide.sec1_p2': 'Modern neuroscience transitions non-pharmacological interventions, such as sensory stimulation, into clinically verifiable tools. This document defines the scientific foundations, evaluates stimulation modalities, and establishes strict safety boundaries.',
        'guide.sec2_title': '1. Neurophysiological Foundations',
        'guide.sec2_1_title': '1.1 FFR Dynamics',
        'guide.sec2_1_desc': 'The Frequency Following Response (FFR) reflects the nervous system\'s ability to synchronize internal oscillations with an external periodic stimulus. Recent studies (Cidral-Filho, 2024) confirm BWE\'s high efficacy in Delta band (0.5-4 Hz) for extending deep sleep (N3).',
        'guide.sec2_2_title': '1.2 Signal Processing Pathways',
        'guide.sec2_2_desc': 'Entrainment efficacy depends directly on auditory processing paths:',
        'guide.sec2_li1': 'Binaural Beats: Perceptual construct in the superior olive. Requires headphones.',
        'guide.sec2_li2': 'Isochronic Tones: Physical modulations. Stronger thalamocortical synchronization.',
        'guide.sec3_title': '2. Auditory Architecture',
        'guide.table_h1': 'Method',
        'guide.table_h2': 'Mechanism',
        'guide.table_h3': 'Efficacy',
        'guide.table_h4': 'Kora Application',
        'guide.t1_m': 'Binaural Beats',
        'guide.t1_mech': 'Superior olive (brainstem).',
        'guide.t1_eff': 'Moderate.',
        'guide.t1_app': 'Relaxation, Delta/Theta.',
        'guide.t2_m': 'Isochronic Tones',
        'guide.t2_mech': 'Thalamus.',
        'guide.t2_eff': 'High.',
        'guide.t2_app': 'Gamma/Beta, Energization.',
        'guide.t3_m': 'Pink Noise',
        'guide.t3_mech': 'Stochastic Resonance.',
        'guide.t3_eff': 'Sleep support.',
        'guide.t3_app': 'Background masking.',
        'guide.sec4_title': '3. Frequency Spectrum & Applications',
        'guide.g_title': 'Gamma (30-100 Hz): Neuroprotection',
        'guide.g_desc': 'GENUS protocol (MIT). 40 Hz stimulation affects microglia, increasing beta-amyloid phagocytosis. Modulates the vascular system, supporting "neuronal hygiene".',
        'guide.r_title': 'Phased Ramp-up Methodology',
        'guide.r_desc': 'Abrupt exposure to high-frequency Isochronic Tones can trigger the startle response. We discovered that initializing sessions with a brief grounding phase (e.g., Binaural Beta/Alpha at 14Hz) followed by a smooth transition to the Isochronic target prevents sensory rejection and drastically increases thalamic entrainment.',
        'guide.d_title': 'Delta (0.5-4 Hz): Glymphatic System',
        'guide.d_desc': 'During NREM sleep, interstitial space expands (Xie et al., 2013). Slow oscillations act as a hydraulic pump for CSF fluid, flushing neurotoxins.',
        'guide.a_title': 'Alpha (8-12 Hz): Flow State',
        'guide.a_desc': 'Associated with transient hypofrontality — temporary silencing of the prefrontal cortex. Crucial for "relaxed alertness".',
        'guide.sec5_title': '4. Safety: Harding FPA Protocol',
        'guide.sec5_desc': 'Implementation of visual modules requires strict adherence to Photosensitive Epilepsy (PSE) prevention standards.',
        'guide.sec5_li1': 'Frequency: Avoid strong 15-25 Hz flickering (peak risk).',
        'guide.sec5_li2': 'Luminance: Limit luminance change < 20 cd/m².',
        'guide.sec5_li3': 'Red Flash: Max 3 transitions to saturated red per second.',
        'guide.bib_title': 'Selected Bibliography',

        // ── Stats Modal ──
        'stats.title': 'Your Statistics',
        'stats.subtitle': 'Data stored locally — last 7 days.',
        'stats.total_time': 'Total time (7 days)',
        'stats.top_rated': 'Top rated',
        'stats.time_of_day': 'Most frequent time',
        'stats.sparkline_label': '7-day activity (min)',
        'stats.avg_rating': 'Average rating by protocol',
        'stats.last_7d': 'Last 7 days',
        'stats.empty': 'No data — complete a few sessions to see statistics.',

        // ── Footer ──
        'footer.safety_note': 'Check the "Safety" tab in the top menu for full usage guidelines.'
    },
    pl: {
        // ── Navigation ──
        'nav.report': 'Raport',
        'nav.programs': 'Programy',
        'nav.stats': 'Statystyki',
        'nav.safety': 'Bezpieczeństwo',
        'nav.standby': 'Standby',
        'nav.close': 'Zamknij',

        // ── Settings Modal Header ──
        'settings.title': 'Konfiguracja',

        // ── Landing Page ──
        'landing.hero': 'Zaawansowana platforma bio-hackingu. Wykorzystaj <span class="text-zinc-200">Binaural Beats</span>, <span class="text-zinc-200">Isochronic Tones</span> oraz <span class="text-zinc-200">Stochastyczny Rezonans</span> do precyzyjnej modulacji stanów świadomości.',
        'landing.feat1.title': 'Głęboka Praca',
        'landing.feat1.desc': 'Protokoły Beta (14-30Hz) i Gamma (40Hz) optymalizują przetwarzanie informacji, wspierając logiczne myślenie i neuroprotekcję.',
        'landing.feat2.title': 'Baza Wiedzy',
        'landing.feat2.desc': 'Dostęp do pełnego raportu badawczego. Mechanizmy FFR, protokoły Harding FPA i analiza wpływu na układ glimfatyczny.',
        'landing.feat3.title': 'Regeneracja',
        'landing.feat3.desc': 'Fale Delta (0.5-4Hz) i Szum Różowy wspomagają głęboki sen NREM i fizjologiczne oczyszczanie mózgu z toksyn.',
        'landing.cta': 'Inicjuj sesję z dźwiękiem',
        'landing.headphones': 'Najlepsze efekty w słuchawkach stereo',
        'landing.step1.label': 'Jak to działa · 1',
        'landing.step1.title': 'Wybierz tryb',
        'landing.step1.desc': 'Skupienie, sen, relaks lub kreatywność. Karta pokaże spodziewany efekt i czas.',
        'landing.step2.label': 'Jak to działa · 2',
        'landing.step2.title': 'Szybka kalibracja',
        'landing.step2.desc': 'Kilka sekund na sprawdzenie kanałów L/R, balansu głośności i bezpiecznych efektów wizualnych.',
        'landing.step3.label': 'Jak to działa · 3',
        'landing.step3.title': 'Start i kontrola',
        'landing.step3.desc': 'Naciśnij „Uruchom" w panelu wizualizacji. W każdej chwili zatrzymasz sesję lub zmienisz intensywność.',

        // ── Calibration ──
        'calib.label': 'Kalibracja',
        'calib.title': 'Synchronizacja audio + wizualizacje',
        'calib.subtitle': 'Sprawdzamy kanały L/R, balans głośności i bezpieczeństwo wizualne.',
        'calib.mode': 'Pełna kalibracja',
        'calib.progress': 'Postęp',
        'calib.preparing': 'Przygotowanie systemu...',
        'calib.step1.title': 'Kanały L/R',
        'calib.step1.desc': 'Potwierdzamy słyszalność obu stron.',
        'calib.step2.title': 'Balans głośności',
        'calib.step2.desc': 'Dopasowanie poziomu i redukcja ryzyka.',
        'calib.step3.title': 'Strojenie oscylatorów',
        'calib.step3.desc': 'Synchronizujemy fazy sygnału.',
        'calib.step4.title': 'Bezpieczne wizualizacje',
        'calib.step4.desc': 'Redukcja migotania, przygotowanie canvasu.',
        'calib.run.lr': 'Sprawdzanie kanałów L/R',
        'calib.run.volume': 'Kalibracja balansu głośności',
        'calib.run.osc': 'Strojenie oscylatorów',
        'calib.run.done': 'Audio + wizualizacje gotowe.',
        'calib.run.demo1': 'Sprawdzanie wizualizacji (demo)',
        'calib.run.demo2': 'Redukcja migotania',
        'calib.run.demo3': 'Strojenie płynności animacji',
        'calib.run.demo4': 'Tryb demo gotowy.',
        'calib.mode.demo': 'Podgląd wizualizacji',
        'calib.mode.full': 'Pełna kalibracja audio',

        // ── Status ──
        'status.standby': 'Standby',
        'status.active': 'AKTYWNY',
        'status.ready': 'Gotowy',

        // ── Onboarding ──
        'onboard.title': 'Dopasuj Kora do swoich celów',
        'onboard.subtitle': 'Ustaw domyślny protokół, poziom intensywności i tryb wizualny zanim rozpoczniesz pierwszą sesję.',
        'onboard.skip': 'Pomiń na teraz',
        'onboard.goal.label': 'Główny cel',
        'onboard.goal.focus': 'Skupienie',
        'onboard.goal.sleep': 'Sen',
        'onboard.goal.calm': 'Redukcja napięcia',
        'onboard.goal.creative': 'Kreatywność',
        'onboard.goal.social': 'Social',
        'onboard.time.label': 'Kiedy używasz Kory?',
        'onboard.time.morning': 'Poranek',
        'onboard.time.work': 'W pracy',
        'onboard.time.evening': 'Wieczorem',
        'onboard.time.preSleep': 'Przed snem',
        'onboard.sens.label': 'Wrażliwość',
        'onboard.sens.low': 'Niska',
        'onboard.sens.medium': 'Średnia',
        'onboard.sens.high': 'Wysoka',
        'onboard.sens.hint': 'Wysoka wrażliwość automatycznie aktywuje łagodne wizualizacje.',
        'onboard.error': 'Wybierz odpowiedź w każdej sekcji.',
        'onboard.cancel': 'Anuluj',
        'onboard.save': 'Zapisz preferencje',

        // ── Preference Badges (used by onboarding) ──
        'pref.goal': 'Cel',
        'pref.time': 'Pora',
        'pref.sensitivity': 'Wrażliwość',
        'recommend.based_on_goals': 'Na podstawie celów',
        'recommend.reason': 'Cel: {goal} · Pora: {time} · Wrażliwość: {sens}',
        'recommend.circadian_label': 'Sugestia czasowa',
        'recommend.circadian_reason': 'Dopasowane do rytmu dobowego (kliknij, aby uruchomić)',
        'recommend.personalization_active': 'Personalizacja aktywna',
        'recommend.circadian_auto': 'Auto · rytm dobowy',
        'recommend.default_desc': 'Personalizowany start na bazie Twoich wyborów.',

        // ── Cockpit: Status Bar ──
        'cockpit.time': 'Czas',
        'cockpit.phase': 'Aktualna faza',
        'cockpit.beat': 'Dudnienie',
        'cockpit.background': 'Tło',
        'cockpit.waiting': 'Oczekiwanie na start',

        // ── Cockpit: Circadian ──
        'circadian.label': 'Circadian Sync',
        'circadian.analyzing': 'Analiza...',
        'circadian.init': 'Inicjalizacja',
        'circadian.cortisol': 'Okno: Kortyzol / Start',
        'circadian.productivity': 'Okno: Produktywność',
        'circadian.reset': 'Okno: Reset / Theta',
        'circadian.integration': 'Okno: Integracja',
        'circadian.melatonin': 'Okno: Melatonina',

        // ── Cockpit: Protocol List ──
        'protocols.title': 'Wybierz Protokół',
        'protocols.count': '9 DOSTĘPNYCH',

        // ── Cockpit: Hypnos Duration ──
        'hypnos.title': 'Hypnos · Czas',
        'hypnos.desc': 'Wybierz długość sesji i zachowaj w pamięci.',
        'hypnos.night': '∞ noc',

        // ── Cockpit: Volume ──
        'volume.title': 'Głośność',
        'volume.reset': 'Reset ustawień',
        'volume.master': 'Ogólna',
        'volume.beat': 'Dudnienie',
        'volume.noise': 'Szum',
        'volume.hint': 'Suwaki działają bezpośrednio na bieżącą sesję – master skaluje oba kanały, a suwaki dudnienia i szumu pozwalają na szybkie dostrojenie.',

        // ── Cockpit: Personalization ──
        'personal.title': 'Polecany start',
        'personal.edit': 'Edytuj preferencje',
        'personal.badge': 'Polecane',
        'personal.apply': 'Ustaw i uruchom',
        'personal.preview': 'Pokaż parametry',
        'personal.settings_label': 'Twoje ustawienia',

        // ── Cockpit: Visualizer ──
        'viz.system_ready': 'System gotowy. Wymagane słuchawki stereo.',
        'viz.fullscreen': 'Pełny ekran',

        // ── Cockpit: Program Overlay ──
        'program.next_step': 'Następny etap programu',
        'program.end': 'Zakończ program',
        'program.continue': 'Start kolejnego etapu',

        // ── Settings Modal ──
        'settings.assistant': 'Asystent',
        'settings.breath_toggle': 'Asystent Oddechu',
        'settings.breath_summary': 'Rytm 4s/6s lub automatyczny wg protokołu.',
        'settings.breath_style': 'Styl oddechu',
        'settings.breath_auto': 'Auto (wg trybu)',
        'settings.breath_helper': 'Auto dopasuje wzorzec do wybranego trybu.',
        'settings.noise_label': 'Kolor Szumu (Tło)',
        'settings.noise_pink': 'Różowy',
        'settings.noise_brown': 'Brązowy',
        'settings.volume_note_title': 'Głośność',
        'settings.volume_note': 'Suwaki głośności przenieśliśmy do głównego kokpitu, aby były zawsze pod ręką. Ustawienia zapisują się lokalnie i obowiązują także po zamknięciu aplikacji.',
        'settings.safe_visuals': 'Safe Visuals',
        'settings.safe_visuals_desc': 'Ogranicz migotanie i kontrast.',
        'settings.audio_only': 'Tryb Tylko Audio',
        'settings.audio_only_desc': 'Statyczne tło bez animacji.',
        'settings.reduce_motion': 'Redukuj ruch',
        'settings.reduce_motion_desc': 'Szanuje systemowe prefers-reduced-motion.',
        'settings.intensity': 'Poziom Intensywności',
        'settings.intensity_hint': 'Skaluje głośność kanałów L/R i separację częstotliwości.',
        'settings.calib_label': 'Kalibracja Audio',
        'settings.calib_left': 'Lewy',
        'settings.calib_right': 'Prawy',
        'settings.onboard_label': 'Onboarding',
        'settings.onboard_desc': 'Ustaw domyślny cel, wrażliwość i sugerowany protokół.',
        'settings.onboard_run': 'Uruchom',
        'settings.profile': 'Profil sesji',
        'settings.profile_desc': 'Dostosuj intensywność i tryb wizualizacji zanim rozpoczniesz dowolny protokół. Ustawienia zapisujemy lokalnie.',
        'settings.tips_label': 'Wskazówki',
        'settings.tips_desc': 'Zmiany wprowadzone tutaj od razu synchronizują się z rekomendacjami i trybem demo, więc możesz szybko sprawdzić różnice bez opuszczania sesji.',

        // ── Safety Modal ──
        'safety.title': 'Instrukcja Bezpieczeństwa',
        'safety.subtitle': 'Wytyczne przed uruchomieniem wizualizacji i audio',
        'safety.close': 'Zamknij',
        'safety.warning': 'UWAGA: Silne bodźce wizualne i dźwiękowe. Nie używać w przypadku epilepsji fotogennej ani podczas prowadzenia pojazdów.',
        'safety.contra_title': 'Przeciwwskazania',
        'safety.contra1': 'Nadwrażliwość na światło (PSE), stany po urazach neurologicznych, migreny z aurą.',
        'safety.contra2': 'Stosowanie leków obniżających próg drgawkowy – skonsultuj użycie z lekarzem.',
        'safety.contra3': 'Zmęczenie, odwodnienie lub brak snu mogą zwiększać dyskomfort sensoryczny.',
        'safety.rules_title': 'Zasady korzystania',
        'safety.rules1': 'Zawsze używaj słuchawek stereo i zaczynaj od niskiej głośności.',
        'safety.rules2': 'Włącz „Safe visuals” lub „Audio-only” przy pierwszym użyciu lub przy wrażliwości na bodźce.',
        'safety.rules3': 'Przerwij sesję przy zawrotach głowy, mdłościach, mroczkach lub dyskomforcie.',
        'safety.rules4': 'Unikaj patrzenia w jasne źródła światła w zaciemnionych pomieszczeniach podczas intensywnych protokołów.',
        'safety.tips_title': 'Wskazówki praktyczne',
        'safety.tips1': 'Przed snem wybieraj łagodne tryby (Hypnos/Restoration) i unikaj światła niebieskiego.',
        'safety.tips2': 'Rób przerwy między sesjami (min. 10 minut) i nawadniaj się.',
        // ── Programs Modal ──
        'programs.title': 'Programy Kora',
        'programs.subtitle': 'Sekwencje kilku protokołów z pauzą między krokami.',
        'programs.status_none': 'Brak aktywnego programu',
        'programs.close': 'Zamknij',
        'programs.no_programs': 'Brak dostępnych programów.',
        'programs.steps': 'kroki',
        'programs.start': 'Start',

        // ── Guide Modal (Research Report) ──
        'guide.title': 'RAPORT BADAWCZY KORA CORTEX',
        'guide.subtitle': 'Neurotechnologia Cyfrowa i Modulacja Fal Mózgowych',
        'guide.close': 'Zamknij',
        'guide.sec1_title': 'Wstęp: Ewolucja Paradygmatu',
        'guide.sec1_p1': 'Niniejszy raport stanowi kompleksowy wsad merytoryczny do projektu "Kora Cortex". Opracowany z perspektywy Senior Neuroscientist, ma na celu dostarczenie rygorystycznej analizy mechanizmów biofizycznych leżących u podstaw entrainmentu fal mózgowych (BWE).',
        'guide.sec1_p2': 'Współczesna neuronauka przetwarza niefarmakologiczne metody interwencji (takie jak stymulacja sensoryczna) w klinicznie weryfikowalne narzędzia. Ten dokument definiuje naukowe fundamenty, ocenia modalności stymulacji i wyznacza rygorystyczne granice bezpieczeństwa.',
        'guide.sec2_title': '1. Neurofizjologiczne Podstawy Entrainmentu',
        'guide.sec2_1_title': '1.1 Dynamika FFR',
        'guide.sec2_1_desc': 'Odpowiedź podążania za częstotliwością (FFR) odzwierciedla zdolność układu nerwowego do synchronizacji wewnętrznych oscylacji z bodźcem zewnętrznym. Badania (Cidral-Filho, 2024/2025) dowodzą m.in. wysoce istotnych korzyści stymulacji pasma Delta (0.5-4 Hz) w wydłużaniu fazy snu głębokiego (N3).',
        'guide.sec2_2_title': '1.2 Ścieżki Przetwarzania Sygnału',
        'guide.sec2_2_desc': 'Skuteczność entrainmentu zależy bezpośrednio od przetwarzania sygnału:',
        'guide.sec2_li1': 'Binaural Beats: Konstrukt percepcyjny w oliwie górnej (pień mózgu). Wymaga słuchawek.',
        'guide.sec2_li2': 'Isochronic Tones: Fizyczne modulacje. Silniejsza synchronizacja wzgórzowo-korowa.',
        'guide.sec3_title': '2. Architektura Audytywna',
        'guide.table_h1': 'Metoda',
        'guide.table_h2': 'Mechanizm',
        'guide.table_h3': 'Efektywność',
        'guide.table_h4': 'Zastosowanie w Kora',
        'guide.t1_m': 'Binaural Beats',
        'guide.t1_mech': 'Oliwa górna (pień).',
        'guide.t1_eff': 'Umiarkowana.',
        'guide.t1_app': 'Relaks, Delta/Theta.',
        'guide.t2_m': 'Isochronic Tones',
        'guide.t2_mech': 'Wzgórze.',
        'guide.t2_eff': 'Wysoka.',
        'guide.t2_app': 'Gamma/Beta, Energetyzacja.',
        'guide.t3_m': 'Pink Noise',
        'guide.t3_mech': 'Stochastyczny Rezonans.',
        'guide.t3_eff': 'Wsparcie snu.',
        'guide.t3_app': 'Maskowanie tła.',
        'guide.sec4_title': '3. Spektrum Częstotliwości i Zastosowania',
        'guide.g_title': 'Gamma (30-100 Hz): Neuroprotekcja',
        'guide.g_desc': 'Metoda GENUS (MIT). Stymulacja 40 Hz wpływa na mikroglej, zwiększając fagocytozę beta-amyloidu. Moduluje układ naczyniowy (wazodylatacja), wspierając "higienę neuronalną".',
        'guide.r_title': 'Metodologia Rampowania (Phased Ramp-up)',
        'guide.r_desc': 'Nagła ekspozycja na szybkie uderzenia Izochroniczne może wywołać reakcję stresową. Odkryliśmy, że inicjowanie sesji krótką fazą uziemiającą (np. Binaural Beta/Alpha 14Hz), a następnie płynne przejście do docelowej stymulacji zapobiega odrzuceniu sensorycznemu i drastycznie zwiększa tolerancję oraz entrainment wzgórza.',
        'guide.d_title': 'Delta (0.5-4 Hz): Układ Glimfatyczny',
        'guide.d_desc': 'Podczas snu NREM przestrzeń śródmiąższowa ekspanduje (Xie et al., 2013). Wolne oscylacje działają jak pompa hydrauliczna dla płynu CSF, wypłukując neurotoksyny.',
        'guide.a_title': 'Alpha (8-12 Hz): Flow State',
        'guide.a_desc': 'Związane z transient hypofrontality - przejściowym wyciszeniem kory przedczołowej. Kluczowe dla "odprężonej czujności".',
        'guide.sec5_title': '4. Bezpieczeństwo: Protokół Harding FPA',
        'guide.sec5_desc': 'Wdrożenie modułów wizualnych wymaga rygorystycznego przestrzegania standardów prewencji epilepsji fotogennej (PSE).',
        'guide.sec5_li1': 'Częstotliwość: Unikać silnego migotania 15-25 Hz (szczyt ryzyka).',
        'guide.sec5_li2': 'Luminancja: Limit zmiany luminancji < 20 cd/m².',
        'guide.sec5_li3': 'Red Flash: Max 3 przejścia do nasyconej czerwieni na sekundę.',
        'guide.bib_title': 'Wybrana Bibliografia',

        // ── Stats Modal ──
        'stats.title': 'Twoje statystyki',
        'stats.subtitle': 'Dane przechowywane lokalnie – ostatnie 7 dni.',
        'stats.total_time': 'Łączny czas (7 dni)',
        'stats.top_rated': 'Najlepiej oceniane',
        'stats.time_of_day': 'Najczęstsza pora',
        'stats.sparkline_label': 'Aktywność 7-dniowa (min)',
        'stats.avg_rating': 'Średnia ocena wg protokołu',
        'stats.last_7d': 'Ostatnie 7 dni',
        'stats.empty': 'Brak danych – zakończ kilka sesji, aby zobaczyć statystyki.',

        // ── Footer ──
        'footer.safety_note': 'Sprawdź zakładkę „Bezpieczeństwo" w górnym menu, aby poznać pełne wytyczne korzystania.',
    }
};

let _currentLang = localStorage.getItem('kora-lang') || 'en';

/**
 * Get translation for key. Falls back to EN, then to key itself.
 * @param {string} key - dot-separated translation key
 * @returns {string}
 */
function t(key) {
    return LANG[_currentLang]?.[key] || LANG.en[key] || key;
}

/**
 * Get current language code.
 * @returns {'en'|'pl'}
 */
function getLang() {
    return _currentLang;
}

/**
 * Switch language, update all static [data-i18n] elements,
 * and dispatch 'langChanged' event for dynamic content.
 * @param {'en'|'pl'} lang
 */
function setLang(lang) {
    if (!LANG[lang]) return;
    _currentLang = lang;
    localStorage.setItem('kora-lang', lang);

    // Update <html lang="">
    document.documentElement.lang = lang;

    // Update all static elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const translated = t(key);
        // Support placeholder, title, aria-label via data-i18n-attr
        const attr = el.dataset.i18nAttr;
        if (attr) {
            el.setAttribute(attr, translated);
        } else {
            el.textContent = translated;
        }
    });

    // Update elements with HTML content (e.g. hero with <span> tags)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.dataset.i18nHtml;
        el.innerHTML = t(key);
    });

    // Update language switcher visual
    const switcher = document.getElementById('langSwitcher');
    if (switcher) switcher.textContent = lang.toUpperCase();

    // Dispatch event for app.js to re-render dynamic content
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

// Apply initial lang on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = _currentLang;

    // Set switcher button text
    const switcher = document.getElementById('langSwitcher');
    if (switcher) switcher.textContent = _currentLang.toUpperCase();

    // If user previously selected PL, apply translations immediately
    if (_currentLang !== 'en') {
        setLang(_currentLang);
    }
});
