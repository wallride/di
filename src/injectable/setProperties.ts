import {IInjectable} from "../Injectable";

export type InjectableSetOptionsType<I> = {[key in keyof I]?: I[key] extends Function ? never : I[key]};

export function setProperties<I extends IInjectable>(injectable: I, properties: InjectableSetOptionsType<I>): I {
    for (const key in properties) {
        const value = properties[key];

        if (value !== undefined) injectable[key] = value;
    }

    return injectable;
}