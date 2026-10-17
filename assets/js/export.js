import { sessions, sessionFor, makeSession } from "./catalog.js";
import { t, local, icon } from "./i18n.js";
import { button } from "./views.js";
let job = null;
export function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
export function exportPanel(selected) {
  return `<div class="dialog-head"><h2 id="dialogTitle">${t("Eksport sesji", "Export a session")}</h2>${button("closeDialog", "", "close", "icon-btn", `aria-label="${t("Zamknij", "Close")}"`)}</div><div class="dialog-body"><p>${t("Zapisz dźwięk do słuchania poza przeglądarką. Plik WAV powstaje na Twoim urządzeniu.", "Save a sound session to listen outside your browser. The WAV file is created on your device.")}</p><label class="field"><span>${t("Sesja", "Session")}</span><select id="exportSession">${Object.values(
    sessions,
  )
    .filter((s) => s.id !== "breath")
    .map(
      (s) =>
        `<option value="${s.id}" ${s.id === selected ? "selected" : ""}>${s.name} · ${local(s.title)}</option>`,
    )
    .join(
      "",
    )}</select></label><div class="form-stack"><label class="field"><span>${t("Długość pliku", "File duration")}</span><select id="exportDuration">${[1, 5, 15, 30, 45].map((n) => `<option value="${n}" ${n === 5 ? "selected" : ""}>${n} min · ~${Math.round((n * 60 * 192000) / 1048576)} MB</option>`).join("")}</select></label><details class="details"><summary>${t("Opcje eksportu", "Export options")}</summary><div class="form-stack"><label class="field"><span>${t("Układ dźwięku", "Sound arrangement")}</span><select id="exportEntrainment"><option value="binaural">${t("Stereo · tony rozdzielone", "Stereo · separate tones")}</option><option value="monaural">${t("Mono · tony połączone", "Mono · combined tones")}</option><option value="isochronic">${t("Modulacja izochroniczna", "Isochronic modulation")}</option></select></label><label class="field"><span>${t("Nośna", "Carrier")}</span><select id="exportCarrier"><option value="native">${t("Według protokołu", "Protocol default")}</option><option>110</option><option>220</option><option>432</option></select></label><label class="field"><span>${t("Przebieg", "Sequence")}</span><select id="exportLoop"><option value="standard">${t("Pełna sekwencja z wyciszeniem", "Full sequence with fades")}</option><option value="stable">${t("Stały fragment", "Steady segment")}</option></select></label><label class="field"><span>${t("Tło", "Background")}</span><select id="exportNoise">${[
    ["brown", t("Brązowy szum", "Brown noise")],
    ["pink", t("Różowy szum", "Pink noise")],
    ["white", t("Biały szum", "White noise")],
    ["green", t("Zielony szum", "Green noise")],
    ["drone", t("Ambientowy ton", "Ambient drone")],
    ["none", t("Bez tła", "No background")],
  ]
    .map(([v, n]) => `<option value="${v}">${n}</option>`)
    .join(
      "",
    )}</select></label></div></details></div><div class="export-status" id="exportStatus" hidden role="status"><progress id="exportProgress" max="100" value="0"></progress><p id="exportMessage"></p></div><div id="exportError" class="error" role="alert" hidden></div>${button("renderExport", t("Utwórz i pobierz WAV", "Create and download WAV"), "download", "btn btn-primary")}${button("cancelExport", t("Anuluj renderowanie", "Cancel rendering"), "", "btn", 'hidden id="cancelExport"')}<details class="details"><summary>${t("Grafika i dane sesji", "Artwork and session data")}</summary><div class="button-row">${button("exportArt", t("Grafika SVG", "SVG artwork"), "download")}${button("exportMetadata", t("Dane JSON", "JSON data"), "download")}</div></details><p class="help">${t("Stereo · 48 kHz · 16 bit. Dłuższe pliki potrzebują więcej pamięci. Zmieniona długość skaluje etapy wyłącznie w eksportowanym pliku.", "Stereo · 48 kHz · 16 bit. Longer files need more memory. Changing the duration scales stages in the exported file only.")}</p></div>`;
}
export function cancelExport(root) {
  if (job) {
    job.worker.terminate();
    job.chunks.length = 0;
    job = null;
  }
  if (root) {
    root.querySelector('[data-action="renderExport"]').disabled = false;
    root.querySelector("#cancelExport").hidden = true;
    root.querySelector("#exportStatus").hidden = true;
    root.querySelectorAll("select").forEach((e) => (e.disabled = false));
  }
}
export function startExport(root) {
  if (job) return;
  const id = root.querySelector("#exportSession").value,
    minutes = Number(root.querySelector("#exportDuration").value);
  const session = makeSession(id, minutes * 60);
  const options = {
    entrainment: root.querySelector("#exportEntrainment").value,
    carrier: root.querySelector("#exportCarrier").value,
    loop: root.querySelector("#exportLoop").value,
    noise: root.querySelector("#exportNoise").value,
  };
  let worker;
  try {
    worker = new Worker(new URL("./export-worker.js", import.meta.url), {
      type: "module",
    });
  } catch {
    const error = root.querySelector("#exportError");
    error.hidden = false;
    error.textContent = t(
      "Ta przeglądarka nie pozwala uruchomić eksportu audio.",
      "This browser cannot start the audio export.",
    );
    return;
  }
  const current = { worker, chunks: [] };
  job = current;
  root.querySelector("#exportError").hidden = true;
  root.querySelector("#exportStatus").hidden = false;
  root.querySelector("#cancelExport").hidden = false;
  root.querySelector('[data-action="renderExport"]').disabled = true;
  root.querySelectorAll("select").forEach((e) => (e.disabled = true));
  const progress = root.querySelector("#exportProgress"),
    message = root.querySelector("#exportMessage");
  progress.value = 0;
  message.textContent = t("Przygotowanie dźwięku…", "Preparing the sound…");
  const fail = () => {
    if (job !== current) return;
    cancelExport(root);
    const e = root.querySelector("#exportError");
    e.hidden = false;
    e.textContent = t(
      "Nie udało się utworzyć pliku. Spróbuj krótszego czasu.",
      "The file could not be created. Try a shorter duration.",
    );
  };
  worker.onerror = fail;
  worker.onmessage = ({ data }) => {
    if (job !== current) return;
    if (data.error) {
      fail();
      return;
    }
    if (data.chunk) current.chunks.push(data.chunk);
    if (data.progress !== undefined) {
      progress.value = data.progress;
      message.textContent =
        t("Renderowanie", "Rendering") + ` · ${Math.floor(data.progress)}%`;
    }
    if (data.done) {
      const blob = new Blob(current.chunks, { type: "audio/wav" });
      downloadBlob(blob, `cortex-${id}-${minutes}min.wav`);
      worker.terminate();
      current.chunks = [];
      job = null;
      root.querySelector('[data-action="renderExport"]').disabled = false;
      root.querySelector("#cancelExport").hidden = true;
      root.querySelectorAll("select").forEach((e) => (e.disabled = false));
      progress.value = 100;
      message.textContent = t(
        "Gotowe. Plik został przekazany do pobrania.",
        "Ready. The file has been sent to downloads.",
      );
    }
  };
  worker.postMessage({ session, options });
}
