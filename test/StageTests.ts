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
        this.pathHelper = new PathHelper(process.cwd(), `${process.cwd()}${Path.sep}node_modules${Path.sep}sn-client-js`, `${process.cwd()}${Path.sep}node_modules${Path.sep}sn-client-cli`);
        this.stage = new Stage(this.pathHelper);
    }

    @test
    public 'Should have a proper temp folder path'() {
        expect(this.stage.TempFolderPath).to.be.eq(Path.join(this.pathHelper.SnClientPath, 'tmp'));
    }

    @test
    public 'Prepare Should return an awaitable promise'() {
        const promise = this.stage.PrepareAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test
    public 'InitializeConfigAsync Should return an awaitable promise'() {
        const promise = this.stage.InitializeConfigAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test
    public 'UpdateModule Should return an awaitable promise'() {
        const promise = this.stage.UpdateModuleAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test
    public async 'CallGulpAsync'() {
        await this.stage.CallGulpRunAsync('', __dirname);
    }

    @test
    public 'CallGulpAsyncError'(done) {
        this.stage.CallGulpRunAsync('badCommand', __dirname).then(
            () => { done('Error expeced'); },
            (err) => { done(); }
        );
    }

}
