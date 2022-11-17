import { BaseComponentInterface, ConstructableComponent } from "@/types";

type ComponentType = BaseComponentInterface | null;

/**
 *
 * @public
 * @class BaseController
 *
 */
class BaseController implements BaseComponentInterface {
    private instances: ComponentType[] = [];
    private elements: NodeListOf<HTMLElement>;
    private Component: ConstructableComponent;
    constructor(
        elements: NodeListOf<HTMLElement>,
        component: ConstructableComponent
    ) {
        this.elements = elements;
        this.Component = component;
        this.instances = [];

        this.init();
    }

    init() {
        this.elements.forEach((el) => {
            this.instances.push(new this.Component(el));
        });
    }

    destroy() {
        this.instances.forEach((instance) => {
            instance?.destroy();
            instance = null;
        });
    }
}

/******************************************************************************
 * Export
 *******************************************************************************/
export default BaseController;
