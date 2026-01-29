/* ========================================== */
/*        J&V’s BLUE UNIVERSE STARFIELD      */
/* ========================================== */

/* ===== 1️⃣ CANVAS SETUP ===== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  width = canvas.width = window.innerWidth * dpr;
  height = canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ===== 2️⃣ STARFIELD SETUP ===== */
const numStars = 800; // density of stars
const stars = [];

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * width,
    size: Math.random() * 1.5 + 0.5
  });
}

/* ===== 3️⃣ POINTER / INTERACTION ===== */
const pointer = { x: 0, y: 0 };
window.addEventListener("mousemove", e => {
  pointer.x = (e.clientX - width/2) / width * 2; // normalized
  pointer.y = (e.clientY - height/2) / height * 2;
});

window.addEventListener("touchmove", e => {
  e.preventDefault();
  pointer.x = (e.touches[0].clientX - width/2) / width * 2;
  pointer.y = (e.touches[0].clientY - height/2) / height * 2;
}, { passive: false });

/* ===== 4️⃣ STARFIELD ANIMATION ===== */
function drawStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  const focalLength = width / 2; // perspective

  stars.forEach(star => {
    // move star toward camera
    star.z -= 4;
    if (star.z <= 0) {
      star.z = width;
      star.x = Math.random() * width - width / 2;
      star.y = Math.random() * height - height / 2;
    }

    // 3D projection
    const sx = (star.x + pointer.x * 300) * (focalLength / star.z) + width / 2;
    const sy = (star.y + pointer.y * 300) * (focalLength / star.z) + height / 2;

    const radius = star.size * (focalLength / star.z);

    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${1 - star.z/width})`; // fade with distance
    ctx.fill();
  });
}

/* ===== 5️⃣ MAIN LOOP ===== */
function animate() {
  drawStars();
  requestAnimationFrame(animate);
}
animate();