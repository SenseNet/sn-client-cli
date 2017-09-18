import * as Http from 'http';
import * as URL from 'url';

/**
 * This class represents a Download from a specified Sense/Net Repository
 */
export class Download {

    /**
     * @constructs Download
     * @param host {string} The hostname for the specified Sense/Net repository
     * @param path {string} The path to the download
     */
    constructor(private host: string, private path: string) {
    }

    /**
     * The request headers to be send
     */
    private headers: any = {};

    /**
     * Sets up the Basic Authentication headers
     * @param username {string} The username for the authentication
     * @param password {string} The password for the authentication
     */
    public Authenticate(username: string, password: string): Download {
        const auth = 'Basic ' + new Buffer(`${username}:${password}`).toString('base64');
        this.headers.Authorization = auth;
        return this;
    }

    public HandleResponse(response: Http.IncomingMessage, resolve: (Buffer) => void) {
        const data = [];
        const contentLength: number = parseInt(response.headers['content-length'].toString(), 0);
        response.on('data', (chunk) => {
            data.push(chunk);
        });

        response.on('end', () => {
            let pos = 0;
            const buffer = new Buffer(contentLength);
            data.forEach((chunk) => {
                chunk.copy(buffer, pos);
                pos += chunk.length;
            });
            resolve(buffer);
        });
    }

    /**
     * Executes the download request, flatterns the data into a simple in-memory buffer
     * @returns {Promise<Buffer>} An awaitable promise with the in-memory buffer
     */
    public async GetAsBufferAsync(): Promise<Buffer> {
        return new Promise<Buffer>((resolve) => {
            const url = URL.parse(this.host);
            Http.get({
                protocol: url.protocol,
                headers: this.headers,
                host: url.host || url.path,
                path: this.path,
            }, (response: Http.IncomingMessage) => this.HandleResponse(response, resolve));
        });
    }
}
