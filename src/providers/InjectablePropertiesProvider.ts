
export interface IPropertyOptions {
    optional?: boolean
    isValid?: {(value: any): boolean}
}

export interface IPropertyDescription {
    injectableClass: Function;
    name: PropertyKey
    options: IPropertyOptions
}

export type InjectablePropertiesMetadataType = Map<PropertyKey, IPropertyDescription>;

const constructorPropertiesStorage = new Map<Function, InjectablePropertiesMetadataType>();

export class InjectablePropertiesProvider {
    static get(constructor: Function): InjectablePropertiesMetadataType | undefined {
        return constructorPropertiesStorage.get(constructor);
    }

    static set(constructor: Function, property: PropertyKey, options: IPropertyOptions) {
        let properties = constructorPropertiesStorage.get(constructor);

        if (!properties) {
            // This class has not been added yet. Try to get all inherited properties.
            properties = new Map();

            const parentClass = Object.getPrototypeOf(constructor.prototype).constructor;
            const parentProperties = constructorPropertiesStorage.get(parentClass);
            if (parentProperties) {
                for (const [name, parentProperty] of parentProperties.entries())
                    if (!properties.has(name)) {
                        properties.set(name, parentProperty);
                    }
            }

            constructorPropertiesStorage.set(constructor, properties);
        }

        properties.set(property, {
            injectableClass: constructor,
            name: property,
            options
        });
    }
}
