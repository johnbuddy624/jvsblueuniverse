const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const nebula = [];
const numStars = 200;
const numNebula = 5;
const centerX = canvas.width / 2;
const centerY = canvas.height / 3; // higher for top-center text

// Stars (orbiting)
for (let i = 0; i < numStars; i++) {
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * Math.min(centerX, centerY);
  const size = Math.random() * 2 + 0.5;
  stars.push({angle, radius, size, speed: 0.0005 + Math.random() * 0.001});
}

// Nebula clouds
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

function draw() {
  // Slightly transparent black to leave trails
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw nebula
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

  // Draw stars
  stars.forEach(star => {
    star.angle += star.speed;
    const x = centerX + star.radius * Math.cos(star.angle);
    const y = centerY + star.radius * Math.sin(star.angle);

    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});