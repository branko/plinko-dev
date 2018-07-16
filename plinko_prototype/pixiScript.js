
var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb})
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var chip = new PIXI.Graphics();

chip.beginFill(0x123456);
chip.drawCircle(100,100,20);
chip.drawCircle(100,70,30);
chip.drawCircle(100,150,50);
chip.endFill();

stage.addChild(chip);

function animate() {
  requestAnimationFrame(animate)
  chip.position.x += (Math.random() + 1) ** (Math.random() + 2)
  chip.position.y += (Math.random() + 1) ** (Math.random() + 2)
  renderer.render(stage)
}

animate()
