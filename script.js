const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ----- STAR SYSTEM -----
const stars = [];
const meteors = [];
const nebulae = [];
const ufos = [];

const center = {
  x: canvas.width / 2,
  y: canvas.height / 4
};

// Stars (orbiting)
for (let i = 0; i < 200; i++) {
  stars.push({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * Math.min(canvas.width, canvas.height) / 2,
    size: Math.random() * 2 + 0.5,
    speed: 0.0005 + Math.random() * 0.001
  });
}

// Nebula clouds
for (let i = 0; i < 5; i++) {
  nebulae.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 200 + Math.random() * 300,
    dx: (Math.random() - 0.5) * 0.05,
    dy: (Math.random() - 0.5) * 0.05,
    color: `rgba(${80 + Math.random()*80},${100 + Math.random()*80},255,0.08)`
  });
}

// Meteor creator
function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    len: 80 + Math.random() * 80,
    speed: 6 + Math.random() * 6,
    angle: Math.random() * 0.4 - 0.2
  });
}

// Rare UFO
function spawnUFO() {
  ufos.push({
    x: -100,
    y: Math.random() * canvas.height * 0.3,
    speed: 1.5 + Math.random()
  });
}

// ----- DRAW LOOP -----
function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Nebula
  nebulae.forEach(n => {
    n.x += n.dx;
    n.y += n.dy;

    const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
    grad.addColorStop(0, n.color);
    grad.addColorStop(1, "transparent");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Stars
  stars.forEach(s => {
    s.angle += s.speed;
    const x = center.x + Math.cos(s.angle) * s.radius;
    const y = center.y + Math.sin(s.angle) * s.radius;

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // Meteors
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
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

  // UFOs
  ufos.forEach((u, i) => {
    ctx.fillStyle = "rgba(200,220,255,0.9)";
    ctx.beginPath();
    ctx.ellipse(u.x, u.y, 18, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    u.x += u.speed;
    if (u.x > canvas.width + 50) ufos.splice(i, 1);
  });

  // Random events
  if (Math.random() < 0.02) spawnMeteor();
  if (Math.random() < 0.0008) spawnUFO();

  requestAnimationFrame(draw);
}

draw();

// ----- AUDIO (DELAYED + FADE-IN) -----
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