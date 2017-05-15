import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnCliConfigModel } from '../src/utils/snconfig/snconfigmodel';
import { SnConfigReader } from '../src/utils/snconfig/snconfigreader';

const expect = Chai.expect;

@suite('SnConfigReader tests')
export class SnConfigReaderTests {

    private reader: SnConfigReader<SnCliConfigModel>;
    public before() {
        this.reader = new SnConfigReader(SnCliConfigModel, process.cwd());
    }

    @test
    public 'ReadConfigFile should return an awaitable promise'() {
        const promise = this.reader.ReadConfigFile();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test
    public async 'Should create a new config if not exists'() {
        await this.reader.ReadConfigFile('invalidConfig.js');
        expect(this.reader.Config).to.be.instanceof(SnCliConfigModel);
    }

    @test
    public 'ValidateAsync should return an awaitable promise'() {
        const promise = this.reader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test
    public async 'Shouldn resolve when all fields are provided'() {
        this.reader.Config = {
            RepositoryUrl: 'url',
            UserName: 'username',
            Password: 'password',
        };
        const cfg = await this.reader.ValidateAsync('RepositoryUrl');
        expect(cfg.RepositoryUrl).to.be.eq('url');
    }

    @test
    public 'Should throw an error if a field is provided but disallowed form config by behavior'(done) {
        this.reader.Config = {
            RepositoryUrl: '',
            UserName: 'user',
            Password: 'password',
        };
        this.reader.ValidateAsync('Password')
            .then(() => {
                done('Exception expcected');
            })
            .catch(() => done());
    }

    @test
    public 'OverrideConfig should override provided value'() {

        this.reader.Config = {
            RepositoryUrl: 'url',
            UserName: 'username',
            Password: 'password',
        };

        expect(this.reader.Config.RepositoryUrl).to.be.eq('url');
        this.reader.OverrideConfig({
            RepositoryUrl: 'localhost'
        });
        expect(this.reader.Config.RepositoryUrl).to.be.eq('localhost');
    }
}
