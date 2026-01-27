const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// CENTER POINT (moved UP slightly)
const center = {
  x: canvas.width / 2,
  y: canvas.height / 3.8
};

// SYSTEMS
const stars = [];
const meteors = [];
const nebulae = [];
const ufos = [];

// STARS
for (let i = 0; i < 220; i++) {
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
    r: 220 + Math.random() * 300,
    dx: (Math.random() - 0.5) * 0.04,
    dy: (Math.random() - 0.5) * 0.04,
    color: `rgba(${90 + Math.random()*70},${110 + Math.random()*70},255,0.08)`
  });
}

// METEOR
function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    len: 90 + Math.random() * 90,
    speed: 6 + Math.random() * 6,
    angle: Math.random() * 0.4 - 0.2
  });
}

// UFO (RARE)
function spawnUFO() {
  ufos.push({
    x: -120,
    y: Math.random() * canvas.height * 0.28,
    speed: 1.4 + Math.random()
  });
}

// DRAW LOOP
function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.22)";
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

  // STARS
  stars.forEach(s => {
    s.angle += s.speed;
    const x = center.x + Math.cos(s.angle) * s.radius;
    const y = center.y + Math.sin(s.angle) * s.radius;

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // METEORS
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(
      m.x - Math.cos(m.angle) * m.len,
      m.y + Math.sin(m.angle) * m.len
    );
    ctx.stroke();

    m.x += Math.cos(m.angle) * m.speed;
    m.y += Math.sin(m.angle) * m.speed;
    m.len *= 0.96;

    if (m.len < 2) meteors.splice(i, 1);
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

  // RANDOM EVENTS
  if (Math.random() < 0.02) spawnMeteor();
  if (Math.random() < 0.0007) spawnUFO();

  requestAnimationFrame(draw);
}
draw();

// AUDIO — DELAY + FADE-IN
window.addEventListener("load", () => {
  const audio = document.getElementById("welcomeAudio");
  if (!audio) return;

  audio.volume = 0;

  setTimeout(() => {
    audio.play().catch(() => {});
    let vol = 0;
    const fade = setInterval(() => {
      vol += 0.02;
      audio.volume = Math.min(vol, 1);
      if (vol >= 1) clearInterval(fade);
    }, 80);
  }, 2000);
});