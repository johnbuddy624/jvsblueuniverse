const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// CENTER — elevated
const center = {
  x: canvas.width / 2,
  y: canvas.height / 4.5
};

const stars = [];
const meteors = [];
const nebulae = [];
const ufos = [];

// STARS
for (let i = 0; i < 240; i++) {
  stars.push({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * Math.min(canvas.width, canvas.height) / 2,
    size: Math.random() * 2 + 0.5,
    speed: 0.0004 + Math.random() * 0.001
  });
}

// NEBULA
for (let i = 0; i < 6; i++) {
  nebulae.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 240 + Math.random() * 320,
    dx: (Math.random() - 0.5) * 0.04,
    dy: (Math.random() - 0.5) * 0.04,
    color: `rgba(${90 + Math.random()*70},${110 + Math.random()*70},255,0.08)`
  });
}

// SHOOTING STAR — STAR STYLE
function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    vx: 6 + Math.random() * 4,
    vy: 2 + Math.random() * 3,
    life: 0,
    trail: []
  });
}

// UFO — RARE
function spawnUFO() {
  ufos.push({
    x: -120,
    y: Math.random() * canvas.height * 0.25,
    speed: 1.2 + Math.random()
  });
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // NEBULA
  nebulae.forEach(n => {
    n.x += n.dx;
    n.y += n.dy;

    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
    g.addColorStop(0, n.color);
    g.addColorStop(1, "transparent");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // ORBITING STARS
  stars.forEach(s => {
    s.angle += s.speed;
    const x = center.x + Math.cos(s.angle) * s.radius;
    const y = center.y + Math.sin(s.angle) * s.radius;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // SHOOTING STARS — POINT STYLE
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];

    m.trail.push({ x: m.x, y: m.y, a: 1 });
    if (m.trail.length > 18) m.trail.shift();

    m.trail.forEach(t => {
      ctx.fillStyle = `rgba(255,255,255,${t.a})`;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      ctx.fill();
      t.a *= 0.85;
    });

    // head
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(m.x, m.y, 3.5, 0, Math.PI * 2);
    ctx.fill();

    m.x += m.vx;
    m.y += m.vy;
    m.life++;

    if (m.life > 60) meteors.splice(i, 1);
  }

  // UFO
  ufos.forEach((u, i) => {
    ctx.fillStyle = "rgba(200,220,255,0.95)";
    ctx.beginPath();
    ctx.ellipse(u.x, u.y, 18, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    u.x += u.speed;
    if (u.x > canvas.width + 60) ufos.splice(i, 1);
  });

  if (Math.random() < 0.02) spawnMeteor();
  if (Math.random() < 0.0002) spawnUFO();

  requestAnimationFrame(draw);
}
draw();

// AUDIO — delayed & warm
window.addEventListener("load", () => {
  const audio = document.getElementById("welcomeAudio");
  if (!audio) return;

  audio.volume = 0;

  setTimeout(() => {
    audio.play().catch(() => {});
    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      audio.volume = Math.min(v, 1);
      if (v >= 1) clearInterval(fade);
    }, 80);
  }, 2200);
});