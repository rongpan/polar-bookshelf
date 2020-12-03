import handler from '../src/server';
import PORT from '../src/server';
import { createServer } from 'http';
import * as http from 'http';
import * as cheerio from 'cheerio';
import { assert } from 'console';

describe('components', function () {
    it('content', async function () {

        const server = createServer(handler).listen(PORT, () => {
            console.log(`Listening on ${PORT}...`);
        });

        function someAsyncFunc() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({data: 1});
                }, 1000);
            });
        }

        // wait for server
        await someAsyncFunc();

        let data = '';

        // function returns a Promise
        function getPromise() {
            return new Promise((resolve, reject) => {
                http.get('http://localhost:3007/', response => {
                    response.on('data', fragments => {
                        data += fragments;
                    });

                    response.on('end', () => {
                        resolve(data);
                    });

                    response.on('error', error => {
                        reject(error);
                    });
                });
            });
        }

        // async function to make http request
        async function makeSynchronousRequest() {
            try {
                let http_promise = getPromise();
                let response_body = await http_promise;

                // holds response from server that is passed when Promise is resolved
                console.log(response_body);
            } catch (error) {
                // Promise rejected
                console.log(error);
            }
        }

        await makeSynchronousRequest();
        //console.log(data);

        const $ = cheerio.load(data);
        var paragraph = $('#home').html();
        console.log(paragraph);

        assert(paragraph === 'Home')
        server.close()
    });
});
