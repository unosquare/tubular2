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
        
         gridpager = element(by.tagName('grid-pager')).$('ngb-pagination').$('nav');
         firstNavBtn = gridpager.$('ul').$$('li').get(0);
         prevNavBtn = gridpager.$('ul').$$('li').get(1);
         lastNavBtn = gridpager.$('ul').$$('li').get(8);
         nextNavBtn = gridpager.$('ul').$$('li').get(7);
         firstRow = element(by.tagName('tbody')).$$('tr').first();
         lastRow = element(by.tagName('tbody')).$$('tr').last();
         activeNavBtn = gridpager.$('ul').$$('.page-item active');
    });

    describe('navigation buttons', () => {
        it('should perform no action wehn clicking on the numbered navigation button corresponding to the current-showing results page', () => {
            activeNavBtn.click();
            expect(firstRow.$$('td').get(1).getText()).toMatch('1');
            expect(lastRow.$$('td').get(1).getText()).toMatch('10');
        });

        describe('first/non-last results page related functionallity', () => {
            it('should enable first and previous button when is not in the first result', () =>{
                //Go to next page
                nextNavBtn.$('a').click();

                expect(firstNavBtn.$('a').getAttribute('aria-label')).toMatch('First');
                expect(lastNavBtn.$('a').getAttribute('aria-label')).toMatch('Last');
            });
        });
    });
});