import {IInjectable} from "./Injectable";
import {
    InjectableRequiredPropertiesProvider,
} from "./providers/InjectableRequiredPropertiesProvider";

/**
 * Property decorator in IInjectable classes
 *
 * Usage:
 * class Dependency implements IInjectable {
 *     @required mandatoryProperty: any;
 *     optionalProperty?: any;
 *     ...
 * }
 *
 */
export function required<
    Class extends IInjectable,
    Property extends PropertyKey
>(target: Class, property: Property) {
    InjectableRequiredPropertiesProvider.add(target.constructor, property);
}
