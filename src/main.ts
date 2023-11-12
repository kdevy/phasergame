import "phaser";
import { TitleScene } from "./scenes/TitleScene";
import { GameScene } from "./scenes/GameScene";

window.addEventListener("load", () => {
    new Phaser.Game({
        type: Phaser.WEBGL,
        width: 480,
        height: 560,
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
        backgroundColor: "#ccc",
    });
});
