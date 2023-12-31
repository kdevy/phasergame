import Player from "../entities/Player";

export class GameScene extends Phaser.Scene {
    player: Player | null;

    constructor() {
        super({ key: "GameScene" });
        this.player = null;
    }

    preload(): void {
        console.log("game scene");
        this.load.spritesheet("player", "./assets/img/player.png", {
            frameHeight: 32,
            frameWidth: 32,
        });
    }

    create(): void {
        this.player = new Player(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this);
        this.cameras.main.zoom = 3;
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player.sprite);
    }

    update(): void {
        this.player!.update();
    }
}
