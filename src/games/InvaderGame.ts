/**
 * InvaderGame — A Space Invaders-style wave defense
 * Canvas-based, classic grid movement with shields.
 */

import { playSound } from './audioUtils';

export interface GameHandle {
  stop: () => void;
}

interface Star { x: number; y: number; speed: number; brightness: number; }
interface Bullet { x: number; y: number; }
interface Invader { x: number; y: number; alive: boolean; row: number; col: number; }
interface Shield { x: number; y: number; hp: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; }

export function start(canvas: HTMLCanvasElement): GameHandle {
  const ctx = canvas.getContext('2d')!;
  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;
  let running = true;
  let animId = 0;

  let score = 0;
  let lives = 3;
  let gameOver = false;
  let level = 1;

  // Player
  const player = { x: W / 2, y: H - 40, speed: 4 };
  const bullets: Bullet[] = [];
  let shootCooldown = 0;

  // Invaders
  let invaders: Invader[] = [];
  let invaderDir = 1;
  let invaderSpeed = 0.4;
  let invaderDropAmount = 16;
  let invaderMoveTimer = 0;
  let invaderMoveInterval = 0.6;

  // Enemy bullets
  const enemyBullets: Bullet[] = [];
  let enemyShootTimer = 0;

  // Shields
  let shields: Shield[] = [];

  // Particles
  const particles: Particle[] = [];

  // Stars
  const stars: Star[] = [];
  for (let i = 0; i < 60; i++) {
    stars.push({
      x: Math.random() * W, y: Math.random() * H,
      speed: 0.1 + Math.random() * 0.4,
      brightness: 0.2 + Math.random() * 0.5,
    });
  }

  // Input
  const keys: Record<string, boolean> = {};
  const onKeyDown = (e: KeyboardEvent) => { keys[e.key] = true; if (e.key === ' ') e.preventDefault(); };
  const onKeyUp = (e: KeyboardEvent) => { keys[e.key] = false; };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  function initShields() {
    shields = [];
    const count = 4;
    const spacing = W / (count + 1);
    for (let i = 0; i < count; i++) {
      shields.push({ x: spacing * (i + 1), y: H - 90, hp: 5 });
    }
  }

  function spawnInvaders() {
    invaders = [];
    const cols = 8 + Math.min(level - 1, 3);
    const rows = 3 + Math.min(level - 1, 2);
    const gapX = 32;
    const gapY = 28;
    const startX = (W - (cols - 1) * gapX) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        invaders.push({
          x: startX + c * gapX,
          y: 60 + r * gapY,
          alive: true,
          row: r,
          col: c,
        });
      }
    }
    invaderDir = 1;
    invaderSpeed = 0.4 + level * 0.1;
    invaderMoveInterval = Math.max(0.15, 0.6 - level * 0.05);
  }

  function spawnParticles(x: number, y: number, color: string, count: number) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 0.3 + Math.random() * 0.4,
        color,
      });
    }
  }

  function drawInvader(inv: Invader) {
    const rowColors = ['#22d3ee', '#a855f7', '#ef4444', '#facc15', '#34d399'];
    const c = rowColors[inv.row % rowColors.length];
    ctx.fillStyle = c;
    // Body
    ctx.fillRect(inv.x - 8, inv.y - 6, 16, 12);
    // Antennae
    ctx.fillRect(inv.x - 10, inv.y - 4, 4, 4);
    ctx.fillRect(inv.x + 6, inv.y - 4, 4, 4);
    // Legs
    ctx.fillRect(inv.x - 6, inv.y + 6, 4, 4);
    ctx.fillRect(inv.x + 2, inv.y + 6, 4, 4);
    // Eyes
    ctx.fillStyle = '#050510';
    ctx.fillRect(inv.x - 4, inv.y - 2, 3, 3);
    ctx.fillRect(inv.x + 1, inv.y - 2, 3, 3);
  }

  function drawShield(s: Shield) {
    const alpha = s.hp / 5;
    ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
    // Blocky shield shape
    ctx.fillRect(s.x - 20, s.y, 40, 6);
    ctx.fillRect(s.x - 16, s.y - 6, 32, 6);
    ctx.fillRect(s.x - 12, s.y - 10, 24, 4);
  }

  function drawPlayer() {
    ctx.fillStyle = '#e4e4e7';
    ctx.fillRect(player.x - 2, player.y - 10, 4, 10);
    ctx.fillRect(player.x - 8, player.y - 4, 16, 8);
    ctx.fillRect(player.x - 12, player.y + 2, 24, 4);
    ctx.fillStyle = '#34d399';
    ctx.fillRect(player.x - 2, player.y - 8, 4, 4);
  }

  function update(dt: number) {
    if (gameOver) {
      if (keys[' '] || keys['Enter']) {
        score = 0; lives = 3; level = 1; gameOver = false;
        bullets.length = 0; enemyBullets.length = 0; particles.length = 0;
        player.x = W / 2;
        spawnInvaders();
        initShields();
      }
      return;
    }

    // Player movement
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    player.x = Math.max(14, Math.min(W - 14, player.x));

    // Shooting
    shootCooldown -= dt;
    if ((keys[' '] || keys['ArrowUp'] || keys['w']) && shootCooldown <= 0) {
      bullets.push({ x: player.x, y: player.y - 12 });
      playSound('shoot');
      shootCooldown = 0.35;
    }

    // Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= 6;
      if (bullets[i].y < -10) { bullets.splice(i, 1); continue; }

      // Hit shields
      for (const s of shields) {
        if (s.hp > 0 && Math.abs(bullets[i]?.x - s.x) < 22 && Math.abs(bullets[i]?.y - s.y) < 12) {
          s.hp--;
          playSound('blip');
          bullets.splice(i, 1);
          break;
        }
      }
    }

    // Invader movement (step-based)
    invaderMoveTimer -= dt;
    if (invaderMoveTimer <= 0) {
      invaderMoveTimer = invaderMoveInterval;
      let hitEdge = false;
      for (const inv of invaders) {
        if (!inv.alive) continue;
        inv.x += invaderDir * 12;
        if (inv.x < 20 || inv.x > W - 20) hitEdge = true;
      }
      if (hitEdge) {
        invaderDir *= -1;
        for (const inv of invaders) {
          if (!inv.alive) continue;
          inv.x += invaderDir * 12; // Undo the edge hit
          inv.y += invaderDropAmount;
        }
        // Speed up slightly
        invaderMoveInterval = Math.max(0.08, invaderMoveInterval - 0.02);
      }
    }

    // Enemy shooting
    enemyShootTimer -= dt;
    if (enemyShootTimer <= 0) {
      const alive = invaders.filter(inv => inv.alive);
      if (alive.length > 0) {
        const shooter = alive[Math.floor(Math.random() * alive.length)];
        enemyBullets.push({ x: shooter.x, y: shooter.y + 10 });
      }
      enemyShootTimer = Math.max(0.3, 1.2 - level * 0.08);
    }

    // Enemy bullets
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      enemyBullets[i].y += 3.5;
      if (enemyBullets[i].y > H + 10) { enemyBullets.splice(i, 1); continue; }

      // Hit shields
      const eb = enemyBullets[i];
      if (!eb) continue;
      for (const s of shields) {
        if (s.hp > 0 && Math.abs(eb.x - s.x) < 22 && Math.abs(eb.y - s.y) < 12) {
          s.hp--;
          playSound('blip');
          enemyBullets.splice(i, 1);
          break;
        }
      }
      if (!enemyBullets[i]) continue;

      // Hit player
      if (Math.abs(eb.x - player.x) < 14 && Math.abs(eb.y - player.y) < 10) {
        enemyBullets.splice(i, 1);
        lives--;
        playSound('explosion');
        spawnParticles(player.x, player.y, '#ef4444', 12);
        if (lives <= 0) gameOver = true;
      }
    }

    // Bullet–invader collision
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      const b = bullets[bi];
      if (!b) continue;
      for (const inv of invaders) {
        if (!inv.alive) continue;
        if (Math.abs(b.x - inv.x) < 12 && Math.abs(b.y - inv.y) < 10) {
          inv.alive = false;
          bullets.splice(bi, 1);
          score += 50 + inv.row * 30;
          playSound('explosion');
          const rowColors = ['#22d3ee', '#a855f7', '#ef4444', '#facc15', '#34d399'];
          spawnParticles(inv.x, inv.y, rowColors[inv.row % 5], 8);
          break;
        }
      }
    }

    // Invaders reaching player level = game over
    for (const inv of invaders) {
      if (inv.alive && inv.y > player.y - 20) {
        gameOver = true;
      }
    }

    // Next level
    if (invaders.length > 0 && invaders.every(inv => !inv.alive)) {
      level++;
      spawnInvaders();
      initShields();
    }

    // Speed up as fewer remain, but more gradually
    const aliveCount = invaders.filter(inv => inv.alive).length;
    const totalCount = invaders.length;
    if (totalCount > 0) {
      const ratio = aliveCount / totalCount;
      const baseInterval = Math.max(0.2, 0.6 - level * 0.05);
      const minInterval = 0.15; // Slower maximum speed (was 0.06)
      
      // Use square root of ratio to make the speed curve gentler
      invaderMoveInterval = minInterval + (baseInterval - minInterval) * Math.pow(ratio, 0.5);
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life -= dt;
      if (p.life <= 0) particles.splice(i, 1);
    }

    // Stars
    for (const s of stars) {
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
    }
  }

  function draw() {
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, W, H);

    // Stars
    for (const s of stars) {
      ctx.fillStyle = `rgba(200,200,255,${s.brightness})`;
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), 1, 1);
    }

    if (!gameOver) {
      drawPlayer();

      // Shields
      for (const s of shields) {
        if (s.hp > 0) drawShield(s);
      }

      // Invaders
      for (const inv of invaders) {
        if (inv.alive) drawInvader(inv);
      }

      // Bullets
      ctx.fillStyle = '#34d399';
      for (const b of bullets) {
        ctx.fillRect(b.x - 1, b.y, 2, 8);
      }

      // Enemy bullets
      ctx.fillStyle = '#ef4444';
      for (const b of enemyBullets) {
        ctx.fillRect(b.x - 1, b.y, 3, 6);
      }
    }

    // Particles
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life * 2);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
    }
    ctx.globalAlpha = 1;

    // HUD
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '14px "Space Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${score}`, 12, 24);
    ctx.textAlign = 'right';
    ctx.fillText(`LIVES: ${'♥'.repeat(lives)}`, W - 12, 24);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#22d3ee';
    ctx.fillText(`WAVE ${level}`, W / 2, 24);

    if (gameOver) {
      ctx.fillStyle = 'rgba(5,5,16,0.75)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 28px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 20);
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '14px "Space Mono", monospace';
      ctx.fillText(`Final Score: ${score}`, W / 2, H / 2 + 15);
      ctx.fillStyle = '#71717a';
      ctx.font = '12px "Space Mono", monospace';
      ctx.fillText('Press SPACE to restart', W / 2, H / 2 + 45);
    }
  }

  let lastTime = performance.now();
  function loop(now: number) {
    if (!running) return;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    update(dt);
    draw();
    animId = requestAnimationFrame(loop);
  }

  spawnInvaders();
  initShields();
  animId = requestAnimationFrame(loop);

  const onResize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    player.y = H - 40;
  };
  window.addEventListener('resize', onResize);

  return {
    stop() {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
    }
  };
}
