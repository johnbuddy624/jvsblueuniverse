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