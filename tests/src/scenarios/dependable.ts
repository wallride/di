import {expect} from 'chai'
import {di} from "../lib";

describe('Dependable', ()=>{

    class Dependency implements di.IInjectable {
        @di.property() foo: string;
        @di.property({optional: true}) bar?: string;

        validate(): di.InjectableValidationReportType {return di.injectable.validate(this);}
    }

    class ExtendedDependency extends Dependency{
        @di.property() baz: string;
    }

    @di.Dependable
    class Dependable implements di.IDependable<ExtendedDependency>{
        dependency: ExtendedDependency;
    }

    describe('Simple cases', ()=>{
        it('Inject and get valid dependency', ()=>{
            const dependable = di.inject(
                new Dependable(),
                di.injectable.setProperties(new ExtendedDependency(), {
                    foo: 'abc',
                    baz: 'ext'
                })
            );

            const dependency = dependable.dependency;
        });

    });

    describe('Negative', ()=>{
        it('Inject empty dependency and try to get it (should fail)', ()=>{
            const dependable = di.inject(new Dependable(), new ExtendedDependency());
            try {
                const dependency = dependable.dependency;
            }
            catch (e) {
                console.log(e);
                return;
            }

            throw new Error('Did not fail');
        });
    });
})