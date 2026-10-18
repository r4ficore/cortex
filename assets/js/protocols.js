// Audio revision 2: explicit AM and continuous levels. See docs/audio-revision-2.md.
// Original IDs, stage timings, L/R frequencies and visual definitions are retained.
export const protocols = {
  hypnos: {
    id: "hypnos",
    name: "Hypnos",
    duration: Infinity,
    baseHz: "8 → 1 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 900,
        audio: {
          l: 100,
          r: 108,
          vol_s: 0.11,
          vol_e: 0.1,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 6,
          mod: "soft",
          bri: 0.3,
        },
      },
      {
        name: "Main",
        start: 900,
        end: Infinity,
        audio: {
          l: 60,
          r: 61,
          vol_s: 0.1,
          vol_e: 0.1,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 0.5,
          mod: "breath",
          bri: 0.05,
        },
      },
    ],
    soundProfile: "sleep",
    audioVersion: 2,
    evidence: "context-only",
  },
  prime: {
    id: "prime",
    name: "Prime",
    duration: 300,
    baseHz: "8 → 14 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 120,
        audio: {
          l: 220,
          r: 228,
          vol_s: 0.14,
          vol_e: 0.18,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 8,
          mod: "soft",
          bri: 0.6,
        },
      },
      {
        name: "Main",
        start: 120,
        end: 300,
        audio: {
          l: 220,
          r: 234,
          vol_s: 0.18,
          vol_e: 0.18,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 14,
          mod: "soft",
          bri: 0.8,
        },
      },
    ],
    soundProfile: "energy",
    audioVersion: 2,
    evidence: "context-only",
  },
  overdrive: {
    id: "overdrive",
    name: "Overdrive",
    duration: 300,
    baseHz: "30 → 40 → 20 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 60,
        audio: {
          l: 440,
          r: 470,
          vol_s: 0.15,
          vol_e: 0.2,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f_s: 20,
          f_e: 35,
          mod: "hard",
        },
      },
      {
        name: "Main",
        start: 60,
        end: 240,
        audio: {
          l: 440,
          r: 480,
          vol_s: 0.2,
          vol_e: 0.2,
          am: {
            rate: 40,
            depth: 0.5,
          },
        },
        visual: {
          f: 40,
          mod: "hard",
          bri: 1,
        },
      },
      {
        name: "Closing",
        start: 240,
        end: 300,
        audio: {
          l: 440,
          r: 460,
          vol_s: 0.2,
          vol_e: 0.14,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f_s: 30,
          f_e: 10,
          mod: "soft",
        },
      },
    ],
    soundProfile: "energy",
    audioVersion: 2,
    evidence: "context-only",
  },
  deepFocus: {
    id: "deepFocus",
    name: "Deep Focus",
    duration: 900,
    baseHz: "14 → 18 → 14 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 120,
        audio: {
          l: 210,
          r: 224,
          vol_s: 0.14,
          vol_e: 0.18,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 10,
          mod: "soft",
          bri: 0.7,
        },
      },
      {
        name: "Main",
        start: 120,
        end: 780,
        audio: {
          l: 230,
          r: 248,
          vol_s: 0.18,
          vol_e: 0.18,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 14,
          mod: "soft",
          bri: 0.85,
        },
      },
      {
        name: "Closing",
        start: 780,
        end: 900,
        audio: {
          l: 210,
          r: 224,
          vol_s: 0.18,
          vol_e: 0.13,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 10,
          mod: "soft",
          bri: 0.6,
        },
      },
    ],
    soundProfile: "focus",
    audioVersion: 2,
    evidence: "context-only",
  },
  clarity: {
    id: "clarity",
    name: "Clarity",
    duration: 720,
    baseHz: "12 → 16 → 12 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 180,
        audio: {
          l: 220,
          r: 232,
          vol_s: 0.14,
          vol_e: 0.18,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 10,
          mod: "soft",
        },
      },
      {
        name: "Main",
        start: 180,
        end: 600,
        audio: {
          l: 220,
          r: 236,
          vol_s: 0.18,
          vol_e: 0.18,
          am: {
            rate: 16,
            depth: 1,
          },
        },
        visual: {
          f: 12,
          mod: "soft",
        },
      },
      {
        name: "Closing",
        start: 600,
        end: 720,
        audio: {
          l: 220,
          r: 232,
          vol_s: 0.18,
          vol_e: 0.13,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 8,
          mod: "soft",
        },
      },
    ],
    soundProfile: "focus",
    audioVersion: 2,
    evidence: "context-only",
  },
  genesis: {
    id: "genesis",
    name: "Genesis",
    duration: 600,
    baseHz: "10 → 6 → 10 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 120,
        audio: {
          l: 180,
          r: 190,
          vol_s: 0.12,
          vol_e: 0.16,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 10,
          mod: "soft",
          bri: 0.6,
        },
      },
      {
        name: "Main",
        start: 120,
        end: 500,
        audio: {
          l: 150,
          r: 156,
          vol_s: 0.16,
          vol_e: 0.16,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 6,
          mod: "soft",
          bri: 0.5,
        },
      },
      {
        name: "Closing",
        start: 500,
        end: 600,
        audio: {
          l: 180,
          r: 190,
          vol_s: 0.16,
          vol_e: 0.12,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 8,
          mod: "soft",
          bri: 0.4,
        },
      },
    ],
    soundProfile: "focus",
    audioVersion: 2,
    evidence: "context-only",
  },
  equilibrium: {
    id: "equilibrium",
    name: "Equilibrium",
    duration: 420,
    baseHz: "12 → 10 → 8 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 60,
        audio: {
          l: 200,
          r: 212,
          vol_s: 0.12,
          vol_e: 0.16,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 12,
          mod: "soft",
          bri: 0.6,
        },
      },
      {
        name: "Main",
        start: 60,
        end: 360,
        audio: {
          l: 200,
          r: 210,
          vol_s: 0.16,
          vol_e: 0.16,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 10,
          mod: "breath",
          bri: 0.7,
        },
      },
      {
        name: "Closing",
        start: 360,
        end: 420,
        audio: {
          l: 200,
          r: 208,
          vol_s: 0.16,
          vol_e: 0.11,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 8,
          mod: "breath",
          bri: 0.5,
        },
      },
    ],
    soundProfile: "calm",
    audioVersion: 2,
    evidence: "context-only",
  },
  restoration: {
    id: "restoration",
    name: "Restoration",
    duration: 900,
    baseHz: "8 → 3 → 8 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 180,
        audio: {
          l: 100,
          r: 108,
          vol_s: 0.12,
          vol_e: 0.15,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 8,
          mod: "soft",
          bri: 0.5,
        },
      },
      {
        name: "Main",
        start: 180,
        end: 800,
        audio: {
          l: 100,
          r: 103,
          vol_s: 0.15,
          vol_e: 0.15,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 3,
          mod: "breath",
          bri: 0.3,
        },
      },
      {
        name: "Closing",
        start: 800,
        end: 900,
        audio: {
          l: 100,
          r: 108,
          vol_s: 0.15,
          vol_e: 0.11,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 6,
          mod: "soft",
          bri: 0.4,
        },
      },
    ],
    soundProfile: "calm",
    audioVersion: 2,
    evidence: "context-only",
  },
  presence: {
    id: "presence",
    name: "Presence",
    duration: 420,
    baseHz: "10 → 10 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 360,
        audio: {
          l: 240,
          r: 250,
          vol_s: 0.12,
          vol_e: 0.16,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 10,
          mod: "soft",
        },
      },
      {
        name: "Main",
        start: 360,
        end: 420,
        audio: {
          l: 240,
          r: 250,
          vol_s: 0.16,
          vol_e: 0.12,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 8,
          mod: "soft",
        },
      },
    ],
    soundProfile: "focus",
    audioVersion: 2,
    evidence: "context-only",
  },
  auroraReset: {
    id: "auroraReset",
    name: "Aurora Reset",
    duration: 1800,
    baseHz: "4 → 8 → 5 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 300,
        audio: {
          l: 160,
          r: 164,
          vol_s: 0.1,
          vol_e: 0.12,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 5,
          mod: "soft",
          bri: 0.35,
        },
      },
      {
        name: "Main",
        start: 300,
        end: 1200,
        audio: {
          l: 180,
          r: 188,
          vol_s: 0.12,
          vol_e: 0.12,
          am: {
            rate: 8,
            depth: 0.15,
          },
        },
        visual: {
          f: 9,
          mod: "breath",
          bri: 0.45,
        },
      },
      {
        name: "Closing",
        start: 1200,
        end: 1800,
        audio: {
          l: 170,
          r: 175,
          vol_s: 0.12,
          vol_e: 0.08,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 6,
          mod: "soft",
          bri: 0.4,
        },
      },
    ],
    soundProfile: "sleep",
    audioVersion: 2,
    evidence: "context-only",
  },
  cortexForge: {
    id: "cortexForge",
    name: "Cortex Forge",
    duration: 2040,
    baseHz: "14 → 18 → 12 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 240,
        audio: {
          l: 230,
          r: 244,
          vol_s: 0.14,
          vol_e: 0.18,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 12,
          mod: "soft",
          bri: 0.65,
        },
      },
      {
        name: "Main",
        start: 240,
        end: 1800,
        audio: {
          l: 250,
          r: 268,
          vol_s: 0.18,
          vol_e: 0.18,
          am: {
            rate: 18,
            depth: 0.35,
          },
        },
        visual: {
          f: 18,
          mod: "hard",
          bri: 0.85,
        },
      },
      {
        name: "Closing",
        start: 1800,
        end: 2040,
        audio: {
          l: 210,
          r: 222,
          vol_s: 0.18,
          vol_e: 0.13,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 12,
          mod: "breath",
          bri: 0.55,
        },
      },
    ],
    soundProfile: "focus",
    audioVersion: 2,
    evidence: "context-only",
  },
  parasymPathway: {
    id: "parasymPathway",
    name: "Parasym Pathway",
    duration: 1440,
    baseHz: "6 → 3 → 8 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 300,
        audio: {
          l: 170,
          r: 176,
          vol_s: 0.11,
          vol_e: 0.15,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 7,
          mod: "breath",
          bri: 0.4,
        },
      },
      {
        name: "Main",
        start: 300,
        end: 1020,
        audio: {
          l: 140,
          r: 143,
          vol_s: 0.15,
          vol_e: 0.14,
          am: {
            rate: 3,
            depth: 0.2,
          },
        },
        visual: {
          f: 4,
          mod: "soft",
          bri: 0.25,
        },
      },
      {
        name: "Closing",
        start: 1020,
        end: 1440,
        audio: {
          l: 170,
          r: 178,
          vol_s: 0.14,
          vol_e: 0.1,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 8,
          mod: "soft",
          bri: 0.35,
        },
      },
    ],
    soundProfile: "calm",
    audioVersion: 2,
    evidence: "context-only",
  },
  remSculpt: {
    id: "remSculpt",
    name: "REM Sculpt",
    duration: 2100,
    baseHz: "6 → 6 → 8 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 600,
        audio: {
          l: 170,
          r: 176,
          vol_s: 0.1,
          vol_e: 0.12,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 7,
          mod: "breath",
          bri: 0.45,
        },
      },
      {
        name: "Main",
        start: 600,
        end: 1800,
        audio: {
          l: 160,
          r: 166,
          vol_s: 0.12,
          vol_e: 0.12,
          am: {
            rate: 6,
            depth: 0.15,
          },
        },
        visual: {
          f: 6,
          mod: "soft",
          bri: 0.4,
        },
      },
      {
        name: "Closing",
        start: 1800,
        end: 2100,
        audio: {
          l: 180,
          r: 188,
          vol_s: 0.12,
          vol_e: 0.08,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 9,
          mod: "soft",
          bri: 0.5,
        },
      },
    ],
    soundProfile: "sleep",
    audioVersion: 2,
    evidence: "context-only",
  },
  gammaLift: {
    id: "gammaLift",
    name: "Gamma Lift",
    duration: 960,
    baseHz: "18 → 40 → 12 Hz (L/R)",
    phases: [
      {
        name: "Opening",
        start: 0,
        end: 180,
        audio: {
          l: 240,
          r: 258,
          vol_s: 0.14,
          vol_e: 0.2,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 16,
          mod: "pulse",
          bri: 0.75,
        },
      },
      {
        name: "Main",
        start: 180,
        end: 660,
        audio: {
          l: 260,
          r: 300,
          vol_s: 0.2,
          vol_e: 0.2,
          am: {
            rate: 40,
            depth: 1,
          },
        },
        visual: {
          f: 38,
          mod: "hard",
          bri: 0.9,
        },
      },
      {
        name: "Closing",
        start: 660,
        end: 960,
        audio: {
          l: 230,
          r: 242,
          vol_s: 0.2,
          vol_e: 0.14,
          am: {
            rate: 0,
            depth: 0,
          },
        },
        visual: {
          f: 12,
          mod: "breath",
          bri: 0.55,
        },
      },
    ],
    soundProfile: "energy",
    audioVersion: 2,
    evidence: "context-only",
  },
};
export const programs = [
  {
    id: "flow90",
    name: "Flow 90",
    steps: [
      {
        sessionId: "deepFocus",
        durationMinutes: 5,
      },
      {
        sessionId: "prime",
        durationMinutes: 10,
      },
      {
        sessionId: "clarity",
        durationMinutes: 55,
      },
      {
        sessionId: "equilibrium",
        durationMinutes: 20,
      },
    ],
  },
  {
    id: "socialUpgrade",
    name: "Social Upgrade",
    steps: [
      {
        sessionId: "presence",
        durationMinutes: 7,
      },
      {
        sessionId: "equilibrium",
        durationMinutes: 10,
      },
    ],
  },
  {
    id: "sleepReset",
    name: "Sleep Reset",
    steps: [
      {
        sessionId: "restoration",
        durationMinutes: 20,
      },
      {
        sessionId: "hypnos",
        durationMinutes: 90,
      },
    ],
  },
  {
    id: "powerNap45",
    name: "Power Nap 45",
    steps: [
      {
        sessionId: "equilibrium",
        durationMinutes: 10,
      },
      {
        sessionId: "hypnos",
        durationMinutes: 30,
      },
      {
        sessionId: "genesis",
        durationMinutes: 5,
      },
    ],
  },
  {
    id: "creativeBloom",
    name: "Creative Bloom",
    steps: [
      {
        sessionId: "presence",
        durationMinutes: 8,
      },
      {
        sessionId: "deepFocus",
        durationMinutes: 45,
      },
      {
        sessionId: "equilibrium",
        durationMinutes: 10,
      },
    ],
  },
];
