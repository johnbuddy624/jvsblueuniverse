// Profile

  // STARFIELD
  
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = Array.from({ length: 600 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  z: Math.random() * 0.8 + 0.2,
  a: Math.random() * 0.8 + 0.2,
  r: Math.random() * 1.5 + 0.5
}));

function draw() {
  ctx.clearRect(0, 0, w, h);
  stars.forEach(s => {
    s.x += 0.15 * s.z;
    if (s.x > w) s.x = 0;
    ctx.globalAlpha = s.a * s.z;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
  
draw();








// Index








// About
