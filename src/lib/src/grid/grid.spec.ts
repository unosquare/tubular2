import { ComponentFixture, TestBed, getTestBed, inject, tick, async, fakeAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { ScrollDispatcher } from '@angular/cdk/scrolling';


import { By } from '@angular/platform-browser';

// import { NoConflictStyleCompatibilityMode  } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatCommonModule,
    MatDialogModule,
    MatFormField,
    MatFormFieldControl,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOption,
    MatSelect, MatSelectModule,
    MatSortModule, MatTableModule,
} from '@angular/material';


import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response } from '@angular/http';

import { GridComponent } from './grid';
import { DataService } from '../services/data.service';

import { ColumnModel, ColumnFilterMode, ColumnDataType } from './column';
import { ColumnFilterDialogComponent } from '../column-filter-dialog/column-filter-dialog';
import { PopoverModule } from '../popover/popover.module';
import { NgbPopoverWindow, NgbPopover } from '../popover/popover';


// import { GridExportButtonDirective } from '../grid-export/grid-export';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { Subject } from 'rxjs/Subject';



describe('TbGridComponent', () => {
    let spy: jasmine.Spy;
    let dataService: DataService;
    let overlayContainerElement: HTMLElement;
    let dir: { value: 'ltr' | 'rtl' };
    let scrolledSubject = new Subject();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SimpleTbGridApp,
                TbGridWithSortingApp,
                TbGridWithFiltering,
                GridComponent,
                ColumnFilterDialogComponent
            ],
            imports: [
                FormsModule,
                MatIconModule,
                MatSelectModule,
                MatInputModule,
                MatSortModule,
                MatTableModule,
                CdkTableModule,
                ReactiveFormsModule,
                PopoverModule.forRoot(),
                HttpModule,
                NoopAnimationsModule
            ],
            providers: [
                DataService,
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
                ,
                { provide: Directionality, useFactory: () => dir = { value: 'ltr' } },
                {
                    provide: ScrollDispatcher, useFactory: () => {
                        return {
                            scrolled: (_delay: number, callback: () => any) => {
                                return scrolledSubject.asObservable().subscribe(callback);
                            }
                        };
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        // fixture = TestBed.createComponent(SimpleGridApp);
        // dataService = fixture.debugElement.injector.get(DataService);
    });

    afterEach(() => {
        // document.body.removeChild(overlayContainerElement);
    });

    describe('basic', () => {
        it('should be able to create a table', async(() => {
            let fixture = TestBed.createComponent(SimpleTbGridApp);

            dataService = fixture.debugElement.injector.get(DataService);

            spy = spyOn(dataService, 'getData')
                .and.callFake(fakeSuccessfulGetData);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const headerRow = myGrid.querySelectorAll('.mat-header-cell');

            expectTextContent(headerRow[0], 'Options');
            expectTextContent(headerRow[1], 'Order ID');
            expectTextContent(headerRow[2], 'Customer Name');

            expect(spy.calls.any()).toBe(true, 'getData called');

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

        it('should emit error if failure on getting data', () => {

            let fixture = TestBed.createComponent(SimpleTbGridApp);

            dataService = fixture.debugElement.injector.get(DataService);

            spy = spyOn(dataService, 'getData')
                .and.callFake(fakeFailGetData);

            fixture.detectChanges();

            expect(spy.calls.any()).toBe(true, 'getData called');
            expect(fixture.componentInstance.handleError).toBeDefined();
            expect(fixture.componentInstance.errorWhenGettingData).toBe(true);
        });
    });

    describe('with sorting', () => {
        it('should be able to sort by numeric column', async(() => {

            let fixture = TestBed.createComponent(TbGridWithSortingApp);

            dataService = fixture.debugElement.injector.get(DataService);

            spy = spyOn(dataService, 'getData')
                .and.callFake(fakeSuccessfulGetData);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const headerRow = myGrid.querySelectorAll('.mat-header-cell');

            expect(spy.calls.any()).toBe(true, 'getData called');

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
        it('should make use of filter dialog', async(() => {

            let fixture = TestBed.createComponent(TbGridWithFiltering);

            dataService = fixture.debugElement.injector.get(DataService);

            spy = spyOn(dataService, 'getData')
                .and.callFake(fakeSuccessfulGetData);

            fixture.detectChanges();

            const myGrid = fixture.nativeElement.querySelector('mat-table');
            expect(myGrid).toBeDefined();

            const headerRow = myGrid.querySelectorAll('.mat-header-cell');

            expect(spy.calls.any()).toBe(true, 'getData called');

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

                const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;

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
                tbFilterDialog.submit();

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
});

function expectTextContent(el, text) {
    if (el && el.textContent) {
        expect(el.textContent.trim()).toBe(text);
    } else {
        fail(`Missing text content of ${text} in element ${el}`);
    }
}

const mockJsonDefault = {
    Counter: 0,
    Payload: [
        [1, 'Microsoft', '2016-03-19T20:00:00', 'Guadalajara, JAL, Mexico', 300.00],
        [2, 'Microsoft', '2016-04-23T11:00:00', 'Guadalajara, JAL, Mexico', 0.00],
        [3, 'Microsoft', '2016-12-22T09:00:00', 'Guadalajara, JAL, Mexico', 300.00],
        [4, 'Unosquare LLC', '2016-02-01T19:00:00', 'Los Angeles, CA, USA', 0.00],
        [5, 'Microsoft', '2016-11-10T19:00:00', 'Guadalajara, JAL, Mexico', 92.00],
        [6, 'Unosquare LLC', '2016-11-06T19:00:00', 'Los Angeles, CA, USA', 18.00],
        [7, 'Unosquare LLC', '2016-11-11T19:00:00', 'Leon, GTO, Mexico', 50.00],
        [8, 'Unosquare LLC', '2016-11-08T19:00:00', 'Portland, OR, USA', 9.00],
        [9, 'Vesta', '2016-11-07T19:00:00', 'Guadalajara, JAL, Mexico', 108.00],
        [10, 'Unosquare LLC', '2016-11-05T19:00:00', 'Portland, OR, USA', 15.00],
        [11, 'Unosquare LLC', '2016-11-11T19:00:00', 'Guadalajara, JAL, Mexico', 60.00],
        [12, 'Vesta', '2016-11-09T19:00:00', 'Leon, GTO, Mexico', 174.00],
        [13, 'Super La Playa', '2016-11-04T19:00:00', 'Portland, OR, USA', 16.00],
        [14, 'Advanced Technology Systems', '2016-11-09T19:00:00', 'Leon, GTO, Mexico', 0.00],
        [15, 'Unosquare LLC', '2016-11-08T19:00:00', 'Leon, GTO, Mexico', 78.00],
        [16, 'Super La Playa', '2016-11-08T19:00:00', 'Guadalajara, JAL, Mexico', 41.00],
        [17, 'Microsoft', '2016-11-07T19:00:00', 'Guadalajara, JAL, Mexico', 0.00],
        [18, 'Microsoft', '2016-11-03T19:00:00', 'Guadalajara, JAL, Mexico', 64.00],
        [19, 'Oxxo', '2016-11-10T19:00:00', 'Los Angeles, CA, USA', 25.00],
        [20, 'Microsoft', '2016-11-08T19:00:00', 'Guadalajara, JAL, Mexico', 3.00]
    ],
    TotalRecordCount: 500,
    FilteredRecordCount: 500,
    TotalPages: 25,
    CurrentPage: 1,
    AggregationPayload: {}
};

const mockJsonOrderedByOrderId = {
    Counter: 0,
    Payload: [
        [500, 'Vesta', '2016-11-03T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
        [499, 'Oxxo', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Portland, OR, USA'],
        [498, 'Unosquare LLC', '2016-11-09T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
        [497, 'Microsoft', '2016-11-04T00:00:00', '2016-01-01T00:00:00', 'Los Angeles, CA, USA'],
        [496, 'Vesta', '2016-11-06T00:00:00', '2016-01-01T00:00:00', 'Guadalajara, JAL, Mexico'],
        [495, 'Oxxo', '2016-11-11T00:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico'],
        [494, 'Vesta', '2016-11-04T00:00:00', '2015-12-30T00:00:00', 'Portland, OR, USA'],
        [493, 'Vesta', '2016-11-12T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
        [492, 'Oxxo', '2016-11-10T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
        [491, 'Unosquare LLC', '2016-11-03T00:00:00', '2016-01-01T00:00:00', 'Los Angeles, CA, USA'],
        [490, 'Vesta', '2016-11-06T00:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico'],
        [489, 'Unosquare LLC', '2016-11-11T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
        [488, 'Microsoft', '2016-11-03T00:00:00', '2016-01-01T00:00:00', 'Guadalajara, JAL, Mexico'],
        [487, 'Unosquare LLC', '2016-11-06T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
        [486, 'Oxxo', '2016-11-11T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
        [485, 'Advanced Technology Systems', '2016-11-05T00:00:00', '2016-01-01T00:00:00', 'Portland, OR, USA'],
        [484, 'Advanced Technology Systems', '2016-11-04T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
        [483, 'Vesta', '2016-11-12T00:00:00', '2015-12-30T00:00:00', 'Los Angeles, CA, USA'],
        [482, 'Super La Playa', '2016-11-07T00:00:00', '2016-01-01T00:00:00', 'Leon, GTO, Mexico'],
        [481, 'Oxxo', '2015-02-24T12:00:00', '2015-12-30T00:00:00', 'Guadalajara, JAL, Mexico']
    ],
    TotalRecordCount: 500,
    FilteredRecordCount: 500,
    TotalPages: 25,
    CurrentPage: 1,
    AggregationPayload: {}
};

const mockJsonFilteredByCustomerName = {
    Counter: 0,
    Payload: [
        [4, 'Unosquare LLC', '2016-02-01T19:00:00', 'Los Angeles, CA, USA', 0.00],
        [6, 'Unosquare LLC', '2016-11-06T19:00:00', 'Los Angeles, CA, USA', 18.00],
        [7, 'Unosquare LLC', '2016-11-11T19:00:00', 'Leon, GTO, Mexico', 50.00],
        [8, 'Unosquare LLC', '2016-11-08T19:00:00', 'Portland, OR, USA', 9.00],
        [10, 'Unosquare LLC', '2016-11-05T19:00:00', 'Portland, OR, USA', 15.00],
        [11, 'Unosquare LLC', '2016-11-11T19:00:00', 'Guadalajara, JAL, Mexico', 60.00],
        [15, 'Unosquare LLC', '2016-11-08T19:00:00', 'Leon, GTO, Mexico', 78.00],
        [21, 'Unosquare LLC', '2016-11-11T19:00:00', 'Leon, GTO, Mexico', 70.00],
        [22, 'Unosquare LLC', '2016-11-03T19:00:00', 'Guadalajara, JAL, Mexico', 17.00],
        [25, 'Unosquare LLC', '2016-11-08T19:00:00', 'Los Angeles, CA, USA', 34.00],
        [44, 'Unosquare LLC', '2016-11-04T19:00:00', 'Los Angeles, CA, USA', 82.00],
        [45, 'Unosquare LLC', '2016-11-11T19:00:00', 'Los Angeles, CA, USA', 8.00],
        [48, 'Unosquare LLC', '2016-11-11T19:00:00', 'Leon, GTO, Mexico', 18.00],
        [56, 'Unosquare LLC', '2016-11-07T19:00:00', 'Los Angeles, CA, USA', 72.00],
        [57, 'Unosquare LLC', '2016-11-02T19:00:00', 'Portland, OR, USA', 133.00],
        [66, 'Unosquare LLC', '2016-11-02T19:00:00', 'Guadalajara, JAL, Mexico', 117.00],
        [73, 'Unosquare LLC', '2016-11-04T19:00:00', 'Guadalajara, JAL, Mexico', 8.00],
        [75, 'Unosquare LLC', '2016-11-07T19:00:00', 'Portland, OR, USA', 102.00],
        [82, 'Unosquare LLC', '2016-11-05T19:00:00', 'Los Angeles, CA, USA', 126.00],
        [89, 'Unosquare LLC', '2016-11-03T19:00:00', 'Portland, OR, USA', 38.00]
    ],
    TotalRecordCount: 500,
    FilteredRecordCount: 500,
    TotalPages: 25,
    CurrentPage: 1,
    AggregationPayload: {}
};

function fakeFailGetData(request) {
    return Observable.throw('Error on getting data');
}

function fakeSuccessfulGetData(request) {

    const columns = request._body.columns as Array<ColumnModel>;
    const sortableColumns = columns.filter(f => f.sortOrder > 0);
    const searchableColumns = columns.filter(f => f.hasFilter);

    if (searchableColumns.some(c => c.name === 'CustomerName'
        && c.filter.operator === 'Contains'
        && c.filter.text === 'ThrowError')) {
        return Observable.of(mockJsonFilteredByCustomerName).map(r => r);
    }

    if (searchableColumns.some(c => c.name === 'CustomerName'
        && c.filter.operator === 'Contains'
        && c.filter.text === 'Unosquare')) {
        return Observable.of(mockJsonFilteredByCustomerName).map(r => r);
    }

    if (sortableColumns.some(c => c.name === 'OrderID' && c.sortDirection === 'Descending')) {
        return Observable.of(mockJsonOrderedByOrderId).map(r => r);
    }

    return Observable.of(mockJsonDefault).map(r => r);

}

@Component({
    template: `
    <tb-grid #grid dataUrl="http://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-table [dataSource]="grid.dataSource">
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef> Order ID </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef> Customer Name </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>
    </tb-grid>
    `
})
class SimpleTbGridApp {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    public errorWhenGettingData = false;

    handleError(error) {
        this.errorWhenGettingData = true;
    }

    ngOnInit() {
        const orderIdColumn = new ColumnModel('OrderID', false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        const customerColumn = new ColumnModel('CustomerName');
        customerColumn.filterMode = ColumnFilterMode.String;

        const dateColumn = new ColumnModel('ShippedDate', false);
        dateColumn.filterMode = ColumnFilterMode.DateTime;
        dateColumn.dataType = ColumnDataType.DateTime;

        const creationDate = new ColumnModel('CreationDate', false);
        creationDate.filterMode = ColumnFilterMode.Date;
        creationDate.dataType = ColumnDataType.Date;

        const cityColumn = new ColumnModel('ShipperCity');
        cityColumn.filterMode = ColumnFilterMode.String;

        this.tbGrid.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }
}

@Component({
    template: `
    <tb-grid #grid dataUrl="http://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-table [dataSource]="grid.dataSource" matSort>
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef>
                    <span mat-sort-header>
                        Order ID
                    </span>
                </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef>
                    <span mat-sort-header>
                        Customer Name
                    </span>
                </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>
    </tb-grid>
    `
})
class TbGridWithSortingApp {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    handleError(error) {
        console.log(error);
    }

    ngOnInit() {
        const orderIdColumn = new ColumnModel('OrderID', false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;
        orderIdColumn.sortable = true;

        const customerColumn = new ColumnModel('CustomerName');
        customerColumn.filterMode = ColumnFilterMode.String;

        const dateColumn = new ColumnModel('ShippedDate', false);
        dateColumn.filterMode = ColumnFilterMode.DateTime;
        dateColumn.dataType = ColumnDataType.DateTime;

        const creationDate = new ColumnModel('CreationDate', false);
        creationDate.filterMode = ColumnFilterMode.Date;
        creationDate.dataType = ColumnDataType.Date;

        const cityColumn = new ColumnModel('ShipperCity');
        cityColumn.filterMode = ColumnFilterMode.String;

        this.tbGrid.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }
}

@Component({
    template: `
    <tb-grid #grid dataUrl="http://tubular.azurewebsites.net/api/orders/paged" (onRequestDataError)="handleError($event)">
        <mat-table [dataSource]="grid.dataSource">
            <ng-container cdkColumnDef="options">
                <mat-header-cell *cdkHeaderCellDef> Options </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> <button mat-buton (click)="edit(row)"><mat-icon>mode_edit</mat-icon></button> </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <mat-header-cell *cdkHeaderCellDef> Order ID </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.OrderID}} </mat-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <mat-header-cell *cdkHeaderCellDef>
                    <span>
                        Customer Name
                    </span>
                    <tb-filter-dialog column="CustomerName" (filterChange)="grid.filterByColumnName($event)">
                    </tb-filter-dialog>
                </mat-header-cell>
                <mat-cell *cdkCellDef="let row"> {{row.CustomerName}} </mat-cell>
            </ng-container>

            <mat-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></mat-header-row>
            <mat-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></mat-row>
        </mat-table>
    </tb-grid>
    `
})
class TbGridWithFiltering {
    @ViewChild(GridComponent) tbGrid: GridComponent;

    handleError(error) {
        console.log(error);
    }

    ngOnInit() {
        const orderIdColumn = new ColumnModel('OrderID', false);
        orderIdColumn.filterMode = ColumnFilterMode.Number;

        const customerColumn = new ColumnModel('CustomerName');
        customerColumn.filterMode = ColumnFilterMode.String;

        const dateColumn = new ColumnModel('ShippedDate', false);
        dateColumn.filterMode = ColumnFilterMode.DateTime;
        dateColumn.dataType = ColumnDataType.DateTime;

        const creationDate = new ColumnModel('CreationDate', false);
        creationDate.filterMode = ColumnFilterMode.Date;
        creationDate.dataType = ColumnDataType.Date;

        const cityColumn = new ColumnModel('ShipperCity');
        cityColumn.filterMode = ColumnFilterMode.String;

        this.tbGrid.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }
}
