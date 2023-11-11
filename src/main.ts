import "phaser";
import { TitleScene } from "./scenes/TitleScene";
import { GameScene } from "./scenes/GameScene";

window.addEventListener("load", () => {
    new Phaser.Game({
        type: Phaser.WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: "game",
        render: { pixelArt: true },
        physics: {
            default: "arcade",
            arcade: { debug: false, gravity: { y: 0 } },
        },
        scene: [TitleScene, GameScene],
        scale: {
            mode: Phaser.Scale.RESIZE,
        },
    });
});
