"use strict";
var built_1 = require('../../node_modules/protractor/built');
describe('page size selector', function () {
    var dataRowsCollection, firstDataRow, lastDataRow, firstPageBtn, nextPageBtn, pageSizeSelector, gridPager;
    beforeAll(function () {
        built_1.browser.get('/');
        gridPager = built_1.element(built_1.by.tagName('grid-pager')).$('ngb-pagination').$('nav ul');
        pageSizeSelector = built_1.element(built_1.by.tagName('page-size-selector')).$('form').$('div').$('select');
        dataRowsCollection = built_1.element(built_1.by.tagName('tbody')).$$('tr');
        firstDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        lastDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        firstPageBtn = gridPager.$$('li').first();
        nextPageBtn = gridPager.$$('li');
    });
    it('should filter up to 10 data rows per page when selecting a page size of "10"', function () {
        pageSizeSelector.$('[value="10"]').click();
        expect(firstDataRow.$$('td').get(1).getText()).toMatch('1');
        expect(lastDataRow.$$('td').get(1).getText()).toMatch('10');
        expect(dataRowsCollection.count()).toBe(10);
    });
    it('should filter up to 20 data rows per page when selecting a page size of "20"', function () {
        pageSizeSelector.$('[value="20"]').click();
        nextPageBtn.get(5).$('a').click();
        expect(firstDataRow.$$('td').get(1).getText()).toMatch('21');
        expect(lastDataRow.$$('td').get(1).getText()).toMatch('40');
        expect(dataRowsCollection.count()).toBe(20);
    });
    it('should filter up to 50 data rows per page when selecting a page size of "50"', function () {
        // Select '50' on tbPageSizeSelector
        pageSizeSelector.$('[value="50"]').click();
        // Verifying results on results-page 1
        firstPageBtn.$('a').click();
        expect(firstDataRow.$$('td').get(1).getText()).toBe('1');
        expect(lastDataRow.$$('td').get(1).getText()).toBe('50');
        expect(dataRowsCollection.count()).toBe(50);
        // Go to next page of results (page 2)
        nextPageBtn.get(4).$('a').click();
        // Verifying results on results-page 2
        expect(firstDataRow.$$('td').get(1).getText()).toBe('51');
        expect(lastDataRow.$$('td').get(1).getText()).toBe('53');
        expect(dataRowsCollection.count()).toBe(3);
    });
    it('should filter up to 100 data rows per page when selecting a page size of "100"', function () {
        pageSizeSelector.$('[value="100"]').click();
        expect(firstDataRow.$$('td').get(1).getText()).toBe('1');
        expect(lastDataRow.$$('td').get(1).getText()).toBe('53');
        expect(dataRowsCollection.count()).toBe(53);
    });
});
