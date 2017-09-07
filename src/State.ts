import * as fs from 'fs';

export default class State {
    lastRun: string;
    maxMessageID: {[key: string]: number};

    constructor() {
        if(fs.existsSync('./state.json')) {
            let load = require('../state.json');
            this.maxMessageID = load.maxMessageID || {};
        } else {
            this.maxMessageID = {};
        }
    }

    getMaxMessageID(keyID: string): number {
        return this.maxMessageID[keyID] || 0;
    }

    setMaxMessageID(keyID: string, maxID: number): void {
        this.maxMessageID[keyID] = maxID;
    }

    async save() {
        await this.writeFile('./state.json', JSON.stringify(this));
    }

    private async writeFile(fileName: string, content: string) {
        return new Promise((resolve, reject) => 
            fs.writeFile(fileName, content, (err) => err ? reject(err) : resolve())
        );
    }
}