﻿import { Component, Input } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularGrid }      from './grid.component';
import { ColumnModel, ColumnSortDirection } from './column';



export abstract class GridTable {
    private columnObservable: BehaviorSubject<ColumnModel[]> = new BehaviorSubject([]);

    columns = this.columnObservable.asObservable();
    rows: any[];
    
    constructor(public tbGrid: TubularGrid) {
        this.tbGrid.dataStream.subscribe(payload => this.rows = payload);
        this.columnObservable.subscribe(payload => this.tbGrid.columns.next(payload));
    }

    addColumns(columns: ColumnModel[]) {
        columns.forEach(c => {
            var val = this.columnObservable.getValue();
            val.push(c);
            this.columnObservable.next(val);
        });
    }

    sort(column: ColumnModel) {
        let value = this.columnObservable.getValue();

        if (!column.sortable) return;

        if (column.direction === ColumnSortDirection.None)
            column.direction = ColumnSortDirection.Asc;
        else if (column.direction === ColumnSortDirection.Asc)
            column.direction = ColumnSortDirection.Desc;
        else if (column.direction === ColumnSortDirection.Desc)
            column.direction = ColumnSortDirection.None;

        column.sortOrder = column.direction === ColumnSortDirection.None ? 0 : Number.MAX_VALUE;

        if (!column.isMultiSort) {
            value.forEach(v => v.sortOrder = v.name == column.name ? v.sortOrder : 0);
            value.forEach(v => v.direction = v.name == column.name ? column.direction : ColumnSortDirection.None);
        }

        let currentlySortedColumns = value.filter(col => col.sortOrder > 0);
        currentlySortedColumns.sort((a, b) => a.sortOrder === b.sortOrder ? 0 : 1);
        currentlySortedColumns.forEach((col, index) => { col.sortOrder = index + 1; });

        this.columnObservable.next(value);
    }

    applyFilter(column: ColumnModel) {
        let val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }
}