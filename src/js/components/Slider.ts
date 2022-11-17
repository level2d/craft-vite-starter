import { BaseComponentInterface } from "@/types";

class Slider implements BaseComponentInterface {
    element: HTMLElement;
    constructor(el: HTMLElement) {
        this.element = el;
        this.init();
    }

    init() {
        this.element.innerHTML = "I'm a slider";
        console.log("Slider initialized");
    }

    destroy() {
        console.log("Slider destroyed");
    }
}

export default Slider;
