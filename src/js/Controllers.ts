/**************************************************************************** *
 * READ THIS BEFORE CHANGING ANYTHING:
 *
 * This file contains the master array of controller instances for the entire app.
 * Controllers are a collection of javascript component instances.
 * Each controller "controls" the template of a CraftCMS block.
 * Think of controllers as the "C" in the MVC model.
 *
 * When pushing a new controller to the master array, you must provide an id,
 * a selector, a controller class, and a component class.
 ***************************************************************************** */
import {
    BaseComponentInterface,
    Constructable,
    ConstructableComponent,
} from "@/types";
import BaseController from "@/controllers/BaseController";
import Slider from "@/js/components/Slider";

// types
type ConstructableBaseController = Constructable<BaseController>;

interface OptionsInterface {
    el?: Document | HTMLElement;
    cb?: Function;
}

interface ControllerInterface {
    id: String;
    elements: NodeListOf<HTMLElement>;
    Component: ConstructableComponent;
    Controller: ConstructableBaseController;
    instance: BaseController | null;
}

/**
 *
 * @public
 * @global
 * @class Controllers
 * @classdesc Handle controller functions.
 * @param {object} options Required config
 *
 */
class Controllers implements BaseComponentInterface {
    // properties
    element: Document | HTMLElement = document.documentElement;
    callback: Function = () => {};
    controllers: ControllerInterface[] = [];

    constructor(options: OptionsInterface) {
        this.element = options.el ?? this.element;
        this.callback = options.cb ?? this.callback;
    }

    private clean() {
        this.controllers = [];
    }

    private push(
        id: ControllerInterface["id"],
        elements: ControllerInterface["elements"],
        controller: ControllerInterface["Controller"],
        component: ControllerInterface["Component"]
    ) {
        this.controllers.push({
            id,
            elements,
            instance: null,
            Controller: controller,
            Component: component,
        });
    }

    init() {
        this.controllers.forEach((controller) => {
            if (controller.elements.length) {
                controller.instance = new controller.Controller(
                    controller.elements,
                    controller.Component
                );
            }
        });
    }

    kill() {
        this.controllers.forEach((controller) => {
            if (controller.instance) {
                controller.instance.destroy();
            }
        });

        this.clean();
    }

    exec() {
        this.clean();

        //  example for setting up a controller for slider components
        this.push(
            "slider",
            this.element.querySelectorAll(".js-slider"),
            BaseController,
            Slider
        );

        this.init();
    }

    destroy() {
        this.kill();
    }
}

/******************************************************************************
 * Export
 *******************************************************************************/
export default Controllers;
