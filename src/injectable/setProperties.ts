import {IInjectable} from "../Injectable";

export type InjectableSetPropertiesType<I extends IInjectable> = {[key in keyof I]?: I[key] extends Function ? never : key extends 'validate' ? never : I[key]};

export function setProperties<I extends IInjectable>(injectable: I, properties: InjectableSetPropertiesType<I>): I {
    for (const key in properties) {
        const value = properties[key];

        if (value !== undefined) injectable[key] = value;
    }

    return injectable;
}