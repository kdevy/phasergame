import "phaser";
import { TitleScene } from "./scenes/TitleScene";

new Phaser.Game({
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game",
    render: { pixelArt: true },
    physics: { default: "arcade", arcade: { debug: false, gravity: { y: 0 } } },
    scene: [TitleScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
});
