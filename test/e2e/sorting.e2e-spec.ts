import { browser, element, by } from '../../node_modules/protractor/built';

describe('grid sorting', () => {

    let dataSetLowerId ,
        dataSetHigherId,
        dataSetLowerCustomerName,
        dataSetHigherCustomerName,
        dataSetLowerDate,
        dataSetHigherDate,
        paginator,
        columnHeaders,
        orderIdSorting,
        orderCustomerNameSorting,
        aCreationDateSorting;
        
    beforeAll(() => {
        browser.get('/');
        dataSetLowerId = '1';
        dataSetHigherId = '500';
        dataSetLowerCustomerName = 'Advanced Technology Systems';
        dataSetHigherCustomerName = 'Vesta';
        dataSetLowerDate = 'Tuesday, December 29th 2015';
        dataSetHigherDate = 'Thursday, December 31st 2015';
        paginator = element(by.tagName('ngb-pagination')).$$('nav').$$('ul').$$('li');
        columnHeaders = element(by.tagName('thead')).$$('tr').first().$$('th');
        orderIdSorting = columnHeaders.get(1).$('.column-header').$$('span');
        orderCustomerNameSorting = columnHeaders.get(2).$('.column-header').$$('span');
        aCreationDateSorting = columnHeaders.get(4).$('.column-header').$$('span');
        element(by.tagName('page-size-selector')).$('form').$('div').$('select').$('[value="10"]').click();
    });

    beforeEach(() => {
        //Go to first page if isn't there
        if(paginator.first().getAttribute('class') != 'page-item disabled'){
            paginator.first().$('a').click();
        }
        aCreationDateSorting.click();        
        aCreationDateSorting.click();        
    });

    it('should order data in ascending order when click-sorting an unsorted numeric column', () => {
        orderIdSorting.click();
        let firstDataRow = element(by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(1).getText()).toEqual(dataSetLowerId);
        paginator.last().$$('a').click();
        let lastDataRow = element(by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(1).getText()).toEqual(dataSetHigherId);
    });

    it('should order data in descending order when click-sorting an ascending-sorted numeric column', () => {
        orderIdSorting.click();
        orderIdSorting.click();
        let firstDataRow = element(by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(1).getText()).toEqual(dataSetHigherId);
        paginator.last().$$('a').click();
        let lastDataRow = element(by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(1).getText()).toEqual(dataSetLowerId);
    });

    it('should order data in ascending order when click-sorting an unsorted text column', () => {
        orderCustomerNameSorting.click();
        let firstDataRow = element(by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(2).getText()).toEqual(dataSetLowerCustomerName);
        paginator.last().$$('a').click();
        let lastDataRow = element(by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(2).getText()).toEqual(dataSetHigherCustomerName);
    });

    it('should order data in descending order when click-sorting an ascending-sorted text column', () => {
        orderCustomerNameSorting.click();
        orderCustomerNameSorting.click();
        let firstDataRow = element(by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(2).getText()).toEqual(dataSetHigherCustomerName);
        paginator.last().$$('a').click();
        let lastDataRow = element(by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(2).getText()).toEqual(dataSetLowerCustomerName);
    });

    it('should order data in ascending order when click-sorting an unsorted date column', () => {
        aCreationDateSorting.click();
        aCreationDateSorting.click();
        let firstDataRow = element(by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(4).getText()).toEqual(dataSetLowerDate);
        paginator.last().$$('a').click();
        let lastDataRow = element(by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(4).getText()).toEqual(dataSetHigherDate);
    });

    it('should order data in descending order when click-sorting an ascending-sorted date column', () => {
        aCreationDateSorting.click();
        aCreationDateSorting.click();
        let firstDataRow = element(by.tagName('tbody')).$$('tr').first();
        expect(firstDataRow.$$('td').get(4).getText()).toEqual(dataSetHigherDate);
        paginator.last().$$('a').click();
        let lastDataRow = element(by.tagName('tbody')).$$('tr').last();
        expect(lastDataRow.$$('td').get(4).getText()).toEqual(dataSetLowerDate);
    });
});
