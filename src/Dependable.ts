import {IInjectable, InjectableInvalidPropertyType} from "./Injectable";


export interface IDependable<Dependency extends IInjectable> {
    dependency: Dependency
}

export function Dependable<Dependency extends IInjectable, Class extends {new(...args:any[]): IDependable<Dependency>}>(
    target: Class,
) {
    let dependency: Dependency; // dependency value storage;

    // property getter
    const getter = function() {
        if (dependency === undefined) throw new Error('No dependency object');
        const validation = dependency.validate();
        if (validation !== true) throw new Error(`Dependency ${dependency.constructor.name} validation error at class ${target.name}. \nMissing properties: \n${validation.map(prop => ` - ${prop.name.toString()} (defined in ${prop.definedIn.name})`).join('\n')}`);

        return dependency;
    };

    // property setter
    const setter = function(value: Dependency) {
        dependency = value;
    };

    // Delete original property.
    delete target.prototype.dependency
    // Create new property with getter and setter
    Object.defineProperty(target.prototype, 'dependency', {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

export function inject<Dependency extends IInjectable, T extends IDependable<Dependency>>(target: T, dependency: Dependency): T {
    target.dependency = dependency;
    return target;
}
