import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import * as Prompt from 'prompt';
import { Ask } from '../src/utils/ask';

const expect = Chai.expect;

@suite('Ask Tests')
export class AskTests {

    @test('should return an awaitable Promise')
    public TextAsync() {
        const promise = Ask.TextAsync('Text');
        expect(promise).to.be.instanceOf(Promise, 'Should return a promise');
    }

    @test('resolve with std in')
    public TextStdIn(done) {
        Prompt.override = {
            Text: 'alma'
        };
        Ask.TextAsync('Text').then((result) => {
            expect(result).to.be.eq('alma');
            done();
        });
    }

    @test('should return an awaitable Promise')
    public PasswordAsync() {
        const promise = Ask.PasswordAsync('Password');
        expect(promise).to.be.an.instanceOf(Promise);
    }

    @test('should create Prompt question from config field name')
    public createQuestionFromConfig() {
        const q = Ask.createPromptQuestionFromConfigName('RepositoryUrl');
        expect(q.name).to.be.eq('RepositoryUrl');
    }

    @test('should return an awaitable Promise')
    public MissingConfigs() {
        const promise = Ask.MissingConfigs();
        expect(promise).to.be.an.instanceOf(Promise);
    }
}