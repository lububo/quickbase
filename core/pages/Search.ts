import { Selector, t } from "testcafe";
import {clickSelector} from "../shared/Navigate";

export default class Search{
    readonly input: Selector;
    readonly searchList: Selector;
    readonly favourite: Selector;
    readonly deleteFromRecent: Selector;
    readonly deleteFromFavouritea: Selector;
    readonly favouritesList: Selector;
    readonly recentList: Selector;
    readonly footer: Selector;
    readonly resetSearch: Selector;

    constructor(){
        this.input = Selector('#docsearch-input')
        this.searchList = Selector('#docsearch-list')
        this.favourite = Selector('.DocSearch-Hit-action-button[title="Save this search"]')
        this.deleteFromRecent = Selector('.DocSearch-Hit-action-button[title="Remove this search from history"]')
        this.deleteFromFavouritea = Selector('.DocSearch-Hit-action-button[title="Remove this search from favorites"]')
        this.favouritesList = Selector('#docsearch-list').withExactText('Favourites')
        this.recentList = Selector('#docsearch-list').withExactText('Recent')
        this.footer = Selector('.DocSearch-Footer')
        this.resetSearch = Selector('.DocSearch-Reset')
    }

    verifyFooterLogo(){
        return t
        .expect(this.footer.find('.DocSearch-Logo a').getAttribute('href')).eql('https://www.algolia.com/docsearch')
        .expect(this.footer.find('.DocSearch-Logo a span').textContent).eql('Search by')
    }

    verifyFooterCommands(){

    }

    clearSearch(){
        clickSelector(this.resetSearch)
    }

    async removeAllSearchesFrom(selector: Selector){
        const countSearches = await selector.count
        while(countSearches){
            t.click(selector)
        }        
    }


}