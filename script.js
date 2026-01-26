/* General body styling */
body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #000814, #001f3f);
  font-family: 'Arial', sans-serif;
  color: white;
}

/* Container for universe elements */
.universe-container {
  position: relative;
  text-align: center;
  z-index: 2;
}

/* Foundation text: J&V's */
.foundation-text {
  font-size: 10vw;
  color: rgba(255,255,255,0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  z-index: 1;
  animation: pulse 3s ease-in-out infinite;
}

/* Blue Universe text */
.main-text {
  font-size: 5vw;
  position: relative;
  z-index: 2;
  color: #00cfff;
  font-weight: bold;
  text-shadow:
    0 0 15px #00cfff,
    0 0 30px #00cfff,
    0 0 50px #00a7ff;
}

/* Galaxy canvas */
#galaxy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Pulsing animation */
@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
  50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.15; }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .foundation-text { font-size: 15vw; }
  .main-text { font-size: 8vw; }
}