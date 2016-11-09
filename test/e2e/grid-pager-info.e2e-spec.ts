import { browser, element, by } from '../../node_modules/protractor/built';

describe('grid pager info', () => {

    let paginator = element(by.tagName('ngb-pagination')).$$('nav').$$('ul').$$('li'),
        gridPagerInfo = element(by.tagName('grid-pager-info')).$$('div'),
        pageSizeSelector = element(by.tagName('page-size-selector')).$('form').$('div').$('select'),
        gridSearchInput = element(by.tagName('grid-search')).$('div').$('div').$('input');

    beforeEach(() => {
        browser.get('/');
        pageSizeSelector.$('[value="10"]').click();
    });

    it('should show text in accordance to numbered of filter rows and current results-page',() => {
        expect(gridPagerInfo.first().getText()).toEqual('Showing 1 to 10 of 53 records');
        paginator.get(7).$$('a').click();
        pageSizeSelector.$('[value="20"]').click();
        expect(gridPagerInfo.first().getText()).toEqual('Showing 21 to 40 of 53 records');
        paginator.get(5).$$('a').click();
        expect(gridPagerInfo.first().getText()).toEqual('Showing 41 to 60 of 53 records');
    });

    it('should show count in footer', () => {
        gridSearchInput.sendKeys('a');
        expect(gridPagerInfo.first().getText()).toContain('(Filtered from 53 total records)');
    });
});