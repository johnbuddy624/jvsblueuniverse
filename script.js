/* ===== BUTTON EVENTS ===== */
document.querySelectorAll('.rect-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = btn.getAttribute('data-link');
    window.location.href = target;
  });
});

/* ===== DONATE + PAUSE BUTTONS ===== */
const donateBtn = document.getElementById('donate');

donateBtn.querySelector('.donate-half').addEventListener('click', ()=>{
  window.location.href = 'https://www.paypal.me/JohnBender612';
});

let paused = false;
donateBtn.querySelector('.pause-half').addEventListener('click', ()=>{
  paused = !paused;
  donateBtn.querySelector('.pause-half').textContent = paused ? '▶' : '⏸';
});
