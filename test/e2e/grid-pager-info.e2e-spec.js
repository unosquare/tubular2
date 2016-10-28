"use strict";
var built_1 = require('../../node_modules/protractor/built');
describe('grid pager info', function () {
    var paginator = built_1.element(built_1.by.tagName('ngb-pagination')).$$('nav').$$('ul').$$('li'), gridPagerInfo = built_1.element(built_1.by.tagName('grid-pager-info')).$$('div'), pageSizeSelector = built_1.element(built_1.by.tagName('page-size-selector')).$$('select'), gridSearchInput = built_1.element(built_1.by.tagName('grid-search')).$$('div').$$('div').$$('input');
    beforeEach(function () {
        built_1.browser.get('/');
    });
    it('should show text in accordance to numbered of filter rows and current results-page', function () {
        expect(gridPagerInfo.first().getText()).toEqual('Showing 1 to 10 of 53 records');
        paginator.get(7).$$('a').click();
        pageSizeSelector.$$('option').get(1).click();
        expect(gridPagerInfo.first().getText()).toEqual('Showing 21 to 40 of 53 records');
        paginator.get(5).$$('a').click();
        expect(gridPagerInfo.first().getText()).toEqual('Showing 41 to 60 of 53 records');
    });
    it('should show count in footer', function () {
        gridSearchInput.sendKeys('a');
        expect(gridPagerInfo.first().getText()).toContain('(Filtered from 53 total records)');
    });
});
