///<reference path="../node_modules/@types/jasmine/index.d.ts"/>

import { browser, element, by } from '../node_modules/protractor/built';

describe('Pager e2e Tests', () => {
let gridpager,
    firstNavBtn,
    prevNavBtn,
    lastNavBtn,
    nextNavBtn,
    firstRow,
    lastRow,
    activeNavBtn;

    beforeAll( () => {
        browser.get('/');
        
         gridpager = element(by.tagName('grid-pager'));
         firstNavBtn = element(by.xpath('a[@aria-label="First"]'));
         prevNavBtn = element(by.xpath('a[@aria-label="Previous"]'));
         lastNavBtn = element(by.xpath('a[@aria-label="Last"]'));
         nextNavBtn = element(by.xpath('a[@aria-label="Next"]'));
         firstRow = element(by.tagName('tbody')).$$('tr').first();
         lastRow = element(by.tagName('tbody')).$$('tr').first();
         activeNavBtn = element(by.xpath('li[@class="page-item active"]'));
        //Select '10' on page size selector
        element(by.xpath('//select[@class="form-control input-sm"]')).$('[vlaue="10"]');
        //Go to first pager if not there
        firstNavBtn.click();
    });

    describe('navigation buttons', () => {
        it('should perform no action wehn clicking on the numbered navigation button corresponding to the current-showing results page', () => {
            activeNavBtn.click();
            expect(firstRow.getText()).toMatch('/^1\s/');
            expect(lastRow.getText()).toMatch('/^10\s/');
        });
    });
});