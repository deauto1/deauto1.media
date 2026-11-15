// Extra "satisfying" sims. Canvas is 1080x816, origin top-left. Each: step(dt), draw(c,t,pal), events[].
(function (root) {
  const Base = (typeof module !== "undefined" ? require("./sim.js") : window).Sim;
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  const W = 1080, H = 816, CX = 540, CY = 408;
  Base.prototype.draw = function (c, t, P) {
    c.save(); const sh = this.shake > 0 ? this.shake * 90 : 0; c.translate(CX + Math.sin(t * 90) * sh, 400 + Math.cos(t * 70) * sh);
    const first = this.rings.find(x => x.alive);
    for (const g of this.rings) { if (!g.alive) continue; c.beginPath(); c.arc(0, 0, g.R, g.a + g.gap / 2, g.a - g.gap / 2 + Math.PI * 2); c.lineWidth = g === first ? 13 : 9; c.strokeStyle = g === first ? P.fg : P.dim; c.lineCap = "round"; c.stroke(); }
    for (const p of this.parts) { c.save(); c.translate(p.x, p.y); c.rotate(p.rot + p.life * 9); c.globalAlpha = Math.min(1, p.life * 2); c.fillStyle = P.fg; c.fillRect(-9, -5, 18, 10); c.restore(); }
    this.trail.forEach((p, i) => { c.globalAlpha = (i / this.trail.length) * 0.5; c.beginPath(); c.arc(p.x, p.y, this.ball.r * (0.35 + 0.65 * i / this.trail.length), 0, 7); c.fillStyle = P.acc; c.fill(); });
    c.globalAlpha = 1; c.beginPath(); c.arc(this.ball.x, this.ball.y, this.ball.r, 0, 7); c.fillStyle = P.acc; c.fill(); c.restore();
  };
  class Multiply { // every wall bounce spawns another ball until the circle is full
    constructor(seed) { this.r = rng(seed); this.t = 0; this.events = []; this.R = 372; this.balls = [this.mk(0, -100)]; }
    mk(x, y) { const a = this.r() * 6.283, s = 420 + this.r() * 260; return { x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 15, c: this.balls ? this.balls.length % 3 : 0 }; }
    step(dt) { this.t += dt; const add = [];
      for (const b of this.balls) { b.vy += 900 * dt; b.x += b.vx * dt; b.y += b.vy * dt; const d = Math.hypot(b.x, b.y);
        if (d + b.r > this.R) { const nx = b.x / d, ny = b.y / d, dot = b.vx * nx + b.vy * ny; if (dot > 0) { b.vx -= 2 * dot * nx; b.vy -= 2 * dot * ny; const sp = Math.hypot(b.vx, b.vy), tg = Math.max(560, Math.min(900, sp)); b.vx *= tg / sp; b.vy *= tg / sp;
            this.events.push({ t: this.t, k: "hit" }); if (this.balls.length + add.length < 260) add.push(this.mk(b.x * 0.5, b.y * 0.5)); }
          const ov = d + b.r - this.R; b.x -= nx * ov; b.y -= ny * ov; } }
      this.balls.push(...add); if (this.balls.length >= 260 && !this.full) { this.full = this.t; this.events.push({ t: this.t, k: "break" }); }
      if (this.full && this.t - this.full > 1.6) { this.balls = [this.mk(0, -100)]; this.full = 0; } }
    draw(c, t, P) { c.save(); c.translate(CX, CY); c.beginPath(); c.arc(0, 0, this.R, 0, 7); c.lineWidth = 12; c.strokeStyle = P.fg; c.stroke();
      const cols = [P.acc, P.fg, P.dim]; for (const b of this.balls) { c.beginPath(); c.arc(b.x, b.y, b.r, 0, 7); c.fillStyle = cols[b.c]; c.fill(); }
      c.font = "150px Bebas"; c.textAlign = "center"; c.fillStyle = P.bg; c.globalAlpha = .85; c.fillText(this.balls.length, 0, 52); c.globalAlpha = 1; c.lineWidth = 8; c.strokeStyle = P.fg; c.strokeText(this.balls.length, 0, 52); c.restore(); }
  }
  class Grow { // one ball grows on every bounce until it fills the ring
    constructor(seed) { this.r = rng(seed); this.t = 0; this.events = []; this.R = 372; this.trail = []; this.reset(); }
    reset() { const a = this.r() * 6.283; this.b = { x: 0, y: -60, vx: Math.cos(a) * 640, vy: Math.sin(a) * 640, r: 18 }; }
    step(dt) { this.t += dt; const b = this.b; b.vy += 800 * dt; b.x += b.vx * dt; b.y += b.vy * dt; const d = Math.hypot(b.x, b.y);
      if (d + b.r > this.R) { const nx = b.x / d, ny = b.y / d, dot = b.vx * nx + b.vy * ny; if (dot > 0) { b.vx -= 2 * dot * nx; b.vy -= 2 * dot * ny; b.vx += -ny * 50; b.vy += nx * 50; const sp = Math.hypot(b.vx, b.vy); b.vx *= 760 / sp; b.vy *= 760 / sp; b.r += 9; this.events.push({ t: this.t, k: "hit" }); }
        const ov = d + b.r - this.R; b.x -= nx * ov; b.y -= ny * ov; if (b.r > this.R - 14) { this.events.push({ t: this.t, k: "break" }); this.boom = 0.35; this.reset(); } }
      this.trail.push({ x: b.x, y: b.y, r: b.r }); if (this.trail.length > 14) this.trail.shift(); if (this.boom > 0) this.boom -= dt; }
    draw(c, t, P) { c.save(); c.translate(CX, CY); if (this.boom > 0) { c.globalAlpha = this.boom * 2; c.beginPath(); c.arc(0, 0, this.R, 0, 7); c.fillStyle = P.acc; c.fill(); c.globalAlpha = 1; }
      c.beginPath(); c.arc(0, 0, this.R, 0, 7); c.lineWidth = 12; c.strokeStyle = P.fg; c.stroke();
      this.trail.forEach((p, i) => { c.globalAlpha = 0.05 + 0.03 * i; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fillStyle = P.acc; c.fill(); }); c.globalAlpha = 1;
      c.beginPath(); c.arc(this.b.x, this.b.y, this.b.r, 0, 7); c.fillStyle = P.acc; c.fill(); c.lineWidth = 6; c.strokeStyle = P.fg; c.stroke(); c.restore(); }
  }
  class Plinko { // balls rain through pegs and build a histogram
    constructor(seed) { this.r = rng(seed); this.t = 0; this.events = []; this.balls = []; this.pegs = []; this.bins = Array(11).fill(0); this.next = 0;
      for (let row = 0; row < 8; row++) for (let i = 0; i <= row + 2; i++) this.pegs.push({ x: CX + (i - (row + 2) / 2) * 92, y: 70 + row * 62 }); }
    step(dt) { this.t += dt; if (this.t >= this.next) { this.next = this.t + 0.11; this.balls.push({ x: CX + (this.r() - 0.5) * 30, y: 10, vx: (this.r() - 0.5) * 60, vy: 0, c: this.balls.length % 3 }); }
      for (const b of this.balls) { b.vy += 1500 * dt; b.x += b.vx * dt; b.y += b.vy * dt;
        for (const p of this.pegs) { const dx = b.x - p.x, dy = b.y - p.y, d = Math.hypot(dx, dy); if (d < 22) { const nx = dx / d, ny = dy / d, dot = b.vx * nx + b.vy * ny; if (dot < 0) { b.vx -= 1.55 * dot * nx; b.vy -= 1.55 * dot * ny; b.vx += (this.r() - 0.5) * 90; this.events.push({ t: this.t, k: "hit" }); } b.x = p.x + nx * 22; b.y = p.y + ny * 22; } }
        if (b.y > 580) { const k = Math.max(0, Math.min(10, Math.floor((b.x - (CX - 506)) / 92))); this.bins[k]++; b.dead = true; } }
      this.balls = this.balls.filter(b => !b.dead); if (Math.max(...this.bins) > 26) { this.bins.fill(0); this.events.push({ t: this.t, k: "break" }); } }
    draw(c, t, P) { for (const p of this.pegs) { c.beginPath(); c.arc(p.x, p.y, 9, 0, 7); c.fillStyle = P.dim; c.fill(); }
      const cols = [P.acc, P.fg, P.acc]; for (const b of this.balls) { c.beginPath(); c.arc(b.x, b.y, 13, 0, 7); c.fillStyle = cols[b.c]; c.fill(); }
      this.bins.forEach((n, k) => { const x = CX - 506 + k * 92; c.fillStyle = k === 5 ? P.acc : P.fg; c.fillRect(x + 8, H - 20 - n * 8, 76, n * 8 + 6); }); }
  }
  class Bricks { // self-playing brick breaker
    constructor(seed) { this.r = rng(seed); this.t = 0; this.events = []; this.balls = [0, 1, 2].map(i => ({ x: 300 + i * 240, y: 560, vx: (i - 1) * 380 + 120, vy: -820 })); this.fill(); this.px = CX; }
    fill() { this.br = []; for (let r = 0; r < 6; r++) for (let k = 0; k < 9; k++) this.br.push({ x: 36 + k * 113, y: 40 + r * 58, w: 104, h: 48, c: (r + k) % 3, on: true }); }
    step(dt) { this.t += dt; const low = this.balls.reduce((a, b) => b.y > a.y && b.vy > 0 ? b : a, this.balls[0]); this.px += (low.x - this.px) * Math.min(1, dt * 14);
      for (const b of this.balls) { b.x += b.vx * dt; b.y += b.vy * dt; let hit = false;
        if (b.x < 16) { b.x = 16; b.vx = Math.abs(b.vx); hit = true; } if (b.x > W - 16) { b.x = W - 16; b.vx = -Math.abs(b.vx); hit = true; } if (b.y < 16) { b.y = 16; b.vy = Math.abs(b.vy); hit = true; }
        if (b.y > 720 && b.vy > 0) { b.y = 720; b.vy = -Math.abs(b.vy); b.vx += (this.r() - 0.5) * 260; b.vx = Math.max(-700, Math.min(700, b.vx)); hit = true; }
        for (const k of this.br) if (k.on && b.x > k.x - 14 && b.x < k.x + k.w + 14 && b.y > k.y - 14 && b.y < k.y + k.h + 14) { k.on = false; const ox = Math.min(b.x - (k.x - 14), k.x + k.w + 14 - b.x), oy = Math.min(b.y - (k.y - 14), k.y + k.h + 14 - b.y); if (ox < oy) b.vx = -b.vx; else b.vy = -b.vy; hit = true; break; }
        if (hit) this.events.push({ t: this.t, k: "hit" }); }
      if (!this.br.some(k => k.on)) { this.fill(); this.events.push({ t: this.t, k: "break" }); } }
    draw(c, t, P) { const cols = [P.acc, P.fg, P.dim]; for (const k of this.br) if (k.on) { c.fillStyle = cols[k.c]; c.beginPath(); c.roundRect(k.x, k.y, k.w, k.h, 10); c.fill(); }
      c.fillStyle = P.fg; c.beginPath(); c.roundRect(this.px - 110, 738, 220, 26, 13); c.fill(); for (const b of this.balls) { c.beginPath(); c.arc(b.x, b.y, 15, 0, 7); c.fillStyle = P.acc; c.fill(); c.lineWidth = 4; c.strokeStyle = P.fg; c.stroke(); } }
  }
  class Dvd { // bouncing DE.AUTO logo; will it hit the corner?
    constructor(seed) { this.r = rng(seed); this.t = 0; this.events = []; this.w = 330; this.h = 150; this.x = 80 + this.r() * 500; this.y = 60 + this.r() * 400; this.vx = 520; this.vy = 430; this.n = 0; this.flip = 0; this.trail = []; }
    step(dt) { this.t += dt; this.x += this.vx * dt; this.y += this.vy * dt; let hx = false, hy = false;
      if (this.x < 0) { this.x = 0; this.vx = Math.abs(this.vx); hx = true; } if (this.x + this.w > W) { this.x = W - this.w; this.vx = -Math.abs(this.vx); hx = true; }
      if (this.y < 0) { this.y = 0; this.vy = Math.abs(this.vy); hy = true; } if (this.y + this.h > H - 40) { this.y = H - 40 - this.h; this.vy = -Math.abs(this.vy); hy = true; }
      if (hx || hy) { this.n++; this.flip ^= 1; const corner = (this.x < 26 || this.x + this.w > W - 26) && (this.y < 26 || this.y + this.h > H - 66); this.events.push({ t: this.t, k: corner ? "break" : "hit" }); if (corner) this.boom = 0.5; }
      if (this.boom > 0) this.boom -= dt; this.trail.push({ x: this.x, y: this.y }); if (this.trail.length > 10) this.trail.shift(); }
    draw(c, t, P) { if (this.boom > 0) { c.globalAlpha = this.boom; c.fillStyle = P.acc; c.fillRect(0, 0, W, H); c.globalAlpha = 1; }
      this.trail.forEach((p, i) => { c.globalAlpha = 0.04 * i; c.fillStyle = P.acc; c.beginPath(); c.roundRect(p.x, p.y, this.w, this.h, 26); c.fill(); }); c.globalAlpha = 1;
      c.fillStyle = this.flip ? P.acc : P.fg; c.beginPath(); c.roundRect(this.x, this.y, this.w, this.h, 26); c.fill(); c.fillStyle = this.flip ? P.fg : P.bg; c.font = "104px Bebas"; c.textAlign = "center"; c.fillText("DE.AUTO", this.x + this.w / 2, this.y + 112);
      c.font = "70px Bebas"; c.fillStyle = P.dim; c.textAlign = "left"; c.fillText("HITS " + this.n, 30, H - 60); }
  }
  root.SIMS = { rings: Base, multiply: Multiply, grow: Grow, plinko: Plinko, bricks: Bricks, dvd: Dvd };
})(typeof module !== "undefined" ? module.exports : window);
