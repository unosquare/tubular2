import { Component, Input } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';

import { TbGrid }           from './tbGrid.component';
import { ColumnModel, ColumnSortDirection } from './column';

export class TbGridTable {
    private columnObservable: BehaviorSubject<ColumnModel[]> = new BehaviorSubject([]);

    columns = this.columnObservable.asObservable();
    isFiltering: boolean = false;
    rows: any[];

    constructor(tbGrid: TbGrid) {
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
        // TODO: Check logic from previous
        if (column.direction === ColumnSortDirection.None)
            column.direction = ColumnSortDirection.Asc;
        else if (column.direction === ColumnSortDirection.Asc)
            column.direction = ColumnSortDirection.Desc;
        else if (column.direction === ColumnSortDirection.Desc)
            column.direction = ColumnSortDirection.None;

        column.sortOrder = column.direction === ColumnSortDirection.None ? 0 : 1;

        let val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }

    applyFilter(column: ColumnModel) {
        let val = this.columnObservable.getValue();
        this.columnObservable.next(val);
    }
}