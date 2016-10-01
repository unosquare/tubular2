import { Component, Input } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TubularGrid }      from './grid.component';
import { ColumnModel, ColumnSortDirection } from './column';

export class GridTable {
    private columnObservable: BehaviorSubject<ColumnModel[]> = new BehaviorSubject([]);

    columns = this.columnObservable.asObservable();
    rows: any[];

    constructor(tbGrid: TubularGrid) {
        tbGrid.dataStream.subscribe(payload => this.rows = payload);
        this.columnObservable.subscribe(payload => tbGrid.columns.next(payload));
    }

    addColumns(columns: ColumnModel[]) {
        columns.forEach(c => {
            var val = this.columnObservable.getValue();
            val.push(c);
            this.columnObservable.next(val);
        });
    }

    sort(column: ColumnModel) {
        var value = this.columnObservable.getValue();

        if (column.sortable === false) return;

        if (column.direction === ColumnSortDirection.None)
            column.direction = ColumnSortDirection.Asc;
        else if (column.direction === ColumnSortDirection.Asc)
            column.direction = ColumnSortDirection.Desc;
        else if (column.direction === ColumnSortDirection.Desc)
            column.direction = ColumnSortDirection.None;

        column.sortOrder = column.direction === ColumnSortDirection.None ? 0 : value.length;
                       
        if (column.isMultiSort === false) {
            value.forEach(v => v.sortOrder = v.name == column.name ? v.sortOrder : 0);
            value.forEach(v => v.direction = v.name == column.name ? column.direction : ColumnSortDirection.None);
        }

        //Re-index the sort order
        if (column.isMultiSort === true)
            value.forEach(v => v.sortOrder = v.sortOrder > 0? v.sortOrder+1 : v.sortOrder);

        this.columnObservable.next(value);
    }

    applyFilter(column: ColumnModel) {
        let val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }
}