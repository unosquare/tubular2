import { browser, element, by } from '../node_modules/protractor/built';

describe('grid sorting', () => {

    let dataSetLowerId = '1',
        dataSetHigherId = '53',
        dataSetLowerCustomerName = 'Microsoft',
        dataSetHigherCustomerName = 'Microsoft',
        dataSetLowerDate = '2016-08-19',
        dataSetHigherDate = '2016-02-01';

    let paginator = element(by.tagName('ngb-pagination')).$$('nav').$$('ul'),
        orderIdSorting = element(by.className('column-header')).$$('span').first(),
        firstDataRow = element(by.tagName('tbody')).$$('tr').first();
    
    beforeEach(() => {
    });

    it('should order data in ascending order when click-sorting an unsorted numeric column', () => {
        orderIdSorting.click();
        expect(firstDataRow.$$('td').get(1).getText()).toEqual(dataSetLowerId);
    });

    //it('', () => {

    //});

    //it('', () => {

    //});

    //it('', () => {

    //});

    //it('', () => {

    //});

    //it('', () => {

    //});


});