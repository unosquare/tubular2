"use strict";
var built_1 = require('../node_modules/protractor/built');
describe('grid sorting', function () {
    var dataSetLowerId = '1', dataSetHigherId = '53', dataSetLowerCustomerName = 'Advanced Technology Systems', dataSetHigherCustomerName = 'Vesta', dataSetLowerDate = 'Jan 27, 2016', dataSetHigherDate = 'May 24, 2016';
    var paginator = built_1.element(built_1.by.tagName('ngb-pagination')).$$('nav').$$('ul').$$('li'), columnHeaders = built_1.element(built_1.by.tagName('thead')).$$('tr').first().$$('th'), orderIdSorting = columnHeaders.get(1).$('.column-header').$$('span'), orderCustomerNameSorting = columnHeaders.get(2).$('.column-header').$$('span'), aShippedDateSorting = columnHeaders.get(3).$('.column-header').$$('span');
    beforeEach(function () {
        built_1.browser.refresh();
    });
    it('should order data in ascending order when click-sorting an unsorted numeric column', function () {
        orderIdSorting.click();
        var firstDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(1).getText()).toEqual(dataSetLowerId);
        paginator.last().$$('a').click();
        var lastDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(1).getText()).toEqual(dataSetHigherId);
    });
    it('should order data in descending order when click-sorting an ascending-sorted numeric column', function () {
        orderIdSorting.click();
        orderIdSorting.click();
        var firstDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(1).getText()).toEqual(dataSetHigherId);
        paginator.last().$$('a').click();
        var lastDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(1).getText()).toEqual(dataSetLowerId);
    });
    it('should order data in ascending order when click-sorting an unsorted text column', function () {
        orderCustomerNameSorting.click();
        var firstDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(2).getText()).toEqual(dataSetLowerCustomerName);
        paginator.last().$$('a').click();
        var lastDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(2).getText()).toEqual(dataSetHigherCustomerName);
    });
    it('should order data in descending order when click-sorting an ascending-sorted text column', function () {
        orderCustomerNameSorting.click();
        orderCustomerNameSorting.click();
        var firstDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(2).getText()).toEqual(dataSetHigherCustomerName);
        paginator.last().$$('a').click();
        var lastDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(2).getText()).toEqual(dataSetLowerCustomerName);
    });
    it('should order data in ascending order when click-sorting an unsorted date column', function () {
        aShippedDateSorting.click();
        var firstDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(3).getText()).toEqual(dataSetLowerDate);
        paginator.last().$$('a').click();
        var lastDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(3).getText()).toEqual(dataSetHigherDate);
    });
    it('should order data in descending order when click-sorting an ascending-sorted date column', function () {
        aShippedDateSorting.click();
        aShippedDateSorting.click();
        var firstDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(3).getText()).toEqual(dataSetHigherDate);
        paginator.last().$$('a').click();
        var lastDataRow = built_1.element(built_1.by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(3).getText()).toEqual(dataSetLowerDate);
    });
});
//# sourceMappingURL=sorting.e2e-spec.js.map