import { Constructable } from "./types";
import EventEmitter from "events";

/**
 * @class Emitter
 * @see https://nodejs.org/docs/latest-v11.x/api/events.html
 * @desc Wrapper for nodejs EventEmitter
 */
class Emitter extends EventEmitter {
    fire: Function; // alias for `emit()`
    constructor() {
        super();

        this.fire = this.emit;
    }
}

export default Emitter;
export type ConstructableEmitter = Constructable<Emitter>;
