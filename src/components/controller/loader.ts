import { drawNews, drawSources } from '../view/appView';

type CallbackdrawNews = (data: drawNews) => void;
type CallbackdrawSources = (data: drawSources) => void;

interface getres {
    endpoint: string;
    options?: object;
}

interface loadsrc extends RequestInit {
    endpoint: string;
    callback: CallbackdrawSources;
    options: object;
}

interface loadnews extends RequestInit {
    endpoint: string;
    callback: CallbackdrawNews;
    options: object;
}

interface urlOptions {
    [index: string]: string;
}

enum er {
    errsite = 401,
    notfound = 404,
}

class Loader {
    private readonly baseLink: string;
    public options: object;

    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: getres,
        callback = (data: drawSources) => {
            console.error('No callback for GET response', data);
        }
    ) {
        //const method: string;
        const method = 'GET';
        this.load({ method, endpoint, callback, options });
    }

    getArticles(
        { endpoint, options = {} }: getres,
        callback = (data: drawNews) => {
            console.error('No callback for GET response', data);
        }
    ) {
        //const method: string;
        const method = 'GET';
        this.loadnews({ method, endpoint, callback, options });
    }

    errorHandler<Type>(res: Response): Response {
        if (!res.ok) {
            if (res.status === er.errsite || res.status === er.notfound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object | null, endpoint: string) {
        const urlOptions: urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    loadnews({ method, endpoint, callback, options = {} }: loadnews) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: drawNews) => callback(data))
            .catch((err) => console.error(err));
    }

    load({ method, endpoint, callback, options = {} }: loadsrc) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
