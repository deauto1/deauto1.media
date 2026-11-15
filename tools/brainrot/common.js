const $ = s => document.querySelector(s);
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const pop = x => { x = clamp(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
let V, TM, T;
function beatAt(t) { let bi = 0; for (let i = 0; i < TM.beats.length; i++) if (t >= TM.beats[i]) bi = i; return [bi, t - TM.beats[bi]]; }
function caps(t, size) { const cap = $("#cap"); if (!cap) return; const ch = TM.chunks.find(c => t >= c.s && t < c.e); size = size || 96;
  if (!ch) { cap.innerHTML = ""; return; } cap.style.fontSize = size + "px"; cap.innerHTML = ch.w.map(w => `<span class="${t >= w.s ? "on" : ""}" style="transform:scale(${t >= w.s ? 1 + 0.12 * Math.max(0, 1 - (t - w.s) / 0.15) : 1})">${w.t}</span>`).join("");
  const tot = cap.scrollWidth; if (tot > 1040) cap.style.fontSize = Math.floor(size * 1040 / tot) + "px"; }
function show(el, on, k) { el.style.display = on ? "" : "none"; if (on && k != null) el.style.transform = `scale(${0.6 + 0.4 * pop(k)})`; }
window.__init = (v, tm, total) => { V = v; TM = tm; T = total; $("#tag").textContent = v.tag; if (window.setup) setup(); return document.fonts.ready.then(() => true); };
