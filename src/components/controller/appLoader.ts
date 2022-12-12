import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: '853f1c001efb4bb590ba6be9b7c65203', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
