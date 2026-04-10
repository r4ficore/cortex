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
                },
                auroraReset: {
                    id: "auroraReset",
                    name: "Aurora Reset",
                    category: "Reset",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path><polyline points="21 3 21 12 12 12"></polyline></svg>`,
                    desc: "Reset dobowy po zmianie strefy – od delta/theta do łagodnego świtu.",
                    duration: 1800,
                    baseHz: "Delta-Theta 1.5-9Hz",
                    phases: [
                        { name: "Prime", start: 0, end: 300, audio: { l: 160, r: 164, vol_s: 0.12, vol_e: 0.18 }, visual: { f: 5, mod: 'soft', bri: 0.35 } },
                        { name: "Anchor", start: 300, end: 1200, audio: { l: 180, r: 188, vol_s: 0.18, vol_e: 0.25, mod: 'pulse' }, visual: { f: 9, mod: 'breath', bri: 0.45 } },
                        { name: "Stabilize", start: 1200, end: 1800, audio: { l: 170, r: 175, vol_s: 0.22, vol_e: 0.12 }, visual: { f: 6, mod: 'soft', bri: 0.4 } }
                    ]
                },
                cortexForge: {
                    id: "cortexForge",
                    name: "Cortex Forge",
                    category: "Work",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
                    desc: "Hiper-fokus kognitywny z mikropulsami Gamma i przerwami co 10 min.",
                    duration: 2040,
                    baseHz: "Beta/Gamma 12-40Hz",
                    phases: [
                        { name: "Ignite", start: 0, end: 240, audio: { l: 230, r: 244, vol_s: 0.18, vol_e: 0.32 }, visual: { f: 12, mod: 'soft', bri: 0.65 } },
                        { name: "Drive", start: 240, end: 1800, audio: { l: 250, r: 268, vol_s: 0.3, vol_e: 0.42, mod: 'pulse' }, visual: { f: 18, mod: 'hard', bri: 0.85 } },
                        { name: "Cool", start: 1800, end: 2040, audio: { l: 210, r: 222, vol_s: 0.32, vol_e: 0.15 }, visual: { f: 12, mod: 'breath', bri: 0.55 } }
                    ]
                },
                parasymPathway: {
                    id: "parasymPathway",
                    name: "Parasym Pathway",
                    category: "Calm",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0"></path><path d="M12 7v10"></path><path d="M9 10h6"></path></svg>`,
                    desc: "Reset parasympatyczny z zejściem do 3-4Hz i powrotem do 8Hz.",
                    duration: 1440,
                    baseHz: "Theta-Delta 3-8Hz",
                    phases: [
                        { name: "Release", start: 0, end: 300, audio: { l: 170, r: 176, vol_s: 0.12, vol_e: 0.22 }, visual: { f: 7, mod: 'breath', bri: 0.4 } },
                        { name: "Deep Sink", start: 300, end: 1020, audio: { l: 140, r: 143, vol_s: 0.22, vol_e: 0.2, mod: 'pulse' }, visual: { f: 4, mod: 'soft', bri: 0.25 } },
                        { name: "Rebalance", start: 1020, end: 1440, audio: { l: 170, r: 178, vol_s: 0.2, vol_e: 0.14 }, visual: { f: 8, mod: 'soft', bri: 0.35 } }
                    ]
                },
                remSculpt: {
                    id: "remSculpt",
                    name: "REM Sculpt",
                    category: "Sleep",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3z"></path><path d="M14 14h7v7h-7z"></path><path d="M7 14h2v2H7z"></path><path d="M15 7h2v2h-2z"></path><path d="M10 3 21 14"></path></svg>`,
                    desc: "Hipnagogia i REM Drift z markerami 10Hz i łagodnym wybudzeniem.",
                    duration: 2100,
                    baseHz: "Theta/Alpha 4-10Hz",
                    phases: [
                        { name: "Hypnagogic Gate", start: 0, end: 600, audio: { l: 170, r: 176, vol_s: 0.1, vol_e: 0.22 }, visual: { f: 7, mod: 'breath', bri: 0.45 } },
                        { name: "REM Drift", start: 600, end: 1800, audio: { l: 160, r: 166, vol_s: 0.22, vol_e: 0.28, mod: 'pulse' }, visual: { f: 6, mod: 'soft', bri: 0.4 } },
                        { name: "Wake Buffer", start: 1800, end: 2100, audio: { l: 180, r: 188, vol_s: 0.28, vol_e: 0.15 }, visual: { f: 9, mod: 'soft', bri: 0.5 } }
                    ]
                },
                gammaLift: {
                    id: "gammaLift",
                    name: "Gamma Lift",
                    category: "Activation",
                    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20 20 5"></path><path d="m9 5 11 0 0 11"></path><path d="M5 9h4v4"></path></svg>`,
                    desc: "Szybkie pobudzenie Gamma z kontrolowanym lądowaniem do 12Hz.",
                    duration: 960,
                    baseHz: "Gamma 35-40Hz",
                    phases: [
                        { name: "Ramp", start: 0, end: 180, audio: { l: 240, r: 258, vol_s: 0.22, vol_e: 0.36 }, visual: { f: 16, mod: 'pulse', bri: 0.75 } },
                        { name: "Peak", start: 180, end: 660, audio: { l: 260, r: 300, vol_s: 0.36, vol_e: 0.4, mod: 'hard' }, visual: { f: 38, mod: 'hard', bri: 0.9 } },
                        { name: "Landing", start: 660, end: 960, audio: { l: 230, r: 242, vol_s: 0.35, vol_e: 0.16 }, visual: { f: 12, mod: 'breath', bri: 0.55 } }
                    ]
                }
            };

            // ── English translation map for Polish session data ──
            const sessionTranslations = {
                hypnos: {
                    desc: 'Deep sleep architecture. Delta waves (0.5-2Hz) facilitate falling asleep and sustain N3 deep sleep phase. Infinite mode.',
                    phases: { 'Indukcja Snu': 'Sleep Induction', 'Głęboki Sen': 'Deep Sleep' }
                },
                prime: {
                    desc: 'Neural warm-up (5 min). Gentle transition from Alpha to Beta waves. Perfect for starting the day.',
                    phases: { 'Inicjacja Alpha': 'Alpha Initiation', 'Aktywacja Beta': 'Beta Activation' }
                },
                overdrive: {
                    desc: 'Intense Gamma stimulation (30-40Hz). Short session to break through procrastination.',
                    phases: { 'Ramp Up': 'Ramp Up', 'Gamma Peak': 'Gamma Peak', 'Cool Down': 'Cool Down' }
                },
                deepFocus: {
                    desc: 'Classic deep focus (15 min). Stable Beta waves help maintain concentration on a single task.',
                    phases: { 'Indukcja': 'Induction', 'Tunel': 'Tunnel', 'Wyjście': 'Exit' }
                },
                clarity: {
                    desc: 'Strategic thinking. Balanced Alpha/Beta session for planning and organizing thoughts.',
                    phases: { 'Centrowanie': 'Centering', 'Analiza': 'Analysis', 'Synteza': 'Synthesis' }
                },
                genesis: {
                    desc: 'Flow State (Theta 6-7Hz). Deep relaxation with visualization. Ideal for brainstorming and creative tasks.',
                    phases: { 'Zejście': 'Descent', 'Theta Flow': 'Theta Flow', 'Powrót': 'Return' }
                },
                equilibrium: {
                    desc: 'Anxiety and stress reduction. Stable 10Hz Alpha grounds and calms the nervous system without causing drowsiness.',
                    phases: { 'Uziemienie': 'Grounding', 'Stabilizacja': 'Stabilization', 'Wyciszenie': 'Quieting' }
                },
                restoration: {
                    desc: 'Deep regeneration (Delta 2-4Hz). Very slow waves for physical and mental recovery.',
                    phases: { 'Zwolnienie': 'Deceleration', 'Delta Immersion': 'Delta Immersion', 'Przebudzenie': 'Awakening' }
                },
                presence: {
                    desc: 'Social readiness. Light stimulation before meetings and presentations.',
                    phases: { 'Flow': 'Flow', 'Spokój': 'Calm' }
                },
                auroraReset: {
                    desc: 'Circadian reset after timezone changes — from delta/theta to gentle dawn.',
                    phases: { 'Prime': 'Prime', 'Anchor': 'Anchor', 'Stabilize': 'Stabilize' }
                },
                cortexForge: {
                    desc: 'Hyper-cognitive focus with Gamma micropulses and rest intervals every 10 minutes.',
                    phases: { 'Ignite': 'Ignite', 'Drive': 'Drive', 'Cool': 'Cool' }
                },
                parasymPathway: {
                    desc: 'Parasympathetic reset descending to 3-4Hz and returning to 8Hz for deep nervous system restoration.',
                    phases: { 'Release': 'Release', 'Deep Sink': 'Deep Sink', 'Rebalance': 'Rebalance' }
                },
                remSculpt: {
                    desc: 'Hypnagogia and REM Drift with 10Hz markers and gentle awakening buffer.',
                    phases: { 'Hypnagogic Gate': 'Hypnagogic Gate', 'REM Drift': 'REM Drift', 'Wake Buffer': 'Wake Buffer' }
                },
                gammaLift: {
                    desc: 'Rapid Gamma stimulation with controlled landing to 12Hz for cognitive enhancement.',
                    phases: { 'Ramp': 'Ramp', 'Peak': 'Peak', 'Landing': 'Landing' }
                }
            };

            // ── i18n helpers for session/program text ──
            function getLocalizedDesc(session) {
                if (getLang() === 'pl') return session.desc;
                const tr = sessionTranslations[session.id];
                return tr ? tr.desc : session.desc;
            }

            function getLocalizedPhaseName(sessionId, phaseName) {
                if (getLang() === 'pl') return phaseName;
                const tr = sessionTranslations[sessionId];
                return (tr && tr.phases && tr.phases[phaseName]) || phaseName;
            }

            const programTranslations = {
                flow90: 'Phased Ramp-up: Calming start into intense isochronic focus.',
                socialUpgrade: 'Meeting preparation — gentle stimulation and calming.',
                sleepReset: 'Evening sequence for regeneration and sleep.',
                powerNap45: 'Short regenerative sequence for a daytime break.',
                creativeBloom: 'Gentle stimulation and flow for conceptual work.'
            };

            function getLocalizedProgramDesc(program) {
                if (getLang() === 'pl') return program.description;
                return programTranslations[program.id] || program.description;
            }

            const programs = [
                {
                    id: 'flow90',
                    name: 'Flow 90',
                    description: 'Phased Ramp-up: Uziemienie przed izochronicznym focusem.',
                    steps: [
                        { sessionId: 'deepFocus', durationMinutes: 5 },
                        { sessionId: 'prime', durationMinutes: 10 },
                        { sessionId: 'clarity', durationMinutes: 55 },
                        { sessionId: 'equilibrium', durationMinutes: 20 }
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
                reduceMotion: null,
                masterVolume: 0.85,
                beatVolume: 0.95,
                noiseVolume: 0.75
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
                    { label: 'WDECH', duration: 4 },
                    { label: 'WYDECH', duration: 6 }
                ] },
                '4-7-8': { label: '4–7–8', sequence: [
                    { label: 'WDECH', duration: 4 },
                    { label: 'WSTRZYMAJ', duration: 7 },
                    { label: 'WYDECH', duration: 8 }
                ] },
                box: { label: 'Box 4–4–4–4', sequence: [
                    { label: 'WDECH', duration: 4 },
                    { label: 'WSTRZYMAJ', duration: 4 },
                    { label: 'WYDECH', duration: 4 },
                    { label: 'WSTRZYMAJ', duration: 4 }
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

            const volumeDefaults = {
                master: 0.85,
                beat: 0.95,
                noise: 0.75
            };

            const audioBaseLevels = {
                beat: 0.18,
                noise: 0.12
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
                masterVolume: typeof userPreferences.data.masterVolume === 'number' ? userPreferences.data.masterVolume : volumeDefaults.master,
                beatVolume: typeof userPreferences.data.beatVolume === 'number' ? userPreferences.data.beatVolume : volumeDefaults.beat,
                noiseVolume: typeof userPreferences.data.noiseVolume === 'number' ? userPreferences.data.noiseVolume : volumeDefaults.noise,
                sessionDataOverride: null,
                completed: false,
                program: { active: false, id: null, stepIndex: 0, awaitingNext: false },
                pendingFeedback: null,
                npsScore: null,
                hypnosRampProgress: 0,
                hypnosRampTimer: null,
                ctx: null,
                audio: {
                    oscL: null,
                    oscR: null,
                    beatGain: null,
                    noise: null,
                    noiseGain: null,
                    masterGain: null
                },
                analyser: null,
                currentBeatGain: 0,
                currentBeatBase: 0,
                lastInteraction: 0 // For UI dimming
            };

            const els = {
                canvas: document.getElementById('visualCanvas'),
                timer: document.getElementById('timer'),
                progressBar: document.getElementById('progressBar'),
                mainBtn: document.getElementById('mainActionBtn'),
                visualizer: document.getElementById('visualizer'),
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
                masterVolumeSlider: document.getElementById('masterVolume'),
                beatVolumeSlider: document.getElementById('beatVolume'),
                noiseVolumeSlider: document.getElementById('noiseVolume'),
                masterVolumeValue: document.getElementById('masterVolumeValue'),
                beatVolumeValue: document.getElementById('beatVolumeValue'),
                noiseVolumeValue: document.getElementById('noiseVolumeValue'),
                resetAudioSettings: document.getElementById('resetAudioSettings'),
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
                sessionStatusCard: document.getElementById('sessionStatusCard'),
                statusCardAnchor: document.getElementById('statusCardAnchor'),
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
                updateVolumeUI();
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
                        wakeControls();
                    });
                });

                const visualizerEl = document.getElementById('visualizer');
                if(visualizerEl) {
                    ['mousemove', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
                        visualizerEl.addEventListener(evt, wakeControls);
                    });
                }
                if(els.mainBtn) {
                    els.mainBtn.addEventListener('focus', wakeControls);
                    els.mainBtn.addEventListener('blur', () => { if(state.active) wakeControls(); });
                }

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

                if(els.masterVolumeSlider) els.masterVolumeSlider.addEventListener('input', (e) => setMasterVolume(parseInt(e.target.value, 10)));
                if(els.beatVolumeSlider) els.beatVolumeSlider.addEventListener('input', (e) => setBeatVolume(parseInt(e.target.value, 10)));
                if(els.noiseVolumeSlider) els.noiseVolumeSlider.addEventListener('input', (e) => setNoiseVolume(parseInt(e.target.value, 10)));
                if(els.resetAudioSettings) els.resetAudioSettings.addEventListener('click', resetAudioSettings);

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
                let recText = t('circadian.init');

                if (hour >= 5 && hour < 10) { recId = 'prime'; recText = t('circadian.cortisol'); }
                else if (hour >= 10 && hour < 14) { recId = 'deepFocus'; recText = t('circadian.productivity'); }
                else if (hour >= 14 && hour < 17) { recId = 'genesis'; recText = t('circadian.reset'); }
                else if (hour >= 17 && hour < 21) { recId = 'clarity'; recText = t('circadian.integration'); }
                else { recId = 'hypnos'; recText = t('circadian.melatonin'); }

                els.circadianTitle.textContent = recText;
                els.circadianWidget.dataset.recommended = recId;
                updatePersonalizationUI();
            }

            const onboardingLabels = {
                goal: {
                    focus: { label: () => t('onboard.goal.focus'), note: 'Beta/Gamma' },
                    sleep: { label: () => t('onboard.goal.sleep'), note: 'Delta/Theta' },
                    calm: { label: () => t('onboard.goal.calm'), note: 'Alpha 10Hz' },
                    creative: { label: () => t('onboard.goal.creative'), note: 'Theta 6Hz' },
                    social: { label: () => t('onboard.goal.social'), note: 'Alpha 10Hz' }
                },
                typicalTime: {
                    morning: { label: () => t('onboard.time.morning'), note: 'Cortisol start' },
                    work: { label: () => t('onboard.time.work'), note: 'Beta stable' },
                    evening: { label: () => t('onboard.time.evening'), note: 'Wind-down' },
                    'pre-sleep': { label: () => t('onboard.time.preSleep'), note: 'Delta' }
                },
                sensitivity: {
                    low: { label: () => t('onboard.sens.low'), note: 'Full visuals' },
                    medium: { label: () => t('onboard.sens.medium'), note: 'Default' },
                    high: { label: () => t('onboard.sens.high'), note: 'Safe visuals + gentle audio' }
                }
            };

            function describePreference(group, key) {
                const entry = onboardingLabels[group]?.[key];
                if (!entry) return '—';
                return typeof entry.label === 'function' ? entry.label() : entry.label;
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
                        label: t('recommend.based_on_goals'),
                        reason: t('recommend.reason').replace('{goal}', goalLabel).replace('{time}', timeLabel).replace('{sens}', sensitivityLabel),
                        source: 'personalization'
                    };
                }

                const circadian = els.circadianWidget?.dataset.recommended || 'prime';
                return {
                    sessionId: circadian,
                    label: t('recommend.circadian_label'),
                    reason: t('recommend.circadian_reason'),
                    source: 'circadian'
                };
            }

            function updatePreferenceBadges() {
                if(!els.prefGoal || !els.prefTime || !els.prefSensitivity) return;
                els.prefGoal.textContent = `${t('pref.goal')}: ${describePreference('goal', userPreferences.data.goal)}`;
                els.prefTime.textContent = `${t('pref.time')}: ${describePreference('typicalTime', userPreferences.data.typicalTime)}`;
                els.prefSensitivity.textContent = `${t('pref.sensitivity')}: ${describePreference('sensitivity', userPreferences.data.sensitivity)}`;
            }

            function updatePersonalizationUI() {
                if(!els.recommendedTitle) return;
                const context = buildRecommendationContext();
                const session = sessions[context.sessionId] || sessions[state.session];
                els.recommendedLabel.textContent = context.label;
                els.recommendedTitle.textContent = session?.name || 'Prime';
                els.recommendedDesc.textContent = session ? getLocalizedDesc(session) : t('recommend.default_desc');
                els.recommendedReason.textContent = context.reason;
                els.personalizationSource.textContent = context.source === 'personalization' ? t('recommend.personalization_active') : t('recommend.circadian_auto');
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

            function clampVolume(val, min = 0.1, max = 1.2) {
                if(typeof val !== 'number' || Number.isNaN(val)) return min;
                return Math.min(max, Math.max(min, val));
            }

            function updateVolumeUI() {
                if(els.masterVolumeSlider) els.masterVolumeSlider.value = Math.round(state.masterVolume * 100);
                if(els.beatVolumeSlider) els.beatVolumeSlider.value = Math.round(state.beatVolume * 100);
                if(els.noiseVolumeSlider) els.noiseVolumeSlider.value = Math.round(state.noiseVolume * 100);
                if(els.masterVolumeValue) els.masterVolumeValue.textContent = `${Math.round(state.masterVolume * 100)}%`;
                if(els.beatVolumeValue) els.beatVolumeValue.textContent = `${Math.round(state.beatVolume * 100)}%`;
                if(els.noiseVolumeValue) els.noiseVolumeValue.textContent = `${Math.round(state.noiseVolume * 100)}%`;
            }

            function applyVolumeToAudio({ ramp = true } = {}) {
                const time = ramp ? 0.35 : 0;
                if(state.audio.masterGain) state.audio.masterGain.gain.rampTo(state.masterVolume, time);
                if(state.audio.noiseGain) state.audio.noiseGain.gain.rampTo(audioBaseLevels.noise * state.noiseVolume, ramp ? 0.6 : 0);
                const beatTarget = state.currentBeatBase ? state.currentBeatBase * state.beatVolume : state.audio.gain?.gain.value || 0;
                state.currentBeatGain = beatTarget;
                if(state.audio.gain) state.audio.gain.gain.rampTo(beatTarget, ramp ? 0.4 : 0);
            }

            function setMasterVolume(val) {
                state.masterVolume = clampVolume(val / 100, 0.2, 1.1);
                userPreferences.save({ masterVolume: state.masterVolume });
                updateVolumeUI();
                applyVolumeToAudio();
            }

            function setBeatVolume(val) {
                state.beatVolume = clampVolume(val / 100, 0.2, 1.2);
                userPreferences.save({ beatVolume: state.beatVolume });
                updateVolumeUI();
                applyVolumeToAudio();
            }

            function setNoiseVolume(val) {
                state.noiseVolume = clampVolume(val / 100, 0.1, 1.2);
                userPreferences.save({ noiseVolume: state.noiseVolume });
                updateVolumeUI();
                applyVolumeToAudio();
            }

            function resetAudioSettings() {
                state.masterVolume = volumeDefaults.master;
                state.beatVolume = volumeDefaults.beat;
                state.noiseVolume = volumeDefaults.noise;
                userPreferences.save({
                    masterVolume: state.masterVolume,
                    beatVolume: state.beatVolume,
                    noiseVolume: state.noiseVolume
                });
                updateVolumeUI();
                applyVolumeToAudio({ ramp: false });
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
                    els.programList.innerHTML = `<p class="text-sm text-zinc-400">${t('programs.no_programs')}</p>`;
                    return;
                }
                programs.forEach(program => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'border border-white/5 rounded-xl p-4 bg-zinc-950/40 h-full flex flex-col gap-3';
                    const stepsInline = program.steps.map(step => sessions[step.sessionId]?.name || step.sessionId).join(' <span class="text-zinc-600">→</span> ');
                    wrapper.innerHTML = `
                        <div class="flex items-start justify-between gap-3">
                            <div class="space-y-1">
                                <div class="flex items-center gap-2">
                                    <span class="text-[10px] font-bold uppercase tracking-widest text-medical-400">${program.name}</span>
                                    <span class="text-[10px] text-zinc-500">${program.steps.length} ${t('programs.steps')}</span>
                                </div>
                                <p class="text-xs text-zinc-300 leading-relaxed">${getLocalizedProgramDesc(program)}</p>
                            </div>
                            <button data-program="${program.id}" class="program-start px-3 py-2 text-[10px] uppercase tracking-wider bg-medical-400 text-black rounded hover:shadow-[0_0_14px_rgba(34,211,238,0.4)] transition-all">${t('programs.start')}</button>
                        </div>
                        <div class="mt-1 text-[11px] text-zinc-400 font-mono flex flex-wrap gap-1 items-center bg-zinc-900/50 p-2 rounded">${stepsInline}</div>
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
                    if(els.programStatusModal) els.programStatusModal.textContent = t('programs.status_none') || 'Brak aktywnego programu';
                    return;
                }
                const program = getProgramById(state.program.id);
                if(!program) {
                    if(els.programStatusModal) els.programStatusModal.textContent = t('programs.status_none') || 'Brak aktywnego programu';
                    return;
                }
                const stepNo = Math.min(state.program.stepIndex + 1, program.steps.length);
                const suffix = state.program.awaitingNext ? ' · pauza' : '';
                const label = `${program.name}: ${stepNo}/${program.steps.length}${suffix}`;
                if(els.programStatusModal) els.programStatusModal.textContent = label;
            }

            function hideProgramOverlay() {
                if (els.programOverlay) els.programOverlay.classList.add('hidden');
            }

            function showProgramOverlay(config) {
                if (!els.programOverlay || !els.programContinueBtn) return;
                const { label, title, body, stepText, stepMeta, showContinue } = config;
                if (els.programOverlayLabel) els.programOverlayLabel.textContent = label;
                if (els.programOverlayTitle) els.programOverlayTitle.textContent = title;
                if (els.programOverlayBody) els.programOverlayBody.textContent = body;
                if (els.programOverlayStep) els.programOverlayStep.textContent = stepText;
                if (els.programOverlayStepMeta) els.programOverlayStepMeta.textContent = stepMeta;
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
                let programEnded = false;
                let awaitingNext = false;
                if(!state.program.active) return { programEnded, awaitingNext };
                const program = getProgramById(state.program.id);
                if(!program) { endProgram(); return { programEnded: true, awaitingNext }; }
                const nextIndex = state.program.stepIndex + 1;
                if(nextIndex >= program.steps.length) {
                    state.program.active = false;
                    state.program.awaitingNext = false;
                    programEnded = true;
                    updateProgramStatus();
                    showProgramOverlay({
                        label: getLang() === 'pl' ? 'Program zakończony' : 'Program completed',
                        title: getLang() === 'pl' ? `${program.name} ukończony` : `${program.name} completed`,
                        body: getLang() === 'pl' ? 'Wszystkie etapy zostały wykonane. Możesz zakończyć program i wrócić do pojedynczych trybów.' : 'All steps completed. You can end the program and return to single protocols.',
                        stepText: getLang() === 'pl' ? `Zrealizowano ${program.steps.length} / ${program.steps.length} kroków` : `Completed ${program.steps.length} / ${program.steps.length} steps`,
                        stepMeta: '',
                        showContinue: false
                    });
                } else {
                    const nextStep = program.steps[nextIndex];
                    const stepText = formatProgramStep(nextStep, nextIndex, program.steps.length);
                    const minutes = nextStep.durationMinutes === Infinity ? '∞' : `${nextStep.durationMinutes} min`;
                    const sessionName = sessions[nextStep.sessionId]?.name || nextStep.sessionId;
                    state.program.awaitingNext = true;
                    awaitingNext = true;
                    state.program.stepIndex = nextIndex;
                    updateProgramStatus();
                    showProgramOverlay({
                        label: getLang() === 'pl' ? 'Następny etap programu' : 'Next program step',
                        title: program.name,
                        body: getLang() === 'pl' ? 'Rozpocznij kolejny etap lub zakończ program.' : 'Start the next step or end the program.',
                        stepText,
                        stepMeta: `${sessionName} · ${minutes}`,
                        showContinue: true
                    });
                }
                return { programEnded, awaitingNext };
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
            let controlFadeTimer = null;

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
                    { p: 20, t: t('calib.run.demo1'), s: 1 },
                    { p: 50, t: t('calib.run.demo2'), s: 2 },
                    { p: 80, t: t('calib.run.demo3'), s: 3 },
                    { p: 100, t: t('calib.run.demo4') , s: 4}
                ] : [
                    { p: 18, t: t('calib.run.lr'), s: 1 },
                    { p: 44, t: t('calib.run.volume'), s: 2 },
                    { p: 72, t: t('calib.run.osc'), s: 3 },
                    { p: 100, t: t('calib.run.done') , s: 4}
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
                els.calibMode.textContent = demo ? t('calib.mode.demo') : t('calib.mode.full');
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
                els.statsTopProtocols.textContent = top.length ? top.join(', ') : (getLang() === 'pl' ? 'Brak danych' : 'No data');

                const buckets = { morning: 0, midday: 0, evening: 0, night: 0 };
                logs.forEach(l => {
                    const hour = new Date(l.startedAt || l.endedAt || now).getHours();
                    if(hour >= 6 && hour < 12) buckets.morning++;
                    else if(hour >= 12 && hour < 18) buckets.midday++;
                    else if(hour >= 18 && hour < 24) buckets.evening++;
                    else buckets.night++;
                });
                const entries = Object.entries(buckets).filter(([,v]) => v > 0);
                if(entries.length === 0) els.statsTimeOfDay.textContent = getLang() === 'pl' ? 'Brak danych' : 'No data';
                else {
                    const best = entries.sort((a,b) => b[1]-a[1])[0][0];
                    const labelMap = getLang() === 'pl'
                        ? { morning: 'Poranek (6–12)', midday: 'Dzień (12–18)', evening: 'Wieczór (18–24)', night: 'Noc (0–6)' }
                        : { morning: 'Morning (6–12)', midday: 'Midday (12–18)', evening: 'Evening (18–24)', night: 'Night (0–6)' };
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
                els.statsSparkline.setAttribute('aria-label', getLang() === 'pl' ? `Aktywność z ostatnich 7 dni – ${readable}` : `Activity over the last 7 days – ${readable}`);
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
                const summaryText = feedbackPulse.data.lastNpsScore !== null
                    ? (getLang() === 'pl' ? `Ostatnia ocena: ${feedbackPulse.data.lastNpsScore}/10` : `Last rating: ${feedbackPulse.data.lastNpsScore}/10`)
                    : (getLang() === 'pl' ? 'Odpowiedź zapisana' : 'Response saved');
                if(els.npsStatus) els.npsStatus.textContent = showPrompt ? (getLang() === 'pl' ? 'Otwarta' : 'Open') : (getLang() === 'pl' ? 'Zapisano' : 'Saved');

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
                
                const groups = [
                    { id: 'isochronic', name: 'Isochronic (Focus & Energy)', sessions: ['prime', 'overdrive', 'clarity', 'genesis', 'presence', 'cortexForge', 'gammaLift'] },
                    { id: 'binaural', name: 'Binaural (Sleep & Recovery)', sessions: ['hypnos', 'deepFocus', 'equilibrium', 'restoration', 'auroraReset', 'parasymPathway', 'remSculpt'] }
                ];

                groups.forEach(group => {
                    const groupTitle = document.createElement('div');
                    groupTitle.className = 'px-3 pt-3 pb-1 mt-1 text-[10px] uppercase tracking-[0.15em] text-white font-bold border-b border-zinc-800/50 mb-2';
                    groupTitle.innerHTML = group.name;
                    els.modeContainer.appendChild(groupTitle);

                    group.sessions.forEach(sid => {
                        const s = sessions[sid];
                        if(!s) return;
                        const btn = document.createElement('button');
                        btn.className = `mode-btn w-full text-left p-3 rounded border transition-all duration-200 flex flex-col gap-1.5 group relative overflow-hidden`;
                        btn.dataset.id = s.id;
                        btn.innerHTML = `
                            <div class="flex items-center justify-between w-full relative z-10">
                                <div class="flex items-center gap-3">
                                    <div class="text-zinc-500 group-hover:text-medical-400 transition-colors icon-container">${s.icon}</div>
                                    <span class="font-bold text-[11px] uppercase tracking-wider">${s.name}</span>
                                </div>
                                <span class="text-[9px] font-mono text-zinc-500">${s.duration === Infinity ? "∞" : Math.floor(s.duration/60) + " MIN"}</span>
                            </div>
                            <p class="mode-desc">${getLocalizedDesc(s)}</p>
                            <p class="mode-meta">${s.baseHz || (t('hz_na') || 'Hz N/A')}</p>
                        `;
                        btn.addEventListener('click', () => setSession(s.id));
                        els.modeContainer.appendChild(btn);
                    });
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
                if (els.messageTitle) els.messageTitle.textContent = data.name;
                if (els.desc) els.desc.textContent = getLocalizedDesc(data);
                els.timer.textContent = formatTime(data.duration);
                if (state.active || state.preview) {
                    const firstPhase = data.phases?.[0];
                    let startHz = '-- Hz';
                    if(firstPhase?.audio?.l && firstPhase?.audio?.r) {
                        startHz = `${Math.abs(firstPhase.audio.l - firstPhase.audio.r).toFixed(2)} Hz`;
                    } else if(typeof data.baseHz === 'number') {
                        startHz = `${data.baseHz.toFixed(2)} Hz`;
                    } else if(typeof data.baseHz === 'string') {
                        startHz = data.baseHz;
                    }
                    els.realtimeHz.textContent = startHz;
                } else {
                    els.realtimeHz.textContent = '0 Hz';
                }
                els.phaseName.textContent = t('status.ready');
                updateBreathPatternUI();
                updateHypnosDurationUI();
                updateQuickActionsUI();
            }

            function updateQuickActionsUI() {
                if(els.mainBtn) {
                    els.mainBtn.innerHTML = state.active
                        ? '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg><span class="sr-only">Stop</span>'
                        : '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span class="sr-only">Start</span>';
                    els.mainBtn.setAttribute('aria-pressed', state.active ? 'true' : 'false');
                    els.mainBtn.setAttribute('title', state.active ? 'Stop' : 'Start');
                }
            }

            function enableIdlePreview() {
                if(state.active) return;
                state.preview = false;
                state.startTime = 0;
                state.lastInteraction = performance.now();
                if(els.canvas) {
                    els.canvas.style.opacity = 0;
                }
                if(els.msgBox) {
                    els.msgBox.style.opacity = 1;
                    els.msgBox.style.transform = "scale(1)";
                }
            }

            function wakeControls() {
                if(!els.mainBtn) return;
                clearTimeout(controlFadeTimer);
                els.mainBtn.classList.remove('control-hidden');
                els.mainBtn.classList.add('control-visible');
                els.mainBtn.setAttribute('aria-hidden', 'false');
                if(state.active) {
                    controlFadeTimer = setTimeout(() => {
                        els.mainBtn.classList.add('control-hidden');
                        els.mainBtn.setAttribute('aria-hidden', 'true');
                    }, 2200);
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

                state.audio.masterGain = new Tone.Gain(state.masterVolume).toDestination();
                state.audio.gain = new Tone.Gain(0).connect(state.audio.masterGain);
                const pL = new Tone.Panner(-1).connect(state.audio.gain);
                const pR = new Tone.Panner(1).connect(state.audio.gain);

                state.audio.oscL = new Tone.Oscillator(startL, "sine").connect(pL).start();
                state.audio.oscR = new Tone.Oscillator(startR, "sine").connect(pR).start();

                state.audio.noiseGain = new Tone.Gain(0).connect(state.audio.masterGain);
                state.audio.noise = new Tone.Noise(state.noiseType).connect(state.audio.noiseGain).start();

                const beatBase = audioBaseLevels.beat * (intensity.gain || 1);
                state.currentBeatBase = beatBase;
                state.currentBeatGain = beatBase * state.beatVolume;

                state.audio.noiseGain.gain.rampTo(audioBaseLevels.noise * state.noiseVolume, 2);
                state.audio.gain.gain.rampTo(state.currentBeatGain, 1);
            }

            function stopAudio() {
                if (state.audio.oscL) { state.audio.oscL.dispose(); state.audio.oscL = null; }
                if (state.audio.oscR) { state.audio.oscR.dispose(); state.audio.oscR = null; }
                if (state.audio.beatGain) { state.audio.beatGain.dispose(); state.audio.beatGain = null; }
                if (state.audio.noise) { state.audio.noise.dispose(); state.audio.noise = null; }
                if (state.audio.noiseGain) { state.audio.noiseGain.dispose(); state.audio.noiseGain = null; }
                if (state.audio.masterGain) { state.audio.masterGain.dispose(); state.audio.masterGain = null; }
            }

            function getBaseHz(phase) {
                const a = phase?.audio || {};
                if (typeof a.l === 'number' && typeof a.r === 'number') {
                    return Math.abs(a.l - a.r);
                }
                if (typeof phase?.baseHz === 'number') {
                    return Math.abs(phase.baseHz);
                }
                if (typeof phase?.baseHz === 'string') {
                    const parsed = parseFloat(phase.baseHz);
                    if (!isNaN(parsed) && isFinite(parsed)) return Math.abs(parsed);
                }
                return null;
            }

            function updateRealtimeHzDisplay(phase, t) {
                const a = phase?.audio || {};
                const baseHz = getBaseHz(phase) ?? 0;
                const currentHz = (state.audio.oscL && state.audio.oscR)
                    ? Math.abs(state.audio.oscL.frequency.value - state.audio.oscR.frequency.value)
                    : (typeof a.l === 'number' && typeof a.r === 'number' ? Math.abs(a.l - a.r) : baseHz);

                const jitter = (Math.sin(t * 2.35) * 0.6)
                    + (Math.sin(t * 3.8) * 0.35)
                    + (Math.sin(t * 5.1) * 0.18)
                    + (Math.random() * 0.24 - 0.12);
                const displayHz = Math.max(0, currentHz + jitter).toFixed(2);
                els.realtimeHz.textContent = `${displayHz} Hz`;
            }

            function updateAudio(phase, progress, t) {
                updateRealtimeHzDisplay(phase, t);

                if (!state.audio.gain || !state.audio.oscL || !state.audio.oscR) return;
                const a = phase.audio || {};
                if (a.l) state.audio.oscL.frequency.value = a.l;
                if (a.r) state.audio.oscR.frequency.value = a.r;

                const intensity = intensityProfiles[state.intensityLevel] || intensityProfiles.medium;

                let vol = 0.2;
                if(a.vol !== undefined) vol = a.vol;
                else if(a.vol_s !== undefined && a.vol_e !== undefined) {
                    vol = (progress === undefined || isNaN(progress)) ? a.vol_s : lerp(a.vol_s, a.vol_e, progress);
                }

                vol = vol * (intensity.gain || 1);

                const rampFactor = 1 - (state.hypnosRampProgress * 0.9);
                const beatBase = Math.max(0, vol * rampFactor);
                state.currentBeatBase = beatBase;

                const beatGain = beatBase * state.beatVolume;
                state.currentBeatGain = beatGain;

                if (a.mod === 'iso') {
                    const rate = 2;
                    const mod = (Math.sin(t * Math.PI * 2 * rate) + 1) / 2;
                    state.audio.gain.gain.value = beatGain * mod;
                } else {
                    state.audio.gain.gain.value = beatGain;
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
                const startGain = state.audio.beatGain?.gain.value ?? 0;
                const startNoise = state.audio.noiseGain?.gain.value ?? 0;
                state.hypnosRampProgress = 0;
                state.hypnosRampTimer = setInterval(() => {
                    state.hypnosRampProgress = Math.min(1, state.hypnosRampProgress + 0.1);
                    if(state.audio.beatGain) state.audio.beatGain.gain.rampTo(startGain * (1 - state.hypnosRampProgress), 0.3);
                    if(state.audio.noiseGain) state.audio.noiseGain.gain.rampTo(startNoise * (1 - state.hypnosRampProgress), 0.3);
                    if(state.hypnosRampProgress >= 1) {
                        clearInterval(state.hypnosRampTimer);
                        state.hypnosRampTimer = null;
                        state.completed = true;
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
                    ctx.fillText(getLang() === 'pl' ? 'Ograniczone animacje · tryb bez ruchu' : 'Limited animations · reduced motion mode', w / 2, h / 2 + 6);
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
                            const targetLevel = step.label === 'WDECH' ? 1 : step.label === 'WYDECH' ? 0 : currentLevel;

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
                    const data = getSessionData();
                    const duration = data?.duration ?? Infinity;
                    const completedByDuration = duration !== Infinity && elapsed >= duration;
                    const program = state.program.active ? getProgramById(state.program.id) : null;
                    const isLastProgramStep = !!program && state.program.stepIndex >= program.steps.length - 1;
                    const completed = (state.completed || completedByDuration) && (completedByDuration || isLastProgramStep);
                    state.active = false;
                    if (els.visualizer) {
                        els.visualizer.classList.remove('is-playing');
                        els.visualizer.classList.add('show-controls');
                    }
                    clearTimeout(controlFadeTimer);
                    if(state.hypnosRampTimer) { clearInterval(state.hypnosRampTimer); state.hypnosRampTimer = null; }
                    state.hypnosRampProgress = 0;
                    stopAudio();
                    enableIdlePreview();
                    els.timer.classList.remove('glow-text-cyan');
                    if (els.statusText) els.statusText.textContent = t('status.standby');
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
                    const programResult = handleProgramAfterStep();
                    const completedSession = reason === 'auto-complete';
                    const completedProgram = programResult?.programEnded && completedSession;
                    const awaitingNextStep = programResult?.awaitingNext;
                    if((completedSession || completedProgram) && !awaitingNextStep) {
                        promptSessionFeedback(feedbackMeta);
                    }
                    updateQuickActionsUI();
                    wakeControls();
                } else {
                    await startAudio();
                    state.preview = false;
                    state.active = true;
                    state.completed = false;
                    if (els.visualizer) {
                        els.visualizer.classList.add('is-playing');
                        els.visualizer.classList.add('show-controls');
                    }
                    state.sessionStartTs = Date.now();
                    state.startTime = performance.now();
                    state.hypnosRampProgress = 0;
                    state.lastInteraction = performance.now();
                    els.canvas.style.opacity = 1;
                    els.msgBox.style.opacity = 0;
                    els.msgBox.style.transform = "scale(0.95)";
                    els.mainBtn.setAttribute('title', 'Stop');
                    els.timer.classList.add('glow-text-cyan');
                    if (els.statusText) els.statusText.textContent = t('status.active');
                    if (els.statusDot) {
                        els.statusDot.className = "w-2 h-2 rounded-full bg-medical-400 animate-pulse";
                        els.statusDot.style.boxShadow = '0 0 8px #22d3ee';
                    }
                    if(state.focusLock) enableFocusLock();
                    updateQuickActionsUI();
                    wakeControls();
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
                        } else if (elapsed >= data.duration) { state.completed = true; toggleSession('auto-complete'); return; }
                    }

                    let currentPhase = data.phases[data.phases.length-1];
                    for(let i=0; i<data.phases.length; i++) {
                        const p = data.phases[i];
                        if (elapsed >= p.start && (elapsed < p.end || p.end === Infinity)) {
                            currentPhase = p;
                            break;
                        }
                    }

                    if (state.preview) {
                        const previewPhase = data.phases[1] || data.phases[0];
                        updateRealtimeHzDisplay(previewPhase, elapsed);
                        drawVisual(previewPhase, 0.5, elapsed);
                    } else {
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
                        els.phaseName.textContent = getLocalizedPhaseName(state.session, currentPhase.name);
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
            function handleFullscreenChange() {
                const isFs = document.fullscreenElement === els.visualizer || document.webkitFullscreenElement === els.visualizer;
                document.body.classList.toggle('fullscreen-active', isFs);
                if (els.sessionStatusCard && els.visualizer && els.statusCardAnchor) {
                    if (isFs) {
                        els.sessionStatusCard.classList.add('fullscreen-status-card');
                        els.visualizer.appendChild(els.sessionStatusCard);
                    } else {
                        els.sessionStatusCard.classList.remove('fullscreen-status-card');
                        els.statusCardAnchor.insertAdjacentElement('afterend', els.sessionStatusCard);
                    }
                }
                setTimeout(resizeCanvas, 100);
            }
            ['fullscreenchange', 'webkitfullscreenchange'].forEach(event => { document.addEventListener(event, handleFullscreenChange); });
            init();
            handleFullscreenChange();

            // ═══════════════════════════════════════════════════════════════
            // EXPORT MODULE — Admin-only Content Factory
            // ═══════════════════════════════════════════════════════════════

            const exportState = {
                unlocked: false,
                selectedProtocol: 'hypnos',
                durationMinutes: 30,
                noiseType: 'brown',
                entrainment: 'binaural',
                loopMode: 'standard',
                carrierOffset: 'default',
                isExporting: false
            };

            const exportEls = {
                modal: document.getElementById('exportModal'),
                closeBtn: document.getElementById('closeExport'),
                protocolSelect: document.getElementById('exportProtocol'),
                protocolDesc: document.getElementById('exportProtocolDesc'),
                carrierSelect: document.getElementById('exportCarrier'),
                durationButtons: Array.from(document.querySelectorAll('.export-dur-btn')),
                entButtons: Array.from(document.querySelectorAll('.export-ent-btn')),
                loopButtons: Array.from(document.querySelectorAll('.export-loop-btn')),
                noiseButtons: Array.from(document.querySelectorAll('.export-noise-btn')),
                audioBtn: document.getElementById('exportAudioBtn'),
                thumbnailBtn: document.getElementById('exportThumbnailBtn'),
                metadataBtn: document.getElementById('exportMetadataBtn'),
                fileSizeLabel: document.getElementById('exportFileSize'),
                progressContainer: document.getElementById('exportProgress'),
                progressBar: document.getElementById('exportProgressBar'),
                progressLabel: document.getElementById('exportProgressLabel'),
                progressPercent: document.getElementById('exportProgressPercent'),
                progressInfo: document.getElementById('exportProgressInfo'),
                metadataOutput: document.getElementById('metadataOutput'),
                metadataTitle: document.getElementById('metadataTitle'),
                metadataDesc: document.getElementById('metadataDesc'),
                metadataTags: document.getElementById('metadataTags'),
                copyMetadataBtn: document.getElementById('copyMetadataBtn')
            };

            // ── Admin Gate: Click KΩ logo 5 times within 3 seconds ──
            (function initAdminGate() {
                const logoContainer = document.querySelector('#appHeader .flex.items-center.gap-3');
                if (!logoContainer) return;

                let clicks = 0;
                let timer = null;

                logoContainer.style.cursor = 'default';
                logoContainer.addEventListener('click', () => {
                    clicks++;
                    clearTimeout(timer);
                    timer = setTimeout(() => { clicks = 0; }, 3000);

                    if (clicks >= 5) {
                        clicks = 0;
                        clearTimeout(timer);
                        exportState.unlocked = true;
                        openExportPanel();
                    }
                });
            })();

            function openExportPanel() {
                if (!exportState.unlocked || !exportEls.modal) return;
                populateProtocolSelect();
                updateExportFileSize();
                exportEls.modal.classList.remove('hidden');
                exportEls.modal.style.display = 'flex';
            }

            function closeExportPanel() {
                if (!exportEls.modal) return;
                exportEls.modal.classList.add('hidden');
                exportEls.modal.style.display = 'none';
            }

            function populateProtocolSelect() {
                if (!exportEls.protocolSelect) return;
                exportEls.protocolSelect.innerHTML = '';

                // Group sessions by category for easier selection
                const ytBestPicks = ['hypnos', 'restoration', 'remSculpt', 'equilibrium', 'parasymPathway'];
                const allIds = Object.keys(sessions);

                const addOption = (id, prefix = '') => {
                    const s = sessions[id];
                    if (!s) return;
                    const opt = document.createElement('option');
                    opt.value = id;
                    const hz = s.phases?.[0]?.audio ? Math.abs(s.phases[0].audio.l - s.phases[0].audio.r).toFixed(1) : '?';
                    opt.textContent = `${prefix}${s.name} — ${hz}Hz (${s.duration === Infinity ? '∞' : Math.floor(s.duration / 60) + 'min'})`;
                    if (id === exportState.selectedProtocol) opt.selected = true;
                    exportEls.protocolSelect.appendChild(opt);
                };

                // Best for YouTube first
                const bestGroup = document.createElement('optgroup');
                bestGroup.label = '★ Best for YouTube (Sleep/Healing)';
                exportEls.protocolSelect.appendChild(bestGroup);
                ytBestPicks.forEach(id => {
                    const s = sessions[id];
                    if (!s) return;
                    const opt = document.createElement('option');
                    opt.value = id;
                    const hz = s.phases?.[0]?.audio ? Math.abs(s.phases[0].audio.l - s.phases[0].audio.r).toFixed(1) : '?';
                    opt.textContent = `★ ${s.name} — ${hz}Hz`;
                    if (id === exportState.selectedProtocol) opt.selected = true;
                    bestGroup.appendChild(opt);
                });

                // Other protocols
                const otherGroup = document.createElement('optgroup');
                otherGroup.label = 'Other Protocols';
                exportEls.protocolSelect.appendChild(otherGroup);
                allIds.filter(id => !ytBestPicks.includes(id)).forEach(id => {
                    const s = sessions[id];
                    if (!s) return;
                    const opt = document.createElement('option');
                    opt.value = id;
                    const hz = s.phases?.[0]?.audio ? Math.abs(s.phases[0].audio.l - s.phases[0].audio.r).toFixed(1) : '?';
                    opt.textContent = `${s.name} — ${hz}Hz`;
                    otherGroup.appendChild(opt);
                });

                updateProtocolDesc();
            }

            function updateProtocolDesc() {
                const s = sessions[exportState.selectedProtocol];
                if (s && exportEls.protocolDesc) {
                    const phases = s.phases.map(p => {
                        const hz = p.audio ? Math.abs(p.audio.l - p.audio.r).toFixed(1) : '?';
                        return `${p.name}: ${hz}Hz`;
                    }).join(' → ');
                    exportEls.protocolDesc.textContent = `${s.desc} | Fazy: ${phases}`;
                }
            }

            function updateExportFileSize() {
                // WAV 48kHz 16-bit stereo: 48000 * 2 channels * 2 bytes = 192,000 bytes/sec
                const bytes = exportState.durationMinutes * 60 * 192000;
                const mb = (bytes / (1024 * 1024)).toFixed(0);
                if (exportEls.fileSizeLabel) {
                    exportEls.fileSizeLabel.textContent = `≈ ${mb} MB per ${exportState.durationMinutes} min WAV`;
                }
            }

            function setExportDuration(minutes) {
                exportState.durationMinutes = minutes;
                exportEls.durationButtons.forEach(btn => {
                    const isActive = parseInt(btn.dataset.minutes, 10) === minutes;
                    btn.classList.toggle('active-export-dur', isActive);
                });
                updateExportFileSize();
            }

            function setExportNoise(type) {
                exportState.noiseType = type;
                exportEls.noiseButtons.forEach(btn => {
                    const isActive = btn.dataset.noise === type;
                    btn.classList.toggle('active-export-noise', isActive);
                    btn.classList.toggle('border-medical-400', isActive);
                    btn.classList.toggle('bg-medical-900/40', isActive);
                    btn.classList.toggle('text-white', isActive);
                    btn.classList.toggle('border-zinc-700', !isActive);
                    btn.classList.toggle('bg-zinc-800', !isActive);
                    btn.classList.toggle('text-zinc-300', !isActive);
                });
            }

            function setExportEntrainment(type) {
                exportState.entrainment = type;
                exportEls.entButtons.forEach(btn => {
                    const isActive = btn.dataset.ent === type;
                    btn.classList.toggle('active-export-ent', isActive);
                    btn.classList.toggle('border-medical-400', isActive);
                    btn.classList.toggle('bg-medical-900/40', isActive);
                    btn.classList.toggle('text-white', isActive);
                    btn.classList.toggle('border-zinc-700', !isActive);
                    btn.classList.toggle('bg-zinc-800', !isActive);
                    btn.classList.toggle('text-zinc-300', !isActive);
                });
            }

            function setExportLoopMode(type) {
                exportState.loopMode = type;
                exportEls.loopButtons.forEach(btn => {
                    const isActive = btn.dataset.loop === type;
                    btn.classList.toggle('active-export-loop', isActive);
                    btn.classList.toggle('border-medical-400', isActive);
                    btn.classList.toggle('bg-medical-900/40', isActive);
                    btn.classList.toggle('text-white', isActive);
                    btn.classList.toggle('border-zinc-700', !isActive);
                    btn.classList.toggle('bg-zinc-800', !isActive);
                    btn.classList.toggle('text-zinc-300', !isActive);
                });
            }

            // ── Event Listeners ──
            if (exportEls.closeBtn) exportEls.closeBtn.addEventListener('click', closeExportPanel);

            if (exportEls.protocolSelect) {
                exportEls.protocolSelect.addEventListener('change', (e) => {
                    exportState.selectedProtocol = e.target.value;
                    updateProtocolDesc();
                });
            }

            if (exportEls.carrierSelect) {
                exportEls.carrierSelect.addEventListener('change', (e) => {
                    exportState.carrierOffset = e.target.value;
                });
            }

            exportEls.durationButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    setExportDuration(parseInt(btn.dataset.minutes, 10));
                });
            });

            exportEls.entButtons.forEach(btn => {
                btn.addEventListener('click', () => setExportEntrainment(btn.dataset.ent));
            });

            exportEls.loopButtons.forEach(btn => {
                btn.addEventListener('click', () => setExportLoopMode(btn.dataset.loop));
            });

            exportEls.noiseButtons.forEach(btn => {
                btn.addEventListener('click', () => setExportNoise(btn.dataset.noise));
            });

            // Close on backdrop click
            if (exportEls.modal) {
                exportEls.modal.addEventListener('click', (e) => {
                    if (e.target === exportEls.modal) closeExportPanel();
                });
            }

            // ═══════════════════════════════════════════════════════════════
            // EXPORT UTILITIES — Round 2A
            // ═══════════════════════════════════════════════════════════════

            /**
             * Convert an AudioBuffer to a WAV Blob (PCM 16-bit).
             * YouTube accepts WAV natively — max quality, no lossy compression.
             */
            function audioBufferToWav(buffer) {
                const numChannels = buffer.numberOfChannels;
                const sampleRate = buffer.sampleRate;
                const bitsPerSample = 16;
                const bytesPerSample = bitsPerSample / 8;
                const blockAlign = numChannels * bytesPerSample;
                const numSamples = buffer.length;
                const dataSize = numSamples * blockAlign;
                const headerSize = 44;
                const totalSize = headerSize + dataSize;

                const arrayBuffer = new ArrayBuffer(totalSize);
                const view = new DataView(arrayBuffer);

                // Helper to write ASCII strings
                function writeString(offset, str) {
                    for (let i = 0; i < str.length; i++) {
                        view.setUint8(offset + i, str.charCodeAt(i));
                    }
                }

                // RIFF header
                writeString(0, 'RIFF');
                view.setUint32(4, totalSize - 8, true); // file size - 8
                writeString(8, 'WAVE');

                // fmt sub-chunk
                writeString(12, 'fmt ');
                view.setUint32(16, 16, true);           // sub-chunk size (PCM = 16)
                view.setUint16(20, 1, true);             // audio format (1 = PCM)
                view.setUint16(22, numChannels, true);   // number of channels
                view.setUint32(24, sampleRate, true);    // sample rate
                view.setUint32(28, sampleRate * blockAlign, true); // byte rate
                view.setUint16(32, blockAlign, true);    // block align
                view.setUint16(34, bitsPerSample, true); // bits per sample

                // data sub-chunk
                writeString(36, 'data');
                view.setUint32(40, dataSize, true);      // data size

                // Interleave channels and convert float32 → int16
                const channels = [];
                for (let ch = 0; ch < numChannels; ch++) {
                    channels.push(buffer.getChannelData(ch));
                }

                let offset = headerSize;
                for (let i = 0; i < numSamples; i++) {
                    for (let ch = 0; ch < numChannels; ch++) {
                        // Clamp to [-1, 1] and convert to int16
                        let sample = channels[ch][i];
                        sample = Math.max(-1, Math.min(1, sample));
                        const int16 = sample < 0
                            ? Math.max(-32768, Math.floor(sample * 32768))
                            : Math.min(32767, Math.floor(sample * 32767));
                        view.setInt16(offset, int16, true);
                        offset += 2;
                    }
                }

                return new Blob([arrayBuffer], { type: 'audio/wav' });
            }

            /**
             * Generate a loopable colored noise AudioBuffer (60 seconds).
             * Brown noise: random walk (deeper). Pink noise: 1/f spectral shaping.
             * Green noise: bandpassed white noise. Drone: Ethereal 432Hz ambient chord.
             */
            function generateNoiseBuffer(offlineCtx, type = 'brown') {
                const loopDuration = 60;
                const sampleRate = offlineCtx.sampleRate;
                const numSamples = Math.floor(sampleRate * loopDuration);
                const buffer = offlineCtx.createBuffer(1, numSamples, sampleRate);
                const data = buffer.getChannelData(0);

                if (type === 'white') {
                    for (let i = 0; i < numSamples; i++) {
                        data[i] = (Math.random() * 2 - 1) * 0.15;
                    }
                } else if (type === 'brown') {
                    let last = 0;
                    for (let i = 0; i < numSamples; i++) {
                        const white = Math.random() * 2 - 1;
                        last = (last + (0.02 * white)) / 1.02;
                        data[i] = last * 3.5;
                    }
                } else if (type === 'pink') {
                    const numSources = 8;
                    const sources = new Float32Array(numSources);
                    let runningSum = 0;

                    for (let s = 0; s < numSources; s++) {
                        sources[s] = Math.random() * 2 - 1;
                        runningSum += sources[s];
                    }

                    for (let i = 0; i < numSamples; i++) {
                        const lsb = i & -i;
                        const sourceIdx = Math.min(31 - Math.clz32(lsb || 1), numSources - 1);
                        runningSum -= sources[sourceIdx];
                        sources[sourceIdx] = Math.random() * 2 - 1;
                        runningSum += sources[sourceIdx];
                        const white = Math.random() * 2 - 1;
                        data[i] = (runningSum / numSources + white) * 0.35;
                    }
                } else if (type === 'green') {
                    let lp = 0;
                    let hp = 0;
                    for (let i = 0; i < numSamples; i++) {
                        const white = Math.random() * 2 - 1;
                        lp += 0.05 * (white - lp); 
                        hp += 0.01 * (lp - hp);    
                        data[i] = (lp - hp) * 6.0; 
                    }
                } else if (type === 'drone') {
                    for (let i = 0; i < numSamples; i++) {
                        const t = i / sampleRate;
                        const w1 = Math.sin(2 * Math.PI * 432 * t);
                        const w2 = Math.sin(2 * Math.PI * 432.15 * t);
                        const w3 = Math.sin(2 * Math.PI * 216 * t);
                        const lfo1 = Math.sin(2 * Math.PI * 0.05 * t) * 0.5 + 0.5;
                        const lfo2 = Math.sin(2 * Math.PI * 0.03 * t) * 0.5 + 0.5;
                        data[i] = ((w1 * lfo1) + (w2 * lfo2) + (w3 * 0.4)) * 0.15;
                    }
                }

                // Crossfade
                const fadeLen = Math.floor(sampleRate * 0.5);
                for (let i = 0; i < fadeLen; i++) {
                    const t = i / fadeLen;
                    const endIdx = numSamples - fadeLen + i;
                    data[endIdx] = data[endIdx] * (1 - t) + data[i] * t;
                }
                return buffer;
            }

            /**
             * Trigger a file download from a Blob.
             */
            function downloadBlob(blob, filename) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
            }

            // ── Audio Export handler (Round 2A: test tone) ──
            if (exportEls.audioBtn) {
                exportEls.audioBtn.addEventListener('click', async () => {
                    if (exportState.isExporting) return;
                    exportState.isExporting = true;
                    exportEls.audioBtn.disabled = true;
                    exportEls.audioBtn.textContent = 'Renderowanie...';

                    try {
                        const durationSec = exportState.durationMinutes * 60;
                        const sampleRate = 48000;
                        const totalSamples = sampleRate * durationSec;

                        const estimatedRAM = totalSamples * 2 * 4; 
                        if (estimatedRAM > 1.2e9) throw new Error(`Segment za długi (${exportState.durationMinutes} min = ~${(estimatedRAM / 1e9).toFixed(1)} GB RAM). Max 60 min.`);

                        exportEls.progressContainer.classList.remove('hidden');
                        exportEls.progressLabel.textContent = 'Przygotowywanie OfflineAudioContext...';
                        exportEls.progressPercent.textContent = '0%';
                        exportEls.progressBar.style.width = '0%';
                        exportEls.progressInfo.textContent = `${exportState.durationMinutes} min · ${sampleRate}Hz · stereo`;

                        const ctx = new OfflineAudioContext(2, totalSamples, sampleRate);

                        // ── Build audio graph ──
                        const session = sessions[exportState.selectedProtocol];
                        if (!session || !session.phases || session.phases.length === 0) throw new Error(`Protokół niezdefiniowany.`);

                        const masterGain = ctx.createGain();
                        masterGain.gain.value = 0.85;
                        masterGain.connect(ctx.destination);

                        const oscL = ctx.createOscillator();
                        const oscR = ctx.createOscillator();
                        oscL.type = 'sine';
                        oscR.type = 'sine';

                        const panL = ctx.createStereoPanner();
                        const panR = ctx.createStereoPanner();

                        let isoLfo = null;
                        let isoGain = null;

                        // ENTRAINMENT ROUTING
                        if (exportState.entrainment === 'binaural') {
                            panL.pan.value = -1;
                            panR.pan.value = 1;
                        } else if (exportState.entrainment === 'monaural') {
                            panL.pan.value = 0;
                            panR.pan.value = 0;
                        } else if (exportState.entrainment === 'isochronic') {
                            panL.pan.value = 0;
                            panR.pan.value = 0;
                            
                            isoGain = ctx.createGain();
                            isoGain.gain.value = 0.5; // Base gain offset

                            isoLfo = ctx.createOscillator();
                            isoLfo.type = 'sine';
                            
                            const lfoDepth = ctx.createGain();
                            lfoDepth.gain.value = 0.5; // Depth
                            
                            isoLfo.connect(lfoDepth);
                            lfoDepth.connect(isoGain.gain);
                            
                            isoLfo.start(0);
                            isoLfo.stop(durationSec);
                        }

                        const beatGain = ctx.createGain();
                        beatGain.gain.value = 0;

                        if (isoGain) {
                            beatGain.connect(isoGain);
                            isoGain.connect(masterGain);
                        } else {
                            beatGain.connect(masterGain);
                        }

                        oscL.connect(panL);
                        panL.connect(beatGain);
                        oscR.connect(panR);
                        panR.connect(beatGain);

                        // LOOP MODE FILTERING
                        let activePhases = session.phases;
                        if (exportState.loopMode === 'stable' && activePhases.length > 1) {
                            const lastPhase = activePhases[activePhases.length - 1];
                            activePhases = [{
                                name: lastPhase.name,
                                start: 0,
                                end: Infinity,
                                audio: { ...lastPhase.audio }
                            }];
                            if (activePhases[0].audio.vol_e !== undefined) {
                                activePhases[0].audio.vol = activePhases[0].audio.vol_e;
                            }
                        }

                        // SCHEDULING WITH GLIDES
                        const glideDuration = 30; // 30 sec smooth transition
                        let currentFreqL = 100;
                        let currentFreqR = 100;
                        let currentIso = 4;

                        for (let i = 0; i < activePhases.length; i++) {
                            const phase = activePhases[i];
                            const phaseStart = Math.min(phase.start, durationSec);
                            const phaseEnd = phase.end === Infinity ? durationSec : Math.min(phase.end, durationSec);

                            if (phaseStart >= durationSec) continue;

                            const a = phase.audio || {};
                            let targetL = a.l;
                            let targetR = a.r;

                            // Custom Carrier Override
                            if (exportState.carrierOffset !== 'default' && typeof a.l === 'number' && typeof a.r === 'number') {
                                const carrier = parseFloat(exportState.carrierOffset);
                                const diff = Math.abs(a.r - a.l);
                                targetL = carrier;
                                targetR = carrier + diff;
                            }

                            if (exportState.entrainment === 'isochronic') {
                                targetR = targetL; // R matches L for pure single tone
                                const diff = Math.abs(a.l - a.r);
                                if (i === 0) {
                                    isoLfo.frequency.setValueAtTime(diff, phaseStart);
                                    currentIso = diff;
                                } else {
                                    isoLfo.frequency.setValueAtTime(currentIso, phaseStart);
                                    isoLfo.frequency.linearRampToValueAtTime(diff, Math.min(phaseStart + glideDuration, phaseEnd));
                                    currentIso = diff;
                                }
                            }

                            if (i === 0) {
                                if (typeof targetL === 'number') { oscL.frequency.setValueAtTime(targetL, phaseStart); currentFreqL = targetL; }
                                if (typeof targetR === 'number') { oscR.frequency.setValueAtTime(targetR, phaseStart); currentFreqR = targetR; }
                            } else {
                                if (typeof targetL === 'number') {
                                    oscL.frequency.setValueAtTime(currentFreqL, phaseStart);
                                    oscL.frequency.linearRampToValueAtTime(targetL, Math.min(phaseStart + glideDuration, phaseEnd));
                                    currentFreqL = targetL;
                                }
                                if (typeof targetR === 'number') {
                                    oscR.frequency.setValueAtTime(currentFreqR, phaseStart);
                                    oscR.frequency.linearRampToValueAtTime(targetR, Math.min(phaseStart + glideDuration, phaseEnd));
                                    currentFreqR = targetR;
                                }
                            }

                            if (a.vol_s !== undefined && a.vol_e !== undefined) {
                                beatGain.gain.setValueAtTime(a.vol_s, phaseStart);
                                beatGain.gain.linearRampToValueAtTime(a.vol_e, phaseEnd);
                            } else if (a.vol !== undefined) {
                                beatGain.gain.setValueAtTime(a.vol, phaseStart);
                            } else {
                                beatGain.gain.setValueAtTime(0.18, phaseStart);
                            }
                        }

                        // MASTER FADES
                        if (exportState.loopMode === 'stable') {
                            masterGain.gain.setValueAtTime(0.85, 0);
                        } else {
                            masterGain.gain.setValueAtTime(0, 0);
                            masterGain.gain.linearRampToValueAtTime(0.85, 2);
                            if (durationSec > 7) {
                                masterGain.gain.setValueAtTime(0.85, durationSec - 5);
                                masterGain.gain.linearRampToValueAtTime(0, durationSec);
                            }
                        }

                        oscL.start(0);
                        oscR.start(0);
                        oscL.stop(durationSec);
                        oscR.stop(durationSec);

                        // NOISE LAYER
                        exportEls.progressLabel.textContent = 'Generowanie atmosfery...';
                        exportEls.progressBar.style.width = '10%';
                        exportEls.progressPercent.textContent = '10%';

                        const noiseBuffer = generateNoiseBuffer(ctx, exportState.noiseType);
                        const noiseSource = ctx.createBufferSource();
                        noiseSource.buffer = noiseBuffer;
                        noiseSource.loop = true;

                        const noiseGain = ctx.createGain();
                        noiseGain.gain.value = exportState.noiseType === 'drone' ? 0.35 : 0.09; 
                        noiseSource.connect(noiseGain);
                        noiseGain.connect(masterGain);

                        noiseSource.start(0);
                        noiseSource.stop(durationSec);

                        // ── Render ──
                        exportEls.progressLabel.textContent = 'Renderowanie audio...';
                        exportEls.progressBar.style.width = '20%';
                        exportEls.progressPercent.textContent = '20%';

                        const renderStart = performance.now();

                        // Simulate progress updates during render
                        const progressInterval = setInterval(() => {
                            const elapsed = performance.now() - renderStart;
                            // Estimate: ~1s render per 60s audio (rough)
                            const estimatedTotal = (durationSec / 60) * 1500;
                            const progress = Math.min(95, 20 + (elapsed / estimatedTotal) * 75);
                            exportEls.progressBar.style.width = `${progress}%`;
                            exportEls.progressPercent.textContent = `${Math.floor(progress)}%`;
                            exportEls.progressLabel.textContent = `Renderowanie... (${(elapsed / 1000).toFixed(1)}s)`;
                        }, 200);

                        const renderedBuffer = await ctx.startRendering();

                        clearInterval(progressInterval);

                        // ── Encode WAV ──
                        exportEls.progressLabel.textContent = 'Konwertowanie do WAV...';
                        exportEls.progressBar.style.width = '96%';
                        exportEls.progressPercent.textContent = '96%';

                        // Small delay to let UI update before heavy WAV encoding
                        await new Promise(r => setTimeout(r, 50));

                        const wavBlob = audioBufferToWav(renderedBuffer);

                        const renderTime = ((performance.now() - renderStart) / 1000).toFixed(1);
                        const fileSizeMB = (wavBlob.size / (1024 * 1024)).toFixed(1);
                        const sessionName = session.name.replace(/\s+/g, '_').toLowerCase();
                        const filename = `kora_${sessionName}_${exportState.durationMinutes}min_${exportState.noiseType}.wav`;

                        // ── Download ──
                        exportEls.progressBar.style.width = '100%';
                        exportEls.progressPercent.textContent = '100%';
                        exportEls.progressLabel.textContent = `Gotowe! ${fileSizeMB} MB · ${renderTime}s`;
                        exportEls.progressInfo.textContent = filename;

                        downloadBlob(wavBlob, filename);

                    } catch (err) {
                        console.error('Export failed:', err);
                        exportEls.progressLabel.textContent = `❌ Błąd: ${err.message}`;
                        exportEls.progressBar.style.width = '0%';
                        exportEls.progressPercent.textContent = 'FAIL';
                    } finally {
                        exportState.isExporting = false;
                        exportEls.audioBtn.disabled = false;
                        exportEls.audioBtn.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Eksportuj Audio (WAV 48kHz)
                        `;
                    }
                });
            }

            // ═══════════════════════════════════════════════════════════════
            // PHASE 3 — Thumbnail PNG + YouTube Metadata
            // ═══════════════════════════════════════════════════════════════

            /**
             * Draw Kora visual on an offscreen canvas for thumbnail export.
             * Re-creates the drawVisual() logic but independent of app state.
             */
            function drawThumbnailVisual(ctx, w, h, session, t) {
                const phase = session.phases[1] || session.phases[0];
                const v = phase.visual || { f: 1, mod: 'soft', bri: 0.5 };
                const isHypnos = session.id === 'hypnos';

                let freq = v.f || 1;
                if (v.f_s && v.f_e) freq = lerp(v.f_s, v.f_e, 0.5);

                const pulseRaw = Math.sin(t * Math.PI * 2 * freq);
                const pulse = (pulseRaw + 1) / 2;

                // Black background
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, w, h);

                let bri = v.bri || 0.8;
                if (isHypnos) bri = bri * 0.3; // Dimmer for sleep but visible for thumbnail

                let modType = v.mod || 'soft';
                if (modType === 'breath') bri = bri * (0.6 + 0.4 * pulse);
                else if (modType === 'soft') bri = bri * (0.8 + 0.2 * pulse);

                // Radial gradient glow
                if (bri > 0.001) {
                    const maxR = Math.sqrt(w * w + h * h) * 0.6;
                    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, maxR);
                    const cVal = Math.floor(bri * 255);
                    grad.addColorStop(0, `rgba(${cVal}, ${cVal}, ${cVal + 20}, 1)`);
                    grad.addColorStop(1, 'rgba(0,0,0,1)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, w, h);
                }

                // Oscilloscope waveform
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = `rgba(34, 211, 238, ${0.5 + bri * 0.5})`;
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#22d3ee';
                const amplitude = h * 0.15;
                const centerY = h / 2;
                for (let x = 0; x < w; x += 2) {
                    const y = centerY + Math.sin((x + t * 100) * 0.02) * amplitude * bri + Math.sin((x - t * 50) * 0.05) * (amplitude / 2);
                    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Second glow layer (more atmospheric)
                const glowGrad = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, w * 0.5);
                glowGrad.addColorStop(0, 'rgba(34, 211, 238, 0.08)');
                glowGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.04)');
                glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = glowGrad;
                ctx.fillRect(0, 0, w, h);

                // Overlay text: protocol info
                const hz = phase.audio ? Math.abs(phase.audio.l - phase.audio.r).toFixed(1) : '?';
                const bandMap = { hypnos: 'DELTA', restoration: 'DELTA', remSculpt: 'THETA', equilibrium: 'ALPHA', parasymPathway: 'THETA', deepFocus: 'BETA', clarity: 'ALPHA', prime: 'ALPHA', overdrive: 'GAMMA', cortexForge: 'BETA', genesis: 'THETA', presence: 'ALPHA', auroraReset: 'DELTA', gammaLift: 'GAMMA' };
                const band = bandMap[session.id] || 'NEURO';

                // Title text
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 72px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowBlur = 30;
                ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
                ctx.fillText(`${band} WAVES`, w / 2, h * 0.35);

                // Hz display
                ctx.font = '120px JetBrains Mono, monospace';
                ctx.fillStyle = '#22d3ee';
                ctx.shadowBlur = 40;
                ctx.shadowColor = '#22d3ee';
                ctx.fillText(`${hz}Hz`, w / 2, h * 0.55);

                // Subtitle
                ctx.font = '28px Inter, sans-serif';
                ctx.fillStyle = 'rgba(228, 228, 231, 0.7)';
                ctx.shadowBlur = 0;
                ctx.fillText('Binaural Beats · Neuroscience-Backed', w / 2, h * 0.72);

                // Brand watermark
                ctx.font = 'bold 18px JetBrains Mono, monospace';
                ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
                ctx.textAlign = 'right';
                ctx.fillText('KΩ CORTEX', w - 40, h - 30);
                ctx.textAlign = 'center';
            }

            // ── Thumbnail Export ──
            if (exportEls.thumbnailBtn) {
                exportEls.thumbnailBtn.addEventListener('click', () => {
                    const session = sessions[exportState.selectedProtocol];
                    if (!session) return;

                    const canvas = document.createElement('canvas');
                    canvas.width = 1920;
                    canvas.height = 1080;
                    const ctx = canvas.getContext('2d');

                    // Draw at t=15 (nice visual state)
                    drawThumbnailVisual(ctx, 1920, 1080, session, 15);

                    canvas.toBlob(blob => {
                        if (!blob) return;
                        const sessionName = session.name.replace(/\s+/g, '_').toLowerCase();
                        downloadBlob(blob, `kora_thumbnail_${sessionName}_1920x1080.png`);
                    }, 'image/png');
                });
            }



            /**
             * Show a floating toast notification.
             */
            function showExportToast(message, duration = 2500) {
                // Remove any existing toast
                const existing = document.getElementById('exportToast');
                if (existing) existing.remove();

                const toast = document.createElement('div');
                toast.id = 'exportToast';
                toast.style.cssText = `
                    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(20px);
                    background: rgba(6, 182, 212, 0.95); color: #000; padding: 12px 24px;
                    border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 13px;
                    font-weight: 700; letter-spacing: 0.05em; z-index: 9999;
                    box-shadow: 0 12px 40px rgba(6, 182, 212, 0.4), 0 0 0 1px rgba(255,255,255,0.1);
                    opacity: 0; transition: opacity 300ms ease, transform 300ms ease;
                `;
                toast.textContent = message;
                document.body.appendChild(toast);

                // Animate in
                requestAnimationFrame(() => {
                    toast.style.opacity = '1';
                    toast.style.transform = 'translateX(-50%) translateY(0)';
                });

                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateX(-50%) translateY(20px)';
                    setTimeout(() => toast.remove(), 300);
                }, duration);
            }

            function generateYouTubeMetadata(sessionId, durationHours) {
                const session = sessions[sessionId];
                if (!session) return null;

                const trans = sessionTranslations[sessionId] || {};
                const phase = session.phases[1] || session.phases[0];
                const hz = phase.audio ? Math.abs(phase.audio.l - phase.audio.r).toFixed(1) : '?';
                const durLabel = durationHours ? `${durationHours} Hours` : 'Extended';
                const engDesc = trans.desc || session.desc;

                const bandMap = { hypnos: 'Delta', restoration: 'Delta', remSculpt: 'Theta/Alpha', equilibrium: 'Alpha', parasymPathway: 'Theta-Delta', deepFocus: 'Beta', clarity: 'Alpha', prime: 'Alpha-Beta', overdrive: 'Gamma 40Hz', cortexForge: 'Beta-Gamma', genesis: 'Theta 6Hz', presence: 'Alpha 10Hz', auroraReset: 'Delta-Theta', gammaLift: 'Gamma 40Hz' };
                const band = bandMap[sessionId] || 'Neuro';

                const titleMap = {
                    hypnos: `Deep Sleep Music | ${band} Waves ${hz}Hz | Fall Asleep Fast | ${durLabel}`,
                    restoration: `432Hz Healing Frequencies | ${band} Waves | Deep Cell Regeneration | ${durLabel}`,
                    remSculpt: `REM Sleep Cycle Music | ${band} Waves | Lucid Dreaming | ${durLabel}`,
                    equilibrium: `${band} Waves 10Hz | Instant Calm & Stress Relief | ${durLabel}`,
                    parasymPathway: `Vagus Nerve Stimulation | ${band} Waves | Deep Relaxation | ${durLabel}`,
                    deepFocus: `${band} Waves Focus Music | Deep Concentration & Study | ${durLabel}`,
                    clarity: `Crystal Clear Focus | ${band} Isochronic Tones | ${durLabel}`,
                    genesis: `Creative Flow State | ${band} | Unlock Creativity | ${durLabel}`,
                    overdrive: `${band} Brain Stimulation | Peak Performance | ${durLabel}`,
                    gammaLift: `${band} Cognitive Enhancement | Memory & Focus | ${durLabel}`,
                    prime: `Morning Brain Activation | ${band} Waves | Start Your Day Right | ${durLabel}`,
                    presence: `Social Confidence Boost | ${band} Waves | Pre-Meeting Focus | ${durLabel}`,
                    auroraReset: `Jet Lag Recovery | ${band} Waves | Circadian Reset | ${durLabel}`,
                    cortexForge: `Hyper Focus Mode | ${band} Waves | Extreme Concentration | ${durLabel}`
                };

                const title = titleMap[sessionId] || `${session.name} | ${band} Binaural Beats ${hz}Hz | ${durLabel}`;

                // Translate phase names
                const translatePhase = (name) => {
                    return (trans.phases && trans.phases[name]) || name;
                };

                const phaseDetails = session.phases.map(p => {
                    const phz = p.audio ? Math.abs(p.audio.l - p.audio.r).toFixed(1) : '?';
                    const lhz = p.audio?.l || '?';
                    const rhz = p.audio?.r || '?';
                    return `• ${translatePhase(p.name)}: ${phz}Hz binaural beat (L:${lhz}Hz / R:${rhz}Hz)`;
                }).join('\n');

                const phase1Name = translatePhase(session.phases[0]?.name || 'Phase 1');
                const phase2Name = session.phases.length > 1 ? translatePhase(session.phases[1]?.name || 'Phase 2') : null;

                const description = `🧠 ${session.name} — Neuroscience-Backed Binaural Beats

${engDesc}

⚡ Frequency Protocol:
${phaseDetails}

🎧 HEADPHONES REQUIRED for binaural beat effect
The left and right ears receive slightly different frequencies, creating a perceived third tone (the binaural beat) that gently entrains your brainwaves.

📊 Based on neuroscience research:
• Frequency Following Response (FFR) — your brain naturally synchronizes to external rhythmic stimuli
• Glymphatic system activation during deep delta sleep
• MIT GENUS Protocol for 40Hz gamma stimulation (Iaccarino et al., 2016)

⏱️ Timestamps:
0:00 — Gentle fade-in
0:02 — ${phase1Name} begins
${phase2Name ? `${Math.floor((session.phases[1]?.start || 900) / 60)}:00 — ${phase2Name} begins` : ''}

⚠️ Do not use while driving or operating machinery
💤 For best results: dark room, comfortable position, consistent volume

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔬 Generated by Kora Cortex™ Bio-Entrainment Engine
   Custom-synthesized ${band} audio at ${hz}Hz
   48kHz / 16-bit / Stereo PCM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#binauralbeats #sleepmusic #healingfrequencies #${band.toLowerCase().replace(/[\s\/]/g, '')} #${session.name.toLowerCase().replace(/\s+/g, '')} #brainwaves #meditation #deepsleep #focusmusic #studymusic`;

                const tags = [
                    'binaural beats', 'sleep music', 'healing frequencies',
                    `${band.toLowerCase()} waves`, `${hz}hz`, 'deep sleep',
                    'meditation music', 'theta waves', 'alpha waves',
                    'brain waves', 'relaxation', 'study music', 'focus music',
                    session.name.toLowerCase(), 'brainwave entrainment',
                    'isochronic tones', 'sound therapy', 'sleep aid',
                    'anxiety relief', 'stress relief', 'neuroscience',
                    'frequency healing', '432hz', 'solfeggio frequencies',
                    'lucid dreaming', 'deep focus', 'concentration music',
                    'ambient', 'drone music', 'white noise', 'brown noise'
                ].slice(0, 30);

                return { title, description, tags };
            }

            /**
             * Copy metadata to clipboard and show toast.
             */
            async function copyMetadataToClipboard(meta) {
                const fullText = `TITLE:\n${meta.title}\n\nDESCRIPTION:\n${meta.description}\n\nTAGS:\n${meta.tags.join(', ')}`;

                try {
                    await navigator.clipboard.writeText(fullText);
                } catch (e) {
                    const ta = document.createElement('textarea');
                    ta.value = fullText;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                }

                showExportToast('✓ Metadata copied to clipboard!');
            }

            if (exportEls.metadataBtn) {
                exportEls.metadataBtn.addEventListener('click', async () => {
                    const meta = generateYouTubeMetadata(exportState.selectedProtocol, 8);
                    if (!meta) return;

                    exportEls.metadataTitle.textContent = meta.title;
                    exportEls.metadataDesc.textContent = meta.description;
                    exportEls.metadataTags.textContent = meta.tags.join(', ');
                    exportEls.metadataOutput.classList.remove('hidden');

                    // Auto-copy on generate
                    await copyMetadataToClipboard(meta);
                });
            }

            if (exportEls.copyMetadataBtn) {
                exportEls.copyMetadataBtn.addEventListener('click', async () => {
                    const meta = generateYouTubeMetadata(exportState.selectedProtocol, 8);
                    if (!meta) return;
                    await copyMetadataToClipboard(meta);
                });
            }

            // Initialize default duration selection
            setExportDuration(30);

            // ── i18n: re-render dynamic content on language switch ──
            document.addEventListener('langChanged', () => {
                // Always update status labels first (these never fail)
                if (!state.active) {
                    if (els.phaseName) els.phaseName.textContent = t('status.ready');
                    if (els.statusText) els.statusText.textContent = t('status.standby');
                }
                updateQuickActionsUI();
                updatePersonalizationUI();

                // Re-render dynamic lists (may fail if container not ready)
                try {
                    if (els.modeContainer) renderModes();
                    renderPrograms();
                    updateCircadianSync();
                    // Refresh visualizer description for current session
                    const data = getSessionData();
                    if (els.desc) els.desc.textContent = getLocalizedDesc(data);
                    if (!state.active) setSession(state.session, { skipSave: true });
                } catch (e) {
                    console.warn('[i18n] langChanged re-render partial fail:', e);
                }
            });
