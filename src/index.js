const app = new PIXI.Application({
  background: "#dedffa",
  resizeTo: window,
});

document.body.append(app.view);

const me = PIXI.Sprite.from("./assets/me.png");

me.anchor.set(0.5);

me.x = app.screen.width / 2;
me.y = app.screen.height / 2;

app.stage.addChild(me);

app.ticker.add((delta) => {
  me.rotation += 0.1 * delta;
});
