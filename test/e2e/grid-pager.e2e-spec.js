"use strict";
var built_1 = require('../../node_modules/protractor/built');
describe('Pager e2e Tests', function () {
    var gridpager, firstNavBtn, prevNavBtn, lastNavBtn, nextNavBtn, firstRow, lastRow, activeNavBtn;
    beforeAll(function () {
        built_1.browser.get('/');
        gridpager = built_1.element(built_1.by.tagName('grid-pager')).$('ngb-pagination').$('nav');
        firstNavBtn = gridpager.$('ul').$$('li').first();
        prevNavBtn = gridpager.$('ul').$$('li').get(1);
        lastNavBtn = gridpager.$('ul').$$('li').last();
        nextNavBtn = gridpager.$('ul').$$('li').get(7);
        firstRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        lastRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        activeNavBtn = gridpager.$('ul').$$('.page-item active');
    });
    describe('navigation buttons', function () {
        it('should perform no action wehn clicking on the numbered navigation button corresponding to the current-showing results page', function () {
            activeNavBtn.click();
            expect(firstRow.$$('td').get(1).getText()).toMatch('1');
            expect(lastRow.$$('td').get(1).getText()).toMatch('10');
        });
        describe('first/non-last results page related allity', function () {
            it('should disble first and previous navigation buttons when is not in the first result', function () {
                expect(gridpager.$('ul').$$('li').first().getAttribute('class')).toMatch('page-item disabled');
                expect(gridpager.$('ul').$$('li').get(1).getAttribute('class')).toMatch('page-item disabled');
            });
            it('should enable last and next navigation buttons when result page is not the last one', function () {
                expect(lastNavBtn.$('a').getAttribute('aria-label')).toMatch('Last');
                expect(nextNavBtn.$('a').getAttribute('aria-label')).toMatch('Next');
            });
        });
        describe('last/non-first results page related allity', function () {
            it('should disable "last" and "next" navigation buttons when in last results page', function () {
                lastNavBtn.$('a').click();
                expect(gridpager.$('ul').$$('li').last().getAttribute('class')).toMatch('page-item disabled');
                expect(gridpager.$('ul').$$('li').get(3).getAttribute('class')).toMatch('page-item disabled');
            });
            it('should enable "first" and "previous" navigation buttons when in a results page other than first', function () {
                expect(firstNavBtn.$('a').getAttribute('aria-label')).toMatch('First');
                expect(prevNavBtn.$('a').getAttribute('aria-label')).toMatch('Previous');
            });
        });
    });
    describe('page navigation', function () {
        beforeAll(function () { return firstNavBtn.$('a').click(); });
        it('should go to next results page when clicking on next navigation button', function () {
            nextNavBtn.$('a').click();
            expect(firstRow.$$('td').get(1).getText()).toMatch('11');
        });
        it('should go to previous results page when clicking on previous navigation button', function () {
            nextNavBtn.$('a').click();
            nextNavBtn.$('a').click();
            prevNavBtn.$('a').click();
            expect(firstRow.$$('td').get(1).getText()).toMatch('21');
        });
        it('should go to last results page when clicking on last navigation button', function () {
            lastNavBtn.$('a').click();
            expect(lastRow.$$('td').get(1).getText()).toMatch('53');
            firstNavBtn.$('a').click();
        });
        it('should go to first results page when clicking on first navigation button', function () {
            lastNavBtn.$('a').click();
            firstNavBtn.$('a').click();
            expect(firstRow.getText()).toMatch('1');
        });
        it('should go to corresponding results page when clicking on a numbered navigation button', function () {
            //Go to 4th page
            gridpager.$$('li').get(5).$('a').click();
            expect(firstRow.getText()).toMatch('31');
        });
    });
});
