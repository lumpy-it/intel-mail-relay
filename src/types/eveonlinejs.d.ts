

export class Client {
    constructor(options?: object);

    clearParams(): void;

    fetch(path: any, params: any, cb: any): any;

    getCache(): any;

    getCacheKey(urlObj: any): any;

    getInterface(): string;

    getParam(param: string): string;

    getParams(): any;

    getPathName(path: any): any;

    getRequestUrl(path: any, params: any): any;

    getUrl(returnUrlObj: any): any;

    parse(xml: any, cb: any): any;

    setCache(cache: any): void;

    setInterface(ipStr: string): void;

    setParam(param: string, value: string): void;

    setParams(params: object): void;

    setUrl(urlStr: any): any;

}

export namespace cache {
    class Cache {
        constructor();

        getCurrentTime(): any;

    }

    class FileCache extends Cache {
        constructor(options?: any);

        clear(cb: any): any;

        getFilePath(key: any): any;

        getPath(): any;

        getPrefix(): any;

        makeDirs(dir: any, cb: any): any;

        read(key: any, cb: any): any;

        setPath(p: any): void;

        setPrefix(prefix: any): void;

        write(key: any, value: any, duration: any, cb: any): any;

    }

    class MemoryCache extends Cache {
        constructor();

        read(key: any, cb: any): void;

        write(key: any, value: any, duration: any, cb: any): void;

    }
}