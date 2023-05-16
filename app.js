const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const tileSize = Math.floor(window.innerWidth * 0.04); // Set tile size to 4% of screen width
const originalStrokeStyle = "#1f1f1f"; // Store the original stroke color

function resizeCanvas() {
  context.translate(0.5, 0.5);
  const bodyHeight = document.body.offsetHeight;
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  const numRows = Math.floor((bodyHeight + scrollBarWidth) / tileSize);
  const numCols = Math.floor(window.innerWidth / tileSize);

  canvas.width = numCols * tileSize;
  canvas.height = numRows * tileSize;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      context.fillStyle = "#1f1f1f";
      context.fillRect(x, y, tileSize, tileSize);
      context.strokeStyle = "#1f1f1f";
      context.lineWidth = "2";
      context.strokeRect(x, y, tileSize, tileSize);
    }
  }

  // Add event listener for mousemove
  canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);

    // Set the new stroke color with desired opacity
    context.strokeStyle = "rgba(23, 31, 230, 1)";

    // Stroke the tile with new color
    context.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);

    // Set the stroke color back to the original color after a short delay (adjust as needed)
    setTimeout(function () {
      context.strokeStyle = originalStrokeStyle;
      context.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }, 300);
  });
}

resizeCanvas(); // Initial canvas sizing

// Add event listener for window resize
window.addEventListener("resize", function () {
  resizeCanvas();
});
