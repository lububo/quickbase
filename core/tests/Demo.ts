import Header from '../pages/Header'
import Search from '../pages/Search';
import {clickSelector, typeText} from '../shared/Navigate'
import {verifyUrl, verifyPageTitle} from '../shared/Assertions'
import LeftNavigation from '../pages/LeftNavigation';
import { t } from 'testcafe';

const header = new Header();
const search = new Search();
const leftNavigation = new LeftNavigation();
const ProtocolList = [
    'WebDriver Protocol','Appium','Mobile JSON Wire Protocol','Chromium',
    'Sauce Labs','Selenium Standalone','JSON Wire Protocol'
]

fixture `Quickbase Demo`
.page('http://webdriver.io')

test('test', async () =>{
    await clickSelector(header.navBarApi);
    await verifyUrl('https://webdriver.io/docs/api')
    await clickSelector(header.search)
    await typeText(search.input, 'click')
    await verifyUrl('https://webdriver.io/docs/api/element/click/')
    await verifyPageTitle('click')
    await leftNavigation.toggleByTitle('element');
    await leftNavigation.toggleByTitle('Protocols');
    await leftNavigation.verifyList('Protocols',ProtocolList);
})

test('Verify Search box basics', async () =>{
    await clickSelector(header.navBarApi);
    await clickSelector(header.search)
    await search.verifyHeader()
    await search.verifyBody()
    await search.verifyFooterLogo()
    await search.verifyFooterCommands()
})

test.only('Verify Search functionality', async () =>{
    await clickSelector(header.navBarApi);
    await clickSelector(header.search)
    await typeText(search.input, 'click')
    await clickSelector(header.search)
    await typeText(search.input, 'call')
    await clickSelector(header.search)
    await search.verifyRecentSearchesContains('call', 'click')
    await typeText(search.input, 'ddddd')
    await search.verifyNoResults('ddddd')
        // await search.clearSearch();

    /*
search for something then verify it remains in Recent search (how many Recent searches)
add something to favourites 
remove something from Recent and Favourites
remove all searches


    verify No results for "ddddd"
    .DocSearch-Help visible
    protocols, services, testruner are all visible
    \

    if time verify when searching some text that it appears in specific categoties
    */


})