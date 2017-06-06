import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Config } from "sn-client-js";

const expect = Chai.expect;

@suite('SnConfig Tests')
export class SnConfigTests {

    @test
    public 'SnConfigFieldModel Should be constructed with SnConfigBehavior.Default'() {
        const fieldModel = new Config.SnConfigFieldModel();
        expect(fieldModel.Behavior).to.be.eq(Config.SnConfigBehavior.Default);
    }

    @test
    public 'SnConfigFieldModelStore Should throw error if entity isn\'t in the store '() {
        const find = () => { Config.SnConfigFieldModelStore.Get('exampleFieldName'); };
        expect(find).to.throw(Error);
    }

    @test
    public 'SnConfigFieldModelStore Should throw an error if you try to add a field that already exists'() {
        const add = () => { Config.SnConfigFieldModelStore.Add({ FieldName: 'Example', Question: 'ExampleQuestion', Behavior: Config.SnConfigBehavior.Default }); };
        add();  // add once
        expect(add).to.throw(Error);
    }

    @test
    public 'GetCommandOptions should return only commands that has AllowFromCommandLine flag'() {
        const commands = Config.SnConfigFieldModelStore.GetCommandOptions();
        commands.forEach((command) => {
            const isAllowed = (command.Behavior & Config.SnConfigBehavior.AllowFromCommandLine) === Config.SnConfigBehavior.AllowFromCommandLine;
            expect(isAllowed).to.eq(true);
        });

    }

}
