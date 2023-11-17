export class TitleScene extends Phaser.Scene {
    gameStartText: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "TitleScene",
        });
    }

    preload(): void {
        console.log("title scene");
    }

    create(): void {
        this.gameStartText = this.add
            .text(this.sys.game.canvas.width / 2, 300, "ゲーム開始", {
                fontSize: 20,
            })
            .setOrigin(0.5);

        this.gameStartText.setInteractive().on("pointerover", () => {
            this.gameStartText.setColor("#4287f5");
        });
        this.gameStartText.setInteractive().on("pointerout", () => {
            this.gameStartText.setColor("#fff");
        });
        this.gameStartText.setInteractive().on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }

    update(): void {}
}
