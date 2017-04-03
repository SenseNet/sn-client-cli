"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
/**
 * This class represents a Download from a specified Sense/Net Repository
 */
class Download {
    /**
     * @constructs Download
     * @param host {string} The hostname for the specified Sense/Net repository
     * @param path {string} The path to the download
     */
    constructor(host, path) {
        this.host = host;
        this.path = path;
        /**
         * The request headers to be send
         */
        this.headers = {};
    }
    /**
     * Sets up the Basic Authentication headers
     * @param username {string} The username for the authentication
     * @param password {string} The password for the authentication
     */
    Authenticate(username, password) {
        const auth = 'Basic ' + new Buffer(`${username}:${password}`).toString('base64');
        this.headers.Authorization = auth;
        return this;
    }
    /**
     * Executes the download request, flatterns the data into a simple in-memory buffer
     * @returns {Promise<Buffer>} An awaitable promise with the in-memory buffer
     */
    GetAsBufferAsync() {
        return new Promise((resolve, reject) => {
            Http.get({
                headers: this.headers,
                host: this.host,
                path: this.path,
            }, (response) => {
                const data = [];
                const contentLength = parseInt(response.headers['content-length'], 0);
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
            });
        });
    }
}
exports.Download = Download;
//# sourceMappingURL=download.js.map