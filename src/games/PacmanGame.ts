/**
 * PacmanGame — A Pac-Man-style maze chase
 * Canvas-based with smooth pixel-interpolated movement, ghost AI, and power pellets.
 */

import { playSound } from './audioUtils';

export interface GameHandle {
  stop: () => void;
}

// Maze layout: '#' = wall, '.' = dot, 'O' = power pellet, ' ' = empty, 'P' = player start, 'G' = ghost start
const MAZE_TEMPLATE = [
  '#####################',
  '#.........#.........#',
  '#.###.###.#.###.###.#',
  '#O#...#.......#...#O#',
  '#.#.#.#.#####.#.#.#.#',
  '#...#.....#.....#...#',
  '###.##### # #####.###',
  '     .....G.....     ',
  '###.# ## G ## #.#.###',
  '#.....# GGG #.....#.#',
  '#.###.# ### #.###...#',
  '#.#...#     #...#.#.#',
  '#.#.#.#######.#.#.#.#',
  '#...#....P....#.....#',
  '#.#####.###.#####.#.#',
  '#O......#.#......O#.#',
  '#.#####.#.#.#####...#',
  '#...................#',
  '#####################',
];

const CELL = 24;
const COLS = MAZE_TEMPLATE[0].length;
const ROWS = MAZE_TEMPLATE.length;

// Directions: 0=up, 1=right, 2=down, 3=left
const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

interface Mover {
  // Grid position (the tile we're currently on or moving FROM)
  tileX: number;
  tileY: number;
  // Pixel position for smooth rendering
  pixelX: number;
  pixelY: number;
  // Current movement direction
  dir: number;
  // Speed in pixels per second
  speed: number;
  // Are we currently moving between tiles?
  moving: boolean;
  // Target tile (when moving)
  targetTileX: number;
  targetTileY: number;
}

interface Ghost extends Mover {
  scared: boolean;
  eaten: boolean;
  color: string;
}

interface Particle {
  x: number; y: number; vx: number; vy: number; life: number; color: string;
}

function wrapCol(c: number): number {
  return ((c % COLS) + COLS) % COLS;
}

function tileToPixel(tileX: number, tileY: number): { px: number; py: number } {
  return { px: tileX * CELL + CELL / 2, py: tileY * CELL + CELL / 2 };
}

export function start(canvas: HTMLCanvasElement): GameHandle {
  const ctx = canvas.getContext('2d')!;
  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;
  let running = true;
  let animId = 0;

  // Parse maze
  let maze: string[][] = [];
  let playerStart = { r: 13, c: 10 };
  const ghostStarts: { r: number; c: number }[] = [];

  function initMaze() {
    maze = [];
    ghostStarts.length = 0;
    for (let r = 0; r < ROWS; r++) {
      maze[r] = [];
      for (let c = 0; c < COLS; c++) {
        const ch = MAZE_TEMPLATE[r]?.[c] || ' ';
        if (ch === 'P') {
          playerStart = { r, c };
          maze[r][c] = '.';
        } else if (ch === 'G') {
          ghostStarts.push({ r, c });
          maze[r][c] = ' ';
        } else {
          maze[r][c] = ch;
        }
      }
    }
  }

  initMaze();

  const mazeW = COLS * CELL;
  const mazeH = ROWS * CELL;

  let score = 0;
  let lives = 3;
  let gameOver = false;
  let level = 1;
  let dotsRemaining = 0;

  // Player as a Mover
  let player: Mover;
  let pNextDir = 1;  // Buffered input direction
  let mouthOpen = true;
  let mouthTimer = 0;

  // Power pellet
  let powerTimer = 0;

  // Ghosts
  let ghosts: Ghost[] = [];
  const ghostColors = ['#ef4444', '#ec4899', '#22d3ee', '#f97316'];

  // Particles
  const particles: Particle[] = [];

  function isWall(r: number, c: number): boolean {
    if (r < 0 || r >= ROWS) return true;
    const wc = wrapCol(c);
    return maze[r]?.[wc] === '#';
  }

  function canMove(fromR: number, fromC: number, dir: number): boolean {
    const nr = fromR + DY[dir];
    const nc = wrapCol(fromC + DX[dir]);
    return !isWall(nr, nc);
  }

  function countDots(): number {
    let count = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (maze[r][c] === '.' || maze[r][c] === 'O') count++;
    return count;
  }

  function createMover(tileX: number, tileY: number, speed: number, dir: number = 1): Mover {
    const { px, py } = tileToPixel(tileX, tileY);
    return {
      tileX, tileY, pixelX: px, pixelY: py,
      dir, speed, moving: false,
      targetTileX: tileX, targetTileY: tileY,
    };
  }

  function initLevel() {
    initMaze();
    const pSpeed = 90 + level * 5;  // pixels per second
    player = createMover(playerStart.c, playerStart.r, Math.min(pSpeed, 130));
    pNextDir = 1;
    mouthTimer = 0;
    powerTimer = 0;
    dotsRemaining = countDots();

    const gSpeed = 70 + level * 5;
    ghosts = ghostStarts.slice(0, Math.min(ghostStarts.length, 2 + level)).map((gs, i) => {
      const g: Ghost = {
        ...createMover(gs.c, gs.r, Math.min(gSpeed, 110), Math.floor(Math.random() * 4)),
        scared: false, eaten: false,
        color: ghostColors[i % ghostColors.length],
      };
      return g;
    });
  }

  /**
   * Core smooth movement: advance a mover by dt seconds.
   * When the mover reaches the center of the target tile, it arrives,
   * and a callback is invoked to pick the next direction.
   */
  function advanceMover(m: Mover, dt: number, pickNextDir: (m: Mover) => number) {
    let remaining = m.speed * dt;

    while (remaining > 0.01) {
      if (!m.moving) {
        // We're sitting on a tile center. Try to start moving.
        const nextDir = pickNextDir(m);
        if (nextDir < 0) break; // No valid move

        m.dir = nextDir;
        const ntx = wrapCol(m.tileX + DX[m.dir]);
        const nty = m.tileY + DY[m.dir];

        if (isWall(nty, ntx)) break;

        m.targetTileX = ntx;
        m.targetTileY = nty;
        m.moving = true;
      }

      // Distance to target tile center
      const { px: tpx, py: tpy } = tileToPixel(m.targetTileX, m.targetTileY);

      // Handle tunnel wrapping for pixel distance
      let dx = tpx - m.pixelX;
      let dy = tpy - m.pixelY;

      // For horizontal tunnel wrapping, if target is on opposite side of maze
      if (Math.abs(dx) > mazeW / 2) {
        dx = dx > 0 ? dx - mazeW : dx + mazeW;
      }

      const distToTarget = Math.sqrt(dx * dx + dy * dy);

      if (distToTarget <= remaining) {
        // Arrive at target tile
        m.pixelX = tpx;
        m.pixelY = tpy;

        // Handle wrapping pixel position
        if (m.pixelX < 0) m.pixelX += mazeW;
        if (m.pixelX >= mazeW) m.pixelX -= mazeW;

        m.tileX = m.targetTileX;
        m.tileY = m.targetTileY;
        m.moving = false;
        remaining -= distToTarget;
      } else {
        // Move toward target
        if (distToTarget > 0) {
          m.pixelX += (dx / distToTarget) * remaining;
          m.pixelY += (dy / distToTarget) * remaining;

          // Wrap pixel position for tunnels
          if (m.pixelX < -CELL) m.pixelX += mazeW;
          if (m.pixelX >= mazeW + CELL) m.pixelX -= mazeW;
        }
        remaining = 0;
      }
    }
  }

  function spawnParticles(tileX: number, tileY: number, color: string, count: number) {
    const { px, py } = tileToPixel(tileX, tileY);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: px, y: py,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 0.3 + Math.random() * 0.3,
        color,
      });
    }
  }

  // Input
  const onKeyDown = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    if (e.key === 'ArrowUp' || e.key === 'w') pNextDir = 0;
    if (e.key === 'ArrowRight' || e.key === 'd') pNextDir = 1;
    if (e.key === 'ArrowDown' || e.key === 's') pNextDir = 2;
    if (e.key === 'ArrowLeft' || e.key === 'a') pNextDir = 3;
    if (gameOver && (e.key === ' ' || e.key === 'Enter')) {
      score = 0; lives = 3; level = 1; gameOver = false;
      particles.length = 0;
      initLevel();
    }
  };
  window.addEventListener('keydown', onKeyDown);

  /** Pick next direction for the player. Prioritizes buffered input. */
  function pickPlayerDir(m: Mover): number {
    // Try the buffered direction first
    if (canMove(m.tileY, m.tileX, pNextDir)) {
      return pNextDir;
    }
    // Otherwise continue in current direction if possible
    if (canMove(m.tileY, m.tileX, m.dir)) {
      return m.dir;
    }
    return -1; // Stuck
  }

  /** Pick next direction for a ghost. Simple AI. */
  function pickGhostDir(g: Ghost & Mover): number {
    const oppositeDir = (g.dir + 2) % 4;
    const possibleDirs: number[] = [];

    for (let d = 0; d < 4; d++) {
      if (d === oppositeDir) continue;
      if (canMove(g.tileY, g.tileX, d)) possibleDirs.push(d);
    }

    if (possibleDirs.length === 0) {
      // Dead end — only option is to reverse
      if (canMove(g.tileY, g.tileX, oppositeDir)) return oppositeDir;
      return -1;
    }

    // Choose direction based on AI mode
    if (!g.scared && Math.random() < 0.65) {
      // Chase: prefer direction toward player
      let bestDir = possibleDirs[0];
      let bestDist = Infinity;
      for (const d of possibleDirs) {
        const nr = g.tileY + DY[d];
        const nc = wrapCol(g.tileX + DX[d]);
        const dist = Math.abs(nr - player.tileY) + Math.abs(nc - player.tileX);
        if (dist < bestDist) { bestDist = dist; bestDir = d; }
      }
      return bestDir;
    } else if (g.scared && Math.random() < 0.5) {
      // Flee: prefer direction away from player
      let bestDir = possibleDirs[0];
      let bestDist = -1;
      for (const d of possibleDirs) {
        const nr = g.tileY + DY[d];
        const nc = wrapCol(g.tileX + DX[d]);
        const dist = Math.abs(nr - player.tileY) + Math.abs(nc - player.tileX);
        if (dist > bestDist) { bestDist = dist; bestDir = d; }
      }
      return bestDir;
    }

    // Random
    return possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
  }

  function checkCollisions() {
    for (const g of ghosts) {
      if (g.eaten) continue;

      // Distance-based collision (smooth)
      let dx = g.pixelX - player.pixelX;
      let dy = g.pixelY - player.pixelY;
      if (Math.abs(dx) > mazeW / 2) dx = dx > 0 ? dx - mazeW : dx + mazeW;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CELL * 0.6) {
        if (g.scared) {
          g.eaten = true;
          score += 200;
          playSound('blip');
          spawnParticles(g.tileX, g.tileY, '#22d3ee', 8);
        } else {
          lives--;
          playSound('death');
          spawnParticles(player.tileX, player.tileY, '#facc15', 12);
          if (lives <= 0) {
            gameOver = true;
          } else {
            // Reset positions
            player = createMover(playerStart.c, playerStart.r, player.speed);
            pNextDir = 1;
            ghosts.forEach((gg, i) => {
              const gs = ghostStarts[i % ghostStarts.length];
              const { px, py } = tileToPixel(gs.c, gs.r);
              gg.tileX = gs.c; gg.tileY = gs.r;
              gg.pixelX = px; gg.pixelY = py;
              gg.moving = false;
              gg.scared = false; gg.eaten = false;
            });
            powerTimer = 0;
          }
          return; // Don't check more collisions this frame
        }
      }
    }
  }

  function update(dt: number) {
    if (gameOver) return;

    // Mouth animation
    mouthTimer += dt;
    if (mouthTimer > 0.08) {
      mouthOpen = !mouthOpen;
      mouthTimer = 0;
    }

    // Remember player tile before move
    const prevTileX = player.tileX;
    const prevTileY = player.tileY;

    // Advance player
    advanceMover(player, dt, pickPlayerDir);

    // Check if player entered a new tile
    if (player.tileX !== prevTileX || player.tileY !== prevTileY) {
      // Eat dots on the NEW tile
      const cell = maze[player.tileY]?.[player.tileX];
      if (cell === '.') {
        maze[player.tileY][player.tileX] = ' ';
        score += 10;
        playSound('eat');
        dotsRemaining--;
      } else if (cell === 'O') {
        maze[player.tileY][player.tileX] = ' ';
        score += 50;
        playSound('powerup');
        dotsRemaining--;
        powerTimer = 6;
        for (const g of ghosts) g.scared = true;
      }
    }

    // Power pellet timer
    if (powerTimer > 0) {
      powerTimer -= dt;
      if (powerTimer <= 0) {
        for (const g of ghosts) {
          g.scared = false;
          g.eaten = false;
        }
      }
    }

    // Advance ghosts
    for (const g of ghosts) {
      if (g.eaten) continue;
      const ghostSpeed = g.scared ? g.speed * 0.6 : g.speed;
      const savedSpeed = g.speed;
      g.speed = ghostSpeed;
      advanceMover(g, dt, (m) => pickGhostDir(m as Ghost & Mover));
      g.speed = savedSpeed;
    }

    // Collisions
    checkCollisions();

    // Level complete
    if (dotsRemaining <= 0) {
      level++;
      initLevel();
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life -= dt;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function draw() {
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, W, H);

    const offsetX = Math.floor((W - mazeW) / 2);
    const offsetY = Math.floor((H - mazeH) / 2) + 14;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // Draw maze
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = maze[r]?.[c];
        const cx = c * CELL;
        const cy = r * CELL;

        if (cell === '#') {
          ctx.fillStyle = '#1e3a5f';
          ctx.fillRect(cx, cy, CELL, CELL);
          ctx.fillStyle = '#2563eb20';
          ctx.fillRect(cx + 1, cy + 1, CELL - 2, CELL - 2);
        } else if (cell === '.') {
          ctx.fillStyle = '#fde68a';
          ctx.beginPath();
          ctx.arc(cx + CELL / 2, cy + CELL / 2, 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (cell === 'O') {
          const pulse = 0.6 + 0.4 * Math.sin(performance.now() / 200);
          ctx.fillStyle = `rgba(253, 230, 138, ${pulse})`;
          ctx.beginPath();
          ctx.arc(cx + CELL / 2, cy + CELL / 2, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    if (!gameOver) {
      // Draw player (Pac-Man) at smooth pixel position
      const pcx = player.pixelX;
      const pcy = player.pixelY;
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      const mouthAngle = mouthOpen ? 0.35 : 0.05;
      const baseAngle = player.dir === 0 ? -Math.PI / 2
        : player.dir === 1 ? 0
        : player.dir === 2 ? Math.PI / 2
        : Math.PI;
      ctx.arc(pcx, pcy, CELL / 2 - 2, baseAngle + mouthAngle, baseAngle + Math.PI * 2 - mouthAngle);
      ctx.lineTo(pcx, pcy);
      ctx.fill();

      // Draw ghosts at smooth pixel positions
      for (const g of ghosts) {
        if (g.eaten) continue;
        const gx = g.pixelX;
        const gy = g.pixelY;

        ctx.fillStyle = g.scared
          ? (powerTimer < 2 && Math.floor(powerTimer * 5) % 2 === 0 ? '#fff' : '#3b82f6')
          : g.color;

        // Ghost body (rounded top, wavy bottom)
        const radius = CELL / 2 - 2;
        ctx.beginPath();
        ctx.arc(gx, gy - 2, radius, Math.PI, 0);
        ctx.lineTo(gx + radius, gy + radius);
        // Wavy bottom
        const segments = 3;
        const segW = (radius * 2) / segments;
        for (let s = segments; s >= 0; s--) {
          const sx = gx - radius + s * segW;
          const sy = gy + radius + (s % 2 === 0 ? -3 : 0);
          ctx.lineTo(sx, sy);
        }
        ctx.fill();

        // Eyes
        if (!g.scared) {
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(gx - 3, gy - 3, 3, 0, Math.PI * 2);
          ctx.arc(gx + 3, gy - 3, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#111';
          ctx.beginPath();
          ctx.arc(gx - 3 + DX[g.dir] * 1.5, gy - 3 + DY[g.dir] * 1.5, 1.5, 0, Math.PI * 2);
          ctx.arc(gx + 3 + DX[g.dir] * 1.5, gy - 3 + DY[g.dir] * 1.5, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#fff';
          ctx.fillRect(gx - 4, gy - 3, 2, 2);
          ctx.fillRect(gx + 2, gy - 3, 2, 2);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(gx - 4, gy + 2);
          ctx.lineTo(gx - 2, gy); ctx.lineTo(gx, gy + 2);
          ctx.lineTo(gx + 2, gy); ctx.lineTo(gx + 4, gy + 2);
          ctx.stroke();
        }
      }
    }

    // Particles
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.life * 2);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
    }
    ctx.globalAlpha = 1;

    ctx.restore();

    // HUD
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '14px "Space Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${score}`, 12, 24);
    ctx.textAlign = 'right';
    ctx.fillText(`LIVES: ${'●'.repeat(lives)}`, W - 12, 24);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#facc15';
    ctx.fillText(`LEVEL ${level}`, W / 2, 24);

    if (gameOver) {
      ctx.fillStyle = 'rgba(5,5,16,0.75)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#facc15';
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

  initLevel();
  animId = requestAnimationFrame(loop);

  const onResize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', onResize);

  return {
    stop() {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    }
  };
}
