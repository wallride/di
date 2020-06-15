import {IInjectable, InjectableInvalidPropertiesType, InjectableValidationReportType} from "../Injectable";
import {InjectablePropertiesProvider} from "../providers/InjectablePropertiesProvider";

export function validate(injectable: IInjectable): InjectableValidationReportType {
    const properties = InjectablePropertiesProvider.get(injectable.constructor);
    if (!properties) throw new Error(`No properties defined for class "${injectable?.constructor.name}"`);

    const report: InjectableInvalidPropertiesType = [];

    for (const [name, property] of properties.entries()) {
        const value = injectable[name];
        if (value === undefined && !property.options.optional) {
            report.push({...property, value})
        };
        const propertyResult = property.options.isValid
            ? property.options.isValid(value)
            : true;

        if (!propertyResult)
            report.push({...property, value});
    }

    return report.length ? report : true;
}