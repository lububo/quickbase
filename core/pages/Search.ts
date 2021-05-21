import { Selector, t } from "testcafe";
import {clickSelector} from "../shared/Navigate";

export default class Search{
    readonly input: Selector;
    readonly searchList: Selector;
    readonly favourite: Selector;
    readonly deleteFromRecent: Selector;
    readonly deleteFromFavouritea: Selector;
    readonly favouritesSearchList: Selector;
    readonly recentSearchList: Selector;
    readonly header: Selector;
    readonly body: Selector;
    readonly footer: Selector;
    readonly footerCommands: Selector;
    readonly clearSearchInput: Selector;
    readonly noResultsPage: Selector;

    constructor(){
        this.input = Selector('#docsearch-input')
        this.searchList = Selector('#docsearch-list')
        this.favourite = Selector('.DocSearch-Hit-action-button[title="Save this search"]')
        this.deleteFromRecent = Selector('.DocSearch-Hit-action-button[title="Remove this search from history"]')
        this.deleteFromFavouritea = Selector('.DocSearch-Hit-action-button[title="Remove this search from favorites"]')
        this.favouritesSearchList = Selector('.DocSearch-Hit-source').withExactText('Favourites').nextSibling('#docsearch-list')
        this.recentSearchList = Selector('.DocSearch-Hit-source').withExactText('Recent').nextSibling('#docsearch-list')
        this.header = Selector('.DocSearch-SearchBar')
        this.body = Selector('.DocSearch-StartScreen')
        this.footer = Selector('.DocSearch-Footer')
        this.footerCommands = this.footer.child('ul.DocSearch-Commands');
        this.clearSearchInput = Selector('.DocSearch-Reset')
        this.noResultsPage = Selector('.DocSearch-NoResults')
    }

    verifyHeader(){
        return t
                .expect(this.header.find('#docsearch-label').exists).ok()
                .expect(this.header.find('input.DocSearch-Input').exists).ok()
                .expect(this.header.find('input#docsearch-input').getAttribute('placeholder')).eql('Search docs')
    }

    verifyEmptyBody(){
        return t
              .expect(this.body.child('p.DocSearch-Help').textContent).eql('No recent searches')
    }

    verifyFooterLogo(){
        return t
                .expect(this.footer.find('.DocSearch-Logo a').getAttribute('href')).eql('https://www.algolia.com/docsearch')
                .expect(this.footer.find('.DocSearch-Logo a span').textContent).eql('Search by')
    }

    verifySearchHitButtons(){
        const firstRecentSearchItem = this.recentSearchList.find('li').nth(0)
        return t
                .expect(firstRecentSearchItem.find('.DocSearch-Hit-icon').exists).ok()
                .expect(firstRecentSearchItem.find('.DocSearch-Hit-action-button[title="Save this search"]').exists).ok()
                .expect(firstRecentSearchItem.find('.DocSearch-Hit-action-button[title="Remove this search from history"]').exists).ok()
    }

    verifyFooterCommands(){
        const command1 = this.footerCommands.child('li').nth(0)
        const command2 = this.footerCommands.child('li').nth(1)
        const command3 = this.footerCommands.child('li').nth(2)
        return t
                .expect(command1.child('.DocSearch-Commands-Key').filterVisible().exists).ok()
                .expect(command1.child('.DocSearch-Label').textContent).eql('to select')
                .expect(command2.child('.DocSearch-Commands-Key').nth(0).filterVisible().exists).ok()
                .expect(command2.child('.DocSearch-Commands-Key').nth(1).filterVisible().exists).ok()
                .expect(command2.child('.DocSearch-Label').textContent).eql('to navigate')
                .expect(command3.child('.DocSearch-Commands-Key').filterVisible().exists).ok()
                .expect(command3.child('.DocSearch-Label').textContent).eql('to close')
    }

    verifyNoResults(searchedElement: string){
        return t
                .expect(this.noResultsPage.child('.DocSearch-Screen-Icon').filterVisible().exists).ok()
                .expect(this.noResultsPage.child('.DocSearch-Title').textContent).eql(`No results for "${searchedElement}"`)
                .expect(this.noResultsPage.find('.DocSearch-NoResults-Prefill-List p').nth(0).textContent).eql(`Try searching for:`)
                .expect(this.noResultsPage.child('.DocSearch-Help').filterVisible().exists).ok()
                .expect(this.noResultsPage.child('p.DocSearch-Help').textContent).eql(`Believe this query should return results? Let us know.`)   
    }

    private findHitByName(hitName){
        return this.searchList.find('.DocSearch-Hit-title').withExactText(hitName).parent().parent()
}

    async putHitToFavourites(hitName: string){
        const searchedFavourite = await this.findHitByName(hitName).find('.DocSearch-Hit-action-button[title="Save this search"]')
        return t
                .click(searchedFavourite)
    }

    async deleteHitFromRecent(hitName: string){
        const deleteHit = await this.findHitByName(hitName).find('.DocSearch-Hit-action-button[title="Remove this search from history"]')
        return t
                .click(deleteHit)
    }

    async deleteHitFromFavourites(hitName: string){
        const deleteHit = await this.findHitByName(hitName).find('.DocSearch-Hit-action-button[title="Remove this search from favorites"]')
        return t
                .click(deleteHit)
    }

    async verifyRecentSearchesContains(...elements: string[]){
        const currentSearchElements = await this.recentSearchList.textContent
        elements.forEach(async element => {
            await t.expect(currentSearchElements).contains(element, `No such element ${element}`)
        })
   }

    async clearSearch(){
       await clickSelector(this.clearSearchInput)
    }

    async removeAllSearchesFrom(selector: Selector){
        const countSearches = await selector.count
        while(countSearches){
            t.click(selector)
        }        
    }
}