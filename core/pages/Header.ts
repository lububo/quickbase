import { Selector } from "testcafe";

export default class Header{
    readonly navBarDocs: Selector;
    readonly navBarApi: Selector;
    readonly navBarBlog: Selector;
    readonly search: Selector;


    constructor(){
        this.navBarDocs = Selector('.navbar__item').withExactText('Docs')
        this.navBarApi = Selector('.navbar__item').withExactText('API')
        this.navBarBlog = Selector('.navbar__item').withExactText('Blog')
        this.search = Selector('.DocSearch-Button-Placeholder');
    }


}