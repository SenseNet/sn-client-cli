import * as Chai from 'chai';
import * as Events from 'events';
import * as Http from 'http';
import { suite, test } from 'mocha-typescript';
import { Download } from '../src/utils/download';

const expect = Chai.expect;

@suite('Download tests')
export class DownloadTests {
    private download: Download;
    public before() {
        this.download = new Download('demo.sensenet.com', 'index.html');

    }

    @test
    public 'Shouldn\'t have custom headers by default'() {
        expect(Object.keys(this.download['headers']).length).to.be.eq(0);

    }

    @test
    public 'Should have a proper base64 encoded Basic Authorization header after setting up Authenticate'() {
        this.download.Authenticate('username', 'password');
        expect(this.download['headers']['Authorization']).to.be.eq('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
    }

    @test
    public 'Should return the file as awaitable Promise on GetAsBufferAsync'() {
        const buffer = this.download.GetAsBufferAsync();
        expect(buffer).to.be.an.instanceOf(Promise);
    }

    @test
    public 'HandleResponse'(done) {
        const httpMsg: Http.IncomingMessage = new Events.EventEmitter() as Http.IncomingMessage;
        httpMsg.headers = {
            'content-length' : 3
        } as any;
        const resolve = (bf: Buffer) => {
            expect(bf.toString()).to.be.eq('aaa');
            done();
        };
        this.download.HandleResponse(httpMsg, resolve.bind(this));
        const buf = Buffer.from('aaa');
        httpMsg.emit('data', buf);
        httpMsg.emit('end');
    }
}
