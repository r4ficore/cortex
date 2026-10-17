export function wavHeader(frames, rate = 48000) {
  const buffer = new ArrayBuffer(44),
    v = new DataView(buffer);
  const str = (at, s) =>
    [...s].forEach((c, i) => v.setUint8(at + i, c.charCodeAt(0)));
  str(0, "RIFF");
  v.setUint32(4, 36 + frames * 4, true);
  str(8, "WAVE");
  str(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 2, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 4, true);
  v.setUint16(32, 4, true);
  v.setUint16(34, 16, true);
  str(36, "data");
  v.setUint32(40, frames * 4, true);
  return buffer;
}
export const pcm = (value) =>
  Math.round(Math.max(-1, Math.min(1, value)) * (value < 0 ? 32768 : 32767));
