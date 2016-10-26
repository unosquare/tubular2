import { browser, element, by } from '../node_modules/protractor/built';

describe('grid sorting', () => {

    let dataSetLowerId = '1',
        dataSetHigherId = '53',
        dataSetLowerCustomerName = 'Microsoft',
        dataSetHigherCustomerName = 'Microsoft',
        dataSetLowerDate = '2016-08-19',
        dataSetHigherDate = '2016-02-01';

    let paginator = element(by.tagName('ngb-pagination')).$$('nav').$$('ul').$$('li'),
        orderIdSorting = element(by.className('column-header')).$$('span').first();
    
    beforeEach(() => {
        browser.refresh();
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

    //it('', () => {

    //});

    //it('', () => {

    //});

    //it('', () => {

    //});

    //it('', () => {

    //});


});