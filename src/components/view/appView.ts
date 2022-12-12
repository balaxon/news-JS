import News, { NewsSources } from './news/news';
import Sources, { ResSources } from './sources/sources';

export interface drawNews {
    articles: Array<NewsSources>;
    status: string;
    totalResults: number;
}

export interface drawSources {
    sources: Array<ResSources>;
    status: string;
}

export class AppView {
    private news;
    private sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }
    drawNews(data: drawNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: drawSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
