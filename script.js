const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 3;

const stars = [];
const nebula = [];
const shootingStars = [];

const numStars = 200;
const numNebula = 5;

// Initialize stars
for (let i = 0; i < numStars; i++) {
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * Math.min(centerX, centerY);
  const size = Math.random() * 2 + 0.5;
  stars.push({angle, radius, size, speed: 0.0005 + Math.random() * 0.001});
}

// Initialize nebula
for (let i = 0; i < numNebula; i++) {
  nebula.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 300 + 200,
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    color: `rgba(${Math.floor(Math.random()*100)}, ${Math.floor(Math.random()*150)}, 255, 0.08)`
  });
}

// Shooting star generator
function createShootingStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height/2;
  const length = Math.random() * 200 + 100;
  shootingStars.push({x, y, length, speed: Math.random() * 10 + 5});
}

// Animate everything
function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Nebula
  nebula.forEach(n => {
    n.x += n.dx;
    n.y += n.dy;

    if (n.x < -n.radius) n.x = canvas.width + n.radius;
    if (n.x > canvas.width + n.radius) n.x = -n.radius;
    if (n.y < -n.radius) n.y = canvas.height + n.radius;
    if (n.y > canvas.height + n.radius) n.y = -n.radius;

    const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
    grad.addColorStop(0, n.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.radius, 0, 2*Math.PI);
    ctx.fill();
  });

  // Stars
  stars.forEach(star => {
    star.angle += star.speed;
    const x = centerX + star.radius * Math.cos(star.angle);
    const y = centerY + star.radius * Math.sin(star.angle);

    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  });

  // Shooting stars
  for (let i = shootingStars.length-1; i>=0; i--) {
    const s = shootingStars[i];
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.stroke();
    s.x += s.speed;
    s.y += s.speed;
    s.length *= 0.98; // fade length
    if (s.length < 1) shootingStars.splice(i,1);
  }

  // Randomly add shooting stars
  if (Math.random() < 0.02) createShootingStar();

  requestAnimationFrame(draw);
}

draw();

// Interactive nebula
window.addEventListener('mousemove', e => {
  nebula.forEach(n => {
    n.dx += (e.clientX - centerX) * 0.00001;
    n.dy += (e.clientY - centerY) * 0.00001;
  });
});

// Resize canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});