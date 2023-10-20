// Initialize Pixi view
const app = new PIXI.Application({
  background: "#dedffa",
  resizeTo: window,
});
document.body.append(app.view);

// create player and position on on the scene
const player = PIXI.Sprite.from("./assets/player.jpg");
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
