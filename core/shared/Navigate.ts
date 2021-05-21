import { ClientFunction, t } from "testcafe"

export const clickSelector = (selector: Selector) => {
    return t.click(selector)
}

//set wait timer becaouse there needs some time for search to load the results
export const typeText = (selector: Selector, text: string) => {
    return t
    .typeText(selector, text)
    .wait(100)
    .pressKey('Enter')
}
