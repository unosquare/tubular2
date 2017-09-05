import { Component, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MdSort } from '@angular/material';
import { GridComponent, ColumnModel, ColumnSortDirection } from '../grid/index';

import { DataSource } from '@angular/cdk/collections';


export abstract class GridTable {
    public columns: Observable<ColumnModel[]>;

    public isEmpty: boolean;
    public dataSource: TubularDataSource | null;

    private columnObservable: BehaviorSubject<ColumnModel[]> = new BehaviorSubject([]);

    @ViewChild(MdSort) mdSort: MdSort;

    constructor(public tbGrid: GridComponent) {
        this.columns = this.columnObservable.asObservable();
        this.columnObservable.subscribe(payload => this.tbGrid.columns.next(payload));
    }

    public addColumns(columns: ColumnModel[]) {
        columns.forEach(c => {
            const val = this.columnObservable.getValue();
            val.push(c);
            this.columnObservable.next(val);
        });
    }

    public sortByColumnName(columnName: string) {
        const value = this.columnObservable.getValue();
        const columnModel = value.find(c => c.name === columnName);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.sort(columnModel);
    }

    public sort(column: ColumnModel) {
        const value = this.columnObservable.getValue();

        if (!column.sortable) {
            return;
        }

        if (column.direction === ColumnSortDirection.None) {
            column.direction = ColumnSortDirection.Asc;
        } else if (column.direction === ColumnSortDirection.Asc) {
            column.direction = ColumnSortDirection.Desc;
        } else if (column.direction === ColumnSortDirection.Desc) {
            column.direction = ColumnSortDirection.None;
        }

        column.sortOrder = column.direction === ColumnSortDirection.None ? 0 : Number.MAX_VALUE;

        if (!column.isMultiSort) {
            value.forEach(
                v => v.sortOrder = v.name === column.name ? v.sortOrder : 0);
            value.forEach(
                v => v.direction = v.name === column.name ?
                    column.direction :
                    ColumnSortDirection.None);
        }

        const currentlySortedColumns = value.filter(col => col.sortOrder > 0);
        currentlySortedColumns.sort((a, b) => a.sortOrder === b.sortOrder ? 0 : 1);
        currentlySortedColumns.forEach((col, index) => { col.sortOrder = index + 1; });

        this.columnObservable.next(value);
    }

    public filterByColumnName(columnName: string) {
        const value = this.columnObservable.getValue();
        const columnModel = value.find(c => c.name === columnName);

        if (!columnModel) {
            throw Error('Invalid column name');
        }

        this.columnObservable.next(value);
    }

    ngOnInit() {
        this.dataSource = new TubularDataSource(this.tbGrid);

        if (this.mdSort) {
            this.mdSort.mdSortChange.subscribe(element => {
                this.sortByColumnName(element.active);
            })
        }
    }
}


export class TubularDataSource extends DataSource<any> {
    constructor(private _tbGrid: GridComponent) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        return this._tbGrid.dataStream;
    }

    disconnect() { }
}
