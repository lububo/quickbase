import Header from '../pages/Header'
import Search from '../pages/Search';
import * as utils from '../shared'
import LeftNavigation from '../pages/LeftNavigation';
import { t } from 'testcafe';

const header = new Header();
const search = new Search();
const leftNavigation = new LeftNavigation();
const ProtocolList = [
    'WebDriver Protocol','Appium','Mobile JSON Wire Protocol','Chromium',
    'Sauce Labs','Selenium Standalone','JSON Wire Protocol'
    ];

fixture `Quickbase Demo`
.page('http://webdriver.io')

test('test', async () =>{
    await utils.click(header.navBarApi);
    await utils.verifyUrl('https://webdriver.io/docs/api')
    await utils.click(header.search)
    await utils.typeText(search.input, 'click')
    await utils.verifyUrl('https://webdriver.io/docs/api/element/click/')
    await utils.verifyPageTitle('click')
    await leftNavigation.toggleByTitle('element');
    await leftNavigation.toggleByTitle('Protocols');
    await leftNavigation.verifyList('Protocols',ProtocolList);
});

test('Verify Search box basics', async () =>{
    await utils.click(header.search)
    await search.verifyHeader()
    await search.verifyEmptyBody()
    await search.verifyFooterLogo()
    await search.verifyFooterCommands()
});

test('Verify Search functionality', async () =>{
    await utils.click(header.search)
    await utils.typeText(search.input, 'click')
    await utils.click(header.search)
    await search.verifySearchHitButtons();
    await utils.typeText(search.input, 'call')
    await utils.click(header.search)
    await search.verifyRecentSearchesContains('call', 'click')
    await utils.typeText(search.input, 'noNoResults')
    await search.verifyNoResults('noNoResults')
    await search.clearSearch();
    await search.putHitToFavourites('call')
    await search.deleteHitFromRecent('click')
    await search.deleteHitFromFavourites('call')
    await search.verifyEmptyBody()
});
