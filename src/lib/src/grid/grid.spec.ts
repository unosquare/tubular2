import { ComponentFixture, TestBed, getTestBed, inject, tick, async } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MaterialModule } from '@angular/material';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule, ResponseOptions, Response } from '@angular/http';

import { GridComponent } from './grid';
import { GridPrintButtonDirective } from '../grid-print/grid-print';
import { GridExportButtonDirective } from '../grid-export/grid-export';
import { TubularDataSource } from '../grid-table/grid-table';

describe('Component: GridComponent', () => {
    let simpleGridApp: SimpleGridApp;
    let fixture: ComponentFixture<SimpleGridApp>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleGridApp, GridComponent, GridPrintButtonDirective, GridExportButtonDirective],
            imports: [MaterialModule, HttpModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleGridApp);
        fixture.detectChanges();
        fixture.detectChanges();
    });

    it('should instantiate grid', () => {
        const progressBar = fixture.nativeElement.querySelector('.tb-progress-bar');
        expect(progressBar).toBeDefined();
        // const tableElement = fixture.nativeElement.querySelector('.tb-progress-bar');
        // const headerRow = tableElement.querySelectorAll('.mat-header-cell')

        // const rows = tableElement.querySelectorAll('.mat-row');
        // for (let i = 0; i < rows.length; i++) {
        //     const cells = rows[i].querySelectorAll('.mat-cell');
        //     expectTextContent(cells[0], `a_${i + 1}`);
        //     expectTextContent(cells[1], `b_${i + 1}`);
        //     expectTextContent(cells[2], `c_${i + 1}`);
        // }
    });
});

interface TestData {
    a: string;
    b: string;
    c: string;
}

class FakeDataSource extends DataSource<TestData> {
    _dataChange = new BehaviorSubject<TestData[]>([]);
    set data(data: TestData[]) { this._dataChange.next(data); }
    get data() { return this._dataChange.getValue(); }

    constructor() {
        super();
        for (let i = 0; i < 3; i++) { this.addData(); }
    }

    connect(): Observable<TestData[]> {
        return this._dataChange;
    }

    disconnect() { }

    addData() {
        const nextIndex = this.data.length + 1;

        let copiedData = this.data.slice();
        copiedData.push({
            a: `a_${nextIndex}`,
            b: `b_${nextIndex}`,
            c: `c_${nextIndex}`
        });

        this.data = copiedData;
    }
}

@Component({
    template: `
    <tb-grid #grid dataUrl="http://tubular.azurewebsites.net/api/orders/paged">
        <md-toolbar>
            <div fxFlex>
                
            </div>
            <div fxFlex>
            <button md-icon-button (click)="add()" aria-label="Add New">
                <md-icon>add</md-icon>
            </button>
                <button md-icon-button [grid-print]="grid" aria-label="Print">
                <md-icon>print</md-icon>
            </button>
            <button md-icon-button [grid-export]="grid" file-name="sampleCsv.csv" aria-label="Export">
                <md-icon>file_download</md-icon>
            </button>
            </div>
            <div fxFlex>
                
            </div>
        </md-toolbar>
        <div fxLayout="row" >
            <md-progress-bar [color]="primary" mode="indeterminate" *ngIf="grid.isLoading" class="tb-progress-bar">
            </md-progress-bar>
        </div>
        <div fxLayout="row">
            
        </div>
        <md-toolbar>
            <div fxFlex>
                
            </div>
            <div fxFlex>
                
            </div>
            <div fxFlex>
                
            </div>
        </md-toolbar>
    </tb-grid>
    `
})
class SimpleGridApp {
    @ViewChild(GridComponent) table: GridComponent;

    dataSource: TubularDataSource | null = new TubularDataSource(this.table);
    columnsToRender = ['column_a', 'column_b', 'column_c'];
}