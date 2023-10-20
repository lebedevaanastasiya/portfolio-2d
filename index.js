// Initialize Pixi view
const app = new PIXI.Application({
  background: "#dedffa",
  resizeTo: window,
});
document.body.append(app.view);

// Create player and position it on the scene
const playerTexture = await PIXI.Assets.load("./assets/player.jpg");
const player = PIXI.Sprite.from(playerTexture);
player.anchor.set(0.5);
player.x = app.screen.width / 2;
player.y = app.screen.height / 2;
app.stage.addChild(player);

// Handling keyboard player controls
let keys = {};
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

function onKeyDown(e) {
  keys[e.keyCode] = true;
}

function onKeyUp(e) {
  keys[e.keyCode] = false;
}

// Handling touch screen player controls
const buttonArrowRight = document.getElementById("arrow-right");
buttonArrowRight.addEventListener("touchstart", onArrowRightTouchStart);
buttonArrowRight.addEventListener("touchend", onArrowRightTouchEnd);

function onArrowRightTouchStart() {
  onKeyDown({ keyCode: 39 });
}

function onArrowRightTouchEnd() {
  onKeyUp({ keyCode: 39 });
}

const buttonArrowLeft = document.getElementById("arrow-left");
buttonArrowLeft.addEventListener("touchstart", onArrowLeftTouchStart);
buttonArrowLeft.addEventListener("touchend", onArrowLeftTouchEnd);

function onArrowLeftTouchStart() {
  onKeyDown({ keyCode: 37 });
}

function onArrowLeftTouchEnd() {
  onKeyUp({ keyCode: 37 });
}

// Create game platform
const groundTexture = await PIXI.Assets.load("./assets/ground.jpg");
const grassTexture = await PIXI.Assets.load("./assets/grass.jpg");
const TILE_SIZE = groundTexture.width;
const PLATFORM_ROWS = 4;
const PLATFORM_COLUMNS = Math.ceil(window.innerWidth / TILE_SIZE);
const platformWidth = TILE_SIZE * PLATFORM_COLUMNS;
const platformHeight = TILE_SIZE * PLATFORM_ROWS;
const platform = new PIXI.Container();
platform.x = 0;
platform.y = window.innerHeight - platformHeight;

for (let row = 0; row < PLATFORM_ROWS; row++) {
  for (let col = 0; col < PLATFORM_COLUMNS; col++) {
    const texture = row === 0 ? grassTexture : groundTexture;
    const tile = PIXI.Sprite.from(texture);
    platform.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
    console.log("tile", tile);
  }
}

app.stage.addChild(platform);

// Main game loop
app.ticker.add(gameLoop);

function gameLoop(delta) {
  if (keys["39"] /* -> */) {
    if (player.x + 5 + 32 <= app.screen.width) {
      player.x += 5;
    }
  }

  if (keys["37"] /* <- */) {
    if (player.x - 5 - 32 >= 0) {
      player.x -= 5;
    }
  }

  if (keys["82"] /* r */) {
    if (player.x - 5 - 32 >= 0) {
      player.rotation += 0.1 * delta;
    }
  }
}
