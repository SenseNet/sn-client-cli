import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import * as Path from 'path';
import { PathHelper } from "../src/utils/pathhelper";
import { Stage } from '../src/utils/stage';

const expect = Chai.expect;

@suite('Stage tests')
export class StageTests {

    private stage: Stage;
    private pathHelper: PathHelper;

    public before() {
        this.pathHelper = new PathHelper('c:/temp/snclienttest', 'c:/temp/snclienttest/node_modules/sn-client-js');
        this.stage = new Stage(this.pathHelper);
    }

    @test('Should have a proper temp folder path')
    public TempFolderPath() {
        expect(this.stage.TempFolderPath).to.be.eq(Path.join(this.pathHelper.SnClientPath, 'tmp'));
    }

    @test('Prepare Should return an awaitable promise')
    public PreparePromise() {
        const promise = this.stage.PrepareAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test('Compile Should return an awaitable promise')
    public CompilePromise() {
        const promise = this.stage.CompileAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test('UpdateModule Should return an awaitable promise')
    public UpdatePromise() {
        const promise = this.stage.UpdateModuleAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test('CallGulpAsync')
    public async CallGulpAsync() {
        await this.stage.CallGulpRunAsync('@echo test', __dirname);
    }

    @test('CallGulpAsyncError')
    public CallGulpAsyncError(done) {
        this.stage.CallGulpRunAsync('badCommand', __dirname).then(
            () => { done('Error expeced'); },
            (err) => { done(); }
        );
    }

}
