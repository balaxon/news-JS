import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '853f1c001efb4bb590ba6be9b7c65203', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
