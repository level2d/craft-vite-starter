import "@/main.scss";

import { BaseComponentInterface } from "./types";

import header from "@/modules/header";
import Controllers from "@/Controllers";
import Emitter from "@/Emitter";

class App {
    // properties
    header: BaseComponentInterface = header;
    controllers: Controllers = new Controllers({
        el: document.documentElement,
    });
    emitter: Emitter = new Emitter();

    constructor() {
        this.init();
    }

    private bind() {
        this.emitter.on("app--initialized", (message) => {
            console.log(message);
        });
    }

    init() {
        this.bind();

        // start modules/controllers
        this.header.init();
        this.controllers.exec();

        this.emitter.fire("app--initialized", "App initialized");
    }
}

// expose
window.app = new App();
