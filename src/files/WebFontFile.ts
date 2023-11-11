import "phaser";
import WebFontLoader = require("webfontloader");

export default class WebFontFile extends Phaser.Loader.File {
    fontNames: Array<string>;
    service: string;

    constructor(loader: Phaser.Loader.LoaderPlugin, fontNames: Array<string> | string, service: string = "google") {
        super(loader, {
            type: "webfont",
            key: fontNames.toString(),
        });

        this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
        this.service = service;
    }

    load() {
        const config = {
            active: () => {
                this.loader.nextFile(this, true);
            },
        };

        switch (this.service) {
            case "google":
                config["google"] = {
                    families: this.fontNames,
                };
                break;

            default:
                throw new Error("Unsupported font service");
        }

        WebFontLoader.load(config);
    }
}
