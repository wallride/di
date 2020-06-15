import {IInjectable} from "./Injectable";
import {
    InjectablePropertiesProvider,
    IPropertyOptions
} from "./providers/InjectablePropertiesProvider";

export {IPropertyOptions}

/**
 * Property decorator in IInjectable classes
 *
 * Usage:
 * class Dependency implements IInjectable {
 *     @property() key: Buffer;
 *     @property({optional: true}) optionalKey?: Buffer;
 *     ...
 * }
 *
 */
export function property<
    Class extends IInjectable,
    Property extends PropertyKey
>(options: IPropertyOptions = {}) {
    return (target: Class, property: Property) => {
        InjectablePropertiesProvider.set(target.constructor, property, options);
    }
}
