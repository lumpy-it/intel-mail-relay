import { Client, cache } from 'eveonlinejs';

export default class AsyncAPI {
    api: Client;

    constructor(keyID: string, vCode: string, characterID: string) {
        this.api = new Client();
        this.api.setCache(new cache.FileCache());
        this.api.setParams({
            keyID,
            vCode,
            characterID
        });
    }

    async fetch(endpoint: string, params={}) {
        return new Promise((resolve, reject) => {
            this.api.fetch(endpoint,params, (err: any, result: any) => {
                if(err)
                    reject(err);
                else
                    resolve(result);
            });
        });
    }
}

