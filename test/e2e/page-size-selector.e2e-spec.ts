import { browser, element, by } from '../../node_modules/protractor/built';

describe('page size selector', () =>{
    let dataRowsCollection,
        firstDataRow,
        lastDataRow,
        firstPageBtn,
        nextPageBtn,
        pageSizeSelector,
        gridPager

    beforeAll(()=>{
        browser.get('/');
        
        gridPager = element(by.tagName('tb-grid-pager')).$('nav ul');
        pageSizeSelector = element(by.tagName('tb-page-size-selector')).$('select');
        dataRowsCollection = element(by.tagName('tbody')).$$('tr');
        firstDataRow =  element(by.tagName('tbody')).$$('tr').first();
        lastDataRow =  element(by.tagName('tbody')).$$('tr').last();
        firstPageBtn = gridPager.$$('li').first();
        nextPageBtn = gridPager.$$('li');
    });

    it('should filter up to 10 data rows per page when selecting a page size of "10"', () => {
        pageSizeSelector.$('[value="10"]').click();
        expect(firstDataRow.$$('td').get(1).getText()).toMatch('1');
        expect(lastDataRow.$$('td').get(1).getText()).toMatch('10');
        expect(dataRowsCollection.count()).toBe(10);
    });

    it('should filter up to 20 data rows per page when selecting a page size of "20"', () => {
        pageSizeSelector.$('[value="20"]').click();
        nextPageBtn.get(5).$('a').click();
        expect(firstDataRow.$$('td').get(1).getText()).toMatch('61');
        expect(lastDataRow.$$('td').get(1).getText()).toMatch('80');
        expect(dataRowsCollection.count()).toBe(20);
    });

    it('should filter up to 50 data rows per page when selecting a page size of "50"', () => {
        // Select '50' on tbPageSizeSelector
        pageSizeSelector.$('[value="50"]').click();
        
        expect(firstDataRow.$$('td').get(1).getText()).toBe('151');
        expect(lastDataRow.$$('td').get(1).getText()).toBe('200');
        expect(dataRowsCollection.count()).toBe(50);
    });

    it('should filter up to 100 data rows per page when selecting a page size of "100"', () => {
        pageSizeSelector.$('[value="100"]').click();

        expect(firstDataRow.$$('td').get(1).getText()).toBe('301');
        expect(lastDataRow.$$('td').get(1).getText()).toBe('400');
        expect(dataRowsCollection.count()).toBe(100);
    });
});