/* ======================== */
/*   BLUE UNIVERSE STARTER  */
/* ======================== */

/* ===== Canvas Setup ===== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ===== Blank Animation Loop ===== */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Everything you want to add goes here
  // Example: stars, worm, shooting stars, nebulae, etc.

  requestAnimationFrame(draw);
}

/* ===== Start Animation ===== */
draw();


/* ======================== */
/*   BLUE UNIVERSE: STARS   */
/* ======================== */

/* ===== Canvas Setup ===== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ===== STAR DATA ===== */
const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,   // radius
  a: Math.random() * 0.8 + 0.2    // opacity
}));

/* ===== DRAW STARS ===== */
function drawStars() {
  stars.forEach(s => {
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

/* ===== ANIMATION LOOP ===== */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars first
  drawStars();

  // Future components (worm, shooting stars, etc.) go here

  requestAnimationFrame(draw);
}

/* ===== START ANIMATION ===== */
draw();

