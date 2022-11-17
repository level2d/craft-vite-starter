export interface Constructable<T> {
    new (...args: any): T;
}

export interface BaseComponentInterface {
    init(): void;
    destroy(): void;
}

export type ConstructableComponent = Constructable<BaseComponentInterface>;