// node brandr.js <id> [--still t1,t2]
const { chromium } = require("playwright"); const { spawn, execFileSync } = require("child_process"); const fs = require("fs");
const V = require("./bdata.js"); const id = process.argv[2]; const v = V.find(x => x.id === id); const FPS = 30, D = __dirname;
const stillArg = process.argv.indexOf("--still");
const AJ = `${D}/baudio/${id}.json`, VOICED = fs.existsSync(AJ); let vgain = 0;
if (VOICED) { const a = JSON.parse(fs.readFileSync(AJ)); v.scenes.forEach((s, i) => { s.d = i < v.scenes.length - 1 ? a.starts[i + 1] - a.starts[i] : a.tail - a.starts[i] + 1.4; if (s.k === "list") s.gap = Math.min(s.gap || .5, (s.d - 1.0) / s.items.length); });
  const mv = +(/mean_volume: (-?[\d.]+)/.exec(require("child_process").spawnSync("ffmpeg", ["-hide_banner", "-i", `${D}/baudio/${id}.mp3`, "-af", "volumedetect", "-f", "null", "-"]).stderr.toString())[1]); vgain = Math.max(0, Math.min(12, -16 - mv)); }
(async () => {
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await pg.goto("file://" + D + "/brand.html"); await pg.evaluate(() => document.fonts.ready);
  const { T, SFX } = await pg.evaluate(v => window.__init(v), v); await pg.waitForTimeout(300);
  if (stillArg > 0) { for (const t of process.argv[stillArg + 1].split(",")) { await pg.evaluate(t => window.__frame(t), +t); await pg.screenshot({ path: `${D}/tmp/${id}_${t}.png` }); } await br.close(); return; }
  // SFX synth (non-musical)
  const SR = 44100, pcm = new Float32Array(Math.ceil((T + .2) * SR)); let rs = 9; const rnd = () => ((rs = (rs * 1103515245 + 12345) >>> 0) / 4294967296) * 2 - 1;
  const add = (t0, len, fn) => { const s0 = Math.floor(t0 * SR); for (let i = 0; i < len * SR && s0 + i < pcm.length; i++) if (s0 + i >= 0) pcm[s0 + i] += fn(i / SR, i / (len * SR)); };
  let lp = 0; const lpf = (x, a) => (lp += a * (x - lp));
  for (const e of SFX) {
    if (e.k === "whoosh") { lp = 0; add(e.t - .22, .42, (t, p) => lpf(rnd(), .08 + .25 * Math.sin(Math.PI * p)) * Math.sin(Math.PI * p) ** 2 * .55); }
    if (e.k === "tick") add(e.t, .028, (t, p) => Math.sin(2 * Math.PI * 1500 * t) * Math.exp(-p * 6) * .13);
    if (e.k === "click") { add(e.t, .05, (t, p) => (rnd() * .5 + Math.sin(2 * Math.PI * 2400 * t) * .3) * Math.exp(-p * 9) * .16); add(e.t, .12, (t, p) => Math.sin(2 * Math.PI * 140 * t) * Math.exp(-p * 7) * .18); }
    if (e.k === "thud") { add(e.t, .7, (t, p) => Math.sin(2 * Math.PI * (68 - 26 * p) * t) * Math.exp(-p * 4.5) * .55); lp = 0; add(e.t, .08, (t, p) => lpf(rnd(), .3) * Math.exp(-p * 5) * .35); }
    if (e.k === "rise") { lp = 0; add(e.t - .1, .6, (t, p) => lpf(rnd(), .05 + .3 * p) * p * p * (1 - p) * 3 * .35); }
  }
  const buf = Buffer.alloc(44 + pcm.length * 2); buf.write("RIFF", 0); buf.writeUInt32LE(36 + pcm.length * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(pcm.length * 2, 40);
  for (let i = 0; i < pcm.length; i++) buf.writeInt16LE(Math.max(-1, Math.min(1, pcm[i])) * 32767 | 0, 44 + i * 2);
  const sfx = `${D}/tmp/${id}_bsfx.wav`; fs.writeFileSync(sfx, buf);
  const out = `${D}/out/DEAUTO_brand_${id}.mp4`; const N = Math.round(T * FPS);
  const ff = spawn("ffmpeg", ["-y", "-v", "error", "-f", "image2pipe", "-framerate", "" + FPS, "-c:v", "mjpeg", "-i", "-", "-i", sfx, ...(VOICED ? ["-i", `${D}/baudio/${id}.mp3`] : []), "-filter_complex", VOICED ? `[1:a]volume=0.9[s];[2:a]volume=${vgain.toFixed(1)}dB,highpass=f=70,apad[vo];[vo][s]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.95[a]` : "[1:a]volume=1.6,alimiter=limit=0.9[a]", "-map", "0:v", "-map", "[a]", "-t", T.toFixed(3),
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-pix_fmt", "yuv420p", "-r", "" + FPS, "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  for (let i = 0; i < N; i++) { await pg.evaluate(t => window.__frame(t), i / FPS); const im = await pg.screenshot({ type: "jpeg", quality: 93 }); if (!ff.stdin.write(im)) await new Promise(r => ff.stdin.once("drain", r)); }
  ff.stdin.end(); await new Promise(r => ff.on("close", r)); await br.close(); console.log("done", out, T.toFixed(1));
})();
