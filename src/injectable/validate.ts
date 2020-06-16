import {IInjectable, InjectableInvalidPropertiesType, InjectableValidationReportType} from "../Injectable";
import {InjectableRequiredPropertiesProvider} from "../providers/InjectableRequiredPropertiesProvider";

export function validate(injectable: IInjectable): InjectableValidationReportType {
    const requiredProperties = InjectableRequiredPropertiesProvider.get(injectable.constructor);
    if (!requiredProperties?.size) return true;

    const report: InjectableInvalidPropertiesType = [];

    for (const [name, definedIn] of requiredProperties.entries()) {
        const value = injectable[name];
        if (value === undefined) {
            report.push({name, value, definedIn})
        };
    }

    return report.length ? report : true;
}