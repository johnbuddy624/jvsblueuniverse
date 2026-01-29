/* ================================================== */
/*           BLUE UNIVERSE - ENGINEER MODE          */
/* ================================================== */

/* ===== 1️⃣ CANVAS SETUP ===== */
// Grab canvas from HTML
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

// Make canvas full-screen and responsive
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ===== 2️⃣ STAR SYSTEM ===== */
// Stars array
const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width, // X position
  y: Math.random() * canvas.height, // Y position
  r: Math.random() * 1.5 + 0.5,     // radius
  a: Math.random() * 0.8 + 0.2      // opacity
}));

// Draw stars
function drawStars() {
  stars.forEach(star => {
    ctx.globalAlpha = star.a;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
  ctx.globalAlpha = 1; // reset alpha
}

/* ===== 3️⃣ COSMIC WORM SYSTEM ===== */
// Worm settings
const worm = {
  segments: 25,                   // number of segments
  length: 15,                     // distance between segments
  positions: [],                  // array to store positions
  color: "rgba(79,179,255,0.8)"  // worm color
};

// Initialize worm segments in the center
for (let i = 0; i < worm.segments; i++) {
  worm.positions.push({ x: canvas.width/2, y: canvas.height/2 });
}

// Mouse tracking (engineer-friendly)
const mouse = { x: canvas.width/2, y: canvas.height/2 };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Update worm positions
function updateWorm() {
  const head = worm.positions[0];
  const target = { x: mouse.x, y: mouse.y }; // head follows mouse
  const dx = target.x - head.x;
  const dy = target.y - head.y;
  head.x += dx * 0.02 * 2; // speed multiplier
  head.y += dy * 0.02 * 2;

  // Each segment follows the one before it
  for (let i = 1; i < worm.segments; i++) {
    const prev = worm.positions[i-1];
    const curr = worm.positions[i];
    const angle = Math.atan2(prev.y - curr.y, prev.x - curr.x);
    curr.x = prev.x - Math.cos(angle) * worm.length;
    curr.y = prev.y - Math.sin(angle) * worm.length;
  }
}

// Draw worm
function drawWorm() {
  for (let i = worm.segments-1; i > 0; i--) {
    const p = worm.positions[i];
    const next = worm.positions[i-1];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(next.x, next.y);
    ctx.strokeStyle = worm.color;
    ctx.lineWidth = 4 * (i / worm.segments); // taper effect
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

/* ===== 4️⃣ MAIN LOOP ===== */
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw stars
  drawStars();

  // 2. Update worm positions
  updateWorm();

  // 3. Draw worm on top of stars
  drawWorm();

  // Future components: add here (nebulae, shooting stars, planets, etc.)

  // Loop
  requestAnimationFrame(draw);
}

/* ===== 5️⃣ START ANIMATION ===== */
draw();