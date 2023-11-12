interface Keys {
    top: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
}

export default class Player {
    public sprite: Phaser.Physics.Arcade.Sprite;
    private scene: Phaser.Scene;
    private keys: Keys;
    private lastDirection: string = "";
    private keepKeyDown: string = "";
    private moveSpeed = 100;

    constructor(x: number, y: number, scene: Phaser.Scene) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, "player", 0);
        this.sprite.setSize(32, 32);

        this.sprite.anims.create({
            key: "playerIdle",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 7, end: 7 }),
            frameRate: 1,
            repeat: -1,
        });
        this.sprite.anims.create({
            key: "playerIdleBack",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 10, end: 10 }),
            frameRate: 1,
            repeat: -1,
        });
        this.sprite.anims.create({
            key: "playerIdleLeft",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 13, end: 13 }),
            frameRate: 1,
            repeat: -1,
        });
        this.sprite.anims.create({
            key: "playerIdleRight",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 16, end: 16 }),
            frameRate: 1,
            repeat: -1,
        });
        this.sprite.anims.create({
            key: "playerWalk",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
            frameRate: 8,
            repeat: -1,
        });
        this.sprite.anims.create({
            key: "playerWalkBack",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
            frameRate: 8,
            repeat: -1,
        });
        this.sprite.anims.create({
            key: "playerWalkLeft",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 12, end: 14 }),
            frameRate: 8,
            repeat: -1,
        });
        this.sprite.anims.create({
            key: "playerWalkRight",
            frames: this.sprite.anims.generateFrameNumbers("player", { start: 15, end: 17 }),
            frameRate: 8,
            repeat: -1,
        });
        this.sprite.anims.play("playerIdle");

        this.keys = scene.input.keyboard.addKeys({
            top: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        }) as Keys;
    }

    update() {
        let animationKey = "";
        let startKeyDown = false;

        if (this.keys.top.isDown) {
            animationKey = "playerWalkBack";
            this.lastDirection = "top";
            this.sprite.setVelocityY(-this.moveSpeed);
        } else if (this.keys.down.isDown) {
            animationKey = "playerWalk";
            this.lastDirection = "down";
            this.sprite.setVelocityY(this.moveSpeed);
        } else {
            this.sprite.setVelocityY(0);
        }

        if (this.keys.left.isDown) {
            animationKey = "playerWalkLeft";
            this.lastDirection = "left";
            this.sprite.setVelocityX(-this.moveSpeed);
        } else if (this.keys.right.isDown) {
            animationKey = "playerWalkRight";
            this.lastDirection = "right";
            this.sprite.setVelocityX(this.moveSpeed);
        } else {
            this.sprite.setVelocityX(0);
        }

        /**
         * keepKeyDown=空の状態かつキーのisDownを検知した時が、押し始めということ。
         */
        let moveKeyDown =
            this.keys.top.isDown || this.keys.down.isDown || this.keys.left.isDown || this.keys.right.isDown;
        if (moveKeyDown) {
            if (!this.keepKeyDown || this.keepKeyDown != this.lastDirection) {
                startKeyDown = true;
            }
            this.keepKeyDown = this.lastDirection;
        } else {
            this.keepKeyDown = "";
        }
        console.log("startKeyDown", startKeyDown);
        console.log("keepKeyDown", this.keepKeyDown);
        console.log("lastDirection", this.lastDirection);

        if (!startKeyDown && this.sprite.body.velocity.length() > 0) {
            return;
        }

        if (this.lastDirection && !animationKey && this.sprite.body.velocity.length() == 0) {
            if (this.lastDirection == "top") {
                animationKey = "playerIdleBack";
            } else if (this.lastDirection == "down") {
                animationKey = "playerIdle";
            } else if (this.lastDirection == "left") {
                animationKey = "playerIdleLeft";
            } else if (this.lastDirection == "right") {
                animationKey = "playerIdleRight";
            }
            this.lastDirection = "";
        }

        console.log("animationKey", animationKey);

        if (animationKey) {
            this.sprite.anims.play(animationKey);
        }
    }
}
