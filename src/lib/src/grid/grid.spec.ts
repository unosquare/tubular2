import { ComponentFixture, TestBed, getTestBed, inject, tick, async, fakeAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MaterialModule, MdDialog, MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response } from '@angular/http';

import { GridComponent } from './grid';
import { DataService } from '../services/data.service';

import { ColumnModel, ColumnFilterMode, ColumnDataType } from './column';
// import { GridPrintButtonDirective } from '../grid-print/grid-print';
// import { GridExportButtonDirective } from '../grid-export/grid-export';
import { TubularDataSource } from '../grid-table/grid-table';
import { GridTable } from '../grid-table/grid-table';
import 'rxjs/add/observable/of';


describe('Component: GridComponent', () => {
    let simpleGridApp: SimpleGridApp;
    let fixture: ComponentFixture<SimpleGridApp>;
    let spy: jasmine.Spy;

    const mockJson = {
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleGridApp, GridComponent, TestGrid],
            imports: [MaterialModule, HttpModule, MdTableModule, CdkTableModule],
            providers: [DataService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleGridApp);
        let dataService = fixture.debugElement.injector.get(DataService);

        // Setup spy on the `getQuote` method
        spy = spyOn(dataService, 'getData')
            .and.returnValue(Observable.of(mockJson));
    });

    it('should instantiate grid', async(() => {
        fixture.detectChanges();

        const myGrid = fixture.nativeElement.querySelector('.mat-table');
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
            expectTextContent(cells[1], `500`);
            expectTextContent(cells[2], `Vesta`);

            cells = lastRow.querySelectorAll('.mat-cell');
            expectTextContent(cells[1], `481`);
            expectTextContent(cells[2], `Oxxo`);
        });
    }));
});

function expectTextContent(el, text) {
    if (el && el.textContent) {
        expect(el.textContent.trim()).toBe(text);
    } else {
        fail(`Missing text content of ${text} in element ${el}`);
    }
}

@Component({
    template: `
    <tb-grid #grid dataUrl="http://tubular.azurewebsites.net/api/orders/paged">
        <div fxLayout="row">
            <my-grid></my-grid>
        </div>
    </tb-grid>
    `
})
class SimpleGridApp {
    @ViewChild(GridComponent) table: GridComponent;
}

@Component({
    selector: 'my-grid',
    template: `
        <md-table [dataSource]="dataSource">
            <ng-container cdkColumnDef="options">
                <md-header-cell *cdkHeaderCellDef> Options </md-header-cell>
                <md-cell *cdkCellDef="let row"> <button md-button (click)="edit(row)"><md-icon>mode_edit</md-icon></button> </md-cell>
            </ng-container>

            <ng-container cdkColumnDef="OrderID">
                <md-header-cell *cdkHeaderCellDef>
                        Order ID
                </md-header-cell>
                <md-cell *cdkCellDef="let row"> {{row.OrderID}} </md-cell>
            </ng-container>

            <ng-container cdkColumnDef="CustomerName">
                <md-header-cell *cdkHeaderCellDef>
                        Customer Name
                </md-header-cell>
                <md-cell *cdkCellDef="let row"> {{row.CustomerName}} </md-cell>
            </ng-container>

            <md-header-row *cdkHeaderRowDef="['options', 'OrderID', 'CustomerName']"></md-header-row>
            <md-row *cdkRowDef="let row; columns: ['options', 'OrderID', 'CustomerName'];"></md-row>
        </md-table>
    `
})
export class TestGrid extends GridTable {
    public editModalRef;

    constructor(public tbGrid: GridComponent, public dialog: MdDialog) {
        super(tbGrid);

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

        this.addColumns([
            orderIdColumn,
            customerColumn,
            dateColumn,
            creationDate,
            cityColumn
        ]);
    }

    edit(row) {
        // const modalRef = this.dialog.open(OrderComponent);
        // modalRef.componentInstance.name = 'World';
        // modalRef.componentInstance.model = row;
    }

    details(row) {

    }
}
