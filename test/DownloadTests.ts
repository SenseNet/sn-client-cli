import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Download } from '../src/utils/download';

const expect = Chai.expect;

@suite('Download tests')
export class DownloadTests {
    private download: Download;
    public before() {
        this.download = new Download('demo.sensenet.com', 'index.html');

    }

    @test('Shouldn\'t have custom headers by default')
    public EmptyHeaders() {
        expect(Object.keys(this.download['headers']).length).to.be.eq(0);

    }

    @test('Should have a proper base64 encoded Basic Authorization header after setting up Authenticate')
    public BasicAuthHeaders() {
        this.download.Authenticate('username', 'password');
        expect(this.download['headers']['Authorization']).to.be.eq('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
    }

    @test('Should return the file as awaitable Promise on GetAsBufferAsync')
    public GetAsBufferAsync() {
        const buffer = this.download.GetAsBufferAsync();
        expect(buffer).to.be.an.instanceOf(Promise);
    }
}
