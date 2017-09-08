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
import { ColumnModel, ColumnFilterMode, ColumnDataType } from './column';
// import { GridPrintButtonDirective } from '../grid-print/grid-print';
// import { GridExportButtonDirective } from '../grid-export/grid-export';
import { TubularDataSource } from '../grid-table/grid-table';
import { GridTable } from '../grid-table/grid-table';

describe('Component: GridComponent', () => {
    let simpleGridApp: SimpleGridApp;
    let fixture: ComponentFixture<SimpleGridApp>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleGridApp, GridComponent, TestGrid],
            imports: [MaterialModule, HttpModule, MdTableModule, CdkTableModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleGridApp);
        fixture.detectChanges();
        fixture.detectChanges();
    });

    it('should instantiate grid', async(() => {
        const myGrid = fixture.nativeElement.querySelector('.mat-table');
        expect(myGrid).toBeDefined();

        const headerRow = myGrid.querySelectorAll('.mat-header-cell');

        expectTextContent(headerRow[0], 'Options');
        expectTextContent(headerRow[1], 'Order ID');
        expectTextContent(headerRow[2], 'Customer Name');

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const rows = myGrid.querySelectorAll('.mat-row');
            console.log("Stable is done... rows", rows);
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('.mat-cell');
                expectTextContent(cells[0], `a_${i + 1}`);
                expectTextContent(cells[1], `b_${i + 1}`);
                expectTextContent(cells[2], `c_${i + 1}`);
            }
        });
    }));
});

function expectTextContent(el, text) {
    if (el && el.textContent) {
        console.log(el.textContent);
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