
export type InjectableInvalidPropertyType = {name: PropertyKey, value: any, definedIn: Function};
export type InjectableInvalidPropertiesType = InjectableInvalidPropertyType[];
export type InjectableValidationReportType = true | InjectableInvalidPropertiesType;

export interface IInjectable {
    validate(): InjectableValidationReportType;
}