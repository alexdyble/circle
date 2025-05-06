let angle = 0;
let speed = 0.02;
let stressTimeout = null;
let stressLevel = 0; // 0 = calm (blue), 1 = stressed (orange)
let targetStress = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(20);

  // Smooth stress transition
  stressLevel = lerp(stressLevel, targetStress, 0.05);

  // Calculate radius like breathing
  let radius = 100 + sin(angle) * 50;

  // Interpolate between calm blue and stressed orange
  let r = lerp(120, 255, stressLevel);
  let g = lerp(180, 165, stressLevel);
  let b = lerp(255, 0, stressLevel);

  fill(r, g, b);
  ellipse(width / 2, height / 2, radius * 2);

  angle += speed;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // Check if mouse is inside the circle
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  let currentRadius = 100 + sin(angle) * 50;

  if (d < currentRadius) {
    speed = 0.1; // speed up = stress
    targetStress = 1; // fade to orange

    if (stressTimeout) clearTimeout(stressTimeout);

    stressTimeout = setTimeout(() => {
      speed = 0.02;
      targetStress = 0; // fade back to calm
    }, 3000);
  }
}
