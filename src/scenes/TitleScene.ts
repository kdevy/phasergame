export class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: "TitleScene",
        });
    }

    preload(): void {
        console.log("Hello Phaser!!");
    }
}
