import { ClientFunction, t } from "testcafe"

export const clickSelector = (selector: Selector) => {
    return t.click(selector)
}

export const typeText = (selector: Selector, text: string) => {
    return t
    .typeText(selector, text)
    .pressKey('Enter')
}
