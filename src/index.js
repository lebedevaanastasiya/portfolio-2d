const app = new PIXI.Application({
  background: "#dedffa",
  resizeTo: window,
});

document.body.append(app.view);

let keys = {};

const player = PIXI.Sprite.from("./assets/player.jpg");

player.anchor.set(0.5);

player.x = app.screen.width / 2;
player.y = app.screen.height / 2;

app.stage.addChild(player);

app.ticker.add(gameLoop);

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

function onKeyDown(e) {
  keys[e.keyCode] = true;
  // console.log(e.keyCode);
}

function onKeyUp(e) {
  keys[e.keyCode] = false;
}

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
