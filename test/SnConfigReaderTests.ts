import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigModel } from '../src/utils/snconfig/snconfigmodel';
import { SnConfigReader } from '../src/utils/snconfig/snconfigreader';

const expect = Chai.expect;

@suite('SnConfigReader tests')
export class SnConfigReaderTests {

    private reader: SnConfigReader;
    public before() {
        this.reader = new SnConfigReader(process.cwd());
    }

    @test('ReadConfigFile should return an awaitable promise')
    public Read() {
        const promise = this.reader.ReadConfigFile();
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test('Should create a new config if not exists')
    public async ReadNonExisting() {
        const cfg = await this.reader.ReadConfigFile('invalidConfig.js');
        expect(this.reader.Config).to.be.instanceof(SnConfigModel);
    }

    @test('ValidateAsync should return an awaitable promise')
    public ValidatePromise() {
        const promise = this.reader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test('Shouldn resolve when all fields are provided')
    public async ValidateResolve() {
        this.reader.Config = {
            RepositoryUrl: 'url',
            UserName: 'username',
            Password: 'password',
        };
        const cfg = await this.reader.ValidateAsync('RepositoryUrl');
        expect(cfg.RepositoryUrl).to.be.eq('url');
    }

    @test('Should throw an error if a field is provided but disallowed form config by behavior')
    public ValidateShouldThrowWhenNotAllowed(done) {
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

    @test('OverrideConfig should override provided value')
    public OverrideConfigTest() {

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
