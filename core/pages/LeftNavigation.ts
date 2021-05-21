import { Selector, t } from "testcafe";

export default class LeftNavigation {

private menuList = Selector('sidebar_15mo');

private async findLeftElemetToClick(title: string){
    const allChildElements = await this.menuList.find('li');
    const allChildElementsCount = await allChildElements.count;
    for(let i =0; i<allChildElementsCount; i++){
        let currentElement = await allChildElements.nth(i).textContent
        if(currentElement === title){
            return allChildElements.nth(i)
        }
        return false
    }
}

async toggleByTitle(title: string){
    const currentElementToClick = await Selector('a.menu__link').withText(title)
    if(currentElementToClick){
        return t
        .click(currentElementToClick)
        }
    }

    private async getListByTitle(title){
        const currentElement = await Selector('a.menu__link').withText(title).parent('.menu__list-item');
        const el = await currentElement.find('li');
        let counts = await el.count;
        let elementsTexts = []
        for(let i =0; i<counts; i++){
            let curEl = await el.nth(i).textContent;
            elementsTexts.push(curEl)
        }
        return elementsTexts
    }

    async verifyList(title: string, elTexts){
       const currentElementsTexts = await this.getListByTitle(title)
     return t
     .expect(currentElementsTexts).eql(elTexts)
        }
}