// ============================================================
//  CLASSROOM POLLS — scenes: Menu → Poll → Winner reveal
// ============================================================
'use strict';

const BAR_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF9F43', '#54A0FF', '#8E6CEF', '#FF8FD8', '#00D2D3', '#2E86DE', '#EE5253', '#1DD1A1', '#F8A5C2'];
const MENU_THEME = { primary: '#6C3FD1', secondary: '#E3D7FF', background: '#F4EEFF', accent: '#FF7A00', buttonColor: '#7C4DFF' };
const VOTE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];

const itemImg = it => (it.image ? Images.get(`img/${it.image}.png`) : null);
function preloadPoll(poll) { poll.items.forEach(it => { if (it.image) Images.load(`img/${it.image}.png`); }); }

// Draw an item picture (or its emoji) fitted in a box
function drawItem(ctx, it, cx, cy, size) {
  const img = itemImg(it);
  if (img) {
    const k = Math.min(size / img.naturalWidth, size / img.naturalHeight);
    ctx.drawImage(img, cx - img.naturalWidth * k / 2, cy - img.naturalHeight * k / 2, img.naturalWidth * k, img.naturalHeight * k);
  } else if (it.icon) {
    ctx.save();
    ctx.font = `${Math.round(size * 0.8)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(it.icon, cx, cy + size * 0.05);
    ctx.restore();
  }
}

// Scrolling polka-dot background in the poll's colours
function drawPolka(ctx, theme, t) {
  const v = Engine.view();
  ctx.fillStyle = theme.background;
  ctx.fillRect(v.x, v.y, v.w, v.h);
  ctx.fillStyle = theme.secondary;
  const s = 56, off = (t * 14) % s;
  for (let y = v.y - s; y < v.y + v.h + s; y += s) {
    for (let x = v.x - s; x < v.x + v.w + s; x += s) {
      const row = Math.round((y - v.y) / s) % 2;
      ctx.beginPath();
      ctx.arc(x + off + (row ? s / 2 : 0), y + off, 9, 0, TAU);
      ctx.fill();
    }
  }
  const g = ctx.createRadialGradient(640, 360, 300, 640, 360, 900);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.12)');
  ctx.fillStyle = g;
  ctx.fillRect(v.x, v.y, v.w, v.h);
}

// Chunky white card with a soft 3D base
function drawCard(ctx, x, y, w, h, o = {}) {
  const r = o.r ?? 28;
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  rr(ctx, x, y + 10, w, h, r); ctx.fill();
  ctx.fillStyle = o.base || '#e6e0f0';
  rr(ctx, x, y + 5, w, h, r); ctx.fill();
  ctx.fillStyle = o.fill || '#fff';
  rr(ctx, x, y, w, h, r); ctx.fill();
  if (o.border) {
    ctx.strokeStyle = o.border;
    ctx.lineWidth = o.lw || 4;
    rr(ctx, x, y, w, h, r); ctx.stroke();
  }
  ctx.restore();
}

function drawCrown(ctx, x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  const g = ctx.createLinearGradient(0, -22, 0, 14);
  g.addColorStop(0, '#fff3a0'); g.addColorStop(0.5, '#ffcb05'); g.addColorStop(1, '#e09a00');
  ctx.fillStyle = g;
  ctx.strokeStyle = '#8a5a00';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-26, 14); ctx.lineTo(-30, -14); ctx.lineTo(-14, 0); ctx.lineTo(0, -22);
  ctx.lineTo(14, 0); ctx.lineTo(30, -14); ctx.lineTo(26, 14); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ['#ff4d6d', '#4ecdc4', '#54a0ff'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath(); ctx.arc(-14 + i * 14, 6, 3.5, 0, TAU); ctx.fill();
  });
  ctx.restore();
}

const Settings = {
  load() { try { if (JSON.parse(localStorage.getItem('classpolls') || '{}').muted) Sound.setMuted(true); } catch (e) {} },
  save() { try { localStorage.setItem('classpolls', JSON.stringify({ muted: Sound.muted })); } catch (e) {} }
};
function toggleFullscreen() {
  try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (e) {}
}
function toggleMute() { Sound.setMuted(!Sound.muted); Settings.save(); }
function cornerButtons(color) {
  return [
    new Button({ x: 1164, y: 44, w: 54, circle: true, color, icon: Icons.sound, onClick: toggleMute }),
    new Button({ x: 1228, y: 44, w: 54, circle: true, color, icon: Icons.fullscreen, onClick: toggleFullscreen })
  ];
}
function commonKeys(e) {
  if (e.key === 'm' || e.key === 'M') toggleMute();
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
}

// ============================================================ LOADING
const LoadingScene = {
  enter() {
    this.p = 0;
    Promise.race([
      Promise.all(['40px "Luckiest Guy"', '700 40px "Fredoka"', '600 40px "Fredoka"', '500 40px "Fredoka"']
        .map(f => (document.fonts ? document.fonts.load(f) : null))),
      new Promise(r => setTimeout(r, 3000))
    ]).catch(() => {}).then(() => {
      Object.values(POLLS).forEach(p => { const it = p.items[0]; if (it.image) Images.load(`img/${it.image}.png`); });
      Engine.go(MenuScene);
    });
  },
  draw(ctx) {
    drawPolka(ctx, MENU_THEME, Engine.realTime);
    const t = Engine.realTime;
    for (let i = 0; i < 4; i++) {
      const h = 40 + Math.abs(Math.sin(t * 4 + i)) * 60;
      ctx.fillStyle = BAR_COLORS[i];
      rr(ctx, 580 + i * 32, 380 - h, 24, h, 8); ctx.fill();
    }
    txt(ctx, 'LOADING', 640, 430, { size: 36, fill: MENU_THEME.primary, shadow: false });
  }
};

// ============================================================ MENU
const MenuScene = {
  enter() {
    this.t = 0;
    const keys = Object.keys(POLLS);
    this.tiles = keys.map((key, i) => {
      const poll = POLLS[key];
      const col = i % 4, row = Math.floor(i / 4);
      preloadPoll(poll);
      const tile = { key, poll, x: 640 + (col - 1.5) * 290, y: 300 + row * 140, w: 268, h: 118, appear: 0, spring: new Spring(1, 380, 16), hover: false };
      Tween.to(tile, { appear: 1 }, 0.45, { ease: Ease.outBack, delay: 0.15 + i * 0.04 });
      return tile;
    });
    this.head = { s: 0 };
    Tween.to(this.head, { s: 1 }, 0.6, { ease: Ease.outElastic });
    this.buttons = cornerButtons(MENU_THEME.buttonColor);
  },
  exit() { this.leaving = false; },
  tileAt(x, y) { return this.tiles.find(t => t.appear > 0.5 && Math.abs(x - t.x) < t.w / 2 && Math.abs(y - t.y) < t.h / 2); },
  isHot(x, y) { return !!this.tileAt(x, y) || this.buttons.some(b => b.hit(x, y)); },
  onDown(x, y) {
    for (const b of this.buttons) if (b.hit(x, y)) { b.press(); return; }
    const tile = this.tileAt(x, y);
    if (tile && !this.leaving) {
      this.leaving = true;
      tile.spring.v = 0.8;
      Sound.blip(7);
      Sound.whoosh(0.35);
      FX.sparkleBurst(tile.x, tile.y, 16, ['#ffffff', tile.poll.theme.secondary, tile.poll.theme.accent]);
      Engine.go(PollScene, { key: tile.key }, tile.x, tile.y);
    }
  },
  onKey(e) { commonKeys(e); },
  update(dt, realDt) {
    this.t += dt;
    const p = Engine.pointer;
    const hot = this.tileAt(p.x, p.y);
    for (const tl of this.tiles) {
      if (tl === hot && !tl.hover) Sound.hover();
      tl.hover = tl === hot;
      tl.spring.target = tl.hover ? 1.07 : 1;
      tl.spring.update(dt);
    }
    this.buttons.forEach(b => { b.hover = b.hit(p.x, p.y); b.update(realDt, this.t); });
  },
  draw(ctx) {
    const t = this.t;
    drawPolka(ctx, MENU_THEME, t);
    // title with a bouncing mini chart
    ctx.save();
    ctx.translate(640, 118);
    ctx.scale(this.head.s, this.head.s);
    for (let i = 0; i < 5; i++) {
      const h = 30 + Math.abs(Math.sin(t * 2.2 + i * 0.8)) * 44;
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      rr(ctx, -360 + i * 20 + 3, 40 - h + 4, 15, h, 6); ctx.fill();
      ctx.fillStyle = BAR_COLORS[i];
      rr(ctx, -360 + i * 20, 40 - h, 15, h, 6); ctx.fill();
    }
    txt(ctx, 'CLASSROOM POLLS', 30, 0, { size: 76, fill: { grad: ['#ffffff', '#ffe27a', '#ffb300'] }, stroke: MENU_THEME.primary, lw: 14, shadow: 'rgba(60,20,120,0.35)', shadowDist: 8 });
    ctx.restore();
    txt(ctx, 'Pick a poll to start!', 640, 196, { size: 26, font: FONT_ROUND, fill: MENU_THEME.primary, shadow: false });
    for (const tl of this.tiles) this.drawTile(ctx, tl, t);
    txt(ctx, 'Keys:  1–9 vote  ·  Z undo  ·  ENTER finish  ·  ESC back  ·  M mute  ·  F fullscreen', 640, 706, {
      size: 15, font: FONT_ROUND, weight: '600', fill: 'rgba(60,20,120,0.5)', shadow: false
    });
    this.buttons.forEach(b => b.draw(ctx));
    Particles.draw(ctx, 'ui');
  },
  drawTile(ctx, tl, t) {
    if (tl.appear <= 0.01) return;
    const th = tl.poll.theme;
    ctx.save();
    ctx.translate(tl.x, tl.y);
    ctx.rotate(tl.hover ? Math.sin(t * 9) * 0.025 : 0);
    const s = tl.spring.v * tl.appear;
    ctx.scale(s, s);
    const w = tl.w, h = tl.h;
    if (tl.hover) Glow.draw(ctx, th.buttonColor, 0, 0, 190, 0.35);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    rr(ctx, -w / 2, -h / 2 + 12, w, h, 26); ctx.fill();
    ctx.fillStyle = shade(th.buttonColor, -0.35);
    rr(ctx, -w / 2, -h / 2 + 7, w, h, 26); ctx.fill();
    const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
    g.addColorStop(0, shade(th.buttonColor, 0.3)); g.addColorStop(1, th.buttonColor);
    ctx.fillStyle = g;
    rr(ctx, -w / 2, -h / 2, w, h, 26); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    rr(ctx, -w / 2 + 10, -h / 2 + 7, w - 20, h * 0.3, 14); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-w / 2 + 58, 0, 42, 0, TAU); ctx.fill();
    ctx.strokeStyle = th.secondary; ctx.lineWidth = 5; ctx.stroke();
    const bob = tl.hover ? Math.sin(t * 9) * 3 : 0;
    drawItem(ctx, tl.poll.items[0], -w / 2 + 58, bob, 60);
    const title = tl.poll.title.replace(' (1st Grade)', ' 1').replace(' (2nd Grade)', ' 2').replace('Days of the Week', 'Days');
    txt(ctx, title, 44, 2, { size: 28, font: FONT_ROUND, fill: '#fff', stroke: shade(th.buttonColor, -0.5), lw: 6, maxW: 150 });
    ctx.restore();
  }
};

// ============================================================ POLL
const PollScene = {
  enter(data) {
    this.key = data.key;
    this.poll = POLLS[this.key];
    this.theme = this.poll.theme;
    this.items = this.poll.items;
    preloadPoll(this.poll);
    this.t = 0;
    this.leaving = false;
    const n = this.items.length;
    this.votes = Array(n).fill(0);
    this.bars = this.items.map(() => ({ h: new Spring(0, 170, 14), sx: new Spring(1, 400, 10), pop: new Spring(1, 500, 12) }));
    this.scaleMax = 4;
    this.history = [];
    this.flyers = [];
    this.leader = -1;
    this.prompt = { idx: 0, s: new Spring(1, 400, 14), idle: 0 };
    this.phase = 'vote';
    this.reveal = null;
    this.toast = null;

    // left panel buttons
    const cols = n > 8 ? 3 : 2;
    const rows = Math.ceil(n / cols);
    const px = 20, py = 90, pw = 420, ph = 612, pad = 16, gap = 12;
    this.panel = { x: px, y: py, w: pw, h: ph };
    const bw = (pw - pad * 2 - gap * (cols - 1)) / cols;
    const bh = Math.min(150, (ph - pad * 2 - gap * (rows - 1)) / rows);
    const top = py + (ph - (rows * bh + (rows - 1) * gap)) / 2;
    this.cells = this.items.map((it, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const cell = { i, it, x: px + pad + c * (bw + gap) + bw / 2, y: top + r * (bh + gap) + bh / 2, w: bw, h: bh, spring: new Spring(1, 450, 14), press: 0, hover: false, appear: 0 };
      Tween.to(cell, { appear: 1 }, 0.4, { ease: Ease.outBack, delay: 0.1 + i * 0.035 });
      return cell;
    });

    const th = this.theme;
    this.finishBtn = new Button({ x: 860, y: 664, w: 280, h: 76, label: 'FINISH!', size: 40, color: th.buttonColor, textColor: '#fff', onClick: () => this.finish() });
    this.undoBtn = new Button({ x: 1178, y: 664, w: 130, h: 60, label: 'UNDO', size: 24, color: '#9aa4b8', textColor: '#fff', onClick: () => this.undo() });
    this.backBtn = new Button({ x: 46, y: 44, w: 58, circle: true, color: th.buttonColor, icon: Icons.back, onClick: () => this.leave() });
    this.againBtn = new Button({ x: 1120, y: 560, w: 260, h: 80, label: 'PLAY AGAIN', size: 34, color: th.buttonColor, textColor: '#fff', visible: false, appear: 0, pulse: true, onClick: () => this.restart() });
    this.newBtn = new Button({ x: 1120, y: 656, w: 220, h: 66, label: 'NEW POLL', size: 30, color: '#9aa4b8', textColor: '#fff', visible: false, appear: 0, onClick: () => this.leave() });
    this.buttons = [this.backBtn, this.finishBtn, this.undoBtn, this.againBtn, this.newBtn, ...cornerButtons(th.buttonColor)];
  },

  leave() {
    if (this.leaving) return;
    this.leaving = true;
    Engine.go(MenuScene, null, 46, 44);
  },

  show(b) { b.visible = true; Tween.kill(b); Tween.to(b, { appear: 1 }, 0.4, { ease: Ease.outBack }); },
  hide(b) { Tween.kill(b); Tween.to(b, { appear: 0 }, 0.15, { onDone: () => { b.visible = false; } }); },

  // Word as it appears in the sentence: "I like apples." but "I want to go to Tokyo."
  word(it) {
    return ['prefectures', 'days', 'months'].includes(this.key) ? it.en : it.en.toLowerCase();
  },

  total() { return this.votes.reduce((a, b) => a + b, 0); },

  // chart geometry
  chart() {
    const x = 460, y = 256, w = 800, h = 360;
    const n = this.items.length;
    const x0 = x + 70, x1 = x + w - 26, base = y + h - 76, top = y + 58;
    const sw = (x1 - x0) / n;
    return { x, y, w, h, x0, x1, base, top, sw, bw: Math.min(64, sw * 0.62) };
  },
  barTop(i) {
    const c = this.chart();
    const bh = (this.bars[i].h.v / this.scaleMax) * (c.base - c.top);
    return { x: c.x0 + c.sw * (i + 0.5), y: c.base - bh };
  },

  showToast(text, color) {
    const tt = { text, color, s: 0, a: 1 };
    this.toast = tt;
    Tween.to(tt, { s: 1 }, 0.4, { ease: Ease.outBackBig });
    Tween.to(tt, { a: 0 }, 0.4, { delay: 1.3, onDone: () => { if (this.toast === tt) this.toast = null; } });
  },

  // ---- voting
  vote(i) {
    if (this.phase !== 'vote' || !this.items[i]) return;
    const cell = this.cells[i];
    cell.spring.v = 0.82;
    Sound.tone(520 + Math.min(this.votes[i], 12) * 40, 0.08, { type: 'triangle', vol: 0.1 });
    Sound.whoosh(0.3);
    this.setPrompt(i);
    const tgt = this.barTop(i);
    this.flyers.push({
      i, x0: cell.x, y0: cell.y - cell.h * 0.12, x1: tgt.x, y1: tgt.y - 30,
      cx: (cell.x + tgt.x) / 2, cy: Math.min(cell.y, tgt.y) - 200, t: 0, dur: 0.55, rot: rand(-1, 1)
    });
  },

  land(i) {
    this.votes[i]++;
    this.history.push(i);
    const bar = this.bars[i];
    bar.h.target = this.votes[i];
    bar.sx.v = 1.35;
    bar.pop.v = 1.9;
    const top = this.barTop(i);
    const n = this.votes[i];
    Sound.tone(660 * Math.pow(2, Math.min(n - 1, 14) / 12), 0.14, { type: 'triangle', vol: 0.14, slide: 880 * Math.pow(2, Math.min(n - 1, 14) / 12) });
    Sound.tone(1320 * Math.pow(2, Math.min(n - 1, 14) / 12), 0.1, { type: 'sine', vol: 0.05, delay: 0.03 });
    FX.sparkleBurst(top.x, top.y, 10, ['#ffffff', BAR_COLORS[i % BAR_COLORS.length], '#ffe066'], 'ui', 0.6);
    FX.ring(top.x, top.y, BAR_COLORS[i % BAR_COLORS.length], 10, 70, 0.35);
    FX.floatText('+1', top.x + 26, top.y - 36, BAR_COLORS[i % BAR_COLORS.length], 26);
    this.updateScale();
    this.checkLeader();
  },

  undo(i) {
    if (this.phase !== 'vote') return;
    let idx = i;
    if (idx === undefined) {
      if (!this.history.length) return;
      idx = this.history.pop();
    } else {
      if (!this.votes[idx]) return;
      const h = this.history.lastIndexOf(idx);
      if (h >= 0) this.history.splice(h, 1);
    }
    this.votes[idx]--;
    this.bars[idx].h.target = this.votes[idx];
    this.bars[idx].pop.v = 0.6;
    Sound.unblip();
    this.updateScale();
    this.checkLeader(true);
  },

  updateScale() {
    const m = Math.max(...this.votes);
    const target = Math.max(4, Math.ceil(m * 1.2));
    Tween.kill(this.scaleObj || (this.scaleObj = this));
    Tween.to(this, { scaleMax: target }, 0.5, { ease: Ease.outCubic });
  },

  checkLeader(quiet) {
    const m = Math.max(...this.votes);
    const leaders = this.votes.map((v, i) => (v === m && m > 0 ? i : -1)).filter(i => i >= 0);
    const newLeader = leaders.length === 1 ? leaders[0] : -1;
    if (newLeader !== this.leader) {
      if (newLeader >= 0 && !quiet && this.total() > 1) {
        this.showToast('NEW LEADER!', BAR_COLORS[newLeader % BAR_COLORS.length]);
        Sound.chime();
      }
      this.leader = newLeader;
      this.crownDrop = 0;
      Tween.to(this, { crownDrop: 1 }, 0.5, { ease: Ease.outBounce });
    }
  },

  setPrompt(i) {
    this.prompt.idx = i;
    this.prompt.s.v = 1.12;
    this.prompt.idle = 0;
  },

  // ---- winner reveal
  finish() {
    if (this.phase !== 'vote') return;
    if (this.total() === 0) {
      this.showToast('Vote first!', '#ff6b6b');
      this.finishBtn.spring.v = 0.8;
      Sound.unblip();
      return;
    }
    if (this.flyers.length) { Timers.after(0.6, () => this.finish()); return; }
    this.phase = 'drumroll';
    this.hide(this.finishBtn);
    this.hide(this.undoBtn);
    const m = Math.max(...this.votes);
    const order = this.votes.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
    const winners = order.filter(([v]) => v === m).map(([, i]) => i);
    const rest = order.filter(([v]) => v < m && v > 0).map(([, i]) => i);
    this.reveal = { a: 0, t: 0, hi: -1, winners, second: rest[0], third: rest[1], show: 0, podium: 0 };
    Tween.to(this.reveal, { a: 1 }, 0.4);
    this.title = new BigTitle(winners.length > 1 ? "IT'S A DRAW!" : 'THE WINNER IS...', { size: 70, y: 82, x: 600, colors: ['#ffffff', '#fff27a', '#ffb300'], outline: shade(this.theme.primary, -0.3) });
    // spotlight scans across the bars, slowing down, landing on a winner
    const delays = [];
    let d = 0.06;
    while (d < 0.36) { delays.push(d); d *= 1.12; }
    const n = this.items.length;
    const end = winners[0];
    const start = ((end - (delays.length - 1)) % n + n) % n;
    let acc = 0.4;
    Sound.drumroll(delays.reduce((a, b) => a + b, 0) + 0.4);
    delays.forEach((dl, k) => {
      acc += dl;
      Timers.after(acc, () => { this.reveal.hi = (start + k) % n; Sound.tick(k); });
    });
    Timers.after(acc + 0.5, () => this.showWinner());
  },

  showWinner() {
    const r = this.reveal;
    this.phase = 'winner';
    r.hi = -1;
    Tween.to(r, { show: 1 }, 0.7, { ease: Ease.outBack });
    Tween.to(r, { podium: 1 }, 0.6, { ease: Ease.outBack, delay: 0.3 });
    Engine.doFlash(0.5);
    Engine.addShake(0.4);
    Sound.fanfare();
    Sound.pop();
    const cols = [this.theme.accent, this.theme.buttonColor, '#ffffff', '#ffe066', this.theme.secondary];
    for (let i = 0; i < 4; i++) {
      Timers.after(i * 0.5, () => {
        FX.confettiCannon(-20, 740, 1, 70, cols);
        FX.confettiCannon(W + 20, 740, -1, 70, cols);
        FX.firework(rand(220, W - 220), rand(90, 230), pick(cols.slice(0, 4)));
        Sound.pop();
      });
    }
    Timers.after(1.1, () => { this.show(this.againBtn); this.show(this.newBtn); });
  },

  restart() {
    this.hide(this.againBtn);
    this.hide(this.newBtn);
    this.show(this.finishBtn);
    this.show(this.undoBtn);
    this.votes.fill(0);
    this.bars.forEach(b => { b.h.target = 0; });
    this.history = [];
    this.leader = -1;
    this.reveal = null;
    this.title = null;
    this.phase = 'vote';
    this.updateScale();
    Sound.whoosh(0.4);
  },

  // ---- input
  cellAt(x, y) { return this.cells.find(c => Math.abs(x - c.x) < c.w / 2 && Math.abs(y - c.y) < c.h / 2); },
  isHot(x, y) {
    if (this.buttons.some(b => b.hit(x, y))) return true;
    return this.phase === 'vote' && !!this.cellAt(x, y);
  },
  onDown(x, y, button, e) {
    for (let i = this.buttons.length - 1; i >= 0; i--) if (this.buttons[i].hit(x, y)) { this.buttons[i].press(); return; }
    if (this.phase !== 'vote') return;
    const c = this.cellAt(x, y);
    if (!c) return;
    if (button === 2 || (e && e.shiftKey)) this.undo(c.i);
    else this.vote(c.i);
  },
  onKey(e) {
    commonKeys(e);
    if (e.key === 'Escape') { this.leave(); return; }
    const vi = VOTE_KEYS.indexOf(e.key);
    if (vi >= 0 && this.phase === 'vote') { this.vote(vi); return; }
    if (e.key === 'z' || e.key === 'Z' || e.key === 'Backspace') this.undo();
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (this.phase === 'vote') this.finish();
      else if (this.phase === 'winner' && this.againBtn.visible) this.againBtn.press();
    }
  },

  // ---- update
  update(dt, realDt) {
    this.t += dt;
    const p = Engine.pointer;
    this.buttons.forEach(b => { b.hover = b.hit(p.x, p.y); b.update(realDt, this.t); });
    const hot = this.phase === 'vote' ? this.cellAt(p.x, p.y) : null;
    this.cells.forEach(c => {
      if (c === hot && !c.hover) Sound.hover();
      c.hover = c === hot;
      c.spring.target = c.hover ? 1.04 : 1;
      c.spring.update(dt);
    });
    this.bars.forEach(b => { b.h.update(dt); b.sx.update(dt); b.pop.update(dt); });
    this.prompt.s.update(dt);
    this.prompt.idle += dt;
    if (this.prompt.idle > 3.2) {
      this.prompt.idle = 0;
      this.prompt.idx = (this.prompt.idx + 1) % this.items.length;
      this.prompt.s.v = 0.9;
    }
    for (const f of this.flyers) {
      f.t += dt;
      if (f.t >= f.dur && !f.done) { f.done = true; this.land(f.i); }
    }
    this.flyers = this.flyers.filter(f => !f.done);
    if (this.title) this.title.update(dt);
    if (this.reveal) this.reveal.t += dt;
  },

  // ---- draw
  draw(ctx) {
    const t = this.t;
    const th = this.theme;
    drawPolka(ctx, th, t);

    // header
    setFont(ctx, 32, FONT_ROUND, '700');
    const title = `${this.poll.title} Poll`;
    const tw = ctx.measureText(title).width + 70;
    drawCard(ctx, 640 - tw / 2, 16, tw, 58, { r: 29, border: th.primary, base: shade(th.primary, 0.5) });
    txt(ctx, title, 640, 46, { size: 32, font: FONT_ROUND, fill: th.primary, shadow: false });

    // left panel with vote buttons
    const P = this.panel;
    drawCard(ctx, P.x, P.y, P.w, P.h, { fill: th.secondary, border: th.primary, base: shade(th.primary, -0.1), lw: 5 });
    this.cells.forEach(c => this.drawCell(ctx, c, t));

    this.drawPrompt(ctx, t);
    this.drawChart(ctx, t);

    // flying vote items
    for (const f of this.flyers) {
      const q = Ease.inOutQuad(Math.min(1, f.t / f.dur));
      const u = 1 - q;
      const x = u * u * f.x0 + 2 * u * q * f.cx + q * q * f.x1;
      const y = u * u * f.y0 + 2 * u * q * f.cy + q * q * f.y1;
      const s = 1 + Math.sin(q * Math.PI) * 0.6;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(f.rot * q * TAU * 0.5);
      ctx.scale(s, s);
      Glow.draw(ctx, '#ffffff', 0, 0, 50, 0.6);
      drawItem(ctx, this.items[f.i], 0, 0, 64);
      ctx.restore();
      if (Math.random() < 0.6) Particles.spawn({ x, y, vx: rand(-40, 40), vy: rand(-40, 40), max: 0.4, size: 8, size1: 1, shape: 'star', color: BAR_COLORS[f.i % BAR_COLORS.length], layer: 'ui' });
    }

    if (this.reveal) this.drawReveal(ctx, t);
    if (this.toast) {
      const tt = this.toast;
      ctx.save();
      ctx.globalAlpha = clamp(tt.a, 0, 1);
      ctx.translate(860, 360);
      ctx.scale(tt.s, tt.s);
      ctx.rotate(-0.05);
      txt(ctx, tt.text, 0, 0, { size: 64, fill: { grad: ['#ffffff', '#fff3a0', '#ffc300'] }, stroke: shade(tt.color, -0.35), lw: 13 });
      ctx.restore();
    }
    this.buttons.forEach(b => b.draw(ctx));
    Particles.draw(ctx, 'ui');
  },

  drawCell(ctx, c, t) {
    if (c.appear <= 0.01) return;
    const th = this.theme;
    ctx.save();
    ctx.translate(c.x, c.y);
    const s = c.spring.v * c.appear;
    ctx.scale(s, s);
    const w = c.w, h = c.h;
    const col = BAR_COLORS[c.i % BAR_COLORS.length];
    const lead = this.leader === c.i;
    if (c.hover || lead) Glow.draw(ctx, lead ? '#ffe066' : '#ffffff', 0, 0, w * 0.8, lead ? 0.45 : 0.35);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    rr(ctx, -w / 2, -h / 2 + 8, w, h, 20); ctx.fill();
    ctx.fillStyle = shade(col, -0.2);
    rr(ctx, -w / 2, -h / 2 + 5, w, h, 20); ctx.fill();
    ctx.fillStyle = '#fff';
    rr(ctx, -w / 2, -h / 2, w, h, 20); ctx.fill();
    ctx.fillStyle = col;
    rr(ctx, -w / 2, -h / 2, w, 7, 4); ctx.fill();
    const imgSize = Math.min(w * 0.6, h * 0.52);
    drawItem(ctx, c.it, 0, -h * 0.14 + (c.hover ? Math.sin(t * 9) * 3 : 0), imgSize);
    txt(ctx, c.it.en, 0, h * 0.24, { size: Math.min(24, h * 0.17), font: FONT_ROUND, fill: '#333', shadow: false, maxW: w - 14 });
    txt(ctx, c.it.katakana, 0, h * 0.39, { size: Math.min(15, h * 0.11), font: FONT_JP, weight: '700', fill: th.primary, shadow: false, maxW: w - 14 });
    // key hint + vote count badge
    txt(ctx, VOTE_KEYS[c.i] || '', -w / 2 + 16, -h / 2 + 20, { size: 14, font: FONT_ROUND, fill: 'rgba(0,0,0,0.25)', shadow: false });
    const v = this.votes[c.i];
    if (v > 0) {
      const bp = this.bars[c.i].pop.v;
      ctx.save();
      ctx.translate(w / 2 - 14, -h / 2 + 14);
      ctx.scale(Math.min(bp, 1.4), Math.min(bp, 1.4));
      ctx.fillStyle = col;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, 0, 17, 0, TAU); ctx.fill(); ctx.stroke();
      txt(ctx, String(v), 0, 1, { size: 19, fill: '#fff', stroke: shade(col, -0.5), lw: 4, shadow: false });
      ctx.restore();
    }
    ctx.restore();
  },

  drawPrompt(ctx, t) {
    const th = this.theme;
    const x = 460, y = 90, w = 800, h = 150;
    const s = this.prompt.s.v;
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2 + Math.sin(t * 1.6) * 3);
    ctx.scale(s, s);
    drawCard(ctx, -w / 2, -h / 2, w, h, { base: shade(th.primary, 0.55) });
    const it = this.items[this.prompt.idx];
    // picture bubble
    ctx.fillStyle = th.background;
    ctx.strokeStyle = th.secondary;
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(-w / 2 + 84, 0, 54, 0, TAU); ctx.fill(); ctx.stroke();
    drawItem(ctx, it, -w / 2 + 84, 0, 74);
    const tx = -w / 2 + 164;
    const q = this.poll.question;
    let ky = -18, ey = 32;
    if (q) {
      txt(ctx, `${q.en}   ${q.jp}`, tx, -46, { size: 22, font: FONT_JP, weight: '700', fill: th.primary, align: 'left', shadow: false, maxW: 600 });
      ky = -8; ey = 38;
    }
    // katakana reading line, then the English sentence
    setFont(ctx, 26, FONT_JP, '700');
    const pj = `${this.poll.prompt.jp} `;
    txt(ctx, pj, tx, ky, { size: 26, font: FONT_JP, fill: th.primary, align: 'left', shadow: false });
    txt(ctx, it.katakana, tx + ctx.measureText(pj).width, ky, { size: 26, font: FONT_JP, fill: th.accent, align: 'left', shadow: false });
    setFont(ctx, 52, FONT_ROUND, '700');
    const pe = `${this.poll.prompt.en} `;
    const pw = ctx.measureText(pe).width;
    txt(ctx, pe, tx, ey, { size: 52, font: FONT_ROUND, fill: '#2d2d3a', align: 'left', shadow: false });
    txt(ctx, `${this.word(it)}.`, tx + pw, ey, { size: 52, font: FONT_ROUND, fill: th.accent, align: 'left', shadow: false, maxW: 600 - pw });
    ctx.restore();
  },

  drawChart(ctx, t) {
    const c = this.chart();
    const th = this.theme;
    drawCard(ctx, c.x, c.y, c.w, c.h, { base: shade(th.primary, 0.55) });
    // total chip
    txt(ctx, `Votes: ${this.total()}`, c.x + c.w - 30, c.y + 30, { size: 22, font: FONT_ROUND, fill: th.primary, align: 'right', shadow: false });
    // gridlines
    const step = this.scaleMax > 12 ? 5 : this.scaleMax > 6 ? 2 : 1;
    ctx.save();
    ctx.setLineDash([6, 8]);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 2;
    for (let v = step; v <= this.scaleMax; v += step) {
      const y = c.base - (v / this.scaleMax) * (c.base - c.top);
      ctx.beginPath(); ctx.moveTo(c.x0 - 10, y); ctx.lineTo(c.x1, y); ctx.stroke();
      txt(ctx, String(v), c.x0 - 26, y, { size: 16, font: FONT_ROUND, fill: 'rgba(0,0,0,0.35)', shadow: false });
    }
    ctx.restore();
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    rr(ctx, c.x0 - 14, c.base, c.x1 - c.x0 + 20, 4, 2); ctx.fill();

    const hi = this.reveal ? this.reveal.hi : -1;
    this.items.forEach((it, i) => {
      const bar = this.bars[i];
      const col = BAR_COLORS[i % BAR_COLORS.length];
      const cx = c.x0 + c.sw * (i + 0.5);
      const hh = Math.max(0, (bar.h.v / this.scaleMax) * (c.base - c.top));
      const bw = c.bw * bar.sx.v;
      const wob = this.phase === 'vote' ? Math.sin(t * 3 + i) * 1.5 : 0;
      if (hi === i) Glow.draw(ctx, '#fff3a0', cx, c.base - hh / 2, Math.max(80, hh * 0.8), 0.9);
      if (hh > 1) {
        ctx.save();
        ctx.translate(cx, c.base);
        ctx.fillStyle = shade(col, -0.3);
        rr(ctx, -bw / 2, -hh - wob, bw, hh + wob, Math.min(14, bw / 2)); ctx.fill();
        const g = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
        g.addColorStop(0, shade(col, 0.25)); g.addColorStop(0.6, col); g.addColorStop(1, shade(col, -0.12));
        ctx.fillStyle = g;
        rr(ctx, -bw / 2, -hh - wob, bw, Math.max(4, hh + wob - 4), Math.min(14, bw / 2)); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        rr(ctx, -bw / 2 + 6, -hh - wob + 6, bw * 0.18, Math.max(0, hh - 16), 4); ctx.fill();
        ctx.restore();
      }
      const v = this.votes[i];
      if (v > 0) {
        const ps = bar.pop.v;
        ctx.save();
        ctx.translate(cx, c.base - hh - 24 - wob);
        ctx.scale(ps, ps);
        txt(ctx, String(v), 0, 0, { size: 34, fill: '#fff', stroke: shade(col, -0.45), lw: 7 });
        ctx.restore();
      }
      if (this.leader === i && v > 0) {
        const cd = this.crownDrop ?? 1;
        drawCrown(ctx, cx, c.base - hh - 62 - (1 - cd) * 60 + Math.sin(t * 4) * 3, 0.9);
      }
      // picture under the bar
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = hi === i ? '#ffc300' : col;
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(cx, c.base + 36, 27, 0, TAU); ctx.fill(); ctx.stroke();
      drawItem(ctx, it, cx, c.base + 36, 40);
      ctx.restore();
    });
  },

  drawReveal(ctx, t) {
    const r = this.reveal;
    const v = Engine.view();
    const th = this.theme;
    ctx.save();
    ctx.globalAlpha = clamp(r.a, 0, 1) * (this.phase === 'winner' ? 0.92 : 0.55);
    ctx.fillStyle = shade(th.primary, -0.55);
    ctx.fillRect(v.x, v.y, v.w, v.h);
    ctx.restore();
    // during the drumroll, the chart is redrawn above the dim so the spotlight reads
    if (this.phase === 'drumroll') {
      ctx.save();
      ctx.globalAlpha = 1;
      this.drawChart(ctx, t);
      ctx.restore();
    }
    if (this.title) this.title.draw(ctx);
    if (this.phase !== 'winner') return;

    const show = r.show;
    const ws = r.winners;
    drawSunburst(ctx, 600, 330, 560, 0.45 * clamp(show, 0, 1), Engine.realTime, '255,235,140');
    // podium
    const pd = r.podium;
    const blocks = [];
    const firstW = Math.max(230, ws.length * 190);
    blocks.push({ x: 600, w: firstW, top: 480, rank: 1, items: ws, color: ['#fff3a0', '#ffcb05', '#e09a00'] });
    if (r.second !== undefined && ws.length < 3) blocks.push({ x: 600 - firstW / 2 - 115, w: 210, top: 540, rank: 2, items: [r.second], color: ['#ffffff', '#cfd8e3', '#9aa4b8'] });
    if (r.third !== undefined && ws.length < 2) blocks.push({ x: 600 + firstW / 2 + 115, w: 210, top: 575, rank: 3, items: [r.third], color: ['#ffe0c2', '#e69a5c', '#b0622a'] });
    blocks.forEach(b => {
      const rise = (1 - clamp(pd, 0, 1)) * 260;
      const top = b.top + rise;
      ctx.save();
      const g = ctx.createLinearGradient(0, top, 0, 720);
      b.color.forEach((cc, k) => g.addColorStop(k / 2, cc));
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      rr(ctx, b.x - b.w / 2 + 8, top + 8, b.w, 760 - top, 16); ctx.fill();
      ctx.fillStyle = g;
      rr(ctx, b.x - b.w / 2, top, b.w, 760 - top, 16); ctx.fill();
      txt(ctx, b.rank === 1 ? '1st' : b.rank === 2 ? '2nd' : '3rd', b.x, top + 42, { size: 40, fill: '#fff', stroke: shade(b.color[2], -0.4), lw: 8 });
      const big = b.rank === 1;
      b.items.forEach((idx, k) => {
        const it = this.items[idx];
        const ix = b.x + (k - (b.items.length - 1) / 2) * 190;
        const bounce = big ? Math.abs(Math.sin(t * 3 + k)) * 12 : 0;
        const size = big ? 150 : 100;
        const iy = top - size / 2 - 40 - bounce;
        ctx.save();
        ctx.translate(ix, iy);
        const sc = big ? clamp(show, 0, 1.2) : clamp(pd, 0, 1.2);
        ctx.scale(sc, sc);
        if (big) Glow.draw(ctx, '#fff3a0', 0, 0, 130, 0.7);
        drawItem(ctx, it, 0, 0, size);
        if (big && ws.length === 1) drawCrown(ctx, 0, -size / 2 - 18, 1.2);
        ctx.restore();
        txt(ctx, it.en, ix, top - 22, { size: big ? 36 : 26, font: FONT_ROUND, fill: '#fff', stroke: '#2d1b4e', lw: 7, maxW: 175 });
        txt(ctx, `${this.votes[idx]} ${this.votes[idx] === 1 ? 'vote' : 'votes'}`, ix, top + 80, { size: 20, font: FONT_ROUND, fill: shade(b.color[2], -0.5), shadow: false });
      });
      ctx.restore();
    });
    // sentence for the winner
    if (ws.length === 1) {
      const it = this.items[ws[0]];
      ctx.save();
      ctx.globalAlpha = clamp(show, 0, 1);
      txt(ctx, `${this.poll.prompt.en} ${this.word(it)}!`, 600, 160, { size: 44, font: FONT_ROUND, fill: '#fff', stroke: '#2d1b4e', lw: 8 });
      txt(ctx, `${this.poll.prompt.jp} ${it.katakana}`, 600, 202, { size: 24, font: FONT_JP, weight: '700', fill: '#ffe680', stroke: '#2d1b4e', lw: 6 });
      ctx.restore();
    }
  }
};

// ------------------------------------------------------------ boot
window.addEventListener('DOMContentLoaded', () => {
  Settings.load();
  Engine.init(document.getElementById('game'));
  Engine.setScene(LoadingScene);
});
