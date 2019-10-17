import { CanvasSetup } from "./Canvas/CanvasSetup";
const canvas = CanvasSetup();

raf();

function raf() {
  requestAnimationFrame(raf);
  canvas.Loop();
}

// tremolo
// ripple
// wobble
