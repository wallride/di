export type InjectableRequiredPropertiesType = Map<PropertyKey, Function>;

const constructorPropertiesStorage = new Map<Function, InjectableRequiredPropertiesType>();

export class InjectableRequiredPropertiesProvider {
    static get(constructor: Function): InjectableRequiredPropertiesType | undefined {
        return constructorPropertiesStorage.get(constructor);
    }

    static add(constructor: Function, property: PropertyKey) {
        let properties = constructorPropertiesStorage.get(constructor);

        if (!properties) {
            // This class has not been added yet. Try to get all inherited properties.
            properties = new Map();

            const parentClass = Object.getPrototypeOf(constructor.prototype).constructor;
            const parentProperties = constructorPropertiesStorage.get(parentClass);
            if (parentProperties) {
                for (const [name, parentClass] of parentProperties.entries())
                    if (!properties.has(name)) {
                        properties.set(name, parentClass);
                    }
            }

            constructorPropertiesStorage.set(constructor, properties);
        }

        properties.set(property, constructor);
    }
}
