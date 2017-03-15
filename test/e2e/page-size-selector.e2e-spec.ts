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
        
        gridPager = element(by.tagName('grid-pager')).$('ngb-pagination').$('nav ul');
        pageSizeSelector = element(by.tagName('page-size-selector')).$('select');
        dataRowsCollection = element(by.tagName('tbody')).$$('tr');
        firstDataRow =  element(by.tagName('tbody')).$$('tr').first();
        lastDataRow =  element(by.tagName('tbody')).$$('tr').last();
        firstPageBtn = gridPager.$$('li').first();
        nextPageBtn = gridPager.$$('li');
        
        //Go to first page if isn't there
        if(gridPager.$$('li').first().getAttribute('class') != 'page-item disabled'){
            firstPageBtn.$('a').click();
        }
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
        expect(firstDataRow.$$('td').get(1).getText()).toMatch('21');
        expect(lastDataRow.$$('td').get(1).getText()).toMatch('40');
        expect(dataRowsCollection.count()).toBe(20);
    });

    it('should filter up to 50 data rows per page when selecting a page size of "50"', () =>{
        // Select '50' on tbPageSizeSelector
        pageSizeSelector.$('[value="50"]').click();
        
        expect(firstDataRow.$$('td').get(1).getText()).toBe('1');
        expect(lastDataRow.$$('td').get(1).getText()).toBe('49');
        expect(dataRowsCollection.count()).toBe(49);
    });

    it('should filter up to 100 data rows per page when selecting a page size of "100"', () => {
        pageSizeSelector.$('[value="100"]').click();

        expect(firstDataRow.$$('td').get(1).getText()).toBe('1');
        expect(lastDataRow.$$('td').get(1).getText()).toBe('49');
        expect(dataRowsCollection.count()).toBe(49);
    });
});