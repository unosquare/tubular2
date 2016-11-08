import { browser, element, by } from '../../node_modules/protractor/built';

describe('Filtering e2e Tests', () => {

    beforeAll(() => {
        browser.get('/');
    });

    function setPagination() {
        element(by.tagName('page-size-selector')).$('form').$('div').$('select').$('[value="50"]').click();
        element(by.tagName('grid-pager')).$('ngb-pagination').$('nav').$('ul').$$('li').get(2).$('a').click();
    }

    describe('Column filters', () => {

        let columnHeaders,
            columnFilter,
            filterBtn,
            popOverForm,
            applyBtn,
            clearBtn,
            filterSelect,
            valueInput;

        beforeAll(() => {
            setPagination();
            columnHeaders = element(by.tagName('thead')).$$('tr').first().$$('th');
            columnFilter = columnHeaders.get(2).$('.column-header').$('div');
            filterBtn = columnFilter.$('button');
        });

        beforeEach(() => {
            filterBtn.click();
            popOverForm = columnFilter.$('ngb-popover-window').$('.popover-content').$('filter-dialog').$('form');
            applyBtn = popOverForm.$('.row').$$('div').get(0).$('.btn-success');
            clearBtn = popOverForm.$('.row').$$('div').get(1).$('.btn-danger');
            filterSelect = popOverForm.$$('.form-group').get(0).$('select');
            valueInput = popOverForm.$$('.form-group').get(1).$('input');
        });

        afterEach(() => {
            filterBtn.click();
            clearBtn.click();
            setPagination();
        });

        it('should disable Value text-input for "None" filter', () => {
            filterSelect.$('[value="None"]').click();
            expect(valueInput.getAttribute('disabled')).toBe('true');
            clearBtn.click();
        });

        it('should decorate popover button when showing data is being filtered for its column', () => {
            expect(filterBtn.getAttribute('class')).not.toMatch(/btn-success/);
            filterSelect.$('[value="Equals"]').click();
            valueInput.sendKeys('Microsoft');
            applyBtn.click();
            expect(filterBtn.getAttribute('class')).toMatch(/btn-success/);
        });

        //it('should correctly filter data for the "Equals" filtering option', () => { TODO: review, is not passing
        //    let filteredCustomer = 'Microsoft';
        //    filterSelect.$('[value="Equals"]').click();
        //    valueInput.sendKeys(filteredCustomer);
        //    applyBtn.click();
        //    let dataRows = element(by.tagName('tbody')).$$('tr');
        //    dataRows.each((row) => {
        //        expect(row.$$('td').get(2).getText()).toEqual(filteredCustomer);
        //    });
        //});

        //it('should correctly filter data for the "Not Equals" filtering option', () => {  TODO: review, is not passing
        //    let filterOk = true;
        //    let notShowingCustomer = 'Microsoft';
        //    filterSelect.$('[value="NotEquals"]').click();
        //    valueInput.sendKeys(notShowingCustomer);
        //    applyBtn.click();
        //    let dataRows = element(by.tagName('tbody')).$$('tr');
        //    dataRows.each((row) => {
        //        expect(row.$$('td').get(2).getText()).not.toEqual(notShowingCustomer);
        //    });
        //});

        it('should correctly filter data for the "Contains" filtering option', () => {
            let containedString = 'La';
            filterSelect.$('[value="Contains"]').click();
            valueInput.sendKeys(containedString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                expect(row.$$('td').get(2).getText()).toContain(containedString);
            });
        });

        it('should correctly filter data for the "Starts With" filtering option', () => {
            let startsWithString = 'Uno';
            filterSelect.$('[value="StartsWith"]').click();
            valueInput.sendKeys(startsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                expect(row.$$('td').get(2).getText()).toMatch(/^Uno/i);
            });
        });

        it('should correctly filter data for the "Not Starts With" filtering option', () => {
            let notStartsWithString = 'Uno';
            filterSelect.$('[value="NotStartsWith"]').click();
            valueInput.sendKeys(notStartsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                expect(row.$$('td').get(2).getText()).not.toMatch(/^Uno/i);
            });
        });

        it('should correctly filter data for the "Ends With" filtering option', () => {
            let endsWithString = 'xo';
            filterSelect.$('[value="EndsWith"]').click();
            valueInput.sendKeys(endsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                expect(row.$$('td').get(2).getText()).toMatch(/xo$/);
            });
        });

        it('should correctly filter data for the "Not Ends With" filtering option', () => {
            let endsWithString = 'xo';
            filterSelect.$('[value="NotEndsWith"]').click();
            valueInput.sendKeys(endsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                expect(row.$$('td').get(2).getText()).not.toMatch(/xo$/);
            });
        });

    });
});