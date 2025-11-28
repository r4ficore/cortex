const sessions = {
                hypnos: {
                    id: "hypnos", name: "Hypnos", category: "Sleep",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
                    desc: "Głęboka architektura snu. Delta (0.5-2Hz) ułatwia zasypianie i podtrzymuje fazę N3. Tryb nieskończony.",
                    duration: Infinity,
                    baseHz: "Delta 0.5-2Hz",
                    phases: [
                        { name: "Indukcja Snu", start: 0, end: 900, audio: { l: 100, r: 108, vol_s: 0.2, vol_e: 0.15 }, visual: { f: 6, mod: 'soft', bri: 0.3 } },
                        { name: "Głęboki Sen", start: 900, end: Infinity, audio: { l: 60, r: 61, vol: 0.15 }, visual: { f: 0.5, mod: 'breath', bri: 0.05 } }
                    ]
                },
                prime: {
                    id: "prime", name: "Prime", category: "Activation",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
                    desc: "Rozgrzewka neuronalna (5 min). Łagodne przejście z fal Alpha do Beta. Idealne na start dnia.",
                    duration: 300,
                    baseHz: "Alpha -> Beta",
                    phases: [
                        { name: "Inicjacja Alpha", start: 0, end: 120, audio: { l: 220, r: 228, vol_s: 0.1, vol_e: 0.3 }, visual: { f: 8, mod: 'soft', bri: 0.6 } },
                        { name: "Aktywacja Beta", start: 120, end: 300, audio: { l: 220, r: 234, vol: 0.35 }, visual: { f: 14, mod: 'soft', bri: 0.8 } }
                    ]
                },
                overdrive: {
                    id: "overdrive",
                    name: "Overdrive",
                    category: "Activation",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>`,
                    desc: "Intensywna stymulacja Gamma (30-40Hz). Krótka sesja do przełamania prokrastynacji.", duration: 300, baseHz: "Gamma 40Hz",
                    phases: [{ name: "Ramp Up", start: 0, end: 60, audio: { l: 440, r: 470, vol_s: 0.3, vol_e: 0.5 }, visual: { f_s: 20, f_e: 35, mod: 'hard' } }, { name: "Gamma Peak", start: 60, end: 240, audio: { l: 440, r: 480, mod: 'pulse' }, visual: { f: 40, mod: 'hard', bri: 1.0 } }, { name: "Cool Down", start: 240, end: 300, audio: { l: 440, r: 460, vol_s: 0.5, vol_e: 0.2 }, visual: { f_s: 30, f_e: 10, mod: 'soft' } }]
                },
                deepFocus: {
                    id: "deepFocus",
                    name: "Deep Focus",
                    category: "Work",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
                    desc: "Klasyczne głębokie skupienie (15 min). Stabilne fale Beta pomagają utrzymać koncentrację na jednym zadaniu.",
                    duration: 900,
                    baseHz: "Beta 14-18Hz",
                    phases: [
                        { name: "Indukcja", start: 0, end: 120, audio: { l: 210, r: 224, vol_s: 0.1, vol_e: 0.3 }, visual: { f: 10, mod: 'soft', bri: 0.7 } },
                        { name: "Tunel", start: 120, end: 780, audio: { l: 230, r: 248, vol: 0.4 }, visual: { f: 14, mod: 'soft', bri: 0.85 } },
                        { name: "Wyjście", start: 780, end: 900, audio: { l: 210, r: 224, vol_s: 0.3, vol_e: 0.1 }, visual: { f: 10, mod: 'soft', bri: 0.6 } }
                    ]
                },
                clarity: {
                    id: "clarity",
                    name: "Clarity",
                    category: "Work",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
                    desc: "Myślenie strategiczne. Zbalansowana sesja Alpha/Beta sprzyjająca planowaniu i porządkowaniu myśli.",
                    duration: 720,
                    baseHz: "Isochronic 12Hz",
                    phases: [
                        { name: "Centrowanie", start: 0, end: 180, audio: { l: 220, r: 232, vol_s: 0.2, vol_e: 0.35 }, visual: { f: 10, mod: 'soft' } },
                        { name: "Analiza", start: 180, end: 600, audio: { l: 220, r: 236, mod: 'iso' }, visual: { f: 12, mod: 'soft' } },
                        { name: "Synteza", start: 600, end: 720, audio: { l: 220, r: 232, vol_s: 0.35, vol_e: 0.1 }, visual: { f: 8, mod: 'soft' } }
                    ]
                },
                genesis: {
                    id: "genesis",
                    name: "Genesis",
                    category: "Creative",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`,
                    desc: "Stan Flow (Theta 6-7Hz). Głęboki relaks połączony z wizualizacją. Idealny do burzy mózgów i zadań kreatywnych.",
                    duration: 600,
                    baseHz: "Theta 6Hz",
                    phases: [
                        { name: "Zejście", start: 0, end: 120, audio: { l: 180, r: 190, vol_s: 0.2, vol_e: 0.3 }, visual: { f: 10, mod: 'soft', bri: 0.6 } },
                        { name: "Theta Flow", start: 120, end: 500, audio: { l: 150, r: 156, vol: 0.35 }, visual: { f: 6, mod: 'soft', bri: 0.5 } },
                        { name: "Powrót", start: 500, end: 600, audio: { l: 180, r: 190, vol_s: 0.3, vol_e: 0.1 }, visual: { f: 8, mod: 'soft', bri: 0.4 } }
                    ]
                },
                equilibrium: {
                    id: "equilibrium",
                    name: "Equilibrium",
                    category: "Calm",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h5l3 5 5-11 4 6h3"></path></svg>`,
                    desc: "Redukcja lęku i stresu. Stabilne 10Hz (Alpha) uziemia i uspokaja układ nerwowy bez usypiania.",
                    duration: 420,
                    baseHz: "Solid Alpha 10Hz",
                    phases: [
                        { name: "Uziemienie", start: 0, end: 60, audio: { l: 200, r: 212, vol_s: 0.15, vol_e: 0.25 }, visual: { f: 12, mod: 'soft', bri: 0.6 } },
                        { name: "Stabilizacja", start: 60, end: 360, audio: { l: 200, r: 210, vol: 0.3 }, visual: { f: 10, mod: 'breath', bri: 0.7 } },
                        { name: "Wyciszenie", start: 360, end: 420, audio: { l: 200, r: 208, vol_s: 0.25, vol_e: 0.1 }, visual: { f: 8, mod: 'breath', bri: 0.5 } }
                    ]
                },
                restoration: {
                    id: "restoration",
                    name: "Restoration",
                    category: "Calm",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"></path></svg>`,
                    desc: "Głęboka regeneracja (Delta 2-4Hz). Bardzo powolne fale dla fizycznego i mentalnego odpoczynku.",
                    duration: 900,
                    baseHz: "Delta 3Hz",
                    phases: [
                        { name: "Zwolnienie", start: 0, end: 180, audio: { l: 100, r: 108, vol_s: 0.15, vol_e: 0.25 }, visual: { f: 8, mod: 'soft', bri: 0.5 } },
                        { name: "Delta Immersion", start: 180, end: 800, audio: { l: 100, r: 103, vol: 0.3 }, visual: { f: 3, mod: 'breath', bri: 0.3 } },
                        { name: "Przebudzenie", start: 800, end: 900, audio: { l: 100, r: 108, vol_s: 0.25, vol_e: 0.1 }, visual: { f: 6, mod: 'soft', bri: 0.4 } }
                    ]
                },
                presence: {
                    id: "presence",
                    name: "Presence",
                    category: "Work",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
                    desc: "Gotowość społeczna. Lekkie pobudzenie przed spotkaniem.",
                    duration: 420,
                    baseHz: "Alpha 10Hz",
                    phases: [
                        { name: "Flow", start: 0, end: 360, audio: { l: 240, r: 250, vol_s: 0.2, vol_e: 0.35 }, visual: { f: 10, mod: 'soft' } },
                        { name: "Spokój", start: 360, end: 420, audio: { l: 240, r: 250, vol_s: 0.35, vol_e: 0.1 }, visual: { f: 8, mod: 'soft' } }
                    ]
                }
            };

            const programs = [
                {
                    id: 'flow90',
                    name: 'Flow 90',
                    description: 'Pełna ścieżka od pobudzenia do wyciszenia w 90 minut.',
                    steps: [
                        { sessionId: 'prime', durationMinutes: 5 },
                        { sessionId: 'deepFocus', durationMinutes: 60 },
                        { sessionId: 'genesis', durationMinutes: 10 },
                        { sessionId: 'equilibrium', durationMinutes: 15 }
                    ]
                },
                {
                    id: 'socialUpgrade',
                    name: 'Social Upgrade',
                    description: 'Przygotowanie do spotkań – delikatne pobudzenie i uspokojenie.',
                    steps: [
                        { sessionId: 'presence', durationMinutes: 7 },
                        { sessionId: 'equilibrium', durationMinutes: 10 }
                    ]
                },
                {
                    id: 'sleepReset',
                    name: 'Sleep Reset',
                    description: 'Wieczorna sekwencja do regeneracji i snu.',
                    steps: [
                        { sessionId: 'restoration', durationMinutes: 20 },
                        { sessionId: 'hypnos', durationMinutes: 90 }
                    ]
                },
                {
                    id: 'powerNap45',
                    name: 'Power Nap 45',
                    description: 'Krótka sekwencja regeneracyjna na przerwę w ciągu dnia.',
                    steps: [
                        { sessionId: 'equilibrium', durationMinutes: 10 },
                        { sessionId: 'hypnos', durationMinutes: 30 },
                        { sessionId: 'genesis', durationMinutes: 5 }
                    ]
                },
                {
                    id: 'creativeBloom',
                    name: 'Creative Bloom',
                    description: 'Delikatne pobudzenie i flow dla pracy koncepcyjnej.',
                    steps: [
                        { sessionId: 'presence', durationMinutes: 8 },
                        { sessionId: 'deepFocus', durationMinutes: 45 },
                        { sessionId: 'equilibrium', durationMinutes: 10 }
                    ]
                }
            ];

            // User Preferences (localStorage) helper
            const defaultPreferences = {
                lastSessionId: 'prime',
                preferredNoiseType: 'brown',
                breathEnabled: false,
                breathPattern: 'auto',
                hypnosDuration: 'infinity',
                onboardingCompleted: false,
                goal: null,
                typicalTime: null,
                sensitivity: null,
                safeVisuals: false,
                audioOnly: false,
                intensityLevel: 'medium',
                reduceMotion: null
            };

            const userPreferences = {
                key: 'koraUserPreferences',
                data: { ...defaultPreferences },
                load() {
                    try {
                        const raw = localStorage.getItem(this.key);
                        if (raw) this.data = { ...defaultPreferences, ...JSON.parse(raw) };
                        else this.data = { ...defaultPreferences };
                    } catch (e) {
                        console.warn('Preferences load failed, using defaults', e);
                        this.data = { ...defaultPreferences };
                    }
                    return this.data;
                },
                save(patch = {}) {
                    this.data = { ...this.data, ...patch };
                    try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch (e) { console.warn('Preferences save failed', e); }
                }
            };

            const sessionLogs = {
                key: 'koraSessionLogs',
                data: [],
                load() {
                    try {
                        const raw = localStorage.getItem(this.key);
                        this.data = raw ? JSON.parse(raw) : [];
                        if(!Array.isArray(this.data)) this.data = [];
                    } catch (e) {
                        console.warn('Session logs load failed, resetting', e);
                        this.data = [];
                    }
                    return this.data;
                },
                save(logs = this.data) {
                    this.data = logs;
                    try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch (e) { console.warn('Session logs save failed', e); }
                },
                add(entry) {
                    this.data.unshift(entry);
                    this.save(this.data.slice(0, 500));
                }
            };

            const releaseNotesPrefs = {
                key: 'koraReleaseNotes',
                data: { acknowledgedVersion: null, snoozedUntil: null },
                load() {
                    try {
                        const raw = localStorage.getItem(this.key);
                        this.data = raw ? { ...this.data, ...JSON.parse(raw) } : { ...this.data };
                    } catch (e) {
                        console.warn('Release notes prefs load failed, resetting', e);
                        this.data = { acknowledgedVersion: null, snoozedUntil: null };
                    }
                    return this.data;
                },
                save(patch = {}) {
                    this.data = { ...this.data, ...patch };
                    try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch (e) { console.warn('Release notes prefs save failed', e); }
                }
            };

            const feedbackPulse = {
                key: 'koraFeedbackPulse',
                data: { lastNpsAt: null, lastNpsScore: null, lastNpsNote: '', snoozedUntil: null },
                load() {
                    try {
                        const raw = localStorage.getItem(this.key);
                        this.data = raw ? { ...this.data, ...JSON.parse(raw) } : { ...this.data };
                    } catch (e) {
                        console.warn('Feedback pulse load failed, resetting', e);
                        this.data = { lastNpsAt: null, lastNpsScore: null, lastNpsNote: '', snoozedUntil: null };
                    }
                    return this.data;
                },
                save(patch = {}) {
                    this.data = { ...this.data, ...patch };
                    try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch (e) { console.warn('Feedback pulse save failed', e); }
                }
            };

            userPreferences.load();
            sessionLogs.load();
            releaseNotesPrefs.load();
            feedbackPulse.load();

            const releaseNotesMeta = document.getElementById('releaseNotesCard')?.dataset || {};
            const RELEASE_NOTES_VERSION = releaseNotesMeta.releaseVersion || '2.7.1';
            const systemMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            const THREE_DAYS_MS = 3 * 24 * 3600 * 1000;

            // Hypnos duration presets (values in minutes, converted to seconds later)
            const HYPNOS_TEST_ACCELERATION = 1; // Set to 60 to make "1s = 1min" for quick manual tests
            const hypnosDurations = {
                '30': 30,
                '45': 45,
                '90': 90,
                'infinity': Infinity
            };

            // Safety/display preferences: safe visuals limit flicker/contrast, audio-only disables animations, intensity scales gain
            const intensityProfiles = {
                low: { gain: 0.6, delta: 0.9 },
                medium: { gain: 1, delta: 1 },
                high: { gain: 1.3, delta: 1.1 }
            };

            const breathPatterns = {
                auto: { label: 'Auto (wg trybu)' },
                '4-6': { label: '4–6', sequence: [
                    { label: 'IN', duration: 4 },
                    { label: 'OUT', duration: 6 }
                ] },
                '4-7-8': { label: '4–7–8', sequence: [
                    { label: 'IN', duration: 4 },
                    { label: 'HOLD', duration: 7 },
                    { label: 'OUT', duration: 8 }
                ] },
                box: { label: 'Box 4–4–4–4', sequence: [
                    { label: 'IN', duration: 4 },
                    { label: 'HOLD', duration: 4 },
                    { label: 'OUT', duration: 4 },
                    { label: 'HOLD', duration: 4 }
                ] }
            };

            const autoBreathMap = {
                equilibrium: 'box',
                presence: 'box',
                hypnos: '4-7-8',
                restoration: '4-7-8',
                prime: '4-6',
                overdrive: '4-6',
                deepFocus: '4-6'
            };

            const hypnosBasePhases = JSON.parse(JSON.stringify(sessions.hypnos.phases));

            const onboardingGoalMap = {
                focus: 'deepFocus',
                sleep: 'hypnos',
                calm: 'equilibrium',
                creative: 'genesis',
                social: 'presence'
            };

            const onboardingTimeMap = {
                morning: 'prime',
                work: 'deepFocus',
                evening: 'equilibrium',
                'pre-sleep': 'hypnos'
            };

            const onboardingSensitivityMap = {
                low: 'high',
                medium: 'medium',
                high: 'low'
            };

            let state = {
                active: false,
                session: userPreferences.data.lastSessionId || 'prime',
                startTime: 0,
                sessionStartTs: null,
                preview: false,
                focusLock: false,
                noiseType: userPreferences.data.preferredNoiseType || 'brown',
                breathingPacer: !!userPreferences.data.breathEnabled,
                breathPattern: userPreferences.data.breathPattern || 'auto',
                hypnosDuration: userPreferences.data.hypnosDuration || 'infinity',
                safeVisuals: !!userPreferences.data.safeVisuals,
                audioOnly: !!userPreferences.data.audioOnly,
                intensityLevel: userPreferences.data.intensityLevel || 'medium',
                reduceMotion: typeof userPreferences.data.reduceMotion === 'boolean' ? userPreferences.data.reduceMotion : systemMotionQuery.matches,
                sessionDataOverride: null,
                program: { active: false, id: null, stepIndex: 0, awaitingNext: false },
                pendingFeedback: null,
                npsScore: null,
                hypnosRampProgress: 0,
                hypnosRampTimer: null,
                ctx: null,
                audio: {
                    oscL: null,
                    oscR: null,
                    gain: null,
                    noise: null,
                    noiseGain: null
                },
                analyser: null,
                lastInteraction: 0 // For UI dimming
            };

            const els = {
                canvas: document.getElementById('visualCanvas'),
                timer: document.getElementById('timer'),
                progressBar: document.getElementById('progressBar'),
                mainBtn: document.getElementById('mainActionBtn'),
                modeContainer: document.getElementById('modeContainer'),
                msgBox: document.getElementById('message-box'),
                desc: document.getElementById('modeDesc'),
                messageTitle: document.getElementById('messageTitle'),
                realtimeHz: document.getElementById('realtimeHz'),
                phaseName: document.getElementById('currentPhaseName'),
                statusDot: document.getElementById('statusDot'),
                statusText: document.getElementById('statusText'),
                settingsModal: document.getElementById('settingsModal'),
                guideModal: document.getElementById('guideModal'),
                programModal: document.getElementById('programModal'),
                safetyModal: document.getElementById('safetyModal'),
                programToggle: document.getElementById('programToggle'),
                closeProgram: document.getElementById('closeProgram'),
                noiseTypeDisplay: document.getElementById('noiseTypeDisplay'),
                btnPink: document.getElementById('setPinkNoise'),
                btnBrown: document.getElementById('setBrownNoise'),
                breathToggle: document.getElementById('breathToggle'),
                breathPatternButtons: Array.from(document.querySelectorAll('#breathPatternButtons .breath-pattern-btn')),
                breathPatternSummary: document.getElementById('breathPatternSummary'),
                breathPatternHelper: document.getElementById('breathPatternHelper'),
                safeVisualsToggle: document.getElementById('safeVisualsToggle'),
                audioOnlyToggle: document.getElementById('audioOnlyToggle'),
                reduceMotionToggle: document.getElementById('reduceMotionToggle'),
                intensityButtons: Array.from(document.querySelectorAll('#intensityButtons .intensity-btn')),
                hypnosDurationCard: document.getElementById('hypnosDurationCard'),
                hypnosDurationButtons: Array.from(document.querySelectorAll('#hypnosDurationButtons button')),
                programList: document.getElementById('programList'),
                programStatusModal: document.getElementById('programStatusModal'),
                programOverlay: document.getElementById('programOverlay'),
                programOverlayTitle: document.getElementById('programOverlayTitle'),
                programOverlayBody: document.getElementById('programOverlayBody'),
                programOverlayLabel: document.getElementById('programOverlayLabel'),
                programOverlayStep: document.getElementById('programOverlayStep'),
                programOverlayStepMeta: document.getElementById('programOverlayStepMeta'),
                programContinueBtn: document.getElementById('programContinueBtn'),
                programEndBtn: document.getElementById('programEndBtn'),
                statsToggle: document.getElementById('statsToggle'),
                statsModal: document.getElementById('statsModal'),
                closeStats: document.getElementById('closeStats'),
                statsTotalTime: document.getElementById('statsTotalTime'),
                statsAverageList: document.getElementById('statsAverageList'),
                statsEmpty: document.getElementById('statsEmpty'),
                statsTopProtocols: document.getElementById('statsTopProtocols'),
                statsTimeOfDay: document.getElementById('statsTimeOfDay'),
                statsSparkline: document.getElementById('statsSparkline'),
                feedbackModal: document.getElementById('feedbackModal'),
                feedbackRatings: Array.from(document.querySelectorAll('#feedbackRatings .feedback-rating')),
                feedbackFeelings: Array.from(document.querySelectorAll('#feedbackFeelings .feedback-feeling')),
                submitFeedback: document.getElementById('submitFeedback'),
                closeFeedback: document.getElementById('closeFeedback'),
                skipFeedback: document.getElementById('skipFeedback'),
                feedbackError: document.getElementById('feedbackError'),
                personalizationSource: document.getElementById('personalizationSource'),
                recommendedLabel: document.getElementById('recommendedLabel'),
                recommendedTitle: document.getElementById('recommendedTitle'),
                recommendedDesc: document.getElementById('recommendedDesc'),
                recommendedReason: document.getElementById('recommendedReason'),
                applyRecommended: document.getElementById('applyRecommended'),
                previewRecommended: document.getElementById('previewRecommended'),
                editPersonalization: document.getElementById('editPersonalization'),
                prefGoal: document.getElementById('prefGoal'),
                prefTime: document.getElementById('prefTime'),
                prefSensitivity: document.getElementById('prefSensitivity'),
                onboardingModal: document.getElementById('onboardingModal'),
                onboardingButtons: Array.from(document.querySelectorAll('.onboarding-option')),
                onboardingError: document.getElementById('onboardingError'),
                saveOnboarding: document.getElementById('saveOnboarding'),
                closeOnboarding: document.getElementById('closeOnboarding'),
                skipOnboarding: document.getElementById('skipOnboarding'),
                restartOnboarding: document.getElementById('restartOnboarding'),
                // Elements for Landing Page
                landingPage: document.getElementById('landingPage'),
                enterSystemBtn: document.getElementById('enterSystemBtn'),
                enterDemoBtn: document.getElementById('enterDemoBtn'),
                appInterface: document.getElementById('appInterface'),
                landingGlow: document.getElementById('landingGlow'),
                silentAudio: document.getElementById('silentAudioLoop'),
                releaseNotesCard: document.getElementById('releaseNotesCard'),
                releaseVersionLabel: document.getElementById('releaseVersionLabel'),
                releaseAckBtn: document.getElementById('releaseAckBtn'),
                releaseHideBtn: document.getElementById('releaseHideBtn'),
                releaseSnoozeBtn: document.getElementById('releaseSnoozeBtn'),
                circadianWidget: document.getElementById('circadianWidget'),
                circadianTitle: document.getElementById('circadianTitle'),
                leftPanel: document.getElementById('leftPanel'),
                appFooter: document.getElementById('appFooter'),
                appHeader: document.getElementById('appHeader'),
                calibStepList: document.getElementById('calibStepList'),
                calibEta: document.getElementById('calibEta'),
                calibMode: document.getElementById('calibMode'),
                npsCard: document.getElementById('validationCard'),
                npsScale: document.getElementById('npsScale'),
                npsButtons: Array.from(document.querySelectorAll('#npsScale .nps-btn')),
                npsComment: document.getElementById('npsComment'),
                npsError: document.getElementById('npsError'),
                npsThanks: document.getElementById('npsThanks'),
                npsStatus: document.getElementById('npsStatus'),
                npsSummary: document.getElementById('npsSummary'),
                submitNps: document.getElementById('submitNps'),
                snoozeNps: document.getElementById('snoozeNps'),
                resetNps: document.getElementById('resetNps'),
                openFeedbackFromNps: document.getElementById('openFeedbackFromNps')
            };

            function init() {
                // Initialization Logic
                removeLegacyProgramSidebar();
                applyHypnosDuration(state.hypnosDuration);
                renderModes();
                setSession(state.session);
                initCanvas();
                updateNoiseUI();
                els.breathToggle.checked = state.breathingPacer;
                els.safeVisualsToggle.checked = state.safeVisuals;
                els.audioOnlyToggle.checked = state.audioOnly;
                applyMotionPreference(state.reduceMotion);
                updateIntensityUI();
                updateBreathPatternUI();
                updateHypnosDurationUI();
                updateProgramStatus();
                checkCircadianRhythm();
                updatePersonalizationUI();
                if(els.releaseVersionLabel) els.releaseVersionLabel.textContent = `v${RELEASE_NOTES_VERSION}`;
                updateReleaseNotesUI();
                updateNpsUI();

                window.addEventListener('resize', resizeCanvas);
                setInterval(checkCircadianRhythm, 60000);

                // Activity tracking for Hypnos dimming
                ['mousemove', 'mousedown', 'keydown', 'touchstart'].forEach(evt => {
                    document.addEventListener(evt, () => {
                        state.lastInteraction = performance.now();
                        // Wake up UI
                        els.appHeader.style.opacity = '1';
                        els.leftPanel.style.opacity = '1';
                        els.appFooter.style.opacity = '1';
                    });
                });

                // Interactive Glow on Landing
                document.addEventListener('mousemove', (e) => {
                    if(els.landingPage.style.display !== 'none') {
                        const x = e.clientX;
                        const y = e.clientY;
                        els.landingGlow.style.left = x + 'px';
                        els.landingGlow.style.top = y + 'px';
                    }
                });

                // Landing Page Logic
                if (els.enterSystemBtn) els.enterSystemBtn.addEventListener('click', () => startEntry());

                // Release notes prompt
                if (els.releaseAckBtn) els.releaseAckBtn.addEventListener('click', acknowledgeReleaseNotes);
                if (els.releaseHideBtn) els.releaseHideBtn.addEventListener('click', hideReleaseNotes);
                if (els.releaseSnoozeBtn) els.releaseSnoozeBtn.addEventListener('click', snoozeReleaseNotes);

                els.mainBtn.addEventListener('click', toggleSession);
                document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);
                const focusLockToggle = document.getElementById('focusLockToggle');
                if (focusLockToggle) focusLockToggle.addEventListener('change', (e) => state.focusLock = e.target.checked);

                // Settings
                document.getElementById('settingsToggle').addEventListener('click', () => els.settingsModal.style.display = 'flex');
                document.getElementById('closeSettings').addEventListener('click', () => els.settingsModal.style.display = 'none');

                // Guide
                document.getElementById('guideToggle').addEventListener('click', () => els.guideModal.style.display = 'flex');
                document.getElementById('closeGuide').addEventListener('click', () => els.guideModal.style.display = 'none');

                // Safety
                document.getElementById('safetyToggle').addEventListener('click', () => els.safetyModal.style.display = 'flex');
                document.getElementById('closeSafety').addEventListener('click', () => els.safetyModal.style.display = 'none');

                // Inline NPS + feedback loop
                if(els.npsButtons.length) {
                    els.npsButtons.forEach(btn => btn.addEventListener('click', () => selectNpsScore(parseInt(btn.dataset.score, 10))));
                }
                if(els.submitNps) els.submitNps.addEventListener('click', submitNpsScore);
                if(els.snoozeNps) els.snoozeNps.addEventListener('click', snoozeNpsPrompt);
                if(els.resetNps) els.resetNps.addEventListener('click', resetNpsPrompt);
                if(els.openFeedbackFromNps) els.openFeedbackFromNps.addEventListener('click', () => promptSessionFeedback({ sessionId: state.session || 'prime', startedAt: Date.now(), endedAt: Date.now(), durationSeconds: 0, source: 'inline-nps' }));

                // Stats
                if(els.statsToggle && els.statsModal) {
                    els.statsToggle.addEventListener('click', openStatsModal);
                    els.closeStats.addEventListener('click', closeStatsModal);
                }

                // Audio Tests
                document.getElementById('testLeftButton').addEventListener('click', () => playTestTone(-1));
                document.getElementById('testRightButton').addEventListener('click', () => playTestTone(1));

                // Noise Selection
                els.btnPink.addEventListener('click', () => setNoiseType('pink'));
                els.btnBrown.addEventListener('click', () => setNoiseType('brown'));

                // Breathing Pacer
                els.breathToggle.addEventListener('change', (e) => {
                    state.breathingPacer = e.target.checked;
                    userPreferences.save({ breathEnabled: state.breathingPacer });
                });

                // Safety & display modes
                els.safeVisualsToggle.addEventListener('change', (e) => setSafeVisuals(e.target.checked));
                els.audioOnlyToggle.addEventListener('change', (e) => setAudioOnly(e.target.checked));

                // Intensity selection
                els.intensityButtons.forEach(btn => {
                    btn.addEventListener('click', () => setIntensity(btn.dataset.intensity));
                });

                // Breath pattern selection
                els.breathPatternButtons.forEach(btn => {
                    btn.addEventListener('click', () => setBreathPattern(btn.dataset.pattern));
                });

                // Hypnos durations
                els.hypnosDurationButtons.forEach(btn => {
                    btn.addEventListener('click', () => setHypnosDuration(btn.dataset.duration));
                });

                els.programContinueBtn.addEventListener('click', () => startProgramStep(state.program.stepIndex));
                els.programEndBtn.addEventListener('click', endProgram);

                els.programToggle.addEventListener('click', openProgramModal);
                els.closeProgram.addEventListener('click', closeProgramModal);

                // Feedback modal
                if(els.feedbackModal) {
                    els.feedbackRatings.forEach(btn => btn.addEventListener('click', () => selectFeedbackRating(parseInt(btn.dataset.rating, 10))));
                    els.feedbackFeelings.forEach(btn => btn.addEventListener('click', () => selectFeedbackFeeling(btn.dataset.feeling)));
                    els.submitFeedback.addEventListener('click', submitFeedback);
                    els.closeFeedback.addEventListener('click', hideFeedbackModal);
                    els.skipFeedback.addEventListener('click', hideFeedbackModal);
                }

                // Onboarding
                els.onboardingButtons.forEach(btn => {
                    btn.addEventListener('click', () => setOnboardingChoice(btn.dataset.group, btn.dataset.value));
                });
                els.saveOnboarding.addEventListener('click', () => completeOnboarding());
                els.closeOnboarding.addEventListener('click', () => closeOnboardingModal());
                els.skipOnboarding.addEventListener('click', () => completeOnboarding(true));
                els.restartOnboarding.addEventListener('click', () => openOnboardingModal(true));

                if(els.applyRecommended) els.applyRecommended.addEventListener('click', handleApplyRecommended);
                if(els.previewRecommended) els.previewRecommended.addEventListener('click', handlePreviewRecommended);
                if(els.editPersonalization) els.editPersonalization.addEventListener('click', () => openOnboardingModal(true));

                // Circadian Widget Click
                els.circadianWidget.addEventListener('click', () => {
                    const recommended = els.circadianWidget.dataset.recommended;
                    if(recommended) setSession(recommended);
                });
                els.circadianWidget.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const recommended = els.circadianWidget.dataset.recommended;
                        if(recommended) setSession(recommended);
                    }
                });

                if(els.reduceMotionToggle) {
                    els.reduceMotionToggle.checked = state.reduceMotion;
                    els.reduceMotionToggle.addEventListener('change', (e) => {
                        const value = e.target.checked;
                        userPreferences.save({ reduceMotion: value });
                        applyMotionPreference(value);
                    });
                }

                systemMotionQuery.addEventListener('change', (event) => {
                    if(typeof userPreferences.data.reduceMotion !== 'boolean') {
                        applyMotionPreference(event.matches);
                    }
                });

                requestAnimationFrame(loop);
            }

            // Circadian Sync Logic
            function checkCircadianRhythm() {
                const hour = new Date().getHours();
                let recId = 'prime';
                let recText = 'Inicjalizacja';

                if (hour >= 5 && hour < 10) { recId = 'prime'; recText = 'Okno: Kortyzol / Start'; }
                else if (hour >= 10 && hour < 14) { recId = 'deepFocus'; recText = 'Okno: Produktywność'; }
                else if (hour >= 14 && hour < 17) { recId = 'genesis'; recText = 'Okno: Reset / Theta'; }
                else if (hour >= 17 && hour < 21) { recId = 'clarity'; recText = 'Okno: Integracja'; }
                else { recId = 'hypnos'; recText = 'Okno: Melatonina'; }

                els.circadianTitle.textContent = recText;
                els.circadianWidget.dataset.recommended = recId;
                updatePersonalizationUI();
            }

            const onboardingLabels = {
                goal: {
                    focus: { label: 'Skupienie', note: 'Beta/Gamma' },
                    sleep: { label: 'Sen', note: 'Delta/Theta' },
                    calm: { label: 'Redukcja napięcia', note: 'Alpha 10Hz' },
                    creative: { label: 'Kreatywność', note: 'Theta 6Hz' },
                    social: { label: 'Social', note: 'Alpha 10Hz' }
                },
                typicalTime: {
                    morning: { label: 'Poranek', note: 'Kortyzol start' },
                    work: { label: 'W pracy', note: 'Beta stabilne' },
                    evening: { label: 'Wieczór', note: 'Wind-down' },
                    'pre-sleep': { label: 'Przed snem', note: 'Delta' }
                },
                sensitivity: {
                    low: { label: 'Niska', note: 'Pełne wizualizacje' },
                    medium: { label: 'Średnia', note: 'Domyślne ustawienia' },
                    high: { label: 'Wysoka', note: 'Safe visuals + łagodne audio' }
                }
            };

            function describePreference(group, key) {
                return onboardingLabels[group]?.[key]?.label || '—';
            }

            function buildRecommendationContext() {
                const hasFullPrefs = !!(userPreferences.data.onboardingCompleted && userPreferences.data.goal && userPreferences.data.typicalTime && userPreferences.data.sensitivity);
                if(hasFullPrefs) {
                    const sessionId = resolveOnboardingSession();
                    const goalLabel = describePreference('goal', userPreferences.data.goal);
                    const timeLabel = describePreference('typicalTime', userPreferences.data.typicalTime);
                    const sensitivityLabel = describePreference('sensitivity', userPreferences.data.sensitivity);
                    return {
                        sessionId,
                        label: 'Na podstawie celów',
                        reason: `Cel: ${goalLabel} · Pora: ${timeLabel} · Wrażliwość: ${sensitivityLabel}`,
                        source: 'personalization'
                    };
                }

                const circadian = els.circadianWidget?.dataset.recommended || 'prime';
                return {
                    sessionId: circadian,
                    label: 'Sugestia czasowa',
                    reason: 'Dopasowane do rytmu dobowego (kliknij, aby uruchomić)',
                    source: 'circadian'
                };
            }

            function updatePreferenceBadges() {
                if(!els.prefGoal || !els.prefTime || !els.prefSensitivity) return;
                els.prefGoal.textContent = `Cel: ${describePreference('goal', userPreferences.data.goal)}`;
                els.prefTime.textContent = `Pora: ${describePreference('typicalTime', userPreferences.data.typicalTime)}`;
                els.prefSensitivity.textContent = `Wrażliwość: ${describePreference('sensitivity', userPreferences.data.sensitivity)}`;
            }

            function updatePersonalizationUI() {
                if(!els.recommendedTitle) return;
                const context = buildRecommendationContext();
                const session = sessions[context.sessionId] || sessions[state.session];
                els.recommendedLabel.textContent = context.label;
                els.recommendedTitle.textContent = session?.name || 'Prime';
                els.recommendedDesc.textContent = session?.desc || 'Personalizowany start na bazie Twoich wyborów.';
                els.recommendedReason.textContent = context.reason;
                els.personalizationSource.textContent = context.source === 'personalization' ? 'Personalizacja aktywna' : 'Auto · rytm dobowy';
                if(els.applyRecommended) els.applyRecommended.dataset.sessionId = context.sessionId;
                if(els.previewRecommended) els.previewRecommended.dataset.sessionId = context.sessionId;
                updatePreferenceBadges();
            }

            function setNoiseType(type) {
                state.noiseType = type;
                userPreferences.save({ preferredNoiseType: type });
                updateNoiseUI();
                if(state.active && state.audio.noise) {
                    state.audio.noise.type = type;
                }
            }

            function updateNoiseUI() {
                const active = ['bg-medical-900', 'border-medical-400', 'text-white', 'shadow-[0_0_12px_rgba(34,211,238,0.35)]'];
                const inactive = ['bg-zinc-800', 'border-zinc-700', 'text-zinc-300', 'shadow-none'];
                const setState = (btn, isActive) => {
                    active.forEach(c => btn.classList.toggle(c, isActive));
                    inactive.forEach(c => btn.classList.toggle(c, !isActive));
                };

                const isPink = state.noiseType === 'pink';
                setState(els.btnPink, isPink);
                setState(els.btnBrown, !isPink);
                els.noiseTypeDisplay.textContent = isPink ? "Pink Noise (Soft)" : "Brown Noise (Deep)";
            }

            function applyMotionPreference(reduce) {
                const shouldReduce = !!reduce;
                state.reduceMotion = shouldReduce;
                document.documentElement.classList.toggle('reduce-motion', shouldReduce);
                if(els.reduceMotionToggle) els.reduceMotionToggle.checked = shouldReduce;
            }

            // UI + storage: safe visuals and audio-only toggles with intensity selection
            function setSafeVisuals(enabled) {
                state.safeVisuals = !!enabled;
                els.safeVisualsToggle.checked = state.safeVisuals;
                userPreferences.save({ safeVisuals: state.safeVisuals });
            }

            function setAudioOnly(enabled) {
                state.audioOnly = !!enabled;
                els.audioOnlyToggle.checked = state.audioOnly;
                userPreferences.save({ audioOnly: state.audioOnly });
            }

            function setIntensity(level) {
                if(!intensityProfiles[level]) level = 'medium';
                state.intensityLevel = level;
                userPreferences.save({ intensityLevel: level });
                updateIntensityUI();
            }

            function updateIntensityUI() {
                els.intensityButtons.forEach(btn => {
                    const active = btn.dataset.intensity === state.intensityLevel;
                    btn.classList.toggle('bg-medical-900/40', active);
                    btn.classList.toggle('border-medical-400/60', active);
                    btn.classList.toggle('text-white', active);
                    btn.classList.toggle('shadow-[0_0_12px_rgba(34,211,238,0.3)]', active);
                });
            }

            function ensureProgramListAnchored() {
                // Make sure the single program list node lives inside the modal body
                const list = document.getElementById('programList');
                const modalBody = document.querySelector('#programModal .doc-scroll');
                if(list && modalBody && !modalBody.contains(list)) {
                    modalBody.innerHTML = '';
                    modalBody.appendChild(list);
                }
            }

            function removeLegacyProgramSidebar() {
                // Clean up any previous sidebar widget instances for programs
                const selectors = ['#programSidebar', '#programsSidebar', '.program-sidebar', '.program-widget', '.programs-panel'];
                selectors.forEach(sel => {
                    const node = document.querySelector(sel);
                    if(node) node.remove();
                });

                if(els.leftPanel) {
                    els.leftPanel.querySelectorAll('.program-start, [data-program], [data-legacy-program]').forEach(btn => {
                        const section = btn.closest('section') || btn.parentElement;
                        if(section && section.parentElement === els.leftPanel) section.remove();
                    });
                    Array.from(els.leftPanel.querySelectorAll('section, .glass-panel')).forEach(section => {
                        const text = (section.textContent || '').toLowerCase();
                        if(text.includes('sekwencje kilku protokołów') || text.startsWith('programy')) {
                            section.remove();
                        }
                    });
                }

                ensureProgramListAnchored();
            }

            let onboardingState = {
                goal: userPreferences.data.goal,
                typicalTime: userPreferences.data.typicalTime,
                sensitivity: userPreferences.data.sensitivity
            };

            function setOnboardingChoice(group, value) {
                onboardingState[group] = value;
                els.onboardingError.classList.add('hidden');
                refreshOnboardingUI();
            }

            function refreshOnboardingUI() {
                if(!els.onboardingButtons) return;
                els.onboardingButtons.forEach(btn => {
                    const active = onboardingState[btn.dataset.group] === btn.dataset.value;
                    btn.classList.toggle('onboarding-option-active', active);
                });
            }

            function resolveOnboardingSession() {
                const goalPick = onboardingGoalMap[onboardingState.goal];
                const timePick = onboardingTimeMap[onboardingState.typicalTime];
                if(onboardingState.typicalTime === 'pre-sleep' && onboardingState.goal !== 'sleep') return timePick || goalPick || state.session;
                if(onboardingState.goal === 'sleep' && onboardingState.typicalTime !== 'pre-sleep') return goalPick || timePick || state.session;
                return goalPick || timePick || state.session;
            }

            function completeOnboarding(markOnly = false) {
                if(markOnly) {
                    userPreferences.save({ onboardingCompleted: true });
                    closeOnboardingModal();
                    updatePersonalizationUI();
                    return;
                }
                const { goal, typicalTime, sensitivity } = onboardingState;
                if(!goal || !typicalTime || !sensitivity) {
                    els.onboardingError.classList.remove('hidden');
                    return;
                }

                const recommendedSession = resolveOnboardingSession();
                const intensity = onboardingSensitivityMap[sensitivity] || 'medium';
                const safeVisuals = sensitivity === 'high';

                setSafeVisuals(safeVisuals);
                setIntensity(intensity);
                setSession(recommendedSession);

                userPreferences.save({
                    onboardingCompleted: true,
                    goal,
                    typicalTime,
                    sensitivity,
                    lastSessionId: recommendedSession,
                    intensityLevel: intensity,
                    safeVisuals
                });

                updatePersonalizationUI();
                closeOnboardingModal();
            }

            function handleApplyRecommended() {
                const sessionId = els.applyRecommended?.dataset.sessionId;
                if(!sessionId) return;
                setSession(sessionId);
                if(!state.active) toggleSession('recommended-start');
            }

            function handlePreviewRecommended() {
                const sessionId = els.previewRecommended?.dataset.sessionId;
                if(!sessionId) return;
                setSession(sessionId);
                const session = sessions[sessionId];
                if(session) {
                    els.messageTitle.textContent = `${session.name} · tryb polecany`;
                    els.desc.textContent = session.desc || els.desc.textContent;
                }
            }

            function openOnboardingModal(fromSettings = false) {
                if(!els.onboardingModal) return;
                onboardingState = {
                    goal: userPreferences.data.goal,
                    typicalTime: userPreferences.data.typicalTime,
                    sensitivity: userPreferences.data.sensitivity
                };
                refreshOnboardingUI();
                els.onboardingError.classList.add('hidden');
                els.onboardingModal.classList.remove('hidden');
                els.onboardingModal.style.display = 'flex';
            }

            function closeOnboardingModal() {
                if(!els.onboardingModal) return;
                els.onboardingModal.classList.add('hidden');
                els.onboardingModal.style.display = 'none';
            }

            function resolveBreathPattern() {
                if(state.breathPattern && state.breathPattern !== 'auto') return state.breathPattern;
                return autoBreathMap[state.session] || '4-6';
            }

            function describeBreathSequence(patternId) {
                const pattern = breathPatterns[patternId];
                if(!pattern || !pattern.sequence) return 'Stabilny rytm oddechu';
                return pattern.sequence.map(step => `${step.label} ${step.duration}s`).join(' · ');
            }

            function updateBreathPatternUI() {
                const resolved = resolveBreathPattern();
                const currentLabel = breathPatterns[state.breathPattern]?.label || 'Auto';
                els.breathPatternButtons.forEach(btn => {
                    const active = btn.dataset.pattern === state.breathPattern;
                    btn.classList.toggle('bg-medical-900/40', active);
                    btn.classList.toggle('border-medical-400/60', active);
                    btn.classList.toggle('text-white', active);
                    btn.classList.toggle('shadow-[0_0_12px_rgba(34,211,238,0.3)]', active);
                    btn.classList.toggle('bg-zinc-800', !active);
                    btn.classList.toggle('border-zinc-700', !active);
                    btn.classList.toggle('text-zinc-300', !active);
                });

                const resolvedLabel = breathPatterns[resolved]?.label || '4–6';
                const sequenceText = describeBreathSequence(resolved);
                if(state.breathPattern === 'auto') {
                    const modeName = sessions[state.session]?.name || 'wybranego trybu';
                    els.breathPatternSummary.textContent = `${resolvedLabel} · auto dla ${modeName}`;
                    els.breathPatternHelper.textContent = `Auto wybiera: ${sequenceText}`;
                } else {
                    els.breathPatternSummary.textContent = `${currentLabel} · ${sequenceText}`;
                    els.breathPatternHelper.textContent = sequenceText;
                }
            }

            function setBreathPattern(pattern) {
                state.breathPattern = breathPatterns[pattern] ? pattern : 'auto';
                userPreferences.save({ breathPattern: state.breathPattern });
                updateBreathPatternUI();
            }

            function getHypnosDurationSeconds(key) {
                const minutes = hypnosDurations[key] ?? hypnosDurations['infinity'];
                if (minutes === Infinity) return Infinity;
                return (minutes * 60) / HYPNOS_TEST_ACCELERATION;
            }

            function applyHypnosDuration(key) {
                const durationSeconds = getHypnosDurationSeconds(key);
                sessions.hypnos.duration = durationSeconds;
                const cloned = JSON.parse(JSON.stringify(hypnosBasePhases));
                cloned[1].end = durationSeconds === Infinity ? Infinity : durationSeconds;
                sessions.hypnos.phases = cloned;
            }

            function getSessionData() {
                return state.sessionDataOverride || sessions[state.session];
            }

            function cloneSessionWithDuration(sessionId, durationSeconds) {
                const base = sessions[sessionId];
                if(!base) return null;
                if(durationSeconds === undefined || durationSeconds === null || durationSeconds === base.duration) return base;
                const referenceDuration = base.duration === Infinity
                    ? base.phases.reduce((max, p) => Math.max(max, p.end === Infinity ? p.start : p.end), 0)
                    : base.duration;
                const ratio = durationSeconds === Infinity || referenceDuration === 0 ? 1 : (durationSeconds / referenceDuration);
                const phases = base.phases.map(p => ({
                    ...p,
                    start: p.start * ratio,
                    end: p.end === Infinity ? Infinity : p.end * ratio,
                    audio: { ...p.audio },
                    visual: { ...p.visual }
                }));
                return { ...base, duration: durationSeconds, phases };
            }

            function getProgramById(id) {
                return programs.find(p => p.id === id);
            }

            function formatProgramStep(step, idx, total) {
                const sessionName = sessions[step.sessionId]?.name || step.sessionId;
                const minutes = step.durationMinutes === Infinity ? '∞' : `${step.durationMinutes} min`;
                return `${idx + 1}/${total}: ${sessionName} · ${minutes}`;
            }

            function renderPrograms() {
                ensureProgramListAnchored();
                els.programList = document.getElementById('programList');
                if(!els.programList) return;
                els.programList.innerHTML = '';
                if(!programs.length) {
                    els.programList.innerHTML = '<p class="text-sm text-zinc-400">Brak dostępnych programów.</p>';
                    return;
                }
                programs.forEach(program => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'border border-white/5 rounded-xl p-4 bg-zinc-950/40 h-full flex flex-col gap-3';
                    const stepsText = program.steps.map((step, idx) => formatProgramStep(step, idx, program.steps.length)).map(text => `<li>${text}</li>`).join('');
                    wrapper.innerHTML = `
                        <div class="flex items-start justify-between gap-3">
                            <div class="space-y-1">
                                <div class="flex items-center gap-2">
                                    <span class="text-[10px] font-bold uppercase tracking-widest text-medical-400">${program.name}</span>
                                    <span class="text-[10px] text-zinc-500">${program.steps.length} kroki</span>
                                </div>
                                <p class="text-xs text-zinc-300 leading-relaxed">${program.description}</p>
                            </div>
                            <button data-program="${program.id}" class="program-start px-3 py-2 text-[10px] uppercase tracking-wider bg-medical-400 text-black rounded hover:shadow-[0_0_14px_rgba(34,211,238,0.4)] transition-all">Start</button>
                        </div>
                        <ul class="mt-1 text-[11px] text-zinc-300 leading-relaxed space-y-1 list-disc list-inside">${stepsText}</ul>
                    `;
                    els.programList.appendChild(wrapper);
                });

                els.programList.querySelectorAll('.program-start').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.currentTarget.dataset.program;
                        startProgram(id);
                    });
                });
            }

            function openProgramModal() {
                ensureProgramListAnchored();
                els.programModal = document.getElementById('programModal');
                els.programList = document.getElementById('programList');
                els.programStatusModal = document.getElementById('programStatusModal');
                if(!els.programModal || !els.programList) return;
                renderPrograms();
                updateProgramStatus();
                els.programModal.classList.remove('hidden');
                els.programModal.style.display = 'flex';
            }

            function closeProgramModal() {
                if(!els.programModal) return;
                els.programModal.classList.add('hidden');
                els.programModal.style.display = 'none';
                removeLegacyProgramSidebar();
            }

            function updateProgramStatus() {
                if(!state.program.active) {
                    if(els.programStatusModal) els.programStatusModal.textContent = 'Brak aktywnego programu';
                    return;
                }
                const program = getProgramById(state.program.id);
                if(!program) {
                    if(els.programStatusModal) els.programStatusModal.textContent = 'Program nieznany';
                    return;
                }
                const stepNo = Math.min(state.program.stepIndex + 1, program.steps.length);
                const suffix = state.program.awaitingNext ? ' · pauza' : '';
                const label = `${program.name}: krok ${stepNo}/${program.steps.length}${suffix}`;
                if(els.programStatusModal) els.programStatusModal.textContent = label;
            }

            function hideProgramOverlay() {
                els.programOverlay.classList.add('hidden');
            }

            function showProgramOverlay(config) {
                const { label, title, body, stepText, stepMeta, showContinue } = config;
                els.programOverlayLabel.textContent = label;
                els.programOverlayTitle.textContent = title;
                els.programOverlayBody.textContent = body;
                els.programOverlayStep.textContent = stepText;
                els.programOverlayStepMeta.textContent = stepMeta;
                els.programContinueBtn.classList.toggle('hidden', !showContinue);
                els.programOverlay.classList.remove('hidden');
            }

            function resolveProgramDuration(step) {
                if(step.durationMinutes === Infinity) return Infinity;
                if(typeof step.durationMinutes === 'number') return step.durationMinutes * 60;
                return null;
            }

            function startProgram(programId) {
                const program = getProgramById(programId);
                if(!program || state.active) return;
                if(els.programModal) closeProgramModal();
                state.program = { active: true, id: programId, stepIndex: 0, awaitingNext: false };
                updateProgramStatus();
                startProgramStep(0);
            }

            function startProgramStep(index) {
                const program = getProgramById(state.program.id);
                if(!program) { endProgram(); return; }
                const step = program.steps[index];
                if(!step) { endProgram(); return; }
                state.program.stepIndex = index;
                state.program.awaitingNext = false;
                const durationSeconds = resolveProgramDuration(step);
                setSession(step.sessionId, { overrideDurationSeconds: durationSeconds, skipSave: true });
                updateProgramStatus();
                hideProgramOverlay();
                if(!state.active) toggleSession('program-start');
            }

            function handleProgramAfterStep() {
                if(!state.program.active) return;
                const program = getProgramById(state.program.id);
                if(!program) { endProgram(); return; }
                const nextIndex = state.program.stepIndex + 1;
                if(nextIndex >= program.steps.length) {
                    state.program.active = false;
                    state.program.awaitingNext = false;
                    updateProgramStatus();
                    showProgramOverlay({
                        label: 'Program zakończony',
                        title: `${program.name} ukończony`,
                        body: 'Wszystkie etapy zostały wykonane. Możesz zakończyć program i wrócić do pojedynczych trybów.',
                        stepText: `Zrealizowano ${program.steps.length} / ${program.steps.length} kroków`,
                        stepMeta: '',
                        showContinue: false
                    });
                } else {
                    const nextStep = program.steps[nextIndex];
                    const stepText = formatProgramStep(nextStep, nextIndex, program.steps.length);
                    const minutes = nextStep.durationMinutes === Infinity ? '∞' : `${nextStep.durationMinutes} min`;
                    const sessionName = sessions[nextStep.sessionId]?.name || nextStep.sessionId;
                    state.program.awaitingNext = true;
                    state.program.stepIndex = nextIndex;
                    updateProgramStatus();
                    showProgramOverlay({
                        label: 'Następny etap programu',
                        title: program.name,
                        body: 'Rozpocznij kolejny etap lub zakończ program.',
                        stepText,
                        stepMeta: `${sessionName} · ${minutes}`,
                        showContinue: true
                    });
                }
            }

            function endProgram() {
                state.program = { active: false, id: null, stepIndex: 0, awaitingNext: false };
                state.sessionDataOverride = null;
                hideProgramOverlay();
                updateProgramStatus();
                if(!state.active) setSession(state.session);
            }

            function setHypnosDuration(key) {
                state.hypnosDuration = key;
                userPreferences.save({ hypnosDuration: key });
                applyHypnosDuration(key);
                updateHypnosDurationUI();
                if(state.session === 'hypnos' && !state.active) {
                    els.timer.textContent = formatTime(sessions.hypnos.duration);
                }
            }

            function updateHypnosDurationUI() {
                const isHypnos = state.session === 'hypnos';
                els.hypnosDurationCard.classList.toggle('hidden', !isHypnos);
                els.hypnosDurationButtons.forEach(btn => {
                    const selected = btn.dataset.duration === state.hypnosDuration;
                    btn.classList.toggle('border-medical-400', selected);
                    btn.classList.toggle('text-white', selected);
                    btn.classList.toggle('bg-medical-900/60', selected);
                });
            }

            let entryInProgress = false;

            function startEntry({ demo = false } = {}) {
                if (!els.landingPage || !els.appInterface || entryInProgress) return;

                const content = els.landingPage.querySelector('.max-w-5xl');
                if(content) {
                    content.style.opacity = '0';
                    content.style.transition = 'opacity 0.5s';
                }

                entryInProgress = true;
                toggleLandingCtas(true);

                if(!demo) {
                    els.silentAudio.play().catch(e => console.log("Silent play prevented"));
                } else {
                    state.audioOnly = true;
                    userPreferences.save({ audioOnly: true });
                    if (els.audioOnlyToggle) els.audioOnlyToggle.checked = true;
                }

                setCalibrationContext(demo);

                setTimeout(() => {
                    els.landingPage.style.display = 'none';
                    const calib = document.getElementById('calibrationOverlay');
                    const targetDuration = demo ? 6500 : 12000;
                    if(calib) calib.style.display = 'flex';

                    const finish = () => {
                        entryInProgress = false;
                        toggleLandingCtas(false);
                        if(calib && calib.style.display !== 'none') {
                            calib.style.opacity = 0;
                            setTimeout(() => { calib.style.display = 'none'; }, 300);
                        }
                        els.appInterface.style.display = 'block';
                        requestAnimationFrame(() => {
                            els.appInterface.style.opacity = '1';
                            resizeCanvas();
                            setTimeout(() => {
                                if(!userPreferences.data.onboardingCompleted) openOnboardingModal();
                            }, 300);
                        });
                    };

                    const failSafe = setTimeout(() => finish(), targetDuration + 1500);

                    simulateCalibration(() => {
                        clearTimeout(failSafe);
                        finish();
                    }, { demo, targetDuration });
                }, 500);
            }

            function toggleLandingCtas(disabled) {
                [els.enterSystemBtn].forEach(btn => {
                    if(!btn) return;
                    btn.disabled = disabled;
                    btn.classList.toggle('is-loading', disabled);
                    btn.setAttribute('aria-busy', disabled ? 'true' : 'false');
                });
            }

            function simulateCalibration(callback, { demo = false, targetDuration } = {}) {
                const overlay = document.getElementById('calibrationOverlay');
                const bar = document.getElementById('calibBar');
                const text = document.getElementById('calibText');
                const perc = document.getElementById('calibPercent');
                if(!overlay || !bar || !text || !perc) { if(callback) callback(); return; }
                let p = 0;
                const steps = demo ? [
                    { p: 20, t: "Sprawdzanie wizualizacji (demo)", s: 1 },
                    { p: 50, t: "Redukcja migotania", s: 2 },
                    { p: 80, t: "Strojenie płynności animacji", s: 3 },
                    { p: 100, t: "Tryb demo gotowy." , s: 4}
                ] : [
                    { p: 18, t: "Sprawdzanie kanałów L/R", s: 1 },
                    { p: 44, t: "Kalibracja balansu głośności", s: 2 },
                    { p: 72, t: "Strojenie oscylatorów", s: 3 },
                    { p: 100, t: "Audio + wizualizacje gotowe." , s: 4}
                ];
                let stepIdx = 0;
                const targetDurationMs = targetDuration || (demo ? 6500 : 12000);
                const interval = setInterval(() => {
                    const increment = 100 / (targetDurationMs / 120);
                    p += increment + Math.random() * 1.5;
                    if(p > steps[stepIdx].p) { text.textContent = steps[stepIdx].t; stepIdx = Math.min(stepIdx + 1, steps.length - 1); updateCalibrationSteps(steps[stepIdx].s); }
                    if(p >= 100) {
                        p = 100;
                        clearInterval(interval);
                        updateCalibrationSteps(steps[steps.length - 1].s + 1, true);
                        setTimeout(() => { overlay.style.opacity = 0; setTimeout(() => { overlay.style.display = 'none'; if(callback) callback(); }, 800); }, 500);
                    }
                    bar.style.width = p + "%"; perc.textContent = Math.floor(p) + "%";
                }, 120);
            }

            function setCalibrationContext(demo) {
                if (!els.calibEta || !els.calibMode) return;
                els.calibMode.textContent = demo ? 'Podgląd wizualizacji' : 'Pełna kalibracja audio';
                els.calibEta.textContent = demo ? '~6s' : '~12s';
                updateCalibrationSteps(1);
            }

            function updateCalibrationSteps(activeStep, forceComplete = false) {
                if(!els.calibStepList) return;
                const steps = Array.from(els.calibStepList.querySelectorAll('[data-step]'));
                steps.forEach(node => {
                    const step = Number(node.dataset.step);
                    const status = node.querySelector('.calib-step-status');
                    const isComplete = forceComplete ? step <= activeStep : step < activeStep;
                    const isActive = !forceComplete && step === activeStep;
                    node.classList.toggle('is-active', isActive);
                    node.classList.toggle('is-complete', isComplete);
                    if(status) {
                        status.textContent = isComplete ? 'OK' : isActive ? '...': '—';
                    }
                });
            }

            function openStatsModal() {
                renderStats();
                els.statsModal.style.display = 'flex';
            }

            function closeStatsModal() {
                els.statsModal.style.display = 'none';
            }

            function renderStats() {
                const now = Date.now();
                const windowStart = now - 7 * 24 * 3600 * 1000;
                const logs = sessionLogs.data.filter(l => (l.endedAt ?? l.startedAt ?? 0) >= windowStart);

                const totalSeconds = logs.reduce((acc, l) => acc + (l.durationSeconds || 0), 0);
                els.statsTotalTime.textContent = totalSeconds > 0 ? formatDurationHuman(totalSeconds) : '0 min';

                const ratingsByProtocol = {};
                logs.forEach(l => {
                    if(typeof l.rating === 'number') {
                        if(!ratingsByProtocol[l.sessionId]) ratingsByProtocol[l.sessionId] = { sum: 0, count: 0 };
                        ratingsByProtocol[l.sessionId].sum += l.rating;
                        ratingsByProtocol[l.sessionId].count += 1;
                    }
                });

                els.statsAverageList.innerHTML = '';
                if(Object.keys(ratingsByProtocol).length === 0) {
                    els.statsEmpty.classList.remove('hidden');
                } else {
                    els.statsEmpty.classList.add('hidden');
                    Object.entries(ratingsByProtocol).forEach(([id, data]) => {
                        const avg = (data.sum / data.count).toFixed(2);
                        const name = sessions[id]?.name || id;
                        const row = document.createElement('div');
                        row.className = 'flex items-center justify-between text-sm text-zinc-200 bg-zinc-900/40 border border-white/5 rounded px-3 py-2';
                        row.innerHTML = `<span class="font-medium">${name}</span><span class="font-mono text-medical-400">${avg}</span>`;
                        els.statsAverageList.appendChild(row);
                    });
                }

                const top = Object.entries(ratingsByProtocol)
                    .map(([id, data]) => ({ id, avg: data.sum / data.count }))
                    .sort((a,b) => b.avg - a.avg)
                    .slice(0,3)
                    .map(item => `${sessions[item.id]?.name || item.id} (${item.avg.toFixed(1)})`);
                els.statsTopProtocols.textContent = top.length ? top.join(', ') : 'Brak danych';

                const buckets = { morning: 0, midday: 0, evening: 0, night: 0 };
                logs.forEach(l => {
                    const hour = new Date(l.startedAt || l.endedAt || now).getHours();
                    if(hour >= 6 && hour < 12) buckets.morning++;
                    else if(hour >= 12 && hour < 18) buckets.midday++;
                    else if(hour >= 18 && hour < 24) buckets.evening++;
                    else buckets.night++;
                });
                const entries = Object.entries(buckets).filter(([,v]) => v > 0);
                if(entries.length === 0) els.statsTimeOfDay.textContent = 'Brak danych';
                else {
                    const best = entries.sort((a,b) => b[1]-a[1])[0][0];
                    const labelMap = { morning: 'Poranek (6–12)', midday: 'Dzień (12–18)', evening: 'Wieczór (18–24)', night: 'Noc (0–6)' };
                    els.statsTimeOfDay.textContent = labelMap[best] || best;
                }

                renderStatsSparkline(logs);
            }

            function renderStatsSparkline(logs) {
                if(!els.statsSparkline) return;
                const dayMs = 24 * 3600 * 1000;
                const today = new Date();
                const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const buckets = Array.from({ length: 7 }, (_, idx) => ({
                    dayLabel: `D-${6 - idx}`,
                    totalMinutes: 0,
                    date: new Date(startOfToday.getTime() - (6 - idx) * dayMs)
                }));

                logs.forEach(log => {
                    const ts = log.startedAt || log.endedAt || Date.now();
                    const dayStart = new Date(ts);
                    dayStart.setHours(0,0,0,0);
                    const diffDays = Math.round((startOfToday.getTime() - dayStart.getTime()) / dayMs);
                    if(diffDays >= 0 && diffDays < 7) {
                        const bucketIndex = 6 - diffDays;
                        buckets[bucketIndex].totalMinutes += (log.durationSeconds || 0) / 60;
                    }
                });

                const values = buckets.map(b => b.totalMinutes);
                const max = Math.max(...values, 1);
                const width = 260;
                const height = 56;
                const pad = 6;
                const innerH = height - pad * 2;
                const step = buckets.length > 1 ? (width - pad * 2) / (buckets.length - 1) : 0;

                const points = values.map((v, idx) => {
                    const x = pad + idx * step;
                    const y = height - pad - (v / max) * innerH;
                    return `${idx === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
                }).join(' ');

                const area = `${points} L ${pad + (values.length -1) * step},${height - pad} L ${pad},${height - pad} Z`;

                const svg = `
                    <svg viewBox="0 0 ${width} ${height}" role="presentation" aria-hidden="true">
                        <defs>
                            <linearGradient id="sparkline-stroke" x1="0%" x2="100%" y1="0%" y2="0%">
                                <stop offset="0%" stop-color="rgba(34, 211, 238, 0.95)" />
                                <stop offset="50%" stop-color="rgba(244, 114, 182, 0.85)" />
                                <stop offset="100%" stop-color="rgba(14, 165, 233, 0.9)" />
                            </linearGradient>
                            <linearGradient id="sparkline-fill" x1="0%" x2="0%" y1="0%" y2="100%">
                                <stop offset="0%" stop-color="rgba(34, 211, 238, 0.25)" />
                                <stop offset="100%" stop-color="rgba(6, 182, 212, 0.02)" />
                            </linearGradient>
                        </defs>
                        <path d="${area}" fill="url(#sparkline-fill)" stroke="none" />
                        <path d="${points}" fill="none" stroke="url(#sparkline-stroke)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>`;

                els.statsSparkline.innerHTML = svg;
                const readable = buckets.map(b => `${b.date.toLocaleDateString('pl-PL', { weekday: 'short' })}: ${Math.round(b.totalMinutes)} min`).join(', ');
                els.statsSparkline.setAttribute('aria-label', `Aktywność z ostatnich 7 dni – ${readable}`);
            }

            function selectFeedbackRating(val) {
                state.pendingFeedback = state.pendingFeedback || {};
                state.pendingFeedback.rating = val;
                els.feedbackRatings.forEach(btn => btn.classList.toggle('feedback-active', parseInt(btn.dataset.rating, 10) === val));
                els.feedbackError.classList.add('hidden');
            }

            function selectFeedbackFeeling(val) {
                state.pendingFeedback = state.pendingFeedback || {};
                state.pendingFeedback.feeling = val;
                els.feedbackFeelings.forEach(btn => btn.classList.toggle('feedback-active', btn.dataset.feeling === val));
                els.feedbackError.classList.add('hidden');
            }

            function promptSessionFeedback(meta) {
                state.pendingFeedback = { ...meta, rating: null, feeling: null };
                els.feedbackRatings.forEach(btn => btn.classList.remove('feedback-active'));
                els.feedbackFeelings.forEach(btn => btn.classList.remove('feedback-active'));
                els.feedbackError.classList.add('hidden');
                if(els.feedbackModal) els.feedbackModal.style.display = 'flex';
            }

            function hideFeedbackModal() {
                if(els.feedbackModal) els.feedbackModal.style.display = 'none';
                state.pendingFeedback = null;
            }

            function submitFeedback() {
                if(!state.pendingFeedback) { hideFeedbackModal(); return; }
                const { rating, feeling } = state.pendingFeedback;
                if(typeof rating !== 'number' || !feeling) {
                    els.feedbackError.classList.remove('hidden');
                    return;
                }
                const entry = { ...state.pendingFeedback, rating, feeling };
                sessionLogs.add(entry);
                renderStats();
                hideFeedbackModal();
            }

            function shouldShowReleaseNotes() {
                if(!els.releaseNotesCard) return false;
                const now = Date.now();
                const { acknowledgedVersion, snoozedUntil } = releaseNotesPrefs.data;
                if(acknowledgedVersion === RELEASE_NOTES_VERSION) return false;
                if(snoozedUntil && now < snoozedUntil) return false;
                return true;
            }

            function updateReleaseNotesUI() {
                if(!els.releaseNotesCard) return;
                const show = shouldShowReleaseNotes();
                els.releaseNotesCard.classList.toggle('hidden', !show);
            }

            function acknowledgeReleaseNotes() {
                releaseNotesPrefs.save({ acknowledgedVersion: RELEASE_NOTES_VERSION, snoozedUntil: null });
                updateReleaseNotesUI();
            }

            function hideReleaseNotes() {
                releaseNotesPrefs.save({ snoozedUntil: Date.now() + THREE_DAYS_MS });
                updateReleaseNotesUI();
            }

            function snoozeReleaseNotes() {
                releaseNotesPrefs.save({ snoozedUntil: Date.now() + THREE_DAYS_MS * 2 });
                updateReleaseNotesUI();
            }

            function selectNpsScore(score) {
                state.npsScore = score;
                els.npsButtons.forEach(btn => btn.classList.toggle('nps-active', parseInt(btn.dataset.score, 10) === score));
                if(els.npsError) els.npsError.classList.add('hidden');
            }

            function clearNpsSelection() {
                state.npsScore = null;
                els.npsButtons.forEach(btn => btn.classList.remove('nps-active'));
                if(els.npsError) els.npsError.classList.add('hidden');
            }

            function shouldShowNpsPrompt() {
                const now = Date.now();
                const { lastNpsAt, snoozedUntil } = feedbackPulse.data;
                if(snoozedUntil && now < snoozedUntil) return false;
                if(!lastNpsAt) return true;
                return (now - lastNpsAt) > THREE_DAYS_MS;
            }

            function updateNpsUI() {
                if(!els.npsCard) return;
                const showPrompt = shouldShowNpsPrompt();
                const summaryText = feedbackPulse.data.lastNpsScore !== null ? `Ostatnia ocena: ${feedbackPulse.data.lastNpsScore}/10` : 'Odpowiedź zapisana';
                if(els.npsStatus) els.npsStatus.textContent = showPrompt ? 'Otwarta' : 'Zapisano';

                if(els.npsScale) els.npsScale.style.display = showPrompt ? 'grid' : 'none';
                if(els.submitNps) els.submitNps.disabled = !showPrompt;
                if(els.snoozeNps) els.snoozeNps.disabled = !showPrompt;
                if(els.npsComment) {
                    if(showPrompt) els.npsComment.value = feedbackPulse.data.lastNpsNote || '';
                    els.npsComment.disabled = !showPrompt;
                }
                if(els.npsThanks) els.npsThanks.classList.toggle('hidden', showPrompt);
                if(els.npsSummary) els.npsSummary.textContent = !showPrompt ? `${summaryText}${feedbackPulse.data.lastNpsNote ? ` · „${feedbackPulse.data.lastNpsNote}”` : ''}` : '—';
                if(showPrompt) {
                    clearNpsSelection();
                } else if(feedbackPulse.data.lastNpsScore !== null) {
                    selectNpsScore(feedbackPulse.data.lastNpsScore);
                }
            }

            function submitNpsScore() {
                if(typeof state.npsScore !== 'number') {
                    if(els.npsError) els.npsError.classList.remove('hidden');
                    return;
                }
                const note = (els.npsComment?.value || '').trim();
                feedbackPulse.save({ lastNpsAt: Date.now(), lastNpsScore: state.npsScore, lastNpsNote: note, snoozedUntil: null });
                updateNpsUI();
            }

            function snoozeNpsPrompt() {
                feedbackPulse.save({ snoozedUntil: Date.now() + THREE_DAYS_MS });
                updateNpsUI();
            }

            function resetNpsPrompt() {
                feedbackPulse.save({ lastNpsAt: null, lastNpsScore: null, lastNpsNote: '', snoozedUntil: null });
                clearNpsSelection();
                if(els.npsComment) els.npsComment.value = '';
                updateNpsUI();
            }

            function renderModes() {
                els.modeContainer.innerHTML = '';
                Object.values(sessions).forEach(s => {
                    const btn = document.createElement('button');
                    btn.className = `mode-btn w-full text-left p-3 rounded border transition-all duration-200 flex flex-col gap-1 group relative overflow-hidden`;
                    btn.dataset.id = s.id;
                    btn.innerHTML = `<div class="flex items-center justify-between w-full relative z-10"><div class="flex items-center gap-3"><div class="text-zinc-500 group-hover:text-medical-400 transition-colors icon-container">${s.icon}</div><span class="font-bold text-[11px] uppercase tracking-wider">${s.name}</span></div><span class="text-[9px] font-mono text-zinc-500">${s.duration === Infinity ? "∞" : Math.floor(s.duration/60) + " MIN"}</span></div>`;
                    btn.addEventListener('click', () => setSession(s.id));
                    els.modeContainer.appendChild(btn);
                });
            }

            function setSession(id, options = {}) {
                if (state.active) return;
                state.session = id;
                const overrideSeconds = options.overrideDurationSeconds ?? null;
                state.sessionDataOverride = overrideSeconds ? cloneSessionWithDuration(id, overrideSeconds) : null;
                if(!options.skipSave) userPreferences.save({ lastSessionId: id });
                const data = getSessionData();

                if(id === 'hypnos') {
                    setNoiseType('brown');
                    applyHypnosDuration(state.hypnosDuration);
                } else {
                    els.hypnosDurationCard.classList.add('hidden');
                }

                document.querySelectorAll('.mode-btn').forEach(b => {
                    const isActive = b.dataset.id === id;
                    const icon = b.querySelector('.icon-container');
                    if(isActive) {
                        b.classList.remove('border-transparent', 'text-zinc-500');
                        b.classList.add('bg-medical-900/30', 'border-medical-500/50', 'text-white', 'glow-box-cyan');
                        icon.classList.remove('text-zinc-500');
                        icon.classList.add('text-medical-400');
                    } else {
                        b.classList.add('border-transparent', 'text-zinc-500');
                        b.classList.remove('bg-medical-900/30', 'border-medical-500/50', 'text-white', 'glow-box-cyan');
                        icon.classList.add('text-zinc-500');
                        icon.classList.remove('text-medical-400');
                    }
                });
                els.messageTitle.textContent = data.name;
                els.desc.textContent = data.desc;
                els.timer.textContent = formatTime(data.duration);
                els.realtimeHz.textContent = "0.00 Hz";
                els.phaseName.textContent = "Gotowy";
                updateBreathPatternUI();
                updateHypnosDurationUI();
                updateQuickActionsUI();
            }

            function updateQuickActionsUI() {
                if(els.mainBtn) {
                    els.mainBtn.innerHTML = state.active
                        ? '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg><span class="sr-only">Zatrzymaj</span>'
                        : '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span class="sr-only">Uruchom</span>';
                    els.mainBtn.setAttribute('aria-pressed', state.active ? 'true' : 'false');
                    els.mainBtn.setAttribute('title', state.active ? 'Zatrzymaj' : 'Uruchom');
                }
            }

            async function startAudio() {
                await Tone.start();

                const data = getSessionData();

                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: 'Kora Cortex',
                        artist: 'Bio-Entrainment System',
                        album: data.name
                    });
                    navigator.mediaSession.setActionHandler('play', toggleSession);
                    navigator.mediaSession.setActionHandler('pause', toggleSession);
                }
                const startPhase = data.phases[0];
                const startL = startPhase.audio.l || 220;
                const startR = startPhase.audio.r || 228;
                const intensity = intensityProfiles[state.intensityLevel] || intensityProfiles.medium;

                state.audio.gain = new Tone.Gain(0).toDestination();
                const pL = new Tone.Panner(-1).connect(state.audio.gain);
                const pR = new Tone.Panner(1).connect(state.audio.gain);

                state.audio.oscL = new Tone.Oscillator(startL, "sine").connect(pL).start();
                state.audio.oscR = new Tone.Oscillator(startR, "sine").connect(pR).start();

                state.audio.noiseGain = new Tone.Gain(0).toDestination();
                state.audio.noise = new Tone.Noise(state.noiseType).connect(state.audio.noiseGain).start();

                state.audio.noiseGain.gain.rampTo(0.08, 3);
                state.audio.gain.gain.rampTo(0.1 * (intensity.gain || 1), 1);
            }

            function stopAudio() {
                if (state.audio.oscL) { state.audio.oscL.dispose(); state.audio.oscL = null; }
                if (state.audio.oscR) { state.audio.oscR.dispose(); state.audio.oscR = null; }
                if (state.audio.gain) { state.audio.gain.dispose(); state.audio.gain = null; }
                if (state.audio.noise) { state.audio.noise.dispose(); state.audio.noise = null; }
                if (state.audio.noiseGain) { state.audio.noiseGain.dispose(); state.audio.noiseGain = null; }
            }

            function updateAudio(phase, progress, t) {
                if (!state.audio.gain || !state.audio.oscL || !state.audio.oscR) return;
                const a = phase.audio || {};
                if (a.l) state.audio.oscL.frequency.value = a.l;
                if (a.r) state.audio.oscR.frequency.value = a.r;

                const intensity = intensityProfiles[state.intensityLevel] || intensityProfiles.medium;

                const currentHz = Math.abs(state.audio.oscL.frequency.value - state.audio.oscR.frequency.value);
                const displayHz = (currentHz + (Math.random() * 0.05 - 0.025)).toFixed(2);
                els.realtimeHz.textContent = `${displayHz} Hz`;

                let vol = 0.2;
                if(a.vol !== undefined) vol = a.vol;
                else if(a.vol_s !== undefined && a.vol_e !== undefined) {
                    vol = (progress === undefined || isNaN(progress)) ? a.vol_s : lerp(a.vol_s, a.vol_e, progress);
                }

                vol = vol * (intensity.gain || 1);

                const rampFactor = 1 - (state.hypnosRampProgress * 0.9);
                vol = Math.max(0, vol * rampFactor);

                if (a.mod === 'iso') {
                    const rate = 2;
                    const mod = (Math.sin(t * Math.PI * 2 * rate) + 1) / 2;
                    state.audio.gain.gain.value = vol * mod;
                } else {
                    state.audio.gain.gain.value = vol;
                }

                const deltaFactor = intensity.delta || 1;
                if(deltaFactor !== 1) {
                    const l = state.audio.oscL.frequency.value;
                    const r = state.audio.oscR.frequency.value;
                    const center = (l + r) / 2;
                    const diff = ((r - l) / 2) * deltaFactor;
                    state.audio.oscL.frequency.value = center - diff;
                    state.audio.oscR.frequency.value = center + diff;
                }
            }

            // Smooth Hypnos ramp-down before auto-stop
            function startHypnosRampDown() {
                if(state.hypnosRampTimer || !state.active) return;
                const startGain = state.audio.gain?.gain.value ?? 0;
                const startNoise = state.audio.noiseGain?.gain.value ?? 0;
                state.hypnosRampProgress = 0;
                state.hypnosRampTimer = setInterval(() => {
                    state.hypnosRampProgress = Math.min(1, state.hypnosRampProgress + 0.1);
                    if(state.audio.gain) state.audio.gain.gain.rampTo(startGain * (1 - state.hypnosRampProgress), 0.3);
                    if(state.audio.noiseGain) state.audio.noiseGain.gain.rampTo(startNoise * (1 - state.hypnosRampProgress), 0.3);
                    if(state.hypnosRampProgress >= 1) {
                        clearInterval(state.hypnosRampTimer);
                        state.hypnosRampTimer = null;
                        toggleSession('auto-complete');
                    }
                }, 700);
            }

            async function playTestTone(pan) {
                await Tone.start();
                const synth = new Tone.Synth().toDestination();
                const panner = new Tone.Panner(pan).toDestination();
                synth.connect(panner);
                synth.triggerAttackRelease("C5", "0.2");
            }

            function initCanvas() {
                state.ctx = els.canvas.getContext('2d');
                resizeCanvas();
            }

            function resizeCanvas() {
                const container = els.canvas.parentElement;
                const rect = container.getBoundingClientRect();
                els.canvas.width = rect.width;
                els.canvas.height = rect.height;
            }

            function drawVisual(phase, progress, t) {
                const ctx = state.ctx;
                const w = els.canvas.width;
                const h = els.canvas.height;
                const v = phase.visual || { f: 1, mod: 'soft', bri: 0.5 };

                if(state.reduceMotion) {
                    ctx.fillStyle = '#050505';
                    ctx.fillRect(0, 0, w, h);
                    ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.28, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.fillStyle = 'rgba(228, 228, 231, 0.8)';
                    ctx.font = '12px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Ograniczone animacje · tryb bez ruchu', w / 2, h / 2 + 6);
                    return;
                }

                if(state.audioOnly) {
                    const grad = ctx.createLinearGradient(0, 0, 0, h);
                    grad.addColorStop(0, 'rgba(10,10,12,0.95)');
                    grad.addColorStop(1, 'rgba(5,5,7,0.98)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, w, h);
                    return;
                }

                // HYPNOS BLACKOUT LOGIC
                let isHypnos = state.session === 'hypnos';

                let freq = v.f;
                if (v.f_s && v.f_e && !isNaN(progress)) freq = lerp(v.f_s, v.f_e, progress);

                let modType = v.mod;
                let safeBrightnessCap = 1;
                if(state.safeVisuals) {
                    freq = Math.min(freq, state.session === 'overdrive' ? 12 : 10);
                    modType = modType === 'hard' ? 'soft' : modType;
                    safeBrightnessCap = state.session === 'overdrive' ? 0.6 : 0.5;
                }

                const pulseRaw = Math.sin(t * Math.PI * 2 * freq);
                const pulse = (pulseRaw + 1) / 2;

                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, w, h);

                let bri = v.bri || 0.8;
                if (isHypnos && state.active) {
                    bri = bri * 0.05; // Ultra dim for sleep
                }

                if (modType === 'breath') bri = bri * (0.6 + 0.4 * pulse);
                else if (modType === 'soft') bri = bri * (0.8 + 0.2 * pulse);
                else if (modType === 'hard') bri = pulseRaw > 0 ? 1 : 0;

                bri = bri * (1 - state.hypnosRampProgress * 0.8);
                bri = Math.min(bri, safeBrightnessCap);

                if (bri > 0.001) {
                    const maxR = Math.sqrt(w*w + h*h) * 0.6;
                    const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, maxR);
                    const cVal = Math.floor(bri * 255);
                    grad.addColorStop(0, `rgba(${cVal}, ${cVal}, ${cVal + 20}, 1)`);
                    grad.addColorStop(1, 'rgba(0,0,0,1)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, w, h);
                }

                // Only draw oscilloscope if NOT in Hypnos mode
                if (!isHypnos) {
                    ctx.beginPath();
                    ctx.lineWidth = state.safeVisuals ? 1.2 : 2;
                    ctx.strokeStyle = `rgba(34, 211, 238, ${0.5 + bri*0.5})`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#22d3ee';
                    const amplitude = h * 0.15 * (state.safeVisuals ? 0.6 : 1);
                    const centerY = h / 2;
                    for(let x=0; x<w; x+=2) {
                        const y = centerY + Math.sin((x + t * 100) * 0.02) * amplitude * bri + Math.sin((x - t * 50) * 0.05) * (amplitude/2);
                        if(x===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }

                if (state.breathingPacer) {
                    // Hide pacer in Hypnos to avoid light
                    if (!isHypnos || !state.active) {
                        const patternId = resolveBreathPattern();
                        const preset = breathPatterns[patternId] || breathPatterns['4-6'];
                        const sequence = preset.sequence || breathPatterns['4-6'].sequence;
                        const totalDuration = sequence.reduce((acc, step) => acc + step.duration, 0) || 10;
                        const cycleT = t % totalDuration;
                        let breathProgress = 0;
                        let breathLabel = "";
                        let elapsed = 0;
                        let currentLevel = 0;

                        for (const step of sequence) {
                            const start = elapsed;
                            const end = elapsed + step.duration;
                            const targetLevel = step.label === 'IN' ? 1 : step.label === 'OUT' ? 0 : currentLevel;

                            if (cycleT >= start && cycleT < end) {
                                const localP = (cycleT - start) / step.duration;
                                if (targetLevel > currentLevel) {
                                    breathProgress = currentLevel + (1 - Math.pow(1 - localP, 3)) * (targetLevel - currentLevel);
                                } else if (targetLevel < currentLevel) {
                                    breathProgress = currentLevel - Math.pow(localP, 3) * (currentLevel - targetLevel);
                                } else {
                                    breathProgress = currentLevel;
                                }
                                breathLabel = step.label;
                                break;
                            }

                            currentLevel = targetLevel;
                            elapsed = end;
                        }

                        if (!breathLabel) {
                            breathLabel = sequence[sequence.length - 1]?.label || 'HOLD';
                            breathProgress = currentLevel;
                        }

                        const baseR = Math.min(w, h) * 0.2;
                        const maxR = Math.min(w, h) * 0.35;
                        const currentR = baseR + (maxR - baseR) * breathProgress;
                        ctx.beginPath();
                        ctx.arc(w/2, h/2, currentR, 0, Math.PI * 2);
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = `rgba(34, 211, 238, 0.5)`;
                        ctx.stroke();
                        ctx.fillStyle = `rgba(34, 211, 238, ${0.05 + 0.1 * breathProgress})`;
                        ctx.fill();
                        ctx.font = "12px JetBrains Mono";
                        ctx.fillStyle = `rgba(34, 211, 238, 0.9)`;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(breathLabel, w/2, h/2);
                    }
                }
            }

            async function toggleSession(reason = 'manual') {
                if (state.active) {
                    const endTs = Date.now();
                    const elapsed = Math.max(1, Math.round((endTs - (state.sessionStartTs || endTs)) / 1000));
                    const feedbackMeta = { sessionId: state.session, startedAt: state.sessionStartTs || endTs, endedAt: endTs, durationSeconds: elapsed };
                    state.active = false;
                    if(state.hypnosRampTimer) { clearInterval(state.hypnosRampTimer); state.hypnosRampTimer = null; }
                    state.hypnosRampProgress = 0;
                    stopAudio();
                    els.canvas.style.opacity = 0;
                    els.msgBox.style.opacity = 1;
                    els.msgBox.style.transform = "scale(1)";
                    els.timer.classList.remove('glow-text-cyan');
                    if (els.statusText) els.statusText.textContent = "Standby";
                    if (els.statusDot) {
                        els.statusDot.className = "w-2 h-2 rounded-full bg-zinc-600 shadow-none";
                        els.statusDot.style.boxShadow = 'none';
                    }

                    els.appHeader.style.opacity = '1';
                    els.leftPanel.style.opacity = '1';
                    els.appFooter.style.opacity = '1';

                    disableFocusLock();
                    state.sessionStartTs = null;
                    setSession(state.session);
                    handleProgramAfterStep();
                    promptSessionFeedback(feedbackMeta);
                    updateQuickActionsUI();
                } else {
                    await startAudio();
                    state.active = true;
                    state.sessionStartTs = Date.now();
                    state.startTime = performance.now();
                    state.hypnosRampProgress = 0;
                    state.lastInteraction = performance.now();
                    els.canvas.style.opacity = 1;
                    els.msgBox.style.opacity = 0;
                    els.msgBox.style.transform = "scale(0.95)";
                    els.mainBtn.setAttribute('title', 'Zatrzymaj');
                    els.timer.classList.add('glow-text-cyan');
                    if (els.statusText) els.statusText.textContent = "ACTIVE";
                    if (els.statusDot) {
                        els.statusDot.className = "w-2 h-2 rounded-full bg-medical-400 animate-pulse";
                        els.statusDot.style.boxShadow = '0 0 8px #22d3ee';
                    }
                    if(state.focusLock) enableFocusLock();
                    updateQuickActionsUI();
                }
            }

            function togglePreview() {
                if (state.active) return;
                state.preview = !state.preview;
                els.canvas.style.opacity = state.preview ? 1 : 0;
                els.msgBox.style.opacity = state.preview ? 0 : 1;
                state.lastInteraction = performance.now();
                state.startTime = performance.now();
                if(state.preview) els.realtimeHz.textContent = "PREVIEW";
                updateQuickActionsUI();
            }

            function loop() {
                const now = performance.now();

                const shouldDimControls = (state.active || state.preview) && (now - state.lastInteraction > 4000);
                if (els.controlPanel) {
                    els.controlPanel.classList.toggle('control-dock--dim', shouldDimControls);
                }

                if (state.active && state.session === 'hypnos') {
                    if (now - state.lastInteraction > 5000) {
                        els.appHeader.style.opacity = '0.1';
                        els.leftPanel.style.opacity = '0.1';
                        els.appFooter.style.opacity = '0';
                    }
                }

                if (state.active || state.preview) {
                    const data = getSessionData();
                    const elapsed = (now - state.startTime) / 1000;

                    if (state.active && data.duration !== Infinity) {
                        if(state.session === 'hypnos') {
                            if(elapsed >= data.duration) { startHypnosRampDown(); }
                        } else if (elapsed >= data.duration) { toggleSession('auto-complete'); return; }
                    }

                    let currentPhase = data.phases[data.phases.length-1];
                    for(let i=0; i<data.phases.length; i++) {
                        const p = data.phases[i];
                        if (elapsed >= p.start && (elapsed < p.end || p.end === Infinity)) {
                            currentPhase = p;
                            break;
                        }
                    }

                    if (state.preview) { drawVisual(data.phases[1] || data.phases[0], 0.5, elapsed); }
                    else {
                        const phaseDuration = currentPhase.end === Infinity ? 1 : (currentPhase.end - currentPhase.start);
                        const phaseProgress = currentPhase.end === Infinity ? 0 : (elapsed - currentPhase.start) / phaseDuration;

                        updateAudio(currentPhase, phaseProgress, elapsed);
                        drawVisual(currentPhase, phaseProgress, elapsed);

                        if(data.duration === Infinity) {
                            els.timer.textContent = "∞";
                            els.progressBar.style.width = "100%";
                        } else {
                            els.timer.textContent = formatTime(Math.max(0, data.duration - elapsed));
                            els.progressBar.style.width = `${(elapsed / data.duration) * 100}%`;
                        }
                        els.phaseName.textContent = currentPhase.name;
                    }
                }
                requestAnimationFrame(loop);
            }

            function formatDurationHuman(seconds) {
                if(!seconds || seconds <= 0) return '0 min';
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                if(hours > 0) return `${hours}h ${minutes.toString().padStart(2,'0')}m`;
                return `${minutes} min`;
            }

            function formatTime(s) {
                if(s === Infinity) return "∞";
                const m = Math.floor(s / 60).toString().padStart(2,'0');
                const sec = Math.floor(s % 60).toString().padStart(2,'0');
                return `${m}:${sec}`;
            }
            function lerp(a, b, t) { return a + (b - a) * t; }
            function enableFocusLock() { document.documentElement.requestFullscreen().catch(()=>{}); document.addEventListener('keydown', lockKey); }
            function disableFocusLock() { if(document.fullscreenElement) document.exitFullscreen().catch(()=>{}); document.removeEventListener('keydown', lockKey); }
            function lockKey(e) { if(e.key === 'Escape') { e.preventDefault(); toggleSession(); } }
            function toggleFullscreen() {
                const el = document.getElementById('visualizer');
                if(!document.fullscreenElement && !document.webkitFullscreenElement) {
                    if(el.requestFullscreen) el.requestFullscreen();
                    else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                } else {
                    if(document.exitFullscreen) document.exitFullscreen();
                    else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
                }
            }
            ['fullscreenchange', 'webkitfullscreenchange'].forEach(event => { document.addEventListener(event, () => { setTimeout(resizeCanvas, 100); }); });
            init();
