import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import * as Prompt from 'prompt';
import { Ask } from '../src/utils/ask';

const expect = Chai.expect;

@suite('Ask Tests')
export class AskTests {

    @test
    public 'Ask Text should return an awaitable Promise'() {
        const promise = Ask.TextAsync('Text');
        expect(promise).to.be.instanceOf(Promise, 'Should return a promise');
    }

    @test
    public 'Ask text, resolve with override'(done) {
        Prompt.override = {
            Text: 'alma'
        };
        Ask.TextAsync('Text').then((result) => {
            expect(result).to.be.eq('alma');
            done();
        });
    }

    @test
    public 'Ask password, resolve with override'(done) {
        Prompt.override = {
            Text: 'alma'
        };
        Ask.PasswordAsync('Text').then((result) => {
            expect(result).to.be.eq('alma');
            done();
        });
    }

    @test
    public 'Ask Password should return an awaitable Promise'() {
        const promise = Ask.PasswordAsync('Password');
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test
    public 'should create Prompt question from config field name'() {
        const q = Ask.createPromptQuestionFromConfigName('SnConfigModel.RepositoryUrl');
        expect(q.name).to.be.eq('RepositoryUrl');
    }

    @test
    public 'should return an awaitable Promise'() {
        const promise = Ask.MissingConfigs();
        expect(promise).to.be.an.instanceOf(Promise);
    }
}
