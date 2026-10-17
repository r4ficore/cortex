// randomUUID is secure-context-only; LAN previews still need local history IDs.
export function sessionId(cryptoAPI = globalThis.crypto) {
  if (typeof cryptoAPI?.randomUUID === "function")
    return cryptoAPI.randomUUID();
  if (typeof cryptoAPI?.getRandomValues === "function") {
    return Array.from(cryptoAPI.getRandomValues(new Uint32Array(4)), (n) =>
      n.toString(16).padStart(8, "0"),
    ).join("-");
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}
export const hasBreathHaptics = () =>
  typeof globalThis.navigator?.vibrate === "function";
export function breathHaptic(phase) {
  if (!hasBreathHaptics()) return;
  try {
    navigator.vibrate(
      phase === "inhale" ? 30 : phase === "exhale" ? [20, 60, 20] : 15,
    );
  } catch {}
}
export function stopHaptics() {
  if (hasBreathHaptics()) {
    try {
      navigator.vibrate(0);
    } catch {}
  }
}
