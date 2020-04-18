const balloon = document.querySelector('p');
let balloonSize = 50;
const maxBalloonSize = 250;

function updateBalloonSize(factor) {
  balloonSize *= factor;
  balloon.style.fontSize = `${balloonSize}px`;
}
function resizeBalloon(event) {
  if (event.key === 'ArrowUp') {
    updateBalloonSize(1.1);
  } else if (event.key === 'ArrowDown') {
    updateBalloonSize(0.9);
  }
  if (balloonSize > maxBalloonSize) {
    balloon.textContent = '💥';
    document.removeEventListener('keydown', resizeBalloon);
  }
}

updateBalloonSize(1); // set initial size
document.addEventListener('keydown', resizeBalloon);
