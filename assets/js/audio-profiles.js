// Sound-design choices, not therapeutic doses. Frequency definitions live in
// protocols.js; changing comfort or background never retunes those frequencies.
export const audioProfiles = {
  focus: {
    transition: 6,
    fadeIn: 3,
    fadeOut: 8,
    root: 130.8125,
    movement: 0.05,
    texture: "pink",
  },
  calm: {
    transition: 8,
    fadeIn: 4,
    fadeOut: 12,
    root: 110,
    movement: 0.14,
    texture: "brown",
  },
  sleep: {
    transition: 12,
    fadeIn: 5,
    fadeOut: 30,
    root: 82.40625,
    movement: 0.03,
    texture: "brown",
  },
  energy: {
    transition: 4,
    fadeIn: 3,
    fadeOut: 8,
    root: 146.84375,
    movement: 0.09,
    texture: "pink",
  },
};
export const profileFor = (session) =>
  audioProfiles[session.soundProfile || session.goal] || audioProfiles.focus;
