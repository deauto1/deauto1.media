// Deterministic "ball breaks out of rings" sim, shared by the page and by node (for SFX timing).
(function (root) {
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  class Sim {
    constructor(seed, nRings) {
      const r = rng(seed);
      this.t = 0; this.events = []; this.parts = []; this.trail = []; this.shake = 0;
      this.ball = { x: (r() - 0.5) * 40, y: -20, vx: (r() - 0.5) * 520, vy: 120 + r() * 200, r: 22 };
      this.rings = [];
      const n = nRings || 8;
      for (let i = 0; i < n; i++) this.rings.push({
        R: 104 + i * 39, a: r() * Math.PI * 2, w: (i % 2 ? -1 : 1) * (1.5 + r() * 0.9), gap: 0.95 - i * 0.045, alive: true });
      this.box = { x: 520, top: -390, bot: 390 }; this.seedR = r; this.dead = 0;
    }
    respawn() { const r = this.seedR; this.rings = []; for (let i = 0; i < 8; i++) this.rings.push({ R: 104 + i * 39, a: r() * Math.PI * 2, w: (i % 2 ? -1 : 1) * (1.5 + r() * 0.9), gap: 0.95 - i * 0.045, alive: true }); const b = this.ball; b.x = 0; b.y = 0; this.trail = []; this.events.push({ t: this.t, k: "break" }); this.shake = 0.12; }
    step(dt) {
      const b = this.ball; this.t += dt;
      b.vy += 1050 * dt; b.x += b.vx * dt; b.y += b.vy * dt;
      for (const g of this.rings) g.a += g.w * dt;
      const ring = this.rings.find(g => g.alive);
      const d = Math.hypot(b.x, b.y);
      if (ring) {
        if (d + b.r >= ring.R) {
          let ang = Math.atan2(b.y, b.x) - ring.a; ang = Math.atan2(Math.sin(ang), Math.cos(ang));
          const half = ring.gap / 2 - Math.asin(Math.min(1, b.r / ring.R)) * 0.55;
          if (Math.abs(ang) < half) {
            if (d >= ring.R) { ring.alive = false; this.shake = 0.18; this.events.push({ t: this.t, k: "break" });
              for (let i = 0; i < 46; i++) { const A = (i / 46) * Math.PI * 2; if (Math.abs(Math.atan2(Math.sin(A - ring.a), Math.cos(A - ring.a))) < ring.gap / 2) continue;
                const sp = 160 + ((i * 37) % 11) * 28; this.parts.push({ x: Math.cos(A) * ring.R, y: Math.sin(A) * ring.R, vx: Math.cos(A) * sp, vy: Math.sin(A) * sp - 80, life: 0.7, rot: A }); } }
          } else {
            const nx = b.x / d, ny = b.y / d, dot = b.vx * nx + b.vy * ny;
            if (dot > 0) { b.vx -= 2 * dot * nx; b.vy -= 2 * dot * ny;
              // nudge tangentially so it never settles into a boring loop
              b.vx += -ny * 34; b.vy += nx * 34;
              const sp = Math.hypot(b.vx, b.vy), tgt = Math.min(1150, Math.max(620, sp * 1.03)); b.vx *= tgt / sp; b.vy *= tgt / sp;
              this.events.push({ t: this.t, k: "hit" }); }
            const ov = d + b.r - ring.R; b.x -= nx * ov; b.y -= ny * ov;
          }
        }
      } else {
        const B = this.box; let hit = false;
        if (b.x - b.r < -B.x) { b.x = -B.x + b.r; b.vx = Math.abs(b.vx); hit = true; }
        if (b.x + b.r > B.x) { b.x = B.x - b.r; b.vx = -Math.abs(b.vx); hit = true; }
        if (b.y - b.r < B.top) { b.y = B.top + b.r; b.vy = Math.abs(b.vy); hit = true; }
        if (b.y + b.r > B.bot) { b.y = B.bot - b.r; b.vy = -Math.abs(b.vy) * 0.98; if (Math.abs(b.vy) < 700) b.vy = -900; hit = true; }
        if (hit) this.events.push({ t: this.t, k: "hit" });
      }
      for (const p of this.parts) { p.vy += 900 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
      this.parts = this.parts.filter(p => p.life > 0);
      this.trail.push({ x: b.x, y: b.y }); if (this.trail.length > 26) this.trail.shift();
      if (this.shake > 0) this.shake -= dt;
      if (!ring) { this.dead += dt; if (this.dead > 0.9) { this.dead = 0; this.respawn(); } }
    }
    alive() { return this.rings.filter(g => g.alive).length; }
  }
  root.Sim = Sim;
})(typeof module !== "undefined" ? module.exports : window);
