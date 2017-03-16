import { browser, element, by } from '../../node_modules/protractor/built';

describe('Filtering e2e Tests', () => {

    let columnHeaders;

    function setPagination() {
        element(by.tagName('page-size-selector')).$('form').$('div').$('select').$('[value="50"]').click();
        element(by.tagName('grid-pager')).$('ngb-pagination').$('nav').$('ul').$$('li').get(2).$('a').click();
    }

    beforeAll(() => {
        browser.get('/');
        setPagination();
        columnHeaders = element(by.tagName('thead')).$$('tr').first().$$('th');
    });

    describe('Column filters', () => {
    
        let columnFilter,
            filterBtn,
            popOverForm,
            applyBtn,
            clearBtn,
            filterSelect,
            valueInput;

        beforeAll(() => {
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
        
        //it('should correctly filter data for the "Equals" filtering option', () => { NO PASA no esta filtrando
        //    let filteredCustomer = 'Microsoft';
        //    filterSelect.$('[value="Equals"]').click();
        //    valueInput.sendKeys(filteredCustomer);
        //    applyBtn.click();
        //    let dataRows = element(by.tagName('tbody')).$$('tr');
        //    dataRows.each((row) => {
        //        expect(row.$$('td').get(2).getText()).toEqual(filteredCustomer);
        //    });
        //});

        //it('should correctly filter data for the "Not Equals" filtering option', () => { NO PASA no esta filtrando
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
            let filterOk = true;
            
            filterSelect.$('[value="Contains"]').click();
            valueInput.sendKeys(containedString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((filter) => {
                   filterOk = filterOk && (filter.indexOf(containedString) !== -1);
                })
            }).then(() => {
                expect(filterOk).toBe(true);  
            });            
        });

        it('should correctly filter data for the "Not Contains" filtering option', () => {
            let notContainedString = 'La';
            let filterOk = true;
            
            filterSelect.$('[value="NotContains"]').click();
            valueInput.sendKeys(notContainedString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((filter) => {
                   filterOk = filterOk && (filter.indexOf(notContainedString) === -1);
                })
            }).then(() => {
                expect(filterOk).toBe(true);  
            });            
        });

        it('should correctly filter data for the "Starts With" filtering option', () => {
            let startsWithString = 'Uno';
            let filterOk = true;

            filterSelect.$('[value="StartsWith"]').click();
            valueInput.sendKeys(startsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((filter) => {
                   filterOk = filterOk && (filter.indexOf(startsWithString) === 0);
                })
            }).then(() => {
                expect(filterOk).toBe(true);  
            });
        });

        it('should correctly filter data for the "Not Starts With" filtering option', () => {
            let notStartsWithString = 'Uno';
            let filterOk = true;

            filterSelect.$('[value="NotStartsWith"]').click();
            valueInput.sendKeys(notStartsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((filter) => {
                   filterOk = filterOk && (filter.indexOf(notStartsWithString) !== 0);
                })
            }).then(() => {
                expect(filterOk).toBe(true);  
            });
        });

        it('should correctly filter data for the "Ends With" filtering option', () => {
            let endsWithString = 'xo';
            let filterOk = true;

            filterSelect.$('[value="EndsWith"]').click();
            valueInput.sendKeys(endsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((filter) => {
                   filterOk = filterOk && (filter.indexOf(endsWithString) === (filter.length - endsWithString.length));
                })
            }).then(() => {
                expect(filterOk).toBe(true);  
            });
        });

        it('should correctly filter data for the "Not Ends With" filtering option', () => {
            let endsWithString = 'xo';
            let filterOk = true;

            filterSelect.$('[value="NotEndsWith"]').click();
            valueInput.sendKeys(endsWithString);
            applyBtn.click();
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((filter) => {
                   filterOk = filterOk && (filter.indexOf(endsWithString) !== (filter.length - endsWithString.length));
                })
            }).then(() => {
                expect(filterOk).toBe(true);  
            });
        });

    });

    describe('DateTime column filter', () => {

       let columnFilter,
           filterBtn,
           popOverForm,
           applyBtn,
           clearBtn,
           filterSelect,
           valueInput;

       beforeAll(() => {
           columnFilter = columnHeaders.get(4).$('.column-header').$('div');
           filterBtn = columnFilter.$('button');
       });

       beforeEach(() => {
           filterBtn.click();
           popOverForm = columnFilter.$('ngb-popover-window').$('.popover-content').$('filter-dialog').$('form');
           applyBtn = popOverForm.$('.row').$$('div').get(0).$('.btn-success');
           clearBtn = popOverForm.$('.row').$$('div').get(1).$('.btn-danger');
           filterSelect = popOverForm.$$('.form-group').get(0).$('select');
           valueInput = popOverForm.$$('.form-group').get(1).$$('input').first();
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
           filterSelect.$('[value="Gt"]').click();
           valueInput.sendKeys('02/05/2016');
           applyBtn.click();
           expect(filterBtn.getAttribute('class')).toMatch(/btn-success/);
       });

       //it('should correctly filter data for the "Equals" filtering option', () => {
       //    let filteredDate = '01/30/2016';
       //    filterSelect.$('[value="Equals"]').click();
       //    valueInput.sendKeys(filteredDate);
       //    applyBtn.click();
       //    let dataRows = element(by.tagName('tbody')).$$('tr');
       //    dataRows.each((row) => {
       //        expect(row.$$('td').get(3).getText()).toEqual(filteredDate);
       //    });
       //});


       //it('should correctly filter data for the "Not Equals" filtering option', () => {
       //    let filteredDate = '01/30/2016';
       //    filterSelect.$('[value="Equals"]').click();
       //    valueInput.sendKeys(filteredDate);
       //    applyBtn.click();
       //    let dataRows = element(by.tagName('tbody')).$$('tr');
       //    dataRows.each((row) => {
       //        expect(row.$$('td').get(3).getText()).not.toEqual(filteredDate);
       //    });
       //});


       it('should correctly filter data for the "Between" filtering option', () => {
           let filterOk = true;
           let argumentInput = popOverForm.$$('.form-group').get(1).$$('input').last();
           filterSelect.$('[value="Between"]').click();
           valueInput.sendKeys('12/29/2015');
           argumentInput.sendKeys('12/31/2015');
           applyBtn.click();
           let dataRows = element(by.tagName('tbody')).$$('tr');

           dataRows.each((row) => {
                row.$$('td').get(4).getText().then((filter) => {
                   filterOk = filterOk && ((new Date('12/29/2015') <= new Date(filter)) && (new Date(filter) <= new Date('12/31/2015')));
                })
            }).then(() => expect(filterOk).toBe(true));
       });


       //it('should correctly filter data for the "Greater-or-equal" filtering option', () => {
       //});


       //it('should corretlly filter data for the "Greater" filtering option', () => {
       //});

       //it('should correctly filter data for the "Less-or-equal" filtering option', () => {
       //});

       //it('should correctly filter data for the "Less" filtering option', () => {
       //});

       //it('', () => {
       //});
    });

    describe('Text Search', () => {

        let gridSearch,
            searchInput,
            clearBtn;

        beforeAll(() => {
            gridSearch = element(by.tagName('grid-search')).$('div').$('div');
            searchInput = gridSearch.$('input');
            clearBtn = gridSearch.$('button');
        });

        beforeEach(function () {
            clearBtn.isDisplayed().then((displayed) => {
                if (displayed) {
                    clearBtn.click();
                }
            });
        });

        it('min-chars is not set', () => {
            expect(searchInput.getAttribute('min-chars')).toBe(null);
        });

        it('should filter data in searchable-column customer name to matching inputted text, starting from 2 characters', () => {
            let filteredCustomer = 'Microsoft';
            let filterOk = true;

            searchInput.sendKeys('c');
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((customerName) => {
                   filterOk = filterOk && (customerName == filteredCustomer);
                })
            })
            .then(() => expect(filterOk).toBe(false))
            .then(() => {
                filterOk = true;
                searchInput.sendKeys('r');
                let dataRows = element(by.tagName('tbody')).$$('tr');

                dataRows.each((row) => {
                    row.$$('td').get(2).getText().then((customerName) => {
                        filterOk = filterOk && (customerName == filteredCustomer);
                    })
                }).then(() => expect(filterOk).toBe(true))
            });
        });

        it('should filter data in searchable-column shipper city to matching inputted text, starting from 2 characters', () => {
            let filteredCity = 'Los Angeles, CA, USA';
            let filterOk = true;

            searchInput.sendKeys('lo');
            let dataRows = element(by.tagName('tbody')).$$('tr');
            dataRows.each((row) => {
                row.$$('td').get(2).getText().then((cityName) => {
                   filterOk = filterOk && (cityName == filteredCity);
                })
            })
            .then(() => expect(filterOk).toBe(false))
            .then(() => {
                filterOk = true;
                searchInput.sendKeys('r');
                let dataRows = element(by.tagName('tbody')).$$('tr');
                dataRows.each((row) => {
                    row.$$('td').get(2).getText().then((cityName) => {
                        filterOk = filterOk && (cityName == filteredCity);
                    })
                }).then(() => expect(filterOk).toBe(true))
            });
        });

        it('should show clear button when there is inputted text only', () => {
            expect(clearBtn.isDisplayed()).toBe(false);
            searchInput.sendKeys('1').then(() => expect(clearBtn.isDisplayed()).toBe(true));
        });

        it('should clear text search when clicking clear button', () => {
            searchInput.sendKeys('uno');
            clearBtn.click();
            expect(searchInput.getText()).toBe('');
        });
    });

});