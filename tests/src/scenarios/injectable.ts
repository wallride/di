import {expect} from 'chai'
import {di} from "../lib";
import property = di.property;

describe('Injectable', ()=>{

    class Injectable implements di.IInjectable {
        @property() string: string;
        @property() buffer: Buffer;
        @property({optional: true}) number?: number;
        @property({optional: true}) boolean?: boolean;

        validate(): di.InjectableValidationReportType {return di.injectable.validate(this);}
    }

    class ExtendedInjectable extends Injectable{
        @property() extended: number;
    }

    describe('Simple cases', ()=>{
        let injectable: Injectable;
        it('Make Injectable instance and fulfill without optional', ()=>{
            injectable = new Injectable();
            di.injectable.setProperties(injectable, {
                buffer: Buffer.from('123'),
                string: 'abc'
            })

            expect(injectable.buffer.toString()).to.eq('123', 'buffer');
            expect(injectable.string).to.eq('abc', 'string');
        });

        it('Validate', ()=>{
            const result = injectable.validate();
            expect(result).to.eq(true);
        })
    });

    describe('Negative', ()=>{
        it('Should be invalid on incomplete fulfill', ()=>{
            const injectable = new Injectable();
            const validationResult = injectable.validate();
            if (validationResult === true) throw new Error('Validation passed (it should not)');

            expect(validationResult.length).to.eq(2, 'invalid properties length');
        });

        it('Should be invalid even with inherited properties', ()=>{
            const injectable = new ExtendedInjectable();

            di.injectable.setProperties(injectable, {
                buffer: Buffer.from('123'),
                extended: 123
            })
            const validationResult = injectable.validate();
            if (validationResult === true) throw new Error('Validation passed (it should not)');
            expect(validationResult.length).to.eq(1, 'invalid properties length');
            expect(validationResult[0].name).to.eq('string', 'invalid property');

        });

    });
})