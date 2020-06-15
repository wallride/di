import {IPropertyDescription} from "./providers/InjectablePropertiesProvider";

export type InjectableInvalidPropertyType = IPropertyDescription & {value: any};
export type InjectableInvalidPropertiesType = InjectableInvalidPropertyType[];
export type InjectableValidationReportType = true | InjectableInvalidPropertiesType;

export interface IInjectable {
    validate(): InjectableValidationReportType;
}