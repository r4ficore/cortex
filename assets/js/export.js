import { backgrounds } from "./background-catalog.js";
import {
  exportConfig,
  exportManifest,
  wavBytes,
  MAX_BUFFERED_WAV_BYTES,
} from "./export-config.js";
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
export function exportPanel(selected, prefs = {}) {
  return `<div class="dialog-head"><h2 id="dialogTitle">${t("Eksport sesji", "Export a session")}</h2>${button("closeDialog", "", "close", "icon-btn", `aria-label="${t("Zamknij", "Close")}"`)}</div><div class="dialog-body"><p>${t("Zapisz dźwięk do słuchania poza przeglądarką. Plik WAV powstaje na Twoim urządzeniu i uwzględnia bieżące poziomy głośności oraz intensywność.", "Save a sound session to listen outside your browser. The WAV file is created on your device using your current volume levels and intensity.")}</p><label class="field"><span>${t("Sesja", "Session")}</span><select id="exportSession">${Object.values(
    sessions,
  )
    .filter((s) => s.id !== "breath")
    .map(
      (s) =>
        `<option value="${s.id}" ${s.id === selected ? "selected" : ""}>${s.name} · ${local(s.title)}</option>`,
    )
    .join(
      "",
    )}</select></label><div class="form-stack"><label class="field"><span>${t("Jakość pliku", "File quality")}</span><select id="exportRate"><option value="24000">WAV · 24 kHz · ${t("mniejszy plik", "smaller file")}</option><option value="48000">WAV · 48 kHz</option></select></label><label class="field"><span>${t("Długość pliku", "File duration")}</span><select id="exportDuration">${[1, 5, 15, 30, 45].map((n) => `<option value="${n}" ${n === 5 ? "selected" : ""}>${n} min · ~${Math.round((n * 60 * 96000) / 1048576)} MiB</option>`).join("")}</select></label><p class="help" id="exportSize"></p><details class="details"><summary>${t("Opcje eksportu", "Export options")}</summary><div class="form-stack"><label class="field"><span>${t("Układ dźwięku", "Sound arrangement")}</span><select id="exportEntrainment"><option value="binaural">${t("Stereo · tony rozdzielone", "Stereo · separate tones")}</option><option value="monaural">${t("Mono · tony połączone", "Mono · combined tones")}</option><option value="isochronic">${t("Jedna nośna + sinusoidalna AM", "One carrier + sinusoidal AM")}</option></select></label><label class="field"><span>${t("Nośna", "Carrier")}</span><select id="exportCarrier"><option value="native">${t("Według protokołu", "Protocol default")}</option><option>110</option><option>220</option><option>432</option></select></label><label class="field"><span>${t("Przebieg", "Sequence")}</span><select id="exportLoop"><option value="standard">${t("Pełna sekwencja z wyciszeniem", "Full sequence with fades")}</option><option value="stable">${t("Stały fragment", "Steady segment")}</option></select></label><label class="field"><span>${t("Tło", "Background")}</span><select id="exportNoise">${backgrounds
    .map((b) => [b.id, local(b)])
    .map(
      ([v, n]) =>
        `<option value="${v}" ${v === prefs.noiseType ? "selected" : ""}>${n}</option>`,
    )
    .join(
      "",
    )}</select></label></div></details></div><div class="export-status" id="exportStatus" hidden role="status"><progress id="exportProgress" max="100" value="0"></progress><p id="exportMessage"></p></div><div id="exportError" class="error" role="alert" hidden></div>${button("renderExport", t("Utwórz i pobierz WAV", "Create and download WAV"), "download", "btn btn-primary")}${button("cancelExport", t("Anuluj renderowanie", "Cancel rendering"), "", "btn", 'hidden id="cancelExport"')}<details class="details"><summary>${t("Grafika i dane sesji", "Artwork and session data")}</summary><div class="button-row">${button("exportArt", t("Grafika SVG", "SVG artwork"), "download")}${button("exportMetadata", t("Ustawienia tego eksportu · JSON", "This export’s settings · JSON"), "download")}</div></details><p class="help">${t("Stereo · 16 bit. 24 kHz zmniejsza plik o połowę i zachowuje częstotliwości protokołów; zmienia pasmo szumu. Duże pliki zapisujemy bezpośrednio na dysk, jeśli przeglądarka to obsługuje. Zmieniona długość skaluje etapy wyłącznie w eksportowanym pliku. Hypnos skaluje pełną wersję 30-minutową; stały fragment używa etapu głównego. Zmiana nośnej, układu lub długości tworzy własny wariant dźwięku.", "Stereo · 16 bit. 24 kHz halves the file size and preserves protocol frequencies; it changes the noise bandwidth. Large files stream to disk where supported. Changing the duration scales stages in the exported file only. Hypnos scales the complete 30-minute edition; steady export uses its main phase. Changing the carrier, arrangement or duration creates a custom sound variant.")}</p></div>`;
}
export function readExportConfig(root, prefs) {
  return exportConfig(
    {
      id: root.querySelector("#exportSession").value,
      minutes: Number(root.querySelector("#exportDuration").value),
      sampleRate: Number(root.querySelector("#exportRate").value),
      entrainment: root.querySelector("#exportEntrainment").value,
      carrier: root.querySelector("#exportCarrier").value,
      loop: root.querySelector("#exportLoop").value,
      noise: root.querySelector("#exportNoise").value,
    },
    prefs,
  );
}
export function exportMetadata(root, prefs) {
  const config = readExportConfig(root, prefs);
  downloadBlob(
    new Blob([JSON.stringify(exportManifest(config), null, 2)], {
      type: "application/json",
    }),
    `cortex-${config.session.id}-${config.session.duration / 60}min.json`,
  );
}
export function updateExportSize(root) {
  const rate = Number(root.querySelector("#exportRate").value);
  root.querySelectorAll("#exportDuration option").forEach((o) => {
    o.textContent = `${o.value} min · ~${Math.round(wavBytes(Number(o.value) * 60, rate) / 1048576)} MiB`;
  });
  const bytes = wavBytes(
    Number(root.querySelector("#exportDuration").value) * 60,
    rate,
  );
  root.querySelector("#exportSize").textContent =
    t("Rozmiar", "Size") +
    `: ${(bytes / 1048576).toFixed(1)} MiB. ` +
    (bytes > MAX_BUFFERED_WAV_BYTES && !globalThis.showSaveFilePicker
      ? t(
          "W tej przeglądarce wybierz krótszy czas lub 24 kHz (limit pamięci eksportu: 192 MiB).",
          "Choose a shorter duration or 24 kHz in this browser (export memory limit: 192 MiB).",
        )
      : t(
          "Dane JSON opisują dokładnie wybrany wariant.",
          "JSON data describes the selected variant exactly.",
        ));
}
function idleUI(root) {
  root.querySelector('[data-action="renderExport"]').disabled = false;
  root.querySelector("#cancelExport").hidden = true;
  root
    .querySelectorAll("select, [data-action=exportMetadata]")
    .forEach((e) => (e.disabled = false));
}
export function cancelExport(root) {
  if (job) {
    job.cancelled = true;
    job.worker?.terminate();
    job.chunks.length = 0;
    // A pending picker/write can still complete; its continuation checks cancelled.
    job.writer?.abort().catch(() => {});
    job = null;
  }
  if (root) {
    idleUI(root);
    root.querySelector("#exportStatus").hidden = true;
  }
}
export async function startExport(root, prefs = {}) {
  if (job) return;
  const config = readExportConfig(root, prefs),
    { session, options } = config;
  const bytes = wavBytes(session.duration, options.sampleRate);
  const error = root.querySelector("#exportError");
  error.hidden = true;
  if (!globalThis.showSaveFilePicker && bytes > MAX_BUFFERED_WAV_BYTES) {
    error.hidden = false;
    error.textContent = t(
      "Ten plik przekracza limit pamięci eksportu. Wybierz krótszy czas lub 24 kHz.",
      "This file exceeds the export memory limit. Choose a shorter duration or 24 kHz.",
    );
    return;
  }
  const current = { worker: null, chunks: [], writer: null, cancelled: false };
  job = current;
  root.querySelector('[data-action="renderExport"]').disabled = true;
  root
    .querySelectorAll("select, [data-action=exportMetadata]")
    .forEach((e) => (e.disabled = true));
  root.querySelector("#cancelExport").hidden = false;
  root.querySelector("#exportStatus").hidden = false;
  const progress = root.querySelector("#exportProgress"),
    message = root.querySelector("#exportMessage");
  progress.value = 0;
  message.textContent = t("Przygotowanie dźwięku…", "Preparing the sound…");
  const name = `cortex-${session.id}-${session.duration / 60}min.wav`;
  const fail = (err) => {
    if (job !== current) return;
    cancelExport(root);
    if (err?.name !== "AbortError") {
      error.hidden = false;
      error.textContent = t(
        "Nie udało się zapisać pliku. Spróbuj krótszego czasu.",
        "Could not save the file. Try a shorter duration.",
      );
    }
  };
  try {
    if (globalThis.showSaveFilePicker) {
      const handle = await showSaveFilePicker({
        suggestedName: name,
        types: [{ description: "WAV", accept: { "audio/wav": [".wav"] } }],
      });
      if (current.cancelled) return;
      current.writer = await handle.createWritable();
      if (current.cancelled) {
        await current.writer.abort();
        return;
      }
    }
    const worker = new Worker(new URL("./export-worker.js", import.meta.url), {
      type: "module",
    });
    current.worker = worker;
    worker.onerror = fail;
    worker.onmessage = async ({ data }) => {
      if (job !== current) return;
      try {
        if (data.error) throw Error("Render failed");
        if (data.chunk) {
          if (current.writer) await current.writer.write(data.chunk);
          else current.chunks.push(data.chunk);
          if (job !== current) return;
          worker.postMessage({ ack: true });
        }
        if (data.progress !== undefined) {
          progress.value = data.progress;
          message.textContent =
            t("Renderowanie", "Rendering") + ` · ${Math.floor(data.progress)}%`;
        }
        if (data.done) {
          if (current.writer) await current.writer.close();
          else
            downloadBlob(new Blob(current.chunks, { type: "audio/wav" }), name);
          if (job !== current) return;
          worker.terminate();
          current.chunks = [];
          job = null;
          idleUI(root);
          progress.value = 100;
          message.textContent = t(
            "Gotowe. Plik zapisany lub przekazany do pobrania.",
            "Ready. File saved or sent to downloads.",
          );
        }
      } catch (err) {
        fail(err);
      }
    };
    worker.postMessage({
      ...config,
      options: { ...options, backpressure: true },
    });
  } catch (err) {
    fail(err);
  }
}
