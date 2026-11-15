// node render.js <id> [--still t1,t2]  -> out/DEAUTO_br_<id>.mp4
const { chromium } = require("playwright"); const { execFileSync, spawn } = require("child_process");
const fs = require("fs"), path = require("path"); const V = require("./data.js").concat(require("./data2.js")).concat(require("./data3.js")); const { SIMS } = require("./sims2.js");
const FPS = 30, TEMPO = 1.12, LEAD = 0.12, TAIL = 0.9;
const id = process.argv[2]; const v = V.find(x => x.id === id); const stillArg = process.argv.indexOf("--still");
const D = __dirname; fs.mkdirSync(D + "/out", { recursive: true }); fs.mkdirSync(D + "/tmp", { recursive: true });
const fast = `${D}/tmp/${id}_fast.wav`;
const HAS = fs.existsSync(`${D}/audio/${id}.mp3`);
if (!HAS) { const n = v.beats.reduce((a, b) => a + b.vo.replace(/[\u064B-\u0652]/g, "").length * 0.062 + (b.vo.match(/[.،؟:…!?]/g) || []).length * 0.22, 0); execFileSync("ffmpeg", ["-y", "-v", "error", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", (v.silentDur || n).toFixed(2), fast]); }
else execFileSync("ffmpeg", ["-y", "-v", "error", "-i", `${D}/audio/${id}.mp3`, "-af", `atempo=${TEMPO},highpass=f=70,volume=1.25`, "-ar", "44100", "-ac", "1", fast]);
const dur = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", fast]).toString();
// silences -> voiced intervals
let log = ""; try { execFileSync("ffmpeg", ["-hide_banner", "-i", fast, "-af", "silencedetect=noise=-32dB:d=0.16", "-f", "null", "-"], { stdio: ["ignore", "ignore", "pipe"] }); } catch (e) { }
log = require("child_process").spawnSync("ffmpeg", ["-hide_banner", "-i", fast, "-af", "silencedetect=noise=-32dB:d=0.16", "-f", "null", "-"]).stderr.toString();
const ss = [...log.matchAll(/silence_start: ([\d.]+)/g)].map(m => +m[1]), se = [...log.matchAll(/silence_end: ([\d.]+)/g)].map(m => +m[1]);
const voiced = []; let cur = 0; for (let i = 0; i < ss.length; i++) { if (ss[i] > cur + 0.02) voiced.push([cur, ss[i]]); cur = se[i] ?? dur; } if (cur < dur - 0.02) voiced.push([cur, dur]);
const totV = voiced.reduce((a, x) => a + x[1] - x[0], 0);
const v2r = vt => { let acc = 0; for (const [a, b] of voiced) { if (vt <= acc + (b - a)) return a + (vt - acc); acc += b - a; } return dur; };
// words
const words = []; v.beats.forEach((b, bi) => b.vo.split(/([.،؟:…!?])/).forEach(seg => { if (/^[.،؟:…!?]$/.test(seg)) { if (words.length) { words[words.length - 1].brk = true; words[words.length - 1].mk = seg; } return; }
  seg.trim().split(/\s+/).filter(Boolean).forEach((w, wi) => words.push({ t: w, bi, first: false })); }));
let lastBi = -1; words.forEach(w => { if (w.bi !== lastBi) { w.first = true; lastBi = w.bi; } });
const wt = w => w.t.replace(/[ً-ْ]/g, "").length + 1.2; const totW = words.reduce((a, w) => a + wt(w), 0);
const NOCTA = HAS && fs.existsSync(`${D}/audio/${id}.nocta`); const ctaBi = v.beats.findIndex(b => b.cta); let ctaW = [];
if (NOCTA && ctaBi >= 0) { ctaW = words.filter(w => w.bi === ctaBi); for (let i = words.length - 1; i >= 0; i--) if (words[i].bi === ctaBi) words.splice(i, 1); }
const dist = (ws, t0, t1) => { // spread words over voiced time inside [t0,t1]
  const iv = voiced.map(([a, b]) => [Math.max(a, t0), Math.min(b, t1)]).filter(x => x[1] > x[0] + 0.01); if (!iv.length) iv.push([t0, t1]);
  const tv = iv.reduce((a, x) => a + x[1] - x[0], 0), m = vt => { let c = 0; for (const [a, b] of iv) { if (vt <= c + (b - a) + 1e-9) return a + (vt - c); c += b - a; } return t1; };
  const tw = ws.reduce((a, w) => a + wt(w), 0); let c = 0; ws.forEach(w => { w.s = m(c / tw * tv); c += wt(w); w.e = m(c / tw * tv); }); };
dist(words, 0, dur);
if (!HAS) { voiced.length = 0; voiced.push([0, dur]); ss.length = 0; se.length = 0; let c = 0; const W = words.map(w => wt(w) * 0.062 / 1 + (w.mk ? 0.22 : 0)); const tw = W.reduce((a, x) => a + x, 0); words.forEach((w, i) => { w.s = c / tw * dur; c += W[i]; w.e = (c - (w.mk ? 0.22 : 0)) / tw * dur; }); }
// align punctuation marks to detected pauses (DP), then re-time between anchors
const sil = ss.map((x, i) => [x, se[i] ?? dur]).filter(x => x[0] > 0.15 && x[0] < dur - 0.25);
const pen = { ":": 0.3, "،": 0.45, "…": 0.8, ".": 1.5, "؟": 1.5, "!": 1.5, "?": 1.5 };
for (let it = 0; HAS && it < 3; it++) {
  const marks = words.map((w, i) => ({ i, k: w.mk })).filter(m => m.k && m.i < words.length - 1);
  const J = marks.length, I = sil.length, f = Array.from({ length: J + 1 }, () => Array(I + 1).fill(1e9)), bk = Array.from({ length: J + 1 }, () => Array(I + 1).fill(0)); f[0][0] = 0;
  for (let j = 0; j <= J; j++) for (let i = 0; i <= I; i++) { const c = f[j][i]; if (c > 1e8) continue;
    if (j < J && c + pen[marks[j].k] < f[j + 1][i]) { f[j + 1][i] = c + pen[marks[j].k]; bk[j + 1][i] = 1; }
    if (i < I) { const sc = 0.35 + 1.6 * (sil[i][1] - sil[i][0]); if (c + sc < f[j][i + 1]) { f[j][i + 1] = c + sc; bk[j][i + 1] = 2; } }
    if (j < J && i < I) { const mc = Math.min(2.5, Math.abs(words[marks[j].i].e - sil[i][0])) * 0.6; if (c + mc < f[j + 1][i + 1]) { f[j + 1][i + 1] = c + mc; bk[j + 1][i + 1] = 3; } } }
  const anch = []; let j = J, i = I; while (j > 0 || i > 0) { const k = bk[j][i]; if (k === 3) { anch.unshift([marks[j - 1].i, sil[i - 1]]); j--; i--; } else if (k === 1) j--; else i--; }
  let w0 = 0, t0 = 0; for (const [wi, [a, b]] of anch) { dist(words.slice(w0, wi + 1), t0, a); w0 = wi + 1; t0 = b; } dist(words.slice(w0), t0, dur);
}
words.forEach(w => { w.s += LEAD; w.e += LEAD; });
ctaW.forEach((w, i) => { w.s = dur + LEAD + 0.25 + i * 0.2; w.e = w.s + 0.2; words.push(w); });
const beats = v.beats.map((b, bi) => bi === 0 ? 0 : words.find(x => x.bi === bi).s - 0.05);
// chunks of <=3 words / <=15 chars, broken at punctuation and beat changes
const chunks = []; let c = null; words.forEach((w, i) => { const len = c ? c.w.reduce((a, x) => a + x.t.length + 1, 0) : 0;
  if (!c || w.first || c.w.length >= 3 || len + w.t.length > 15 || words[i - 1].brk) { c = { w: [], s: w.s }; chunks.push(c); } c.w.push({ t: w.t, s: w.s }); c.e = w.e; });
chunks.forEach((c, i) => { c.e = chunks[i + 1] ? Math.min(chunks[i + 1].s, c.e + 0.5) : c.e + 0.6; });
const T = dur + LEAD + (ctaW.length ? 0.25 + ctaW.length * 0.2 + 0.9 : TAIL), N = Math.round(T * FPS); const seed0 = [...id].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7); let seed = seed0, best = 1e9;
if (process.env.SIM) v.sim = process.env.SIM; if (process.env.THEME) v.theme2 = process.env.THEME; const OUT = process.env.OUT || id;
const KIND = v.sim || "rings"; const Sim = SIMS[KIND];
for (let k = 0; KIND === "rings" && k < 60; k++) { const s = new Sim(seed0 + k, 8); let t = 0; while (t < T) { s.step(1 / 120); t += 1 / 120; } const br = [0, ...s.events.filter(e => e.k === "break").map(e => e.t), T]; let g = 0; for (let i = 1; i < br.length; i++) g = Math.max(g, br[i] - br[i - 1]); if (g < best) { best = g; seed = seed0 + k; } }
// SFX track from the same sim
const sim = new Sim(seed, 8, T); let st = 0; while (st < T) { sim.step(1 / 120); st += 1 / 120; }
const SR = 44100, pcm = new Float32Array(Math.ceil(T * SR)); let rs = 12345; const rnd = () => ((rs = (rs * 1103515245 + 12345) >>> 0) / 4294967296) * 2 - 1;
const add = (t0, len, fn) => { const s0 = Math.floor(t0 * SR); for (let i = 0; i < len * SR && s0 + i < pcm.length; i++) pcm[s0 + i] += fn(i / SR, i / (len * SR)); };
let lastHit = -1; for (const e of sim.events) { if (e.k === "hit") { if (e.t - lastHit < 0.07) continue; lastHit = e.t; add(e.t, 0.035, (t, p) => (Math.sin(2 * Math.PI * 950 * t) * 0.5 + rnd() * 0.5) * Math.exp(-p * 7) * 0.085); }
  else add(e.t, 0.22, (t, p) => (Math.sin(2 * Math.PI * (260 - 190 * p) * t) * 0.8 + rnd() * 0.35 * (1 - p)) * Math.exp(-p * 4) * 0.30); }
if (!HAS) words.forEach(w => add(w.s, 0.03, (t, p) => Math.sin(2 * Math.PI * 420 * t) * Math.exp(-p * 6) * 0.16));
beats.slice(1).forEach(bt => add(Math.max(0, bt - 0.09), 0.2, (t, p) => rnd() * Math.sin(Math.PI * p) ** 2 * 0.11 * (0.4 + p)));
const buf = Buffer.alloc(44 + pcm.length * 2); buf.write("RIFF", 0); buf.writeUInt32LE(36 + pcm.length * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(pcm.length * 2, 40);
for (let i = 0; i < pcm.length; i++) buf.writeInt16LE(Math.max(-1, Math.min(1, pcm[i])) * 32767 | 0, 44 + i * 2);
const sfx = `${D}/tmp/${id}_sfx.wav`; fs.writeFileSync(sfx, buf);
console.log(id, "T", T.toFixed(2), "beats", beats.map(x => x.toFixed(2)).join(" "), "breaks", sim.events.filter(e => e.k === "break").map(e => e.t.toFixed(1)).join(" "), "sim", KIND);
(async () => {
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  if (v.times) beats.splice(0, beats.length, ...v.times);
  await pg.goto("file://" + D + "/" + (v.page || "render.html")); await pg.evaluate(([v, tm, T, seed]) => window.__init(v, tm, T, seed), [v, { beats, chunks }, T, seed]);
  if (stillArg > 0) { for (const t of process.argv[stillArg + 1].split(",")) { await pg.evaluate(t => window.__frame(t), +t); await pg.screenshot({ path: `${D}/tmp/${id}_${t}.png` }); } await br.close(); return; }
  const out = `${D}/out/DEAUTO_br_${OUT}.mp4`;
  const ff = spawn("ffmpeg", ["-y", "-v", "error", "-f", "image2pipe", "-framerate", "" + FPS, "-c:v", "mjpeg", "-i", "-", "-itsoffset", "" + LEAD, "-i", fast, "-i", sfx,
    "-filter_complex", "[1:a]apad[a1];[a1][2:a]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.95[a]", "-map", "0:v", "-map", "[a]", "-t", T.toFixed(3),
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "" + FPS, "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  for (let i = 0; i < N; i++) { await pg.evaluate(t => window.__frame(t), i / FPS); const im = await pg.screenshot({ type: "jpeg", quality: 92 }); if (!ff.stdin.write(im)) await new Promise(r => ff.stdin.once("drain", r)); }
  ff.stdin.end(); await new Promise(r => ff.on("close", r)); await br.close(); console.log("done", out);
})();
