class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext('2d');

    this.flipPlayer = false;

    this.viewport = {
      left: 0,
      top: 0,
      width: this.canvas.width / scale,
      height: this.canvas.height / scale,
    };
  }

  clear() {
    this.canvas.remove();
  }
}

CanvasDisplay.prototype.syncState = function(state) {
  this.updateViewport(state);
  this.clearDisplay(state.status);
  this.drawBackground(state.level);
  this.drawActors(state.actors);
};

CanvasDisplay.prototype.updateViewport = function(state) {
  const view = this.viewport;
  const margin = view.width / 3;
  const { player } = state;
  const center = player.pos.plus(player.size.times(0.5));

  if (center.x < view.left + margin) {
    view.left = Math.max(center.x - margin, 0);
  } else if (center.x > view.left + view.width - margin) {
    view.left = Math.min(
      center.x + margin - view.width,
      state.level.width - view.width
    );
  }
  if (center.y < view.top + margin) {
    view.top = Math.max(center.y - margin, 0);
  } else if (center.y > view.top + view.height - margin) {
    view.top = Math.min(
      center.y + margin - view.height,
      state.level.height - view.height
    );
  }
};

CanvasDisplay.prototype.clearDisplay = function(status) {
  if (status === 'won') {
    this.cx.fillStyle = 'rgb(68, 191, 255)';
  } else if (status === 'lost') {
    this.cx.fillStyle = 'rgb(44, 136, 214)';
  } else {
    this.cx.fillStyle = 'rgb(52, 166, 251)';
  }
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

const otherSprites = document.createElement('img');
otherSprites.src = 'img/sprites.png';

CanvasDisplay.prototype.drawBackground = function(level) {
  const { left, top, width, height } = this.viewport;
  const xStart = Math.floor(left);
  const xEnd = Math.ceil(left + width);
  const yStart = Math.floor(top);
  const yEnd = Math.ceil(top + height);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      const tile = level.rows[y][x];
      if (tile === 'empty') continue;
      const screenX = (x - left) * scale;
      const screenY = (y - top) * scale;
      const tileX = tile === 'lava' ? scale : 0;
      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        scale,
        scale,
        screenX,
        screenY,
        scale,
        scale
      );
    }
  }
};

const playerSprites = document.createElement('img');
playerSprites.src = 'img/player.png';
const playerXOverlap = 4;

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

CanvasDisplay.prototype.drawPlayer = function(player, x, y, width, height) {
  width += playerXOverlap * 2;
  x -= playerXOverlap;
  if (player.speed.x !== 0) {
    this.flipPlayer = player.speed.x < 0;
  }

  let tile = 8;
  if (player.speed.y !== 0) {
    tile = 9;
  } else if (player.speed.x !== 0) {
    tile = Math.floor(Date.now() / 60) % 8;
  }

  this.cx.save();
  if (this.flipPlayer) {
    flipHorizontally(this.cx, x + width / 2);
  }
  const tileX = tile * width;
  this.cx.drawImage(
    playerSprites,
    tileX,
    0,
    width,
    height,
    x,
    y,
    width,
    height
  );
  this.cx.restore();
};

CanvasDisplay.prototype.drawActors = function(actors) {
  for (const actor of actors) {
    const width = actor.size.x * scale;
    const height = actor.size.y * scale;
    const x = (actor.pos.x - this.viewport.left) * scale;
    const y = (actor.pos.y - this.viewport.top) * scale;
    if (actor.type === 'player') {
      this.drawPlayer(actor, x, y, width, height);
    } else {
      const tileX = (actor.type === 'coin' ? 2 : 1) * scale;
      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        width,
        height,
        x,
        y,
        width,
        height
      );
    }
  }
};