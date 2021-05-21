import { Selector, t, ClientFunction } from "testcafe"

export const verifyUrl = async (urlText) => {
    const currentUrl = await ClientFunction(() => window.location.href)();
    return t
    .expect(currentUrl).contains(urlText)
}

export const verifyPageTitle = (headerText: string) =>{
    const currentPageTitle = Selector('article>header>h1').textContent
    return t
    .expect(currentPageTitle).eql(headerText)
}
