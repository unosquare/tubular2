// NG
import { TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// CDK
import { OverlayContainer } from '@angular/cdk/overlay';

// Material
import { ErrorStateMatcher } from '@angular/material/core';

// TB2
import { GridComponent } from './grid';
import { ColumnFilterDialogComponent } from '../column-filter-dialog/column-filter-dialog';
import { CustomMaterialModule } from '../tubular2.module';

// mocks
import {
    SimpleTbGridComponent, TbGridWithSortingComponent,
    TbGridWithFilteringComponent, TbGridWithPaginatorComponent, TbGridWithTwoPaginatorsComponent
} from '../../mocks';

describe('TbGridComponent', () => {
    let overlayContainerElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SimpleTbGridComponent,
                TbGridWithSortingComponent,
                TbGridWithFilteringComponent,
                TbGridWithPaginatorComponent,
                TbGridWithTwoPaginatorsComponent,
                GridComponent,
                ColumnFilterDialogComponent
            ],
            imports: [
                CustomMaterialModule,
                ReactiveFormsModule,
                HttpClientModule,
                NoopAnimationsModule
            ],
            providers: [
                ErrorStateMatcher,
                {
                    provide: OverlayContainer, useFactory: () => {
                        overlayContainerElement = document.createElement('div') as HTMLElement;
                        overlayContainerElement.classList.add('cdk-overlay-container');

                        document.body.appendChild(overlayContainerElement);

                        // remove body padding to keep consistent cross-browser
                        document.body.style.padding = '0';
                        document.body.style.margin = '0';

                        return { getContainerElement: () => overlayContainerElement };
                    }
                }
            ]
        }).compileComponents();
    }));

    describe('basic', () => {
        xit('should be able to create a table', async(() => {
            const fixture = TestBed.createComponent(SimpleTbGridComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const headerRow = myGrid.querySelectorAll('.mat-header-cell');

            expectTextContent(headerRow[0], 'Options');
            expectTextContent(headerRow[1], 'Order ID');
            expectTextContent(headerRow[2], 'Customer Name');

            fixture.whenStable().then(() => {
                const rows = myGrid.querySelectorAll('.mat-row');

                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);
            });
        }));

        xit('should emit error if failure on getting data', () => {
            const fixture = TestBed.createComponent(SimpleTbGridComponent);

            fixture.detectChanges();

            expect(fixture.componentInstance.handleError).toBeDefined();
            expect(fixture.componentInstance.errorWhenGettingData).toBe(true);
        });
    });

    describe('with sorting', () => {
        xit('should be able to sort by numeric column', async(() => {
            const fixture = TestBed.createComponent(TbGridWithSortingComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const headerRow = myGrid.querySelectorAll('.mat-header-cell');

            fixture.whenStable().then(() => {
                const rows = myGrid.querySelectorAll('.mat-row');

                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);
            }).then(() => {
                const orderIdHeader = headerRow[1].querySelector('button.mat-sort-header-button') as HTMLElement;

                orderIdHeader.click();
                fixture.detectChanges();

                orderIdHeader.click();
                fixture.detectChanges();

                fixture.whenStable().then(() => {

                    const rows = myGrid.querySelectorAll('.mat-row');

                    const firstRow = rows[0];
                    const lastRow = rows[rows.length - 1];

                    let cells = firstRow.querySelectorAll('.mat-cell');
                    expectTextContent(cells[1], `500`);
                    expectTextContent(cells[2], `Vesta`);

                    cells = lastRow.querySelectorAll('.mat-cell');
                    expectTextContent(cells[1], `481`);
                    expectTextContent(cells[2], `Oxxo`);
                });
            });
        }));
    });

    describe('with filtering', () => {
        xit('should make use of filter dialog', async(() => {

            const fixture = TestBed.createComponent(TbGridWithFilteringComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const headerRow = myGrid.querySelectorAll('.mat-header-cell');

            const customerNameHeader = headerRow[2].querySelector('mat-icon') as HTMLElement;

            fixture.whenStable().then(() => {
                const rows = myGrid.querySelectorAll('.mat-row');

                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);
            }).then(() => {

                customerNameHeader.click();
                fixture.detectChanges();

                const trigger = fixture.debugElement.query(By.css('.select-trigger')).nativeElement;

                trigger.click();
                fixture.detectChanges();

                const option1 = overlayContainerElement.querySelectorAll('.mat-option')[0] as HTMLElement;
                const option2 = overlayContainerElement.querySelectorAll('.mat-option')[1] as HTMLElement;
                const option3 = overlayContainerElement.querySelectorAll('.mat-option')[2] as HTMLElement;

                expect(option1).toBeDefined();
                expect(option2).toBeDefined();
                expect(option3).toBeDefined();

                expectTextContent(option1, 'None');
                expectTextContent(option2, 'Contains');
                expectTextContent(option3, 'Not Contains');

                option2.click();
                fixture.detectChanges();

                const tbFilterDialog = fixture.debugElement
                    .query(By.directive(ColumnFilterDialogComponent))
                    .componentInstance as ColumnFilterDialogComponent;

                tbFilterDialog.form.controls['text'].setValue('Unosquare');
                fixture.detectChanges();
                // TODO: tbFilterDialog.submit();

                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const rows = myGrid.querySelectorAll('.mat-row');

                    const firstRow = rows[0];
                    const lastRow = rows[rows.length - 1];

                    let cells = firstRow.querySelectorAll('.mat-cell');
                    expectTextContent(cells[1], `4`);
                    expectTextContent(cells[2], `Unosquare LLC`);

                    cells = lastRow.querySelectorAll('.mat-cell');
                    expectTextContent(cells[1], `89`);
                    expectTextContent(cells[2], `Unosquare LLC`);

                });
            });
        }));
    });

    describe('with paginator', () => {
        xit('should default to first page', async(() => {

            const fixture = TestBed.createComponent(TbGridWithPaginatorComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const paginator = fixture.componentInstance.matPaginator;
            const tbGrid = fixture.componentInstance.tbGrid;

            fixture.whenStable().then(() => {

                fixture.detectChanges();

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);

                expect(paginator.pageIndex).toBe(0);
                expect(tbGrid.page.getValue()).toBe(0);

                paginator.nextPage();
            });
        }));

        xit('should navigate to next page', async(() => {
            const fixture = TestBed.createComponent(TbGridWithPaginatorComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const paginator = fixture.componentInstance.matPaginator;
            const tbGrid = fixture.componentInstance.tbGrid;

            fixture.whenStable().then(() => {

                fixture.detectChanges();

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);

                expect(paginator.pageIndex).toBe(0);
                expect(tbGrid.page.getValue()).toBe(0);

                paginator.nextPage();
            }).then(() => {
                fixture.detectChanges();

                expect(paginator.pageIndex).toBe(1);
                expect(tbGrid.page.getValue()).toBe(1);

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft Page 2`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft Page 2`);
            });
        }));

        xit('should navigate to next page using tb grid api', async(() => {

            const fixture = TestBed.createComponent(TbGridWithPaginatorComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const paginator = fixture.componentInstance.matPaginator;
            const tbGrid = fixture.componentInstance.tbGrid;

            fixture.whenStable().then(() => {

                fixture.detectChanges();

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);

                expect(paginator.pageIndex).toBe(0);
                expect(tbGrid.page.getValue()).toBe(0);

                tbGrid.goToPage(1);
            }).then(() => {
                fixture.detectChanges();

                expect(paginator.pageIndex).toBe(1);
                expect(tbGrid.page.getValue()).toBe(1);

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft Page 2`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft Page 2`);
            });
        }));
    });

    describe('with two paginators', () => {
        xit('should default to first page', async(() => {

            const fixture = TestBed.createComponent(TbGridWithTwoPaginatorsComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const topPaginator = fixture.componentInstance.topPaginator;
            const bottomPaginator = fixture.componentInstance.bottomPaginator;
            const tbGrid = fixture.componentInstance.tbGrid;

            fixture.whenStable().then(() => {

                fixture.detectChanges();

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);

                expect(topPaginator.pageIndex).toBe(0);
                expect(bottomPaginator.pageIndex).toBe(0);
                expect(tbGrid.page.getValue()).toBe(0);

                bottomPaginator.nextPage();
            });
        }));

        xit('should navigate to next page', async(() => {
            const fixture = TestBed.createComponent(TbGridWithTwoPaginatorsComponent);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const topPaginator = fixture.componentInstance.topPaginator;
            const bottomPaginator = fixture.componentInstance.bottomPaginator;
            const tbGrid = fixture.componentInstance.tbGrid;

            fixture.whenStable().then(() => {

                fixture.detectChanges();

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft`);

                expect(topPaginator.pageIndex).toBe(0);
                expect(bottomPaginator.pageIndex).toBe(0);
                expect(tbGrid.page.getValue()).toBe(0);

                topPaginator.nextPage();
            }).then(() => {
                fixture.detectChanges();

                expect(topPaginator.pageIndex).toBe(1);
                expect(bottomPaginator.pageIndex).toBe(1);
                expect(tbGrid.page.getValue()).toBe(1);

                const rows = myGrid.querySelectorAll('.mat-row');
                const firstRow = rows[0];
                const lastRow = rows[rows.length - 1];

                let cells = firstRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `1`);
                expectTextContent(cells[2], `Microsoft Page 2`);

                cells = lastRow.querySelectorAll('.mat-cell');
                expectTextContent(cells[1], `20`);
                expectTextContent(cells[2], `Microsoft Page 2`);
            });
        }));
    });
});

function expectTextContent(el: HTMLElement, text: string) {
    if (el && el.textContent) {
        expect(el.textContent.trim()).toBe(text);
    } else {
        fail(`Missing text content of ${text} in element ${el}`);
    }
}
