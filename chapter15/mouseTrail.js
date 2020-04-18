const numElements = 16;
const trailElements = [];
for (let i = 0; i < numElements; i++) {
  const trail = document.createElement('div');
  trail.className = 'trail';
  document.body.appendChild(trail);
  trailElements.push(trail);
}

let counter = 0;

window.addEventListener('mousemove', event => {
  const currentTrail = trailElements[counter % numElements];
  currentTrail.style.left = `${event.clientX}px`;
  currentTrail.style.top = `${event.clientY}px`;
  counter += 1;
});
