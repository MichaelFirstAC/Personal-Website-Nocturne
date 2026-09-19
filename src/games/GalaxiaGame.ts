/**
 * GalaxiaGame — A Galaga/Galaxian-style vertical shooter
 * Canvas-based, lean retro tribute.
 */

import { playSound } from './audioUtils';

export interface GameHandle {
  stop: () => void;
}

interface Star { x: number; y: number; speed: number; brightness: number; }
interface Bullet { x: number; y: number; }
interface Enemy { x: number; y: number; alive: boolean; type: number; frame: number; }
interface EnemyBullet { x: number; y: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; }

export function start(canvas: HTMLCanvasElement): GameHandle {
  const ctx = canvas.getContext('2d')!;
  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;
  let running = true;
  let animId = 0;

  // Game state
  let score = 0;
  let lives = 3;
  let gameOver = false;
  let level = 1;
  let spawnTimer = 0;

  // Player
  const player = { x: W / 2, y: H - 50, w: 24, h: 20, speed: 5 };
  const bullets: Bullet[] = [];
  let shootCooldown = 0;

  // Enemies
  const enemies: Enemy[] = [];
  const enemyBullets: EnemyBullet[] = [];
  let enemyShootTimer = 0;

  // Particles
  const particles: Particle[] = [];

  // Stars
  const stars: Star[] = [];
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: 0.3 + Math.random() * 1.5,
      brightness: 0.3 + Math.random() * 0.7,
    });
  }

  // Input
  const keys: Record<string, boolean> = {};
  const onKeyDown = (e: KeyboardEvent) => { keys[e.key] = true; if (e.key === ' ') e.preventDefault(); };
  const onKeyUp = (e: KeyboardEvent) => { keys[e.key] = false; };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  function spawnWave() {
    const cols = 6 + Math.min(level, 4);
    const rows = 2 + Math.min(level, 3);
    const gapX = 36;
    const gapY = 32;
    const startX = (W - (cols - 1) * gapX) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        enemies.push({
          x: startX + c * gapX,
          y: -40 - r * gapY,
          alive: true,
          type: r % 3,
          frame: 0,
        });
      }
    }
  }

  function spawnParticles(x: number, y: number, color: string, count: number) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 0.5 + Math.random() * 0.5,
        color,
      });
    }
  }

  function drawPixelShip(x: number, y: number) {
    // Simple pixel ship shape
    ctx.fillStyle = '#e4e4e7';
    ctx.fillRect(x - 2, y - 10, 4, 20);
    ctx.fillRect(x - 8, y - 4, 16, 12);
    ctx.fillRect(x - 12, y, 24, 6);
    ctx.fillStyle = '#93c5fd';
    ctx.fillRect(x - 2, y - 6, 4, 4);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(x - 12, y + 4, 4, 4);
    ctx.fillRect(x + 8, y + 4, 4, 4);
  }

  function drawEnemy(e: Enemy) {
    const colors = ['#a855f7', '#ef4444', '#22d3ee'];
    const c = colors[e.type % colors.length];
    ctx.fillStyle = c;
    // Simple invader shape
    ctx.fillRect(e.x - 8, e.y - 4, 16, 8);
    ctx.fillRect(e.x - 12, e.y - 2, 4, 4);
    ctx.fillRect(e.x + 8, e.y - 2, 4, 4);
    ctx.fillRect(e.x - 6, e.y + 4, 4, 4);
    ctx.fillRect(e.x + 2, e.y + 4, 4, 4);
    // Eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(e.x - 4, e.y - 2, 2, 2);
    ctx.fillRect(e.x + 2, e.y - 2, 2, 2);
  }

  function update(dt: number) {
    if (gameOver) {
      if (keys[' '] || keys['Enter']) {
        // Restart
        score = 0; lives = 3; level = 1; gameOver = false;
        enemies.length = 0; bullets.length = 0; enemyBullets.length = 0; particles.length = 0;
        player.x = W / 2;
        spawnTimer = 0;
      }
      return;
    }

    // Move player
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    player.x = Math.max(14, Math.min(W - 14, player.x));

    // Shoot
    shootCooldown -= dt;
    if ((keys[' '] || keys['ArrowUp'] || keys['w']) && shootCooldown <= 0) {
      bullets.push({ x: player.x, y: player.y - 12 });
      playSound('shoot');
      shootCooldown = 0.18;
    }

    // Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y -= 8;
      if (bullets[i].y < -10) bullets.splice(i, 1);
    }

    // Enemies descend & spawn
    spawnTimer -= dt;
    if (enemies.filter(e => e.alive).length === 0 && spawnTimer <= 0) {
      spawnWave();
      level++;
      spawnTimer = 1;
    }

    for (const e of enemies) {
      if (!e.alive) continue;
      e.y += 0.3 + level * 0.08;
      e.frame += dt;
      // Enemy reached bottom
      if (e.y > H + 20) e.alive = false;
    }

    // Enemy shooting
    enemyShootTimer -= dt;
    if (enemyShootTimer <= 0) {
      const alive = enemies.filter(e => e.alive);
      if (alive.length > 0) {
        const shooter = alive[Math.floor(Math.random() * alive.length)];
        enemyBullets.push({ x: shooter.x, y: shooter.y + 8 });
      }
      enemyShootTimer = Math.max(0.4, 1.5 - level * 0.1);
    }

    // Enemy bullets
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      enemyBullets[i].y += 4;
      if (enemyBullets[i].y > H + 10) {
        enemyBullets.splice(i, 1);
        continue;
      }
      // Hit player
      const b = enemyBullets[i];
      if (b && Math.abs(b.x - player.x) < 14 && Math.abs(b.y - player.y) < 12) {
        enemyBullets.splice(i, 1);
        lives--;
        playSound('explosion');
        spawnParticles(player.x, player.y, '#ef4444', 15);
        if (lives <= 0) gameOver = true;
      }
    }

    // Bullet–enemy collision
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      for (const e of enemies) {
        if (!e.alive) continue;
        if (Math.abs(bullets[bi]?.x - e.x) < 12 && Math.abs(bullets[bi]?.y - e.y) < 10) {
          e.alive = false;
          bullets.splice(bi, 1);
          score += 100 + e.type * 50;
          playSound('explosion');
          const colors = ['#a855f7', '#ef4444', '#22d3ee'];
          spawnParticles(e.x, e.y, colors[e.type % 3], 10);
          break;
        }
      }
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
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
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), 2, 2);
    }

    if (!gameOver) {
      // Player
      drawPixelShip(player.x, player.y);

      // Bullets
      ctx.fillStyle = '#facc15';
      for (const b of bullets) {
        ctx.fillRect(b.x - 1, b.y, 2, 8);
      }

      // Enemy bullets
      ctx.fillStyle = '#ef4444';
      for (const b of enemyBullets) {
        ctx.fillRect(b.x - 1, b.y, 2, 6);
      }

      // Enemies
      for (const e of enemies) {
        if (e.alive) drawEnemy(e);
      }
    }

    // Particles
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life);
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
    ctx.fillStyle = '#a855f7';
    ctx.fillText(`LEVEL ${level}`, W / 2, 24);

    if (gameOver) {
      ctx.fillStyle = 'rgba(5,5,16,0.7)';
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

  // Initial wave
  spawnWave();
  animId = requestAnimationFrame(loop);

  const onResize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    player.y = H - 50;
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
