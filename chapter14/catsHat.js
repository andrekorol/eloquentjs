const cat = document.querySelector('#cat');
const hat = document.querySelector('#hat');

let angle = 0;
let lastTime = null;

function animate(time) {
  if (lastTime != null) angle += (time - lastTime) * 0.001;
  lastTime = time;
  cat.style.top = `${Math.sin(angle) * 40 + 40}px`;
  cat.style.left = `${Math.cos(angle) * 200 + 230}px`;

  hat.style.top = `${-Math.sin(angle) * 40 + 40}px`;
  hat.style.left = `${-Math.cos(angle) * 200 + 230}px`;

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
